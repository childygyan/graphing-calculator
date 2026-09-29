# I18N Contracts — Graphing Calculator

**Status:** foundation only. English is fully extracted; `es`, `de`, `fr`, `it`, `pt` resolve to the English dictionary (fallback) until the translation coordinator wires real locale dictionaries.

## What this foundation provides

- `src/i18n/locales.ts` — locale list (`en`, `es`, `de`, `fr`, `it`, `pt`), `isLocale`, `getLocaleFromPath`, `stripLocale`, `localizePath`, `htmlLangFor`, `ogLocaleFor`, `format`.
- `src/i18n/types.ts` — the typed contract for every namespace (English is the shape contract).
- `src/i18n/en/*.ts` — the English dictionaries, plus the aggregate `src/i18n/en/index.ts`.
- `src/i18n/index.ts` — public entry; `getDictionary(locale)` is the single way to obtain a dictionary. No-argument (or `'en'`) calls return English; every non-English locale currently falls back to English by design.
- `defineLocale(dictionary)` — the parameter type forces every namespace to be present and correctly shaped; a missing key is a compile error.

## Namespaces

| Namespace     | Key           | Covers                                                                                                                              |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `chrome`      | `chrome`      | Skip link, logo aria label, nav, language switcher, footer, breadcrumbs labels, FAQ/related default headings, modal, theme template |
| `a11y`        | `a11y`        | Shared accessible names/descriptions for islands                                                                                    |
| `errors`      | `errors`      | 404/500 pages, error boundary, AI API errors                                                                                        |
| `home`        | `home`        | Homepage SEO, hero, feature cards, explore cards                                                                                    |
| `calculator`  | `calculator`  | Graphing-calculator page prose + all calculator island/library strings                                                              |
| `graph3d`     | `graph3d`     | `/3d/` page prose + Graph3D island strings                                                                                          |
| `scientific`  | `scientific`  | `/scientific-calculator/` page prose + keypad strings                                                                               |
| `calculators` | `calculators` | `/calculators/` hub + derivative/integral/root-finder pages and MathTools strings                                                   |
| `functions`   | `functions`   | `/math-functions/` index prose + `[slug]` template labels                                                                           |
| `examples`    | `examples`    | `/examples/` index prose + `[slug]` template labels                                                                                 |
| `learn`       | `learn`       | `/learn/` index prose + article template labels + month names                                                                       |
| `about`       | `about`       | `/about/` page prose + creator section                                                                                              |
| `methodology` | `methodology` | `/methodology/` page prose                                                                                                          |
| `desmosAlt`   | `desmosAlt`   | `/desmos-alternative/` page prose + comparison table                                                                                |
| `contact`     | `contact`     | `/contact/` page prose                                                                                                              |
| `legal`       | `legal`       | Privacy policy, terms, disclaimer pages                                                                                             |

## Future React-island `strings` prop pattern

The dictionaries already contain the island strings (expression panel, variables, analysis, persistence dialogs, AI assistant, parser messages, 3D plotter, scientific keypad, MathTools), but the React components and the math/parser modules **still carry their own literals — nothing is wired yet**. When the island refactor lands:

1. Each island receives a `strings` prop typed from its dictionary slice (e.g. `CalculatorShellStrings['expressions']`).
2. Pages resolve `getDictionary(locale)` at build time and pass the slice down.
3. Templates (`{name}` placeholders) are resolved with `format` from `src/i18n/locales.ts`.
4. Mathematical notation (f′(x), ∫, θ, DEG/RAD-adjacent symbols) inside template strings is never translated — see the DO-NOT-TRANSLATE list.

Do not refactor the islands in this phase. Wiring a `strings` prop before the coordinator says so risks behavior drift.

## Mirrored locale pages

Future locale routes (`/es/graphing-calculator/`, …) mirror the English pages one-to-one: same components, same structure, translated strings. English URLs stay unprefixed; non-English URLs carry a locale prefix (`localizePath`). `stripLocale` recovers the canonical English path from any localized URL (used by the language switcher and active-nav detection).

## Localized internal links and canonicals

- `Header`, `Footer`, `Breadcrumbs`, `RelatedLinks`, and `ToolPageShell` accept an optional `locale` (default `'en'`) and localize internal hrefs via `localizePath`. English output is byte-identical to before.
- `SeoHead` renders `hreflang` alternates for all six locales plus `x-default`, the current `og:locale`, and `og:locale:alternate` entries. Canonicals use the localized path, so each locale page canonicalizes to itself.
- `LanguageSwitcher` (native `<details>/<summary>`, CSS-only) preserves the current route via `stripLocale` + `localizePath`; the current locale's entry carries `aria-current="true"`.

## Locale-specific SEO data modules

`src/lib/seo/page-registry.ts`:

- `getPageRegistry(locale = 'en')` — no-argument calls return the English registry exactly as before (same order, same labels), so `llms.txt.ts` and the SEO audit are untouched.
- Static paths are prefixed for non-English locales; their labels fall back to English until translations exist.
- `resolvePageLabel(path)` detects the locale from the path and searches the matching registry.
- `/disclaimer/` is deliberately absent from the registry (it ships `noindex`) for all locales.
- `loadLocaleContentData(locale)` is a lazy, fallback-safe loader for future per-locale content modules (`functions.es.ts`, …). The modules do not exist yet; the loader returns English data when they are missing and can never break a build. **Never statically import a locale content module that does not exist.**

## DO-NOT-TRANSLATE

- URL slugs, expression syntax (`x^2`, `sin(x)`, `log10(`), `tryExpressions`, mathematical notation, `reviewedOn` values (only the surrounding date _format_ localizes via the month-name arrays).
- Code identifiers, API routes (`/api/ai/math`), provider names used nominatively (DeepSeek), and the site-config contact email placeholder.
- Creator profile URLs and link labels on `/about/`.
- On `/desmos-alternative/`: "Desmos" appears only in nominative comparative use; state only publicly well-known facts about Desmos; no invented statistics or branding.

## Current English fallback

`getDictionary('es' | 'de' | 'fr' | 'it' | 'pt')` returns the English dictionary. Mirrored locale pages therefore render correct English copy today; the translation coordinator replaces the fallback per namespace by wiring real `defineLocale` dictionaries.

## Explicitly deferred

- **Island wiring.** Dictionaries are the source of truth; React islands and the math/parser libraries still use their own literals. Zero calculator-logic changes in this phase.
- **Supporting-library error localization.** Parser/tokenizer/engine/storage error strings are catalogued in the dictionaries but remain unwired for the same reason.
- **Per-function / per-example / per-article content** (`displayName`, `tagline`, `story`, `sections`, `faqs`, …) stays in `src/data/seo/*.ts`. Only page shells and template labels are dictionary-driven; translated content modules arrive via the coordinator.

## Adaptations between page sources and dictionary structures

- `ToolPageShell` prose maps to `sections` / `faqs` / `related` arrays with explicit `crumbs`, `heading`, `intro`.
- The methodology page's inline anchors (`Graphing Calculator`, `learn guides`, `privacy policy`, `contact us`) are represented per-section in `links`; the label text appears in the body at the same position and hrefs are re-localized at render time.
- `desmosAlt.table` separates `headers` and `rows` so columns reflow per locale; `ours` = the Graphing Calculator column.
- The learn template keeps both full and short month-name arrays because the article page (`Last reviewed: {date}`) and the index card (`Reviewed for accuracy · {date}`) use different date formats.
- `FaqBlock` still consumes `ContentFaq` (`q`/`a`); dictionary `FaqStrings` uses `question`/`answer` — page builders map between them.
- `contact.emailNote` holds the "no form" honesty note; the email address itself comes from `siteConfig.contactEmail` and is never translated.
