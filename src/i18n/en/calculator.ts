/**
 * English calculator dictionary — the graphing-calculator page prose plus
 * every string owned by the calculator islands and supporting libraries.
 *
 * The island/library strings are NOT wired yet: the React components and
 * math/parser modules still carry their own literals, and English output
 * must remain byte-identical. This dictionary is the single source of
 * truth the future `strings`-prop refactor will consume — see
 * docs/I18N-CONTRACTS.md.
 *
 * Templates use `{name}` placeholders resolved by `format` in
 * `src/i18n/locales.ts`. Mathematical notation (f′(x), ∫, θ, …) and
 * expression syntax are DO-NOT-TRANSLATE.
 */

import type { CalculatorStrings } from '../types.js';

export const calculator: CalculatorStrings = {
  seo: {
    title: 'Graphing Calculator — Free Online Function Grapher',
    description:
      'Free online graphing calculator: plot functions, parametric and polar curves, find ' +
      'roots, derivatives and integrals, and explore math with an AI assistant. No sign-up.',
  },
  intro: {
    heading: 'About this graphing calculator',
    lede:
      'A free, no-sign-up graphing calculator that runs entirely in your browser. Plot ' +
      'functions, analyze them with real numerical methods, animate parameters with sliders, ' +
      'and get plain-English help from the AI assistant.',
  },
  sections: [
    {
      heading: 'What you can do',
      body: [
        'Type an expression such as x^2, sin(x), or 1/x and watch it plot instantly. Add more expressions to compare them, toggle visibility, and restyle colors. The graph supports smooth zoom centered on your cursor, panning, and full touch gestures including pinch-to-zoom.',
        'Beyond plotting, the analysis tools turn the graph into a laboratory: locate x-intercepts, compute the slope at any point, measure the area under a curve, generate tables of values, and draw tangent and normal lines. Variables and sliders let you animate parameters — drag a slider and watch a whole family of curves morph in real time.',
      ],
    },
    {
      heading: 'How to graph a function',
      body: [
        'Enter your expression in the expression list using x as the variable — for example, x^3 - 3*x. The graph updates as you type. Scroll to zoom toward your cursor, drag to pan, and double-click (or use the toolbar) to reset the view.',
        'To go deeper, select an expression and open the analysis panel: find its roots, extrema, and intercepts, or evaluate the derivative and integral at points you choose. If you prefer words to formulas, open the AI assistant and ask — for instance, "plot sin(x) and show me its roots".',
      ],
    },
  ],
  faqs: [
    {
      question: 'Is this graphing calculator free?',
      answer:
        'Yes. The calculator runs entirely in your browser and is free to use with no sign-up. ' +
        'Your graphs are saved on your own device, not on a server.',
    },
    {
      question: 'What kinds of expressions can I graph?',
      answer:
        'Cartesian functions like sin(x) or x^2 - 4, parametric curves, polar equations, ' +
        'inequalities, and individual points. You can plot many expressions at once, each with ' +
        'its own color.',
    },
    {
      question: 'Can it find roots, derivatives, and integrals?',
      answer:
        'Yes. The analysis panel finds roots with Brent\u2019s method, estimates derivatives ' +
        'with central differences, computes definite integrals with adaptive Simpson\u2019s ' +
        'rule, and draws tangent lines. Results that cannot be computed are reported honestly.',
    },
    {
      question: 'How does the AI assistant work?',
      answer:
        'You can ask questions in plain English. The assistant translates your request into ' +
        'calculator commands — plotting expressions, setting the viewport, or explaining a ' +
        'concept step by step. The math engine always performs the actual calculations; the AI ' +
        'never invents numerical results.',
    },
    {
      question: 'Do I need an account to save or share graphs?',
      answer:
        'No accounts exist. You can save named graphs in your browser, export them as JSON or ' +
        'PNG, and share them as compact links that anyone can open.',
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
    loadFailedTitle: 'Calculator failed to load',
    errorFallback: {
      defaultTitle: 'Something went wrong',
      message:
        'An unexpected error interrupted this part of the page. Your other data is unaffected.',
      retry: 'Try again',
    },
    toolbar: {
      regionLabel: 'Calculator actions',
      title: 'Graphing calculator',
      addExpression: 'Add expression',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      resetView: 'Reset view',
    },
    expressions: {
      panelTitle: 'Expressions',
      add: 'Add',
      addAriaLabel: 'Add expression',
      fallbackTitle: 'Expression list failed to load',
      kinds: {
        cartesian: 'Cartesian',
        parametric: 'Parametric',
        polar: 'Polar',
        inequality: 'Inequality',
        point: 'Point',
        table: 'Table',
        textNote: 'Text note',
      },
      kindOptions: [
        { kind: 'cartesian', label: 'y = f(x)' },
        { kind: 'parametric', label: 'Parametric' },
        { kind: 'polar', label: 'Polar' },
        { kind: 'inequality', label: 'Inequality' },
        { kind: 'point', label: 'Point' },
      ],
      addKindOptions: [
        { kind: 'cartesian', label: 'Function y = f(x)' },
        { kind: 'parametric', label: 'Parametric (x(t), y(t))' },
        { kind: 'polar', label: 'Polar r(θ)' },
        { kind: 'inequality', label: 'Inequality' },
        { kind: 'point', label: 'Point' },
      ],
      addKindLabel: 'Expression type',
      emptyState: 'No expressions yet.',
      changeColorTemplate: 'Change {label} color',
      renameAriaTemplate: 'Rename {label}',
      changeTypeAriaTemplate: 'Change {label} type',
      editDefinitionAriaTemplate: 'Edit {label} definition',
      duplicateAriaTemplate: 'Duplicate {label}',
      deleteAriaTemplate: 'Delete {label}',
      hideAria: 'Hide expression',
      showAria: 'Show expression',
      fields: {
        xOfT: 'x(t) definition',
        yOfT: 'y(t) definition',
        tMin: 't min',
        tMax: 't max',
        xCoordinate: 'x coordinate',
        yCoordinate: 'y coordinate',
        polarHint: 'θ from 0 to 2π — type theta or θ',
        inequalitySide: 'Inequality side',
        inequalityOperator: 'Inequality operator',
      },
      defaultLabelTemplate: '{kind} {n}',
      summaryTemplates: {
        cartesian: 'y = {rhs}',
        parametric: '(x(t), y(t)) = ({x}, {y})',
        polar: 'r = {r}',
        point: '({x}, {y})',
        inequality: '{lhs} {op} {rhs}',
        table: 'Table ({cols} columns x {rows} rows)',
        note: 'Note: {preview}',
        noteEmpty: 'Note: (empty)',
      },
    },
    graph: {
      regionLabel: 'Graph',
      toolbarLabel: 'Graph view controls',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      resetView: 'Reset view',
      fitView: 'Fit view',
      toggleGrid: 'Toggle grid',
      toggleAxes: 'Toggle axes',
      inspectedPoint: 'Inspected point',
      dismissInspectedPoint: 'Dismiss inspected point',
      tangentButton: 'Tangent',
      noteButton: 'Note',
      notePlaceholder: 'Note label…',
      noteAriaLabel: 'Annotation label',
      coordinateTemplate: 'x: {x}, y: {y}',
      canvasDefaultLabel:
        'Interactive Cartesian coordinate graph. Use the graph toolbar to zoom in, zoom out, or reset the view.',
      unknownCurveLabel: 'Curve',
      loadErrorTitle: 'The interactive graph ran into a problem',
      loadErrorMessage: 'Your expressions and settings are unaffected.',
      reloadGraph: 'Reload graph',
    },
    variables: {
      panelTitle: 'Variables',
      add: 'Add',
      nameLabel: 'Variable name',
      animationSpeed: 'Animation speed',
      animationSpeedTitle: 'Animation sweep speed',
      speeds: { slow: 'Slow', normal: 'Normal', fast: 'Fast' },
      reducedMotionNote: 'Animation is off because your system prefers reduced motion.',
      emptyState: 'No variables yet. Add one, then use it in any expression — e.g. y = a·sin(b·x).',
      emptyStateLead: 'No variables yet. Add one, then use it in any expression — e.g.',
      undefinedHeading: 'Used in expressions but not defined:',
      defineVariableAriaTemplate: 'Define variable {name}',
      valueAriaTemplate: '{name} value',
      currentValueTitle: 'Current resolved value',
      sliderAriaTemplate: '{name} slider',
      dragToChangeTemplate: 'Drag to change {name}',
      sliderUnavailable: 'Slider unavailable: value comes from a formula.',
      animateAriaTemplate: 'Animate {name}',
      pauseAriaTemplate: 'Pause {name} animation',
      animateAcrossRangeTemplate: 'Animate {name} across its range',
      animationDisabledReducedMotion: 'Animation disabled: your system prefers reduced motion.',
      animationNeedsPlainValue: 'Animation needs a plain numeric value (not a formula).',
      deleteVariableAriaTemplate: 'Delete variable {name}',
      min: 'Min',
      max: 'Max',
      stepLabel: 'Step',
      validation: {
        enterName: 'Enter a variable name.',
        namePattern: 'Use letters, digits, or underscore, starting with a letter.',
        reservedTemplate: "'{name}' is reserved (x, t, theta are graph parameters).",
        takenTemplate: "'{name}' is already a function or constant name.",
        undefinedTemplate: 'Undefined variable {names} — define it in Variables or fix the name.',
        reservedUseTemplate:
          "Variable '{name}' cannot use '{used}' — variables must be plain numbers or depend " +
          'only on other variables.',
        unknownTemplate: "Unknown variable {names} in the definition of '{name}'.",
        circularTemplate: 'Circular reference: {path}.',
        duplicateTemplate: "Duplicate variable '{name}' — keeping the first.",
        invalidExpression: 'Invalid expression.',
      },
    },
    analysis: {
      precision: {
        formatLabel: 'Format',
        decimals: 'Decimals',
        significant: 'Significant',
        digitsTemplate: 'Digits (1–15)',
        placesTemplate: 'Places (0–12)',
      },
      table: {
        title: 'Table of values',
        start: 'Start',
        end: 'End',
        step: 'Step ("auto")',
        build: 'Build table',
        startError: 'Enter valid numbers for start and end.',
        stepError: 'Step must be a positive number or "auto".',
        captionTemplate: 'Table of values for {label}',
        stepCaptionTemplate: 'Step {step} · showing {shown} of {total} rows',
        captionTruncatedSuffix: ' — narrow the range or increase the step to see the rest',
        keyboardHint: 'Focus the table and use ↑/↓ to move between rows.',
        noRows: 'No rows to show.',
        notDefinedTitle: 'Not defined at this x',
        useTappedPoint: 'Use tapped point',
        useTappedPointTitle: 'Use the point selected by tapping the graph',
      },
      roots: {
        title: 'Roots',
        from: 'From',
        to: 'To',
        find: 'Find roots',
        useViewport: 'Use viewport',
        showOnGraph: 'Show on graph',
        none: 'No roots found in this range.',
        resultTemplate: 'x = {x}',
      },
      intersections: {
        title: 'Intersections',
        noneDefined: 'Add a second Cartesian expression to find intersections.',
        with: 'With',
        find: 'Find intersections',
        showOnGraph: 'Show on graph',
        viewportNote: 'Searched within the current viewport x-range.',
        none: 'No intersections found in the viewport.',
      },
      derivative: {
        title: 'Derivative',
        atX: 'At x =',
        compute: 'f′(x)',
        plot: 'Plot f′(x)',
        hide: 'Hide f′(x)',
        resultTemplate: 'f′({x}) = {value}',
        note: 'Numerical (central difference) — not a symbolic derivative.',
      },
      integral: {
        title: 'Definite integral',
        fromA: 'From a',
        toB: 'To b',
        compute: 'Compute',
        shadeArea: 'Shade area',
        hideShading: 'Hide shading',
        resultTemplate: '∫ = {value}',
        noConvergence:
          'The quadrature did not converge on this interval (possible singularity or ' +
          'domain gap) — no value reported.',
      },
      limit: {
        title: 'Limit',
        atX: 'At x =',
        side: 'Side',
        sides: { twoSided: 'Two-sided', left: 'Left', right: 'Right' },
        compute: 'Compute',
        convergesTemplate: 'Limit = {value}',
        unboundedTemplate: 'Unbounded — approaches {direction}',
        doesNotExist: 'Does not exist (one-sided limits disagree or the function oscillates)',
        indeterminate: 'Cannot determine — the function is not defined near this point',
      },
      extrema: {
        title: 'Local extrema',
        find: 'Find in viewport',
        showOnGraph: 'Show on graph',
        none: 'No local minima or maxima found in the viewport.',
        minTemplate: 'Min at ({x}, {y})',
        maxTemplate: 'Max at ({x}, {y})',
      },
      tangent: {
        title: 'Tangent & normal',
        atX: 'At x =',
        compute: 'Compute',
        showTangent: 'Show tangent',
        showNormal: 'Show normal',
        failed: 'No tangent here — the function is not defined or not differentiable at this x.',
        tangentTemplate: 'Tangent: {equation}',
        normalTemplate: 'Normal: {equation}',
        slopeTemplate: 'slope f′({x}) = {slope}',
        cannotAnalyzeTemplate: 'Cannot analyze this expression: {error}',
        unknownParseError: 'unknown parse error.',
        couldNotParse: 'Could not parse this expression.',
      },
      annotations: {
        title: 'Annotations',
        annotateTapped: 'Annotate tapped point',
        empty:
          'No annotations yet. Tap a curve on the graph, then annotate the point — or rename ' +
          'and remove annotations here.',
        showAriaTemplate: 'Show annotation {label}',
        deleteAriaTemplate: 'Delete annotation {label}',
        show: 'Show',
        label: 'Label',
      },
      panelEmpty:
        'Add a Cartesian expression (y = …) to unlock tables, roots, derivatives, integrals, ' +
        'limits, extrema, and tangents.',
      panelTitle: 'Analysis',
      panelAriaLabel: 'Mathematical analysis',
    },
    persistence: {
      regionLabel: 'Graph persistence',
      undo: 'Undo',
      redo: 'Redo',
      save: 'Save graph',
      saveUnsaved: 'Save graph (unsaved changes)',
      unsavedChanges: 'Unsaved changes',
      myGraphs: 'My graphs',
      share: 'Share',
      export: 'Export',
      closeExportMenu: 'Close export menu',
      exportOptions: 'Export options',
      downloadJson: 'Download JSON',
      downloadPng: 'Download PNG (2x)',
      import: 'Import',
      copyEquations: 'Copy equations',
      copyEquationsAria: 'Copy equations as text',
      modal: { close: 'Close', backdrop: 'Close dialog' },
      toasts: {
        exportedJson: 'Graph exported as JSON.',
        exportJsonFailed: 'JSON export failed.',
        exportedPng: 'Graph exported as PNG (2x).',
        noExpressions: 'There are no expressions to copy.',
        copied: 'Equations copied to the clipboard.',
        copyFailed: 'Copying failed in this browser.',
      },
      saveDialog: {
        title: 'Save graph',
        saved: 'Saved to this browser.',
        nameLabel: 'Name',
        namePlaceholder: 'e.g. Parabola exploration',
        nameHint: 'Saved in this browser only. Saving the same name overwrites it.',
        cancel: 'Cancel',
        save: 'Save graph',
        errors: {
          emptyName: 'Give the graph a name.',
          nameTooLongTemplate: 'Keep the name under {max} characters.',
          storageUnavailable: 'Local storage is not available in this browser.',
          readFailed: 'Could not read the saved-graph library.',
          libraryFullTemplate: 'The library is full ({max} saved graphs). Delete one first.',
          saveFailed: 'Could not save — browser storage is unavailable or full.',
          unexpected: 'Save failed unexpectedly.',
        },
      },
      libraryDialog: {
        title: 'My saved graphs',
        // The word "Save" is emphasized in the UI; keep the emphasis when wiring.
        empty: 'Nothing saved yet. Use Save to keep the current graph in this browser.',
        emptyLead: 'Nothing saved yet. Use',
        emptySave: 'Save',
        emptyTail: ' to keep the current graph in this browser.',
        entryMetaTemplate: '{date} · {count} expression{plural}{variables}',
        variablesPartTemplate: ' · {count} variable{plural}',
        renameLabel: 'Rename graph',
        rename: 'Rename',
        cancel: 'Cancel',
        restore: 'Restore',
        renameAriaTemplate: 'Rename {name}',
        deleteAriaTemplate: 'Delete {name}',
        deleteConfirm: 'Delete this saved graph?',
        keep: 'Keep',
        delete: 'Delete',
        unsavedWarning: 'You have unsaved changes. Restoring replaces the current graph.',
        restoreAnyway: 'Restore anyway',
        errors: {
          noLongerExists: 'That saved graph no longer exists.',
          duplicateName: 'A saved graph with that name already exists.',
          renameFailed: 'Could not rename — browser storage is unavailable or full.',
        },
      },
      shareDialog: {
        title: 'Share this graph',
        creating: 'Creating your link…',
        linkLabel: 'Share link',
        copyLink: 'Copy link',
        copied: 'Copied',
        openNewTab: 'Open link in a new tab',
        note:
          'The link contains your graph data — anyone with it can view this graph. It opens ' +
          'on a page that is never indexed by search engines.',
        createFailed: 'Could not create a share link in this browser.',
        copyFailed: 'Copying failed — select the link above and copy it manually.',
      },
      importDialog: {
        title: 'Import graph',
        chooseFile: 'Choose a .json file',
        chooseFileAriaLabel: 'Choose a graph JSON file',
        fileChosenTemplate: 'File: {name}',
        orPaste: 'Or paste graph JSON',
        pastePlaceholder: '{"app": "graphing-calculator", "version": 1, …}',
        sizeNoteTemplate:
          'Imports are validated and size-limited ({maxKb} KB max). Imported data is never ' +
          'executed — it is only read as data.',
        cancel: 'Cancel',
        review: 'Review import',
        back: 'Back',
        importAnyway: 'Import anyway',
        untitled: 'Untitled graph',
        hiddenSuffix: ' (hidden)',
        variablesPrefix: 'Variables: ',
        viewTemplate: 'View: x ∈ [{xMin}, {xMax}], y ∈ [{yMin}, {yMax}]',
        unsavedWarning: 'You have unsaved changes. Importing replaces the current graph.',
        errors: {
          empty: 'Paste graph JSON or choose a file first.',
          tooLargeTemplate: 'The {source} is larger than {maxKb} KB and was rejected.',
          fileTooLargeTemplate: '“{name}” is larger than {maxKb} KB and was rejected.',
          invalidJson: 'The file is not valid JSON.',
          validationFailedTemplate: 'The graph failed validation: {issues}{more}',
          unreadable: 'Could not read the file.',
        },
      },
      shared: {
        noGraph: 'This link does not contain a shared graph.',
        openFailed: 'The shared graph could not be opened.',
        opening: 'Opening the shared graph…',
        heading: "Couldn't open this shared graph",
        openCalculator: 'Open the graphing calculator',
        fallbackTitle: 'Shared graph failed to load',
      },
    },
    ai: {
      toggleOpen: 'Open AI math assistant',
      toggleClose: 'Close AI math assistant',
      panelLabel: 'AI math assistant',
      heading: 'AI math assistant',
      statusMock: 'Mock mode — no AI key configured',
      statusDeepseek: 'Powered by DeepSeek',
      statusDefault: 'Ask about the graph',
      messagesLabel: 'AI chat messages',
      intro: 'I can plot functions, adjust the view, and manage sliders. Try one:',
      suggestions: ['Plot y = x^2', 'Zoom out', 'Let a = 2', 'What can you do?'],
      conceptualNote: 'Conceptual AI explanation — not computed by the math engine.',
      mockNote: 'Mock response',
      thinking: 'Thinking…',
      inputLabel: 'Message the AI math assistant',
      inputPlaceholder: 'Try "plot y = x^2"',
      send: 'Send',
      footer: 'AI never computes results — the math engine does. History stays in this session.',
      chatCleared: 'Chat cleared.',
      intent: {
        parseFailedTemplate: 'I couldn\'t parse "{source}". Check the expression and try again.',
        notFiniteTemplate:
          'Evaluating {source} at x = {x}: the result is not a finite number (undefined there).',
        computedTemplate: 'Computed by the math engine: {source} at x = {x} is {value}.',
        zoomedOut: 'Zoomed out.',
        zoomedIn: 'Zoomed in.',
        viewReset: 'View reset to the default region.',
        badVariableNameTemplate:
          '"{name}" is not a usable variable name (avoid x, t, theta and function names).',
        noExpressionToPlot: 'I could not find a math expression to plot. Try "plot x^2".',
      },
      processor: {
        helpLines: [
          'Here is what I can do:',
          '• "plot x^2" — plot a function',
          '• "zoom in" / "zoom out" / "reset view" — change the viewport',
          '• "let a = 2" — add a slider variable',
          '• "evaluate x^2+1 at x = 3" — compute a value with the math engine',
          '• "explain derivatives" — conceptual explanation',
          '• "clear" — clear this chat',
          'Anything trickier goes to the AI service when it is configured.',
        ],
        invalidExpression: 'invalid expression',
        plotFailedTemplate: "I couldn't plot that: {detail}",
        undefinedHintTemplate: ' Note: {names} {isAre} not defined — try "let {first} = 2".',
        plottedTemplate: 'Plotted y = {expression}.{hint}',
        sliderUpdatedTemplate: 'Updated slider {name} to {value}.',
        sliderAddedTemplate: 'Added slider {name} = {value}.',
        viewportUpdated: 'Viewport updated.',
      },
    },
    engine: {
      parse: {
        unexpectedCharacterTemplate: "Unexpected character '{char}'",
        enterExpression: 'Enter an expression',
        unexpectedTokenTemplate: "Unexpected '{token}'",
        expectedButFoundTemplate: "Expected {what} but found '{token}'",
        expectedClosingTemplate: "Expected ')' but found '{token}'",
        unexpectedEnd: 'Unexpected end of expression',
        needsArgumentTemplate: "'{name}' needs an argument",
        expectedSeparatorTemplate: "Expected ',' or ')' but found '{token}'",
        arityTemplate: "'{name}' expects {arity} argument(s) but got {count}",
      },
    },
  },
};
