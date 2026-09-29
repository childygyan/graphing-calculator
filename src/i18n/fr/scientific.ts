/**
 * French scientific dictionary — the `/scientific-calculator/` page prose
 * plus the ScientificCalculator island strings.
 * Mirrors `src/i18n/en/scientific.ts` exactly.
 *
 * Keypad `label`s are what the user sees on the keys; `ariaLabel`s are the
 * accessible names. The `insert` text each key types is expression syntax
 * and is deliberately NOT translated — it lives with the component.
 */

import type { ScientificStrings } from '../types.js';

export const scientific: ScientificStrings = {
  seo: {
    title: 'Calculatrice scientifique en ligne — Gratuite, modes DEG/RAD | Graphing Calculator',
    description:
      'Calculatrice scientifique en ligne gratuite : trigonométrie, trigonométrie inverse, ' +
      'log, ln, puissances, racines, π et e avec modes DEG/RAD, prise en charge du clavier ' +
      'et messages d’erreur clairs.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Calculatrice scientifique', href: '/scientific-calculator/' },
  ],
  heading: 'Calculatrice scientifique',
  intro: [
    'Une calculatrice scientifique en ligne gratuite pour les maths de tous les jours : ' +
      'arithmétique avec le bon ordre des opérations, fonctions trigonométriques et ' +
      'trigonométriques inverses, logarithmes en base 10 et naturels, puissances, racines et ' +
      'les constantes π et e. Tapez sur votre clavier ou touchez le pavé — chaque calcul ' +
      's’exécute dans votre navigateur grâce au même moteur d’expressions que notre ' +
      'calculatrice graphique.',
  ],
  sections: [
    {
      heading: 'Ce que fait cette calculatrice',
      body: [
        'Saisissez n’importe quelle expression — par exemple sin(30) + √(16), log(1000) ou 2^10 — et appuyez sur = pour l’évaluer. La calculatrice suit la priorité standard (parenthèses, puis puissances, puis multiplication et division, puis addition et soustraction) : 2 + 3 × 4 donne donc 14, pas 20.',
        'Au-delà de l’arithmétique, vous disposez de tout l’arsenal scientifique : sin, cos, tan et leurs inverses asin, acos, atan ; log (base 10) et ln (logarithme naturel) ; les puissances xʸ y compris à exposants fractionnaires ; les racines carrées ; et les constantes π et e. Les expressions peuvent s’imbriquer librement, p. ex. sin(π/6)^2 + cos(π/6)^2.',
      ],
    },
    {
      heading: 'Degrés contre radians (modes DEG et RAD)',
      body: [
        'Les angles peuvent se mesurer en degrés ou en radians, et les fonctions trigonométriques donnent des réponses différentes selon votre choix : sin(30°) = 0,5, mais sin(30 radians) ≈ −0,988. Le sélecteur DEG/RAD en haut à gauche du pavé bascule entre les deux, et le badge au-dessus de l’affichage indique toujours le mode actif.',
        'En mode DEG, sin, cos et tan lisent leur entrée en degrés, tandis que asin, acos et atan rendent leurs résultats en degrés — comme sur une calculatrice scientifique physique. En mode RAD, tout fonctionne en radians, ce que la plupart des formules de calcul différentiel et de physique attendent. Si un résultat trigonométrique semble faux, le mode d’angle est la première chose à vérifier.',
      ],
    },
    {
      heading: 'Raccourcis clavier',
      body: [
        'Vous n’avez jamais besoin de toucher le pavé : cliquez dans le champ d’expression et tapez. Chiffres, +, −, (, ), ^ et . fonctionnent tels quels ; taper * insère × et / insère ÷ ; Entrée ou = évalue ; Échap efface tout ; Retour arrière supprime normalement. Après un résultat, taper un chiffre commence une nouvelle expression, tandis que taper un opérateur continue à partir de la réponse précédente.',
      ],
    },
    {
      heading: 'Des erreurs honnêtes, pas NaN',
      body: [
        'Quand une expression n’a pas de réponse sensée, cette calculatrice le dit en langage clair au lieu d’afficher NaN ou Infinity. Diviser par zéro, prendre la racine carrée d’un nombre négatif ou le logarithme d’un nombre non positif produisent chacun une explication précise. Les expressions incomplètes sont aussi guidées : un opérateur final ou des parenthèses déséquilibrées vous disent exactement quoi corriger.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Dois-je utiliser le mode DEG ou RAD ?',
      answer:
        'Utilisez DEG pour les problèmes d’angles courants (une pente de 30°, un triangle en ' +
        'degrés) et RAD pour le calcul différentiel, les formules de physique et tout ce qui ' +
        'implique π comme angle. Le mode n’affecte que sin, cos, tan, asin, acos et atan — ' +
        'tout le reste est identique.',
    },
    {
      question: 'Quelle est la différence entre log et ln ?',
      answer:
        'La touche log calcule le logarithme en base 10 (log 1000 = 3) et ln calcule le ' +
        'logarithme naturel, de base e (ln(e) = 1). Les deux sont non définis pour zéro et les ' +
        'nombres négatifs, et la calculatrice vous le dira.',
    },
    {
      question: 'Pourquoi 1 ÷ 0 affiche-t-il une erreur au lieu de l’infini ?',
      answer:
        'La division par zéro n’est pas définie en mathématiques — elle n’a pas de valeur ' +
        'unique sensée. Afficher « infini » serait trompeur (1 ÷ 0 et −1 ÷ 0 ne peuvent pas ' +
        'tous deux valoir l’infini), donc la calculatrice le signale honnêtement comme non défini.',
    },
    {
      question: 'Puis-je taper des expressions au clavier ?',
      answer:
        'Oui. Sélectionnez le champ d’expression et tapez normalement ; Entrée évalue et Échap ' +
        'efface. La touche * insère ×, / insère ÷, et ^ est l’opérateur de puissance : 2^10 ' +
        'donne donc 1024.',
    },
    {
      question: 'Quelle est la précision des résultats ?',
      answer:
        'Les résultats sont affichés avec 10 chiffres significatifs, calculés en virgule ' +
        'flottante double précision — la même arithmétique qu’une calculatrice scientifique ' +
        'physique. Les très grands résultats qui débordent sont signalés comme dépassement ' +
        'plutôt que comme infini.',
    },
    {
      question: 'Puis-je tracer une expression au lieu de simplement l’évaluer ?',
      answer:
        'Oui — la calculatrice graphique de ce site trace des fonctions de x avec zoom, suivi ' +
        'de courbe, racines et analyse de tangentes. Elle utilise le même moteur d’expressions : ' +
        'tout ce que vous évaluez ici se comporte de façon identique là-bas.',
    },
  ],
  related: ['/graphing-calculator/', '/calculators/', '/calculators/derivative/', '/learn/'],
  island: {
    heading: 'Calculatrice scientifique',
    title: 'Scientifique',
    angleModeLabel: 'Mode d’angle',
    angleModeTemplate: 'Mode d’angle : {mode}',
    degrees: 'degrés',
    radians: 'radians',
    expressionLabel: 'Expression',
    expressionPlaceholder: 'Saisissez une expression',
    resultLabel: 'Résultat',
    fractionToggle: 'Fraction ↔ Décimal',
    copyResult: 'Copier le résultat',
    copied: 'Copié',
    memoryLabel: 'Mémoire',
    memoryClear: 'Effacer la mémoire',
    memoryRecall: 'Rappeler la mémoire',
    memoryAdd: 'Ajouter le résultat à la mémoire',
    memorySubtract: 'Soustraire le résultat de la mémoire',
    undo: 'Annuler',
    redo: 'Rétablir',
    functionRowsLabel: 'Fonctions scientifiques',
    loadFailedTitle: 'Échec du chargement de la calculatrice scientifique',
    keypadLabel: 'Pavé de la calculatrice',
    historyTitle: 'Historique',
    historyEmptyTitle: 'Un petit espace pour votre travail.',
    historyEmptyBody: 'Vos calculs apparaîtront ici. Sélectionnez-en un pour le réutiliser.',
    historyStoredNote: '50 derniers calculs · enregistrés dans ce navigateur',
    historyClear: 'Effacer l’historique',
    historyReuse: 'Réutiliser ce calcul',
    footerEnter: 'Entrée pour calculer',
    footerDevice: 'Calculé sur votre appareil',
    keys: {
      sin: { label: 'sin', ariaLabel: 'sinus', altLabel: 'asin', altAriaLabel: 'arc sinus' },
      cos: { label: 'cos', ariaLabel: 'cosinus', altLabel: 'acos', altAriaLabel: 'arc cosinus' },
      tan: { label: 'tan', ariaLabel: 'tangente', altLabel: 'atan', altAriaLabel: 'arc tangente' },
      log: {
        label: 'log',
        ariaLabel: 'logarithme en base 10',
        altLabel: '10ˣ',
        altAriaLabel: 'dix puissance x',
      },
      ln: {
        label: 'ln',
        ariaLabel: 'logarithme naturel',
        altLabel: 'eˣ',
        altAriaLabel: 'e puissance x',
      },
      pow: { label: 'xʸ', ariaLabel: 'puissance' },
      sqrt: { label: '√', ariaLabel: 'racine carrée' },
      square: { label: 'x²', ariaLabel: 'carré' },
      reciprocal: { label: '1/x', ariaLabel: 'inverse' },
      abs: { label: '|x|', ariaLabel: 'valeur absolue' },
      factorial: { label: 'n!', ariaLabel: 'factorielle' },
      ncr: { label: 'nCr', ariaLabel: 'combinaisons' },
      shift: { label: '2nd', ariaLabel: 'fonctions secondaires' },
      lparen: { label: '(', ariaLabel: 'parenthèse ouvrante' },
      rparen: { label: ')', ariaLabel: 'parenthèse fermante' },
      ac: { label: 'AC', ariaLabel: 'effacer' },
      backspace: { label: '⌫', ariaLabel: 'retour arrière' },
      pi: { label: 'π', ariaLabel: 'pi' },
      d7: { label: '7', ariaLabel: '7' },
      d8: { label: '8', ariaLabel: '8' },
      d9: { label: '9', ariaLabel: '9' },
      div: { label: '÷', ariaLabel: 'diviser' },
      e: { label: 'e', ariaLabel: 'nombre d’Euler e' },
      d4: { label: '4', ariaLabel: '4' },
      d5: { label: '5', ariaLabel: '5' },
      d6: { label: '6', ariaLabel: '6' },
      mul: { label: '×', ariaLabel: 'multiplier' },
      ee: { label: 'EE', ariaLabel: 'fois dix puissance' },
      d1: { label: '1', ariaLabel: '1' },
      d2: { label: '2', ariaLabel: '2' },
      d3: { label: '3', ariaLabel: '3' },
      sub: { label: '−', ariaLabel: 'moins' },
      ans: { label: 'Ans', ariaLabel: 'réponse précédente' },
      negate: { label: '±', ariaLabel: 'changer de signe' },
      d0: { label: '0', ariaLabel: '0' },
      dot: { label: '.', ariaLabel: 'point décimal' },
      add: { label: '+', ariaLabel: 'plus' },
      percent: { label: '%', ariaLabel: 'pour cent' },
      npr: { label: 'nPr', ariaLabel: 'permutations' },
      equals: { label: '=', ariaLabel: 'égal' },
    },
    errors: {
      divisionByZero: 'Non défini — division par zéro.',
      sqrtNegative: 'Non défini — la racine carrée d’un nombre négatif n’est pas un nombre réel.',
      logNonPositive:
        'Non défini — le logarithme d’un nombre non positif n’est pas un nombre réel.',
      asinAcosDomain: 'Non défini — asin et acos exigent un argument entre −1 et 1.',
      tanUndefined: 'Non défini — tan n’est pas définie aux multiples impairs de 90°.',
      emptyExpression: 'Saisissez d’abord une expression.',
      trailingOperator: 'L’expression se termine par un opérateur — ajoutez un nombre après.',
      mismatchedParens:
        'Parenthèses déséquilibrées — chaque « ( » a besoin d’une « ) » correspondante.',
      badCharTemplate: 'Je ne comprends pas le caractère « {char} » — supprimez-le et réessayez.',
      unreadable: 'L’expression n’a pas pu être lue — vérifiez les fautes de frappe.',
      notReal: 'Non défini — le résultat n’est pas un nombre réel.',
      overflow: 'Dépassement — le résultat est trop grand pour être affiché.',
    },
  },
};
