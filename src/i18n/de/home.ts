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
  tutorial: {
    ariaLabel: 'Anleitung',
    heading: 'So benutzt du den Grafikrechner',
    lede:
      'Fünf Schritte mit dem Rechner oben. Jeder Screenshot ist eine echte Aufnahme dieses ' +
      'Rechners — keine Mockups.',
    steps: [
      {
        title: 'Gib deinen ersten Ausdruck ein',
        body:
          'Klicke in den Bereich Ausdrücke und gib x^2 ein. Die Parabel wird sofort beim ' +
          'Tippen gezeichnet — nichts zu installieren, kein Konto nötig.',
        image: '/images/tutorial/step-1-first-expression.png',
        alt: 'Grafikrechner mit der Parabel y = x Quadrat',
      },
      {
        title: 'Zwei Kurven vergleichen',
        body:
          'Klicke auf Hinzufügen und gib sin(x) ein. Jeder Ausdruck erhält eine eigene ' +
          'Farbe, und das Augensymbol blendet jede Kurve ein oder aus — so lassen sich ' +
          'Formen direkt vergleichen.',
        image: '/images/tutorial/step-2-compare-curves.png',
        alt: 'Grafikrechner vergleicht die Parabel y = x Quadrat mit einer Sinuskurve',
      },
      {
        title: 'Zoomen und Verschieben',
        body:
          'Scrolle, um auf den Cursor zu zoomen, und ziehe, um die Ansicht zu verschieben. ' +
          'Beim Heranzoomen an den Scheitelpunkt von x^2 sieht man, wie die Kurve bei ' +
          '(0, 0) flach wird.',
        image: '/images/tutorial/step-3-zoom-in.png',
        alt: 'Herangezoomte Ansicht der Parabel y = x Quadrat um ihren Scheitelpunkt bei (0, 0)',
      },
      {
        title: 'Nullstellen finden',
        body:
          'Bei x^2 - 4 erscheinen die Nullstellen als Markierungen direkt auf dem Graphen ' +
          '— bei x = -2 und x = 2. Der Bereich Analyse findet Nullstellen, Ableitungen, ' +
          'Integrale und mehr für jeden Ausdruck.',
        image: '/images/tutorial/step-4-roots.png',
        alt: 'Graph von y = x Quadrat minus 4 mit Nullstellenmarkierungen bei x = -2 und x = 2',
      },
      {
        title: 'Eine Tangente zeichnen',
        body:
          'Wähle einen Punkt auf einer Kurve — hier x = 1 auf x^2 — und die Tangente ' +
          'erscheint bei (1, 1), mit einer vom Mathematik-Engine berechneten Steigung.',
        image: '/images/tutorial/step-5-tangent.png',
        alt: 'Graph von y = x Quadrat mit einer Tangente bei x = 1',
      },
    ],
  },
};
