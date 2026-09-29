# Phase 9 Report — Performance, Accessibility, Security & QA Hardening

**Date:** 2026-09-29 · **Scope:** hardening ONLY, no new product features.
**Base:** Phase 8 (`ad814d7`) · **Result:** complete, all gates green.

## What changed

### Performance

- **Removed the duplicate Tailwind base CSS.** `@astrojs/tailwind` was
  injecting its own preflight entry alongside our `global.css` (which
  already has `@tailwind base`), emitting two near-identical CSS bundles
  on every page. `tailwind({ applyBaseStyles: false })` →
  **one 6.4 KB gzip bundle (was 12.8 KB, −49%)**, one fewer
  render-blocking stylesheet.
- **ThemeToggle: React island → zero-JS Astro component.** The header
  toggle was the only island on 30+ content pages, forcing each to
  download the React runtime (65.9 KB gzip) for a theme button.
  Rewritten as `src/components/ui/ThemeToggle.astro` with identical
  behavior (light → dark → system, localStorage, OS-following,
  same icons/aria-labels). **Homepage and all content pages now ship
  0 bytes of JavaScript.**
- **Slider animation loop gated.** `VariablePanel` spun a 60 fps rAF
  loop for the page lifetime even with nothing playing; it now runs
  only while ≥ 1 variable plays.
- **Island audit:** `client:load` kept only where the island _is_ the
  page (`CalculatorPage`, `SharedGraphLoader`, 3 tool islands). Nothing
  hydrates unnecessarily.
- **Budgets enforced in CI:** `src/lib/perf/__tests__/budgets.test.ts`
  asserts gzip budgets against `dist/` (total JS ≤ 150 KB, CSS ≤ 12 KB,
  calculator island ≤ 60 KB, single CSS bundle, zero-JS content pages).

Measured (gzip): total JS 122.5 KB ✓ · CSS 6.4 KB ✓ · calculator island
45.1 KB ✓ · React chunk 65.9 KB (only on the 5 island pages).

### Accessibility (WCAG 2.2 AA)

- **Real contrast failure fixed:** graph axis colors were 2.56:1 (light)
  and 2.36:1 (dark) — below 3:1. Now 4.76:1 / 6.96:1. All 11 measured
  UI/graph pairs pass AA (see `docs/ACCESSIBILITY_REPORT.md`).
- **Modal:** focus trap + Escape + focus restore on close.
- **Reduced motion:** `scroll-smooth` gated behind
  `prefers-reduced-motion: no-preference`; global transition/animation
  kill-switch under `reduce`.
- Touch targets ≥ 28 px everywhere (AA minimum 24 px); keyboard, focus,
  live-region, and labeling audit clean.
- New: `src/lib/a11y/contrast.ts` + tests pin the palette so regressions
  fail the suite.

### Security

- **CSP via `public/_headers`** (Cloudflare Pages): strict policy built
  by `src/lib/security/csp.ts` — `script-src 'self'` + sha256 hashes of
  the 4 inline scripts (no `unsafe-inline`), `connect-src 'self'`,
  `object-src 'none'`, `frame-ancestors 'self'`, plus nosniff /
  referrer / permissions-policy / SAMEORIGIN headers.
  `headers.test.ts` verifies the shipped `_headers` against the real
  build (hash drift fails the suite).
- **Rate limiter hardened:** 10 000-key bound with expired-key sweeping
  (X-Forwarded-For spraying can't grow memory); edge-case tests added.
- **XSS re-verified:** zero `dangerouslySetInnerHTML`/`innerHTML` in
  `src/`; AI text renders as React text nodes; share/import payloads are
  size-capped, depth-checked, schema-validated data (never evaluated).
- **`SECURITY.md`** written (threat model, CSP, API, XSS, AI safety,
  secrets, maintenance notes).

### QA / robustness

- **Error boundaries everywhere:** `CalculatorPage` now has a
  top-level boundary; `SharedGraphLoader` and all three tool islands
  (`DerivativeTool`, `IntegralTool`, `RootFinderTool`) wrapped.
- **Render invalidation reviewed:** debounced store sync + rAF
  coalescing + ε-compare — no echo loops found, no changes needed.
- **Memory-leak audit:** all listeners/observers/rAF/timers clean up
  on unmount; remaining timers are short-lived and benign (documented).
- **Responsive:** toolbar wraps, expression rows use `min-w-0`/wrapping
  actions; no-overlap issues found in static review.

## Validation

| Check                    | Result                                             |
| ------------------------ | -------------------------------------------------- |
| `npx tsc --noEmit`       | 0 errors                                           |
| `npx eslint .`           | 0 errors / 0 warnings                              |
| `npx prettier --check .` | clean                                              |
| `npm test` (vitest)      | **478/478 pass** (41 files; 442 baseline + 36 new) |
| `npm run build`          | 37 pages, clean                                    |

## Known non-blocking issues

1. No screen-reader (NVDA/VoiceOver) or real-device pass was possible
   in this environment — schedule a manual a11y/browser pass in
   Phase 10 (also: real-device LCP/INP timings).
2. `POST /api/ai/math` still needs a server runtime (`output: 'server'`
   - adapter) — unchanged from Phase 6; Phase 10 owns the decision.
3. The CSS-only mobile `<details>` menu doesn't close on Escape (minor).
4. After upgrading Astro or editing an inline script, CSP hashes in
   `public/_headers` must be recomputed (test suite catches drift).

## Deliverables

- `SECURITY.md`, `docs/PERFORMANCE_REPORT.md`,
  `docs/ACCESSIBILITY_REPORT.md`, this report.
- No new user-facing features; public behavior changes are limited to
  higher-contrast graph axes and faster content pages.
