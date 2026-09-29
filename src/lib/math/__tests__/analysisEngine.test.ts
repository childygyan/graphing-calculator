/**
 * Tests for the Phase 4 MathEngine analysis methods: numerical roots,
 * derivatives, integrals, and intersections through the public interface.
 */

import { describe, expect, it } from 'vitest';
import { createMathEngine } from '../MathEngine.js';
import type { CompiledExpression } from '../engine.js';

const engine = createMathEngine();

describe('findRoots', () => {
  it('finds the roots of x^2 - 4', () => {
    const roots = engine.findRoots('x^2-4', 'x', { min: -10, max: 10 });
    expect(roots).toHaveLength(2);
    expect(roots[0]).toBeCloseTo(-2, 9);
    expect(roots[1]).toBeCloseTo(2, 9);
  });

  it('returns [] when there are no roots', () => {
    expect(engine.findRoots('x^2+1', 'x', { min: -10, max: 10 })).toEqual([]);
  });
});

describe('derivative', () => {
  it('returns an evaluatable numerical derivative', () => {
    const d = engine.derivative('x^2', 'x') as CompiledExpression;
    // d/dx x^2 = 2x: 6 at x = 3.
    expect(d.fn(3)).toBeCloseTo(6, 6);
    // The engine's own evaluate() path works on it too.
    expect(engine.evaluate(d, { x: 3 })).toBeCloseTo(6, 6);
  });
});

describe('integral', () => {
  it('computes ∫₀¹x²dx = 1/3', () => {
    expect(engine.integral('x^2', 'x', { min: 0, max: 1 })).toBeCloseTo(1 / 3, 9);
  });

  it('returns NaN when the quadrature cannot converge', () => {
    expect(engine.integral('1/x', 'x', { min: -1, max: 1 })).toBeNaN();
  });
});

describe('intersection', () => {
  it('finds where x^2 meets x', () => {
    const points = engine.intersection('x^2', 'x', 'x', { min: -2, max: 2 });
    expect(points).toHaveLength(2);
    expect(points[0].x).toBeCloseTo(0, 6);
    expect(points[0].y).toBeCloseTo(0, 6);
    expect(points[1].x).toBeCloseTo(1, 6);
    expect(points[1].y).toBeCloseTo(1, 6);
  });

  it('returns [] for parallel lines', () => {
    expect(engine.intersection('x', 'x+1', 'x', { min: -5, max: 5 })).toEqual([]);
  });
});
