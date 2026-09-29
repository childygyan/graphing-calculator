/**
 * Page registry — the single source of truth for every indexable route.
 *
 * Data-driven pages (functions, examples, learn) derive their entries from
 * the content data files, so adding a content entry automatically registers
 * its route everywhere: related-links labels, llms.txt, and the SEO audit.
 * Static pages are listed explicitly. Excluded from indexing: /graph/
 * (noindex share route), /api/*, and /404/.
 *
 * Locale support: `getPageRegistry(locale)` localizes static paths via
 * `localizePath` and resolves labels from the locale dictionary (footer link
 * labels + breadcrumb home label); data-driven entries use the locale's own
 * content modules (`src/data/seo/<locale>/{functions,examples,learn}.ts`),
 * so their labels are translated too. The no-argument call returns the
 * English registry exactly as before. `/disclaimer/` is intentionally not
 * registered (it ships noindex) and stays unregistered for all locales.
 */

import { FUNCTION_PAGES } from '../../data/seo/functions.js';
import { EXAMPLE_GRAPHS } from '../../data/seo/examples.js';
import { LEARN_ARTICLES } from '../../data/seo/learn.js';
import { FUNCTION_PAGES as esFunctions } from '../../data/seo/es/functions.js';
import { EXAMPLE_GRAPHS as esExamples } from '../../data/seo/es/examples.js';
import { LEARN_ARTICLES as esLearn } from '../../data/seo/es/learn.js';
import { FUNCTION_PAGES as deFunctions } from '../../data/seo/de/functions.js';
import { EXAMPLE_GRAPHS as deExamples } from '../../data/seo/de/examples.js';
import { LEARN_ARTICLES as deLearn } from '../../data/seo/de/learn.js';
import { FUNCTION_PAGES as frFunctions } from '../../data/seo/fr/functions.js';
import { EXAMPLE_GRAPHS as frExamples } from '../../data/seo/fr/examples.js';
import { LEARN_ARTICLES as frLearn } from '../../data/seo/fr/learn.js';
import { FUNCTION_PAGES as itFunctions } from '../../data/seo/it/functions.js';
import { EXAMPLE_GRAPHS as itExamples } from '../../data/seo/it/examples.js';
import { LEARN_ARTICLES as itLearn } from '../../data/seo/it/learn.js';
import { FUNCTION_PAGES as ptFunctions } from '../../data/seo/pt/functions.js';
import { EXAMPLE_GRAPHS as ptExamples } from '../../data/seo/pt/examples.js';
import { LEARN_ARTICLES as ptLearn } from '../../data/seo/pt/learn.js';
import {
  getDictionary,
  getLocaleFromPath,
  localizePath,
  stripLocale,
  type Locale,
} from '../../i18n/index.js';

export interface PageRegistryEntry {
  /** Root-relative path with trailing slash, e.g. '/math-functions/sine/'. */
  path: string;
  /** Human label used by related-links and llms.txt. */
  label: string;
  /** Hub section this page belongs to (for llms.txt grouping). */
  section: 'Tools' | 'Functions' | 'Examples' | 'Learn' | 'Site';
}

const staticPages: PageRegistryEntry[] = [
  { path: '/', label: 'Home', section: 'Site' },
  { path: '/graphing-calculator/', label: 'Graphing Calculator', section: 'Tools' },
  { path: '/calculators/', label: 'Calculators', section: 'Tools' },
  { path: '/calculators/derivative/', label: 'Derivative Calculator', section: 'Tools' },
  { path: '/calculators/integral/', label: 'Integral Calculator', section: 'Tools' },
  { path: '/calculators/root-finder/', label: 'Root Finder', section: 'Tools' },
  { path: '/scientific-calculator/', label: 'Scientific Calculator', section: 'Tools' },
  { path: '/3d/', label: '3D Graphing', section: 'Tools' },
  { path: '/desmos-alternative/', label: 'Desmos Alternative', section: 'Site' },
  { path: '/math-functions/', label: 'Function Library', section: 'Functions' },
  { path: '/examples/', label: 'Graph Examples', section: 'Examples' },
  { path: '/learn/', label: 'Learn Graphing', section: 'Learn' },
  { path: '/about/', label: 'About', section: 'Site' },
  { path: '/methodology/', label: 'Methodology', section: 'Site' },
  { path: '/contact/', label: 'Contact', section: 'Site' },
  { path: '/privacy-policy/', label: 'Privacy Policy', section: 'Site' },
  { path: '/terms/', label: 'Terms of Service', section: 'Site' },
];

/**
 * Every indexable route on the site, in a stable order.
 *
 * With no argument this returns the English registry exactly as before.
 * For a non-English locale, static paths are prefixed and labels come from
 * the locale dictionary (footer link labels + breadcrumb home label — the
 * one place every static page already has a translated short label), while
 * content-derived entries use the locale's own content data (translated
 * displayName/title) with localized paths.
 */
export function getPageRegistry(locale: Locale = 'en'): PageRegistryEntry[] {
  const localize = (path: string) => localizePath(path, locale);
  const content =
    locale === 'en'
      ? { functions: FUNCTION_PAGES, examples: EXAMPLE_GRAPHS, learn: LEARN_ARTICLES }
      : LOCALE_CONTENT[locale];
  return [
    ...staticPages.map((page): PageRegistryEntry => ({
      ...page,
      path: localize(page.path),
      label: staticPageLabel(page.path, locale),
    })),
    ...content.functions.map((page): PageRegistryEntry => ({
      path: localize(`/math-functions/${page.slug}/`),
      label: page.displayName,
      section: 'Functions',
    })),
    ...content.examples.map((example): PageRegistryEntry => ({
      path: localize(`/examples/${example.slug}/`),
      label: example.title,
      section: 'Examples',
    })),
    ...content.learn.map((article): PageRegistryEntry => ({
      path: localize(`/learn/${article.slug}/`),
      label: article.title,
      section: 'Learn',
    })),
  ];
}

/**
 * Per-locale content data for the registry's data-driven entries.
 * The modules exist for every launch locale; a missing module is a build
 * error by design (fail loud instead of shipping English labels).
 */
const LOCALE_CONTENT = {
  es: { functions: esFunctions, examples: esExamples, learn: esLearn },
  de: { functions: deFunctions, examples: deExamples, learn: deLearn },
  fr: { functions: frFunctions, examples: frExamples, learn: frLearn },
  it: { functions: itFunctions, examples: itExamples, learn: itLearn },
  pt: { functions: ptFunctions, examples: ptExamples, learn: ptLearn },
} as const;

/**
 * Translated short label for a static page (English-canonical path in).
 * Resolves through the locale dictionary: the breadcrumb home label for
 * '/', otherwise the matching footer link label. The English dictionary's
 * footer labels are the long-standing registry labels verbatim, so the
 * English registry is unchanged.
 */
function staticPageLabel(englishPath: string, locale: Locale): string {
  const dict = getDictionary(locale);
  if (englishPath === '/') return dict.chrome.breadcrumbs.homeLabel;
  for (const column of dict.chrome.footer.columns) {
    const link = column.links.find((candidate) => candidate.href === englishPath);
    if (link) return link.label;
  }
  const fallback = staticPages.find((page) => page.path === englishPath);
  return fallback ? fallback.label : englishPath;
}

/**
 * Lazy loader for per-locale content data modules (functions, examples,
 * learn). The translated modules exist for every launch locale
 * (`src/data/seo/<locale>/{functions,examples,learn}.ts`); the dynamic
 * import is guarded so a missing module can never break a build and simply
 * falls back to the English data.
 */
export async function loadLocaleContentData(locale: Locale): Promise<{
  functions: typeof FUNCTION_PAGES;
  examples: typeof EXAMPLE_GRAPHS;
  learn: typeof LEARN_ARTICLES;
}> {
  const english = { functions: FUNCTION_PAGES, examples: EXAMPLE_GRAPHS, learn: LEARN_ARTICLES };
  if (locale === 'en') return english;
  try {
    // Translated modules are expected at these sibling paths, e.g.
    // `src/data/seo/functions.es.ts`. They do not exist yet.
    const [functions, examples, learn] = await Promise.all([
      import(`../../data/seo/functions.${locale}.js`),
      import(`../../data/seo/examples.${locale}.js`),
      import(`../../data/seo/learn.${locale}.js`),
    ]);
    return {
      functions: functions.FUNCTION_PAGES ?? FUNCTION_PAGES,
      examples: examples.EXAMPLE_GRAPHS ?? EXAMPLE_GRAPHS,
      learn: learn.LEARN_ARTICLES ?? LEARN_ARTICLES,
    };
  } catch {
    return english;
  }
}

/**
 * Resolve a human label for a related-link path. Returns the raw path when
 * unknown — the SEO audit test fails on unresolved labels, so typos in
 * content data surface at test time instead of silently shipping.
 *
 * Pass the page's locale explicitly when the path is English-canonical
 * (RelatedLinks does this); otherwise the locale is detected from the path
 * itself, so localized related links resolve on mirrored pages. Paths are
 * compared locale-insensitively so both '/math-functions/' and
 * '/es/math-functions/' resolve against the same entry.
 */
export function resolvePageLabel(path: string, locale?: Locale): string {
  const resolved = locale ?? getLocaleFromPath(path);
  const canonical = stripLocale(path);
  const entry = getPageRegistry(resolved).find(
    (candidate) => stripLocale(candidate.path) === canonical
  );
  return entry ? entry.label : path;
}
