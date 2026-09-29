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
import { compileExpressionScoped } from '../../lib/math/engine.js';
import { CARTESIAN_PARAMETER } from '../../lib/math/variables.js';
import { useVariableEnvironment } from '../variables/useVariableEnvironment.js';
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
import type { CalculatorShellStrings } from '../../i18n/types.js';
import { format } from '../../i18n/locales.js';

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

interface SectionProps {
  expression: CartesianExpression;
  fn: CompiledFunction;
  precision: PrecisionSettings;
  strings: CalculatorShellStrings;
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
function useInspectedX(
  expressionId: string,
  setX: (v: string) => void,
  strings: CalculatorShellStrings
) {
  const { state } = useCalculator();
  const inspected = state.inspectedPoint;
  if (!inspected || inspected.expressionId !== expressionId) return null;
  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setX(String(inspected.x))}
      title={strings.analysis.table.useTappedPointTitle}
    >
      {strings.analysis.table.useTappedPoint}
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
  strings,
}: {
  precision: PrecisionSettings;
  dispatch: Dispatch<CalculatorAction>;
  strings: CalculatorShellStrings;
}) {
  const t = strings.analysis;
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
          {t.precision.formatLabel}
        </span>
        <div role="group" aria-labelledby="precision-mode-label" className="flex gap-1">
          {(
            [
              ['decimals', t.precision.decimals],
              ['significant', t.precision.significant],
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
          label={
            precision.mode === 'significant'
              ? t.precision.digitsTemplate
              : t.precision.placesTemplate
          }
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

function TableSection({ expression, fn, precision, strings }: SectionProps) {
  const t = strings.analysis;
  const [start, setStart] = useState('-10');
  const [end, setEnd] = useState('10');
  const [step, setStep] = useState('auto');
  const [table, setTable] = useState<ValueTableData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const build = (): void => {
    const s = parseNumericInput(start);
    const e = parseNumericInput(end);
    if (s === null || e === null) {
      setError(t.table.startError);
      setTable(null);
      return;
    }
    let resolvedStep: number | 'auto' = 'auto';
    const trimmed = step.trim().toLowerCase();
    if (trimmed !== '' && trimmed !== 'auto') {
      const n = parseNumericInput(trimmed);
      if (n === null || n <= 0) {
        setError(t.table.stepError);
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
      <SectionTitle>{t.table.title}</SectionTitle>
      <div className="grid grid-cols-3 gap-2">
        <NumericInput label={t.table.start} value={start} onChange={setStart} placeholder="-10" />
        <NumericInput label={t.table.end} value={end} onChange={setEnd} placeholder="10" />
        <NumericInput label={t.table.step} value={step} onChange={setStep} placeholder="auto" />
      </div>
      <div className="mt-2">
        <Button size="sm" variant="secondary" onClick={build}>
          {t.table.build}
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
            title={format(t.table.captionTemplate, { label: expression.label })}
            strings={strings.analysis.table}
          />
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Roots
// ---------------------------------------------------------------------------

function RootsSection({ expression, fn, precision, strings }: SectionProps) {
  const t = strings.analysis;
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
      <SectionTitle>{t.roots.title}</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        <NumericInput label={t.roots.from} value={a} onChange={setA} />
        <NumericInput label={t.roots.to} value={b} onChange={setB} />
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Button size="sm" variant="secondary" onClick={find}>
          {t.roots.find}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setA(String(state.viewport.xMin));
            setB(String(state.viewport.xMax));
          }}
        >
          {t.roots.useViewport}
        </Button>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={pinned} onChange={togglePinned} />
          {t.roots.showOnGraph}
        </label>
      </div>
      {roots === null ? null : roots.length === 0 ? (
        <EmptyNote>{t.roots.none}</EmptyNote>
      ) : (
        <ul className="mt-2 space-y-1">
          {roots.map((x, i) => (
            <li key={i} className="font-mono text-sm text-slate-900 dark:text-slate-100">
              {format(t.roots.resultTemplate, { x: formatNumber(x, precision) })}
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
  strings,
}: SectionProps & { all: Expression[] }) {
  const t = strings.analysis;
  const { state } = useCalculator();
  const pinMarkers = usePinMarkers(expression);
  const clearMarkers = useClearMarkers(expression);
  const env = useVariableEnvironment();
  const others = all.filter((e) => e.kind === 'cartesian' && e.id !== expression.id);
  const [otherId, setOtherId] = useState(others[0]?.id ?? '');
  const [points, setPoints] = useState<IntersectionPoint[] | null>(null);
  const [pinned, setPinned] = useState(false);

  const other = others.find((e) => e.id === otherId) as CartesianExpression | undefined;

  const compute = (): IntersectionPoint[] => {
    if (!other) return [];
    let g: CompiledFunction;
    try {
      g = compileExpressionScoped(other.definition.rhs, {
        parameter: CARTESIAN_PARAMETER,
        env,
      }).fn;
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
        <SectionTitle>{t.intersections.title}</SectionTitle>
        <EmptyNote>{t.intersections.noneDefined}</EmptyNote>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>{t.intersections.title}</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            {t.intersections.with}
          </span>
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
          {t.intersections.find}
        </Button>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={pinned} onChange={togglePinned} />
          {t.intersections.showOnGraph}
        </label>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        {t.intersections.viewportNote}
      </p>
      {points === null ? null : points.length === 0 ? (
        <EmptyNote>{t.intersections.none}</EmptyNote>
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

function DerivativeSection({ expression, fn, precision, strings }: SectionProps) {
  const { state, dispatch } = useCalculator();
  const [x, setX] = useState('0');
  const [value, setValue] = useState<number | null>(null);
  const t = strings.analysis;
  const useTapped = useInspectedX(expression.id, setX, strings);
  const plotted = state.analysis.derivativePlots.some((p) => p.expressionId === expression.id);

  const compute = (): void => {
    const xv = parseNumericInput(x);
    setValue(xv === null ? null : centralDerivative(fn, xv));
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>{t.derivative.title}</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-32">
          <NumericInput label={t.derivative.atX} value={x} onChange={setX} />
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
          {plotted ? t.derivative.hide : t.derivative.plot}
        </Button>
      </div>
      {value !== null ? (
        <ResultLine>
          {format(t.derivative.resultTemplate, {
            x: formatNumber(parseNumericInput(x) ?? NaN, precision),
            value: formatNumber(value, precision),
          })}
        </ResultLine>
      ) : null}
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.derivative.note}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Integral
// ---------------------------------------------------------------------------

function IntegralSection({ expression, fn, precision, strings }: SectionProps) {
  const t = strings.analysis;
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
      <SectionTitle>{t.integral.title}</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        <NumericInput label={t.integral.fromA} value={a} onChange={setA} />
        <NumericInput label={t.integral.toB} value={b} onChange={setB} />
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={compute}>
          {t.integral.compute}
        </Button>
        <Button
          size="sm"
          variant={existing ? 'primary' : 'secondary'}
          onClick={toggleShade}
          aria-pressed={!!existing}
        >
          {existing ? t.integral.hideShading : t.integral.shadeArea}
        </Button>
      </div>
      {result ? (
        result.converged ? (
          <ResultLine>
            {format(t.integral.resultTemplate, { value: formatNumber(result.value, precision) })}
          </ResultLine>
        ) : (
          <EmptyNote>{t.integral.noConvergence}</EmptyNote>
        )
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Limits
// ---------------------------------------------------------------------------

function LimitSection({ expression, fn, precision, strings }: SectionProps) {
  const t = strings.analysis;
  const [x, setX] = useState('0');
  const [side, setSide] = useState<LimitSide>('two-sided');
  const [result, setResult] = useState<LimitResult | null>(null);
  const useTapped = useInspectedX(expression.id, setX, strings);

  const compute = (): void => {
    const c = parseNumericInput(x);
    setResult(c === null ? null : numericLimit(fn, c, side));
  };

  const describe = (r: LimitResult): string => {
    switch (r.status) {
      case 'converges':
        return format(t.limit.convergesTemplate, {
          value: formatNumber(r.value ?? NaN, precision),
        });
      case 'unbounded':
        return format(t.limit.unboundedTemplate, {
          direction: r.direction === -1 ? '−∞' : '+∞',
        });
      case 'does-not-exist':
        return t.limit.doesNotExist;
      case 'indeterminate':
        return t.limit.indeterminate;
    }
  };

  return (
    <div className="border-t border-slate-100 py-3 dark:border-slate-800">
      <SectionTitle>{t.limit.title}</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-32">
          <NumericInput label={t.limit.atX} value={x} onChange={setX} />
        </div>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">
            {t.limit.side}
          </span>
          <select
            value={side}
            onChange={(e) => setSide(e.target.value as LimitSide)}
            className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option value="two-sided">{t.limit.sides.twoSided}</option>
            <option value="left">{t.limit.sides.left}</option>
            <option value="right">{t.limit.sides.right}</option>
          </select>
        </label>
        <Button size="sm" variant="secondary" onClick={compute}>
          {t.limit.compute}
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

function ExtremaSection({ expression, fn, precision, strings }: SectionProps) {
  const t = strings.analysis;
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
      <SectionTitle>{t.extrema.title}</SectionTitle>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="secondary" onClick={find}>
          {t.extrema.find}
        </Button>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input type="checkbox" checked={pinned} onChange={togglePinned} />
          {t.extrema.showOnGraph}
        </label>
      </div>
      {extrema === null ? null : extrema.length === 0 ? (
        <EmptyNote>{t.extrema.none}</EmptyNote>
      ) : (
        <ul className="mt-2 space-y-1">
          {extrema.map((e, i) => (
            <li key={i} className="font-mono text-sm text-slate-900 dark:text-slate-100">
              {format(e.kind === 'min' ? t.extrema.minTemplate : t.extrema.maxTemplate, {
                x: formatNumber(e.x, precision),
                y: formatNumber(e.y, precision),
              })}
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

function TangentSection({ expression, fn, precision, strings }: SectionProps) {
  const t = strings.analysis;
  const { state, dispatch } = useCalculator();
  const [x, setX] = useState('0');
  const [info, setInfo] = useState<TangentInfo | null>(null);
  const [failed, setFailed] = useState(false);
  const useTapped = useInspectedX(expression.id, setX, strings);
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
      <SectionTitle>{t.tangent.title}</SectionTitle>
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-32">
          <NumericInput label={t.tangent.atX} value={x} onChange={setX} />
        </div>
        <Button size="sm" variant="secondary" onClick={compute}>
          {t.tangent.compute}
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
          {t.tangent.showTangent}
        </label>
        <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={existing?.showNormal ?? false}
            onChange={(e) => upsert(existing?.showTangent ?? false, e.target.checked)}
          />
          {t.tangent.showNormal}
        </label>
      </div>
      {failed ? <EmptyNote>{t.tangent.failed}</EmptyNote> : null}
      {info ? (
        <div className="mt-2 space-y-1">
          <ResultLine>
            {format(t.tangent.tangentTemplate, { equation: lineEquation(info.tangent, precision) })}
          </ResultLine>
          <ResultLine>
            {format(t.tangent.normalTemplate, { equation: lineEquation(info.normal, precision) })}
          </ResultLine>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {format(t.tangent.slopeTemplate, {
              x: formatNumber(info.x, precision),
              slope: formatNumber(info.slope, precision),
            })}
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
  strings,
}: {
  expression: CartesianExpression;
  all: Expression[];
  strings: CalculatorShellStrings;
}) {
  const { state } = useCalculator();
  const env = useVariableEnvironment();
  const t = strings.analysis;
  const compiled = useMemo(() => {
    try {
      return {
        fn: compileExpressionScoped(expression.definition.rhs, {
          parameter: CARTESIAN_PARAMETER,
          env,
        }).fn,
        error: null as string | null,
      };
    } catch (error) {
      return {
        fn: null,
        error: error instanceof Error ? error.message : t.tangent.couldNotParse,
      };
    }
    // The compiled closure reads the environment's live values map at call
    // time, so it stays valid across slider drags without recompilation.
    // `env` is a stable per-component reference and intentionally excluded
    // from the dependency list.
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
          {format(t.tangent.cannotAnalyzeTemplate, {
            error: compiled.error ?? t.tangent.unknownParseError,
          })}
        </EmptyNote>
      ) : (
        <div className="pb-2">
          <TableSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            strings={strings}
          />
          <RootsSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            strings={strings}
          />
          <IntersectionsSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            all={all}
            strings={strings}
          />
          <DerivativeSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            strings={strings}
          />
          <IntegralSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            strings={strings}
          />
          <LimitSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            strings={strings}
          />
          <ExtremaSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            strings={strings}
          />
          <TangentSection
            expression={expression}
            fn={compiled.fn}
            precision={state.analysis.precision}
            strings={strings}
          />
        </div>
      )}
    </details>
  );
}

// ---------------------------------------------------------------------------
// Annotations
// ---------------------------------------------------------------------------

function AnnotationsSection({ strings }: { strings: CalculatorShellStrings }) {
  const { state, dispatch } = useCalculator();
  const annotations = state.analysis.annotations;
  const inspected = state.inspectedPoint;
  const t = strings.analysis;

  return (
    <div className="border-t border-slate-200 pt-3 dark:border-slate-800">
      <SectionTitle>{t.annotations.title}</SectionTitle>
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
            {t.annotations.annotateTapped}
          </Button>
        </div>
      ) : null}
      {annotations.length === 0 ? (
        <EmptyNote>{t.annotations.empty}</EmptyNote>
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
                    aria-label={format(t.annotations.showAriaTemplate, { label: a.label })}
                  />
                  {t.annotations.show}
                </label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => dispatch({ type: 'REMOVE_ANNOTATION', id: a.id })}
                  aria-label={format(t.annotations.deleteAriaTemplate, { label: a.label })}
                >
                  ×
                </Button>
              </div>
              <TextInput
                label={t.annotations.label}
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

export function AnalysisPanel({ strings }: { strings: CalculatorShellStrings }) {
  const { state, dispatch } = useCalculator();
  const cartesian = state.expressions.filter(
    (e): e is CartesianExpression => e.kind === 'cartesian'
  );
  const t = strings.analysis;

  return (
    <section aria-label={t.panelAriaLabel} className="mt-4">
      <Panel title={t.panelTitle}>
        <PrecisionControls
          precision={state.analysis.precision}
          dispatch={dispatch}
          strings={strings}
        />
        {cartesian.length === 0 ? (
          <EmptyNote>{t.panelEmpty}</EmptyNote>
        ) : (
          <div>
            {cartesian.map((e) => (
              <ExpressionAnalysis
                key={e.id}
                expression={e}
                all={state.expressions}
                strings={strings}
              />
            ))}
          </div>
        )}
        <AnnotationsSection strings={strings} />
      </Panel>
    </section>
  );
}

export default AnalysisPanel;
