/**
 * Phase 3 tokenizer: normalized source string → token stream.
 *
 * Tokens carry character offsets into the normalized source so parse errors
 * can point at the offending text. The tokenizer never evaluates anything;
 * unknown characters are a hard ParseError.
 */

export type TokenKind =
  | 'number'
  | 'identifier'
  | 'plus'
  | 'minus'
  | 'star'
  | 'slash'
  | 'caret'
  | 'lparen'
  | 'rparen'
  | 'comma'
  | 'eof';

export interface Token {
  kind: TokenKind;
  /** Raw text of the token in the normalized source. */
  text: string;
  /** Parsed numeric value (number tokens only). */
  value?: number;
  /** Inclusive start offset. */
  start: number;
  /** Exclusive end offset. */
  end: number;
}

/** Structured syntax error with a position in the normalized source. */
export class ParseError extends Error {
  /** Character offset into the normalized source where the error was found. */
  readonly position: number;

  constructor(message: string, position: number) {
    super(message);
    this.name = 'ParseError';
    this.position = position;
  }
}

const NUMBER_PATTERN = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/;

function isIdentifierStart(char: string): boolean {
  return /[a-zA-Z_]/.test(char);
}

function isIdentifierPart(char: string): boolean {
  return /[a-zA-Z0-9_]/.test(char);
}

/**
 * Split normalized source into tokens. Throws ParseError on the first
 * character that cannot start a token.
 */
export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < source.length) {
    const char = source[i];

    // The normalizer strips whitespace, but stay tolerant anyway.
    if (/\s/.test(char)) {
      i += 1;
      continue;
    }

    const numberMatch = NUMBER_PATTERN.exec(source.slice(i));
    if (numberMatch) {
      const text = numberMatch[0];
      tokens.push({ kind: 'number', text, value: Number(text), start: i, end: i + text.length });
      i += text.length;
      continue;
    }

    if (isIdentifierStart(char)) {
      let j = i + 1;
      while (j < source.length && isIdentifierPart(source[j])) j += 1;
      tokens.push({ kind: 'identifier', text: source.slice(i, j), start: i, end: j });
      i = j;
      continue;
    }

    const single: Record<string, TokenKind> = {
      '+': 'plus',
      '-': 'minus',
      '*': 'star',
      '/': 'slash',
      '^': 'caret',
      '(': 'lparen',
      ')': 'rparen',
      ',': 'comma',
    };
    const kind = single[char];
    if (kind) {
      tokens.push({ kind, text: char, start: i, end: i + 1 });
      i += 1;
      continue;
    }

    throw new ParseError(`Unexpected character '${char}'`, i);
  }

  tokens.push({ kind: 'eof', text: '', start: source.length, end: source.length });
  return tokens;
}
