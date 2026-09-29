/**
 * Deutsche Rechner-Wörterliste — die Grafikrechner-Seite plus alle Texte,
 * die den Rechner-Inseln und unterstützenden Bibliotheken gehören.
 *
 * Die Insel-/Bibliothek-Texte sind NOCH NICHT verdrahtet: Die React-Komponenten
 * und Mathe-/Parser-Module tragen weiterhin ihre eigenen Literale, und die
 * englische Ausgabe muss byte-identisch bleiben. Diese Wörterliste ist die
 * einzige Quelle der Wahrheit, die die zukünftige `strings`-Prop-Umstellung
 * konsumieren wird — siehe docs/I18N-CONTRACTS.md.
 *
 * Vorlagen nutzen `{name}`-Platzhalter, die von `format` in
 * `src/i18n/locales.ts` aufgelöst werden. Mathematische Notation (f′(x), ∫, θ, …)
 * und Ausdruckssyntax sind DO-NOT-TRANSLATE.
 */

import type { CalculatorStrings } from '../types.js';

export const calculator: CalculatorStrings = {
  seo: {
    title: 'Grafikrechner — Kostenloser Online-Funktionsplotter',
    description:
      'Kostenloser Online-Grafikrechner: Funktionen, parametrische und polare Kurven zeichnen, ' +
      'Nullstellen, Ableitungen und Integrale finden und Mathe mit einem KI-Assistenten erkunden. Keine Registrierung.',
  },
  intro: {
    heading: 'Über diesen Grafikrechner',
    lede:
      'Ein kostenloser Grafikrechner ohne Registrierung, der vollständig in Ihrem Browser läuft. ' +
      'Funktionen zeichnen, mit echten numerischen Verfahren analysieren, Parameter mit ' +
      'Schiebereglern animieren und einfache Hilfe vom KI-Assistenten erhalten.',
  },
  sections: [
    {
      heading: 'Was Sie tun können',
      body: [
        'Geben Sie einen Ausdruck wie x^2, sin(x) oder 1/x ein und sehen Sie zu, wie er sofort gezeichnet wird. Fügen Sie weitere Ausdrücke hinzu, um sie zu vergleichen, schalten Sie die Sichtbarkeit um und gestalten Sie Farben neu. Der Graph unterstützt butterweichen Zoom zentriert auf Ihren Cursor, Verschieben und volle Touch-Gesten inklusive Pinch-to-Zoom.',
        'Über das Zeichnen hinaus verwandeln die Analyse-Tools den Graphen in ein Labor: x-Achsenabschnitte lokalisieren, die Steigung an jedem Punkt berechnen, die Fläche unter einer Kurve messen, Wertetabellen erzeugen und Tangenten und Normalen zeichnen. Mit Variablen und Schiebereglern animieren Sie Parameter — ziehen Sie einen Schieberegler und beobachten Sie, wie sich eine ganze Kurvenschar in Echtzeit verwandelt.',
      ],
    },
    {
      heading: 'Wie man eine Funktion zeichnet',
      body: [
        'Geben Sie Ihren Ausdruck in die Ausdrucksliste ein, mit x als Variable — zum Beispiel x^3 - 3*x. Der Graph aktualisiert sich beim Tippen. Scrollen Sie, um zu Ihrem Cursor zu zoomen, ziehen Sie zum Verschieben und doppelklicken Sie (oder nutzen Sie die Symbolleiste), um die Ansicht zurückzusetzen.',
        'Um tiefer zu gehen, wählen Sie einen Ausdruck und öffnen Sie das Analyse-Panel: Finden Sie seine Nullstellen, Extremstellen und Achsenabschnitte, oder werten Sie Ableitung und Integral an Punkten Ihrer Wahl aus. Wenn Ihnen Worte lieber sind als Formeln, öffnen Sie den KI-Assistenten und fragen Sie — zum Beispiel „zeichne sin(x) und zeig mir seine Nullstellen“.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Ist dieser Grafikrechner kostenlos?',
      answer:
        'Ja. Der Rechner läuft vollständig in Ihrem Browser und ist kostenlos nutzbar, ohne Registrierung. ' +
        'Ihre Graphen werden auf Ihrem eigenen Gerät gespeichert, nicht auf einem Server.',
    },
    {
      question: 'Welche Arten von Ausdrücken kann ich zeichnen?',
      answer:
        'Kartesische Funktionen wie sin(x) oder x^2 - 4, parametrische Kurven, Polargleichungen, ' +
        'Ungleichungen und einzelne Punkte. Sie können viele Ausdrücke gleichzeitig zeichnen, jeder mit ' +
        'eigener Farbe.',
    },
    {
      question: 'Kann er Nullstellen, Ableitungen und Integrale finden?',
      answer:
        'Ja. Das Analyse-Panel findet Nullstellen mit dem Brent-Verfahren, schätzt Ableitungen ' +
        'mit zentralen Differenzen, berechnet bestimmte Integrale mit der adaptiven Simpson-Regel ' +
        'und zeichnet Tangenten. Ergebnisse, die nicht berechnet werden können, werden ehrlich gemeldet.',
    },
    {
      question: 'Wie funktioniert der KI-Assistent?',
      answer:
        'Sie können Fragen in einfacher Sprache stellen. Der Assistent übersetzt Ihre Anfrage in ' +
        'Rechnerbefehle — Ausdrücke zeichnen, die Ansicht einstellen oder ein Konzept Schritt für ' +
        'Schritt erklären. Die Rechen-Engine führt immer die eigentlichen Berechnungen durch; die KI ' +
        'erfindet niemals numerische Ergebnisse.',
    },
    {
      question: 'Brauche ich ein Konto, um Graphen zu speichern oder zu teilen?',
      answer:
        'Es gibt keine Konten. Sie können benannte Graphen in Ihrem Browser speichern, sie als JSON oder ' +
        'PNG exportieren und als kompakte Links teilen, die jeder öffnen kann.',
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
    loadFailedTitle: 'Rechner konnte nicht geladen werden',
    errorFallback: {
      defaultTitle: 'Etwas ist schiefgelaufen',
      message:
        'Ein unerwarteter Fehler hat diesen Teil der Seite unterbrochen. Ihre anderen Daten sind nicht betroffen.',
      retry: 'Erneut versuchen',
    },
    toolbar: {
      regionLabel: 'Rechneraktionen',
      title: 'Grafikrechner',
      addExpression: 'Ausdruck hinzufügen',
      zoomIn: 'Vergrößern',
      zoomOut: 'Verkleinern',
      resetView: 'Ansicht zurücksetzen',
    },
    expressions: {
      panelTitle: 'Ausdrücke',
      add: 'Hinzufügen',
      addAriaLabel: 'Ausdruck hinzufügen',
      fallbackTitle: 'Ausdrucksliste konnte nicht geladen werden',
      kinds: {
        cartesian: 'Kartesisch',
        parametric: 'Parametrisch',
        polar: 'Polar',
        inequality: 'Ungleichung',
        point: 'Punkt',
        table: 'Tabelle',
        textNote: 'Textnotiz',
      },
      kindOptions: [
        { kind: 'cartesian', label: 'y = f(x)' },
        { kind: 'parametric', label: 'Parametrisch' },
        { kind: 'polar', label: 'Polar' },
        { kind: 'inequality', label: 'Ungleichung' },
        { kind: 'point', label: 'Punkt' },
      ],
      addKindOptions: [
        { kind: 'cartesian', label: 'Funktion y = f(x)' },
        { kind: 'parametric', label: 'Parametrisch (x(t), y(t))' },
        { kind: 'polar', label: 'Polar r(θ)' },
        { kind: 'inequality', label: 'Ungleichung' },
        { kind: 'point', label: 'Punkt' },
      ],
      addKindLabel: 'Ausdrucksart',
      emptyState: 'Noch keine Ausdrücke.',
      changeColorTemplate: 'Farbe von {label} ändern',
      renameAriaTemplate: '{label} umbenennen',
      changeTypeAriaTemplate: 'Typ von {label} ändern',
      editDefinitionAriaTemplate: 'Definition von {label} bearbeiten',
      duplicateAriaTemplate: '{label} duplizieren',
      deleteAriaTemplate: '{label} löschen',
      hideAria: 'Ausdruck ausblenden',
      showAria: 'Ausdruck einblenden',
      fields: {
        xOfT: 'x(t)-Definition',
        yOfT: 'y(t)-Definition',
        tMin: 't min',
        tMax: 't max',
        xCoordinate: 'x-Koordinate',
        yCoordinate: 'y-Koordinate',
        polarHint: 'θ von 0 bis 2π — theta oder θ eingeben',
        inequalitySide: 'Ungleichungsseite',
        inequalityOperator: 'Ungleichungsoperator',
      },
      defaultLabelTemplate: '{kind} {n}',
      summaryTemplates: {
        cartesian: 'y = {rhs}',
        parametric: '(x(t), y(t)) = ({x}, {y})',
        polar: 'r = {r}',
        point: '({x}, {y})',
        inequality: '{lhs} {op} {rhs}',
        table: 'Tabelle ({cols} Spalten × {rows} Zeilen)',
        note: 'Notiz: {preview}',
        noteEmpty: 'Notiz: (leer)',
      },
    },
    graph: {
      regionLabel: 'Graph',
      toolbarLabel: 'Steuerung der Graphenansicht',
      zoomIn: 'Vergrößern',
      zoomOut: 'Verkleinern',
      resetView: 'Ansicht zurücksetzen',
      fitView: 'Ansicht anpassen',
      toggleGrid: 'Raster ein-/ausblenden',
      toggleAxes: 'Achsen ein-/ausblenden',
      inspectedPoint: 'Untersuchter Punkt',
      dismissInspectedPoint: 'Untersuchten Punkt verwerfen',
      tangentButton: 'Tangente',
      noteButton: 'Notiz',
      notePlaceholder: 'Notiz-Label…',
      noteAriaLabel: 'Anmerkungs-Label',
      coordinateTemplate: 'x: {x}, y: {y}',
      canvasDefaultLabel:
        'Interaktiver kartesischer Koordinatengraph. Verwenden Sie die Graph-Symbolleiste zum Vergrößern, Verkleinern oder Zurücksetzen der Ansicht.',
      unknownCurveLabel: 'Kurve',
      loadErrorTitle: 'Die interaktive Grafik ist auf ein Problem gestoßen',
      loadErrorMessage: 'Ihre Ausdrücke und Einstellungen sind nicht betroffen.',
      reloadGraph: 'Graph neu laden',
    },
    variables: {
      panelTitle: 'Variablen',
      add: 'Hinzufügen',
      nameLabel: 'Variablenname',
      animationSpeed: 'Animationsgeschwindigkeit',
      animationSpeedTitle: 'Geschwindigkeit des Animationsdurchlaufs',
      speeds: { slow: 'Langsam', normal: 'Normal', fast: 'Schnell' },
      reducedMotionNote:
        'Animation ist deaktiviert, weil Ihr System reduzierte Bewegung bevorzugt.',
      emptyState:
        'Noch keine Variablen. Fügen Sie eine hinzu und nutzen Sie sie in einem Ausdruck — z. B. y = a·sin(b·x).',
      emptyStateLead:
        'Noch keine Variablen. Fügen Sie eine hinzu und verwenden Sie sie in einem Ausdruck, z. B.',
      undefinedHeading: 'In Ausdrücken verwendet, aber nicht definiert:',
      defineVariableAriaTemplate: 'Variable {name} definieren',
      valueAriaTemplate: '{name}-Wert',
      currentValueTitle: 'Aktuell aufgelöster Wert',
      sliderAriaTemplate: '{name}-Schieberegler',
      dragToChangeTemplate: 'Ziehen, um {name} zu ändern',
      sliderUnavailable: 'Schieberegler nicht verfügbar: Der Wert stammt aus einer Formel.',
      animateAriaTemplate: '{name} animieren',
      pauseAriaTemplate: '{name}-Animation pausieren',
      animateAcrossRangeTemplate: '{name} über seinen Bereich animieren',
      animationDisabledReducedMotion:
        'Animation deaktiviert: Ihr System bevorzugt reduzierte Bewegung.',
      animationNeedsPlainValue: 'Animation braucht einen einfachen Zahlenwert (keine Formel).',
      deleteVariableAriaTemplate: 'Variable {name} löschen',
      min: 'Min',
      max: 'Max',
      stepLabel: 'Schritt',
      validation: {
        enterName: 'Geben Sie einen Variablennamen ein.',
        namePattern:
          'Buchstaben, Ziffern oder Unterstrich verwenden, beginnend mit einem Buchstaben.',
        reservedTemplate: "'{name}' ist reserviert (x, t, theta sind Graphenparameter).",
        takenTemplate: "'{name}' ist bereits ein Funktions- oder Konstantenname.",
        undefinedTemplate:
          'Undefinierte Variable {names} — definieren Sie sie unter Variablen oder korrigieren Sie den Namen.',
        reservedUseTemplate:
          "Variable '{name}' kann '{used}' nicht verwenden — Variablen müssen einfache Zahlen sein oder " +
          'nur von anderen Variablen abhängen.',
        unknownTemplate: "Unbekannte Variable {names} in der Definition von '{name}'.",
        circularTemplate: 'Zirkulärer Verweis: {path}.',
        duplicateTemplate: "Doppelte Variable '{name}' — die erste wird behalten.",
        invalidExpression: 'Ungültiger Ausdruck.',
      },
    },
    analysis: {
      precision: {
        formatLabel: 'Format',
        decimals: 'Dezimalstellen',
        significant: 'Signifikant',
        digitsTemplate: 'Stellen (1–15)',
        placesTemplate: 'Nachkommastellen (0–12)',
      },
      table: {
        title: 'Wertetabelle',
        start: 'Start',
        end: 'Ende',
        step: 'Schritt („auto“)',
        build: 'Tabelle erstellen',
        startError: 'Geben Sie gültige Zahlen für Start und Ende ein.',
        stepError: 'Der Schritt muss eine positive Zahl oder „auto“ sein.',
        captionTemplate: 'Wertetabelle für {label}',
        stepCaptionTemplate: 'Schritt {step} · zeigt {shown} von {total} Zeilen',
        captionTruncatedSuffix:
          ' — verengen Sie den Bereich oder erhöhen Sie den Schritt, um den Rest zu sehen',
        keyboardHint:
          'Fokussieren Sie die Tabelle und nutzen Sie ↑/↓, um zwischen Zeilen zu wechseln.',
        noRows: 'Keine Zeilen anzuzeigen.',
        notDefinedTitle: 'An diesem x nicht definiert',
        useTappedPoint: 'Angetippten Punkt verwenden',
        useTappedPointTitle: 'Den durch Antippen des Graphen gewählten Punkt verwenden',
      },
      roots: {
        title: 'Nullstellen',
        from: 'Von',
        to: 'Bis',
        find: 'Nullstellen finden',
        useViewport: 'Ansicht verwenden',
        showOnGraph: 'Auf dem Graphen anzeigen',
        none: 'Keine Nullstellen in diesem Bereich gefunden.',
        resultTemplate: 'x = {x}',
      },
      intersections: {
        title: 'Schnittpunkte',
        noneDefined:
          'Fügen Sie einen zweiten kartesischen Ausdruck hinzu, um Schnittpunkte zu finden.',
        with: 'Mit',
        find: 'Schnittpunkte finden',
        showOnGraph: 'Auf dem Graphen anzeigen',
        viewportNote: 'Innerhalb des aktuellen x-Bereichs der Ansicht gesucht.',
        none: 'Keine Schnittpunkte in der Ansicht gefunden.',
      },
      derivative: {
        title: 'Ableitung',
        atX: 'Bei x =',
        compute: 'f′(x)',
        plot: 'f′(x) zeichnen',
        hide: 'f′(x) ausblenden',
        resultTemplate: 'f′({x}) = {value}',
        note: 'Numerisch (zentrale Differenzen) — keine symbolische Ableitung.',
      },
      integral: {
        title: 'Bestimmtes Integral',
        fromA: 'Von a',
        toB: 'Bis b',
        compute: 'Berechnen',
        shadeArea: 'Fläche schattieren',
        hideShading: 'Schattierung ausblenden',
        resultTemplate: '∫ = {value}',
        noConvergence:
          'Die Quadratur konvergierte auf diesem Intervall nicht (mögliche Singularität oder ' +
          'Definitionslücke) — kein Wert gemeldet.',
      },
      limit: {
        title: 'Grenzwert',
        atX: 'Bei x =',
        side: 'Seite',
        sides: { twoSided: 'Zweiseitig', left: 'Links', right: 'Rechts' },
        compute: 'Berechnen',
        convergesTemplate: 'Grenzwert = {value}',
        unboundedTemplate: 'Unbeschränkt — nähert sich {direction}',
        doesNotExist:
          'Existiert nicht (einseitige Grenzwerte stimmen nicht überein oder die Funktion oszilliert)',
        indeterminate:
          'Nicht bestimmbar — die Funktion ist in der Nähe dieses Punkts nicht definiert',
      },
      extrema: {
        title: 'Lokale Extremstellen',
        find: 'In der Ansicht finden',
        showOnGraph: 'Auf dem Graphen anzeigen',
        none: 'Keine lokalen Minima oder Maxima in der Ansicht gefunden.',
        minTemplate: 'Min bei ({x}, {y})',
        maxTemplate: 'Max bei ({x}, {y})',
      },
      tangent: {
        title: 'Tangente & Normale',
        atX: 'Bei x =',
        compute: 'Berechnen',
        showTangent: 'Tangente anzeigen',
        showNormal: 'Normale anzeigen',
        failed:
          'Keine Tangente hier — die Funktion ist an diesem x nicht definiert oder nicht differenzierbar.',
        tangentTemplate: 'Tangente: {equation}',
        normalTemplate: 'Normale: {equation}',
        slopeTemplate: 'Steigung f′({x}) = {slope}',
        cannotAnalyzeTemplate: 'Dieser Ausdruck kann nicht analysiert werden: {error}',
        unknownParseError: 'unbekannter Parse-Fehler.',
        couldNotParse: 'Dieser Ausdruck konnte nicht geparst werden.',
      },
      annotations: {
        title: 'Anmerkungen',
        annotateTapped: 'Angetippten Punkt annotieren',
        empty:
          'Noch keine Anmerkungen. Tippen Sie eine Kurve auf dem Graphen an und annotieren Sie dann ' +
          'den Punkt — oder benennen Sie Anmerkungen hier um und entfernen Sie sie.',
        showAriaTemplate: 'Anmerkung {label} anzeigen',
        deleteAriaTemplate: 'Anmerkung {label} löschen',
        show: 'Anzeigen',
        label: 'Label',
      },
      panelEmpty:
        'Fügen Sie einen kartesischen Ausdruck (y = …) hinzu, um Wertetabellen, Nullstellen, ' +
        'Ableitungen, Integrale, Grenzwerte, Extremstellen und Tangenten freizuschalten.',
      panelTitle: 'Analyse',
      panelAriaLabel: 'Mathematische Analyse',
    },
    persistence: {
      regionLabel: 'Graphen-Speicherung',
      undo: 'Rückgängig',
      redo: 'Wiederholen',
      save: 'Graph speichern',
      saveUnsaved: 'Graph speichern (ungespeicherte Änderungen)',
      unsavedChanges: 'Ungespeicherte Änderungen',
      myGraphs: 'Meine Graphen',
      share: 'Teilen',
      export: 'Exportieren',
      closeExportMenu: 'Exportmenü schließen',
      exportOptions: 'Exportoptionen',
      downloadJson: 'JSON herunterladen',
      downloadPng: 'PNG herunterladen (2x)',
      import: 'Importieren',
      copyEquations: 'Gleichungen kopieren',
      copyEquationsAria: 'Gleichungen als Text kopieren',
      modal: { close: 'Schließen', backdrop: 'Dialog schließen' },
      toasts: {
        exportedJson: 'Graph als JSON exportiert.',
        exportJsonFailed: 'JSON-Export fehlgeschlagen.',
        exportedPng: 'Graph als PNG (2x) exportiert.',
        noExpressions: 'Es gibt keine Ausdrücke zum Kopieren.',
        copied: 'Gleichungen in die Zwischenablage kopiert.',
        copyFailed: 'Kopieren ist in diesem Browser fehlgeschlagen.',
      },
      saveDialog: {
        title: 'Graph speichern',
        saved: 'In diesem Browser gespeichert.',
        nameLabel: 'Name',
        namePlaceholder: 'z. B. Parabel-Erkundung',
        nameHint:
          'Nur in diesem Browser gespeichert. Das Speichern desselben Namens überschreibt ihn.',
        cancel: 'Abbrechen',
        save: 'Graph speichern',
        errors: {
          emptyName: 'Geben Sie dem Graphen einen Namen.',
          nameTooLongTemplate: 'Halten Sie den Namen unter {max} Zeichen.',
          storageUnavailable: 'Lokaler Speicher ist in diesem Browser nicht verfügbar.',
          readFailed: 'Die Bibliothek gespeicherter Graphen konnte nicht gelesen werden.',
          libraryFullTemplate:
            'Die Bibliothek ist voll ({max} gespeicherte Graphen). Löschen Sie zuerst einen.',
          saveFailed: 'Konnte nicht speichern — Browserspeicher ist nicht verfügbar oder voll.',
          unexpected: 'Speichern ist unerwartet fehlgeschlagen.',
        },
      },
      libraryDialog: {
        title: 'Meine gespeicherten Graphen',
        // Das Wort „Speichern“ ist in der UI hervorgehoben; beim Verdrahten die Hervorhebung beibehalten.
        empty:
          'Noch nichts gespeichert. Nutzen Sie „Speichern“, um den aktuellen Graphen in diesem Browser zu behalten.',
        entryMetaTemplate: '{date} · {count} Ausdruck{plural}{variables}',
        emptyLead: 'Noch nichts gespeichert. Nutzen Sie',
        emptySave: 'Speichern',
        emptyTail: ', um den aktuellen Graphen in diesem Browser zu behalten.',
        variablesPartTemplate: ' · {count} Variable{plural}',
        renameLabel: 'Graph umbenennen',
        rename: 'Umbenennen',
        cancel: 'Abbrechen',
        restore: 'Wiederherstellen',
        renameAriaTemplate: '{name} umbenennen',
        deleteAriaTemplate: '{name} löschen',
        deleteConfirm: 'Diesen gespeicherten Graphen löschen?',
        keep: 'Behalten',
        delete: 'Löschen',
        unsavedWarning:
          'Sie haben ungespeicherte Änderungen. Wiederherstellen ersetzt den aktuellen Graphen.',
        restoreAnyway: 'Trotzdem wiederherstellen',
        errors: {
          noLongerExists: 'Dieser gespeicherte Graph existiert nicht mehr.',
          duplicateName: 'Ein gespeicherter Graph mit diesem Namen existiert bereits.',
          renameFailed: 'Konnte nicht umbenennen — Browserspeicher ist nicht verfügbar oder voll.',
        },
      },
      shareDialog: {
        title: 'Diesen Graphen teilen',
        creating: 'Ihr Link wird erstellt…',
        linkLabel: 'Freigabelink',
        copyLink: 'Link kopieren',
        copied: 'Kopiert',
        openNewTab: 'Link in neuem Tab öffnen',
        note:
          'Der Link enthält Ihre Graphendaten — jeder mit dem Link kann diesen Graphen ansehen. Er öffnet ' +
          'sich auf einer Seite, die niemals von Suchmaschinen indexiert wird.',
        createFailed: 'In diesem Browser konnte kein Freigabelink erstellt werden.',
        copyFailed:
          'Kopieren fehlgeschlagen — wählen Sie den Link oben aus und kopieren Sie ihn manuell.',
      },
      importDialog: {
        title: 'Graph importieren',
        chooseFile: 'Eine .json-Datei wählen',
        chooseFileAriaLabel: 'Eine Graph-JSON-Datei wählen',
        fileChosenTemplate: 'Datei: {name}',
        orPaste: 'Oder Graphen-JSON einfügen',
        pastePlaceholder: '{"app": "graphing-calculator", "version": 1, …}',
        sizeNoteTemplate:
          'Importe werden validiert und sind größenbegrenzt (max. {maxKb} KB). Importierte Daten werden niemals ' +
          'ausgeführt — sie werden nur als Daten gelesen.',
        cancel: 'Abbrechen',
        review: 'Import prüfen',
        back: 'Zurück',
        importAnyway: 'Trotzdem importieren',
        untitled: 'Graph ohne Titel',
        hiddenSuffix: ' (ausgeblendet)',
        variablesPrefix: 'Variablen: ',
        viewTemplate: 'Ansicht: x ∈ [{xMin}, {xMax}], y ∈ [{yMin}, {yMax}]',
        unsavedWarning:
          'Sie haben ungespeicherte Änderungen. Importieren ersetzt den aktuellen Graphen.',
        errors: {
          empty: 'Fügen Sie zuerst Graphen-JSON ein oder wählen Sie eine Datei.',
          tooLargeTemplate: 'Die {source} ist größer als {maxKb} KB und wurde abgelehnt.',
          fileTooLargeTemplate: '„{name}“ ist größer als {maxKb} KB und wurde abgelehnt.',
          invalidJson: 'Die Datei ist kein gültiges JSON.',
          validationFailedTemplate: 'Der Graph schlug bei der Validierung fehl: {issues}{more}',
          unreadable: 'Die Datei konnte nicht gelesen werden.',
        },
      },
      shared: {
        noGraph: 'Dieser Link enthält keinen freigegebenen Graphen.',
        openFailed: 'Der freigegebene Graph konnte nicht geöffnet werden.',
        opening: 'Der freigegebene Graph wird geöffnet…',
        heading: 'Dieser freigegebene Graph konnte nicht geöffnet werden',
        openCalculator: 'Grafikrechner öffnen',
        fallbackTitle: 'Freigegebener Graph konnte nicht geladen werden',
      },
    },
    ai: {
      toggleOpen: 'KI-Matheassistent öffnen',
      toggleClose: 'KI-Matheassistent schließen',
      panelLabel: 'KI-Matheassistent',
      heading: 'KI-Matheassistent',
      statusMock: 'Demo-Modus — kein KI-Schlüssel konfiguriert',
      statusDeepseek: 'Bereitgestellt von DeepSeek',
      statusDefault: 'Fragen Sie zum Graphen',
      messagesLabel: 'KI-Chatnachrichten',
      intro:
        'Ich kann Funktionen zeichnen, die Ansicht anpassen und Schieberegler verwalten. Probieren Sie eins:',
      suggestions: ['Plotte y = x^2', 'Rauszoomen', 'Setze a = 2', 'Was kannst du?'],
      conceptualNote: 'Konzeptionelle KI-Erklärung — nicht von der Rechen-Engine berechnet.',
      mockNote: 'Demo-Antwort',
      thinking: 'Denke nach…',
      inputLabel: 'Nachricht an den KI-Matheassistenten',
      inputPlaceholder: 'Versuchen Sie „plotte y = x^2“',
      send: 'Senden',
      footer:
        'Die KI rechnet niemals Ergebnisse — die Rechen-Engine tut es. Der Verlauf bleibt in dieser Sitzung.',
      chatCleared: 'Chat gelöscht.',
      intent: {
        parseFailedTemplate:
          '„{source}“ konnte ich nicht parsen. Prüfen Sie den Ausdruck und versuchen Sie es erneut.',
        notFiniteTemplate:
          'Auswertung von {source} bei x = {x}: Das Ergebnis ist keine endliche Zahl (dort undefiniert).',
        computedTemplate: 'Von der Rechen-Engine berechnet: {source} bei x = {x} ist {value}.',
        zoomedOut: 'Rausgezoomt.',
        zoomedIn: 'Rangezoomt.',
        viewReset: 'Ansicht auf den Standardbereich zurückgesetzt.',
        badVariableNameTemplate:
          '„{name}“ ist kein nutzbarer Variablenname (meiden Sie x, t, theta und Funktionsnamen).',
        noExpressionToPlot:
          'Ich konnte keinen Mathe-Ausdruck zum Zeichnen finden. Versuchen Sie „plotte x^2“.',
      },
      processor: {
        helpLines: [
          'Das kann ich:',
          '• „plotte x^2“ — eine Funktion zeichnen',
          '• „zoom rein“ / „zoom raus“ / „Ansicht zurücksetzen“ — die Ansicht ändern',
          '• „setze a = 2“ — eine Schieberegler-Variable hinzufügen',
          '• „werte x^2+1 bei x = 3 aus“ — einen Wert mit der Rechen-Engine berechnen',
          '• „erkläre Ableitungen“ — konzeptionelle Erklärung',
          '• „löschen“ — diesen Chat löschen',
          'Alles Kniffligere geht an den KI-Dienst, wenn er konfiguriert ist.',
        ],
        invalidExpression: 'ungültiger Ausdruck',
        plotFailedTemplate: 'Das konnte ich nicht zeichnen: {detail}',
        undefinedHintTemplate:
          ' Hinweis: {names} {isAre} nicht definiert — versuchen Sie „setze {first} = 2“.',
        plottedTemplate: 'y = {expression} gezeichnet.{hint}',
        sliderUpdatedTemplate: 'Schieberegler {name} auf {value} aktualisiert.',
        sliderAddedTemplate: 'Schieberegler {name} = {value} hinzugefügt.',
        viewportUpdated: 'Ansicht aktualisiert.',
      },
    },
    engine: {
      parse: {
        unexpectedCharacterTemplate: "Unerwartetes Zeichen '{char}'",
        enterExpression: 'Geben Sie einen Ausdruck ein',
        unexpectedTokenTemplate: "Unerwartetes '{token}'",
        expectedButFoundTemplate: "Erwartet wurde {what}, aber '{token}' gefunden",
        expectedClosingTemplate: "Erwartet wurde ')', aber '{token}' gefunden",
        unexpectedEnd: 'Unerwartetes Ende des Ausdrucks',
        needsArgumentTemplate: "'{name}' braucht ein Argument",
        expectedSeparatorTemplate: "Erwartet wurde ',' oder ')', aber '{token}' gefunden",
        arityTemplate: "'{name}' erwartet {arity} Argument(e), aber {count} erhalten",
      },
    },
  },
};
