/**
 * Dizionario italiano chrome — copy condivisa del layout (header, footer, nav,
 * breadcrumb, modal, selettore lingua, etichetta tema).
 *
 * Ordine di navigazione e struttura del footer rispecchiano `src/data/site.ts`.
 */

import type { ChromeStrings } from '../types.js';

export const chrome: ChromeStrings = {
  skipLink: 'Vai al contenuto principale',
  logoAriaLabel: 'Home di Graphing Calculator',
  nav: {
    primaryLabel: 'Principale',
    mobileLabel: 'Mobile',
    openMenu: 'Apri menu',
    items: [
      { label: 'Calcolatrice grafica', href: '/graphing-calculator/' },
      { label: 'Funzioni', href: '/math-functions/' },
      { label: 'Esempi', href: '/examples/' },
      { label: 'Impara', href: '/learn/' },
      { label: 'Calcolatrici', href: '/calculators/' },
      { label: 'Grafico 3D', href: '/3d/' },
      { label: 'Calcolatrice scientifica', href: '/scientific-calculator/' },
      { label: 'Chi siamo', href: '/about/' },
    ],
  },
  language: {
    label: 'Lingua',
    summaryTemplate: 'Lingua: {language}',
    note: '',
  },
  footer: {
    description:
      'Una calcolatrice grafica online veloce e accessibile. Traccia il grafico di funzioni ' +
      'matematiche, gestisci più espressioni e — nelle prossime versioni — esplora la matematica ' +
      'con l\u2019aiuto dell\u2019AI.',
    columns: [
      {
        heading: 'Prodotto',
        links: [
          { label: 'Calcolatrice grafica', href: '/graphing-calculator/' },
          { label: 'Calcolatrici', href: '/calculators/' },
          { label: 'Chi siamo', href: '/about/' },
          { label: 'Metodologia', href: '/methodology/' },
        ],
      },
      {
        heading: 'Esplora',
        links: [
          { label: 'Libreria di funzioni', href: '/math-functions/' },
          { label: 'Esempi di grafici', href: '/examples/' },
          { label: 'Impara a tracciare grafici', href: '/learn/' },
          { label: 'Grafico 3D', href: '/3d/' },
          { label: 'Alternativa a Desmos', href: '/desmos-alternative/' },
        ],
      },
      {
        heading: 'Calcolatrici',
        links: [
          { label: 'Calcolatrice di derivate', href: '/calculators/derivative/' },
          { label: 'Calcolatrice di integrali', href: '/calculators/integral/' },
          { label: 'Trova radici', href: '/calculators/root-finder/' },
          { label: 'Calcolatrice scientifica', href: '/scientific-calculator/' },
        ],
      },
      {
        heading: 'Legale',
        links: [
          { label: 'Informativa sulla privacy', href: '/privacy-policy/' },
          { label: 'Termini di servizio', href: '/terms/' },
          { label: 'Disclaimer', href: '/disclaimer/' },
          { label: 'Contatti', href: '/contact/' },
        ],
      },
    ],
    social: {
      groupLabel: 'Link social',
      comingSoonTitle: 'Prossimamente',
      comingSoon: '(presto)',
      links: [
        { label: 'X', href: '' },
        { label: 'GitHub', href: '' },
        { label: 'YouTube', href: '' },
      ],
    },
    copyrightTemplate: '{year} {name}. Tutti i diritti riservati.',
  },
  breadcrumbs: {
    ariaLabel: 'Percorso',
    homeLabel: 'Home',
  },
  faqDefaultHeading: 'Domande frequenti',
  relatedDefaultHeading: 'Pagine correlate',
  modal: {
    close: 'Chiudi',
    backdrop: 'Chiudi finestra',
  },
  themeLabelTemplate: 'Tema: {mode}. Attiva per cambiare tema.',
};
