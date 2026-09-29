# I18N QA Report — 5-Language Localization

**Date:** 2026-09-29
**Scope:** `es`, `de`, `fr`, `it`, `pt` at `/es/`, `/de/`, `/fr/`, `/it/`, `/pt/`
**Worker:** i18n QA (no commit, no push, no deploy — working tree only)
**Contract:** `docs/I18N-CONTRACTS.md`

## Summary

The 5-language localization passes QA. All 200 localized pages render fully
translated UI with correct `<html lang>`, localized canonicals, a complete
BCP-47 hreflang set (`en`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `pt-BR`,
`x-default`), OG locale + alternates, valid JSON-LD, and translated SEO
metadata. Seven genuine defects were found and fixed (4 code, 3 translation
content). Full gates are green: **645/645 tests (47 files), `tsc` clean,
`eslint` clean, `npm run build` clean.**

## Architecture (as audited)

- **Dictionaries:** `src/i18n/{en,es,de,fr,it,pt}/` — **16 namespaces × 6
  locales** (`chrome`, `a11y`, `errors`, `home`, `calculator`, `graph3d`,
  `scientific`, `calculators`, `functions`, `examples`, `learn`, `about`,
  `methodology`, `desmosAlt`, `contact`, `legal`). `getDictionary(locale)` is
  the single accessor; unknown locales fall back to `en`.
- **Routing helpers** (`src/i18n/locales.ts`): `localizePath`,
  `stripLocale`, `getLocaleFromPath`, `htmlLangFor`, `ogLocaleFor`, `format`
  (`{name}` templates).
- **Source templates:** 21 Astro templates per locale
  (`src/pages/{es,de,fr,it,pt}/`), 105 total. Three are `[slug]` dynamic
  templates (`math-functions`, `learn`, `examples`) expanding from the
  translated content-data modules.
- **Translated content data:** `src/data/seo/{locale}/{functions,learn,
examples}.ts` — 10 function pages + 6 learn articles + 6 example graphs
  per locale (slugs stay English; prose translated; math byte-identical).
- **Rendered output:** 40 pages per locale → **200 localized pages**; full
  build produces **243 HTML pages** (43 English + 200 localized).
- **Legal-body exception (by design):** localized `/privacy-policy/`,
  `/terms/`, `/disclaimer/` keep the authoritative English legal text and
  headings, and every one of the 15 pages carries a translated legal notice
  stating the English text controls (verified present on all 15).

## QA checklist and results

| #   | Check                                                                                                         | Result                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1   | Dictionary key/nesting/array-shape parity (en vs each locale, recursive)                                      | ✅ 5/5 pass (vitest)                                                               |
| 2   | `{placeholder}` parity, both directions                                                                       | ✅ pass — 8 deliberate es/pt morphology adaptations documented in-test (see §Bugs) |
| 3   | `getDictionary` returns genuine translations                                                                  | ✅ pass (probes differ from en in all 5)                                           |
| 4   | `localizePath` examples + `stripLocale` round-trip                                                            | ✅ pass                                                                            |
| 5   | All 105 templates generate their expected 200 built routes                                                    | ✅ 21 templates × 5 locales; 40 routes each; all exist in `dist/`                  |
| 6   | Built HTML: `<html lang>`, localized canonical, full hreflang set, OG locale + alternates                     | ✅ all 200 pages                                                                   |
| 7   | Sitemap covers all 200 locale URLs; robots.txt unchanged                                                      | ✅ `sitemap-0.xml` complete; robots has no locale rules                            |
| 8   | 22 data-driven descriptions per locale within 120–155 chars                                                   | ✅ 110/110 (12 were over; trimmed — see §Bugs)                                     |
| 9   | Math syntax equality (`slug`, `notation`, `expression`, `tryExpressions`, `expressions` sans display `label`) | ✅ byte-identical to en                                                            |
| 10  | JSON-LD parses on all 200 locale pages                                                                        | ✅                                                                                 |
| 11  | English regression (`/`, `/graphing-calculator/`, `/about/`)                                                  | ✅ `lang="en"`, English canonicals, hreflang intact                                |
| 12  | Stray-English scan of all 200 built pages (word markers + verbatim en-dict strings)                           | ✅ 0 genuine hits outside the allowlist                                            |
| 13  | Translated legal notice on all 15 legal pages                                                                 | ✅ 15/15                                                                           |
| 14  | LanguageSwitcher fallback for unmirrored routes                                                               | ✅ `/404/`, `/500/`, `/graph/` → `/{locale}/` (was 404s)                           |
| 15  | Locale internal links resolve; no orphan pages (BFS from each locale home)                                    | ✅ 40/40 reachable per locale; 0 broken links                                      |
| 16  | English page-registry labels unchanged by locale refactor                                                     | ✅ locked in vitest                                                                |

## Bugs found and fixed

### Code fixes

1. **hreflang / x-default pointed at localized URLs** (`SeoHead.astro`).
   Localized pages passed their localized path as the canonical, so
   `hreflang="en"` and `x-default` pointed at `/es/` instead of `/`. Fixed by
   deriving the English path via `stripLocale(canonicalPath)`. English output
   unchanged (`stripLocale` is identity for English paths).
2. **LanguageSwitcher linked to nonexistent locale pages**
   (`LanguageSwitcher.astro`). `/404/`, `/500/`, `/graph/` linked to
   `/es/404/` etc., which don't exist. Added explicit mirrored exact routes
   and mirrored prefixes (`/calculators/`, `/examples/`, `/learn/`,
   `/math-functions/`); unmirrored routes now fall back to `/{locale}/`.
3. **Related-link labels rendered in English on locale pages**
   (`page-registry.ts`). `RelatedLinks.astro` passed `locale` to
   `resolvePageLabel`, which accepted only one argument, and locale registry
   entries reused English labels/data. The registry now statically imports all
   15 locale content modules, uses translated footer/breadcrumb labels, and
   `resolvePageLabel(path, locale?)` resolves canonical and prefixed paths.
   English registry labels verified byte-identical to before.
4. **Stale `loadLocaleContentData` loader** — left untouched (dead code, never
   called; its `functions.${locale}.js` guess-paths don't exist and it falls
   back to English). Flagged for the owning workstream, not removed, to keep
   this QA pass behavior-neutral.

### Translation-content fixes

5. **12 SEO descriptions over 155 chars** (1 es, 3 de, 5 fr, 1 it, 2 pt) —
   meaning-preserving trims in `src/data/seo/{locale}/{examples,functions,
learn}.ts`. All 110 now within 120–155.
6. **fr `/contact/` title `Contact` duplicated en `/contact/` title** (seo-audit
   title-uniqueness gate) → retitled `Nous contacter`.
7. **it `/disclaimer/` title `Disclaimer` duplicated en `/disclaimer/` title**
   → retitled `Avvertenze legali` (on-page legal heading unchanged).
8. **de `/contact/` meta description 39 chars** (audit minimum is 50) →
   extended to `So erreichen Sie uns zum Grafikrechner: Fragen, Feedback und
Hilfe.` (67 chars).

### Deliberate, documented non-changes

- **es/pt `{plural}` / `{isAre}` placeholders** were intentionally replaced by
  translators with target-language morphology (`expresión(es)`,
  `expressão(ões)`, `raiz(es) encontrada(s)`), because the call sites compute
  English `""`/`"s"` plurals that are wrong in Spanish/Portuguese
  (`expresión` → `expresiones`, not `expresións`). No raw `{...}` text can
  leak (every placeholder the translations _do_ use is provided by the call
  site — asserted in both directions by vitest). Making the components
  plural-aware would change calculator UI behavior and is out of scope.
- **Italian `Home`** in breadcrumbs/logo aria-label is accepted translator
  intent (standard Italian UX term), not stray English.
- **Allowlisted English on locale pages:** brand `Graphing Calculator`,
  math/code/notation, URLs/slugs, authoritative English legal bodies,
  nominative `Desmos`, creator identity/links, deferred ThemeToggle runtime
  string (`Theme: system. Activate to switch theme.`), deferred
  supporting-library parser/engine errors.

## Stray-English scan methodology

Two complementary scans over all 200 built pages (scripts/styles/SVG/island
payloads stripped; visible text + user-facing aria/title attributes checked):

1. **Marker-word scan** with Unicode-aware boundaries and per-locale
   false-friend exclusions (de `All`/`also`/`Graph`, fr `point`/`mode`/`radians`,
   it `area`/`curve`/`note`, es `use`, pt `for`, …): 1,829 initial candidates
   → **0 genuine hits** after refinement.
2. **Verbatim scan:** every en dictionary string (≥20 chars) searched in every
   locale page: **0 genuine hits** (one substring collision with the
   allowlisted legal body, confirmed false positive).

## Gate results (final, 2026-09-29 ~13:10 IST)

- `npx tsc --noEmit` — clean
- `npx eslint .` — clean
- `npx prettier --check .` — all files touched by this QA pass are clean; 41
  pre-existing warnings remain in the translation workstream's files
  (untouched by this pass)
- `npm run build` — clean, 243 HTML pages, sitemap generated
- `npm test` — **645/645 pass (47 files)**: 564 pre-existing + **81 new** in
  `tests/i18n-locales.test.ts` (vitest `include` extended to `tests/`)
- Pre-existing `seo-audit` suite: green, including internal-link resolution
  and no-orphan checks

No commit, push, or deploy performed. No calculator logic, math, or UI
behavior changed; English rendered output verified unchanged (spot-checked
`dist/index.html`, `dist/graphing-calculator/index.html`, `dist/about/`
canonicals/hreflang/lang).

## Honest gaps / open items

- **React-island strings are not yet wired** (per `I18N-CONTRACTS.md`, the
  islands still carry their own literals). The dictionaries contain island
  strings and the QA above covers them at the dictionary level, but the
  rendered calculator UI islands remain English until the island refactor
  lands — the largest remaining user-visible gap.
- **DeepSeek provider may reply in English** (mock/real); translated AI
  suggestion chips assume multilingual AI parsing.
- **ThemeToggle runtime string** and **supporting-library parser/engine
  errors** remain English by deferral (allowlisted).
- **No real-browser/device testing** by this worker (static build analysis
  only).
- `contact@example.com` is still a placeholder; DeepSeek API key still
  pending (mock mode).
- `loadLocaleContentData` dead code with stale comments left for the owning
  workstream.
