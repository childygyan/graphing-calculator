import { describe, expect, it } from 'vitest';
import { parseAndValidateAiOutput, validateAiCommand } from '../commands.js';

describe('validateAiCommand', () => {
  it('accepts every valid command shape', () => {
    expect(validateAiCommand({ type: 'plot_expression', expression: 'x^2' })).toEqual({
      ok: true,
      command: { type: 'plot_expression', expression: 'x^2' },
    });
    expect(validateAiCommand({ type: 'add_variable', name: 'a', value: 2 })).toEqual({
      ok: true,
      command: { type: 'add_variable', name: 'a', value: 2 },
    });
    expect(
      validateAiCommand({ type: 'set_viewport', xMin: -5, xMax: 5, yMin: -5, yMax: 5 })
    ).toEqual({
      ok: true,
      command: { type: 'set_viewport', xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
    });
    expect(
      validateAiCommand({
        type: 'explain',
        topic: 'derivatives',
        explanation: 'A derivative measures…',
      })
    ).toEqual({
      ok: true,
      command: { type: 'explain', topic: 'derivatives', explanation: 'A derivative measures…' },
    });
    expect(
      validateAiCommand({
        type: 'step_by_step',
        problem: 'solve x+1=2',
        steps: ['Subtract 1', 'x = 1'],
      })
    ).toEqual({
      ok: true,
      command: { type: 'step_by_step', problem: 'solve x+1=2', steps: ['Subtract 1', 'x = 1'] },
    });
    expect(validateAiCommand({ type: 'clear' })).toEqual({ ok: true, command: { type: 'clear' } });
    expect(validateAiCommand({ type: 'help' })).toEqual({ ok: true, command: { type: 'help' } });
    expect(validateAiCommand({ type: 'unknown', message: 'nope' })).toEqual({
      ok: true,
      command: { type: 'unknown', message: 'nope' },
    });
  });

  it('ignores extra unknown keys instead of failing', () => {
    const result = validateAiCommand({ type: 'help', confidence: 0.99, extra: [1] });
    expect(result).toEqual({ ok: true, command: { type: 'help' } });
  });

  it('rejects non-objects and unknown discriminators', () => {
    for (const bad of [
      null,
      42,
      'help',
      [],
      { type: 'launch_missiles' },
      { type: 'PLOT_EXPRESSION' },
      {},
    ]) {
      const result = validateAiCommand(bad);
      expect(result.ok).toBe(false);
    }
  });

  it('rejects plot_expression with unparseable or hostile sources', () => {
    const hostile = ['x^2; alert(1)', 'x^2 <script>', 'while(true){}', 'x^^', '2+', '', '   '];
    for (const expression of hostile) {
      const result = validateAiCommand({ type: 'plot_expression', expression });
      expect(result.ok, JSON.stringify(expression)).toBe(false);
    }
  });

  it('rejects plot_expression with wrong field types', () => {
    expect(validateAiCommand({ type: 'plot_expression', expression: 42 }).ok).toBe(false);
    expect(validateAiCommand({ type: 'plot_expression' }).ok).toBe(false);
    expect(validateAiCommand({ type: 'plot_expression', expression: 'x'.repeat(201) }).ok).toBe(
      false
    );
  });

  it('rejects add_variable with reserved names and non-finite values', () => {
    expect(validateAiCommand({ type: 'add_variable', name: 'x', value: 1 }).ok).toBe(false);
    expect(validateAiCommand({ type: 'add_variable', name: 'sin', value: 1 }).ok).toBe(false);
    expect(validateAiCommand({ type: 'add_variable', name: 'a', value: NaN }).ok).toBe(false);
    expect(validateAiCommand({ type: 'add_variable', name: 'a', value: Infinity }).ok).toBe(false);
    expect(validateAiCommand({ type: 'add_variable', name: 'a', value: 1e9 }).ok).toBe(false);
    expect(validateAiCommand({ type: 'add_variable', name: 'A', value: 2 })).toEqual({
      ok: true,
      command: { type: 'add_variable', name: 'a', value: 2 },
    });
  });

  it('rejects set_viewport with inverted or degenerate ranges', () => {
    expect(
      validateAiCommand({ type: 'set_viewport', xMin: 5, xMax: -5, yMin: -5, yMax: 5 }).ok
    ).toBe(false);
    expect(validateAiCommand({ type: 'set_viewport', xMin: 0, xMax: 0, yMin: 0, yMax: 1 }).ok).toBe(
      false
    );
    expect(
      validateAiCommand({ type: 'set_viewport', xMin: -1e12, xMax: 1e12, yMin: -1, yMax: 1 }).ok
    ).toBe(false);
  });

  it('rejects explain/step_by_step with missing or oversized text', () => {
    expect(validateAiCommand({ type: 'explain', topic: 'x' }).ok).toBe(false);
    expect(
      validateAiCommand({ type: 'explain', topic: 'x', explanation: 'y'.repeat(4001) }).ok
    ).toBe(false);
    expect(validateAiCommand({ type: 'step_by_step', problem: 'p', steps: [] }).ok).toBe(false);
    expect(validateAiCommand({ type: 'step_by_step', problem: 'p', steps: ['ok', 42] }).ok).toBe(
      false
    );
  });
});

describe('parseAndValidateAiOutput', () => {
  it('parses JSON and validates in one step', () => {
    const result = parseAndValidateAiOutput('{"type":"help"}');
    expect(result).toEqual({ ok: true, command: { type: 'help' } });
  });

  it('tolerates a single markdown fence', () => {
    const result = parseAndValidateAiOutput('```json\n{"type":"clear"}\n```');
    expect(result).toEqual({ ok: true, command: { type: 'clear' } });
  });

  it('rejects non-JSON text', () => {
    const result = parseAndValidateAiOutput('Sure! Here is your plot: x^2');
    expect(result.ok).toBe(false);
  });

  it('rejects JSON that fails the schema', () => {
    const result = parseAndValidateAiOutput('{"type":"plot_expression","expression":"x^2;"}');
    expect(result.ok).toBe(false);
  });
});
