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
  | 'function'
  | 'parametric'
  | 'polar'
  | 'point'
  | 'segment'
  | 'shape'
  | 'inequality-region'
  | 'area'
  | 'annotation';

export interface GraphDrawableBase {
  kind: GraphDrawableKind;
  id: string;
  color: string;
  lineWidth: number;
  visible: boolean;
  /** Dashed stroke (used for tangent/normal lines and derivative plots). */
  dashed?: boolean;
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

/**
 * Marker dots at world positions (roots, intersections, extrema).
 * Phase 4 renders these as filled circles.
 */
export interface PointMarkerDrawable extends GraphDrawableBase {
  kind: 'point';
  points: WorldPoint[];
  /** Circle radius in CSS pixels. Default 5. */
  radius?: number;
}

/** A straight line segment between two world points (tangent/normal lines). */
export interface SegmentDrawable extends GraphDrawableBase {
  kind: 'segment';
  from: WorldPoint;
  to: WorldPoint;
}

/**
 * Filled region(s), e.g. integral shading between a curve and the x-axis.
 * Each polygon is a closed ring in world coordinates.
 */
export interface AreaDrawable extends GraphDrawableBase {
  kind: 'area';
  polygons: WorldPoint[][];
  /** Fill opacity 0–1. Default 0.25. */
  fillOpacity?: number;
}

/** A user annotation: a dot plus a short text label at a world position. */
export interface AnnotationDrawable extends GraphDrawableBase {
  kind: 'annotation';
  at: WorldPoint;
  label: string;
}

/**
 * Precomputed polyline data for a parametric (x(t), y(t)) curve, in world
 * coordinates. Same shape as FunctionDrawable; a distinct kind so the
 * renderer and future inspection tools can tell curve families apart.
 */
export interface ParametricDrawable extends GraphDrawableBase {
  kind: 'parametric';
  /** One or more disjoint polylines. Segments with < 2 finite points are skipped. */
  segments: WorldPoint[][];
}

/**
 * Precomputed polyline data for a polar r(theta) curve, sampled over
 * theta in [0, 2π] and converted to Cartesian world coordinates.
 */
export interface PolarDrawable extends GraphDrawableBase {
  kind: 'polar';
  /** One or more disjoint polylines. Segments with < 2 finite points are skipped. */
  segments: WorldPoint[][];
}

/**
 * A shaded inequality region (y < f(x), y > f(x), x < g(y), …) plus its
 * boundary curve. The boundary is dashed for strict inequalities
 * (<, >) and solid for non-strict (≤, ≥).
 */
export interface InequalityDrawable extends GraphDrawableBase {
  kind: 'inequality-region';
  /** Filled region polygons in world coordinates (closed rings). */
  polygons: WorldPoint[][];
  /** Fill opacity 0–1. Default 0.25. */
  fillOpacity?: number;
  /** The boundary curve, in world coordinates. */
  boundary: WorldPoint[][];
  /** True for strict inequalities (<, >): the boundary renders dashed. */
  boundaryDashed: boolean;
}

/** Drawable union — extended with new kinds in later phases. */
export type GraphDrawable =
  | FunctionDrawable
  | ParametricDrawable
  | PolarDrawable
  | PointMarkerDrawable
  | SegmentDrawable
  | AreaDrawable
  | InequalityDrawable
  | AnnotationDrawable;

export type GraphThemeMode = 'light' | 'dark';

export interface GraphRenderInput {
  viewport: GraphViewport;
  settings: GraphSettings;
  size: CanvasSize;
  theme: GraphThemeMode;
  drawables: GraphDrawable[];
}
