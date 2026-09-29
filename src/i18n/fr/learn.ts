/**
 * French learn dictionary — the `/learn/` index prose and the shared
 * `[slug]` article template labels. Mirrors `src/i18n/en/learn.ts` exactly.
 *
 * Slugs, expressions, `tryExpressions`, and `reviewedOn` dates are
 * DO-NOT-TRANSLATE; the month-name arrays let locale formatters render
 * those dates in French.
 */

import type { LearnStrings } from '../types.js';

export const learn: LearnStrings = {
  seo: {
    title: 'Apprendre à tracer — Fonctions, dérivées, intégrales et plus | Graphing Calculator',
    description:
      'Apprenez les concepts du traçage étape par étape : fonctions, dérivées, intégrales, ' +
      'asymptotes, inégalités et équations paramétriques — avec des exemples à essayer.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Apprendre', href: '/learn/' },
  ],
  heading: 'Apprendre à tracer',
  intro:
    'Des guides courts et pratiques sur les idées derrière les graphes — écrits pour être ' +
    'lus à côté de la calculatrice, avec des expressions à essayer vous-même.',
  months: [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ],
  shortMonths: [
    'janv.',
    'févr.',
    'mars',
    'avr.',
    'mai',
    'juin',
    'juil.',
    'août',
    'sept.',
    'oct.',
    'nov.',
    'déc.',
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/calculators/'],
  template: {
    minReadTemplate: 'Apprendre · {minutes} min de lecture',
    reviewAriaLabel: 'Informations de révision',
    reviewLine: 'Révisé pour l’exactitude mathématique par l’équipe de Graphing Calculator',
    lastReviewedTemplate: 'Dernière révision : {date}',
    indexCardReviewTemplate: 'Révisé pour l’exactitude · {date}',
    tryHeading: 'Essayez dans la calculatrice',
    tryIntroTemplate:
      'Tapez l’une de ces expressions dans la {link} pour voir les idées ci-dessus en action :',
    calculatorLinkText: 'calculatrice graphique',
    takeawaysHeading: 'Points essentiels',
  },
};
