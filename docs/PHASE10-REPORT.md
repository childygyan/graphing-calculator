# Phase 10 Report — Production Launch (FINAL)

**Date:** 2026-09-29 · **Scope:** production configuration, audits, docs, and
Cloudflare deployment. **No new product features.**
**Base:** Phase 9 (`425b642` local) · **Result:** complete, deployed, all
gates green. **Version 1.0.0.**

## What changed

### Runtime & deployment configuration

- **Cloudflare adapter installed** (`@astrojs/cloudflare@12.6.13`).
  `astro.config.mjs` uses `output: 'static'` + the adapter — in Astro 5.18 the
  old `output: 'hybrid'` is removed; static-with-adapter is its replacement
  (prerendered pages + on-demand server routes in the Pages worker).
- **Critical fix found and fixed this phase:** `src/pages/api/ai/math.ts`
  (and `src/pages/api/health.ts`) were missing `export const prerender = false`,
  so the adapter's generated `_routes.json` **excluded** `/api/*` from the
  worker — the AI endpoint would have returned 404 in production. After the
  fix, `_routes.json` includes `/api/*` (verified in the built output).
- **AI endpoint env order:** Cloudflare runtime bindings
  (`locals.runtime.env`) → `process.env` → `import.meta.env`; reads
  `DEEPSEEK_API_KEY` and optional `DEEPSEEK_MODEL`. No key → deterministic
  mock provider, response labeled `mock: true`. AI JSON responses carry
  `no-store`, `nosniff`, `no-referrer`, `X-Frame-Options: DENY`.
- **`siteUrl` set to the production origin** in `src/data/site.ts` and
  `astro.config.mjs`: `https://graphing-calculator-edh.pages.dev`. Canonicals,
  sitemap (36 URLs), robots, and OG tags verified against the built output.
  Only `contact@example.com` remains a placeholder (known issue).
- **Version bumped to 1.0.0.**

### Legal, branding, error pages

- New `/disclaimer/` page (honest AI + numerical limitations), new `500.astro`
  fallback, privacy policy corrected (no accounts/analytics/cookies; AI
  messages + compact calculator context go to `/api/ai/math`; DeepSeek sees
  them only if a key is configured; mock mode documented).
- Generated `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`,
  `site.webmanifest`; favicon/manifest links in `SeoHead.astro`. **PWA
  decision: not a PWA** — no service worker (stale cached math is riskier
  than the limited offline benefit); manifest kept for installability metadata.
- Disclaimer added to the footer Legal column.

### Docs

- New: `CONTRIBUTING.md`, `CHANGELOG.md`, `RELEASE_CHECKLIST.md`,
  `docs/PRODUCTION_AUDIT.md` (this report's companion — full audit tables),
  and this report.
- `README.md` rewritten: setup, architecture, env-var table, AI modes,
  validation commands, Cloudflare deploy notes.

## Deployment

- **Method:** Cloudflare Pages via `wrangler pages deploy` (official CLI),
  project `graphing-calc` (direct-upload, not git-connected), with a minimal
  API-only worker bundle (`_worker.js`, ~39 KB, no React SSR).
- **Production URL:** `https://graphing-calc.pages.dev`
- **Final deployment:** `508c1099` (2026-09-29), status success.
- **Deployment notes (honest record):**
  1. The sandbox's `cf-wrangler` wrapper hardcodes
     `cwd=~/workspace/height-calculator`; passing `.` uploaded 4,527 Height
     Calculator files to the graphing project. Always pass an absolute path.
  2. The Astro Cloudflare adapter's full worker bundle fails at runtime with
     `MessageChannel is not defined` (React DOM server code); `nodejs_compat`
     does not fix it. The minimal API worker avoids React entirely.
  3. Cloudflare Pages treats a top-level `functions/` directory as Pages
     Functions — wrangler silently skips uploading static files there. The
     `/functions/` content routes were renamed to `/math-functions/` (with
     301 redirects from the old paths); all 57 assets then uploaded.
  4. `siteUrl` is `https://graphing-calc.pages.dev` in `src/data/site.ts`
     and `astro.config.mjs`. Canonicals, sitemap, robots, and OG tags
     verified against the live site. Only `contact@example.com` remains a
     placeholder (known issue).

## Validation (all on 2026-09-29)

| Gate                                                                | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tsc --noEmit`                                                      | 0 errors                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ESLint                                                              | 0 errors, 0 warnings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Prettier                                                            | clean                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Vitest                                                              | **478/478 pass** (41 files)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Cloudflare-adapter production build                                 | clean                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SEO crawl over `dist/`                                              | 39 pages, 39/39 unique titles/descriptions/canonicals, 0 broken internal links, sitemap 36 URLs, `/graph/` noindex + robots-disallowed                                                                                                                                                                                                                                                                                                                                                                                                  |
| Math spot checks (engine)                                           | 10/10 pass (roots ±√2, ±√3/0; ∫₀¹x²=1/3; ∫₀^π sin=2; derivatives; limit sin x/x; implicit mult; extrema ±1)                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Stress                                                              | 272,059 evals / 228.5 ms (20 exprs, ±50 viewport, 1920×1080)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Budgets                                                             | JS 123.3 KB ≤ 150 KB; CSS 6.4 KB ≤ 12 KB                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Worker-bundle harness (exact production bundle, CF globals stubbed) | **11/11 pass**: `GET /api/health` 200; `POST /api/ai/math` 200 with `mock:true` + `provider:"mock"`; `no-store`/`nosniff`/`DENY`/`no-referrer`; invalid body → 400                                                                                                                                                                                                                                                                                                                                                                      |
| `_routes.json`                                                      | `/api/*` routes to the worker (was excluded before the prerender fix)                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Dependency/license review                                           | 333 packages, no GPL/AGPL; `zod-to-ts` MIT confirmed via shipped LICENSE                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Live HTTP smoke (2026-09-29, from sandbox)                          | `/`, `/graphing-calculator/`, `/graph/`, `/disclaimer/`, `/math-functions/quadratic/`, `/math-functions/sine/`, `/learn/what-is-a-function/`, `/calculators/`, `/about/`, `/contact/`, `/examples/lissajous-curve/` → 200; sitemap, robots, favicon, manifest, llms.txt → 200; `/functions/quadratic/` → 301 to `/math-functions/quadratic/`; nonexistent → 404; `/graph/` carries `noindex`; `POST /api/ai/math` valid → 200 with `provider:"mock"` + `mock:true`; malformed → honest 400; CSP + `X-Frame-Options: SAMEORIGIN` present |

## Known issues (non-blocking, documented in PRODUCTION_AUDIT.md §11)

1. Custom domain TBD — production is the Cloudflare URL; custom domain needs
   rebuild + redeploy for canonicals.
2. `DEEPSEEK_API_KEY` pending (Firoz: "wo baad me dooga" — not asked again).
   Production runs in clearly labeled mock mode; local intents work offline.
3. Real-browser/device/screen-reader QA not performed in the sandbox.
4. `contact@example.com` placeholder — no verified contact email provided.
5. Social links "coming soon".
6. 24 page titles 61–86 chars (cosmetic).
7. `npm audit` blocked by sandbox policy (`policy_denied`); manual review done.

## Launch verdict

**LAUNCH — 0 Critical issues.** No new features were added in Phase 10, per
the spec. Production is live at `https://graphing-calc.pages.dev`
in clearly labeled AI mock mode until the DeepSeek key is supplied.

**STOP — Phase 10 is the final phase. No further work unless Firoz sends it.**
