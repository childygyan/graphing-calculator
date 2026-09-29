import { describe, expect, it } from 'vitest';
import { compileAst } from '../compiler.js';
import { normalizeExpressionSource } from '../normalize.js';
import { parse } from '../parser.js';
import { tokenize } from '../tokenizer.js';

function compile(source: string): (x: number) => number {
  return compileAst(parse(tokenize(normalizeExpressionSource(source))));
}

describe('compileAst', () => {
  it('evaluates arithmetic with correct precedence', () => {
    expect(compile('2+3*4')(0)).toBe(14);
    expect(compile('(2+3)*4')(0)).toBe(20);
    expect(compile('2^3^2')(0)).toBe(512);
    expect(compile('-3^2')(0)).toBe(-9);
    expect(compile('(-3)^2')(0)).toBe(9);
  });

  it('evaluates the variable and implicit multiplication', () => {
    expect(compile('2x+1')(3)).toBe(7);
    expect(compile('3(x+1)')(4)).toBe(15);
    expect(compile('x(x+1)')(4)).toBe(20);
  });

  it('evaluates trig and inverse trig at known values', () => {
    expect(compile('sin(pi/2)')(0)).toBeCloseTo(1, 12);
    expect(compile('cos(pi)')(0)).toBeCloseTo(-1, 12);
    expect(compile('tan(pi/4)')(0)).toBeCloseTo(1, 12);
    expect(compile('asin(1)')(0)).toBeCloseTo(Math.PI / 2, 12);
    expect(compile('acos(0)')(0)).toBeCloseTo(Math.PI / 2, 12);
    expect(compile('atan(1)')(0)).toBeCloseTo(Math.PI / 4, 12);
  });

  it('evaluates exp/log/sqrt/powers', () => {
    expect(compile('exp(1)')(0)).toBeCloseTo(Math.E, 12);
    expect(compile('log(e)')(0)).toBeCloseTo(1, 12);
    expect(compile('ln(e^2)')(0)).toBeCloseTo(2, 12);
    expect(compile('log10(1000)')(0)).toBeCloseTo(3, 12);
    expect(compile('sqrt(16)')(0)).toBe(4);
    expect(compile('cbrt(-8)')(0)).toBe(-2);
    expect(compile('2^x')(10)).toBe(1024);
  });

  it('evaluates rounding and misc functions', () => {
    expect(compile('abs(-3)')(0)).toBe(3);
    expect(compile('floor(2.7)')(0)).toBe(2);
    expect(compile('ceil(2.2)')(0)).toBe(3);
    expect(compile('round(2.5)')(0)).toBe(3);
    expect(compile('sign(-9)')(0)).toBe(-1);
    expect(compile('max(2,x)')(5)).toBe(5);
    expect(compile('min(2,x)')(5)).toBe(2);
    expect(compile('sinh(0)')(0)).toBe(0);
    expect(compile('cosh(0)')(0)).toBe(1);
  });

  it('evaluates constants', () => {
    expect(compile('pi')(0)).toBeCloseTo(Math.PI, 15);
    expect(compile('e')(0)).toBeCloseTo(Math.E, 15);
    expect(compile('tau')(0)).toBeCloseTo(Math.PI * 2, 15);
    expect(compile('2pi')(0)).toBeCloseTo(2 * Math.PI, 12);
  });

  it('handles unicode and aliases end to end', () => {
    expect(compile('x²')(3)).toBe(9);
    expect(compile('2×x')(3)).toBe(6);
    expect(compile('√16')(0)).toBe(4);
    expect(compile('arcsin(1)')(0)).toBeCloseTo(Math.PI / 2, 12);
  });

  it('returns NaN for domain violations instead of throwing', () => {
    expect(compile('1/x')(0)).toBeNaN();
    expect(compile('sqrt(x)')(-1)).toBeNaN();
    expect(compile('log(x)')(0)).toBeNaN();
    expect(compile('log(-5)')(0)).toBeNaN();
    expect(compile('log10(0)')(0)).toBeNaN();
    expect(compile('asin(2)')(0)).toBeNaN();
    expect(compile('acos(-2)')(0)).toBeNaN();
    expect(compile('(x^2-1)/(x-1)')(1)).toBeNaN();
  });

  it('keeps working around domain edges', () => {
    const sqrt = compile('sqrt(x)');
    expect(sqrt(0)).toBe(0);
    expect(sqrt(4)).toBe(2);
    const inv = compile('1/x');
    expect(inv(2)).toBe(0.5);
    expect(inv(-2)).toBe(-0.5);
  });
});
