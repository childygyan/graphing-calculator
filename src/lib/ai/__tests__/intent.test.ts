import { describe, expect, it } from 'vitest';
import { detectLocalIntent } from '../intent.js';

const VIEWPORT = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

describe('detectLocalIntent', () => {
  it('detects plot commands with and without "y ="', () => {
    expect(detectLocalIntent('plot x^2', VIEWPORT)).toMatchObject({
      command: { type: 'plot_expression', expression: 'x^2' },
    });
    expect(detectLocalIntent('plot y = sin(x)', VIEWPORT)).toMatchObject({
      command: { type: 'plot_expression', expression: 'sin(x)' },
    });
    expect(detectLocalIntent('graph 2*x+1', VIEWPORT)).toMatchObject({
      command: { type: 'plot_expression', expression: '2*x+1' },
    });
  });

  it('answers when no expression can be extracted, without a command', () => {
    const intent = detectLocalIntent('plot ;;;', VIEWPORT);
    expect(intent?.command).toBeNull();
    expect(intent?.reply).toMatch(/could not find/i);
  });

  it('handles clear and help locally', () => {
    expect(detectLocalIntent('clear', VIEWPORT)?.command?.type).toBe('clear');
    expect(detectLocalIntent('help', VIEWPORT)?.command?.type).toBe('help');
  });

  it('zooms around the current viewport center', () => {
    const out = detectLocalIntent('zoom out', VIEWPORT);
    expect(out?.command).toMatchObject({ type: 'set_viewport', xMin: -20, xMax: 20 });
    const zoomed = { xMin: -20, xMax: 20, yMin: -20, yMax: 20 };
    const back = detectLocalIntent('zoom in', zoomed);
    expect(back?.command).toMatchObject({ type: 'set_viewport', xMin: -10, xMax: 10 });
  });

  it('resets the view to defaults', () => {
    const out = detectLocalIntent('reset view', VIEWPORT);
    expect(out?.command).toEqual({
      type: 'set_viewport',
      xMin: -10,
      xMax: 10,
      yMin: -10,
      yMax: 10,
    });
  });

  it('creates slider variables from assignment phrasing', () => {
    expect(detectLocalIntent('let a = 2', VIEWPORT)).toMatchObject({
      command: { type: 'add_variable', name: 'a', value: 2 },
    });
    expect(detectLocalIntent('add slider speed = 1.5', VIEWPORT)).toMatchObject({
      command: { type: 'add_variable', name: 'speed', value: 1.5 },
    });
  });

  it('rejects reserved variable names with an explanatory reply', () => {
    const intent = detectLocalIntent('let x = 2', VIEWPORT);
    expect(intent?.command).toBeNull();
    expect(intent?.reply).toMatch(/not a usable variable name/i);
  });

  it('evaluates expressions locally via the math engine (never the AI)', () => {
    const intent = detectLocalIntent('evaluate x^2 + 1 at x = 3', VIEWPORT);
    expect(intent?.command).toBeNull();
    expect(intent?.reply).toContain('10');
    expect(intent?.reply).toMatch(/math engine/i);
  });

  it('reports unparseable evaluate input honestly', () => {
    const intent = detectLocalIntent('evaluate x^^ at x = 3', VIEWPORT);
    expect(intent?.command).toBeNull();
    expect(intent?.reply).toMatch(/couldn't parse/i);
  });

  it('reports non-finite evaluation results honestly', () => {
    const intent = detectLocalIntent('evaluate 1/x at x = 0', VIEWPORT);
    expect(intent?.reply).toMatch(/not a finite number/i);
  });

  it('returns null for ambiguous input so it goes to the API', () => {
    expect(detectLocalIntent('why is the sky blue', VIEWPORT)).toBeNull();
    expect(detectLocalIntent('explain the chain rule', VIEWPORT)).toBeNull();
    expect(detectLocalIntent('', VIEWPORT)).toBeNull();
  });
});
