/**
 * Tests for the Phase 4 numerical analysis routines. Every method is
 * checked against known analytic values:
 * roots of x²−4, d/dx sin = cos, ∫₀¹x²dx = 1/3, lim sin(x)/x = 1, …
 */

import { describe, expect, it } from 'vitest';
import { compileExpression } from '../engine.js';
import type { CompiledFunction } from '../compiler.js';
import {
  adaptiveSimpson,
  brentRoot,
  centralDerivative,
  evalFinite,
  findAllRoots,
  findExtrema,
  findIntersections,
  lineEquation,
  numericLimit,
  tangentAt,
} from '../analysis.js';

function fn(source: string): CompiledFunction {
  return compileExpression(source).fn;
}

function closeTo(actual: number, expected: number, tolerance = 1e-9): void {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
}

describe('evalFinite', () => {
  it('collapses non-finite results to NaN', () => {
    expect(evalFinite(fn('1/x'), 0)).toBeNaN();
    expect(evalFinite(fn('sqrt(x)'), -1)).toBeNaN();
    expect(evalFinite(fn('x^2'), 3)).toBe(9);
  });
});

describe('brentRoot', () => {
  it('finds the root of x^2 - 4 on [0, 3]', () => {
    const root = brentRoot(fn('x^2-4'), 0, 3);
    expect(root).not.toBeNull();
    closeTo(root as number, 2);
  });

  it('returns null without a sign-changing bracket', () => {
    expect(brentRoot(fn('x^2+1'), 0, 1)).toBeNull();
  });

  it('returns null when an endpoint is outside the domain', () => {
    expect(brentRoot(fn('1/x'), -1, 0)).toBeNull();
  });

  it('finds a root of sin near pi', () => {
    const root = brentRoot(fn('sin(x)'), 3, 4);
    expect(root).not.toBeNull();
    closeTo(root as number, Math.PI, 1e-9);
  });
});

describe('findAllRoots', () => {
  it('finds both roots of x^2 - 4', () => {
    expect(findAllRoots(fn('x^2-4'), -10, 10)).toEqual([
      expect.closeTo(-2, 9),
      expect.closeTo(2, 9),
    ]);
  });

  it('finds the zeros of sin on [-4, 4]', () => {
    const roots = findAllRoots(fn('sin(x)'), -4, 4);
    expect(roots).toHaveLength(3);
    closeTo(roots[0], -Math.PI, 1e-6);
    closeTo(roots[1], 0, 1e-6);
    closeTo(roots[2], Math.PI, 1e-6);
  });

  it('finds an even-multiplicity touch root (x^2 at 0)', () => {
    const roots = findAllRoots(fn('x^2'), -2, 2);
    expect(roots).toHaveLength(1);
    closeTo(roots[0], 0, 1e-6);
  });

  it('finds three roots of a cubic', () => {
    const roots = findAllRoots(fn('(x-1)*(x-2)*(x-3)'), 0, 4);
    expect(roots).toHaveLength(3);
    closeTo(roots[0], 1, 1e-6);
    closeTo(roots[1], 2, 1e-6);
    closeTo(roots[2], 3, 1e-6);
  });

  it('returns [] when there are no roots', () => {
    expect(findAllRoots(fn('x^2+1'), -10, 10)).toEqual([]);
  });

  it('returns [] for degenerate ranges', () => {
    expect(findAllRoots(fn('x'), 2, 2)).toEqual([]);
    expect(findAllRoots(fn('x'), NaN, 2)).toEqual([]);
  });

  it('handles a reversed range', () => {
    const roots = findAllRoots(fn('x^2-4'), 10, -10);
    expect(roots).toHaveLength(2);
  });
});

describe('findIntersections', () => {
  it('finds where x^2 meets x', () => {
    const points = findIntersections(fn('x^2'), fn('x'), -2, 2);
    expect(points).toHaveLength(2);
    closeTo(points[0].x, 0, 1e-6);
    closeTo(points[0].y, 0, 1e-6);
    closeTo(points[1].x, 1, 1e-6);
    closeTo(points[1].y, 1, 1e-6);
  });

  it('returns [] for parallel lines', () => {
    expect(findIntersections(fn('x'), fn('x+1'), -5, 5)).toEqual([]);
  });

  it('finds sin(x) = 0 crossings', () => {
    const points = findIntersections(fn('sin(x)'), fn('0'), -4, 4);
    expect(points).toHaveLength(3);
  });
});

describe('centralDerivative', () => {
  it('d/dx sin = cos at pi/4', () => {
    closeTo(centralDerivative(fn('sin(x)'), Math.PI / 4), Math.SQRT1_2, 1e-6);
  });

  it('d/dx x^3 = 3x^2: 12 at x = 2', () => {
    closeTo(centralDerivative(fn('x^3'), 2), 12, 1e-6);
  });

  it('derivative of a constant is 0', () => {
    closeTo(centralDerivative(fn('5'), 3), 0, 1e-9);
  });

  it('returns NaN outside the domain', () => {
    expect(centralDerivative(fn('sqrt(x)'), 0)).toBeNaN();
    expect(centralDerivative(fn('sqrt(x)'), -4)).toBeNaN();
  });

  it('returns NaN for non-finite x', () => {
    expect(centralDerivative(fn('x^2'), NaN)).toBeNaN();
  });
});

describe('adaptiveSimpson', () => {
  it('integrates x^2 over [0, 1] = 1/3', () => {
    const { value, converged } = adaptiveSimpson(fn('x^2'), 0, 1);
    expect(converged).toBe(true);
    closeTo(value, 1 / 3, 1e-9);
  });

  it('integrates sin over [0, pi] = 2', () => {
    const { value, converged } = adaptiveSimpson(fn('sin(x)'), 0, Math.PI);
    expect(converged).toBe(true);
    closeTo(value, 2, 1e-9);
  });

  it('negates on reversed bounds', () => {
    const { value, converged } = adaptiveSimpson(fn('x^2'), 1, 0);
    expect(converged).toBe(true);
    closeTo(value, -1 / 3, 1e-9);
  });

  it('integrates a constant exactly', () => {
    const { value, converged } = adaptiveSimpson(fn('7'), 2, 5);
    expect(converged).toBe(true);
    closeTo(value, 21, 1e-9);
  });

  it('returns 0 over a zero-width interval', () => {
    const { value, converged } = adaptiveSimpson(fn('x^2'), 2, 2);
    expect(converged).toBe(true);
    expect(value).toBe(0);
  });

  it('does not converge across a singularity (1/x over [-1, 1])', () => {
    const { value, converged } = adaptiveSimpson(fn('1/x'), -1, 1);
    expect(converged).toBe(false);
    expect(value).toBeNaN();
  });

  it('returns NaN for non-finite bounds', () => {
    const { converged } = adaptiveSimpson(fn('x'), 0, NaN);
    expect(converged).toBe(false);
  });
});

describe('numericLimit', () => {
  it('lim sin(x)/x = 1 at 0 (two-sided)', () => {
    const r = numericLimit(fn('sin(x)/x'), 0);
    expect(r.status).toBe('converges');
    closeTo(r.value as number, 1, 1e-6);
  });

  it('lim 1/x at 0: +inf from the right, -inf from the left', () => {
    const right = numericLimit(fn('1/x'), 0, 'right');
    expect(right.status).toBe('unbounded');
    expect(right.direction).toBe(1);
    const left = numericLimit(fn('1/x'), 0, 'left');
    expect(left.status).toBe('unbounded');
    expect(left.direction).toBe(-1);
  });

  it('lim 1/x at 0 two-sided does not exist', () => {
    expect(numericLimit(fn('1/x'), 0, 'two-sided').status).toBe('does-not-exist');
  });

  it('lim |x|/x at 0: one-sided limits disagree', () => {
    expect(numericLimit(fn('abs(x)/x'), 0, 'right')).toMatchObject({
      status: 'converges',
      value: expect.closeTo(1, 6),
    });
    expect(numericLimit(fn('abs(x)/x'), 0, 'left')).toMatchObject({
      status: 'converges',
      value: expect.closeTo(-1, 6),
    });
    expect(numericLimit(fn('abs(x)/x'), 0, 'two-sided').status).toBe('does-not-exist');
  });

  it('lim sin(1/x) at 0 does not exist (oscillation)', () => {
    expect(numericLimit(fn('sin(1/x)'), 0, 'two-sided').status).toBe('does-not-exist');
  });

  it('lim (x^2-1)/(x-1) = 2 at 1 (removable discontinuity)', () => {
    const r = numericLimit(fn('(x^2-1)/(x-1)'), 1);
    expect(r.status).toBe('converges');
    closeTo(r.value as number, 2, 1e-6);
  });

  it('lim x^2 = 4 at 2', () => {
    const r = numericLimit(fn('x^2'), 2);
    expect(r.status).toBe('converges');
    closeTo(r.value as number, 4, 1e-9);
  });

  it('is indeterminate where the function is undefined nearby', () => {
    expect(numericLimit(fn('sqrt(x)'), -1, 'two-sided').status).toBe('indeterminate');
  });
});

describe('findExtrema', () => {
  it('finds the minimum of x^2 at 0', () => {
    const extrema = findExtrema(fn('x^2'), -2, 2);
    expect(extrema).toHaveLength(1);
    expect(extrema[0].kind).toBe('min');
    closeTo(extrema[0].x, 0, 1e-6);
    closeTo(extrema[0].y, 0, 1e-6);
  });

  it('finds the maximum of -(x-1)^2 at 1', () => {
    const extrema = findExtrema(fn('-(x-1)^2'), -2, 4);
    expect(extrema).toHaveLength(1);
    expect(extrema[0].kind).toBe('max');
    closeTo(extrema[0].x, 1, 1e-6);
    closeTo(extrema[0].y, 0, 1e-6);
  });

  it('finds both extrema of sin on [0, 2pi]', () => {
    const extrema = findExtrema(fn('sin(x)'), 0, 2 * Math.PI);
    expect(extrema).toHaveLength(2);
    expect(extrema[0].kind).toBe('max');
    closeTo(extrema[0].x, Math.PI / 2, 1e-4);
    expect(extrema[1].kind).toBe('min');
    closeTo(extrema[1].x, (3 * Math.PI) / 2, 1e-4);
  });

  it('reports no extrema for monotone x^3 on [-1, 1]', () => {
    expect(findExtrema(fn('x^3'), -1, 1)).toEqual([]);
  });

  it('reports no extrema on a monotone interval', () => {
    expect(findExtrema(fn('x^2'), 1, 2)).toEqual([]);
  });

  it('returns extrema sorted by x', () => {
    const extrema = findExtrema(fn('sin(x)'), 0, 4 * Math.PI);
    const xs = extrema.map((e) => e.x);
    expect([...xs].sort((a, b) => a - b)).toEqual(xs);
  });
});

describe('tangentAt', () => {
  it('tangent to x^2 at x = 1 is y = 2x - 1', () => {
    const t = tangentAt(fn('x^2'), 1);
    expect(t).not.toBeNull();
    closeTo((t as NonNullable<typeof t>).slope, 2, 1e-6);
    expect(t?.tangent).toEqual({
      kind: 'explicit',
      slope: expect.closeTo(2, 6),
      intercept: expect.closeTo(-1, 6),
    });
    expect(t?.normal).toEqual({
      kind: 'explicit',
      slope: expect.closeTo(-0.5, 6),
      intercept: expect.closeTo(1.5, 6),
    });
  });

  it('horizontal tangent gives a vertical normal', () => {
    const t = tangentAt(fn('x^2'), 0);
    expect(t?.tangent).toEqual({
      kind: 'explicit',
      slope: expect.closeTo(0, 9),
      intercept: expect.closeTo(0, 9),
    });
    expect(t?.normal).toEqual({ kind: 'vertical', x: 0 });
  });

  it('returns null outside the domain', () => {
    expect(tangentAt(fn('sqrt(x)'), -1)).toBeNull();
    expect(tangentAt(fn('1/x'), 0)).toBeNull();
  });
});

describe('lineEquation', () => {
  it('formats explicit lines', () => {
    expect(lineEquation({ kind: 'explicit', slope: 2, intercept: -1 })).toBe(
      'y = 2.0000x - 1.0000'
    );
    expect(lineEquation({ kind: 'explicit', slope: 0, intercept: 3 })).toBe('y = 3.0000');
    expect(lineEquation({ kind: 'explicit', slope: 1, intercept: 0 })).toBe('y = x');
    expect(lineEquation({ kind: 'explicit', slope: -1, intercept: 2 })).toBe('y = -x + 2.0000');
  });

  it('formats vertical lines', () => {
    expect(lineEquation({ kind: 'vertical', x: 3 })).toBe('x = 3.0000');
  });

  it('respects significant-digit precision', () => {
    expect(
      lineEquation(
        { kind: 'explicit', slope: 2, intercept: -1 },
        { mode: 'significant', digits: 3 }
      )
    ).toBe('y = 2.00x - 1.00');
  });
});
