/**
 * French functions dictionary — the `/math-functions/` index prose and the
 * shared `[slug]` template labels. Mirrors `src/i18n/en/functions.ts` exactly.
 */

import type { FunctionsStrings } from '../types.js';

export const functions: FunctionsStrings = {
  seo: {
    title:
      'Bibliothèque de fonctions — Tracer et explorer les fonctions usuelles | Graphing Calculator',
    description:
      'Parcourez la bibliothèque de fonctions : sinus, cosinus, fonctions du second degré, ' +
      'exponentielles, logarithmes et plus — chacune avec racines, extrémums et propriétés ' +
      'clés calculés.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Bibliothèque de fonctions', href: '/math-functions/' },
  ],
  heading: 'Bibliothèque de fonctions',
  intro:
    'Chaque page ci-dessous couvre une fonction remarquable en profondeur : ce qu’elle est, ' +
    'ses propriétés mathématiques clés, où on la rencontre — plus un panneau de propriétés ' +
    'calculées en direct par le moteur mathématique propre à la calculatrice (racines, ' +
    'extrémums, intersections, dérivées et intégrales).',
  related: ['/graphing-calculator/', '/learn/', '/examples/', '/calculators/'],
  template: {
    eyebrow: 'Bibliothèque de fonctions',
    computedHeading: 'Propriétés calculées',
    computedNoteTemplate:
      'Calculé par le moteur mathématique propre à la calculatrice graphique au moment de la compilation pour {expression}.',
    rootsLabel: 'Racines dans [−10, 10]',
    yInterceptLabel: 'Intersection avec l’axe y f(0)',
    extremaLabel: 'Extrémums locaux dans [−10, 10]',
    samplesLabel: 'Valeurs échantillons',
    derivativeLabel: 'Dérivée f′(1)',
    integralLabel: 'Intégrale ∫₀¹ f(x) dx',
    noneFound: 'aucune trouvée',
    moreTemplate: '…et {count} de plus',
    computeFailed: 'Les propriétés n’ont pas pu être calculées pour cette expression.',
    keyFactsHeading: 'Faits essentiels',
    ctaTemplate: 'Tracer {notation} dans la calculatrice',
    undefinedValue: 'non défini',
    slugTitleTemplate: '{displayName} — Graphe et propriétés',
  },
};
