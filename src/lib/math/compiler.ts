/**
 * Phase 3 expression compiler: AST → pure function (x) => y.
 *
 * The compiler only ever calls entries from the functions.ts table —
 * user input can never reach eval/new Function or any other callable.
 * Domain violations (division by zero, sqrt of a negative, log of a
 * non-positive, asin/acos outside [-1, 1]) produce NaN rather than
 * throwing, so the sampler can split curves into honest gaps.
 */

import type { AstNode } from './ast.js';
import { getConstantValue, getFunctionSpec, VARIABLE_NAME } from './functions.js';

/** A compiled single-variable real function. */
export type CompiledFunction = (x: number) => number;

/** Options for compiling an AST with an explicit parameter and scope. */
export interface ScopedCompileOptions {
  /**
   * Name of the bound parameter (default 'x'). Case-insensitive: a
   * variable node whose name matches becomes the function argument.
   */
  parameter?: string;
  /**
   * Resolve any other variable name to a number. Return NaN (or a
   * non-number) for unbound names — the compiled function then yields NaN
   * instead of throwing. Defaults to always-NaN.
   */
  resolveVariable?: (name: string) => number;
}

function compileNode(
  node: AstNode,
  parameter: string,
  resolveVariable: (name: string) => number
): CompiledFunction {
  switch (node.kind) {
    case 'number':
      return () => node.value;
    case 'constant': {
      const value = getConstantValue(node.name) ?? NaN;
      return () => value;
    }
    case 'variable': {
      if (node.name.toLowerCase() === parameter.toLowerCase()) {
        return (p) => p;
      }
      const name = node.name;
      return () => {
        const value = resolveVariable(name);
        return typeof value === 'number' ? value : NaN;
      };
    }
    case 'unary': {
      const operand = compileNode(node.operand, parameter, resolveVariable);
      return (x) => -operand(x);
    }
    case 'binary': {
      const left = compileNode(node.left, parameter, resolveVariable);
      const right = compileNode(node.right, parameter, resolveVariable);
      switch (node.operator) {
        case '+':
          return (x) => left(x) + right(x);
        case '-':
          return (x) => left(x) - right(x);
        case '*':
          return (x) => left(x) * right(x);
        case '/':
          // Division by zero is a domain gap, not Infinity: NaN keeps
          // the sampler from drawing a streak through the singularity.
          return (x) => {
            const denominator = right(x);
            return denominator === 0 ? NaN : left(x) / denominator;
          };
        case '^':
          return (x) => Math.pow(left(x), right(x));
      }
      break;
    }
    case 'call': {
      const spec = getFunctionSpec(node.name);
      if (!spec) return () => NaN;
      const argFns = node.args.map((arg) => compileNode(arg, parameter, resolveVariable));
      if (argFns.length === 1) {
        const a = argFns[0];
        return (x) => spec.apply([a(x)]);
      }
      return (x) => spec.apply(argFns.map((fn) => fn(x)));
    }
  }
}

export { VARIABLE_NAME };

/**
 * Compile an AST into a pure (param) => number function with an explicit
 * parameter name and variable resolver. Still no eval/new Function: the
 * closure only calls entries from the functions.ts table.
 */
export function compileScopedAst(
  node: AstNode,
  options: ScopedCompileOptions = {}
): CompiledFunction {
  const parameter = options.parameter ?? VARIABLE_NAME;
  const resolveVariable = options.resolveVariable ?? (() => NaN);
  const fn = compileNode(node, parameter, resolveVariable);
  return (p: number) => {
    if (typeof p !== 'number' || Number.isNaN(p)) return NaN;
    const y = fn(p);
    return typeof y === 'number' ? y : NaN;
  };
}

/**
 * Compile an AST into a pure (x) => y function. The result never throws
 * for numeric input — domain errors surface as NaN. Unbound variable
 * names (anything but x) also evaluate to NaN.
 */
export function compileAst(node: AstNode): CompiledFunction {
  return compileScopedAst(node, { parameter: VARIABLE_NAME, resolveVariable: () => NaN });
}
