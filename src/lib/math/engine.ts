/**
 * Phase 3 math engine: the real implementation behind the MathEngine
 * abstraction from Phase 1. Pipeline: normalize → tokenize → parse →
 * compile, with compiled functions cached by normalized source.
 *
 * The cache is a small LRU keyed by normalized source, so re-renders and
 * re-validations of unchanged expressions are O(1). Changing the source
 * changes the key, which is the invalidation mechanism — plus an explicit
 * clear for tests and memory hygiene.
 *
 * Still out of scope (Phase 4): findRoots, derivative, integral,
 * intersection — those keep throwing MathEngineError.
 */

import { collectVariables } from './ast.js';
import type { AstNode } from './ast.js';
import type { CompiledFunction } from './compiler.js';
import { compileAst } from './compiler.js';
import { normalizeExpressionSource } from './normalize.js';
import { parse } from './parser.js';
import { ParseError, tokenize } from './tokenizer.js';
import type {
  EngineNumber,
  MathEngine,
  NumericRange,
  ParsedExpression,
  ValidationResult,
} from './MathEngine.js';
import { MathEngineError } from './MathEngine.js';
import type { Point } from '../../types/calculator.js';

/** A parsed + compiled expression: satisfies the Phase 1 ParsedExpression. */
export interface CompiledExpression extends ParsedExpression {
  /** Normalized source — the cache key. */
  normalized: string;
  /** The parsed AST (useful for future phases). */
  ast: AstNode;
  /** The pure compiled function. */
  fn: CompiledFunction;
}

/** Upper bound on cached compilations (LRU eviction past this). */
export const EXPRESSION_CACHE_LIMIT = 500;

const cache = new Map<string, CompiledExpression>();

function buildCompiled(normalized: string): CompiledExpression {
  const ast = parse(tokenize(normalized));
  return {
    source: normalized,
    normalized,
    variables: [...collectVariables(ast)],
    ast,
    fn: compileAst(ast),
  };
}

/**
 * Compile source to a reusable CompiledExpression, using the cache when
 * the normalized source was seen before. Throws ParseError on invalid
 * input (including empty input).
 */
export function compileExpression(source: string): CompiledExpression {
  const normalized = normalizeExpressionSource(source);
  const hit = cache.get(normalized);
  if (hit) {
    // Refresh LRU order.
    cache.delete(normalized);
    cache.set(normalized, hit);
    return hit;
  }
  const compiled = buildCompiled(normalized);
  cache.set(normalized, compiled);
  while (cache.size > EXPRESSION_CACHE_LIMIT) {
    const oldest = cache.keys().next();
    if (oldest.done) break;
    cache.delete(oldest.value);
  }
  return compiled;
}

/** Drop every cached compilation (tests, memory hygiene). */
export function clearExpressionCache(): void {
  cache.clear();
}

/** Current number of cached compilations. */
export function getExpressionCacheSize(): number {
  return cache.size;
}

function isCompiledExpression(value: ParsedExpression): value is CompiledExpression {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as CompiledExpression).fn === 'function'
  );
}

/**
 * Validate source without throwing: ParseError becomes a single error
 * issue carrying the normalized-source position.
 */
export function validateExpressionSource(source: string): ValidationResult {
  try {
    compileExpression(source);
    return { valid: true, issues: [] };
  } catch (error) {
    if (error instanceof ParseError) {
      return {
        valid: false,
        issues: [
          {
            message: error.message,
            severity: 'error',
            start: error.position,
            end: error.position + 1,
          },
        ],
      };
    }
    throw error;
  }
}

const PHASE4_MESSAGE =
  'Not implemented in Phase 3 — mathematical analysis (roots, derivatives, integrals, intersections) arrives in Phase 4.';

/** Real Phase 3 engine: parse/validate/evaluate work; analysis throws. */
export class ExpressionMathEngine implements MathEngine {
  parseExpression(source: string): ParsedExpression {
    return compileExpression(source);
  }

  validate(source: string): ValidationResult {
    return validateExpressionSource(source);
  }

  evaluate(node: ParsedExpression, scope: Record<string, number>): EngineNumber {
    const compiled = isCompiledExpression(node) ? node : compileExpression(node.source);
    const x = scope['x'];
    return compiled.fn(typeof x === 'number' ? x : NaN);
  }

  findRoots(_source: string, _variable: string, _range: NumericRange): number[] {
    throw new MathEngineError(PHASE4_MESSAGE, 'NOT_IMPLEMENTED');
  }

  derivative(_source: string, _variable: string): ParsedExpression {
    throw new MathEngineError(PHASE4_MESSAGE, 'NOT_IMPLEMENTED');
  }

  integral(_source: string, _variable: string, _bounds: NumericRange): EngineNumber {
    throw new MathEngineError(PHASE4_MESSAGE, 'NOT_IMPLEMENTED');
  }

  intersection(_a: string, _b: string, _variable: string, _range: NumericRange): Point[] {
    throw new MathEngineError(PHASE4_MESSAGE, 'NOT_IMPLEMENTED');
  }
}
