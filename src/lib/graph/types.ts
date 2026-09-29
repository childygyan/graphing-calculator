/**
 * Phase 2 graph-engine types: drawable model, render input, and point types.
 *
 * Pure data shapes only — no rendering, no math, no DOM. The drawable union
 * grows in later phases (parametric, polar, points, inequalities, ...); the
 * renderer already ignores unknown kinds gracefully.
 */

import type { GraphViewport, GraphSettings } from '../../types/calculator.js';

/** CSS pixels, origin at the canvas top-left. */
export interface ScreenPoint {
  x: number;
  y: number;
}

/** Math coordinates in the current viewport. */
export interface WorldPoint {
  x: number;
  y: number;
}

/** Canvas dimensions in CSS pixels. Both must be > 0. */
export interface CanvasSize {
  width: number;
  height: number;
}

export type GraphDrawableKind =
  'function' | 'parametric' | 'polar' | 'point' | 'segment' | 'shape' | 'inequality-region';

export interface GraphDrawableBase {
  kind: GraphDrawableKind;
  id: string;
  color: string;
  lineWidth: number;
  visible: boolean;
}

/**
 * Precomputed polyline data for a y = f(x) curve, in world coordinates.
 * Sampling happens in Phase 3+; Phase 2 only strokes these segments.
 */
export interface FunctionDrawable extends GraphDrawableBase {
  kind: 'function';
  /** One or more disjoint polylines. Segments with < 2 finite points are skipped. */
  segments: WorldPoint[][];
}

/** Drawable union — extended with new kinds in later phases. */
export type GraphDrawable = FunctionDrawable;

export type GraphThemeMode = 'light' | 'dark';

export interface GraphRenderInput {
  viewport: GraphViewport;
  settings: GraphSettings;
  size: CanvasSize;
  theme: GraphThemeMode;
  drawables: GraphDrawable[];
}
