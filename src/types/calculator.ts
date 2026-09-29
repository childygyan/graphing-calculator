/**
 * Central, extensible type model for the graphing calculator.
 *
 * Expressions are a discriminated union on `kind` so new expression families
 * can be added without rewriting consumers. Nothing here is hard-coded to
 * y = f(x): cartesian, parametric, polar, points, inequalities, tables and
 * text notes are all first-class expression kinds.
 */

import type { ThemeMode } from '../data/site.js';

export type ExpressionKind =
  'cartesian' | 'parametric' | 'polar' | 'point' | 'inequality' | 'table' | 'text';

interface BaseExpression {
  id: string;
  kind: ExpressionKind;
  label: string;
  visible: boolean;
  color: string;
  opacity?: number;
  lineWidth?: number;
  metadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
}

/** y = rhs */
export interface CartesianExpression extends BaseExpression {
  kind: 'cartesian';
  definition: { rhs: string };
}

/** (x(t), y(t)) for t in [tMin, tMax] */
export interface ParametricExpression extends BaseExpression {
  kind: 'parametric';
  definition: { xOfT: string; yOfT: string; tMin: string; tMax: string };
}

/** r = r(theta) */
export interface PolarExpression extends BaseExpression {
  kind: 'polar';
  definition: { rOfTheta: string };
}

export interface PointExpression extends BaseExpression {
  kind: 'point';
  definition: { x: string; y: string };
}

export type InequalityOperator = '<' | '<=' | '>' | '>=';

export interface InequalityExpression extends BaseExpression {
  kind: 'inequality';
  definition: { lhs: string; operator: InequalityOperator; rhs: string };
}

export interface TableExpression extends BaseExpression {
  kind: 'table';
  definition: { columns: string[]; rows: string[][] };
}

export interface TextExpression extends BaseExpression {
  kind: 'text';
  definition: { content: string; anchor?: { x: number; y: number } };
}

export type Expression =
  | CartesianExpression
  | ParametricExpression
  | PolarExpression
  | PointExpression
  | InequalityExpression
  | TableExpression
  | TextExpression;

export interface GraphViewport {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/**
 * Graph rendering flags. New flags for later phases go here (keep the shape
 * flat and index-signature-free so misspelled keys are caught by tsc).
 */
export interface GraphSettings {
  showGrid: boolean;
  showAxes: boolean;
  showAxisLabels: boolean;
  degreeMode: boolean;
  squareAspectRatio: boolean;
}

export interface CalculatorState {
  expressions: Expression[];
  viewport: GraphViewport;
  settings: GraphSettings;
  selectedExpressionId: string | null;
  theme: ThemeMode;
}

export interface Point {
  x: number;
  y: number;
}

export interface Slider {
  id: string;
  label: string;
  variable: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export interface Variable {
  name: string;
  value: number;
}
