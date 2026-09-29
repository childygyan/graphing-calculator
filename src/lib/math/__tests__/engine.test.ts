import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearExpressionCache,
  compileExpression,
  getExpressionCacheSize,
  validateExpressionSource,
  EXPRESSION_CACHE_LIMIT,
  ExpressionMathEngine,
} from '../engine.js';
import { createMathEngine } from '../MathEngine.js';
import { ParseError } from '../tokenizer.js';

beforeEach(() => {
  clearExpressionCache();
});

describe('compileExpression cache', () => {
  it('returns the same instance for the same normalized source', () => {
    const a = compileExpression('x^2');
    const b = compileExpression('x^2');
    expect(a).toBe(b);
    expect(getExpressionCacheSize()).toBe(1);
  });

  it('shares cache entries across whitespace variants', () => {
    const a = compileExpression('x   + 1');
    const b = compileExpression('x + 1');
    expect(a).toBe(b);
  });

  it('invalidates on source change (different key, different instance)', () => {
    const a = compileExpression('x^2');
    const b = compileExpression('x^3');
    expect(a).not.toBe(b);
    expect(a.fn(2)).toBe(4);
    expect(b.fn(2)).toBe(8);
  });

  it('reports detected variables', () => {
    expect(compileExpression('x^2+1').variables).toEqual(['x']);
    expect(compileExpression('2+3').variables).toEqual([]);
  });

  it('evicts oldest entries past the limit', () => {
    for (let i = 0; i < EXPRESSION_CACHE_LIMIT + 10; i += 1) {
      compileExpression(`x+${i}`);
    }
    expect(getExpressionCacheSize()).toBe(EXPRESSION_CACHE_LIMIT);
    // The first entries were evicted: recompiling creates a new instance.
    const fresh = compileExpression('x+0');
    expect(getExpressionCacheSize()).toBe(EXPRESSION_CACHE_LIMIT);
    expect(fresh.fn(1)).toBe(1);
  });

  it('clearExpressionCache empties the cache', () => {
    compileExpression('x');
    expect(getExpressionCacheSize()).toBe(1);
    clearExpressionCache();
    expect(getExpressionCacheSize()).toBe(0);
  });

  it('throws ParseError for invalid input and caches nothing', () => {
    expect(() => compileExpression('2+')).toThrow(ParseError);
    expect(getExpressionCacheSize()).toBe(0);
  });
});

describe('validateExpressionSource', () => {
  it('accepts valid expressions', () => {
    expect(validateExpressionSource('sin(x)^2+1')).toEqual({ valid: true, issues: [] });
  });

  it('accepts free identifiers (variables are resolved by the environment)', () => {
    expect(validateExpressionSource('2+z')).toEqual({ valid: true, issues: [] });
  });

  it('returns a positioned error issue for invalid input', () => {
    const result = validateExpressionSource('2+');
    expect(result.valid).toBe(false);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].severity).toBe('error');
  });
});

describe('ExpressionMathEngine', () => {
  it('createMathEngine returns a working engine', () => {
    const engine = createMathEngine();
    expect(engine).toBeInstanceOf(ExpressionMathEngine);
    const node = engine.parseExpression('x*2');
    expect(engine.evaluate(node, { x: 21 })).toBe(42);
  });

  it('evaluate uses the scope variable', () => {
    const engine = createMathEngine();
    const node = engine.parseExpression('x^2');
    expect(engine.evaluate(node, { x: 5 })).toBe(25);
    expect(engine.evaluate(node, {})).toBeNaN();
  });

  it('analysis methods are implemented numerically (Phase 4)', () => {
    const engine = createMathEngine();
    // No NOT_IMPLEMENTED throws anymore; spot-check each method works.
    expect(engine.findRoots('x^2-4', 'x', { min: -10, max: 10 })).toHaveLength(2);
    const d = engine.derivative('x^2', 'x');
    expect(engine.evaluate(d, { x: 3 })).toBeCloseTo(6, 6);
    expect(engine.integral('x^2', 'x', { min: 0, max: 1 })).toBeCloseTo(1 / 3, 9);
    expect(engine.intersection('x^2', 'x', 'x', { min: -2, max: 2 })).toHaveLength(2);
  });
});
