# Phase 7 Report — Graph State, Save, Share, Import & Export

**Date:** 2026-09-29
**Branch:** `main` (local commit; push handled by parent agent)
**Status:** ✅ Complete — all validation gates passed

## Scope delivered

Phase 7 adds persistence, sharing, import/export, and undo/redo on top of
the Phase 1–6 calculator, continuing the existing architecture (no
restructuring, no branding changes, nothing copied from Desmos).

- **Versioned graph document** (`src/lib/persistence/document.ts`):
  `GraphDocument` (`app: 'graphing-calculator'`, `version: 1`, name,
  expressions, variables, viewport, settings, selectedExpressionId, theme,
  analysis, savedAt). `stateToDocument` / `documentToState`; the transient
  inspected point is intentionally dropped. `migrateDocument`: missing
  version → legacy v0 (the store's own old localStorage shape, which must
  carry an expressions array); v1 → pass-through for strict validation;
  future versions → honest "newer than this app supports" error, never a
  crash. `summarizeDocument` builds the human-readable import preview
  (pure string formatting, no math).
- **Strict validation** (`src/lib/persistence/validate.ts`, hand-rolled —
  no new dependency, same convention as Phase 6): every imported/loaded
  document is rejected with clear messages on malformed shapes. Enforces
  the import limits: 256 KB raw size, ≤100 expressions, ≤50 variables,
  definition strings ≤4000 chars, table cells ≤5000, finite viewport with
  min<max, valid variable names, no duplicate ids, no dangling
  `selectedExpressionId`, strict analysis-state shapes.
- **Named local saves + restore** (`src/lib/persistence/storage.ts`):
  localStorage library (`graphing-calculator-saved-graphs-v1`), max 50
  saves; list (newest first), save/overwrite-by-name, rename, delete,
  restore. Corrupt entries are skipped on read; quota/private-mode
  failures return honest errors. Autosave draft behavior from Phase 1
  (whole state to localStorage on every change) is unchanged.
- **Shareable URLs** (`src/lib/persistence/share.ts`): document JSON →
  deflate-raw via platform `CompressionStream` (falls back to plain
  base64url when unavailable; picks the shorter of the two) → base64url
  into a `#s=…` hash on the new **`/graph/` route**. Payloads are data:
  length-capped (300k chars), nesting-depth-guarded, JSON-parsed, then
  migrated + strictly validated. `/graph/` renders `noindex, nofollow`
  (verified in built HTML), decodes client-side, shows honest errors for
  bad links, and mounts the calculator with `persistStorage={false}` so
  opening a link never clobbers the visitor's draft.
- **JSON import with preview** (`ImportDialog`): file picker or paste →
  size pre-check → JSON.parse → migrate → strict validate → preview
  (expression summaries, variables, viewport) → confirm → import.
  Oversized/malformed input is rejected with honest messages; imported
  data is never executed.
- **JSON/PNG export** (`src/lib/persistence/transfer.ts`): document
  download as `.json`; graph canvas exported as PNG rendered offscreen at
  2x (theme-aware background) via a single-slot canvas registry that
  `GraphViewport` registers/unregisters.
- **Equation copying**: all expressions as plain-text lines
  (`y = x^2`, …) via Clipboard API with a textarea+execCommand fallback.
- **Undo/redo** (`src/lib/persistence/history.ts` + store wiring):
  history-aware dispatch in `CalculatorProvider`; undoable actions =
  expression add/edit/delete/duplicate/visibility, variable changes,
  viewport reset, and analysis add/update/remove (SET_VIEWPORT excluded —
  gesture floods; selection/theme/transient inspection excluded). Cap 50.
  Keyboard: Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z / Ctrl+Y redo, never
  hijacking native text-field undo. Loads (restore/import/share/undo)
  start a fresh history branch.
- **Dirty-state tracking** (`src/lib/persistence/dirty.ts`):
  canonical (key-sorted) JSON snapshot vs a baseline captured at
  load/restore/explicit save; key order from hydrated documents can't
  false-positive. Amber dot on the Save button; `beforeunload` warns only
  when actually dirty.
- **UI** (`src/components/persistence/`): `PersistenceControls` in the
  calculator toolbar (undo, redo, Save + dirty dot, My graphs, Share,
  Export menu, Import, Copy equations); accessible dialogs built on the
  existing `Modal` (labels, Escape to close, focus management inherited);
  inline confirms before any replacing/destructive action; toast feedback
  via the existing `Toast` system (now mounted in `CalculatorPage`);
  mobile-friendly wrapping toolbar. 10 new stroke icons in the project's
  original icon set.
- **Security**: import limits + strict validation; `JSON.parse` only,
  never `eval`/`new Function` (grep-verified); share payloads validated
  the same way; no secrets anywhere near the client.

Out of scope per spec and NOT built: accounts, cloud DB, payments,
public discovery, SEO pages.

## Validation

| Check                       | Result                                                          |
| --------------------------- | --------------------------------------------------------------- |
| `npx tsc --noEmit`          | 0 errors                                                        |
| `npx eslint .`              | 0 errors, 0 warnings                                            |
| `npx prettier --check .`    | clean                                                           |
| `npm test`                  | **418/418 passed** (35 files) — 362 Phase 1–6 baseline + 56 new |
| `npm run build`             | clean, **9 pages** (was 8; new `/graph/` share route)           |
| `eval()` / `new Function()` | none in new code (grep-verified)                                |
| `/graph/` robots meta       | `noindex, nofollow` confirmed in `dist/graph/index.html`        |
| Share round-trip            | real deflate-raw encode→decode verified in tests (Node 22)      |

New tests (6 files, 56 tests): `document` (round-trip, v0 migration,
future-version rejection, summaries), `validate` (malformed shapes,
all import limits), `share` (encode/decode round-trip incl. plain mode,
corrupted/oversized/deeply-nested payloads, hash helpers), `history`
(transitions, redo-branch clearing, 50-deep cap), `dirty`
(key-order-insensitive snapshots, tracker), `storage` (save/list/
rename/delete, name-collision overwrite, 50-save cap, corrupt-entry
skipping, no-window SSR safety).

## Files

- New (7 lib + 6 test + 3 components + 1 route):
  `src/lib/persistence/document.ts`, `validate.ts`, `share.ts`,
  `storage.ts`, `transfer.ts`, `history.ts`, `dirty.ts`,
  `src/lib/persistence/__tests__/*.test.ts` (6),
  `src/components/persistence/PersistenceControls.tsx`,
  `PersistenceDialogs.tsx`, `SharedGraphLoader.tsx`,
  `src/pages/graph/index.astro`.
- Modified: `src/components/calculator/CalculatorStore.tsx`
  (history-aware dispatch, undo/redo, dirty tracking, keyboard shortcuts,
  beforeunload, `initialDocument`/`persist` props, exported reducer),
  `CalculatorPage.tsx` (props + `ToastProvider`), `CalculatorToolbar.tsx`
  (persistence controls group), `src/components/graph/GraphViewport.tsx`
  (canvas registration), `src/components/ui/icons.tsx` (10 new icons),
  `src/data/site.ts` (`graphSharing: true`).

## Known non-blockers

- `siteUrl` remains the `https://example.com` placeholder (unchanged;
  production domain TBD) — share links use `window.location.origin` at
  runtime, so they are correct on any host.
- The existing Phase 1 autosave (whole state → localStorage on every
  change) still runs alongside named saves; the dirty flag is measured
  against the last _named save / load / restore_, which is the documented
  semantic ("Unsaved changes" = not yet in the named library).
- PNG export upscales the live canvas bitmap 2x (the canvas already
  renders at device pixel ratio) rather than re-rendering vector output.
- Undo/redo covers content actions; viewport pan/zoom gestures are
  intentionally excluded (Reset view is the undoable viewport action).

## Handoff

- Report: `docs/PHASE7-REPORT.md`
- Archive: `~/workspace/graphing-calculator-phase7-20260929.zip`
- **STOP — Phase 8 starts only on the next instruction.**
