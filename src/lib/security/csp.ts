/**
 * Phase 9 security: Content-Security-Policy construction.
 *
 * The site is fully static, so the policy is delivered by the host via
 * `public/_headers` (Cloudflare Pages). This module builds the header
 * value from a directive map so the policy is unit-testable and the
 * `_headers` file stays a generated artifact of the same source of truth.
 *
 * Inline scripts: the no-FOUC theme script in BaseLayout and Astro's
 * island-loader snippet are allow-listed by sha256 hash (computed from the
 * production build, see scripts/ notes in docs/PERFORMANCE_REPORT.md).
 * There is intentionally NO 'unsafe-inline' in script-src.
 *
 * style-src keeps 'unsafe-inline' (pragmatic, standard): Tailwind emits
 * classes, but components use a handful of inline `style` attributes
 * (coordinate readout positioning, dynamic widths). Inline styles cannot
 * execute script; the XSS-relevant vector (script-src) stays strict.
 */

export type CspDirectiveMap = Record<string, readonly string[]>;

/**
 * Serialize a directive map to a Content-Security-Policy header value.
 * Directives with an empty value list serialize as bare names
 * (e.g. `upgrade-insecure-requests`).
 */
export function buildCspHeader(directives: CspDirectiveMap): string {
  const parts: string[] = [];
  for (const [name, values] of Object.entries(directives)) {
    const clean = values.map((value) => value.trim()).filter((value) => value.length > 0);
    parts.push(clean.length > 0 ? `${name} ${clean.join(' ')}` : name);
  }
  return parts.join('; ');
}

export interface DefaultCspOptions {
  /** Base64 sha256 hashes of the inline scripts the build emits. */
  scriptHashes: readonly string[];
}

/**
 * The default policy for the static site. Same-origin everything, no
 * plugins, no framing by third parties, forms post to self only.
 * `connect-src` also allows Google Analytics (gtag.js loads from
 * googletagmanager.com and sends hits to google-analytics.com) — enabled
 * 2026-09-29 per site owner. The DeepSeek call happens server-side, so the
 * browser otherwise only ever calls our own `/api/ai/math`.
 */
export function defaultCspDirectives(options: DefaultCspOptions): CspDirectiveMap {
  return {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      'https://www.googletagmanager.com',
      ...options.scriptHashes.map((hash) => `'sha256-${hash}'`),
    ],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'blob:'],
    'connect-src': ["'self'", 'https://www.google-analytics.com'],
    'font-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'upgrade-insecure-requests': [],
  };
}

/** Convenience: build the default policy header in one call. */
export function buildDefaultCspHeader(options: DefaultCspOptions): string {
  return buildCspHeader(defaultCspDirectives(options));
}
