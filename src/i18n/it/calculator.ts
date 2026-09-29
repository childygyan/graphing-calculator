/**
 * Dizionario italiano calculator — la pagina della calcolatrice grafica più
 * tutte le stringhe delle isole della calcolatrice e delle librerie di supporto.
 *
 * I template usano i segnaposto `{name}` risolti da `format` in
 * `src/i18n/locales.ts`. Notazione matematica (f′(x), ∫, θ, …) e sintassi
 * delle espressioni NON si traducono.
 */

import type { CalculatorStrings } from '../types.js';

export const calculator: CalculatorStrings = {
  seo: {
    title: 'Calcolatrice grafica — Grafico di funzioni online gratuito | Graphing Calculator',
    description:
      'Calcolatrice grafica online gratuita: traccia grafici di funzioni, curve parametriche e polari, ' +
      'trova radici, derivate e integrali, ed esplora la matematica con un assistente AI. Nessuna registrazione.',
  },
  intro: {
    heading: 'Informazioni su questa calcolatrice grafica',
    lede:
      'Una calcolatrice grafica gratuita, senza registrazione, che gira interamente nel tuo browser. ' +
      'Traccia grafici di funzioni, analizzali con veri metodi numerici, anima i parametri con i cursori ' +
      'e ricevi aiuto in linguaggio naturale dall\u2019assistente AI.',
  },
  sections: [
    {
      heading: 'Cosa puoi fare',
      body: [
        'Digita un\u2019espressione come x^2, sin(x) o 1/x e guardala tracciarsi all\u2019istante. Aggiungi altre espressioni per confrontarle, attiva o disattiva la visibilit\u00e0 e cambia i colori. Il grafico supporta uno zoom fluido centrato sul cursore, la panoramica e tutti i gesti touch, incluso il pinch-to-zoom.',
        'Oltre al tracciamento, gli strumenti di analisi trasformano il grafico in un laboratorio: individua le intercette con l\u2019asse x, calcola la pendenza in qualsiasi punto, misura l\u2019area sotto una curva, genera tabelle dei valori e disegna rette tangenti e normali. Variabili e cursori ti permettono di animare i parametri — trascina un cursore e guarda un\u2019intera famiglia di curve trasformarsi in tempo reale.',
      ],
    },
    {
      heading: 'Come tracciare il grafico di una funzione',
      body: [
        'Inserisci la tua espressione nell\u2019elenco delle espressioni usando x come variabile — per esempio, x^3 - 3*x. Il grafico si aggiorna mentre digiti. Scorri per zoomare verso il cursore, trascina per spostare la vista e fai doppio clic (o usa la barra degli strumenti) per reimpostarla.',
        'Per approfondire, seleziona un\u2019espressione e apri il pannello di analisi: trova radici, estremi e intercette, oppure valuta derivata e integrale nei punti che scegli. Se preferisci le parole alle formule, apri l\u2019assistente AI e chiedi — per esempio, "traccia sin(x) e mostrami le sue radici".',
      ],
    },
  ],
  faqs: [
    {
      question: 'Questa calcolatrice grafica \u00e8 gratuita?',
      answer:
        'S\u00ec. La calcolatrice gira interamente nel tuo browser ed \u00e8 gratuita, senza registrazione. ' +
        'I tuoi grafici sono salvati sul tuo dispositivo, non su un server.',
    },
    {
      question: 'Che tipi di espressioni posso tracciare?',
      answer:
        'Funzioni cartesiane come sin(x) o x^2 - 4, curve parametriche, equazioni polari, ' +
        'disequazioni e singoli punti. Puoi tracciare molte espressioni insieme, ciascuna con ' +
        'il suo colore.',
    },
    {
      question: 'Pu\u00f2 trovare radici, derivate e integrali?',
      answer:
        'S\u00ec. Il pannello di analisi trova le radici con il metodo di Brent, stima le derivate ' +
        'con le differenze centrali, calcola gli integrali definiti con la regola di Simpson ' +
        'adattiva e disegna rette tangenti. I risultati che non possono essere calcolati vengono ' +
        'segnalati onestamente.',
    },
    {
      question: 'Come funziona l\u2019assistente AI?',
      answer:
        'Puoi fare domande in linguaggio naturale. L\u2019assistente traduce la tua richiesta in ' +
        'comandi della calcolatrice — tracciare espressioni, impostare la vista o spiegare un ' +
        'concetto passo passo. Il motore matematico esegue sempre i calcoli reali; l\u2019AI non ' +
        'inventa mai risultati numerici.',
    },
    {
      question: 'Serve un account per salvare o condividere i grafici?',
      answer:
        'Non esistono account. Puoi salvare grafici con nome nel tuo browser, esportarli come JSON o ' +
        'PNG e condividerli come link compatti che chiunque pu\u00f2 aprire.',
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
    loadFailedTitle: 'Impossibile caricare la calcolatrice',
    errorFallback: {
      defaultTitle: 'Qualcosa è andato storto',
      message:
        'Un errore imprevisto ha interrotto questa parte della pagina. Gli altri dati non sono interessati.',
      retry: 'Riprova',
    },
    toolbar: {
      regionLabel: 'Azioni della calcolatrice',
      title: 'Calcolatrice grafica',
      addExpression: 'Aggiungi espressione',
      zoomIn: 'Ingrandisci',
      zoomOut: 'Riduci',
      resetView: 'Reimposta vista',
    },
    expressions: {
      panelTitle: 'Espressioni',
      add: 'Aggiungi',
      addAriaLabel: 'Aggiungi espressione',
      fallbackTitle: 'Caricamento elenco espressioni non riuscito',
      kinds: {
        cartesian: 'Cartesiana',
        parametric: 'Parametrica',
        polar: 'Polare',
        inequality: 'Disequazione',
        point: 'Punto',
        table: 'Tabella',
        textNote: 'Nota di testo',
      },
      kindOptions: [
        { kind: 'cartesian', label: 'y = f(x)' },
        { kind: 'parametric', label: 'Parametrica' },
        { kind: 'polar', label: 'Polare' },
        { kind: 'inequality', label: 'Disequazione' },
        { kind: 'point', label: 'Punto' },
      ],
      addKindOptions: [
        { kind: 'cartesian', label: 'Funzione y = f(x)' },
        { kind: 'parametric', label: 'Parametrica (x(t), y(t))' },
        { kind: 'polar', label: 'Polare r(θ)' },
        { kind: 'inequality', label: 'Disequazione' },
        { kind: 'point', label: 'Punto' },
      ],
      addKindLabel: 'Tipo di espressione',
      emptyState: 'Nessuna espressione ancora.',
      changeColorTemplate: 'Cambia il colore di {label}',
      renameAriaTemplate: 'Rinomina {label}',
      changeTypeAriaTemplate: 'Cambia tipo di {label}',
      editDefinitionAriaTemplate: 'Modifica definizione di {label}',
      duplicateAriaTemplate: 'Duplica {label}',
      deleteAriaTemplate: 'Elimina {label}',
      hideAria: 'Nascondi espressione',
      showAria: 'Mostra espressione',
      fields: {
        xOfT: 'definizione di x(t)',
        yOfT: 'definizione di y(t)',
        tMin: 't min',
        tMax: 't max',
        xCoordinate: 'coordinata x',
        yCoordinate: 'coordinata y',
        polarHint: 'θ da 0 a 2π — digita theta o θ',
        inequalitySide: 'Lato della disequazione',
        inequalityOperator: 'Operatore della disequazione',
      },
      defaultLabelTemplate: '{kind} {n}',
      summaryTemplates: {
        cartesian: 'y = {rhs}',
        parametric: '(x(t), y(t)) = ({x}, {y})',
        polar: 'r = {r}',
        point: '({x}, {y})',
        inequality: '{lhs} {op} {rhs}',
        table: 'Tabella ({cols} colonne x {rows} righe)',
        note: 'Nota: {preview}',
        noteEmpty: 'Nota: (vuota)',
      },
    },
    graph: {
      regionLabel: 'Grafico',
      toolbarLabel: 'Controlli della vista grafico',
      zoomIn: 'Ingrandisci',
      zoomOut: 'Riduci',
      resetView: 'Reimposta vista',
      fitView: 'Adatta vista',
      toggleGrid: 'Attiva/disattiva griglia',
      toggleAxes: 'Attiva/disattiva assi',
      inspectedPoint: 'Punto ispezionato',
      dismissInspectedPoint: 'Chiudi punto ispezionato',
      tangentButton: 'Tangente',
      noteButton: 'Nota',
      notePlaceholder: 'Etichetta nota…',
      noteAriaLabel: 'Etichetta annotazione',
      coordinateTemplate: 'x: {x}, y: {y}',
      canvasDefaultLabel:
        'Grafico cartesiano interattivo. Usa la barra degli strumenti del grafico per ingrandire, ridurre o reimpostare la vista.',
      unknownCurveLabel: 'Curva',
      loadErrorTitle: 'Il grafico interattivo ha riscontrato un problema',
      loadErrorMessage: 'Le tue espressioni e impostazioni non sono interessate.',
      reloadGraph: 'Ricarica il grafico',
    },
    variables: {
      panelTitle: 'Variabili',
      add: 'Aggiungi',
      nameLabel: 'Nome della variabile',
      animationSpeed: 'Velocit\u00e0 animazione',
      animationSpeedTitle: 'Velocit\u00e0 di scorrimento animazione',
      speeds: { slow: 'Lenta', normal: 'Normale', fast: 'Veloce' },
      reducedMotionNote:
        'L\u2019animazione \u00e8 disattivata perch\u00e9 il tuo sistema preferisce il movimento ridotto.',
      emptyState:
        'Nessuna variabile ancora. Aggiungine una e usala in qualsiasi espressione — es. y = a·sin(b·x).',
      emptyStateLead:
        'Nessuna variabile ancora. Aggiungine una e usala in qualsiasi espressione, ad es.',
      undefinedHeading: 'Usate nelle espressioni ma non definite:',
      defineVariableAriaTemplate: 'Definisci variabile {name}',
      valueAriaTemplate: 'valore di {name}',
      currentValueTitle: 'Valore corrente risolto',
      sliderAriaTemplate: 'cursore di {name}',
      dragToChangeTemplate: 'Trascina per cambiare {name}',
      sliderUnavailable: 'Cursore non disponibile: il valore deriva da una formula.',
      animateAriaTemplate: 'Anima {name}',
      pauseAriaTemplate: 'Metti in pausa l\u2019animazione di {name}',
      animateAcrossRangeTemplate: 'Anima {name} nel suo intervallo',
      animationDisabledReducedMotion:
        'Animazione disattivata: il tuo sistema preferisce il movimento ridotto.',
      animationNeedsPlainValue:
        'L\u2019animazione richiede un valore numerico semplice (non una formula).',
      deleteVariableAriaTemplate: 'Elimina variabile {name}',
      min: 'Min',
      max: 'Max',
      stepLabel: 'Passo',
      validation: {
        enterName: 'Inserisci un nome di variabile.',
        namePattern: 'Usa lettere, cifre o trattino basso, iniziando con una lettera.',
        reservedTemplate: "'{name}' \u00e8 riservato (x, t, theta sono parametri del grafico).",
        takenTemplate: "'{name}' \u00e8 gi\u00e0 un nome di funzione o costante.",
        undefinedTemplate:
          'Variabile non definita {names} — definiscila in Variabili o correggi il nome.',
        reservedUseTemplate:
          "La variabile '{name}' non pu\u00f2 usare '{used}' — le variabili devono essere numeri semplici o dipendere " +
          'solo da altre variabili.',
        unknownTemplate: "Variabile sconosciuta {names} nella definizione di '{name}'.",
        circularTemplate: 'Riferimento circolare: {path}.',
        duplicateTemplate: "Variabile duplicata '{name}' — mantengo la prima.",
        invalidExpression: 'Espressione non valida.',
      },
    },
    analysis: {
      precision: {
        formatLabel: 'Formato',
        decimals: 'Decimali',
        significant: 'Significative',
        digitsTemplate: 'Cifre (1–15)',
        placesTemplate: 'Decimali (0–12)',
      },
      table: {
        title: 'Tabella dei valori',
        start: 'Inizio',
        end: 'Fine',
        step: 'Passo ("auto")',
        build: 'Crea tabella',
        startError: 'Inserisci numeri validi per inizio e fine.',
        stepError: 'Il passo deve essere un numero positivo o "auto".',
        captionTemplate: 'Tabella dei valori per {label}',
        stepCaptionTemplate: 'Passo {step} · visualizzate {shown} righe su {total}',
        captionTruncatedSuffix:
          ' — restringi l\u2019intervallo o aumenta il passo per vedere il resto',
        keyboardHint: 'Seleziona la tabella e usa ↑/↓ per spostarti tra le righe.',
        noRows: 'Nessuna riga da mostrare.',
        notDefinedTitle: 'Non definita in questo x',
        useTappedPoint: 'Usa punto toccato',
        useTappedPointTitle: 'Usa il punto selezionato toccando il grafico',
      },
      roots: {
        title: 'Radici',
        from: 'Da',
        to: 'A',
        find: 'Trova radici',
        useViewport: 'Usa vista',
        showOnGraph: 'Mostra sul grafico',
        none: 'Nessuna radice trovata in questo intervallo.',
        resultTemplate: 'x = {x}',
      },
      intersections: {
        title: 'Intersezioni',
        noneDefined: 'Aggiungi una seconda espressione cartesiana per trovare le intersezioni.',
        with: 'Con',
        find: 'Trova intersezioni',
        showOnGraph: 'Mostra sul grafico',
        viewportNote: 'Ricerca nell\u2019intervallo x della vista corrente.',
        none: 'Nessuna intersezione trovata nella vista.',
      },
      derivative: {
        title: 'Derivata',
        atX: 'In x =',
        compute: 'f′(x)',
        plot: 'Traccia f′(x)',
        hide: 'Nascondi f′(x)',
        resultTemplate: 'f′({x}) = {value}',
        note: 'Numerica (differenze centrali) — non una derivata simbolica.',
      },
      integral: {
        title: 'Integrale definito',
        fromA: 'Da a',
        toB: 'A b',
        compute: 'Calcola',
        shadeArea: 'Ombreggia area',
        hideShading: 'Nascondi ombreggiatura',
        resultTemplate: '∫ = {value}',
        noConvergence:
          'La quadratura non \u00e8 convergente su questo intervallo (possibile singolarit\u00e0 o ' +
          'buco nel dominio) — nessun valore riportato.',
      },
      limit: {
        title: 'Limite',
        atX: 'In x =',
        side: 'Lato',
        sides: { twoSided: 'Bilatero', left: 'Sinistro', right: 'Destro' },
        compute: 'Calcola',
        convergesTemplate: 'Limite = {value}',
        unboundedTemplate: 'Illimitato — tende a {direction}',
        doesNotExist: 'Non esiste (i limiti unilaterali discordano o la funzione oscilla)',
        indeterminate:
          'Impossibile determinare — la funzione non \u00e8 definita vicino a questo punto',
      },
      extrema: {
        title: 'Estremi locali',
        find: 'Trova nella vista',
        showOnGraph: 'Mostra sul grafico',
        none: 'Nessun minimo o massimo locale trovato nella vista.',
        minTemplate: 'Min in ({x}, {y})',
        maxTemplate: 'Max in ({x}, {y})',
      },
      tangent: {
        title: 'Tangente e normale',
        atX: 'In x =',
        compute: 'Calcola',
        showTangent: 'Mostra tangente',
        showNormal: 'Mostra normale',
        failed:
          'Nessuna tangente qui — la funzione non \u00e8 definita o non \u00e8 derivabile in questo x.',
        tangentTemplate: 'Tangente: {equation}',
        normalTemplate: 'Normale: {equation}',
        slopeTemplate: 'pendenza f′({x}) = {slope}',
        cannotAnalyzeTemplate: 'Impossibile analizzare questa espressione: {error}',
        unknownParseError: 'errore di parsing sconosciuto.',
        couldNotParse: 'Impossibile interpretare questa espressione.',
      },
      annotations: {
        title: 'Annotazioni',
        annotateTapped: 'Annota punto toccato',
        empty:
          'Nessuna annotazione ancora. Tocca una curva sul grafico, poi annota il punto — oppure ' +
          'rinomina e rimuovi le annotazioni qui.',
        showAriaTemplate: 'Mostra annotazione {label}',
        deleteAriaTemplate: 'Elimina annotazione {label}',
        show: 'Mostra',
        label: 'Etichetta',
      },
      panelEmpty:
        'Aggiungi un\u2019espressione cartesiana (y = …) per sbloccare tabelle, radici, derivate, integrali, ' +
        'limiti, estremi e tangenti.',
      panelTitle: 'Analisi',
      panelAriaLabel: 'Analisi matematica',
    },
    persistence: {
      regionLabel: 'Persistenza grafico',
      undo: 'Annulla',
      redo: 'Ripeti',
      save: 'Salva grafico',
      saveUnsaved: 'Salva grafico (modifiche non salvate)',
      unsavedChanges: 'Modifiche non salvate',
      myGraphs: 'I miei grafici',
      share: 'Condividi',
      export: 'Esporta',
      closeExportMenu: 'Chiudi menu esportazione',
      exportOptions: 'Opzioni di esportazione',
      downloadJson: 'Scarica JSON',
      downloadPng: 'Scarica PNG (2x)',
      import: 'Importa',
      copyEquations: 'Copia equazioni',
      copyEquationsAria: 'Copia equazioni come testo',
      modal: { close: 'Chiudi', backdrop: 'Chiudi la finestra di dialogo' },
      toasts: {
        exportedJson: 'Grafico esportato come JSON.',
        exportJsonFailed: 'Esportazione JSON non riuscita.',
        exportedPng: 'Grafico esportato come PNG (2x).',
        noExpressions: 'Non ci sono espressioni da copiare.',
        copied: 'Equazioni copiate negli appunti.',
        copyFailed: 'Copia non riuscita in questo browser.',
      },
      saveDialog: {
        title: 'Salva grafico',
        saved: 'Salvato in questo browser.',
        nameLabel: 'Nome',
        namePlaceholder: 'es. Esplorazione parabola',
        nameHint: 'Salvato solo in questo browser. Salvare con lo stesso nome lo sovrascrive.',
        cancel: 'Annulla',
        save: 'Salva grafico',
        errors: {
          emptyName: 'Dai un nome al grafico.',
          nameTooLongTemplate: 'Mantieni il nome sotto i {max} caratteri.',
          storageUnavailable: 'Lo storage locale non \u00e8 disponibile in questo browser.',
          readFailed: 'Impossibile leggere la libreria dei grafici salvati.',
          libraryFullTemplate:
            'La libreria \u00e8 piena ({max} grafici salvati). Eliminane prima uno.',
          saveFailed:
            'Impossibile salvare — lo storage del browser non \u00e8 disponibile o \u00e8 pieno.',
          unexpected: 'Salvataggio non riuscito in modo imprevisto.',
        },
      },
      libraryDialog: {
        title: 'I miei grafici salvati',
        // La parola "Salva" \u00e8 enfatizzata nella UI; mantieni l'enfasi nel wiring.
        empty:
          'Niente di salvato ancora. Usa Salva per conservare il grafico corrente in questo browser.',
        entryMetaTemplate: '{date} · {count} espressione{plural}{variables}',
        emptyLead: 'Niente di salvato ancora. Usa',
        emptySave: 'Salva',
        emptyTail: ' per conservare il grafico corrente in questo browser.',
        variablesPartTemplate: ' · {count} variabile{plural}',
        renameLabel: 'Rinomina grafico',
        rename: 'Rinomina',
        cancel: 'Annulla',
        restore: 'Ripristina',
        renameAriaTemplate: 'Rinomina {name}',
        deleteAriaTemplate: 'Elimina {name}',
        deleteConfirm: 'Eliminare questo grafico salvato?',
        keep: 'Mantieni',
        delete: 'Elimina',
        unsavedWarning: 'Hai modifiche non salvate. Il ripristino sostituisce il grafico corrente.',
        restoreAnyway: 'Ripristina comunque',
        errors: {
          noLongerExists: 'Quel grafico salvato non esiste pi\u00f9.',
          duplicateName: 'Esiste gi\u00e0 un grafico salvato con quel nome.',
          renameFailed:
            'Impossibile rinominare — lo storage del browser non \u00e8 disponibile o \u00e8 pieno.',
        },
      },
      shareDialog: {
        title: 'Condividi questo grafico',
        creating: 'Creazione del link…',
        linkLabel: 'Link di condivisione',
        copyLink: 'Copia link',
        copied: 'Copiato',
        openNewTab: 'Apri il link in una nuova scheda',
        note:
          'Il link contiene i dati del tuo grafico — chiunque lo abbia pu\u00f2 vedere questo grafico. Si apre ' +
          'su una pagina mai indicizzata dai motori di ricerca.',
        createFailed: 'Impossibile creare un link di condivisione in questo browser.',
        copyFailed: 'Copia non riuscita — seleziona il link qui sopra e copialo manualmente.',
      },
      importDialog: {
        title: 'Importa grafico',
        chooseFile: 'Scegli un file .json',
        chooseFileAriaLabel: 'Scegli un file JSON del grafico',
        fileChosenTemplate: 'File: {name}',
        orPaste: 'Oppure incolla il JSON del grafico',
        pastePlaceholder: '{"app": "graphing-calculator", "version": 1, …}',
        sizeNoteTemplate:
          'Le importazioni sono validate e con limite di dimensione (max {maxKb} KB). I dati importati non sono ' +
          'mai eseguiti — vengono solo letti come dati.',
        cancel: 'Annulla',
        review: 'Verifica importazione',
        back: 'Indietro',
        importAnyway: 'Importa comunque',
        untitled: 'Grafico senza titolo',
        hiddenSuffix: ' (nascosto)',
        variablesPrefix: 'Variabili: ',
        viewTemplate: 'Vista: x ∈ [{xMin}, {xMax}], y ∈ [{yMin}, {yMax}]',
        unsavedWarning:
          'Hai modifiche non salvate. L\u2019importazione sostituisce il grafico corrente.',
        errors: {
          empty: 'Incolla prima il JSON del grafico o scegli un file.',
          tooLargeTemplate: '{source} supera {maxKb} KB ed \u00e8 stato rifiutato.',
          fileTooLargeTemplate: '“{name}” supera {maxKb} KB ed \u00e8 stato rifiutato.',
          invalidJson: 'Il file non \u00e8 JSON valido.',
          validationFailedTemplate: 'Il grafico non ha superato la validazione: {issues}{more}',
          unreadable: 'Impossibile leggere il file.',
        },
      },
      shared: {
        noGraph: 'Questo link non contiene un grafico condiviso.',
        openFailed: 'Impossibile aprire il grafico condiviso.',
        opening: 'Apertura del grafico condiviso…',
        heading: 'Impossibile aprire questo grafico condiviso',
        openCalculator: 'Apri la calcolatrice grafica',
        fallbackTitle: 'Caricamento grafico condiviso non riuscito',
      },
    },
    ai: {
      toggleOpen: 'Apri assistente matematico AI',
      toggleClose: 'Chiudi assistente matematico AI',
      panelLabel: 'Assistente matematico AI',
      heading: 'Assistente matematico AI',
      statusMock: 'Modalit\u00e0 simulata — nessuna chiave AI configurata',
      statusDeepseek: 'Offerto da DeepSeek',
      statusDefault: 'Chiedi del grafico',
      messagesLabel: 'Messaggi chat AI',
      intro: 'Posso tracciare funzioni, regolare la vista e gestire i cursori. Provane uno:',
      suggestions: ['Traccia y = x^2', 'Allontana lo zoom', 'Imposta a = 2', 'Cosa sai fare?'],
      conceptualNote: 'Spiegazione AI concettuale — non calcolata dal motore matematico.',
      mockNote: 'Risposta simulata',
      thinking: 'Elaborazione…',
      inputLabel: 'Scrivi all\u2019assistente matematico AI',
      inputPlaceholder: 'Prova "traccia y = x^2"',
      send: 'Invia',
      footer:
        'L\u2019AI non calcola mai i risultati — lo fa il motore matematico. La cronologia resta in questa sessione.',
      chatCleared: 'Chat cancellata.',
      intent: {
        parseFailedTemplate:
          'Non sono riuscito a interpretare "{source}". Controlla l\u2019espressione e riprova.',
        notFiniteTemplate:
          'Valutando {source} in x = {x}: il risultato non \u00e8 un numero finito (non definita l\u00ec).',
        computedTemplate: 'Calcolato dal motore matematico: {source} in x = {x} vale {value}.',
        zoomedOut: 'Vista ridotta.',
        zoomedIn: 'Vista ingrandita.',
        viewReset: 'Vista reimpostata sulla regione predefinita.',
        badVariableNameTemplate:
          '"{name}" non \u00e8 un nome di variabile utilizzabile (evita x, t, theta e i nomi di funzione).',
        noExpressionToPlot:
          'Non ho trovato un\u2019espressione matematica da tracciare. Prova "plot x^2".',
      },
      processor: {
        helpLines: [
          'Ecco cosa so fare:',
          '• "plot x^2" — traccia una funzione',
          '• "zoom in" / "zoom out" / "reset view" — cambia la vista',
          '• "let a = 2" — aggiungi una variabile cursore',
          '• "evaluate x^2+1 at x = 3" — calcola un valore con il motore matematico',
          '• "explain derivatives" — spiegazione concettuale',
          '• "clear" — cancella questa chat',
          'Per richieste pi\u00f9 complesse serve il servizio AI, quando \u00e8 configurato.',
        ],
        invalidExpression: 'espressione non valida',
        plotFailedTemplate: 'Non sono riuscito a tracciarla: {detail}',
        undefinedHintTemplate: ' Nota: {names} non {isAre} definito/i — prova "let {first} = 2".',
        plottedTemplate: 'Tracciata y = {expression}.{hint}',
        sliderUpdatedTemplate: 'Cursore {name} aggiornato a {value}.',
        sliderAddedTemplate: 'Aggiunto cursore {name} = {value}.',
        viewportUpdated: 'Vista aggiornata.',
      },
    },
    engine: {
      parse: {
        unexpectedCharacterTemplate: "Carattere imprevisto '{char}'",
        enterExpression: 'Inserisci un\u2019espressione',
        unexpectedTokenTemplate: "'{token}' imprevisto",
        expectedButFoundTemplate: 'Atteso {what}, trovato \u2019{token}\u2019',
        expectedClosingTemplate: "Atteso ')' ma trovato '{token}'",
        unexpectedEnd: 'Fine espressione imprevista',
        needsArgumentTemplate: "'{name}' richiede un argomento",
        expectedSeparatorTemplate: "Atteso ',' o ')' ma trovato '{token}'",
        arityTemplate: "'{name}' si aspetta {arity} argomento(i) ma ne ha ricevuti {count}",
      },
    },
  },
};
