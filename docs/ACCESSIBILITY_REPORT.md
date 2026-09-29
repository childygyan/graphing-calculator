# Accessibility Report — Phase 9 (2026-09-29)

Target: WCAG 2.2 AA. Method: code audit + computed contrast ratios
(`src/lib/a11y/contrast.ts`, pinned by `contrast.test.ts`) + static
markup review. No automated browser runner was available in this
environment; a manual screen-reader/browser pass is flagged for Phase 10.

## Fixes shipped

1. **Graph axis contrast (real failure found by the new tests).**
   Light axis `#94a3b8` on white was 2.56:1; dark axis `#475569` on
   `#0f172a` was 2.36:1 — both below the 3:1 minimum for essential UI.
   Fixed: light axis → `#64748b` (4.76:1), dark axis → `#94a3b8`
   (6.96:1). Tick labels already passed (7.58:1 light, 6.96:1 dark).
2. **Modal focus trap + focus restore** (`src/components/ui/Modal.tsx`).
   Previously Tab could leave an `aria-modal="true"` dialog and focus
   was lost on close. Now: focus cycles inside the dialog, Escape closes,
   and focus returns to the invoking element (WCAG 2.1.2, 2.4.3).
3. **Reduced motion honored globally** (`src/styles/global.css`).
   `scroll-smooth` now applies only under
   `prefers-reduced-motion: no-preference`; a `reduce` guard collapses
   all transitions/animations to near-instant (WCAG 2.3.3). The slider
   animation loop was already JS-gated; the play button is disabled with
   an explanation when reduced motion is on.

## Contrast ratios (measured, all ≥ AA)

| Pair                                       | Ratio | Requirement |
| ------------------------------------------ | ----- | ----------- |
| Light tick labels `#475569` on `#ffffff`   | 7.58  | ≥ 4.5 ✓     |
| Dark tick labels `#94a3b8` on `#0f172a`    | 6.96  | ≥ 4.5 ✓     |
| Light axis `#64748b` on `#ffffff` (fixed)  | 4.76  | ≥ 3 ✓       |
| Dark axis `#94a3b8` on `#0f172a` (fixed)   | 6.96  | ≥ 3 ✓       |
| Body slate-500 `#64748b` on white          | 4.76  | ≥ 4.5 ✓     |
| Dark body slate-400 `#94a3b8` on `#020617` | 7.87  | ≥ 4.5 ✓     |
| Brand-700 `#4338ca` nav links on white     | 7.90  | ≥ 4.5 ✓     |
| White on blue-600 `#2563eb` (AI button)    | 5.17  | ≥ 4.5 ✓     |
| White on brand-600 `#4f46e5` (skip link)   | 6.29  | ≥ 4.5 ✓     |
| Success toast `#065f46` on `#ecfdf5`       | 7.29  | ≥ 4.5 ✓     |
| Error toast `#991b1b` on `#fef2f2`         | 7.60  | ≥ 4.5 ✓     |

Expression curve colors are user-chosen and exempt (content, not UI);
default palette colors are saturated hues, and curves are distinguished
by label/legend as well as color.

## Audit checklist (verified in code)

- **Keyboard:** calculator toolbar, expression rows, sliders, graph
  toolbar (zoom/reset/axes toggles all real `<button>`s), chat open/
  close/send, dialogs (Escape + trap), mobile menu (`<details>`),
  theme toggle — all reachable and operable by keyboard.
- **Focus visible:** global `:focus-visible` ring (brand-500, 2px +
  offset) in both themes; no `focus:outline-none` without a
  `focus-visible` replacement (the one `focus:outline-none` in AiChat
  pairs with `focus-visible:ring-2`).
- **Screen reader:** skip link; `aria-label`s on icon-only buttons;
  `role="dialog" aria-modal` + labelled headings; chat `role="log"`
  `aria-live="polite"`; toasts `role="status"` in a live region;
  canvas has `role="img"` + descriptive `aria-label`;
  `aria-pressed` on toggle buttons; `aria-current="page"` on nav.
- **Touch targets:** all interactive controls ≥ 28px (smallest: modal
  close 28px, chat close 28px); WCAG 2.2 AA minimum is 24px.
- **Reduced motion:** covered above; no auto-playing animation remains
  for `reduce` users.

## Known limitations / Phase 10 follow-ups

- No screen-reader (NVDA/VoiceOver) or real-device pass was possible
  here — schedule one before launch.
- The CSS-only mobile `<details>` menu does not close on Escape;
  minor, acceptable (links remain keyboard-accessible).
- Graph canvas interaction is pointer-first; keyboard users get the
  toolbar zoom/reset controls and the expression table as the
  data-equivalent. A keyboard-driven "move viewport" control is a
  possible future enhancement, not a Phase 9 regression.
