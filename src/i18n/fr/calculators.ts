/**
 * French calculators dictionary — the `/calculators/` hub plus the
 * derivative, integral, and root-finder tool pages, and the MathTools
 * island strings. Mirrors `src/i18n/en/calculators.ts` exactly.
 */

import type { CalculatorsStrings } from '../types.js';

export const calculators: CalculatorsStrings = {
  index: {
    seo: {
      title:
        'Calculatrices — Graphique, scientifique, 3D, dérivées, intégrales et racines | Graphing Calculator',
      description:
        'Parcourez la collection de calculatrices : la calculatrice graphique, la ' +
        'calculatrice scientifique, le traçage 3D, plus des outils ciblés de dérivées, ' +
        'd’intégrales et de recherche de racines. Gratuit, sans inscription.',
    },
    crumbs: [
      { label: 'Accueil', href: '/' },
      { label: 'Calculatrices', href: '/calculators/' },
    ],
    heading: 'Calculatrices',
    intro:
      'Une petite collection d’outils mathématiques ciblés. Chacun n’est listé ici que s’il ' +
      'fonctionne vraiment — rien n’est une entrée fictive.',
    tools: [
      {
        title: 'Calculatrice graphique',
        description: 'L’espace de travail principal',
        blurb:
          'Tracez des expressions cartésiennes, paramétriques et polaires avec un graphe ' +
          'interactif sur canevas, analysez racines, dérivées et intégrales, animez des ' +
          'variables avec des curseurs et interrogez l’assistant IA.',
        href: '/graphing-calculator/',
        cta: 'Ouvrir la calculatrice graphique',
      },
      {
        title: 'Calculatrice de dérivées',
        description: 'f′(a) numériquement',
        blurb:
          'Saisissez n’importe quelle fonction f(x) et un point a pour estimer la dérivée f′(a) ' +
          'avec la méthode des différences centrées — la même routine que derrière les ' +
          'tangentes du graphe.',
        href: '/calculators/derivative/',
        cta: 'Dériver une fonction',
      },
      {
        title: 'Calculatrice d’intégrales',
        description: 'Intégrales définies',
        blurb:
          'Calculez ∫[a,b] f(x) dx numériquement avec la méthode de Simpson adaptative, avec ' +
          'une explication de l’aire signée et des cas où les intégrales s’annulent.',
        href: '/calculators/integral/',
        cta: 'Intégrer une fonction',
      },
      {
        title: 'Calculateur de racines',
        description: 'Résoudre f(x) = 0',
        blurb:
          'Trouvez toutes les racines réelles de f(x) sur un intervalle de votre choix, par ' +
          'balayage des changements de signe affiné avec la méthode de Brent — vérifié, ' +
          'jamais deviné.',
        href: '/calculators/root-finder/',
        cta: 'Trouver les racines',
      },
      {
        title: 'Calculatrice scientifique',
        description: 'Trigonométrie, logs, puissances et plus',
        blurb:
          'Une calculatrice à pavé complet : fonctions trigonométriques et inverses avec ' +
          'modes DEG/RAD, logarithmes, puissances, racines et constantes — avec des messages ' +
          'd’erreur honnêtes au lieu de NaN silencieux.',
        href: '/scientific-calculator/',
        cta: 'Calculer',
      },
      {
        title: 'Graphe 3D',
        description: 'Surfaces z = f(x, y)',
        blurb:
          'Tracez des surfaces 3D comme x²+y² ou sin(√(x²+y²)). Faites glisser pour pivoter, ' +
          'faites défiler pour zoomer et réglez le détail du maillage — rendu en direct sur ' +
          'canevas avec des trous honnêtes là où la fonction n’est pas définie.',
        href: '/3d/',
        cta: 'Explorer les surfaces 3D',
      },
    ],
    related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
  },
  derivative: {
    seo: {
      title: 'Calculatrice de dérivées — Calculez f′(x) instantanément | Graphing Calculator',
      description:
        'Calculatrice de dérivées en ligne gratuite : saisissez n’importe quelle fonction f(x) ' +
        'et un point pour obtenir f′(a) numériquement, avec une explication de ce que la ' +
        'dérivée signifie.',
    },
    crumbs: [
      { label: 'Accueil', href: '/' },
      { label: 'Calculatrices', href: '/calculators/' },
      { label: 'Calculatrice de dérivées', href: '/calculators/derivative/' },
    ],
    heading: 'Calculatrice de dérivées',
    intro: [
      'La dérivée d’une fonction en un point mesure son taux de variation instantané — ' +
        'géométriquement, la pente de la tangente au graphe en ce point. Saisissez n’importe ' +
        'quelle fonction ci-dessous et cet outil estime f′(a) numériquement.',
    ],
    sections: [
      {
        heading: 'Comment fonctionne le calcul',
        body: [
          'Cet outil utilise la formule des différences centrées : f′(a) ≈ (f(a + h) − f(a − h)) / 2h, ' +
            'avec un petit pas h. C’est la même méthode numérique que la calculatrice graphique ' +
            'utilise pour son analyse des tangentes : les résultats ici correspondent donc à ce ' +
            'que vous voyez quand vous inspectez une tangente sur le graphe.',
          'La dérivation numérique est une approximation. Pour les fonctions lisses comme les ' +
            'polynômes, les fonctions trigonométriques et les exponentielles, l’estimation est ' +
            'précise à de nombreuses décimales. Aux coins aigus (comme |x| en x = 0) ou aux ' +
            'discontinuités, la dérivée peut ne pas exister, et l’outil vous le dira honnêtement ' +
            'au lieu de renvoyer un nombre trompeur.',
        ],
      },
      {
        heading: 'Ce que la dérivée vous apprend',
        body: [
          'Une dérivée positive signifie que la fonction croît en ce point ; une dérivée ' +
            'négative signifie qu’elle décroît. Plus la magnitude est grande, plus le graphe est ' +
            'raide. Là où la dérivée est nulle, le graphe s’aplatit momentanément — ce sont les ' +
            'emplacements candidats pour les maxima et minima locaux.',
          'Les dérivées ont aussi un sens physique : si f(x) est la position en fonction du ' +
            'temps, f′(x) est la vitesse ; si f(x) est la vitesse, f′(x) est l’accélération. ' +
            'Essayez f(x) = x² en a = 2 (résultat : 4) et en a = −2 (résultat : −4) pour voir le ' +
            'changement de signe de part et d’autre du minimum.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Est-ce une dérivée symbolique exacte ?',
        answer:
          'Non — cet outil calcule une approximation numérique avec la méthode des différences ' +
          'centrées. Elle est très précise pour les fonctions lisses mais reste une estimation, ' +
          'affichée arrondie à 6 décimales.',
      },
      {
        question: 'Pourquoi échoue-t-il en certains points ?',
        answer:
          'Certaines fonctions ne sont pas dérivables partout : |x| a un coin en x = 0, et les ' +
          'fonctions avec des sauts ou des asymptotes verticales n’ont pas de pente sensée à ' +
          'ces endroits. L’outil signale qu’il ne peut pas estimer la dérivée plutôt que de deviner.',
      },
      {
        question: 'Quel est le lien avec la fonction de tangente ?',
        answer:
          'La tangente à f en x = a a pour pente f′(a) — exactement ce que cet outil calcule. ' +
          'Dans la calculatrice graphique, vous pouvez tracer la tangente sur le graphe et lire ' +
          'la même pente visuellement.',
      },
    ],
    related: [
      '/calculators/integral/',
      '/calculators/root-finder/',
      '/learn/understanding-derivatives/',
      '/math-functions/quadratic/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Calculatrice de dérivées',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'p. ex. x^2',
      atLabel: 'en a =',
      atPlaceholder: 'p. ex. 2',
      calculate: 'Calculer f′(a)',
      fillError: 'Saisissez une fonction et un point.',
      parseError: 'Impossible d’analyser f(x). Vérifiez l’expression.',
      badPoint: 'Le point a doit être un nombre.',
      resultTemplate: 'f′({a}) ≈ {value}',
      noDerivative:
        'Impossible d’estimer la dérivée ici — la fonction est peut-être non définie ou non ' +
        'lisse en ce point.',
      loadFailedTitle: 'Échec du chargement de l’outil de dérivation',
      panelTitle: 'Dériver',
      functionNameLabel: 'Fonction f(x)',
      examplePlaceholder: 'p. ex. x^2 - 4',
      pointLabel: 'Point a',
      compute: 'Calculer f′(a)',
      pointFiniteError: 'Saisissez un nombre fini pour le point.',
      notDifferentiableError:
        'La dérivée n’a pas pu être estimée à ce point (la fonction n’est peut-être pas dérivable en ce point).',
      estimateError: 'La dérivée n’a pas pu être estimée à ce point.',
      resultLineTemplate: "f'({a}) ≈ {value}",
      parseFallback: 'Impossible d’analyser cette expression.',
    },
  },
  integral: {
    seo: {
      title: 'Calculatrice d’intégrales — Intégrales définies en ligne | Graphing Calculator',
      description:
        'Calculatrice d’intégrales en ligne gratuite : calculez des intégrales définies ' +
        '∫[a,b] f(x) dx numériquement avec la méthode de Simpson adaptative, expliquées ' +
        'étape par étape.',
    },
    crumbs: [
      { label: 'Accueil', href: '/' },
      { label: 'Calculatrices', href: '/calculators/' },
      { label: 'Calculatrice d’intégrales', href: '/calculators/integral/' },
    ],
    heading: 'Calculatrice d’intégrales',
    intro: [
      'L’intégrale définie de f de a à b mesure l’aire signée entre le graphe et l’axe des x ' +
        'sur cet intervalle. Saisissez une fonction et des bornes ci-dessous pour la calculer ' +
        'numériquement.',
    ],
    sections: [
      {
        heading: 'Comment fonctionne le calcul',
        body: [
          'Cet outil utilise la méthode de Simpson adaptative : il approxime la fonction par ' +
            'des paraboles sur de petits sous-intervalles et subdivise récursivement là où ' +
            'l’estimation n’est pas encore assez précise. C’est la même routine de quadrature ' +
            'que derrière les régions d’intégrale coloriées dans la calculatrice graphique : ' +
            'les nombres concordent.',
          'Comme la méthode est adaptative, les fonctions lisses convergent vite tandis que ' +
            'les régions délicates — pics aigus, oscillations — reçoivent automatiquement plus ' +
            'de subdivisions. Le résultat est arrondi à 6 décimales ; l’estimation sous-jacente ' +
            'est typiquement précise bien au-delà.',
        ],
      },
      {
        heading: 'Lire le résultat',
        body: [
          'L’aire au-dessus de l’axe des x compte positivement et l’aire en dessous compte ' +
            'négativement : une intégrale peut donc être nulle même quand la fonction ne l’est ' +
            'pas — par exemple, ∫[−1,1] x³ dx = 0 car les deux lobes s’annulent exactement. Si ' +
            'vous voulez l’aire géométrique totale, intégrez plutôt la valeur absolue.',
          'Les intégrales accumulent aussi des quantités : si f(x) est un débit (litres par ' +
            'minute, disons), l’intégrale sur un intervalle de temps est la quantité totale. ' +
            'Essayez f(x) = x² de 0 à 1 (résultat : 1/3 ≈ 0,333333) — un classique que tout ' +
            'étudiant en calcul différentiel rencontre.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Est-ce une évaluation exacte par primitive ?',
        answer:
          'Non — l’outil intègre numériquement avec la méthode de Simpson adaptative plutôt ' +
          'que de chercher une primitive symbolique. Pour les fonctions bien comportées, ' +
          'l’approximation est précise à de nombreuses décimales.',
      },
      {
        question:
          'Pourquoi mon intégrale est-elle nulle alors que la fonction a visiblement de l’aire ?',
        answer:
          'L’intégrale définie est une aire signée : les régions sous l’axe des x se ' +
          'soustraient de celles au-dessus. Les fonctions symétriques comme sin(x) sur [0, 2π] ' +
          's’intègrent à exactement zéro pour cette raison.',
      },
      {
        question:
          'Que se passe-t-il si la fonction n’est pas définie quelque part dans l’intervalle ?',
        answer:
          'Les fonctions avec des singularités dans [a, b] (comme 1/x de part et d’autre de ' +
          'x = 0) n’ont pas d’intégrales définies ordinaires à ces endroits. L’outil signalera ' +
          'que l’intégrale n’a pas pu être estimée au lieu de renvoyer un nombre faux.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/root-finder/',
      '/learn/understanding-integrals/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Calculatrice d’intégrale définie',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'p. ex. x^2',
      fromLabel: 'de a =',
      toLabel: 'à b =',
      fromPlaceholder: '0',
      toPlaceholder: '1',
      calculate: 'Calculer l’intégrale',
      fillError: 'Saisissez une fonction et les deux bornes.',
      parseError: 'Impossible d’analyser f(x). Vérifiez l’expression.',
      badBounds: 'Les bornes a et b doivent être des nombres.',
      resultTemplate: '∫[{a}, {b}] f(x) dx ≈ {value}',
      noConvergence: 'L’intégrale n’a pas pu être estimée sur cet intervalle.',
      loadFailedTitle: 'Échec du chargement de l’outil d’intégration',
      panelTitle: 'Intégrer',
      functionNameLabel: 'Fonction f(x)',
      examplePlaceholder: 'p. ex. x^2 - 4',
      lowerBoundLabel: 'Borne inférieure',
      upperBoundLabel: 'Borne supérieure',
      boundsFiniteError: 'Saisissez des nombres finis pour les deux bornes.',
      estimateError: 'L’intégrale n’a pas pu être estimée sur cet intervalle.',
      parseFallback: 'Impossible d’analyser cette expression.',
    },
  },
  rootFinder: {
    seo: {
      title: 'Calculateur de racines — Résoudre f(x) = 0 en ligne | Graphing Calculator',
      description:
        'Calculateur de racines en ligne gratuit : saisissez n’importe quelle fonction f(x) ' +
        'et un intervalle pour trouver toutes ses racines (intersections avec l’axe des x) ' +
        'avec la méthode de Brent, en toute honnêteté.',
    },
    crumbs: [
      { label: 'Accueil', href: '/' },
      { label: 'Calculatrices', href: '/calculators/' },
      { label: 'Calculateur de racines', href: '/calculators/root-finder/' },
    ],
    heading: 'Calculateur de racines',
    intro: [
      'Une racine de f est une valeur x où f(x) = 0 — les points où le graphe traverse ou ' +
        'touche l’axe des x. Saisissez une fonction et un intervalle de recherche ci-dessous ' +
        'pour trouver chaque racine à l’intérieur.',
    ],
    sections: [
      {
        heading: 'Comment fonctionne le calcul',
        body: [
          'L’outil balaye d’abord l’intervalle à la recherche de changements de signe, puis ' +
            'affine chaque racine encadrée avec la méthode de Brent — un algorithme robuste qui ' +
            'combine la sécurité de la dichotomie avec la vitesse de la sécante et de ' +
            'l’interpolation quadratique inverse. C’est la même routine que la calculatrice ' +
            'graphique utilise pour son analyse de racines.',
          'Les racines où la fonction touche simplement l’axe sans changer de signe (comme x² ' +
            'en x = 0) sont trouvées par un balayage séparé sensible aux extrémums, car la ' +
            'pure détection de changements de signe les manquerait. Chaque racine rapportée ' +
            'est vérifiée en évaluant f au résultat.',
        ],
      },
      {
        heading: 'Conseils pour de bons résultats',
        body: [
          'Choisissez un intervalle qui encadre les racines qui vous intéressent : l’outil ne ' +
            'cherche que là où vous le lui dites. Pour x² − 4 sur [−10, 10], il trouve −2 et 2 ; ' +
            'réduisez l’intervalle à [0, 10] et il ne rapporte que 2.',
          'Si aucune racine n’est rapportée, soit la fonction n’en a vraiment aucune sur ' +
            'l’intervalle (comme x² + 1 sur la droite réelle), soit les racines se trouvent ' +
            'exactement aux extrémités de votre intervalle — décalez légèrement les bornes et ' +
            'réessayez.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Peut-il trouver des racines complexes (non réelles) ?',
        answer:
          'Non — cet outil ne trouve que les racines réelles. Les fonctions comme x² + 1 n’ont ' +
          'pas de racines réelles : l’outil le rapporte donc honnêtement sur tout intervalle réel.',
      },
      {
        question: 'Pourquoi a-t-il manqué une racine que je vois sur le graphe ?',
        answer:
          'La cause la plus fréquente est une racine exactement à une extrémité de ' +
          'l’intervalle, ou une racine que le pas de balayage saute dans une fonction très ' +
          'oscillante. Resserrez l’intervalle autour de la racine suspectée et cherchez à nouveau.',
      },
      {
        question: 'Quelle est la précision des racines rapportées ?',
        answer:
          'La méthode de Brent converge vers une précision proche de la machine ; les valeurs ' +
          'rapportées sont arrondies à 6 décimales. Réinjecter une racine rapportée dans f(x) ' +
          'donne une valeur extrêmement proche de zéro.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/integral/',
      '/math-functions/quadratic/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Calculateur de racines',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'p. ex. x^2 - 4',
      fromLabel: 'de',
      toLabel: 'à',
      fromPlaceholder: '-10',
      toPlaceholder: '10',
      calculate: 'Trouver les racines',
      fillError: 'Saisissez une fonction et un intervalle de recherche.',
      parseError: 'Impossible d’analyser f(x). Vérifiez l’expression.',
      badInterval: 'Les bornes de l’intervalle doivent être des nombres.',
      rootsFoundTemplate: '{count} racine{plural} trouvée{plural} :',
      noneFound: 'Aucune racine trouvée sur cet intervalle.',
      loadFailedTitle: 'Échec du chargement de l’outil de recherche de racines',
      panelTitle: 'Trouver les racines',
      functionNameLabel: 'Fonction f(x)',
      intervalStartLabel: 'Début de l’intervalle',
      intervalEndLabel: 'Fin de l’intervalle',
      intervalValidError:
        'Saisissez un intervalle valide avec borne inférieure < borne supérieure.',
      noRootsTemplate: 'Aucune racine trouvée dans [{a}, {b}].',
      rootsListTemplate: 'Racines dans [{a}, {b}] : {roots}',
      searchError: 'Les racines n’ont pas pu être trouvées sur cet intervalle.',
      parseFallback: 'Impossible d’analyser cette expression.',
    },
  },
};
