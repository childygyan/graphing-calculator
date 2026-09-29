/**
 * English desmos-alternative dictionary — the `/desmos-alternative/` page prose.
 *
 * Legal constraints (from the page source, do not weaken): "Desmos" appears
 * only in nominative, comparative use; about Desmos state only publicly
 * well-known facts; no reviews, ratings, statistics, or user counts.
 */

import type { DesmosAltStrings } from '../types.js';

export const desmosAlt: DesmosAltStrings = {
  seo: {
    title: 'Best Desmos Alternative — Free Online Graphing Calculator | Graphing Calculator',
    description:
      'Looking for a Desmos alternative? Graphing Calculator is a free, independent online ' +
      'graphing calculator with 2D/3D graphing, AI help, and analysis tools.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Desmos Alternative', href: '/desmos-alternative/' },
  ],
  heading: 'Best Desmos Alternative — Free Online Graphing Calculator',
  asideAriaLabel: 'Independence notice',
  disclaimer:
    'Independent product. Graphing Calculator is not affiliated with, endorsed by, or ' +
    'connected to Desmos or Amplify. \u201cDesmos\u201d is used on this page only to describe ' +
    'what this site is an alternative to.',
  sections: [
    {
      heading: 'Desmos vs. Graphing Calculator',
      body: [
        'Many people search the web for a Desmos calculator when they need to plot a function ' +
          'quickly. If you are one of them, Graphing Calculator is a free, independent ' +
          'alternative you can use right now — no sign-up, no download, no account.',
        'A side-by-side look at the basics. About Desmos, this table states only publicly ' +
          'well-known facts — nothing guessed or unverified.',
      ],
    },
    {
      heading: 'What you get with Graphing Calculator',
      body: [
        'The 2D graphing calculator plots functions instantly as you type, with ' +
          'zoom-toward-cursor, panning, and touch support. Add sliders to explore parameters ' +
          'live, switch to parametric or polar mode, or shade inequalities — all in the same view.',
        'For three dimensions, the 3D surface plotter renders z = f(x, y) with orbit ' +
          'controls, zoom, resolution control, and preset surfaces, compiled by the site\u2019s ' +
          'own math engine.',
        'Built-in analysis finds roots, intersections, derivatives, integrals, limits, and ' +
          'extrema, and draws tangent and normal lines directly on the graph. The standalone ' +
          'math calculators cover the same operations step by step, and the learn guides explain ' +
          'the ideas behind them.',
        'An AI math assistant is built in to explain concepts and help set up graphs. Until ' +
          'the site owner configures an API key it runs in a clearly labeled mock mode — the ' +
          'calculator itself, never the AI, is the source of truth for results.',
        'Every graph can be shared as a link that reopens the exact same view, with no ' +
          'account needed on either end. And there is nothing to agree to beyond the basics: ' +
          'no accounts, no cookies, no third-party trackers.',
      ],
      links: [
        { label: '2D graphing calculator', href: '/graphing-calculator/' },
        { label: '3D surface plotter', href: '/3d/' },
        { label: 'math calculators', href: '/calculators/' },
        { label: 'learn guides', href: '/learn/' },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is this affiliated with Desmos?',
      answer:
        'No. Graphing Calculator is an independent product. It is not affiliated with, ' +
        'endorsed by, or connected to Desmos or Amplify. The name \u201cDesmos\u201d appears on ' +
        'this page only to describe what this site is an alternative to.',
    },
    {
      question: 'Is Graphing Calculator free?',
      answer:
        'Yes. Graphing Calculator is free to use, and there is no sign-up — the site has no ' +
        'accounts at all.',
    },
    {
      question: 'Do I need an account to save or share graphs?',
      answer:
        'No. There are no accounts to create. You can turn any graph into a shareable link ' +
        'that reopens the exact same view, and anyone who opens the link needs no account either.',
    },
    {
      question: 'Can I plot 3D graphs?',
      answer:
        'Yes. Graphing Calculator includes an interactive 3D surface plotter for functions ' +
        'of the form z = f(x, y), with orbit controls, zoom, resolution control, and preset ' +
        'surfaces.',
    },
    {
      question: 'Does it have an AI assistant?',
      answer:
        'Yes. The built-in AI math assistant can explain concepts and help you set up ' +
        'graphs. Until the site owner configures an API key it runs in a clearly labeled mock ' +
        'mode, and the calculator itself — not the AI — is always the source of truth for results.',
    },
    {
      question: 'What analysis tools are included?',
      answer:
        'Roots, intersections, derivatives, integrals, limits, extrema, and tangent/normal ' +
        'lines — all computed by the site\u2019s own math engine and drawn directly on the graph.',
    },
  ],
  table: {
    caption: 'Comparison of the basics: Desmos vs. Graphing Calculator',
    headers: ['Feature', 'Desmos', 'Graphing Calculator'],
    rows: [
      { feature: 'Price', ours: 'Free to use', theirs: 'Free to use' },
      {
        feature: 'Sign-up required?',
        ours: 'No — the site has no accounts at all',
        theirs: 'No — basic graphing works without an account',
      },
      {
        feature: '2D graphing',
        ours: 'Yes — with sliders, parametric and polar modes, and inequalities',
        theirs: 'Yes',
      },
    ],
  },
  related: ['/graphing-calculator/', '/calculators/', '/learn/'],
};
