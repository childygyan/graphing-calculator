/**
 * Centralized graph color theme. All graph chrome (background, grid, axes,
 * labels, origin marker) resolves through here so light/dark mode stays
 * consistent in one place. Expression colors are separate (user-chosen).
 */

import type { GraphThemeMode } from './types.js';

export interface GraphTheme {
  background: string;
  gridMajor: string;
  gridMinor: string;
  axis: string;
  tickLabel: string;
  origin: string;
}

export const lightGraphTheme: GraphTheme = {
  background: '#ffffff',
  gridMajor: '#e2e8f0',
  gridMinor: '#f1f5f9',
  // Phase 9 a11y: axis was slate-400 (#94a3b8, 2.56:1) — below the WCAG
  // 3:1 minimum for essential UI. Slate-500 is 4.76:1 on white.
  axis: '#64748b',
  tickLabel: '#475569',
  origin: '#64748b',
};

export const darkGraphTheme: GraphTheme = {
  background: '#0f172a',
  gridMajor: '#1e293b',
  gridMinor: '#162032',
  // Phase 9 a11y: axis was slate-600 (#475569, 2.36:1) on slate-900.
  // Slate-400 is 6.96:1.
  axis: '#94a3b8',
  tickLabel: '#94a3b8',
  origin: '#cbd5e1',
};

/** Resolve a theme mode to its palette; anything but 'dark' is light. */
export function resolveGraphTheme(mode: GraphThemeMode): GraphTheme {
  return mode === 'dark' ? darkGraphTheme : lightGraphTheme;
}
