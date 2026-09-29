import { describe, expect, it } from 'vitest';
import { normalizeExpressionSource } from '../normalize.js';

describe('normalizeExpressionSource', () => {
  it('trims and collapses whitespace (stable cache key)', () => {
    expect(normalizeExpressionSource('  x + 1 ')).toBe('x + 1');
    expect(normalizeExpressionSource('x   +   1')).toBe('x + 1');
    expect(normalizeExpressionSource('x+1')).toBe('x+1');
    expect(normalizeExpressionSource('x\t*\n2')).toBe('x * 2');
  });

  it('maps unicode operators to ASCII', () => {
    expect(normalizeExpressionSource('2×x')).toBe('2*x');
    expect(normalizeExpressionSource('6÷2')).toBe('6/2');
    expect(normalizeExpressionSource('x−1')).toBe('x-1');
    expect(normalizeExpressionSource('2⋅x')).toBe('2*x');
  });

  it('maps unicode constants and roots', () => {
    expect(normalizeExpressionSource('π')).toBe('pi');
    expect(normalizeExpressionSource('2πr')).toBe('2pir');
    expect(normalizeExpressionSource('√x')).toBe('sqrt x');
    expect(normalizeExpressionSource('√(x+1)')).toBe('sqrt (x+1)');
  });

  it('expands superscript runs into ^ notation', () => {
    expect(normalizeExpressionSource('x²')).toBe('x^2');
    expect(normalizeExpressionSource('x²+y³')).toBe('x^2+y^3');
    expect(normalizeExpressionSource('10⁻³')).toBe('10^-3');
    expect(normalizeExpressionSource('(x+1)²')).toBe('(x+1)^2');
  });

  it('applies function aliases', () => {
    expect(normalizeExpressionSource('arcsin x')).toBe('asin x');
    expect(normalizeExpressionSource('arccos(x)')).toBe('acos(x)');
    expect(normalizeExpressionSource('arctan x')).toBe('atan x');
    expect(normalizeExpressionSource('ln(x)')).toBe('log(x)');
    expect(normalizeExpressionSource('LN(X)')).toBe('log(X)');
  });

  it('does not rewrite aliases inside longer identifiers', () => {
    // "linear" contains "ln" but is a single identifier; the parser will
    // reject it as unknown — the normalizer must not mangle it.
    expect(normalizeExpressionSource('linear')).toBe('linear');
  });

  it('strips a leading y = / f(x) = equation prefix', () => {
    expect(normalizeExpressionSource('y = x^2')).toBe('x^2');
    expect(normalizeExpressionSource('y=x+1')).toBe('x+1');
    expect(normalizeExpressionSource('f(x) = sin x')).toBe('sin x');
    expect(normalizeExpressionSource('Y = 2x')).toBe('2x');
  });

  it('leaves already-normal source untouched', () => {
    expect(normalizeExpressionSource('sin(x)^2+log10(x)')).toBe('sin(x)^2+log10(x)');
  });

  it('handles empty input', () => {
    expect(normalizeExpressionSource('')).toBe('');
    expect(normalizeExpressionSource('   ')).toBe('');
  });
});
