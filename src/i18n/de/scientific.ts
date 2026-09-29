/**
 * Deutsche Wissenschaftsrechner-Wörterliste — die Seite
 * `/scientific-calculator/` plus die ScientificCalculator-Insel-Texte
 * (derzeit nicht verdrahtet; siehe docs/I18N-CONTRACTS.md).
 *
 * Tasten-`label`s sind das, was der Nutzer auf den Tasten sieht; `ariaLabel`s
 * sind die zugänglichen Namen. Der `insert`-Text, den jede Taste eintippt, ist
 * Ausdruckssyntax und wird bewusst NICHT übersetzt — er lebt bei der Komponente.
 */

import type { ScientificStrings } from '../types.js';

export const scientific: ScientificStrings = {
  seo: {
    title: 'Wissenschaftlicher Rechner online — Kostenlos mit DEG/RAD-Modi | Graphing Calculator',
    description:
      'Kostenloser wissenschaftlicher Online-Rechner: Trigonometrie, Arkusfunktionen, log, ln, ' +
      'Potenzen, Wurzeln, π und e mit DEG/RAD-Modi, Tastaturunterstützung und klaren Fehlermeldungen.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: 'Wissenschaftlicher Rechner', href: '/scientific-calculator/' },
  ],
  heading: 'Wissenschaftlicher Rechner',
  intro: [
    'Ein kostenloser wissenschaftlicher Online-Rechner für alltägliche Mathematik: Arithmetik mit ' +
      'korrekter Punkt-vor-Strich-Regel, trigonometrische und Arkusfunktionen, dekadische und ' +
      'natürliche Logarithmen, Potenzen, Wurzeln sowie die Konstanten π und e. Tippen Sie auf Ihrer ' +
      'Tastatur oder nutzen Sie das Tastenfeld — jede Berechnung läuft in Ihrem Browser über dieselbe ' +
      'Ausdrucks-Engine wie unser Grafikrechner.',
  ],
  sections: [
    {
      heading: 'Was dieser Rechner kann',
      body: [
        'Geben Sie einen beliebigen Ausdruck ein — zum Beispiel sin(30) + √(16), log(1000) oder 2^10 — und drücken Sie =, um ihn auszuwerten. Der Rechner folgt der Standardreihenfolge (Klammern, dann Potenzen, dann Multiplikation und Division, dann Addition und Subtraktion), sodass 2 + 3 × 4 gleich 14 ergibt, nicht 20.',
        'Über die Arithmetik hinaus erhalten Sie das volle wissenschaftliche Set: sin, cos, tan und ihre Umkehrfunktionen asin, acos, atan; log (Basis 10) und ln (natürlicher Logarithmus); xʸ-Potenzen inklusive gebrochener Exponenten; Quadratwurzeln; sowie die Konstanten π und e. Ausdrücke lassen sich beliebig verschachteln, z. B. sin(π/6)^2 + cos(π/6)^2.',
      ],
    },
    {
      heading: 'Grad vs. Bogenmaß (DEG- und RAD-Modi)',
      body: [
        'Winkel können in Grad oder Bogenmaß gemessen werden, und trigonometrische Funktionen liefern je nachdem unterschiedliche Antworten: sin(30°) = 0,5, aber sin(30 Bogenmaß) ≈ −0,988. Der DEG/RAD-Umschalter oben links am Tastenfeld wechselt zwischen beiden, und das Badge über der Anzeige zeigt immer den aktiven Modus.',
        'Im DEG-Modus lesen sin, cos und tan ihre Eingabe als Grad, während asin, acos und atan ihre Ergebnisse in Grad melden — wie bei einem physischen wissenschaftlichen Rechner. Im RAD-Modus arbeitet alles im Bogenmaß, was die meisten Formeln in Analysis und Physik erwarten. Wenn ein Trigonometrie-Ergebnis falsch aussieht, prüfen Sie zuerst den Winkelmodus.',
      ],
    },
    {
      heading: 'Tastaturkürzel',
      body: [
        'Sie müssen das Tastenfeld nie berühren: Klicken Sie in das Ausdrucksfeld und tippen Sie. Ziffern, +, −, (, ), ^ und . funktionieren wie eingetippt; die Eingabe von * fügt × ein und / fügt ÷ ein; Enter oder = wertet aus; Esc löscht alles; die Rücktaste löscht wie gewohnt. Nach einem Ergebnis beginnt die Eingabe einer Ziffer einen neuen Ausdruck, während die Eingabe eines Operators mit der vorherigen Antwort fortfährt.',
      ],
    },
    {
      heading: 'Ehrliche Fehler statt NaN',
      body: [
        'Wenn ein Ausdruck keine sinnvolle Antwort hat, sagt dieser Rechner das in einfacher Sprache, statt NaN oder Infinity anzuzeigen. Division durch null, die Quadratwurzel einer negativen Zahl oder der Logarithmus einer nicht-positiven Zahl erzeugen jeweils eine eigene Erklärung. Unvollständige Ausdrücke erhalten ebenfalls Hinweise: Ein Operator am Ende oder nicht passende Klammern sagen Ihnen genau, was zu korrigieren ist.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Soll ich den DEG- oder den RAD-Modus verwenden?',
      answer:
        'DEG für alltägliche Winkelprobleme (eine 30°-Steigung, ein Dreieck mit Gradwinkeln) ' +
        'und RAD für Analysis, Physikformeln und alles, was π als Winkel involviert. Der Modus ' +
        'betrifft nur sin, cos, tan, asin, acos und atan — alles andere ist identisch.',
    },
    {
      question: 'Was ist der Unterschied zwischen log und ln?',
      answer:
        'Die log-Taste berechnet den dekadischen Logarithmus (log 1000 = 3) und ln den ' +
        'natürlichen Logarithmus zur Basis e (ln(e) = 1). Beide sind für null und negative ' +
        'Zahlen undefiniert, und der Rechner sagt Ihnen das.',
    },
    {
      question: 'Warum zeigt 1 ÷ 0 einen Fehler statt Unendlich?',
      answer:
        'Division durch null ist in der Mathematik undefiniert — sie hat keinen einzelnen ' +
        'sinnvollen Wert. „Unendlich“ anzuzeigen wäre irreführend (1 ÷ 0 und −1 ÷ 0 können nicht ' +
        'beide unendlich sein), daher meldet der Rechner es ehrlich als undefiniert.',
    },
    {
      question: 'Kann ich Ausdrücke über die Tastatur eintippen?',
      answer:
        'Ja. Fokussieren Sie das Ausdrucksfeld und tippen Sie normal; Enter wertet aus und Esc ' +
        'löscht. Die Taste * fügt × ein, / fügt ÷ ein, und ^ ist der Potenzoperator, sodass 2^10 ' +
        'gleich 1024 ergibt.',
    },
    {
      question: 'Wie genau sind die Ergebnisse?',
      answer:
        'Ergebnisse werden mit 10 signifikanten Stellen angezeigt, berechnet in ' +
        'doppelter Genauigkeit — dieselbe Arithmetik wie bei einem physischen wissenschaftlichen ' +
        'Rechner. Sehr große Ergebnisse, die überlaufen, werden als Überlauf statt als Unendlich gemeldet.',
    },
    {
      question: 'Kann ich einen Ausdruck statt nur auszuwerten auch zeichnen?',
      answer:
        'Ja — der Grafikrechner auf dieser Seite zeichnet Funktionen von x mit Zoom, Verfolgung, ' +
        'Nullstellen- und Tangentenanalyse. Er nutzt dieselbe Ausdrucks-Engine, sodass sich alles, ' +
        'was Sie hier auswerten, dort identisch verhält.',
    },
  ],
  related: ['/graphing-calculator/', '/calculators/', '/calculators/derivative/', '/learn/'],
  island: {
    heading: 'Wissenschaftlicher Rechner',
    title: 'Wissenschaftlich',
    angleModeLabel: 'Winkelmodus',
    angleModeTemplate: 'Winkelmodus: {mode}',
    degrees: 'Grad',
    radians: 'Bogenmaß',
    expressionLabel: 'Ausdruck',
    expressionPlaceholder: 'Ausdruck eingeben',
    resultLabel: 'Ergebnis',
    fractionToggle: 'Bruch ↔ Dezimal',
    copyResult: 'Ergebnis kopieren',
    copied: 'Kopiert',
    memoryLabel: 'Speicher',
    memoryClear: 'Speicher löschen',
    memoryRecall: 'Speicher abrufen',
    memoryAdd: 'Ergebnis zum Speicher addieren',
    memorySubtract: 'Ergebnis vom Speicher subtrahieren',
    undo: 'Rückgängig',
    redo: 'Wiederholen',
    functionRowsLabel: 'Wissenschaftliche Funktionen',
    loadFailedTitle: 'Wissenschaftlicher Rechner konnte nicht geladen werden',
    keypadLabel: 'Rechner-Tastenfeld',
    historyTitle: 'Verlauf',
    historyEmptyTitle: 'Ein kleiner Platz für Ihre Arbeit.',
    historyEmptyBody:
      'Ihre Berechnungen erscheinen hier. Wählen Sie eine aus, um sie erneut zu verwenden.',
    historyStoredNote: 'Letzte 50 Berechnungen · in diesem Browser gespeichert',
    historyClear: 'Verlauf löschen',
    historyReuse: 'Berechnung wiederverwenden',
    footerEnter: 'Enter zum Berechnen',
    footerDevice: 'Auf Ihrem Gerät berechnet',
    keys: {
      sin: { label: 'sin', ariaLabel: 'Sinus', altLabel: 'asin', altAriaLabel: 'Arkussinus' },
      cos: { label: 'cos', ariaLabel: 'Kosinus', altLabel: 'acos', altAriaLabel: 'Arkuskosinus' },
      tan: { label: 'tan', ariaLabel: 'Tangens', altLabel: 'atan', altAriaLabel: 'Arkustangens' },
      log: {
        label: 'log',
        ariaLabel: 'Logarithmus zur Basis 10',
        altLabel: '10ˣ',
        altAriaLabel: 'zehn hoch x',
      },
      ln: {
        label: 'ln',
        ariaLabel: 'Natürlicher Logarithmus',
        altLabel: 'eˣ',
        altAriaLabel: 'e hoch x',
      },
      pow: { label: 'xʸ', ariaLabel: 'Potenz' },
      sqrt: { label: '√', ariaLabel: 'Quadratwurzel' },
      square: { label: 'x²', ariaLabel: 'Quadrat' },
      reciprocal: { label: '1/x', ariaLabel: 'Kehrwert' },
      abs: { label: '|x|', ariaLabel: 'Betrag' },
      factorial: { label: 'n!', ariaLabel: 'Fakultät' },
      ncr: { label: 'nCr', ariaLabel: 'Kombinationen' },
      shift: { label: '2nd', ariaLabel: 'Zweitbelegung' },
      lparen: { label: '(', ariaLabel: 'Linke Klammer' },
      rparen: { label: ')', ariaLabel: 'Rechte Klammer' },
      ac: { label: 'AC', ariaLabel: 'Löschen' },
      backspace: { label: '⌫', ariaLabel: 'Rücktaste' },
      pi: { label: 'π', ariaLabel: 'pi' },
      d7: { label: '7', ariaLabel: '7' },
      d8: { label: '8', ariaLabel: '8' },
      d9: { label: '9', ariaLabel: '9' },
      div: { label: '÷', ariaLabel: 'Dividieren' },
      e: { label: 'e', ariaLabel: 'Eulersche Zahl e' },
      d4: { label: '4', ariaLabel: '4' },
      d5: { label: '5', ariaLabel: '5' },
      d6: { label: '6', ariaLabel: '6' },
      mul: { label: '×', ariaLabel: 'Multiplizieren' },
      ee: { label: 'EE', ariaLabel: 'Zehnerpotenz (mal zehn hoch)' },
      d1: { label: '1', ariaLabel: '1' },
      d2: { label: '2', ariaLabel: '2' },
      d3: { label: '3', ariaLabel: '3' },
      sub: { label: '−', ariaLabel: 'Minus' },
      ans: { label: 'Ans', ariaLabel: 'Letztes Ergebnis' },
      negate: { label: '±', ariaLabel: 'Vorzeichen wechseln' },
      d0: { label: '0', ariaLabel: '0' },
      dot: { label: '.', ariaLabel: 'Dezimalpunkt' },
      add: { label: '+', ariaLabel: 'Plus' },
      percent: { label: '%', ariaLabel: 'Prozent' },
      npr: { label: 'nPr', ariaLabel: 'Permutationen' },
      equals: { label: '=', ariaLabel: 'Gleich' },
    },
    errors: {
      divisionByZero: 'Undefiniert — Division durch null.',
      sqrtNegative: 'Undefiniert — die Quadratwurzel einer negativen Zahl ist keine reelle Zahl.',
      logNonPositive:
        'Undefiniert — der Logarithmus einer nicht-positiven Zahl ist keine reelle Zahl.',
      asinAcosDomain: 'Undefiniert — asin und acos brauchen ein Argument zwischen −1 und 1.',
      tanUndefined: 'Undefiniert — tan ist bei ungeraden Vielfachen von 90° nicht definiert.',
      emptyExpression: 'Geben Sie zuerst einen Ausdruck ein.',
      trailingOperator: 'Der Ausdruck endet mit einem Operator — fügen Sie danach eine Zahl ein.',
      mismatchedParens: 'Nicht passende Klammern — jede „(“ braucht eine passende „)“.',
      badCharTemplate:
        'Das Zeichen „{char}“ verstehe ich nicht — entfernen Sie es und versuchen Sie es erneut.',
      unreadable: 'Der Ausdruck konnte nicht gelesen werden — prüfen Sie auf Tippfehler.',
      notReal: 'Undefiniert — das Ergebnis ist keine reelle Zahl.',
      overflow: 'Überlauf — das Ergebnis ist zu groß für die Anzeige.',
    },
  },
};
