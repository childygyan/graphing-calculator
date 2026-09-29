/**
 * Dizionario italiano calculators — l'hub `/calculators/` più le pagine degli
 * strumenti derivate, integrali e trova-radici, e le stringhe dell'isola
 * MathTools.
 */

import type { CalculatorsStrings } from '../types.js';

export const calculators: CalculatorsStrings = {
  index: {
    seo: {
      title:
        'Calcolatrici — Grafica, scientifica, 3D, derivate, integrali e radici | Graphing Calculator',
      description:
        'Sfoglia la collezione di calcolatrici funzionanti: la calcolatrice grafica, la calcolatrice ' +
        'scientifica, il grafico 3D di superfici, più strumenti dedicati per derivate, integrali e ' +
        'ricerca radici. Gratis, senza registrazione.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calcolatrici', href: '/calculators/' },
    ],
    heading: 'Calcolatrici',
    intro:
      'Una piccola collezione di strumenti matematici mirati. Ciascuno \u00e8 elencato qui solo quando ' +
      'funziona davvero — niente voci segnaposto.',
    tools: [
      {
        title: 'Calcolatrice grafica',
        description: 'Lo spazio di lavoro principale',
        blurb:
          'Traccia espressioni cartesiane, parametriche e polari con un grafico interattivo su canvas, ' +
          'analizza radici, derivate e integrali, anima le variabili con i cursori ' +
          'e chiedi all\u2019assistente AI.',
        href: '/graphing-calculator/',
        cta: 'Apri la calcolatrice grafica',
      },
      {
        title: 'Calcolatrice di derivate',
        description: 'f′(a) numericamente',
        blurb:
          'Inserisci una qualsiasi funzione f(x) e un punto a per stimare la derivata f′(a) con il ' +
          'metodo delle differenze centrali — la stessa routine dietro le rette tangenti del grafico.',
        href: '/calculators/derivative/',
        cta: 'Deriva una funzione',
      },
      {
        title: 'Calcolatrice di integrali',
        description: 'Integrali definiti',
        blurb:
          'Calcola ∫[a,b] f(x) dx numericamente con la regola di Simpson adattiva, con una ' +
          'spiegazione dell\u2019area con segno e di quando gli integrali si annullano.',
        href: '/calculators/integral/',
        cta: 'Integra una funzione',
      },
      {
        title: 'Trova radici',
        description: 'Risolvi f(x) = 0',
        blurb:
          'Trova ogni radice reale di f(x) in un intervallo a tua scelta, con scansione dei cambi di segno ' +
          'raffinata dal metodo di Brent — verificate, mai indovinate.',
        href: '/calculators/root-finder/',
        cta: 'Trova le radici',
      },
      {
        title: 'Calcolatrice scientifica',
        description: 'Trig, log, potenze e altro',
        blurb:
          'Una calcolatrice completa con tastiera: funzioni trigonometriche e inverse con modalit\u00e0 ' +
          'DEG/RAD, logaritmi, potenze, radici e costanti — con messaggi di errore onesti ' +
          'invece di NaN silenziosi.',
        href: '/scientific-calculator/',
        cta: 'Calcola',
      },
      {
        title: 'Grafico 3D',
        description: 'Superfici z = f(x, y)',
        blurb:
          'Traccia superfici 3D come x²+y² o sin(√(x²+y²)). Trascina per ruotare, scorri per zoomare ' +
          'e regola il dettaglio della maglia — rendering live su canvas con buchi onesti dove la ' +
          'funzione non \u00e8 definita.',
        href: '/3d/',
        cta: 'Esplora le superfici 3D',
      },
    ],
    related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
  },
  derivative: {
    seo: {
      title: 'Calcolatrice di derivate — Calcola f′(x) online | Graphing Calculator',
      description:
        'Calcolatrice di derivate online gratuita: inserisci una funzione f(x) e un punto per ottenere ' +
        'f′(a) numericamente, con la spiegazione di cosa significa la derivata.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calcolatrici', href: '/calculators/' },
      { label: 'Calcolatrice di derivate', href: '/calculators/derivative/' },
    ],
    heading: 'Calcolatrice di derivate',
    intro: [
      'La derivata di una funzione in un punto misura il suo tasso di variazione istantaneo — ' +
        'geometricamente, la pendenza della retta tangente al grafico in quel punto. Inserisci una ' +
        'funzione qui sotto e questo strumento stima f′(a) numericamente.',
    ],
    sections: [
      {
        heading: 'Come funziona il calcolo',
        body: [
          'Questo strumento usa la formula delle differenze centrali: f′(a) ≈ (f(a + h) − f(a − h)) / 2h, ' +
            'con un piccolo passo h. \u00c8 lo stesso metodo numerico che la calcolatrice grafica usa ' +
            'per l\u2019analisi delle rette tangenti, quindi i risultati qui corrispondono a ci\u00f2 che vedi ' +
            'quando ispezioni una tangente sul grafico.',
          'La differenziazione numerica \u00e8 un\u2019approssimazione. Per funzioni lisce come ' +
            'polinomi, funzioni trigonometriche ed esponenziali, la stima \u00e8 accurata ' +
            'a molte cifre decimali. In punti angolosi (come |x| in x = 0) o discontinuit\u00e0, ' +
            'la derivata pu\u00f2 non esistere, e lo strumento te lo dir\u00e0 onestamente invece di ' +
            'restituire un numero fuorviante.',
        ],
      },
      {
        heading: 'Cosa ti dice la derivata',
        body: [
          'Una derivata positiva significa che la funzione sta crescendo in quel punto; una derivata ' +
            'negativa significa che sta decrescendo. Pi\u00f9 grande \u00e8 il modulo, pi\u00f9 ripido \u00e8 il grafico. ' +
            'Dove la derivata \u00e8 zero, il grafico si appiattisce momentaneamente — questi sono i ' +
            'candidati per massimi e minimi locali.',
          'Le derivate hanno anche un significato fisico: se f(x) \u00e8 la posizione nel tempo, f′(x) \u00e8 la ' +
            'velocit\u00e0; se f(x) \u00e8 la velocit\u00e0, f′(x) \u00e8 l\u2019accelerazione. Prova f(x) = x² in a = 2 ' +
            '(risultato: 4) e in a = −2 (risultato: −4) per vedere il cambio di segno attraverso il minimo.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Questa \u00e8 una derivata simbolica esatta?',
        answer:
          'No — questo strumento calcola un\u2019approssimazione numerica con il metodo delle differenze ' +
          'centrali. \u00c8 molto accurata per funzioni lisce ma resta una stima, mostrata ' +
          'arrotondata a 6 cifre decimali.',
      },
      {
        question: 'Perch\u00e9 fallisce in alcuni punti?',
        answer:
          'Alcune funzioni non sono derivabili ovunque: |x| ha un punto angoloso in x = 0, e le ' +
          'funzioni con salti o asintoti verticali non hanno una pendenza sensata l\u00ec. Lo ' +
          'strumento segnala che non pu\u00f2 stimare la derivata invece di indovinare.',
      },
      {
        question: 'Che rapporto c\u2019\u00e8 con la funzione retta tangente?',
        answer:
          'La retta tangente a f in x = a ha pendenza f′(a) — esattamente ci\u00f2 che calcola questo strumento. ' +
          'Nella calcolatrice grafica puoi disegnare la retta tangente sul grafico e leggere ' +
          'la stessa pendenza visivamente.',
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
      title: 'Calcolatrice di derivate',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'es. x^2',
      atLabel: 'in a =',
      atPlaceholder: 'es. 2',
      calculate: 'Calcola f′(a)',
      fillError: 'Inserisci una funzione e un punto.',
      parseError: 'Impossibile interpretare f(x). Controlla l\u2019espressione.',
      badPoint: 'Il punto a deve essere un numero.',
      resultTemplate: 'f′({a}) ≈ {value}',
      noDerivative:
        'Impossibile stimare la derivata qui — la funzione potrebbe non essere definita o non ' +
        'liscia in questo punto.',
      loadFailedTitle: 'Impossibile caricare lo strumento di derivazione',
      panelTitle: 'Deriva',
      functionNameLabel: 'Funzione f(x)',
      examplePlaceholder: 'es. x^2 - 4',
      pointLabel: 'Punto a',
      compute: 'Calcola f′(a)',
      pointFiniteError: 'Inserisci un numero finito per il punto.',
      notDifferentiableError:
        'Non è stato possibile stimare la derivata in quel punto (la funzione potrebbe non essere derivabile in quel punto).',
      estimateError: 'Non è stato possibile stimare la derivata in quel punto.',
      resultLineTemplate: "f'({a}) ≈ {value}",
      parseFallback: 'Impossibile analizzare l’espressione.',
    },
  },
  integral: {
    seo: {
      title: 'Calcolatrice di integrali — Integrali definiti online | Graphing Calculator',
      description:
        'Calcolatrice di integrali online gratuita: calcola integrali definiti ∫[a,b] f(x) dx ' +
        'numericamente con la regola di Simpson adattiva, spiegati passo passo.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calcolatrici', href: '/calculators/' },
      { label: 'Calcolatrice di integrali', href: '/calculators/integral/' },
    ],
    heading: 'Calcolatrice di integrali',
    intro: [
      'L\u2019integrale definito di f da a a b misura l\u2019area con segno tra il grafico ' +
        'e l\u2019asse x su quell\u2019intervallo. Inserisci una funzione e gli estremi qui sotto per calcolarlo ' +
        'numericamente.',
    ],
    sections: [
      {
        heading: 'Come funziona il calcolo',
        body: [
          'Questo strumento usa la regola di Simpson adattiva: approssima la funzione con ' +
            'parabole su piccoli sottointervalli e suddivide ricorsivamente dove la stima ' +
            'non \u00e8 ancora abbastanza accurata. \u00c8 la stessa routine di quadratura dietro le regioni ' +
            'ombreggiate degli integrali nella calcolatrice grafica, quindi i numeri concordano.',
          'Poich\u00e9 il metodo \u00e8 adattivo, le funzioni lisce convergono rapidamente mentre le regioni ' +
            'difficili — picchi appuntiti, oscillazioni — ricevono automaticamente pi\u00f9 suddivisioni. Il ' +
            'risultato \u00e8 arrotondato a 6 cifre decimali; la stima sottostante \u00e8 tipicamente ' +
            'accurata ben oltre.',
        ],
      },
      {
        heading: 'Leggere il risultato',
        body: [
          'L\u2019area sopra l\u2019asse x conta positiva e quella sotto conta negativa, quindi un ' +
            'integrale pu\u00f2 essere zero anche quando la funzione non lo \u00e8 — per esempio, ∫[−1,1] x³ dx = 0 ' +
            'perch\u00e9 i due lobi si cancellano esattamente. Se vuoi l\u2019area geometrica totale, integra ' +
            'invece il valore assoluto.',
          'Gli integrali accumulano anche quantit\u00e0: se f(x) \u00e8 un tasso (litri al minuto, diciamo), ' +
            'l\u2019integrale su un intervallo di tempo \u00e8 la quantit\u00e0 totale. Prova f(x) = x² da 0 a 1 ' +
            '(risultato: 1/3 ≈ 0.333333) — un classico che ogni studente di analisi incontra.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Questa \u00e8 una valutazione esatta con primitiva?',
        answer:
          'No — lo strumento integra numericamente con la regola di Simpson adattiva invece di ' +
          'trovare una primitiva simbolica. Per funzioni ben comportate l\u2019approssimazione \u00e8 ' +
          'accurata a molte cifre decimali.',
      },
      {
        question:
          'Perch\u00e9 il mio integrale \u00e8 zero quando la funzione ha chiaramente area?',
        answer:
          'L\u2019integrale definito \u00e8 area con segno: le regioni sotto l\u2019asse x sottraggono da quelle ' +
          'sopra. Funzioni simmetriche come sin(x) su [0, 2π] si integrano a ' +
          'zero esattamente per questo motivo.',
      },
      {
        question:
          'Cosa succede se la funzione non \u00e8 definita da qualche parte nell\u2019intervallo?',
        answer:
          'Le funzioni con singolarit\u00e0 dentro [a, b] (come 1/x attraverso x = 0) non hanno ' +
          'integrali definiti ordinari l\u00ec. Lo strumento segnaler\u00e0 che l\u2019integrale non ha ' +
          'potuto essere stimato invece di restituire un numero sbagliato.',
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
      title: 'Calcolatrice di integrali definiti',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'es. x^2',
      fromLabel: 'da a =',
      toLabel: 'a b =',
      fromPlaceholder: '0',
      toPlaceholder: '1',
      calculate: 'Calcola integrale',
      fillError: 'Inserisci una funzione ed entrambi gli estremi.',
      parseError: 'Impossibile interpretare f(x). Controlla l\u2019espressione.',
      badBounds: 'Gli estremi a e b devono essere numeri.',
      resultTemplate: '∫[{a}, {b}] f(x) dx ≈ {value}',
      noConvergence: 'L\u2019integrale non ha potuto essere stimato su questo intervallo.',
      loadFailedTitle: 'Impossibile caricare lo strumento di integrazione',
      panelTitle: 'Integra',
      functionNameLabel: 'Funzione f(x)',
      examplePlaceholder: 'es. x^2 - 4',
      lowerBoundLabel: 'Limite inferiore',
      upperBoundLabel: 'Limite superiore',
      boundsFiniteError: 'Inserisci numeri finiti per entrambi i limiti.',
      estimateError: 'Non è stato possibile stimare l’integrale in quell’intervallo.',
      parseFallback: 'Impossibile analizzare l’espressione.',
    },
  },
  rootFinder: {
    seo: {
      title: 'Trova radici — Risolvi f(x) = 0 online | Graphing Calculator',
      description:
        'Trova radici online gratis: inserisci una funzione f(x) e un intervallo per trovare tutte le ' +
        'radici (intercette x) con il metodo di Brent, con risultati onesti.',
    },
    crumbs: [
      { label: 'Home', href: '/' },
      { label: 'Calcolatrici', href: '/calculators/' },
      { label: 'Trova radici', href: '/calculators/root-finder/' },
    ],
    heading: 'Trova radici',
    intro: [
      'Una radice di f \u00e8 un valore x dove f(x) = 0 — i punti in cui il grafico attraversa o ' +
        'tocca l\u2019asse x. Inserisci una funzione e un intervallo di ricerca qui sotto per trovare ogni radice ' +
        'al suo interno.',
    ],
    sections: [
      {
        heading: 'Come funziona il calcolo',
        body: [
          'Lo strumento prima scansiona l\u2019intervallo alla ricerca di cambi di segno, poi raffina ciascuna ' +
            'radice racchiusa con il metodo di Brent — un algoritmo robusto che combina la sicurezza della ' +
            'bisezione con la velocit\u00e0 della secante e dell\u2019interpolazione quadratica inversa. \u00c8 la ' +
            'stessa routine che la calcolatrice grafica usa per l\u2019analisi delle radici.',
          'Le radici in cui la funzione tocca soltanto l\u2019asse senza cambiare segno (come x² ' +
            'in x = 0) sono trovate da una scansione separata sensibile agli estremi, poich\u00e9 il puro ' +
            'rilevamento dei cambi di segno le perderebbe. Ogni radice riportata \u00e8 verificata valutando f nel ' +
            'risultato.',
        ],
      },
      {
        heading: 'Consigli per buoni risultati',
        body: [
          'Scegli un intervallo che racchiuda le radici che ti interessano: lo strumento cerca solo ' +
            'dove gli dici di cercare. Per x² − 4 su [−10, 10] trova −2 e 2; restringi ' +
            'l\u2019intervallo a [0, 10] e riporter\u00e0 solo 2.',
          'Se non vengono riportate radici, o la funzione non ne ha davvero in quell\u2019intervallo ' +
            '(come x² + 1 sulla retta reale) o le radici sono esattamente agli estremi del tuo intervallo ' +
            '— sposta leggermente i limiti e riprova.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Pu\u00f2 trovare radici complesse (non reali)?',
        answer:
          'No — questo strumento trova solo radici reali. Funzioni come x² + 1 non hanno radici reali, ' +
          'quindi lo strumento segnala onestamente che non ce ne sono su qualsiasi intervallo reale.',
      },
      {
        question: 'Perch\u00e9 ha perso una radice che vedo sul grafico?',
        answer:
          'La causa pi\u00f9 comune \u00e8 una radice esattamente a un estremo dell\u2019intervallo o una radice che ' +
          'il passo di scansione salta in una funzione molto oscillante. Restringi l\u2019intervallo intorno ' +
          'alla radice sospetta e cerca di nuovo.',
      },
      {
        question: 'Quanto sono accurate le radici riportate?',
        answer:
          'Il metodo di Brent converge quasi alla precisione di macchina; i valori riportati sono arrotondati ' +
          'a 6 cifre decimali. Inserendo una radice riportata in f(x) si ottiene un valore ' +
          'estremamente vicino a zero.',
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
      title: 'Trova radici',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'es. x^2 - 4',
      fromLabel: 'da',
      toLabel: 'a',
      fromPlaceholder: '-10',
      toPlaceholder: '10',
      calculate: 'Trova radici',
      fillError: 'Inserisci una funzione e un intervallo di ricerca.',
      parseError: 'Impossibile interpretare f(x). Controlla l\u2019espressione.',
      badInterval: 'Gli estremi dell\u2019intervallo devono essere numeri.',
      rootsFoundTemplate: '{count} radice{plural} trovata{plural}:',
      noneFound: 'Nessuna radice trovata su questo intervallo.',
      loadFailedTitle: 'Impossibile caricare lo strumento di ricerca delle radici',
      panelTitle: 'Trova le radici',
      functionNameLabel: 'Funzione f(x)',
      intervalStartLabel: 'Inizio dell’intervallo',
      intervalEndLabel: 'Fine dell’intervallo',
      intervalValidError: 'Inserisci un intervallo valido con limite inferiore < limite superiore.',
      noRootsTemplate: 'Nessuna radice trovata in [{a}, {b}].',
      rootsListTemplate: 'Radici in [{a}, {b}]: {roots}',
      searchError: 'Non è stato possibile trovare radici in quell’intervallo.',
      parseFallback: 'Impossibile analizzare l’espressione.',
    },
  },
};
