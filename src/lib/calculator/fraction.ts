/**
 * Decimal ⇄ fraction display for the scientific calculator. UI-only
 * formatting: the evaluated value is never changed, only rendered as a
 * fraction approximation when the user flips the toggle.
 *
 * Approximation uses continued fractions with a denominator cap, so
 * 0.3333333333 renders as 1/3 while values with no good small-denominator
 * approximation (e.g. π to 10 digits) report null and the UI keeps the
 * decimal form.
 */

export interface Fraction {
  numerator: number;
  denominator: number;
}

const DEFAULT_MAX_DENOMINATOR = 1_000_000;
const RELATIVE_TOLERANCE = 1e-9;

/**
 * Approximate a finite decimal as a fraction. Returns null for
 * non-finite values or when no denominator under the cap approximates
 * the value within tolerance.
 */
export function decimalToFraction(
  value: number,
  maxDenominator: number = DEFAULT_MAX_DENOMINATOR
): Fraction | null {
  if (!Number.isFinite(value) || !Number.isFinite(maxDenominator) || maxDenominator < 1) {
    return null;
  }
  const sign = value < 0 || Object.is(value, -0) ? -1 : 1;
  const abs = Math.abs(value);
  if (abs > Number.MAX_SAFE_INTEGER) return null;

  // Integers (and near-integers) are exact.
  const rounded = Math.round(abs);
  if (Math.abs(abs - rounded) <= RELATIVE_TOLERANCE * Math.max(1, abs)) {
    return { numerator: sign * rounded, denominator: 1 };
  }

  // Continued-fraction convergents p/q for abs.
  let pPrev = 0;
  let pCurr = 1;
  let qPrev = 1;
  let qCurr = 0;
  let remainder = abs;
  for (let i = 0; i < 64; i++) {
    const term = Math.floor(remainder);
    const pNext = term * pCurr + pPrev;
    const qNext = term * qCurr + qPrev;
    if (qNext > maxDenominator) break;
    pPrev = pCurr;
    pCurr = pNext;
    qPrev = qCurr;
    qCurr = qNext;
    const error = Math.abs(abs - pCurr / qCurr);
    if (error <= RELATIVE_TOLERANCE * Math.max(1, abs)) {
      return { numerator: sign * pCurr, denominator: qCurr };
    }
    const frac = remainder - term;
    if (frac < 1e-12) {
      return { numerator: sign * pCurr, denominator: qCurr };
    }
    remainder = 1 / frac;
  }
  return null;
}

/** Render a fraction as "n/d", or as an integer when the denominator is 1. */
export function formatFraction(fraction: Fraction): string {
  if (fraction.denominator === 1) return String(fraction.numerator);
  if (fraction.numerator === 0) return '0';
  return `${fraction.numerator}/${fraction.denominator}`;
}
