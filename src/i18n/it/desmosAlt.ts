/**
 * Dizionario italiano desmosAlt — la pagina `/desmos-alternative/`.
 *
 * Vincoli legali (dalla sorgente della pagina, da non indebolire): "Desmos"
 * appare solo in uso nominativo e comparativo; su Desmos si affermano solo
 * fatti pubblicamente noti; niente recensioni, valutazioni, statistiche o
 * conteggi di utenti.
 */

import type { DesmosAltStrings } from '../types.js';

export const desmosAlt: DesmosAltStrings = {
  seo: {
    title:
      'Migliore alternativa a Desmos — Calcolatrice grafica online gratuita | Graphing Calculator',
    description:
      'Cerchi un’alternativa a Desmos? Graphing Calculator è una calcolatrice grafica online ' +
      'gratuita e indipendente con grafici 2D/3D, aiuto AI e strumenti di analisi.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Alternativa a Desmos', href: '/desmos-alternative/' },
  ],
  heading: 'Migliore alternativa a Desmos — Calcolatrice grafica online gratuita',
  asideAriaLabel: 'Avviso di indipendenza',
  disclaimer:
    'Prodotto indipendente. Graphing Calculator non è affiliato, approvato o ' +
    'collegato a Desmos o Amplify. “Desmos” è usato in questa pagina solo per descrivere ' +
    'di cosa questo sito è un’alternativa.',
  sections: [
    {
      heading: 'Desmos vs. Graphing Calculator',
      body: [
        'Molte persone cercano sul web una calcolatrice Desmos quando devono tracciare velocemente il grafico ' +
          'di una funzione. Se sei una di loro, Graphing Calculator è un’alternativa gratuita e indipendente ' +
          'che puoi usare subito — senza registrazione, senza download, senza account.',
        'Uno sguardo fianco a fianco alle basi. Su Desmos, questa tabella riporta solo fatti pubblicamente ' +
          'noti — niente di indovinato o non verificato.',
      ],
    },
    {
      heading: 'Cosa ottieni con Graphing Calculator',
      body: [
        'La calcolatrice grafica 2D traccia le funzioni all’istante mentre digiti, con ' +
          'zoom verso il cursore, panoramica e supporto touch. Aggiungi cursori per esplorare i parametri ' +
          'dal vivo, passa alla modalità parametrica o polare, o ombreggia disequazioni — tutto nella stessa vista.',
        'Per tre dimensioni, il tracciatore 3D di superfici renderizza z = f(x, y) con controlli orbitali, ' +
          'zoom, controllo della risoluzione e superfici predefinite, compilato dal ' +
          'motore matematico del sito.',
        'L’analisi integrata trova radici, intersezioni, derivate, integrali, limiti ed ' +
          'estremi, e disegna rette tangenti e normali direttamente sul grafico. Le ' +
          'calcolatrici matematiche standalone coprono le stesse operazioni passo passo, e le guide impara spiegano ' +
          'le idee dietro di esse.',
        'Un assistente matematico AI è integrato per spiegare concetti e aiutare a impostare i grafici. Finché ' +
          'il proprietario del sito non configura una chiave API gira in una modalità simulata chiaramente etichettata — la ' +
          'calcolatrice stessa, mai l’AI, è la fonte di verità per i risultati.',
        'Ogni grafico può essere condiviso come link che riapre esattamente la stessa vista, senza ' +
          'account da nessuna delle due parti. E non c’è nulla da accettare oltre le basi: ' +
          'niente account, niente cookie, niente tracker di terze parti.',
      ],
      links: [
        { label: 'La calcolatrice grafica 2D', href: '/graphing-calculator/' },
        { label: 'tracciatore 3D di superfici', href: '/3d/' },
        { label: 'calcolatrici matematiche standalone', href: '/calculators/' },
        { label: 'guide impara', href: '/learn/' },
      ],
    },
  ],
  faqs: [
    {
      question: 'Questo sito è affiliato a Desmos?',
      answer:
        'No. Graphing Calculator è un prodotto indipendente. Non è affiliato, approvato o ' +
        'collegato a Desmos o Amplify. Il nome “Desmos” appare su ' +
        'questa pagina solo per descrivere di cosa questo sito è un’alternativa.',
    },
    {
      question: 'Graphing Calculator è gratuito?',
      answer:
        'Sì. Graphing Calculator è gratuito e non c’è registrazione — il sito non ha ' +
        'proprio account.',
    },
    {
      question: 'Serve un account per salvare o condividere i grafici?',
      answer:
        'No. Non ci sono account da creare. Puoi trasformare qualsiasi grafico in un link condivisibile ' +
        'che riapre esattamente la stessa vista, e chi apre il link non ha bisogno di alcun account.',
    },
    {
      question: 'Posso tracciare grafici 3D?',
      answer:
        'Sì. Graphing Calculator include un tracciatore 3D interattivo di superfici per funzioni ' +
        'della forma z = f(x, y), con controlli orbitali, zoom, controllo della risoluzione e superfici ' +
        'predefinite.',
    },
    {
      question: 'Ha un assistente AI?',
      answer:
        'Sì. L’assistente matematico AI integrato può spiegare concetti e aiutarti a impostare ' +
        'i grafici. Finché il proprietario del sito non configura una chiave API gira in una modalità simulata ' +
        'chiaramente etichettata, e la calcolatrice stessa — non l’AI — è sempre la fonte di verità per i risultati.',
    },
    {
      question: 'Quali strumenti di analisi sono inclusi?',
      answer:
        'Radici, intersezioni, derivate, integrali, limiti, estremi e rette tangenti/normali — tutto calcolato dal ' +
        'motore matematico del sito e disegnato direttamente sul grafico.',
    },
  ],
  table: {
    caption: 'Confronto delle basi: Desmos vs. Graphing Calculator',
    headers: ['Funzionalità', 'Desmos', 'Graphing Calculator'],
    rows: [
      { feature: 'Prezzo', ours: 'Gratuito', theirs: 'Gratuito' },
      {
        feature: 'Registrazione richiesta?',
        ours: 'No — il sito non ha proprio account',
        theirs: 'No — il grafico di base funziona senza account',
      },
      {
        feature: 'Grafico 2D',
        ours: 'Sì — con cursori, modalità parametriche e polari, e disequazioni',
        theirs: 'Sì',
      },
    ],
  },
  related: ['/graphing-calculator/', '/calculators/', '/learn/'],
};
