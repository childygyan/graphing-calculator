/**
 * Dizionario italiano scientific — la pagina `/scientific-calculator/` più le
 * stringhe dell'isola ScientificCalculator.
 *
 * Le `label` della tastiera sono ciò che l'utente vede sui tasti; le `ariaLabel`
 * sono i nomi accessibili. Il testo `insert` digitato da ciascun tasto è
 * sintassi di espressione e NON si traduce — resta nel componente.
 */

import type { ScientificStrings } from '../types.js';

export const scientific: ScientificStrings = {
  seo: {
    title: 'Calcolatrice scientifica online — Gratuita con modalità DEG/RAD | Graphing Calculator',
    description:
      'Calcolatrice scientifica online gratuita: trigonometria, trigonometria inversa, log, ln, potenze, ' +
      'radici, π ed e con modalità DEG/RAD, supporto tastiera e messaggi di errore chiari.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Calcolatrice scientifica', href: '/scientific-calculator/' },
  ],
  heading: 'Calcolatrice scientifica',
  intro: [
    'Una calcolatrice scientifica online gratuita per la matematica di tutti i giorni: aritmetica con il ' +
      'corretto ordine delle operazioni, funzioni trigonometriche e trigonometriche inverse, logaritmi ' +
      'in base 10 e naturali, potenze, radici e le costanti π ed e. Digita sulla tastiera o tocca la ' +
      'tastiera a schermo — ogni calcolo gira nel tuo browser con lo stesso motore di espressioni della ' +
      'nostra calcolatrice grafica.',
  ],
  sections: [
    {
      heading: 'Cosa fa questa calcolatrice',
      body: [
        'Inserisci qualsiasi espressione — per esempio sin(30) + √(16), log(1000) o 2^10 — e premi = per valutarla. La calcolatrice segue la precedenza standard (parentesi, poi potenze, poi moltiplicazione e divisione, poi addizione e sottrazione), quindi 2 + 3 × 4 dà 14, non 20.',
        'Oltre all\u2019aritmetica hai tutto il set scientifico: sin, cos, tan e le loro inverse asin, acos, atan; log (base 10) e ln (logaritmo naturale); potenze xʸ inclusi gli esponenti frazionari; radici quadrate; e le costanti π ed e. Le espressioni possono essere annidate liberamente, es. sin(π/6)^2 + cos(π/6)^2.',
      ],
    },
    {
      heading: 'Gradi vs radianti (modalit\u00e0 DEG e RAD)',
      body: [
        'Gli angoli si possono misurare in gradi o radianti, e le funzioni trigonometriche danno risposte diverse a seconda di cosa intendi: sin(30°) = 0.5, ma sin(30 radianti) ≈ −0.988. L\u2019interruttore DEG/RAD in alto a sinistra della tastiera passa dall\u2019una all\u2019altra, e il badge sopra il display mostra sempre la modalit\u00e0 attiva.',
        'In modalit\u00e0 DEG, sin, cos e tan leggono l\u2019input come gradi, mentre asin, acos e atan riportano i risultati in gradi — come una calcolatrice scientifica fisica. In modalit\u00e0 RAD tutto funziona in radianti, che \u00e8 ci\u00f2 che la maggior parte delle formule di analisi e fisica si aspetta. Se un risultato trigonometrico sembra sbagliato, la modalit\u00e0 angolo \u00e8 la prima cosa da controllare.',
      ],
    },
    {
      heading: 'Scorciatoie da tastiera',
      body: [
        'Non devi mai toccare la tastiera a schermo: fai clic sul campo espressione e digita. Cifre, +, −, (, ), ^ e . funzionano come digitati; digitare * inserisce × e / inserisce ÷; Invio o = valuta; Esc cancella tutto; Cancella funziona come al solito. Dopo un risultato, digitare una cifra inizia una nuova espressione, mentre digitare un operatore continua dalla risposta precedente.',
      ],
    },
    {
      heading: 'Errori onesti, non NaN',
      body: [
        'Quando un\u2019espressione non ha una risposta sensata, questa calcolatrice lo dice in linguaggio chiaro invece di mostrare NaN o Infinity. Dividere per zero, fare la radice quadrata di un numero negativo o il logaritmo di un numero non positivo producono ciascuno una spiegazione specifica. Anche le espressioni incomplete ricevono indicazioni: un operatore finale o parentesi non bilanciate ti dicono esattamente cosa correggere.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Devo usare la modalit\u00e0 DEG o RAD?',
      answer:
        'Usa DEG per i problemi di angoli quotidiani (una pendenza di 30°, un triangolo con angoli in gradi) ' +
        'e RAD per analisi, formule di fisica e tutto ci\u00f2 che coinvolge π come angolo. La modalit\u00e0 ' +
        'influisce solo su sin, cos, tan, asin, acos e atan — tutto il resto \u00e8 identico.',
    },
    {
      question: 'Qual \u00e8 la differenza tra log e ln?',
      answer:
        'Il tasto log calcola il logaritmo in base 10 (log 1000 = 3) e ln calcola il ' +
        'logaritmo naturale, base e (ln(e) = 1). Entrambi sono indefiniti per zero e numeri ' +
        'negativi, e la calcolatrice te lo dir\u00e0.',
    },
    {
      question: 'Perch\u00e9 1 ÷ 0 mostra un errore invece di infinito?',
      answer:
        'La divisione per zero \u00e8 indefinita in matematica — non ha un unico valore sensato. ' +
        'Mostrare "infinito" sarebbe fuorviante (1 ÷ 0 e −1 ÷ 0 non possono essere entrambi infinito), quindi ' +
        'la calcolatrice lo segnala onestamente come indefinito.',
    },
    {
      question: 'Posso digitare le espressioni con la tastiera?',
      answer:
        'S\u00ec. Seleziona il campo espressione e digita normalmente; Invio valuta ed Esc ' +
        'cancella. Il tasto * inserisce ×, / inserisce ÷ e ^ \u00e8 l\u2019operatore di potenza, quindi 2^10 d\u00e0 ' +
        '1024.',
    },
    {
      question: 'Quanto sono precisi i risultati?',
      answer:
        'I risultati sono mostrati con 10 cifre significative, calcolati in virgola mobile a doppia ' +
        'precisione — la stessa aritmetica di una calcolatrice scientifica fisica. Risultati molto grandi ' +
        'che traboccano sono segnalati come overflow invece che infinito.',
    },
    {
      question: 'Posso tracciare il grafico di un\u2019espressione invece di valutarla soltanto?',
      answer:
        'S\u00ec — la calcolatrice grafica di questo sito traccia funzioni di x con zoom, tracciamento, ' +
        'radici e analisi della retta tangente. Usa lo stesso motore di espressioni, quindi tutto ci\u00f2 che ' +
        'valuti qui si comporta identicamente l\u00ec.',
    },
  ],
  related: ['/graphing-calculator/', '/calculators/', '/calculators/derivative/', '/learn/'],
  island: {
    heading: 'Calcolatrice scientifica',
    title: 'Scientifica',
    angleModeLabel: 'Modalità angolo',
    angleModeTemplate: 'Modalità angolo: {mode}',
    degrees: 'gradi',
    radians: 'radianti',
    expressionLabel: 'Espressione',
    expressionPlaceholder: 'Inserisci un’espressione',
    resultLabel: 'Risultato',
    fractionToggle: 'Frazione ↔ Decimale',
    copyResult: 'Copia risultato',
    copied: 'Copiato',
    memoryLabel: 'Memoria',
    memoryClear: 'Cancella memoria',
    memoryRecall: 'Richiama memoria',
    memoryAdd: 'Aggiungi il risultato alla memoria',
    memorySubtract: 'Sottrai il risultato dalla memoria',
    undo: 'Annulla',
    redo: 'Ripeti',
    functionRowsLabel: 'Funzioni scientifiche',
    loadFailedTitle: 'Impossibile caricare la calcolatrice scientifica',
    keypadLabel: 'Tastiera calcolatrice',
    historyTitle: 'Cronologia',
    historyEmptyTitle: 'Un piccolo spazio per il tuo lavoro.',
    historyEmptyBody: 'I tuoi calcoli appariranno qui. Selezionane uno per usarlo di nuovo.',
    historyStoredNote: 'Ultimi 50 calcoli · salvati in questo browser',
    historyClear: 'Cancella cronologia',
    historyReuse: 'Riutilizza calcolo',
    footerEnter: 'Invio per calcolare',
    footerDevice: 'Calcolato sul tuo dispositivo',
    keys: {
      sin: { label: 'sin', ariaLabel: 'seno', altLabel: 'asin', altAriaLabel: 'arcoseno' },
      cos: { label: 'cos', ariaLabel: 'coseno', altLabel: 'acos', altAriaLabel: 'arcocoseno' },
      tan: { label: 'tan', ariaLabel: 'tangente', altLabel: 'atan', altAriaLabel: 'arcotangente' },
      log: {
        label: 'log',
        ariaLabel: 'logaritmo in base 10',
        altLabel: '10ˣ',
        altAriaLabel: 'dieci alla x',
      },
      ln: {
        label: 'ln',
        ariaLabel: 'logaritmo naturale',
        altLabel: 'eˣ',
        altAriaLabel: 'e alla x',
      },
      pow: { label: 'xʸ', ariaLabel: 'potenza' },
      sqrt: { label: '√', ariaLabel: 'radice quadrata' },
      square: { label: 'x²', ariaLabel: 'quadrato' },
      reciprocal: { label: '1/x', ariaLabel: 'reciproco' },
      abs: { label: '|x|', ariaLabel: 'valore assoluto' },
      factorial: { label: 'n!', ariaLabel: 'fattoriale' },
      ncr: { label: 'nCr', ariaLabel: 'combinazioni' },
      shift: { label: '2nd', ariaLabel: 'seconde funzioni' },
      lparen: { label: '(', ariaLabel: 'parentesi aperta' },
      rparen: { label: ')', ariaLabel: 'parentesi chiusa' },
      ac: { label: 'AC', ariaLabel: 'cancella' },
      backspace: { label: '⌫', ariaLabel: 'cancella carattere' },
      pi: { label: 'π', ariaLabel: 'pi' },
      d7: { label: '7', ariaLabel: '7' },
      d8: { label: '8', ariaLabel: '8' },
      d9: { label: '9', ariaLabel: '9' },
      div: { label: '÷', ariaLabel: 'divisione' },
      e: { label: 'e', ariaLabel: 'numero di Eulero e' },
      d4: { label: '4', ariaLabel: '4' },
      d5: { label: '5', ariaLabel: '5' },
      d6: { label: '6', ariaLabel: '6' },
      mul: { label: '×', ariaLabel: 'moltiplicazione' },
      ee: { label: 'EE', ariaLabel: 'per dieci alla' },
      d1: { label: '1', ariaLabel: '1' },
      d2: { label: '2', ariaLabel: '2' },
      d3: { label: '3', ariaLabel: '3' },
      sub: { label: '−', ariaLabel: 'meno' },
      ans: { label: 'Ans', ariaLabel: 'risposta precedente' },
      negate: { label: '±', ariaLabel: 'cambia segno' },
      d0: { label: '0', ariaLabel: '0' },
      dot: { label: '.', ariaLabel: 'punto decimale' },
      add: { label: '+', ariaLabel: 'più' },
      percent: { label: '%', ariaLabel: 'percentuale' },
      npr: { label: 'nPr', ariaLabel: 'permutazioni' },
      equals: { label: '=', ariaLabel: 'uguale' },
    },
    errors: {
      divisionByZero: 'Non definito — divisione per zero.',
      sqrtNegative:
        'Non definito — la radice quadrata di un numero negativo non \u00e8 un numero reale.',
      logNonPositive:
        'Non definito — il logaritmo di un numero non positivo non \u00e8 un numero reale.',
      asinAcosDomain: 'Non definito — asin e acos richiedono un argomento tra −1 e 1.',
      tanUndefined: 'Non definito — tan non \u00e8 definita nei multipli dispari di 90°.',
      emptyExpression: 'Inserisci prima un\u2019espressione.',
      trailingOperator: 'L\u2019espressione termina con un operatore — aggiungi un numero dopo.',
      mismatchedParens: 'Parentesi non bilanciate — ogni “(” vuole la sua “)”.',
      badCharTemplate: 'Non capisco il carattere “{char}” — rimuovilo e riprova.',
      unreadable: 'Impossibile leggere l\u2019espressione — controlla gli errori di battitura.',
      notReal: 'Non definito — il risultato non \u00e8 un numero reale.',
      overflow: 'Overflow — il risultato \u00e8 troppo grande da mostrare.',
    },
  },
};
