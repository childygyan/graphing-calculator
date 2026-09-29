/**
 * Esempi di grafici selezionati (italiano).
 *
 * Traduzione di `src/data/seo/examples.ts`: stessa struttura, stessi slug,
 * stesse espressioni (matematica — NON tradotta), stesse date. I link
 * `related` sono ri-scritti con il prefisso `/it/`.
 */
import type { ExampleGraphData } from '../types.js';

export const EXAMPLE_GRAPHS: ExampleGraphData[] = [
  {
    slug: 'trigonometric-interference',
    title: 'Interferenza trigonometrica: sin(x) + cos(2x)',
    description:
      'Scopri cosa succede quando due onde trigonometriche si combinano. Apri questo esempio interattivo di sin(x) + cos(2x) nella calcolatrice grafica.',
    expressions: [
      { kind: 'cartesian', rhs: 'sin(x)', label: 'sin(x)' },
      { kind: 'cartesian', rhs: 'cos(2*x)', label: 'cos(2x)' },
      { kind: 'cartesian', rhs: 'sin(x) + cos(2*x)', label: 'sin(x) + cos(2x)' },
    ],
    story: [
      'Quando due onde viaggiano nello stesso mezzo, i loro spostamenti si sommano punto per punto — un fenomeno chiamato sovrapposizione. Tracciare sin(x), cos(2x) e la loro somma sugli stessi assi rende visibile questa addizione: in ogni x, l\u2019altezza della curva combinata \u00e8 esattamente la somma delle altezze delle due curve componenti.',
      'Nota come la somma non sia semplicemente un\u2019onda sinusoidale pi\u00f9 grande. Il termine cos(2x) oscilla il doppio pi\u00f9 velocemente, quindi alternativamente rinforza e cancella l\u2019onda sin(x). Dove entrambe le onde raggiungono il picco insieme, la somma tocca i suoi punti pi\u00f9 alti; dove una \u00e8 a una cresta e l\u2019altra a un avvallamento, si cancellano parzialmente. \u00c8 la stessa matematica dietro i battimenti nel suono e le figure di interferenza nella luce.',
    ],
    insights: [
      'L\u2019onda combinata sin(x) + cos(2x) \u00e8 periodica, ma la sua forma \u00e8 pi\u00f9 complessa di ciascuna componente da sola.',
      'Attiva e disattiva ciascuna espressione nella calcolatrice per isolare il contributo di ogni onda.',
      'Prova a cambiare cos(2*x) in cos(3*x) e osserva come una seconda onda pi\u00f9 veloce cambia la figura di interferenza.',
    ],
    related: [
      '/it/math-functions/sine/',
      '/it/math-functions/cosine/',
      '/it/examples/damped-oscillation/',
      '/it/learn/what-is-a-function/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'projectile-motion',
    title: 'Moto parabolico: il grafico di una palla lanciata',
    description:
      'Modella l\u2019altezza di una palla lanciata con una funzione quadratica. Apri questo esempio e trova l\u2019altezza massima nella calcolatrice.',
    expressions: [{ kind: 'cartesian', rhs: '-4.9*x^2 + 20*x + 1.5', label: 'height(x)' }],
    viewport: { xMin: -1, xMax: 5, yMin: -5, yMax: 25 },
    story: [
      'L\u2019altezza di una palla lanciata verso l\u2019alto segue una funzione quadratica del tempo: la gravit\u00e0 tira con un\u2019accelerazione costante, quindi l\u2019altezza \u00e8 una parabola che si apre verso il basso. Qui, -4.9x² + 20x + 1.5 modella una palla lanciata a 20 metri al secondo da un\u2019altezza di 1.5 metri (il 4.9 viene dalla met\u00e0 dell\u2019accelerazione gravitazionale terrestre, 9.8 m/s²).',
      'Il vertice della parabola \u00e8 l\u2019istante in cui la palla raggiunge il punto pi\u00f9 alto — l\u2019istante in cui la sua velocit\u00e0 \u00e8 zero prima che inizi a cadere. Poich\u00e9 la parabola \u00e8 simmetrica, la palla atterra tanto dopo il picco quanto ha impiegato a salirvi. Le due intercette x segnano lancio (vicino a x = 0) e atterraggio; solo la radice positiva \u00e8 fisicamente sensata.',
    ],
    insights: [
      'Il vertice della parabola d\u00e0 l\u2019altezza massima e l\u2019istante in cui viene raggiunta.',
      'L\u2019intercetta x positiva \u00e8 quando la palla tocca terra — trovala con il trova-radici.',
      'Il coefficiente -4.9 controlla quanto \u00e8 "largo" il volo; una velocit\u00e0 di lancio maggiore (il termine 20x) allunga il volo.',
    ],
    related: [
      '/it/math-functions/quadratic/',
      '/it/calculators/root-finder/',
      '/it/learn/what-is-a-function/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'damped-oscillation',
    title: 'Oscillazione smorzata: e^(-x/2) · cos(3x)',
    description:
      'Esplora un\u2019onda che decade e modella molle e circuiti reali. Apri questo esempio di oscillazione smorzata nella calcolatrice grafica interattiva.',
    expressions: [
      { kind: 'cartesian', rhs: 'exp(-x/2) * cos(3*x)', label: 'e^(-x/2)·cos(3x)' },
      { kind: 'cartesian', rhs: 'exp(-x/2)', label: 'envelope e^(-x/2)' },
      { kind: 'cartesian', rhs: '-exp(-x/2)', label: 'envelope -e^(-x/2)' },
    ],
    viewport: { xMin: -1, xMax: 15, yMin: -2, yMax: 2 },
    story: [
      'Una corda di chitarra pizzicata, una sospensione d\u2019auto che rimbalza e un circuito RLC condividono tutti la stessa forma matematica: un\u2019oscillazione la cui ampiezza decade nel tempo. Moltiplicare cos(3x) per l\u2019esponenziale decrescente exp(-x/2) produce esattamente questo — ogni oscillazione \u00e8 una frazione fissa della precedente.',
      'Le due curve inviluppo, ±exp(-x/2), sono le "rotaie" tra cui viaggia l\u2019oscillazione. L\u2019onda tocca l\u2019inviluppo superiore esattamente alle creste del coseno e quello inferiore ai suoi avvallamenti, e gli inviluppi stessi non oscillano mai. Questa separazione tra "quanto velocemente oscilla" (il coseno) e "quanto velocemente si estingue" (l\u2019esponenziale) \u00e8 il motivo per cui gli ingegneri analizzano i due fattori separatamente.',
    ],
    insights: [
      'L\u2019oscillazione non esce mai dai suoi inviluppi esponenziali.',
      'Aumentare il 3 in cos(3x) concentra pi\u00f9 oscillazioni nello stesso decadimento; aumentare l\u20191/2 nell\u2019esponente spegne il moto pi\u00f9 in fretta.',
      'Allontana lo zoom lungo l\u2019asse x per guardare l\u2019onda assestarsi verso zero — la firma matematica dello smorzamento.',
    ],
    related: [
      '/it/math-functions/cosine/',
      '/it/math-functions/exponential/',
      '/it/examples/trigonometric-interference/',
      '/it/learn/understanding-derivatives/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'logistic-growth',
    title: 'Crescita logistica: la curva a S delle risorse limitate',
    description:
      'Traccia la curva a S che modella popolazioni con risorse limitate. Apri questo esempio di crescita logistica nella calcolatrice grafica.',
    expressions: [{ kind: 'cartesian', rhs: '10 / (1 + 9*exp(-x))', label: 'logistic' }],
    viewport: { xMin: -5, xMax: 10, yMin: -2, yMax: 12 },
    story: [
      'La crescita illimitata \u00e8 esponenziale, ma le popolazioni reali incontrano limiti: cibo, spazio o dimensione del mercato. La funzione logistica 10 / (1 + 9·exp(-x)) all\u2019inizio sembra esponenziale, poi si piega e si livella a una capacit\u00e0 portante — qui, 10. Il risultato \u00e8 la famosa curva a S vista nelle colonie batteriche, nell\u2019adozione di prodotti e nella diffusione delle idee.',
      'La curva ha un punto di flesso dove passa dall\u2019accelerare al decelerare — il momento in cui la crescita \u00e8 pi\u00f9 veloce, esattamente a met\u00e0 strada verso la capacit\u00e0 portante. Prima di quel punto la curva si piega verso l\u2019alto (la crescita si autoalimenta); dopo, si piega verso il basso mentre il limite morde. Trovare quel punto di flesso \u00e8 una delle cose pi\u00f9 utili che l\u2019analisi pu\u00f2 fare per un modello.',
    ],
    insights: [
      'L\u2019asintoto orizzontale y = 10 \u00e8 la capacit\u00e0 portante a cui la curva tende senza mai superarla.',
      'La parte pi\u00f9 ripida della S \u00e8 il punto di flesso — dove la crescita \u00e8 pi\u00f9 veloce.',
      'Prova 10 / (1 + 9*exp(-2*x)) per vedere come un tasso di crescita pi\u00f9 veloce irripidisce il centro della S senza cambiarne il tetto.',
    ],
    related: [
      '/it/math-functions/exponential/',
      '/it/learn/asymptotes-explained/',
      '/it/learn/understanding-derivatives/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'lissajous-curve',
    title: 'Curva di Lissajous: arte parametrica dalle onde sinusoidali',
    description:
      'Disegna una figura di Lissajous con le equazioni parametriche x = sin(3t), y = cos(2t). Apri questo esempio parametrico nella calcolatrice grafica.',
    expressions: [
      {
        kind: 'parametric',
        xOfT: 'sin(3*t)',
        yOfT: 'cos(2*t)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'Lissajous 3:2',
      },
    ],
    viewport: { xMin: -1.5, xMax: 1.5, yMin: -1.5, yMax: 1.5 },
    story: [
      'Prima che gli oscilloscopi avessero display digitali, i fisici studiavano i rapporti di frequenza inviando due onde sinusoidali alle placche orizzontali e verticali di un tubo catodico. I motivi luminosi che tracciavano — figure di Lissajous — rivelano a colpo d\u2019occhio il rapporto tra le due frequenze. Qui, x = sin(3t) oscilla tre volte per ogni due oscillazioni di y = cos(2t), intrecciando un nodo chiuso e simmetrico.',
      'Ci\u00f2 che rende questa curva impossibile come normale grafico y = f(x) \u00e8 che fallisce clamorosamente il test della retta verticale: una singola x pu\u00f2 corrispondere a molti valori y mentre la curva si riavvolge su s\u00e9 stessa. Le equazioni parametriche aggirano quel limite dando a x e y le proprie formule in un parametro condiviso t — la stessa idea anima tutto, dalle lancette dell\u2019orologio alle orbite planetarie.',
    ],
    insights: [
      'Il rapporto di frequenza 3:2 determina il motivo: conta i lobi che toccano ciascun lato del quadrato che la racchiude.',
      'Cambia sin(3*t) in sin(4*t) per una figura 4:2 e confronta la simmetria.',
      'Poich\u00e9 t percorre un intero 2π, la curva si chiude perfettamente — accorcia l\u2019intervallo di t e guardala diventare un arco aperto.',
    ],
    related: [
      '/it/math-functions/sine/',
      '/it/math-functions/cosine/',
      '/it/learn/parametric-vs-cartesian/',
      '/it/examples/polar-rose/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'polar-rose',
    title: 'Rosa polare: r = 2·cos(3θ)',
    description:
      'Traccia una rosa a tre petali con l\u2019equazione polare r = 2cos(3θ). Apri questo esempio di grafico polare nella calcolatrice interattiva.',
    expressions: [
      {
        kind: 'polar',
        rOfTheta: '2*cos(3*theta)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'r = 2cos(3θ)',
      },
    ],
    viewport: { xMin: -2.5, xMax: 2.5, yMin: -2.5, yMax: 2.5 },
    story: [
      'In coordinate polari, ogni punto \u00e8 descritto da una distanza r dall\u2019origine e da un angolo θ, e l\u2019equazione r = 2·cos(3θ) disegna un fiore con esattamente tre petali. Mentre θ spazza intorno, r oscilla tra -2 e 2 tre volte; i valori negativi di r si tracciano nella direzione opposta, ed \u00e8 questo che piega i petali nella loro disposizione simmetrica.',
      'Il numero di petali segue una regola semplice: per r = a·cos(nθ) con n dispari, la rosa ha esattamente n petali. Prova valori pari di n nella calcolatrice e ne otterrai il doppio — il motivo raddoppia perch\u00e9 la curva ha bisogno di un giro completo in pi\u00f9 per chiudersi. Poche equazioni mostrano la potenza delle coordinate polari con l\u2019eleganza della rosa.',
    ],
    insights: [
      'Un coefficiente dispari (3) d\u00e0 3 petali; prova 2*cos(4*theta) per vedere il caso pari produrne 8.',
      'L\u2019ampiezza 2 fissa la lunghezza dei petali — il punto pi\u00f9 lontano dall\u2019origine.',
      'Ogni petalo \u00e8 tracciato esattamente una volta mentre θ va da 0 a π; la seconda met\u00e0 li ritraccia.',
    ],
    related: [
      '/it/math-functions/cosine/',
      '/it/learn/parametric-vs-cartesian/',
      '/it/examples/lissajous-curve/',
      '/it/graphing-calculator/',
    ],
  },
];

export function getExampleBySlug(slug: string): ExampleGraphData | undefined {
  return EXAMPLE_GRAPHS.find((example) => example.slug === slug);
}
