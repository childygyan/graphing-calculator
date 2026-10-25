/**
 * Learn-article translation mirrors.
 *
 * Only 6 of the 25 English learn articles are translated into each locale
 * (the same 6 slugs everywhere). The language switcher and the hreflang
 * alternates used to blindly localize every /learn/<slug>/ URL, which
 * linked to 19 × 5 nonexistent locale article pages (all 404).
 *
 * These helpers let both components check, per target locale, whether a
 * learn slug actually has a translation there. Anything outside
 * /learn/<slug>/ is unaffected — the other mirrored sections are fully
 * translated, so their locale URLs always exist.
 */
import { LEARN_ARTICLES as ES_LEARN } from '../data/seo/es/learn.js';
import { LEARN_ARTICLES as DE_LEARN } from '../data/seo/de/learn.js';
import { LEARN_ARTICLES as FR_LEARN } from '../data/seo/fr/learn.js';
import { LEARN_ARTICLES as IT_LEARN } from '../data/seo/it/learn.js';
import { LEARN_ARTICLES as PT_LEARN } from '../data/seo/pt/learn.js';
import type { Locale } from './locales.js';

const LEARN_SLUGS: Record<Exclude<Locale, 'en'>, ReadonlySet<string>> = {
  es: new Set(ES_LEARN.map((article) => article.slug)),
  de: new Set(DE_LEARN.map((article) => article.slug)),
  fr: new Set(FR_LEARN.map((article) => article.slug)),
  it: new Set(IT_LEARN.map((article) => article.slug)),
  pt: new Set(PT_LEARN.map((article) => article.slug)),
};

/**
 * The learn-article slug of an English-canonical path, or null when the
 * path is not a learn article page (hub, other sections, homepage).
 */
export function learnSlugFromPath(path: string): string | null {
  const match = /^\/learn\/([^/]+)\/?$/.exec(path);
  return match ? match[1] : null;
}

/**
 * Whether a learn slug has a page under the given locale. English always
 * counts as existing: it is the source language, and a caller asking about
 * a slug is already looking at a page that exists in some language.
 */
export function learnSlugExistsInLocale(slug: string, locale: Locale): boolean {
  if (locale === 'en') return true;
  return LEARN_SLUGS[locale].has(slug);
}
