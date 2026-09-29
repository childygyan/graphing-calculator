/**
 * French methodology dictionary — the `/methodology/` page prose.
 * Mirrors `src/i18n/en/methodology.ts` exactly.
 *
 * Inline anchors are listed per-section in `links`; the label text appears
 * in the body at the same position. Hrefs stay constant (they are
 * re-localized at render time by the page builders).
 */

import type { MethodologyStrings } from '../types.js';

export const methodology: MethodologyStrings = {
  seo: {
    title: 'Méthodologie — Comment nos maths et nos contenus sont vérifiés | Graphing Calculator',
    description:
      'Comment Graphing Calculator vérifie ses maths et ses contenus : un moteur ' +
      'déterministe, des centaines de tests automatisés, des exemples vérifiés par le ' +
      'moteur et des révisions datées.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Méthodologie', href: '/methodology/' },
  ],
  heading: 'Notre méthodologie',
  sections: [
    {
      heading: '1. Comment les calculs sont effectués et vérifiés',
      body: [
        'Une calculatrice n’est utile que si vous pouvez faire confiance à ce qu’elle vous ' +
          'dit. Cette page documente exactement comment Graphing Calculator calcule les ' +
          'résultats, comment son contenu éducatif est rédigé et vérifié, et ce que nous ne ' +
          'faisons délibérément pas.',
        'Chaque nombre sur ce site provient d’un moteur mathématique déterministe écrit ' +
          'spécifiquement pour lui. Une expression que vous tapez est découpée en unités ' +
          'lexicales, analysée en arbre syntaxique abstrait, puis compilée en fermetures ' +
          'exécutables — elle ne passe jamais par eval ni par du code généré. Les racines ' +
          'sont trouvées avec la méthode de Brent, les dérivées par différences centrées, ' +
          'les intégrales par la méthode de Simpson adaptative, et les limites par ' +
          'estimation numérique bilatérale.',
        'Plus de 550 tests automatisés couvrent le moteur d’expressions, les méthodes ' +
          'numériques, l’état du graphe, le traceur 3D et la calculatrice scientifique. Ils ' +
          's’exécutent avant chaque version, et une version ne sort que si tous réussissent. ' +
          'Quand un calcul ne peut pas être effectué de façon fiable — une discontinuité, une ' +
          'intégrale non convergente, une évaluation hors domaine — l’outil signale l’échec ' +
          'honnêtement au lieu d’inventer un nombre.',
      ],
      links: [{ label: 'Calculatrice graphique', href: '/graphing-calculator/' }],
    },
    {
      heading: '2. Comment le contenu éducatif est rédigé et révisé',
      body: [
        'Les guides d’apprentissage enseignent le traçage depuis les bases : ce que sont les ' +
          'fonctions, comment fonctionnent domaines et ensembles d’arrivée, comment lire ' +
          'intersections et asymptotes, et comment utiliser chaque outil de ce site. Chaque ' +
          'guide est rédigé à partir de matériel standard des programmes de mathématiques, ' +
          'pas aspiré ni reformulé depuis d’autres sites web.',
        'Avant la publication d’un guide, ses affirmations mathématiques sont vérifiées par ' +
          'rapport au moteur d’expressions propre au site — les racines, valeurs d’exemple et ' +
          'domaines énoncés dans le texte doivent correspondre à ce que la calculatrice ' +
          'elle-même calcule. Un réviseur humain de l’équipe de Graphing Calculator relit ' +
          'ensuite le guide pour la clarté et l’exactitude. Chaque guide porte une date de ' +
          '« Dernière révision » et une signature nommant le réviseur, pour que vous voyiez ' +
          'exactement quand la vérification a eu lieu.',
      ],
      links: [{ label: 'guides d’apprentissage', href: '/learn/' }],
    },
    {
      heading: '3. Comment l’assistant IA est contraint',
      body: [
        'L’assistant IA intégré peut expliquer des concepts, suggérer des expressions à ' +
          'tracer et vous aider à préparer des graphes. Il fonctionne via un schéma de ' +
          'commandes strict : il ne peut qu’émettre des commandes de calculatrice, et c’est ' +
          'le moteur de la calculatrice — pas l’IA — qui effectue chaque calcul. L’assistant ' +
          'ne peut pas changer ce que le moteur calcule, et il ne peut pas accéder à vos ' +
          'graphes enregistrés.',
        'Tant que le propriétaire du site n’a pas configuré de clé de fournisseur IA, ' +
          'l’assistant fonctionne dans un mode démo clairement étiqueté qui le dit à ' +
          'l’écran. Il ne prétend jamais être connecté à un modèle en direct quand ce n’est ' +
          'pas le cas.',
      ],
    },
    {
      heading: '4. Ce que nous ne faisons pas',
      body: [
        'Pas de réviseurs inventés. Nous ne publions pas de faux noms, photos ou titres. Les ' +
          'signatures de révision disent exactement qui a révisé le contenu — l’équipe de ' +
          'Graphing Calculator — et quand.',
        'Pas de statistiques fabriquées. Nous ne prétendons pas des nombres d’utilisateurs, ' +
          'des notes ou des classements « meilleur » que nous ne pouvons pas vérifier. Les ' +
          'comparaisons avec d’autres produits n’énoncent que des faits publiquement connus.',
        'Pas d’interfaces copiées. La calculatrice est une implémentation indépendante. Elle ' +
          'ne reproduit la marque, l’interface ou le matériel protégé d’aucun autre produit.',
        'Pas de collecte de données cachée. Les graphes sont stockés dans votre navigateur ; ' +
          'les liens de partage encodent l’état dans l’URL. Il n’y a pas de comptes et pas ' +
          'd’analyse de suivi activée par défaut. Voir la politique de confidentialité pour ' +
          'les détails.',
      ],
      links: [{ label: 'politique de confidentialité', href: '/privacy-policy/' }],
    },
    {
      heading: '5. Corrections',
      body: [
        'Si vous trouvez une erreur dans un calcul ou un guide, contactez-nous avec les ' +
          'détails. Les erreurs signalées sont examinées par rapport au moteur mathématique, ' +
          'corrigées quand elles sont confirmées, et la date de « Dernière révision » du ' +
          'guide est mise à jour pour refléter la correction.',
      ],
      links: [{ label: 'contactez-nous', href: '/contact/' }],
    },
  ],
  faqs: [
    {
      question: 'Comment les calculs sont-ils vérifiés ?',
      answer:
        'Chaque résultat provient d’un moteur mathématique déterministe intégré au site — ' +
        'les expressions sont découpées en unités lexicales, analysées en arbre syntaxique ' +
        'abstrait et compilées en fermetures, jamais évaluées par eval. Plus de 550 tests ' +
        'automatisés couvrent le moteur, les méthodes d’analyse et l’interface, et ils ' +
        's’exécutent avant chaque version.',
    },
    {
      question: 'Est-ce l’assistant IA qui fait les maths ?',
      answer:
        'Non. L’assistant IA explique les concepts et émet des commandes de calculatrice, ' +
        'mais c’est le moteur propre à la calculatrice qui fait toujours foi pour les ' +
        'résultats. Tant que le propriétaire du site n’a pas configuré de clé API, ' +
        'l’assistant fonctionne dans un mode démo clairement étiqueté.',
    },
    {
      question: 'Comment les guides d’apprentissage sont-ils révisés ?',
      answer:
        'Chaque guide est vérifié pour son exactitude mathématique avant publication : les ' +
        'racines, domaines et valeurs d’exemple qu’il énonce sont vérifiés par rapport au ' +
        'moteur d’expressions propre au site. Un réviseur humain de l’équipe de Graphing ' +
        'Calculator relit ensuite chaque guide pour la clarté et l’exactitude, et le guide ' +
        'porte une date de « Dernière révision » indiquant quand cette vérification a eu lieu.',
    },
    {
      question: 'Qui révise le contenu ?',
      answer:
        'Le contenu est révisé par l’équipe de Graphing Calculator — les personnes qui ' +
        'construisent et maintiennent ce site. Nous n’inventons pas de noms, photos ou ' +
        'titres de réviseurs ; la signature de chaque guide dit exactement qui l’a révisé et quand.',
    },
    {
      question: 'Que se passe-t-il quand une erreur est trouvée ?',
      answer:
        'Elle est corrigée, et la date de « Dernière révision » du guide est mise à jour. Si ' +
        'vous repérez une faute, vous pouvez la signaler via la page de contact et elle sera ' +
        'examinée par rapport au moteur mathématique.',
    },
    {
      question: 'La sortie numérique est-elle exacte ?',
      answer:
        'Les méthodes numériques sont des approximations, et la calculatrice le dit là où ça ' +
        'compte. Quand une racine, une dérivée ou une intégrale ne peut pas être calculée — ' +
        'un coin, un saut, une singularité — l’outil le signale honnêtement au lieu de ' +
        'renvoyer un nombre trompeur.',
    },
  ],
  related: ['/about/', '/learn/', '/graphing-calculator/', '/desmos-alternative/'],
};
