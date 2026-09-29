import { describe, expect, it } from 'vitest';

import type { GraphViewport } from '../../../types/calculator.js';
import {
  computeGrid,
  computeTicks,
  formatCoordinate,
  formatTickLabel,
  niceTickInterval,
} from '../grid.js';
import type { GridLine } from '../grid.js';

const DEFAULT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const SIZE_800x600 = { width: 800, height: 600 };

/** Assert an interval is of the form {1,2,5,10} × 10^n. */
function expectNiceInterval(interval: number): void {
  const mantissa = interval / Math.pow(10, Math.floor(Math.log10(interval)));
  const matches = [1, 2, 5, 10].some((step) => Math.abs(mantissa - step) < 1e-9);
  expect(matches, `interval ${interval} has mantissa ${mantissa}`).toBe(true);
}

describe('niceTickInterval', () => {
  it('returns 2 for a 20-unit span at 40 px/unit', () => {
    expect(niceTickInterval(20, 40)).toBe(2);
  });

  it('returns 0.1 for a tiny 0.03 span at 1000 px/unit', () => {
    expect(niceTickInterval(0.03, 1000)).toBeCloseTo(0.1, 12);
  });

  it('returns 200 for a large 2000 span at 0.5 px/unit', () => {
    expect(niceTickInterval(2000, 0.5)).toBe(200);
  });

  it('always returns intervals of the form {1,2,5,10} × 10^n', () => {
    const cases: Array<[number, number]> = [
      [20, 40],
      [0.03, 1000],
      [2000, 0.5],
      [1, 100],
      [137, 3.7],
      [0.00042, 5000],
      [7.5e8, 0.01],
      [Math.PI, Math.E],
    ];
    for (const [span, pxPerUnit] of cases) {
      expectNiceInterval(niceTickInterval(span, pxPerUnit));
    }
  });

  it('falls back to 1 for degenerate pixelsPerUnit', () => {
    // The raw interval is targetPixelSpacing / pixelsPerUnit; only a
    // non-finite or non-positive raw value triggers the fallback.
    expect(niceTickInterval(20, 0)).toBe(1);
    expect(niceTickInterval(20, -5)).toBe(1);
    expect(niceTickInterval(20, NaN)).toBe(1);
    expect(niceTickInterval(20, Infinity)).toBe(1);
  });
});

describe('computeTicks', () => {
  it('returns [-4,-2,0,2,4] for computeTicks(-5, 5, 2)', () => {
    expect(computeTicks(-5, 5, 2)).toEqual([-4, -2, 0, 2, 4]);
  });

  it('includes boundary values exactly on the interval', () => {
    expect(computeTicks(-10, 10, 2)).toEqual([-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10]);
  });

  it('respects the maxTicks cap on a huge range', () => {
    const ticks = computeTicks(-1e12, 1e12, 1);
    expect(ticks.length).toBeLessThanOrEqual(2000);
    expect(ticks.length).toBe(2000);
    expect(ticks[0]).toBe(-1e12);
  });

  it('allows a custom maxTicks cap', () => {
    expect(computeTicks(0, 100, 1, 10)).toHaveLength(10);
  });

  it('returns [] for invalid input', () => {
    expect(computeTicks(5, -5, 1)).toEqual([]);
    expect(computeTicks(0, 10, 0)).toEqual([]);
    expect(computeTicks(0, 10, -2)).toEqual([]);
    expect(computeTicks(NaN, 10, 1)).toEqual([]);
    expect(computeTicks(0, Infinity, 1)).toEqual([]);
  });
});

describe('formatTickLabel', () => {
  it("formats 2 with interval 1 as '2' (never '2.000000')", () => {
    expect(formatTickLabel(2, 1)).toBe('2');
  });

  it("formats 2.5 with interval 0.5 as '2.5'", () => {
    expect(formatTickLabel(2.5, 0.5)).toBe('2.5');
  });

  it("formats 0 as '0'", () => {
    expect(formatTickLabel(0, 1)).toBe('0');
    expect(formatTickLabel(0, 0.001)).toBe('0');
  });

  it('formats 1e-7 as an exponential string', () => {
    const label = formatTickLabel(1e-7, 1e-7);
    expect(label).toContain('e');
    expect(label).toBe('1e-7');
  });

  it("formats -3 as '-3'", () => {
    expect(formatTickLabel(-3, 1)).toBe('-3');
  });

  it('returns empty string for non-finite values', () => {
    expect(formatTickLabel(NaN, 1)).toBe('');
    expect(formatTickLabel(Infinity, 1)).toBe('');
  });

  it('trims trailing zeros for small intervals', () => {
    expect(formatTickLabel(0.05, 0.05)).toBe('0.05');
    expect(formatTickLabel(1.5, 0.25)).toBe('1.5');
  });
});

describe('formatCoordinate', () => {
  it("formats non-finite values as '—'", () => {
    expect(formatCoordinate(NaN)).toBe('—');
    expect(formatCoordinate(Infinity)).toBe('—');
    expect(formatCoordinate(-Infinity)).toBe('—');
  });

  it("formats 0 as '0'", () => {
    expect(formatCoordinate(0)).toBe('0');
  });

  it('formats normal values with up to 4 trimmed decimals', () => {
    expect(formatCoordinate(1.5)).toBe('1.5');
    expect(formatCoordinate(2.71828)).toBe('2.7183');
    expect(formatCoordinate(-3.14159)).toBe('-3.1416');
  });

  it('formats extreme magnitudes as trimmed exponentials', () => {
    expect(formatCoordinate(1e10)).toBe('1e+10');
    expect(formatCoordinate(1e-5)).toBe('1e-5');
  });
});

const majors = (lines: GridLine[]): GridLine[] => lines.filter((line) => line.major);
const minors = (lines: GridLine[]): GridLine[] => lines.filter((line) => !line.major);

describe('computeGrid', () => {
  it('produces vertical and horizontal lines on the default viewport', () => {
    const grid = computeGrid(DEFAULT, SIZE_800x600);
    expect(grid.vertical.length).toBeGreaterThan(0);
    expect(grid.horizontal.length).toBeGreaterThan(0);
  });

  it('gives every major line a label', () => {
    const grid = computeGrid(DEFAULT, SIZE_800x600);
    expect(grid.xLabels).toHaveLength(majors(grid.vertical).length);
    expect(grid.yLabels).toHaveLength(majors(grid.horizontal).length);
    for (const label of [...grid.xLabels, ...grid.yLabels]) {
      expect(label.label.length).toBeGreaterThan(0);
    }
  });

  it('spaces minor lines closer than major lines', () => {
    const grid = computeGrid(DEFAULT, SIZE_800x600);
    const majorV = majors(grid.vertical);
    const minorV = minors(grid.vertical);
    expect(minorV.length).toBeGreaterThan(0);
    const majorSpacing = Math.abs(majorV[1].pixel - majorV[0].pixel);
    const minorSpacing = Math.abs(minorV[1].pixel - minorV[0].pixel);
    expect(minorSpacing).toBeLessThan(majorSpacing);
    // minor = major / 5 by construction
    expect(majorSpacing / minorSpacing).toBeCloseTo(5, 9);
  });

  it('returns an empty spec for degenerate viewports or sizes', () => {
    const badViewport: GraphViewport = { xMin: 5, xMax: 5, yMin: -10, yMax: 10 };
    const empty = computeGrid(badViewport, SIZE_800x600);
    expect(empty.vertical).toEqual([]);
    expect(empty.horizontal).toEqual([]);
    expect(empty.xLabels).toEqual([]);
    expect(empty.yLabels).toEqual([]);

    const zeroSize = computeGrid(DEFAULT, { width: 0, height: 600 });
    expect(zeroSize.vertical).toEqual([]);
  });
});
