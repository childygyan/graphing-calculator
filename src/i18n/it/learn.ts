/**
 * Dizionario italiano learn — la pagina indice `/learn/` e le etichette
 * condivise del template `[slug]` degli articoli.
 *
 * Il contenuto per articolo (title, sections, faqs, keyTakeaways) resta in
 * `src/data/seo/it/learn.ts`. Slug, espressioni, `tryExpressions` e date
 * `reviewedOn` NON si traducono; gli array dei nomi dei mesi servono al
 * formatter per renderizzare quelle date in italiano.
 */

import type { LearnStrings } from '../types.js';

export const learn: LearnStrings = {
  seo: {
    title:
      'Impara a tracciare grafici — Funzioni, derivate, integrali e altro | Graphing Calculator',
    description:
      'Impara i concetti dei grafici passo passo: funzioni, derivate, integrali, asintoti, ' +
      'disequazioni ed equazioni parametriche — con esempi da provare.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Impara', href: '/learn/' },
  ],
  heading: 'Impara a tracciare grafici',
  intro:
    'Guide brevi e pratiche alle idee dietro i grafici — scritte per essere lette insieme ' +
    'alla calcolatrice, con espressioni che puoi provare tu stesso.',
  months: [
    'gennaio',
    'febbraio',
    'marzo',
    'aprile',
    'maggio',
    'giugno',
    'luglio',
    'agosto',
    'settembre',
    'ottobre',
    'novembre',
    'dicembre',
  ],
  shortMonths: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/calculators/'],
  template: {
    minReadTemplate: 'Impara · {minutes} min di lettura',
    reviewAriaLabel: 'Informazioni sulla revisione',
    reviewLine: 'Revisionato per accuratezza matematica dal team di Graphing Calculator',
    lastReviewedTemplate: 'Ultima revisione: {date}',
    indexCardReviewTemplate: 'Revisionato per accuratezza · {date}',
    tryHeading: 'Provalo nella calcolatrice',
    tryIntroTemplate: 'Digita una di queste nella {link} per vedere in azione le idee qui sopra:',
    calculatorLinkText: 'calcolatrice grafica',
    takeawaysHeading: 'Punti chiave',
  },
};
