/**
 * Tests for the scientific calculator key layout: 2nd-shift swaps,
 * layout completeness, and the contract that every key inserts plain
 * expression syntax the shared engine already understands — except the
 * factorial/combinatorics notations, which the engine honestly rejects
 * (identical to typing them on a keyboard today).
 */
import { describe, expect, it } from 'vitest';
import {
  ALL_KEYS,
  FUNCTION_ROWS,
  KEYPAD_ROWS,
  isShiftable,
  resolveInsert,
  type KeyLayout,
} from '../scientific-keys.js';
import { evaluateScientificExpression } from '../../math/scientific.js';

function byId(id: KeyLayout['id']): KeyLayout {
  const key = ALL_KEYS.find((k) => k.id === id);
  if (!key) throw new Error(`missing key: ${id}`);
  return key;
}

function evaluates(source: string): boolean {
  return evaluateScientificExpression(source, 'deg').ok;
}

describe('key layout', () => {
  it('has two function rows of six keys', () => {
    expect(FUNCTION_ROWS).toHaveLength(2);
    for (const row of FUNCTION_ROWS) expect(row).toHaveLength(6);
  });

  it('has six keypad rows of five columns (the = key spans three)', () => {
    expect(KEYPAD_ROWS).toHaveLength(6);
    for (const row of KEYPAD_ROWS.slice(0, 5)) {
      expect(row.reduce((sum, key) => sum + (key.span ?? 1), 0)).toBe(5);
    }
    const last = KEYPAD_ROWS[5];
    expect(last.reduce((sum, key) => sum + (key.span ?? 1), 0)).toBe(5);
    expect(byId('equals').span).toBe(3);
  });

  it('uses every key id exactly once', () => {
    const ids = ALL_KEYS.map((key) => key.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.length).toBe(40);
  });
});

describe('2nd-shift swaps', () => {
  it('swaps trig keys to their inverses', () => {
    expect(resolveInsert(byId('sin'), true)).toBe('asin(');
    expect(resolveInsert(byId('cos'), true)).toBe('acos(');
    expect(resolveInsert(byId('tan'), true)).toBe('atan(');
    expect(resolveInsert(byId('sin'), false)).toBe('sin(');
  });

  it('swaps log/ln to power-of-ten / power-of-e forms', () => {
    expect(resolveInsert(byId('log'), true)).toBe('10^(');
    expect(resolveInsert(byId('ln'), true)).toBe('e^(');
  });

  it('leaves non-shiftable keys unchanged under shift', () => {
    for (const key of ALL_KEYS) {
      if (!isShiftable(key)) {
        expect(resolveInsert(key, true)).toBe(key.insert);
      }
    }
  });

  it('marks exactly the swappable keys as shiftable', () => {
    const shiftable = ALL_KEYS.filter(isShiftable).map((key) => key.id);
    expect(shiftable.sort()).toEqual(['cos', 'ln', 'log', 'sin', 'tan']);
  });
});

describe('insert syntax contract with the engine', () => {
  it('evaluates sample expressions built from function-key inserts', () => {
    expect(evaluates('sin(30)')).toBe(true);
    expect(evaluates('asin(0.5)')).toBe(true);
    expect(evaluates('log10(100)')).toBe(true);
    expect(evaluates('10^(2)')).toBe(true);
    expect(evaluates('ln(e)')).toBe(true);
    expect(evaluates('e^(1)')).toBe(true);
    expect(evaluates('2^3')).toBe(true);
    expect(evaluates('√(16)')).toBe(true);
    expect(evaluates('4^2')).toBe(true);
    expect(evaluates('2^(-1)')).toBe(true);
    expect(evaluates('abs(-5)')).toBe(true);
  });

  it('evaluates sample expressions built from keypad-key inserts', () => {
    expect(evaluates('(2+3)×4')).toBe(true);
    expect(evaluates('7+8−9')).toBe(true);
    expect(evaluates('50÷100')).toBe(true);
    expect(evaluates('5×10^(3)')).toBe(true);
    expect(evaluates('π')).toBe(true);
    expect(evaluates('2.5')).toBe(true);
  });

  it('surfaces honest errors for the unsupported factorial/combinatorics notations', () => {
    for (const source of ['5!', 'nCr(5,3)', 'nPr(5,3)']) {
      const result = evaluateScientificExpression(source, 'deg');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.message).not.toMatch(/NaN|Infinity/);
      }
    }
  });
});
