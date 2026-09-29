/**
 * Scientific calculator evaluation layer (Workstream B).
 *
 * This module is the testable core of the scientific calculator page. It
 * reuses the project's expression engine (normalize → tokenize → parse →
 * compile) — it never parses or evaluates anything itself. Two thin
 * layers sit on top of the engine:
 *
 *  1. Angle mode: the engine's trig functions work in radians. In DEG
 *     mode the AST is rewritten (sin(d) → sin(d·π/180), asin(r) →
 *     asin(r)·180/π) before compilation. The shared function table in
 *     functions.ts is never touched.
 *  2. Honest errors: the compiler yields NaN for domain violations, so a
 *     failing result is classified by inspecting the AST and reported in
 *     plain language — never raw "NaN" or "Infinity".
 */

import type { AstNode } from './ast.js';
import { collectVariables } from './ast.js';
import { compileAst } from './compiler.js';
import { compileExpression } from './engine.js';
import { formatNumber } from './format.js';
import { getFunctionSpec, MATH_CONSTANTS } from './functions.js';
import { normalizeExpressionSource } from './normalize.js';
import { ParseError } from './tokenizer.js';

/** Angle unit for trig input/output. The engine itself always uses radians. */
export type AngleMode = 'deg' | 'rad';

export type ScientificEvaluation =
  { ok: true; value: number; display: string } | { ok: false; message: string };

/** Keyboard action a physical key should trigger in the calculator UI. */
export type CalculatorKeyAction =
  { type: 'insert'; text: string } | { type: 'evaluate' } | { type: 'clear' };

const TRIG_DIRECT = new Set(['sin', 'cos', 'tan']);
const TRIG_INVERSE = new Set(['asin', 'acos', 'atan']);

/** Significant digits shown for a successful result. */
const RESULT_SIGNIFICANT_DIGITS = 10;

function numberNode(value: number, span: AstNode['span']): AstNode {
  return { kind: 'number', value, span };
}

/**
 * Rewrite trig calls for DEG mode: sin(d) becomes sin(d·π/180) and
 * asin(r) becomes asin(r)·180/π, so inputs are read as degrees and
 * inverse-trig results are reported in degrees. RAD mode returns the
 * AST unchanged.
 */
function applyAngleMode(node: AstNode, mode: AngleMode): AstNode {
  if (mode === 'rad') return node;
  switch (node.kind) {
    case 'call': {
      const args = node.args.map((arg) => applyAngleMode(arg, mode));
      if (args.length === 1 && TRIG_DIRECT.has(node.name)) {
        return {
          kind: 'call',
          name: node.name,
          args: [
            {
              kind: 'binary',
              operator: '*',
              left: args[0],
              right: numberNode(Math.PI / 180, node.span),
              span: node.span,
            },
          ],
          span: node.span,
        };
      }
      if (args.length === 1 && TRIG_INVERSE.has(node.name)) {
        return {
          kind: 'binary',
          operator: '*',
          left: { kind: 'call', name: node.name, args, span: node.span },
          right: numberNode(180 / Math.PI, node.span),
          span: node.span,
        };
      }
      return { ...node, args };
    }
    case 'unary':
      return { ...node, operand: applyAngleMode(node.operand, mode) };
    case 'binary':
      return {
        ...node,
        left: applyAngleMode(node.left, mode),
        right: applyAngleMode(node.right, mode),
      };
    default:
      return node;
  }
}

/**
 * Evaluate a variable-free subtree directly (used for domain-cause
 * analysis). Mirrors the compiler's semantics: division by a zero
 * denominator yields NaN rather than throwing.
 */
function evaluateConstant(node: AstNode): number {
  switch (node.kind) {
    case 'number':
      return node.value;
    case 'constant':
      return MATH_CONSTANTS[node.name] ?? NaN;
    case 'variable':
      return NaN;
    case 'unary':
      return -evaluateConstant(node.operand);
    case 'binary': {
      const left = evaluateConstant(node.left);
      const right = evaluateConstant(node.right);
      switch (node.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return right === 0 ? NaN : left / right;
        case '^':
          return Math.pow(left, right);
      }
      break;
    }
    case 'call': {
      const spec = getFunctionSpec(node.name);
      if (!spec) return NaN;
      return spec.apply(node.args.map(evaluateConstant));
    }
  }
}

/**
 * Find the first domain violation in the AST (depth-first, source order)
 * and describe it in plain language. Returns null when nothing specific
 * is wrong. Runs on the pre-rewrite AST so DEG-mode checks see degree
 * values.
 */
function findDomainCause(node: AstNode, mode: AngleMode): string | null {
  switch (node.kind) {
    case 'binary': {
      if (node.operator === '/') {
        if (evaluateConstant(node.right) === 0) {
          return 'Undefined — division by zero.';
        }
      }
      if (node.operator === '^') {
        if (evaluateConstant(node.left) === 0 && evaluateConstant(node.right) < 0) {
          return 'Undefined — division by zero.';
        }
      }
      return findDomainCause(node.left, mode) ?? findDomainCause(node.right, mode);
    }
    case 'unary':
      return findDomainCause(node.operand, mode);
    case 'call': {
      const arg = node.args.length === 1 ? evaluateConstant(node.args[0]) : NaN;
      if (node.name === 'sqrt' && arg < 0) {
        return 'Undefined — the square root of a negative number is not a real number.';
      }
      if ((node.name === 'log' || node.name === 'log10') && arg <= 0) {
        return 'Undefined — the logarithm of a non-positive number is not a real number.';
      }
      if ((node.name === 'asin' || node.name === 'acos') && Math.abs(arg) > 1) {
        return 'Undefined — asin and acos need an argument between −1 and 1.';
      }
      if (node.name === 'tan' && mode === 'deg') {
        // tan is undefined at odd multiples of 90°. The compiled value
        // there is a huge finite float, so catch it structurally.
        const k = arg / 90;
        const nearest = Math.round(k);
        if (nearest % 2 !== 0 && Math.abs(k - nearest) < 1e-9) {
          return 'Undefined — tan is not defined at odd multiples of 90°.';
        }
      }
      for (const child of node.args) {
        const cause = findDomainCause(child, mode);
        if (cause) return cause;
      }
      return null;
    }
    default:
      return null;
  }
}

/** Map a ParseError to a friendly, actionable message. */
function friendlyParseError(source: string, error: ParseError): string {
  const normalized = normalizeExpressionSource(source);
  if (normalized === '') return 'Enter an expression first.';
  if (/[+\-*/^]$/.test(normalized)) {
    return 'The expression ends with an operator — add a number after it.';
  }
  const opens = (normalized.match(/\(/g) ?? []).length;
  const closes = (normalized.match(/\)/g) ?? []).length;
  if (opens !== closes || error.message.includes("Expected ')'")) {
    return 'Mismatched parentheses — every “(” needs a matching “)”.';
  }
  const badChar = /Unexpected character '(.)'/.exec(error.message);
  if (badChar) {
    return `I don't understand the character “${badChar[1]}” — remove it and try again.`;
  }
  return 'The expression could not be read — check for typos.';
}

/**
 * Evaluate a scientific-calculator expression through the shared engine.
 * Pure and total: never throws, never returns raw NaN/Infinity text.
 */
export function evaluateScientificExpression(
  source: string,
  angleMode: AngleMode
): ScientificEvaluation {
  if (source.trim() === '') {
    return { ok: false, message: 'Enter an expression first.' };
  }

  let ast: AstNode;
  try {
    ast = compileExpression(source).ast;
  } catch (error) {
    if (error instanceof ParseError) {
      return { ok: false, message: friendlyParseError(source, error) };
    }
    return { ok: false, message: 'The expression could not be read — check for typos.' };
  }

  const variables = collectVariables(ast);
  if (variables.size > 0) {
    const names = [...variables].sort().join(', ');
    return {
      ok: false,
      message: `This calculator works with numbers only — “${names}” is not defined here.`,
    };
  }

  const cause = findDomainCause(ast, angleMode);
  if (cause) return { ok: false, message: cause };

  const fn = compileAst(applyAngleMode(ast, angleMode));
  const value = fn(0);
  if (Number.isFinite(value)) {
    return {
      ok: true,
      value,
      display: formatNumber(value, { mode: 'significant', digits: RESULT_SIGNIFICANT_DIGITS }),
    };
  }
  if (Number.isNaN(value)) {
    return { ok: false, message: 'Undefined — the result is not a real number.' };
  }
  return { ok: false, message: 'Overflow — the result is too large to display.' };
}

/**
 * Map a physical-keyboard key to the calculator action it should
 * trigger. Returns null for keys the input handles natively (digits,
 * plain operators, parentheses).
 */
export function calculatorKeyAction(key: string): CalculatorKeyAction | null {
  switch (key) {
    case 'Enter':
    case '=':
      return { type: 'evaluate' };
    case 'Escape':
      return { type: 'clear' };
    case '*':
    case 'x':
    case 'X':
      return { type: 'insert', text: '×' };
    case '/':
      return { type: 'insert', text: '÷' };
    default:
      return null;
  }
}
