/**
 * French desmos-alternative dictionary — the `/desmos-alternative/` page prose.
 * Mirrors `src/i18n/en/desmosAlt.ts` exactly.
 *
 * Legal constraints (from the page source, do not weaken): "Desmos" appears
 * only in nominative, comparative use; about Desmos state only publicly
 * well-known facts; no reviews, ratings, statistics, or user counts.
 */

import type { DesmosAltStrings } from '../types.js';

export const desmosAlt: DesmosAltStrings = {
  seo: {
    title:
      'Meilleure alternative à Desmos — Calculatrice graphique gratuite en ligne | Graphing Calculator',
    description:
      'Vous cherchez une alternative à Desmos ? Graphing Calculator est une calculatrice ' +
      'graphique en ligne gratuite et indépendante, avec traçage 2D/3D, aide IA et outils ' +
      'd’analyse.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Alternative à Desmos', href: '/desmos-alternative/' },
  ],
  heading: 'Meilleure alternative à Desmos — Calculatrice graphique gratuite en ligne',
  asideAriaLabel: 'Avis d’indépendance',
  disclaimer:
    'Produit indépendant. Graphing Calculator n’est ni affilié à Desmos ou Amplify, ni ' +
    'approuvé par eux, ni lié à eux. « Desmos » n’est utilisé sur cette page que pour ' +
    'décrire ce dont ce site est une alternative.',
  sections: [
    {
      heading: 'Desmos contre Graphing Calculator',
      body: [
        'Beaucoup de gens cherchent sur le web une calculatrice Desmos quand ils ont besoin ' +
          'de tracer une fonction rapidement. Si c’est votre cas, Graphing Calculator est une ' +
          'alternative gratuite et indépendante que vous pouvez utiliser tout de suite — sans ' +
          'inscription, sans téléchargement, sans compte.',
        'Un comparatif des bases, côte à côte. Au sujet de Desmos, ce tableau n’énonce que ' +
          'des faits publiquement connus — rien de deviné ni de non vérifié.',
      ],
    },
    {
      heading: 'Ce que vous obtenez avec Graphing Calculator',
      body: [
        'La calculatrice graphique 2D trace les fonctions instantanément pendant que vous ' +
          'tapez, avec zoom centré sur le curseur, déplacement et prise en charge tactile. ' +
          'Ajoutez des curseurs pour explorer les paramètres en direct, passez en mode ' +
          'paramétrique ou polaire, ou coloriez des inégalités — le tout dans la même vue.',
        'En trois dimensions, le traceur de surfaces 3D rend z = f(x, y) avec contrôles ' +
          'd’orbite, zoom, contrôle de la résolution et surfaces prédéfinies, compilés par le ' +
          'moteur mathématique propre au site.',
        'L’analyse intégrée trouve racines, intersections, dérivées, intégrales, limites et ' +
          'extrémums, et trace tangentes et normales directement sur le graphe. Les ' +
          'calculatrices mathématiques autonomes couvrent les mêmes opérations étape par ' +
          'étape, et les guides d’apprentissage expliquent les idées derrière.',
        'Un assistant mathématique IA est intégré pour expliquer les concepts et aider à ' +
          'préparer les graphes. Tant que le propriétaire du site n’a pas configuré de clé ' +
          'API, il fonctionne dans un mode démo clairement étiqueté — c’est la calculatrice ' +
          'elle-même, jamais l’IA, qui fait foi pour les résultats.',
        'Chaque graphe peut être partagé sous forme de lien qui rouvre exactement la même ' +
          'vue, sans compte nécessaire d’un côté comme de l’autre. Et il n’y a rien à accepter ' +
          'au-delà de l’essentiel : pas de comptes, pas de cookies, pas de traqueurs tiers.',
      ],
      links: [
        { label: 'La calculatrice graphique 2D', href: '/graphing-calculator/' },
        { label: 'traceur de surfaces 3D', href: '/3d/' },
        { label: 'calculatrices mathématiques autonomes', href: '/calculators/' },
        { label: 'guides d’apprentissage', href: '/learn/' },
      ],
    },
  ],
  faqs: [
    {
      question: 'Est-ce affilié à Desmos ?',
      answer:
        'Non. Graphing Calculator est un produit indépendant. Il n’est ni affilié à Desmos ' +
        'ou Amplify, ni approuvé par eux, ni lié à eux. Le nom « Desmos » n’apparaît sur ' +
        'cette page que pour décrire ce dont ce site est une alternative.',
    },
    {
      question: 'Graphing Calculator est-il gratuit ?',
      answer:
        'Oui. L’utilisation de Graphing Calculator est gratuite, et il n’y a pas ' +
        'd’inscription — le site n’a aucun compte.',
    },
    {
      question: 'Ai-je besoin d’un compte pour enregistrer ou partager des graphes ?',
      answer:
        'Non. Il n’y a aucun compte à créer. Vous pouvez transformer n’importe quel graphe ' +
        'en lien partageable qui rouvre exactement la même vue, et quiconque ouvre le lien ' +
        'n’a besoin d’aucun compte non plus.',
    },
    {
      question: 'Puis-je tracer des graphes 3D ?',
      answer:
        'Oui. Graphing Calculator comprend un traceur interactif de surfaces 3D pour les ' +
        'fonctions de la forme z = f(x, y), avec contrôles d’orbite, zoom, contrôle de la ' +
        'résolution et surfaces prédéfinies.',
    },
    {
      question: 'Y a-t-il un assistant IA ?',
      answer:
        'Oui. L’assistant mathématique IA intégré peut expliquer des concepts et vous aider ' +
        'à préparer des graphes. Tant que le propriétaire du site n’a pas configuré de clé ' +
        'API, il fonctionne dans un mode démo clairement étiqueté, et c’est la calculatrice ' +
        'elle-même — pas l’IA — qui fait toujours foi pour les résultats.',
    },
    {
      question: 'Quels outils d’analyse sont inclus ?',
      answer:
        'Racines, intersections, dérivées, intégrales, limites, extrémums et droites ' +
        'tangentes/normales — le tout calculé par le moteur mathématique propre au site et ' +
        'tracé directement sur le graphe.',
    },
  ],
  table: {
    caption: 'Comparaison des bases : Desmos contre Graphing Calculator',
    headers: ['Fonctionnalité', 'Desmos', 'Graphing Calculator'],
    rows: [
      { feature: 'Prix', ours: 'Utilisation gratuite', theirs: 'Utilisation gratuite' },
      {
        feature: 'Inscription requise ?',
        ours: 'Non — le site n’a aucun compte',
        theirs: 'Non — le traçage de base fonctionne sans compte',
      },
      {
        feature: 'Traçage 2D',
        ours: 'Oui — avec curseurs, modes paramétrique et polaire, et inégalités',
        theirs: 'Oui',
      },
    ],
  },
  related: ['/graphing-calculator/', '/calculators/', '/learn/'],
};
