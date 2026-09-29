# Phase 4 Report — Mathematical Analysis Tools

**Date:** 2026-09-29
**Branch:** `main` (local commit; push handled by parent agent)
**Status:** ✅ Complete — all validation gates passed

## Scope delivered

Phase 4 adds a full mathematical analysis layer on top of the Phase 1–3
calculator, continuing the existing architecture (no restructuring, no branding
changes, nothing copied from Desmos). Delivered:

- **Numerical core** (`src/lib/math/analysis.ts`): Brent-style bracketed root
  refinement, bounded all-roots scan (sign-change + even-multiplicity
  touch-root detection), pairwise intersections, adaptive central-difference
  derivatives, adaptive Simpson quadrature with convergence reporting,
  one-sided/two-sided numerical limits (converges / does-not-exist / unbounded
  with direction), local extrema via scan + golden-section refinement,
  tangent/normal line computation with equation formatting. All routines are
  finite-safe (NaN collapses), iteration/evaluation-capped, and never throw on
  hostile input.
- **MathEngine integration** (`src/lib/math/engine.ts`): the Phase 3
  `findRoots` / `derivative` / `integral` / `intersection` stubs are now real
  numerical implementations reusing `compileExpression()` and its LRU cache.
- **Value tables** (`src/lib/math/table.ts`): fixed-step + auto-step tables
  with 1/2/5 "nice" step selection, row cap with honest truncation metadata,
  domain errors shown as `null` rows.
- **Precision system** (`src/lib/math/format.ts`): decimal vs. significant-digit
  formatting, `—`/`∞`/`−∞` for non-finite output, sanitization, numeric-input
  parsing.
- **Persisted analysis state** (`AnalysisState` in `src/types/calculator.ts`,
  defaults + hydration sanitizer in `src/lib/analysis/state.ts`, reducer
  actions in `CalculatorStore.tsx`): precision settings, graph markers
  (root/intersection/extremum), integral shadings, tangent/normal lines,
  derivative plots, point annotations, inspected point. Sanitizer drops invalid
  entries on load — bad localStorage data can never corrupt the UI.
- **Graph rendering** (`src/lib/graph/types.ts`, `renderer.ts`,
  `analysisDrawables.ts`): point markers, dashed tangent/normal segments
  (clipped to viewport), filled integral area polygons (split at domain gaps),
  annotation dots + labels, derived `f′(x)` curve plots.
- **Tap-to-inspect** (`interaction.ts`, `GraphViewport.tsx`,
  `InspectedPointCard.tsx`): tap (not drag) on a curve snaps to the nearest
  point within 28 CSS px, shows a floating readout, and offers "add tangent"
  / "add annotation" actions.
- **Analysis panel** (`src/components/analysis/AnalysisPanel.tsx`,
  `ValueTable.tsx`): per-expression collapsible sections with precision
  controls, value tables (keyboard-navigable), roots, intersections,
  derivative-at-point + derived f′ plot toggle, definite integrals + shading,
  limits, extrema, tangent/normal computation + graph toggles, annotations,
  and "use tapped point" integration. Honest empty/failure states throughout
  ("no roots found", "could not converge", "—").

Out of scope per spec and NOT built: AI, variables/sliders,
parametric/polar/inequalities, auth, payments, database, sharing, SEO.

## Validation

| Check                            | Result                                                        |
| -------------------------------- | ------------------------------------------------------------- |
| `npx tsc --noEmit`               | 0 errors                                                      |
| `npx eslint .`                   | 0 errors, 0 warnings                                          |
| `npx prettier --check .`         | clean                                                         |
| `npm test`                       | **232/232 passed** (18 files) — 145 Phase 3 baseline + 87 new |
| `npm run build`                  | clean, **8 pages** (unchanged)                                |
| `eval()` / `new Function()` grep | no occurrences outside code comments                          |

New test files: `analysis.test.ts` (45 tests: Brent roots, all-roots incl.
even-multiplicity, intersections, derivatives, Simpson integrals,
limits incl. one-sided/unbounded/oscillation, extrema, tangent/normal,
equation formatting), `format.test.ts`, `table.test.ts`,
`analysisEngine.test.ts` (MathEngine integration), `analysisDrawables.test.ts`
(line clipping, integral polygons, hostile input), `state.test.ts`
(hydration sanitizer). One stale Phase 3 test asserting analysis methods threw
`NOT_IMPLEMENTED` was updated to assert the new behavior.

Spot-checked numerical correctness in tests: `x^2−4 → {−2, 2}`,
`∫₀¹x²dx = 1/3`, `d/dx sin = cos`, `lim sin(x)/x = 1`,
`tangent to x² at 1 is y = 2x − 1`.

## Files

- 79 TypeScript/TSX source files total.
- New: `src/lib/math/analysis.ts`, `src/lib/math/table.ts`,
  `src/lib/math/format.ts`, `src/lib/analysis/state.ts`,
  `src/lib/graph/analysisDrawables.ts`,
  `src/components/analysis/AnalysisPanel.tsx`,
  `src/components/analysis/ValueTable.tsx`,
  `src/components/graph/InspectedPointCard.tsx`, 6 new test files.
- Modified (12): types, store, expressions init, engine, MathEngine,
  graph types/renderer/interaction, GraphViewport, GraphPanel,
  CalculatorPage, Phase 3 engine test.

## Known non-blockers

- Limits are numerical heuristics: very slowly converging limits (e.g.
  `√x → 0` at 0) are answered by geometric extrapolation within ~1e-7 of the
  true value; pathological oscillation is reported as "does not exist".
- Tap inspection only works on Cartesian curves visible in the current
  viewport (Phase 5 types do not exist yet).
- `siteUrl` remains the `https://example.com` placeholder (unchanged from
  Phase 1; production domain TBD).

## Handoff

- Report: `docs/PHASE4-REPORT.md`
- Archive: `~/workspace/graphing-calculator-phase4-20260929.zip`
- **STOP — Phase 5 starts only on the next spec.**
