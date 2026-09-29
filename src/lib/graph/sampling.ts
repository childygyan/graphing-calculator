/**
 * Phase 3 adaptive sampler: compiled (x) => y function → world-coordinate
 * polyline segments for the renderer's FunctionDrawable.
 *
 * Strategy:
 *  1. Base samples: one per CSS-pixel column across the viewport's x-range.
 *  2. Adaptive refinement: recursively bisect intervals where the true
 *     midpoint deviates from the chord midpoint by more than a tolerance
 *     (a fraction of the visible y-span), up to maxDepth and a global
 *     sample budget. High-curvature regions (oscillations, tight bends)
 *     get more points; straight runs stay at pixel resolution.
 *  3. Discontinuity splitting: an interval with a non-finite endpoint or
 *     midpoint (division by zero, sqrt/log domain edges, removable
 *     discontinuities) breaks the polyline there — never a streak through
 *     the singularity. Intervals whose endpoints are both far off-screen
 *     (32+ viewport spans away) are dropped as well: same-side chords are
 *     invisible anyway, and opposite-side chords are asymptote streaks.
 *     As a final guard, any surviving chord whose screen-space vertical
 *     jump exceeds several canvas heights is split into per-column pieces
 *     (visually identical for genuinely steep curves).
 *
 * Pure math — no canvas, no DOM. Emitted y values are clamped to ±1e4
 * viewport spans so downstream pixel math stays in a sane range.
 */

import type { GraphViewport } from '../../types/calculator.js';
import type { CanvasSize, WorldPoint } from './types.js';

export interface SampleOptions {
  /** Hard cap on total function evaluations (default 65536). */
  maxSamples?: number;
  /** Maximum bisection depth per base interval (default 10). */
  maxDepth?: number;
  /** Curvature tolerance in world y units (default ySpan / 400). */
  toleranceY?: number;
}

export interface SampledCurve {
  /** Disjoint polylines in world coordinates. */
  segments: WorldPoint[][];
  /** Total function evaluations performed. */
  sampleCount: number;
}

interface SamplePoint {
  x: number;
  y: number;
  ok: boolean;
}

const DEFAULT_MAX_SAMPLES = 65536;
const DEFAULT_MAX_DEPTH = 10;
/** Emitted y is clamped to ±CLIP_SPANS viewport spans. */
const CLIP_SPANS = 1e4;
/** Chords jumping more than this many canvas heights are split. */
const MAX_SCREEN_JUMP_HEIGHTS = 8;
/** A point farther than this many spans from the visible band is off-screen. */
const OFFSCREEN_SPANS = 32;
/** Base column count is clamped to this range. */
const MIN_BASE_SAMPLES = 2;
const MAX_BASE_SAMPLES = 2048;

function isValidRange(min: number, max: number): boolean {
  return Number.isFinite(min) && Number.isFinite(max) && min < max;
}

export function sampleCartesian(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  viewport: GraphViewport,
  size: CanvasSize,
  options: SampleOptions = {}
): SampledCurve {
  const empty: SampledCurve = { segments: [], sampleCount: 0 };
  const ySpan = viewport.yMax - viewport.yMin;
  if (
    typeof fn !== 'function' ||
    !isValidRange(xMin, xMax) ||
    !isValidRange(viewport.yMin, viewport.yMax) ||
    !Number.isFinite(size.width) ||
    !Number.isFinite(size.height) ||
    size.width <= 0 ||
    size.height <= 0
  ) {
    return empty;
  }

  const maxSamples = Math.max(16, Math.floor(options.maxSamples ?? DEFAULT_MAX_SAMPLES));
  const maxDepth = Math.max(0, Math.floor(options.maxDepth ?? DEFAULT_MAX_DEPTH));
  const toleranceY =
    options.toleranceY !== undefined && options.toleranceY > 0 ? options.toleranceY : ySpan / 400;

  // Base columns: one per CSS pixel, clamped, and never more than the
  // total sample budget allows.
  const baseCount = Math.min(
    MAX_BASE_SAMPLES,
    Math.max(MIN_BASE_SAMPLES, Math.ceil(size.width)),
    maxSamples
  );

  const points: SamplePoint[] = [];
  let sampleCount = 0;

  const evaluate = (x: number): SamplePoint => {
    sampleCount += 1;
    let y: number;
    try {
      y = fn(x);
    } catch {
      y = NaN;
    }
    const ok = typeof y === 'number' && Number.isFinite(y);
    return { x, y: ok ? y : NaN, ok };
  };

  for (let i = 0; i < baseCount; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / (baseCount - 1);
    points.push(evaluate(x));
  }

  /** Leaf intervals accepted for drawing, as [ia, ib] point indices. */
  const leaves: Array<[number, number]> = [];
  /** Point indices before which the polyline must break. */
  const breakBefore = new Set<number>();
  /** Base-interval starts whose midpoint was non-finite: the chord between
   *  the finite endpoints would streak through the singularity, so the
   *  walk skips these leaves entirely. */
  const singularLeaves = new Set<number>();

  const refine = (ia: number, ib: number, depth: number): void => {
    const a = points[ia];
    const b = points[ib];
    if (!a.ok || !b.ok || sampleCount >= maxSamples) {
      // Singular interval (or exhausted budget): break here, and still
      // record the leaf so each finite endpoint is drawn.
      breakBefore.add(ib);
      leaves.push([ia, ib]);
      return;
    }
    const midX = (a.x + b.x) / 2;
    const m = evaluate(midX);
    if (!m.ok) {
      // The singularity lies strictly inside: the chord between the
      // finite endpoints would streak across it, so the walk drops this
      // leaf and breaks the polyline on both sides.
      singularLeaves.add(ia);
      leaves.push([ia, ib]);
      return;
    }
    const chordMid = (a.y + b.y) / 2;
    if (Math.abs(m.y - chordMid) > toleranceY && depth < maxDepth) {
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

  // Leaves were collected depth-first; restore x order.
  leaves.sort((p, q) => points[p[0]].x - points[q[0]].x);

  const pixelsPerUnitY = size.height / ySpan;
  const maxScreenJump = MAX_SCREEN_JUMP_HEIGHTS * size.height;
  const centerY = (viewport.yMin + viewport.yMax) / 2;
  /** Points farther than this from the visible band are off-screen. */
  const offscreenDistance = OFFSCREEN_SPANS * ySpan;
  const clipLo = centerY - CLIP_SPANS * ySpan;
  const clipHi = centerY + CLIP_SPANS * ySpan;

  const clampY = (y: number): number => Math.min(clipHi, Math.max(clipLo, y));
  const isOffscreen = (y: number): boolean => Math.abs(y - centerY) > offscreenDistance;

  const segments: WorldPoint[][] = [];
  let current: WorldPoint[] = [];
  let lastPushed: SamplePoint | null = null;

  const pushPoint = (p: SamplePoint): void => {
    if (!p.ok || p === lastPushed) return;
    current.push({ x: p.x, y: clampY(p.y) });
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
      // The singularity lies strictly inside this interval: end the
      // previous segment here and drop the chord between the finite
      // endpoints — drawing it would streak across the discontinuity.
      flush();
      continue;
    }
    if (!a.ok || !b.ok) {
      // A singular leaf: the NaN endpoint already forced a break above;
      // lone finite endpoints cannot stroke on their own.
      flush();
      continue;
    }
    if (isOffscreen(a.y) && isOffscreen(b.y)) {
      // Both endpoints far outside the visible band: the chord is either
      // invisible (same side) or a streak through an asymptote (opposite
      // sides). Drop it and break the polyline here.
      flush();
      breakBefore.add(ib);
      continue;
    }
    // Streak guard: a chord leaping many screen heights with at least one
    // endpoint near the view is split. For genuinely steep (but continuous)
    // curves this only subdivides the stroke into per-column pieces, which
    // render identically — while a missed asymptote can never streak.
    const screenJump = Math.abs(b.y - a.y) * pixelsPerUnitY;
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
