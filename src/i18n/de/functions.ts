/**
 * Deutsche Funktionen-Wörterliste — die Übersichtsseite `/math-functions/`
 * und die gemeinsamen `[slug]`-Vorlagenlabels.
 *
 * Inhalte pro Funktion (Anzeigename, Notation, Tagline, Intro, Fakten,
 * Abschnitte, FAQs) bleiben in `src/data/seo/functions.ts` (NICHT durch
 * dieses Fundament übersetzt): Sie dürfen weder erfunden noch verschoben
 * werden. Slugs, Ausdrücke, Notation und berechnete Mathe-Labels sind
 * DO-NOT-TRANSLATE. Nur die Seitenschale und die Vorlagenlabels sind hier
 * wörterbuchgesteuert.
 */

import type { FunctionsStrings } from '../types.js';

export const functions: FunctionsStrings = {
  seo: {
    title: 'Funktionsbibliothek — Funktionen zeichnen & erkunden | Graphing Calculator',
    description:
      'Funktionsbibliothek entdecken: Sinus, Kosinus, Parabeln, Exponential- und Logarithmusfunktionen ' +
      'und mehr — jeweils mit berechneten Nullstellen, Extremstellen und Eigenschaften.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: 'Funktionsbibliothek', href: '/math-functions/' },
  ],
  heading: 'Funktionsbibliothek',
  intro:
    'Jede Seite unten behandelt eine bemerkenswerte Funktion im Detail: was sie ist, ihre wichtigsten ' +
    'mathematischen Eigenschaften, wo sie vorkommt — plus Eigenschaften, die live von der eigenen ' +
    'Rechen-Engine des Rechners berechnet werden (Nullstellen, Extremstellen, Achsenabschnitte, Ableitungen und Integrale).',
  related: ['/graphing-calculator/', '/learn/', '/examples/', '/calculators/'],
  template: {
    eyebrow: 'Funktionsbibliothek',
    computedHeading: 'Berechnete Eigenschaften',
    computedNoteTemplate:
      'Zur Build-Zeit von der eigenen Rechen-Engine des Grafikrechners berechnet für {expression}.',
    rootsLabel: 'Nullstellen in [−10, 10]',
    yInterceptLabel: 'y-Achsenabschnitt f(0)',
    extremaLabel: 'Lokale Extremstellen in [−10, 10]',
    samplesLabel: 'Stichprobenwerte',
    derivativeLabel: 'Ableitung f′(1)',
    integralLabel: 'Integral ∫₀¹ f(x) dx',
    noneFound: 'keine gefunden',
    moreTemplate: '…und {count} weitere',
    computeFailed: 'Die Eigenschaften konnten für diesen Ausdruck nicht berechnet werden.',
    keyFactsHeading: 'Wichtige Fakten',
    ctaTemplate: '{notation} im Rechner zeichnen',
    undefinedValue: 'undefiniert',
    slugTitleTemplate: '{displayName} — Graph und Eigenschaften',
  },
};
