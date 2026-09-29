/**
 * Deutsche Rechner-Wörterliste — der `/calculators/`-Hub plus die
 * Ableitungs-, Integral- und Nullstellenfinder-Toolseiten sowie die
 * MathTools-Insel-Texte (derzeit nicht verdrahtet; siehe docs/I18N-CONTRACTS.md).
 */

import type { CalculatorsStrings } from '../types.js';

export const calculators: CalculatorsStrings = {
  index: {
    seo: {
      title:
        'Rechner — Graphen-, Wissenschafts-, 3D-, Ableitungs-, Integral- & Nullstellen-Tools | Graphing Calculator',
      description:
        'Die funktionierende Rechner-Sammlung entdecken: Grafikrechner, wissenschaftlicher ' +
        'Rechner, 3D-Flächenzeichnung plus fokussierte Ableitungs-, Integral- und Nullstellen-Tools. ' +
        'Kostenlos, keine Registrierung.',
    },
    crumbs: [
      { label: 'Startseite', href: '/' },
      { label: 'Rechner', href: '/calculators/' },
    ],
    heading: 'Rechner',
    intro:
      'Eine kleine Sammlung fokussierter Mathe-Tools. Jedes wird hier nur aufgeführt, wenn es ' +
      'wirklich funktioniert — nichts ist ein Platzhaltereintrag.',
    tools: [
      {
        title: 'Grafikrechner',
        description: 'Der Hauptarbeitsbereich',
        blurb:
          'Kartesische, parametrische und polare Ausdrücke mit einem interaktiven Canvas-Graphen ' +
          'zeichnen, Nullstellen, Ableitungen und Integrale analysieren, Variablen mit Schiebereglern ' +
          'animieren und den KI-Assistenten fragen.',
        href: '/graphing-calculator/',
        cta: 'Grafikrechner öffnen',
      },
      {
        title: 'Ableitungsrechner',
        description: 'f′(a) numerisch',
        blurb:
          'Geben Sie eine beliebige Funktion f(x) und einen Punkt a ein, um die Ableitung f′(a) mit der ' +
          'zentralen Differenzenmethode zu schätzen — dieselbe Routine hinter den Graphen-Tangenten.',
        href: '/calculators/derivative/',
        cta: 'Funktion ableiten',
      },
      {
        title: 'Integralrechner',
        description: 'Bestimmte Integrale',
        blurb:
          '∫[a,b] f(x) dx numerisch mit der adaptiven Simpson-Regel berechnen, mit einer Erklärung ' +
          'der orientierten Fläche und wann Integrale verschwinden.',
        href: '/calculators/integral/',
        cta: 'Funktion integrieren',
      },
      {
        title: 'Nullstellenfinder',
        description: 'f(x) = 0 lösen',
        blurb:
          'Jede reelle Nullstelle von f(x) auf einem Intervall Ihrer Wahl finden, per ' +
          'Vorzeichenwechsel-Scan verfeinert mit dem Brent-Verfahren — verifiziert, niemals geraten.',
        href: '/calculators/root-finder/',
        cta: 'Nullstellen finden',
      },
      {
        title: 'Wissenschaftlicher Rechner',
        description: 'Trig, Logs, Potenzen & mehr',
        blurb:
          'Ein vollständiger Tastenfeld-Rechner: trigonometrische und Arkusfunktionen mit DEG/RAD-Modi, ' +
          'Logarithmen, Potenzen, Wurzeln und Konstanten — mit ehrlichen Fehlermeldungen statt ' +
          'stillem NaN.',
        href: '/scientific-calculator/',
        cta: 'Rechnen',
      },
      {
        title: '3D-Graph',
        description: 'Flächen z = f(x, y)',
        blurb:
          '3D-Flächen wie x²+y² oder sin(√(x²+y²)) zeichnen. Zum Drehen ziehen, zum Zoomen scrollen ' +
          'und die Netzdetailstufe anpassen — live auf Canvas gerendert, mit ehrlichen Lücken, wo ' +
          'die Funktion undefiniert ist.',
        href: '/3d/',
        cta: '3D-Flächen erkunden',
      },
    ],
    related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
  },
  derivative: {
    seo: {
      title: 'Ableitungsrechner — f′(x) sofort berechnen | Graphing Calculator',
      description:
        'Kostenloser Online-Ableitungsrechner: Geben Sie eine beliebige Funktion f(x) und einen Punkt ' +
        'ein, um f′(a) numerisch zu erhalten, mit einer Erklärung, was die Ableitung bedeutet.',
    },
    crumbs: [
      { label: 'Startseite', href: '/' },
      { label: 'Rechner', href: '/calculators/' },
      { label: 'Ableitungsrechner', href: '/calculators/derivative/' },
    ],
    heading: 'Ableitungsrechner',
    intro: [
      'Die Ableitung einer Funktion an einem Punkt misst ihre momentane Änderungsrate — ' +
        'geometrisch die Steigung der Tangente an den Graphen in diesem Punkt. Geben Sie unten eine ' +
        'beliebige Funktion ein, und dieses Tool schätzt f′(a) numerisch.',
    ],
    sections: [
      {
        heading: 'Wie die Berechnung funktioniert',
        body: [
          'Dieses Tool nutzt die zentrale Differenzenformel: f′(a) ≈ (f(a + h) − f(a − h)) / 2h, ' +
            'mit einer kleinen Schrittweite h. Es ist dieselbe numerische Methode, die der Grafikrechner ' +
            'für seine Tangentenanalyse verwendet, sodass die Ergebnisse hier mit dem übereinstimmen, ' +
            'was Sie bei der Inspektion einer Tangente auf dem Graphen sehen.',
          'Numerisches Differenzieren ist eine Näherung. Für glatte Funktionen wie Polynome, ' +
            'trigonometrische Funktionen und Exponentialfunktionen ist die Schätzung auf viele ' +
            'Dezimalstellen genau. An scharfen Ecken (wie |x| bei x = 0) oder Unstetigkeiten existiert ' +
            'die Ableitung möglicherweise nicht, und das Tool sagt Ihnen das ehrlich, statt eine ' +
            'irreführende Zahl zurückzugeben.',
        ],
      },
      {
        heading: 'Was die Ableitung Ihnen sagt',
        body: [
          'Eine positive Ableitung bedeutet, dass die Funktion an diesem Punkt steigt; eine negative ' +
            'Ableitung bedeutet, dass sie fällt. Je größer der Betrag, desto steiler der Graph. Wo die ' +
            'Ableitung null ist, flacht der Graph momentan ab — das sind die Kandidatenstellen für ' +
            'lokale Maxima und Minima.',
          'Ableitungen tragen auch physikalische Bedeutung: Wenn f(x) die Position über die Zeit ist, ' +
            'ist f′(x) die Geschwindigkeit; wenn f(x) die Geschwindigkeit ist, ist f′(x) die Beschleunigung. ' +
            'Probieren Sie f(x) = x² bei a = 2 (Ergebnis: 4) und bei a = −2 (Ergebnis: −4), um den ' +
            'Vorzeichenwechsel über das Minimum zu sehen.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Ist das eine exakte symbolische Ableitung?',
        answer:
          'Nein — dieses Tool berechnet eine numerische Näherung mit der zentralen ' +
          'Differenzenmethode. Sie ist für glatte Funktionen hochgenau, bleibt aber eine ' +
          'Schätzung, angezeigt gerundet auf 6 Dezimalstellen.',
      },
      {
        question: 'Warum versagt es an manchen Punkten?',
        answer:
          'Manche Funktionen sind nicht überall differenzierbar: |x| hat eine Ecke bei x = 0, und ' +
          'Funktionen mit Sprüngen oder senkrechten Asymptoten haben dort keine sinnvolle Steigung. ' +
          'Das Tool meldet, dass es die Ableitung nicht schätzen kann, statt zu raten.',
      },
      {
        question: 'Wie hängt das mit der Tangentenfunktion zusammen?',
        answer:
          'Die Tangente an f bei x = a hat die Steigung f′(a) — genau das, was dieses Tool berechnet. ' +
          'Im Grafikrechner können Sie die Tangente auf den Graphen zeichnen und dieselbe Steigung ' +
          'visuell ablesen.',
      },
    ],
    related: [
      '/calculators/integral/',
      '/calculators/root-finder/',
      '/learn/understanding-derivatives/',
      '/math-functions/quadratic/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Ableitungsrechner',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'z. B. x^2',
      atLabel: 'bei a =',
      atPlaceholder: 'z. B. 2',
      calculate: 'f′(a) berechnen',
      fillError: 'Geben Sie eine Funktion und einen Punkt ein.',
      parseError: 'f(x) konnte nicht geparst werden. Prüfen Sie den Ausdruck.',
      badPoint: 'Der Punkt a muss eine Zahl sein.',
      resultTemplate: 'f′({a}) ≈ {value}',
      noDerivative:
        'Die Ableitung konnte hier nicht geschätzt werden — die Funktion ist an diesem Punkt ' +
        'möglicherweise undefiniert oder nicht glatt.',
      loadFailedTitle: 'Ableitungstool konnte nicht geladen werden',
      panelTitle: 'Ableiten',
      functionNameLabel: 'Funktion f(x)',
      examplePlaceholder: 'z. B. x^2 - 4',
      pointLabel: 'Punkt a',
      compute: 'f′(a) berechnen',
      pointFiniteError: 'Geben Sie eine endliche Zahl für den Punkt ein.',
      notDifferentiableError:
        'Die Ableitung konnte dort nicht geschätzt werden (die Funktion ist an diesem Punkt möglicherweise nicht differenzierbar).',
      estimateError: 'Die Ableitung konnte dort nicht geschätzt werden.',
      resultLineTemplate: "f'({a}) ≈ {value}",
      parseFallback: 'Dieser Ausdruck konnte nicht geparst werden.',
    },
  },
  integral: {
    seo: {
      title: 'Integralrechner — Bestimmte Integrale online | Graphing Calculator',
      description:
        'Kostenloser Online-Integralrechner: Bestimmte Integrale ∫[a,b] f(x) dx numerisch mit der ' +
        'adaptiven Simpson-Regel berechnen, Schritt für Schritt erklärt.',
    },
    crumbs: [
      { label: 'Startseite', href: '/' },
      { label: 'Rechner', href: '/calculators/' },
      { label: 'Integralrechner', href: '/calculators/integral/' },
    ],
    heading: 'Integralrechner',
    intro: [
      'Das bestimmte Integral von f von a bis b misst die orientierte Fläche zwischen dem Graphen ' +
        'und der x-Achse auf diesem Intervall. Geben Sie unten eine Funktion und Grenzen ein, um es ' +
        'numerisch zu berechnen.',
    ],
    sections: [
      {
        heading: 'Wie die Berechnung funktioniert',
        body: [
          'Dieses Tool nutzt die adaptive Simpson-Regel: Es nähert die Funktion mit Parabeln auf ' +
            'kleinen Teilintervallen an und unterteilt rekursiv überall dort weiter, wo die Schätzung ' +
            'noch nicht genau genug ist. Es ist dieselbe Quadraturroutine hinter den schattierten ' +
            'Integralbereichen im Grafikrechner, sodass die Zahlen übereinstimmen.',
          'Weil die Methode adaptiv ist, konvergieren glatte Funktionen schnell, während knifflige ' +
            'Bereiche — scharfe Spitzen, Oszillationen — automatisch mehr Unterteilungen erhalten. Das ' +
            'Ergebnis wird auf 6 Dezimalstellen gerundet; die zugrundeliegende Schätzung ist typischerweise ' +
            'weit darüber hinaus genau.',
        ],
      },
      {
        heading: 'Das Ergebnis lesen',
        body: [
          'Fläche oberhalb der x-Achse zählt positiv und Fläche unterhalb negativ, sodass ein Integral ' +
            'auch dann null sein kann, wenn die Funktion es nicht ist — zum Beispiel ∫[−1,1] x³ dx = 0, ' +
            'weil sich die beiden Keulen exakt aufheben. Wenn Sie die gesamte geometrische Fläche wollen, ' +
            'integrieren Sie stattdessen den Betrag.',
          'Integrale akkumulieren auch Größen: Wenn f(x) eine Rate ist (etwa Liter pro Minute), ist das ' +
            'Integral über ein Zeitintervall die Gesamtmenge. Probieren Sie f(x) = x² von 0 bis 1 ' +
            '(Ergebnis: 1/3 ≈ 0,333333) — ein Klassiker, dem jeder Analysis-Student begegnet.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Ist das eine exakte Stammfunktionsauswertung?',
        answer:
          'Nein — das Tool integriert numerisch mit der adaptiven Simpson-Regel, statt eine ' +
          'symbolische Stammfunktion zu finden. Für gutartige Funktionen ist die Näherung auf ' +
          'viele Dezimalstellen genau.',
      },
      {
        question: 'Warum ist mein Integral null, obwohl die Funktion eindeutig Fläche hat?',
        answer:
          'Das bestimmte Integral ist eine orientierte Fläche: Bereiche unterhalb der x-Achse ' +
          'ziehen von Bereichen oberhalb ab. Symmetrische Funktionen wie sin(x) über [0, 2π] ' +
          'integrieren sich aus diesem Grund zu exakt null.',
      },
      {
        question: 'Was, wenn die Funktion irgendwo im Intervall undefiniert ist?',
        answer:
          'Funktionen mit Singularitäten innerhalb von [a, b] (wie 1/x über x = 0 hinweg) haben dort ' +
          'keine gewöhnlichen bestimmten Integrale. Das Tool meldet, dass das Integral nicht ' +
          'geschätzt werden konnte, statt eine falsche Zahl zurückzugeben.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/root-finder/',
      '/learn/understanding-integrals/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Rechner für bestimmte Integrale',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'z. B. x^2',
      fromLabel: 'von a =',
      toLabel: 'bis b =',
      fromPlaceholder: '0',
      toPlaceholder: '1',
      calculate: 'Integral berechnen',
      fillError: 'Geben Sie eine Funktion und beide Grenzen ein.',
      parseError: 'f(x) konnte nicht geparst werden. Prüfen Sie den Ausdruck.',
      badBounds: 'Die Grenzen a und b müssen Zahlen sein.',
      resultTemplate: '∫[{a}, {b}] f(x) dx ≈ {value}',
      noConvergence: 'Das Integral konnte auf diesem Intervall nicht geschätzt werden.',
      loadFailedTitle: 'Integraltool konnte nicht geladen werden',
      panelTitle: 'Integrieren',
      functionNameLabel: 'Funktion f(x)',
      examplePlaceholder: 'z. B. x^2 - 4',
      lowerBoundLabel: 'Untere Grenze',
      upperBoundLabel: 'Obere Grenze',
      boundsFiniteError: 'Geben Sie für beide Grenzen endliche Zahlen ein.',
      estimateError: 'Das Integral konnte in diesem Intervall nicht geschätzt werden.',
      parseFallback: 'Dieser Ausdruck konnte nicht geparst werden.',
    },
  },
  rootFinder: {
    seo: {
      title: 'Nullstellenfinder — f(x) = 0 online lösen | Graphing Calculator',
      description:
        'Kostenloser Online-Nullstellenfinder: Geben Sie eine beliebige Funktion f(x) und ein Intervall ' +
        'ein, um alle ihre Nullstellen (x-Achsenabschnitte) mit dem Brent-Verfahren zu finden, ehrlich gemeldet.',
    },
    crumbs: [
      { label: 'Startseite', href: '/' },
      { label: 'Rechner', href: '/calculators/' },
      { label: 'Nullstellenfinder', href: '/calculators/root-finder/' },
    ],
    heading: 'Nullstellenfinder',
    intro: [
      'Eine Nullstelle von f ist ein x-Wert, wo f(x) = 0 — die Punkte, wo der Graph die x-Achse ' +
        'kreuzt oder berührt. Geben Sie unten eine Funktion und ein Suchintervall ein, um jede ' +
        'Nullstelle darin zu finden.',
    ],
    sections: [
      {
        heading: 'Wie die Berechnung funktioniert',
        body: [
          'Das Tool scannt das Intervall zuerst auf Vorzeichenwechsel und verfeinert dann jede ' +
            'eingeklammerte Nullstelle mit dem Brent-Verfahren — einem robusten Algorithmus, der die ' +
            'Sicherheit der Bisektion mit der Geschwindigkeit von Sekanten- und invers-quadratischer ' +
            'Interpolation verbindet. Es ist dieselbe Routine, die der Grafikrechner für seine ' +
            'Nullstellenanalyse nutzt.',
          'Nullstellen, wo die Funktion die Achse nur berührt, ohne das Vorzeichen zu wechseln (wie x² ' +
            'bei x = 0), werden durch einen separaten extrema-bewussten Scan gefunden, da reine ' +
            'Vorzeichenwechsel-Erkennung sie übersehen würde. Jede gemeldete Nullstelle wird durch ' +
            'Auswertung von f am Ergebnis verifiziert.',
        ],
      },
      {
        heading: 'Tipps für gute Ergebnisse',
        body: [
          'Wählen Sie ein Intervall, das die Nullstellen einklammert, die Sie interessieren: Das Tool ' +
            'sucht nur dort, wo Sie es ihm sagen. Für x² − 4 auf [−10, 10] findet es −2 und 2; ' +
            'verkleinern Sie das Intervall auf [0, 10], meldet es nur 2.',
          'Wenn keine Nullstellen gemeldet werden, hat die Funktion entweder wirklich keine auf dem ' +
            'Intervall (wie x² + 1 auf der reellen Zahlengeraden) oder die Nullstellen sitzen genau an ' +
            'Ihren Intervallgrenzen — verschieben Sie die Grenzen leicht und versuchen Sie es erneut.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Kann es komplexe (nicht-reelle) Nullstellen finden?',
        answer:
          'Nein — dieses Tool findet nur reelle Nullstellen. Funktionen wie x² + 1 haben keine ' +
          'reellen Nullstellen, sodass das Tool ehrlich keine auf einem reellen Intervall meldet.',
      },
      {
        question: 'Warum hat es eine Nullstelle übersehen, die ich auf dem Graphen sehe?',
        answer:
          'Die häufigste Ursache ist eine Nullstelle genau an einer Intervallgrenze oder eine ' +
          'Nullstelle, die der Scan-Schritt in einer wild oszillierenden Funktion überspringt. ' +
          'Verengen Sie das Intervall um die vermutete Nullstelle und suchen Sie erneut.',
      },
      {
        question: 'Wie genau sind die gemeldeten Nullstellen?',
        answer:
          'Das Brent-Verfahren konvergiert bis nahe an die Maschinengenauigkeit; gemeldete Werte ' +
          'werden auf 6 Dezimalstellen gerundet. Das Einsetzen einer gemeldeten Nullstelle in f(x) ' +
          'ergibt einen Wert extrem nahe null.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/integral/',
      '/math-functions/quadratic/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Nullstellenfinder',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'z. B. x^2 - 4',
      fromLabel: 'von',
      toLabel: 'bis',
      fromPlaceholder: '-10',
      toPlaceholder: '10',
      calculate: 'Nullstellen finden',
      fillError: 'Geben Sie eine Funktion und ein Suchintervall ein.',
      parseError: 'f(x) konnte nicht geparst werden. Prüfen Sie den Ausdruck.',
      badInterval: 'Die Intervallgrenzen müssen Zahlen sein.',
      rootsFoundTemplate: '{count} Nullstelle{plural} gefunden:',
      noneFound: 'Keine Nullstellen auf diesem Intervall gefunden.',
      loadFailedTitle: 'Nullstellensuche konnte nicht geladen werden',
      panelTitle: 'Nullstellen finden',
      functionNameLabel: 'Funktion f(x)',
      intervalStartLabel: 'Intervallanfang',
      intervalEndLabel: 'Intervallende',
      intervalValidError:
        'Geben Sie ein gültiges Intervall mit unterer Grenze < oberer Grenze ein.',
      noRootsTemplate: 'Keine Nullstellen in [{a}, {b}] gefunden.',
      rootsListTemplate: 'Nullstellen in [{a}, {b}]: {roots}',
      searchError: 'In diesem Intervall konnten keine Nullstellen gefunden werden.',
      parseFallback: 'Dieser Ausdruck konnte nicht geparst werden.',
    },
  },
};
