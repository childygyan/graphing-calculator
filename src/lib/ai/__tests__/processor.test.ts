import { describe, expect, it } from 'vitest';
import { processAiCommand } from '../processor.js';
import type { ProcessorDeps } from '../processor.js';
import type { CalculatorAction } from '../../../components/calculator/CalculatorStore.js';
import type { CalculatorState } from '../../../types/calculator.js';
import { createInitialCalculatorState } from '../../expressions/expressions.js';
import type { AiCommand } from '../commands.js';

function makeDeps(state?: CalculatorState): { deps: ProcessorDeps; actions: CalculatorAction[] } {
  const actions: CalculatorAction[] = [];
  const deps: ProcessorDeps = {
    dispatch: (action: CalculatorAction) => {
      actions.push(action);
    },
    getState: () => state ?? createInitialCalculatorState('light'),
  };
  return { deps, actions };
}

describe('processAiCommand', () => {
  it('plots a valid expression via INSERT_EXPRESSION (existing store action family)', () => {
    const { deps, actions } = makeDeps();
    const command: AiCommand = { type: 'plot_expression', expression: 'x^2' };
    const outcome = processAiCommand(command, deps);
    expect(outcome.kind).toBe('applied');
    expect(outcome.message).toContain('x^2');
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('INSERT_EXPRESSION');
    const inserted = (actions[0] as { expression: { kind: string; definition: { rhs: string } } })
      .expression;
    expect(inserted.kind).toBe('cartesian');
    expect(inserted.definition.rhs).toBe('x^2');
  });

  it('refuses to plot an invalid expression without dispatching', () => {
    const { deps, actions } = makeDeps();
    const outcome = processAiCommand({ type: 'plot_expression', expression: 'x^^' }, deps);
    expect(outcome.kind).toBe('informational');
    expect(actions).toHaveLength(0);
  });

  it('warns about undefined variables in a plottable expression', () => {
    const { deps } = makeDeps();
    const outcome = processAiCommand({ type: 'plot_expression', expression: 'a*x' }, deps);
    expect(outcome.kind).toBe('applied');
    expect(outcome.message).toMatch(/"a".*not defined/);
  });

  it('adds a new slider variable with ADD_VARIABLE + UPDATE_VARIABLE', () => {
    const { deps, actions } = makeDeps();
    const outcome = processAiCommand({ type: 'add_variable', name: 'a', value: 2 }, deps);
    expect(outcome.kind).toBe('applied');
    expect(actions.map((a) => a.type)).toEqual(['ADD_VARIABLE', 'UPDATE_VARIABLE']);
  });

  it('updates an existing variable instead of duplicating it', () => {
    const state = createInitialCalculatorState('light');
    state.variables = [{ name: 'a', expression: '1', min: -10, max: 10, step: 0.1 }];
    const { deps, actions } = makeDeps(state);
    const outcome = processAiCommand({ type: 'add_variable', name: 'a', value: 5 }, deps);
    expect(outcome.kind).toBe('applied');
    expect(actions.map((a) => a.type)).toEqual(['UPDATE_VARIABLE']);
  });

  it('sets the viewport with the existing SET_VIEWPORT action', () => {
    const { deps, actions } = makeDeps();
    const outcome = processAiCommand(
      { type: 'set_viewport', xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
      deps
    );
    expect(outcome.kind).toBe('applied');
    expect(actions).toEqual([
      {
        type: 'SET_VIEWPORT',
        viewport: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
      },
    ]);
  });

  it('labels explain/step_by_step as conceptual, never applied', () => {
    const { deps, actions } = makeDeps();
    const explain = processAiCommand(
      { type: 'explain', topic: 'limits', explanation: 'Limits describe…' },
      deps
    );
    expect(explain).toMatchObject({ kind: 'informational', conceptual: true });
    expect(explain.message).toBe('Limits describe…');
    const steps = processAiCommand(
      { type: 'step_by_step', problem: 'p', steps: ['first', 'second'] },
      deps
    );
    expect(steps.conceptual).toBe(true);
    expect(steps.message).toContain('1. first');
    expect(steps.message).toContain('2. second');
    expect(actions).toHaveLength(0);
  });

  it('returns clear_chat for clear and help text for help', () => {
    const { deps } = makeDeps();
    expect(processAiCommand({ type: 'clear' }, deps).kind).toBe('clear_chat');
    const help = processAiCommand({ type: 'help' }, deps);
    expect(help.kind).toBe('informational');
    expect(help.message).toMatch(/plot x\^2/);
  });

  it('passes unknown messages through without state changes', () => {
    const { deps, actions } = makeDeps();
    const outcome = processAiCommand({ type: 'unknown', message: 'nope' }, deps);
    expect(outcome.message).toBe('nope');
    expect(actions).toHaveLength(0);
  });
});
