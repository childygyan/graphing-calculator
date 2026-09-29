/**
 * Phase 3 math function/constant table: the ONLY functions the expression
 * compiler may call. Every entry is a hand-written wrapper around Math.* —
 * there is no eval, no new Function, and no way for user input to reach
 * arbitrary code. Domain violations return NaN (never throw) so the
 * sampler can split curves into honest gaps.
 */

export interface MathFunctionSpec {
  /** Human-readable name (same as the identifier users type). */
  name: string;
  /** Allowed argument counts. */
  arity: number[];
  apply: (args: number[]) => number;
}

function oneArg(fn: (x: number) => number): (args: number[]) => number {
  return (args) => fn(args[0]);
}

/** NaN unless every argument is a finite number. */
function requireFinite(args: number[]): boolean {
  return args.every((a) => Number.isFinite(a));
}

const TABLE: Record<string, MathFunctionSpec> = {
  sin: { name: 'sin', arity: [1], apply: oneArg((x) => Math.sin(x)) },
  cos: { name: 'cos', arity: [1], apply: oneArg((x) => Math.cos(x)) },
  tan: { name: 'tan', arity: [1], apply: oneArg((x) => Math.tan(x)) },
  asin: {
    name: 'asin',
    arity: [1],
    apply: oneArg((x) => (Math.abs(x) <= 1 ? Math.asin(x) : NaN)),
  },
  acos: {
    name: 'acos',
    arity: [1],
    apply: oneArg((x) => (Math.abs(x) <= 1 ? Math.acos(x) : NaN)),
  },
  atan: { name: 'atan', arity: [1], apply: oneArg((x) => Math.atan(x)) },
  sinh: { name: 'sinh', arity: [1], apply: oneArg((x) => Math.sinh(x)) },
  cosh: { name: 'cosh', arity: [1], apply: oneArg((x) => Math.cosh(x)) },
  tanh: { name: 'tanh', arity: [1], apply: oneArg((x) => Math.tanh(x)) },
  exp: { name: 'exp', arity: [1], apply: oneArg((x) => Math.exp(x)) },
  log: {
    name: 'log',
    arity: [1],
    apply: oneArg((x) => (x > 0 ? Math.log(x) : NaN)),
  },
  log10: {
    name: 'log10',
    arity: [1],
    apply: oneArg((x) => (x > 0 ? Math.log10(x) : NaN)),
  },
  sqrt: {
    name: 'sqrt',
    arity: [1],
    apply: oneArg((x) => (x < 0 ? NaN : Math.sqrt(x))),
  },
  cbrt: { name: 'cbrt', arity: [1], apply: oneArg((x) => Math.cbrt(x)) },
  abs: { name: 'abs', arity: [1], apply: oneArg((x) => Math.abs(x)) },
  floor: { name: 'floor', arity: [1], apply: oneArg((x) => Math.floor(x)) },
  ceil: { name: 'ceil', arity: [1], apply: oneArg((x) => Math.ceil(x)) },
  round: { name: 'round', arity: [1], apply: oneArg((x) => Math.round(x)) },
  trunc: { name: 'trunc', arity: [1], apply: oneArg((x) => Math.trunc(x)) },
  sign: { name: 'sign', arity: [1], apply: oneArg((x) => Math.sign(x)) },
  min: {
    name: 'min',
    arity: [2],
    apply: (args) => (requireFinite(args) ? Math.min(args[0], args[1]) : NaN),
  },
  max: {
    name: 'max',
    arity: [2],
    apply: (args) => (requireFinite(args) ? Math.max(args[0], args[1]) : NaN),
  },
};

/** Constants available as bare identifiers. */
export const MATH_CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  tau: Math.PI * 2,
};

/** The only variable name the Phase 3 compiler binds. */
export const VARIABLE_NAME = 'x';

export function getFunctionSpec(name: string): MathFunctionSpec | undefined {
  return TABLE[name.toLowerCase()];
}

export function isFunctionName(name: string): boolean {
  return getFunctionSpec(name) !== undefined;
}

export function isConstantName(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(MATH_CONSTANTS, name.toLowerCase());
}

export function getConstantValue(name: string): number | undefined {
  return MATH_CONSTANTS[name.toLowerCase()];
}

/** Sorted function names, for error messages and documentation. */
export function listFunctionNames(): string[] {
  return Object.keys(TABLE).sort();
}
