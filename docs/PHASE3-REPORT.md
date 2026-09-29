# Phase 3 Report — Expression Engine & Real Function Plotting

**Date:** 2026-09-29
**Status:** Complete, validated, committed locally (no push per workflow)

## What was built

The calculator now parses and plots real math expressions. Phase 2's empty
coordinate plane is wired to a full expression pipeline:

**Expression engine** (`src/lib/math/`, 7 new modules, 1155 lines)

- `normalize.ts` — unicode mapping (× ÷ − π √ ∛ superscripts), function
  aliases (arcsin→asin, ln→log, …), `y =` / `f(x) =` prefix stripping,
  whitespace collapsing to a stable cache key.
- `tokenizer.ts` — tokens with character offsets; structured
  `ParseError(position)`.
- `parser.ts` — recursive-descent grammar with precedence, unary signs,
  parentheses, function calls, bare application (`sin x`), and implicit
  multiplication (`2x`, `3(x+1)`). `-3^2` parses as `-(3^2)`; `^` is
  right-associative.
- `functions.ts` — allowlisted safe math library (trig, inverse trig,
  hyperbolic, exp, log/ln, log10, roots, abs, floor/ceil/round/trunc,
  sign, min/max; constants pi, e, tau).
- `compiler.ts` — AST → pure `(x) => y` closure. No `eval()`, no
  `new Function()` — verified by grep. Division by zero and domain errors
  return `NaN`.
- `engine.ts` — end-to-end normalize→tokenize→parse→compile with an LRU
  compiled-expression cache (500 entries, keyed by normalized source).
- `MathEngine.ts` — factory now returns the real `ExpressionMathEngine`.
  Roots/derivatives/integrals/intersections still throw honest
  `NOT_IMPLEMENTED` (Phase 4 scope).

**Graph pipeline** (`src/lib/graph/`, 2 new modules)

- `sampling.ts` — screen-aware adaptive sampler: one base sample per CSS
  pixel, curvature-based midpoint refinement (depth/sample caps), NaN
  domain gaps, singular-interval chord dropping (no streak through 1/x or
  tan asymptotes), off-screen chord dropping (32+ spans), and a final
  screen-jump streak guard. Emitted y clamped to ±10⁴ spans.
- `drawables.ts` — compiles Cartesian and Point expressions into Phase 2
  `FunctionDrawable` segments. Invalid, hidden, and non-Cartesian/Point
  expressions are skipped.

**Phase 2 fixes**

- `grid.ts` — `niceTickInterval` signature simplified; the ignored
  `worldSpan` parameter removed (also fixed in `axes.ts`).
- `viewport.ts` — `fitViewportToDrawables()` is now real: scans finite
  drawable bounds, ignores `|y| > 1e6` asymptote artifacts, 10% padding,
  graceful fallback.

**UI wiring**

- `GraphViewport.tsx` — builds drawables from expressions (cached on
  expressions+viewport+size), feeds them to the renderer, passes
  `getDrawables` to the toolbar.
- `GraphToolbar.tsx` — Fit View now fits actual drawable bounds.
- `ExpressionRow.tsx` / `ExpressionList.tsx` — working editor: color
  picker, rename, inline parse errors with positions, Cartesian + Point
  add/duplicate/visibility/delete.
- `icons.tsx` — `DuplicateIcon`, `PencilIcon`.

## Validation (exact numbers)

| Check                    | Result                                                        |
| ------------------------ | ------------------------------------------------------------- |
| `npx tsc --noEmit`       | 0 errors                                                      |
| `npx eslint .`           | 0 problems                                                    |
| `npx prettier --check .` | all files pass                                                |
| `npm test` (vitest)      | **145/145 pass**, 12 files (Phase 2 baseline was 71; +74 new) |
| `npm run build`          | clean, **8 pages**, 0 errors                                  |

New test files: `normalize`, `tokenizer`, `parser`, `compiler`, `engine`
(math), `sampling`, `drawables` (graph). `grid.test.ts` updated for the new
tick signature; `viewport.test.ts` extended with real fit-viewport tests.

## Bugs found and fixed during validation

1. `parseUnary` recursed to itself, making `-3^2` parse as `(-3)^2` (= 9).
   Fixed so unary minus binds looser than `^`: `-3^2 = -(3^2)` (= −9).
2. Whitespace removal in the normalizer merged bare function application
   (`sin x` → `sinx`). Normalizer now collapses whitespace to single
   spaces; `√`/`∛` emit a trailing space (`√16` → `sqrt 16`).
3. Base sampling ignored the `maxSamples` budget (800 base > 100 budget).
   Base column count is now clamped to the budget.
4. The singular interval's own chord was drawn as a streak through x = 0
   for 1/x. Singular leaves are now skipped with breaks on both sides.
5. Refinement fragments near asymptotes: intervals with both endpoints
   32+ spans off-screen are dropped (same-side = invisible, opposite-side
   = streak).

## Known issues (non-blocking)

- No dev-server/browser visual QA was run in this phase; rendering is
  covered by unit tests and the untouched Phase 2 renderer contract.
- Point expressions render as a degenerate 2-point line segment with
  round caps (renderer contract unchanged by design).
- `siteUrl` is still the placeholder `https://example.com` (unchanged,
  not Phase 3 scope).
- Analysis methods (roots, derivatives, integrals, intersections) throw
  `NOT_IMPLEMENTED` — Phase 4 scope.

## Out of scope (not started, per spec)

AI assistant, sliders/variables, parametric/polar/inequalities, auth,
payments, database, sharing, SEO.

## Commit

Local commit on `main` (not pushed): `2ec8bf9`
(`2ec8bf9b5b352a95de540f19a5991800225aad5d`).
