/**
 * CanvasGraphRenderer: imperative 2D canvas renderer for the graph engine.
 *
 * Draw order per frame: background -> minor/major grid -> axes -> tick
 * labels -> origin marker -> drawables. The renderer accepts precomputed
 * drawable data and strokes it — it never samples or evaluates math
 * expressions (that is Phase 3's job). Rendering happens only via explicit
 * render()/scheduleRender()/resize() calls; there are no timers or loops.
 * Every computed pixel is finite-checked before it reaches a canvas API.
 */

import type { GraphViewport, GraphSettings } from '../../types/calculator.js';
import { computeAxes } from './axes.js';
import type { AxisRenderSpec } from './axes.js';
import { createTransform, sanitizeNumber } from './coordinate-system.js';
import type { ViewportTransform } from './coordinate-system.js';
import { computeGrid } from './grid.js';
import type { GridLine } from './grid.js';
import { resolveGraphTheme } from './theme.js';
import type { GraphTheme } from './theme.js';
import { setupCanvas, snapToPixel } from './transforms.js';
import type {
  CanvasSize,
  GraphDrawable,
  GraphRenderInput,
  GraphThemeMode,
  WorldPoint,
} from './types.js';
import { createDefaultViewport, validateViewport } from './viewport.js';

export interface GraphRenderer {
  initialize(canvas: HTMLCanvasElement): void;
  resize(cssWidth: number, cssHeight: number): void;
  render(input: GraphRenderInput): void;
  setViewport(viewport: GraphViewport): void;
  setTheme(mode: GraphThemeMode): void;
  getViewport(): GraphViewport;
  getSize(): CanvasSize;
  destroy(): void;
}

const TICK_FONT = '11px system-ui, sans-serif';
/** Labels closer than this to the canvas edge are skipped. */
const LABEL_EDGE_MARGIN = 4;
/** Vertical gap between an axis line and its tick labels. */
const LABEL_AXIS_GAP = 6;
/** Distance of edge-pinned labels from the canvas edge. */
const LABEL_EDGE_OFFSET = 6;

function isValidSize(value: unknown): value is CanvasSize {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.width === 'number' &&
    typeof v.height === 'number' &&
    Number.isFinite(v.width) &&
    Number.isFinite(v.height) &&
    v.width > 0 &&
    v.height > 0
  );
}

function sanitizeSettings(settings: GraphSettings): GraphSettings {
  const s = (settings ?? {}) as Partial<GraphSettings>;
  return {
    showGrid: s.showGrid === true,
    showAxes: s.showAxes === true,
    showAxisLabels: s.showAxisLabels === true,
    degreeMode: s.degreeMode === true,
    squareAspectRatio: s.squareAspectRatio === true,
  };
}

export class CanvasGraphRenderer implements GraphRenderer {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private size: CanvasSize | null = null;
  private viewport: GraphViewport = createDefaultViewport();
  private themeMode: GraphThemeMode = 'light';
  private lastInput: GraphRenderInput | null = null;
  private pendingInput: GraphRenderInput | null = null;
  private rafId: number | null = null;

  /**
   * Attach to a canvas and grab its 2D context. Throws when 2D is not
   * supported (the React error boundary catches this). No sizing happens
   * here — that waits for the first resize() call.
   */
  initialize(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D not supported');
    this.canvas = canvas;
    this.ctx = ctx;
  }

  /**
   * Resize the backing store (DPR-aware) and re-render the last input when
   * one exists. Non-positive/non-finite sizes are ignored.
   */
  resize(cssWidth: number, cssHeight: number): void {
    if (!this.canvas) return;
    if (
      !Number.isFinite(cssWidth) ||
      !Number.isFinite(cssHeight) ||
      cssWidth <= 0 ||
      cssHeight <= 0
    ) {
      return;
    }
    const setup = setupCanvas(this.canvas, cssWidth, cssHeight);
    if (!setup) return;
    this.ctx = setup.ctx;
    this.size = { width: setup.cssWidth, height: setup.cssHeight };
    if (this.lastInput) this.render({ ...this.lastInput, size: this.size });
  }

  /**
   * Render one frame synchronously. Inputs are sanitized first: the
   * viewport is validated (falling back to the default), settings booleans
   * are coerced, the size falls back to the last known size, and the theme
   * falls back to 'light'. When no usable size exists, rendering is skipped.
   */
  render(input: GraphRenderInput): void {
    const ctx = this.ctx;
    if (!ctx) return;
    const viewport = validateViewport(input.viewport) ?? createDefaultViewport();
    const settings = sanitizeSettings(input.settings);
    const size = isValidSize(input.size)
      ? { width: input.size.width, height: input.size.height }
      : this.size
        ? { ...this.size }
        : null;
    if (!size) return;
    const themeMode: GraphThemeMode = input.theme === 'dark' ? 'dark' : 'light';
    const drawables = Array.isArray(input.drawables) ? input.drawables : [];

    this.viewport = viewport;
    this.themeMode = themeMode;
    this.size = size;
    this.lastInput = { viewport, settings, size, theme: themeMode, drawables };

    const theme = resolveGraphTheme(themeMode);
    const { width, height } = size;
    const transform = createTransform(viewport, size);
    const axes = computeAxes(viewport, size);

    // 1. Background.
    ctx.fillStyle = theme.background;
    ctx.fillRect(0, 0, width, height);

    // 2. Grid.
    if (settings.showGrid) this.drawGrid(ctx, theme, viewport, size);

    // 3. Axes.
    if (settings.showAxes) this.drawAxisLines(ctx, theme, axes, width, height);

    // 4. Tick labels.
    if (settings.showAxisLabels) this.drawTickLabels(ctx, theme, axes, width, height);

    // 5. Origin marker.
    if (settings.showAxes) this.drawOriginMarker(ctx, transform, theme, axes);

    // 6. Drawables.
    this.drawDrawables(ctx, transform, drawables);
  }

  /**
   * Coalesced render: replaces any pending frame instead of queuing another,
   * so rapid interaction updates collapse into one rAF. Falls back to a
   * synchronous render where requestAnimationFrame is unavailable.
   */
  scheduleRender(input: GraphRenderInput): void {
    if (typeof requestAnimationFrame === 'undefined') {
      this.render(input);
      return;
    }
    this.pendingInput = input;
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      const pending = this.pendingInput;
      this.pendingInput = null;
      if (pending) this.render(pending);
    });
  }

  setViewport(viewport: GraphViewport): void {
    this.viewport = validateViewport(viewport) ?? createDefaultViewport();
  }

  setTheme(mode: GraphThemeMode): void {
    this.themeMode = mode === 'dark' ? 'dark' : 'light';
  }

  getViewport(): GraphViewport {
    return { ...this.viewport };
  }

  getSize(): CanvasSize {
    return this.size ? { ...this.size } : { width: 0, height: 0 };
  }

  /** Cancel any pending frame and release all references. */
  destroy(): void {
    if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = null;
    this.pendingInput = null;
    this.lastInput = null;
    this.canvas = null;
    this.ctx = null;
    this.size = null;
  }

  private drawGrid(
    ctx: CanvasRenderingContext2D,
    theme: GraphTheme,
    viewport: GraphViewport,
    size: CanvasSize
  ): void {
    const grid = computeGrid(viewport, size);
    const { width, height } = size;
    this.strokeLineGroup(
      ctx,
      grid.vertical.filter((line) => !line.major),
      grid.horizontal.filter((line) => !line.major),
      theme.gridMinor,
      width,
      height
    );
    this.strokeLineGroup(
      ctx,
      grid.vertical.filter((line) => line.major),
      grid.horizontal.filter((line) => line.major),
      theme.gridMajor,
      width,
      height
    );
  }

  /** One beginPath/stroke per line group — no per-line save/restore. */
  private strokeLineGroup(
    ctx: CanvasRenderingContext2D,
    vertical: GridLine[],
    horizontal: GridLine[],
    style: string,
    width: number,
    height: number
  ): void {
    if (vertical.length === 0 && horizontal.length === 0) return;
    ctx.strokeStyle = style;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const line of vertical) {
      const p = snapToPixel(line.pixel);
      if (!Number.isFinite(p)) continue;
      ctx.moveTo(p, 0);
      ctx.lineTo(p, height);
    }
    for (const line of horizontal) {
      const p = snapToPixel(line.pixel);
      if (!Number.isFinite(p)) continue;
      ctx.moveTo(0, p);
      ctx.lineTo(width, p);
    }
    ctx.stroke();
  }

  private drawAxisLines(
    ctx: CanvasRenderingContext2D,
    theme: GraphTheme,
    axes: { xAxis: AxisRenderSpec; yAxis: AxisRenderSpec },
    width: number,
    height: number
  ): void {
    ctx.strokeStyle = theme.axis;
    ctx.lineWidth = 1.5;
    if (axes.xAxis.visible && Number.isFinite(axes.xAxis.pixel)) {
      const p = snapToPixel(axes.xAxis.pixel);
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(width, p);
      ctx.stroke();
    }
    if (axes.yAxis.visible && Number.isFinite(axes.yAxis.pixel)) {
      const p = snapToPixel(axes.yAxis.pixel);
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, height);
      ctx.stroke();
    }
  }

  private drawTickLabels(
    ctx: CanvasRenderingContext2D,
    theme: GraphTheme,
    axes: { xAxis: AxisRenderSpec; yAxis: AxisRenderSpec },
    width: number,
    height: number
  ): void {
    ctx.font = TICK_FONT;
    ctx.fillStyle = theme.tickLabel;

    // X labels: below the axis line, or pinned to the bottom edge.
    const xLabels = axes.xAxis.visible ? axes.xAxis.ticks : axes.xAxis.edgeLabels;
    if (xLabels.length > 0) {
      const y = axes.xAxis.visible ? axes.xAxis.pixel + LABEL_AXIS_GAP : height - LABEL_EDGE_OFFSET;
      const baseline: CanvasTextBaseline = axes.xAxis.visible ? 'top' : 'bottom';
      if (y >= LABEL_EDGE_MARGIN && y <= height - LABEL_EDGE_MARGIN) {
        ctx.textAlign = 'center';
        ctx.textBaseline = baseline;
        for (const label of xLabels) {
          if (label.pixel < LABEL_EDGE_MARGIN || label.pixel > width - LABEL_EDGE_MARGIN) continue;
          ctx.fillText(label.label, label.pixel, y);
        }
      }
    }

    // Y labels: left of the axis line, or pinned to the left edge.
    const yLabels = axes.yAxis.visible ? axes.yAxis.ticks : axes.yAxis.edgeLabels;
    if (yLabels.length > 0) {
      const x = axes.yAxis.visible ? axes.yAxis.pixel - LABEL_AXIS_GAP : LABEL_EDGE_OFFSET;
      const align: CanvasTextAlign = axes.yAxis.visible ? 'right' : 'left';
      if (x >= LABEL_EDGE_MARGIN && x <= width - LABEL_EDGE_MARGIN) {
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';
        for (const label of yLabels) {
          if (label.pixel < LABEL_EDGE_MARGIN || label.pixel > height - LABEL_EDGE_MARGIN) continue;
          ctx.fillText(label.label, x, label.pixel);
        }
      }
    }
  }

  private drawOriginMarker(
    ctx: CanvasRenderingContext2D,
    transform: ViewportTransform,
    theme: GraphTheme,
    axes: { xAxis: AxisRenderSpec; yAxis: AxisRenderSpec }
  ): void {
    if (!axes.xAxis.visible || !axes.yAxis.visible) return;
    const origin = transform.worldToScreen({ x: 0, y: 0 });
    if (!Number.isFinite(origin.x) || !Number.isFinite(origin.y)) return;
    ctx.fillStyle = theme.origin;
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawDrawables(
    ctx: CanvasRenderingContext2D,
    transform: ViewportTransform,
    drawables: GraphDrawable[]
  ): void {
    for (const drawable of drawables) {
      if (!drawable || drawable.visible !== true) continue;
      // Later phases add kinds to the union; unknown kinds are ignored.
      if (drawable.kind !== 'function') continue;
      ctx.strokeStyle = typeof drawable.color === 'string' ? drawable.color : '#000000';
      ctx.lineWidth =
        Number.isFinite(drawable.lineWidth) && drawable.lineWidth > 0 ? drawable.lineWidth : 1;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      const segments = Array.isArray(drawable.segments) ? drawable.segments : [];
      for (const segment of segments) {
        this.strokePolyline(ctx, transform, Array.isArray(segment) ? segment : []);
      }
    }
  }

  /**
   * Stroke one polyline in world coordinates. Non-finite points are dropped
   * and split the polyline there (a gap in the data draws as a gap, never
   * as a spike to Infinity). Segments with fewer than 2 finite points are
   * skipped.
   */
  private strokePolyline(
    ctx: CanvasRenderingContext2D,
    transform: ViewportTransform,
    points: WorldPoint[]
  ): void {
    ctx.beginPath();
    let penDown = false;
    let finiteCount = 0;
    for (const point of points) {
      const wx = sanitizeNumber(point.x, Number.NaN);
      const wy = sanitizeNumber(point.y, Number.NaN);
      if (!Number.isFinite(wx) || !Number.isFinite(wy)) {
        penDown = false;
        continue;
      }
      const screen = transform.worldToScreen({ x: wx, y: wy });
      if (!Number.isFinite(screen.x) || !Number.isFinite(screen.y)) {
        penDown = false;
        continue;
      }
      if (penDown) ctx.lineTo(screen.x, screen.y);
      else {
        ctx.moveTo(screen.x, screen.y);
        penDown = true;
      }
      finiteCount += 1;
    }
    if (finiteCount >= 2) ctx.stroke();
  }
}
