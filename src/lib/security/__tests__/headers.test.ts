/**
 * Phase 9: verify public/_headers against the real production build.
 *
 * - Every inline script in dist/*.html must be allow-listed by a sha256
 *   hash in the CSP (otherwise the policy would break the site).
 * - The CSP string must equal what src/lib/security/csp.ts generates for
 *   those hashes (no hand-edit drift).
 *
 * Skips honestly when dist/ is absent (run `npm run build` first).
 */
import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDefaultCspHeader } from '../csp.js';

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url));
const distDir = join(repoRoot, 'dist');
const headersPath = join(repoRoot, 'public', '_headers');
const hasDist = existsSync(distDir);
const hasHeaders = existsSync(headersPath);

function readCspFromHeaders(): string {
  const text = readFileSync(headersPath, 'utf8');
  const match = text.match(/Content-Security-Policy:\s*([^\n]+)/);
  if (!match) throw new Error('public/_headers has no Content-Security-Policy line.');
  return match[1].trim();
}

function hashesFromCsp(csp: string): string[] {
  return [...csp.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]);
}

function inlineScriptHashes(): Map<string, string[]> {
  const found = new Map<string, string[]>();
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith('.html')) continue;
      const html = readFileSync(full, 'utf8');
      const scripts = [
        ...html.matchAll(
          /<script(?![^>]*type="application\/ld\+json")(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g
        ),
      ];
      for (const [, body] of scripts) {
        const hash = createHash('sha256').update(body, 'utf8').digest('base64');
        const list = found.get(hash) ?? [];
        list.push(full.slice(distDir.length + 1));
        found.set(hash, list);
      }
    }
  };
  walk(distDir);
  return found;
}

describe.skipIf(!hasDist || !hasHeaders)('public/_headers CSP vs production build', () => {
  it('allow-lists every inline script the build emits', () => {
    const allowed = new Set(hashesFromCsp(readCspFromHeaders()));
    const missing: string[] = [];
    for (const [hash, pages] of inlineScriptHashes()) {
      if (!allowed.has(hash)) {
        missing.push(`${hash} (used by ${pages.slice(0, 3).join(', ')})`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('matches the csp.ts builder output for its own hashes', () => {
    const csp = readCspFromHeaders();
    const expected = buildDefaultCspHeader({ scriptHashes: hashesFromCsp(csp) });
    expect(csp).toBe(expected);
  });

  it('ships security headers on every path', () => {
    const text = readFileSync(headersPath, 'utf8');
    expect(text).toContain('X-Content-Type-Options: nosniff');
    expect(text).toContain('Referrer-Policy:');
    expect(text).toContain('Permissions-Policy:');
    expect(text).toContain("frame-ancestors 'self'");
  });
});
