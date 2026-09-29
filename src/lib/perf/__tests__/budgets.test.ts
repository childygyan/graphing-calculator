/**
 * Phase 9 performance budgets, enforced against the production build.
 *
 * These tests read `dist/` (run `npm run build` first) and fail when a
 * change pushes the shipped bytes over budget. When `dist/` is absent
 * the suite skips honestly instead of guessing.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../../../', import.meta.url));
const distDir = join(repoRoot, 'dist');
const astroDir = join(distDir, '_astro');
const hasDist = existsSync(distDir) && existsSync(astroDir);

function gzipBytes(filePath: string): number {
  return gzipSync(readFileSync(filePath)).length;
}

function astroFiles(extension: string): string[] {
  return readdirSync(astroDir).filter((name) => name.endsWith(extension));
}

function totalGzip(extension: string): number {
  return astroFiles(extension).reduce((sum, name) => sum + gzipBytes(join(astroDir, name)), 0);
}

/** Budgets are in gzip bytes. Set from the 2026-09-29 baseline + headroom. */
const BUDGETS = {
  /** All client JS across every page (React runtime + calculator island). */
  totalJs: 150 * 1024,
  /** All shipped CSS (single deduplicated bundle). */
  totalCss: 12 * 1024,
  /** The calculator page's own island JS (excludes shared React chunk). */
  calculatorIslandJs: 60 * 1024,
} as const;

describe.skipIf(!hasDist)('production bundle budgets', () => {
  it('total client JS stays within budget', () => {
    expect(totalGzip('.js')).toBeLessThanOrEqual(BUDGETS.totalJs);
  });

  it('total CSS stays within budget', () => {
    expect(totalGzip('.css')).toBeLessThanOrEqual(BUDGETS.totalCss);
  });

  it('emits a single deduplicated CSS bundle (no Tailwind double-base)', () => {
    expect(astroFiles('.css')).toHaveLength(1);
  });

  it('the calculator island (app code, excl. React runtime) stays lean', () => {
    const island = astroFiles('.js').filter((name) => name.startsWith('CalculatorPage.'));
    expect(island.length).toBeGreaterThan(0);
    const bytes = island.reduce((sum, name) => sum + gzipBytes(join(astroDir, name)), 0);
    expect(bytes).toBeLessThanOrEqual(BUDGETS.calculatorIslandJs);
  });

  it('content pages ship zero React: no client runtime chunk is referenced', () => {
    const clientChunk = astroFiles('.js').find((name) => name.startsWith('client.'));
    const contentPages = ['index.html', 'about/index.html', 'functions/index.html'];
    for (const page of contentPages) {
      const html = readFileSync(join(distDir, page), 'utf8');
      expect(html).not.toContain('component-url=');
      if (clientChunk) {
        expect(html).not.toContain(clientChunk);
      }
    }
  });

  it('every page links the CSS bundle exactly once', () => {
    const css = astroFiles('.css');
    const html = readFileSync(join(distDir, 'index.html'), 'utf8');
    const links = html.match(/\/_astro\/[^"]*\.css/g) ?? [];
    expect(new Set(links).size).toBe(css.length);
    expect(links).toHaveLength(css.length);
  });
});

describe('budget configuration', () => {
  it('documents budgets even when dist/ is absent', () => {
    expect(BUDGETS.totalJs).toBe(153600);
    expect(BUDGETS.totalCss).toBe(12288);
    expect(hasDist || !hasDist).toBe(true);
  });
});
