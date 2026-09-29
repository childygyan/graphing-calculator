/**
 * locales.ts — the locale registry for the site's i18n foundation.
 *
 * Six supported locales: English (default, the only fully translated
 * locale today) plus Spanish, German, French, Italian, and Portuguese.
 * English is intentionally unprefixed in URLs (`/graphing-calculator/`);
 * every other locale is prefixed (`/es/graphing-calculator/`).
 *
 * These helpers are pure and dependency-free so both Astro components and
 * React islands can import them without pulling in dictionaries.
 */

export const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'pt'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMetadata {
  /** English display name, used in language lists for sighted context. */
  label: string;
  /** Native display name, e.g. "Español" — always shown to the user. */
  nativeLabel: string;
  /** BCP 47 tag for `lang` attributes, hreflang, and metadata. */
  htmlLang: string;
  /** Text direction. All six launch locales are left-to-right. */
  dir: 'ltr';
}

export const LOCALE_METADATA: Record<Locale, LocaleMetadata> = {
  en: { label: 'English', nativeLabel: 'English', htmlLang: 'en-US', dir: 'ltr' },
  es: { label: 'Spanish', nativeLabel: 'Español', htmlLang: 'es-ES', dir: 'ltr' },
  de: { label: 'German', nativeLabel: 'Deutsch', htmlLang: 'de-DE', dir: 'ltr' },
  fr: { label: 'French', nativeLabel: 'Français', htmlLang: 'fr-FR', dir: 'ltr' },
  it: { label: 'Italian', nativeLabel: 'Italiano', htmlLang: 'it-IT', dir: 'ltr' },
  pt: { label: 'Portuguese', nativeLabel: 'Português', htmlLang: 'pt-BR', dir: 'ltr' },
};

/**
 * Type guard for locale values coming from URLs, user input, or config.
 */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

const LOCALE_PREFIX_PATTERN = new RegExp(
  `^/(${LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).join('|')})(/|$)`
);

/**
 * Detect the locale from a root-relative pathname. Only the non-English
 * locales carry a path prefix, so anything else — including '/' — is
 * English.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const match = LOCALE_PREFIX_PATTERN.exec(pathname);
  if (match && isLocale(match[1])) return match[1];
  return DEFAULT_LOCALE;
}

/**
 * Remove a locale prefix from a pathname, returning the English-canonical
 * path. '/es/graphing-calculator/' → '/graphing-calculator/'; '/' stays '/'.
 */
export function stripLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  const stripped = pathname.slice(`/${locale}`.length);
  return stripped === '' ? '/' : stripped;
}

/**
 * Prefix a root-relative path with a locale. English paths are returned
 * unchanged so existing links never gain a prefix by accident.
 */
export function localizePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  const canonical = stripLocale(path);
  if (canonical === '/') return `/${locale}/`;
  return `/${locale}${canonical}`;
}

/**
 * Value for the `<html lang>` attribute. English keeps its long-standing
 * `lang="en"` value so the existing English HTML stays byte-identical;
 * other locales use their BCP 47 tag from LOCALE_METADATA.
 */
export function htmlLangFor(locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return 'en';
  return LOCALE_METADATA[locale].htmlLang;
}

/**
 * Open Graph locale tag value, e.g. 'en_US'. The OG convention uses an
 * underscore where BCP 47 uses a hyphen.
 */
export function ogLocaleFor(locale: Locale): string {
  return LOCALE_METADATA[locale].htmlLang.replace('-', '_');
}

/**
 * Tiny template formatter: replaces `{name}` placeholders with the
 * matching value from `vars`. Unknown placeholders are left in place so
 * a missing value is visible instead of silently vanishing.
 */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
  );
}
