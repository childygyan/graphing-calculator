/**
 * Assertions for the /methodology/ page.
 *
 * The page is an .astro file, so these tests assert on its source:
 * required title, meta-description length, canonical/indexed status,
 * the honesty guardrails (no invented reviewers/credentials/stats),
 * the required internal links, and FAQ presence.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  '..',
  '..',
  'pages',
  'methodology'
);
const source = readFileSync(join(HERE, 'index.astro'), 'utf8');

function descriptionValue(): string {
  const match = source.match(/const description =\n?\s*'([^']+)'/);
  expect(match, 'meta description constant exists').not.toBeNull();
  return match![1];
}

describe('methodology page', () => {
  it('uses the required page title', () => {
    expect(source).toContain(
      'Methodology — How Our Math and Content Are Verified | Graphing Calculator'
    );
  });

  it('has a unique meta description between 120 and 155 characters', () => {
    const length = descriptionValue().length;
    expect(length).toBeGreaterThanOrEqual(120);
    expect(length).toBeLessThanOrEqual(155);
  });

  it('is indexed with canonical path /methodology/', () => {
    expect(source).toContain("canonicalPath = '/methodology/'");
    expect(source).toContain('canonicalPath={canonicalPath}');
    expect(source).not.toMatch(/noindex=\{?true/);
  });

  it('documents the engine, tests, content review, and AI constraints', () => {
    expect(source).toContain('deterministic math engine');
    expect(source).toContain('automated tests');
    expect(source).toContain('Last reviewed');
    expect(source).toContain('mock mode');
  });

  it('states the honesty guardrails: no invented reviewers, stats, or copied UI', () => {
    expect(source).toContain('No invented reviewers');
    expect(source).toContain('No fabricated statistics');
    expect(source).toContain('No copied interfaces');
  });

  it('links out to the required internal pages', () => {
    // /about/, /learn/, /graphing-calculator/, /desmos-alternative/ go
    // through RelatedLinks (paths prop); the rest are inline anchors.
    const relatedMatch = source.match(/<RelatedLinks paths=\{\[([^\]]*)\]\}/);
    expect(relatedMatch, 'RelatedLinks paths exist').not.toBeNull();
    for (const href of ['/about/', '/learn/', '/graphing-calculator/', '/desmos-alternative/']) {
      expect(relatedMatch![1], `RelatedLinks includes ${href}`).toContain(`'${href}'`);
    }
    for (const href of ['/contact/', '/privacy-policy/']) {
      expect(source, `links to ${href}`).toContain(`href="${href}"`);
    }
  });

  it('includes the required FAQ questions', () => {
    expect(source).toContain('Does the AI assistant do the math?');
    expect(source).toContain('Who reviews the content?');
    expect(source).toContain('What happens when an error is found?');
  });
});
