/**
 * Math engine abstraction boundary.
 *
 * Phase 3 implements the real single-variable expression engine behind
 * this interface (see engine.ts): parse, validate, and evaluate compile
 * user input through a hand-rolled tokenizer → parser → AST → compiler
 * pipeline (never eval/new Function). Roots, derivatives, integrals, and
 * intersections remain honest stubs until Phase 4.
 */

import type { Point } from '../../types/calculator.js';
import { ExpressionMathEngine } from './engine.js';

export type EngineNumber = number;

export interface ParsedExpression {
  source: string;
  variables: string[];
}

export interface ValidationIssue {
  message: string;
  severity: 'error' | 'warning';
  start?: number;
  end?: number;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface NumericRange {
  min: number;
  max: number;
}

export class MathEngineError extends Error {
  code: string;

  constructor(message: string, code = 'MATH_ENGINE_ERROR') {
    super(message);
    this.name = 'MathEngineError';
    this.code = code;
  }
}

export interface MathEngine {
  parseExpression(source: string): ParsedExpression;
  validate(source: string): ValidationResult;
  evaluate(node: ParsedExpression, scope: Record<string, number>): EngineNumber;
  findRoots(source: string, variable: string, range: NumericRange): number[];
  derivative(source: string, variable: string): ParsedExpression;
  integral(source: string, variable: string, bounds: NumericRange): EngineNumber;
  intersection(a: string, b: string, variable: string, range: NumericRange): Point[];
}

const NOT_IMPLEMENTED = 'Math engine is not implemented in Phase 1 (foundation only).';

/**
 * Placeholder engine. Every method throws an honest MathEngineError instead
 * of faking a result. Replace with a real implementation in a later phase.
 */
export class NotImplementedMathEngine implements MathEngine {
  parseExpression(_source: string): ParsedExpression {
    throw new MathEngineError(NOT_IMPLEMENTED, 'NOT_IMPLEMENTED');
  }

  validate(_source: string): ValidationResult {
    throw new MathEngineError(NOT_IMPLEMENTED, 'NOT_IMPLEMENTED');
  }

  evaluate(_node: ParsedExpression, _scope: Record<string, number>): EngineNumber {
    throw new MathEngineError(NOT_IMPLEMENTED, 'NOT_IMPLEMENTED');
  }

  findRoots(_source: string, _variable: string, _range: NumericRange): number[] {
    throw new MathEngineError(NOT_IMPLEMENTED, 'NOT_IMPLEMENTED');
  }

  derivative(_source: string, _variable: string): ParsedExpression {
    throw new MathEngineError(NOT_IMPLEMENTED, 'NOT_IMPLEMENTED');
  }

  integral(_source: string, _variable: string, _bounds: NumericRange): EngineNumber {
    throw new MathEngineError(NOT_IMPLEMENTED, 'NOT_IMPLEMENTED');
  }

  intersection(_a: string, _b: string, _variable: string, _range: NumericRange): Point[] {
    throw new MathEngineError(NOT_IMPLEMENTED, 'NOT_IMPLEMENTED');
  }
}

/**
 * Phase 3: returns the real expression engine (normalize → tokenize →
 * parse → compile). Analysis methods (roots, derivatives, integrals,
 * intersections) still throw MathEngineError until Phase 4.
 */
export function createMathEngine(): MathEngine {
  return new ExpressionMathEngine();
}
