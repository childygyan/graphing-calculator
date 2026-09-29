/**
 * AnalysisPanel — mathematical analysis tools for Cartesian expressions.
 *
 * One collapsible section per visible analysis tool, per Cartesian
 * expression: value tables, roots, intersections, derivatives, integrals,
 * limits, extrema, tangent/normal lines, plus precision settings and the
 * annotation list. Numeric findings that should appear on the graph
 * (markers, integral shading, tangent lines, derivative plots) are written
 * to the store; throwaway numbers stay in local component state.
 *
 * Everything here is honest about failure: invalid expressions, empty
 * results, and non-convergent computations each get their own message.
 */

import { useMemo, useState } from 'react';
import type { Dispatch, ReactNode } from 'react';
import { useCalculator } from '../calculator/CalculatorStore.js';
import type { CalculatorAction } from '../calculator/CalculatorStore.js';
import { Panel } from '../ui/Panel.js';
import { Button } from '../ui/Button.js';
import { TextInput } from '../ui/TextInput.js';
import { compileExpression } from '../../lib/math/engine.js';
import {
  adaptiveSimpson,
  centralDerivative,
  findAllRoots,
  findExtrema,
  findIntersections,
  lineEquation,
  numericLimit,
  tangentAt,
} from '../../lib/math/analysis.js';
import type { CompiledFunction } from '../../lib/math/compiler.js';
import type {
  Extremum,
  ExtremaOptions,
  IntegralResult,
  IntersectionPoint,
  LimitResult,
  LimitSide,
  TangentInfo,
} from '../../lib/math/analysis.js';
import { buildValueTable } from '../../lib/math/table.js';
import type { ValueTable as ValueTableData } from '../../lib/math/table.js';
import { formatNumber, parseNumericInput } from '../../lib/math/format.js';
import type {
  AnalysisMarkerKind,
  CartesianExpression,
  Expression,
  PrecisionSettings,
} from '../../types/calculator.js';
import { createExpressionId } from '../../lib/expressions/expressions.js';
import { ValueTable } from './ValueTable.js';

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

interface SectionProps {
  expression: CartesianExpression;
  fn: CompiledFunction;
  precision: PrecisionSettings;
}

function SectionTitle({ children }: { children: ReactNode }): ReactNode {
  return (
    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {children}
    </h4>
  );
}

function ResultLine({ children }: { children: ReactNode }): ReactNode {
  return (
    <p className="mt-2 rounded-md bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 dark:bg-slate-800 dark:text-slate-100">
      {children}
    </p>
  );
}

function EmptyNote({ children }: { children: ReactNode }): ReactNode {
  return <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{children}</p>;
}

/** Pin computed points on the graph, replacing this expression+kind group. */
function usePinMarkers(expression: CartesianExpression) {
  const { state, dispatch } = useCalculator();
  return (kind: AnalysisMarkerKind, points: { x: number; y: number }[]): void => {
    const keep = state.analysis.markers.filter(
      (m) => !(m.expressionId === expression.id && m.kind === kind)
    );
    const add = points.map((p) => ({
      id: createExpressionId(),
      kind,
      x: p.x,
      y: p.y,
      expressionId: expression.id,
      color: expression.color,
      visible: true,
    }));
    dispatch({ type: 'SET_MARKERS', markers: [...keep, ...add] });
  };
}

function useClearMarkers(expression: CartesianExpression) {
  const { state, dispatch } = useCalculator();
  return (kind: AnalysisMarkerKind): void => {
    const keep = state.analysis.markers.filter(
      (m) => !(m.expressionId === expression.id && m.kind === kind)
    );
    if (keep.length !== state.analysis.markers.length) {
      dispatch({ type: 'SET_MARKERS', markers: keep });
    }
  };
}

/** Fill an x-input from the currently inspected graph point. */
function useInspectedX(expressionId: string, setX: (v: string) => void) {
  const { state } = useCalculator();
  const inspected = state.inspectedPoint;
  if (!inspected || inspected.expressionId !== expressionId) return null;
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setX(String(inspected.x))}
      title="Use the point selected by tapping the graph"
    >
      Use tapped point
    </Button>
  );
}

function NumericInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <TextInput
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type="text"
    />
  );
}

// ---------------------------------------------------------------------------
// Precision controls
// ---------------------------------------------------------------------------

function PrecisionControls({
  precision,
  dispatch,
}: {
  precision: PrecisionSettings;
  dispatch: Dispatch<CalculatorAction>;
}) {
  const set = (patch: Partial<PrecisionSettings>): void => {
    const mode = patch.mode ?? precision.mode;
    const maxDigits = mode === 'significant' ? 15 : 12;
    const minDigits = mode === 'significant' ? 1 : 0;
    const digits = Math.min(
      maxDigits,
      Math.max(minDigits, Math.floor(patch.digits ?? precision.digits))
    );
    dispatch({ type: 'UPDATE_PRECISION', precision: { mode, digits } });
  };
  return (
    <div className="mb-3 flex flex-wrap items-end gap-3">
      <div>
        <span
          id="precision-mode-label"
          className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Format
        </span>
        <div role="group" aria-labelledby="precision-mode-label" className="flex gap-1">
          {(
            [
              ['decimals', 'Decimals'],
              ['significant', 'Significant'],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              aria-pressed={precision.mode === mode}
              onClick={() => set({ mode })}
              className={
                precision.mode === mode
                  ? 'rounded-md bg-brand-600 px-3 py-1.5 text-xs font-medium text-white'
                  : 'rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-28">
        <TextInput
          label={precision.mode === 'significant' ? 'Digits (1–15)' : 'Places (0–12)'}
          value={String(precision.digits)}
          onChange={(v) => {
            const n = parseNumericInput(v);
            if (n !== null) set({ digits: n });
          }}
          type="text"
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Value table
// ---------------------------------------------------------------------------

function TableSection({ expression, fn, precision }: SectionProps) {
  const [start, setStart] = useState('-10');
  const [end, setEnd] = useState('10');
  const [step, setStep] = useState('auto');
  const [table, setTable] = useState<ValueTableData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const build = (): void => {
    const s = parseNumericInput(start);
    const e = parseNumericInput(end);
    if (s === null || e === null) {
      setError('Enter valid numbers for start and end.');
      setTable(null);
      return;
    }
    let resolvedStep: number | 'auto' = 'auto';
    const trimmed = step.trim().toLowerCase();
    if (trimmed !== '' && trimmed !== 'auto') {
      const n = parseNumericInput(trimmed);
      if (n === null || n <= 0) {
        setError('Step must be a positive number or "auto".');
        setTable(null);
        return;
      }
      resolvedStep = n;
    }
    setError(null);
    setTable(buildValueTable(fn, s, e, resolvedStep));
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Table of values</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        <NumericInput label="Start" value={start} onChange={setStart} placeholder="-10" />
        <NumericInput label="End" value={end} onChange={setEnd} placeholder="10" />
        <NumericInput label='Step ("auto")' value={step} onChange={setStep} placeholder="auto" />
      </div>
      <div className="mt-2">
        <Button size="sm" variant="secondary" onClick={build}>
          Build table
        </Button>
      </div>
      {error ? <EmptyNote>{error}</EmptyNote> : null}
      {table ? (
        <div className="mt-2">
          <ValueTable
            rows={table.rows}
            totalRows={table.totalRows}
            truncated={table.truncated}
            step={table.step}
            precision={precision}
            title={`Table of values for ${expression.label}`}
          />
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Roots
// ---------------------------------------------------------------------------

function RootsSection({ expression, fn, precision }: SectionProps) {
  const { state } = useCalculator();
  const pinMarkers = usePinMarkers(expression);
  const clearMarkers = useClearMarkers(expression);
  const [a, setA] = useState(String(state.viewport.xMin));
  const [b, setB] = useState(String(state.viewport.xMax));
  const [roots, setRoots] = useState<number[] | null>(null);
  const [pinned, setPinned] = useState(false);

  const find = (): void => {
    const lo = parseNumericInput(a);
    const hi = parseNumericInput(b);
    if (lo === null || hi === null || lo === hi) {
      setRoots(null);
      return;
    }
    const found = findAllRoots(fn, lo, hi);
    setRoots(found);
    if (pinned) {
      pinMarkers(
        'root',
        found.map((x) => ({ x, y: fn(x) }))
      );
    }
  };

  const togglePinned = (): void => {
    const next = !pinned;
    setPinned(next);
    if (!next) {
      clearMarkers('root');
      return;
    }
    const list =
      roots ??
      (() => {
        const lo = parseNumericInput(a);
        const hi = parseNumericInput(b);
        if (lo === null || hi === null || lo === hi) return [];
        return findAllRoots(fn, lo, hi);
      })();
    setRoots(list);
    pinMarkers(
      'root',
      list.map((x) => ({ x, y: fn(x) }))
    );
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Roots</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        <NumericInput label="From" value={a} onChange={setA} />
        <NumericInput label="To" value={b} onChange={setB} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button size="sm" variant="secondary" onClick={find}>
          Find roots
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setA(String(state.viewport.xMin));
            setB(String(state.viewport.xMax));
          }}
        >
          Use viewport
        </Button>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={pinned} onChange={togglePinned} />
          Show on graph
        </label>
      </div>
      {roots === null ? null : roots.length === 0 ? (
        <EmptyNote>No roots found in this range.</EmptyNote>
      ) : (
        <ul className="mt-2 space-y-1">
          {roots.map((x, i) => (
            <li key={i} className="font-mono text-sm text-slate-900 dark:text-slate-100">
              x = {formatNumber(x, precision)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Intersections
// ---------------------------------------------------------------------------

function IntersectionsSection({
  expression,
  fn,
  precision,
  all,
}: SectionProps & { all: Expression[] }) {
  const { state } = useCalculator();
  const pinMarkers = usePinMarkers(expression);
  const clearMarkers = useClearMarkers(expression);
  const others = all.filter((e) => e.kind === 'cartesian' && e.id !== expression.id);
  const [otherId, setOtherId] = useState(others[0]?.id ?? '');
  const [points, setPoints] = useState<IntersectionPoint[] | null>(null);
  const [pinned, setPinned] = useState(false);

  const other = others.find((e) => e.id === otherId) as CartesianExpression | undefined;

  const compute = (): IntersectionPoint[] => {
    if (!other) return [];
    let g: CompiledFunction;
    try {
      g = compileExpression(other.definition.rhs).fn;
    } catch {
      return [];
    }
    return findIntersections(fn, g, state.viewport.xMin, state.viewport.xMax);
  };

  const find = (): void => {
    const found = compute();
    setPoints(found);
    if (pinned) pinMarkers('intersection', found);
  };

  const togglePinned = (): void => {
    const next = !pinned;
    setPinned(next);
    if (!next) {
      clearMarkers('intersection');
      return;
    }
    const list = points ?? compute();
    setPoints(list);
    pinMarkers('intersection', list);
  };

  if (others.length === 0) {
    return (
      <div className="border-t border-slate-100 py-3 dark:border-slate-800">
        <SectionTitle>Intersections</SectionTitle>
        <EmptyNote>Add a second Cartesian expression to find intersections.</EmptyNote>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Intersections</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">With</span>
          <select
            value={otherId}
            onChange={(e) => {
              setOtherId(e.target.value);
              setPoints(null);
              setPinned(false);
              clearMarkers('intersection');
            }}
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {others.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}: y = {(o as CartesianExpression).definition.rhs}
              </option>
            ))}
          </select>
        </label>
        <Button size="sm" variant="secondary" onClick={find}>
          Find intersections
        </Button>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={pinned} onChange={togglePinned} />
          Show on graph
        </label>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Searched within the current viewport x-range.
      </p>
      {points === null ? null : points.length === 0 ? (
        <EmptyNote>No intersections found in the viewport.</EmptyNote>
      ) : (
        <ul className="mt-2 space-y-1">
          {points.map((p, i) => (
            <li key={i} className="font-mono text-sm text-slate-900 dark:text-slate-100">
              ({formatNumber(p.x, precision)}, {formatNumber(p.y, precision)})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Derivative
// ---------------------------------------------------------------------------

function DerivativeSection({ expression, fn, precision }: SectionProps) {
  const { state, dispatch } = useCalculator();
  const [x, setX] = useState('0');
  const [value, setValue] = useState<number | null>(null);
  const useTapped = useInspectedX(expression.id, setX);
  const plotted = state.analysis.derivativePlots.some((p) => p.expressionId === expression.id);

  const compute = (): void => {
    const xv = parseNumericInput(x);
    setValue(xv === null ? null : centralDerivative(fn, xv));
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Derivative</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-32">
          <NumericInput label="At x =" value={x} onChange={setX} />
        </div>
        <Button size="sm" variant="secondary" onClick={compute}>
          f′(x)
        </Button>
        {useTapped}
        <Button
          size="sm"
          variant={plotted ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: 'TOGGLE_DERIVATIVE_PLOT', expressionId: expression.id })}
          aria-pressed={plotted}
        >
          {plotted ? 'Hide f′(x)' : 'Plot f′(x)'}
        </Button>
      </div>
      {value !== null ? (
        <ResultLine>
          f′({formatNumber(parseNumericInput(x) ?? NaN, precision)}) ={' '}
          {formatNumber(value, precision)}
        </ResultLine>
      ) : null}
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Numerical (central difference) — not a symbolic derivative.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Integral
// ---------------------------------------------------------------------------

function IntegralSection({ expression, fn, precision }: SectionProps) {
  const { state, dispatch } = useCalculator();
  const [a, setA] = useState('0');
  const [b, setB] = useState('1');
  const [result, setResult] = useState<IntegralResult | null>(null);
  const existing = state.analysis.integrals.find((i) => i.expressionId === expression.id);

  const compute = (): void => {
    const lo = parseNumericInput(a);
    const hi = parseNumericInput(b);
    if (lo === null || hi === null) {
      setResult(null);
      return;
    }
    const r = adaptiveSimpson(fn, lo, hi);
    setResult(r);
    if (existing) {
      dispatch({
        type: 'UPDATE_INTEGRAL',
        id: existing.id,
        patch: { a: lo, b: hi, value: r.converged ? r.value : null, converged: r.converged },
      });
    }
  };

  const toggleShade = (): void => {
    if (existing) {
      dispatch({ type: 'REMOVE_INTEGRAL', id: existing.id });
      return;
    }
    const lo = parseNumericInput(a);
    const hi = parseNumericInput(b);
    if (lo === null || hi === null) return;
    const r = adaptiveSimpson(fn, lo, hi);
    setResult(r);
    dispatch({
      type: 'ADD_INTEGRAL',
      integral: {
        id: createExpressionId(),
        expressionId: expression.id,
        a: lo,
        b: hi,
        visible: true,
        value: r.converged ? r.value : null,
        converged: r.converged,
      },
    });
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Definite integral</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        <NumericInput label="From a" value={a} onChange={setA} />
        <NumericInput label="To b" value={b} onChange={setB} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={compute}>
          Compute
        </Button>
        <Button
          size="sm"
          variant={existing ? 'primary' : 'secondary'}
          onClick={toggleShade}
          aria-pressed={!!existing}
        >
          {existing ? 'Hide shading' : 'Shade area'}
        </Button>
      </div>
      {result ? (
        result.converged ? (
          <ResultLine>∫ = {formatNumber(result.value, precision)}</ResultLine>
        ) : (
          <EmptyNote>
            The quadrature did not converge on this interval (possible singularity or domain gap) —
            no value reported.
          </EmptyNote>
        )
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Limits
// ---------------------------------------------------------------------------

function LimitSection({ expression, fn, precision }: SectionProps) {
  const [x, setX] = useState('0');
  const [side, setSide] = useState<LimitSide>('two-sided');
  const [result, setResult] = useState<LimitResult | null>(null);
  const useTapped = useInspectedX(expression.id, setX);

  const compute = (): void => {
    const c = parseNumericInput(x);
    setResult(c === null ? null : numericLimit(fn, c, side));
  };

  const describe = (r: LimitResult): string => {
    switch (r.status) {
      case 'converges':
        return `Limit = ${formatNumber(r.value ?? NaN, precision)}`;
      case 'unbounded':
        return `Unbounded — approaches ${r.direction === -1 ? '−∞' : '+∞'}`;
      case 'does-not-exist':
        return 'Does not exist (one-sided limits disagree or the function oscillates)';
      case 'indeterminate':
        return 'Cannot determine — the function is not defined near this point';
    }
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Limit</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-32">
          <NumericInput label="At x =" value={x} onChange={setX} />
        </div>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Side</span>
          <select
            value={side}
            onChange={(e) => setSide(e.target.value as LimitSide)}
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="two-sided">Two-sided</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </label>
        <Button size="sm" variant="secondary" onClick={compute}>
          Compute
        </Button>
        {useTapped}
      </div>
      {result ? <ResultLine>{describe(result)}</ResultLine> : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Extrema
// ---------------------------------------------------------------------------

function ExtremaSection({ expression, fn, precision }: SectionProps) {
  const { state } = useCalculator();
  const pinMarkers = usePinMarkers(expression);
  const clearMarkers = useClearMarkers(expression);
  const [extrema, setExtrema] = useState<Extremum[] | null>(null);
  const [pinned, setPinned] = useState(false);

  const compute = (): Extremum[] =>
    findExtrema(fn, state.viewport.xMin, state.viewport.xMax, {
      scanSamples: 400,
    } satisfies ExtremaOptions);

  const find = (): void => {
    const found = compute();
    setExtrema(found);
    if (pinned) pinMarkers('extremum', found);
  };

  const togglePinned = (): void => {
    const next = !pinned;
    setPinned(next);
    if (!next) {
      clearMarkers('extremum');
      return;
    }
    const list = extrema ?? compute();
    setExtrema(list);
    pinMarkers('extremum', list);
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Local extrema</SectionTitle>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="secondary" onClick={find}>
          Find in viewport
        </Button>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={pinned} onChange={togglePinned} />
          Show on graph
        </label>
      </div>
      {extrema === null ? null : extrema.length === 0 ? (
        <EmptyNote>No local minima or maxima found in the viewport.</EmptyNote>
      ) : (
        <ul className="mt-2 space-y-1">
          {extrema.map((e, i) => (
            <li key={i} className="font-mono text-sm text-slate-900 dark:text-slate-100">
              {e.kind === 'min' ? 'Min' : 'Max'} at ({formatNumber(e.x, precision)},{' '}
              {formatNumber(e.y, precision)})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tangent / normal
// ---------------------------------------------------------------------------

function TangentSection({ expression, fn, precision }: SectionProps) {
  const { state, dispatch } = useCalculator();
  const [x, setX] = useState('0');
  const [info, setInfo] = useState<TangentInfo | null>(null);
  const [failed, setFailed] = useState(false);
  const useTapped = useInspectedX(expression.id, setX);
  const existing = state.analysis.tangents.find((t) => t.expressionId === expression.id);

  const upsert = (showTangent: boolean, showNormal: boolean): void => {
    if (!showTangent && !showNormal) {
      if (existing) dispatch({ type: 'REMOVE_TANGENT', id: existing.id });
      return;
    }
    const xv = parseNumericInput(x);
    if (xv === null) return;
    if (existing) {
      dispatch({
        type: 'UPDATE_TANGENT',
        id: existing.id,
        patch: { x: xv, showTangent, showNormal, visible: true },
      });
    } else {
      dispatch({
        type: 'ADD_TANGENT',
        tangent: {
          id: createExpressionId(),
          expressionId: expression.id,
          x: xv,
          showTangent,
          showNormal,
          visible: true,
        },
      });
    }
  };

  const compute = (): void => {
    const xv = parseNumericInput(x);
    if (xv === null) {
      setInfo(null);
      setFailed(false);
      return;
    }
    const t = tangentAt(fn, xv);
    setInfo(t);
    setFailed(t === null);
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>Tangent &amp; normal</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-32">
          <NumericInput label="At x =" value={x} onChange={setX} />
        </div>
        <Button size="sm" variant="secondary" onClick={compute}>
          Compute
        </Button>
        {useTapped}
      </div>
      <div className="mt-2 flex flex-wrap gap-3">
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={existing?.showTangent ?? false}
            onChange={(e) => upsert(e.target.checked, existing?.showNormal ?? false)}
          />
          Show tangent
        </label>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={existing?.showNormal ?? false}
            onChange={(e) => upsert(existing?.showTangent ?? false, e.target.checked)}
          />
          Show normal
        </label>
      </div>
      {failed ? (
        <EmptyNote>
          No tangent here — the function is not defined or not differentiable at this x.
        </EmptyNote>
      ) : null}
      {info ? (
        <div className="mt-2 space-y-1">
          <ResultLine>Tangent: {lineEquation(info.tangent, precision)}</ResultLine>
          <ResultLine>Normal: {lineEquation(info.normal, precision)}</ResultLine>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
            slope f′({formatNumber(info.x, precision)}) = {formatNumber(info.slope, precision)}
          </p>
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Per-expression wrapper
// ---------------------------------------------------------------------------

function ExpressionAnalysis({
  expression,
  all,
}: {
  expression: CartesianExpression;
  all: Expression[];
}) {
  const { state } = useCalculator();
  const compiled = useMemo(() => {
    try {
      return { fn: compileExpression(expression.definition.rhs).fn, error: null as string | null };
    } catch (error) {
      return {
        fn: null,
        error: error instanceof Error ? error.message : 'Could not parse this expression.',
      };
    }
  }, [expression.definition.rhs]);

  return (
    <details className="border-t border-slate-200 py-2 first:border-t-0 dark:border-slate-800">
      <summary className="flex cursor-pointer items-center gap-2 py-1 text-sm font-medium text-slate-900 dark:text-slate-100">
        <span
          aria-hidden="true"
          className="inline-block h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: expression.color }}
        />
        <span className="truncate">
          {expression.label}: y = {expression.definition.rhs}
        </span>
      </summary>
      {compiled.fn === null || compiled.error !== null ? (
        <EmptyNote>
          Cannot analyze this expression: {compiled.error ?? 'unknown parse error.'}
        </EmptyNote>
      ) : (
        <div className="pb-2">
          <TableSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
          />
          <RootsSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
          />
          <IntersectionsSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            all={all}
          />
          <DerivativeSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
          />
          <IntegralSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
          />
          <LimitSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
          />
          <ExtremaSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
          />
          <TangentSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
          />
        </div>
      )}
    </details>
  );
}

// ---------------------------------------------------------------------------
// Annotations
// ---------------------------------------------------------------------------

function AnnotationsSection() {
  const { state, dispatch } = useCalculator();
  const annotations = state.analysis.annotations;
  const inspected = state.inspectedPoint;

  return (
    <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
      <SectionTitle>Annotations</SectionTitle>
      {inspected ? (
        <div className="mb-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              const expr = state.expressions.find((e) => e.id === inspected.expressionId);
              dispatch({
                type: 'ADD_ANNOTATION',
                annotation: {
                  id: createExpressionId(),
                  x: inspected.x,
                  y: inspected.y,
                  label: `(${formatNumber(inspected.x, state.analysis.precision)}, ${formatNumber(
                    inspected.y,
                    state.analysis.precision
                  )})`,
                  color: expr?.color ?? '#0f172a',
                  visible: true,
                },
              });
            }}
          >
            Annotate tapped point
          </Button>
        </div>
      ) : null}
      {annotations.length === 0 ? (
        <EmptyNote>
          No annotations yet. Tap a curve on the graph, then annotate the point — or rename and
          remove annotations here.
        </EmptyNote>
      ) : (
        <ul className="space-y-2">
          {annotations.map((a) => (
            <li key={a.id} className="rounded-md border border-slate-200 p-2 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: a.color }}
                />
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  ({formatNumber(a.x, state.analysis.precision)},{' '}
                  {formatNumber(a.y, state.analysis.precision)})
                </span>
                <label className="ml-auto flex items-center gap-1 text-xs text-slate-500">
                  <input
                    type="checkbox"
                    checked={a.visible}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_ANNOTATION',
                        id: a.id,
                        patch: { visible: e.target.checked },
                      })
                    }
                    aria-label={`Show annotation ${a.label}`}
                  />
                  Show
                </label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dispatch({ type: 'REMOVE_ANNOTATION', id: a.id })}
                  aria-label={`Delete annotation ${a.label}`}
                >
                  ×
                </Button>
              </div>
              <TextInput
                label="Label"
                value={a.label}
                onChange={(v) =>
                  dispatch({
                    type: 'UPDATE_ANNOTATION',
                    id: a.id,
                    patch: { label: v.slice(0, 120) },
                  })
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel
// ---------------------------------------------------------------------------

export function AnalysisPanel() {
  const { state, dispatch } = useCalculator();
  const cartesian = state.expressions.filter(
    (e): e is CartesianExpression => e.kind === 'cartesian'
  );

  return (
    <section aria-label="Mathematical analysis" className="mt-4">
      <Panel title="Analysis">
        <PrecisionControls precision={state.analysis.precision} dispatch={dispatch} />
        {cartesian.length === 0 ? (
          <EmptyNote>
            Add a Cartesian expression (y = …) to unlock tables, roots, derivatives, integrals,
            limits, extrema, and tangents.
          </EmptyNote>
        ) : (
          <div>
            {cartesian.map((e) => (
              <ExpressionAnalysis key={e.id} expression={e} all={state.expressions} />
            ))}
          </div>
        )}
        <AnnotationsSection />
      </Panel>
    </section>
  );
}

export default AnalysisPanel;
