/**
 * Deutsche Beispiele-Wörterliste — die Übersichtsseite `/examples/` und die
 * gemeinsamen `[slug]`-Vorlagenlabels.
 *
 * Inhalte pro Beispiel (Titel, Geschichte, Ausdrücke, Erkenntnisse) bleiben in
 * `src/data/seo/examples.ts` (NICHT durch dieses Fundament übersetzt).
 * Ausdruckslabels werden aus DO-NOT-TRANSLATE-Ausdruckssyntax abgeleitet.
 */

import type { ExamplesStrings } from '../types.js';

export const examples: ExamplesStrings = {
  seo: {
    title: 'Graph-Beispiele — Kuratierte interaktive Graphen | Graphing Calculator',
    description:
      'Kuratierte Graph-Beispiele entdecken — Wurfparabeln, gedämpfte Schwingungen, logistisches ' +
      'Wachstum, Lissajous-Kurven und mehr — jedes öffnet sich vorausgefüllt im Rechner.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: 'Beispiele', href: '/examples/' },
  ],
  heading: 'Graph-Beispiele',
  intro:
    'Handverlesene Graphen, die zeigen, was der Rechner kann — von Physik und ' +
    'Ingenieurwesen bis zur reinen mathematischen Schönheit. Jedes Beispiel öffnet sich ' +
    'vorausgefüllt im Rechner, mit Hinweisen, worauf Sie achten sollten.',
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/calculators/'],
  template: {
    eyebrow: 'Ausgearbeitetes Beispiel',
    plottedHeading: 'Gezeichnete Ausdrücke',
    openCta: 'Diesen Graphen im Rechner öffnen',
    preloadNote: 'Der Link lädt genau diese Ausdrücke in den Rechner — Eintippen ist nicht nötig.',
    noticeHeading: 'Worauf Sie achten sollten',
  },
};
