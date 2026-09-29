/**
 * Trust-signal tests for Workstream C: review bylines on learn guides.
 *
 * Honest bylines only — no person names, photos, or invented credentials.
 * Every guide states it was reviewed by the Graphing Calculator team and
 * carries a real, valid ISO review date.
 *
 * The data-level tests run standalone. The rendered-output tests check the
 * built HTML in dist/ (requires `npm run build` first, same as the SEO
 * audit suite) to prove the byline actually reaches the page; the suite
 * fails loudly when dist/ is missing.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { LEARN_ARTICLES } from '../../../data/seo/learn.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const DIST = join(ROOT, 'dist');

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const BYLINE = 'Reviewed for mathematical accuracy by the Graphing Calculator team';

describe('learn article review dates (data)', () => {
  it('every LEARN_ARTICLES entry has a valid reviewedOn in YYYY-MM-DD form', () => {
    expect(LEARN_ARTICLES.length).toBeGreaterThan(0);
    for (const article of LEARN_ARTICLES) {
      expect(article.reviewedOn, `${article.slug}: reviewedOn must be present`).toBeDefined();
      expect(ISO_DATE.test(article.reviewedOn as string), `${article.slug}: invalid date`).toBe(
        true
      );
      // A real calendar date, not a placeholder.
      const [y, m, d] = (article.reviewedOn as string).split('-').map(Number);
      expect(m).toBeGreaterThanOrEqual(1);
      expect(m).toBeLessThanOrEqual(12);
      expect(d).toBeGreaterThanOrEqual(1);
      expect(d).toBeLessThanOrEqual(31);
      expect(y).toBeLessThanOrEqual(2026);
    }
  });

  it('no byline fabricates a reviewer identity', () => {
    const source = readFileSync(join(ROOT, 'src/pages/learn/[slug].astro'), 'utf8');
    expect(source).toContain(BYLINE);
    // Team attribution only — never a personal name.
    expect(source).not.toMatch(/Reviewed by [A-Z][a-z]+ [A-Z][a-z]+/);
  });
});

describe('learn article review byline (rendered output)', () => {
  if (!existsSync(DIST)) {
    throw new Error(
      'dist/ not found — run `npm run build` before `npm test` so the byline tests have output to crawl.'
    );
  }

  const rendered: { slug: string; html: string }[] = LEARN_ARTICLES.map((article) => {
    const file = join(DIST, 'learn', article.slug, 'index.html');
    return { slug: article.slug, html: readFileSync(file, 'utf8') };
  });

  it('builds every learn article page', () => {
    const builtSlugs = readdirSync(join(DIST, 'learn'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    for (const article of LEARN_ARTICLES) {
      expect(builtSlugs, `missing built page for ${article.slug}`).toContain(article.slug);
    }
  });

  it('renders the team byline on every guide', () => {
    for (const { slug, html } of rendered) {
      expect(html, `${slug}: byline missing`).toContain(BYLINE);
    }
  });

  it('renders the last-reviewed date from the article data', () => {
    for (const article of LEARN_ARTICLES) {
      const { slug, html } = rendered.find((r) => r.slug === article.slug) as {
        slug: string;
        html: string;
      };
      // Long-form date derived from reviewedOn, e.g. "September 29, 2026".
      const [y, m, d] = (article.reviewedOn as string).split('-').map(Number);
      const longForm = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });
      expect(html, `${slug}: date line missing`).toContain(`Last reviewed: ${longForm}`);
    }
  });
});
