import { describe, expect, it } from 'vitest';
import { buildFunctionDrawables, DEFAULT_CURVE_LINE_WIDTH } from '../drawables.js';
import { VariableEnvironment } from '../../../lib/math/variables.js';
import type {
  CartesianExpression,
  GraphViewport,
  InequalityExpression,
  InequalityOperator,
  ParametricExpression,
  PointExpression,
  PolarExpression,
} from '../../../types/calculator.js';
import type {
  CanvasSize,
  FunctionDrawable,
  InequalityDrawable,
  ParametricDrawable,
  PolarDrawable,
} from '../types.js';

const VIEWPORT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const SIZE: CanvasSize = { width: 800, height: 600 };

let nextId = 0;
function cartesian(rhs: string, overrides: Partial<CartesianExpression> = {}): CartesianExpression {
  nextId += 1;
  return {
    id: `expr-${nextId}`,
    kind: 'cartesian',
    label: `Cartesian ${nextId}`,
    visible: true,
    color: '#2563eb',
    metadata: {},
    createdAt: 0,
    updatedAt: 0,
    definition: { rhs },
    ...overrides,
  };
}

function point(x: string, y: string): PointExpression {
  nextId += 1;
  return {
    id: `expr-${nextId}`,
    kind: 'point',
    label: `Point ${nextId}`,
    visible: true,
    color: '#dc2626',
    metadata: {},
    createdAt: 0,
    updatedAt: 0,
    definition: { x, y },
  };
}

function parametric(xOfT: string, yOfT: string, tMin: string, tMax: string): ParametricExpression {
  nextId += 1;
  return {
    id: `expr-${nextId}`,
    kind: 'parametric',
    label: `Parametric ${nextId}`,
    visible: true,
    color: '#7c3aed',
    metadata: {},
    createdAt: 0,
    updatedAt: 0,
    definition: { xOfT, yOfT, tMin, tMax },
  };
}

function polar(rOfTheta: string): PolarExpression {
  nextId += 1;
  return {
    id: `expr-${nextId}`,
    kind: 'polar',
    label: `Polar ${nextId}`,
    visible: true,
    color: '#0891b2',
    metadata: {},
    createdAt: 0,
    updatedAt: 0,
    definition: { rOfTheta },
  };
}

function inequality(lhs: string, operator: InequalityOperator, rhs: string): InequalityExpression {
  nextId += 1;
  return {
    id: `expr-${nextId}`,
    kind: 'inequality',
    label: `Inequality ${nextId}`,
    visible: true,
    color: '#059669',
    metadata: {},
    createdAt: 0,
    updatedAt: 0,
    definition: { lhs, operator, rhs },
  };
}

function envWith(entries: [string, string][]): VariableEnvironment {
  const env = new VariableEnvironment(
    entries.map(([name, expression]) => ({ name, expression, min: -10, max: 10, step: 0.1 }))
  );
  env.resolve();
  return env;
}

describe('buildFunctionDrawables', () => {
  it('builds a function drawable from a cartesian expression', () => {
    const drawables = buildFunctionDrawables([cartesian('x^2')], VIEWPORT, SIZE);
    expect(drawables).toHaveLength(1);
    const drawable = drawables[0] as FunctionDrawable;
    expect(drawable.kind).toBe('function');
    expect(drawable.color).toBe('#2563eb');
    expect(drawable.lineWidth).toBe(DEFAULT_CURVE_LINE_WIDTH);
    expect(drawable.visible).toBe(true);
    expect(drawable.segments.length).toBeGreaterThanOrEqual(1);
    // y = x^2 on ±10: sampled y values are non-negative.
    for (const segment of drawable.segments) {
      for (const p of segment) expect(p.y).toBeGreaterThanOrEqual(0);
    }
  });

  it('honors per-expression lineWidth', () => {
    const drawables = buildFunctionDrawables([cartesian('x', { lineWidth: 5 })], VIEWPORT, SIZE);
    expect((drawables[0] as FunctionDrawable).lineWidth).toBe(5);
  });

  it('skips hidden expressions', () => {
    const drawables = buildFunctionDrawables([cartesian('x', { visible: false })], VIEWPORT, SIZE);
    expect(drawables).toEqual([]);
  });

  it('skips invalid expressions without throwing', () => {
    const drawables = buildFunctionDrawables([cartesian('2+'), cartesian('x')], VIEWPORT, SIZE);
    expect(drawables).toHaveLength(1);
  });

  it('skips empty expressions', () => {
    expect(buildFunctionDrawables([cartesian('')], VIEWPORT, SIZE)).toEqual([]);
  });

  it('builds a dot drawable for a point expression', () => {
    const drawables = buildFunctionDrawables([point('3', '-2')], VIEWPORT, SIZE);
    expect(drawables).toHaveLength(1);
    const drawable = drawables[0] as FunctionDrawable;
    expect(drawable.segments).toHaveLength(1);
    expect(drawable.segments[0]).toHaveLength(2);
    expect(drawable.segments[0][0]).toEqual({ x: 3, y: -2 });
    expect(drawable.segments[0][1]).toEqual({ x: 3, y: -2 });
  });

  it('evaluates point coordinate expressions', () => {
    const drawables = buildFunctionDrawables([point('1+2', 'sqrt(16)')], VIEWPORT, SIZE);
    expect((drawables[0] as FunctionDrawable).segments[0][0]).toEqual({ x: 3, y: 4 });
  });

  it('skips points with non-finite coordinates', () => {
    expect(buildFunctionDrawables([point('1/0', '2')], VIEWPORT, SIZE)).toEqual([]);
  });

  it('builds a parametric drawable in Phase 5', () => {
    const drawable = buildFunctionDrawables(
      [parametric('t', 't', '0', '10')],
      VIEWPORT,
      SIZE
    )[0] as ParametricDrawable;
    expect(drawable.kind).toBe('parametric');
    expect(drawable.segments.length).toBeGreaterThanOrEqual(1);
  });

  it('handles several expressions in order', () => {
    const drawables = buildFunctionDrawables(
      [cartesian('x'), point('1', '1'), cartesian('sin(x)')],
      VIEWPORT,
      SIZE
    );
    expect(drawables).toHaveLength(3);
    expect(drawables.map((d) => d.id)).toEqual(['expr-11', 'expr-12', 'expr-13']);
  });
});

describe('buildFunctionDrawables — Phase 5 graph types', () => {
  it('builds a parametric unit circle', () => {
    const drawables = buildFunctionDrawables(
      [parametric('cos(t)', 'sin(t)', '0', '2*pi')],
      VIEWPORT,
      SIZE
    );
    expect(drawables).toHaveLength(1);
    const drawable = drawables[0] as ParametricDrawable;
    expect(drawable.kind).toBe('parametric');
    const points = drawable.segments.flat();
    expect(points.length).toBeGreaterThan(50);
    for (const p of points) {
      expect(Math.hypot(p.x, p.y)).toBeCloseTo(1, 1);
    }
  });

  it('binds variables inside parametric definitions', () => {
    const env = envWith([['r', '2.5']]);
    const drawable = buildFunctionDrawables(
      [parametric('r*cos(t)', 'r*sin(t)', '0', '2*pi')],
      VIEWPORT,
      SIZE,
      env
    )[0] as ParametricDrawable;
    for (const p of drawable.segments.flat()) {
      expect(Math.hypot(p.x, p.y)).toBeCloseTo(2.5, 0);
    }
  });

  it('skips parametric expressions with invalid t bounds', () => {
    expect(buildFunctionDrawables([parametric('t', 't', '5', '5')], VIEWPORT, SIZE)).toEqual([]);
    expect(buildFunctionDrawables([parametric('t', 't', '10', '0')], VIEWPORT, SIZE)).toEqual([]);
    expect(buildFunctionDrawables([parametric('t', 't+', '0', '1')], VIEWPORT, SIZE)).toEqual([]);
  });

  it('builds a polar circle for r=2', () => {
    const drawable = buildFunctionDrawables([polar('2')], VIEWPORT, SIZE)[0] as PolarDrawable;
    expect(drawable.kind).toBe('polar');
    const points = drawable.segments.flat();
    expect(points.length).toBeGreaterThan(50);
    for (const p of points) {
      expect(Math.hypot(p.x, p.y)).toBeCloseTo(2, 1);
    }
  });

  it('binds variables inside polar definitions', () => {
    const env = envWith([['a', '3']]);
    const drawable = buildFunctionDrawables([polar('a')], VIEWPORT, SIZE, env)[0] as PolarDrawable;
    for (const p of drawable.segments.flat()) {
      expect(Math.hypot(p.x, p.y)).toBeCloseTo(3, 0);
    }
  });

  it('skips invalid polar expressions without throwing', () => {
    expect(buildFunctionDrawables([polar('2+'), polar('1')], VIEWPORT, SIZE)).toHaveLength(1);
  });

  it('builds an inequality region with dashed strict boundary', () => {
    const drawable = buildFunctionDrawables(
      [inequality('y', '<', 'x')],
      VIEWPORT,
      SIZE
    )[0] as InequalityDrawable;
    expect(drawable.kind).toBe('inequality-region');
    expect(drawable.boundaryDashed).toBe(true);
    expect(drawable.fillOpacity).toBeGreaterThan(0);
    expect(drawable.polygons.length).toBeGreaterThan(0);
    expect(drawable.boundary.length).toBeGreaterThan(0);
  });

  it('uses a solid boundary for non-strict inequalities', () => {
    const drawable = buildFunctionDrawables(
      [inequality('y', '<=', 'x')],
      VIEWPORT,
      SIZE
    )[0] as InequalityDrawable;
    expect(drawable.boundaryDashed).toBe(false);
    expect(drawable.polygons.length).toBeGreaterThan(0);
  });

  it('builds x-based inequality regions', () => {
    const drawable = buildFunctionDrawables(
      [inequality('x', '>=', '1')],
      VIEWPORT,
      SIZE
    )[0] as InequalityDrawable;
    expect(drawable.kind).toBe('inequality-region');
    expect(drawable.polygons.length).toBeGreaterThan(0);
    for (const polygon of drawable.polygons) {
      for (const p of polygon) expect(p.x).toBeGreaterThanOrEqual(1 - 0.05);
    }
  });

  it('skips inequalities with an invalid side', () => {
    expect(buildFunctionDrawables([inequality('z', '<', 'x')], VIEWPORT, SIZE)).toEqual([]);
  });

  it('evaluates cartesian expressions with live variable values', () => {
    const env = envWith([['a', '2']]);
    const drawable = buildFunctionDrawables(
      [cartesian('a*x')],
      VIEWPORT,
      SIZE,
      env
    )[0] as FunctionDrawable;
    expect(drawable.kind).toBe('function');
    for (const segment of drawable.segments) {
      for (const p of segment) {
        expect(p.y).toBeCloseTo(2 * p.x, 6);
      }
    }
  });

  it('treats undefined variables as gaps, not crashes', () => {
    const env = envWith([]);
    const drawable = buildFunctionDrawables(
      [cartesian('zzz*x')],
      VIEWPORT,
      SIZE,
      env
    )[0] as FunctionDrawable;
    // NaN everywhere samples to no visible segments, but the drawable exists.
    expect(drawable.kind).toBe('function');
    for (const segment of drawable.segments) {
      for (const p of segment) {
        expect(Number.isFinite(p.y)).toBe(true);
      }
    }
  });
});
