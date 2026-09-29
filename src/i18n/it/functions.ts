/**
 * Dizionario italiano functions — la pagina indice `/math-functions/` e le
 * etichette condivise del template `[slug]`.
 *
 * Il contenuto per funzione (displayName, notation, tagline, intro, keyFacts,
 * sections, faqs) resta in `src/data/seo/it/functions.ts`. Slug, espressioni,
 * notazione ed etichette matematiche calcolate NON si traducono.
 */

import type { FunctionsStrings } from '../types.js';

export const functions: FunctionsStrings = {
  seo: {
    title: 'Libreria di funzioni — Grafico ed esplora le funzioni comuni | Graphing Calculator',
    description:
      'Sfoglia la libreria di funzioni: seno, coseno, quadratiche, esponenziali, logaritmi e ' +
      'altro — ciascuna con radici, estremi e propriet\u00e0 chiave calcolati.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Libreria di funzioni', href: '/math-functions/' },
  ],
  heading: 'Libreria di funzioni',
  intro:
    'Ogni pagina qui sotto tratta in profondit\u00e0 una funzione notevole: cos\u2019\u00e8, le sue propriet\u00e0 ' +
    'matematiche chiave, dove compare — pi\u00f9 un pannello di propriet\u00e0 calcolate dal vivo dal ' +
    'motore matematico della calcolatrice (radici, estremi, intercette, derivate e integrali).',
  related: ['/graphing-calculator/', '/learn/', '/examples/', '/calculators/'],
  template: {
    eyebrow: 'Libreria di funzioni',
    computedHeading: 'Propriet\u00e0 calcolate',
    computedNoteTemplate:
      'Calcolate dal motore matematico della calcolatrice grafica al momento della build per {expression}.',
    rootsLabel: 'Radici in [−10, 10]',
    yInterceptLabel: 'Intercetta y f(0)',
    extremaLabel: 'Estremi locali in [−10, 10]',
    samplesLabel: 'Valori campione',
    derivativeLabel: 'Derivata f′(1)',
    integralLabel: 'Integrale ∫₀¹ f(x) dx',
    noneFound: 'nessuna trovata',
    moreTemplate: '…e altre {count}',
    computeFailed: 'Impossibile calcolare le propriet\u00e0 per questa espressione.',
    keyFactsHeading: 'Fatti chiave',
    ctaTemplate: 'Traccia {notation} nella calcolatrice',
    undefinedValue: 'non definito',
    slugTitleTemplate: '{displayName} — Grafico e proprietà',
  },
};
