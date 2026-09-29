/**
 * Phase 6 MathCommandProcessor — turns a VALIDATED AiCommand into concrete,
 * safe calculator state mutations.
 *
 * Rules:
 * - Only accepts commands that passed `validateAiCommand` (or the local
 *   intent detector, which builds the same union). Never raw model text.
 * - Reuses the existing store: dispatches the same CalculatorActions the
 *   UI uses — there is no parallel state.
 * - The math engine stays the source of truth: plot sources are
 *   re-validated locally before dispatch, and `explain`/`step_by_step`
 *   text is always flagged `conceptual` so the UI labels it honestly
 *   instead of presenting AI prose as computed results.
 */

import type { Dispatch } from 'react';
import type { CalculatorAction } from '../../components/calculator/CalculatorStore.js';
import type { CalculatorState } from '../../types/calculator.js';
import type { AiCommand } from './commands.js';
import { createExpression } from '../expressions/expressions.js';
import { compileExpression, validateExpressionSource } from '../math/engine.js';

export interface ProcessorDeps {
  dispatch: Dispatch<CalculatorAction>;
  getState: () => CalculatorState;
}

export type ProcessorOutcomeKind = 'applied' | 'informational' | 'clear_chat';

export interface ProcessorOutcome {
  kind: ProcessorOutcomeKind;
  /** Chat text describing what happened (or the AI's conceptual text). */
  message: string;
  /** True for explain/step_by_step: AI prose, NOT engine-computed. */
  conceptual?: boolean;
}

const HELP_TEXT = [
  'Here is what I can do:',
  '• "plot x^2" — plot a function',
  '• "zoom in" / "zoom out" / "reset view" — change the viewport',
  '• "let a = 2" — add a slider variable',
  '• "evaluate x^2+1 at x = 3" — compute a value with the math engine',
  '• "explain derivatives" — conceptual explanation',
  '• "clear" — clear this chat',
  'Anything trickier goes to the AI service when it is configured.',
].join('\n');

function undefinedVariables(expression: string, state: CalculatorState): string[] {
  try {
    const compiled = compileExpression(expression);
    const defined = new Set(state.variables.map((v) => v.name));
    return compiled.variables.filter((name) => name !== 'x' && !defined.has(name));
  } catch {
    return [];
  }
}

function processPlot(expression: string, deps: ProcessorDeps): ProcessorOutcome {
  const validation = validateExpressionSource(expression);
  if (!validation.valid) {
    const detail = validation.issues[0]?.message ?? 'invalid expression';
    return { kind: 'informational', message: `I couldn't plot that: ${detail}` };
  }
  const state = deps.getState();
  const created = createExpression('cartesian', undefined, {
    definition: { rhs: expression },
  });
  deps.dispatch({ type: 'INSERT_EXPRESSION', expression: created });
  const missing = undefinedVariables(expression, state);
  const hint =
    missing.length > 0
      ? ` Note: ${missing.map((m) => `"${m}"`).join(', ')} ${missing.length === 1 ? 'is' : 'are'} not defined — try "let ${missing[0]} = 2".`
      : '';
  return { kind: 'applied', message: `Plotted y = ${expression}.${hint}` };
}

function processAddVariable(name: string, value: number, deps: ProcessorDeps): ProcessorOutcome {
  const { dispatch, getState } = deps;
  const existing = getState().variables.find((v) => v.name === name);
  if (existing) {
    const min = Math.min(existing.min, value - Math.abs(value) * 0.1 - 1);
    const max = Math.max(existing.max, value + Math.abs(value) * 0.1 + 1);
    dispatch({
      type: 'UPDATE_VARIABLE',
      name,
      patch: { expression: String(value), min, max },
    });
    return { kind: 'applied', message: `Updated slider ${name} to ${value}.` };
  }
  const span = 20;
  dispatch({ type: 'ADD_VARIABLE', name });
  dispatch({
    type: 'UPDATE_VARIABLE',
    name,
    patch: {
      expression: String(value),
      min: value - span / 2,
      max: value + span / 2,
      step: 0.1,
    },
  });
  return { kind: 'applied', message: `Added slider ${name} = ${value}.` };
}

/**
 * Run a validated command against the calculator. Pure dispatch logic —
 * the React component owns rendering and chat history.
 */
export function processAiCommand(command: AiCommand, deps: ProcessorDeps): ProcessorOutcome {
  switch (command.type) {
    case 'plot_expression':
      return processPlot(command.expression, deps);
    case 'add_variable':
      return processAddVariable(command.name, command.value, deps);
    case 'set_viewport':
      deps.dispatch({
        type: 'SET_VIEWPORT',
        viewport: {
          xMin: command.xMin,
          xMax: command.xMax,
          yMin: command.yMin,
          yMax: command.yMax,
        },
      });
      return { kind: 'applied', message: 'Viewport updated.' };
    case 'explain':
      // The explanation text traveled inside the validated schema. It is
      // AI prose, never engine output — the UI renders it with a clear
      // conceptual label.
      return { kind: 'informational', message: command.explanation, conceptual: true };
    case 'step_by_step':
      return {
        kind: 'informational',
        message: command.steps.map((step, i) => `${i + 1}. ${step}`).join('\n'),
        conceptual: true,
      };
    case 'clear':
      return { kind: 'clear_chat', message: '' };
    case 'help':
      return { kind: 'informational', message: HELP_TEXT };
    case 'unknown':
      return { kind: 'informational', message: command.message };
  }
}
