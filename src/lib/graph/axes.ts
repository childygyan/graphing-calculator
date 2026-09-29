/**
 * Axis placement specs: where the x/y axis lines sit and which tick labels
 * belong to them. An axis is visible only when 0 is inside the viewport on
 * the perpendicular dimension — an off-view axis is never forced into view.
 * When an axis is off-view, its tick labels are pinned to the canvas edge.
 */

import type { GraphViewport } from '../../types/calculator.js';
import { createTransform } from './coordinate-system.js';
import { computeTicks, formatTickLabel, niceTickInterval } from './grid.js';
import type { TickLabel } from './grid.js';
import type { CanvasSize } from './types.js';

export interface AxisRenderSpec {
  orientation: 'x' | 'y';
  /** Screen pixel of the axis line (for edge labels: the pinned edge). */
  pixel: number;
  visible: boolean;
  /** Major tick labels positioned along the axis line (empty when off-view). */
  ticks: TickLabel[];
  /** Major tick labels pinned to the canvas edge (empty when visible). */
  edgeLabels: TickLabel[];
}

/** Minimum gap between a tick label and the perpendicular axis line. */
const AXIS_LABEL_CLEARANCE = 28;

function emptyAxis(orientation: 'x' | 'y'): AxisRenderSpec {
  return { orientation, pixel: 0, visible: false, ticks: [], edgeLabels: [] };
}

/**
 * Drop labels that would collide with the perpendicular axis line (within
 * 28px). The origin '0' label is kept exactly once: the x axis always claims
 * it, so `keepOrigin` is true for x and false for y.
 */
function filterTicks(
  ticks: TickLabel[],
  perpendicularPixel: number | null,
  keepOrigin: boolean
): TickLabel[] {
  return ticks.filter((tick) => {
    if (tick.value === 0) return keepOrigin;
    if (
      perpendicularPixel !== null &&
      Math.abs(tick.pixel - perpendicularPixel) < AXIS_LABEL_CLEARANCE
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Compute axis specs for a viewport/size pair. Major ticks reuse the grid's
 * nice-interval logic (target 80px); label pixels are along-axis positions —
 * the renderer places x labels below the axis (or the bottom edge) and y
 * labels left of the axis (or the left edge).
 */
export function computeAxes(
  viewport: GraphViewport,
  size: CanvasSize
): { xAxis: AxisRenderSpec; yAxis: AxisRenderSpec } {
  const xSpan = viewport.xMax - viewport.xMin;
  const ySpan = viewport.yMax - viewport.yMin;
  if (
    !Number.isFinite(xSpan) ||
    !Number.isFinite(ySpan) ||
    xSpan <= 0 ||
    ySpan <= 0 ||
    !Number.isFinite(size.width) ||
    !Number.isFinite(size.height) ||
    size.width <= 0 ||
    size.height <= 0
  ) {
    return { xAxis: emptyAxis('x'), yAxis: emptyAxis('y') };
  }

  const transform = createTransform(viewport, size);
  const origin = transform.worldToScreen({ x: 0, y: 0 });
  const xVisible = viewport.yMin <= 0 && 0 <= viewport.yMax;
  const yVisible = viewport.xMin <= 0 && 0 <= viewport.xMax;

  const majorX = niceTickInterval(xSpan, size.width / xSpan, 80);
  const majorY = niceTickInterval(ySpan, size.height / ySpan, 80);

  const xTickLabels: TickLabel[] = computeTicks(viewport.xMin, viewport.xMax, majorX).map(
    (tick) => ({
      value: tick,
      pixel: transform.worldToScreen({ x: tick, y: 0 }).x,
      label: formatTickLabel(tick, majorX),
    })
  );
  const yTickLabels: TickLabel[] = computeTicks(viewport.yMin, viewport.yMax, majorY).map(
    (tick) => ({
      value: tick,
      pixel: transform.worldToScreen({ x: 0, y: tick }).y,
      label: formatTickLabel(tick, majorY),
    })
  );

  // The x axis claims the origin label; y drops its '0' to avoid a duplicate.
  const xFiltered = filterTicks(xTickLabels, yVisible ? origin.x : null, true);
  const yFiltered = filterTicks(yTickLabels, xVisible ? origin.y : null, false);

  const xAxis: AxisRenderSpec = {
    orientation: 'x',
    pixel: origin.y,
    visible: xVisible,
    ticks: xVisible ? xFiltered : [],
    edgeLabels: xVisible ? [] : xFiltered,
  };
  const yAxis: AxisRenderSpec = {
    orientation: 'y',
    pixel: origin.x,
    visible: yVisible,
    ticks: yVisible ? yFiltered : [],
    edgeLabels: yVisible ? [] : yFiltered,
  };
  return { xAxis, yAxis };
}
