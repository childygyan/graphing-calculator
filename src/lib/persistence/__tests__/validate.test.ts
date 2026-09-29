/**
 * Tests: strict document validation — malformed documents are rejected
 * with clear messages, and import limits are enforced.
 */
import { describe, expect, it } from 'vitest';
import { validateGraphDocument } from '../validate.js';
import { MAX_EXPRESSIONS, MAX_VARIABLES, stateToDocument } from '../document.js';
import { createInitialCalculatorState } from '../../expressions/expressions.js';
import type { GraphDocument } from '../document.js';

function makeValidDocument(): GraphDocument {
  return stateToDocument(createInitialCalculatorState('light'), 'valid');
}

/** Deep-clone a document as unknown JSON, for hostile mutation. */
function asJson(document: GraphDocument): Record<string, unknown> {
  return JSON.parse(JSON.stringify(document)) as Record<string, unknown>;
}

describe('validateGraphDocument', () => {
  it('accepts a well-formed document', () => {
    const result = validateGraphDocument(asJson(makeValidDocument()));
    expect(result.ok).toBe(true);
  });

  it('rejects a non-object', () => {
    const result = validateGraphDocument(null);
    expect(result.ok).toBe(false);
  });

  it('rejects a wrong app id', () => {
    const json = asJson(makeValidDocument());
    json.app = 'evil-app';
    const result = validateGraphDocument(json);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(' ')).toMatch(/app/);
  });

  it('rejects a wrong version', () => {
    const json = asJson(makeValidDocument());
    json.version = 99;
    expect(validateGraphDocument(json).ok).toBe(false);
  });

  it('rejects an unknown expression kind', () => {
    const json = asJson(makeValidDocument());
    (json.expressions as Array<Record<string, unknown>>)[0].kind = 'hyperbolic';
    const result = validateGraphDocument(json);
    expect(result.ok).toBe(false);
  });

  it('rejects a non-finite viewport', () => {
    const json = asJson(makeValidDocument());
    (json.viewport as Record<string, unknown>).xMax = Number.POSITIVE_INFINITY;
    expect(validateGraphDocument(json).ok).toBe(false);
  });

  it('rejects an inverted viewport', () => {
    const json = asJson(makeValidDocument());
    const viewport = json.viewport as Record<string, unknown>;
    viewport.xMin = 10;
    viewport.xMax = -10;
    const result = validateGraphDocument(json);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(' ')).toMatch(/xMin/);
  });

  it('enforces the expression limit', () => {
    const json = asJson(makeValidDocument());
    const template = (json.expressions as Array<Record<string, unknown>>)[0];
    const many: Array<Record<string, unknown>> = [];
    for (let i = 0; i < MAX_EXPRESSIONS + 1; i++) {
      many.push({ ...template, id: `expr-${i}` });
    }
    json.expressions = many;
    const result = validateGraphDocument(json);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(' ')).toMatch(new RegExp(String(MAX_EXPRESSIONS)));
  });

  it('enforces the variable limit', () => {
    const json = asJson(makeValidDocument());
    const many: Array<Record<string, unknown>> = [];
    for (let i = 0; i < MAX_VARIABLES + 1; i++) {
      many.push({ name: `v${i}`, expression: '1', min: -10, max: 10, step: 0.1 });
    }
    json.variables = many;
    const result = validateGraphDocument(json);
    expect(result.ok).toBe(false);
  });

  it('rejects an invalid variable name', () => {
    const json = asJson(makeValidDocument());
    json.variables = [{ name: 'x', expression: '1', min: -10, max: 10, step: 0.1 }];
    expect(validateGraphDocument(json).ok).toBe(false);
  });

  it('rejects duplicate expression ids', () => {
    const json = asJson(makeValidDocument());
    const expressions = json.expressions as Array<Record<string, unknown>>;
    expressions.push({ ...expressions[0] });
    const result = validateGraphDocument(json);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.join(' ')).toMatch(/duplicate/i);
  });

  it('rejects a dangling selectedExpressionId', () => {
    const json = asJson(makeValidDocument());
    json.selectedExpressionId = 'does-not-exist';
    const result = validateGraphDocument(json);
    expect(result.ok).toBe(false);
  });

  it('rejects a bad theme', () => {
    const json = asJson(makeValidDocument());
    json.theme = 'sepia';
    expect(validateGraphDocument(json).ok).toBe(false);
  });

  it('rejects malformed analysis state', () => {
    const json = asJson(makeValidDocument());
    (json.analysis as Record<string, unknown>).markers = [{ id: 42 }];
    expect(validateGraphDocument(json).ok).toBe(false);
  });

  it('rejects an oversized definition string', () => {
    const json = asJson(makeValidDocument());
    const expression = (json.expressions as Array<Record<string, unknown>>)[0];
    (expression.definition as Record<string, unknown>).rhs = 'x+'.repeat(3000);
    expect(validateGraphDocument(json).ok).toBe(false);
  });

  it('rejects a non-boolean settings flag', () => {
    const json = asJson(makeValidDocument());
    (json.settings as Record<string, unknown>).showGrid = 'yes';
    expect(validateGraphDocument(json).ok).toBe(false);
  });
});
