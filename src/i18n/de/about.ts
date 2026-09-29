/**
 * Deutsche Über-uns-Wörterliste — die Seite `/about/`.
 *
 * Creator-Links sind nominative Identifikatoren (exakte URLs von der Seite);
 * sie sind DO-NOT-TRANSLATE — nur die Linklabels und der umgebende Text sind
 * Wörterbuch-Texte.
 */

import type { AboutStrings } from '../types.js';

export const about: AboutStrings = {
  seo: {
    title: 'Über uns',
    description:
      'Was der Graphing Calculator ist: Funktionen, wie die Rechen-Engine funktioniert und wie Ihre ' +
      'Daten behandelt werden.',
  },
  crumbs: [{ label: 'Startseite', href: '/' }],
  heading: 'Über uns',
  intro: [
    'Der Graphing Calculator ist ein eigenständiges, browserbasiertes Mathe-Tool zum Zeichnen von ' +
      'Funktionen und Erkunden von Mathematik. Es ist eine unabhängige Implementierung — von Grund ' +
      'auf gebaut, nicht von einem anderen Graphenprodukt abgeleitet.',
    'Was es heute kann: kartesische Funktionen, parametrische Kurven, Polargleichungen und ' +
      'Ungleichungen auf einem interaktiven Canvas-Graphen mit Zoom, Verschieben und ' +
      'Touch-Unterstützung zeichnen; Ausdrücke mit echten numerischen Verfahren analysieren ' +
      '(Nullstellen per Brent-Verfahren, Ableitungen per zentralen Differenzen, Integrale per ' +
      'adaptiver Simpson-Regel, Tabellen, Tangenten); Parameter mit Variablen und Schiebereglern ' +
      'animieren; einfache Hilfe von einem KI-Assistenten erhalten, der Rechnerbefehle erteilt, ' +
      'während die Rechen-Engine selbst rechnet; und Graphenzustände speichern, teilen, importieren und exportieren.',
  ],
  creator: {
    heading: 'Über den Ersteller',
    imageAlt: 'Firoz Khan, Ersteller des Graphing Calculator',
    name: 'Firoz Khan',
    body: 'Graphing Calculator wird von Firoz Khan gebaut und gepflegt. Vernetzen Sie sich hier mit ihm:',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/firoz-khan-1153358a/' },
      { label: 'GitHub', href: 'https://github.com/fkdigitalmedia' },
      { label: 'Instagram', href: 'https://www.instagram.com/rtibyfiroz/' },
    ],
  },
  sections: [
    {
      heading: 'Wie Ihre Daten behandelt werden',
      body: [
        'Alles läuft auf Ihrem Gerät. Gespeicherte Graphen liegen im lokalen Speicher Ihres Browsers; ' +
          'Freigabelinks kodieren den Graphenzustand in der URL selbst. Es gibt keine Konten, keine ' +
          'standardmäßig aktivierten Tracking-Analysen und keine persönlichen Daten, die der Rechner an ' +
          'einen Server sendet. KI-Assistenten-Anfragen gehen nur dann an den konfigurierten KI-Anbieter, ' +
          'wenn Sie den Assistenten nutzen.',
      ],
    },
    {
      heading: 'Ehrlichkeit bei Ergebnissen',
      body: [
        'Numerische Verfahren sind Näherungen, und der Rechner sagt das, wo es darauf ankommt: ' +
          'Wenn eine Nullstelle, Ableitung oder ein Integral nicht berechnet werden kann — eine Ecke, ' +
          'ein Sprung, eine Singularität — meldet das Tool das ehrlich, statt eine irreführende Zahl zurückzugeben.',
      ],
    },
    {
      heading: 'Wie wir Inhalte prüfen',
      body: [
        'Jede Anleitung auf dieser Seite wird vor der Veröffentlichung auf mathematische ' +
          'Richtigkeit geprüft. Die mathematischen Fakten in jeder Anleitung — Nullstellen, ' +
          'Definitionsbereiche, Beispielwerte — werden gegen die eigene Ausdrucks-Engine der Seite ' +
          'verifiziert, denselben Code, der den Rechner antreibt, sodass das, was Sie lesen, mit dem ' +
          'übereinstimmt, was das Tool berechnet.',
        'Ein menschlicher Prüfer aus dem Team des Graphing Calculator liest dann jede Anleitung ' +
          'auf Klarheit und Richtigkeit. Wenn ein Fehler gefunden wird — ein falsches Vorzeichen, ein ' +
          'irreführendes Beispiel, ein Schritt, der zu viel überspringt — wird er korrigiert, bevor die ' +
          'Anleitung live geht, und die Anleitung trägt ein Datum „Zuletzt überprüft“, damit Sie sehen ' +
          'können, wann diese Prüfung stattfand.',
      ],
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
};
