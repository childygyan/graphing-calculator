/**
 * Phase 4 numerical analysis: roots, intersections, derivatives, integrals,
 * limits, extrema, and tangent/normal lines.
 *
 * Everything here is purely numerical over Phase 3 compiled functions —
 * there is no symbolic manipulation. Every routine is bounded (iteration
 * and evaluation caps) and total: domain failures surface as NaN, null, or
 * an honest status value, never as a throw, so the UI can report them
 * instead of freezing or crashing.
 */

import type { CompiledFunction } from './compiler.js';
import { formatNumber } from './format.js';
import type { PrecisionSettings } from '../../types/calculator.js';

export interface AnalysisOptions {
  /** Absolute/relative tolerance for convergence tests. Default 1e-10. */
  tolerance?: number;
  /** Hard cap on function evaluations per call. Default 20000. */
  maxEvaluations?: number;
  /** Hard cap on refinement iterations. Default 100. */
  maxIterations?: number;
}

export const DEFAULT_TOLERANCE = 1e-10;
export const DEFAULT_MAX_EVALUATIONS = 20000;
export const DEFAULT_MAX_ITERATIONS = 100;

interface ResolvedOptions {
  tolerance: number;
  maxEvaluations: number;
  maxIterations: number;
}

function resolveOptions(options?: AnalysisOptions): ResolvedOptions {
  const tolerance =
    typeof options?.tolerance === 'number' &&
    Number.isFinite(options.tolerance) &&
    options.tolerance > 0
      ? options.tolerance
      : DEFAULT_TOLERANCE;
  const maxEvaluations =
    typeof options?.maxEvaluations === 'number' && options.maxEvaluations > 0
      ? Math.floor(options.maxEvaluations)
      : DEFAULT_MAX_EVALUATIONS;
  const maxIterations =
    typeof options?.maxIterations === 'number' && options.maxIterations > 0
      ? Math.floor(options.maxIterations)
      : DEFAULT_MAX_ITERATIONS;
  return { tolerance, maxEvaluations, maxIterations };
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/** Evaluate, collapsing non-finite results (domain gaps) to NaN. */
export function evalFinite(fn: CompiledFunction, x: number): number {
  if (!isFiniteNumber(x)) return NaN;
  const y = fn(x);
  return isFiniteNumber(y) ? y : NaN;
}

/**
 * Brent's method on [a, b]. Requires a sign change (or exact zero) with
 * finite endpoint values. Returns null when there is no bracket or the
 * iteration cap is hit — never throws.
 */
export function brentRoot(
  fn: CompiledFunction,
  a: number,
  b: number,
  options?: AnalysisOptions
): number | null {
  const { tolerance, maxIterations } = resolveOptions(options);
  let fa = evalFinite(fn, a);
  let fb = evalFinite(fn, b);
  if (!isFiniteNumber(fa) || !isFiniteNumber(fb)) return null;
  if (fa * fb > 0) return null;
  if (Math.abs(fa) < Math.abs(fb)) {
    [a, b] = [b, a];
    [fa, fb] = [fb, fa];
  }
  let c = a;
  let fc = fa;
  let d = b - a;
  let e = d;
  for (let i = 0; i < maxIterations; i++) {
    if (Math.abs(fc) < Math.abs(fb)) {
      a = b;
      b = c;
      c = a;
      fa = fb;
      fb = fc;
      fc = fa;
    }
    const tol = 2 * Number.EPSILON * Math.abs(b) + tolerance / 2;
    const m = 0.5 * (c - b);
    if (Math.abs(m) <= tol || fb === 0) return b;
    if (Math.abs(e) >= tol && Math.abs(fa) > Math.abs(fb)) {
      // Inverse quadratic interpolation (secant when a === c).
      const s = fb / fa;
      let p: number;
      let q: number;
      if (a === c) {
        p = 2 * m * s;
        q = 1 - s;
      } else {
        const q2 = fa / fc;
        const r = fb / fc;
        p = s * (2 * m * q2 * (q2 - r) - (b - a) * (r - 1));
        q = (q2 - 1) * (r - 1) * (s - 1);
      }
      if (p > 0) q = -q;
      else p = -p;
      const prevE = e;
      e = d;
      if (2 * p < Math.min(3 * m * q - Math.abs(tol * q), Math.abs(prevE * q))) {
        d = p / q;
      } else {
        d = m;
        e = m;
      }
    } else {
      d = m;
      e = m;
    }
    a = b;
    fa = fb;
    if (Math.abs(d) > tol) b += d;
    else b += m > 0 ? tol : -tol;
    fb = evalFinite(fn, b);
    if (!isFiniteNumber(fb)) return null;
    if ((fb > 0 && fc > 0) || (fb < 0 && fc < 0)) {
      c = a;
      fc = fa;
      d = b - a;
      e = d;
    }
  }
  return null;
}

/** Golden-section minimization of fn on [a, b] (fn must be finite inside). */
function goldenMinimize(
  fn: CompiledFunction,
  a: number,
  b: number,
  iterations: number
): { x: number; value: number } {
  const gr = (Math.sqrt(5) - 1) / 2;
  let lo = a;
  let hi = b;
  let c = hi - gr * (hi - lo);
  let d = lo + gr * (hi - lo);
  let fc = evalFinite(fn, c);
  let fd = evalFinite(fn, d);
  for (let i = 0; i < iterations; i++) {
    if (!isFiniteNumber(fc) || !isFiniteNumber(fd)) break;
    if (fc < fd) {
      hi = d;
      d = c;
      fd = fc;
      c = hi - gr * (hi - lo);
      fc = evalFinite(fn, c);
    } else {
      lo = c;
      c = d;
      fc = fd;
      d = lo + gr * (hi - lo);
      fd = evalFinite(fn, d);
    }
  }
  const x = (lo + hi) / 2;
  const value = evalFinite(fn, x);
  return { x, value };
}

export interface RootScanOptions extends AnalysisOptions {
  /** Subintervals scanned for brackets. Default 240, clamped to [8, 2000]. */
  scanIntervals?: number;
}

/**
 * Find all roots of fn in [a, b]: scan for sign changes (Brent-refined)
 * plus exact sample hits and even-multiplicity "touch" roots caught by
 * minimizing |f| where it dips at a midpoint. Roots closer than one scan
 * width are merged. Bounded by maxEvaluations.
 */
export function findAllRoots(
  fn: CompiledFunction,
  a: number,
  b: number,
  options?: RootScanOptions
): number[] {
  const resolved = resolveOptions(options);
  if (!isFiniteNumber(a) || !isFiniteNumber(b) || a === b) return [];
  if (a > b) [a, b] = [b, a];
  const intervals = Math.min(2000, Math.max(8, Math.floor(options?.scanIntervals ?? 240)));
  const width = (b - a) / intervals;
  const zeroTol = Math.max(resolved.tolerance, 1e-12);
  const roots: number[] = [];
  let evaluations = 0;
  const counted: CompiledFunction = (x: number) => {
    evaluations++;
    return evalFinite(fn, x);
  };

  for (let i = 0; i < intervals; i++) {
    if (evaluations >= resolved.maxEvaluations) break;
    const x0 = a + i * width;
    const x1 = x0 + width;
    const xm = (x0 + x1) / 2;
    const f0 = counted(x0);
    const f1 = counted(x1);
    if (!isFiniteNumber(f0) || !isFiniteNumber(f1)) continue;
    // Exact (or near-exact) hit at the left sample.
    if (Math.abs(f0) <= zeroTol) {
      roots.push(x0);
      continue;
    }
    // Odd-multiplicity bracket → Brent.
    if (f0 * f1 < 0) {
      if (evaluations < resolved.maxEvaluations) {
        const root = brentRoot(counted, x0, x1, options);
        if (root !== null) roots.push(root);
      }
      continue;
    }
    // Even-multiplicity "touch": |f| dips at the midpoint → minimize |f|.
    const fm = counted(xm);
    if (isFiniteNumber(fm) && Math.abs(fm) < Math.min(Math.abs(f0), Math.abs(f1))) {
      const absF: CompiledFunction = (x: number) => Math.abs(counted(x));
      const { x, value } = goldenMinimize(absF, x0, x1, 60);
      if (isFiniteNumber(value) && value <= zeroTol * 100 && isFiniteNumber(x)) {
        roots.push(x);
      }
    }
  }

  roots.sort((p, q) => p - q);
  const merged: number[] = [];
  const mergeGap = width * 0.75;
  for (const root of roots) {
    const last = merged[merged.length - 1];
    if (last === undefined || Math.abs(root - last) > mergeGap) merged.push(root);
  }
  return merged;
}

export interface IntersectionPoint {
  x: number;
  y: number;
}

/**
 * Intersections of f and g in [a, b]: roots of (f − g), with y taken from
 * f at each root. Points where either function is non-finite are dropped.
 */
export function findIntersections(
  f: CompiledFunction,
  g: CompiledFunction,
  a: number,
  b: number,
  options?: RootScanOptions
): IntersectionPoint[] {
  const difference: CompiledFunction = (x: number) => {
    const fv = evalFinite(f, x);
    const gv = evalFinite(g, x);
    return isFiniteNumber(fv) && isFiniteNumber(gv) ? fv - gv : NaN;
  };
  return findAllRoots(difference, a, b, options)
    .map((x) => ({ x, y: evalFinite(f, x) }))
    .filter((p): p is IntersectionPoint => isFiniteNumber(p.y));
}

/**
 * Central-difference derivative with one step-halving refinement. Returns
 * NaN at domain gaps or when the difference quotient will not settle.
 */
export function centralDerivative(
  fn: CompiledFunction,
  x: number,
  options?: AnalysisOptions
): number {
  const { tolerance } = resolveOptions(options);
  if (!isFiniteNumber(x)) return NaN;
  // Cube-root-of-epsilon step balances truncation vs. rounding error.
  let h = Math.cbrt(Number.EPSILON) * Math.max(1, Math.abs(x));
  let previous = NaN;
  let best = NaN;
  for (let k = 0; k < 3; k++) {
    const fp = evalFinite(fn, x + h);
    const fm = evalFinite(fn, x - h);
    if (isFiniteNumber(fp) && isFiniteNumber(fm) && h !== 0) {
      const d = (fp - fm) / (2 * h);
      if (isFiniteNumber(previous) && Math.abs(d - previous) <= tolerance * (1 + Math.abs(d))) {
        return d;
      }
      previous = d;
      best = d;
    }
    h /= 2;
  }
  return best;
}

export interface IntegralOptions extends AnalysisOptions {
  /** Recursion depth for adaptive Simpson. Default 16. */
  maxDepth?: number;
}

export interface IntegralResult {
  value: number;
  converged: boolean;
  evaluations: number;
}

function simpsonRule(fa: number, fm: number, fb: number, a: number, b: number): number {
  return ((b - a) / 6) * (fa + 4 * fm + fb);
}

/**
 * Adaptive Simpson's rule for the definite integral over [a, b].
 * Reversed bounds are handled (negated). When the function is non-finite
 * anywhere sampled or the budget is exhausted, converged is false and the
 * value is NaN — the caller decides how to report that honestly.
 */
export function adaptiveSimpson(
  fn: CompiledFunction,
  a: number,
  b: number,
  options?: IntegralOptions
): IntegralResult {
  const resolved = resolveOptions(options);
  const maxDepth =
    typeof options?.maxDepth === 'number' && options.maxDepth > 0
      ? Math.floor(options.maxDepth)
      : 16;
  if (!isFiniteNumber(a) || !isFiniteNumber(b)) {
    return { value: NaN, converged: false, evaluations: 0 };
  }
  if (a === b) return { value: 0, converged: true, evaluations: 0 };
  let sign = 1;
  let lo = a;
  let hi = b;
  if (a > b) {
    sign = -1;
    lo = b;
    hi = a;
  }
  let evaluations = 0;
  const counted: CompiledFunction = (x: number) => {
    if (evaluations >= resolved.maxEvaluations) return NaN;
    evaluations++;
    return evalFinite(fn, x);
  };
  const fa = counted(lo);
  const m = (lo + hi) / 2;
  const fm = counted(m);
  const fb = counted(hi);
  if (!isFiniteNumber(fa) || !isFiniteNumber(fm) || !isFiniteNumber(fb)) {
    return { value: NaN, converged: false, evaluations };
  }
  const whole = simpsonRule(fa, fm, fb, lo, hi);

  const recurse = (
    left: number,
    fLeft: number,
    mid: number,
    fMid: number,
    right: number,
    fRight: number,
    wholeEstimate: number,
    tol: number,
    depth: number
  ): { value: number; ok: boolean } => {
    const leftMid = (left + mid) / 2;
    const fLeftMid = counted(leftMid);
    const rightMid = (mid + right) / 2;
    const fRightMid = counted(rightMid);
    if (!isFiniteNumber(fLeftMid) || !isFiniteNumber(fRightMid)) {
      return { value: NaN, ok: false };
    }
    const leftEstimate = simpsonRule(fLeft, fLeftMid, fMid, left, mid);
    const rightEstimate = simpsonRule(fMid, fRightMid, fRight, mid, right);
    const delta = leftEstimate + rightEstimate - wholeEstimate;
    if (depth <= 0) return { value: leftEstimate + rightEstimate + delta / 15, ok: false };
    if (Math.abs(delta) <= 15 * tol) {
      return { value: leftEstimate + rightEstimate + delta / 15, ok: true };
    }
    const first = recurse(
      left,
      fLeft,
      leftMid,
      fLeftMid,
      mid,
      fMid,
      leftEstimate,
      tol / 2,
      depth - 1
    );
    const second = recurse(
      mid,
      fMid,
      rightMid,
      fRightMid,
      right,
      fRight,
      rightEstimate,
      tol / 2,
      depth - 1
    );
    return { value: first.value + second.value, ok: first.ok && second.ok };
  };

  const { value, ok } = recurse(lo, fa, m, fm, hi, fb, whole, resolved.tolerance, maxDepth);
  return { value: ok ? sign * value : NaN, converged: ok, evaluations };
}

export type LimitSide = 'left' | 'right' | 'two-sided';

export interface LimitResult {
  status: 'converges' | 'unbounded' | 'does-not-exist' | 'indeterminate';
  /** The limit value when status is 'converges'. */
  value?: number;
  /** Sign of infinity when status is 'unbounded'. */
  direction?: 1 | -1;
}

/**
 * Numerical limit of fn at c, approached geometrically (10^-1 … 10^-14).
 * Reports convergence, consistent blow-up (±∞), oscillation / one-sided
 * mismatch ("does not exist"), or "indeterminate" when the function is not
 * defined near c at all. Never throws.
 */
export function numericLimit(
  fn: CompiledFunction,
  c: number,
  side: LimitSide = 'two-sided',
  options?: AnalysisOptions
): LimitResult {
  const { tolerance } = resolveOptions(options);
  if (!isFiniteNumber(c)) return { status: 'indeterminate' };

  const probe = (direction: 1 | -1): number[] => {
    const values: number[] = [];
    const scale = Math.max(1, Math.abs(c));
    for (let k = 1; k <= 14; k++) {
      const h = scale * Math.pow(10, -k);
      if (h === 0) break;
      values.push(evalFinite(fn, c + direction * h));
    }
    return values;
  };

  const analyze = (values: number[]): LimitResult => {
    const finite = values.filter(isFiniteNumber);
    if (finite.length < 5) return { status: 'indeterminate' };
    const tail = finite.slice(-8);
    const scale = 1 + Math.max(...tail.map(Math.abs));
    const diffs: number[] = [];
    for (let i = 1; i < tail.length; i++) diffs.push(tail[i] - tail[i - 1]);
    const lastDiff = diffs[diffs.length - 1];

    // Fast convergence: the tail has settled within tolerance.
    if (Math.abs(lastDiff) <= tolerance * scale) {
      return { status: 'converges', value: tail[tail.length - 1] };
    }

    // Geometric convergence: successive differences shrink by a steady
    // ratio r < 1 (e.g. removable discontinuities, slow roots like
    // sqrt). Extrapolate the geometric tail to estimate the limit.
    if (diffs.length >= 4) {
      const recent = diffs.slice(-4);
      const ratios: number[] = [];
      let geometric = true;
      for (let i = 1; i < recent.length; i++) {
        if (recent[i - 1] === 0) {
          geometric = false;
          break;
        }
        const r = recent[i] / recent[i - 1];
        if (!(r > 0 && r < 0.95)) {
          geometric = false;
          break;
        }
        ratios.push(r);
      }
      if (geometric && ratios.length === 3) {
        const r = ratios[ratios.length - 1];
        const correction = (lastDiff * r) / (1 - r);
        return { status: 'converges', value: tail[tail.length - 1] + correction };
      }
    }

    // Unbounded: magnitudes grow geometrically and end up large.
    const recent = tail.slice(-6);
    let growing = true;
    for (let i = 1; i < recent.length; i++) {
      if (!(Math.abs(recent[i]) > 1.5 * Math.abs(recent[i - 1]))) {
        growing = false;
        break;
      }
    }
    const last = recent[recent.length - 1];
    if (growing && Math.abs(last) > 1e4) {
      return { status: 'unbounded', direction: last > 0 ? 1 : -1 };
    }
    return { status: 'does-not-exist' };
  };

  const closeEnough = (u: number, v: number): boolean =>
    Math.abs(u - v) <= tolerance * 10 * (1 + Math.max(Math.abs(u), Math.abs(v)));

  if (side === 'left') return analyze(probe(-1));
  if (side === 'right') return analyze(probe(1));

  const left = analyze(probe(-1));
  const right = analyze(probe(1));
  if (left.status === 'converges' && right.status === 'converges') {
    const lv = left.value as number;
    const rv = right.value as number;
    if (closeEnough(lv, rv)) return { status: 'converges', value: (lv + rv) / 2 };
    return { status: 'does-not-exist' };
  }
  if (
    left.status === 'unbounded' &&
    right.status === 'unbounded' &&
    left.direction === right.direction
  ) {
    return { status: 'unbounded', direction: left.direction };
  }
  if (left.status === 'indeterminate' || right.status === 'indeterminate') {
    return { status: 'indeterminate' };
  }
  return { status: 'does-not-exist' };
}

export interface Extremum {
  x: number;
  y: number;
  kind: 'min' | 'max';
}

export interface ExtremaOptions extends AnalysisOptions {
  /** Samples scanned for candidate brackets. Default 400, clamped [16, 2000]. */
  scanSamples?: number;
}

/**
 * Local minima/maxima in [a, b]: scan for strict sample-level extrema,
 * refine each bracket with golden-section search, dedupe. Flat plateaus
 * are not reported (strict inequality required).
 */
export function findExtrema(
  fn: CompiledFunction,
  a: number,
  b: number,
  options?: ExtremaOptions
): Extremum[] {
  const resolved = resolveOptions(options);
  if (!isFiniteNumber(a) || !isFiniteNumber(b) || a === b) return [];
  if (a > b) [a, b] = [b, a];
  const samples = Math.min(2000, Math.max(16, Math.floor(options?.scanSamples ?? 400)));
  const width = (b - a) / samples;
  const results: Extremum[] = [];
  let evaluations = 0;
  const counted: CompiledFunction = (x: number) => {
    evaluations++;
    return evalFinite(fn, x);
  };

  // Walk runs of consecutive finite samples so NaN gaps never bracket.
  let run: { x: number; y: number }[] = [];
  const flushRun = (): void => {
    for (let i = 1; i < run.length - 1; i++) {
      if (evaluations >= resolved.maxEvaluations) return;
      const prev = run[i - 1];
      const curr = run[i];
      const next = run[i + 1];
      const isMin = curr.y < prev.y && curr.y < next.y;
      const isMax = curr.y > prev.y && curr.y > next.y;
      if (!isMin && !isMax) continue;
      const target: CompiledFunction = isMin
        ? counted
        : (x: number) => {
            const v = counted(x);
            return isFiniteNumber(v) ? -v : NaN;
          };
      const { x, value } = goldenMinimize(target, prev.x, next.x, 60);
      if (!isFiniteNumber(x) || !isFiniteNumber(value)) continue;
      results.push(isMin ? { x, y: value, kind: 'min' } : { x, y: -value, kind: 'max' });
    }
    run = [];
  };

  for (let i = 0; i <= samples; i++) {
    if (evaluations >= resolved.maxEvaluations) break;
    const x = a + i * width;
    const y = counted(x);
    if (!isFiniteNumber(y)) {
      flushRun();
      continue;
    }
    run.push({ x, y });
  }
  flushRun();

  results.sort((p, q) => p.x - q.x);
  const merged: Extremum[] = [];
  for (const r of results) {
    const last = merged[merged.length - 1];
    if (last && Math.abs(r.x - last.x) <= width * 0.75 && r.kind === last.kind) continue;
    merged.push(r);
  }
  return merged;
}

export type LineSpec =
  { kind: 'explicit'; slope: number; intercept: number } | { kind: 'vertical'; x: number };

export interface TangentInfo {
  x: number;
  y: number;
  slope: number;
  tangent: LineSpec;
  normal: LineSpec;
}

/**
 * Tangent and normal lines of fn at x. Returns null when the point is
 * outside the domain or the derivative will not settle. A horizontal
 * tangent yields a vertical normal and vice versa.
 */
export function tangentAt(
  fn: CompiledFunction,
  x: number,
  options?: AnalysisOptions
): TangentInfo | null {
  if (!isFiniteNumber(x)) return null;
  const y = evalFinite(fn, x);
  if (!isFiniteNumber(y)) return null;
  const slope = centralDerivative(fn, x, options);
  if (!isFiniteNumber(slope)) return null;
  const tangent: LineSpec = { kind: 'explicit', slope, intercept: y - slope * x };
  const normal: LineSpec =
    Math.abs(slope) < 1e-12
      ? { kind: 'vertical', x }
      : { kind: 'explicit', slope: -1 / slope, intercept: y + x / slope };
  return { x, y, slope, tangent, normal };
}

/** Human-readable equation for a line spec, e.g. "y = 2x - 1" or "x = 3". */
export function lineEquation(spec: LineSpec, precision?: PrecisionSettings): string {
  const f = (n: number): string => formatNumber(n, precision);
  if (spec.kind === 'vertical') return `x = ${f(spec.x)}`;
  const { slope, intercept } = spec;
  if (slope === 0) return `y = ${f(intercept)}`;
  const slopePart = slope === 1 ? 'x' : slope === -1 ? '-x' : `${f(slope)}x`;
  if (intercept === 0) return `y = ${slopePart}`;
  const sign = intercept > 0 ? '+' : '-';
  const abs = f(Math.abs(intercept));
  return `y = ${slopePart} ${sign} ${abs}`;
}
