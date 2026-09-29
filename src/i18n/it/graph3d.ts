/**
 * Dizionario italiano 3D — la pagina `/3d/` più le stringhe dell'isola Graph3D.
 */

import type { Graph3DStrings } from '../types.js';

export const graph3d: Graph3DStrings = {
  seo: {
    title: 'Grafico 3D online — Traccia superfici z = f(x, y) | Graphing Calculator',
    description:
      'Grafico 3D online gratuito: traccia superfici z = f(x, y) con rotazione trascinabile, zoom e ' +
      'dettaglio regolabile. Prova i preset paraboloide, increspatura e sella.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Grafico 3D', href: '/3d/' },
  ],
  heading: 'Grafico 3D',
  intro: [
    'Traccia qualsiasi superficie z = f(x, y) nel tuo browser — senza download, senza plugin. Digita un\u2019espressione in x e y, poi trascina per orbitare intorno, scorri o pizzica per zoomare e alza il dettaglio della griglia per affinare la maglia.',
    'Il tracciatore usa lo stesso motore di espressioni della calcolatrice grafica 2D, quindi ogni funzione che gi\u00e0 conosci — sin, cos, sqrt, ^ e altro — funziona anche qui. Dove una funzione non \u00e8 definita, la superficie mostra un buco onesto invece di una falsa striscia.',
  ],
  sections: [
    {
      heading: 'Come funziona la rotazione 3D',
      body: [
        'Trascinare il grafico fa orbitare una telecamera virtuale intorno alla superficie: i trascinamenti orizzontali cambiano l\u2019azimut (la direzione cardinale da cui guardi) e quelli verticali cambiano l\u2019elevazione (quanto la telecamera sta in alto sopra il piano xy). Scorrere o pizzicare avvicina o allontana la telecamera. Se usi una tastiera, seleziona il grafico e usa le frecce per ruotare e + / − per zoomare.',
        'La superficie \u00e8 disegnata con l\u2019algoritmo del pittore: ogni quad della maglia viene proiettato con una vera telecamera prospettica, ordinato dal pi\u00f9 lontano al pi\u00f9 vicino per profondit\u00e0 e disegnato prima il pi\u00f9 lontano, con ombreggiatura di profondit\u00e0. La geometria pi\u00f9 vicina nasconde quindi ci\u00f2 che sta dietro, ed \u00e8 questo che d\u00e0 al grafico il senso di profondit\u00e0 solida. Se lasciato solo per qualche secondo, il grafico ruota lentamente da solo — a meno che tu non abbia attivato prefers-reduced-motion, nel qual caso resta perfettamente fermo.',
      ],
    },
    {
      heading: 'Cosa mostrano i preset',
      body: [
        'Paraboloide (x²+y²) \u00e8 la scodella classica: z cresce con la distanza dall\u2019origine in ogni direzione, con minimo 0 in (0, 0). \u00c8 l\u2019analogo 3D della parabola y = x².',
        'Increspatura (sin(√(x²+y²))) disegna onde concentriche che si irradiano dall\u2019origine — il valore dipende solo dalla distanza dall\u2019origine, quindi ogni curva di livello \u00e8 un cerchio. \u00c8 un buon modo per vedere come appare la simmetria radiale come superficie.',
        'Sella (x²−y²) si incurva verso l\u2019alto lungo l\u2019asse x e verso il basso lungo l\u2019asse y. L\u2019origine \u00e8 un punto di sella: un minimo in una direzione e un massimo nell\u2019altra, la versione 3D di un punto critico simile a un flesso.',
      ],
    },
    {
      heading: 'Rendering onesto: buchi e scala z',
      body: [
        'I punti non definiti diventano buchi, mai congetture. Traccia 1/(x²+y²) e vedrai la maglia spezzarsi intorno alla singolarit\u00e0 nell\u2019origine, esattamente come il grafico 2D interrompe una curva in un asintoto verticale.',
        'Le superfici molto alte vengono ridotte uniformemente in z per stare sullo schermo — il tracciatore ti dice il fattore di scala (per esempio, "asse z auto-scalato ×0.22"). La forma e i valori minimo/massimo di z restano fedeli alla tua espressione; solo le proporzioni verticali sono compresse per la visualizzazione.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Quali espressioni posso tracciare in 3D?',
      answer:
        'Qualsiasi espressione nelle variabili x e y, usando le stesse funzioni della calcolatrice ' +
        '2D: potenze (x^2), radici (sqrt), funzioni trigonometriche (sin, cos, tan), ' +
        'esponenziali, logaritmi e costanti come pi. Tutto il resto — per esempio una variabile z ' +
        'spuria — viene rifiutato con un chiaro messaggio di errore invece di tracciare in ' +
        'silenzio la cosa sbagliata.',
    },
    {
      question: 'Perch\u00e9 ci sono buchi nella mia superficie?',
      answer:
        'I buchi sono vuoti onesti dove la tua funzione non \u00e8 definita: divisione per zero, radice ' +
        'quadrata di un numero negativo o logaritmo di un numero non positivo. Il renderer ' +
        'salta quei quad invece di disegnare un picco fuorviante attraverso la singolarit\u00e0.',
    },
    {
      question: 'Cosa cambia l\u2019impostazione Dettaglio?',
      answer:
        'Imposta la risoluzione della maglia — quante divisioni della griglia vengono campionate lungo ' +
        'ciascun asse (24, 36, 48 o 64). Un dettaglio maggiore disegna una superficie pi\u00f9 liscia ma ' +
        'valuta la funzione pi\u00f9 volte (64² = 4.225 punti per ridisegno), quindi parti dal basso sui ' +
        'telefoni meno recenti.',
    },
    {
      question: 'Il grafico 3D funziona su mobile?',
      answer:
        'S\u00ec. Un dito trascina per ruotare, il pinch a due dita zooma e il trascinamento a due dita ' +
        'ruota con sensibilit\u00e0 ridotta. Il layout \u00e8 mobile-first e il canvas \u00e8 dimensionato per ' +
        'il suo contenitore con scala device-pixel-ratio per linee nitide.',
    },
    {
      question: 'Il grafico 3D \u00e8 accurato?',
      answer:
        'La superficie \u00e8 campionata dalla tua espressione esatta in ogni punto della griglia — nessuna ' +
        'stima AI, nessuno smussamento della matematica sottostante. Tra i punti della griglia la maglia ' +
        'collega i campioni con quad rettilinei, quindi dettagli molto appuntiti possono sembrare ' +
        'leggermente sfaccettati a basso dettaglio; alza l\u2019impostazione Dettaglio per stringere la maglia.',
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/learn/'],
  island: {
    surfaceLabel: 'Superficie: z = f(x, y)',
    placeholder: 'es. x^2 + y^2',
    plot: 'Traccia',
    emptyError: 'Inserisci un\u2019espressione in x e y, per esempio x^2+y^2.',
    genericError: 'Impossibile tracciare quell\u2019espressione.',
    parseError: 'Impossibile interpretare quell\u2019espressione.',
    unknownVariablesTemplate:
      'Variabile sconosciuta{plural}: {names}. Le superfici 3D usano solo x e y.',
    presetGroup: 'Superfici predefinite',
    presets: [
      {
        label: 'Paraboloide',
        description: 'Una scodella che si apre verso l\u2019alto; minimo 0 nell\u2019origine.',
      },
      {
        label: 'Increspatura',
        description: 'Onde concentriche che si irradiano dall\u2019origine.',
      },
      {
        label: 'Sella',
        description:
          'Si incurva su lungo x, gi\u00f9 lungo y — un punto di sella nell\u2019origine.',
      },
    ],
    detailGroup: 'Risoluzione griglia',
    detailLabel: 'Dettaglio:',
    hint: 'Trascina per ruotare · scorri o pizzica per zoomare · seleziona il grafico e usa le frecce / + / −',
    zMin: 'z min',
    zMax: 'z max',
    autoScaledTemplate: '(asse z auto-scalato ×{scale} per adattarsi)',
    noFiniteGrid: 'Nessun valore finito su questa griglia — prova un\u2019altra espressione.',
    canvasAriaTemplate:
      'Grafico 3D della superficie z uguale a {expression}. {stats}' +
      'Trascina per ruotare, scorri o pizzica per zoomare. Quando selezionato, le frecce ruotano e pi\u00f9/meno zooma.',
    canvasAriaEmpty: 'Tracciatore di superfici 3D. Nessuna espressione tracciata ancora.',
    summaryTemplate: 'Riepilogo superficie: z = {expression} con x e y da -5 a 5. {stats}',
    summaryStatsTemplate:
      'z minima {zMin}, z massima {zMax}, calcolate su {count} punti della griglia.',
    summaryNoFinite: 'Nessun valore z finito sulla griglia corrente.',
    summaryEmpty: 'Nessuna superficie tracciata.',
    canvasAriaStatsTemplate: 'Con x e y da -5 a 5, z varia da {zMin} a {zMax}. ',
    canvasAriaNoFiniteStats: 'Nessun valore finito sulla griglia corrente. ',
  },
};
