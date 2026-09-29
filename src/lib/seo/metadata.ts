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

/** One breadcrumb trail item. */
export interface BreadcrumbItem {
  label: string;
  /** Root-relative path; omit for the current page (no link). */
  href?: string;
}

/**
 * BreadcrumbList JSON-LD for a trail of pages.
 * https://schema.org/BreadcrumbList
 */
export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: buildCanonical(item.href) } : {}),
    })),
  };
}

/**
 * FAQPage JSON-LD. Answers are plain text rendered from the page's own
 * visible FAQ content — never generated or fetched from elsewhere.
 * https://schema.org/FAQPage
 */
export function faqSchema(faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

/**
 * Article JSON-LD for learn articles. No author identity is fabricated:
 * the publisher is the site itself.
 * https://schema.org/Article
 */
export function articleSchema(input: {
  path: string;
  headline: string;
  description: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: buildCanonical(input.path),
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: buildCanonical('/'),
    },
  };
}

/**
 * WebApplication JSON-LD for the calculator landing page. Claims only what
 * the app actually does: plotting expressions, analysis, and AI assistance.
 * No ratings, reviews, or offers are included (none exist).
 * https://schema.org/WebApplication
 */
export function webApplicationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    url: buildCanonical('/graphing-calculator/'),
    description: siteConfig.description,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any (web browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}
