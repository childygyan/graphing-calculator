/**
 * Value tables: evaluate a compiled expression over an x-range at fixed
 * steps. Domain errors become null rows (rendered as "—"), never throws.
 */

import type { CompiledFunction } from './compiler.js';
import { evalFinite } from './analysis.js';

export interface TableRow {
  x: number;
  /** null marks a domain error (the function is not defined at this x). */
  y: number | null;
}

export interface ValueTable {
  rows: TableRow[];
  /** True when the row budget cut the table short. */
  truncated: boolean;
  /** The step actually used (after 'auto' resolution). */
  step: number;
  /** How many rows the full range would have produced. */
  totalRows: number;
}

export interface TableOptions {
  /** Hard cap on emitted rows. Default 500. */
  maxRows?: number;
  /** Target row count when step is 'auto'. Default 21. */
  autoTargetRows?: number;
}

/** A "nice" step (1/2/5 × 10^k) near span/targetRows. */
export function niceStep(span: number, targetRows = 21): number {
  if (!Number.isFinite(span) || span <= 0 || !Number.isFinite(targetRows) || targetRows <= 0) {
    return 1;
  }
  const raw = span / targetRows;
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const scaled = raw / magnitude;
  const nice = scaled < 1.5 ? 1 : scaled < 3.5 ? 2 : scaled < 7.5 ? 5 : 10;
  return nice * magnitude;
}

/**
 * Build the table. `step` may be a positive number or 'auto' (nice step
 * for ~autoTargetRows rows). A start > end is normalized by swapping.
 * Returns an empty table for non-finite bounds or non-positive steps.
 */
export function buildValueTable(
  fn: CompiledFunction,
  start: number,
  end: number,
  step: number | 'auto',
  options?: TableOptions
): ValueTable {
  const empty: ValueTable = { rows: [], truncated: false, step: NaN, totalRows: 0 };
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === end) return empty;
  let lo = start;
  let hi = end;
  if (lo > hi) [lo, hi] = [hi, lo];
  const maxRows = Math.max(1, Math.floor(options?.maxRows ?? 500));
  const resolvedStep = step === 'auto' ? niceStep(hi - lo, options?.autoTargetRows ?? 21) : step;
  if (!Number.isFinite(resolvedStep) || resolvedStep <= 0) return empty;

  const totalRows = Math.floor((hi - lo) / resolvedStep) + 1;
  const rows: TableRow[] = [];
  // Snap x to the grid (start + i*step) to avoid float drift; clamp the
  // last row to hi so the endpoint is exact.
  for (let i = 0; i < totalRows && rows.length < maxRows; i++) {
    const x = i === totalRows - 1 ? hi : lo + i * resolvedStep;
    const y = evalFinite(fn, x);
    rows.push({ x, y: Number.isFinite(y) ? y : null });
  }
  return {
    rows,
    truncated: totalRows > rows.length,
    step: resolvedStep,
    totalRows,
  };
}
