/**
 * Page registry — the single source of truth for every indexable route.
 *
 * Data-driven pages (functions, examples, learn) derive their entries from
 * the content data files, so adding a content entry automatically registers
 * its route everywhere: related-links labels, llms.txt, and the SEO audit.
 * Static pages are listed explicitly. Excluded from indexing: /graph/
 * (noindex share route), /api/*, and /404/.
 */

import { FUNCTION_PAGES } from '../../data/seo/functions.js';
import { EXAMPLE_GRAPHS } from '../../data/seo/examples.js';
import { LEARN_ARTICLES } from '../../data/seo/learn.js';

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
  { path: '/math-functions/', label: 'Function Library', section: 'Functions' },
  { path: '/examples/', label: 'Graph Examples', section: 'Examples' },
  { path: '/learn/', label: 'Learn Graphing', section: 'Learn' },
  { path: '/about/', label: 'About', section: 'Site' },
  { path: '/contact/', label: 'Contact', section: 'Site' },
  { path: '/privacy-policy/', label: 'Privacy Policy', section: 'Site' },
  { path: '/terms/', label: 'Terms of Service', section: 'Site' },
];

/**
 * Every indexable route on the site, in a stable order.
 */
export function getPageRegistry(): PageRegistryEntry[] {
  return [
    ...staticPages,
    ...FUNCTION_PAGES.map((page): PageRegistryEntry => ({
      path: `/math-functions/${page.slug}/`,
      label: page.displayName,
      section: 'Functions',
    })),
    ...EXAMPLE_GRAPHS.map((example): PageRegistryEntry => ({
      path: `/examples/${example.slug}/`,
      label: example.title,
      section: 'Examples',
    })),
    ...LEARN_ARTICLES.map((article): PageRegistryEntry => ({
      path: `/learn/${article.slug}/`,
      label: article.title,
      section: 'Learn',
    })),
  ];
}

/**
 * Resolve a human label for a related-link path. Returns the raw path when
 * unknown — the SEO audit test fails on unresolved labels, so typos in
 * content data surface at test time instead of silently shipping.
 */
export function resolvePageLabel(path: string): string {
  const entry = getPageRegistry().find((candidate) => candidate.path === path);
  return entry ? entry.label : path;
}
