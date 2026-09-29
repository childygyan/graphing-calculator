/**
 * Shared content types for the Phase 8 SEO content architecture.
 *
 * Hand-written prose lives in `src/data/seo/*.ts`; math-derived facts are
 * computed at build time by `src/lib/seo/content-engine.ts` from the
 * project's own math library — never fabricated.
 */

export interface ContentFaq {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;
  /** 1–3 paragraphs of real prose. */
  body: string[];
}

/** A notable-function page, e.g. /math-functions/sine/. */
export interface FunctionPageData {
  slug: string;
  /** Short name, e.g. "Sine". */
  name: string;
  /** Display name, e.g. "Sine Function". */
  displayName: string;
  /** Human notation, e.g. "f(x) = sin(x)". */
  notation: string;
  /** Source the math engine can compile, e.g. "sin(x)". */
  expression: string;
  tagline: string;
  /** Unique meta description (120–155 chars). */
  description: string;
  /** Opening paragraphs. */
  intro: string[];
  sections: ContentSection[];
  /** Hand-written, mathematically certain facts (domain, range, period…). */
  keyFacts: string[];
  faqs: ContentFaq[];
  /** Full root-relative paths, e.g. '/math-functions/cosine/'. */
  related: string[];
}

/** A learn article, e.g. /learn/understanding-derivatives/. */
export interface LearnArticle {
  slug: string;
  title: string;
  /** Unique meta description (120–155 chars). */
  description: string;
  sections: ContentSection[];
  /** Valid engine expressions (x only) readers can try in the calculator. */
  tryExpressions: string[];
  keyTakeaways: string[];
  faqs: ContentFaq[];
  /** Full root-relative paths. */
  related: string[];
}

/** A curated example graph, e.g. /examples/projectile-motion/. */
export interface ExampleGraphData {
  slug: string;
  title: string;
  /** Unique meta description (120–155 chars). */
  description: string;
  /** Expressions to preload into the shared graph (cartesian rhs in x). */
  expressions: ExampleExpression[];
  /** Optional viewport override; defaults to the app default. */
  viewport?: { xMin: number; xMax: number; yMin: number; yMax: number };
  story: string[];
  /** "What to notice" bullets. */
  insights: string[];
  related: string[];
}

export interface ExampleExpression {
  kind: 'cartesian' | 'parametric' | 'polar' | 'inequality';
  /** For cartesian: right-hand side in x, e.g. "sin(x)". */
  rhs?: string;
  /** For parametric: x(t) and y(t). */
  xOfT?: string;
  yOfT?: string;
  /** For polar: r(θ), written with variable `theta`. */
  rOfTheta?: string;
  /** For inequality: e.g. { lhs: 'y', operator: '<', rhs: 'x^2' }. */
  inequality?: { lhs: string; operator: '<' | '<=' | '>' | '>='; rhs: string };
  /** t-range for parametric/polar. */
  tMin?: string;
  tMax?: string;
  label?: string;
}
