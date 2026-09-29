/**
 * i18n dictionary types — the shape contract every locale must satisfy.
 *
 * The English dictionaries in `src/i18n/en/` are the canonical reference:
 * `defineLocale` type-checks each locale module against these interfaces, so
 * a missing or mistyped key fails `tsc` instead of rendering a blank string.
 *
 * Future React islands (calculator shell, keypads, AI chat, 3D plotter, …)
 * receive a slice of the dictionary through a `strings` prop rather than
 * importing these modules directly — see `docs/I18N-CONTRACTS.md`. That
 * refactor is deliberately deferred; for now these types only describe the
 * shape the islands will consume.
 */

import type { Locale } from './locales.js';

/** Internal link with a translated label. `href` is the unprefixed English path. */
export interface NavLinkStrings {
  label: string;
  href: string;
}

/** Question/answer pair rendered by FaqBlock. */
export interface FaqStrings {
  question: string;
  answer: string;
}

/** A prose section with a heading and body paragraphs. */
export interface SectionStrings {
  heading: string;
  body: string[];
}

/** SEO title/description for a page. */
export interface SeoStrings {
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// chrome — shared layout: skip link, nav, header, footer, breadcrumbs, FAQ
// and related-links defaults, modal, language switcher, theme toggle label.
// ---------------------------------------------------------------------------

export interface ChromeStrings {
  skipLink: string;
  logoAriaLabel: string;
  nav: {
    /** Accessible name of the desktop navigation landmark. */
    primaryLabel: string;
    /** Accessible name of the mobile navigation landmark. */
    mobileLabel: string;
    /** Label of the button that opens the mobile menu. */
    openMenu: string;
    items: NavLinkStrings[];
  };
  language: {
    /** Accessible label of the language switcher control. */
    label: string;
    /** Summary template showing the current language, e.g. 'Language: English'. */
    summaryTemplate: string;
    /** Short hint shown next to the control, if any. */
    note: string;
  };
  footer: {
    description: string;
    columns: Array<{ heading: string; links: NavLinkStrings[] }>;
    social: {
      /** Accessible name of the social-links group. */
      groupLabel: string;
      /** Title attribute on placeholder social links with no URL yet. */
      comingSoonTitle: string;
      /** Marker appended to placeholder social links with no URL yet. */
      comingSoon: string;
      links: Array<{ label: string; href: string }>;
    };
    /** `format` replaces `{year}` and `{name}`; the &copy; entity is rendered by the Footer markup. */
    copyrightTemplate: string;
  };
  breadcrumbs: {
    ariaLabel: string;
    homeLabel: string;
  };
  /** Default FaqBlock heading when a page passes no heading. */
  faqDefaultHeading: string;
  /** Default RelatedLinks heading when a page passes no heading. */
  relatedDefaultHeading: string;
  modal: {
    close: string;
    backdrop: string;
  };
  /**
   * Runtime template for the theme toggle's accessible label.
   * `format` replaces `{mode}` with `light`, `dark`, or `system`.
   * Kept here so the future island refactor has a single source of truth;
   * the current ThemeToggle.astro script is intentionally untouched.
   */
  themeLabelTemplate: string;
}

// ---------------------------------------------------------------------------
// a11y — shared accessible names used across islands and content blocks.
// ---------------------------------------------------------------------------

export interface A11yStrings {
  analysisPanel: string;
  graphRegion: string;
  graphCanvasDefault: string;
  valueTableRegion: string;
  reviewInfo: string;
  toastRegion?: string;
}

// ---------------------------------------------------------------------------
// errors — 404/500 pages, error boundaries, API error copy.
// ---------------------------------------------------------------------------

export interface ErrorsStrings {
  notFound: SeoStrings & {
    heading: string;
    body: string;
    homeCta: string;
  };
  serverError: SeoStrings & {
    heading: string;
    body: string;
    homeCta: string;
    calculatorCta: string;
  };
  errorBoundary: {
    /** Fallback when a caller passes no explicit title. */
    defaultTitle: string;
    message: string;
    retry: string;
  };
  api: {
    rateLimited: string;
    invalidJson: string;
    serviceUnavailable: string;
    invalidResponse: string;
  };
}

// ---------------------------------------------------------------------------
// Page namespaces. Each page keeps SEO copy plus its structured prose.
// `sections` mirrors ArticleSections input; `faqs` mirrors FaqBlock input.
// Slugs, mathematical notation, expressions, and reviewedOn dates are
// DO-NOT-TRANSLATE — see docs/I18N-CONTRACTS.md.
// ---------------------------------------------------------------------------

export interface HomeStrings {
  seo: SeoStrings;
  hero: { title: string; subtitle: string; primaryCta: string; secondaryCta: string };
  features: {
    ariaLabel: string;
    cards: Array<{ title: string; description: string; body: string; cta: string; href: string }>;
  };
  explore: {
    ariaLabel: string;
    heading: string;
    cards: Array<{ title: string; body: string; href: string }>;
  };
}

export interface CalculatorStrings {
  seo: SeoStrings;
  intro: { heading: string; lede: string };
  sections: SectionStrings[];
  faqs: FaqStrings[];
  related: string[];
  shell: CalculatorShellStrings;
}

export interface CalculatorShellStrings {
  /** ErrorBoundary fallback title when the calculator shell itself fails to render. */
  loadFailedTitle: string;
  /** Generic error-boundary fallback strings (default title, message, retry). */
  errorFallback: {
    defaultTitle: string;
    message: string;
    retry: string;
  };
  toolbar: {
    regionLabel: string;
    title: string;
    addExpression: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
  };
  expressions: {
    panelTitle: string;
    add: string;
    addAriaLabel: string;
    fallbackTitle: string;
    kinds: {
      cartesian: string;
      parametric: string;
      polar: string;
      inequality: string;
      point: string;
      table: string;
      textNote: string;
    };
    kindOptions: Array<{ kind: string; label: string }>;
    addKindOptions: Array<{ kind: string; label: string }>;
    /** Accessible label of the "add expression" kind selector. */
    addKindLabel: string;
    /** Empty state of the expression list. */
    emptyState: string;
    /** `format` replaces `{label}` with the expression label. */
    changeColorTemplate: string;
    renameAriaTemplate: string;
    changeTypeAriaTemplate: string;
    editDefinitionAriaTemplate: string;
    duplicateAriaTemplate: string;
    deleteAriaTemplate: string;
    hideAria: string;
    showAria: string;
    fields: {
      xOfT: string;
      yOfT: string;
      tMin: string;
      tMax: string;
      xCoordinate: string;
      yCoordinate: string;
      polarHint: string;
      inequalitySide: string;
      inequalityOperator: string;
    };
    defaultLabelTemplate: string;
    summaryTemplates: {
      cartesian: string;
      parametric: string;
      polar: string;
      point: string;
      inequality: string;
      table: string;
      note: string;
      noteEmpty: string;
    };
  };
  graph: {
    regionLabel: string;
    toolbarLabel: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
    fitView: string;
    toggleGrid: string;
    toggleAxes: string;
    inspectedPoint: string;
    dismissInspectedPoint: string;
    tangentButton: string;
    noteButton: string;
    notePlaceholder: string;
    noteAriaLabel: string;
    coordinateTemplate: string;
    /** Default canvas accessible label (wired slice twin of a11y.graphCanvasDefault). */
    canvasDefaultLabel: string;
    /** Fallback curve label when the inspected point's expression is gone. */
    unknownCurveLabel: string;
    /** Graph-scoped error boundary strings. */
    loadErrorTitle: string;
    loadErrorMessage: string;
    reloadGraph: string;
  };
  variables: {
    panelTitle: string;
    add: string;
    /** Screen-reader label of the variable name input. */
    nameLabel: string;
    animationSpeed: string;
    animationSpeedTitle: string;
    speeds: { slow: string; normal: string; fast: string };
    reducedMotionNote: string;
    emptyState: string;
    /**
     * Lead-in of the empty state; the math example that follows stays
     * hardcoded (DO-NOT-TRANSLATE notation) with its font-mono styling.
     */
    emptyStateLead: string;
    undefinedHeading: string;
    defineVariableAriaTemplate: string;
    valueAriaTemplate: string;
    currentValueTitle: string;
    sliderAriaTemplate: string;
    dragToChangeTemplate: string;
    sliderUnavailable: string;
    animateAriaTemplate: string;
    pauseAriaTemplate: string;
    animateAcrossRangeTemplate: string;
    animationDisabledReducedMotion: string;
    animationNeedsPlainValue: string;
    deleteVariableAriaTemplate: string;
    min: string;
    max: string;
    /** Label of the per-variable step input. */
    stepLabel: string;
    validation: {
      enterName: string;
      namePattern: string;
      reservedTemplate: string;
      takenTemplate: string;
      undefinedTemplate: string;
      reservedUseTemplate: string;
      unknownTemplate: string;
      circularTemplate: string;
      duplicateTemplate: string;
      invalidExpression: string;
    };
  };
  analysis: {
    precision: {
      formatLabel: string;
      decimals: string;
      significant: string;
      digitsTemplate: string;
      placesTemplate: string;
    };
    table: {
      title: string;
      start: string;
      end: string;
      step: string;
      build: string;
      startError: string;
      stepError: string;
      captionTemplate: string;
      stepCaptionTemplate: string;
      captionTruncatedSuffix: string;
      keyboardHint: string;
      noRows: string;
      notDefinedTitle: string;
      useTappedPoint: string;
      useTappedPointTitle: string;
    };
    roots: {
      title: string;
      from: string;
      to: string;
      find: string;
      useViewport: string;
      showOnGraph: string;
      none: string;
      resultTemplate: string;
    };
    intersections: {
      title: string;
      noneDefined: string;
      with: string;
      find: string;
      showOnGraph: string;
      viewportNote: string;
      none: string;
    };
    derivative: {
      title: string;
      atX: string;
      compute: string;
      plot: string;
      hide: string;
      resultTemplate: string;
      note: string;
    };
    integral: {
      title: string;
      fromA: string;
      toB: string;
      compute: string;
      shadeArea: string;
      hideShading: string;
      resultTemplate: string;
      noConvergence: string;
    };
    limit: {
      title: string;
      atX: string;
      side: string;
      sides: { twoSided: string; left: string; right: string };
      compute: string;
      convergesTemplate: string;
      unboundedTemplate: string;
      doesNotExist: string;
      indeterminate: string;
    };
    extrema: {
      title: string;
      find: string;
      showOnGraph: string;
      none: string;
      minTemplate: string;
      maxTemplate: string;
    };
    tangent: {
      title: string;
      atX: string;
      compute: string;
      showTangent: string;
      showNormal: string;
      failed: string;
      tangentTemplate: string;
      normalTemplate: string;
      slopeTemplate: string;
      cannotAnalyzeTemplate: string;
      unknownParseError: string;
      couldNotParse: string;
    };
    annotations: {
      title: string;
      annotateTapped: string;
      empty: string;
      showAriaTemplate: string;
      deleteAriaTemplate: string;
      show: string;
      label: string;
    };
    panelEmpty: string;
    /** Visible title of the analysis panel. */
    panelTitle: string;
    /** Accessible label of the analysis section landmark. */
    panelAriaLabel: string;
  };
  persistence: {
    regionLabel: string;
    undo: string;
    redo: string;
    /** Save button accessible label when the graph is clean. */
    save: string;
    /** Save button accessible label when there are unsaved changes. */
    saveUnsaved: string;
    unsavedChanges: string;
    myGraphs: string;
    share: string;
    export: string;
    closeExportMenu: string;
    exportOptions: string;
    downloadJson: string;
    downloadPng: string;
    import: string;
    copyEquations: string;
    copyEquationsAria: string;
    /** Shared modal chrome labels (wired slice twin of chrome.modal). */
    modal: { close: string; backdrop: string };
    toasts: {
      exportedJson: string;
      exportJsonFailed: string;
      exportedPng: string;
      noExpressions: string;
      copied: string;
      copyFailed: string;
    };
    saveDialog: {
      title: string;
      saved: string;
      nameLabel: string;
      namePlaceholder: string;
      nameHint: string;
      cancel: string;
      save: string;
      errors: {
        emptyName: string;
        nameTooLongTemplate: string;
        storageUnavailable: string;
        readFailed: string;
        libraryFullTemplate: string;
        saveFailed: string;
        unexpected: string;
      };
    };
    libraryDialog: {
      title: string;
      empty: string;
      /** Split empty-state: `{emptyLead} <strong>{emptySave}</strong>{emptyTail}`. */
      emptyLead: string;
      emptySave: string;
      emptyTail: string;
      /** `{date} · {count} expression(s){variables}` — plural suffixes included by caller. */
      entryMetaTemplate: string;
      variablesPartTemplate: string;
      renameLabel: string;
      rename: string;
      cancel: string;
      restore: string;
      renameAriaTemplate: string;
      deleteAriaTemplate: string;
      deleteConfirm: string;
      keep: string;
      delete: string;
      unsavedWarning: string;
      restoreAnyway: string;
      errors: {
        noLongerExists: string;
        duplicateName: string;
        renameFailed: string;
      };
    };
    shareDialog: {
      title: string;
      creating: string;
      linkLabel: string;
      copyLink: string;
      copied: string;
      openNewTab: string;
      note: string;
      createFailed: string;
      copyFailed: string;
    };
    importDialog: {
      title: string;
      chooseFile: string;
      /** Screen-reader label of the hidden file input. */
      chooseFileAriaLabel: string;
      fileChosenTemplate: string;
      orPaste: string;
      pastePlaceholder: string;
      sizeNoteTemplate: string;
      cancel: string;
      review: string;
      back: string;
      importAnyway: string;
      untitled: string;
      hiddenSuffix: string;
      variablesPrefix: string;
      viewTemplate: string;
      unsavedWarning: string;
      errors: {
        empty: string;
        tooLargeTemplate: string;
        fileTooLargeTemplate: string;
        invalidJson: string;
        validationFailedTemplate: string;
        unreadable: string;
      };
    };
    shared: {
      noGraph: string;
      openFailed: string;
      opening: string;
      heading: string;
      openCalculator: string;
      fallbackTitle: string;
    };
  };
  ai: {
    toggleOpen: string;
    toggleClose: string;
    panelLabel: string;
    heading: string;
    statusMock: string;
    statusDeepseek: string;
    statusDefault: string;
    messagesLabel: string;
    intro: string;
    suggestions: string[];
    conceptualNote: string;
    mockNote: string;
    thinking: string;
    inputLabel: string;
    inputPlaceholder: string;
    send: string;
    footer: string;
    chatCleared: string;
    intent: {
      parseFailedTemplate: string;
      notFiniteTemplate: string;
      computedTemplate: string;
      zoomedOut: string;
      zoomedIn: string;
      viewReset: string;
      badVariableNameTemplate: string;
      noExpressionToPlot: string;
    };
    processor: {
      helpLines: string[];
      invalidExpression: string;
      plotFailedTemplate: string;
      undefinedHintTemplate: string;
      plottedTemplate: string;
      sliderUpdatedTemplate: string;
      sliderAddedTemplate: string;
      viewportUpdated: string;
    };
  };
  engine: {
    parse: {
      unexpectedCharacterTemplate: string;
      enterExpression: string;
      unexpectedTokenTemplate: string;
      expectedButFoundTemplate: string;
      expectedClosingTemplate: string;
      unexpectedEnd: string;
      needsArgumentTemplate: string;
      expectedSeparatorTemplate: string;
      arityTemplate: string;
    };
  };
}

export interface Graph3DStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  intro: string[];
  sections: SectionStrings[];
  faqs: FaqStrings[];
  related: string[];
  island: {
    surfaceLabel: string;
    placeholder: string;
    plot: string;
    emptyError: string;
    genericError: string;
    parseError: string;
    unknownVariablesTemplate: string;
    presetGroup: string;
    presets: Array<{ label: string; description: string }>;
    detailGroup: string;
    detailLabel: string;
    hint: string;
    zMin: string;
    zMax: string;
    autoScaledTemplate: string;
    noFiniteGrid: string;
    canvasAriaTemplate: string;
    canvasAriaEmpty: string;
    /** `format` replaces `{zMin}`/`{zMax}`; trailing space separates it from the next sentence. */
    canvasAriaStatsTemplate: string;
    /** No-finite-values variant of the canvas aria stats clause (trailing space included). */
    canvasAriaNoFiniteStats: string;
    summaryTemplate: string;
    summaryStatsTemplate: string;
    summaryNoFinite: string;
    summaryEmpty: string;
  };
}

export interface ScientificStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  intro: string[];
  sections: SectionStrings[];
  faqs: FaqStrings[];
  related: string[];
  island: {
    heading: string;
    angleModeTemplate: string;
    degrees: string;
    radians: string;
    expressionLabel: string;
    expressionPlaceholder: string;
    idleHint: string;
    /** ErrorBoundary fallback title when the scientific calculator fails to render. */
    loadFailedTitle: string;
    keypadLabel: string;
    tip: string;
    keys: Array<{ label: string; ariaLabel: string }>;
    errors: {
      divisionByZero: string;
      sqrtNegative: string;
      logNonPositive: string;
      asinAcosDomain: string;
      tanUndefined: string;
      emptyExpression: string;
      trailingOperator: string;
      mismatchedParens: string;
      badCharTemplate: string;
      unreadable: string;
      notReal: string;
      overflow: string;
    };
  };
}

export interface ToolPageStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  intro: string[];
  sections: SectionStrings[];
  faqs: FaqStrings[];
  related: string[];
  tool: {
    title: string;
    functionLabel: string;
    expressionPlaceholder: string;
    parseError: string;
  };
}

export interface CalculatorsStrings {
  index: {
    seo: SeoStrings;
    crumbs: NavLinkStrings[];
    heading: string;
    intro: string;
    tools: Array<{ title: string; description: string; blurb: string; href: string; cta: string }>;
    related: string[];
  };
  derivative: ToolPageStrings & {
    tool: {
      title: string;
      functionLabel: string;
      expressionPlaceholder: string;
      atLabel: string;
      atPlaceholder: string;
      calculate: string;
      fillError: string;
      parseError: string;
      badPoint: string;
      resultTemplate: string;
      noDerivative: string;
      /** ErrorBoundary fallback title for the live derivative tool. */
      loadFailedTitle: string;
      /** Visible panel heading of the live derivative tool UI. */
      panelTitle: string;
      /** Screen-reader name of the function input. */
      functionNameLabel: string;
      examplePlaceholder: string;
      pointLabel: string;
      compute: string;
      pointFiniteError: string;
      notDifferentiableError: string;
      estimateError: string;
      /**
       * `format` replaces `{a}` and `{value}`; uses the ASCII prime `f'`
       * exactly like the UI.
       */
      resultLineTemplate: string;
      /** Fallback when the expression fails to parse in the live UI. */
      parseFallback: string;
    };
  };
  integral: ToolPageStrings & {
    tool: {
      title: string;
      functionLabel: string;
      expressionPlaceholder: string;
      fromLabel: string;
      toLabel: string;
      fromPlaceholder: string;
      toPlaceholder: string;
      calculate: string;
      fillError: string;
      parseError: string;
      badBounds: string;
      resultTemplate: string;
      noConvergence: string;
      /** ErrorBoundary fallback title for the live integral tool. */
      loadFailedTitle: string;
      /** Visible panel heading of the live integral tool UI. */
      panelTitle: string;
      /** Screen-reader name of the function input. */
      functionNameLabel: string;
      examplePlaceholder: string;
      lowerBoundLabel: string;
      upperBoundLabel: string;
      boundsFiniteError: string;
      estimateError: string;
      /** Fallback when the expression fails to parse in the live UI. */
      parseFallback: string;
    };
  };
  rootFinder: ToolPageStrings & {
    tool: {
      title: string;
      functionLabel: string;
      expressionPlaceholder: string;
      fromLabel: string;
      toLabel: string;
      fromPlaceholder: string;
      toPlaceholder: string;
      calculate: string;
      fillError: string;
      parseError: string;
      badInterval: string;
      rootsFoundTemplate: string;
      noneFound: string;
      /** ErrorBoundary fallback title for the live root-finder tool. */
      loadFailedTitle: string;
      /** Visible panel heading of the live root-finder tool UI. */
      panelTitle: string;
      /** Screen-reader name of the function input. */
      functionNameLabel: string;
      intervalStartLabel: string;
      intervalEndLabel: string;
      intervalValidError: string;
      /** `format` replaces `{a}` and `{b}`. */
      noRootsTemplate: string;
      /** `format` replaces `{a}`, `{b}` and `{roots}`. */
      rootsListTemplate: string;
      searchError: string;
      /** Fallback when the expression fails to parse in the live UI. */
      parseFallback: string;
    };
  };
}

export interface FunctionsStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  intro: string;
  related: string[];
  template: {
    eyebrow: string;
    computedHeading: string;
    computedNoteTemplate: string;
    rootsLabel: string;
    yInterceptLabel: string;
    extremaLabel: string;
    samplesLabel: string;
    derivativeLabel: string;
    integralLabel: string;
    noneFound: string;
    moreTemplate: string;
    computeFailed: string;
    keyFactsHeading: string;
    ctaTemplate: string;
    undefinedValue: string;
    /** `format` replaces `{displayName}`; the page appends the site suffix itself. */
    slugTitleTemplate: string;
  };
}

export interface ExamplesStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  intro: string;
  related: string[];
  template: {
    eyebrow: string;
    plottedHeading: string;
    openCta: string;
    preloadNote: string;
    noticeHeading: string;
  };
}

export interface LearnStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  intro: string;
  /** Full month names for the "Last reviewed: {date}" line. */
  months: string[];
  /** Short month names for the index-card "Reviewed for accuracy · {date}" line. */
  shortMonths: string[];
  related: string[];
  template: {
    minReadTemplate: string;
    reviewAriaLabel: string;
    reviewLine: string;
    lastReviewedTemplate: string;
    /** Index-card review line: 'Reviewed for accuracy · {date}'. */
    indexCardReviewTemplate: string;
    tryHeading: string;
    tryIntroTemplate: string;
    calculatorLinkText: string;
    takeawaysHeading: string;
  };
}

export interface AboutStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  intro: string[];
  creator: {
    heading: string;
    imageAlt: string;
    name: string;
    body: string;
    links: Array<{ label: string; href: string }>;
  };
  sections: SectionStrings[];
  related: string[];
}

export interface MethodologyStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  /**
   * Inline anchors in a body paragraph are named in `links`; the label text
   * appears in the paragraph at the same position.
   */
  sections: Array<SectionStrings & { links?: Array<{ label: string; href: string }> }>;
  faqs: FaqStrings[];
  related: string[];
}

export interface DesmosAltStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  heading: string;
  /** Accessible label of the independence-notice aside. */
  asideAriaLabel: string;
  related: string[];
  /**
   * Inline anchors in a body paragraph are named in `links`; the label text
   * appears in the paragraph at the same position and hrefs are re-localized
   * at render time (same pattern as the methodology page).
   */
  sections: Array<SectionStrings & { links?: Array<{ label: string; href: string }> }>;
  faqs: FaqStrings[];
  table: {
    caption: string;
    headers: string[];
    rows: Array<{ feature: string; ours: string; theirs: string }>;
  };
  disclaimer: string;
}

export interface ContactStrings {
  seo: SeoStrings;
  crumbs: NavLinkStrings[];
  related: string[];
  heading: string;
  body: string[];
  emailNote: string;
}

export interface LegalEntryStrings {
  seo: SeoStrings;
  updatedTemplate: string;
  heading: string;
  intro?: string[];
  sections: SectionStrings[];
  outro?: string[];
}

export interface LegalStrings {
  /**
   * Prominent page-top notice (interface chrome, not legal text): the legal
   * body stays in English while this notice is translated per locale.
   */
  notice: { title: string; body: string };
  privacy: LegalEntryStrings;
  terms: LegalEntryStrings;
  disclaimer: LegalEntryStrings;
}

/** The full per-locale dictionary: one entry per namespace. */
export interface LocaleDictionary {
  chrome: ChromeStrings;
  a11y: A11yStrings;
  errors: ErrorsStrings;
  home: HomeStrings;
  calculator: CalculatorStrings;
  graph3d: Graph3DStrings;
  scientific: ScientificStrings;
  calculators: CalculatorsStrings;
  functions: FunctionsStrings;
  examples: ExamplesStrings;
  learn: LearnStrings;
  about: AboutStrings;
  methodology: MethodologyStrings;
  desmosAlt: DesmosAltStrings;
  contact: ContactStrings;
  legal: LegalStrings;
}

/**
 * Declare a locale's dictionary. The parameter type forces every namespace
 * to be present and correctly shaped; a missing key is a compile error.
 */
export function defineLocale(dictionary: LocaleDictionary): LocaleDictionary {
  return dictionary;
}

/** Resolve a dictionary for a locale (see `src/i18n/index.ts`). */
export type DictionaryResolver = (locale: Locale) => LocaleDictionary;
