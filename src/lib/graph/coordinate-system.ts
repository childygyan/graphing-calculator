/**
 * Pure world <-> screen coordinate transforms for the graph canvas.
 *
 * All transforms operate in CSS pixels and are DPR-independent by design —
 * device-pixel-ratio scaling is handled separately in transforms.ts. No DOM,
 * no React, no side effects: every function is a pure mapping.
 */

import type { GraphViewport } from '../../types/calculator.js';
import type { CanvasSize, ScreenPoint, WorldPoint } from './types.js';

export interface ViewportTransform {
  readonly viewport: GraphViewport;
  readonly size: CanvasSize;
  worldToScreen(point: WorldPoint): ScreenPoint;
  screenToWorld(point: ScreenPoint): WorldPoint;
  unitsPerPixelX(): number;
  unitsPerPixelY(): number;
  pixelsPerUnitX(): number;
  pixelsPerUnitY(): number;
}

/**
 * Build a transform for a viewport/size pair. Zero spans are guarded by
 * treating them as 1 so the math never divides by zero (a degenerate
 * viewport should be rejected earlier by validateViewport).
 */
export function createTransform(viewport: GraphViewport, size: CanvasSize): ViewportTransform {
  const rawXSpan = viewport.xMax - viewport.xMin;
  const rawYSpan = viewport.yMax - viewport.yMin;
  const xSpan = rawXSpan === 0 ? 1 : rawXSpan;
  const ySpan = rawYSpan === 0 ? 1 : rawYSpan;
  const { xMin, yMax } = viewport;
  const { width, height } = size;

  return {
    viewport,
    size,
    worldToScreen(point: WorldPoint): ScreenPoint {
      return {
        x: ((point.x - xMin) / xSpan) * width,
        y: ((yMax - point.y) / ySpan) * height,
      };
    },
    screenToWorld(point: ScreenPoint): WorldPoint {
      return {
        x: xMin + (point.x / width) * xSpan,
        y: yMax - (point.y / height) * ySpan,
      };
    },
    unitsPerPixelX(): number {
      return xSpan / width;
    },
    unitsPerPixelY(): number {
      return ySpan / height;
    },
    pixelsPerUnitX(): number {
      return width / xSpan;
    },
    pixelsPerUnitY(): number {
      return height / ySpan;
    },
  };
}

/**
 * Replace non-finite numbers (NaN, ±Infinity) with a fallback (default 0).
 * Use before any value reaches a canvas API or a pixel computation.
 */
export function sanitizeNumber(value: number, fallback = 0): number {
  return Number.isFinite(value) ? value : fallback;
}
