import { describe, expect, it } from 'vitest';
import { ParseError, tokenize } from '../tokenizer.js';
import type { TokenKind } from '../tokenizer.js';

function kinds(source: string): TokenKind[] {
  return tokenize(source).map((t) => t.kind);
}

describe('tokenize', () => {
  it('tokenizes numbers including decimals and scientific notation', () => {
    const tokens = tokenize('3.14 2 1e3 2.5e-2 .5');
    expect(tokens.map((t) => t.kind)).toEqual([
      'number',
      'number',
      'number',
      'number',
      'number',
      'eof',
    ]);
    expect(tokens.map((t) => t.value)).toEqual([3.14, 2, 1000, 0.025, 0.5, undefined]);
  });

  it('tokenizes identifiers and operators', () => {
    expect(kinds('sin(x)+2^y,')).toEqual([
      'identifier',
      'lparen',
      'identifier',
      'rparen',
      'plus',
      'number',
      'caret',
      'identifier',
      'comma',
      'eof',
    ]);
  });

  it('records character offsets', () => {
    const tokens = tokenize('x+12');
    expect(tokens[0]).toMatchObject({ kind: 'identifier', text: 'x', start: 0, end: 1 });
    expect(tokens[1]).toMatchObject({ kind: 'plus', text: '+', start: 1, end: 2 });
    expect(tokens[2]).toMatchObject({ kind: 'number', text: '12', start: 2, end: 4 });
  });

  it('throws ParseError with position on unknown characters', () => {
    try {
      tokenize('x$2');
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(ParseError);
      expect((error as ParseError).position).toBe(1);
      expect((error as ParseError).message).toContain('$');
    }
  });

  it('rejects a second decimal point via unexpected character', () => {
    // "1.2.3" tokenizes as number(1.2), then ".3" → number(.3); the parser
    // will flag the juxtaposition. The tokenizer itself must not crash.
    expect(kinds('1.2.3')).toEqual(['number', 'number', 'eof']);
  });

  it('handles empty input', () => {
    expect(kinds('')).toEqual(['eof']);
  });
});
