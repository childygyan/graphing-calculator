/**
 * Grid computation: nice tick intervals, tick generation, label formatting,
 * and the full grid spec (major/minor lines plus positioned tick labels).
 *
 * Pure math only — no canvas, no DOM. Pixel positions come from the
 * coordinate transform in CSS pixels.
 */

import type { GraphViewport } from '../../types/calculator.js';
import { createTransform } from './coordinate-system.js';
import type { CanvasSize } from './types.js';

export interface TickLabel {
  value: number;
  pixel: number;
  label: string;
}

export interface GridLine {
  value: number;
  pixel: number;
  major: boolean;
}

export interface GridSpec {
  vertical: GridLine[];
  horizontal: GridLine[];
  xLabels: TickLabel[];
  yLabels: TickLabel[];
}

/**
 * A "nice" tick interval (1/2/5 × 10^n) targeting ~`targetPixelSpacing`
 * pixels between major ticks. Falls back to 1 for degenerate input.
 */
export function niceTickInterval(
  worldSpan: number,
  pixelsPerUnit: number,
  targetPixelSpacing = 80
): number {
  const raw = targetPixelSpacing / pixelsPerUnit;
  if (!Number.isFinite(raw) || raw <= 0) return 1;
  const exponent = Math.floor(Math.log10(raw));
  const mantissa = raw / Math.pow(10, exponent);
  const step = mantissa < 1.5 ? 1 : mantissa < 3.5 ? 2 : mantissa < 7.5 ? 5 : 10;
  return step * Math.pow(10, exponent);
}

function clampDecimals(n: number, max: number): number {
  return Math.min(max, Math.max(0, Math.ceil(n)));
}

/** Decimals implied by an interval, e.g. 1 -> 0, 0.5 -> 1, 0.05 -> 2. */
function decimalsForInterval(interval: number): number {
  if (!Number.isFinite(interval) || interval <= 0) return 6;
  return clampDecimals(-Math.log10(interval), 12);
}

/** Round to `decimals`, avoiding toFixed RangeError on huge magnitudes. */
function roundToDecimals(value: number, decimals: number): number {
  if (Math.abs(value) >= 1e15) return value;
  const rounded = Number(value.toFixed(decimals));
  return rounded === 0 ? 0 : rounded;
}

/**
 * Tick values from `min` to `max` at `interval` steps. The first tick is the
 * smallest multiple of interval >= min (with a small epsilon so a boundary
 * value like exactly 2.0 is included). Capped at `maxTicks` (default 2000)
 * so a pathological range cannot allocate unboundedly.
 */
export function computeTicks(
  min: number,
  max: number,
  interval: number,
  maxTicks = 2000
): number[] {
  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max) ||
    !Number.isFinite(interval) ||
    interval <= 0 ||
    min > max
  ) {
    return [];
  }
  const ticks: number[] = [];
  const decimals = decimalsForInterval(interval);
  const epsilon = interval * 1e-9;
  let tick = Math.ceil(min / interval - 1e-9) * interval;
  while (tick <= max + epsilon && ticks.length < maxTicks) {
    ticks.push(roundToDecimals(tick, decimals));
    tick += interval;
  }
  return ticks;
}

function trimTrailingZeros(text: string): string {
  if (!text.includes('.')) return text;
  const trimmed = text.replace(/0+$/, '').replace(/\.$/, '');
  return trimmed === '' || trimmed === '-' ? '0' : trimmed;
}

function trimExponential(text: string): string {
  const parts = text.split('e');
  if (parts.length !== 2) return text;
  return `${trimTrailingZeros(parts[0])}e${parts[1]}`;
}

/**
 * Format a tick value for display. 0 -> '0'; non-finite -> ''; extreme
 * magnitudes use exponential notation with up to 3 significant digits
 * (e.g. '1.5e+21'); otherwise decimals follow the interval (interval 1 ->
 * '2', interval 0.5 -> '2.5', never '2.000000').
 */
export function formatTickLabel(value: number, interval: number): string {
  if (!Number.isFinite(value)) return '';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e12 || abs < 1e-6) return trimExponential(value.toExponential(2));
  const decimals =
    Number.isFinite(interval) && interval > 0 ? clampDecimals(-Math.log10(interval), 6) : 4;
  return trimTrailingZeros(value.toFixed(decimals));
}

/**
 * Format a world coordinate for the hover readout. Non-finite -> '—';
 * extreme magnitudes -> trimmed exponential (2 decimals); otherwise up to
 * 4 decimals, trimmed.
 */
export function formatCoordinate(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (value === 0) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e9 || abs < 1e-4) return trimExponential(value.toExponential(2));
  return trimTrailingZeros(value.toFixed(4));
}

/**
 * Compute the full grid spec for a viewport/size pair. Minor lines use
 * major/5 and are included only when they would be at least 14px apart.
 * Returns an empty spec for invalid spans or sizes.
 */
export function computeGrid(viewport: GraphViewport, size: CanvasSize): GridSpec {
  const empty: GridSpec = { vertical: [], horizontal: [], xLabels: [], yLabels: [] };
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
    return empty;
  }

  const transform = createTransform(viewport, size);
  const pxPerUnitX = size.width / xSpan;
  const pxPerUnitY = size.height / ySpan;
  const majorX = niceTickInterval(xSpan, pxPerUnitX, 80);
  const majorY = niceTickInterval(ySpan, pxPerUnitY, 80);
  const minorX = majorX / 5;
  const minorY = majorY / 5;

  const majorXTicks = computeTicks(viewport.xMin, viewport.xMax, majorX);
  const majorYTicks = computeTicks(viewport.yMin, viewport.yMax, majorY);

  const vertical: GridLine[] = [];
  if (minorX * pxPerUnitX >= 14) {
    for (const tick of computeTicks(viewport.xMin, viewport.xMax, minorX)) {
      // Skip minor ticks that coincide with a major tick (minor = major/5,
      // so majors are always a subset up to floating-point noise).
      const coincides = majorXTicks.some((major) => Math.abs(tick - major) <= minorX * 1e-6);
      if (coincides) continue;
      vertical.push({
        value: tick,
        pixel: transform.worldToScreen({ x: tick, y: 0 }).x,
        major: false,
      });
    }
  }
  for (const tick of majorXTicks) {
    vertical.push({
      value: tick,
      pixel: transform.worldToScreen({ x: tick, y: 0 }).x,
      major: true,
    });
  }

  const horizontal: GridLine[] = [];
  if (minorY * pxPerUnitY >= 14) {
    for (const tick of computeTicks(viewport.yMin, viewport.yMax, minorY)) {
      const coincides = majorYTicks.some((major) => Math.abs(tick - major) <= minorY * 1e-6);
      if (coincides) continue;
      horizontal.push({
        value: tick,
        pixel: transform.worldToScreen({ x: 0, y: tick }).y,
        major: false,
      });
    }
  }
  for (const tick of majorYTicks) {
    horizontal.push({
      value: tick,
      pixel: transform.worldToScreen({ x: 0, y: tick }).y,
      major: true,
    });
  }

  const xLabels: TickLabel[] = majorXTicks.map((tick) => ({
    value: tick,
    pixel: transform.worldToScreen({ x: tick, y: 0 }).x,
    label: formatTickLabel(tick, majorX),
  }));
  const yLabels: TickLabel[] = majorYTicks.map((tick) => ({
    value: tick,
    pixel: transform.worldToScreen({ x: 0, y: tick }).y,
    label: formatTickLabel(tick, majorY),
  }));

  return { vertical, horizontal, xLabels, yLabels };
}
