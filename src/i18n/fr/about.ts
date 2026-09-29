/**
 * French about dictionary — the `/about/` page prose.
 * Mirrors `src/i18n/en/about.ts` exactly.
 *
 * Creator links are nominative identifiers (exact URLs from the page); they
 * are DO-NOT-TRANSLATE — only the link labels and surrounding copy are
 * dictionary strings.
 */

import type { AboutStrings } from '../types.js';

export const about: AboutStrings = {
  seo: {
    title: 'À propos',
    description:
      'Ce qu’est Graphing Calculator : fonctionnalités, fonctionnement du moteur ' +
      'mathématique et traitement de vos données.',
  },
  crumbs: [{ label: 'Accueil', href: '/' }],
  heading: 'À propos',
  intro: [
    'Graphing Calculator est un outil mathématique original, basé sur navigateur, pour ' +
      'tracer des fonctions et explorer les mathématiques. C’est une implémentation ' +
      'indépendante — construite de zéro, sans dériver d’aucun autre produit graphique.',
    'Ce qu’il fait aujourd’hui : tracer des fonctions cartésiennes, des courbes ' +
      'paramétriques, des équations polaires et des inégalités sur un graphe interactif sur ' +
      'canevas avec zoom, déplacement et prise en charge tactile ; analyser des expressions ' +
      'avec de vraies méthodes numériques (racines par la méthode de Brent, dérivées par ' +
      'différences centrées, intégrales par la méthode de Simpson adaptative, tableaux, ' +
      'tangentes) ; animer des paramètres avec des variables et des curseurs ; obtenir de ' +
      'l’aide en langage courant d’un assistant IA qui émet des commandes de calculatrice ' +
      'pendant que le moteur mathématique effectue les vrais calculs ; et enregistrer, ' +
      'partager, importer et exporter des états de graphe.',
  ],
  creator: {
    heading: 'À propos du créateur',
    imageAlt: 'Firoz Khan, créateur de Graphing Calculator',
    name: 'Firoz Khan',
    body: 'Graphing Calculator est construit et maintenu par Firoz Khan. Retrouvez-le ici :',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/firoz-khan-1153358a/' },
      { label: 'GitHub', href: 'https://github.com/fkdigitalmedia' },
      { label: 'Instagram', href: 'https://www.instagram.com/rtibyfiroz/' },
    ],
  },
  sections: [
    {
      heading: 'Comment vos données sont traitées',
      body: [
        'Tout s’exécute sur votre appareil. Les graphes que vous enregistrez sont stockés ' +
          'dans le stockage local de votre navigateur ; les liens de partage encodent l’état ' +
          'du graphe dans l’URL elle-même. Il n’y a pas de comptes, pas d’analyse de suivi ' +
          'activée par défaut, et aucune donnée personnelle envoyée à un serveur par la ' +
          'calculatrice. Les requêtes de l’assistant IA ne vont vers le fournisseur d’IA ' +
          'configuré que lorsque vous utilisez l’assistant.',
      ],
    },
    {
      heading: 'Honnêteté sur les résultats',
      body: [
        'Les méthodes numériques sont des approximations, et la calculatrice le dit là où ça ' +
          'compte : quand une racine, une dérivée ou une intégrale ne peut pas être calculée ' +
          '— un coin, un saut, une singularité — l’outil le signale honnêtement au lieu de ' +
          'renvoyer un nombre trompeur.',
      ],
    },
    {
      heading: 'Comment nous révisons le contenu',
      body: [
        'Chaque guide de ce site est vérifié pour son exactitude mathématique avant ' +
          'publication. Les faits mathématiques de chaque guide — racines, domaines, valeurs ' +
          'd’exemple — sont vérifiés par rapport au moteur d’expressions propre au site, le ' +
          'même code qui fait fonctionner la calculatrice : ce que vous lisez correspond ' +
          'donc à ce que l’outil calcule.',
        'Un réviseur humain de l’équipe de Graphing Calculator relit ensuite chaque guide ' +
          'pour la clarté et l’exactitude. Quand une erreur est trouvée — un signe faux, un ' +
          'exemple trompeur, une étape qui saute trop — elle est corrigée avant la mise en ' +
          'ligne du guide, et le guide porte une date de « Dernière révision » pour que vous ' +
          'voyiez quand cette vérification a eu lieu.',
      ],
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
};
