import { describe, expect, it } from 'vitest';
import { compileExpressionScoped, compileExpression } from '../../math/engine.js';
import { VariableEnvironment } from '../../math/variables.js';
import { sampleInequality, sampleParametric, samplePolar } from '../advancedSampling.js';
import type { GraphViewport } from '../../../types/calculator.js';
import type { CanvasSize } from '../types.js';

const VIEWPORT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const SIZE: CanvasSize = { width: 800, height: 600 };

function envFor(defs: [string, string][]): VariableEnvironment {
  const env = new VariableEnvironment(
    defs.map(([name, expression]) => ({ name, expression, min: -10, max: 10, step: 0.1 }))
  );
  env.resolve();
  return env;
}

describe('sampleParametric', () => {
  it('traces the unit circle from (cos t, sin t)', () => {
    const env = envFor([]);
    const result = sampleParametric(
      compileExpressionScoped('cos(t)', { parameter: 't', env }).fn,
      compileExpressionScoped('sin(t)', { parameter: 't', env }).fn,
      0,
      2 * Math.PI,
      VIEWPORT,
      SIZE
    );
    expect(result.segments.length).toBeGreaterThanOrEqual(1);
    const points = result.segments.flat();
    expect(points.length).toBeGreaterThan(100);
    for (const p of points) {
      const radius = Math.hypot(p.x, p.y);
      expect(radius).toBeGreaterThan(0.9);
      expect(radius).toBeLessThan(1.1);
    }
  });

  it('respects tMin/tMax bounds and preserves the line y=2x', () => {
    const env = envFor([]);
    const result = sampleParametric(
      compileExpressionScoped('t', { parameter: 't', env }).fn,
      compileExpressionScoped('2*t', { parameter: 't', env }).fn,
      -5,
      5,
      VIEWPORT,
      SIZE
    );
    const points = result.segments.flat();
    for (const p of points) expect(p.y).toBeCloseTo(2 * p.x, 6);
  });

  it('breaks segments across a singularity (1/t)', () => {
    const env = envFor([]);
    const result = sampleParametric(
      compileExpressionScoped('t', { parameter: 't', env }).fn,
      compileExpressionScoped('1/t', { parameter: 't', env }).fn,
      -1,
      1,
      VIEWPORT,
      SIZE
    );
    // The pole at t=0 must not be bridged into one continuous streak.
    expect(result.segments.length).toBeGreaterThanOrEqual(2);
    for (const segment of result.segments) {
      for (const p of segment) {
        expect(Number.isFinite(p.x)).toBe(true);
        expect(Number.isFinite(p.y)).toBe(true);
      }
      // No single segment may span from deep-negative to deep-positive y:
      // that would be a streak straight through the pole.
      const ys = segment.map((p) => p.y);
      const hasDeepNegative = ys.some((y) => y < -200);
      const hasDeepPositive = ys.some((y) => y > 200);
      expect(hasDeepNegative && hasDeepPositive).toBe(false);
    }
  });

  it('binds variables inside parametric expressions', () => {
    const env = envFor([['r', '3']]);
    const result = sampleParametric(
      compileExpressionScoped('r*cos(t)', { parameter: 't', env }).fn,
      compileExpressionScoped('r*sin(t)', { parameter: 't', env }).fn,
      0,
      2 * Math.PI,
      VIEWPORT,
      SIZE
    );
    const points = result.segments.flat();
    for (const p of points) {
      expect(Math.hypot(p.x, p.y)).toBeCloseTo(3, 0);
    }
  });

  it('returns no segments for degenerate input', () => {
    const env = envFor([]);
    const noop = compileExpressionScoped('cos(t)', { parameter: 't', env }).fn;
    expect(sampleParametric(noop, noop, 1, 1, VIEWPORT, SIZE).segments).toEqual([]);
    expect(sampleParametric(noop, noop, NaN, 1, VIEWPORT, SIZE).segments).toEqual([]);
  });
});

describe('samplePolar', () => {
  it('traces a circle of radius 2 for r=2', () => {
    const env = envFor([]);
    const result = samplePolar(
      compileExpressionScoped('2', { parameter: 'theta', env }).fn,
      VIEWPORT,
      SIZE
    );
    const points = result.segments.flat();
    expect(points.length).toBeGreaterThan(50);
    for (const p of points) {
      expect(Math.hypot(p.x, p.y)).toBeCloseTo(2, 1);
    }
  });

  it('handles the wrap-around: r=1 closes the circle', () => {
    const env = envFor([]);
    const result = samplePolar(
      compileExpressionScoped('1', { parameter: 'theta', env }).fn,
      VIEWPORT,
      SIZE
    );
    const first = result.segments[0][0];
    const last = result.segments[result.segments.length - 1].slice(-1)[0];
    expect(Math.hypot(first.x - last.x, first.y - last.y)).toBeLessThan(0.1);
  });

  it('traces the Archimedean spiral r=theta with growing radius', () => {
    const env = envFor([]);
    const result = samplePolar(
      compileExpressionScoped('theta', { parameter: 'theta', env }).fn,
      VIEWPORT,
      SIZE
    );
    const radii = result.segments.flat().map((p) => Math.hypot(p.x, p.y));
    expect(radii.length).toBeGreaterThan(20);
    expect(radii[radii.length - 1]).toBeGreaterThan(radii[0] + 1);
  });

  it('supports negative radii (r=-1 is still a unit circle)', () => {
    const env = envFor([]);
    const result = samplePolar(
      compileExpressionScoped('-1', { parameter: 'theta', env }).fn,
      VIEWPORT,
      SIZE
    );
    const points = result.segments.flat();
    expect(points.length).toBeGreaterThan(20);
    for (const p of points) expect(Math.hypot(p.x, p.y)).toBeCloseTo(1, 1);
  });

  it('breaks across poles in r=1/cos(theta)', () => {
    const env = envFor([]);
    const result = samplePolar(
      compileExpressionScoped('1/cos(theta)', { parameter: 'theta', env }).fn,
      VIEWPORT,
      SIZE
    );
    // The poles at ±π/2 split the sweep into at least two segments.
    expect(result.segments.length).toBeGreaterThanOrEqual(2);
  });
});

describe('sampleInequality', () => {
  it('fills the region below y<x', () => {
    const result = sampleInequality('y', '<', compileExpression('x').fn, VIEWPORT, SIZE);
    expect(result.polygons.length).toBeGreaterThan(0);
    for (const polygon of result.polygons) {
      for (const p of polygon) {
        // Region is below y=x: allow one cell of column resolution slack.
        expect(p.y).toBeLessThanOrEqual(p.x + 0.05);
      }
    }
    expect(result.boundary.length).toBeGreaterThan(0);
    // Boundary follows y=x.
    const boundaryPoints = result.boundary.flat();
    for (const p of boundaryPoints.slice(0, 20)) {
      expect(p.y).toBeCloseTo(p.x, 1);
    }
  });

  it('fills the region above y>x^2', () => {
    const result = sampleInequality('y', '>', compileExpression('x^2').fn, VIEWPORT, SIZE);
    expect(result.polygons.length).toBeGreaterThan(0);
    for (const polygon of result.polygons) {
      for (const p of polygon) {
        // Boundary points ride the curve unclipped; the fill extends to the
        // viewport's top edge, so clamp the expectation at yMax.
        expect(p.y).toBeGreaterThanOrEqual(Math.min(p.x * p.x, VIEWPORT.yMax) - 0.05);
      }
    }
    // Where the curve is inside the viewport, the boundary follows it.
    const boundaryPoints = result.boundary.flat();
    const inner = boundaryPoints.filter((p) => Math.abs(p.x) <= 3);
    expect(inner.length).toBeGreaterThan(10);
    for (const p of inner) expect(p.y).toBeCloseTo(p.x * p.x, 1);
  });

  it('handles x-based inequalities (x<1 is a vertical half-plane)', () => {
    const result = sampleInequality('x', '<', compileExpression('1').fn, VIEWPORT, SIZE);
    expect(result.polygons.length).toBeGreaterThan(0);
    for (const polygon of result.polygons) {
      for (const p of polygon) expect(p.x).toBeLessThanOrEqual(1.05);
    }
    const boundaryPoints = result.boundary.flat();
    for (const p of boundaryPoints.slice(0, 20)) {
      expect(p.x).toBeCloseTo(1, 1);
    }
  });

  it('treats strict and non-strict operators identically for fill geometry', () => {
    // Strictness only changes boundary styling (dashed vs solid) at the
    // drawable level; the sampled fill region is the same.
    const loose = sampleInequality('y', '<=', compileExpression('x').fn, VIEWPORT, SIZE);
    const strict = sampleInequality('y', '<', compileExpression('x').fn, VIEWPORT, SIZE);
    expect(loose.polygons).toEqual(strict.polygons);
    expect(loose.boundary).toEqual(strict.boundary);
  });

  it('binds variables in the boundary expression', () => {
    const env = envFor([['m', '2']]);
    const result = sampleInequality(
      'y',
      '<',
      compileExpressionScoped('m*x', { parameter: 'x', env }).fn,
      VIEWPORT,
      SIZE
    );
    expect(result.polygons.length).toBeGreaterThan(0);
    const boundaryPoints = result.boundary.flat();
    for (const p of boundaryPoints.slice(0, 20)) {
      expect(p.y).toBeCloseTo(2 * p.x, 0);
    }
  });

  it('returns empty output for degenerate bounds', () => {
    const result = sampleInequality(
      'y',
      '<',
      compileExpression('x').fn,
      { xMin: 0, xMax: 0, yMin: -10, yMax: 10 },
      SIZE
    );
    expect(result.polygons).toEqual([]);
    expect(result.boundary).toEqual([]);
  });
});
