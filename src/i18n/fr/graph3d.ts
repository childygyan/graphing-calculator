/**
 * French 3D dictionary — the `/3d/` page prose plus the Graph3D island
 * strings. Mirrors `src/i18n/en/graph3d.ts` exactly.
 */

import type { Graph3DStrings } from '../types.js';

export const graph3d: Graph3DStrings = {
  seo: {
    title: 'Traceur 3D en ligne — Surfaces z = f(x, y) | Graphing Calculator',
    description:
      'Traceur 3D gratuit en ligne : tracez des surfaces z = f(x, y) avec rotation par ' +
      'glisser, zoom et détail réglable. Essayez les préréglages paraboloïde, ondulation et selle.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Traceur 3D', href: '/3d/' },
  ],
  heading: 'Traceur 3D',
  intro: [
    'Tracez n’importe quelle surface z = f(x, y) dans votre navigateur — sans téléchargement, sans plug-in. Tapez une expression utilisant x et y, puis faites glisser pour orbiter autour, faites défiler ou pincez pour zoomer, et augmentez le détail de la grille pour affiner le maillage.',
    'Le traceur utilise le même moteur d’expressions que la calculatrice graphique 2D, donc chaque fonction que vous connaissez déjà — sin, cos, sqrt, ^, et plus — fonctionne ici aussi. Là où une fonction n’est pas définie, la surface montre un vrai trou au lieu d’une fausse traînée.',
  ],
  sections: [
    {
      heading: 'Comment fonctionne la rotation 3D',
      body: [
        'Faire glisser le tracé fait orbiter une caméra virtuelle autour de la surface : les glissements horizontaux changent l’azimut (la direction cardinale depuis laquelle vous regardez) et les glissements verticaux changent l’élévation (la hauteur de la caméra au-dessus du plan xy). Faire défiler ou pincer rapproche ou éloigne la caméra. Si vous utilisez un clavier, sélectionnez le tracé et utilisez les flèches pour pivoter et + / − pour zoomer.',
        'La surface est dessinée avec l’algorithme du peintre : chaque quadrilatère du maillage est projeté avec une vraie caméra en perspective, trié d’arrière en avant selon la profondeur, et dessiné du plus lointain au plus proche avec ombrage de profondeur. La géométrie la plus proche masque donc ce qui est derrière, ce qui donne au tracé son impression de profondeur solide. Si vous laissez le tracé tranquille quelques secondes, il pivote lentement tout seul — sauf si vous avez activé la préférence de mouvements réduits, auquel cas il reste parfaitement immobile.',
      ],
    },
    {
      heading: 'Ce que montrent les préréglages',
      body: [
        'Paraboloïde (x²+y²), c’est le bol classique : z croît avec la distance à l’origine dans toutes les directions, avec son minimum de 0 en (0, 0). C’est l’analogue 3D de la parabole y = x².',
        'Ondulation (sin(√(x²+y²))) dessine des vagues concentriques rayonnant depuis l’origine — la valeur ne dépend que de la distance à l’origine, donc chaque courbe de niveau est un cercle. C’est une bonne façon de voir à quoi ressemble la symétrie radiale en surface.',
        'Selle (x²−y²) se courbe vers le haut le long de l’axe des x et vers le bas le long de l’axe des y. L’origine est un point selle : un minimum dans une direction et un maximum dans une autre, la version 3D d’un point critique de type inflexion.',
      ],
    },
    {
      heading: 'Rendu honnête : trous et mise à l’échelle de z',
      body: [
        'Les points non définis deviennent des trous, jamais des approximations. Tracez 1/(x²+y²) et vous verrez le maillage se rompre autour de la singularité à l’origine, exactement comme le traceur 2D interrompt une courbe à une asymptote verticale.',
        'Les surfaces très hautes sont réduites uniformément en z pour tenir à l’écran — le traceur vous indique le facteur d’échelle (par exemple, « axe z mis à l’échelle ×0,22 »). La forme et les minimum/maximum z rapportés restent fidèles à votre expression ; seules les proportions verticales sont compressées pour l’affichage.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Quelles expressions puis-je tracer en 3D ?',
      answer:
        'Toute expression en variables x et y, avec les mêmes fonctions que la calculatrice ' +
        '2D : puissances (x^2), racines (sqrt), fonctions trigonométriques (sin, cos, tan), ' +
        'exponentielles, logarithmes et constantes comme pi. Tout le reste — par exemple une ' +
        'variable z égarée — est rejeté avec un message d’erreur clair au lieu de tracer ' +
        'silencieusement quelque chose de faux.',
    },
    {
      question: 'Pourquoi ma surface a-t-elle des trous ?',
      answer:
        'Les trous sont des manques honnêtes là où votre fonction n’est pas définie : division ' +
        'par zéro, racine carrée d’un nombre négatif ou logarithme d’un nombre non positif. Le ' +
        'moteur de rendu saute ces quadrilatères plutôt que de dessiner un pic trompeur à travers ' +
        'la singularité.',
    },
    {
      question: 'Que change le réglage Détail ?',
      answer:
        'Il définit la résolution du maillage — le nombre de divisions de grille échantillonnées ' +
        'le long de chaque axe (24, 36, 48 ou 64). Un détail plus élevé dessine une surface plus ' +
        'lisse mais évalue la fonction plus de fois (64² = 4 225 points par nouveau tracé), alors ' +
        'commencez bas sur les téléphones anciens.',
    },
    {
      question: 'Le traceur 3D fonctionne-t-il sur mobile ?',
      answer:
        'Oui. Un doigt fait pivoter, le pincement à deux doigts zoome, et un glissement à deux ' +
        'doigts pivote avec une sensibilité réduite. La mise en page est pensée mobile d’abord et ' +
        'le canevas est dimensionné pour son conteneur avec mise à l’échelle selon la densité de ' +
        'pixels pour des lignes nettes.',
    },
    {
      question: 'Le tracé 3D est-il précis ?',
      answer:
        'La surface est échantillonnée à partir de votre expression exacte en chaque point de ' +
        'grille — aucune estimation IA, aucun lissage des mathématiques sous-jacentes. Entre les ' +
        'points de grille, le maillage relie les échantillons par des quadrilatères droits, donc ' +
        'des détails très anguleux peuvent sembler légèrement facettés à faible détail ; augmentez ' +
        'le réglage Détail pour resserrer le maillage.',
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/learn/'],
  island: {
    surfaceLabel: 'Surface : z = f(x, y)',
    placeholder: 'p. ex. x^2 + y^2',
    plot: 'Tracer',
    emptyError: 'Saisissez une expression en x et y, par exemple x^2+y^2.',
    genericError: 'Impossible de tracer cette expression.',
    parseError: 'Impossible d’analyser cette expression.',
    unknownVariablesTemplate:
      'Variable{plural} inconnue{plural} : {names}. Les surfaces 3D utilisent x et y uniquement.',
    presetGroup: 'Surfaces prédéfinies',
    presets: [
      { label: 'Paraboloïde', description: 'Un bol ouvert vers le haut ; minimum 0 à l’origine.' },
      { label: 'Ondulation', description: 'Vagues concentriques rayonnant depuis l’origine.' },
      {
        label: 'Selle',
        description:
          'Se courbe vers le haut le long de x, vers le bas le long de y — un point selle à l’origine.',
      },
    ],
    detailGroup: 'Résolution de la grille',
    detailLabel: 'Détail :',
    hint: 'Faites glisser pour pivoter · faites défiler ou pincez pour zoomer · sélectionnez le tracé et utilisez les flèches / + / −',
    zMin: 'z min',
    zMax: 'z max',
    autoScaledTemplate: '(axe z mis à l’échelle ×{scale} pour tenir à l’écran)',
    noFiniteGrid: 'Aucune valeur finie sur cette grille — essayez une autre expression.',
    canvasAriaTemplate:
      'Tracé 3D de la surface z égale {expression}. {stats}' +
      'Faites glisser pour pivoter, faites défiler ou pincez pour zoomer. Une fois sélectionné, les flèches pivotent et plus/moins zoome.',
    canvasAriaEmpty: 'Traceur de surfaces 3D. Aucune expression tracée pour le moment.',
    summaryTemplate: 'Résumé de la surface : z = {expression} sur x et y de -5 à 5. {stats}',
    summaryStatsTemplate:
      'z minimum {zMin}, z maximum {zMax}, calculés sur {count} points de grille.',
    summaryNoFinite: 'Aucune valeur z finie sur la grille actuelle.',
    summaryEmpty: 'Aucune surface tracée.',
    canvasAriaStatsTemplate: 'Pour x et y de -5 à 5, z varie de {zMin} à {zMax}. ',
    canvasAriaNoFiniteStats: 'Aucune valeur finie sur la grille actuelle. ',
  },
};
