/**
 * Phase 3 drawable builder: calculator expressions → GraphDrawable[] for
 * the renderer. This is the only place that couples the expression model
 * to the graph engine: expressions are compiled (cached), sampled into
 * world-coordinate polylines, and wrapped as FunctionDrawables.
 *
 * - cartesian: y = rhs sampled across the viewport's x-range.
 * - point: a constant (x, y) pair drawn as a dot. The renderer only
 *   strokes polylines, so a point is a degenerate two-point segment;
 *   with round line caps it renders as a dot.
 * - other kinds (parametric, polar, …): skipped — later phases.
 * - hidden expressions: skipped. Invalid expressions: skipped here; the
 *   expression editor surfaces the parse error inline.
 *
 * Pure function of (expressions, viewport, size) — safe to memoize.
 */

import type { Expression, GraphViewport } from '../../types/calculator.js';
import { compileExpression } from '../math/engine.js';
import { sampleCartesian } from './sampling.js';
import type { CanvasSize, FunctionDrawable, GraphDrawable, WorldPoint } from './types.js';

/** Stroke width for function curves when the expression sets none. */
export const DEFAULT_CURVE_LINE_WIDTH = 2.5;

function baseDrawable(
  expression: Expression
): Pick<FunctionDrawable, 'id' | 'color' | 'lineWidth' | 'visible'> {
  return {
    id: expression.id,
    color: expression.color,
    lineWidth: expression.lineWidth ?? DEFAULT_CURVE_LINE_WIDTH,
    visible: true,
  };
}

function cartesianDrawable(
  expression: Extract<Expression, { kind: 'cartesian' }>,
  viewport: GraphViewport,
  size: CanvasSize
): FunctionDrawable {
  const compiled = compileExpression(expression.definition.rhs);
  const { segments } = sampleCartesian(compiled.fn, viewport.xMin, viewport.xMax, viewport, size);
  return { ...baseDrawable(expression), kind: 'function', segments };
}

function pointDrawable(
  expression: Extract<Expression, { kind: 'point' }>
): FunctionDrawable | null {
  // Coordinate fields are constant expressions; evaluate at x = 0.
  const cx = compileExpression(expression.definition.x).fn(0);
  const cy = compileExpression(expression.definition.y).fn(0);
  if (!Number.isFinite(cx) || !Number.isFinite(cy)) return null;
  const dot: WorldPoint = { x: cx, y: cy };
  return {
    ...baseDrawable(expression),
    kind: 'function',
    segments: [[dot, { ...dot }]],
  };
}

/**
 * Build render-ready drawables for the visible, plottable expressions.
 * Never throws: an expression that fails to compile or sample is skipped.
 */
export function buildFunctionDrawables(
  expressions: Expression[],
  viewport: GraphViewport,
  size: CanvasSize
): GraphDrawable[] {
  const drawables: GraphDrawable[] = [];
  for (const expression of expressions) {
    if (!expression || expression.visible !== true) continue;
    try {
      if (expression.kind === 'cartesian') {
        drawables.push(cartesianDrawable(expression, viewport, size));
      } else if (expression.kind === 'point') {
        const drawable = pointDrawable(expression);
        if (drawable) drawables.push(drawable);
      }
      // parametric / polar / inequality / table / text: Phase 5+.
    } catch {
      // Invalid expression text — the editor shows the error; the graph
      // simply omits the curve.
    }
  }
  return drawables;
}
