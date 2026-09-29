/**
 * Deutsche Lern-Wörterliste — die Übersichtsseite `/learn/` und die
 * gemeinsamen `[slug]`-Artikelvorlagenlabels.
 *
 * Inhalte pro Artikel (Titel, Abschnitte, FAQs, Erkenntnisse) bleiben in
 * `src/data/seo/learn.ts` (NICHT durch dieses Fundament übersetzt). Slugs,
 * Ausdrücke, `tryExpressions` und `reviewedOn`-Daten sind DO-NOT-TRANSLATE;
 * die Monatsnamen-Arrays existieren, damit Locale-Formatierer diese Daten
 * später in anderen Locales rendern können.
 */

import type { LearnStrings } from '../types.js';

export const learn: LearnStrings = {
  seo: {
    title: 'Graphen lernen — Funktionen, Ableitungen, Integrale & mehr | Graphing Calculator',
    description:
      'Graphen-Konzepte Schritt für Schritt lernen: Funktionen, Ableitungen, Integrale, Asymptoten, ' +
      'Ungleichungen und parametrische Gleichungen — mit Beispielen zum Ausprobieren.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: 'Lernen', href: '/learn/' },
  ],
  heading: 'Graphen lernen',
  intro:
    'Kurze, praxisnahe Anleitungen zu den Ideen hinter den Graphen — geschrieben zum Lesen ' +
    'neben dem Rechner, mit Ausdrücken, die Sie selbst ausprobieren können.',
  months: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/calculators/'],
  template: {
    minReadTemplate: 'Lernen · {minutes} Min. Lesezeit',
    reviewAriaLabel: 'Informationen zur Überprüfung',
    reviewLine: 'Vom Team des Graphing Calculator auf mathematische Richtigkeit geprüft',
    lastReviewedTemplate: 'Zuletzt überprüft: {date}',
    indexCardReviewTemplate: 'Auf Richtigkeit geprüft · {date}',
    tryHeading: 'Im Rechner ausprobieren',
    tryIntroTemplate:
      'Geben Sie einen dieser Ausdrücke in den {link} ein, um die Ideen oben in Aktion zu sehen:',
    calculatorLinkText: 'Grafikrechner',
    takeawaysHeading: 'Wichtigste Erkenntnisse',
  },
};
