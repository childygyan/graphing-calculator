/**
 * Tests for the scientific calculator evaluation layer
 * (src/lib/math/scientific.ts): arithmetic, trig in both angle modes,
 * logarithms, powers, roots, constants, honest errors, and keyboard
 * mapping. The engine itself is tested separately — these tests pin the
 * thin layers on top of it (DEG/RAD rewriting, error classification).
 */
import { describe, expect, it } from 'vitest';
import type { AngleMode } from '../scientific.js';
import { calculatorKeyAction, evaluateScientificExpression } from '../scientific.js';

function valueOf(source: string, mode: AngleMode = 'rad'): number {
  const result = evaluateScientificExpression(source, mode);
  if (!result.ok) throw new Error(`expected a value for ${source}, got: ${result.message}`);
  return result.value;
}

function errorOf(source: string, mode: AngleMode = 'rad'): string {
  const result = evaluateScientificExpression(source, mode);
  if (result.ok) throw new Error(`expected an error for ${source}, got ${result.value}`);
  expect(result.message).not.toMatch(/NaN|Infinity/);
  return result.message;
}

describe('scientific evaluation — arithmetic', () => {
  it('respects operator precedence', () => {
    expect(valueOf('2+3*4')).toBe(14);
  });

  it('honors parentheses', () => {
    expect(valueOf('(2+3)*4')).toBe(20);
  });

  it('treats ^ as right-associative', () => {
    expect(valueOf('2^3^2')).toBe(512);
  });

  it('handles unary minus with powers like the engine', () => {
    expect(valueOf('-3^2')).toBe(-9);
  });

  it('accepts unicode operators', () => {
    expect(valueOf('6×7')).toBe(42);
    expect(valueOf('20÷4')).toBe(5);
    expect(valueOf('√9')).toBe(3);
  });
});

describe('scientific evaluation — trigonometry', () => {
  it('evaluates trig in radians by default', () => {
    expect(valueOf('sin(pi/6)', 'rad')).toBeCloseTo(0.5, 12);
    expect(valueOf('cos(0)', 'rad')).toBe(1);
    expect(valueOf('tan(0)', 'rad')).toBe(0);
  });

  it('converts degree inputs in DEG mode', () => {
    expect(valueOf('sin(30)', 'deg')).toBeCloseTo(0.5, 12);
    expect(valueOf('cos(60)', 'deg')).toBeCloseTo(0.5, 12);
    expect(valueOf('tan(45)', 'deg')).toBeCloseTo(1, 12);
  });

  it('reports inverse trig in degrees in DEG mode', () => {
    expect(valueOf('asin(1)', 'deg')).toBeCloseTo(90, 10);
    expect(valueOf('acos(0)', 'deg')).toBeCloseTo(90, 10);
    expect(valueOf('atan(1)', 'deg')).toBeCloseTo(45, 10);
  });

  it('reports inverse trig in radians in RAD mode', () => {
    expect(valueOf('asin(1)', 'rad')).toBeCloseTo(Math.PI / 2, 12);
    expect(valueOf('atan(1)', 'rad')).toBeCloseTo(Math.PI / 4, 12);
  });

  it('handles nested trig conversions', () => {
    expect(valueOf('sin(asin(0.5))', 'deg')).toBeCloseTo(0.5, 12);
    expect(valueOf('sin(30)^2+cos(30)^2', 'deg')).toBeCloseTo(1, 12);
  });
});

describe('scientific evaluation — logs, powers, roots, constants', () => {
  it('computes base-10 and natural logs', () => {
    expect(valueOf('log10(1000)')).toBe(3);
    expect(valueOf('ln(e)')).toBeCloseTo(1, 12);
    expect(valueOf('log10(100)')).toBe(2);
    // The engine's `log` is the natural logarithm (the keypad's log key
    // inserts `log10(` for the conventional base-10 behavior).
    expect(valueOf('log(e)')).toBeCloseTo(1, 12);
  });

  it('computes powers and roots', () => {
    expect(valueOf('2^10')).toBe(1024);
    expect(valueOf('sqrt(16)')).toBe(4);
    expect(valueOf('9^(1/2)')).toBe(3);
    expect(valueOf('cbrt(27)')).toBe(3);
  });

  it('resolves pi, e and tau', () => {
    expect(valueOf('2*pi')).toBeCloseTo(2 * Math.PI, 12);
    expect(valueOf('e^1')).toBeCloseTo(Math.E, 12);
    expect(valueOf('π', 'deg')).toBeCloseTo(Math.PI, 12);
  });

  it('formats the display with 10 significant digits', () => {
    const result = evaluateScientificExpression('sqrt(2)', 'rad');
    if (!result.ok) throw new Error('expected ok');
    expect(result.display).toBe('1.414213562');
  });
});

describe('scientific evaluation — honest errors', () => {
  it('reports division by zero honestly', () => {
    expect(errorOf('1/0')).toContain('division by zero');
    expect(errorOf('0/0')).toContain('division by zero');
    expect(errorOf('1/(2-2)')).toContain('division by zero');
    expect(errorOf('0^-1')).toContain('division by zero');
  });

  it('reports square root of a negative number', () => {
    expect(errorOf('sqrt(-1)')).toContain('square root of a negative');
    expect(errorOf('√(-25)', 'deg')).toContain('square root of a negative');
  });

  it('reports logarithm of a non-positive number', () => {
    expect(errorOf('log(0)')).toContain('logarithm of a non-positive');
    expect(errorOf('log(-2)')).toContain('logarithm of a non-positive');
    expect(errorOf('ln(0)')).toContain('logarithm of a non-positive');
    expect(errorOf('log10(-0.5)')).toContain('logarithm of a non-positive');
  });

  it('reports out-of-range inverse trig arguments', () => {
    expect(errorOf('asin(2)')).toContain('between −1 and 1');
    expect(errorOf('acos(-1.5)', 'deg')).toContain('between −1 and 1');
  });

  it('reports tan as undefined at odd multiples of 90° in DEG mode', () => {
    expect(errorOf('tan(90)', 'deg')).toContain('tan is not defined');
    expect(errorOf('tan(270)', 'deg')).toContain('tan is not defined');
  });

  it('reports overflow instead of Infinity', () => {
    expect(errorOf('10^1000')).toContain('Overflow');
  });

  it('reports a generic message when no specific cause is found', () => {
    expect(errorOf('(-8)^(1/3)')).toContain('not a real number');
  });

  it('rejects variables with a friendly message', () => {
    expect(errorOf('x+1')).toContain('not defined here');
  });

  it('handles empty input', () => {
    expect(errorOf('')).toContain('Enter an expression');
    expect(errorOf('   ')).toContain('Enter an expression');
  });

  it('handles a trailing operator', () => {
    expect(errorOf('2+')).toContain('ends with an operator');
    expect(errorOf('sin(30)*')).toContain('ends with an operator');
  });

  it('handles mismatched parentheses', () => {
    expect(errorOf('((2+3')).toContain('Mismatched parentheses');
    expect(errorOf('sin(30')).toContain('Mismatched parentheses');
  });

  it('handles unknown characters', () => {
    expect(errorOf('2&3')).toContain("don't understand the character");
  });

  it('never leaks raw NaN or Infinity text', () => {
    for (const source of ['1/0', 'sqrt(-1)', 'log(0)', '10^1000', 'asin(2)', 'tan(90)']) {
      const result = evaluateScientificExpression(source, 'deg');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.message).not.toMatch(/\bNaN\b/);
        expect(result.message).not.toMatch(/\bInfinity\b/);
      }
    }
  });
});

describe('calculator keyboard mapping', () => {
  it('maps Enter and = to evaluate', () => {
    expect(calculatorKeyAction('Enter')).toEqual({ type: 'evaluate' });
    expect(calculatorKeyAction('=')).toEqual({ type: 'evaluate' });
  });

  it('maps Escape to clear', () => {
    expect(calculatorKeyAction('Escape')).toEqual({ type: 'clear' });
  });

  it('maps * and / to the display operators', () => {
    expect(calculatorKeyAction('*')).toEqual({ type: 'insert', text: '×' });
    expect(calculatorKeyAction('/')).toEqual({ type: 'insert', text: '÷' });
  });

  it('maps x to multiplication', () => {
    expect(calculatorKeyAction('x')).toEqual({ type: 'insert', text: '×' });
    expect(calculatorKeyAction('X')).toEqual({ type: 'insert', text: '×' });
  });

  it('returns null for keys the input handles natively', () => {
    for (const key of ['0', '5', '9', '.', '+', '-', '(', ')', '^', 'a', 'Backspace']) {
      expect(calculatorKeyAction(key)).toBeNull();
    }
  });
});
