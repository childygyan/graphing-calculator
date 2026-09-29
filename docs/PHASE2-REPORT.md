# Phase 2 Report — Actual Interactive 2D Graph Engine

**Date:** 2026-09-29
**Scope:** Replace the Phase 1 graph placeholder with a real interactive Canvas 2D coordinate-plane engine. No function plotting (§27), no AI, no new product features.

## Files created (20)

**Graph library — `src/lib/graph/` (9 files, pure TypeScript, zero React):**

- `types.ts` — `ScreenPoint`, `WorldPoint`, `CanvasSize`, `GraphDrawableKind`, `GraphDrawableBase`, `FunctionDrawable` (precomputed world-coordinate polylines), `GraphDrawable` union (grows in later phases), `GraphThemeMode`, `GraphRenderInput`.
- `coordinate-system.ts` — `createTransform(viewport, size)` → `ViewportTransform` (`worldToScreen`/`screenToWorld`, `unitsPerPixel`/`pixelsPerUnit`); zero-span guarded; DPR-independent CSS-px math. `sanitizeNumber` NaN/Infinity guard.
- `transforms.ts` — `getDevicePixelRatio()` (clamped to [1, 3], 1 when unavailable), `setupCanvas()` (DPR backing store, style size, `setTransform`; rejects bad sizes, null on missing 2D context, backing store clamped so no dimension exceeds 8192 device px), `snapToPixel()` for crisp 1px lines.
- `viewport.ts` — `MIN_VIEWPORT_SPAN` (1e-9), `MAX_VIEWPORT_SPAN` (1e15); `createDefaultViewport()` (spreads Phase 1 `DEFAULT_VIEWPORT`, ±10); `validateViewport()` (finite, xMin<xMax, yMin<yMax, spans clamped preserving center, never mutates input); `resetViewport()`; `zoomViewport()` (factor<1 in, anchor world point fixed, invalid factor → unchanged copy); `panViewport()`; `fitViewportToDrawables()` (Phase 2 stub: returns default/fallback copy; real bounds logic lands in Phase 3).
- `grid.ts` — `niceTickInterval()` (1/2/5×10ⁿ, 80px target, fallback 1); `computeTicks()` (boundary-inclusive, FP-dust rounding, capped at 2000); `formatTickLabel()` (`'2'` not `'2.000000'`, `'2.5'`, `'0'`, exponential for extremes); `formatCoordinate()` (hover readout, `'—'` for non-finite); `computeGrid()` (minors at major/5 only when ≥14px apart).
- `axes.ts` — `computeAxes()` → `{xAxis, yAxis}`; an axis line renders only when 0 lies inside the perpendicular range (never forced into view); off-view axes get edge-pinned labels; labels within 28px of the perpendicular axis are skipped; origin `'0'` rendered exactly once.
- `theme.ts` — centralized `lightGraphTheme` / `darkGraphTheme` palettes + `resolveGraphTheme()`; no hard-coded colors anywhere else.
- `renderer.ts` — `GraphRenderer` interface (`initialize`/`resize`/`render`/`setViewport`/`setTheme`/`destroy`) + `CanvasGraphRenderer`: sanitizes all inputs, draw order background → minor grid → major grid → axes → tick labels → origin marker → drawables; one `beginPath` per line group; polylines split on non-finite points; unknown drawable kinds ignored; every pixel finite-checked; `scheduleRender()` is rAF-coalesced (replaces, never queues); `destroy()` cancels rAF and clears refs. No timers, no loops, no math evaluation.
- `interaction.ts` — `GraphInteractionController(canvas, getTransform, callbacks, options?)` with `attach()`/`detach()`: wheel zoom (non-passive, deltaMode-normalized, factor `exp(Δy·s)` clamped [0.5, 2] per event, anchored at pointer), single-pointer drag pan (pointer capture), two-finger pinch (factor = oldDist/newDist, midpoint anchor + midpoint pan), mouse hover → `screenToWorld`, `pointerleave` → `onHover(null)`; `detach()` removes every listener and clears state.

**React components — `src/components/graph/` (5 files):**

- `GraphCanvas.tsx` — `forwardRef<GraphCanvasHandle>` imperative canvas surface; owns renderer lifecycle (`initialize`/`destroy`); `role="img"` with accessible description.
- `GraphViewport.tsx` — store-connected orchestrator: `ResizeObserver` sizing, interaction wiring, theme resolution (`system` → matchMedia + change listener, SSR-safe), render scheduling, debounced store sync (see Interaction architecture).
- `GraphToolbar.tsx` — icon-only toolbar: zoom in/out, reset, fit, grid toggle, axes toggle. Native buttons with `aria-label`, `title`, `focus-visible` rings, `aria-pressed` on toggles.
- `CoordinateDisplay.tsx` — hover readout; `setCoordinates()` writes `textContent`/`visibility` imperatively (zero React state on mousemove); `aria-hidden`.
- `GraphErrorBoundary.tsx` — graph-specific error boundary with retry.

**Tests — `src/lib/graph/__tests__/` (5 files, 71 tests):** `coordinate-system.test.ts` (13), `viewport.test.ts` (23), `grid.test.ts` (25), `axes.test.ts` (7), `transforms.test.ts` (3).

**Config:** `vitest.config.ts` (`src/**/*.test.ts`, node environment).

## Files modified (6)

- `src/components/graph/GraphPanel.tsx` — placeholder swapped for `<GraphErrorBoundary><GraphViewport /></GraphErrorBoundary>`.
- `src/components/calculator/CalculatorToolbar.tsx` — local `scaleViewport` replaced with `zoomViewport` from the new library (same 0.8/1.25 behavior, single implementation).
- `src/components/ui/icons.tsx` — added `MinusIcon`, `ResetViewIcon`, `FitViewIcon`, `GridIcon`, `AxesIcon` in the existing 24×24 stroke style.
- `package.json` / `package-lock.json` — vitest devDependency + `test` script.
- `docs/PHASE1-REPORT.md` — prettier reformat only (no content change).

## Files deleted (2)

- `src/lib/graph/GraphEngine.ts` — Phase 1 placeholder superseded by `renderer.ts` + `viewport.ts` + `coordinate-system.ts` (grep confirmed zero external imports).
- `src/components/graph/GraphCanvasPlaceholder.tsx` — replaced by the real graph (only `GraphPanel` imported it).

## Dependencies added

- `vitest` (devDependency, 16 packages) + `"test": "vitest run"` script. No runtime dependencies added.

## Rendering architecture

- **Canvas 2D is the only render surface.** React never renders graph primitives — no DOM grid lines, no SVG point clouds.
- **Controlled render loop:** rendering happens only via explicit `render()` / rAF-coalesced `scheduleRender()` / `resize()` calls. No `setInterval`, no infinite animation frames, no render-on-every-mousemove.
- **DPR correctness:** `setupCanvas` sizes the backing store as `cssSize × dpr` (dpr clamped to [1, 3], backing store clamped to 8192px per dimension), then `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` so all drawing code works in CSS pixels. 1px lines snapped with `Math.round(p) + 0.5`.
- **Draw order:** background → minor grid → major grid → axes → tick labels → origin marker → drawables (empty in Phase 2).
- **Adaptive grid:** major interval from the nice-tick algorithm targeting ~80px; minor lines at major/5 only when ≥14px apart; tick count hard-capped at 2000; labels trimmed (`'2'`, `'2.5'`, `'0'`), exponential notation at extremes.
- **Theme:** renderer consumes the centralized `GraphTheme`; components pass `'light' | 'dark'` and never hard-code colors. Theme changes re-render without remounting.
- **Phase 3 seam:** `GraphRenderer.render()` already accepts `GraphDrawable[]` and strokes `FunctionDrawable` segment polylines (splitting on non-finite points). Phase 2 passes `[]`; Phase 3 adds the sampler that produces the segments. No math lives in the renderer.

## Interaction architecture

- **Separation of state kinds:** the _renderer_ owns the live viewport during gestures (imperative, 60fps-capable, zero React renders); the _store_ is the persistent source of truth; _transient_ pointer state (hover coords, drag positions) never enters React state.
- **Store sync:** gestures call `queueStoreSync` — a 150ms trailing debounce dispatching `SET_VIEWPORT`; `flushStoreSync` runs on interaction end and unmount so `localStorage` persistence converges. The `[state.viewport]` effect applies store→renderer only when they differ beyond 1e-12 relative epsilon, so the debounced echo never causes a render loop.
- **Gestures:** wheel → cursor-anchored zoom (the world point under the cursor is recomputed via `screenToWorld` and held fixed by `zoomViewport`); drag → pan with `shiftX = −dx·unitsPerPixelX()`, `shiftY = dy·unitsPerPixelY()` (content follows the cursor); two-finger pinch → zoom by distance ratio anchored at the midpoint plus midpoint pan; mouse hover → imperative coordinate readout; `pointerleave`/`pointercancel` handled; all listeners removed on unmount.
- **Resize:** `ResizeObserver` on the container → `renderer.resize()` → immediate render. No React re-render on resize.
- **Viewport clamping:** spans clamped to [1e-9, 1e15]; non-finite factors/deltas/sizes are ignored rather than propagated. NaN/Infinity can never reach canvas APIs (sanitized at the renderer boundary).
- **Accessibility:** `role="img"` + accurate label on the canvas ("Interactive Cartesian coordinate graph…", no claim of full mathematical accessibility); keyboard-operable toolbar (native buttons, visible focus); toggles expose `aria-pressed`; hover readout is `aria-hidden` (visual aid only).

## Tests added

71 unit tests across 5 files, all passing (`npm test` → 71/71):

- `coordinate-system.test.ts` (13): exact mappings (origin → center pixel on ±10/800×600), positive/negative coords, round-trips at 9-digit precision, viewport-change sensitivity, zero-span safety, `sanitizeNumber`.
- `viewport.test.ts` (23): default ±10, validate accept/reject/center-preserving clamp, zoom 0.5×/2×, cursor-anchored zoom holds the anchor fixed, invalid factors → unchanged copy, pan shifts, non-finite pan → unchanged, reset, `fitViewportToDrawables` stub.
- `grid.test.ts` (25): nice intervals 2 / 0.1 / 200 for normal/tiny/large spans, {1,2,5,10}×10ⁿ form invariant, `computeTicks(-5,5,2)` → `[-4,-2,0,2,4]`, 2000-tick cap, label formatting (integers, decimals, negatives, tiny, huge), `computeGrid` structure.
- `axes.test.ts` (7): both axes visible on default viewport (x-axis ≈ y300, y-axis ≈ x400), off-view axis hides with edge-pinned labels, origin `'0'` exactly once.
- `transforms.test.ts` (3): `getDevicePixelRatio()` → 1 in node, `snapToPixel`.

## Build result

- `tsc --noEmit`: **0 errors**
- `eslint .`: **0 errors, 0 warnings**
- `prettier --check .`: **pass**
- `npm test` (vitest run): **71/71 pass**
- `npm run build` (astro build): **8 pages, 0 errors**, complete in ~4s
- `grep console.log src/`: none. No new `client:` hydration directives (only the pre-existing `client:load` islands).

## Known non-blocking issues

1. **No live-browser visual QA.** Subagents cannot operate a browser, so the 1366/1440/1920 desktop and 375/390/430 mobile checks from §26 were not performed visually. Mitigations in place: DPR clamping, ResizeObserver-driven sizing, `touch-action: none` bounded to the canvas region, responsive flex layout inherited from Phase 1, and unit-tested geometry. Recommend a manual pass before launch.
2. **DOM-dependent code is not unit-tested:** `setupCanvas`, `GraphInteractionController`, renderer draw calls, and the React components have no jsdom/component tests (node environment only). Pure logic is fully covered.
3. **`niceTickInterval(worldSpan, …)` ignores `worldSpan`** — the interval derives solely from `pixelsPerUnit`. The parameter is kept for API stability; consider removing or documenting it in Phase 3.
4. **`fitViewportToDrawables` is an honest stub** — with no drawable bounds support yet it returns the default viewport. Real content-fitting logic belongs to Phase 3.
5. **No function plotting** — per spec §27 the renderer accepts drawables but Phase 2 passes `[]`; curves arrive in Phase 3.
6. Pre-existing placeholders unchanged: `siteUrl` is still `https://example.com`, social links still empty.
