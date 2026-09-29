# Phase 1 Report — AI Graphing Calculator Foundation

**Date:** 2026-09-29
**Scope:** Production foundation only (architecture, calculator shell, state model, engine abstractions, SEO, theme, layout). No graph rendering, no math engine implementation, no AI integration.
**Commit:** `ec41ea0` (local `main` branch; NOT pushed — remote decisions belong to Firoz)
**Stack:** Astro 5.18.2 · React 19.3.0 · TypeScript 5.9.3 (strict) · Tailwind CSS 3.4.18 · ESLint 10 · Prettier 3

---

## Files created

**48 source files** under `src/` + `public/` (63 tracked files total including configs):

**Config / project root (10):** `astro.config.mjs`, `tailwind.config.cjs`, `postcss.config.cjs`, `eslint.config.mjs`, `.prettierrc`, `.prettierignore`, `.gitignore` (incl. `graphing-calculator-phase*.zip`), `package.json` (scripts), `src/env.d.ts`, `src/styles/global.css`

**Pages — 8 routes (9):**
`src/pages/index.astro` (homepage), `src/pages/graphing-calculator/index.astro`,
`src/pages/calculators/index.astro`, `src/pages/about/index.astro`,
`src/pages/contact/index.astro`, `src/pages/privacy-policy/index.astro`,
`src/pages/terms/index.astro`, `src/pages/404.astro`, `src/pages/api/health.ts`

**Layouts / SEO / site chrome (7):** `src/layouts/BaseLayout.astro`,
`src/components/seo/SeoHead.astro`, `src/lib/seo/metadata.ts`,
`src/components/layout/Header.astro`, `src/components/layout/Footer.astro`,
`src/components/layout/Logo.astro` (original SVG mark), `src/components/ui/ThemeToggle.tsx`

**Design system — `src/components/ui/` (11):** `Button`, `TextInput`, `Card`,
`Select`, `Tabs`, `Tooltip`, `Modal`, `Panel`, `Toast` (+`ToastProvider`/`useToast`),
`icons.tsx` (17 original inline SVGs), `index.ts` barrel

**Calculator shell (9):** `src/components/calculator/` → `CalculatorPage`,
`CalculatorToolbar`, `ExpressionPanel`, `ErrorBoundary`, `CalculatorStore`
(context + reducer + localStorage persistence);
`src/components/expressions/` → `ExpressionList`, `ExpressionRow`;
`src/components/graph/` → `GraphPanel`, `GraphCanvasPlaceholder`;
`src/components/ai/` → `AiPanel` (returns `null`; gated by feature flag)

**Types / lib (6):** `src/types/calculator.ts` (Expression discriminated union —
cartesian/parametric/polar/point/inequality/table/text — plus GraphViewport,
GraphSettings, CalculatorState, Point, Slider, Variable),
`src/lib/expressions/expressions.ts` (color palette, factories, summaries),
`src/lib/math/MathEngine.ts` (interface + honest not-implemented stub),
`src/lib/graph/GraphEngine.ts` (interface + placeholder; pure coordinate
transforms only, render methods are no-ops), `src/lib/ai/ai.ts` (request/response
types; `requestAiExplanation()` rejects with `AiNotAvailableError`),
`src/lib/utils/cn.ts`, `src/data/site.ts` (centralized config)

## Files modified

- `src/pages/index.astro` — replaced Astro scaffold starter with the real homepage.
- `src/pages/graphing-calculator/index.astro` — added screen-reader `<h1>` (the only page whose heading lived solely inside the hydrated island).
- `astro.config.mjs`, `.gitignore` — replaced scaffold defaults (React + Tailwind integrations; phase-zip ignore pattern).
- `package.json` — added `typecheck`, `lint`, `format`, `format:check` scripts.
- `.prettierrc` — reformatted to its own code style (single-line JSON → multiline).

No scaffold files were deleted besides the starter homepage content.

## Dependencies added

**Runtime:** `react@19.3.0`, `react-dom@19.3.0`, `@astrojs/react@4.4.2`
**Dev:** `astro@5.18.2` (downgraded from scaffold's v7 — see below), `@astrojs/tailwind@6.0.2`, `tailwindcss@3.4.18`, `postcss`, `autoprefixer`, `typescript@5.9.3`, `eslint@10.11.0`, `@typescript-eslint/parser` + `@typescript-eslint/eslint-plugin@8.71.0`, `eslint-plugin-astro@3.2.1`, `eslint-config-prettier@10.1.8`, `prettier@3.9.9`, `prettier-plugin-astro@1.1.0`
Zero third-party runtime scripts shipped to the browser beyond React itself.

## Architecture decisions

1. **Astro 5, not the scaffolded Astro 7.** `npm create astro@latest` installed Astro 7.3.5, but `@astrojs/tailwind@6` (the Tailwind v3 integration — our convention) only supports Astro ≤ 5. Downgraded to Astro 5.18.2 to keep Tailwind v3.
2. **Astro-first, islands-only hydration.** Verified in `dist/`: static pages hydrate exactly 1 island (ThemeToggle); `/graphing-calculator/` hydrates exactly 2 (ThemeToggle + CalculatorPage). UI kit components render statically with zero JS when no client directive is used.
3. **No-FOUC theme.** Inline `is:inline` head script reads `localStorage` (`graphing-calculator-theme`: light/dark/system) before first paint; toggles the `dark` class + `color-scheme`. ThemeToggle island syncs the same key and listens to OS changes in `system` mode.
4. **Central state, no prop-drilling.** `CalculatorStore` (context + useReducer, 10 typed actions) is the only owner of calculator state; persisted best-effort to localStorage with shape validation and corrupt-payload fallback.
5. **Honest boundaries, no fake math.** `MathEngine` is an interface with a stub that throws `NOT_IMPLEMENTED`; `GraphEngine` placeholder implements only pure coordinate transforms (no rendering); AI module rejects with `AiNotAvailableError`. The graph area is a clearly labeled visible placeholder showing live viewport state (proves store wiring).
6. **SEO from centralized config.** `siteUrl` placeholder `https://example.com` is CLEARLY MARKED in `src/data/site.ts` and `astro.config.mjs`; canonicals/OG are derived from it, so one edit repoints the whole site. No keyword stuffing; 404 is `noindex`.
7. **Accessibility baseline.** Skip link, landmarks, one `<h1>` per page, `aria-current` nav, roving-tabindex Tabs, labeled form controls, `role="alert"` error boundaries (expression list and graph are isolated so one failure can't crash the page).
8. **Original identity.** Logo, icons, and copy are drawn/written for this project; no Desmos branding, assets, or code.

## Commands used for validation

| Command | Result |
|---|---|
| `npx tsc --noEmit` | exit 0, 0 errors (caught & fixed: 1 wrong import depth; 1 React 19 `JSX` namespace usage) |
| `npx eslint .` | exit 0, 0 errors, 0 warnings |
| `npx prettier --check .` | all files pass |
| `npm run build` | success — **8 pages** (`/`, `/graphing-calculator/`, `/calculators/`, `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/404/` + `/api/health`) |
| `dist/` inspection | canonicals absolute & correct on all pages; OG/Twitter tags present; robots `index, follow` (pages) / `noindex, nofollow` (404); theme script in `<head>`; exactly 1 `<h1>` per page; island count 1 static / 2 calculator; `dark:` classes present; skip link + `aria-current` present; `/api/health` returns `{"status":"ok","service":"ai-graphing-calculator"}` |

Client JS budget: React renderer 211 kB (66 kB gzip) + CalculatorPage 14.6 kB + ThemeToggle/icons ~9 kB — only loaded on pages using the islands.

## Build result

✅ **PASS** — production build clean, all quality gates green, all 8 routes render, metadata/theme/hydration verified. First commit `ec41ea0` on local `main`. **HARD STOP — Phase 2 not started.**

## Remaining non-blocking issues

1. **Production domain is a placeholder.** `siteUrl: 'https://example.com'` (+ `contact@example.com`) is marked in `src/data/site.ts`; replace before launch or canonicals/OG point at the placeholder.
2. **Social links are placeholders.** Footer renders them as "soon" text (never dead `#` links) until real profiles exist.
3. **Zoom semantics judgment call.** Toolbar "Zoom in" multiplies the viewport range by 0.8 and "Zoom out" by 1.25 (semantically correct); trivially swappable if literal factors were intended.
4. **Dual theme writers.** `ThemeToggle` (header, outside provider) and `CalculatorStore`'s theme effect both write the theme key; last write wins and both derive from the same stored value. Unify in a later phase if it ever causes a visible conflict.
5. **No automated tests yet.** Phase 1 has no test runner; recommend adding one when Phase 2 lands the interactive graph engine.
6. **Contact page has no form** (no backend in Phase 1 by design) — mailto link only.
