/**
 * Phase 3 expression normalization: turn free-form user input into the
 * canonical ASCII source the tokenizer understands.
 *
 * Normalization is a pure string rewrite (no parsing):
 *  - strips a leading "y =" / "f(x) =" equation prefix,
 *  - maps unicode operators and constants to ASCII (× → *, ÷ → /, π → pi,
 *    √ → sqrt, − → -, …),
 *  - expands superscript runs (x² → x^2),
 *  - applies function aliases (arcsin → asin, ln → log),
 *  - collapses whitespace runs to a single space (so "sin x" keeps the
 *    separation bare function application needs, and equivalent spacing
 *    shares a cache key).
 *
 * The normalized string is what parse errors position against.
 */

const SUPERSCRIPT_MAP: Record<string, string> = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
  '⁺': '+',
  '⁻': '-',
};

/** Case-insensitive whole-word aliases applied before parsing. */
const ALIASES: Array<[RegExp, string]> = [
  [/\barcsinh\b/gi, 'asinh'],
  [/\barccosh\b/gi, 'acosh'],
  [/\barctanh\b/gi, 'atanh'],
  [/\barcsin\b/gi, 'asin'],
  [/\barccos\b/gi, 'acos'],
  [/\barctan\b/gi, 'atan'],
  [/\bln\b/gi, 'log'],
];

function expandSuperscripts(source: string): string {
  return source.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, (run) => {
    let ascii = '';
    for (const char of run) ascii += SUPERSCRIPT_MAP[char] ?? '';
    return `^${ascii}`;
  });
}

/**
 * Normalize raw user input into canonical source. Throws nothing — even
 * degenerate input produces a string; the tokenizer/parser report errors.
 */
export function normalizeExpressionSource(raw: string): string {
  let source = raw.trim();

  // Strip a leading "y =" or "f(x) =" equation prefix (case-insensitive).
  source = source.replace(/^(?:y|f\s*\(\s*x\s*\))\s*=\s*/i, '');

  // Unicode operators / constants → ASCII. '√'/'∛' gain a trailing space
  // so '√16' normalizes to 'sqrt 16' (bare function application).
  source = source
    .replace(/×/g, '*')
    .replace(/[⋅·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/[−–—]/g, '-')
    .replace(/π/g, 'pi')
    .replace(/∛/g, 'cbrt ')
    .replace(/√/g, 'sqrt ');

  source = expandSuperscripts(source);

  for (const [pattern, replacement] of ALIASES) {
    source = source.replace(pattern, replacement);
  }

  // Canonical cache key: collapse every whitespace run to one space.
  return source.replace(/\s+/g, ' ');
}
