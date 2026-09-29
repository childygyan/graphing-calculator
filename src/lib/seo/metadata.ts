import { siteConfig } from '../../data/site';

/**
 * Props every page passes to the SEO head component.
 * Pages own their full title/description strings; this layer only renders them.
 */
export interface SeoProps {
  title: string;
  description: string;
  /** Root-relative path (e.g. '/calculators/'); defaults to the current page path. */
  canonicalPath?: string;
  /** Full robots directive; overridden by `noindex`. */
  robots?: string;
  /** Root-relative path to the social share image; rendered absolute. */
  ogImage?: string;
  /** Open Graph type; defaults to 'website'. */
  ogType?: string;
  /** When true, renders `noindex, nofollow` regardless of `robots`. */
  noindex?: boolean;
}

/**
 * Build an absolute canonical URL from a root-relative path.
 * Leading slashes are normalized and trailing slashes on the site URL
 * are stripped so the result never contains a doubled slash.
 */
export function buildCanonical(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = siteConfig.siteUrl.replace(/\/+$/, '');
  return `${base}${normalizedPath}`;
}
