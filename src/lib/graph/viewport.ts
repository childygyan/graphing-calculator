/**
 * Viewport lifecycle: defaults, validation, zoom, pan, and fitting.
 *
 * Viewports are treated as immutable values — every function returns a fresh
 * object and never mutates its input. Zoom anchors keep their world point
 * fixed on screen; span clamping preserves the span center.
 */

import { DEFAULT_VIEWPORT } from '../expressions/expressions.js';
import type { GraphViewport } from '../../types/calculator.js';
import type { GraphDrawable, WorldPoint } from './types.js';

/** Smallest sane world span per axis (below this, ticks/grid break down). */
export const MIN_VIEWPORT_SPAN = 1e-9;

/** Largest sane world span per axis (above this, float precision breaks down). */
export const MAX_VIEWPORT_SPAN = 1e15;

function clampSpan(span: number): number {
  if (!Number.isFinite(span) || span <= 0) return MIN_VIEWPORT_SPAN;
  return Math.min(MAX_VIEWPORT_SPAN, Math.max(MIN_VIEWPORT_SPAN, span));
}

/** The Phase 1 default viewport (±10 on both axes), as a fresh object. */
export function createDefaultViewport(): GraphViewport {
  return { ...DEFAULT_VIEWPORT };
}

/**
 * Validate an unknown value as a viewport. Requires finite numbers and
 * xMin < xMax / yMin < yMax; clamps each span into
 * [MIN_VIEWPORT_SPAN, MAX_VIEWPORT_SPAN] while preserving the span center.
 * Returns a fresh object, or null when the value is not a usable viewport.
 */
export function validateViewport(value: unknown): GraphViewport | null {
  if (typeof value !== 'object' || value === null) return null;
  const v = value as Record<string, unknown>;
  const { xMin, xMax, yMin, yMax } = v;
  const isFiniteNumber = (n: unknown): n is number => typeof n === 'number' && Number.isFinite(n);
  if (
    !isFiniteNumber(xMin) ||
    !isFiniteNumber(xMax) ||
    !isFiniteNumber(yMin) ||
    !isFiniteNumber(yMax)
  ) {
    return null;
  }
  if (!(xMin < xMax) || !(yMin < yMax)) return null;
  const centerX = (xMin + xMax) / 2;
  const centerY = (yMin + yMax) / 2;
  const halfX = clampSpan(xMax - xMin) / 2;
  const halfY = clampSpan(yMax - yMin) / 2;
  return {
    xMin: centerX - halfX,
    xMax: centerX + halfX,
    yMin: centerY - halfY,
    yMax: centerY + halfY,
  };
}

/** Reset to the default viewport. */
export function resetViewport(): GraphViewport {
  return createDefaultViewport();
}

/**
 * Zoom the viewport around an anchor world point (defaults to the viewport
 * center). factor < 1 zooms in, factor > 1 zooms out. The anchor's world
 * position is preserved: bounds are recomputed from the anchor plus its
 * fractional position in the old viewport. Non-finite or non-positive
 * factors return an unchanged copy; resulting spans are clamped.
 */
export function zoomViewport(
  viewport: GraphViewport,
  factor: number,
  anchor?: WorldPoint
): GraphViewport {
  if (!Number.isFinite(factor) || factor <= 0) return { ...viewport };
  const xSpan = viewport.xMax - viewport.xMin;
  const ySpan = viewport.yMax - viewport.yMin;
  if (!(xSpan > 0) || !(ySpan > 0)) return { ...viewport };
  const a: WorldPoint = anchor ?? {
    x: (viewport.xMin + viewport.xMax) / 2,
    y: (viewport.yMin + viewport.yMax) / 2,
  };
  const fracX = (a.x - viewport.xMin) / xSpan;
  const fracY = (a.y - viewport.yMin) / ySpan;
  const newXSpan = clampSpan(xSpan * factor);
  const newYSpan = clampSpan(ySpan * factor);
  return {
    xMin: a.x - fracX * newXSpan,
    xMax: a.x + (1 - fracX) * newXSpan,
    yMin: a.y - fracY * newYSpan,
    yMax: a.y + (1 - fracY) * newYSpan,
  };
}

/**
 * Shift the viewport by world-unit deltas (xMin/xMax by shiftX,
 * yMin/yMax by shiftY). Non-finite shifts return an unchanged copy.
 */
export function panViewport(
  viewport: GraphViewport,
  shiftX: number,
  shiftY: number
): GraphViewport {
  if (!Number.isFinite(shiftX) || !Number.isFinite(shiftY)) return { ...viewport };
  return {
    xMin: viewport.xMin + shiftX,
    xMax: viewport.xMax + shiftX,
    yMin: viewport.yMin + shiftY,
    yMax: viewport.yMax + shiftY,
  };
}

/**
 * Fit the viewport to a set of drawables.
 *
 * Scans every visible function drawable's finite segment points for the
 * data bounds, pads each axis by 10% (minimum ±1 world unit on a
 * degenerate span), and clamps the result to the sane viewport limits.
 * Points with |y| > 1e6 are ignored: those are asymptote-clamped sampler
 * artifacts, and including them would zoom the view out to meaninglessness
 * (a known limitation for functions with vertical asymptotes — Reset view
 * restores the default). With no plottable points, returns a copy of
 * `fallback` (or the default viewport when omitted).
 */
export function fitViewportToDrawables(
  drawables: GraphDrawable[],
  fallback?: GraphViewport
): GraphViewport {
  const safeFallback = { ...(fallback ?? DEFAULT_VIEWPORT) };
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  let count = 0;

  for (const drawable of drawables ?? []) {
    if (!drawable || drawable.visible !== true || drawable.kind !== 'function') continue;
    const segments = Array.isArray(drawable.segments) ? drawable.segments : [];
    for (const segment of segments) {
      if (!Array.isArray(segment)) continue;
      for (const point of segment) {
        if (!point) continue;
        const { x, y } = point;
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        if (Math.abs(y) > 1e6) continue;
        if (x < xMin) xMin = x;
        if (x > xMax) xMax = x;
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
        count += 1;
      }
    }
  }

  if (count === 0) return safeFallback;

  const padX = Math.max((xMax - xMin) * 0.1, 1);
  const padY = Math.max((yMax - yMin) * 0.1, 1);
  return (
    validateViewport({
      xMin: xMin - padX,
      xMax: xMax + padX,
      yMin: yMin - padY,
      yMax: yMax + padY,
    }) ?? safeFallback
  );
}
