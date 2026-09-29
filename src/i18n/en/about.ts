/**
 * English about dictionary — the `/about/` page prose.
 *
 * Creator links are nominative identifiers (exact URLs from the page); they
 * are DO-NOT-TRANSLATE — only the link labels and surrounding copy are
 * dictionary strings.
 */

import type { AboutStrings } from '../types.js';

export const about: AboutStrings = {
  seo: {
    title: 'About',
    description:
      'What the Graphing Calculator is: features, how the math engine works, and how your ' +
      'data is handled.',
  },
  crumbs: [{ label: 'Home', href: '/' }],
  heading: 'About',
  intro: [
    'The Graphing Calculator is an original, browser-based math tool for graphing functions ' +
      'and exploring mathematics. It is an independent implementation — built from scratch, ' +
      'not derived from any other graphing product.',
    'What it does today: plot Cartesian functions, parametric curves, polar equations, and ' +
      'inequalities on an interactive canvas graph with zoom, pan, and touch support; analyze ' +
      'expressions with real numerical methods (roots via Brent\u2019s method, derivatives via ' +
      'central differences, integrals via adaptive Simpson\u2019s rule, tables, tangent lines); ' +
      'animate parameters with variables and sliders; get plain-English help from an AI ' +
      'assistant that issues calculator commands while the math engine does the actual ' +
      'computing; and save, share, import, and export graph states.',
  ],
  creator: {
    heading: 'About the creator',
    imageAlt: 'Firoz Khan, creator of Graphing Calculator',
    name: 'Firoz Khan',
    body: 'Graphing Calculator is built and maintained by Firoz Khan. Connect with him here:',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/firoz-khan-1153358a/' },
      { label: 'GitHub', href: 'https://github.com/fkdigitalmedia' },
      { label: 'Instagram', href: 'https://www.instagram.com/rtibyfiroz/' },
    ],
  },
  sections: [
    {
      heading: 'How your data is handled',
      body: [
        'Everything runs on your device. Graphs you save are stored in your browser\u2019s ' +
          'local storage; share links encode the graph state in the URL itself. There are no ' +
          'accounts, no tracking analytics enabled by default, and no personal data sent to a ' +
          'server by the calculator. AI assistant requests go to the configured AI provider ' +
          'only when you use the assistant.',
      ],
    },
    {
      heading: 'Honesty about results',
      body: [
        'Numerical methods are approximations, and the calculator says so where it matters: ' +
          'when a root, derivative, or integral cannot be computed — a corner, a jump, a ' +
          'singularity — the tool reports that honestly instead of returning a misleading number.',
      ],
    },
    {
      heading: 'How we review content',
      body: [
        'Every guide on this site is checked for mathematical accuracy before it is ' +
          'published. The mathematical facts in each guide — roots, domains, example values — ' +
          'are verified against the site\u2019s own expression engine, the same code that powers ' +
          'the calculator, so what you read matches what the tool computes.',
        'A human reviewer on the Graphing Calculator team then reads each guide for clarity ' +
          'and correctness. When an error is found — a wrong sign, a misleading example, a step ' +
          'that skips too much — it is corrected before the guide goes live, and the guide ' +
          'carries a \u201cLast reviewed\u201d date so you can see when that check happened.',
      ],
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
};
