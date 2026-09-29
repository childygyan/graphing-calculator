import { describe, expect, it } from 'vitest';
import { normalizeExpressionSource } from '../normalize.js';
import { parse } from '../parser.js';
import { ParseError, tokenize } from '../tokenizer.js';
import type { AstNode } from '../ast.js';

function parseSource(source: string): AstNode {
  return parse(tokenize(normalizeExpressionSource(source)));
}

function parseError(source: string): ParseError {
  try {
    parseSource(source);
  } catch (error) {
    if (error instanceof ParseError) return error;
    throw error;
  }
  throw new Error(`expected ParseError for ${JSON.stringify(source)}`);
}

describe('parser', () => {
  it('respects operator precedence: 2+3*4 = 2+(3*4)', () => {
    const node = parseSource('2+3*4');
    expect(node.kind).toBe('binary');
    if (node.kind !== 'binary') throw new Error('unreachable');
    expect(node.operator).toBe('+');
    expect(node.right.kind).toBe('binary');
  });

  it('parses ^ as right-associative: 2^3^2 = 2^(3^2)', () => {
    const node = parseSource('2^3^2');
    expect(node.kind).toBe('binary');
    if (node.kind !== 'binary') throw new Error('unreachable');
    expect(node.operator).toBe('^');
    expect(node.right.kind).toBe('binary');
    if (node.right.kind !== 'binary') throw new Error('unreachable');
    expect(node.right.operator).toBe('^');
  });

  it('parses unary minus looser than ^: -3^2 = -(3^2)', () => {
    const node = parseSource('-3^2');
    expect(node.kind).toBe('unary');
    if (node.kind !== 'unary') throw new Error('unreachable');
    expect(node.operand.kind).toBe('binary');
  });

  it('parses implicit multiplication: 2x, 3(x+1), x(x+1)', () => {
    for (const source of ['2x', '3(x+1)', 'x(x+1)', '2sin(x)']) {
      const node = parseSource(source);
      expect(node.kind).toBe('binary');
      if (node.kind !== 'binary') throw new Error('unreachable');
      expect(node.operator).toBe('*');
    }
  });

  it('parses bare function application: sin x^2 = sin(x^2)', () => {
    const node = parseSource('sin x^2');
    expect(node.kind).toBe('call');
    if (node.kind !== 'call') throw new Error('unreachable');
    expect(node.name).toBe('sin');
    expect(node.args).toHaveLength(1);
    expect(node.args[0].kind).toBe('binary');
  });

  it('parses parenthesized calls with multiple args', () => {
    const node = parseSource('max(2,x)');
    expect(node.kind).toBe('call');
    if (node.kind !== 'call') throw new Error('unreachable');
    expect(node.args).toHaveLength(2);
  });

  it('recognizes constants and the variable', () => {
    const pi = parseSource('pi');
    expect(pi).toMatchObject({ kind: 'constant', name: 'pi' });
    const x = parseSource('x');
    expect(x).toMatchObject({ kind: 'variable', name: 'x' });
  });

  it('parses unknown identifiers as variable references (Phase 5)', () => {
    const node = parseSource('2+z');
    expect(node.kind).toBe('binary');
    if (node.kind !== 'binary') throw new Error('unreachable');
    expect(node.right).toMatchObject({ kind: 'variable', name: 'z' });
  });

  it('lowercases variable names for case-insensitive binding', () => {
    expect(parseSource('A')).toMatchObject({ kind: 'variable', name: 'a' });
  });

  it('rejects empty input', () => {
    const error = parseError('   ');
    expect(error.message).toContain('Enter an expression');
  });

  it('rejects unbalanced parentheses', () => {
    const error = parseError('(x+1');
    expect(error.message).toContain("Expected ')'");
  });

  it('rejects trailing operators', () => {
    const error = parseError('x+');
    expect(error.message).toContain('Unexpected end');
  });

  it('rejects wrong argument counts', () => {
    const error = parseError('sin(x,2)');
    expect(error.message).toContain('expects 1 argument(s) but got 2');
  });

  it('rejects a function with no argument', () => {
    const error = parseError('sin()');
    expect(error.message).toContain('needs an argument');
  });

  it('attaches source spans to nodes', () => {
    const node = parseSource('x+1');
    expect(node.span).toEqual({ start: 0, end: 3 });
  });
});
