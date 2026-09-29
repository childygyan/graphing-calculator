import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearExpressionCache,
  compileExpression,
  getExpressionCacheSize,
  validateExpressionSource,
  EXPRESSION_CACHE_LIMIT,
  ExpressionMathEngine,
} from '../engine.js';
import { createMathEngine, MathEngineError } from '../MathEngine.js';
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

  it('returns a positioned error issue for invalid input', () => {
    const result = validateExpressionSource('2+z');
    expect(result.valid).toBe(false);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].severity).toBe('error');
    expect(result.issues[0].message).toContain("Unknown identifier 'z'");
    expect(result.issues[0].start).toBe(2);
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

  it('analysis methods throw honest NOT_IMPLEMENTED errors', () => {
    const engine = createMathEngine();
    expect(() => engine.findRoots('x', 'x', { min: 0, max: 1 })).toThrow(MathEngineError);
    expect(() => engine.derivative('x', 'x')).toThrow(MathEngineError);
    expect(() => engine.integral('x', 'x', { min: 0, max: 1 })).toThrow(MathEngineError);
    expect(() => engine.intersection('x', 'x', 'x', { min: 0, max: 1 })).toThrow(MathEngineError);
  });
});
