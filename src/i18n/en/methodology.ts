/**
 * English methodology dictionary — the `/methodology/` page prose.
 *
 * Inline anchors are listed per-section in `links`; the label text appears
 * in the body at the same position. Hrefs stay constant (they are
 * re-localized at render time by the page builders).
 */

import type { MethodologyStrings } from '../types.js';

export const methodology: MethodologyStrings = {
  seo: {
    title: 'Methodology — How Our Math and Content Are Verified | Graphing Calculator',
    description:
      'How Graphing Calculator verifies its math and content: a deterministic engine, ' +
      'hundreds of automated tests, engine-checked examples, and dated reviews.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Methodology', href: '/methodology/' },
  ],
  heading: 'Our Methodology',
  sections: [
    {
      heading: '1. How calculations are computed and verified',
      body: [
        'A calculator is only useful if you can trust what it tells you. This page documents ' +
          'exactly how Graphing Calculator computes results, how its educational content is ' +
          'written and checked, and what we deliberately do not do.',
        'Every number on this site comes from a deterministic math engine written specifically ' +
          'for it. An expression you type is tokenized, parsed into an abstract syntax tree, and ' +
          'compiled into executable closures — it is never passed through eval or generated code. ' +
          'Roots are found with Brent\u2019s method, derivatives with central differences, ' +
          'integrals with adaptive Simpson\u2019s rule, and limits with two-sided numerical estimation.',
        'Over 550 automated tests cover the expression engine, the numerical methods, graph ' +
          'state, the 3D plotter, and the scientific calculator. They run before every release, and ' +
          'a release does not ship unless all of them pass. When a computation cannot be performed ' +
          'reliably — a discontinuity, a non-converging integral, an out-of-domain evaluation — ' +
          'the tool reports the failure honestly instead of inventing a number.',
      ],
      links: [{ label: 'Graphing Calculator', href: '/graphing-calculator/' }],
    },
    {
      heading: '2. How educational content is written and reviewed',
      body: [
        'The learn guides teach graphing from the ground up: what functions are, how domains ' +
          'and ranges work, how to read intercepts and asymptotes, and how to use each tool on ' +
          'this site. Every guide is written from standard mathematics curriculum material, not ' +
          'scraped or spun from other websites.',
        'Before a guide is published, its mathematical claims are verified against the ' +
          'site\u2019s own expression engine — the roots, example values, and domains stated in ' +
          'the text must match what the calculator itself computes. A human reviewer on the ' +
          'Graphing Calculator team then reads the guide for clarity and correctness. Each guide ' +
          'carries a \u201cLast reviewed\u201d date and a byline naming the reviewer, so you can ' +
          'see exactly when the check happened.',
      ],
      links: [{ label: 'learn guides', href: '/learn/' }],
    },
    {
      heading: '3. How the AI assistant is constrained',
      body: [
        'The built-in AI assistant can explain concepts, suggest expressions to plot, and help ' +
          'you set up graphs. It operates through a strict command schema: it may only issue ' +
          'calculator commands, and the calculator\u2019s engine — not the AI — performs every ' +
          'computation. The assistant cannot change what the engine computes, and it cannot ' +
          'access your saved graphs.',
        'Until the site owner configures an AI provider key, the assistant runs in a clearly ' +
          'labeled mock mode that says so on screen. It never pretends to be connected to a ' +
          'live model when it is not.',
      ],
    },
    {
      heading: '4. What we do not do',
      body: [
        'No invented reviewers. We do not publish fake names, photos, or credentials. Review ' +
          'bylines say exactly who reviewed the content — the Graphing Calculator team — and when.',
        'No fabricated statistics. We do not claim user counts, ratings, or \u201cbest\u201d ' +
          'rankings we cannot verify. Comparisons with other products state only publicly ' +
          'well-known facts.',
        'No copied interfaces. The calculator is an independent implementation. It does not ' +
          'reproduce any other product\u2019s branding, interface, or copyrighted material.',
        'No hidden data collection. Graphs are stored in your browser; share links encode ' +
          'state in the URL. There are no accounts. The site does use Google Analytics for ' +
          'aggregate usage statistics. See the privacy policy for details.',
      ],
      links: [{ label: 'privacy policy', href: '/privacy-policy/' }],
    },
    {
      heading: '5. Corrections',
      body: [
        'If you find an error in a calculation or a guide, contact us with the details. ' +
          'Reported errors are investigated against the math engine, corrected when confirmed, ' +
          'and the guide\u2019s \u201cLast reviewed\u201d date is updated to reflect the fix.',
      ],
      links: [{ label: 'contact us', href: '/contact/' }],
    },
  ],
  faqs: [
    {
      question: 'How are calculations verified?',
      answer:
        'Every result comes from a deterministic math engine built into the site — ' +
        'expressions are tokenized, parsed into an abstract syntax tree, and compiled to ' +
        'closures, never eval\u2019d. Over 550 automated tests cover the engine, analysis ' +
        'methods, and UI, and they run before every release.',
    },
    {
      question: 'Does the AI assistant do the math?',
      answer:
        'No. The AI assistant explains concepts and issues calculator commands, but the ' +
        'calculator\u2019s own engine is always the source of truth for results. Until the ' +
        'site owner configures an API key, the assistant runs in a clearly labeled mock mode.',
    },
    {
      question: 'How are the learn guides reviewed?',
      answer:
        'Every guide is checked for mathematical accuracy before publication: the roots, ' +
        'domains, and example values it states are verified against the site\u2019s own ' +
        'expression engine. A human reviewer on the Graphing Calculator team then reads each ' +
        'guide for clarity and correctness, and the guide carries a \u201cLast reviewed\u201d ' +
        'date showing when that check happened.',
    },
    {
      question: 'Who reviews the content?',
      answer:
        'Content is reviewed by the Graphing Calculator team — the people who build and ' +
        'maintain this site. We do not invent reviewer names, photos, or credentials; the ' +
        'byline on every guide says exactly who reviewed it and when.',
    },
    {
      question: 'What happens when an error is found?',
      answer:
        'It is corrected, and the guide\u2019s \u201cLast reviewed\u201d date is updated. If ' +
        'you spot a mistake, you can report it through the contact page and it will be ' +
        'investigated against the math engine.',
    },
    {
      question: 'Is numerical output exact?',
      answer:
        'Numerical methods are approximations, and the calculator says so where it matters. ' +
        'When a root, derivative, or integral cannot be computed — a corner, a jump, a ' +
        'singularity — the tool reports that honestly instead of returning a misleading number.',
    },
  ],
  related: ['/about/', '/learn/', '/graphing-calculator/', '/desmos-alternative/'],
};
