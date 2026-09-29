/**
 * Phase 3 recursive-descent parser: tokens → AST.
 *
 * Grammar (highest to lowest precedence):
 *   expression := additive
 *   additive   := multiplicative (('+' | '-') multiplicative)*
 *   multiplicative := power (('*' | '/' | <implicit>) power)*
 *   power      := unary ('^' power)?            // right-associative
 *   unary      := ('-' | '+') power | primary   // -3^2 reads as -(3^2)
 *   primary    := number | variable | constant
 *               | function '(' args ')' | function arg
 *               | '(' expression ')'
 *
 * Implicit multiplication (2x, 3(x+1), x(x+1), 2sin x) binds exactly like
 * explicit multiplication. A function name followed by a power (no
 * parentheses) applies to that power, so "sin x^2" is sin(x^2).
 * All errors are ParseError with a position in the normalized source.
 */

import type { AstNode, BinaryOperator, SourceSpan } from './ast.js';
import { getFunctionSpec, isConstantName, isFunctionName } from './functions.js';
import { VARIABLE_NAME } from './functions.js';
import { ParseError } from './tokenizer.js';
import type { Token, TokenKind } from './tokenizer.js';

function spanOf(start: number, end: number): SourceSpan {
  return { start, end };
}

/** True when a token can begin a primary (used for implicit multiplication). */
function startsPrimary(kind: TokenKind): boolean {
  return kind === 'number' || kind === 'identifier' || kind === 'lparen';
}

class Parser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): AstNode {
    if (this.peek().kind === 'eof') {
      throw new ParseError('Enter an expression', 0);
    }
    const node = this.parseAdditive();
    const next = this.peek();
    if (next.kind !== 'eof') {
      throw new ParseError(`Unexpected '${next.text}'`, next.start);
    }
    return node;
  }

  private peek(): Token {
    return this.tokens[this.pos];
  }

  private consume(kind: TokenKind, what: string): Token {
    const token = this.peek();
    if (token.kind !== kind) {
      throw new ParseError(`Expected ${what} but found '${token.text}'`, token.start);
    }
    this.pos += 1;
    return token;
  }

  private parseAdditive(): AstNode {
    let left = this.parseMultiplicative();
    for (;;) {
      const token = this.peek();
      if (token.kind !== 'plus' && token.kind !== 'minus') return left;
      this.pos += 1;
      const right = this.parseMultiplicative();
      const operator: BinaryOperator = token.kind === 'plus' ? '+' : '-';
      left = {
        kind: 'binary',
        operator,
        left,
        right,
        span: spanOf(left.span.start, right.span.end),
      };
    }
  }

  private parseMultiplicative(): AstNode {
    let left = this.parsePower();
    for (;;) {
      const token = this.peek();
      let operator: BinaryOperator | null = null;
      if (token.kind === 'star' || token.kind === 'slash') {
        operator = token.kind === 'star' ? '*' : '/';
        this.pos += 1;
      } else if (startsPrimary(token.kind)) {
        // Implicit multiplication: 2x, 3(x+1), x(x+1), 2sin x.
        operator = '*';
      } else {
        return left;
      }
      const right = this.parsePower();
      left = {
        kind: 'binary',
        operator,
        left,
        right,
        span: spanOf(left.span.start, right.span.end),
      };
    }
  }

  private parsePower(): AstNode {
    const base = this.parseUnary();
    const token = this.peek();
    if (token.kind !== 'caret') return base;
    this.pos += 1;
    const exponent = this.parsePower();
    return {
      kind: 'binary',
      operator: '^',
      left: base,
      right: exponent,
      span: spanOf(base.span.start, exponent.span.end),
    };
  }

  private parseUnary(): AstNode {
    const token = this.peek();
    if (token.kind === 'minus') {
      this.pos += 1;
      // The operand is a power so that -3^2 reads as -(3^2).
      const operand = this.parsePower();
      return { kind: 'unary', operator: '-', operand, span: spanOf(token.start, operand.span.end) };
    }
    if (token.kind === 'plus') {
      this.pos += 1;
      return this.parsePower();
    }
    return this.parsePrimary();
  }

  private parsePrimary(): AstNode {
    const token = this.peek();

    if (token.kind === 'number') {
      this.pos += 1;
      return { kind: 'number', value: token.value ?? NaN, span: spanOf(token.start, token.end) };
    }

    if (token.kind === 'lparen') {
      this.pos += 1;
      const inner = this.parseAdditive();
      const closing = this.peek();
      if (closing.kind !== 'rparen') {
        throw new ParseError(`Expected ')' but found '${closing.text}'`, closing.start);
      }
      this.pos += 1;
      return { ...inner, span: spanOf(token.start, closing.end) };
    }

    if (token.kind === 'identifier') {
      return this.parseIdentifier(token);
    }

    throw new ParseError(
      token.kind === 'eof' ? 'Unexpected end of expression' : `Unexpected '${token.text}'`,
      token.start
    );
  }

  private parseIdentifier(token: Token): AstNode {
    const name = token.text;
    this.pos += 1;

    if (isFunctionName(name)) {
      return this.parseCall(token, name);
    }
    if (name.toLowerCase() === VARIABLE_NAME) {
      return { kind: 'variable', name: VARIABLE_NAME, span: spanOf(token.start, token.end) };
    }
    if (isConstantName(name)) {
      return { kind: 'constant', name: name.toLowerCase(), span: spanOf(token.start, token.end) };
    }
    throw new ParseError(`Unknown identifier '${name}'`, token.start);
  }

  private parseCall(nameToken: Token, name: string): AstNode {
    const spec = getFunctionSpec(name);
    const canonical = name.toLowerCase();
    const args: AstNode[] = [];
    let end = nameToken.end;
    let parenthesized = false;

    if (this.peek().kind === 'lparen') {
      parenthesized = true;
      this.pos += 1;
      for (;;) {
        if (this.peek().kind === 'rparen') {
          throw new ParseError(`'${canonical}' needs an argument`, this.peek().start);
        }
        args.push(this.parseAdditive());
        const next = this.peek();
        if (next.kind === 'comma') {
          this.pos += 1;
          continue;
        }
        if (next.kind === 'rparen') {
          this.pos += 1;
          end = next.end;
          break;
        }
        throw new ParseError(`Expected ',' or ')' but found '${next.text}'`, next.start);
      }
    } else {
      // Bare application: sin x, sqrt 2, log 10. The argument is a power
      // so "sin x^2" reads as sin(x^2).
      const next = this.peek();
      if (!startsPrimary(next.kind)) {
        throw new ParseError(`'${canonical}' needs an argument`, next.start);
      }
      args.push(this.parsePower());
    }

    // Bare form ("sin x"): extend the span to the end of the argument.
    if (!parenthesized && args.length > 0) {
      end = args[args.length - 1].span.end;
    }
    if (spec && !spec.arity.includes(args.length)) {
      throw new ParseError(
        `'${canonical}' expects ${spec.arity.join(' or ')} argument(s) but got ${args.length}`,
        nameToken.start
      );
    }
    return { kind: 'call', name: canonical, args, span: spanOf(nameToken.start, end) };
  }
}

/** Parse a token stream into an AST. Throws ParseError on invalid input. */
export function parse(tokens: Token[]): AstNode {
  return new Parser(tokens).parse();
}
