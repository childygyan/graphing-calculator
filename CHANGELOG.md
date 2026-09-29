# Changelog

All notable changes to the AI Graphing Calculator are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and versioning follows [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-09-29

First production release. Ten verified phases, built and launched in one day.

### Phase 1 — Foundation

- Astro 5 + React 19 + strict TypeScript + Tailwind 3 project skeleton
- Calculator shell layout, centralized reducer/store, expression type system
- MathEngine / GraphEngine abstraction boundaries, SEO layout, no-FOUC
  light/dark/system theme, responsive design, accessibility + error-boundary
  foundations

### Phase 2 — Interactive 2D graph engine

- Canvas 2D engine: coordinate transforms, adaptive 1/2/5 grid ticks, axes,
  cursor-centered zoom, pan, touch/pinch, DPR-aware rendering
- Graph toolbar, coordinate display, light/dark graph themes, render
  invalidation, `GraphDrawable` architecture
- 71 unit tests (transforms, viewport, ticks, formatting)

### Phase 3 — Expression engine + real function plotting

- Normalization layer (unicode, aliases, `y =` / `f(x) =` stripping)
- Tokenizer → parser → AST → closure compiler (no `eval`/`new Function`)
- 500-entry LRU compiled-expression cache, screen-aware adaptive sampling,
  discontinuity/domain handling, functional expression editor
  (colors, visibility, delete, duplicate)

### Phase 4 — Mathematical analysis

- Value tables, Brent root finding, intersections, numerical derivatives,
  adaptive Simpson integrals with shading, one/two-sided limits, extrema,
  tangent/normal lines, annotations, tap-to-inspect, precision settings

### Phase 5 — Variables, sliders, advanced graph types

- Variable environment with dependency graph + cycle detection
- Animated sliders, parametric and polar equation support, inequality
  rasterization (dashed strict / solid non-strict boundaries)

### Phase 6 — AI math assistant

- `AIProvider` abstraction; DeepSeek provider (server-side only) + deterministic
  mock provider; `POST /api/ai/math` with strict request validation, schema
  validation of model output, per-IP rate limiting
- Local-first intent detection (offline-capable), `MathCommandProcessor`,
  accessible chat UI; AI never the calculation source of truth

### Phase 7 — Save, share, import, export

- Versioned graph documents + migrations, strict validation, named local saves,
  compact share URLs (`#s=`) with noindex `/graph/` viewer, JSON import with
  preview, JSON/PNG export, equation copying, undo/redo (cap 50), dirty-state
  tracking, import size limits

### Phase 8 — SEO + content architecture

- Math-derived unique content: 10 function pages, 6 graph examples, 6 learn
  guides, 3 functional tool pages; metadata system, JSON-LD, breadcrumbs,
  sitemap/robots/`llms.txt`, internal linking engine, 301 redirects,
  automated orphan/thin/duplicate checks

### Phase 9 — Performance, accessibility, security hardening

- JS budget ≤ 150 KB gzip (123.3 KB measured), CSS 6.4 KB, single CSS bundle
- Strict CSP with pinned inline-script hashes, zero `dangerouslySetInnerHTML`,
  WCAG 2.2 AA work (contrast fixes, focus trap, skip link), memory-leak audit,
  rate-limiter bounds, `SECURITY.md`

### Phase 10 — Production launch

- Cloudflare adapter (`output: 'static'` + adapter — prerendered pages, worker
  serves `POST /api/ai/math`); runtime env bindings for `DEEPSEEK_API_KEY`
- `/disclaimer/` page, `500` error page, web manifest + app icons, privacy
  policy updated for the AI endpoint, `README`/`CONTRIBUTING`/`RELEASE_CHECKLIST`,
  `docs/PRODUCTION_AUDIT.md`, semver v1.0.0
- Deployed to Cloudflare Pages (direct upload); production smoke tests green

### Known limitations at 1.0.0

- No custom domain yet — the production URL is the Cloudflare-provided one;
  `siteUrl` follows whatever is deployed (custom domain can be attached later).
- `DEEPSEEK_API_KEY` not configured — the AI assistant runs in clearly labeled
  mock mode; local intents work fully offline.
- Real-browser QA (Chrome/Firefox/Safari/Edge, mobile devices) not performed in
  the sandbox — scheduled as post-launch verification.
- No analytics installed (privacy decision); Search Console verification pending
  a real property.
