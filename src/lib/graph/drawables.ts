/**
 * Phase 5 drawable builder: calculator expressions → GraphDrawable[] for
 * the renderer. This is the only place that couples the expression model
 * to the graph engine: expressions are compiled (cached, variable-scoped),
 * sampled into world-coordinate polylines, and wrapped as drawables.
 *
 * - cartesian: y = rhs sampled across the viewport's x-range (parameter x).
 * - point: a constant (x, y) pair drawn as a dot. The renderer only
 *   strokes polylines, so a point is a degenerate two-point segment;
 *   with round line caps it renders as a dot.
 * - parametric: (x(t), y(t)) over [tMin, tMax] (parameter t).
 * - polar: r(theta) over theta in [0, 2π] (parameter theta).
 * - inequality: y </<=/>/>= f(x) or x </<=/>/>= g(y) → a filled region
 *   polygon plus a boundary curve (dashed for strict inequalities).
 * - table: rows plotted as point markers. Each cell is a math expression
 *   evaluated in the shared variable scope; unparsable or non-finite cells
 *   are skipped, never fatal.
 * - image: an ImageDrawable carrying world-space geometry; the renderer
 *   paints the bitmap once it finishes loading (async image cache).
 * - text, folder, action: never draw — list-only items.
 * - hidden expressions: skipped. Invalid expressions: skipped here; the
 *   expression editor surfaces the parse error inline.
 *
 * The caller owns the VariableEnvironment and passes it in; resolve() runs
 * once per build so every expression in the frame sees the same values.
 * Pure function of (expressions, viewport, size, env) — safe to memoize.
 */

import type { Expression, GraphViewport, InequalityOperator } from '../../types/calculator.js';
import { compileExpressionScoped } from '../math/engine.js';
import type { VariableEnvironment } from '../math/variables.js';
import {
  CARTESIAN_PARAMETER,
  PARAMETRIC_PARAMETER,
  POLAR_PARAMETER,
  VariableEnvironment as VariableEnvironmentImpl,
} from '../math/variables.js';
import { sampleCartesian } from './sampling.js';
import { sampleInequality, sampleParametric, samplePolar } from './advancedSampling.js';
import type {
  CanvasSize,
  FunctionDrawable,
  GraphDrawable,
  ImageDrawable,
  InequalityDrawable,
  ParametricDrawable,
  PointMarkerDrawable,
  PolarDrawable,
  WorldPoint,
} from './types.js';

/** Stroke width for function curves when the expression sets none. */
export const DEFAULT_CURVE_LINE_WIDTH = 2.5;

/** Fill opacity for inequality regions. */
export const INEQUALITY_FILL_OPACITY = 0.25;

/** Default environment for callers that have no variables. */
const defaultEnvironment = new VariableEnvironmentImpl([]);

type DrawableBase = Pick<FunctionDrawable, 'id' | 'color' | 'lineWidth' | 'visible'>;

function baseDrawable(expression: Expression): DrawableBase {
  return {
    id: expression.id,
    color: expression.color,
    lineWidth: expression.lineWidth ?? DEFAULT_CURVE_LINE_WIDTH,
    visible: true,
  };
}

function scoped(
  source: string,
  parameter: string,
  env: VariableEnvironment
): (v: number) => number {
  return compileExpressionScoped(source, { parameter, env }).fn;
}

/**
 * Table rows → point markers. Cells are math expressions in the shared
 * variable scope, so `a` in a cell follows the slider. Blank, unparsable,
 * or non-finite cells are skipped; a table with no plottable rows draws
 * nothing.
 */
function tableDrawable(
  expression: Extract<Expression, { kind: 'table' }>,
  env: VariableEnvironment
): PointMarkerDrawable | null {
  const points: WorldPoint[] = [];
  for (const row of expression.definition.rows) {
    const xSource = row[0] ?? '';
    const ySource = row[1] ?? '';
    if (xSource.trim() === '' || ySource.trim() === '') continue;
    try {
      const x = scoped(xSource, CARTESIAN_PARAMETER, env)(0);
      const y = scoped(ySource, CARTESIAN_PARAMETER, env)(0);
      if (Number.isFinite(x) && Number.isFinite(y)) points.push({ x, y });
    } catch {
      // Bad cell — the table editor shows no error for graph-only cells;
      // the point is simply omitted.
    }
  }
  if (points.length === 0) return null;
  return {
    ...baseDrawable(expression),
    kind: 'point',
    points,
    radius: 5,
  };
}

/**
 * Image → world-space image drawable. The bitmap itself loads
 * asynchronously (see lib/graph/images.ts); the renderer paints it when
 * ready. Empty sources and non-positive geometry draw nothing.
 */
function imageDrawable(expression: Extract<Expression, { kind: 'image' }>): ImageDrawable | null {
  const { src, centerX, centerY, width, height, opacity } = expression.definition;
  if (typeof src !== 'string' || src.trim() === '') return null;
  if (![centerX, centerY, width, height].every(Number.isFinite)) return null;
  if (!(width > 0) || !(height > 0)) return null;
  const clampedOpacity =
    typeof opacity === 'number' && Number.isFinite(opacity) ? Math.min(1, Math.max(0, opacity)) : 1;
  return {
    ...baseDrawable(expression),
    kind: 'image',
    src: src.trim(),
    centerX,
    centerY,
    width,
    height,
    opacity: clampedOpacity,
  };
}

function cartesianDrawable(
  expression: Extract<Expression, { kind: 'cartesian' }>,
  viewport: GraphViewport,
  size: CanvasSize,
  env: VariableEnvironment
): FunctionDrawable {
  const compiled = scoped(expression.definition.rhs, CARTESIAN_PARAMETER, env);
  const { segments } = sampleCartesian(compiled, viewport.xMin, viewport.xMax, viewport, size);
  return { ...baseDrawable(expression), kind: 'function', segments };
}

function pointDrawable(
  expression: Extract<Expression, { kind: 'point' }>,
  env: VariableEnvironment
): FunctionDrawable | null {
  // Coordinate fields are constant expressions; evaluate at x = 0.
  const cx = scoped(expression.definition.x, CARTESIAN_PARAMETER, env)(0);
  const cy = scoped(expression.definition.y, CARTESIAN_PARAMETER, env)(0);
  if (!Number.isFinite(cx) || !Number.isFinite(cy)) return null;
  const dot: WorldPoint = { x: cx, y: cy };
  return {
    ...baseDrawable(expression),
    kind: 'function',
    segments: [[dot, { ...dot }]],
  };
}

/** Evaluate a constant-ish field (tMin, tMax); NaN when not a number. */
function constantValue(source: string, env: VariableEnvironment): number {
  try {
    return scoped(source, PARAMETRIC_PARAMETER, env)(0);
  } catch {
    return NaN;
  }
}

function parametricDrawable(
  expression: Extract<Expression, { kind: 'parametric' }>,
  viewport: GraphViewport,
  size: CanvasSize,
  env: VariableEnvironment
): ParametricDrawable | null {
  const xFn = scoped(expression.definition.xOfT, PARAMETRIC_PARAMETER, env);
  const yFn = scoped(expression.definition.yOfT, PARAMETRIC_PARAMETER, env);
  const tMin = constantValue(expression.definition.tMin, env);
  const tMax = constantValue(expression.definition.tMax, env);
  if (!Number.isFinite(tMin) || !Number.isFinite(tMax) || tMin >= tMax) return null;
  const { segments } = sampleParametric(xFn, yFn, tMin, tMax, viewport, size);
  return { ...baseDrawable(expression), kind: 'parametric', segments };
}

function polarDrawable(
  expression: Extract<Expression, { kind: 'polar' }>,
  viewport: GraphViewport,
  size: CanvasSize,
  env: VariableEnvironment
): PolarDrawable {
  const rFn = scoped(expression.definition.rOfTheta, POLAR_PARAMETER, env);
  const { segments } = samplePolar(rFn, viewport, size);
  return { ...baseDrawable(expression), kind: 'polar', segments };
}

function inequalityDrawable(
  expression: Extract<Expression, { kind: 'inequality' }>,
  viewport: GraphViewport,
  size: CanvasSize,
  env: VariableEnvironment
): InequalityDrawable | null {
  const lhs = expression.definition.lhs.trim().toLowerCase();
  if (lhs !== 'x' && lhs !== 'y') return null;
  const operator: InequalityOperator = expression.definition.operator;
  // y-based: rhs is f(x); x-based: rhs is g(y).
  const parameter = lhs === 'y' ? CARTESIAN_PARAMETER : 'y';
  const fn = scoped(expression.definition.rhs, parameter, env);
  const { polygons, boundary } = sampleInequality(lhs, operator, fn, viewport, size);
  return {
    ...baseDrawable(expression),
    kind: 'inequality-region',
    polygons,
    fillOpacity: INEQUALITY_FILL_OPACITY,
    boundary,
    boundaryDashed: operator === '<' || operator === '>',
  };
}

/**
 * Build render-ready drawables for the visible, plottable expressions.
 * Resolves the variable environment once so the whole frame shares one
 * consistent set of values. Never throws: an expression that fails to
 * compile or sample is skipped.
 */
export function buildFunctionDrawables(
  expressions: Expression[],
  viewport: GraphViewport,
  size: CanvasSize,
  env: VariableEnvironment = defaultEnvironment
): GraphDrawable[] {
  try {
    env.resolve();
  } catch {
    // A hostile environment never takes down the frame.
  }
  const drawables: GraphDrawable[] = [];
  for (const expression of expressions) {
    if (!expression || expression.visible !== true) continue;
    try {
      if (expression.kind === 'cartesian') {
        drawables.push(cartesianDrawable(expression, viewport, size, env));
      } else if (expression.kind === 'point') {
        const drawable = pointDrawable(expression, env);
        if (drawable) drawables.push(drawable);
      } else if (expression.kind === 'parametric') {
        const drawable = parametricDrawable(expression, viewport, size, env);
        if (drawable) drawables.push(drawable);
      } else if (expression.kind === 'polar') {
        drawables.push(polarDrawable(expression, viewport, size, env));
      } else if (expression.kind === 'inequality') {
        const drawable = inequalityDrawable(expression, viewport, size, env);
        if (drawable) drawables.push(drawable);
      } else if (expression.kind === 'table') {
        const drawable = tableDrawable(expression, env);
        if (drawable) drawables.push(drawable);
      } else if (expression.kind === 'image') {
        const drawable = imageDrawable(expression);
        if (drawable) drawables.push(drawable);
      }
      // text / folder / action: list-only, never drawn.
    } catch {
      // Invalid expression text — the editor shows the error; the graph
      // simply omits the curve.
    }
  }
  return drawables;
}

/** The shared default environment (no variables defined). */
export function getDefaultEnvironment(): VariableEnvironment {
  return defaultEnvironment;
}
