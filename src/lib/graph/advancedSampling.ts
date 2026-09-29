/**
 * Phase 5 advanced samplers: parametric, polar, and inequality regions.
 *
 * sampleParametric walks a (x(t), y(t)) pair over [tMin, tMax] with the
 * same honest-gap philosophy as the cartesian sampler: non-finite points
 * break the polyline, chords far outside the visible band are dropped
 * (asymptote streaks), and adaptive bisection refines high-curvature runs
 * using world-space chord deviation.
 *
 * samplePolar is a thin wrapper: r(theta) over theta in [0, 2*PI] becomes
 * the parametric pair (r*cos, r*sin), so pole crossings and theta wrap
 * fall out naturally.
 *
 * sampleInequality builds filled region polygons plus a boundary curve:
 * y-based inequalities reuse the adaptive cartesian sampler; x-based ones
 * sweep y uniformly (512 columns is sub-pixel vertically).
 */

import type { GraphViewport } from '../../types/calculator.js';
import type { CanvasSize, WorldPoint } from './types.js';
import { sampleCartesian } from './sampling.js';
import type { SampledCurve } from './sampling.js';

export interface ParametricSampleOptions {
  /** Hard cap on total function evaluations (default 65536). */
  maxSamples?: number;
  /** Maximum bisection depth per base interval (default 8). */
  maxDepth?: number;
  /** Curvature tolerance in world units (default min(xSpan, ySpan) / 400). */
  tolerance?: number;
  /** Uniform base samples before refinement (default 256). */
  baseSamples?: number;
}

/** Full polar sweep: theta in [0, 2*PI]. */
export const POLAR_THETA_MIN = 0;
export const POLAR_THETA_MAX = Math.PI * 2;

const DEFAULT_PARAM_MAX_SAMPLES = 65536;
const DEFAULT_PARAM_MAX_DEPTH = 8;
const DEFAULT_PARAM_BASE_SAMPLES = 256;
/** Emitted coordinates are clamped to ±CLIP_SPANS viewport spans. */
const CLIP_SPANS = 1e4;
/** Chords longer than this many canvas diagonals are split. */
const MAX_SCREEN_JUMP_DIAGONALS = 8;
/** A point farther than this many spans from the visible band is off-screen. */
const OFFSCREEN_SPANS = 32;
const MIN_BASE_SAMPLES = 2;
const MAX_BASE_SAMPLES = 2048;

function isValidRange(min: number, max: number): boolean {
  return Number.isFinite(min) && Number.isFinite(max) && min < max;
}

interface ParamPoint {
  t: number;
  x: number;
  y: number;
  ok: boolean;
}

/**
 * Sample the parametric curve (x(t), y(t)) for t in [tMin, tMax].
 * Pure math — no canvas, no DOM.
 */
export function sampleParametric(
  xFn: (t: number) => number,
  yFn: (t: number) => number,
  tMin: number,
  tMax: number,
  viewport: GraphViewport,
  size: CanvasSize,
  options: ParametricSampleOptions = {}
): SampledCurve {
  const empty: SampledCurve = { segments: [], sampleCount: 0 };
  const xSpan = viewport.xMax - viewport.xMin;
  const ySpan = viewport.yMax - viewport.yMin;
  if (
    typeof xFn !== 'function' ||
    typeof yFn !== 'function' ||
    !isValidRange(tMin, tMax) ||
    !isValidRange(viewport.xMin, viewport.xMax) ||
    !isValidRange(viewport.yMin, viewport.yMax) ||
    !Number.isFinite(size.width) ||
    !Number.isFinite(size.height) ||
    size.width <= 0 ||
    size.height <= 0
  ) {
    return empty;
  }

  const maxSamples = Math.max(16, Math.floor(options.maxSamples ?? DEFAULT_PARAM_MAX_SAMPLES));
  const maxDepth = Math.max(0, Math.floor(options.maxDepth ?? DEFAULT_PARAM_MAX_DEPTH));
  const tolerance =
    options.tolerance !== undefined && options.tolerance > 0
      ? options.tolerance
      : Math.min(xSpan, ySpan) / 400;
  const baseCount = Math.min(
    MAX_BASE_SAMPLES,
    Math.max(MIN_BASE_SAMPLES, Math.floor(options.baseSamples ?? DEFAULT_PARAM_BASE_SAMPLES)),
    maxSamples
  );

  const points: ParamPoint[] = [];
  let sampleCount = 0;

  const evaluate = (t: number): ParamPoint => {
    sampleCount += 1;
    let x = NaN;
    let y = NaN;
    try {
      x = xFn(t);
      y = yFn(t);
    } catch {
      // Hostile input collapses to a gap, never a throw.
    }
    const ok =
      typeof x === 'number' && typeof y === 'number' && Number.isFinite(x) && Number.isFinite(y);
    return { t, x: ok ? x : NaN, y: ok ? y : NaN, ok };
  };

  for (let i = 0; i < baseCount; i += 1) {
    points.push(evaluate(tMin + ((tMax - tMin) * i) / (baseCount - 1)));
  }

  /** Leaf intervals accepted for drawing, as [ia, ib] point indices. */
  const leaves: Array<[number, number]> = [];
  /** Point indices before which the polyline must break. */
  const breakBefore = new Set<number>();
  /** Base-interval starts whose midpoint was non-finite: drawing the chord
   *  between the finite endpoints would streak through the singularity. */
  const singularLeaves = new Set<number>();

  const refine = (ia: number, ib: number, depth: number): void => {
    const a = points[ia];
    const b = points[ib];
    if (!a.ok || !b.ok || sampleCount >= maxSamples) {
      breakBefore.add(ib);
      leaves.push([ia, ib]);
      return;
    }
    const midT = (a.t + b.t) / 2;
    const m = evaluate(midT);
    if (!m.ok) {
      singularLeaves.add(ia);
      leaves.push([ia, ib]);
      return;
    }
    // World-space deviation of the true midpoint from the chord midpoint.
    const deviation = Math.hypot(m.x - (a.x + b.x) / 2, m.y - (a.y + b.y) / 2);
    if (deviation > tolerance && depth < maxDepth) {
      const im = points.length;
      points.push(m);
      refine(ia, im, depth + 1);
      refine(im, ib, depth + 1);
      return;
    }
    leaves.push([ia, ib]);
  };

  for (let i = 0; i + 1 < baseCount; i += 1) {
    refine(i, i + 1, 0);
  }

  // Leaves were collected depth-first; restore t order.
  leaves.sort((p, q) => points[p[0]].t - points[q[0]].t);

  const centerX = (viewport.xMin + viewport.xMax) / 2;
  const centerY = (viewport.yMin + viewport.yMax) / 2;
  const offscreenX = OFFSCREEN_SPANS * xSpan;
  const offscreenY = OFFSCREEN_SPANS * ySpan;
  const clipLoX = centerX - CLIP_SPANS * xSpan;
  const clipHiX = centerX + CLIP_SPANS * xSpan;
  const clipLoY = centerY - CLIP_SPANS * ySpan;
  const clipHiY = centerY + CLIP_SPANS * ySpan;
  const pixelsPerUnitX = size.width / xSpan;
  const pixelsPerUnitY = size.height / ySpan;
  const diagonal = Math.hypot(size.width, size.height);
  const maxScreenJump = MAX_SCREEN_JUMP_DIAGONALS * diagonal;

  const clampX = (x: number): number => Math.min(clipHiX, Math.max(clipLoX, x));
  const clampY = (y: number): number => Math.min(clipHiY, Math.max(clipLoY, y));
  const isOffscreen = (x: number, y: number): boolean =>
    Math.abs(x - centerX) > offscreenX || Math.abs(y - centerY) > offscreenY;

  const segments: WorldPoint[][] = [];
  let current: WorldPoint[] = [];
  let lastPushed: ParamPoint | null = null;

  const pushPoint = (p: ParamPoint): void => {
    if (!p.ok || p === lastPushed) return;
    current.push({ x: clampX(p.x), y: clampY(p.y) });
    lastPushed = p;
  };

  const flush = (): void => {
    if (current.length > 0) segments.push(current);
    current = [];
    lastPushed = null;
  };

  for (const [ia, ib] of leaves) {
    const a = points[ia];
    const b = points[ib];
    if (breakBefore.has(ia)) flush();
    if (singularLeaves.has(ia)) {
      flush();
      continue;
    }
    if (!a.ok || !b.ok) {
      flush();
      continue;
    }
    if (isOffscreen(a.x, a.y) && isOffscreen(b.x, b.y)) {
      // Both endpoints far outside the visible band: the chord is either
      // invisible or an asymptote streak. Drop it and break here.
      flush();
      breakBefore.add(ib);
      continue;
    }
    // Streak guard: a chord leaping many screen diagonals is split into
    // per-endpoint pieces so a missed discontinuity can never streak.
    const screenJump = Math.hypot((b.x - a.x) * pixelsPerUnitX, (b.y - a.y) * pixelsPerUnitY);
    if (screenJump > maxScreenJump) {
      pushPoint(a);
      flush();
      pushPoint(b);
      continue;
    }
    pushPoint(a);
    pushPoint(b);
  }
  flush();

  return { segments, sampleCount };
}

/**
 * Sample the polar curve r(theta) over theta in [0, 2*PI], converted to
 * Cartesian world coordinates. Negative r and pole crossings are handled
 * by the plain (r*cos, r*sin) mapping; theta wrap needs no special case
 * because the sweep is continuous and closed (both endpoints sampled).
 */
export function samplePolar(
  rFn: (theta: number) => number,
  viewport: GraphViewport,
  size: CanvasSize,
  options: ParametricSampleOptions = {}
): SampledCurve {
  const xFn = (theta: number): number => {
    const r = rFn(theta);
    return r * Math.cos(theta);
  };
  const yFn = (theta: number): number => {
    const r = rFn(theta);
    return r * Math.sin(theta);
  };
  return sampleParametric(xFn, yFn, POLAR_THETA_MIN, POLAR_THETA_MAX, viewport, size, {
    ...options,
    baseSamples: options.baseSamples ?? 720,
  });
}

export type InequalitySide = 'y' | 'x';
export type InequalityOperator = '<' | '<=' | '>' | '>=';

export interface SampledInequality {
  /** Filled region polygons (closed rings) in world coordinates. */
  polygons: WorldPoint[][];
  /** Boundary curve segments in world coordinates. */
  boundary: WorldPoint[][];
  /** Total function evaluations performed. */
  sampleCount: number;
}

/**
 * Sample an inequality region. For `y </<=/>/>= f(x)`, f is sampled
 * adaptively across the viewport's x-range and the region extends to the
 * viewport's bottom (</<=) or top (>/>=) edge. For `x </<=/>/>= g(y)`, g
 * is swept uniformly over the y-range and the region extends to the
 * viewport's left (</<=) or right (>/>=) edge.
 *
 * Pure math — no canvas, no DOM.
 */
export function sampleInequality(
  side: InequalitySide,
  operator: InequalityOperator,
  fn: (v: number) => number,
  viewport: GraphViewport,
  size: CanvasSize
): SampledInequality {
  const empty: SampledInequality = { polygons: [], boundary: [], sampleCount: 0 };
  if (
    (side !== 'y' && side !== 'x') ||
    typeof fn !== 'function' ||
    !isValidRange(viewport.xMin, viewport.xMax) ||
    !isValidRange(viewport.yMin, viewport.yMax) ||
    !Number.isFinite(size.width) ||
    !Number.isFinite(size.height) ||
    size.width <= 0 ||
    size.height <= 0
  ) {
    return empty;
  }

  const below = operator === '<' || operator === '<=';

  if (side === 'y') {
    const { segments, sampleCount } = sampleCartesian(
      fn,
      viewport.xMin,
      viewport.xMax,
      viewport,
      size
    );
    const edge = below ? viewport.yMin : viewport.yMax;
    const polygons: WorldPoint[][] = [];
    for (const segment of segments) {
      if (segment.length === 0) continue;
      const first = segment[0];
      const last = segment[segment.length - 1];
      polygons.push([{ x: first.x, y: edge }, ...segment, { x: last.x, y: edge }]);
    }
    return { polygons, boundary: segments, sampleCount };
  }

  // x-based: sweep y uniformly; 720 rows is sub-pixel vertically.
  const rows = 720;
  let sampleCount = 0;
  const segments: WorldPoint[][] = [];
  let current: WorldPoint[] = [];
  const flush = (): void => {
    if (current.length > 0) segments.push(current);
    current = [];
  };
  for (let i = 0; i < rows; i += 1) {
    const y = viewport.yMin + ((viewport.yMax - viewport.yMin) * i) / (rows - 1);
    sampleCount += 1;
    let x = NaN;
    try {
      x = fn(y);
    } catch {
      x = NaN;
    }
    if (typeof x !== 'number' || !Number.isFinite(x)) {
      flush();
      continue;
    }
    current.push({ x, y });
  }
  flush();
  const edge = below ? viewport.xMin : viewport.xMax;
  const polygons: WorldPoint[][] = [];
  for (const segment of segments) {
    if (segment.length === 0) continue;
    const first = segment[0];
    const last = segment[segment.length - 1];
    polygons.push([{ x: edge, y: first.y }, ...segment, { x: edge, y: last.y }]);
  }
  return { polygons, boundary: segments, sampleCount };
}
