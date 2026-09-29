/**
 * English examples dictionary — the `/examples/` index prose and the
 * shared `[slug]` template labels.
 *
 * Per-example content (title, story, expressions, insights) stays in
 * `src/data/seo/examples.ts` (NOT translated by this foundation).
 * Expression labels are derived from DO-NOT-TRANSLATE expression syntax.
 */

import type { ExamplesStrings } from '../types.js';

export const examples: ExamplesStrings = {
  seo: {
    title: 'Graph Examples — Curated Interactive Graphs | Graphing Calculator',
    description:
      'Explore curated graph examples — projectile motion, damped oscillation, logistic ' +
      'growth, Lissajous curves and more — each opens preloaded in the calculator.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Examples', href: '/examples/' },
  ],
  heading: 'Graph Examples',
  intro:
    'Hand-picked graphs that show what the calculator can do — from physics and ' +
    'engineering to pure mathematical beauty. Every example opens preloaded in the ' +
    'calculator, with notes on what to look for.',
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/calculators/'],
  template: {
    eyebrow: 'Worked example',
    plottedHeading: 'Plotted expressions',
    openCta: 'Open this graph in the calculator',
    preloadNote:
      'The link preloads these exact expressions into the calculator — no typing needed.',
    noticeHeading: 'What to notice',
  },
};
