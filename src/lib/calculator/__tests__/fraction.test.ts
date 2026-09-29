/**
 * Tests for the decimal ⇄ fraction display helpers (pure formatting —
 * the evaluated value is never altered).
 */
import { describe, expect, it } from 'vitest';
import { decimalToFraction, formatFraction } from '../fraction.js';

describe('decimalToFraction', () => {
  it('renders simple decimals exactly', () => {
    expect(decimalToFraction(0.5)).toEqual({ numerator: 1, denominator: 2 });
    expect(decimalToFraction(-0.75)).toEqual({ numerator: -3, denominator: 4 });
    expect(decimalToFraction(0.2)).toEqual({ numerator: 1, denominator: 5 });
  });

  it('renders integers with denominator 1', () => {
    expect(decimalToFraction(2)).toEqual({ numerator: 2, denominator: 1 });
    expect(decimalToFraction(-7)).toEqual({ numerator: -7, denominator: 1 });
    expect(decimalToFraction(0)).toEqual({ numerator: 0, denominator: 1 });
  });

  it('approximates repeating decimals from floating point', () => {
    expect(decimalToFraction(1 / 3)).toEqual({ numerator: 1, denominator: 3 });
    // 0.1 + 0.2 is not exactly 0.3 in floating point; still 3/10.
    expect(decimalToFraction(0.1 + 0.2)).toEqual({ numerator: 3, denominator: 10 });
  });

  it('returns null for non-finite values', () => {
    expect(decimalToFraction(NaN)).toBeNull();
    expect(decimalToFraction(Infinity)).toBeNull();
    expect(decimalToFraction(-Infinity)).toBeNull();
  });

  it('returns null when no small-denominator approximation exists', () => {
    // π has no good approximation with a denominator under 10 000.
    expect(decimalToFraction(Math.PI, 10_000)).toBeNull();
  });

  it('finds a close approximation when the cap allows it', () => {
    const fraction = decimalToFraction(Math.PI);
    expect(fraction).not.toBeNull();
    expect(Math.abs(fraction!.numerator / fraction!.denominator - Math.PI)).toBeLessThan(1e-9);
  });
});

describe('formatFraction', () => {
  it('formats n/d', () => {
    expect(formatFraction({ numerator: 1, denominator: 2 })).toBe('1/2');
    expect(formatFraction({ numerator: -3, denominator: 4 })).toBe('-3/4');
  });

  it('formats whole values as integers', () => {
    expect(formatFraction({ numerator: 4, denominator: 1 })).toBe('4');
  });

  it('formats zero as 0', () => {
    expect(formatFraction({ numerator: 0, denominator: 7 })).toBe('0');
  });
});
