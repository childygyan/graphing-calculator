/**
 * English functions dictionary — the `/math-functions/` index prose and the
 * shared `[slug]` template labels.
 *
 * Per-function content (displayName, notation, tagline, intro, keyFacts,
 * sections, faqs) stays in `src/data/seo/functions.ts` (NOT translated by
 * this foundation): it must not be invented or moved. Slugs, expressions,
 * notation, and computed math labels are DO-NOT-TRANSLATE. Only the page
 * shell and template labels are dictionary-driven here.
 */

import type { FunctionsStrings } from '../types.js';

export const functions: FunctionsStrings = {
  seo: {
    title: 'Function Library — Graph & Explore Common Functions | Graphing Calculator',
    description:
      'Browse the function library: sine, cosine, quadratics, exponentials, logarithms and ' +
      'more — each with computed roots, extrema, and key properties.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Function Library', href: '/math-functions/' },
  ],
  heading: 'Function Library',
  intro:
    'Each page below covers one notable function in depth: what it is, its key mathematical ' +
    'properties, where it shows up — plus a panel of properties computed live by the ' +
    'calculator\u2019s own math engine (roots, extrema, intercepts, derivatives, and integrals).',
  related: ['/graphing-calculator/', '/learn/', '/examples/', '/calculators/'],
  template: {
    eyebrow: 'Function library',
    computedHeading: 'Computed properties',
    computedNoteTemplate:
      'Calculated by the graphing calculator\u2019s own math engine at build time for {expression}.',
    rootsLabel: 'Roots in [−10, 10]',
    yInterceptLabel: 'y-intercept f(0)',
    extremaLabel: 'Local extrema in [−10, 10]',
    samplesLabel: 'Sample values',
    derivativeLabel: 'Derivative f′(1)',
    integralLabel: 'Integral ∫₀¹ f(x) dx',
    noneFound: 'none found',
    moreTemplate: '…and {count} more',
    computeFailed: 'Properties could not be computed for this expression.',
    keyFactsHeading: 'Key facts',
    ctaTemplate: 'Graph {notation} in the calculator',
    undefinedValue: 'undefined',
    slugTitleTemplate: '{displayName} — Graph & Properties',
  },
};
