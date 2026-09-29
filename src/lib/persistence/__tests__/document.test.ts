/**
 * Tests: GraphDocument serialization round-trip, migration, and summaries.
 */
import { describe, expect, it } from 'vitest';
import {
  GRAPH_DOCUMENT_APP,
  GRAPH_DOCUMENT_VERSION,
  documentToState,
  migrateDocument,
  stateToDocument,
  summarizeDocument,
} from '../document.js';
import { validateGraphDocument } from '../validate.js';
import { createInitialCalculatorState } from '../../expressions/expressions.js';
import type { CalculatorState } from '../../../types/calculator.js';

function makeState(): CalculatorState {
  const state = createInitialCalculatorState('light');
  return {
    ...state,
    inspectedPoint: { expressionId: state.expressions[0].id, x: 1, y: 2 },
  };
}

describe('stateToDocument / documentToState', () => {
  it('round-trips a full calculator state', () => {
    const state = makeState();
    const document = stateToDocument(state, 'My graph');
    expect(document.app).toBe(GRAPH_DOCUMENT_APP);
    expect(document.version).toBe(GRAPH_DOCUMENT_VERSION);
    expect(document.name).toBe('My graph');
    expect(document.expressions).toHaveLength(state.expressions.length);
    expect(document.viewport).toEqual(state.viewport);
    expect(document.settings).toEqual(state.settings);
    expect(document.theme).toBe(state.theme);
    expect(document.analysis).toEqual(state.analysis);

    const restored = documentToState(document);
    expect(restored.expressions).toEqual(state.expressions);
    expect(restored.viewport).toEqual(state.viewport);
    // The transient inspected point is intentionally dropped.
    expect(restored.inspectedPoint).toBeNull();
  });

  it('omits the name when none is given', () => {
    const document = stateToDocument(makeState());
    expect(document.name).toBeUndefined();
  });

  it('produces a document that strictly validates', () => {
    const document = stateToDocument(makeState(), 'valid');
    const result = validateGraphDocument(JSON.parse(JSON.stringify(document)) as unknown);
    expect(result.ok).toBe(true);
  });
});

describe('migrateDocument', () => {
  it('migrates a legacy v0 (unversioned) payload', () => {
    const state = makeState();
    const legacy = {
      expressions: state.expressions,
      variables: state.variables,
      viewport: state.viewport,
      settings: state.settings,
      theme: 'dark',
    };
    const result = migrateDocument(legacy);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.document.version).toBe(1);
      expect(result.document.theme).toBe('dark');
      expect(result.document.expressions).toHaveLength(state.expressions.length);
    }
  });

  it('passes a v1 document through for validation', () => {
    const document = stateToDocument(makeState());
    const result = migrateDocument(document);
    expect(result.ok).toBe(true);
  });

  it('rejects a future version with an honest error', () => {
    const result = migrateDocument({ app: 'graphing-calculator', version: 2 });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/newer version/i);
    }
  });

  it('rejects a version 0 document', () => {
    expect(migrateDocument({ version: 0 }).ok).toBe(false);
  });

  it('rejects non-objects', () => {
    expect(migrateDocument(null).ok).toBe(false);
    expect(migrateDocument('nope').ok).toBe(false);
    expect(migrateDocument([1, 2]).ok).toBe(false);
  });
});

describe('summarizeDocument', () => {
  it('produces a human-readable preview', () => {
    const document = stateToDocument(makeState(), 'Preview me');
    const summary = summarizeDocument(document);
    expect(summary.name).toBe('Preview me');
    expect(summary.expressionCount).toBe(1);
    expect(summary.expressions[0].summary).toContain('y =');
    expect(summary.viewport.xMin).toBe(-10);
  });
});
