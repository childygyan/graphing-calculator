/**
 * French hand-written educational content for the ten notable-function pages
 * (Phase 8 SEO content architecture).
 *
 * Mirrors `src/data/seo/functions.ts` exactly: same exported names
 * (FUNCTION_PAGES), same TS types (imported from '../types.js'), same slugs,
 * same `expression`/`notation` (MATH — never translated), same
 * `reviewedOn` values (none on these pages). Translated: name, displayName,
 * tagline, description, intro, sections, keyFacts, faqs. `related` arrays
 * carry the `/fr/` prefix.
 */
import type { FunctionPageData } from '../types.js';

export const FUNCTION_PAGES: FunctionPageData[] = [
  {
    slug: 'sine',
    name: 'Sinus',
    displayName: 'Fonction sinus',
    notation: 'f(x) = sin(x)',
    expression: 'sin(x)',
    tagline:
      'L’onde classique de la trigonométrie : une oscillation lisse qui se répète tous les 2π.',
    description:
      'Tracez f(x) = sin(x) : période 2π, amplitude, zéros et symétrie impaire — explorez l’onde sinusoïdale, du son aux oscillations.',
    intro: [
      'La fonction sinus est l’une des courbes les plus reconnaissables de toutes les mathématiques : une onde lisse et répétitive qui oscille éternellement entre −1 et 1. Définie à l’origine par les triangles rectangles — le sinus d’un angle est le rapport du côté opposé à l’hypoténuse — elle s’étend naturellement à tous les nombres réels en mesurant les angles en radians autour du cercle trigonométrique. Sur le cercle unité, sin(x) est simplement l’ordonnée du point atteint après une rotation de x radians depuis l’axe des x positif.',
      'Parce qu’elle se répète tous les 2π radians, le sinus est le prototype de tout phénomène périodique : courant alternatif, ondes sonores, lumière, marées et vibration d’une corde de guitare peuvent tous se décrire avec des ondes sinusoïdales de fréquences et d’amplitudes différentes. Tapez sin(x) dans la calculatrice graphique pour tracer l’onde vous-même, puis décalez-la, étirez-la et combinez-la avec d’autres expressions pour voir comment les oscillations du monde réel se construisent à partir de cette unique courbe.',
    ],
    sections: [
      {
        heading: 'Ce qu’est le sinus',
        body: [
          'La définition par le cercle trigonométrique est ce qui permet au sinus d’accepter n’importe quelle entrée réelle, pas seulement des angles de triangle. En partant de (1, 0) et en parcourant dans le sens trigonométrique le cercle de rayon 1, chaque angle x aboutit à un point dont la hauteur au-dessus de l’axe des x est sin(x). Après un tour complet de 2π radians, on revient au point de départ : voilà pourquoi le graphe se répète — l’histoire de la fonction est inscrite dans la géométrie du cercle.',
          'Cette géométrie explique aussi la symétrie de l’onde : le sinus est une fonction impaire, c’est-à-dire sin(−x) = −sin(x), donc la moitié gauche du graphe est la moitié droite pivotée de 180° autour de l’origine. Le graphe traverse l’axe des x à chaque multiple de π, atteint son sommet de 1 en π/2 plus chaque tour complet, et son creux de −1 en 3π/2 plus chaque tour complet.',
        ],
      },
      {
        heading: 'Amplitude, période et phase',
        body: [
          'Trois nombres décrivent toute onde sinusoïdale : l’amplitude, la période et la phase. L’amplitude est la hauteur de l’onde — pour sin(x) tout court, elle vaut 1, la distance de la ligne médiane y = 0 à chaque sommet. Multiplier par une constante, comme dans 3*sin(x), étire l’onde verticalement sans changer sa forme : c’est ainsi qu’on modélise les sons plus forts et les signaux plus puissants.',
          'La période est la longueur horizontale d’un cycle complet : 2π pour sin(x). Écrire sin(2*x) comprime deux ondes complètes dans le même intervalle, divisant la période par deux (π) et doublant la fréquence — la hauteur d’une note une octave plus haut. Ajouter un déphasage, sin(x − π/2), fait glisser toute l’onde latéralement : voilà pourquoi le cosinus est secrètement un sinus décalé, cos(x) = sin(x + π/2).',
        ],
      },
      {
        heading: 'Où apparaît le sinus',
        body: [
          'Les ondes sinusoïdales sont les briques du traitement du signal. Tout signal répétitif — un ton musical, une émission radio, le ronronnement à 50 ou 60 Hz du secteur — peut se décomposer en une somme d’ondes sinusoïdales de fréquences différentes, un fait connu sous le nom d’analyse de Fourier. Quand deux ondes sinusoïdales de fréquences presque égales se superposent, elles interfèrent pour produire des battements, l’effet de pulsation qu’on entend quand deux instruments légèrement désaccordés jouent ensemble.',
          'Au-delà des signaux, le sinus régit le mouvement harmonique simple : le va-et-vient d’une masse sur un ressort, le balancement d’un petit pendule et le haut-et-bas d’une bouée flottante suivent tous des courbes sinusoïdales en fonction du temps. En géométrie et en physique, le sinus projette une quantité tournante sur un axe — la position verticale d’une nacelle de grande roue au fil du temps trace exactement sin(x).',
        ],
      },
    ],
    keyFacts: [
      'Domaine : tous les réels ; ensemble d’arrivée : −1 ≤ sin(x) ≤ 1.',
      'Période 2π : sin(x + 2π) = sin(x) pour tout x.',
      'Fonction impaire : sin(−x) = −sin(x) ; le graphe a une symétrie centrale de 180° autour de l’origine.',
      'Zéros en x = nπ ; maxima de 1 en x = π/2 + 2πn ; minima de −1 en x = 3π/2 + 2πn.',
      'Intersection avec l’axe y en (0, 0) ; la dérivée est cos(x) ; une primitive est −cos(x).',
    ],
    faqs: [
      {
        q: 'Pourquoi le graphe du sinus est-il une onde ?',
        a: 'Parce que le sinus mesure la hauteur sur le cercle trigonométrique pendant qu’on tourne. Tourner autour du cercle fait monter et descendre la hauteur en douceur et la fait se répéter à chaque tour complet : le graphe de la hauteur en fonction de l’angle est donc une onde. L’onde est lisse parce que la rotation est continue — pas de coins ni de sauts.',
      },
      {
        q: 'Quelle est la différence entre sinus et cosinus ?',
        a: 'C’est la même onde décalée latéralement : cos(x) = sin(x + π/2). Sur le cercle trigonométrique, le cosinus est l’abscisse tandis que le sinus est l’ordonnée. Le cosinus part de son maximum, cos(0) = 1, tandis que le sinus part de zéro, sin(0) = 0.',
      },
      {
        q: 'Est-ce que sin(x) dépasse parfois 1 ?',
        a: 'Non — pour x réel, |sin(x)| ≤ 1 toujours. Sur le cercle unité, l’ordonnée ne peut jamais dépasser en magnitude le rayon, qui vaut 1. (Le sinus de nombres complexes peut dépasser 1 en magnitude, mais le graphe réel de la calculatrice reste dans [−1, 1].)',
      },
    ],
    related: [
      '/fr/math-functions/cosine/',
      '/fr/math-functions/tangent/',
      '/fr/examples/trigonometric-interference/',
      '/fr/examples/damped-oscillation/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'cosine',
    name: 'Cosinus',
    displayName: 'Fonction cosinus',
    notation: 'f(x) = cos(x)',
    expression: 'cos(x)',
    tagline:
      'Le jumeau pair et ondulé du sinus — le cosinus part de son sommet et se répète tous les 2π.',
    description:
      'Tracez f(x) = cos(x) : période 2π, amplitude, symétrie paire — explorez l’onde cosinusoïdale, des ondes au mouvement circulaire.',
    intro: [
      'Le cosinus est le pendant horizontal du sinus : sur le cercle trigonométrique, il donne l’abscisse du point d’angle x, tandis que le sinus donne l’ordonnée. Cette seule différence façonne tout son graphe — il part de sa valeur maximale de 1 quand x = 0, descend à −1 en x = π, et revient à 1 en x = 2π, traçant la même onde lisse que le sinus mais décalée d’un quart de tour latéralement. Comme le sinus, il oscille éternellement entre −1 et 1 et se répète tous les 2π radians.',
      'Le cosinus apparaît partout où quelque chose se projette sur un axe horizontal ou part d’un maximum : l’ombre d’une roue qui tourne, la tension d’un circuit en courant alternatif mesurée depuis son pic, ou l’abscisse d’un mouvement circulaire uniforme. Parce que cos(x) = sin(x + π/2), tout ce qu’on peut dire des ondes sinusoïdales s’applique aux ondes cosinusoïdales avec un déphasage — tapez cos(x) dans la calculatrice et faites défiler la vue pour le voir se répéter.',
    ],
    sections: [
      {
        heading: 'Ce qu’est le cosinus',
        body: [
          'Imaginez un point parcourant dans le sens trigonométrique le cercle unité, en partant de (1, 0). À l’angle x, sa position est (cos x, sin x) : le cosinus suit l’éloignement du point vers la droite ou la gauche. En x = 0, le point est à l’extrême droite, donc cos(0) = 1 — l’ordonnée à l’origine du graphe. À mesure que l’angle grandit, le point bascule vers la gauche, et le cosinus descend en douceur en passant par 0 en x = π/2 jusqu’à −1 en x = π, l’extrême gauche du cercle.',
          'Le cosinus est une fonction paire, cos(−x) = cos(x) : son graphe est donc une image miroir par rapport à l’axe des y, la gauche reflétant exactement la droite. Il s’annule en x = π/2 + nπ, à mi-chemin entre chaque pic et chaque creux, et ses maxima de 1 se produisent en x = 2πn tandis que ses minima de −1 se produisent en x = π + 2πn. La forme d’onde familière vient de la même géométrie circulaire que le sinus, vue de côté.',
        ],
      },
      {
        heading: 'Cosinus, sinus et déphasages',
        body: [
          'L’identité cos(x) = sin(x + π/2) dit que les deux fonctions sont une seule onde vue depuis deux points de départ : le cosinus est ce à quoi ressemble le sinus un quart de période plus tôt. Cela compte quand on modélise des oscillations réelles, car le choix entre sinus et cosinus n’est qu’un choix du moment où l’on démarre l’horloge — un ressort lâché au repos depuis son étirement maximal suit un cosinus en fonction du temps, tandis qu’un ressort poussé à travers l’équilibre suit un sinus.',
          'Les déphasages expliquent aussi les sommes comme sin(x) + cos(x) : combiner deux ondes de même fréquence produit toujours une autre onde de cette fréquence, ici √2·sin(x + π/4), un fait qui découle des formules d’addition d’angles. Dans la calculatrice, tracez sin(x) et cos(x) ensemble et ajoutez une troisième expression sin(x) + cos(x) pour voir la somme rester une onde parfaite.',
        ],
      },
      {
        heading: 'Où apparaît le cosinus',
        body: [
          'En physique, le cosinus décrit toute oscillation mesurée depuis son extrême : le mouvement harmonique simple x(t) = A·cos(ωt) pour une masse lâchée au repos, la partie réelle de l’exponentielle complexe e^(iθ) = cos θ + i·sin θ qui sous-tend l’analyse des circuits en courant alternatif et les fonctions d’onde quantiques, et les fonctions de base paires des séries de Fourier. Quand les ingénieurs écrivent un signal périodique comme une somme de cosinus, chaque terme capture la partie symétrique de l’onde.',
          'Le cosinus apparaît aussi loin des ondes. Le produit scalaire de deux vecteurs vaut |a||b|cos θ, où θ est l’angle entre eux : le cosinus mesure donc l’alignement, 1 pour parallèles, 0 pour perpendiculaires, −1 pour opposés. La loi des cosinus, c² = a² + b² − 2ab·cos(C), généralise Pythagore à tout triangle.',
        ],
      },
    ],
    keyFacts: [
      'Domaine : tous les réels ; ensemble d’arrivée : −1 ≤ cos(x) ≤ 1.',
      'Période 2π : cos(x + 2π) = cos(x) pour tout x.',
      'Fonction paire : cos(−x) = cos(x) ; le graphe est symétrique par rapport à l’axe des y.',
      'Zéros en x = π/2 + nπ ; maxima de 1 en x = 2πn ; minima de −1 en x = π + 2πn.',
      'Intersection avec l’axe y en (0, 1) ; la dérivée est −sin(x) ; une primitive est sin(x).',
    ],
    faqs: [
      {
        q: 'Le cosinus est-il juste un sinus décalé ?',
        a: 'Exactement — cos(x) = sin(x + π/2) : le graphe du cosinus est donc celui du sinus déplacé vers la gauche d’un quart de période. Ils partagent la même amplitude, la même période et le même ensemble d’arrivée ; seul le point de départ diffère. Sur le cercle trigonométrique, ce sont l’abscisse et l’ordonnée du même point tournant.',
      },
      {
        q: 'Pourquoi cos(0) = 1 ?',
        a: 'À l’angle 0, le point tournant sur le cercle unité se trouve en (1, 0), l’extrême droite du cercle : son abscisse — le cosinus — vaut donc 1 et son ordonnée — le sinus — vaut 0. C’est aussi pourquoi le graphe du cosinus commence à son sommet.',
      },
      {
        q: 'Quel est le rapport entre le cosinus et le produit scalaire ?',
        a: 'La formule du produit scalaire a·b = |a||b|cos θ utilise le cosinus de l’angle entre les vecteurs pour mesurer à quel point ils pointent dans la même direction. Le cosinus vaut 1 quand ils sont parallèles, 0 quand ils sont perpendiculaires et −1 quand ils sont opposés : il agit comme un score d’alignement entre −1 et 1.',
      },
    ],
    related: [
      '/fr/math-functions/sine/',
      '/fr/math-functions/tangent/',
      '/fr/examples/trigonometric-interference/',
      '/fr/examples/damped-oscillation/',
      '/fr/learn/what-is-a-function/',
    ],
  },
  {
    slug: 'tangent',
    name: 'Tangente',
    displayName: 'Fonction tangente',
    notation: 'f(x) = tan(x)',
    expression: 'tan(x)',
    tagline:
      'Une courbe répétitive qui grimpe de −∞ à +∞, avec des asymptotes verticales là où le cosinus s’annule.',
    description:
      'Tracez f(x) = tan(x) : branches répétées, asymptotes en π/2 + nπ, période π — découvrez la tangente et ses usages en maths.',
    intro: [
      'La fonction tangente, tan(x) = sin(x)/cos(x), ne ressemble en rien à ses sœurs en forme d’onde : au lieu d’osciller entre −1 et 1, elle balaie vers le haut toutes les valeurs réelles, puis saute et recommence. Chaque branche répétitive passe par un zéro en x = nπ, grimpe de plus en plus raide, et file vers l’infini quand x approche π/2 + nπ — les points où cos(x) = 0 et où le rapport explose. Ce sont les asymptotes verticales de la fonction, les murs en pointillés que la courbe peut approcher sans jamais toucher.',
      'La tangente mesure la raideur : dans un triangle rectangle, c’est opposé sur adjacent, la pente de l’hypoténuse, et pour un angle d’inclinaison elle donne directement la pente de la droite. Comme tan(x + π) = tan(x), sa période n’est que de π — la moitié de celle du sinus et du cosinus. Tapez tan(x) dans la calculatrice et dézoomez pour voir les branches paver le plan, chacune étant une courbe en S étirée entre deux asymptotes.',
    ],
    sections: [
      {
        heading: 'Ce qu’est la tangente',
        body: [
          'Géométriquement, tan(x) est la pente du rayon d’angle x : tracez le rayon issu de l’origine d’angle x et voyez à quel point il monte raide — montée sur déplacement horizontal, opposé sur adjacent. De façon équivalente, c’est l’ordonnée où ce rayon rencontre la droite verticale x = 1 tangente au cercle unité, d’où vient le nom. Quand le rayon pivote vers la verticale, le point d’intersection file vers l’infini, et au moment où le rayon pointe exactement vers le haut, il n’y a plus d’intersection du tout — l’asymptote.',
          'Comme tan(x) = sin(x)/cos(x), les zéros de la fonction viennent du sinus (en x = nπ) et ses asymptotes des zéros du cosinus (en x = π/2 + nπ). La tangente est une fonction impaire, tan(−x) = −tan(x) : chaque branche est donc à symétrie centrale autour de son propre zéro, et tout le graphe se répète tous les π parce que décaler sinus et cosinus de π change les deux signes, laissant le rapport inchangé.',
        ],
      },
      {
        heading: 'Asymptotes et comportement non borné',
        body: [
          'Les asymptotes verticales en x = π/2 + nπ sont le trait le plus frappant de tan(x) : en approchant par la gauche, la courbe tend vers +∞, par la droite vers −∞. La fonction est continue sur chaque intervalle entre asymptotes mais présente un saut inévitable à chaque asymptote — aucune redéfinition ne peut le réparer, car les limites à gauche et à droite diffèrent. Cela fait de la tangente l’exemple classique en classe d’une fonction avec une infinité d’asymptotes verticales.',
          'Contrairement au sinus et au cosinus, la tangente est non bornée dans les deux sens : son ensemble d’arrivée est tous les réels. Près de zéro, elle se comporte presque comme la droite y = x (l’approximation aux petits angles tan(x) ≈ x), puis se raidit spectaculairement — en x = 1,4 radian, la valeur vaut déjà environ 5,8, et en 1,57 elle est énorme. Sa dérivée, sec²(x) = 1 + tan²(x), vaut toujours au moins 1, confirmant que la courbe ne s’aplatit jamais.',
        ],
      },
      {
        heading: 'Où apparaît la tangente',
        body: [
          'La tangente convertit les angles en pentes : elle apparaît donc partout où l’inclinaison compte — la déclivité d’une colline (une pente de 45° est une déclivité de 100 % car tan(45°) = 1), les mathématiques de trajectoire des projectiles, et l’angle de l’ombre d’un cadran solaire. En calcul différentiel, la dérivée elle-même est une pente de tangente — la tangente à une courbe en un point — et l’arc tangente, arctan, est la façon dont les calculatrices retrouvent les angles depuis les pentes, par exemple pour trouver un cap à partir de Δy/Δx.',
          'En physique, tan apparaît dans les relations de phase : l’angle de phase d’un oscillateur forcé vérifie tan(φ) = (terme d’amortissement)/(terme de raideur), et en optique l’angle de Brewster obéit à tan(θ) = n₂/n₁. Partout où un rapport de composantes verticale sur horizontale compte, la tangente est le langage naturel.',
        ],
      },
    ],
    keyFacts: [
      'tan(x) = sin(x)/cos(x) ; domaine : tous les réels x sauf π/2 + nπ.',
      'Ensemble d’arrivée : tous les réels — la tangente est non bornée vers le haut comme vers le bas.',
      'Période π : tan(x + π) = tan(x) ; fonction impaire, tan(−x) = −tan(x).',
      'Zéros en x = nπ ; asymptotes verticales en x = π/2 + nπ.',
      'La dérivée est sec²(x) = 1 + tan²(x), toujours ≥ 1 ; près de 0, tan(x) ≈ x.',
    ],
    faqs: [
      {
        q: 'Pourquoi tan(x) a-t-elle des asymptotes ?',
        a: 'Parce que tan(x) = sin(x)/cos(x), et cos(x) = 0 en x = π/2 + nπ. Diviser par des valeurs de plus en plus proches de zéro fait croître le rapport sans borne : le graphe file donc vers ±∞ de part et d’autre de chacun de ces points. La fonction y est simplement non définie.',
      },
      {
        q: 'Quelle est la période de la tangente ?',
        a: 'π, la moitié de la période du sinus et du cosinus. Ajouter π à l’angle change les signes à la fois de sin(x) et de cos(x), et les deux changements s’annulent dans le rapport : tan(x + π) = tan(x). Le graphe répète son motif de branches tous les π radians.',
      },
      {
        q: 'La tangente est-elle croissante partout ?',
        a: 'Elle est croissante sur chaque intervalle entre deux asymptotes consécutives, mais elle n’est pas croissante comme fonction entière — elle saute de +∞ à −∞ à chaque asymptote. L’affirmation « tan est croissante » n’est donc vraie qu’au sein d’une seule branche, comme (−π/2, π/2).',
      },
    ],
    related: [
      '/fr/math-functions/sine/',
      '/fr/math-functions/cosine/',
      '/fr/learn/asymptotes-explained/',
      '/fr/learn/what-is-a-function/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'quadratic',
    name: 'Second degré',
    displayName: 'Fonction du second degré',
    notation: 'f(x) = x^2 - 4',
    expression: 'x^2 - 4',
    tagline:
      'La parabole x² − 4 : une courbe en U avec des racines en ±2 et son point le plus bas en (0, −4).',
    description:
      'Tracez f(x) = x² − 4 : sommet, racines en ±2, axe de symétrie — étudiez la parabole et ses usages en physique et en algèbre.',
    intro: [
      'La fonction du second degré f(x) = x² − 4 est la parabole la plus simple qui ait quelque chose d’intéressant : elle traverse l’axe des x deux fois, plonge en dessous, et fait demi-tour en un unique point le plus bas. Élever au carré rend chaque entrée non négative : x² est donc minimal en x = 0, et soustraire 4 fait glisser toute la forme en U de quatre unités vers le bas. Le résultat est une courbe symétrique avec un sommet en (0, −4), ouverte vers le haut pour toujours.',
      'Les fonctions du second degré sont les bêtes de somme de l’algèbre : elles modélisent tout ce où une quantité dépend du carré d’une autre — l’aire d’un carré, la hauteur d’une balle lancée en fonction du temps, le profit d’une entreprise à demande linéaire. L’exemple x² − 4 est particulièrement instructif car il se factorise proprement en (x − 2)(x + 2) : ses intersections avec l’axe des x en 2 et −2 se lisent donc directement sur l’algèbre. Tracez-la dans la calculatrice et observez la symétrie par rapport à l’axe des y.',
    ],
    sections: [
      {
        heading: 'Ce qu’est cette fonction du second degré',
        body: [
          'Toute fonction du second degré a la forme ax² + bx + c, et son graphe est toujours une parabole — la forme en U qu’on obtient en élevant au carré. Ici a = 1 (positif, donc le U s’ouvre vers le haut), b = 0 (pas d’inclinaison, donc le sommet est sur l’axe des y), et c = −4 (l’ordonnée à l’origine). La formule du sommet x = −b/(2a) donne x = 0, et f(0) = −4, confirmant le minimum en (0, −4).',
          'La factorisation révèle les racines : x² − 4 = (x − 2)(x + 2), une différence de carrés : la courbe traverse donc l’axe des x exactement là où chaque facteur s’annule — en x = 2 et x = −2. Entre les racines, la fonction est négative (le creux sous l’axe) ; en dehors, elle est positive et croît sans borne. Comme le terme x² domine pour les grands |x|, les deux bras de la parabole partent vers +∞.',
        ],
      },
      {
        heading: 'Symétrie, sommet et taux de variation',
        body: [
          'L’axe des y est l’axe de symétrie de la parabole : f(−x) = f(x), donc la moitié gauche reflète la droite. Le sommet est le point de retournement de la parabole — ici le minimum global, puisque les bras montent éternellement. Toute fonction du second degré a exactement un sommet et exactement une valeur extrême : voilà pourquoi elles sont le modèle de choix pour l’optimisation, profit maximal, coût minimal, point le plus haut d’une trajectoire.',
          'La dérivée f′(x) = 2x raconte le reste de l’histoire : négative pour x < 0 (descente vers le sommet), nulle en x = 0 (le fond plat), positive pour x > 0 (remontée). La pente elle-même croît linéairement, une dérivée seconde constante de 2 — la signature de l’accélération constante, voilà pourquoi la distance sous gravité est du second degré en temps.',
        ],
      },
      {
        heading: 'Où apparaissent les fonctions du second degré',
        body: [
          'Lancez une balle et sa hauteur suit une parabole : h(t) = −4,9t² + v₀t + h₀, la même forme que x² − 4 mais retournée et décalée. Aires et volumes produisent naturellement des fonctions du second et du troisième degré — doubler le côté d’un carré quadruple son aire — et la formule quadratique résout toute équation de ce type, y compris celle-ci : x = ±√4 = ±2.',
          'En économie, le profit en fonction du prix est souvent modélisé par une parabole ouverte vers le bas (le revenu monte puis chute quand le prix grimpe), et son sommet donne le prix optimal. En statistique, l’ajustement par moindres carrés minimise une fonction d’erreur du second degré, et la courbe en cloche de la loi normale est e^(−x²) — un second degré dans l’exposant.',
        ],
      },
    ],
    keyFacts: [
      'Forme factorisée : x² − 4 = (x − 2)(x + 2) ; racines (intersections avec l’axe x) en x = 2 et x = −2.',
      'Sommet (minimum global) en (0, −4) ; l’axe de symétrie est l’axe des y (x = 0).',
      'Domaine : tous les réels ; ensemble d’arrivée : y ≥ −4.',
      'Fonction paire : f(−x) = f(x) ; le graphe se reflète par rapport à l’axe des y.',
      'Intersection avec l’axe y en (0, −4) ; la fonction est négative entre les racines et positive en dehors.',
      'Dérivée f′(x) = 2x ; la pente est nulle au sommet et la dérivée seconde est la constante 2.',
    ],
    faqs: [
      {
        q: 'Comment trouver les racines de x² − 4 ?',
        a: 'Factorisez comme une différence de carrés : x² − 4 = (x − 2)(x + 2). Un produit est nul quand l’un de ses facteurs est nul : x = 2 ou x = −2. De façon équivalente, la formule quadratique donne x = (0 ± √(0 + 16))/2 = ±2.',
      },
      {
        q: 'Quelle est la valeur minimale de x² − 4 ?',
        a: '−4, atteinte en x = 0. Comme x² ≥ 0 pour tout x réel, soustraire 4 donne x² − 4 ≥ −4, avec égalité seulement quand x² = 0. Le sommet (0, −4) est le point le plus bas de la parabole, et la fonction croît sans borne des deux côtés.',
      },
      {
        q: 'Pourquoi le graphe est-il symétrique ?',
        a: 'Parce que seules des puissances paires de x apparaissent : (−x)² − 4 = x² − 4, donc f(−x) = f(x). Chaque entrée et son opposée donnent la même sortie, ce qui reflète la moitié droite du graphe par rapport à l’axe des y sur la moitié gauche.',
      },
    ],
    related: [
      '/fr/examples/projectile-motion/',
      '/fr/math-functions/square-root/',
      '/fr/math-functions/absolute-value/',
      '/fr/learn/understanding-derivatives/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'cubic',
    name: 'Troisième degré',
    displayName: 'Fonction du troisième degré',
    notation: 'f(x) = x^3 - 3*x',
    expression: 'x^3 - 3*x',
    tagline:
      'Une fonction cubique en S avec trois racines réelles, une colline et une vallée locales, et une symétrie centrale de 180°.',
    description:
      'Tracez f(x) = x³ − 3x : trois racines réelles, max et min locaux, point d’inflexion — et son lien avec les angles triples.',
    intro: [
      'La fonction cubique f(x) = x³ − 3x trace un S allongé : elle monte depuis −∞, couronne une petite colline en (−1, 2), plonge à travers l’origine dans une vallée en (1, −2), et grimpe vers +∞. Contrairement à une parabole, elle n’a ni maximum ni minimum global — le terme x³ finit par tout écraser, tirant le bras gauche vers le bas pour toujours et le bras droit vers le haut pour toujours. Entre les extrêmes, la courbe traverse l’axe des x trois fois, en −√3, 0 et √3.',
      'Cette cubique particulière est une favorite des manuels car tout en elle se calcule à la main : ses racines se factorisent via x(x² − 3), ses points de retournement viennent de la dérivée propre 3x² − 3, et elle cache une belle connexion avec la trigonométrie des angles triples. Les cubiques modélisent la croissance des volumes, les équations d’état cubiques, et toute relation où le cube d’une quantité compte. Tracez x^3 - 3*x dans la calculatrice et dézoomez pour voir le S se redresser vers son comportement aux extrêmes.',
    ],
    sections: [
      {
        heading: 'Ce qu’est cette fonction cubique',
        body: [
          'Factorisez x et les racines apparaissent : x³ − 3x = x(x² − 3) = x(x − √3)(x + √3) : le graphe traverse donc l’axe des x en −√3 ≈ −1,732, 0 et √3 ≈ 1,732. Trois racines réelles, c’est le maximum de croisements distincts qu’une cubique peut afficher — le degré de la fonction fixe le maximum. Entre deux racines consécutives, la courbe doit faire demi-tour : c’est exactement ce que font la colline et la vallée.',
          'Le comportement aux extrêmes est dicté par x³ seul : quand x → +∞, la fonction → +∞, et quand x → −∞, elle → −∞. Le terme −3x ne façonne que le milieu du graphe, y creusant l’ondulation. Tout polynôme de degré impair partage ce comportement d’extrémités opposées, qui garantit au moins une racine réelle — la courbe doit traverser l’axe pour aller de −∞ à +∞.',
        ],
      },
      {
        heading: 'Points de retournement et point d’inflexion',
        body: [
          'La dérivée f′(x) = 3x² − 3 = 3(x − 1)(x + 1) s’annule en x = ±1, marquant les deux points de retournement : un maximum local en (−1, 2) et un minimum local en (1, −2). La fonction monte jusqu’à x = −1, descend jusqu’à x = 1, puis monte pour toujours — le classique haut-bas-haut d’une cubique à deux points critiques. Ce ne sont que des extrêmes locaux ; le comportement global est non borné des deux côtés.',
          'À mi-chemin entre eux, en (0, 0), se trouve le point d’inflexion, où la courbe passe de concave vers le bas à concave vers le haut. La dérivée seconde f″(x) = 6x le confirme : négative à gauche de 0, positive à droite de 0, nulle exactement à l’origine. Comme la cubique est une fonction impaire, le point d’inflexion est aussi le centre de sa symétrie centrale de 180° — pivotez le graphe d’un demi-tour autour de (0, 0) et il se superpose à lui-même.',
        ],
      },
      {
        heading: 'Une identité trigonométrique cachée',
        body: [
          'Voici la surprise qui a rendu cette cubique célèbre : substituer x = 2cos θ donne x³ − 3x = 2cos(3θ). On peut le vérifier avec la formule de l’angle triple cos(3θ) = 4cos³θ − 3cos θ : avec x = 2cos θ, le membre de gauche devient 8cos³θ − 6cos θ = 2(4cos³θ − 3cos θ) = 2cos(3θ). La cubique est secrètement un angle triplé déguisé.',
          'Cette identité est plus qu’une curiosité — c’est la clé de la résolution trigonométrique des équations cubiques. Une cubique à trois racines réelles, comme celle-ci, peut se résoudre en écrivant ses racines comme des cosinus mis à l’échelle d’angles appropriés, une méthode qui remonte à Viète. Elle explique aussi pourquoi la colline et la vallée ont exactement les hauteurs ±2 : ce sont 2cos(3θ) évalué à ses propres sommets.',
        ],
      },
    ],
    keyFacts: [
      'Factorisée : x(x − √3)(x + √3) ; trois racines réelles en x = −√3, 0 et √3.',
      'Maximum local en (−1, 2) ; minimum local en (1, −2) ; ni max ni min global.',
      'Point d’inflexion en (0, 0) ; fonction impaire à symétrie centrale de 180° autour de l’origine.',
      'Domaine et ensemble d’arrivée : tous les réels.',
      'Comportement aux extrêmes : f(x) → −∞ quand x → −∞ et f(x) → +∞ quand x → +∞.',
      'Identité : avec x = 2cos θ, x³ − 3x = 2cos(3θ).',
    ],
    faqs: [
      {
        q: 'Pourquoi x³ − 3x traverse-t-elle l’axe des x trois fois ?',
        a: 'Sa forme factorisée x(x − √3)(x + √3) montre trois facteurs linéaires distincts, chacun apportant un zéro : x = 0, x = √3 et x = −√3. Un polynôme de degré 3 peut avoir au plus trois racines réelles, et celui-ci atteint le maximum. Entre chaque paire de racines, les points de retournement de la dérivée forcent la courbe à inverser sa direction.',
      },
      {
        q: 'Quels sont le max et le min locaux ?',
        a: 'Résolvez f′(x) = 3x² − 3 = 0 pour obtenir x = ±1. Alors f(−1) = −1 + 3 = 2 est le maximum local et f(1) = 1 − 3 = −2 est le minimum local. Ils sont « locaux » parce que la fonction dépasse toute borne loin vers la droite et chute sous toute borne loin vers la gauche.',
      },
      {
        q: 'Quel est le rapport entre cette cubique et la trigonométrie ?',
        a: 'L’identité x³ − 3x = 2cos(3θ) sous la substitution x = 2cos θ relie la cubique aux formules d’angles triples. Historiquement, cette connexion a donné une méthode trigonométrique pour résoudre les cubiques à trois racines réelles — le « casus irreducibilis » qui intrigua les algébristes du XVIe siècle.',
      },
    ],
    related: [
      '/fr/math-functions/quadratic/',
      '/fr/learn/understanding-derivatives/',
      '/fr/learn/what-is-a-function/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'exponential',
    name: 'Exponentielle',
    displayName: 'Fonction exponentielle',
    notation: 'f(x) = e^x',
    expression: 'e^x',
    tagline:
      'La fonction qui est sa propre dérivée — une croissance relative constante, toujours croissante, ne touchant jamais zéro.',
    description:
      'Tracez f(x) = eˣ : croissance relative constante, asymptote y = 0, point (0, 1) — explorez l’exponentielle en science et finance.',
    intro: [
      'La fonction exponentielle f(x) = eˣ est l’incarnation mathématique de la croissance proportionnelle à la taille : de l’argent qui rapporte des intérêts composés, des bactéries qui doublent dans une boîte de Petri, ou une rumeur qui se répand dans une foule. Sa propriété définissante est que son taux de variation égale sa valeur actuelle — d/dx eˣ = eˣ — voilà pourquoi elle apparaît chaque fois que le taux de croissance d’une quantité est proportionnel à la quantité elle-même. La base e ≈ 2,71828 est l’unique nombre qui rend cela possible.',
      'Le graphe raconte l’histoire d’un coup d’œil : il passe par (0, 1), rampe presque à plat le long de l’axe des x pour les grands x négatifs (en approchant 0 sans jamais l’atteindre), puis se courbe vers le haut et grimpe de plus en plus raide pour les x positifs. En x = 1, il vaut e ≈ 2,718, en x = 2 il vaut e² ≈ 7,389, et chaque pas unitaire multiplie la valeur par un nouveau facteur e. Tapez e^x dans la calculatrice et comparez avec 2^x pour voir comment la base contrôle la raideur.',
    ],
    sections: [
      {
        heading: 'Ce qu’est la fonction exponentielle',
        body: [
          'La multiplication répétée est le cœur de eˣ : e³ signifie e·e·e, et les lois des exposants e^(a+b) = e^a·e^b étendent cela à toutes les puissances réelles, y compris fractions et négatifs (e^(−x) = 1/eˣ). Le nombre e lui-même peut se définir comme la limite de (1 + 1/n)ⁿ quand n grandit — le résultat de composer des intérêts à 100 % sur une infinité de périodes — ou comme la somme infinie 1 + 1 + 1/2! + 1/3! + ⋯.',
          'Ce qui rend e spécial parmi toutes les bases, c’est la dérivée : d/dx aˣ = aˣ·ln(a), et ce n’est que pour a = e que le facteur ln vaut 1, laissant la fonction inchangée par dérivation. De façon équivalente, eˣ est l’unique fonction vérifiant f′ = f avec f(0) = 1. Voilà pourquoi e est appelée la base naturelle — le calcul différentiel la distingue.',
        ],
      },
      {
        heading: 'Forme, asymptote et croissance',
        body: [
          'Pour x < 0, le graphe épouse l’axe des x par au-dessus, décroissant vers 0 sans jamais le toucher — l’asymptote horizontale y = 0 quand x → −∞. En x = 0, la courbe passe par (0, 1), son ordonnée à l’origine, et pour x > 0 elle accélère vers le haut, convexe partout (dérivée seconde eˣ > 0) et croissante partout (dérivée première eˣ > 0). Pas de zéros, pas de points de retournement, pas de points d’inflexion : juste une croissance implacable, lisse, courbée vers le haut.',
          'La croissance exponentielle finit par dépasser tout polynôme : eˣ croît plus vite que x¹⁰⁰, plus vite que toute puissance fixée. Voilà pourquoi les exponentielles modélisent les processus emballement — réactions en chaîne, propagation virale dans sa phase initiale — et aussi pourquoi leurs inverses, les logarithmes, croissent si lentement. Sur une échelle logarithmique, eˣ devient la droite y = x, un moyen pratique de repérer des données exponentielles.',
        ],
      },
      {
        heading: 'Où apparaissent les exponentielles',
        body: [
          'Toute équation différentielle de la forme dy/dx = ky a pour solution y = Ce^(kx) : la loi de refroidissement de Newton, la décroissance radioactive (avec k < 0), les intérêts composés en continu et la croissance des populations la suivent. La courbe en cloche de la loi normale, (1/√(2π))e^(−x²/2), place une exponentielle de trinôme au centre des statistiques. En analyse complexe, la formule d’Euler e^(iθ) = cos θ + i·sin θ fusionne exponentielles et trigonométrie et fait fonctionner toute la théorie des circuits en courant alternatif et la mécanique quantique.',
          'En informatique, les exponentielles coupent dans les deux sens : les algorithmes à complexité temporelle exponentielle deviennent infaisables quand les entrées grandissent, tandis que le backoff exponentiel — attendre 1, 2, 4, 8… secondes entre les tentatives — est le remède standard aux serveurs surchargés. La courbe logistique, eˣ/(1 + eˣ), dompte la croissance exponentielle pure avec une capacité limite et modélise tout, des épidémies aux activations de réseaux de neurones.',
        ],
      },
    ],
    keyFacts: [
      'Domaine : tous les réels ; ensemble d’arrivée : y > 0 — eˣ n’est jamais nulle ni négative.',
      'Intersection avec l’axe y en (0, 1) ; asymptote horizontale y = 0 quand x → −∞.',
      'Strictement croissante et convexe partout ; ni maxima, ni minima, ni points d’inflexion.',
      'Sa propre dérivée : d/dx eˣ = eˣ ; une primitive est eˣ elle-même.',
      'Lois des exposants : e^(a+b) = e^a·e^b, e^(−x) = 1/eˣ, (eˣ)^n = e^(nx).',
      'e ≈ 2,71828 ; eˣ dépasse tout polynôme quand x → ∞.',
    ],
    faqs: [
      {
        q: 'Pourquoi eˣ est-elle sa propre dérivée ?',
        a: 'Par définition, e est l’unique base pour laquelle d/dx aˣ = aˣ·ln(a) a ln(a) = 1. Dériver eˣ via la définition par limite donne eˣ fois la limite de (e^h − 1)/h, et e est défini précisément comme le nombre qui rend cette limite égale à 1. La pente du graphe en chaque point égale donc la hauteur de la fonction en ce point.',
      },
      {
        q: 'Qu’est-ce que e, exactement ?',
        a: 'Un nombre irrationnel d’environ 2,71828, définissable comme la limite de (1 + 1/n)ⁿ quand n → ∞ ou la somme 1 + 1 + 1/2! + 1/3! + ⋯. Comme π, son développement décimal ne se répète jamais. C’est la base « naturelle » parce que le calcul différentiel prend sa forme la plus simple avec elle.',
      },
      {
        q: 'Est-ce que eˣ atteint parfois zéro ?',
        a: 'Non. Pour x réel, eˣ > 0 toujours — le graphe approche l’axe des x asymptotiquement quand x → −∞ mais ne le touche jamais. Cela découle de eˣ·e^(−x) = e^0 = 1 : si eˣ était nulle, le produit ne pourrait pas valoir 1.',
      },
    ],
    related: [
      '/fr/math-functions/natural-logarithm/',
      '/fr/examples/logistic-growth/',
      '/fr/learn/understanding-derivatives/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'natural-logarithm',
    name: 'Logarithme naturel',
    displayName: 'Fonction logarithme naturel',
    notation: 'f(x) = log(x)',
    expression: 'log(x)',
    tagline:
      'L’inverse de eˣ — il déplie la croissance exponentielle, transformant la multiplication en addition.',
    description:
      'Tracez f(x) = ln(x) : domaine x > 0, asymptote verticale en x = 0, lois des logarithmes — l’inverse de eˣ, du pH aux algorithmes.',
    intro: [
      'Le logarithme naturel, noté ln(x) ou log(x), répond à la question « e à quelle puissance donne x ? » C’est l’inverse exact de la fonction exponentielle : ln(eˣ) = x et e^(ln x) = x, donc son graphe est l’image miroir de y = eˣ réfléchi par rapport à la droite y = x. Là où l’exponentielle fuse vers le haut, le logarithme grimpe avec une lenteur affligeante — ln(10) ≈ 2,303, ln(100) ≈ 4,605, ln(1 000 000) ≈ 13,816 — chaque multiplication de x par dix n’ajoute qu’environ 2,303 à la sortie.',
      'Cette lenteur est précisément l’intérêt : les logarithmes compriment des plages énormes en plages gérables, voilà pourquoi l’échelle de Richter, les décibels et le pH sont tous logarithmiques. Le graphe passe par (1, 0), monte pour x > 1, plonge vers −∞ quand x approche 0 par la droite (l’asymptote verticale en x = 0), et est non défini pour x ≤ 0 — on ne peut élever e à aucune puissance réelle pour obtenir zéro ou un nombre négatif. Tapez log(x) dans la calculatrice à côté de e^x pour voir la symétrie miroir.',
    ],
    sections: [
      {
        heading: 'Ce qu’est le logarithme naturel',
        body: [
          'Les logarithmes ont été inventés pour transformer la multiplication en addition : ln(ab) = ln(a) + ln(b). Avant les calculatrices électroniques, les scientifiques multipliaient de grands nombres en cherchant leurs logarithmes, en les additionnant, puis en reconvertissant — la règle à calcul est l’incarnation physique de cette idée. Le « naturel » du nom renvoie à la base e, la base qui rend le calcul différentiel propre : d/dx ln(x) = 1/x, la dérivée la plus simple possible pour un inverse d’exponentielle.',
          'Les trois lois des logarithmes découlent des lois des exposants de son inverse : ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b, et ln(a^b) = b·ln a. Ensemble, elles permettent de démonter des expressions multiplicatives compliquées en sommes — la raison pour laquelle les logarithmes apparaissent dans les formules d’entropie, les calculs de vraisemblance, et partout où les produits deviennent encombrants.',
        ],
      },
      {
        heading: 'Domaine, asymptote et forme',
        body: [
          'Le domaine est x > 0 uniquement, conséquence directe de eˣ > 0 : il n’existe aucune puissance réelle de e qui donne zéro ou un nombre négatif, donc le logarithme ne peut pas les accepter. Quand x → 0⁺, ln(x) → −∞, donnant l’asymptote verticale x = 0 (l’axe des y) — le miroir de l’asymptote horizontale de l’exponentielle. L’intersection avec l’axe x est en (1, 0) puisque e^0 = 1, le miroir de l’ordonnée à l’origine de eˣ en (0, 1).',
          'La courbe est croissante partout (dérivée 1/x > 0 pour x > 0) mais concave vers le bas partout (dérivée seconde −1/x² < 0) : elle monte vite juste à droite de zéro, puis s’aplatit inexorablement. Elle n’a pas de maximum ni de point d’inflexion, et c’est la primitive de 1/x — l’intégrale qu’aucune règle des puissances ne peut traiter, puisque ∫xⁿ dx échoue en n = −1.',
        ],
      },
      {
        heading: 'Où apparaissent les logarithmes',
        body: [
          'Les échelles logarithmiques mesurent des phénomènes couvrant de nombreux ordres de grandeur : chaque point Richter représente environ 32× l’énergie, chaque unité de pH 10× l’acidité, et les décibels compriment les intensités sonores d’un murmure à un réacteur dans une plage de 0 à 140. En théorie de l’information, l’entropie se mesure en nats (logarithme naturel) ou en bits (logarithme base 2), quantifiant la surprise et les longueurs de code optimales.',
          'En informatique, les algorithmes en O(log n) — la recherche dichotomique étant le classique — divisent le problème par deux à chaque étape : doubler l’entrée n’ajoute donc qu’une étape de plus ; c’est la croissance logarithmique en action. En statistique, prendre les logarithmes redresse les données exponentielles en droites, et la loi log-normale modélise les quantités comme les revenus et les tailles de particules qui se multiplient plutôt qu’elles ne s’additionnent.',
        ],
      },
    ],
    keyFacts: [
      'Domaine : x > 0 ; ensemble d’arrivée : tous les réels. Non défini en x ≤ 0.',
      'Inverse de eˣ : ln(eˣ) = x et e^(ln x) = x ; les graphes se reflètent par rapport à y = x.',
      'Intersection avec l’axe x en (1, 0) ; asymptote verticale x = 0 avec ln(x) → −∞ quand x → 0⁺.',
      'Lois des logs : ln(ab) = ln a + ln b ; ln(a/b) = ln a − ln b ; ln(a^b) = b·ln a.',
      'Dérivée d/dx ln(x) = 1/x ; ln est la primitive de 1/x.',
      'Croissante et concave vers le bas sur tout son domaine ; ni maxima, ni minima, ni points d’inflexion.',
    ],
    faqs: [
      {
        q: 'Pourquoi ln(x) est-il non défini pour les x négatifs ?',
        a: 'Parce que ln(x) demande « e à quelle puissance égale x ? », et e élevé à n’importe quelle puissance réelle est toujours positif. Aucun exposant réel ne produit zéro ni un nombre négatif : le logarithme n’y a donc aucune valeur réelle. (Des logarithmes complexes existent mais sont multivalués et dépassent ce graphe réel.)',
      },
      {
        q: 'Quelle est la différence entre ln(x) et log₁₀(x) ?',
        a: 'Seule la base : ln utilise e ≈ 2,718, log₁₀ utilise 10. Ils sont proportionnels — ln(x) = ln(10)·log₁₀(x) ≈ 2,303·log₁₀(x) — donc leurs graphes ont des formes identiques, juste des échelles verticales différentes. Les logarithmes naturels donnent le calcul différentiel le plus propre (dérivée 1/x) ; les logarithmes base 10 conviennent aux mesures en échelle décimale.',
      },
      {
        q: 'Pourquoi le graphe s’aplatit-il autant ?',
        a: 'Parce que défaire la croissance exponentielle est intrinsèquement lent : pour augmenter ln(x) de 1, il faut multiplier x par e ≈ 2,718. La dérivée 1/x diminue quand x grandit : chaque unité de hauteur supplémentaire exige donc un multiple toujours plus grand de x. Cet aplatissement est exactement ce qui rend les logarithmes idéaux pour comprimer d’immenses plages.',
      },
    ],
    related: [
      '/fr/math-functions/exponential/',
      '/fr/learn/understanding-integrals/',
      '/fr/learn/understanding-derivatives/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'square-root',
    name: 'Racine carrée',
    displayName: 'Fonction racine carrée',
    notation: 'f(x) = sqrt(x)',
    expression: 'sqrt(x)',
    tagline: 'La douce demi-parabole — l’inverse de l’élévation au carré, définie pour x ≥ 0.',
    description:
      'Tracez f(x) = √x : domaine x ≥ 0, demi-parabole, points (0,0) et (4,2) — les racines carrées en géométrie et en distance.',
    intro: [
      'La fonction racine carrée f(x) = √x répond à « quel nombre non négatif, multiplié par lui-même, donne x ? » Son graphe est la moitié supérieure d’une parabole couchée : partant de l’origine, elle monte raide — avec une tangente verticale — puis se courbe et s’aplatit, passant par (1, 1), (4, 2) et (9, 3). C’est l’inverse de x² restreint à x ≥ 0 : son graphe est donc le miroir de la moitié droite de la parabole y = x² réfléchi par rapport à la droite y = x.',
      'Les racines carrées apparaissent partout où Pythagore intervient : la formule de distance √((Δx)² + (Δy)²) est une racine carrée, tout comme l’écart type, le terme discriminant de la formule quadratique, et la moyenne quadratique derrière les tensions efficaces du courant alternatif. La fonction croît sans borne mais de plus en plus lentement — √1 000 000 ne vaut que 1 000. Tapez sqrt(x) dans la calculatrice et tracez x^2 sur [0, ∞) à côté pour voir la symétrie miroir.',
    ],
    sections: [
      {
        heading: 'Ce qu’est la racine carrée',
        body: [
          'Le symbole √ désigne la racine carrée principale (non négative) : √9 = 3, pas ±3, parce qu’une fonction doit donner une seule sortie par entrée. L’équation x² = 9 a deux solutions, ±3, mais la fonction √x ne renvoie que la non négative — le ± appartient à la résolution d’équations, pas à la fonction. Cette unicité est ce qui rend √x dérivable et traçable comme une unique courbe propre.',
          'Algébriquement, √(x²) = |x|, pas x — la racine défait le carré mais restaure la non-négativité, voilà pourquoi la fonction valeur absolue apparaît. La racine obéit aussi à √(ab) = √a·√b et √(a/b) = √a/√b pour a, b non négatifs, les lois multiplicatives héritées des exposants puisque √x = x^(1/2).',
        ],
      },
      {
        heading: 'Domaine, forme et tangente verticale',
        body: [
          'Le domaine est x ≥ 0 : aucun nombre réel élevé au carré ne donne un négatif, donc la fonction ne peut pas accepter d’entrées négatives (sur les réels). En x = 0, le graphe démarre avec une tangente verticale — la dérivée 1/(2√x) explose vers +∞ — ce qu’on voit quand la courbe quitte l’origine droit vers le haut avant de se courber vers la droite. Elle est croissante partout sur son domaine et concave vers le bas partout, s’aplatissant quand x grandit.',
          'L’ensemble d’arrivée est y ≥ 0, et les points notables sont les carrés parfaits : (0, 0), (1, 1), (4, 2), (9, 3), (16, 4). Entre eux, la courbe interpole en douceur — √2 ≈ 1,414, le célèbre irrationnel dont la découverte secoua les mathématiques pythagoriciennes. La fonction n’a pas de maximum et son seul extrémum d’extrémité est le minimum 0 en x = 0.',
        ],
      },
      {
        heading: 'Où apparaissent les racines carrées',
        body: [
          'La distance est le territoire de la racine carrée : de l’hypoténuse de Pythagore à la formule de distance en n dimensions en passant par l’écart type (la racine carrée de la variance), « élever au carré, additionner, extraire la racine » est l’un des motifs les plus répétés des mathématiques. La formule quadratique x = (−b ± √(b² − 4ac))/(2a) place une racine carrée au cœur de la résolution des équations du second degré — y compris pour trouver où x² − 4 traverse zéro.',
          'En physique, de nombreuses lois impliquent des racines carrées : la période d’un pendule est proportionnelle à √(longueur), la vitesse de libération à √(1/rayon), et la tension efficace du secteur est la tension de crête divisée par √2. En géométrie, √2 est la diagonale d’un carré unité et le rapport d’aspect du papier de série A.',
        ],
      },
    ],
    keyFacts: [
      'Racine principale : √x ≥ 0 pour tout x du domaine ; √9 = 3, pas ±3.',
      'Domaine : x ≥ 0 ; ensemble d’arrivée : y ≥ 0. Non définie pour les x négatifs (sur les réels).',
      'Inverse de x² sur [0, ∞) : √(x²) = |x|, et (√x)² = x pour x ≥ 0.',
      'Points clés : (0, 0), (1, 1), (4, 2), (9, 3) ; tangente verticale à l’origine.',
      'Croissante et concave vers le bas sur son domaine ; minimum 0 en x = 0, pas de maximum.',
      'Dérivée d/dx √x = 1/(2√x) ; lois √(ab) = √a·√b pour a, b ≥ 0.',
    ],
    faqs: [
      {
        q: 'Pourquoi √9 ne vaut-elle pas ±3 ?',
        a: 'Parce que √ désigne une fonction, et les fonctions renvoient exactement une valeur par entrée — par convention, la racine non négative. L’équation x² = 9 a bien deux solutions, x = 3 et x = −3, mais seule 3 est √9. Écrire ±√9 récupère les deux solutions quand on résout.',
      },
      {
        q: 'Pourquoi ne peut-on pas prendre la racine carrée d’un nombre négatif (dans les réels) ?',
        a: 'Parce que tout nombre réel élevé au carré est non négatif : les positifs donnent des carrés positifs, les négatifs donnent des carrés positifs, et zéro donne zéro. Rien de réel élevé au carré ne donne −1 : √(−1) n’a donc aucune valeur réelle. Étendre le système de nombres avec i, où i² = −1, donne des racines carrées complexes.',
      },
      {
        q: 'Quelle est la dérivée de √x en x = 0 ?',
        a: 'Elle n’existe pas — la dérivée 1/(2√x) tend vers +∞ quand x → 0⁺ : le graphe a donc une tangente verticale à l’origine. Géométriquement, la courbe quitte (0, 0) en partant droit vers le haut ; il n’y a pas de pente finie à cet endroit, bien que la fonction elle-même soit continue en 0.',
      },
    ],
    related: [
      '/fr/math-functions/quadratic/',
      '/fr/math-functions/absolute-value/',
      '/fr/learn/what-is-a-function/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'absolute-value',
    name: 'Valeur absolue',
    displayName: 'Fonction valeur absolue',
    notation: 'f(x) = abs(x)',
    expression: 'abs(x)',
    tagline: 'La mesure en V de la distance à zéro — simple, symétrique, avec un coin à l’origine.',
    description:
      'Tracez f(x) = |x| : le graphe en V, le coin à l’origine, son sens de ' +
      'distance, sa définition par morceaux et ses usages dans les bornes d’erreur.',
    intro: [
      'La fonction valeur absolue f(x) = |x| est la distance rendue visible : |x| est la distance de x à zéro sur la droite numérique, quelle que soit la direction. Son graphe est un V parfait — la droite y = −x pour les entrées négatives rencontrant la droite y = x pour les positives au coin aigu (0, 0). Ce coin est le trait le plus célèbre de la fonction : l’unique point où elle est continue mais pas dérivable, où la pente saute de −1 à 1.',
      'La valeur absolue surgit partout où la magnitude compte plus que le signe : les bornes d’erreur (|mesuré − vrai| < tolérance), les tolérances en fabrication, la distance entre deux nombres (|a − b|), et les définitions par morceaux dans toutes les mathématiques appliquées. C’est aussi l’exemple le plus simple d’une fonction construite en collant deux formules. Tapez abs(x) dans la calculatrice, puis essayez abs(x - 3) pour voir le V glisser et la distance à 3 dessinée en graphe.',
    ],
    sections: [
      {
        heading: 'Ce qu’est la valeur absolue',
        body: [
          'La définition est par morceaux : |x| = x quand x ≥ 0 et |x| = −x quand x < 0 — le signe moins renverse les négatifs en positifs. Donc |5| = 5 et |−5| = −(−5) = 5. De façon équivalente, |x| = √(x²), ce qui montre pourquoi la sortie n’est jamais négative : élever au carré efface le signe et la racine principale le garde effacé. Les deux formes disent la même chose : la magnitude sans la direction.',
          'Cela fait de |x − a| la distance entre x et a, l’interprétation cheval de bataille. L’inégalité |x − 3| < 2 décrit tous les points à moins de 2 unités de 3, c’est-à-dire l’intervalle ouvert (1, 5) — la valeur absolue convertit le langage des distances en algèbre et inversement. C’est une fonction paire, |−x| = |x| : le V se reflète donc parfaitement par rapport à l’axe des y.',
        ],
      },
      {
        heading: 'Le coin à l’origine',
        body: [
          'En x = 0, les deux bras du V se rencontrent en angle, et cet angle est une véritable singularité de régularité : en approchant par la gauche, la pente vaut −1, par la droite elle vaut +1 : aucune tangente unique n’existe donc. La fonction est continue en 0 — les bras se rejoignent sans trou — mais pas dérivable à cet endroit, le contre-exemple standard qui sépare les deux concepts dans chaque cours de calcul différentiel.',
          'Loin du coin, tout est docile : la dérivée vaut −1 pour x < 0 et +1 pour x > 0, souvent notée comme la fonction signe, et la dérivée seconde vaut 0 partout où elle existe. Le V a son minimum global de 0 en x = 0 et pas de maximum ; les deux bras montent vers +∞ avec une pente constante, sans jamais se courber.',
        ],
      },
      {
        heading: 'Où apparaît la valeur absolue',
        body: [
          'L’analyse d’erreur fonctionne à la valeur absolue : « à moins de 0,5 de la vraie valeur » s’écrit |erreur| < 0,5, et les méthodes numériques s’arrêtent quand des approximations successives vérifient |xₙ₊₁ − xₙ| < tolérance. En statistique, l’écart absolu moyen mesure la dispersion sans élever au carré, restant dans les unités d’origine et résistant mieux aux valeurs aberrantes que la variance.',
          'En optimisation et en apprentissage automatique, la valeur absolue est la pénalité L1 : minimiser des sommes de |·| encourage la parcimonie (beaucoup de zéros exacts), contrairement à la pénalité L2 au carré. Les modèles linéaires par morceaux, des tranches d’imposition aux réseaux de neurones ReLU (max(0, x) = (x + |x|)/2), sont construits à partir de coins de type valeur absolue — le coude en zéro est une fonctionnalité, pas un bogue.',
        ],
      },
    ],
    keyFacts: [
      'Définition par morceaux : |x| = x pour x ≥ 0, |x| = −x pour x < 0 ; de façon équivalente |x| = √(x²).',
      'Domaine : tous les réels ; ensemble d’arrivée : y ≥ 0.',
      'Graphe en V avec sommet (coin) en (0, 0) ; fonction paire, symétrique par rapport à l’axe des y.',
      'Continue partout mais pas dérivable en x = 0 (la pente saute de −1 à 1).',
      '|x − a| est la distance entre x et a ; minimum global 0 en x = 0, pas de maximum.',
    ],
    faqs: [
      {
        q: 'Pourquoi |x| n’est-elle pas dérivable en 0 ?',
        a: 'La dérivabilité en un point exige que les pentes des deux côtés concordent. Pour |x|, la pente à gauche vaut −1 et la pente à droite vaut +1 — elles diffèrent, donc aucune tangente n’existe au coin. La fonction y est quand même continue ; elle a juste un coude.',
      },
      {
        q: 'Quelle est la différence entre |x| et √(x²) ?',
        a: 'Aucune — c’est la même fonction. Élever au carré supprime le signe de x et la racine carrée principale renvoie le résultat non négatif, ce qui est exactement la valeur absolue. L’identité |x| = √(x²) sert souvent à dériver |x| loin de zéro.',
      },
      {
        q: 'Comment résoudre |x − 3| = 5 ?',
        a: 'Lisez « la distance de x à 3 vaut 5 », ce qui donne x = 3 + 5 = 8 ou x = 3 − 5 = −2. Algébriquement, séparez en cas : x − 3 = 5 donne x = 8, et x − 3 = −5 donne x = −2. Les deux se vérifient : |8 − 3| = 5 et |−2 − 3| = 5.',
      },
    ],
    related: [
      '/fr/math-functions/square-root/',
      '/fr/learn/what-is-a-function/',
      '/fr/math-functions/quadratic/',
      '/fr/graphing-calculator/',
    ],
  },
  {
    slug: 'reciprocal',
    name: 'Inverse',
    displayName: 'Fonction inverse',
    notation: 'f(x) = 1/x',
    expression: '1/x',
    tagline:
      'L’hyperbole 1/x — deux branches miroirs séparées par des asymptotes sur les deux axes.',
    description:
      'Tracez f(x) = 1/x : deux branches d’hyperbole, asymptotes sur les deux axes, symétrie impaire — la proportionnalité inverse en science.',
    intro: [
      'La fonction inverse f(x) = 1/x est le graphe de la proportionnalité inverse : doublez l’entrée, divisez la sortie par deux. Son graphe est une hyperbole à deux branches — l’une dans le premier quadrant balayant de +∞ vers l’axe des x, l’autre dans le troisième quadrant montant de −∞ vers lui — séparées par un fossé infranchissable en x = 0. La courbe ne touche jamais aucun axe : l’axe des y (x = 0) est une asymptote verticale et l’axe des x (y = 0) en est une horizontale.',
      'Partout où une quantité est divisée par une autre, l’inverse rôde : à tension fixée, le courant est proportionnel à 1/R (loi d’Ohm) ; à quantité de gaz fixée, la pression est proportionnelle à 1/V (loi de Boyle) ; le temps pour accomplir un travail est proportionnel à 1/(travailleurs). La fonction est sa propre inverse — l’appliquer deux fois rend x — et impaire, avec une symétrie centrale de 180° autour de l’origine. Tapez 1/x dans la calculatrice et dézoomez : les branches s’aplatissent contre les axes sans jamais s’y poser.',
    ],
    sections: [
      {
        heading: 'Ce qu’est la fonction inverse',
        body: [
          'Prendre un inverse signifie diviser 1 par l’entrée : 1/2 = 0,5, 1/4 = 0,25, 1/0,5 = 2. Les petites entrées produisent d’immenses sorties et les immenses entrées de minuscules sorties — la bascule définissante de la proportionnalité inverse. Comme 1/(1/x) = x, la fonction est une involution : elle se défait elle-même, donc son graphe est symétrique par rapport à la droite y = x, la marque des fonctions inverses.',
          'La fonction est impaire, f(−x) = −f(x) : la branche du troisième quadrant est celle du premier pivotée de 180° autour de l’origine. Les points notables sont (1, 1) et (−1, −1), les seuls points où l’entrée égale la sortie (résoudre 1/x = x donne x² = 1). Partout ailleurs, entrée et sortie diffèrent — spectaculairement près de zéro.',
        ],
      },
      {
        heading: 'Deux asymptotes, deux branches',
        body: [
          'x = 0 est une asymptote verticale : quand x → 0⁺ les valeurs → +∞, quand x → 0⁻ elles → −∞, et 1/0 est non défini — la division par zéro n’a pas de sens, donc les branches ne peuvent jamais se rejoindre. y = 0 est une asymptote horizontale : quand |x| → ∞ les valeurs → 0, approchant l’axe des x de toujours plus près sans l’atteindre. Les axes sont des murs que la courbe approche sans jamais toucher.',
          'Chaque branche est strictement décroissante : sur (0, ∞), un x plus grand donne un 1/x plus petit, et de même sur (−∞, 0). Mais la fonction dans son ensemble n’est pas décroissante — elle saute de −∞ à +∞ à travers le fossé en zéro. La dérivée f′(x) = −1/x² est négative partout où elle est définie, confirmant la descente sur chaque branche, et la courbe est convexe sur (0, ∞) et concave sur (−∞, 0).',
        ],
      },
      {
        heading: 'Où apparaît la fonction inverse',
        body: [
          'La proportionnalité inverse est partout en science : la loi de Boyle (P ∝ 1/V), la loi d’Ohm (I = V/R), l’équation des lentilles 1/f = 1/dₒ + 1/dᵢ, et les forces gravitationnelles et électrostatiques qui décroissent en 1/r². Dans chaque cas, doubler le dénominateur divise le résultat par deux — la signature de l’inverse. Fréquence et période sont inverses (f = 1/T) : une période de 0,01 s est un ton de 100 Hz.',
          'En calcul différentiel, 1/x est célèbre comme la fonction dont la primitive n’est pas une puissance : ∫(1/x)dx = ln|x| + C, l’intégrale qui força l’invention du logarithme. Son intégrale impropre de 1 à ∞ diverge (la cousine continue de la série harmonique), pourtant cette même forme tournée donne le cor de Gabriel — volume fini, aire infinie.',
        ],
      },
    ],
    keyFacts: [
      'Domaine : tous les réels x ≠ 0 ; ensemble d’arrivée : tous les réels y ≠ 0. Non définie en x = 0.',
      'Hyperbole à deux branches : (0, ∞) donne des valeurs positives, (−∞, 0) des valeurs négatives.',
      'Asymptote verticale x = 0 ; asymptote horizontale y = 0.',
      'Fonction impaire : f(−x) = −f(x) ; symétrie centrale de 180° autour de l’origine ; sa propre inverse.',
      'Passe par (1, 1) et (−1, −1) ; strictement décroissante sur chaque branche.',
      'Dérivée f′(x) = −1/x² ; une primitive est ln|x| + C.',
    ],
    faqs: [
      {
        q: 'Pourquoi 1/0 est-il non défini ?',
        a: 'La division demande « quoi fois le diviseur donne le dividende ? » — aucun nombre fois 0 ne donne 1 : 1/0 n’a donc pas de réponse. Sur le graphe, cela se voit comme l’asymptote verticale : les valeurs explosent vers ±∞ près de zéro mais ne se fixent sur aucune valeur en zéro même.',
      },
      {
        q: 'Est-ce que 1/x est croissante ou décroissante ?',
        a: 'Décroissante sur chacun de ses deux intervalles — prenez deux nombres positifs quelconques et la plus grande entrée donne la plus petite sortie — mais pas décroissante globalement, car elle saute de −∞ à +∞ à travers x = 0. La dérivée −1/x² est négative partout où la fonction est définie, ce qui ne parle que du comportement au sein de chaque branche.',
      },
      {
        q: 'Quelle est l’intégrale de 1/x ?',
        a: 'ln|x| + C. La règle des puissances ∫xⁿ dx = x^(n+1)/(n+1) échoue en n = −1 (division par zéro) : 1/x a donc besoin de sa propre primitive — historiquement, c’est cette intégrale qui définit le logarithme naturel. La valeur absolue garde la formule valide pour les x négatifs aussi.',
      },
    ],
    related: [
      '/fr/learn/asymptotes-explained/',
      '/fr/math-functions/natural-logarithm/',
      '/fr/learn/understanding-integrals/',
      '/fr/graphing-calculator/',
    ],
  },
];
