/**
 * French curated example graphs (Phase 8).
 *
 * Mirrors `src/data/seo/examples.ts` exactly: same exported names
 * (EXAMPLE_GRAPHS, getExampleBySlug), same TS types (imported from
 * '../types.js'), same slugs, same expressions (MATH — never translated).
 * Translated: title, description, story, insights. `related` arrays carry the
 * `/fr/` prefix.
 */
import type { ExampleGraphData } from '../types.js';

export const EXAMPLE_GRAPHS: ExampleGraphData[] = [
  {
    slug: 'trigonometric-interference',
    title: 'Interférence trigonométrique : sin(x) + cos(2x)',
    description:
      'Voyez ce qui se passe quand deux ondes trigonométriques se combinent. Ouvrez cet exemple interactif de sin(x) + cos(2x) dans la calculatrice graphique.',
    expressions: [
      { kind: 'cartesian', rhs: 'sin(x)', label: 'sin(x)' },
      { kind: 'cartesian', rhs: 'cos(2*x)', label: 'cos(2x)' },
      { kind: 'cartesian', rhs: 'sin(x) + cos(2*x)', label: 'sin(x) + cos(2x)' },
    ],
    story: [
      'Quand deux ondes traversent le même milieu, leurs déplacements s’additionnent point par point — un phénomène appelé superposition. Tracer sin(x), cos(2x) et leur somme sur les mêmes axes rend cette addition visible : en chaque x, la hauteur de la courbe combinée est exactement la somme des hauteurs des deux courbes composantes.',
      'Remarquez que la somme n’est pas simplement une onde sinusoïdale plus grande. Le terme cos(2x) oscille deux fois plus vite : il renforce et annule donc alternativement l’onde sin(x). Là où les deux ondes culminent ensemble, la somme atteint ses points les plus hauts ; là où l’une est à une crête et l’autre à un creux, elles s’annulent partiellement. Ce sont les mêmes mathématiques que derrière les battements en acoustique et les motifs d’interférence en optique.',
    ],
    insights: [
      'L’onde combinée sin(x) + cos(2x) est périodique, mais sa forme est plus complexe que celle de chaque composante seule.',
      'Activez et désactivez chaque expression dans la calculatrice pour isoler la contribution de chaque onde.',
      'Essayez de changer cos(2*x) en cos(3*x) et observez comment une seconde onde plus rapide modifie le motif d’interférence.',
    ],
    related: [
      '/fr/math-functions/sine/',
      '/fr/math-functions/cosine/',
      '/fr/examples/damped-oscillation/',
      '/fr/learn/what-is-a-function/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'projectile-motion',
    title: 'Mouvement d’un projectile : tracer une balle lancée',
    description:
      'Modélisez la hauteur d’une balle lancée avec une fonction du second degré. Ouvrez cet exemple de projectile dans la calculatrice.',
    expressions: [{ kind: 'cartesian', rhs: '-4.9*x^2 + 20*x + 1.5', label: 'height(x)' }],
    viewport: { xMin: -1, xMax: 5, yMin: -5, yMax: 25 },
    story: [
      'La hauteur d’une balle lancée droit vers le haut suit une fonction du second degré du temps : la gravité tire avec une accélération constante, donc la hauteur est une parabole ouverte vers le bas. Ici, -4.9x² + 20x + 1.5 modélise une balle lancée à 20 mètres par seconde depuis une hauteur de 1,5 mètre (le 4,9 vient de la moitié de l’accélération gravitationnelle terrestre, 9,8 m/s²).',
      'Le sommet de la parabole est l’instant où la balle atteint son point le plus haut — l’instant où sa vitesse est nulle avant qu’elle ne commence à retomber. Comme la parabole est symétrique, la balle atterrit autant de temps après le sommet qu’il lui a fallu pour y monter. Les deux intersections avec l’axe des x marquent le lancer (près de x = 0) et l’atterrissage ; seule la racine positive a un sens physique.',
    ],
    insights: [
      'Le sommet de la parabole donne la hauteur maximale et l’instant où elle est atteinte.',
      'L’intersection positive avec l’axe des x est le moment où la balle touche le sol — trouvez-la avec le calculateur de racines.',
      'Le coefficient -4,9 contrôle la « largeur » du vol ; une vitesse de lancement plus grande (le terme 20x) allonge le vol.',
    ],
    related: [
      '/fr/math-functions/quadratic/',
      '/fr/calculators/root-finder/',
      '/fr/learn/what-is-a-function/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'damped-oscillation',
    title: 'Oscillation amortie : e^(-x/2) · cos(3x)',
    description:
      'Explorez une onde décroissante qui modélise de vrais ressorts et circuits. Ouvrez cet exemple d’oscillation amortie dans la calculatrice.',
    expressions: [
      { kind: 'cartesian', rhs: 'exp(-x/2) * cos(3*x)', label: 'e^(-x/2)·cos(3x)' },
      { kind: 'cartesian', rhs: 'exp(-x/2)', label: 'envelope e^(-x/2)' },
      { kind: 'cartesian', rhs: '-exp(-x/2)', label: 'envelope -e^(-x/2)' },
    ],
    viewport: { xMin: -1, xMax: 15, yMin: -2, yMax: 2 },
    story: [
      'Une corde de guitare pincée, une suspension de voiture qui rebondit et un circuit RLC partagent tous la même forme mathématique : une oscillation dont l’amplitude décroît avec le temps. Multiplier cos(3x) par l’exponentielle décroissante exp(-x/2) produit exactement cela — chaque oscillation est une fraction fixe de la précédente.',
      'Les deux courbes enveloppes, ±exp(-x/2), sont les « rails » entre lesquels l’oscillation roule. L’onde touche l’enveloppe supérieure exactement aux crêtes du cosinus et l’enveloppe inférieure à ses creux, et les enveloppes elles-mêmes n’oscillent jamais. Cette séparation entre « à quelle vitesse ça vibre » (le cosinus) et « à quelle vitesse ça s’éteint » (l’exponentielle) est la raison pour laquelle les ingénieurs analysent les deux facteurs séparément.',
    ],
    insights: [
      'L’oscillation ne sort jamais de ses enveloppes exponentielles.',
      'Augmenter le 3 dans cos(3x) tasse plus d’oscillations dans la même décroissance ; augmenter le 1/2 dans l’exposant éteint le mouvement plus vite.',
      'Dézoomez le long de l’axe des x pour voir l’onde se stabiliser vers zéro — la signature mathématique de l’amortissement.',
    ],
    related: [
      '/fr/math-functions/cosine/',
      '/fr/math-functions/exponential/',
      '/fr/examples/trigonometric-interference/',
      '/fr/learn/understanding-derivatives/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'logistic-growth',
    title: 'Croissance logistique : la courbe en S des ressources limitées',
    description:
      'Tracez la courbe en S qui modélise les populations aux ressources limitées. Ouvrez cet exemple de croissance logistique dans la calculatrice graphique.',
    expressions: [{ kind: 'cartesian', rhs: '10 / (1 + 9*exp(-x))', label: 'logistic' }],
    viewport: { xMin: -5, xMax: 10, yMin: -2, yMax: 12 },
    story: [
      'La croissance illimitée est exponentielle, mais les populations réelles se heurtent à des limites : nourriture, espace ou taille du marché. La fonction logistique 10 / (1 + 9·exp(-x)) commence par ressembler à une exponentielle, puis se courbe et se stabilise à une capacité limite — ici, 10. Le résultat est la célèbre courbe en S qu’on voit dans les colonies bactériennes, l’adoption de produits et la diffusion des idées.',
      'La courbe a un point d’inflexion où elle passe d’accélérée à décélérée — le moment où la croissance est la plus rapide, exactement à mi-chemin de la capacité limite. Avant ce point, la courbe se courbe vers le haut (la croissance s’auto-alimente) ; après, elle se courbe vers le bas quand la limite mord. Trouver ce point d’inflexion est l’une des choses les plus utiles que le calcul différentiel puisse faire pour un modèle.',
    ],
    insights: [
      'L’asymptote horizontale y = 10 est la capacité limite dont la courbe s’approche sans jamais la dépasser.',
      'La partie la plus raide du S est le point d’inflexion — là où la croissance est la plus rapide.',
      'Essayez 10 / (1 + 9*exp(-2*x)) pour voir comment un taux de croissance plus rapide raidit le milieu du S sans changer son plafond.',
    ],
    related: [
      '/fr/math-functions/exponential/',
      '/fr/learn/asymptotes-explained/',
      '/fr/learn/understanding-derivatives/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'lissajous-curve',
    title: 'Courbe de Lissajous : l’art paramétrique des ondes sinusoïdales',
    description:
      'Dessinez une figure de Lissajous avec x = sin(3t), y = cos(2t). Ouvrez cet exemple paramétrique dans la calculatrice graphique.',
    expressions: [
      {
        kind: 'parametric',
        xOfT: 'sin(3*t)',
        yOfT: 'cos(2*t)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'Lissajous 3:2',
      },
    ],
    viewport: { xMin: -1.5, xMax: 1.5, yMin: -1.5, yMax: 1.5 },
    story: [
      'Avant que les oscilloscopes n’aient des écrans numériques, les physiciens étudiaient les rapports de fréquences en injectant deux ondes sinusoïdales dans les plaques horizontale et verticale d’un tube cathodique. Les motifs lumineux qu’ils traçaient — les figures de Lissajous — révèlent le rapport des deux fréquences d’un coup d’œil. Ici, x = sin(3t) oscille trois fois pour deux oscillations de y = cos(2t), tissant un nœud fermé et symétrique.',
      'Ce qui rend cette courbe impossible comme graphe y = f(x) ordinaire, c’est qu’elle échoue spectaculairement au test de la droite verticale : un même x peut correspondre à de nombreux y quand la courbe reboucle sur elle-même. Les équations paramétriques contournent cette limite en donnant à x et y leurs propres formules dans un paramètre t partagé — la même idée qui anime tout, des aiguilles d’horloge aux orbites planétaires.',
    ],
    insights: [
      'Le rapport de fréquences 3:2 détermine le motif : comptez les lobes qui touchent chaque côté du carré englobant.',
      'Changez sin(3*t) en sin(4*t) pour une figure 4:2 et comparez la symétrie.',
      'Comme t parcourt un 2π complet, la courbe se referme parfaitement — raccourcissez la plage de t et regardez-la devenir un arc ouvert.',
    ],
    related: [
      '/fr/math-functions/sine/',
      '/fr/math-functions/cosine/',
      '/fr/learn/parametric-vs-cartesian/',
      '/fr/examples/polar-rose/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'polar-rose',
    title: 'Rose polaire : r = 2·cos(3θ)',
    description:
      'Tracez une rose à trois pétales avec l’équation polaire r = 2cos(3θ). Ouvrez cet exemple de graphe polaire dans la calculatrice interactive.',
    expressions: [
      {
        kind: 'polar',
        rOfTheta: '2*cos(3*theta)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'r = 2cos(3θ)',
      },
    ],
    viewport: { xMin: -2.5, xMax: 2.5, yMin: -2.5, yMax: 2.5 },
    story: [
      'En coordonnées polaires, chaque point est décrit par une distance r à l’origine et un angle θ, et l’équation r = 2·cos(3θ) dessine une fleur à exactement trois pétales. Pendant que θ balaie le tour, r oscille trois fois entre -2 et 2 ; les valeurs négatives de r se tracent dans la direction opposée, ce qui replie les pétales dans leur arrangement symétrique.',
      'Le nombre de pétales suit une règle simple : pour r = a·cos(nθ) avec n impair, la rose a exactement n pétales. Essayez des valeurs paires de n dans la calculatrice et vous en obtiendrez deux fois plus — le motif double parce que la courbe a besoin d’un tour supplémentaire complet pour se refermer. Peu d’équations montrent la puissance des coordonnées polaires avec autant d’élégance que la rose.',
    ],
    insights: [
      'Un coefficient impair (3) donne 3 pétales ; essayez 2*cos(4*theta) pour voir le cas pair en produire 8.',
      'L’amplitude 2 fixe la longueur des pétales — le point le plus éloigné de l’origine.',
      'Chaque pétale est tracé exactement une fois quand θ va de 0 à π ; la seconde moitié les retrace.',
    ],
    related: [
      '/fr/math-functions/cosine/',
      '/fr/learn/parametric-vs-cartesian/',
      '/fr/examples/lissajous-curve/',
      '/fr/graphing-calculator/',
    ],
  },
];

export function getExampleBySlug(slug: string): ExampleGraphData | undefined {
  return EXAMPLE_GRAPHS.find((example) => example.slug === slug);
}
