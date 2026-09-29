/**
 * Dizionario italiano examples — la pagina indice `/examples/` e le
 * etichette condivise del template `[slug]`.
 *
 * Il contenuto per esempio (title, story, expressions, insights) resta in
 * `src/data/seo/it/examples.ts`.
 */

import type { ExamplesStrings } from '../types.js';

export const examples: ExamplesStrings = {
  seo: {
    title: 'Esempi di grafici — Grafici interattivi selezionati | Graphing Calculator',
    description:
      'Esplora esempi di grafici selezionati — moto parabolico, oscillazione smorzata, crescita ' +
      'logistica, curve di Lissajous e altro — ciascuno si apre gi\u00e0 caricato nella calcolatrice.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Esempi di grafici', href: '/examples/' },
  ],
  heading: 'Esempi di grafici',
  intro:
    'Grafici scelti a mano che mostrano cosa sa fare la calcolatrice — dalla fisica e ' +
    'dall\u2019ingegneria alla pura bellezza matematica. Ogni esempio si apre gi\u00e0 caricato nella ' +
    'calcolatrice, con note su cosa osservare.',
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/calculators/'],
  template: {
    eyebrow: 'Esempio svolto',
    plottedHeading: 'Espressioni tracciate',
    openCta: 'Apri questo grafico nella calcolatrice',
    preloadNote:
      'Il link precarica queste esatte espressioni nella calcolatrice — non serve digitare.',
    noticeHeading: 'Cosa notare',
  },
};
