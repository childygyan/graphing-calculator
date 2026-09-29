/**
 * Graph engine abstraction boundary.
 *
 * Phase 1 is foundation only: this file defines the canvas/viewport
 * interface and ships a placeholder implementation that does honest
 * bookkeeping (attach, viewport, resize, coordinate transforms, zoom, pan)
 * while rendering methods are intentional no-ops. Real canvas rendering
 * lands in Phase 2. The placeholder never draws and never throws.
 */

import type { CalculatorState, GraphViewport } from '../../types/calculator.js';
import { DEFAULT_VIEWPORT } from '../expressions/expressions.js';

/** CSS pixels, origin at the canvas top-left. */
export interface ScreenPoint {
  x: number;
  y: number;
}

/** Math coordinates in the current viewport. */
export interface WorldPoint {
  x: number;
  y: number;
}

export interface GraphEngine {
  attach(canvas: HTMLCanvasElement): void;
  detach(): void;
  setViewport(viewport: GraphViewport): void;
  getViewport(): GraphViewport;
  renderGraph(state: CalculatorState): void;
  plotFunction(definition: unknown): void;
  renderAxes(): void;
  renderGrid(): void;
  screenToWorld(point: ScreenPoint): WorldPoint;
  worldToScreen(point: WorldPoint): ScreenPoint;
  zoom(factor: number, center?: ScreenPoint): void;
  /**
   * Pan the view by screen-pixel deltas (positive deltaX moves the view
   * content right, i.e. the viewport shifts left in world units).
   */
  pan(deltaX: number, deltaY: number): void;
  resize(width: number, height: number): void;
}

const MIN_ZOOM_FACTOR = 0.05;
const MAX_ZOOM_FACTOR = 20;

export class PlaceholderGraphEngine implements GraphEngine {
  private canvas: HTMLCanvasElement | null = null;
  private viewport: GraphViewport = { ...DEFAULT_VIEWPORT };
  private width = 0;
  private height = 0;

  attach(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
  }

  detach(): void {
    this.canvas = null;
  }

  setViewport(viewport: GraphViewport): void {
    this.viewport = { ...viewport };
  }

  getViewport(): GraphViewport {
    return { ...this.viewport };
  }

  resize(width: number, height: number): void {
    this.width = Number.isFinite(width) && width > 0 ? width : 0;
    this.height = Number.isFinite(height) && height > 0 ? height : 0;
  }

  /**
   * Pure linear coordinate transform (not rendering). Falls back to a size
   * of 1 CSS pixel when the canvas has no measured size yet, to avoid
   * divide-by-zero before the first resize.
   */
  screenToWorld(point: ScreenPoint): WorldPoint {
    const width = this.width > 0 ? this.width : 1;
    const height = this.height > 0 ? this.height : 1;
    const { xMin, xMax, yMin, yMax } = this.viewport;
    return {
      x: xMin + (point.x / width) * (xMax - xMin),
      y: yMax - (point.y / height) * (yMax - yMin),
    };
  }

  worldToScreen(point: WorldPoint): ScreenPoint {
    const width = this.width > 0 ? this.width : 1;
    const height = this.height > 0 ? this.height : 1;
    const { xMin, xMax, yMin, yMax } = this.viewport;
    const xSpan = xMax - xMin === 0 ? 1 : xMax - xMin;
    const ySpan = yMax - yMin === 0 ? 1 : yMax - yMin;
    return {
      x: ((point.x - xMin) / xSpan) * width,
      y: ((yMax - point.y) / ySpan) * height,
    };
  }

  /**
   * Scale the viewport around a screen point (defaults to canvas center).
   * factor < 1 zooms in, factor > 1 zooms out. Non-finite or non-positive
   * factors are ignored; the factor is clamped to [0.05, 20].
   */
  zoom(factor: number, center?: ScreenPoint): void {
    if (!Number.isFinite(factor) || factor <= 0) return;
    const clamped = Math.min(MAX_ZOOM_FACTOR, Math.max(MIN_ZOOM_FACTOR, factor));
    const anchor = center ?? { x: this.width / 2, y: this.height / 2 };
    const worldAnchor = this.screenToWorld(anchor);
    const { xMin, xMax, yMin, yMax } = this.viewport;
    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;
    if (xSpan === 0 || ySpan === 0) return;
    const fx = (worldAnchor.x - xMin) / xSpan;
    const fy = (worldAnchor.y - yMin) / ySpan;
    const newXSpan = xSpan * clamped;
    const newYSpan = ySpan * clamped;
    this.viewport = {
      xMin: worldAnchor.x - fx * newXSpan,
      xMax: worldAnchor.x + (1 - fx) * newXSpan,
      yMin: worldAnchor.y - fy * newYSpan,
      yMax: worldAnchor.y + (1 - fy) * newYSpan,
    };
  }

  /**
   * Shift the viewport by screen-pixel deltas, converted to world units.
   * Non-finite deltas are ignored.
   */
  pan(deltaX: number, deltaY: number): void {
    if (!Number.isFinite(deltaX) || !Number.isFinite(deltaY)) return;
    const width = this.width > 0 ? this.width : 1;
    const height = this.height > 0 ? this.height : 1;
    const { xMin, xMax, yMin, yMax } = this.viewport;
    const dxWorld = (deltaX / width) * (xMax - xMin);
    const dyWorld = (deltaY / height) * (yMax - yMin);
    this.viewport = {
      xMin: xMin - dxWorld,
      xMax: xMax - dxWorld,
      yMin: yMin + dyWorld,
      yMax: yMax + dyWorld,
    };
  }

  // --- Rendering: intentionally no-ops in Phase 1. Canvas drawing,
  // grid/axes/tick rendering, and function plotting arrive in Phase 2. ---
  renderGraph(_state: CalculatorState): void {
    // Phase 2: draw all visible expressions, axes, and grid for `state`.
  }

  plotFunction(_definition: unknown): void {
    // Phase 2: plot a single function definition.
  }

  renderAxes(): void {
    // Phase 2: draw x/y axes with tick labels.
  }

  renderGrid(): void {
    // Phase 2: draw the background grid.
  }
}

export function createGraphEngine(): GraphEngine {
  return new PlaceholderGraphEngine();
}
