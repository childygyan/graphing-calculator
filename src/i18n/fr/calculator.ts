/**
 * French calculator dictionary — the graphing-calculator page prose plus
 * every string owned by the calculator islands and supporting libraries.
 *
 * Mirrors `src/i18n/en/calculator.ts` exactly: same keys, same nesting,
 * same placeholder names. Mathematical notation (f′(x), ∫, θ, …) and
 * expression syntax are DO-NOT-TRANSLATE.
 */

import type { CalculatorStrings } from '../types.js';

export const calculator: CalculatorStrings = {
  seo: {
    title: 'Calculatrice graphique — Traceur de fonctions en ligne gratuit',
    description:
      'Calculatrice graphique en ligne gratuite : tracez des fonctions, des courbes ' +
      'paramétriques et polaires, trouvez racines, dérivées et intégrales, et explorez les ' +
      'maths avec un assistant IA. Sans inscription.',
  },
  intro: {
    heading: 'À propos de cette calculatrice graphique',
    lede:
      'Une calculatrice graphique gratuite et sans inscription qui fonctionne entièrement ' +
      'dans votre navigateur. Tracez des fonctions, analysez-les avec de vraies méthodes ' +
      'numériques, animez des paramètres avec des curseurs et obtenez de l’aide en langage ' +
      'courant grâce à l’assistant IA.',
  },
  sections: [
    {
      heading: 'Ce que vous pouvez faire',
      body: [
        'Tapez une expression comme x^2, sin(x) ou 1/x et regardez-la se tracer instantanément. Ajoutez d’autres expressions pour les comparer, basculez leur visibilité et changez leurs couleurs. Le graphe prend en charge un zoom fluide centré sur votre curseur, le déplacement et tous les gestes tactiles, y compris le pincement pour zoomer.',
        'Au-delà du traçage, les outils d’analyse transforment le graphe en laboratoire : localisez les intersections avec l’axe des x, calculez la pente en n’importe quel point, mesurez l’aire sous une courbe, générez des tableaux de valeurs et tracez des tangentes et des normales. Les variables et les curseurs vous permettent d’animer des paramètres — faites glisser un curseur et regardez toute une famille de courbes se transformer en temps réel.',
      ],
    },
    {
      heading: 'Comment tracer une fonction',
      body: [
        'Saisissez votre expression dans la liste des expressions en utilisant x comme variable — par exemple, x^3 - 3*x. Le graphe se met à jour pendant que vous tapez. Faites défiler pour zoomer vers votre curseur, faites glisser pour déplacer, et double-cliquez (ou utilisez la barre d’outils) pour réinitialiser la vue.',
        'Pour aller plus loin, sélectionnez une expression et ouvrez le panneau d’analyse : trouvez ses racines, ses extrémums et ses intersections, ou évaluez la dérivée et l’intégrale aux points de votre choix. Si vous préférez les mots aux formules, ouvrez l’assistant IA et demandez — par exemple, « trace sin(x) et montre-moi ses racines ».',
      ],
    },
  ],
  faqs: [
    {
      question: 'Cette calculatrice graphique est-elle gratuite ?',
      answer:
        'Oui. La calculatrice fonctionne entièrement dans votre navigateur et son utilisation ' +
        'est gratuite, sans inscription. Vos graphes sont enregistrés sur votre propre appareil, ' +
        'pas sur un serveur.',
    },
    {
      question: 'Quels types d’expressions puis-je tracer ?',
      answer:
        'Des fonctions cartésiennes comme sin(x) ou x^2 - 4, des courbes paramétriques, des ' +
        'équations polaires, des inégalités et des points isolés. Vous pouvez tracer de ' +
        'nombreuses expressions à la fois, chacune avec sa propre couleur.',
    },
    {
      question: 'Peut-elle trouver racines, dérivées et intégrales ?',
      answer:
        'Oui. Le panneau d’analyse trouve les racines avec la méthode de Brent, estime les ' +
        'dérivées par différences centrées, calcule les intégrales définies avec la méthode de ' +
        'Simpson adaptative et trace des tangentes. Les résultats qui ne peuvent pas être ' +
        'calculés sont signalés honnêtement.',
    },
    {
      question: 'Comment fonctionne l’assistant IA ?',
      answer:
        'Vous pouvez poser des questions en langage courant. L’assistant traduit votre demande ' +
        'en commandes de calculatrice — tracer des expressions, régler la zone d’affichage ou ' +
        'expliquer un concept étape par étape. Le moteur mathématique effectue toujours les ' +
        'vrais calculs ; l’IA n’invente jamais de résultats numériques.',
    },
    {
      question: 'Ai-je besoin d’un compte pour enregistrer ou partager des graphes ?',
      answer:
        'Aucun compte n’existe. Vous pouvez enregistrer des graphes nommés dans votre ' +
        'navigateur, les exporter en JSON ou PNG et les partager sous forme de liens compacts ' +
        'que tout le monde peut ouvrir.',
    },
  ],
  related: [
    '/math-functions/',
    '/examples/',
    '/learn/',
    '/calculators/derivative/',
    '/calculators/integral/',
    '/calculators/root-finder/',
  ],
  shell: {
    loadFailedTitle: 'Échec du chargement de la calculatrice',
    errorFallback: {
      defaultTitle: 'Un problème est survenu',
      message:
        'Une erreur inattendue a interrompu cette partie de la page. Vos autres données ne sont pas affectées.',
      retry: 'Réessayer',
    },
    toolbar: {
      regionLabel: 'Actions de la calculatrice',
      title: 'Calculatrice graphique',
      addExpression: 'Ajouter une expression',
      zoomIn: 'Zoom avant',
      zoomOut: 'Zoom arrière',
      resetView: 'Réinitialiser la vue',
    },
    expressions: {
      panelTitle: 'Expressions',
      add: 'Ajouter',
      addAriaLabel: 'Ajouter une expression',
      fallbackTitle: 'Échec du chargement de la liste des expressions',
      kinds: {
        cartesian: 'Cartésienne',
        parametric: 'Paramétrique',
        polar: 'Polaire',
        inequality: 'Inégalité',
        point: 'Point',
        table: 'Tableau',
        textNote: 'Note textuelle',
        folder: 'Dossier',
        image: 'Image',
        action: 'Action',
      },
      kindOptions: [
        { kind: 'cartesian', label: 'y = f(x)' },
        { kind: 'parametric', label: 'Paramétrique' },
        { kind: 'polar', label: 'Polaire' },
        { kind: 'inequality', label: 'Inégalité' },
        { kind: 'point', label: 'Point' },
        { kind: 'table', label: 'Tableau' },
        { kind: 'text', label: 'Note' },
        { kind: 'folder', label: 'Dossier' },
        { kind: 'image', label: 'Image' },
        { kind: 'action', label: 'Action' },
      ],
      addKindOptions: [
        { kind: 'cartesian', label: 'Fonction y = f(x)' },
        { kind: 'parametric', label: 'Paramétrique (x(t), y(t))' },
        { kind: 'polar', label: 'Polaire r(θ)' },
        { kind: 'inequality', label: 'Inégalité' },
        { kind: 'point', label: 'Point' },
      ],
      addKindLabel: 'Type d’expression',
      emptyState: 'Aucune expression pour le moment.',
      changeColorTemplate: 'Changer la couleur de {label}',
      renameAriaTemplate: 'Renommer {label}',
      changeTypeAriaTemplate: 'Changer le type de {label}',
      editDefinitionAriaTemplate: 'Modifier la définition de {label}',
      duplicateAriaTemplate: 'Dupliquer {label}',
      deleteAriaTemplate: 'Supprimer {label}',
      hideAria: 'Masquer l’expression',
      showAria: 'Afficher l’expression',
      fields: {
        xOfT: 'définition de x(t)',
        yOfT: 'définition de y(t)',
        tMin: 't min',
        tMax: 't max',
        xCoordinate: 'coordonnée x',
        yCoordinate: 'coordonnée y',
        polarHint: 'θ de 0 à 2π — tapez theta ou θ',
        inequalitySide: 'Côté de l’inégalité',
        inequalityOperator: 'Opérateur d’inégalité',
      },
      defaultLabelTemplate: '{kind} {n}',
      summaryTemplates: {
        cartesian: 'y = {rhs}',
        parametric: '(x(t), y(t)) = ({x}, {y})',
        polar: 'r = {r}',
        point: '({x}, {y})',
        inequality: '{lhs} {op} {rhs}',
        table: 'Tableau ({cols} colonnes x {rows} lignes)',
        note: 'Note : {preview}',
        noteEmpty: 'Note : (vide)',
        folder: 'Dossier ({n} éléments)',
        image: 'Image',
        imageEmpty: 'Image : (aucune source)',
        action: 'Action ({n} affectations)',
      },
      addMenu: {
        buttonAriaLabel: 'Ajouter un élément au graphique',
        expression: 'Expression',
        expressionKindsAriaLabel: "Type d'expression",
        table: 'Tableau',
        folder: 'Dossier',
        note: 'Note',
        image: 'Image',
        action: 'Action',
      },
      tableEditor: {
        columnX: 'x',
        columnY: 'y',
        addRow: 'Ajouter une ligne',
        removeRowAriaTemplate: 'Supprimer la ligne {n}',
        cellAriaTemplate: 'Ligne {row}, colonne {col}',
        emptyHint: 'Ajoutez des lignes pour tracer des points depuis ce tableau.',
      },
      noteEditor: {
        placeholder: 'Écrire une note…',
        ariaLabel: 'Texte de la note',
      },
      folderRow: {
        collapseAriaTemplate: 'Réduire {label}',
        expandAriaTemplate: 'Développer {label}',
        itemCountTemplate: '{n} éléments',
        emptyFolder: 'Dossier vide — déplacez des expressions ici pour les organiser.',
        moveToFolder: 'Déplacer vers le dossier',
        moveToTopLevel: 'Sortir du dossier',
        noFolders: 'Aucun dossier pour le moment',
      },
      imageEditor: {
        srcLabel: "URL de l'image",
        srcPlaceholder: 'https://example.com/image.png',
        invalidSrc: 'Utilisez une URL https:// ou data:image/.',
        centerX: 'Centre x',
        centerY: 'Centre y',
        width: 'Largeur',
        height: 'Hauteur',
        opacity: 'Opacité',
        uploadLabel: 'Téléverser une image',
        uploadAria: 'Téléverser un fichier image',
        uploadedLabel: 'Image téléversée (enregistrée dans ce graphique)',
        clearImageAria: "Supprimer l'image",
        uploadTooLarge: "L'image est trop grande (max 500 Ko).",
        loadFailed: 'Impossible de charger cette image.',
      },
      actionEditor: {
        defaultButtonLabel: 'Exécuter',
        buttonLabelLabel: 'Libellé du bouton',
        variableHeader: 'Variable',
        valueHeader: 'Valeur',
        addAssignment: 'Ajouter une affectation',
        removeAssignmentAriaTemplate: "Supprimer l'affectation {n}",
        runAriaTemplate: 'Exécuter {label}',
        lastRunTemplate: 'Dernière exécution : {time}',
        invalidVariableTemplate: '«\u202f{variable}\u202f» n’est pas un nom de variable valide.',
        evaluationErrorTemplate: 'Impossible d’évaluer la valeur de «\u202f{variable}\u202f».',
        nonFiniteTemplate: 'La valeur de «\u202f{variable}\u202f» n’est pas un nombre fini.',
      },
    },
    graph: {
      regionLabel: 'Graphe',
      toolbarLabel: 'Contrôles de la vue du graphe',
      zoomIn: 'Zoom avant',
      zoomOut: 'Zoom arrière',
      resetView: 'Réinitialiser la vue',
      fitView: 'Ajuster la vue',
      toggleGrid: 'Afficher/masquer la grille',
      toggleAxes: 'Afficher/masquer les axes',
      inspectedPoint: 'Point inspecté',
      dismissInspectedPoint: 'Ignorer le point inspecté',
      tangentButton: 'Tangente',
      noteButton: 'Note',
      notePlaceholder: 'Étiquette de la note…',
      noteAriaLabel: 'Étiquette de l’annotation',
      coordinateTemplate: 'x : {x}, y : {y}',
      canvasDefaultLabel:
        'Graphe cartésien interactif. Utilisez la barre d’outils du graphe pour zoomer, dézoomer ou réinitialiser la vue.',
      unknownCurveLabel: 'Courbe',
      loadErrorTitle: 'Le graphe interactif a rencontré un problème',
      loadErrorMessage: 'Vos expressions et paramètres ne sont pas affectés.',
      reloadGraph: 'Recharger le graphe',
    },
    variables: {
      panelTitle: 'Variables',
      add: 'Ajouter',
      nameLabel: 'Nom de la variable',
      animationSpeed: 'Vitesse d’animation',
      animationSpeedTitle: 'Vitesse de balayage de l’animation',
      speeds: { slow: 'Lente', normal: 'Normale', fast: 'Rapide' },
      reducedMotionNote:
        'L’animation est désactivée car votre système préfère les mouvements réduits.',
      emptyState:
        'Aucune variable pour le moment. Ajoutez-en une, puis utilisez-la dans une expression — p. ex. y = a·sin(b·x).',
      emptyStateLead:
        'Aucune variable pour le moment. Ajoutez-en une, puis utilisez-la dans une expression, par ex.',
      undefinedHeading: 'Utilisées dans les expressions mais non définies :',
      defineVariableAriaTemplate: 'Définir la variable {name}',
      valueAriaTemplate: 'valeur de {name}',
      currentValueTitle: 'Valeur résolue actuelle',
      sliderAriaTemplate: 'curseur de {name}',
      dragToChangeTemplate: 'Faites glisser pour modifier {name}',
      sliderUnavailable: 'Curseur indisponible : la valeur provient d’une formule.',
      animateAriaTemplate: 'Animer {name}',
      pauseAriaTemplate: 'Suspendre l’animation de {name}',
      animateAcrossRangeTemplate: 'Animer {name} sur toute sa plage',
      animationDisabledReducedMotion:
        'Animation désactivée : votre système préfère les mouvements réduits.',
      animationNeedsPlainValue:
        'L’animation nécessite une valeur numérique simple (pas une formule).',
      deleteVariableAriaTemplate: 'Supprimer la variable {name}',
      min: 'Min',
      max: 'Max',
      stepLabel: 'Pas',
      validation: {
        enterName: 'Saisissez un nom de variable.',
        namePattern:
          'Utilisez des lettres, des chiffres ou le tiret bas, en commençant par une lettre.',
        reservedTemplate: '« {name} » est réservé (x, t, theta sont des paramètres du graphe).',
        takenTemplate: '« {name} » est déjà un nom de fonction ou de constante.',
        undefinedTemplate:
          'Variable {names} non définie — définissez-la dans Variables ou corrigez le nom.',
        reservedUseTemplate:
          'La variable « {name} » ne peut pas utiliser « {used} » — les variables doivent être ' +
          'de simples nombres ou ne dépendre que d’autres variables.',
        unknownTemplate: 'Variable {names} inconnue dans la définition de « {name} ».',
        circularTemplate: 'Référence circulaire : {path}.',
        duplicateTemplate: 'Variable « {name} » en double — on conserve la première.',
        invalidExpression: 'Expression invalide.',
      },
    },
    analysis: {
      precision: {
        formatLabel: 'Format',
        decimals: 'Décimales',
        significant: 'Significatifs',
        digitsTemplate: 'Chiffres (1–15)',
        placesTemplate: 'Décimales (0–12)',
      },
      table: {
        title: 'Tableau de valeurs',
        start: 'Début',
        end: 'Fin',
        step: 'Pas (« auto »)',
        build: 'Construire le tableau',
        startError: 'Saisissez des nombres valides pour le début et la fin.',
        stepError: 'Le pas doit être un nombre positif ou « auto ».',
        captionTemplate: 'Tableau de valeurs pour {label}',
        stepCaptionTemplate: 'Pas {step} · {shown} lignes affichées sur {total}',
        captionTruncatedSuffix: ' — réduisez la plage ou augmentez le pas pour voir le reste',
        keyboardHint: 'Sélectionnez le tableau et utilisez ↑/↓ pour passer d’une ligne à l’autre.',
        noRows: 'Aucune ligne à afficher.',
        notDefinedTitle: 'Non définie en ce x',
        useTappedPoint: 'Utiliser le point touché',
        useTappedPointTitle: 'Utiliser le point sélectionné en touchant le graphe',
      },
      roots: {
        title: 'Racines',
        from: 'De',
        to: 'À',
        find: 'Trouver les racines',
        useViewport: 'Utiliser la vue',
        showOnGraph: 'Afficher sur le graphe',
        none: 'Aucune racine trouvée dans cette plage.',
        resultTemplate: 'x = {x}',
      },
      intersections: {
        title: 'Intersections',
        noneDefined: 'Ajoutez une deuxième expression cartésienne pour trouver les intersections.',
        with: 'Avec',
        find: 'Trouver les intersections',
        showOnGraph: 'Afficher sur le graphe',
        viewportNote: 'Recherche dans la plage x de la vue actuelle.',
        none: 'Aucune intersection trouvée dans la vue.',
      },
      derivative: {
        title: 'Dérivée',
        atX: 'En x =',
        compute: 'f′(x)',
        plot: 'Tracer f′(x)',
        hide: 'Masquer f′(x)',
        resultTemplate: 'f′({x}) = {value}',
        note: 'Numérique (différences centrées) — pas une dérivée symbolique.',
      },
      integral: {
        title: 'Intégrale définie',
        fromA: 'De a',
        toB: 'À b',
        compute: 'Calculer',
        shadeArea: 'Colorer l’aire',
        hideShading: 'Masquer le coloriage',
        resultTemplate: '∫ = {value}',
        noConvergence:
          'La quadrature n’a pas convergé sur cet intervalle (singularité possible ou ' +
          'trou de domaine) — aucune valeur n’est rapportée.',
      },
      limit: {
        title: 'Limite',
        atX: 'En x =',
        side: 'Côté',
        sides: { twoSided: 'Bilatérale', left: 'Gauche', right: 'Droite' },
        compute: 'Calculer',
        convergesTemplate: 'Limite = {value}',
        unboundedTemplate: 'Non bornée — tend vers {direction}',
        doesNotExist: 'N’existe pas (les limites unilatérales diffèrent ou la fonction oscille)',
        indeterminate: 'Indéterminable — la fonction n’est pas définie près de ce point',
      },
      extrema: {
        title: 'Extrémums locaux',
        find: 'Trouver dans la vue',
        showOnGraph: 'Afficher sur le graphe',
        none: 'Aucun minimum ni maximum local trouvé dans la vue.',
        minTemplate: 'Min en ({x}, {y})',
        maxTemplate: 'Max en ({x}, {y})',
      },
      tangent: {
        title: 'Tangente et normale',
        atX: 'En x =',
        compute: 'Calculer',
        showTangent: 'Afficher la tangente',
        showNormal: 'Afficher la normale',
        failed: 'Pas de tangente ici — la fonction n’est pas définie ou pas dérivable en ce x.',
        tangentTemplate: 'Tangente : {equation}',
        normalTemplate: 'Normale : {equation}',
        slopeTemplate: 'pente f′({x}) = {slope}',
        cannotAnalyzeTemplate: 'Impossible d’analyser cette expression : {error}',
        unknownParseError: 'erreur d’analyse inconnue.',
        couldNotParse: 'Impossible d’analyser cette expression.',
      },
      annotations: {
        title: 'Annotations',
        annotateTapped: 'Annoter le point touché',
        empty:
          'Aucune annotation pour le moment. Touchez une courbe sur le graphe, puis annotez ' +
          'le point — ou renommez et supprimez les annotations ici.',
        showAriaTemplate: 'Afficher l’annotation {label}',
        deleteAriaTemplate: 'Supprimer l’annotation {label}',
        show: 'Afficher',
        label: 'Étiquette',
      },
      panelEmpty:
        'Ajoutez une expression cartésienne (y = …) pour débloquer tableaux, racines, ' +
        'dérivées, intégrales, limites, extrémums et tangentes.',
      panelTitle: 'Analyse',
      panelAriaLabel: 'Analyse mathématique',
    },
    persistence: {
      regionLabel: 'Persistance du graphe',
      undo: 'Annuler',
      redo: 'Rétablir',
      save: 'Enregistrer le graphe',
      saveUnsaved: 'Enregistrer le graphe (modifications non enregistrées)',
      unsavedChanges: 'Modifications non enregistrées',
      myGraphs: 'Mes graphes',
      share: 'Partager',
      export: 'Exporter',
      closeExportMenu: 'Fermer le menu d’exportation',
      exportOptions: 'Options d’exportation',
      downloadJson: 'Télécharger le JSON',
      downloadPng: 'Télécharger le PNG (2x)',
      import: 'Importer',
      copyEquations: 'Copier les équations',
      copyEquationsAria: 'Copier les équations sous forme de texte',
      modal: { close: 'Fermer', backdrop: 'Fermer la boîte de dialogue' },
      toasts: {
        exportedJson: 'Graphe exporté en JSON.',
        exportJsonFailed: 'Échec de l’exportation JSON.',
        exportedPng: 'Graphe exporté en PNG (2x).',
        noExpressions: 'Il n’y a aucune expression à copier.',
        copied: 'Équations copiées dans le presse-papiers.',
        copyFailed: 'La copie a échoué dans ce navigateur.',
      },
      saveDialog: {
        title: 'Enregistrer le graphe',
        saved: 'Enregistré dans ce navigateur.',
        nameLabel: 'Nom',
        namePlaceholder: 'p. ex. Exploration de la parabole',
        nameHint: 'Enregistré dans ce navigateur uniquement. Enregistrer le même nom l’écrase.',
        cancel: 'Annuler',
        save: 'Enregistrer le graphe',
        errors: {
          emptyName: 'Donnez un nom au graphe.',
          nameTooLongTemplate: 'Limitez le nom à {max} caractères.',
          storageUnavailable: 'Le stockage local n’est pas disponible dans ce navigateur.',
          readFailed: 'Impossible de lire la bibliothèque de graphes enregistrés.',
          libraryFullTemplate:
            'La bibliothèque est pleine ({max} graphes enregistrés). Supprimez-en un d’abord.',
          saveFailed:
            'Enregistrement impossible — le stockage du navigateur est indisponible ou plein.',
          unexpected: 'Échec inattendu de l’enregistrement.',
        },
      },
      libraryDialog: {
        title: 'Mes graphes enregistrés',
        // The word "Save" is emphasized in the UI; keep the emphasis when wiring.
        empty:
          'Rien d’enregistré pour le moment. Utilisez Enregistrer pour conserver le graphe actuel dans ce navigateur.',
        emptyLead: 'Rien d’enregistré pour le moment. Utilisez',
        emptySave: 'Enregistrer',
        emptyTail: ' pour conserver le graphe actuel dans ce navigateur.',
        entryMetaTemplate: '{date} · {count} expression{plural}{variables}',
        variablesPartTemplate: ' · {count} variable{plural}',
        renameLabel: 'Renommer le graphe',
        rename: 'Renommer',
        cancel: 'Annuler',
        restore: 'Restaurer',
        renameAriaTemplate: 'Renommer {name}',
        deleteAriaTemplate: 'Supprimer {name}',
        deleteConfirm: 'Supprimer ce graphe enregistré ?',
        keep: 'Conserver',
        delete: 'Supprimer',
        unsavedWarning:
          'Vous avez des modifications non enregistrées. Restaurer remplace le graphe actuel.',
        restoreAnyway: 'Restaurer quand même',
        errors: {
          noLongerExists: 'Ce graphe enregistré n’existe plus.',
          duplicateName: 'Un graphe enregistré porte déjà ce nom.',
          renameFailed:
            'Renommage impossible — le stockage du navigateur est indisponible ou plein.',
        },
      },
      shareDialog: {
        title: 'Partager ce graphe',
        creating: 'Création de votre lien…',
        linkLabel: 'Lien de partage',
        copyLink: 'Copier le lien',
        copied: 'Copié',
        openNewTab: 'Ouvrir le lien dans un nouvel onglet',
        note:
          'Le lien contient les données de votre graphe — toute personne qui l’a peut voir ' +
          'ce graphe. Il s’ouvre sur une page qui n’est jamais indexée par les moteurs de recherche.',
        createFailed: 'Impossible de créer un lien de partage dans ce navigateur.',
        copyFailed: 'La copie a échoué — sélectionnez le lien ci-dessus et copiez-le manuellement.',
      },
      importDialog: {
        title: 'Importer un graphe',
        chooseFile: 'Choisir un fichier .json',
        chooseFileAriaLabel: 'Choisir un fichier JSON de graphe',
        fileChosenTemplate: 'Fichier : {name}',
        orPaste: 'Ou collez le JSON du graphe',
        pastePlaceholder: '{"app": "graphing-calculator", "version": 1, …}',
        sizeNoteTemplate:
          'Les importations sont validées et limitées en taille ({maxKb} Ko max). Les données ' +
          'importées ne sont jamais exécutées — elles sont seulement lues comme des données.',
        cancel: 'Annuler',
        review: 'Vérifier l’importation',
        back: 'Retour',
        importAnyway: 'Importer quand même',
        untitled: 'Graphe sans titre',
        hiddenSuffix: ' (masqué)',
        variablesPrefix: 'Variables : ',
        viewTemplate: 'Vue : x ∈ [{xMin}, {xMax}], y ∈ [{yMin}, {yMax}]',
        unsavedWarning:
          'Vous avez des modifications non enregistrées. Importer remplace le graphe actuel.',
        errors: {
          empty: 'Collez d’abord le JSON du graphe ou choisissez un fichier.',
          tooLargeTemplate: 'La {source} dépasse {maxKb} Ko et a été rejetée.',
          fileTooLargeTemplate: '« {name} » dépasse {maxKb} Ko et a été rejeté.',
          invalidJson: 'Le fichier n’est pas du JSON valide.',
          validationFailedTemplate: 'Le graphe n’a pas passé la validation : {issues}{more}',
          unreadable: 'Impossible de lire le fichier.',
        },
      },
      shared: {
        noGraph: 'Ce lien ne contient pas de graphe partagé.',
        openFailed: 'Le graphe partagé n’a pas pu être ouvert.',
        opening: 'Ouverture du graphe partagé…',
        heading: 'Impossible d’ouvrir ce graphe partagé',
        openCalculator: 'Ouvrir la calculatrice graphique',
        fallbackTitle: 'Échec du chargement du graphe partagé',
      },
    },
    ai: {
      toggleOpen: 'Ouvrir l’assistant mathématique IA',
      toggleClose: 'Fermer l’assistant mathématique IA',
      panelLabel: 'Assistant mathématique IA',
      heading: 'Assistant mathématique IA',
      statusMock: 'Mode démo — aucune clé IA configurée',
      statusDeepseek: 'Propulsé par DeepSeek',
      statusDefault: 'Posez une question sur le graphe',
      messagesLabel: 'Messages du chat IA',
      intro: 'Je peux tracer des fonctions, ajuster la vue et gérer les curseurs. Essayez :',
      suggestions: ['Tracer y = x^2', 'Dézoomer', 'Poser a = 2', 'Que sais-tu faire ?'],
      conceptualNote: 'Explication conceptuelle de l’IA — non calculée par le moteur mathématique.',
      mockNote: 'Réponse de démonstration',
      thinking: 'Réflexion…',
      inputLabel: 'Envoyer un message à l’assistant mathématique IA',
      inputPlaceholder: 'Essayez « tracer y = x^2 »',
      send: 'Envoyer',
      footer:
        'L’IA ne calcule jamais de résultats — c’est le moteur mathématique qui s’en charge. L’historique reste dans cette session.',
      chatCleared: 'Discussion effacée.',
      intent: {
        parseFailedTemplate:
          'Je n’ai pas pu analyser « {source} ». Vérifiez l’expression et réessayez.',
        notFiniteTemplate:
          'Évaluation de {source} en x = {x} : le résultat n’est pas un nombre fini (non défini ici).',
        computedTemplate: 'Calculé par le moteur mathématique : {source} en x = {x} vaut {value}.',
        zoomedOut: 'Vue éloignée.',
        zoomedIn: 'Vue rapprochée.',
        viewReset: 'Vue réinitialisée à la région par défaut.',
        badVariableNameTemplate:
          '« {name} » n’est pas un nom de variable utilisable (évitez x, t, theta et les noms de fonctions).',
        noExpressionToPlot:
          'Je n’ai trouvé aucune expression mathématique à tracer. Essayez « tracer x^2 ».',
      },
      processor: {
        helpLines: [
          'Voici ce que je peux faire :',
          '• « tracer x^2 » — tracer une fonction',
          '• « zoom avant » / « zoom arrière » / « réinitialiser la vue » — changer la zone d’affichage',
          '• « poser a = 2 » — ajouter une variable curseur',
          '• « évaluer x^2+1 en x = 3 » — calculer une valeur avec le moteur mathématique',
          '• « expliquer les dérivées » — explication conceptuelle',
          '• « effacer » — effacer cette discussion',
          'Pour le reste, je fais appel au service IA quand il est configuré.',
        ],
        invalidExpression: 'expression invalide',
        plotFailedTemplate: 'Je n’ai pas pu tracer cela : {detail}',
        undefinedHintTemplate:
          ' Note : {names} {isAre} non définie(s) — essayez « poser {first} = 2 ».',
        plottedTemplate: 'Tracé de y = {expression}.{hint}',
        sliderUpdatedTemplate: 'Curseur {name} mis à jour à {value}.',
        sliderAddedTemplate: 'Curseur {name} = {value} ajouté.',
        viewportUpdated: 'Zone d’affichage mise à jour.',
      },
    },
    engine: {
      parse: {
        unexpectedCharacterTemplate: 'Caractère inattendu « {char} »',
        enterExpression: 'Saisissez une expression',
        unexpectedTokenTemplate: '« {token} » inattendu',
        expectedButFoundTemplate: '{what} attendu mais « {token} » trouvé',
        expectedClosingTemplate: '« ) » attendu mais « {token} » trouvé',
        unexpectedEnd: 'Fin d’expression inattendue',
        needsArgumentTemplate: '« {name} » a besoin d’un argument',
        expectedSeparatorTemplate: '« , » ou « ) » attendu mais « {token} » trouvé',
        arityTemplate: '« {name} » attend {arity} argument(s) mais en a reçu {count}',
      },
    },
  },
};
