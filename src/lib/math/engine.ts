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
 * Phase 4 implements the analysis methods numerically (see analysis.ts):
 * findRoots, derivative, integral, and intersection all work. The
 * derivative is numerical — the returned ParsedExpression wraps a
 * central-difference closure (its AST is the original expression's, kept
 * for inspection; evaluation goes through the numerical derivative).
 */

import { collectVariables } from './ast.js';
import type { AstNode } from './ast.js';
import type { CompiledFunction } from './compiler.js';
import { compileScopedAst } from './compiler.js';
import { compileAst } from './compiler.js';
import { normalizeExpressionSource } from './normalize.js';
import { parse } from './parser.js';
import { ParseError, tokenize } from './tokenizer.js';
import { adaptiveSimpson, centralDerivative, findAllRoots, findIntersections } from './analysis.js';
import type { VariableEnvironment } from './variables.js';
import type {
  EngineNumber,
  MathEngine,
  NumericRange,
  ParsedExpression,
  ValidationResult,
} from './MathEngine.js';
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

/**
 * Options for compiling an expression against a variable environment.
 */
export interface ScopedCompileOptions {
  /** Bound parameter name ('x' for cartesian, 't' for parametric, 'theta' for polar). */
  parameter: string;
  /** Environment whose live values map the compiled closure reads. */
  env: VariableEnvironment;
}

/**
 * Separate LRU for environment-scoped compilations. The cache key carries
 * the environment's identity because the closure captures that
 * environment's persistent values map by reference: two environments
 * compiling the same source must not share a closure. Slider drags do not
 * invalidate entries — the closure reads the map live, so fresh values
 * flow through with zero recompilation.
 */
const scopedCache = new Map<string, CompiledExpression>();
const SCOPED_CACHE_LIMIT = 500;

function evictScoped(): void {
  while (scopedCache.size > SCOPED_CACHE_LIMIT) {
    const oldest = scopedCache.keys().next();
    if (oldest.done) break;
    scopedCache.delete(oldest.value);
  }
}

/**
 * Compile source with a bound parameter and variable bindings from `env`.
 * The returned closure reads `env.values` live: call `env.resolve()`
 * before evaluating/sampling, and later value changes need no
 * recompilation. Throws ParseError on invalid input.
 */
export function compileExpressionScoped(
  source: string,
  options: ScopedCompileOptions
): CompiledExpression {
  const normalized = normalizeExpressionSource(source);
  const key = `${options.env.envId}\n${options.parameter}\n${normalized}`;
  const hit = scopedCache.get(key);
  if (hit) {
    scopedCache.delete(key);
    scopedCache.set(key, hit);
    return hit;
  }
  const ast = parse(tokenize(normalized));
  const values = options.env.values;
  const compiled: CompiledExpression = {
    source: normalized,
    normalized,
    variables: [...collectVariables(ast)],
    ast,
    fn: compileScopedAst(ast, {
      parameter: options.parameter,
      resolveVariable: (name: string) => {
        const value = values.get(name.toLowerCase());
        return typeof value === 'number' ? value : NaN;
      },
    }),
  };
  scopedCache.set(key, compiled);
  evictScoped();
  return compiled;
}

/** Drop every cached scoped compilation (tests, memory hygiene). */
export function clearScopedExpressionCache(): void {
  scopedCache.clear();
}

/** Current number of cached scoped compilations. */
export function getScopedExpressionCacheSize(): number {
  return scopedCache.size;
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

/** Phase 4 engine: analysis methods are implemented numerically. */
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

  /**
   * Numerical roots of the expression in `range` (Brent-refined brackets).
   * Returns an empty array when none are found — never throws for math
   * reasons (invalid source still throws ParseError).
   */
  findRoots(source: string, _variable: string, range: NumericRange): number[] {
    const compiled = compileExpression(source);
    return findAllRoots(compiled.fn, range.min, range.max);
  }

  /**
   * Numerical derivative: returns a CompiledExpression whose `fn` is the
   * central-difference derivative of the source. The AST is the original
   * expression's (kept for inspection); `source` is marked as a derivative.
   */
  derivative(source: string, _variable: string): ParsedExpression {
    const compiled = compileExpression(source);
    const fn: CompiledFunction = (x: number) => centralDerivative(compiled.fn, x);
    const numerical: CompiledExpression = {
      source: `derivative(${compiled.normalized})`,
      normalized: `derivative(${compiled.normalized})`,
      variables: [...compiled.variables],
      ast: compiled.ast,
      fn,
    };
    return numerical;
  }

  /**
   * Definite integral over `bounds` via adaptive Simpson's rule. Returns
   * NaN when the quadrature does not converge (e.g. non-integrable
   * singularities) — the caller reports that honestly.
   */
  integral(source: string, _variable: string, bounds: NumericRange): EngineNumber {
    const compiled = compileExpression(source);
    const { value } = adaptiveSimpson(compiled.fn, bounds.min, bounds.max);
    return value;
  }

  /** Intersections of two expressions in `range`, as (x, y) points. */
  intersection(a: string, b: string, _variable: string, range: NumericRange): Point[] {
    const fa = compileExpression(a).fn;
    const fb = compileExpression(b).fn;
    return findIntersections(fa, fb, range.min, range.max);
  }
}
