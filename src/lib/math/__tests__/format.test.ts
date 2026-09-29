/** Tests for precision-aware number formatting and numeric input parsing. */

import { describe, expect, it } from 'vitest';
import { formatNumber, parseNumericInput, sanitizePrecision } from '../format.js';

describe('formatNumber', () => {
  it('formats with decimal places by default', () => {
    expect(formatNumber(3.14159)).toBe('3.1416');
    expect(formatNumber(2)).toBe('2.0000');
  });

  it('formats with significant digits', () => {
    expect(formatNumber(3.14159, { mode: 'significant', digits: 4 })).toBe('3.142');
    expect(formatNumber(0.0012345, { mode: 'significant', digits: 3 })).toBe('0.00123');
  });

  it('renders non-finite values honestly', () => {
    expect(formatNumber(NaN)).toBe('—');
    expect(formatNumber(Number.POSITIVE_INFINITY)).toBe('∞');
    expect(formatNumber(Number.NEGATIVE_INFINITY)).toBe('−∞');
  });

  it('normalizes negative zero', () => {
    expect(formatNumber(-0.00001, { mode: 'decimals', digits: 2 })).toBe('0.00');
  });

  it('handles 0 digits', () => {
    expect(formatNumber(3.7, { mode: 'decimals', digits: 0 })).toBe('4');
  });
});

describe('sanitizePrecision', () => {
  it('clamps decimal digits to 0–12', () => {
    expect(sanitizePrecision({ mode: 'decimals', digits: 99 }).digits).toBe(12);
    expect(sanitizePrecision({ mode: 'decimals', digits: -3 }).digits).toBe(0);
  });

  it('clamps significant digits to 1–15', () => {
    expect(sanitizePrecision({ mode: 'significant', digits: 99 }).digits).toBe(15);
    expect(sanitizePrecision({ mode: 'significant', digits: 0 }).digits).toBe(1);
  });

  it('falls back to defaults for garbage', () => {
    expect(sanitizePrecision(null)).toEqual({ mode: 'decimals', digits: 4 });
    expect(sanitizePrecision({ mode: 'weird', digits: 2 })).toEqual({
      mode: 'decimals',
      digits: 2,
    });
  });
});

describe('parseNumericInput', () => {
  it('parses plain numbers', () => {
    expect(parseNumericInput('3.5')).toBe(3.5);
    expect(parseNumericInput('  -10 ')).toBe(-10);
    expect(parseNumericInput('1e3')).toBe(1000);
  });

  it('returns null for invalid input', () => {
    expect(parseNumericInput('')).toBeNull();
    expect(parseNumericInput('abc')).toBeNull();
    expect(parseNumericInput('Infinity')).toBeNull();
    expect(parseNumericInput('1/2')).toBeNull();
  });
});
