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
import { registerGraphCanvas } from '../../lib/persistence/transfer.js';
import { createTransform } from '../../lib/graph/coordinate-system.js';
import { buildFunctionDrawables } from '../../lib/graph/drawables.js';
import { buildAnalysisDrawables } from '../../lib/graph/analysisDrawables.js';
import { ensureImageLoaded } from '../../lib/graph/images.js';
import { applyFolderVisibility } from '../../lib/expressions/folders.js';
import { compileExpressionScoped } from '../../lib/math/engine.js';
import { CARTESIAN_PARAMETER, VariableEnvironment } from '../../lib/math/variables.js';
import {
  createDefaultViewport,
  panViewport,
  validateViewport,
  zoomViewport,
} from '../../lib/graph/viewport.js';
import type { GraphViewport as Viewport } from '../../types/calculator.js';
import type { Expression, VariableDefinition } from '../../types/calculator.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';
import type {
  GraphDrawable,
  GraphRenderInput,
  GraphThemeMode,
  ScreenPoint,
  WorldPoint,
} from '../../lib/graph/types.js';

/** Trailing debounce before the live renderer viewport is written to the store. */
const STORE_SYNC_DELAY_MS = 150;

/** Tap within this many CSS px of a curve snaps to it for inspection. */
const TAP_SNAP_DISTANCE_PX = 28;

/** Cheap djb2 hash so long image data-URLs stay out of the drawable cache key. */
function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) + hash + value.charCodeAt(i)) | 0;
  }
  return hash;
}

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

export function GraphViewport({ strings }: { strings: CalculatorShellStrings }) {
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
  const variablesRef = useRef<VariableDefinition[]>(state.variables);
  const settingsRef = useRef(state.settings);
  const themeRef = useRef<GraphThemeMode>(graphTheme);
  const analysisRef = useRef(state.analysis);
  // Persistent variable environment: compiled closures capture its live
  // values map, so slider drags flow through with zero recompilation.
  const envRef = useRef<VariableEnvironment | null>(null);
  if (envRef.current === null) {
    envRef.current = new VariableEnvironment([]);
  }
  useEffect(() => {
    storeViewportRef.current = state.viewport;
    expressionsRef.current = state.expressions;
    variablesRef.current = state.variables;
    settingsRef.current = state.settings;
    themeRef.current = graphTheme;
    analysisRef.current = state.analysis;
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
    const variables = variablesRef.current;
    const env = envRef.current as VariableEnvironment;
    env.setDefinitions(variables);
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
            : e.kind === 'parametric'
              ? [e.definition.xOfT, e.definition.yOfT, e.definition.tMin, e.definition.tMax]
              : e.kind === 'polar'
                ? e.definition.rOfTheta
                : e.kind === 'inequality'
                  ? [e.definition.lhs, e.definition.operator, e.definition.rhs]
                  : e.kind === 'table'
                    ? e.definition.rows
                    : e.kind === 'image'
                      ? [
                          hashString(e.definition.src),
                          e.definition.centerX,
                          e.definition.centerY,
                          e.definition.width,
                          e.definition.height,
                          e.definition.opacity,
                        ]
                      : e.kind === 'folder'
                        ? [e.definition.collapsed, e.definition.children]
                        : e.kind,
      ]),
      // Variable definitions (names, values, ranges) change the curves.
      variables,
      viewport,
      size,
      // Analysis overlays are part of the drawable output, so they join the
      // cache key. JSON of the analysis slice is small (markers, integrals…).
      analysisRef.current,
    ]);
    const cached = drawablesCacheRef.current;
    if (cached.key === key) return cached.drawables;
    // Folder collapse hides children; folder membership never draws itself.
    const effectiveExpressions = applyFolderVisibility(expressions);
    const drawables: GraphDrawable[] = [
      ...buildFunctionDrawables(effectiveExpressions, viewport, size, env),
      ...buildAnalysisDrawables(effectiveExpressions, analysisRef.current, viewport, size, env),
    ];
    // Kick off async loads for image drawables; repaint when each arrives.
    // The drawables themselves do not change when a bitmap arrives (the
    // renderer resolves the bitmap by src each frame), so a repaint with
    // the cached input is enough — never invalidate the drawable cache
    // here, or the rebuild would resubscribe and loop forever.
    for (const drawable of drawables) {
      if (drawable.kind === 'image') {
        ensureImageLoaded(drawable.src, () => {
          const input = buildInput();
          const rendererInstance = canvasRef.current?.getRenderer();
          if (input && rendererInstance) rendererInstance.scheduleRender(input);
        });
      }
    }
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

  /**
   * Tap/click on the canvas: snap to the nearest point on a visible
   * cartesian curve (within a screen-space threshold) and store it as the
   * inspected point; tapping empty space clears the inspection.
   */
  const handleTap = useCallback(
    (screen: ScreenPoint) => {
      const renderer = canvasRef.current?.getRenderer();
      if (!renderer) return;
      const viewport = renderer.getViewport();
      const size = renderer.getSize();
      if (size.width <= 0 || size.height <= 0) return;
      const transform = createTransform(viewport, size);
      const xSpan = viewport.xMax - viewport.xMin;
      if (!Number.isFinite(xSpan) || xSpan <= 0) return;

      interface Candidate {
        expressionId: string;
        x: number;
        y: number;
        dist: number;
      }
      let best: Candidate | null = null;

      const env = envRef.current as VariableEnvironment;
      env.setDefinitions(variablesRef.current);
      try {
        env.resolve();
      } catch {
        // Hostile environment: tap inspection falls back to unbound (NaN) values.
      }
      for (const expression of expressionsRef.current) {
        if (expression.kind !== 'cartesian' || expression.visible !== true) continue;
        let fn: (x: number) => number;
        try {
          fn = compileExpressionScoped(expression.definition.rhs, {
            parameter: CARTESIAN_PARAMETER,
            env,
          }).fn;
        } catch {
          continue;
        }
        // Coarse scan: 240 samples across the viewport.
        const coarse = 240;
        let bestX = 0;
        let bestY = 0;
        let bestDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i <= coarse; i++) {
          const x = viewport.xMin + (xSpan * i) / coarse;
          const y = fn(x);
          if (!Number.isFinite(y)) continue;
          const sp = transform.worldToScreen({ x, y });
          if (!Number.isFinite(sp.x) || !Number.isFinite(sp.y)) continue;
          const dist = Math.hypot(sp.x - screen.x, sp.y - screen.y);
          if (dist < bestDist) {
            bestDist = dist;
            bestX = x;
            bestY = y;
          }
        }
        if (!Number.isFinite(bestDist)) continue;
        // Refine around the coarse hit: 60 samples over ±1 coarse step,
        // minimizing screen-space distance (handles steep curves better
        // than refining on x alone).
        const window = xSpan / coarse;
        for (let i = 0; i <= 60; i++) {
          const x = bestX - window + (2 * window * i) / 60;
          const y = fn(x);
          if (!Number.isFinite(y)) continue;
          const sp = transform.worldToScreen({ x, y });
          if (!Number.isFinite(sp.x) || !Number.isFinite(sp.y)) continue;
          const dist = Math.hypot(sp.x - screen.x, sp.y - screen.y);
          if (dist < bestDist) {
            bestDist = dist;
            bestX = x;
            bestY = y;
          }
        }
        if (!best || bestDist < best.dist) {
          best = { expressionId: expression.id, x: bestX, y: bestY, dist: bestDist };
        }
      }

      if (best && best.dist <= TAP_SNAP_DISTANCE_PX) {
        dispatch({
          type: 'SET_INSPECTED_POINT',
          point: { expressionId: best.expressionId, x: best.x, y: best.y },
        });
      } else {
        dispatch({ type: 'SET_INSPECTED_POINT', point: null });
      }
    },
    [dispatch]
  );

  const handleInteractionStart = useCallback(() => {
    // No-op in Phase 2: kept as a seam for later phases (e.g. suppressing
    // hover readouts while a gesture is in progress).
  }, []);

  const handleInteractionEnd = useCallback(() => {
    flushStoreSync();
  }, [flushStoreSync]);

  // Register the live canvas so the persistence toolbar can export it
  // as PNG. Unregisters on unmount.
  useEffect(() => {
    return registerGraphCanvas(() => canvasRef.current?.getCanvas() ?? null);
  }, []);

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
        onTap: handleTap,
        onInteractionStart: handleInteractionStart,
        onInteractionEnd: handleInteractionEnd,
      }
    );
    controller.attach();
    return () => {
      controller.detach();
    };
  }, [handleZoom, handlePan, handleHover, handleTap, handleInteractionStart, handleInteractionEnd]);

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

  // Expression or variable changes (add/edit/rename/color/visibility/
  // delete, or any variable edit) re-render the current view with freshly
  // sampled drawables.
  useEffect(() => {
    if (!initializedRef.current) return;
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return;
    const input = buildInput();
    if (input) renderer.render(input);
  }, [state.expressions, state.variables, buildInput]);

  // Analysis overlay changes (markers, integrals, tangents, derivative
  // plots, annotations, precision) re-render with fresh overlay drawables.
  // The drawables cache key already includes the analysis slice.
  useEffect(() => {
    if (!initializedRef.current) return;
    const renderer = canvasRef.current?.getRenderer();
    if (!renderer) return;
    const input = buildInput();
    if (input) renderer.render(input);
  }, [state.analysis, buildInput]);

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
        label={strings.graph.canvasDefaultLabel}
      />
      <div className="absolute right-2 top-2">
        <GraphToolbar getDrawables={getDrawables} strings={strings} />
      </div>
      <CoordinateDisplay ref={coordRef} strings={strings} />
    </div>
  );
}

export default GraphViewport;
