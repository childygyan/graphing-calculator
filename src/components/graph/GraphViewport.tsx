/**
 * GraphViewport — store-connected orchestrator for the interactive 2D graph.
 * Owns the canvas surface, the pointer/wheel interaction controller, the
 * resize observer, theme resolution, and render scheduling. The renderer
 * holds the live viewport during gestures; the store is synced on a trailing
 * debounce so smooth pan/zoom never triggers a React re-render storm.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { GraphCanvas } from './GraphCanvas.js';
import type { GraphCanvasHandle } from './GraphCanvas.js';
import { GraphToolbar } from './GraphToolbar.js';
import { CoordinateDisplay } from './CoordinateDisplay.js';
import type { CoordinateDisplayHandle } from './CoordinateDisplay.js';
import { GraphInteractionController } from '../../lib/graph/interaction.js';
import { createTransform } from '../../lib/graph/coordinate-system.js';
import { buildFunctionDrawables } from '../../lib/graph/drawables.js';
import {
  createDefaultViewport,
  panViewport,
  validateViewport,
  zoomViewport,
} from '../../lib/graph/viewport.js';
import type { GraphViewport as Viewport } from '../../types/calculator.js';
import type { Expression } from '../../types/calculator.js';
import type {
  GraphDrawable,
  GraphRenderInput,
  GraphThemeMode,
  ScreenPoint,
  WorldPoint,
} from '../../lib/graph/types.js';

/** Trailing debounce before the live renderer viewport is written to the store. */
const STORE_SYNC_DELAY_MS = 150;

/** Relative epsilon for comparing the renderer viewport against the store. */
const VIEWPORT_EPSILON = 1e-12;

function isClose(a: number, b: number): boolean {
  if (a === b) return true;
  const scale = Math.max(1, Math.abs(a), Math.abs(b));
  return Math.abs(a - b) / scale < VIEWPORT_EPSILON;
}

function viewportsEqual(a: Viewport, b: Viewport): boolean {
  return (
    isClose(a.xMin, b.xMin) &&
    isClose(a.xMax, b.xMax) &&
    isClose(a.yMin, b.yMin) &&
    isClose(a.yMax, b.yMax)
  );
}

export function GraphViewport() {
  const { state, dispatch } = useCalculator();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<GraphCanvasHandle | null>(null);
  const coordRef = useRef<CoordinateDisplayHandle | null>(null);
  const initializedRef = useRef(false);
  const syncTimerRef = useRef<number | null>(null);
  const pendingViewportRef = useRef<Viewport | null>(null);

  // SSR-safe: renders as 'light' until the effect below resolves the theme.
  const [graphTheme, setGraphTheme] = useState<GraphThemeMode>('light');

  // Resolve 'light' | 'dark' from the store theme. 'system' follows the OS
  // preference via matchMedia and stays subscribed to changes.
  useEffect(() => {
    if (state.theme !== 'system') {
      setGraphTheme(state.theme);
      return;
    }
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setGraphTheme('light');
      return;
    }
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const applyPreference = (): void => {
      setGraphTheme(query.matches ? 'dark' : 'light');
    };
    applyPreference();
    query.addEventListener('change', applyPreference);
    return () => {
      query.removeEventListener('change', applyPreference);
    };
  }, [state.theme]);

  // Latest store values for the stable gesture callbacks below, which must
  // not close over stale render-time state.
  const storeViewportRef = useRef(state.viewport);
  const expressionsRef = useRef<Expression[]>(state.expressions);
  const settingsRef = useRef(state.settings);
  const themeRef = useRef<GraphThemeMode>(graphTheme);
  useEffect(() => {
    storeViewportRef.current = state.viewport;
    expressionsRef.current = state.expressions;
    settingsRef.current = state.settings;
    themeRef.current = graphTheme;
  });

  // Memoized drawable builder: pure function of (expressions, viewport,
  // size), so per-frame gesture renders reuse the last result when nothing
  // changed instead of re-sampling every curve.
  const drawablesCacheRef = useRef<{ key: string; drawables: GraphDrawable[] }>({
    key: '',
    drawables: [],
  });

  const getDrawables = useCallback((): GraphDrawable[] => {
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return [];
    const size = renderer.getSize();
    if (size.width <= 0 || size.height <= 0) return [];
    const viewport = renderer.getViewport();
    const expressions = expressionsRef.current;
    const key = JSON.stringify([
      expressions.map((e) => [
        e.id,
        e.kind,
        e.visible,
        e.color,
        e.lineWidth ?? null,
        e.kind === 'cartesian'
          ? e.definition.rhs
          : e.kind === 'point'
            ? [e.definition.x, e.definition.y]
            : e.kind,
      ]),
      viewport,
      size,
    ]);
    const cached = drawablesCacheRef.current;
    if (cached.key === key) return cached.drawables;
    const drawables = buildFunctionDrawables(expressions, viewport, size);
    drawablesCacheRef.current = { key, drawables };
    return drawables;
  }, []);

  const buildInput = useCallback((): GraphRenderInput | null => {
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return null;
    const size = renderer.getSize();
    if (size.width <= 0 || size.height <= 0) return null;
    return {
      viewport: renderer.getViewport(),
      settings: settingsRef.current,
      size,
      theme: themeRef.current,
      drawables: getDrawables(),
    };
  }, [getDrawables]);

  // One-time mount initialization once the renderer has a real size. Runs
  // whether the first ResizeObserver callback or a settings change wins the
  // race; later calls are no-ops.
  const ensureInitialized = useCallback(() => {
    if (initializedRef.current) return;
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return;
    const size = renderer.getSize();
    if (size.width <= 0 || size.height <= 0) return;
    renderer.setViewport(validateViewport(storeViewportRef.current) ?? createDefaultViewport());
    renderer.setTheme(themeRef.current);
    initializedRef.current = true;
  }, []);

  // Trailing-debounce the store write so continuous gestures update the
  // renderer every frame but React/localStorage only converge 150ms after
  // the last change.
  const queueStoreSync = useCallback(
    (viewport: Viewport) => {
      pendingViewportRef.current = { ...viewport };
      if (syncTimerRef.current !== null) {
        window.clearTimeout(syncTimerRef.current);
      }
      syncTimerRef.current = window.setTimeout(() => {
        syncTimerRef.current = null;
        const pending = pendingViewportRef.current;
        pendingViewportRef.current = null;
        if (pending) {
          dispatch({ type: 'SET_VIEWPORT', viewport: pending });
        }
      }, STORE_SYNC_DELAY_MS);
    },
    [dispatch]
  );

  const flushStoreSync = useCallback(() => {
    if (syncTimerRef.current !== null) {
      window.clearTimeout(syncTimerRef.current);
      syncTimerRef.current = null;
    }
    const pending = pendingViewportRef.current;
    pendingViewportRef.current = null;
    if (pending) {
      dispatch({ type: 'SET_VIEWPORT', viewport: pending });
    }
  }, [dispatch]);

  const handleZoom = useCallback(
    (factor: number, anchorScreen: ScreenPoint) => {
      const renderer = canvasRef.current?.getRenderer();
      if (!renderer) return;
      const transform = createTransform(renderer.getViewport(), renderer.getSize());
      const anchorWorld: WorldPoint = transform.screenToWorld(anchorScreen);
      const next = zoomViewport(renderer.getViewport(), factor, anchorWorld);
      renderer.setViewport(next);
      const input = buildInput();
      if (input) renderer.scheduleRender(input);
      queueStoreSync(next);
    },
    [buildInput, queueStoreSync]
  );

  const handlePan = useCallback(
    (deltaScreenX: number, deltaScreenY: number) => {
      const renderer = canvasRef.current?.getRenderer();
      if (!renderer) return;
      const transform = createTransform(renderer.getViewport(), renderer.getSize());
      // Drag right moves content right (viewport shifts left in world x);
      // drag down moves content down (viewport shifts up in world y).
      const shiftX = -deltaScreenX * transform.unitsPerPixelX();
      const shiftY = deltaScreenY * transform.unitsPerPixelY();
      const next = panViewport(renderer.getViewport(), shiftX, shiftY);
      renderer.setViewport(next);
      const input = buildInput();
      if (input) renderer.scheduleRender(input);
      queueStoreSync(next);
    },
    [buildInput, queueStoreSync]
  );

  const handleHover = useCallback((world: WorldPoint | null) => {
    coordRef.current?.setCoordinates(world);
  }, []);

  const handleInteractionStart = useCallback(() => {
    // No-op in Phase 2: kept as a seam for later phases (e.g. suppressing
    // hover readouts while a gesture is in progress).
  }, []);

  const handleInteractionEnd = useCallback(() => {
    flushStoreSync();
  }, [flushStoreSync]);

  // Attach the pointer/wheel interaction controller once the canvas exists.
  // (GraphCanvas's mount effect creates the renderer before this runs.)
  useEffect(() => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;
    const controller = new GraphInteractionController(
      canvas,
      () => {
        const renderer = canvasRef.current?.getRenderer();
        if (!renderer) {
          return createTransform(createDefaultViewport(), { width: 1, height: 1 });
        }
        return createTransform(renderer.getViewport(), renderer.getSize());
      },
      {
        onZoom: handleZoom,
        onPan: handlePan,
        onHover: handleHover,
        onInteractionStart: handleInteractionStart,
        onInteractionEnd: handleInteractionEnd,
      }
    );
    controller.attach();
    return () => {
      controller.detach();
    };
  }, [handleZoom, handlePan, handleHover, handleInteractionStart, handleInteractionEnd]);

  // Keep the renderer sized to the container and render after every resize.
  useEffect(() => {
    const container = containerRef.current;
    const renderer = canvasRef.current?.getRenderer();
    if (!container || !renderer) return;
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (!entry) return;
      const width = Math.floor(entry.contentRect.width);
      const height = Math.floor(entry.contentRect.height);
      if (width <= 0 || height <= 0) return;
      renderer.resize(width, height);
      ensureInitialized();
      const input = buildInput();
      if (input) renderer.render(input);
    });
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [buildInput, ensureInitialized]);

  // Store-driven viewport changes (toolbar buttons, reset, hydration):
  // apply them to the live renderer unless it already matches, so the
  // debounced gesture sync never echoes back into a render loop.
  useEffect(() => {
    if (!initializedRef.current) return;
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return;
    if (viewportsEqual(renderer.getViewport(), state.viewport)) return;
    renderer.setViewport({ ...state.viewport });
    const input = buildInput();
    if (input) renderer.render(input);
  }, [state.viewport, buildInput]);

  // Settings or theme changes re-render the current view.
  useEffect(() => {
    if (!initializedRef.current) return;
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return;
    renderer.setTheme(graphTheme);
    const input = buildInput();
    if (input) renderer.render(input);
  }, [state.settings, graphTheme, buildInput]);

  // Expression changes (add/edit/rename/color/visibility/delete) re-render
  // the current view with freshly sampled drawables.
  useEffect(() => {
    if (!initializedRef.current) return;
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return;
    const input = buildInput();
    if (input) renderer.render(input);
  }, [state.expressions, buildInput]);

  // On unmount, flush any pending debounced store sync so the persisted
  // state converges instead of dropping the last gesture.
  useEffect(() => {
    return () => {
      if (syncTimerRef.current !== null) {
        window.clearTimeout(syncTimerRef.current);
        syncTimerRef.current = null;
      }
      const pending = pendingViewportRef.current;
      pendingViewportRef.current = null;
      if (pending) {
        dispatch({ type: 'SET_VIEWPORT', viewport: pending });
      }
    };
  }, [dispatch]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-white dark:bg-slate-900"
    >
      <GraphCanvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full touch-none select-none"
      />
      <div className="absolute right-2 top-2">
        <GraphToolbar getDrawables={getDrawables} />
      </div>
      <CoordinateDisplay ref={coordRef} />
    </div>
  );
}

export default GraphViewport;
