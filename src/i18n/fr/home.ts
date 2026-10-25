/**
 * French home dictionary — the marketing homepage (`src/pages/index.astro`).
 * Mirrors `src/i18n/en/home.ts` exactly.
 */

import type { HomeStrings } from '../types.js';

export const home: HomeStrings = {
  seo: {
    title: 'Calculatrice graphique en ligne gratuite | Graphing Calculator',
    description:
      'Calculatrice graphique en ligne gratuite : tracez des fonctions, analysez racines, ' +
      'dérivées et intégrales, explorez avec des curseurs et obtenez l’aide de l’IA. ' +
      'Sans inscription.',
  },
  hero: {
    title: 'Calculatrice graphique',
    subtitle:
      'Tracez des fonctions mathématiques dans votre navigateur — rapide, accessible et ' +
      'gratuit. Représentez des expressions, analysez-les avec de vraies méthodes numériques ' +
      'et demandez de l’aide à l’assistant IA. Sans inscription, sans téléchargement.',
    primaryCta: 'Ouvrir la calculatrice graphique',
    secondaryCta: 'Apprendre à tracer',
  },
  features: {
    ariaLabel: 'Fonctionnalités',
    cards: [
      {
        title: 'Traçage interactif',
        description: 'Zoomez, déplacez, explorez',
        body:
          'Un graphe rapide sur canevas avec grille adaptative, zoom fluide centré sur le ' +
          'curseur, déplacement et prise en charge tactile. Tracez des fonctions cartésiennes, ' +
          'des courbes paramétriques, des équations polaires et des inégalités — chaque ' +
          'expression avec sa propre couleur et son interrupteur de visibilité.',
        cta: 'Ouvrir la calculatrice',
        href: '/graphing-calculator/',
      },
      {
        title: 'Vraie analyse mathématique',
        description: 'Racines, dérivées, intégrales',
        body:
          'Trouvez les racines avec la méthode de Brent, calculez dérivées et intégrales ' +
          'définies numériquement, consultez des tableaux de valeurs et tracez des tangentes — ' +
          'le tout avec le même moteur, qui signale honnêtement quand un résultat ne peut pas ' +
          'être calculé.',
        cta: 'Essayer les outils mathématiques',
        href: '/calculators/',
      },
      {
        title: 'Assistant mathématique IA',
        description: 'Posez vos questions en langage naturel',
        body:
          'Posez vos questions en langage courant — l’assistant les traduit en commandes de ' +
          'calculatrice, trace ce que vous demandez et explique étape par étape. Le moteur ' +
          'mathématique effectue toujours les vrais calculs ; l’IA n’invente jamais de résultats.',
        cta: 'Interroger l’assistant',
        href: '/graphing-calculator/',
      },
      {
        title: 'Variables, curseurs et partage',
        description: 'Explorez et partagez',
        body:
          'Définissez des variables, animez-les avec des curseurs, enregistrez des graphes ' +
          'nommés dans votre navigateur et partagez-les sous forme de liens compacts. Votre ' +
          'espace de travail persiste entre les visites — tout reste sur votre appareil.',
        cta: 'Voir les exemples de graphes',
        href: '/examples/',
      },
    ],
  },
  explore: {
    ariaLabel: 'Explorer',
    heading: 'Explorez les mathématiques',
    cards: [
      {
        title: 'Bibliothèque de fonctions',
        body: 'Sinus, fonctions du second degré, exponentielles et plus — avec propriétés calculées.',
        href: '/math-functions/',
      },
      {
        title: 'Exemples de graphes',
        body: 'Des graphes sélectionnés qui s’ouvrent préchargés dans la calculatrice, avec des notes.',
        href: '/examples/',
      },
      {
        title: 'Apprendre à tracer',
        body: 'Des guides courts sur les fonctions, les dérivées, les intégrales et les asymptotes.',
        href: '/learn/',
      },
    ],
  },
  tutorial: {
    ariaLabel: 'Tutoriel',
    heading: 'Comment utiliser la calculatrice graphique',
    lede:
      'Cinq étapes, avec la calculatrice ci-dessus. Chaque capture d’écran est un vrai ' +
      'rendu de cette calculatrice — aucune maquette.',
    steps: [
      {
        title: 'Saisir une première expression',
        body:
          'Clique dans le panneau Expressions et saisis x^2. La parabole se trace ' +
          'instantanément pendant la saisie — rien à installer, aucun compte à créer.',
        image: '/images/tutorial/step-1-first-expression.png',
        alt: 'Calculatrice graphique affichant la parabole y = x au carré',
      },
      {
        title: 'Comparer deux courbes',
        body:
          'Clique sur Ajouter puis saisis sin(x). Chaque expression a sa propre couleur, ' +
          'et l’icône en forme d’œil affiche ou masque chaque courbe pour comparer les ' +
          'formes côte à côte.',
        image: '/images/tutorial/step-2-compare-curves.png',
        alt: 'Calculatrice graphique comparant la parabole y = x au carré avec une sinusoïde',
      },
      {
        title: 'Zoomer et déplacer le graphique',
        body:
          'Fais défiler pour zoomer vers le curseur et fais glisser pour déplacer la vue. ' +
          'En zoomant sur le sommet de x^2, on voit la courbe s’aplatir en (0, 0).',
        image: '/images/tutorial/step-3-zoom-in.png',
        alt: 'Vue rapprochée de la parabole y = x au carré autour de son sommet en (0, 0)',
      },
      {
        title: 'Trouver les racines d’une courbe',
        body:
          'Pour x^2 - 4, les racines apparaissent sous forme de marqueurs directement sur ' +
          'le graphique — en x = -2 et x = 2. Le panneau Analyse peut trouver racines, ' +
          'dérivées, intégrales et bien plus pour n’importe quelle expression.',
        image: '/images/tutorial/step-4-roots.png',
        alt: 'Graphique de y = x au carré moins 4 avec des marqueurs de racine en x = -2 et x = 2',
      },
      {
        title: 'Tracer une tangente',
        body:
          'Choisis un point sur une courbe — ici x = 1 sur x^2 — et la tangente apparaît ' +
          'en (1, 1), avec sa pente calculée par le moteur mathématique.',
        image: '/images/tutorial/step-5-tangent.png',
        alt: 'Graphique de y = x au carré avec une tangente en x = 1',
      },
    ],
  },
};
