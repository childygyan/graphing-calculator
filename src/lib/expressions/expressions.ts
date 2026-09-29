/**
 * Expression factories, defaults, and pure helpers.
 *
 * No math happens here: summaries format raw definition strings, and
 * factories only fill in empty default shapes.
 */

import type { ThemeMode } from '../../data/site.js';
import type {
  CalculatorState,
  Expression,
  ExpressionKind,
  GraphSettings,
  GraphViewport,
} from '../../types/calculator.js';

/** 8 original line colors, readable on white and on dark slate. */
export const EXPRESSION_COLORS: string[] = [
  '#2563eb', // blue
  '#dc2626', // red
  '#059669', // green
  '#d97706', // amber
  '#7c3aed', // violet
  '#db2777', // pink
  '#0891b2', // cyan
  '#65a30d', // lime
];

export const EXPRESSION_KIND_LABELS: Record<ExpressionKind, string> = {
  cartesian: 'Cartesian',
  parametric: 'Parametric',
  polar: 'Polar',
  point: 'Point',
  inequality: 'Inequality',
  table: 'Table',
  text: 'Text note',
};

export const DEFAULT_VIEWPORT: GraphViewport = {
  xMin: -10,
  xMax: 10,
  yMin: -10,
  yMax: 10,
};

export const DEFAULT_GRAPH_SETTINGS: GraphSettings = {
  showGrid: true,
  showAxes: true,
  showAxisLabels: true,
  degreeMode: false,
  squareAspectRatio: false,
};

const EXPRESSION_KINDS: readonly ExpressionKind[] = [
  'cartesian',
  'parametric',
  'polar',
  'point',
  'inequality',
  'table',
  'text',
];

/** Round-robin palette cursor; module-level so colors cycle across calls. */
let nextColorIndex = 0;

/** Per-kind label counter so defaults read "Cartesian 1", "Cartesian 2", ... */
const kindCounters: Record<ExpressionKind, number> = {
  cartesian: 0,
  parametric: 0,
  polar: 0,
  point: 0,
  inequality: 0,
  table: 0,
  text: 0,
};

export function createExpressionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'expr-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

interface ExpressionBase {
  id: string;
  label: string;
  visible: boolean;
  color: string;
  metadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
}

function baseExpression(kind: ExpressionKind, seedIndex?: number): ExpressionBase {
  kindCounters[kind] += 1;
  const color = EXPRESSION_COLORS[(seedIndex ?? nextColorIndex++) % EXPRESSION_COLORS.length];
  const now = Date.now();
  return {
    id: createExpressionId(),
    label: `${EXPRESSION_KIND_LABELS[kind]} ${kindCounters[kind]}`,
    visible: true,
    color,
    metadata: {},
    createdAt: now,
    updatedAt: now,
  };
}

function applyOverrides<T extends Expression>(
  expression: T,
  overrides: Partial<Expression> | undefined
): T {
  if (!overrides) return expression;
  return Object.assign(expression, overrides);
}

/**
 * Build a full Expression with sensible empty defaults per kind.
 * `seedIndex` pins the palette color (useful for deterministic defaults);
 * otherwise colors cycle round-robin across calls.
 */
export function createExpression(
  kind: ExpressionKind,
  seedIndex?: number,
  overrides?: Partial<Expression>
): Expression {
  switch (kind) {
    case 'cartesian':
      return applyOverrides(
        { ...baseExpression(kind, seedIndex), kind, definition: { rhs: 'x' } },
        overrides
      );
    case 'parametric':
      return applyOverrides(
        {
          ...baseExpression(kind, seedIndex),
          kind,
          definition: { xOfT: 't', yOfT: 't', tMin: '0', tMax: '10' },
        },
        overrides
      );
    case 'polar':
      return applyOverrides(
        { ...baseExpression(kind, seedIndex), kind, definition: { rOfTheta: '1' } },
        overrides
      );
    case 'point':
      return applyOverrides(
        { ...baseExpression(kind, seedIndex), kind, definition: { x: '0', y: '0' } },
        overrides
      );
    case 'inequality':
      return applyOverrides(
        {
          ...baseExpression(kind, seedIndex),
          kind,
          definition: { lhs: 'y', operator: '<', rhs: 'x' },
        },
        overrides
      );
    case 'table':
      return applyOverrides(
        {
          ...baseExpression(kind, seedIndex),
          kind,
          definition: { columns: ['x', 'y'], rows: [] },
        },
        overrides
      );
    case 'text':
      return applyOverrides(
        { ...baseExpression(kind, seedIndex), kind, definition: { content: '' } },
        overrides
      );
  }
}

export function isExpressionKind(value: unknown): value is ExpressionKind {
  return typeof value === 'string' && (EXPRESSION_KINDS as readonly string[]).includes(value);
}

/**
 * Short human-readable summary of an expression. Pure string formatting of
 * the raw definition strings — no parsing, no evaluation.
 */
export function getExpressionSummary(expression: Expression): string {
  switch (expression.kind) {
    case 'cartesian':
      return `y = ${expression.definition.rhs}`;
    case 'parametric': {
      const { xOfT, yOfT } = expression.definition;
      return `(x(t), y(t)) = (${xOfT}, ${yOfT})`;
    }
    case 'polar':
      return `r = ${expression.definition.rOfTheta}`;
    case 'point':
      return `(${expression.definition.x}, ${expression.definition.y})`;
    case 'inequality': {
      const { lhs, operator, rhs } = expression.definition;
      return `${lhs} ${operator} ${rhs}`;
    }
    case 'table': {
      const { columns, rows } = expression.definition;
      return `Table (${columns.length} columns x ${rows.length} rows)`;
    }
    case 'text': {
      const content = expression.definition.content.trim();
      const preview = content.length > 40 ? content.slice(0, 40) + '...' : content;
      return preview ? `Note: ${preview}` : 'Note: (empty)';
    }
  }
}

export function createInitialCalculatorState(theme: ThemeMode): CalculatorState {
  const first = createExpression('cartesian', 0);
  return {
    expressions: [first],
    viewport: { ...DEFAULT_VIEWPORT },
    settings: { ...DEFAULT_GRAPH_SETTINGS },
    selectedExpressionId: first.id,
    theme,
  };
}
