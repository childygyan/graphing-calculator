# Competitive Upgrade Report — 3D Graphing, Scientific Calculator, Trust Signals, Desmos-Alternative Page

**Date:** 2026-09-29 · **Scope:** competitive upgrades authorized by Firoz after
analyzing graphingcalculator.us and graphingcalculator.io. **NOT "Phase 11"** —
Phase 10 was final; this is a separately authorized workstream.
**Base:** rebrand commit `ba19910` ("Graphing Calculator").

## Why

Competitor analysis (2026-09-29):
- **graphingcalculator.us** (13 pages): educator-voiced content, named reviewer
  + "last reviewed" dates on guides, worked examples, polar + scientific
  calculators.
- **graphingcalculator.io** (18+ pages): 3D graphing (`/3d`), blog, grade/GPA
  calculators, scientific calculator.

Gaps we closed: 3D graphing (biggest feature gap), scientific calculator page
(both competitors have one), trust signals on guides (.us formula, done
honestly with no invented names), and a `/desmos-alternative/` comparison page
for the high-volume "desmos calculator" keyword.

## What was built

### A. 3D surface graphing — `/3d/` (indexed)
- `src/lib/graph3d/`: `vec3.ts` (immutable Vec3 ops), `camera.ts` (orbit
  camera: azimuth/elevation/distance, perspective projection, clamped
  elevation/zoom), `surface.ts` (z = f(x, y) sampler over a grid with
  resolution control; NaN/Infinity become honest gaps), `render.ts`
  (painter's-algorithm depth-sorted wireframe on 2D canvas, depth shading,
  labeled axes). Zero dependencies — no three.js.
- Two-variable compilation **reuses** the existing engine:
  `tokenize` → `parse` → `compileScopedAst` with `x` bound and `y` resolved
  through a mutable box; unknown identifiers → `SurfaceCompileError`. No
  eval/new Function, ever.
- `src/components/graph3d/Graph3D.tsx`: drag-to-rotate (mouse + touch),
  pinch/wheel zoom, keyboard (arrows/+/−), resolution selector 24/36/48/64,
  expression input with honest validation errors, 3 presets
  (paraboloid, ripple, saddle), DPR-aware, dark-mode aware,
  `prefers-reduced-motion` respected (no auto-rotate), ARIA label + text
  surface summary for screen readers.
- Page: `ToolPageShell`, canonical `/3d/`, how-rotation-works + presets +
  honest-rendering sections, 5 FAQs, related links.
- **34 vitest tests** (vec3, camera orbit/clamp, projection, sampler grid +
  NaN gaps, two-variable compilation, z-fit, render sort).

### B. Scientific calculator — `/scientific-calculator/` (indexed)
- `src/lib/math/scientific.ts`: pure evaluation layer reusing
  `compileExpression` → AST → `compileAst`. DEG/RAD via AST rewrite
  (`sin(d)` → `sin(d·π/180)`); the shared `functions.ts` table was **not**
  modified. Caught during testing: engine `log` is natural log
  (`ln`→`log` alias), so the keypad's "log" inserts `log10(`.
- Honest errors via AST cause-analysis: division by zero (incl. `0/0`,
  `0^-1`), sqrt-of-negative, log-of-non-positive, asin/acos outside
  [-1, 1], `tan(90°)` in DEG mode, overflow vs undefined — never raw
  NaN/Infinity; friendly messages for empty input, trailing operator,
  mismatched parens.
- `src/components/tools/ScientificCalculator.tsx`: 34-button keypad,
  48px touch targets, ARIA labels, `role="status"` result + `role="alert"`
  errors, full keyboard support, mobile-first 320px+.
- Page: `ToolPageShell`, canonical `/scientific-calculator/`, DEG-vs-RAD
  explanation, keyboard shortcuts, 6 FAQs, related links.
- **32 vitest tests** (arithmetic, DEG/RAD trig, inverse trig, logs, powers,
  constants, every error path).

### C. Trust signals on learn guides
- `LearnArticle.reviewedOn?: string` (ISO date, additive) in
  `src/data/seo/types.ts`; set to `2026-09-29` on all 6 articles in
  `src/data/seo/learn.ts`.
- `src/pages/learn/[slug].astro`: byline aside — "Reviewed for mathematical
  accuracy by the Graphing Calculator team" + "Last reviewed:
  September 29, 2026". Missing/invalid date → date line omitted, never wrong.
- `src/pages/learn/index.astro`: per-card "Reviewed for accuracy · Sep 29,
  2026" indicator.
- `src/pages/about/index.astro`: "How we review content" section —
  engine-verified facts + human team review, corrections when found.
  **No invented names, photos, or credentials.**
- **5 vitest tests** (`src/lib/seo/__tests__/review-byline.test.ts`):
  date validity, byline presence in built HTML, no fabricated reviewer names.

### D. `/desmos-alternative/` comparison page (indexed)
- Title: "Best Desmos Alternative — Free Online Graphing Calculator"
  (never just "Desmos Calculator"). 153-char meta description.
- Comparison table limited to publicly well-known Desmos facts only
  (free, no account needed, 2D graphing); uncertain rows omitted with an
  explicit note. All Graphing Calculator claims verified against the repo.
- Legal guardrails: prominent independence notice + FAQ ("Is this affiliated
  with Desmos?" → No — not affiliated with, endorsed by, or connected to
  Desmos/Amplify). "Desmos" in nominative comparative use only. No logos,
  branding, screenshots, or UI copying. No fake reviews/ratings/statistics.
- 6 FAQs, JSON-LD Article + FAQPage, outbound links to
  `/graphing-calculator/`, `/3d/`, `/calculators/`, `/learn/`.
- **8 vitest tests** (title, description length, canonical/indexed status,
  independence notice, required links, no unverifiable Desmos claims).

### Integration (coordinator)
- `src/lib/seo/page-registry.ts`: registered `/3d/`, `/scientific-calculator/`,
  `/desmos-alternative/` (sitemap + llms.txt + SEO audit pick them up).
- `src/data/site.ts`: primary nav + footer links for the new pages.
- `src/pages/calculators/index.astro`: new cards for 3D Graph and Scientific
  Calculator; hub title/description updated.
- Fixed: D's test file was inside `src/pages/` (Astro tried to build it as a
  route) → moved to `src/lib/seo/__tests__/`; pre-existing prettier drift in
  privacy-policy fixed.

## Validation

| Gate | Result |
|---|---|
| `tsc --noEmit` | 0 errors |
| `eslint .` | clean |
| `prettier --check .` | clean |
| `npm test` | **557/557 pass** (45 files; 478 pre-existing + 79 new) |
| `npm run build` | clean; `/3d/`, `/scientific-calculator/`, `/desmos-alternative/` in output, all indexed, correct titles |
| Live smoke (post-deploy) | `/3d/` 200, `/scientific-calculator/` 200, `/desmos-alternative/` 200, `/` 200, `/graphing-calculator/` 200 |

## Deployment
- Cloudflare Pages project `graphing-calc`, production branch `main`.
- Method: `wrangler pages deploy` with absolute staging path, pre-bundled
  minimal API worker (`_worker.js`, ~39 KB), `--skip-caching`.

## Known gaps / honest notes
- 3D is wireframe-only (no solid shading); fine for math visualization, not a
  CAD renderer.
- No blog yet (.io has one) — `/learn/` covers educational content instead.
- No grade/GPA calculators (.io's student-traffic magnets) — out of scope
  for this workstream.
- Real-browser/device QA not performed in the sandbox.
- DeepSeek API key still pending — AI assistant remains in labeled mock mode.
- `contact@example.com` still a placeholder.
