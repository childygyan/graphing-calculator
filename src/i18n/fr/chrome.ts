/**
 * French chrome dictionary — shared layout copy (header, footer, nav,
 * breadcrumbs, modal, language switcher, theme label template).
 *
 * Mirrors `src/i18n/en/chrome.ts` exactly: same keys, same nesting, same
 * placeholder names ({year}, {name}, {language}, {mode}).
 */

import type { ChromeStrings } from '../types.js';

export const chrome: ChromeStrings = {
  skipLink: 'Aller au contenu principal',
  logoAriaLabel: 'Accueil de Graphing Calculator',
  nav: {
    primaryLabel: 'Principale',
    mobileLabel: 'Mobile',
    openMenu: 'Ouvrir le menu',
    items: [
      { label: 'Calculatrice graphique', href: '/graphing-calculator/' },
      { label: 'Fonctions', href: '/math-functions/' },
      { label: 'Exemples', href: '/examples/' },
      { label: 'Apprendre', href: '/learn/' },
      { label: 'Calculatrices', href: '/calculators/' },
      { label: 'Graphe 3D', href: '/3d/' },
      { label: 'Calculatrice scientifique', href: '/scientific-calculator/' },
      { label: 'À propos', href: '/about/' },
    ],
  },
  language: {
    label: 'Langue',
    summaryTemplate: 'Langue : {language}',
    note: '',
  },
  footer: {
    description:
      'Une calculatrice graphique en ligne rapide et accessible. Tracez des fonctions ' +
      'mathématiques, gérez plusieurs expressions et — dans les prochaines versions — ' +
      'explorez les mathématiques avec l’aide de l’IA.',
    columns: [
      {
        heading: 'Produit',
        links: [
          { label: 'Calculatrice graphique', href: '/graphing-calculator/' },
          { label: 'Calculatrices', href: '/calculators/' },
          { label: 'À propos', href: '/about/' },
          { label: 'Méthodologie', href: '/methodology/' },
        ],
      },
      {
        heading: 'Explorer',
        links: [
          { label: 'Bibliothèque de fonctions', href: '/math-functions/' },
          { label: 'Exemples de graphes', href: '/examples/' },
          { label: 'Apprendre à tracer', href: '/learn/' },
          { label: 'Graphes 3D', href: '/3d/' },
          { label: 'Alternative à Desmos', href: '/desmos-alternative/' },
        ],
      },
      {
        heading: 'Calculatrices',
        links: [
          { label: 'Calculatrice de dérivées', href: '/calculators/derivative/' },
          { label: 'Calculatrice d’intégrales', href: '/calculators/integral/' },
          { label: 'Calculateur de racines', href: '/calculators/root-finder/' },
          { label: 'Calculatrice scientifique', href: '/scientific-calculator/' },
        ],
      },
      {
        heading: 'Mentions légales',
        links: [
          { label: 'Politique de confidentialité', href: '/privacy-policy/' },
          { label: 'Conditions d’utilisation', href: '/terms/' },
          { label: 'Avertissement', href: '/disclaimer/' },
          { label: 'Contact', href: '/contact/' },
        ],
      },
    ],
    social: {
      groupLabel: 'Liens sociaux',
      comingSoonTitle: 'Bientôt disponible',
      comingSoon: '(bientôt)',
      links: [
        { label: 'X', href: '' },
        { label: 'GitHub', href: '' },
        { label: 'YouTube', href: '' },
      ],
    },
    copyrightTemplate: '{year} {name}. Tous droits réservés.',
  },
  breadcrumbs: {
    ariaLabel: 'Fil d’Ariane',
    homeLabel: 'Accueil',
  },
  faqDefaultHeading: 'Questions fréquentes',
  relatedDefaultHeading: 'Pages connexes',
  modal: {
    close: 'Fermer',
    backdrop: 'Fermer la boîte de dialogue',
  },
  themeLabelTemplate: 'Thème : {mode}. Activer pour changer de thème.',
};
