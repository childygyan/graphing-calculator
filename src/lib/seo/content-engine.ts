/**
 * Mathematical content engine (Phase 8).
 *
 * Computes real, build-time facts about expressions using the project's own
 * math library (`src/lib/math`). Function/example pages render these facts as
 * page content, so every mathematical claim on those pages is derived from
 * actual computation — never fabricated.
 *
 * All functions are pure and synchronous except share-payload encoding, which
 * uses the async `encodeSharePayload` from the persistence layer.
 */

import {
  adaptiveSimpson,
  brentRoot,
  centralDerivative,
  findAllRoots,
  findExtrema,
  type Extremum,
} from '../math/analysis.js';
import { compileExpression } from '../math/engine.js';
import { formatNumber } from '../math/format.js';
import {
  createExpression,
  DEFAULT_GRAPH_SETTINGS,
  DEFAULT_VIEWPORT,
} from '../expressions/expressions.js';
import { encodeSharePayload } from '../persistence/share.js';
import {
  GRAPH_DOCUMENT_APP,
  GRAPH_DOCUMENT_VERSION,
  type GraphDocument,
} from '../persistence/document.js';
import { createDefaultAnalysisState } from '../analysis/state.js';
import type { ExampleExpression, ExampleGraphData } from '../../data/seo/types.js';
import type { Expression } from '../../types/calculator.js';

const FACTS_INTERVAL: [number, number] = [-10, 10];
const SAMPLE_XS = [-2, -1, 0, 1, 2];

/** A single row of a value table: x and f(x). */
export interface SamplePoint {
  x: number;
  /** null when f(x) is undefined / non-finite at x. */
  y: number | null;
}

/** Build-time computed facts for one cartesian expression in x. */
export interface FunctionFacts {
  /** The source expression. */
  expression: string;
  /** False when the expression failed to compile (page should not render). */
  ok: boolean;
  /** Roots of f in [-10, 10], ascending. */
  roots: number[];
  /** Local extrema of f in [-10, 10], ordered by x. */
  extrema: Extremum[];
  /** f(0), or null when undefined there. */
  yIntercept: number | null;
  /** Sample values at x = -2, -1, 0, 1, 2. */
  samples: SamplePoint[];
  /** f(1), or null when undefined there. */
  valueAtOne: number | null;
  /** Numeric f'(1), or null when it cannot be estimated. */
  derivativeAtOne: number | null;
  /** Numeric ∫₀¹ f(x) dx, or null when it cannot be estimated. */
  integralZeroToOne: number | null;
  /** Formatted strings, ready for templates. */
  formatted: {
    roots: string[];
    extrema: { kind: string; x: string; y: string }[];
    yIntercept: string;
    valueAtOne: string;
    derivativeAtOne: string;
    integralZeroToOne: string;
  };
}

function finiteOrNull(value: number): number | null {
  return Number.isFinite(value) ? value : null;
}

function fmt(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return 'undefined';
  return formatNumber(value, { mode: 'decimals', digits: 4 });
}

/**
 * Compute build-time facts for a cartesian expression in x.
 * Never throws: on any failure the returned object has `ok: false`.
 */
export function computeFunctionFacts(expression: string): FunctionFacts {
  const empty: FunctionFacts = {
    expression,
    ok: false,
    roots: [],
    extrema: [],
    yIntercept: null,
    samples: [],
    valueAtOne: null,
    derivativeAtOne: null,
    integralZeroToOne: null,
    formatted: {
      roots: [],
      extrema: [],
      yIntercept: 'undefined',
      valueAtOne: 'undefined',
      derivativeAtOne: 'undefined',
      integralZeroToOne: 'undefined',
    },
  };
  try {
    const compiled = compileExpression(expression);
    const fn = compiled.fn;
    const roots = findAllRoots(fn, FACTS_INTERVAL[0], FACTS_INTERVAL[1]);
    const extrema = findExtrema(fn, FACTS_INTERVAL[0], FACTS_INTERVAL[1]);
    const yIntercept = finiteOrNull(fn(0));
    const valueAtOne = finiteOrNull(fn(1));
    const samples: SamplePoint[] = SAMPLE_XS.map((x) => ({ x, y: finiteOrNull(fn(x)) }));

    let derivativeAtOne: number | null = null;
    try {
      const d = centralDerivative(fn, 1);
      derivativeAtOne = Number.isFinite(d) ? d : null;
    } catch {
      derivativeAtOne = null;
    }

    let integralZeroToOne: number | null = null;
    try {
      const result = adaptiveSimpson(fn, 0, 1);
      integralZeroToOne = Number.isFinite(result.value) ? result.value : null;
    } catch {
      integralZeroToOne = null;
    }

    return {
      expression,
      ok: true,
      roots,
      extrema,
      yIntercept,
      samples,
      valueAtOne,
      derivativeAtOne,
      integralZeroToOne,
      formatted: {
        roots: roots.map((r) => formatNumber(r, { mode: 'decimals', digits: 4 })),
        extrema: extrema.map((e) => ({
          kind: e.kind === 'min' ? 'local minimum' : 'local maximum',
          x: formatNumber(e.x, { mode: 'decimals', digits: 4 }),
          y: formatNumber(e.y, { mode: 'decimals', digits: 4 }),
        })),
        yIntercept: fmt(yIntercept),
        valueAtOne: fmt(valueAtOne),
        derivativeAtOne: fmt(derivativeAtOne),
        integralZeroToOne: fmt(integralZeroToOne),
      },
    };
  } catch {
    return empty;
  }
}

/**
 * Locate a root of f near a guess using Brent's method (build-time helper
 * for example pages that want a specific computed value, e.g. a vertex x).
 * Returns null when no bracketed root is found.
 */
export function findRootNear(expression: string, a: number, b: number): number | null {
  try {
    const fn = compileExpression(expression).fn;
    const root = brentRoot(fn, a, b);
    return Number.isFinite(root) ? root : null;
  } catch {
    return null;
  }
}

/**
 * Build a shareable `/graph/#s=…` URL that preloads the given example graph.
 * The payload is produced by the same encoder the app uses for share links,
 * so the link opens exactly what the example page describes.
 */
export async function buildExampleShareUrl(example: ExampleGraphData): Promise<string> {
  const expressions: Expression[] = example.expressions.map((spec, index) =>
    buildExampleExpression(spec, index)
  );
  const viewport = example.viewport
    ? {
        xMin: example.viewport.xMin,
        xMax: example.viewport.xMax,
        yMin: example.viewport.yMin,
        yMax: example.viewport.yMax,
      }
    : { ...DEFAULT_VIEWPORT };
  const document: GraphDocument = {
    app: GRAPH_DOCUMENT_APP,
    version: GRAPH_DOCUMENT_VERSION,
    expressions,
    variables: [],
    viewport,
    settings: { ...DEFAULT_GRAPH_SETTINGS },
    selectedExpressionId: null,
    theme: 'system',
    analysis: createDefaultAnalysisState(),
  };
  const payload = await encodeSharePayload(document);
  return `/graph/#s=${payload}`;
}

function buildExampleExpression(spec: ExampleExpression, index: number): Expression {
  switch (spec.kind) {
    case 'parametric':
      return createExpression('parametric', index, {
        label: spec.label ?? `Parametric ${index + 1}`,
        definition: {
          xOfT: spec.xOfT ?? 't',
          yOfT: spec.yOfT ?? 't',
          tMin: spec.tMin ?? '0',
          tMax: spec.tMax ?? '10',
        },
      });
    case 'polar':
      return createExpression('polar', index, {
        label: spec.label ?? `Polar ${index + 1}`,
        definition: { rOfTheta: spec.rOfTheta ?? '1' },
      });
    case 'inequality':
      return createExpression('inequality', index, {
        label: spec.label ?? `Inequality ${index + 1}`,
        definition: {
          lhs: spec.inequality?.lhs ?? 'y',
          operator: spec.inequality?.operator ?? '<',
          rhs: spec.inequality?.rhs ?? 'x',
        },
      });
    case 'cartesian':
    default:
      return createExpression('cartesian', index, {
        label: spec.label ?? `Function ${index + 1}`,
        definition: { rhs: spec.rhs ?? 'x' },
      });
  }
}
