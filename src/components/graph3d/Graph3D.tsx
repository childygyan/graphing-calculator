/**
 * Graph3D — interactive 3D surface plotter island (Workstream A).
 *
 * Canvas + pointer/touch/keyboard orbit controls, pinch/wheel zoom,
 * resolution control, and preset surfaces. Compiles z = f(x, y) with the
 * project's own math engine (no eval/new Function). Respects
 * prefers-reduced-motion (no idle auto-rotate) and ships an ARIA label
 * plus a text summary for screen readers.
 */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  createCamera,
  rotateCamera,
  zoomCamera,
  type OrbitCamera,
} from '../../lib/graph3d/camera.js';
import {
  compileSurface,
  fitSurfaceZ,
  sampleSurface,
  DEFAULT_DOMAIN,
  SurfaceCompileError,
  type SampledSurface,
  type SurfaceFunction,
} from '../../lib/graph3d/surface.js';
import { drawAxes, drawSurface } from '../../lib/graph3d/render.js';

interface Preset {
  label: string;
  expression: string;
  description: string;
}

const PRESETS: Preset[] = [
  {
    label: 'Paraboloid',
    expression: 'x^2+y^2',
    description: 'A bowl opening upward; minimum 0 at the origin.',
  },
  {
    label: 'Ripple',
    expression: 'sin(sqrt(x^2+y^2))',
    description: 'Concentric waves radiating from the origin.',
  },
  {
    label: 'Saddle',
    expression: 'x^2-y^2',
    description: 'Curves up along x, down along y — a saddle point at the origin.',
  },
];

const RESOLUTIONS = [24, 36, 48, 64];
const DRAG_SENSITIVITY = 0.008;
const KEY_ROTATE_STEP = Math.PI / 24;
const IDLE_SPIN_DELAY_MS = 4000;
const IDLE_SPIN_SPEED = 0.12; // radians per second

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 ' +
  'dark:border-slate-600 dark:bg-slate-800 dark:text-white';
const buttonClass =
  'rounded-md bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2';
const presetButtonClass = (active: boolean): string =>
  'rounded-full border px-3 py-1 text-sm font-medium transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ' +
  (active
    ? 'border-brand-600 bg-brand-600 text-white dark:border-brand-400 dark:bg-brand-500'
    : 'border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700 ' +
      'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-brand-400');
const resolutionButtonClass = (active: boolean): string =>
  'rounded-md px-3 py-1 text-sm font-medium tabular-nums ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ' +
  (active
    ? 'bg-brand-600 text-white dark:bg-brand-500'
    : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700');

function formatZ(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 10000 || abs < 0.001)) return value.toExponential(2);
  return value.toFixed(3);
}

export interface Graph3DProps {
  /** Expression plotted on first render. */
  initialExpression?: string;
}

export function Graph3D({ initialExpression = 'x^2+y^2' }: Graph3DProps) {
  const [source, setSource] = useState(initialExpression);
  const [plot, setPlot] = useState<{ expression: string; fn: SurfaceFunction } | null>(null);
  const [compileError, setCompileError] = useState<string | null>(null);
  const [resolution, setResolution] = useState<number>(36);
  const [canvasSize, setCanvasSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [isDark, setIsDark] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<OrbitCamera>(createCamera());
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchDistanceRef = useRef<number | null>(null);
  const lastInteractRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const surfaceRef = useRef<SampledSurface | null>(null);

  const surface = plot ? sampleSurface(plot.fn, DEFAULT_DOMAIN, resolution) : null;
  // The fitted surface is what gets drawn (tall z-spans shrink to fit);
  // statistics shown to the user always come from the true surface.
  const fitted = surface ? fitSurfaceZ(surface) : null;
  surfaceRef.current = fitted ? fitted.surface : null;
  const zScale = fitted ? fitted.zScale : 1;

  const draw = useCallback((): void => {
    const canvas = canvasRef.current;
    const current = surfaceRef.current;
    if (!canvas || !current || canvasSize.w === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { w, h } = canvasSize;
    ctx.clearRect(0, 0, w, h);
    // zoomScale tracks camera distance so framing stays consistent:
    // zooming in (shorter distance) enlarges the surface naturally.
    const zoomScale = Math.max(0.2, cameraRef.current.distance * 0.104);
    const options = { width: w, height: h, zoomScale, dark: isDark };
    drawSurface(ctx, current, cameraRef.current, options);
    drawAxes(ctx, current, cameraRef.current, options);
  }, [canvasSize, isDark]);

  const markInteracted = useCallback((): void => {
    lastInteractRef.current = performance.now();
  }, []);

  const applyExpression = useCallback(
    (raw: string): void => {
      const trimmed = raw.trim();
      if (trimmed === '') {
        setCompileError('Enter an expression in x and y, for example x^2+y^2.');
        return;
      }
      try {
        const { fn } = compileSurface(trimmed);
        setPlot({ expression: trimmed, fn });
        setCompileError(null);
        markInteracted();
      } catch (error) {
        const message =
          error instanceof SurfaceCompileError ? error.message : 'Could not plot that expression.';
        setCompileError(message);
      }
    },
    [markInteracted]
  );

  // Compile the initial expression on mount.
  useEffect(() => {
    applyExpression(initialExpression);
  }, []);

  // Track dark mode (same matchMedia convention as the rest of the app).
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = (): void => {
      setIsDark(query.matches);
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    draw();
  }, [draw, plot, resolution]);

  // DPR-aware sizing via ResizeObserver.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const rect = entry.contentRect;
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setCanvasSize({ w, h });
    });
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  // Idle auto-rotate: disabled entirely under prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = motionQuery.matches;
    const onChange = (): void => {
      reducedMotionRef.current = motionQuery.matches;
    };
    motionQuery.addEventListener('change', onChange);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number): void => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (!reducedMotionRef.current && now - lastInteractRef.current > IDLE_SPIN_DELAY_MS) {
        cameraRef.current = rotateCamera(cameraRef.current, dt * IDLE_SPIN_SPEED, 0);
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    lastInteractRef.current = performance.now();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      motionQuery.removeEventListener('change', onChange);
    };
  }, [draw]);

  // Non-passive wheel zoom (passive listeners cannot preventDefault).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (event: WheelEvent): void => {
      event.preventDefault();
      markInteracted();
      cameraRef.current = zoomCamera(cameraRef.current, Math.exp(event.deltaY * 0.0012));
      draw();
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [draw, markInteracted]);

  const rotateBy = useCallback(
    (dAzimuth: number, dElevation: number): void => {
      markInteracted();
      cameraRef.current = rotateCamera(cameraRef.current, dAzimuth, dElevation);
      draw();
    },
    [draw, markInteracted]
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>): void => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    pinchDistanceRef.current = null;
    markInteracted();
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>): void => {
    const tracked = pointersRef.current.get(event.pointerId);
    if (!tracked) return;
    const dx = event.clientX - tracked.x;
    const dy = event.clientY - tracked.y;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    markInteracted();

    if (pointersRef.current.size === 2) {
      const pts = [...pointersRef.current.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const prev = pinchDistanceRef.current;
      pinchDistanceRef.current = dist;
      if (prev !== null && dist > 0 && prev > 0) {
        // Fingers spread apart → zoom in.
        cameraRef.current = zoomCamera(cameraRef.current, prev / dist);
      }
      // Two-finger drag also rotates, at half sensitivity.
      cameraRef.current = rotateCamera(
        cameraRef.current,
        (-dx * DRAG_SENSITIVITY) / 2,
        (-dy * DRAG_SENSITIVITY) / 2
      );
    } else {
      cameraRef.current = rotateCamera(
        cameraRef.current,
        -dx * DRAG_SENSITIVITY,
        -dy * DRAG_SENSITIVITY
      );
    }
    draw();
  };

  const endPointer = (event: ReactPointerEvent<HTMLCanvasElement>): void => {
    pointersRef.current.delete(event.pointerId);
    pinchDistanceRef.current = null;
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLCanvasElement>): void => {
    const handled = (() => {
      switch (event.key) {
        case 'ArrowLeft':
          rotateBy(-KEY_ROTATE_STEP, 0);
          return true;
        case 'ArrowRight':
          rotateBy(KEY_ROTATE_STEP, 0);
          return true;
        case 'ArrowUp':
          rotateBy(0, KEY_ROTATE_STEP);
          return true;
        case 'ArrowDown':
          rotateBy(0, -KEY_ROTATE_STEP);
          return true;
        case '+':
        case '=':
          markInteracted();
          cameraRef.current = zoomCamera(cameraRef.current, 0.9);
          draw();
          return true;
        case '-':
        case '_':
          markInteracted();
          cameraRef.current = zoomCamera(cameraRef.current, 1.1);
          draw();
          return true;
        default:
          return false;
      }
    })();
    if (handled) event.preventDefault();
  };

  const stats = surface
    ? { zMin: surface.zMin, zMax: surface.zMax, finite: surface.finiteCount }
    : null;
  const ariaLabel = plot
    ? `3D surface plot of z equals ${plot.expression}. ` +
      (stats && stats.finite > 0
        ? `Over x and y from -5 to 5, z ranges from ${formatZ(stats.zMin)} to ${formatZ(stats.zMax)}. `
        : 'No finite values on the current grid. ') +
      'Drag to rotate, scroll or pinch to zoom. When focused, arrow keys rotate and plus/minus zoom.'
    : '3D surface plotter. No expression plotted yet.';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          applyExpression(source);
        }}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <label className="block flex-1">
          <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Surface: z = f(x, y)
          </span>
          <input
            type="text"
            value={source}
            onChange={(event) => setSource(event.target.value)}
            className={inputClass}
            spellCheck={false}
            autoComplete="off"
            placeholder="e.g. x^2 + y^2"
            aria-describedby="graph3d-hint"
          />
        </label>
        <button type="submit" className={buttonClass}>
          Plot
        </button>
      </form>

      {compileError && (
        <p
          role="alert"
          className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {compileError}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Preset surfaces">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            title={preset.description}
            className={presetButtonClass(plot?.expression === preset.expression)}
            onClick={() => {
              setSource(preset.expression);
              applyExpression(preset.expression);
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div
        ref={wrapRef}
        className="relative mt-4 h-72 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:h-96 dark:border-slate-700 dark:bg-slate-950"
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={ariaLabel}
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onKeyDown={handleKeyDown}
          className="h-full w-full touch-none cursor-grab focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 active:cursor-grabbing"
        />
      </div>
      <p id="graph3d-hint" className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Drag to rotate · scroll or pinch to zoom · focus the plot and use arrow keys / + / −
      </p>
      <p className="sr-only">
        {plot
          ? `Surface summary: z = ${plot.expression} on x and y from -5 to 5. ` +
            (stats && stats.finite > 0
              ? `Minimum z ${formatZ(stats.zMin)}, maximum z ${formatZ(stats.zMax)}, computed at ${stats.finite} grid points.`
              : 'No finite z values on the current grid.')
          : 'No surface plotted.'}
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1" role="group" aria-label="Grid resolution">
          <span className="mr-1 text-sm text-slate-600 dark:text-slate-300">Detail:</span>
          {RESOLUTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className={resolutionButtonClass(resolution === value)}
              aria-pressed={resolution === value}
              onClick={() => setResolution(value)}
            >
              {value}
            </button>
          ))}
        </div>
        {stats && stats.finite > 0 && (
          <p className="text-sm tabular-nums text-slate-600 dark:text-slate-300" aria-live="polite">
            z min <span className="font-semibold">{formatZ(stats.zMin)}</span>
            {' · '}z max <span className="font-semibold">{formatZ(stats.zMax)}</span>
            {zScale < 1 && (
              <span className="text-slate-500 dark:text-slate-400">
                {' '}
                (z-axis auto-scaled ×{zScale.toFixed(2)} to fit)
              </span>
            )}
          </p>
        )}
        {stats && stats.finite === 0 && plot && (
          <p className="text-sm text-amber-700 dark:text-amber-300" aria-live="polite">
            No finite values on this grid — try a different expression.
          </p>
        )}
      </div>
    </div>
  );
}
