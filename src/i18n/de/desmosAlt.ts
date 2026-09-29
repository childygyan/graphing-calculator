/**
 * Deutsche Desmos-Alternative-Wörterliste — die Seite `/desmos-alternative/`.
 *
 * Rechtliche Vorgaben (aus der Seitenquelle, nicht abschwächen): „Desmos“
 * erscheint nur im nominativen, vergleichenden Gebrauch; über Desmos werden
 * nur öffentlich bekannte Fakten genannt; keine Bewertungen, Rankings,
 * Statistiken oder Nutzerzahlen.
 */

import type { DesmosAltStrings } from '../types.js';

export const desmosAlt: DesmosAltStrings = {
  seo: {
    title: 'Beste Desmos-Alternative — Kostenloser Online-Grafikrechner | Graphing Calculator',
    description:
      'Suchen Sie eine Desmos-Alternative? Der Graphing Calculator ist ein kostenloser, unabhängiger ' +
      'Online-Grafikrechner mit 2D-/3D-Graphen, KI-Hilfe und Analyse-Tools.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: 'Desmos-Alternative', href: '/desmos-alternative/' },
  ],
  heading: 'Beste Desmos-Alternative — Kostenloser Online-Grafikrechner',
  asideAriaLabel: 'Hinweis zur Unabhängigkeit',
  disclaimer:
    'Unabhängiges Produkt. Der Graphing Calculator ist nicht mit Desmos oder Amplify verbunden, ' +
    'wird nicht von ihnen unterstützt und steht in keiner Verbindung zu ihnen. „Desmos“ wird auf ' +
    'dieser Seite nur verwendet, um zu beschreiben, wozu diese Seite eine Alternative ist.',
  sections: [
    {
      heading: 'Desmos vs. Graphing Calculator',
      body: [
        'Viele Menschen suchen im Web nach einem Desmos-Rechner, wenn sie schnell eine Funktion ' +
          'zeichnen müssen. Wenn Sie einer von ihnen sind: Der Graphing Calculator ist eine kostenlose, ' +
          'unabhängige Alternative, die Sie sofort nutzen können — keine Registrierung, kein Download, kein Konto.',
        'Ein direkter Vergleich der Grundlagen. Über Desmos nennt diese Tabelle nur öffentlich ' +
          'bekannte Fakten — nichts Geratenes oder Unverifiziertes.',
      ],
    },
    {
      heading: 'Was Sie mit dem Graphing Calculator erhalten',
      body: [
        'Der 2D-Grafikrechner zeichnet Funktionen sofort beim Tippen, mit ' +
          'Zoom zum Cursor, Verschieben und Touch-Unterstützung. Fügen Sie Schieberegler hinzu, um ' +
          'Parameter live zu erkunden, wechseln Sie in den parametrischen oder polaren Modus oder ' +
          'schattieren Sie Ungleichungen — alles in derselben Ansicht.',
        'Für drei Dimensionen rendert der 3D-Flächenplotter z = f(x, y) mit Orbit-Steuerung, ' +
          'Zoom, Auflösungssteuerung und voreingestellten Flächen, kompiliert von der eigenen ' +
          'Rechen-Engine der Seite.',
        'Die eingebaute Analyse findet Nullstellen, Schnittpunkte, Ableitungen, Integrale, Grenzwerte ' +
          'und Extremstellen und zeichnet Tangenten und Normalen direkt auf den Graphen. Die ' +
          'eigenständigen Mathe-Rechner decken dieselben Operationen Schritt für Schritt ab, und die ' +
          'Lernanleitungen erklären die Ideen dahinter.',
        'Ein KI-Matheassistent ist eingebaut, um Konzepte zu erklären und beim Einrichten von Graphen ' +
          'zu helfen. Bis der Seitenbetreiber einen API-Schlüssel konfiguriert, läuft er in einem klar ' +
          'gekennzeichneten Demo-Modus — der Rechner selbst, niemals die KI, ist die Quelle der ' +
          'Wahrheit für Ergebnisse.',
        'Jeder Graph kann als Link geteilt werden, der exakt dieselbe Ansicht wieder öffnet, ohne ' +
          'dass auf einer Seite ein Konto nötig wäre. Und es gibt nichts zuzustimmen außer den ' +
          'Grundlagen: keine Konten, keine Cookies, keine Drittanbieter-Tracker.',
      ],
      links: [
        { label: 'Der 2D-Grafikrechner', href: '/graphing-calculator/' },
        { label: '3D-Flächenplotter', href: '/3d/' },
        { label: 'eigenständigen Mathe-Rechner', href: '/calculators/' },
        { label: 'Lernanleitungen', href: '/learn/' },
      ],
    },
  ],
  faqs: [
    {
      question: 'Ist das mit Desmos verbunden?',
      answer:
        'Nein. Der Graphing Calculator ist ein unabhängiges Produkt. Er ist nicht mit Desmos ' +
        'oder Amplify verbunden, wird nicht von ihnen unterstützt und steht in keiner Verbindung ' +
        'zu ihnen. Der Name „Desmos“ erscheint auf dieser Seite nur, um zu beschreiben, wozu ' +
        'diese Seite eine Alternative ist.',
    },
    {
      question: 'Ist der Graphing Calculator kostenlos?',
      answer:
        'Ja. Der Graphing Calculator ist kostenlos nutzbar, und es gibt keine Registrierung — ' +
        'die Seite hat überhaupt keine Konten.',
    },
    {
      question: 'Brauche ich ein Konto, um Graphen zu speichern oder zu teilen?',
      answer:
        'Nein. Es gibt keine Konten zu erstellen. Sie können jeden Graphen in einen teilbaren Link ' +
        'verwandeln, der exakt dieselbe Ansicht wieder öffnet, und wer den Link öffnet, braucht ' +
        'ebenfalls kein Konto.',
    },
    {
      question: 'Kann ich 3D-Graphen zeichnen?',
      answer:
        'Ja. Der Graphing Calculator enthält einen interaktiven 3D-Flächenplotter für Funktionen ' +
        'der Form z = f(x, y), mit Orbit-Steuerung, Zoom, Auflösungssteuerung und voreingestellten Flächen.',
    },
    {
      question: 'Gibt es einen KI-Assistenten?',
      answer:
        'Ja. Der eingebaute KI-Matheassistent kann Konzepte erklären und Ihnen beim Einrichten von ' +
        'Graphen helfen. Bis der Seitenbetreiber einen API-Schlüssel konfiguriert, läuft er in einem ' +
        'klar gekennzeichneten Demo-Modus, und der Rechner selbst — nicht die KI — ist immer die ' +
        'Quelle der Wahrheit für Ergebnisse.',
    },
    {
      question: 'Welche Analyse-Tools sind enthalten?',
      answer:
        'Nullstellen, Schnittpunkte, Ableitungen, Integrale, Grenzwerte, Extremstellen und ' +
        'Tangenten-/Normalenlinien — alles von der eigenen Rechen-Engine der Seite berechnet und ' +
        'direkt auf den Graphen gezeichnet.',
    },
  ],
  table: {
    caption: 'Vergleich der Grundlagen: Desmos vs. Graphing Calculator',
    headers: ['Funktion', 'Desmos', 'Graphing Calculator'],
    rows: [
      { feature: 'Preis', ours: 'Kostenlos nutzbar', theirs: 'Kostenlos nutzbar' },
      {
        feature: 'Registrierung erforderlich?',
        ours: 'Nein — die Seite hat überhaupt keine Konten',
        theirs: 'Nein — grundlegendes Zeichnen geht ohne Konto',
      },
      {
        feature: '2D-Graphen',
        ours: 'Ja — mit Schiebereglern, parametrischem und polarem Modus sowie Ungleichungen',
        theirs: 'Ja',
      },
    ],
  },
  related: ['/graphing-calculator/', '/calculators/', '/learn/'],
};
