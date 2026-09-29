/**
 * i18n public entry point.
 *
 * Everything pages and components need for localization: the locale list
 * and helpers (`locales.ts`), the dictionary types (`types.ts`), and the
 * dictionary resolver. `getDictionary(locale)` is the single way to obtain
 * a dictionary at build time.
 *
 * English is currently the only translated dictionary. Every non-English
 * locale resolves to the English dictionary until the translation
 * coordinator wires real locale dictionaries — this is the deliberate
 * fallback foundation for the mirrored locale pages (see
 * docs/I18N-CONTRACTS.md). A `getDictionary` call with no locale argument
 * is the same as `getDictionary('en')`.
 */

import { DEFAULT_LOCALE, type Locale } from './locales.js';
import { en } from './en/index.js';
import { es } from './es/index.js';
import { de } from './de/index.js';
import { fr } from './fr/index.js';
import { it } from './it/index.js';
import { pt } from './pt/index.js';
import type { DictionaryResolver, LocaleDictionary } from './types.js';

export * from './locales.js';
export * from './types.js';
export { en, es, de, fr, it, pt };

export const getDictionary: DictionaryResolver = (locale: Locale = DEFAULT_LOCALE) => {
  switch (locale) {
    case 'es':
      return es satisfies LocaleDictionary;
    case 'de':
      return de satisfies LocaleDictionary;
    case 'fr':
      return fr satisfies LocaleDictionary;
    case 'it':
      return it satisfies LocaleDictionary;
    case 'pt':
      return pt satisfies LocaleDictionary;
    case 'en':
    default:
      return en satisfies LocaleDictionary;
  }
};
