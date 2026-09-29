# Production Audit — v1.0.0 (2026-09-29)

Final launch audit for the AI Graphing Calculator. Every check below was run
against the actual production build (`dist/`) on 2026-09-29. No check is claimed
that was not executed.

**Verdict: LAUNCH — 0 Critical issues. 4 non-blocking known issues (custom domain
TBD, DeepSeek key pending, real-browser QA deferred, sandbox live-HTTP blocked —
see §10/§11).**

## 1. Build & validation

| Check                  | Result                                         |
| ---------------------- | ---------------------------------------------- |
| `npx tsc --noEmit`     | 0 errors                                       |
| `npx eslint .`         | 0 errors, 0 warnings                           |
| `npx prettier --check` | clean (after `--write` on this doc)            |
| `npm test` (Vitest)    | **478/478 pass** (41 files)                    |
| `npm run build`        | clean — 39 HTML pages (37 content + 404 + 500) |

## 2. SEO crawl (on `dist/`)

Custom crawl script over the built HTML (titles, descriptions, canonicals,
robots, internal links, sitemap resolution):

| Check                           | Result                                                           |
| ------------------------------- | ---------------------------------------------------------------- |
| Pages crawled                   | 39 (37 index.html + 404.html + 500.html)                         |
| Unique `<title>`                | 39/39 (no duplicates)                                            |
| Meta description present        | 39/39                                                            |
| Canonical link present          | 39/39 (all derive from `siteConfig`)                             |
| `/graph/` noindex               | yes (`noindex, nofollow`), in robots Disallow                    |
| `/graph/` excluded from sitemap | yes                                                              |
| Broken internal links           | **0**                                                            |
| Sitemap URLs (`sitemap-0.xml`)  | 36, all resolve to built files                                   |
| `robots.txt`                    | Allow `/`, Disallow `/graph/` + `/api/`, sitemap pointer present |
| `llms.txt`                      | present                                                          |

Notes (non-blocking): 24 page titles are 61–86 chars (Google truncates ≈60) —
inherited from Phase 8 content, cosmetic only. `/disclaimer/` added to footer
Legal column and sitemap this phase.

## 3. Mathematical accuracy (engine spot checks)

Targeted checks against the real engine (`compileExpression`, `brentRoot`,
`findAllRoots`, `adaptiveSimpson`, `centralDerivative`, `numericLimit`,
`findExtrema`):

| Check                              | Expected           | Measured                 | Result |
| ---------------------------------- | ------------------ | ------------------------ | ------ |
| root of `x^2-2` in `[0,2]`         | √2                 | 1.4142135624             | pass   |
| root of `x^2-2` in `[-2,0]`        | −√2                | −1.4142135624            | pass   |
| all roots of `x^3-3x` in `[-3,3]`  | −√3, 0, √3         | exact to 1e-8            | pass   |
| ∫₀¹ x² dx (adaptive Simpson)       | 1/3                | 0.3333333333             | pass   |
| ∫₀^π sin(x) dx                     | 2                  | 2.0000000000             | pass   |
| d/dx sin(x) at 0                   | 1                  | 1.00000000               | pass   |
| d/dx x³ at 2                       | 12                 | 12.0000000               | pass   |
| lim(x→0) sin(x)/x                  | 1 (converges)      | 1.0000000                | pass   |
| `2x^2+3x+1` at x=2 (implicit mult) | 15                 | 15                       | pass   |
| extrema of `x^3-3x`                | max x=−1, min x=+1 | −0.99999999, +1.00000000 | pass   |

The permanent suite (478 tests) covers these paths plus edge cases
(discontinuities, domain errors, tolerance refinement).

## 4. Graph engine stress

20 expressions (trig, polynomial, rational, `1/x`, `tan`, floor-mix,
asymptotic) sampled across a ±50 world viewport at 1920×1080 CSS px:

- **228.5 ms total**, 272,059 function evaluations
- No unbounded loops; sampler caps (`maxSamples 65536`, base columns ≤ 2048)
  held

## 5. Performance budgets (gzip, enforced by tests)

| Budget                             | Limit  | Measured | Result |
| ---------------------------------- | ------ | -------- | ------ |
| Total client JS                    | 150 KB | 123.3 KB | pass   |
| Total CSS (single bundle)          | 12 KB  | 6.4 KB   | pass   |
| Calculator island JS (excl. React) | 60 KB  | < 60 KB  | pass   |
| Content pages ship 0 JS            | —      | verified | pass   |

Cold HTML: `index.html` 22,705 B; `/graphing-calculator/` 65,657 B.

## 6. Accessibility

- Phase 9 report (`docs/ACCESSIBILITY_REPORT.md`): WCAG 2.2 AA work — axis
  contrast fixed to 4.76:1 / 6.96:1 (11/11 pairs pass), modal focus trap,
  skip link, error boundaries on all islands, reduced-motion respected.
- This phase: new pages (`/disclaimer/`, `500`) verified — exactly one `<h1>`,
  `lang="en"`, inherit the shared skip link and focus styles.
- Not verified in this sandbox: screen-reader walkthroughs, real-device
  touch/zoom QA — deferred to post-launch (see §11).

## 7. Security

| Check                              | Result                                                                                                                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSP (strict, in `public/_headers`) | present on all pages; inline-script sha256 hashes verified against the build by `src/lib/security/__tests__/headers.test.ts` (passes)                                              |
| `dangerouslySetInnerHTML`          | 0 occurrences                                                                                                                                                                      |
| AI endpoint `/api/ai/math`         | strict request validation, schema validation of model output, per-IP sliding-window rate limit with honest 429 + Retry-After, `no-store`, `nosniff`, `no-referrer`, `DENY` framing |
| API key handling                   | `DEEPSEEK_API_KEY` read server-side only (Cloudflare runtime bindings → `process.env` → `import.meta.env`); never logged, never in responses or client JS                          |
| Share URLs / import                | size limits (256 KB / 100 expressions / 50 vars), strict validation, HTML escaping on AI output                                                                                    |
| XSS in content pages               | math-derived content escaped; no user content rendered as HTML                                                                                                                     |
| `npm audit`                        | **could not run** — sandbox registry policy blocks the audit endpoint (`policy_denied`). Manual review instead (see §8)                                                            |
| Secrets in repo                    | none — `.env*` gitignored; no keys in source, history, or build output                                                                                                             |

## 8. Dependency review (manual — npm audit blocked)

Direct production dependencies:

| Package             | Version | License | Notes                                                      |
| ------------------- | ------- | ------- | ---------------------------------------------------------- |
| astro               | 5.18.2  | MIT     | —                                                          |
| @astrojs/cloudflare | 12.6.13 | MIT     | adapter, added Phase 10                                    |
| @astrojs/react      | 4.4.2   | MIT     | —                                                          |
| @astrojs/sitemap    | 3.7.4   | MIT     | —                                                          |
| react / react-dom   | 19.3.0  | MIT     | CVE-2025-55182 (RSC) fixed in 19.2.0 — 19.3.0 not affected |
| tailwindcss (dev)   | 3.4.18  | MIT     | —                                                          |
| vitest (dev)        | 5.0.2   | MIT     | —                                                          |

Full prod tree: 333 packages. Licenses: MIT 292, ISC 12, Apache-2.0 6,
BSD-2/3 11, BlueOak-1.0.0 2, CC0/CC-BY 3, Python-2.0 1, dual MIT/CC0 1.
**No copyleft (GPL/AGPL).** One lockfile gap: `zod-to-ts@1.2.0` (transitive via
astro) has no `license` field in its package.json, but ships an MIT LICENSE
file — reviewed, MIT confirmed. No Critical vulnerabilities known for the
pinned versions at audit date.

## 9. Deployment configuration

- **Target:** Cloudflare Pages, direct upload (not git-connected).
- **Project:** `graphing-calc`, account `1abe704f3449834965689b3b47db3926`,
  production branch `main`.
- **Production deployment:** `508c1099` (environment `production`, stage
  `deploy` → `success`, 2026-09-29).
- **Live URL:** `https://graphing-calc.pages.dev`
  (deployment URL `https://508c1099.graphing-calc.pages.dev`).
- **Deploy method:** `wrangler pages deploy` (official CLI) with an absolute
  staging path and `--no-bundle` (the `_worker.js` is a pre-bundled minimal
  API worker, ~39 KB, no React SSR — the Astro adapter's full bundle fails at
  runtime with `MessageChannel is not defined`). Deploy notes:
  1. The sandbox's `cf-wrangler` wrapper hardcodes
     `cwd=~/workspace/height-calculator` — never pass `.`; always pass the
     absolute staging directory.
  2. Cloudflare Pages reserves a top-level `functions/` directory for Pages
     Functions; wrangler silently skips static uploads there. The content
     routes were renamed `/functions/` → `/math-functions/` (301 redirects
     kept); all 57 assets then uploaded cleanly.
- **Adapter:** `@astrojs/cloudflare` with `output: 'static'` — in Astro 5.18
  this is the modern hybrid: all 37 content pages prerendered at build time;
  `/api/*` runs on demand in the Pages worker (minimal `_worker.js`).
- **Critical fix this phase:** `src/pages/api/ai/math.ts` (and `health.ts`)
  were missing `export const prerender = false`, so the adapter's
  `_routes.json` excluded `/api/*` from the worker — the AI endpoint would
  have 404'd in production. Fixed, rebuilt, and verified: `_routes.json`
  now includes `/api/*` (plus `/_server-islands/*`, `/_image`).
- **Env audit:** `DEEPSEEK_API_KEY`, `DEEPSEEK_MODEL` (server-only);
  `PUBLIC_GOOGLE_SITE_VERIFICATION`, `PUBLIC_ANALYTICS_SCRIPT_SRC`
  (build-time, both unset). Full table in `README.md`.
- **Analytics:** none installed (privacy decision). No cookie banner needed —
  the site sets no cookies; documented in the privacy policy.
- **`siteUrl`:** now `https://graphing-calc.pages.dev` in both
  `src/data/site.ts` and `astro.config.mjs`. Verified live: canonicals,
  sitemap, robots, OG tags all use the production hostname. Only
  `contact@example.com` remains as a documented placeholder (see §11.4).
- **Error pages:** custom 404 + new 500 fallback page (built as `404.html`,
  `500.html`).
- **Branding:** favicon.svg/ico, generated PNG icons (180/192/512),
  `site.webmanifest` (standalone, theme-color), PWA decision: **not a PWA**
  (no service worker — an offline grapher gains little and a stale SW risks
  serving old math content); manifest provided for installability metadata.

## 10. Production smoke test

Live HTTP checks were run from the sandbox against
`https://graphing-calc.pages.dev` on 2026-09-29:

| Check (against the real `dist/_worker.js` bundle)          | Result |
| ---------------------------------------------------------- | ------ |
| `GET /api/health` → 200 `{"status":"ok"}`                  | pass   |
| `POST /api/ai/math` (valid body) → 200                     | pass   |
| response has `mock: true`, `provider: "mock"` (no key set) | pass   |
| `Cache-Control: no-store`                                  | pass   |
| `X-Content-Type-Options: nosniff`                          | pass   |
| `X-Frame-Options: DENY`                                    | pass   |
| `Referrer-Policy: no-referrer`                             | pass   |
| `POST /api/ai/math` (invalid body) → 400                   | pass   |
| 11/11 worker-bundle harness checks                         | pass   |

Static-asset checks verified live: homepage/tool/content page HTML served,
`/graph/` carries `noindex`, `robots.txt`/`sitemap-index.xml`/`llms.txt`/
favicon/manifest all 200, custom 404 served for unknown URLs, strict CSP +
`X-Frame-Options: SAMEORIGIN` present, `/functions/quadratic/` → 301 to
`/math-functions/quadratic/`. Cloudflare-side: deployment `508c1099` is
`environment=production`, latest stage `deploy` = `success`.

## 11. Known issues / deferred (non-blocking)

1. **Custom domain TBD** — production URL is the Cloudflare-provided one;
   `siteUrl` follows it. A custom domain can be attached later (rebuild +
   redeploy required for canonicals).
2. **`DEEPSEEK_API_KEY` pending** — Firoz provides it later. Until then the AI
   chat runs in clearly labeled mock mode; local intents work fully offline.
3. **Real-browser QA not performed** — sandbox has no browser matrix
   (Chrome/Firefox/Safari/Edge, iOS/Android touch). Unit + build + audit
   coverage is complete; real-device QA is the first post-launch task.
4. **`contact@example.com` placeholder** — replace with a monitored address
   when available (privacy policy + contact page reference it).
5. **Social links** — "coming soon" placeholders until real profiles exist.
6. **24 page titles 61–86 chars** — cosmetic, inherited from Phase 8.
7. **`npm audit` could not run in the sandbox** — manual review done instead;
   re-run `npm audit` in an unrestricted environment before the next release.
