# Performance Report — Phase 9 (2026-09-29)

Baseline: production build of the Phase 8 tree (37 pages). All sizes are
gzip bytes of `dist/_astro/*` unless noted. Budgets are enforced by
`src/lib/perf/__tests__/budgets.test.ts` (fails the suite on regression).

## Measured results (after Phase 9)

| Asset                                                | Before                         | After                          | Δ                                   |
| ---------------------------------------------------- | ------------------------------ | ------------------------------ | ----------------------------------- |
| Total client JS (gzip)                               | ~131 KB                        | **122.5 KB** (125 472 B)       | −6%                                 |
| Total CSS (gzip)                                     | 12.8 KB (2 bundles)            | **6.4 KB** (6 570 B, 1 bundle) | **−49%**                            |
| JS on `/` (homepage)                                 | ~66.6 KB (React + ThemeToggle) | **0 B**                        | **−100%**                           |
| JS on content pages (about, functions/_, learn/_, …) | ~66.6 KB                       | **0 B**                        | −100%                               |
| Calculator island app code (excl. React)             | 44.3 KB                        | 45.1 KB                        | +0.8 KB (icons inlined)             |
| Shared React runtime chunk                           | 65.9 KB                        | 65.9 KB                        | unchanged (only loads where needed) |

Budgets (gzip): total JS ≤ 150 KB ✓ (122.5), total CSS ≤ 12 KB ✓ (6.4),
calculator island ≤ 60 KB ✓ (45.1). CSS bundle count == 1 ✓.

## Fixes shipped

1. **Duplicate Tailwind base removed.** `@astrojs/tailwind` was injecting
   its own preflight entry alongside our `global.css` (`@tailwind base`
   already present), producing two near-identical CSS bundles linked on
   every page. `tailwind({ applyBaseStyles: false })` in `astro.config.mjs`
   → one 6.4 KB gzip bundle, one fewer render-blocking stylesheet.
2. **ThemeToggle: React island → zero-JS Astro component.**
   The header toggle was the _only_ island on 30+ content pages, forcing
   every one of them to download React (65.9 KB gzip) for a theme button.
   Rewritten as `src/components/ui/ThemeToggle.astro`: same behavior
   (light → dark → system cycle, localStorage persistence, OS following
   in system mode, same icons/aria-labels), plain inline script, no
   hydration. Content pages now ship **zero JavaScript**.
3. **Slider animation loop gated.** `VariablePanel` ran a 60 fps rAF loop
   for the page lifetime even with nothing playing. The loop now only
   runs while ≥1 variable is playing (`anyPlaying` gate); phase resumes
   from the current value on restart.
4. **Island audit.** `client:load` retained only where the island _is_
   the page content: `CalculatorPage` (/graphing-calculator/),
   `SharedGraphLoader` (/graph/), tool islands (3 calculator pages).
   Everything else is static HTML. No island hydrates unnecessarily.

## Considered but not done

- **React.lazy for AiChat:** the AI panel is ~600 lines but its floating
  button is the always-visible entry point; splitting would defer the
  button itself or complicate SSR. The full calculator island is 45 KB
  gzip (under budget) — gain didn't justify the risk. Revisit if the
  island exceeds 60 KB.
- **Preloading the React chunk:** only 5 of 37 pages need it; a global
  preload would penalize the 32 content pages.

## Render invalidation review (no changes needed)

- Gestures mutate the renderer viewport per frame; the store syncs on a
  150 ms trailing debounce (`queueStoreSync`); store-driven updates
  compare with `viewportsEqual` (ε = 1e-12) before re-rendering, so the
  debounced echo never loops.
- `renderer.scheduleRender` coalesces via rAF; `getDrawables` memoizes on
  a JSON key of (expressions, variables, viewport, size, analysis).
- Unmount flushes the pending sync so the last gesture persists.

## Memory-leak audit (no leaks found)

| Resource                                               | Cleanup                                                  |
| ------------------------------------------------------ | -------------------------------------------------------- |
| `GraphInteractionController` (wheel/pointer listeners) | `detach()` in effect cleanup ✓                           |
| `ResizeObserver` (canvas sizing)                       | `disconnect()` ✓                                         |
| `CanvasGraphRenderer` rAF                              | `cancelAnimationFrame` in `destroy()` ✓                  |
| matchMedia listeners (theme, reduced-motion)           | `removeEventListener` ✓                                  |
| Slider animation rAF                                   | `cancelAnimationFrame` + now gated ✓                     |
| Toast auto-dismiss timers                              | Provider never unmounts; timers are 4 s and idempotent ✓ |
| SaveDialog 900 ms `onClose` timer                      | fires once on a stable callback; harmless if unmounted ✓ |
| `registerGraphCanvas`                                  | unregisters on unmount ✓                                 |

## Known limitations

- Numbers are from the sandbox build (no throttling/CPU emulation);
  real-device timings (LCP/INP on mid-range Android) still need a
  field check at deploy time (Phase 10).
- `client.B_reWq8C.js` (React 19 runtime, 65.9 KB gzip) is the floor
  for the 5 island pages; removing it would require dropping React.
