/**
 * Phase 4 analysis drawables: store analysis state → GraphDrawable[].
 *
 * This module is the only place that couples analysis state (markers,
 * integrals, tangents, derivative plots, annotations) to the graph engine.
 * Pure function of (expressions, analysis, viewport, size) — safe to
 * memoize alongside buildFunctionDrawables. Never throws: anything that
 * fails to compile or compute is skipped.
 */

import type {
  AnalysisMarkerKind,
  AnalysisState,
  Expression,
  GraphViewport,
} from '../../types/calculator.js';
import { compileExpressionScoped } from '../math/engine.js';
import type { CompiledFunction } from '../math/compiler.js';
import type { VariableEnvironment } from '../math/variables.js';
import {
  CARTESIAN_PARAMETER,
  VariableEnvironment as VariableEnvironmentImpl,
} from '../math/variables.js';
import { centralDerivative, tangentAt } from '../math/analysis.js';
import type { LineSpec } from '../math/analysis.js';
import { sampleCartesian } from './sampling.js';
import type {
  AnnotationDrawable,
  AreaDrawable,
  CanvasSize,
  FunctionDrawable,
  GraphDrawable,
  PointMarkerDrawable,
  SegmentDrawable,
  WorldPoint,
} from './types.js';

/** Samples across [a, b] when building an integral shading polygon. */
const INTEGRAL_SAMPLE_COUNT = 240;

/**
 * Clip an infinite line spec to the viewport rectangle. Returns the two
 * extreme points of the visible portion, or null when the line misses the
 * viewport entirely.
 */
export function clipLineToViewport(
  spec: LineSpec,
  viewport: GraphViewport
): [WorldPoint, WorldPoint] | null {
  const { xMin, xMax, yMin, yMax } = viewport;
  if (
    !Number.isFinite(xMin) ||
    !Number.isFinite(xMax) ||
    !Number.isFinite(yMin) ||
    !Number.isFinite(yMax) ||
    xMin >= xMax ||
    yMin >= yMax
  ) {
    return null;
  }
  if (spec.kind === 'vertical') {
    if (!Number.isFinite(spec.x) || spec.x < xMin || spec.x > xMax) return null;
    return [
      { x: spec.x, y: yMin },
      { x: spec.x, y: yMax },
    ];
  }
  const { slope, intercept } = spec;
  if (!Number.isFinite(slope) || !Number.isFinite(intercept)) return null;
  const candidates: WorldPoint[] = [];
  const pushIfInside = (x: number, y: number): void => {
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) candidates.push({ x, y });
  };
  // Intersections with the left/right edges.
  pushIfInside(xMin, slope * xMin + intercept);
  pushIfInside(xMax, slope * xMax + intercept);
  // Intersections with the bottom/top edges (skip when horizontal).
  if (slope !== 0) {
    pushIfInside((yMin - intercept) / slope, yMin);
    pushIfInside((yMax - intercept) / slope, yMax);
  }
  if (candidates.length < 2) return null;
  // The visible portion spans the two most distant candidates.
  let best: [WorldPoint, WorldPoint] = [candidates[0], candidates[1]];
  let bestDist = -1;
  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const dx = candidates[i].x - candidates[j].x;
      const dy = candidates[i].y - candidates[j].y;
      const dist = dx * dx + dy * dy;
      if (dist > bestDist) {
        bestDist = dist;
        best = [candidates[i], candidates[j]];
      }
    }
  }
  return best;
}

/**
 * Build the filled polygon(s) between a curve and the x-axis over [a, b].
 * NaN gaps split the region into separate polygons so asymptotes never get
 * filled across.
 */
export function integralPolygons(fn: CompiledFunction, a: number, b: number): WorldPoint[][] {
  if (!Number.isFinite(a) || !Number.isFinite(b) || a === b) return [];
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const polygons: WorldPoint[][] = [];
  let top: WorldPoint[] = [];
  const flush = (): void => {
    if (top.length >= 2) {
      const ring: WorldPoint[] = [...top];
      for (let i = top.length - 1; i >= 0; i--) {
        ring.push({ x: top[i].x, y: 0 });
      }
      polygons.push(ring);
    }
    top = [];
  };
  for (let i = 0; i <= INTEGRAL_SAMPLE_COUNT; i++) {
    const x = lo + ((hi - lo) * i) / INTEGRAL_SAMPLE_COUNT;
    const y = fn(x);
    if (typeof y !== 'number' || !Number.isFinite(y)) {
      flush();
      continue;
    }
    top.push({ x, y });
  }
  flush();
  return polygons;
}

function findCartesian(
  expressions: Expression[],
  expressionId: string
): Extract<Expression, { kind: 'cartesian' }> | null {
  const found = expressions.find((e) => e.id === expressionId);
  return found && found.kind === 'cartesian' ? found : null;
}

function compileRhs(
  expression: { definition: { rhs: string } },
  env: VariableEnvironment
): CompiledFunction | null {
  try {
    return compileExpressionScoped(expression.definition.rhs, {
      parameter: CARTESIAN_PARAMETER,
      env,
    }).fn;
  } catch {
    return null;
  }
}

/** Default environment for callers that have no variables. */
const defaultEnvironment = new VariableEnvironmentImpl([]);

const MARKER_RADIUS: Record<AnalysisMarkerKind, number> = {
  root: 5,
  intersection: 6,
  extremum: 5,
};

function markerDrawables(analysis: AnalysisState): PointMarkerDrawable[] {
  const groups = new Map<string, PointMarkerDrawable>();
  for (const marker of analysis.markers) {
    if (marker.visible !== true) continue;
    if (!Number.isFinite(marker.x) || !Number.isFinite(marker.y)) continue;
    const key = `${marker.kind}:${marker.color}`;
    let group = groups.get(key);
    if (!group) {
      group = {
        kind: 'point',
        id: `markers:${key}`,
        color: marker.color,
        lineWidth: 1,
        visible: true,
        radius: MARKER_RADIUS[marker.kind],
        points: [],
      };
      groups.set(key, group);
    }
    group.points.push({ x: marker.x, y: marker.y });
  }
  return [...groups.values()];
}

function integralDrawables(
  expressions: Expression[],
  analysis: AnalysisState,
  env: VariableEnvironment
): AreaDrawable[] {
  const out: AreaDrawable[] = [];
  for (const integral of analysis.integrals) {
    if (integral.visible !== true) continue;
    const expression = findCartesian(expressions, integral.expressionId);
    if (!expression) continue;
    const fn = compileRhs(expression, env);
    if (!fn) continue;
    const polygons = integralPolygons(fn, integral.a, integral.b);
    if (polygons.length === 0) continue;
    out.push({
      kind: 'area',
      id: `integral:${integral.id}`,
      color: expression.color,
      lineWidth: 1,
      visible: true,
      polygons,
      fillOpacity: 0.22,
    });
  }
  return out;
}

function tangentDrawables(
  expressions: Expression[],
  analysis: AnalysisState,
  viewport: GraphViewport,
  env: VariableEnvironment
): SegmentDrawable[] {
  const out: SegmentDrawable[] = [];
  for (const item of analysis.tangents) {
    if (item.visible !== true) continue;
    const expression = findCartesian(expressions, item.expressionId);
    if (!expression) continue;
    const fn = compileRhs(expression, env);
    if (!fn) continue;
    const info = tangentAt(fn, item.x);
    if (!info) continue;
    if (item.showTangent) {
      const clipped = clipLineToViewport(info.tangent, viewport);
      if (clipped) {
        out.push({
          kind: 'segment',
          id: `tangent:${item.id}`,
          color: expression.color,
          lineWidth: 2,
          visible: true,
          dashed: true,
          from: clipped[0],
          to: clipped[1],
        });
      }
    }
    if (item.showNormal) {
      const clipped = clipLineToViewport(info.normal, viewport);
      if (clipped) {
        out.push({
          kind: 'segment',
          id: `normal:${item.id}`,
          color: expression.color,
          lineWidth: 1.5,
          visible: true,
          dashed: true,
          from: clipped[0],
          to: clipped[1],
        });
      }
    }
  }
  return out;
}

function derivativeDrawables(
  expressions: Expression[],
  analysis: AnalysisState,
  viewport: GraphViewport,
  size: CanvasSize,
  env: VariableEnvironment
): FunctionDrawable[] {
  const out: FunctionDrawable[] = [];
  for (const plot of analysis.derivativePlots) {
    if (plot.visible !== true) continue;
    const expression = findCartesian(expressions, plot.expressionId);
    if (!expression) continue;
    const fn = compileRhs(expression, env);
    if (!fn) continue;
    const derivativeFn: CompiledFunction = (x: number) => centralDerivative(fn, x);
    const { segments } = sampleCartesian(
      derivativeFn,
      viewport.xMin,
      viewport.xMax,
      viewport,
      size
    );
    out.push({
      kind: 'function',
      id: `derivative:${plot.id}`,
      color: expression.color,
      lineWidth: 2,
      visible: true,
      dashed: true,
      segments,
    });
  }
  return out;
}

function annotationDrawables(analysis: AnalysisState): AnnotationDrawable[] {
  const out: AnnotationDrawable[] = [];
  for (const annotation of analysis.annotations) {
    if (annotation.visible !== true) continue;
    if (!Number.isFinite(annotation.x) || !Number.isFinite(annotation.y)) continue;
    out.push({
      kind: 'annotation',
      id: `annotation:${annotation.id}`,
      color: annotation.color,
      lineWidth: 1,
      visible: true,
      at: { x: annotation.x, y: annotation.y },
      label: annotation.label,
    });
  }
  return out;
}

/**
 * Build every analysis overlay drawable. Never throws: a missing
 * expression, a compile failure, or a non-computable value skips that
 * overlay while the rest still render.
 */
export function buildAnalysisDrawables(
  expressions: Expression[],
  analysis: AnalysisState,
  viewport: GraphViewport,
  size: CanvasSize,
  env: VariableEnvironment = defaultEnvironment
): GraphDrawable[] {
  try {
    env.resolve();
  } catch {
    // A hostile environment never takes down the frame.
  }
  try {
    return [
      ...markerDrawables(analysis),
      ...integralDrawables(expressions, analysis, env),
      ...tangentDrawables(expressions, analysis, viewport, env),
      ...derivativeDrawables(expressions, analysis, viewport, size, env),
      ...annotationDrawables(analysis),
    ];
  } catch {
    return [];
  }
}
