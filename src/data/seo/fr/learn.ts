/**
 * French learn articles for the /fr/learn/ hub — hand-written educational
 * prose.
 *
 * Mirrors `src/data/seo/learn.ts` exactly: same exported name
 * (LEARN_ARTICLES), same TS type (imported from '../types.js'), same slugs,
 * same `reviewedOn` dates, same `tryExpressions` (MATH — never translated).
 * Translated: title, description, sections, keyTakeaways, faqs. `related`
 * arrays carry the `/fr/` prefix.
 *
 * Every fact here is mathematically certain. No fabricated statistics,
 * studies, ratings, or popularity claims.
 */

import type { LearnArticle } from '../types.js';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'what-is-a-function',
    reviewedOn: '2026-09-29',
    title: 'Qu’est-ce qu’une fonction ? Domaine, ensemble d’arrivée et notation',
    description:
      'Apprenez ce qu’est une fonction : entrées, sorties, domaine, ensemble ' +
      'd’arrivée et notation f(x) — avec des exemples concrets à tracer vous-même.',
    sections: [
      {
        heading: 'Une fonction est une règle assortie d’une promesse',
        body: [
          'Une fonction est une règle qui prend chaque valeur d’entrée et lui attribue exactement une valeur de sortie. Ce mot « exactement » fait tout le travail : une fonction ne peut jamais attribuer deux sorties différentes à la même entrée. Si vous entrez x = 2, la fonction vous rend une réponse, et si vous entrez 2 à nouveau demain, vous obtenez la même réponse. Les mathématiciens appellent cette exigence le caractère « bien défini », et c’est ce qui sépare les fonctions des relations plus lâches entre grandeurs.',
          'Prenez f(x) = x^2. L’entrée 3 produit la sortie 9, et l’entrée −3 produit aussi 9. C’est parfaitement acceptable — deux entrées différentes peuvent partager une sortie. Ce qui ne serait pas acceptable, c’est que la règle attribue à la fois 9 et 10 à l’entrée 3. Alors la règle ne serait plus du tout une fonction.',
        ],
      },
      {
        heading: 'La notation f(x) et ce qu’elle signifie',
        body: [
          'L’expression f(x) se lit « f de x » et nomme la sortie de la fonction f quand l’entrée vaut x. La lettre f n’est qu’un nom ; vous pourriez tout aussi bien utiliser g, h ou coutDe. Écrire f(x) = 2*x + 1 signifie : la fonction f calcule sa sortie en doublant son entrée et en ajoutant un. Alors f(4) = 9, f(−1) = −1, et ainsi de suite.',
          'Cette notation devient puissante quand on compare des fonctions. Si g(x) = x^2, alors f(g(2)) = f(4) = 9 — vous avez injecté la sortie de g dans f. Enchaîner ainsi des fonctions s’appelle la composition, et la notation permet de suivre exactement quelle règle s’applique à quelle valeur. Elle permet aussi de parler de la fonction entière d’un coup (« f est croissante ») plutôt que de valeurs isolées.',
        ],
      },
      {
        heading: 'Domaine : l’ensemble des entrées autorisées',
        body: [
          'Toute fonction a un domaine : l’ensemble des valeurs d’entrée qu’elle accepte. Pour f(x) = x^2, tout nombre réel est autorisé, donc le domaine est l’ensemble des réels. Mais g(x) = sqrt(x) refuse les entrées négatives — aucun réel n’a un carré négatif — donc son domaine est x ≥ 0.',
          'Parfois le domaine est restreint par la règle elle-même, parfois par la situation modélisée. La fonction h(x) = 1/x exclut x = 0, car la division par zéro est indéfinie. Et si une fonction modélise le prix de n pommes, son domaine naturel pourrait être les entiers 1, 2, 3, …, même si la formule 2.5*n accepterait volontiers des entrées fractionnaires. Quand vous travaillez avec une fonction, sachez toujours quelles entrées elle peut réellement prendre.',
        ],
      },
      {
        heading: 'Ensemble d’arrivée : l’ensemble des sorties produites',
        body: [
          'L’ensemble d’arrivée (ou image) est l’ensemble des valeurs de sortie que la fonction produit réellement quand l’entrée parcourt le domaine. Pour f(x) = x^2, élever au carré ne donne jamais un nombre négatif, et tout nombre non négatif apparaît comme un carré (le carré de sa racine carrée). L’ensemble d’arrivée est donc l’ensemble des nombres y ≥ 0.',
          'Domaine et ensemble d’arrivée répondent à des questions différentes : le domaine demande « que puis-je entrer ? » et l’ensemble d’arrivée demande « que peut-il sortir ? » Pour f(x) = 2*x + 1, les deux sont l’ensemble des réels, car doubler puis décaler peut atteindre n’importe quelle valeur réelle. Pour f(x) = sin(x), le domaine est l’ensemble des réels mais l’ensemble d’arrivée n’est que [−1, 1], puisque l’onde sinusoïdale oscille entre −1 et 1 pour toujours. Remarquer l’ensemble d’arrivée aide à lire un graphe : c’est exactement l’étendue verticale de la courbe.',
        ],
      },
      {
        heading: 'Tout cela lu sur un graphe',
        body: [
          'Un graphe montre directement une fonction : chaque point (x, y) de la courbe dit f(x) = y. Le domaine est l’ombre de la courbe sur l’axe des x — l’étendue horizontale des points qui apparaissent réellement. L’ensemble d’arrivée est l’ombre sur l’axe des y. Si la courbe se brise ou s’arrête, ces ruptures apparaissent comme des trous dans le domaine.',
          'Il existe aussi un test rapide : le test de la droite verticale. Si chaque droite verticale que vous tracez coupe la courbe au plus une fois, la courbe représente une fonction — car chaque x a au plus un y. Un cercle échoue à ce test (une droite verticale passant par son centre le rencontre deux fois), voilà pourquoi un cercle complet n’est pas le graphe d’une seule fonction. Essayez d’entrer les expressions ci-dessous dans la calculatrice graphique, ajustez la fenêtre d’affichage et lisez vous-même chaque domaine et chaque ensemble d’arrivée.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sqrt(x)', '1/x', 'sin(x)'],
    keyTakeaways: [
      'Une fonction attribue exactement une sortie à chaque entrée — cette promesse de sortie unique est sa propriété définissante.',
      'f(x) se lit « f de x » : la sortie de f à l’entrée x. La composition f(g(x)) enchaîne deux règles.',
      'Le domaine est l’ensemble des entrées autorisées ; la division par zéro et les racines carrées de négatifs sont les restrictions classiques.',
      'L’ensemble d’arrivée est l’ensemble des sorties réellement produites — l’étendue verticale de son graphe.',
      'Le test de la droite verticale décide si une courbe est une fonction : toute droite verticale la coupe au plus une fois.',
    ],
    faqs: [
      {
        q: 'Un cercle est-il une fonction ?',
        a: 'Non — un cercle complet n’est pas le graphe d’une fonction, car certaines droites verticales le coupent deux fois (échec au test de la droite verticale). En revanche, la moitié supérieure d’un cercle l’est : y = sqrt(r^2 − x^2) attribue à chaque x exactement un y, et il en va de même pour la moitié inférieure y = −sqrt(r^2 − x^2).',
      },
      {
        q: 'Quelle est la différence entre le domaine et l’ensemble d’arrivée ?',
        a: 'Le domaine est l’ensemble des entrées qu’une fonction accepte ; l’ensemble d’arrivée est l’ensemble des sorties qu’elle produit réellement. Pour sin(x), le domaine est l’ensemble des réels tandis que l’ensemble d’arrivée est [−1, 1].',
      },
      {
        q: 'Deux entrées différentes peuvent-elles donner la même sortie ?',
        a: 'Oui. Une fonction doit donner à chaque entrée exactement une sortie, mais des entrées différentes peuvent partager une sortie — par exemple, f(x) = x^2 donne f(3) = f(−3) = 9.',
      },
    ],
    related: [
      '/fr/learn/understanding-derivatives/',
      '/fr/math-functions/sine/',
      '/fr/math-functions/quadratic/',
      '/fr/math-functions/square-root/',
      '/fr/math-functions/reciprocal/',
      '/fr/examples/logistic-growth/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-derivatives',
    reviewedOn: '2026-09-29',
    title: 'Dérivées : comprendre le taux de variation et la pente',
    description:
      'Ce que mesure une dérivée, comment elle donne la pente d’une courbe, et comment y lire ' +
      'croissance, décroissance et points extrêmes.',
    sections: [
      {
        heading: 'La dérivée mesure la vitesse de variation',
        body: [
          'La dérivée d’une fonction est une nouvelle fonction qui indique, en chaque point, à quelle vitesse la fonction d’origine varie. Si f(x) décrit une grandeur — position, prix, population — alors f′(x), la dérivée en x, est le taux auquel cette grandeur varie quand l’entrée vaut x. Une dérivée positive signifie que la grandeur augmente ; une négative, qu’elle diminue ; une nulle, qu’elle est momentanément plate.',
          'Concrètement, f′(x) est la pente de la tangente à la courbe en x. Zoomez suffisamment près sur presque n’importe quelle courbe lisse et elle ressemble à une droite — la tangente — dont l’inclinaison est la dérivée. Voilà pourquoi la dérivée a en même temps un sens géométrique et un sens physique : pente sur le graphe, taux de variation dans le monde réel.',
        ],
      },
      {
        heading: 'Taux de variation moyen vs instantané',
        body: [
          'Sur un intervalle, le taux de variation moyen de f entre x = a et x = b vaut (f(b) − f(a)) / (b − a) — la pente de la sécante entre les deux points. C’est exactement ainsi qu’on calcule une vitesse moyenne : distance parcourue divisée par temps écoulé. Mais cela ne dit rien de ce qui s’est passé entre a et b.',
          'Le taux de variation instantané est ce qu’on obtient quand l’intervalle se réduit à rien : la limite de (f(a+h) − f(a)) / h quand h tend vers zéro. Cette limite, quand elle existe, est f′(a). En pratique, la calculatrice calcule les dérivées numériquement à partir de cette idée, et vous pouvez regarder la sécante basculer vers la tangente à mesure que l’intervalle se rétrécit. Le taux instantané, c’est ce qu’affiche le compteur de vitesse ; le taux moyen, ce qu’affiche l’ordinateur de bord.',
        ],
      },
      {
        heading: 'Lire la croissance et la décroissance',
        body: [
          'Le signe de la dérivée indique le comportement de la fonction. Là où f′(x) > 0, la fonction est croissante — le graphe monte de gauche à droite. Là où f′(x) < 0, elle est décroissante. Là où f′(x) = 0, la tangente est horizontale, et la fonction n’est momentanément ni montante ni descendante.',
          'Prenez f(x) = x^2. Sa dérivée est f′(x) = 2*x, négative pour x < 0 et positive pour x > 0. Et en effet, la parabole descend vers l’origine depuis la gauche et remonte vers la droite. Pour f(x) = sin(x), la dérivée est cos(x) : l’onde sinusoïdale monte là où le cosinus est positif et descend là où il est négatif, avec des sommets plats exactement là où cos(x) = 0.',
        ],
      },
      {
        heading: 'Points critiques et extrêmes locaux',
        body: [
          'Les points où f′(x) = 0 ou où la dérivée n’existe pas s’appellent points critiques, et ce sont les candidats aux maxima et minima locaux — les sommets et les vallées de la courbe. En x = 0, f(x) = x^2 a pour dérivée 2*x = 0, et (0, 0) est bien le fond de la parabole : la fonction descend, s’aplatit, puis remonte.',
          'Mais une dérivée nulle ne garantit pas un sommet ou une vallée. Pour f(x) = x^3, la dérivée est 3*x^2, nulle en x = 0 — pourtant la fonction traverse ce point en ligne droite, s’aplatissant un instant en un point d’inflexion avant de continuer à monter. Pour classer un point critique, vérifiez si la dérivée change de signe autour de lui : négatif-vers-positif, c’est un minimum local ; positif-vers-négatif, un maximum local ; pas de changement, ni l’un ni l’autre.',
        ],
      },
      {
        heading: 'La dérivée seconde et la concavité',
        body: [
          'Dériver deux fois donne f′′(x), la dérivée seconde — le taux de variation du taux de variation. Géométriquement, elle décrit la concavité : là où f′′(x) > 0, la courbe se creuse vers le haut comme une coupe (concave vers le haut), et là où f′′(x) < 0, elle se courbe vers le bas comme un front soucieux (concave vers le bas).',
          'Pour f(x) = x^3, la dérivée seconde est f′′(x) = 6*x : négative à gauche de l’origine, positive à droite. La cubique se courbe vers le bas à gauche, vers le haut à droite, et change de concavité en x = 0 — ce changement est un point d’inflexion. La concavité complète le portrait de la forme d’une courbe une fois que la dérivée première a dit où elle monte et descend.',
        ],
      },
    ],
    tryExpressions: ['x^3 - 3*x', 'sin(x)', 'exp(x)', 'x^2 * sin(x)'],
    keyTakeaways: [
      'La dérivée f′(x) est le taux de variation instantané de f en x — la pente de la tangente.',
      'Dérivée positive = croissante, négative = décroissante, nulle = momentanément plate.',
      'Les points critiques (où f′ = 0 ou n’existe pas) sont les candidats aux maxima et minima locaux ; le changement de signe de f′ les classe.',
      'Une dérivée nulle ne marque pas toujours un extrême — x^3 a f′(0) = 0 mais continue de monter à travers un point d’inflexion.',
      'La dérivée seconde f′′ décrit la concavité : coupe vers le haut là où elle est positive, vers le bas là où elle est négative.',
    ],
    faqs: [
      {
        q: 'Quelle est la différence entre taux de variation moyen et instantané ?',
        a: 'Le taux moyen sur [a, b] vaut (f(b) − f(a)) / (b − a), la pente de la sécante entre les extrémités. Le taux instantané en a est la limite de ce quotient quand l’intervalle se réduit à zéro — la pente de la tangente, c’est-à-dire f′(a).',
      },
      {
        q: 'Si la dérivée est nulle en un point, est-ce toujours un maximum ou un minimum ?',
        a: 'Non. Une dérivée nulle fait seulement du point un point critique. Pour f(x) = x^3, f′(0) = 0 mais la fonction continue d’augmenter à travers x = 0 (un point d’inflexion). Vérifiez si f′ change de signe de part et d’autre pour classer le point.',
      },
      {
        q: 'Que dit la dérivée seconde ?',
        a: 'Elle décrit la concavité : là où f′′(x) > 0, la courbe se creuse vers le haut (concave vers le haut), et là où f′′(x) < 0, elle se courbe vers le bas (concave vers le bas). Les points où la concavité change sont des points d’inflexion.',
      },
    ],
    related: [
      '/fr/learn/what-is-a-function/',
      '/fr/learn/understanding-integrals/',
      '/fr/math-functions/quadratic/',
      '/fr/math-functions/cubic/',
      '/fr/math-functions/sine/',
      '/fr/math-functions/exponential/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-integrals',
    reviewedOn: '2026-09-29',
    title: 'Intégrales et aire sous une courbe',
    description:
      'Intégrales définies : l’aire signée sous une courbe, le théorème fondamental qui les ' +
      'relie aux dérivées, et quand les utiliser.',
    sections: [
      {
        heading: 'Une intégrale mesure une quantité accumulée',
        body: [
          'L’intégrale définie ∫ₐᵇ f(x) dx mesure l’accumulation totale de f entre a et b. Si f(x) est un taux — vitesse, pluie par heure, euros par article — alors l’intégrale de ce taux sur un intervalle est la quantité totale : distance totale, pluie totale, coût total. L’intégration additionne une infinité de morceaux infinitésimaux, dx, chacun pondéré par f(x).',
          'L’image la plus directe est géométrique : quand f(x) est positive sur [a, b], l’intégrale égale l’aire enfermée par la courbe, l’axe des x et les droites verticales x = a et x = b. Toute application des intégrales est une version de cette idée — l’aire d’abord, l’accumulation en général.',
        ],
      },
      {
        heading: 'Aire signée : pourquoi une aire peut être négative',
        body: [
          'Quand la courbe plonge sous l’axe des x, l’intégrale compte cette région comme une aire négative. L’intégrale est une aire signée : les régions au-dessus de l’axe s’ajoutent, celles en dessous se soustraient. Ainsi ∫₀^{2π} sin(x) dx = 0, car la bosse positive de 0 à π et le creux négatif de π à 2π ont exactement la même aire et s’annulent.',
          'Cette annulation est une fonctionnalité, pas un bogue : elle reflète une vraie physique. Si la vitesse est positive pendant la première moitié d’un trajet et négative pendant la seconde, l’intégrale donne le déplacement (la variation nette de position), qui peut être nul même si le compteur kilométrique a tourné. Si vous voulez l’aire totale sans tenir compte du signe, intégrez |f(x)| ou intégrez séparément les parties positive et négative.',
        ],
      },
      {
        heading: 'Le théorème fondamental du calcul différentiel et intégral',
        body: [
          'Le théorème fondamental du calcul lie intégrales et dérivées comme des inverses. Si F est une primitive de f — c’est-à-dire F′(x) = f(x) — alors ∫ₐᵇ f(x) dx = F(b) − F(a). Au lieu d’approximer une aire avec des milliers de rectangles, vous évaluez une seule fonction en deux points et soustrayez.',
          'Voilà pourquoi on calcule les intégrales symboliquement quand c’est possible : la primitive de 2*x est x^2, donc ∫₀³ 2*x dx = 3² − 0² = 9, et vous pouvez vérifier que cela égale l’aire d’un triangle de base 3 et de hauteur 6. Le théorème transforme le problème difficile (additionner une infinité de lamelles) en problème facile (évaluer une fonction deux fois).',
        ],
      },
      {
        heading: 'Aire entre deux courbes',
        body: [
          'Les intégrales mesurent aussi l’aire coincée entre deux courbes. Si g(x) ≤ h(x) sur [a, b], la région entre elles a pour aire ∫ₐᵇ (h(x) − g(x)) dx. Vous soustrayez la courbe inférieure de la supérieure, ramenant l’écart à un problème ordinaire d’aire sous une courbe.',
          'Par exemple, entre x = 0 et x = 1, la droite y = x se trouve au-dessus de la courbe y = x². L’aire entre elles vaut ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6. Une erreur fréquente est d’oublier que les courbes peuvent se croiser : là où elles échangent leurs rôles, découpez l’intégrale aux points de croisement et intégrez |h(x) − g(x)|, sinon l’aire signée annulera des régions qui devraient s’ajouter.',
        ],
      },
      {
        heading: 'Essayer les intégrales dans la calculatrice',
        body: [
          'Choisissez une expression ci-dessous et utilisez les outils d’intégration de la calculatrice pour colorer l’aire sous la courbe entre deux bornes. Regardez comment la région coloriée change de signe quand la courbe traverse l’axe — l’outil rapporte une aire signée, donc une onde symétrique comme sin(x) sur une période complète donne un net de zéro.',
          'Essayez ensuite la relation avec les primitives : tracez f(x) et son accumulation issue de l’intégrale ensemble. Là où f est positive, la courbe d’accumulation monte ; là où f est négative, elle descend ; là où f est nulle, elle se stabilise. Cette connexion — la dérivée de l’accumulation est la fonction d’origine — est le théorème fondamental rendu visible.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'abs(x - 2)', 'exp(-x^2)'],
    keyTakeaways: [
      'L’intégrale définie ∫ₐᵇ f(x) dx mesure une quantité accumulée — géométriquement, l’aire sous la courbe quand f est positive.',
      'Les intégrales calculent une aire signée : les régions sous l’axe des x comptent négativement et peuvent annuler celles du dessus.',
      'Théorème fondamental : ∫ₐᵇ f(x) dx = F(b) − F(a), où F′ = f — dérivation et intégration se défont mutuellement.',
      'L’aire entre deux courbes vaut ∫ₐᵇ (courbe du haut − courbe du bas) dx ; découpez l’intégrale partout où les courbes se croisent.',
      'Déplacement vs distance : l’intégrale de la vitesse donne la variation nette ; intégrer la valeur absolue donne la distance totale parcourue.',
    ],
    faqs: [
      {
        q: 'Une intégrale définie peut-elle être négative ?',
        a: 'Oui. L’intégrale mesure une aire signée, donc les portions de courbe sous l’axe des x contribuent une aire négative. Par exemple, ∫₀^{2π} sin(x) dx = 0 car les bosses positive et négative s’annulent exactement.',
      },
      {
        q: 'Qu’est-ce que le théorème fondamental du calcul ?',
        a: 'Il affirme que si F′(x) = f(x), alors ∫ₐᵇ f(x) dx = F(b) − F(a). En mots : pour intégrer f, trouvez une fonction dont la dérivée est f, évaluez-la aux bornes et soustrayez.',
      },
      {
        q: 'Comment trouver l’aire entre deux courbes ?',
        a: 'Intégrez la différence haut − bas sur l’intervalle : ∫ₐᵇ (h(x) − g(x)) dx où h est la courbe supérieure. Si les courbes se croisent dans [a, b], découpez l’intégrale à chaque croisement pour éviter toute annulation fautive.',
      },
    ],
    related: [
      '/fr/learn/understanding-derivatives/',
      '/fr/learn/what-is-a-function/',
      '/fr/math-functions/sine/',
      '/fr/math-functions/quadratic/',
      '/fr/math-functions/absolute-value/',
      '/fr/examples/damped-oscillation/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'asymptotes-explained',
    reviewedOn: '2026-09-29',
    title: 'Asymptotes : verticales, horizontales et obliques',
    description:
      'Comprenez les asymptotes — ces droites dont un graphe s’approche sans jamais les toucher : ' +
      'verticales, horizontales et obliques, avec des exemples clairs.',
    sections: [
      {
        heading: 'Ce qu’est vraiment une asymptote',
        body: [
          'Une asymptote est une droite dont une courbe s’approche d’aussi près qu’on veut quand l’entrée part vers un extrême — vers l’infini, ou vers un point où la fonction explose — sans jamais toucher la droite (au sens de la limite). L’idée clé est l’approche, pas le contact : la courbe peut se rapprocher de la droite autant qu’on veut, pourvu qu’on aille assez loin.',
          'Les asymptotes se déclinent en trois saveurs. Les asymptotes verticales sont des droites verticales x = a où la fonction grandit sans borne près de a. Les asymptotes horizontales sont des droites horizontales y = L vers lesquelles la fonction se stabilise quand x → ±∞. Les asymptotes obliques sont des droites diagonales que la fonction suit quand elle croît à peu près linéairement à l’infini. Chaque type se diagnostique différemment, et chacun renseigne sur le comportement à long terme ou près d’une singularité.',
        ],
      },
      {
        heading: 'Asymptotes verticales : là où la fonction explose',
        body: [
          'Une asymptote verticale x = a survient là où les valeurs de la fonction filent vers +∞ ou −∞ quand x s’approche de a. L’exemple classique est f(x) = 1/x en x = 0 : entrez 0,1 et obtenez 10, entrez 0,001 et obtenez 1000, et il n’existe aucune valeur finie en exactement 0 car la division par zéro est indéfinie.',
          'Pour les trouver dans une fonction rationnelle, factorisez le dénominateur : chaque facteur (x − a) qui ne se simplifie pas avec le numérateur donne typiquement une asymptote verticale en x = a. Mais la simplification compte — dans g(x) = (x^2 − 1)/(x − 1), le facteur (x − 1) se simplifie, donc x = 1 est un trou (une discontinuité effaçable), pas une asymptote. Quand vous tracez f(x) = 1/x et zoomez vers x = 0, les deux branches s’envolent verticalement, et l’échantillonnage adaptatif de la calculatrice doit éviter de tracer un trait trompeur à travers le vide.',
        ],
      },
      {
        heading: 'Asymptotes horizontales : le comportement aux extrêmes',
        body: [
          'Une asymptote horizontale décrit ce vers quoi tend la fonction quand x devient grand dans un sens ou dans l’autre. Si f(x) s’approche d’une valeur finie L quand x → ∞ (ou x → −∞), alors y = L est une asymptote horizontale. Pour f(x) = 1/x, les valeurs se réduisent vers 0 quand x grandit — donc y = 0 est l’asymptote horizontale.',
          'Pour une fonction rationnelle p(x)/q(x), comparez les degrés : si le degré du dénominateur est plus élevé, l’asymptote horizontale est y = 0 ; si les degrés sont égaux, c’est y = (coefficient dominant de p) / (coefficient dominant de q) ; si le degré du numérateur est plus élevé, il n’y a pas d’asymptote horizontale — la fonction grandit sans borne, et suit peut-être une oblique à la place. Notez qu’une courbe peut traverser son asymptote horizontale pour des x modérés ; l’asymptote ne contraint que les extrémités lointaines.',
        ],
      },
      {
        heading: 'Asymptotes obliques : suivre une droite diagonale',
        body: [
          'Quand le numérateur d’une fonction rationnelle a exactement un degré de plus que le dénominateur, la fonction croît à peu près comme une droite à l’infini, et cette droite est l’asymptote oblique. Prenez f(x) = (x^2 + 1)/x : la division polynomiale donne x + 1/x, et quand x → ±∞, le terme 1/x s’évanouit, laissant y = x comme asymptote que la courbe épouse.',
          'Vous pouvez le vérifier visuellement en traçant la fonction et la droite y = x ensemble puis en dézoomant loin : l’écart entre elles se réduit à rien. Les asymptotes obliques sont plus rares en pratique que les deux autres types, mais elles apparaissent dès qu’un quotient croît linéairement — par exemple dans certains modèles économiques avec un coût unitaire plus des frais fixes divisés par la quantité.',
        ],
      },
      {
        heading: 'Pourquoi les asymptotes comptent quand on trace',
        body: [
          'Les asymptotes sont le squelette d’un graphe : elles disent où la courbe doit aller près de ses points délicats et aux extrêmes, avant même de calculer un seul point intermédiaire. Esquisser d’abord les asymptotes — droites verticales aux points d’explosion, guide horizontal ou oblique à l’infini — ne laisse plus qu’à remplir des segments bien sages entre elles.',
          'Elles signalent aussi les restrictions de domaine (les asymptotes verticales marquent les entrées exclues) et les rendus trompeurs. Un traceur naïf peut dessiner une ligne quasi verticale à travers une asymptote verticale, reliant les deux branches comme si la fonction traversait le vide. Entrez 1/x dans la calculatrice, zoomez sur x = 0, et vérifiez que vous voyez bien deux branches séparées avec un vrai vide — ce vide, c’est l’asymptote rendue visible.',
        ],
      },
    ],
    tryExpressions: ['1/x', '(x^2 + 1)/x', '(2*x^2 + 3)/(x^2 - 1)', 'tan(x)'],
    keyTakeaways: [
      'Une asymptote est une droite dont une courbe s’approche d’aussi près qu’on veut — verticale (x = a), horizontale (y = L) ou oblique (diagonale).',
      'Les asymptotes verticales surviennent là où la fonction explose vers ±∞ ; dans les fractions rationnelles, cherchez les zéros non simplifiés du dénominateur.',
      'Les asymptotes horizontales décrivent le comportement aux extrêmes : comparez les degrés du numérateur et du dénominateur.',
      'Quand le numérateur a un degré de plus que le dénominateur, le graphe suit une asymptote oblique comme y = x.',
      'Une courbe peut traverser une asymptote horizontale pour des x modérés — l’asymptote ne gouverne que les extrémités lointaines.',
    ],
    faqs: [
      {
        q: 'Quelle est la différence entre une asymptote verticale et un trou ?',
        a: 'Une asymptote verticale x = a est un endroit où la fonction grandit sans borne près de a (p. ex. 1/x en x = 0). Un trou (discontinuité effaçable) est un endroit où un facteur simplifié a rendu la fonction indéfinie en un seul point alors que les valeurs voisines restent finies — p. ex. (x^2 − 1)/(x − 1) se simplifie en x + 1 avec un trou en x = 1.',
      },
      {
        q: 'Un graphe peut-il traverser son asymptote ?',
        a: 'Il peut traverser une asymptote horizontale pour des x finis — par exemple, f(x) = sin(x)/x traverse y = 0 à répétition, et pourtant y = 0 reste son asymptote horizontale puisque f(x) → 0 quand x → ±∞. Les asymptotes verticales, au sens du croisement, ne sont pas traversées au point d’explosion lui-même puisque la fonction y est indéfinie.',
      },
      {
        q: 'Comment trouver l’asymptote horizontale d’une fonction rationnelle ?',
        a: 'Comparez les degrés : si le degré du dénominateur est plus grand, l’asymptote est y = 0 ; si les degrés sont égaux, c’est y = (coefficient dominant du numérateur)/(coefficient dominant du dénominateur) ; si le degré du numérateur est exactement un de plus, il y a une asymptote oblique à la place (trouvée par division polynomiale).',
      },
    ],
    related: [
      '/fr/learn/what-is-a-function/',
      '/fr/math-functions/reciprocal/',
      '/fr/math-functions/tangent/',
      '/fr/math-functions/natural-logarithm/',
      '/fr/examples/logistic-growth/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'graphing-inequalities',
    reviewedOn: '2026-09-29',
    title: 'Tracer des inégalités à deux variables',
    description:
      'Comment tracer des inégalités comme y > x^2 : courbes frontières, pointillés vs traits ' +
      'pleins, hachures et points de test, étape par étape.',
    sections: [
      {
        heading: 'Des équations aux inégalités',
        body: [
          'L’équation y = x^2 dessine une seule courbe : la parabole. L’inégalité y > x^2 demande quelque chose de plus grand — chaque point (x, y) dont l’ordonnée se trouve au-dessus de la parabole. Au lieu d’une courbe, la solution est une région entière : l’aire infinie balayée au-dessus de la courbe. Tracer une inégalité, c’est dessiner la frontière et hachurer le côté qui la vérifie.',
          'Ce passage de la courbe à la région est tout le saut conceptuel. Une équation à deux variables décrit typiquement une courbe unidimensionnelle ; une inégalité décrit une région bidimensionnelle dont le bord est cette courbe. Chaque point testé appartient à la région ou non, et la courbe frontière est l’endroit où l’égalité est vérifiée.',
        ],
      },
      {
        heading: 'Courbes frontières : pointillés vs traits pleins',
        body: [
          'La première étape est de tracer la frontière — l’équation obtenue en remplaçant le signe d’inégalité par =. Pour y ≥ x^2, la frontière est la parabole y = x^2, tracée en trait plein car ses points vérifient l’inégalité : la frontière est incluse dans la solution.',
          'Pour les inégalités strictes (< ou >), la frontière se trace en pointillés, car les points de la courbe elle-même ne vérifient pas l’inégalité. y > x^2 et y ≥ x^2 ne diffèrent qu’au niveau de la parabole elle-même, et pourtant cette différence d’une épaisseur d’un point compte dans les problèmes d’optimisation, où un optimum situé exactement sur une frontière stricte est inatteignable. La calculatrice suit cette convention : pointillés pour strict, trait plein pour non strict.',
        ],
      },
      {
        heading: 'Hachures et méthode du point de test',
        body: [
          'Une fois la frontière tracée, elle divise le plan en régions (généralement deux). Choisissez n’importe quel point hors de la frontière — un point de test — injectez-le dans l’inégalité et regardez si l’énoncé est vrai. Si oui, hachurez toute la région de ce point ; sinon, hachurez l’autre côté.',
          'Pour y > x^2, l’origine (0, 0) est un point de test commode — attendez, elle est sur la frontière. Choisissez plutôt (0, 1) : 1 > 0 est vrai, donc hachurez la région au-dessus de la parabole contenant (0, 1). Une bonne habitude : vérifiez toujours que votre point de test n’est pas sur la frontière avant de faire confiance au résultat, et contrôlez avec un second point dans la région hachurée si l’inégalité est compliquée.',
        ],
      },
      {
        heading: 'Systèmes d’inégalités et régions admissibles',
        body: [
          'Les vrais problèmes impliquent généralement plusieurs inégalités à la fois — un système. La solution est l’ensemble des points qui les vérifient toutes simultanément : l’intersection des régions hachurées individuelles. Chaque nouvelle inégalité ne peut que rétrécir la solution, jamais l’agrandir, car les points doivent désormais passer un test de plus.',
          'C’est le cœur géométrique de la programmation linéaire : des contraintes comme x ≥ 0, y ≥ 0 et 2*x + 3*y ≤ 12 découpent une région admissible polygonale, et l’optimum d’un objectif linéaire se trouve toujours à l’un de ses coins. Hachurez chaque inégalité à tour de rôle, ne gardez que le chevauchement, et la région admissible restante est l’endroit où toutes les contraintes sont vérifiées à la fois. Essayez y ≤ x^2 et y ≥ −x ensemble pour voir une intersection en forme de lentille bordée par deux courbes.',
        ],
      },
      {
        heading: 'Lire un graphe hachuré',
        body: [
          'Un graphe d’inégalité terminé communique trois choses : la frontière (avec son sens pointillé/plein), la région solution hachurée, et implicitement tout ce qui, hors des hachures, échoue. Quand vous lisez un tel graphe, identifiez d’abord la courbe frontière et sa stricte inclusion, puis confirmez les hachures avec un rapide point de test mental.',
          'Erreurs de lecture fréquentes : oublier que le côté non hachuré est exclu (et non « inconnu »), prendre une frontière en pointillés pour une frontière incluse, et pour les systèmes, hachurer chaque inégalité sans jamais prendre l’intersection. Entrez les expressions ci-dessous, basculez entre formes strictes et non strictes, et regardez comment les hachures et le style de frontière changent tandis que le sens de la région ne bouge que d’exactement la courbe frontière.',
        ],
      },
    ],
    tryExpressions: ['x^2', '2 - x', 'abs(x)', 'sin(x)'],
    keyTakeaways: [
      'Une inégalité à deux variables décrit une région du plan ; son bord est la courbe frontière où l’égalité est vérifiée.',
      'Tracez la frontière en pointillés pour les inégalités strictes (<, >) et en trait plein quand la frontière est incluse (≤, ≥).',
      'Utilisez un point de test hors de la frontière pour décider quel côté hachurer ; recontrôlez avec un second point dans les cas complexes.',
      'La solution d’un système d’inégalités est l’intersection des régions individuelles — chaque contrainte ne peut que la rétrécir.',
      'En programmation linéaire, les coins de la région admissible sont là où l’optimum d’un objectif linéaire doit se trouver.',
    ],
    faqs: [
      {
        q: 'Quand utiliser des pointillés plutôt qu’un trait plein ?',
        a: 'Utilisez une frontière en pointillés pour les inégalités strictes (< ou >), car les points de la frontière ne vérifient pas l’inégalité. Utilisez un trait plein pour ≤ ou ≥, où les points de la frontière sont inclus dans la solution.',
      },
      {
        q: 'Comment savoir quel côté de la frontière hachurer ?',
        a: 'Choisissez un point de test qui n’est pas sur la frontière, substituez-le dans l’inégalité, et hachurez la région contenant le point si l’énoncé est vrai — sinon hachurez l’autre région.',
      },
      {
        q: 'Qu’est-ce que la région admissible d’un système d’inégalités ?',
        a: 'C’est l’intersection de toutes les régions solutions individuelles : l’ensemble des points vérifiant chaque inégalité à la fois. En programmation linéaire, l’optimum d’un objectif linéaire sur une région admissible polygonale se trouve toujours à un coin (sommet) de cette région.',
      },
    ],
    related: [
      '/fr/learn/what-is-a-function/',
      '/fr/math-functions/quadratic/',
      '/fr/math-functions/absolute-value/',
      '/fr/math-functions/square-root/',
      '/fr/examples/projectile-motion/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'parametric-vs-cartesian',
    reviewedOn: '2026-09-29',
    title: 'Équations paramétriques vs cartésiennes',
    description:
      'Cartésien y = f(x) vs paramétrique x(t), y(t) : ce que chaque forme exprime, quand ' +
      'l’utiliser, et comment passer de l’une à l’autre.',
    sections: [
      {
        heading: 'Forme cartésienne : y comme fonction de x',
        body: [
          'La forme cartésienne y = f(x) est la forme familière : pour chaque x, l’équation vous donne le y. C’est le langage naturel des fonctions — chaque droite verticale rencontre le graphe au plus une fois, donc la courbe ne rebrousse jamais chemin verticalement. La pensée entrée-sortie, le domaine et l’ensemble d’arrivée, et le test de la droite verticale appartiennent tous à cette forme.',
          'Mais la forme a une limite dure : elle ne peut pas décrire les courbes qui bouclent, s’auto-intersectent ou voyagent verticalement. Un cercle a besoin de deux équations cartésiennes (moitiés haute et basse) ; une courbe tracée deux fois, ou tracée à rebours, est inexprimable. Dès que la position, la forme ou le mouvement est plus riche qu’« un y par x », la forme cartésienne manque de place.',
        ],
      },
      {
        heading: 'Forme paramétrique : les deux coordonnées suivent un paramètre',
        body: [
          'Les équations paramétriques introduisent une troisième variable, le paramètre t, et définissent x et y séparément : x = x(t), y = y(t). Quand t parcourt son intervalle, le point (x(t), y(t)) trace la courbe. Le cercle unité devient x = cos(t), y = sin(t) pour t dans [0, 2π) — une seule paire d’équations propre, sans découpage en moitiés, sans ambiguïté ±.',
          'Le paramètre porte souvent un sens : ce peut être le temps. Alors x = t, y = t^2 trace la parabole y = x^2 de gauche à droite quand t augmente, tandis que x = −t, y = t^2 trace la même parabole de droite à gauche. Même forme, trajets opposés — une distinction que la forme cartésienne ne peut même pas énoncer. La forme paramétrique sépare ce à quoi ressemble la courbe de la façon dont on la parcourt.',
        ],
      },
      {
        heading: 'Passer d’une forme à l’autre',
        body: [
          'Passer du paramétrique au cartésien signifie éliminer le paramètre. Si x = t et y = t^2, la substitution donne directement y = x^2. Pour x = cos(t), y = sin(t), élever au carré et additionner utilise cos²t + sin²t = 1 pour retrouver x² + y² = 1. L’élimination est généralement de l’algèbre plus une identité bien choisie.',
          'Le sens inverse — paramétrer une courbe cartésienne — a toujours au moins une réponse triviale : posez x = t, y = f(t). Les paramétrisations intéressantes sont les non triviales, comme le cercle ci-dessus ou x = t^2, y = t^4 − 3*t^2 pour une courbe qui repasse par des points déjà visités. Notez que la conversion peut perdre de l’information : éliminer t de x = t, y = t^2 jette le sens de parcours, que seule la forme paramétrique avait enregistré.',
        ],
      },
      {
        heading: 'Quand chaque forme est le bon outil',
        body: [
          'Utilisez la forme cartésienne quand la relation est véritablement fonctionnelle — une sortie par entrée — et quand vous voulez les outils du calcul différentiel (dérivées, intégrales, recherche de racines) dans leur cadre le plus simple. La plupart des formules en science et en économie arrivent ainsi.',
          'Utilisez la forme paramétrique pour les courbes fermées, les courbes auto-intersectées, et tout ce qui implique un mouvement ou un tracé — trajectoires de projectiles avec le temps comme paramètre, figures de Lissajous, épicycles en forme d’engrenages. Utilisez-la aussi quand une équation cartésienne est maladroite : la courbe x = y^2 est une très bonne parabole couchée, mais ce n’est pas une fonction de x, tandis que x = t^2, y = t la paramètre sans effort. Si la courbe boucle ou si le trajet compte, prenez le paramétrique.',
        ],
      },
      {
        heading: 'Voir la différence dans la calculatrice',
        body: [
          'Tracez y = sin(x) en forme cartésienne, puis x = t, y = sin(t) en paramétrique sur la même fenêtre : des courbes identiques, car la seconde n’est qu’une reparamétrisation de la première. Essayez maintenant x = sin(t), y = sin(2*t) — une figure de Lissajous — et demandez quelle équation cartésienne unique y = f(x) pourrait la produire. Aucune : la courbe se croise elle-même et attribue plusieurs y à un même x.',
          'Ajustez l’intervalle de t et regardez le tracé : avec t de 0 à π vous obtenez la moitié de la figure, avec 0 à 2π la figure entière. Ce contrôle sur la portion de courbe dessinée, et sur l’ordre du tracé, est l’avantage signature de la forme paramétrique — et la raison pour laquelle le mouvement, des projectiles aux orbites planétaires, se modélise en paramétrique.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'cos(x)', 'sqrt(4 - x^2)'],
    keyTakeaways: [
      'La forme cartésienne y = f(x) donne un y par x — elle ne peut pas décrire les boucles, les segments verticaux ni les auto-intersections.',
      'La forme paramétrique x = x(t), y = y(t) trace une courbe quand t varie ; t représente souvent le temps, encodant le sens de parcours.',
      'Le cercle unité demande deux équations cartésiennes mais une seule paire paramétrique : x = cos(t), y = sin(t).',
      'Éliminer le paramètre convertit le paramétrique en cartésien, mais l’information du sens de parcours est perdue.',
      'Utilisez le paramétrique quand la courbe boucle, s’auto-intersecte, ou quand le trajet le long d’elle compte ; le cartésien pour les relations fonctionnelles.',
    ],
    faqs: [
      {
        q: 'Toute courbe paramétrique peut-elle s’écrire y = f(x) ?',
        a: 'Non. Seules les courbes qui passent le test de la droite verticale le peuvent. Un cercle, une figure de Lissajous, ou toute courbe attribuant deux y à un même x n’a pas d’équation cartésienne unique y = f(x) — même si on peut écrire ses morceaux séparément.',
      },
      {
        q: 'Que représente généralement le paramètre t ?',
        a: 'Souvent le temps : x = x(t), y = y(t) décrit alors une position qui évolue dans le temps. Mais t n’est qu’une variable de tracé — tout intervalle convient, et la même courbe géométrique peut être tracée par bien des paramétrisations différentes, en avant ou en arrière, vite ou lentement.',
      },
      {
        q: 'Comment convertir des équations paramétriques en forme cartésienne ?',
        a: 'Éliminez le paramètre : résolvez une équation pour t (ou utilisez une identité) et substituez dans l’autre. Pour x = cos(t), y = sin(t), élever au carré et additionner donne x² + y² = 1 via cos²t + sin²t = 1.',
      },
    ],
    related: [
      '/fr/learn/what-is-a-function/',
      '/fr/learn/graphing-inequalities/',
      '/fr/math-functions/sine/',
      '/fr/math-functions/cosine/',
      '/fr/math-functions/quadratic/',
      '/fr/math-functions/square-root/',
      '/fr/examples/lissajous-curve/',
      '/fr/examples/projectile-motion/',
      '/fr/graphing-calculator/',
    ],
  },
];
