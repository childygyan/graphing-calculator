/**
 * English learn dictionary — the `/learn/` index prose and the shared
 * `[slug]` article template labels.
 *
 * Per-article content (title, sections, faqs, keyTakeaways) stays in
 * `src/data/seo/learn.ts` (NOT translated by this foundation). Slugs,
 * expressions, `tryExpressions`, and `reviewedOn` dates are
 * DO-NOT-TRANSLATE; the month-name arrays exist so locale formatters can
 * render those dates in other locales later.
 */

import type { LearnStrings } from '../types.js';

export const learn: LearnStrings = {
  seo: {
    title: 'Learn Graphing — Functions, Derivatives, Integrals & More | Graphing Calculator',
    description:
      'Learn graphing concepts step by step: functions, derivatives, integrals, asymptotes, ' +
      'inequalities, and parametric equations — with examples to try.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn/' },
  ],
  heading: 'Learn Graphing',
  intro:
    'Short, practical guides to the ideas behind the graphs — written to be read alongside ' +
    'the calculator, with expressions you can try yourself.',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/calculators/'],
  template: {
    minReadTemplate: 'Learn · {minutes} min read',
    reviewAriaLabel: 'Review information',
    reviewLine: 'Reviewed for mathematical accuracy by the Graphing Calculator team',
    lastReviewedTemplate: 'Last reviewed: {date}',
    indexCardReviewTemplate: 'Reviewed for accuracy · {date}',
    tryHeading: 'Try it in the calculator',
    tryIntroTemplate: 'Type any of these into the {link} to see the ideas above in action:',
    calculatorLinkText: 'graphing calculator',
    takeawaysHeading: 'Key takeaways',
  },
};
