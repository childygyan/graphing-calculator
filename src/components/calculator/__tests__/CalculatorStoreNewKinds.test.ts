import { describe, expect, it } from 'vitest';
import { calculatorReducer } from '../CalculatorStore.js';
import { createExpression } from '../../../lib/expressions/expressions.js';
import type { CalculatorState, Expression } from '../../../types/calculator.js';

function baseState(overrides: Partial<CalculatorState> = {}): CalculatorState {
  return {
    expressions: [],
    variables: [],
    viewport: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
    settings: {
      showGrid: true,
      showAxes: true,
      showAxisLabels: true,
      degreeMode: false,
      squareAspectRatio: false,
    },
    selectedExpressionId: null,
    theme: 'system',
    analysis: {
      precision: { mode: 'decimals', digits: 2 },
      markers: [],
      integrals: [],
      tangents: [],
      derivativePlots: [],
      annotations: [],
    },
    inspectedPoint: null,
    ...overrides,
  };
}

let nextId = 0;
function expression(kind: 'cartesian' | 'folder' | 'action'): Expression {
  nextId += 1;
  return { ...createExpression(kind), id: `expr-${nextId}` } as Expression;
}

describe('APPLY_ACTION_RESULT', () => {
  it('updates existing variables and creates missing ones atomically', () => {
    const state = baseState({
      variables: [{ name: 'a', expression: '1', min: -10, max: 10, step: 0.1 }],
    });
    const next = calculatorReducer(state, {
      type: 'APPLY_ACTION_RESULT',
      updates: [
        { name: 'a', expression: '2' },
        { name: 'b', expression: '5' },
      ],
    });
    expect(next.variables.find((v) => v.name === 'a')?.expression).toBe('2');
    const b = next.variables.find((v) => v.name === 'b');
    expect(b?.expression).toBe('5');
    expect(b?.min).toBe(-5);
    expect(b?.max).toBe(15);
  });

  it('ignores invalid variable names and empty update lists', () => {
    const state = baseState({
      variables: [{ name: 'a', expression: '1', min: -10, max: 10, step: 0.1 }],
    });
    const bad = calculatorReducer(state, {
      type: 'APPLY_ACTION_RESULT',
      updates: [{ name: 'not a name!', expression: '2' }],
    });
    expect(bad).toBe(state);
    const empty = calculatorReducer(state, { type: 'APPLY_ACTION_RESULT', updates: [] });
    expect(empty).toBe(state);
  });

  it('is a no-op when nothing actually changes', () => {
    const state = baseState({
      variables: [{ name: 'a', expression: '2', min: -10, max: 10, step: 0.1 }],
    });
    const next = calculatorReducer(state, {
      type: 'APPLY_ACTION_RESULT',
      updates: [{ name: 'a', expression: '2' }],
    });
    expect(next).toBe(state);
  });
});

describe('folder actions', () => {
  it('toggles folder collapse', () => {
    const folder = expression('folder');
    const state = baseState({ expressions: [folder] });
    const collapsed = calculatorReducer(state, { type: 'TOGGLE_FOLDER_COLLAPSED', id: folder.id });
    const after = collapsed.expressions[0];
    expect(after.kind === 'folder' && after.definition.collapsed).toBe(true);
    const expanded = calculatorReducer(collapsed, {
      type: 'TOGGLE_FOLDER_COLLAPSED',
      id: folder.id,
    });
    const after2 = expanded.expressions[0];
    expect(after2.kind === 'folder' && after2.definition.collapsed).toBe(false);
  });

  it('moves expressions into and out of folders', () => {
    const a = expression('cartesian');
    const folder = expression('folder');
    const state = baseState({ expressions: [a, folder] });
    const moved = calculatorReducer(state, {
      type: 'MOVE_EXPRESSION_TO_FOLDER',
      expressionId: a.id,
      folderId: folder.id,
    });
    const folderAfter = moved.expressions.find((e) => e.id === folder.id);
    expect(folderAfter?.kind === 'folder' && folderAfter.definition.children).toContain(a.id);

    const back = calculatorReducer(moved, {
      type: 'MOVE_EXPRESSION_TO_FOLDER',
      expressionId: a.id,
      folderId: null,
    });
    const folderBack = back.expressions.find((e) => e.id === folder.id);
    expect(folderBack?.kind === 'folder' && folderBack.definition.children).not.toContain(a.id);
  });

  it('removing an expression cleans folder membership', () => {
    const a = expression('cartesian');
    const folder = expression('folder');
    const state = baseState({ expressions: [a, folder] });
    const moved = calculatorReducer(state, {
      type: 'MOVE_EXPRESSION_TO_FOLDER',
      expressionId: a.id,
      folderId: folder.id,
    });
    const removed = calculatorReducer(moved, { type: 'REMOVE_EXPRESSION', id: a.id });
    expect(removed.expressions.find((e) => e.id === a.id)).toBeUndefined();
    const folderAfter = removed.expressions.find((e) => e.id === folder.id);
    expect(folderAfter?.kind === 'folder' && folderAfter.definition.children).toEqual([]);
  });
});
