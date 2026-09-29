/**
 * Phase 5 variable system: named numeric variables (sliders) that
 * expressions can reference, e.g. `y = a*sin(b*x)`.
 *
 * - VariableDefinition (see types/calculator.ts): name, expression source,
 *   and slider range (min/max/step). The expression is usually a numeric
 *   literal, but may reference other variables (`a = b + 1`).
 * - VariableEnvironment: owns definitions and a persistent resolved-values
 *   map. resolve() rebuilds the dependency graph, reports cycles and
 *   unknown names honestly, topologically orders evaluation, and mutates
 *   the live values map in place. Compiled expression closures capture that
 *   map by reference, so slider drags never need recompilation — the next
 *   evaluation simply reads the fresh values.
 * - Free-variable detection: scan an expression's AST for identifiers that
 *   are not the bound parameter and not defined variables, so the editor
 *   can offer "define variable" quick-adds and honest "undefined variable"
 *   errors.
 *
 * Identifier matching is case-insensitive everywhere (the parser already
 * treats function/constant names that way); names are stored lowercase.
 * `x`, `t`, and `theta` are reserved parameter names and can never be
 * variable names or appear in variable definitions.
 */

import type { AstNode } from './ast.js';
import { collectVariables } from './ast.js';
import { compileScopedAst } from './compiler.js';
import type { CompiledFunction } from './compiler.js';
import { normalizeExpressionSource } from './normalize.js';
import { parse } from './parser.js';
import { ParseError, tokenize } from './tokenizer.js';
import { isConstantName, isFunctionName } from './functions.js';
import type { VariableDefinition } from '../../types/calculator.js';

/** Bound parameter per expression kind. */
export const CARTESIAN_PARAMETER = 'x';
export const PARAMETRIC_PARAMETER = 't';
export const POLAR_PARAMETER = 'theta';

/** Names that can never be variables: the bound parameters. */
export const RESERVED_VARIABLE_NAMES: ReadonlySet<string> = new Set([
  CARTESIAN_PARAMETER,
  PARAMETRIC_PARAMETER,
  POLAR_PARAMETER,
]);

/** Raw identifier characters the tokenizer accepts. */
const VARIABLE_NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

/** Normalize a candidate name for case-insensitive matching. */
export function normalizeVariableName(name: string): string {
  return name.toLowerCase();
}

/**
 * Validate a variable name. Returns an error message, or null when the
 * name is usable.
 */
export function validateVariableName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length === 0) return 'Enter a variable name.';
  if (!VARIABLE_NAME_PATTERN.test(trimmed)) {
    return 'Use letters, digits, or underscore, starting with a letter.';
  }
  const normalized = normalizeVariableName(trimmed);
  if (RESERVED_VARIABLE_NAMES.has(normalized)) {
    return `'${trimmed}' is reserved (x, t, theta are graph parameters).`;
  }
  if (isFunctionName(normalized) || isConstantName(normalized)) {
    return `'${trimmed}' is already a function or constant name.`;
  }
  return null;
}

/** Parse source to an AST. Throws ParseError on invalid input. */
export function parseExpressionSource(source: string): AstNode {
  return parse(tokenize(normalizeExpressionSource(source)));
}

/**
 * Free identifiers in `source` that are not the bound parameter:
 * candidate variable references. Returns them sorted, lowercased, and
 * deduplicated. Throws ParseError on invalid syntax.
 */
export function findFreeVariables(source: string, parameterName: string): string[] {
  const ast = parseExpressionSource(source);
  const parameter = parameterName.toLowerCase();
  const free = new Set<string>();
  for (const name of collectVariables(ast)) {
    const normalized = name.toLowerCase();
    if (normalized !== parameter) free.add(normalized);
  }
  return [...free].sort();
}

/**
 * Subset of findFreeVariables that are not in `definedNames`
 * (case-insensitive). These are honest "undefined variable" errors in the
 * editor, and compile to NaN on the graph.
 */
export function findUndefinedVariables(
  source: string,
  parameterName: string,
  definedNames: ReadonlySet<string>
): string[] {
  const defined = new Set<string>();
  for (const name of definedNames) defined.add(name.toLowerCase());
  return findFreeVariables(source, parameterName).filter((name) => !defined.has(name));
}

/**
 * Validate an expression source against the variable environment:
 * syntax errors first, then undefined-variable errors. Returns the first
 * error message, or null when the source is usable.
 */
export function validateExpressionWithVariables(
  source: string,
  parameterName: string,
  definedNames: ReadonlySet<string>
): string | null {
  if (source.trim() === '') return null;
  let free: string[];
  try {
    free = findFreeVariables(source, parameterName);
  } catch (error) {
    if (error instanceof ParseError) return error.message;
    throw error;
  }
  const undefinedNames = findUndefinedVariables(source, parameterName, definedNames);
  if (undefinedNames.length > 0) {
    const quoted = undefinedNames.map((n) => `'${n}'`).join(', ');
    return `Undefined variable ${quoted} — define it in Variables or fix the name.`;
  }
  void free;
  return null;
}

/** Suggest an unused single-letter variable name (a, b, c, …). */
export function suggestVariableName(taken: ReadonlySet<string>): string {
  const used = new Set<string>();
  for (const name of taken) used.add(name.toLowerCase());
  for (let code = 97; code <= 122; code += 1) {
    const candidate = String.fromCharCode(code);
    if (!used.has(candidate) && !RESERVED_VARIABLE_NAMES.has(candidate)) return candidate;
  }
  let index = 1;
  while (used.has(`v${index}`)) index += 1;
  return `v${index}`;
}

/** Create a fresh variable definition with a sane slider range. */
export function createVariableDefinition(
  name: string,
  overrides?: Partial<VariableDefinition>
): VariableDefinition {
  return {
    name: normalizeVariableName(name.trim()),
    expression: '1',
    min: -10,
    max: 10,
    step: 0.1,
    ...overrides,
  };
}

/** One problem found while resolving the environment. */
export interface VariableIssue {
  /** The variable whose definition has the problem. */
  variable: string;
  message: string;
}

/** Result of VariableEnvironment.resolve(). */
export interface VariableResolution {
  /**
   * Live values map, mutated in place on every resolve(). Compiled
   * closures capture this exact object — never replace it, only mutate.
   */
  values: Map<string, number>;
  /** Problems found (parse errors, unknown names, cycles, …). */
  issues: VariableIssue[];
  /** Detected dependency cycles, each as an ordered name path. */
  cycles: string[][];
}

/** Monotonic id source so the scoped-compile cache can key on environment identity. */
let nextEnvironmentId = 1;

interface ParsedDefinition {
  name: string;
  ast: AstNode;
  /** Other *defined* variables this definition references. */
  dependencies: string[];
  /** Referenced names that are not defined variables (reported as issues). */
  unknown: string[];
  /** True when the definition is unusable (parse error, unknown name, …). */
  broken: boolean;
}

/**
 * Named-variable environment with dependency tracking and cycle
 * detection. Owns a persistent values map that compiled closures read
 * live: call setDefinitions() when the definition list changes, then
 * resolve() before sampling.
 */
export class VariableEnvironment {
  /** Stable identity for cache keys (never reused). */
  readonly envId: number;
  /** Live resolved values — mutated in place by resolve(). */
  readonly values: Map<string, number> = new Map();
  private definitions: VariableDefinition[] = [];

  constructor(definitions: VariableDefinition[] = []) {
    this.envId = nextEnvironmentId;
    nextEnvironmentId += 1;
    this.setDefinitions(definitions);
  }

  /** Replace the definition list (cheap — no compilation happens here). */
  setDefinitions(definitions: VariableDefinition[]): void {
    this.definitions = Array.isArray(definitions) ? [...definitions] : [];
  }

  /** Current value of a variable (NaN when undefined or errored). */
  get(name: string): number {
    const value = this.values.get(name.toLowerCase());
    return typeof value === 'number' ? value : NaN;
  }

  /**
   * Rebuild the dependency graph, detect cycles, evaluate in topological
   * order, and refresh the live values map in place. Never throws.
   */
  resolve(): VariableResolution {
    const issues: VariableIssue[] = [];
    const cycles: string[][] = [];
    const parsed = this.parseDefinitions(issues);
    const cycleMembers = this.detectCycles(parsed, cycles, issues);
    const order = this.topologicalOrder(parsed, cycleMembers);
    const fresh = this.evaluateInOrder(parsed, order, cycleMembers, issues);
    // Mutate the live map in place — compiled closures keep reading it.
    this.values.clear();
    for (const [name, value] of fresh) this.values.set(name, value);
    return { values: this.values, issues, cycles };
  }

  private parseDefinitions(issues: VariableIssue[]): Map<string, ParsedDefinition> {
    const parsed = new Map<string, ParsedDefinition>();
    const defined = new Set<string>();
    for (const def of this.definitions) {
      if (!def || typeof def.name !== 'string') continue;
      defined.add(normalizeVariableName(def.name));
    }
    const seen = new Set<string>();
    for (const def of this.definitions) {
      if (!def || typeof def.name !== 'string') continue;
      const name = normalizeVariableName(def.name);
      if (seen.has(name)) {
        issues.push({
          variable: name,
          message: `Duplicate variable '${name}' — keeping the first.`,
        });
        continue;
      }
      seen.add(name);
      const nameError = validateVariableName(def.name);
      if (nameError) {
        issues.push({ variable: name, message: nameError });
        parsed.set(name, {
          name,
          ast: null as unknown as AstNode,
          dependencies: [],
          unknown: [],
          broken: true,
        });
        continue;
      }
      let ast: AstNode;
      try {
        ast = parseExpressionSource(def.expression ?? '');
      } catch (error) {
        issues.push({
          variable: name,
          message: error instanceof ParseError ? error.message : 'Invalid expression.',
        });
        parsed.set(name, {
          name,
          ast: null as unknown as AstNode,
          dependencies: [],
          unknown: [],
          broken: true,
        });
        continue;
      }
      const entry: ParsedDefinition = { name, ast, dependencies: [], unknown: [], broken: false };
      for (const free of collectVariables(ast)) {
        const normalized = free.toLowerCase();
        if (RESERVED_VARIABLE_NAMES.has(normalized)) {
          issues.push({
            variable: name,
            message: `Variable '${name}' cannot use '${normalized}' — variables must be plain numbers or depend only on other variables.`,
          });
          entry.broken = true;
          continue;
        }
        if (defined.has(normalized)) {
          // Self-edges are kept on purpose: `a = a + 1` is a circular
          // reference and must be detected as one, not silently dropped.
          if (!entry.dependencies.includes(normalized)) {
            entry.dependencies.push(normalized);
          }
        } else {
          entry.unknown.push(normalized);
        }
      }
      if (entry.unknown.length > 0) {
        const quoted = entry.unknown.map((n) => `'${n}'`).join(', ');
        issues.push({
          variable: name,
          message: `Unknown variable ${quoted} in the definition of '${name}'.`,
        });
        entry.broken = true;
      }
      parsed.set(name, entry);
    }
    return parsed;
  }

  /**
   * Depth-first cycle detection. Returns the set of variables that are
   * part of (or depend on, transitively — no, just part of) a cycle;
   * each found cycle is pushed to `cycles` as an ordered path and
   * reported in `issues`.
   */
  private detectCycles(
    parsed: Map<string, ParsedDefinition>,
    cycles: string[][],
    issues: VariableIssue[]
  ): Set<string> {
    const members = new Set<string>();
    const color = new Map<string, 'gray' | 'black'>();
    const stack: string[] = [];

    const visit = (name: string): void => {
      color.set(name, 'gray');
      stack.push(name);
      const entry = parsed.get(name);
      if (entry && !entry.broken) {
        for (const dep of entry.dependencies) {
          if (!parsed.has(dep)) continue;
          const depColor = color.get(dep);
          if (depColor === 'gray') {
            // Found a cycle: dep … name → dep.
            const start = stack.indexOf(dep);
            const path = [...stack.slice(start), dep];
            cycles.push(path);
            for (const member of path) members.add(member);
            issues.push({
              variable: name,
              message: `Circular reference: ${path.join(' → ')}.`,
            });
          } else if (depColor !== 'black') {
            visit(dep);
          }
        }
      }
      stack.pop();
      color.set(name, 'black');
    };

    for (const name of parsed.keys()) {
      if (!color.has(name)) visit(name);
    }
    return members;
  }

  /** Kahn's algorithm over usable definitions (skips broken/cyclic). */
  private topologicalOrder(
    parsed: Map<string, ParsedDefinition>,
    cycleMembers: Set<string>
  ): string[] {
    const usable = new Set<string>();
    for (const [name, entry] of parsed) {
      if (!entry.broken && !cycleMembers.has(name)) usable.add(name);
    }
    const indegree = new Map<string, number>();
    for (const name of usable) indegree.set(name, 0);
    for (const name of usable) {
      const entry = parsed.get(name);
      if (!entry) continue;
      for (const dep of entry.dependencies) {
        if (usable.has(dep)) indegree.set(name, (indegree.get(name) ?? 0) + 1);
      }
    }
    const queue: string[] = [];
    for (const [name, degree] of indegree) {
      if (degree === 0) queue.push(name);
    }
    const order: string[] = [];
    while (queue.length > 0) {
      const name = queue.shift() as string;
      order.push(name);
      for (const other of usable) {
        const entry = parsed.get(other);
        if (entry && entry.dependencies.includes(name)) {
          const next = (indegree.get(other) ?? 1) - 1;
          indegree.set(other, next);
          if (next === 0) queue.push(other);
        }
      }
    }
    return order;
  }

  private evaluateInOrder(
    parsed: Map<string, ParsedDefinition>,
    order: string[],
    cycleMembers: Set<string>,
    issues: VariableIssue[]
  ): Map<string, number> {
    const fresh = new Map<string, number>();
    // Every defined name gets an entry; broken/cyclic ones stay NaN so
    // dependent curves render as honest gaps.
    for (const name of parsed.keys()) fresh.set(name, NaN);
    const scope: Record<string, number> = {};
    for (const name of order) {
      const entry = parsed.get(name);
      if (!entry || entry.broken) continue;
      let fn: CompiledFunction;
      try {
        fn = compileScopedAst(entry.ast, {
          parameter: CARTESIAN_PARAMETER,
          resolveVariable: (ref) =>
            typeof scope[ref.toLowerCase()] === 'number' ? scope[ref.toLowerCase()] : NaN,
        });
      } catch {
        issues.push({ variable: name, message: `Could not compile the definition of '${name}'.` });
        continue;
      }
      let value: number;
      try {
        value = fn(0);
      } catch {
        value = NaN;
      }
      if (typeof value !== 'number' || Number.isNaN(value)) {
        issues.push({
          variable: name,
          message: `'${name}' did not evaluate to a number — check its definition.`,
        });
        continue;
      }
      scope[name] = value;
      fresh.set(name, value);
    }
    void cycleMembers;
    return fresh;
  }
}

/**
 * Names of variables a list of definitions actually defines (lowercased).
 * Handy for the editor's undefined-variable checks.
 */
export function definedVariableNames(definitions: VariableDefinition[]): Set<string> {
  const names = new Set<string>();
  for (const def of definitions) {
    if (def && typeof def.name === 'string') names.add(normalizeVariableName(def.name));
  }
  return names;
}
