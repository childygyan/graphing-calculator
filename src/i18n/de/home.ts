/**
 * Deutsche Startseiten-Wörterliste — die Marketing-Startseite
 * (`src/pages/index.astro`).
 */

import type { HomeStrings } from '../types.js';

export const home: HomeStrings = {
  seo: {
    title: 'Grafikrechner online kostenlos | Graphing Calculator',
    description:
      'Kostenloser Online-Grafikrechner: Funktionen zeichnen, Nullstellen, Ableitungen und ' +
      'Integrale analysieren, mit Schiebereglern erkunden und KI-Mathehilfe erhalten. Keine Registrierung nötig.',
  },
  hero: {
    title: 'Grafikrechner',
    subtitle:
      'Mathematische Funktionen direkt im Browser zeichnen — schnell, barrierefrei und kostenlos. ' +
      'Ausdrücke plotten, mit echten numerischen Verfahren analysieren und den KI-Assistenten ' +
      'um Hilfe bitten. Keine Registrierung, kein Download.',
    primaryCta: 'Grafikrechner öffnen',
    secondaryCta: 'Graphen lernen',
  },
  features: {
    ariaLabel: 'Funktionen',
    cards: [
      {
        title: 'Interaktives Zeichnen',
        description: 'Zoomen, Verschieben und Erkunden',
        body:
          'Ein schneller Canvas-Graph mit adaptiven Rasterlinien, butterweichem Zoom zum Cursor, ' +
          'Verschieben und Touch-Unterstützung. Kartesische Funktionen, parametrische Kurven, ' +
          'Polargleichungen und Ungleichungen zeichnen — jeder Ausdruck mit eigener Farbe und Sichtbarkeitsumschalter.',
        cta: 'Rechner öffnen',
        href: '/graphing-calculator/',
      },
      {
        title: 'Echte mathematische Analyse',
        description: 'Nullstellen, Ableitungen, Integrale',
        body:
          'Nullstellen mit dem Brent-Verfahren finden, Ableitungen und bestimmte Integrale ' +
          'numerisch berechnen, Wertetabellen inspizieren und Tangenten zeichnen — alles mit derselben ' +
          'Engine, ehrlich gemeldet, wenn ein Ergebnis nicht berechnet werden kann.',
        cta: 'Mathe-Tools ausprobieren',
        href: '/calculators/',
      },
      {
        title: 'KI-Matheassistent',
        description: 'In einfacher Sprache fragen',
        body:
          'Fragen in einfacher Sprache stellen — der Assistent übersetzt sie in Rechnerbefehle, ' +
          'zeichnet, was Sie verlangen, und erklärt Schritt für Schritt. Die Rechen-Engine rechnet ' +
          'immer selbst; die KI erfindet niemals Ergebnisse.',
        cta: 'Assistenten fragen',
        href: '/graphing-calculator/',
      },
      {
        title: 'Variablen, Schieberegler & Teilen',
        description: 'Erkunden und teilen',
        body:
          'Variablen definieren, mit Schiebereglern animieren, benannte Graphen in Ihrem Browser ' +
          'speichern und Graphen als kompakte Links teilen. Ihr Arbeitsbereich bleibt zwischen ' +
          'Besuchen erhalten — alles bleibt auf Ihrem Gerät.',
        cta: 'Beispielgraphen ansehen',
        href: '/examples/',
      },
    ],
  },
  explore: {
    ariaLabel: 'Entdecken',
    heading: 'Die Mathematik erkunden',
    cards: [
      {
        title: 'Funktionsbibliothek',
        body: 'Sinus, Parabeln, Exponentialfunktionen und mehr — jeweils mit berechneten Eigenschaften.',
        href: '/math-functions/',
      },
      {
        title: 'Beispielgraphen',
        body: 'Kuratierte Graphen, die sich vorausgefüllt im Rechner öffnen, mit Erläuterungen.',
        href: '/examples/',
      },
      {
        title: 'Graphen lernen',
        body: 'Kurze Anleitungen zu Funktionen, Ableitungen, Integralen und Asymptoten.',
        href: '/learn/',
      },
    ],
  },
};
