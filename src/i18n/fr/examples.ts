/**
 * French examples dictionary — the `/examples/` index prose and the
 * shared `[slug]` template labels. Mirrors `src/i18n/en/examples.ts` exactly.
 */

import type { ExamplesStrings } from '../types.js';

export const examples: ExamplesStrings = {
  seo: {
    title: 'Exemples de graphes — Graphes interactifs sélectionnés | Graphing Calculator',
    description:
      'Explorez des exemples de graphes sélectionnés — mouvement de projectile, oscillation ' +
      'amortie, croissance logistique, courbes de Lissajous et plus — chacun s’ouvre ' +
      'préchargé dans la calculatrice.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Exemples de graphes', href: '/examples/' },
  ],
  heading: 'Exemples de graphes',
  intro:
    'Des graphes choisis avec soin qui montrent ce que la calculatrice peut faire — de la ' +
    'physique et de l’ingénierie à la beauté mathématique pure. Chaque exemple s’ouvre ' +
    'préchargé dans la calculatrice, avec des notes sur ce qu’il faut observer.',
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/calculators/'],
  template: {
    eyebrow: 'Exemple détaillé',
    plottedHeading: 'Expressions tracées',
    openCta: 'Ouvrir ce graphe dans la calculatrice',
    preloadNote:
      'Le lien précharge exactement ces expressions dans la calculatrice — pas besoin de taper.',
    noticeHeading: 'Ce qu’il faut remarquer',
  },
};
