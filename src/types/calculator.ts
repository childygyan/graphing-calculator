/**
 * Central, extensible type model for the graphing calculator.
 *
 * Expressions are a discriminated union on `kind` so new expression families
 * can be added without rewriting consumers. Nothing here is hard-coded to
 * y = f(x): cartesian, parametric, polar, points, inequalities, tables,
 * text notes, folders, images, and actions are all first-class expression
 * kinds.
 */

import type { ThemeMode } from '../data/site.js';

export type ExpressionKind =
  | 'cartesian'
  | 'parametric'
  | 'polar'
  | 'point'
  | 'inequality'
  | 'table'
  | 'text'
  | 'folder'
  | 'image'
  | 'action';

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

/**
 * A folder groups other expressions in the list. Children are referenced by
 * id in `definition.children`; the flat expressions array stays the source
 * of truth for ordering. Folders draw nothing on the graph.
 */
export interface FolderExpression extends BaseExpression {
  kind: 'folder';
  definition: { collapsed: boolean; children: string[] };
}

/**
 * An image placed on the graph in world coordinates. `src` is an
 * https:// or data:image/ URL; anything else is rejected at edit time.
 * Images draw nothing until the underlying bitmap finishes loading.
 */
export interface ImageExpression extends BaseExpression {
  kind: 'image';
  definition: {
    src: string;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
    opacity: number;
  };
}

/** One variable assignment applied when an action button is pressed. */
export interface ActionAssignment {
  variable: string;
  /** Math expression evaluated in the current variable scope at press time. */
  value: string;
}

/**
 * A pressable button in the expression list. On press, each assignment is
 * evaluated and written to the named slider variable (created when missing).
 * Actions draw nothing on the graph.
 */
export interface ActionExpression extends BaseExpression {
  kind: 'action';
  definition: { buttonLabel: string; assignments: ActionAssignment[] };
}

export type Expression =
  | CartesianExpression
  | ParametricExpression
  | PolarExpression
  | PointExpression
  | InequalityExpression
  | TableExpression
  | TextExpression
  | FolderExpression
  | ImageExpression
  | ActionExpression;

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
  /** Named numeric variables (sliders) expressions can reference. */
  variables: VariableDefinition[];
  viewport: GraphViewport;
  settings: GraphSettings;
  selectedExpressionId: string | null;
  theme: ThemeMode;
  analysis: AnalysisState;
  /** Transient curve-inspection hit from tapping/clicking the graph. */
  inspectedPoint: InspectedPoint | null;
}

/** A point on a curve the user selected by tapping the graph. */
export interface InspectedPoint {
  expressionId: string;
  x: number;
  y: number;
}

/**
 * A named numeric variable (slider) that expressions can reference, e.g.
 * `a` in `y = a*sin(x)`.
 *
 * `expression` is the value source: usually a numeric literal, but it may
 * reference other variables (`a = b + 1`) — the environment resolves the
 * dependency graph, detects cycles, and evaluates in topological order.
 * `min`/`max`/`step` drive the slider UI and animation range.
 */
export interface VariableDefinition {
  /** Lowercase identifier; never x/t/theta or a function/constant name. */
  name: string;
  expression: string;
  min: number;
  max: number;
  step: number;
}

/** How numbers are formatted across analysis readouts. */
export interface PrecisionSettings {
  mode: 'decimals' | 'significant';
  /** decimals: 0–12 fraction digits; significant: 1–15 significant digits. */
  digits: number;
}

export type AnalysisMarkerKind = 'root' | 'intersection' | 'extremum';

/** A computed finding pinned on the graph (root, intersection, extremum). */
export interface AnalysisMarker {
  id: string;
  kind: AnalysisMarkerKind;
  x: number;
  y: number;
  expressionId: string;
  color: string;
  visible: boolean;
}

/** A definite-integral computation with optional area shading on the graph. */
export interface IntegralAnalysis {
  id: string;
  expressionId: string;
  a: number;
  b: number;
  visible: boolean;
  /** Last computed value (null when never computed or not converged). */
  value: number | null;
  converged: boolean;
}

/** Tangent/normal line inspection at a point on a curve. */
export interface TangentAnalysis {
  id: string;
  expressionId: string;
  x: number;
  showTangent: boolean;
  showNormal: boolean;
  visible: boolean;
}

/** Toggle for plotting the numerical derivative f′(x) of an expression. */
export interface DerivativePlot {
  id: string;
  expressionId: string;
  visible: boolean;
}

/** A user-placed label pinned to a graph coordinate. */
export interface PointAnnotation {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
  visible: boolean;
}

/**
 * Persisted mathematical-analysis state. Findings that must survive reload
 * (markers, integrals, tangents, derivative plots, annotations, precision)
 * live here; throwaway numeric results stay in component-local state.
 */
export interface AnalysisState {
  precision: PrecisionSettings;
  markers: AnalysisMarker[];
  integrals: IntegralAnalysis[];
  tangents: TangentAnalysis[];
  derivativePlots: DerivativePlot[];
  annotations: PointAnnotation[];
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
