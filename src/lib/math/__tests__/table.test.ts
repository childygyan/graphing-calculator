/** Tests for value-table construction, auto steps, and truncation. */

import { describe, expect, it } from 'vitest';
import { buildValueTable, niceStep } from '../table.js';
import { compileExpression } from '../engine.js';

const xSquared = compileExpression('x^2').fn;
const invX = compileExpression('1/x').fn;

describe('niceStep', () => {
  it('picks 1/2/5 steps', () => {
    expect(niceStep(10, 21)).toBe(0.5);
    expect(niceStep(100, 21)).toBe(5);
    expect(niceStep(1, 21)).toBe(0.05);
  });

  it('falls back to 1 for degenerate input', () => {
    expect(niceStep(0, 21)).toBe(1);
    expect(niceStep(-5, 21)).toBe(1);
  });
});

describe('buildValueTable', () => {
  it('builds exact rows for x^2 on [0, 2] step 1', () => {
    const table = buildValueTable(xSquared, 0, 2, 1);
    expect(table.rows).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 4 },
    ]);
    expect(table.truncated).toBe(false);
    expect(table.step).toBe(1);
    expect(table.totalRows).toBe(3);
  });

  it('marks domain errors as null rows (1/x at 0)', () => {
    const table = buildValueTable(invX, -1, 1, 1);
    expect(table.rows).toEqual([
      { x: -1, y: -1 },
      { x: 0, y: null },
      { x: 1, y: 1 },
    ]);
  });

  it('resolves "auto" to a nice step', () => {
    const table = buildValueTable(xSquared, 0, 10, 'auto');
    expect(table.step).toBe(0.5);
    expect(table.rows).toHaveLength(21);
    expect(table.rows[0]).toEqual({ x: 0, y: 0 });
    expect(table.rows[20].x).toBeCloseTo(10, 12);
  });

  it('truncates honestly at the row budget', () => {
    const table = buildValueTable(xSquared, 0, 10, 'auto', { maxRows: 5 });
    expect(table.rows).toHaveLength(5);
    expect(table.truncated).toBe(true);
    expect(table.totalRows).toBe(21);
  });

  it('normalizes a reversed range', () => {
    const forward = buildValueTable(xSquared, 0, 5, 1);
    const reversed = buildValueTable(xSquared, 5, 0, 1);
    expect(reversed.rows).toEqual(forward.rows);
  });

  it('returns an empty table for bad input', () => {
    expect(buildValueTable(xSquared, 0, 0, 1).rows).toEqual([]);
    expect(buildValueTable(xSquared, 0, 5, 0).rows).toEqual([]);
    expect(buildValueTable(xSquared, 0, 5, -1).rows).toEqual([]);
    expect(buildValueTable(xSquared, NaN, 5, 1).rows).toEqual([]);
  });
});
