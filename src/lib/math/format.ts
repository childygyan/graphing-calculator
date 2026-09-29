/**
 * Number formatting for analysis readouts, driven by the user's precision
 * settings. Non-finite values are rendered honestly instead of throwing:
 * NaN becomes an em dash, infinities become ∞/−∞.
 */

import type { PrecisionSettings } from '../../types/calculator.js';

export const DEFAULT_PRECISION: PrecisionSettings = { mode: 'decimals', digits: 4 };

export const MAX_DECIMAL_DIGITS = 12;
export const MAX_SIGNIFICANT_DIGITS = 15;

/** Clamp arbitrary stored input to a valid PrecisionSettings. */
export function sanitizePrecision(value: unknown): PrecisionSettings {
  if (typeof value !== 'object' || value === null) return { ...DEFAULT_PRECISION };
  const v = value as Record<string, unknown>;
  const mode = v.mode === 'significant' ? 'significant' : 'decimals';
  const rawDigits = typeof v.digits === 'number' ? Math.floor(v.digits) : DEFAULT_PRECISION.digits;
  const digits =
    mode === 'significant'
      ? Math.min(MAX_SIGNIFICANT_DIGITS, Math.max(1, rawDigits))
      : Math.min(MAX_DECIMAL_DIGITS, Math.max(0, rawDigits));
  return { mode, digits };
}

/**
 * Format a finite number per precision settings. Non-finite inputs never
 * throw: NaN → '—', +Infinity → '∞', −Infinity → '−∞'.
 */
export function formatNumber(value: number, precision?: PrecisionSettings): string {
  const p = sanitizePrecision(precision ?? DEFAULT_PRECISION);
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  if (value === Number.POSITIVE_INFINITY) return '∞';
  if (value === Number.NEGATIVE_INFINITY) return '−∞';
  if (value === 0) return p.mode === 'decimals' ? (0).toFixed(p.digits) : (0).toPrecision(p.digits);
  const text = p.mode === 'significant' ? value.toPrecision(p.digits) : value.toFixed(p.digits);
  // Normalize "-0", "-0.00", … to "0", "0.00", … — negative zero is noise.
  return /^-0(\.0+)?$/.test(text) ? text.slice(1) : text;
}

/** Parse a user-typed number; returns null (not NaN, not throw) when invalid. */
export function parseNumericInput(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : null;
}
