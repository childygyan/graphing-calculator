/**
 * Versioned graph document: the serializable snapshot of everything needed
 * to restore a calculator workspace (expressions, variables, viewport,
 * settings, theme, analysis state). Plain JSON data only — never executable.
 *
 * Version history:
 * - v1 (current): `{ app, version, name?, expressions, variables, viewport,
 *   settings, selectedExpressionId, theme, analysis, savedAt? }`
 * - v0 (legacy): the unversioned shape the store persisted to localStorage
 *   before Phase 7 (`{ expressions, variables, viewport, settings,
 *   selectedExpressionId, theme, analysis }`) — migrated, not validated.
 */

import type { ThemeMode } from '../../data/site.js';
import type {
  AnalysisState,
  CalculatorState,
  Expression,
  GraphSettings,
  GraphViewport,
  VariableDefinition,
} from '../../types/calculator.js';
import { createDefaultAnalysisState } from '../analysis/state.js';
import { DEFAULT_GRAPH_SETTINGS, DEFAULT_VIEWPORT } from '../expressions/expressions.js';
import { getExpressionSummary } from '../expressions/expressions.js';

/** Current document version. Bump when the schema changes; add a migrator. */
export const GRAPH_DOCUMENT_VERSION = 1;

/** Highest document version this build can read. */
export const MAX_SUPPORTED_DOCUMENT_VERSION = 1;

export const GRAPH_DOCUMENT_APP = 'graphing-calculator' as const;

/** Strict import limits (import security): oversized documents are rejected. */
export const MAX_IMPORT_BYTES = 256 * 1024;
export const MAX_EXPRESSIONS = 100;
export const MAX_VARIABLES = 50;
export const MAX_DEFINITION_CHARS = 4000;
export const MAX_LABEL_CHARS = 200;
export const MAX_DOCUMENT_NAME_CHARS = 80;
export const MAX_TEXT_CONTENT_CHARS = 20000;
export const MAX_TABLE_CELLS = 5000;
/** Guard against stack-overflow via deeply nested JSON. */
export const MAX_JSON_NESTING_DEPTH = 64;

export interface GraphDocument {
  app: typeof GRAPH_DOCUMENT_APP;
  version: typeof GRAPH_DOCUMENT_VERSION;
  /** Human-readable name for named saves (optional). */
  name?: string;
  expressions: Expression[];
  variables: VariableDefinition[];
  viewport: GraphViewport;
  settings: GraphSettings;
  selectedExpressionId: string | null;
  theme: ThemeMode;
  analysis: AnalysisState;
  /** Informational: when the document was produced. Not used for restore. */
  savedAt?: number;
}

/** Legacy (v0) persisted shape: unversioned store snapshot from localStorage. */
export interface LegacyGraphDocumentV0 {
  expressions?: unknown;
  variables?: unknown;
  viewport?: unknown;
  settings?: unknown;
  selectedExpressionId?: unknown;
  theme?: unknown;
  analysis?: unknown;
}

export type MigrationResult = { ok: true; document: GraphDocument } | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Convert live calculator state into a versioned document. The transient
 * inspected point is intentionally dropped — it is a UI hit-test result,
 * not workspace content.
 */
export function stateToDocument(state: CalculatorState, name?: string): GraphDocument {
  const document: GraphDocument = {
    app: GRAPH_DOCUMENT_APP,
    version: GRAPH_DOCUMENT_VERSION,
    expressions: state.expressions,
    variables: state.variables,
    viewport: { ...state.viewport },
    settings: { ...state.settings },
    selectedExpressionId: state.selectedExpressionId,
    theme: state.theme,
    analysis: state.analysis,
    savedAt: Date.now(),
  };
  if (typeof name === 'string' && name.trim().length > 0) {
    document.name = name.trim().slice(0, MAX_DOCUMENT_NAME_CHARS);
  }
  return document;
}

/** Restore a validated document into live calculator state. */
export function documentToState(document: GraphDocument): CalculatorState {
  return {
    expressions: document.expressions,
    variables: document.variables,
    viewport: { ...document.viewport },
    settings: { ...document.settings },
    selectedExpressionId: document.selectedExpressionId,
    theme: document.theme,
    analysis: document.analysis,
    inspectedPoint: null,
  };
}

function defaultDocument(): GraphDocument {
  return {
    app: GRAPH_DOCUMENT_APP,
    version: GRAPH_DOCUMENT_VERSION,
    expressions: [],
    variables: [],
    viewport: { ...DEFAULT_VIEWPORT },
    settings: { ...DEFAULT_GRAPH_SETTINGS },
    selectedExpressionId: null,
    theme: 'system',
    analysis: createDefaultAnalysisState(),
    savedAt: Date.now(),
  };
}

/**
 * Migrate an unknown payload into the current document shape.
 *
 * - Missing `version` → treated as legacy v0 (the old localStorage shape);
 *   recognizable fields are carried over, everything else gets defaults.
 * - `version: 1` → returned as-is for strict validation by the caller.
 * - Future `version > 1` → honest error, never a crash.
 * - Anything else → honest error.
 *
 * The returned document is NOT validated here; callers must run it through
 * `validateGraphDocument` before use (v1 payloads) or accept the migrated
 * defaults (v0 payloads are rebuilt from defaults + carried fields, then the
 * caller should still validate — see `migrateAndValidate`).
 */
export function migrateDocument(input: unknown): MigrationResult {
  if (!isRecord(input)) {
    return { ok: false, error: 'The imported data is not a JSON object.' };
  }
  if (input.version === undefined) {
    return migrateLegacyV0(input as LegacyGraphDocumentV0);
  }
  if (typeof input.version !== 'number' || !Number.isInteger(input.version)) {
    return { ok: false, error: 'The document has an invalid version field.' };
  }
  if (input.version > MAX_SUPPORTED_DOCUMENT_VERSION) {
    return {
      ok: false,
      error:
        `This graph was saved by a newer version of the app (document version ` +
        `${input.version}). This version supports up to version ` +
        `${MAX_SUPPORTED_DOCUMENT_VERSION}. Please update the app to open it.`,
    };
  }
  if (input.version < 1) {
    return { ok: false, error: `Unsupported document version: ${input.version}.` };
  }
  // v1: hand back the raw payload; the caller validates it strictly.
  return { ok: true, document: input as unknown as GraphDocument };
}

function migrateLegacyV0(legacy: LegacyGraphDocumentV0): MigrationResult {
  // A genuine v0 payload is the store's own persisted snapshot, which
  // always carried an expressions array. Anything else is not a graph.
  if (!Array.isArray(legacy.expressions)) {
    return { ok: false, error: 'The imported data is not a recognizable graph document.' };
  }
  const document = defaultDocument();
  // Keep the raw entries; strict validation decides what survives.
  document.expressions = legacy.expressions as Expression[];
  if (Array.isArray(legacy.variables)) {
    document.variables = legacy.variables as VariableDefinition[];
  }
  const viewport = legacy.viewport;
  if (
    isRecord(viewport) &&
    typeof viewport.xMin === 'number' &&
    typeof viewport.xMax === 'number' &&
    typeof viewport.yMin === 'number' &&
    typeof viewport.yMax === 'number'
  ) {
    document.viewport = {
      xMin: viewport.xMin,
      xMax: viewport.xMax,
      yMin: viewport.yMin,
      yMax: viewport.yMax,
    };
  }
  if (isRecord(legacy.settings)) {
    document.settings = { ...document.settings, ...(legacy.settings as Partial<GraphSettings>) };
  }
  if (typeof legacy.selectedExpressionId === 'string') {
    document.selectedExpressionId = legacy.selectedExpressionId;
  }
  if (legacy.theme === 'light' || legacy.theme === 'dark' || legacy.theme === 'system') {
    document.theme = legacy.theme;
  }
  if (isRecord(legacy.analysis)) {
    // Analysis is rebuilt from defaults unless it strictly validates later.
    document.analysis = legacy.analysis as unknown as AnalysisState;
  }
  return { ok: true, document };
}

export interface DocumentSummaryExpression {
  label: string;
  summary: string;
  kind: string;
  visible: boolean;
}

export interface DocumentSummary {
  name?: string;
  expressionCount: number;
  expressions: DocumentSummaryExpression[];
  variableCount: number;
  variables: Array<{ name: string; expression: string }>;
  viewport: GraphViewport;
}

/**
 * Human-readable preview of a document for the import confirmation step.
 * Pure string formatting — no parsing, no evaluation.
 */
export function summarizeDocument(document: GraphDocument): DocumentSummary {
  return {
    ...(document.name !== undefined ? { name: document.name } : {}),
    expressionCount: document.expressions.length,
    expressions: document.expressions.map((expression) => ({
      label: expression.label,
      summary: getExpressionSummary(expression),
      kind: expression.kind,
      visible: expression.visible,
    })),
    variableCount: document.variables.length,
    variables: document.variables.map((variable) => ({
      name: variable.name,
      expression: variable.expression,
    })),
    viewport: { ...document.viewport },
  };
}
