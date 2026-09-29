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

function compileNode(node: AstNode): CompiledFunction {
  switch (node.kind) {
    case 'number':
      return () => node.value;
    case 'constant': {
      const value = getConstantValue(node.name) ?? NaN;
      return () => value;
    }
    case 'variable':
      return (x) => x;
    case 'unary': {
      const operand = compileNode(node.operand);
      return (x) => -operand(x);
    }
    case 'binary': {
      const left = compileNode(node.left);
      const right = compileNode(node.right);
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
      const argFns = node.args.map(compileNode);
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
 * Compile an AST into a pure (x) => y function. The result never throws
 * for numeric input — domain errors surface as NaN.
 */
export function compileAst(node: AstNode): CompiledFunction {
  const fn = compileNode(node);
  return (x: number) => {
    if (typeof x !== 'number' || Number.isNaN(x)) return NaN;
    const y = fn(x);
    return typeof y === 'number' ? y : NaN;
  };
}
