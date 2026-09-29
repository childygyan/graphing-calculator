import { describe, expect, it } from 'vitest';
import {
  CARTESIAN_PARAMETER,
  createVariableDefinition,
  definedVariableNames,
  findFreeVariables,
  findUndefinedVariables,
  normalizeVariableName,
  suggestVariableName,
  validateExpressionWithVariables,
  validateVariableName,
  VariableEnvironment,
} from '../variables.js';
import {
  clearScopedExpressionCache,
  compileExpressionScoped,
  getScopedExpressionCacheSize,
} from '../engine.js';
import type { VariableDefinition } from '../../../types/calculator.js';

function def(
  name: string,
  expression: string,
  overrides: Partial<VariableDefinition> = {}
): VariableDefinition {
  return { name, expression, min: -10, max: 10, step: 0.1, ...overrides };
}

function resolveEnv(defs: VariableDefinition[]): VariableEnvironment {
  const env = new VariableEnvironment(defs);
  env.resolve();
  return env;
}

describe('validateVariableName', () => {
  it('accepts plain names', () => {
    expect(validateVariableName('a')).toBeNull();
    expect(validateVariableName('k2')).toBeNull();
    expect(validateVariableName('alpha_beta')).toBeNull();
  });

  it('rejects empty and malformed names', () => {
    expect(validateVariableName('')).not.toBeNull();
    expect(validateVariableName('   ')).not.toBeNull();
    expect(validateVariableName('2a')).not.toBeNull();
    expect(validateVariableName('a-b')).not.toBeNull();
  });

  it('rejects reserved parameter names', () => {
    expect(validateVariableName('x')).not.toBeNull();
    expect(validateVariableName('t')).not.toBeNull();
    expect(validateVariableName('theta')).not.toBeNull();
    expect(validateVariableName('X')).not.toBeNull();
  });

  it('rejects function and constant names', () => {
    expect(validateVariableName('sin')).not.toBeNull();
    expect(validateVariableName('pi')).not.toBeNull();
    expect(validateVariableName('e')).not.toBeNull();
  });
});

describe('variable name helpers', () => {
  it('normalizes names to lowercase', () => {
    expect(normalizeVariableName('AbC')).toBe('abc');
  });

  it('suggests unused single letters, skipping reserved ones', () => {
    expect(suggestVariableName(new Set())).toBe('a');
    expect(suggestVariableName(new Set(['a', 'b']))).toBe('c');
    // x and t are reserved parameters and are never suggested.
    const taken = new Set('abcdefghijklmnoopqrsuvwxyz'.split(''));
    expect(suggestVariableName(taken)).toBe('v1');
  });

  it('createVariableDefinition fills sane slider defaults', () => {
    const created = createVariableDefinition('A');
    expect(created.name).toBe('a');
    expect(created.expression).toBe('1');
    expect(created.min).toBe(-10);
    expect(created.max).toBe(10);
    expect(created.step).toBe(0.1);
  });

  it('definedVariableNames lowercases', () => {
    expect(definedVariableNames([def('A', '1'), def('b', '2')])).toEqual(new Set(['a', 'b']));
  });
});

describe('findFreeVariables', () => {
  it('finds non-parameter identifiers', () => {
    expect(findFreeVariables('a*sin(b*x)', CARTESIAN_PARAMETER)).toEqual(['a', 'b']);
  });

  it('excludes the bound parameter', () => {
    expect(findFreeVariables('x^2+1', CARTESIAN_PARAMETER)).toEqual([]);
    expect(findFreeVariables('cos(t)+k', 't')).toEqual(['k']);
    expect(findFreeVariables('2*theta', 'theta')).toEqual([]);
  });

  it('is case-insensitive and sorted', () => {
    expect(findFreeVariables('B+A*x', CARTESIAN_PARAMETER)).toEqual(['a', 'b']);
  });

  it('ignores functions and constants', () => {
    expect(findFreeVariables('sin(x)+pi', CARTESIAN_PARAMETER)).toEqual([]);
  });

  it('findUndefinedVariables subtracts defined names', () => {
    expect(findUndefinedVariables('a+b*x', 'x', new Set(['a']))).toEqual(['b']);
    expect(findUndefinedVariables('a*x', 'x', new Set(['A']))).toEqual([]);
  });
});

describe('validateExpressionWithVariables', () => {
  it('returns null for clean input', () => {
    expect(validateExpressionWithVariables('a*x', 'x', new Set(['a']))).toBeNull();
    expect(validateExpressionWithVariables('x^2', 'x', new Set())).toBeNull();
    expect(validateExpressionWithVariables('', 'x', new Set())).toBeNull();
  });

  it('reports syntax errors first', () => {
    const message = validateExpressionWithVariables('2+', 'x', new Set());
    expect(message).not.toBeNull();
    expect(message).not.toContain('Undefined variable');
  });

  it('reports undefined variables honestly', () => {
    const message = validateExpressionWithVariables('a*sin(b*x)', 'x', new Set(['a']));
    expect(message).toContain("Undefined variable 'b'");
  });
});

describe('VariableEnvironment.resolve', () => {
  it('resolves literal values', () => {
    const env = resolveEnv([def('a', '2'), def('b', '3.5')]);
    expect(env.get('a')).toBe(2);
    expect(env.get('b')).toBe(3.5);
  });

  it('resolves references in topological order regardless of input order', () => {
    const env = resolveEnv([def('a', 'b+1'), def('b', '2'), def('c', 'a*b')]);
    expect(env.get('b')).toBe(2);
    expect(env.get('a')).toBe(3);
    expect(env.get('c')).toBe(6);
  });

  it('evaluates constant expressions', () => {
    const env = resolveEnv([def('k', '2*pi')]);
    expect(env.get('k')).toBeCloseTo(2 * Math.PI, 12);
  });

  it('detects a two-variable cycle and reports the path', () => {
    const env = new VariableEnvironment([def('a', 'b+1'), def('b', 'a+1')]);
    const { issues, cycles } = env.resolve();
    expect(cycles).toHaveLength(1);
    expect(cycles[0].join('')).toContain('a');
    expect(cycles[0].join('')).toContain('b');
    expect(issues.some((i) => i.message.includes('Circular reference'))).toBe(true);
    expect(env.get('a')).toBeNaN();
    expect(env.get('b')).toBeNaN();
  });

  it('detects self-reference as a cycle', () => {
    const env = new VariableEnvironment([def('a', 'a+1')]);
    const { cycles, issues } = env.resolve();
    expect(cycles.length).toBeGreaterThanOrEqual(1);
    expect(issues.some((i) => i.message.includes('Circular reference'))).toBe(true);
    expect(env.get('a')).toBeNaN();
  });

  it('keeps acyclic variables working when others cycle', () => {
    const env = new VariableEnvironment([def('ok', '5'), def('a', 'b+1'), def('b', 'a+1')]);
    env.resolve();
    expect(env.get('ok')).toBe(5);
    expect(env.get('a')).toBeNaN();
  });

  it('reports unknown names in definitions', () => {
    const env = new VariableEnvironment([def('a', 'z+1')]);
    const { issues } = env.resolve();
    expect(issues.some((i) => i.message.includes("Unknown variable 'z'"))).toBe(true);
    expect(env.get('a')).toBeNaN();
  });

  it('rejects reserved parameters inside definitions', () => {
    const env = new VariableEnvironment([def('a', 'x+1'), def('b', '2*theta')]);
    const { issues } = env.resolve();
    expect(issues.some((i) => i.variable === 'a' && i.message.includes("'x'"))).toBe(true);
    expect(issues.some((i) => i.variable === 'b' && i.message.includes("'theta'"))).toBe(true);
  });

  it('reports parse errors in definitions', () => {
    const env = new VariableEnvironment([def('a', '2+')]);
    const { issues } = env.resolve();
    expect(issues.length).toBeGreaterThanOrEqual(1);
    expect(env.get('a')).toBeNaN();
  });

  it('reports duplicate names case-insensitively, keeping the first', () => {
    const env = new VariableEnvironment([def('a', '1'), def('A', '2')]);
    const { issues } = env.resolve();
    expect(issues.some((i) => i.message.includes('Duplicate variable'))).toBe(true);
    expect(env.get('a')).toBe(1);
  });

  it('returns NaN for names that were never defined', () => {
    const env = resolveEnv([]);
    expect(env.get('nope')).toBeNaN();
  });

  it('get() is case-insensitive', () => {
    const env = resolveEnv([def('alpha', '7')]);
    expect(env.get('ALPHA')).toBe(7);
  });

  it('mutates the same live values map across resolves', () => {
    const env = new VariableEnvironment([def('a', '1')]);
    const first = env.resolve().values;
    env.setDefinitions([def('a', '2')]);
    const second = env.resolve().values;
    expect(first).toBe(second);
    expect(second.get('a')).toBe(2);
  });

  it('never throws on hostile definitions', () => {
    const env = new VariableEnvironment([def('a', '1/0'), def('', ''), def('b', 'sqrt(-1)')]);
    expect(() => env.resolve()).not.toThrow();
    expect(env.get('a')).toBeNaN();
  });
});

describe('compileExpressionScoped', () => {
  it('binds the named parameter', () => {
    clearScopedExpressionCache();
    const env = resolveEnv([]);
    const fn = compileExpressionScoped('t^2', { parameter: 't', env }).fn;
    expect(fn(3)).toBe(9);
  });

  it('substitutes variable bindings into closures', () => {
    clearScopedExpressionCache();
    const env = resolveEnv([def('a', '2'), def('b', '3')]);
    const fn = compileExpressionScoped('a*x+b', { parameter: 'x', env }).fn;
    expect(fn(4)).toBe(11);
  });

  it('reads the live values map without recompilation', () => {
    clearScopedExpressionCache();
    const env = new VariableEnvironment([def('a', '2')]);
    env.resolve();
    const compiled = compileExpressionScoped('a*x', { parameter: 'x', env });
    expect(compiled.fn(3)).toBe(6);
    env.setDefinitions([def('a', '5')]);
    env.resolve();
    // Same compiled closure, fresh value — no recompilation needed.
    expect(compiled.fn(3)).toBe(15);
  });

  it('evaluates unbound names to NaN (honest gaps, never throws)', () => {
    clearScopedExpressionCache();
    const env = resolveEnv([]);
    expect(compileExpressionScoped('z*x', { parameter: 'x', env }).fn(2)).toBeNaN();
  });

  it('matches names case-insensitively', () => {
    clearScopedExpressionCache();
    const env = resolveEnv([def('a', '2')]);
    expect(compileExpressionScoped('A*x', { parameter: 'x', env }).fn(3)).toBe(6);
  });

  it('supports polar parameter theta (unicode normalized)', () => {
    clearScopedExpressionCache();
    const env = resolveEnv([]);
    const fn = compileExpressionScoped('2*sin(3*θ)', { parameter: 'theta', env }).fn;
    expect(fn(Math.PI / 6)).toBeCloseTo(2, 12);
  });

  it('caches by environment identity, not just source', () => {
    clearScopedExpressionCache();
    const envA = resolveEnv([def('a', '1')]);
    const envB = resolveEnv([def('a', '100')]);
    const compiledA = compileExpressionScoped('a', { parameter: 'x', env: envA });
    const compiledB = compileExpressionScoped('a', { parameter: 'x', env: envB });
    expect(compiledA).not.toBe(compiledB);
    expect(compiledA.fn(0)).toBe(1);
    expect(compiledB.fn(0)).toBe(100);
    expect(getScopedExpressionCacheSize()).toBe(2);
  });

  it('throws ParseError on invalid source', () => {
    clearScopedExpressionCache();
    const env = resolveEnv([]);
    expect(() => compileExpressionScoped('2+', { parameter: 'x', env })).toThrow();
  });
});
