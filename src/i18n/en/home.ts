/**
 * English home dictionary — the marketing homepage (`src/pages/index.astro`).
 */

import type { HomeStrings } from '../types.js';

export const home: HomeStrings = {
  seo: {
    title: 'Graphing Calculator — Graph Functions Online Free',
    description:
      'Free online graphing calculator: plot functions, analyze roots, derivatives and ' +
      'integrals, explore with sliders, and get AI math help. No sign-up needed.',
  },
  hero: {
    title: 'Graphing Calculator',
    subtitle:
      'Graph mathematical functions in your browser — fast, accessible, and free. Plot ' +
      'expressions, analyze them with real numerical methods, and ask the AI assistant for ' +
      'help. No sign-up, no download.',
    primaryCta: 'Open Graphing Calculator',
    secondaryCta: 'Learn Graphing',
  },
  features: {
    ariaLabel: 'Features',
    cards: [
      {
        title: 'Interactive graphing',
        description: 'Zoom, pan, and explore',
        body:
          'A fast canvas graph with adaptive gridlines, smooth zoom-to-cursor, panning, and ' +
          'touch support. Plot Cartesian functions, parametric curves, polar equations, and ' +
          'inequalities — each expression with its own color and visibility toggle.',
        cta: 'Open the calculator',
        href: '/graphing-calculator/',
      },
      {
        title: 'Real mathematical analysis',
        description: 'Roots, derivatives, integrals',
        body:
          'Find roots with Brent’s method, compute derivatives and definite integrals ' +
          'numerically, inspect tables of values, and draw tangent lines — all with the same ' +
          'engine, honestly reported when a result can’t be computed.',
        cta: 'Try the math tools',
        href: '/calculators/',
      },
      {
        title: 'AI math assistant',
        description: 'Ask in plain language',
        body:
          'Ask questions in plain English — the assistant translates them into calculator ' +
          'commands, plots what you ask for, and explains step by step. The math engine always ' +
          'does the actual computing; the AI never invents results.',
        cta: 'Ask the assistant',
        href: '/graphing-calculator/',
      },
      {
        title: 'Variables, sliders & sharing',
        description: 'Explore and share',
        body:
          'Define variables, animate them with sliders, save named graphs in your browser, and ' +
          'share graphs as compact links. Your workspace persists between visits — everything ' +
          'stays on your device.',
        cta: 'See example graphs',
        href: '/examples/',
      },
    ],
  },
  explore: {
    ariaLabel: 'Explore',
    heading: 'Explore the mathematics',
    cards: [
      {
        title: 'Function library',
        body: 'Sine, quadratics, exponentials and more — each with computed properties.',
        href: '/math-functions/',
      },
      {
        title: 'Example graphs',
        body: 'Curated graphs that open preloaded in the calculator, with notes.',
        href: '/examples/',
      },
      {
        title: 'Learn graphing',
        body: 'Short guides to functions, derivatives, integrals, and asymptotes.',
        href: '/learn/',
      },
    ],
  },
};
