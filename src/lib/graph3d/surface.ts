/**
 * Workstream A — surface sampler for z = f(x, y).
 *
 * Compiles a user expression in two variables by reusing the project's
 * own tokenizer, parser, and scoped compiler (no eval/new Function).
 * `sampleSurface` evaluates the compiled function over a regular grid;
 * NaN/Infinity results become honest gaps (null vertices) so quads that
 * touch them are skipped, mirroring how the 2D engine breaks curves at
 * asymptotes.
 */

import { tokenize } from '../math/tokenizer.js';
import { parse } from '../math/parser.js';
import { collectVariables } from '../math/ast.js';
import { compileScopedAst } from '../math/compiler.js';
import { normalizeExpressionSource } from '../math/normalize.js';
import type { Vec3 } from './vec3.js';

/** A compiled z = f(x, y) function. */
export type SurfaceFunction = (x: number, y: number) => number;

/** Rectangular sampling domain in the xy-plane. */
export interface SurfaceDomain {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/** Default domain: x and y each span [−5, 5]. */
export const DEFAULT_DOMAIN: SurfaceDomain = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };

/** Minimum/maximum supported grid divisions (inclusive). */
export const MIN_DIVISIONS = 16;
export const MAX_DIVISIONS = 64;

/**
 * Display box for the z-axis. Surfaces whose natural z-span exceeds this
 * are uniformly shrunk to fit (see fitSurfaceZ); smaller spans render 1:1
 * so proportions stay honest.
 */
export const DISPLAY_Z_SPAN = 11;

/** A surface with z values remapped for display, plus the applied scale. */
export interface FittedSurface {
  surface: SampledSurface;
  /** 1 when no rescaling was needed; < 1 when z was shrunk to fit. */
  zScale: number;
}

/**
 * Fit a sampled surface into the z display box. Only shrinks: when the
 * natural z-span fits, vertices pass through unchanged (zScale = 1).
 * NaN gaps stay gaps; the returned zMin/zMax describe the DISPLAYED
 * range — use the original surface for honest statistics.
 */
export function fitSurfaceZ(
  surface: SampledSurface,
  maxSpan: number = DISPLAY_Z_SPAN
): FittedSurface {
  const span = surface.zMax - surface.zMin;
  if (!Number.isFinite(span) || span <= maxSpan || span === 0) {
    return { surface, zScale: 1 };
  }
  const zScale = maxSpan / span;
  const zMid = (surface.zMin + surface.zMax) / 2;
  const vertices = surface.vertices.map((row) =>
    row.map((v) => (v ? { ...v, z: zMid + (v.z - zMid) * zScale } : null))
  );
  return {
    surface: {
      ...surface,
      vertices,
      zMin: zMid - maxSpan / 2,
      zMax: zMid + maxSpan / 2,
    },
    zScale,
  };
}

/**
 * A sampled surface: (divisions + 1)² vertices in row-major order
 * (rows step y, columns step x). A null entry is an honest gap —
 * the function was undefined there.
 */
export interface SampledSurface {
  divisions: number;
  domain: SurfaceDomain;
  /** Row-major grid; vertex at (col, row) sits at (x(col), y(row)). */
  vertices: (Vec3 | null)[][];
  /** Minimum finite z over the grid (NaN when nothing is finite). */
  zMin: number;
  /** Maximum finite z over the grid (NaN when nothing is finite). */
  zMax: number;
  /** Number of finite vertices (diagnostics / a11y summary). */
  finiteCount: number;
}

/**
 * Evaluate f over the domain grid. z values are used raw — extreme but
 * finite values are kept; NaN/Infinity become gaps.
 */
export function sampleSurface(
  fn: SurfaceFunction,
  domain: SurfaceDomain,
  divisions: number
): SampledSurface {
  const clamped = Math.round(Math.min(MAX_DIVISIONS, Math.max(MIN_DIVISIONS, divisions)));
  const size = clamped + 1;
  const vertices: (Vec3 | null)[][] = [];
  let zMin = Infinity;
  let zMax = -Infinity;
  let finiteCount = 0;

  for (let row = 0; row < size; row += 1) {
    const y = domain.yMin + ((domain.yMax - domain.yMin) * row) / clamped;
    const gridRow: (Vec3 | null)[] = [];
    for (let col = 0; col < size; col += 1) {
      const x = domain.xMin + ((domain.xMax - domain.xMin) * col) / clamped;
      let z: number;
      try {
        z = fn(x, y);
      } catch {
        z = NaN;
      }
      if (typeof z !== 'number' || !Number.isFinite(z)) {
        gridRow.push(null);
        continue;
      }
      gridRow.push({ x, y, z });
      if (z < zMin) zMin = z;
      if (z > zMax) zMax = z;
      finiteCount += 1;
    }
    vertices.push(gridRow);
  }

  return {
    divisions: clamped,
    domain,
    vertices,
    zMin: finiteCount > 0 ? zMin : NaN,
    zMax: finiteCount > 0 ? zMax : NaN,
    finiteCount,
  };
}

/**
 * Error thrown when a surface expression is invalid: parse failures or
 * variables other than x and y.
 */
export class SurfaceCompileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SurfaceCompileError';
  }
}

/**
 * Compile a source expression into a z = f(x, y) function using the
 * project's own tokenizer, parser, and scoped compiler. `x` binds to the
 * first argument; `y` resolves through a mutable box so the compiled
 * closure never touches eval/new Function. Variables other than x and y
 * (case-insensitive) are rejected honestly instead of evaluating to NaN.
 */
export function compileSurface(source: string): {
  fn: SurfaceFunction;
  variables: string[];
} {
  const normalized = normalizeExpressionSource(source);
  let ast;
  try {
    ast = parse(tokenize(normalized));
  } catch (error) {
    throw new SurfaceCompileError(
      error instanceof Error ? error.message : 'Could not parse that expression.'
    );
  }

  const variables = [...collectVariables(ast)];
  const unknown = variables.filter(
    (name) => name.toLowerCase() !== 'x' && name.toLowerCase() !== 'y'
  );
  if (unknown.length > 0) {
    throw new SurfaceCompileError(
      `Unknown variable${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}. ` +
        '3D surfaces use x and y only.'
    );
  }

  // Mutable box read live by the compiled closure on every call.
  let yCurrent = 0;
  const compiled = compileScopedAst(ast, {
    parameter: 'x',
    resolveVariable: (name) => (name.toLowerCase() === 'y' ? yCurrent : NaN),
  });

  const fn: SurfaceFunction = (x, y) => {
    yCurrent = y;
    return compiled(x);
  };
  return { fn, variables };
}
