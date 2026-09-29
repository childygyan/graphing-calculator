/**
 * Assertions for the /desmos-alternative/ comparison page.
 *
 * The page is an .astro file, so these tests assert on its source:
 * required title, meta-description length, canonical/indexed status,
 * the legal independence notice, the required internal links, and the
 * guardrail that nothing unverifiable is claimed about Desmos.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'pages', 'desmos-alternative');
const source = readFileSync(join(HERE, 'index.astro'), 'utf8');

function descriptionValue(): string {
  const match = source.match(/const description =\n?\s*'([^']+)'/);
  expect(match, 'meta description constant exists').not.toBeNull();
  return match![1];
}

describe('desmos-alternative page', () => {
  it('uses the required page title (never just "Desmos Calculator")', () => {
    expect(source).toContain('Best Desmos Alternative — Free Online Graphing Calculator');
    expect(source).not.toMatch(/title = 'Desmos Calculator/);
    expect(source).not.toMatch(/heading = 'Desmos Calculator/);
  });

  it('has a unique meta description between 120 and 155 characters', () => {
    const length = descriptionValue().length;
    expect(length).toBeGreaterThanOrEqual(120);
    expect(length).toBeLessThanOrEqual(155);
  });

  it('is indexed with canonical path /desmos-alternative/', () => {
    expect(source).toContain("canonicalPath = '/desmos-alternative/'");
    expect(source).toContain('canonicalPath={canonicalPath}');
    expect(source).not.toMatch(/noindex=\{?true/);
  });

  it('states independence from Desmos and Amplify', () => {
    expect(source).toContain('not affiliated with');
    expect(source).toContain('Amplify');
    expect(source).toContain('independent product');
  });

  it('links out to the required internal pages', () => {
    for (const href of ['/graphing-calculator/', '/3d/', '/calculators/', '/learn/']) {
      expect(source, `links to ${href}`).toContain(`href="${href}"`);
    }
  });

  it('includes the required FAQ questions', () => {
    expect(source).toContain('Is this affiliated with Desmos?');
    expect(source).toContain('Is Graphing Calculator free?');
  });

  it('makes no unverifiable claims about Desmos', () => {
    expect(source).not.toMatch(/Desmos (lacks|does not have|has no|cannot|can't)/i);
  });

  it('contains no reviews, ratings, or user statistics', () => {
    expect(source).not.toMatch(/\bstars?\b/i);
    // Rating-shaped tokens like "4/5" or "4.5/5" — not Tailwind opacity
    // classes such as slate-800/50.
    expect(source).not.toMatch(/(?:^|[\s(>])\d(\.\d)?\/5(?:[\s<).]|$)/);
  });
});
