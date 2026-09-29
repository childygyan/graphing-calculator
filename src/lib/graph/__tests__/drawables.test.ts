import { describe, expect, it } from 'vitest';
import { buildFunctionDrawables, DEFAULT_CURVE_LINE_WIDTH } from '../drawables.js';
import type {
  CartesianExpression,
  Expression,
  GraphViewport,
  PointExpression,
} from '../../../types/calculator.js';
import type { CanvasSize, FunctionDrawable } from '../types.js';

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

  it('skips not-yet-supported kinds (parametric arrives in Phase 5)', () => {
    const parametric = {
      id: 'p1',
      kind: 'parametric',
      label: 'Parametric 1',
      visible: true,
      color: '#000000',
      metadata: {},
      createdAt: 0,
      updatedAt: 0,
      definition: { xOfT: 't', yOfT: 't', tMin: '0', tMax: '10' },
    } as unknown as Expression;
    expect(buildFunctionDrawables([parametric], VIEWPORT, SIZE)).toEqual([]);
  });

  it('handles several expressions in order', () => {
    const drawables = buildFunctionDrawables(
      [cartesian('x'), point('1', '1'), cartesian('sin(x)')],
      VIEWPORT,
      SIZE
    );
    expect(drawables).toHaveLength(3);
    expect(drawables.map((d) => d.id)).toEqual(['expr-10', 'expr-11', 'expr-12']);
  });
});
