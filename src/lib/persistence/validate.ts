/**
 * Strict validation for imported/loaded graph documents (hand-rolled, no
 * new dependency — same convention as the Phase 6 AI command schema).
 *
 * Imported data is untrusted: it arrives via JSON.parse and is checked
 * field-by-field. Malformed documents are REJECTED with clear messages —
 * never silently repaired, never executed (it is data, not code).
 */

import type {
  AnalysisMarker,
  AnalysisMarkerKind,
  AnalysisState,
  DerivativePlot,
  Expression,
  ExpressionKind,
  GraphSettings,
  GraphViewport,
  InequalityOperator,
  IntegralAnalysis,
  PointAnnotation,
  PrecisionSettings,
  TangentAnalysis,
  VariableDefinition,
} from '../../types/calculator.js';
import type { ThemeMode } from '../../data/site.js';
import {
  GRAPH_DOCUMENT_APP,
  GRAPH_DOCUMENT_VERSION,
  MAX_DEFINITION_CHARS,
  MAX_DOCUMENT_NAME_CHARS,
  MAX_EXPRESSIONS,
  MAX_ACTION_ASSIGNMENTS,
  MAX_IMAGE_SRC_CHARS,
  MAX_LABEL_CHARS,
  MAX_TABLE_CELLS,
  MAX_TEXT_CONTENT_CHARS,
  MAX_VARIABLES,
  type GraphDocument,
} from './document.js';
import { validateVariableName } from '../math/variables.js';
import { isExpressionKind } from '../expressions/expressions.js';

export type ValidationResult =
  { ok: true; document: GraphDocument } | { ok: false; errors: string[] };

const EXPRESSION_KINDS: readonly ExpressionKind[] = [
  'cartesian',
  'parametric',
  'polar',
  'point',
  'inequality',
  'table',
  'text',
  'folder',
  'image',
  'action',
];

const INEQUALITY_OPERATORS: readonly InequalityOperator[] = ['<', '<=', '>', '>='];

const MARKER_KINDS: readonly AnalysisMarkerKind[] = ['root', 'intersection', 'extremum'];

const MAX_COORDINATE = 1e15;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isBoundedString(value: unknown, maxChars: number): value is string {
  return typeof value === 'string' && value.length <= maxChars;
}

class Validator {
  readonly errors: string[] = [];

  error(path: string, message: string): void {
    this.errors.push(`${path}: ${message}`);
  }

  checkDefined(value: unknown, path: string): value is Record<string, unknown> {
    if (!isRecord(value)) {
      this.error(path, 'must be an object.');
      return false;
    }
    return true;
  }

  finiteNumber(value: unknown, path: string, maxAbs: number = MAX_COORDINATE): value is number {
    if (!isFiniteNumber(value) || Math.abs(value) > maxAbs) {
      this.error(path, 'must be a finite number.');
      return false;
    }
    return true;
  }
}

function validateViewport(value: unknown, validator: Validator): GraphViewport | null {
  if (!validator.checkDefined(value, 'viewport')) return null;
  const ok =
    validator.finiteNumber(value.xMin, 'viewport.xMin') &&
    validator.finiteNumber(value.xMax, 'viewport.xMax') &&
    validator.finiteNumber(value.yMin, 'viewport.yMin') &&
    validator.finiteNumber(value.yMax, 'viewport.yMax');
  if (!ok) return null;
  const viewport = value as unknown as GraphViewport;
  if (!(viewport.xMin < viewport.xMax)) {
    validator.error('viewport', 'xMin must be less than xMax.');
    return null;
  }
  if (!(viewport.yMin < viewport.yMax)) {
    validator.error('viewport', 'yMin must be less than yMax.');
    return null;
  }
  return {
    xMin: viewport.xMin,
    xMax: viewport.xMax,
    yMin: viewport.yMin,
    yMax: viewport.yMax,
  };
}

function validateSettings(value: unknown, validator: Validator): GraphSettings | null {
  if (!validator.checkDefined(value, 'settings')) return null;
  const fields = ['showGrid', 'showAxes', 'showAxisLabels', 'degreeMode', 'squareAspectRatio'];
  for (const field of fields) {
    if (typeof value[field] !== 'boolean') {
      validator.error(`settings.${field}`, 'must be a boolean.');
      return null;
    }
  }
  return value as unknown as GraphSettings;
}

function validateDefinitionString(
  value: unknown,
  path: string,
  validator: Validator
): string | null {
  if (typeof value !== 'string') {
    validator.error(path, 'must be a string.');
    return null;
  }
  if (value.length > MAX_DEFINITION_CHARS) {
    validator.error(path, `must be at most ${MAX_DEFINITION_CHARS} characters.`);
    return null;
  }
  return value;
}

function validateExpressionDefinition(
  kind: ExpressionKind,
  value: unknown,
  path: string,
  validator: Validator
): boolean {
  if (!validator.checkDefined(value, path)) return false;
  switch (kind) {
    case 'cartesian':
      return validateDefinitionString(value.rhs, `${path}.rhs`, validator) !== null;
    case 'parametric':
      return ['xOfT', 'yOfT', 'tMin', 'tMax'].every(
        (field) => validateDefinitionString(value[field], `${path}.${field}`, validator) !== null
      );
    case 'polar':
      return validateDefinitionString(value.rOfTheta, `${path}.rOfTheta`, validator) !== null;
    case 'point':
      return (
        validateDefinitionString(value.x, `${path}.x`, validator) !== null &&
        validateDefinitionString(value.y, `${path}.y`, validator) !== null
      );
    case 'inequality': {
      const operatorOk =
        validateDefinitionString(value.lhs, `${path}.lhs`, validator) !== null &&
        validateDefinitionString(value.rhs, `${path}.rhs`, validator) !== null;
      if (
        typeof value.operator !== 'string' ||
        !(INEQUALITY_OPERATORS as readonly string[]).includes(value.operator)
      ) {
        validator.error(`${path}.operator`, 'must be one of <, <=, >, >=.');
        return false;
      }
      return operatorOk;
    }
    case 'table': {
      if (!Array.isArray(value.columns) || !value.columns.every((c) => typeof c === 'string')) {
        validator.error(`${path}.columns`, 'must be an array of strings.');
        return false;
      }
      if (
        !Array.isArray(value.rows) ||
        !value.rows.every(
          (row) => Array.isArray(row) && row.every((cell) => typeof cell === 'string')
        )
      ) {
        validator.error(`${path}.rows`, 'must be an array of string arrays.');
        return false;
      }
      const cells = value.columns.length * value.rows.length;
      if (cells > MAX_TABLE_CELLS) {
        validator.error(`${path}`, `table is too large (max ${MAX_TABLE_CELLS} cells).`);
        return false;
      }
      return true;
    }
    case 'text': {
      if (typeof value.content !== 'string') {
        validator.error(`${path}.content`, 'must be a string.');
        return false;
      }
      if (value.content.length > MAX_TEXT_CONTENT_CHARS) {
        validator.error(`${path}.content`, `must be at most ${MAX_TEXT_CONTENT_CHARS} characters.`);
        return false;
      }
      if (value.anchor !== undefined) {
        if (!validator.checkDefined(value.anchor, `${path}.anchor`)) return false;
        if (
          !validator.finiteNumber(value.anchor.x, `${path}.anchor.x`) ||
          !validator.finiteNumber(value.anchor.y, `${path}.anchor.y`)
        ) {
          return false;
        }
      }
      return true;
    }
    case 'folder': {
      if (typeof value.collapsed !== 'boolean') {
        validator.error(`${path}.collapsed`, 'must be a boolean.');
        return false;
      }
      if (
        !Array.isArray(value.children) ||
        !value.children.every((child) => typeof child === 'string')
      ) {
        validator.error(`${path}.children`, 'must be an array of strings.');
        return false;
      }
      return true;
    }
    case 'image': {
      if (typeof value.src !== 'string') {
        validator.error(`${path}.src`, 'must be a string.');
        return false;
      }
      if (value.src.length > MAX_IMAGE_SRC_CHARS) {
        validator.error(`${path}.src`, `must be at most ${MAX_IMAGE_SRC_CHARS} characters.`);
        return false;
      }
      const numericFields = ['centerX', 'centerY', 'width', 'height'] as const;
      for (const field of numericFields) {
        if (!validator.finiteNumber(value[field], `${path}.${field}`)) return false;
      }
      if (
        typeof value.width !== 'number' ||
        typeof value.height !== 'number' ||
        !(value.width > 0) ||
        !(value.height > 0)
      ) {
        validator.error(`${path}`, 'width and height must be positive numbers.');
        return false;
      }
      if (typeof value.opacity !== 'number' || !(value.opacity >= 0) || !(value.opacity <= 1)) {
        validator.error(`${path}.opacity`, 'must be a number between 0 and 1.');
        return false;
      }
      return true;
    }
    case 'action': {
      if (typeof value.buttonLabel !== 'string') {
        validator.error(`${path}.buttonLabel`, 'must be a string.');
        return false;
      }
      if (value.buttonLabel.length > MAX_LABEL_CHARS) {
        validator.error(`${path}.buttonLabel`, `must be at most ${MAX_LABEL_CHARS} characters.`);
        return false;
      }
      if (!Array.isArray(value.assignments)) {
        validator.error(`${path}.assignments`, 'must be an array.');
        return false;
      }
      if (value.assignments.length > MAX_ACTION_ASSIGNMENTS) {
        validator.error(
          `${path}.assignments`,
          `must have at most ${MAX_ACTION_ASSIGNMENTS} assignments.`
        );
        return false;
      }
      for (let i = 0; i < value.assignments.length; i++) {
        const assignment = value.assignments[i];
        const assignmentPath = `${path}.assignments[${i}]`;
        if (typeof assignment?.variable !== 'string' || assignment.variable.trim() === '') {
          validator.error(`${assignmentPath}.variable`, 'must be a non-empty string.');
          return false;
        }
        if (
          validateDefinitionString(assignment.value, `${assignmentPath}.value`, validator) === null
        ) {
          return false;
        }
      }
      return true;
    }
  }
}

function validateExpression(
  value: unknown,
  index: number,
  validator: Validator
): Expression | null {
  const path = `expressions[${index}]`;
  if (!validator.checkDefined(value, path)) return null;
  if (!isNonEmptyString(value.id)) {
    validator.error(`${path}.id`, 'must be a non-empty string.');
    return null;
  }
  if (
    !isExpressionKind(value.kind) ||
    !(EXPRESSION_KINDS as readonly string[]).includes(value.kind)
  ) {
    validator.error(`${path}.kind`, 'must be a known expression kind.');
    return null;
  }
  if (!isBoundedString(value.label, MAX_LABEL_CHARS) || value.label.length === 0) {
    validator.error(`${path}.label`, `must be a non-empty string up to ${MAX_LABEL_CHARS} chars.`);
    return null;
  }
  if (typeof value.visible !== 'boolean') {
    validator.error(`${path}.visible`, 'must be a boolean.');
    return null;
  }
  if (typeof value.color !== 'string' || value.color.length === 0 || value.color.length > 32) {
    validator.error(`${path}.color`, 'must be a non-empty color string.');
    return null;
  }
  if (
    value.opacity !== undefined &&
    (!isFiniteNumber(value.opacity) || value.opacity < 0 || value.opacity > 1)
  ) {
    validator.error(`${path}.opacity`, 'must be a number between 0 and 1.');
    return null;
  }
  if (
    value.lineWidth !== undefined &&
    (!isFiniteNumber(value.lineWidth) || value.lineWidth <= 0 || value.lineWidth > 32)
  ) {
    validator.error(`${path}.lineWidth`, 'must be a positive number up to 32.');
    return null;
  }
  if (value.metadata !== undefined && !isRecord(value.metadata)) {
    validator.error(`${path}.metadata`, 'must be an object when present.');
    return null;
  }
  if (
    !validateExpressionDefinition(
      value.kind as ExpressionKind,
      value.definition,
      `${path}.definition`,
      validator
    )
  ) {
    return null;
  }
  if (value.createdAt !== undefined && !isFiniteNumber(value.createdAt)) {
    validator.error(`${path}.createdAt`, 'must be a finite number when present.');
    return null;
  }
  if (value.updatedAt !== undefined && !isFiniteNumber(value.updatedAt)) {
    validator.error(`${path}.updatedAt`, 'must be a finite number when present.');
    return null;
  }
  const now = Date.now();
  return {
    id: value.id,
    kind: value.kind,
    label: value.label,
    visible: value.visible,
    color: value.color,
    ...(value.opacity !== undefined ? { opacity: value.opacity as number } : {}),
    ...(value.lineWidth !== undefined ? { lineWidth: value.lineWidth as number } : {}),
    metadata: isRecord(value.metadata) ? value.metadata : {},
    createdAt: isFiniteNumber(value.createdAt) ? value.createdAt : now,
    updatedAt: isFiniteNumber(value.updatedAt) ? value.updatedAt : now,
    definition: value.definition,
  } as Expression;
}

function validateVariable(
  value: unknown,
  index: number,
  seen: Set<string>,
  validator: Validator
): VariableDefinition | null {
  const path = `variables[${index}]`;
  if (!validator.checkDefined(value, path)) return null;
  if (typeof value.name !== 'string' || validateVariableName(value.name) !== null) {
    validator.error(`${path}.name`, 'must be a valid variable name.');
    return null;
  }
  const name = value.name.trim().toLowerCase();
  if (seen.has(name)) {
    validator.error(`${path}.name`, `duplicate variable name '${name}'.`);
    return null;
  }
  seen.add(name);
  const expression = validateDefinitionString(value.expression, `${path}.expression`, validator);
  if (expression === null) return null;
  if (
    !validator.finiteNumber(value.min, `${path}.min`) ||
    !validator.finiteNumber(value.max, `${path}.max`) ||
    !validator.finiteNumber(value.step, `${path}.step`)
  ) {
    return null;
  }
  const min = value.min as number;
  const max = value.max as number;
  const step = value.step as number;
  if (!(min < max)) {
    validator.error(`${path}`, 'min must be less than max.');
    return null;
  }
  if (!(step > 0)) {
    validator.error(`${path}.step`, 'must be positive.');
    return null;
  }
  return { name, expression, min, max, step };
}

function validatePrecision(value: unknown, validator: Validator): PrecisionSettings | null {
  if (!validator.checkDefined(value, 'analysis.precision')) return null;
  if (value.mode !== 'decimals' && value.mode !== 'significant') {
    validator.error('analysis.precision.mode', "must be 'decimals' or 'significant'.");
    return null;
  }
  if (
    typeof value.digits !== 'number' ||
    !Number.isInteger(value.digits) ||
    (value.mode === 'decimals'
      ? value.digits < 0 || value.digits > 12
      : value.digits < 1 || value.digits > 15)
  ) {
    validator.error('analysis.precision.digits', 'has an out-of-range digit count.');
    return null;
  }
  return value as unknown as PrecisionSettings;
}

function validateMarkers(value: unknown, validator: Validator): AnalysisMarker[] | null {
  if (!Array.isArray(value)) {
    validator.error('analysis.markers', 'must be an array.');
    return null;
  }
  const out: AnalysisMarker[] = [];
  for (let i = 0; i < value.length; i++) {
    const path = `analysis.markers[${i}]`;
    const item = value[i];
    if (!validator.checkDefined(item, path)) return null;
    if (
      !isNonEmptyString(item.id) ||
      !(MARKER_KINDS as readonly string[]).includes(item.kind as string) ||
      !validator.finiteNumber(item.x, `${path}.x`) ||
      !validator.finiteNumber(item.y, `${path}.y`) ||
      !isNonEmptyString(item.expressionId) ||
      typeof item.color !== 'string'
    ) {
      validator.error(path, 'has an invalid marker shape.');
      return null;
    }
    out.push({
      id: item.id,
      kind: item.kind as AnalysisMarkerKind,
      x: item.x as number,
      y: item.y as number,
      expressionId: item.expressionId,
      color: item.color,
      visible: item.visible !== false,
    });
  }
  return out;
}

function validateIntegrals(value: unknown, validator: Validator): IntegralAnalysis[] | null {
  if (!Array.isArray(value)) {
    validator.error('analysis.integrals', 'must be an array.');
    return null;
  }
  const out: IntegralAnalysis[] = [];
  for (let i = 0; i < value.length; i++) {
    const path = `analysis.integrals[${i}]`;
    const item = value[i];
    if (!validator.checkDefined(item, path)) return null;
    if (
      !isNonEmptyString(item.id) ||
      !isNonEmptyString(item.expressionId) ||
      !validator.finiteNumber(item.a, `${path}.a`) ||
      !validator.finiteNumber(item.b, `${path}.b`)
    ) {
      validator.error(path, 'has an invalid integral shape.');
      return null;
    }
    out.push({
      id: item.id,
      expressionId: item.expressionId,
      a: item.a as number,
      b: item.b as number,
      visible: item.visible !== false,
      value: isFiniteNumber(item.value) ? (item.value as number) : null,
      converged: item.converged === true,
    });
  }
  return out;
}

function validateTangents(value: unknown, validator: Validator): TangentAnalysis[] | null {
  if (!Array.isArray(value)) {
    validator.error('analysis.tangents', 'must be an array.');
    return null;
  }
  const out: TangentAnalysis[] = [];
  for (let i = 0; i < value.length; i++) {
    const path = `analysis.tangents[${i}]`;
    const item = value[i];
    if (!validator.checkDefined(item, path)) return null;
    if (
      !isNonEmptyString(item.id) ||
      !isNonEmptyString(item.expressionId) ||
      !validator.finiteNumber(item.x, `${path}.x`)
    ) {
      validator.error(path, 'has an invalid tangent shape.');
      return null;
    }
    out.push({
      id: item.id,
      expressionId: item.expressionId,
      x: item.x as number,
      showTangent: item.showTangent !== false,
      showNormal: item.showNormal === true,
      visible: item.visible !== false,
    });
  }
  return out;
}

function validateDerivativePlots(value: unknown, validator: Validator): DerivativePlot[] | null {
  if (!Array.isArray(value)) {
    validator.error('analysis.derivativePlots', 'must be an array.');
    return null;
  }
  const out: DerivativePlot[] = [];
  for (let i = 0; i < value.length; i++) {
    const path = `analysis.derivativePlots[${i}]`;
    const item = value[i];
    if (!validator.checkDefined(item, path)) return null;
    if (!isNonEmptyString(item.id) || !isNonEmptyString(item.expressionId)) {
      validator.error(path, 'has an invalid derivative-plot shape.');
      return null;
    }
    out.push({
      id: item.id,
      expressionId: item.expressionId,
      visible: item.visible !== false,
    });
  }
  return out;
}

function validateAnnotations(value: unknown, validator: Validator): PointAnnotation[] | null {
  if (!Array.isArray(value)) {
    validator.error('analysis.annotations', 'must be an array.');
    return null;
  }
  const out: PointAnnotation[] = [];
  for (let i = 0; i < value.length; i++) {
    const path = `analysis.annotations[${i}]`;
    const item = value[i];
    if (!validator.checkDefined(item, path)) return null;
    if (
      !validator.finiteNumber(item.x, `${path}.x`) ||
      !validator.finiteNumber(item.y, `${path}.y`) ||
      typeof item.label !== 'string'
    ) {
      validator.error(path, 'has an invalid annotation shape.');
      return null;
    }
    if (item.label.length > MAX_LABEL_CHARS) {
      validator.error(path, `label must be at most ${MAX_LABEL_CHARS} characters.`);
      return null;
    }
    out.push({
      id: isNonEmptyString(item.id) ? item.id : `annotation-${i}`,
      x: item.x as number,
      y: item.y as number,
      label: item.label,
      color: typeof item.color === 'string' ? item.color : '#0f172a',
      visible: item.visible !== false,
    });
  }
  return out;
}

function validateAnalysis(value: unknown, validator: Validator): AnalysisState | null {
  if (!validator.checkDefined(value, 'analysis')) return null;
  const precision = validatePrecision(value.precision, validator);
  const markers = validateMarkers(value.markers, validator);
  const integrals = validateIntegrals(value.integrals, validator);
  const tangents = validateTangents(value.tangents, validator);
  const derivativePlots = validateDerivativePlots(value.derivativePlots, validator);
  const annotations = validateAnnotations(value.annotations, validator);
  if (
    precision === null ||
    markers === null ||
    integrals === null ||
    tangents === null ||
    derivativePlots === null ||
    annotations === null
  ) {
    return null;
  }
  return { precision, markers, integrals, tangents, derivativePlots, annotations };
}

/**
 * Strictly validate an unknown payload as a GraphDocument.
 * Returns the validated document, or a list of human-readable errors.
 */
export function validateGraphDocument(input: unknown): ValidationResult {
  const validator = new Validator();
  if (!validator.checkDefined(input, 'document')) {
    return { ok: false, errors: validator.errors };
  }
  if (input.app !== GRAPH_DOCUMENT_APP) {
    validator.error('document.app', `must be '${GRAPH_DOCUMENT_APP}'.`);
  }
  if (input.version !== GRAPH_DOCUMENT_VERSION) {
    validator.error('document.version', `must be ${GRAPH_DOCUMENT_VERSION}.`);
  }
  if (
    input.name !== undefined &&
    (!isBoundedString(input.name, MAX_DOCUMENT_NAME_CHARS) || input.name.trim().length === 0)
  ) {
    validator.error(
      'document.name',
      `must be a non-empty string up to ${MAX_DOCUMENT_NAME_CHARS} chars.`
    );
  }

  let expressions: Expression[] | null = null;
  if (!Array.isArray(input.expressions)) {
    validator.error('document.expressions', 'must be an array.');
  } else if (input.expressions.length > MAX_EXPRESSIONS) {
    validator.error('document.expressions', `too many expressions (max ${MAX_EXPRESSIONS}).`);
  } else {
    expressions = [];
    const seenIds = new Set<string>();
    for (let i = 0; i < input.expressions.length; i++) {
      const expression = validateExpression(input.expressions[i], i, validator);
      if (expression === null) continue;
      if (seenIds.has(expression.id)) {
        validator.error(`expressions[${i}].id`, 'duplicate expression id.');
        continue;
      }
      seenIds.add(expression.id);
      expressions.push(expression);
    }
  }

  let variables: VariableDefinition[] | null = null;
  if (!Array.isArray(input.variables)) {
    validator.error('document.variables', 'must be an array.');
  } else if (input.variables.length > MAX_VARIABLES) {
    validator.error('document.variables', `too many variables (max ${MAX_VARIABLES}).`);
  } else {
    variables = [];
    const seenNames = new Set<string>();
    for (let i = 0; i < input.variables.length; i++) {
      const variable = validateVariable(input.variables[i], i, seenNames, validator);
      if (variable !== null) variables.push(variable);
    }
  }

  const viewport = validateViewport(input.viewport, validator);
  const settings = validateSettings(input.settings, validator);
  const analysis = validateAnalysis(input.analysis, validator);

  if (input.theme !== 'light' && input.theme !== 'dark' && input.theme !== 'system') {
    validator.error('document.theme', "must be 'light', 'dark', or 'system'.");
  }
  if (
    input.selectedExpressionId !== null &&
    input.selectedExpressionId !== undefined &&
    typeof input.selectedExpressionId !== 'string'
  ) {
    validator.error('document.selectedExpressionId', 'must be a string or null.');
  }
  if (input.savedAt !== undefined && !isFiniteNumber(input.savedAt)) {
    validator.error('document.savedAt', 'must be a finite number when present.');
  }

  if (validator.errors.length > 0 || expressions === null || variables === null) {
    return { ok: false, errors: validator.errors };
  }

  const selectedId =
    typeof input.selectedExpressionId === 'string' ? input.selectedExpressionId : null;
  if (selectedId !== null && !expressions.some((e) => e.id === selectedId)) {
    validator.error('document.selectedExpressionId', 'does not match any expression.');
    return { ok: false, errors: validator.errors };
  }

  const document: GraphDocument = {
    app: GRAPH_DOCUMENT_APP,
    version: GRAPH_DOCUMENT_VERSION,
    ...(typeof input.name === 'string' ? { name: input.name } : {}),
    expressions,
    variables,
    viewport: viewport as GraphViewport,
    settings: settings as GraphSettings,
    selectedExpressionId: selectedId,
    theme: input.theme as ThemeMode,
    analysis: analysis as AnalysisState,
    ...(isFiniteNumber(input.savedAt) ? { savedAt: input.savedAt as number } : {}),
  };
  return { ok: true, document };
}
