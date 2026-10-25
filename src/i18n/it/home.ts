/**
 * Dizionario italiano home — la home page (`src/pages/index.astro`).
 */

import type { HomeStrings } from '../types.js';

export const home: HomeStrings = {
  seo: {
    title: 'Calcolatrice grafica online gratuita | Graphing Calculator',
    description:
      'Calcolatrice grafica online gratuita: traccia grafici di funzioni, analizza radici, derivate e ' +
      'integrali, esplora con i cursori e ricevi aiuto AI per la matematica. Nessuna registrazione.',
  },
  hero: {
    title: 'Calcolatrice grafica',
    subtitle:
      'Traccia il grafico di funzioni matematiche nel tuo browser — veloce, accessibile e gratuito. ' +
      'Disegna espressioni, analizzale con veri metodi numerici e chiedi aiuto all\u2019assistente AI. ' +
      'Nessuna registrazione, nessun download.',
    primaryCta: 'Apri la calcolatrice grafica',
    secondaryCta: 'Impara a tracciare grafici',
  },
  features: {
    ariaLabel: 'Funzionalit\u00e0',
    cards: [
      {
        title: 'Grafici interattivi',
        description: 'Zoom, panoramica ed esplorazione',
        body:
          'Un grafico su canvas veloce con griglia adattiva, zoom fluido verso il cursore, panoramica e ' +
          'supporto touch. Traccia funzioni cartesiane, curve parametriche, equazioni polari e ' +
          'disequazioni — ogni espressione con il suo colore e il suo interruttore di visibilit\u00e0.',
        cta: 'Apri la calcolatrice',
        href: '/graphing-calculator/',
      },
      {
        title: 'Vera analisi matematica',
        description: 'Radici, derivate, integrali',
        body:
          'Trova le radici con il metodo di Brent, calcola derivate e integrali definiti ' +
          'numericamente, consulta tabelle dei valori e disegna rette tangenti — sempre con lo stesso ' +
          'motore, e con onest\u00e0 quando un risultato non pu\u00f2 essere calcolato.',
        cta: 'Prova gli strumenti matematici',
        href: '/calculators/',
      },
      {
        title: 'Assistente matematico AI',
        description: 'Chiedi in linguaggio naturale',
        body:
          'Fai domande in linguaggio naturale — l\u2019assistente le traduce in comandi della calcolatrice, ' +
          'traccia ci\u00f2 che chiedi e spiega passo passo. Il motore matematico esegue sempre i calcoli ' +
          'reali; l\u2019AI non inventa mai i risultati.',
        cta: 'Chiedi all\u2019assistente',
        href: '/graphing-calculator/',
      },
      {
        title: 'Variabili, cursori e condivisione',
        description: 'Esplora e condividi',
        body:
          'Definisci variabili, animarle con i cursori, salva grafici con nome nel tuo browser e ' +
          'condividili come link compatti. Il tuo spazio di lavoro persiste tra le visite — tutto ' +
          'resta sul tuo dispositivo.',
        cta: 'Vedi gli esempi di grafici',
        href: '/examples/',
      },
    ],
  },
  explore: {
    ariaLabel: 'Esplora',
    heading: 'Esplora la matematica',
    cards: [
      {
        title: 'Libreria di funzioni',
        body: 'Seno, quadratiche, esponenziali e altro — ciascuna con propriet\u00e0 calcolate.',
        href: '/math-functions/',
      },
      {
        title: 'Esempi di grafici',
        body: 'Grafici selezionati che si aprono gi\u00e0 caricati nella calcolatrice, con note.',
        href: '/examples/',
      },
      {
        title: 'Impara a tracciare grafici',
        body: 'Guide brevi su funzioni, derivate, integrali e asintoti.',
        href: '/learn/',
      },
    ],
  },
  tutorial: {
    ariaLabel: 'Tutorial',
    heading: 'Come usare la calcolatrice grafica',
    lede:
      'Cinque passaggi, con la calcolatrice qui sopra. Ogni screenshot è un vero rendering ' +
      'di questa calcolatrice, non un mockup.',
    steps: [
      {
        title: 'Scrivi la tua prima espressione',
        body:
          'Fai clic nel pannello Espressioni e scrivi x^2. La parabola viene disegnata ' +
          'istantaneamente mentre scrivi: niente da installare e nessun account da creare.',
        image: '/images/tutorial/step-1-first-expression.png',
        alt: 'Calcolatrice grafica che mostra la parabola y = x al quadrato',
      },
      {
        title: 'Confronta due curve',
        body:
          'Fai clic su Aggiungi e scrivi sin(x). Ogni espressione ha un proprio colore e ' +
          'l’icona a forma di occhio mostra o nasconde ogni curva, così puoi confrontare ' +
          'le forme fianco a fianco.',
        image: '/images/tutorial/step-2-compare-curves.png',
        alt: 'Calcolatrice grafica che confronta la parabola y = x al quadrato con un’onda sinusoidale',
      },
      {
        title: 'Ingrandisci e sposta il grafico',
        body:
          'Scorri per ingrandire verso il cursore e trascina per spostare la vista. ' +
          'Ingrandendo il vertice di x^2 si vede la curva appiattirsi in (0, 0).',
        image: '/images/tutorial/step-3-zoom-in.png',
        alt: 'Vista ingrandita della parabola y = x al quadrato intorno al vertice in (0, 0)',
      },
      {
        title: 'Trova dove una curva incrocia l’asse x',
        body:
          'Per x^2 - 4, le radici compaiono come indicatori direttamente sul grafico: in ' +
          'x = -2 e x = 2. Il pannello Analisi può trovare radici, derivate, integrali e ' +
          'molto altro per qualsiasi espressione.',
        image: '/images/tutorial/step-4-roots.png',
        alt: 'Grafico di y = x al quadrato meno 4 con indicatori di radice in x = -2 e x = 2',
      },
      {
        title: 'Disegna una retta tangente',
        body:
          'Scegli un punto su una curva — qui x = 1 su x^2 — e la retta tangente appare ' +
          'in (1, 1), con la pendenza calcolata dal motore matematico.',
        image: '/images/tutorial/step-5-tangent.png',
        alt: 'Grafico di y = x al quadrato con una retta tangente in x = 1',
      },
    ],
  },
};
