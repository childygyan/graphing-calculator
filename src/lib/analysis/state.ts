/**
 * Analysis state defaults and hydration sanitizer.
 *
 * The calculator store persists CalculatorState to localStorage; this
 * module builds the default AnalysisState and coerces unknown stored
 * payloads back into shape so corrupt/old data can never crash the app.
 */

import type {
  AnalysisMarker,
  AnalysisMarkerKind,
  AnalysisState,
  DerivativePlot,
  IntegralAnalysis,
  PointAnnotation,
  PrecisionSettings,
  TangentAnalysis,
} from '../../types/calculator.js';
import { sanitizePrecision } from '../math/format.js';

export function createDefaultAnalysisState(): AnalysisState {
  return {
    precision: { mode: 'decimals', digits: 4 },
    markers: [],
    integrals: [],
    tangents: [],
    derivativePlots: [],
    annotations: [],
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isMarkerKind(value: unknown): value is AnalysisMarkerKind {
  return value === 'root' || value === 'intersection' || value === 'extremum';
}

function sanitizeMarkers(value: unknown): AnalysisMarker[] {
  if (!Array.isArray(value)) return [];
  const out: AnalysisMarker[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    if (
      isNonEmptyString(item.id) &&
      isMarkerKind(item.kind) &&
      isFiniteNumber(item.x) &&
      isFiniteNumber(item.y) &&
      isNonEmptyString(item.expressionId) &&
      typeof item.color === 'string'
    ) {
      out.push({
        id: item.id,
        kind: item.kind,
        x: item.x,
        y: item.y,
        expressionId: item.expressionId,
        color: item.color,
        visible: item.visible !== false,
      });
    }
  }
  return out;
}

function sanitizeIntegrals(value: unknown): IntegralAnalysis[] {
  if (!Array.isArray(value)) return [];
  const out: IntegralAnalysis[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    if (
      isNonEmptyString(item.id) &&
      isNonEmptyString(item.expressionId) &&
      isFiniteNumber(item.a) &&
      isFiniteNumber(item.b)
    ) {
      out.push({
        id: item.id,
        expressionId: item.expressionId,
        a: item.a,
        b: item.b,
        visible: item.visible !== false,
        value: isFiniteNumber(item.value) ? item.value : null,
        converged: item.converged === true,
      });
    }
  }
  return out;
}

function sanitizeTangents(value: unknown): TangentAnalysis[] {
  if (!Array.isArray(value)) return [];
  const out: TangentAnalysis[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    if (
      isNonEmptyString(item.id) &&
      isNonEmptyString(item.expressionId) &&
      isFiniteNumber(item.x)
    ) {
      out.push({
        id: item.id,
        expressionId: item.expressionId,
        x: item.x,
        showTangent: item.showTangent !== false,
        showNormal: item.showNormal === true,
        visible: item.visible !== false,
      });
    }
  }
  return out;
}

function sanitizeDerivativePlots(value: unknown): DerivativePlot[] {
  if (!Array.isArray(value)) return [];
  const out: DerivativePlot[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    if (isNonEmptyString(item.id) && isNonEmptyString(item.expressionId)) {
      out.push({
        id: item.id,
        expressionId: item.expressionId,
        visible: item.visible !== false,
      });
    }
  }
  return out;
}

function sanitizeAnnotations(value: unknown): PointAnnotation[] {
  if (!Array.isArray(value)) return [];
  const out: PointAnnotation[] = [];
  for (const item of value) {
    if (!isRecord(item)) continue;
    if (isFiniteNumber(item.x) && isFiniteNumber(item.y) && typeof item.label === 'string') {
      out.push({
        id: isNonEmptyString(item.id) ? item.id : `annotation-${out.length}`,
        x: item.x,
        y: item.y,
        label: item.label.slice(0, 120),
        color: typeof item.color === 'string' ? item.color : '#0f172a',
        visible: item.visible !== false,
      });
    }
  }
  return out;
}

/** Coerce an unknown persisted payload into a valid AnalysisState. */
export function sanitizeAnalysisState(value: unknown): AnalysisState {
  const defaults = createDefaultAnalysisState();
  if (!isRecord(value)) return defaults;
  const precision: PrecisionSettings = sanitizePrecision(value.precision);
  return {
    precision,
    markers: sanitizeMarkers(value.markers),
    integrals: sanitizeIntegrals(value.integrals),
    tangents: sanitizeTangents(value.tangents),
    derivativePlots: sanitizeDerivativePlots(value.derivativePlots),
    annotations: sanitizeAnnotations(value.annotations),
  };
}
