/**
 * Functional math tool islands (Phase 8 tool pages).
 *
 * Each tool computes live in the browser using the project's own math
 * library — the same engine behind the graphing calculator. No results
 * are fabricated; invalid input produces an honest error message.
 */
import { useState } from 'react';
import { compileExpression } from '../../lib/math/engine.js';
import { adaptiveSimpson, centralDerivative, findAllRoots } from '../../lib/math/analysis.js';
import { formatNumber } from '../../lib/math/format.js';

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 ' +
  'dark:border-slate-600 dark:bg-slate-800 dark:text-white';
const buttonClass =
  'rounded-md bg-brand-600 px-5 py-2 font-medium text-white hover:bg-brand-700 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500';

function compile(source: string): ((x: number) => number) | { error: string } {
  try {
    return compileExpression(source).fn;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Could not parse that expression.' };
  }
}

function ToolShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function ExpressionField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
        spellCheck={false}
        autoComplete="off"
        placeholder="e.g. x^2 - 4"
      />
    </label>
  );
}

function NumberField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

/** Numerically differentiate f at a point: f'(a). */
export function DerivativeTool() {
  const [expression, setExpression] = useState('x^2');
  const [point, setPoint] = useState('2');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compute = () => {
    setError(null);
    const fn = compile(expression);
    if (typeof fn !== 'function') {
      setError(fn.error);
      setResult(null);
      return;
    }
    const a = Number(point);
    if (!Number.isFinite(a)) {
      setError('Enter a finite number for the point.');
      setResult(null);
      return;
    }
    try {
      const derivative = centralDerivative(fn, a);
      if (!Number.isFinite(derivative)) {
        setError(
          'The derivative could not be estimated there (the function may not be differentiable at that point).'
        );
        setResult(null);
        return;
      }
      setResult(
        `f'(${formatNumber(a)}) ≈ ${formatNumber(derivative, { mode: 'decimals', digits: 6 })}`
      );
    } catch {
      setError('The derivative could not be estimated there.');
      setResult(null);
    }
  };

  return (
    <ToolShell title="Differentiate">
      <ExpressionField value={expression} onChange={setExpression} label="Function f(x)" />
      <NumberField value={point} onChange={setPoint} label="Point a" />
      <button type="button" onClick={compute} className={buttonClass}>
        Compute f′(a)
      </button>
      {result && (
        <p
          role="status"
          className="rounded-md bg-slate-100 p-3 font-mono text-slate-900 dark:bg-slate-800 dark:text-white"
        >
          {result}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}
    </ToolShell>
  );
}

/** Numerically integrate f from a to b. */
export function IntegralTool() {
  const [expression, setExpression] = useState('x^2');
  const [lower, setLower] = useState('0');
  const [upper, setUpper] = useState('1');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compute = () => {
    setError(null);
    const fn = compile(expression);
    if (typeof fn !== 'function') {
      setError(fn.error);
      setResult(null);
      return;
    }
    const a = Number(lower);
    const b = Number(upper);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setError('Enter finite numbers for both bounds.');
      setResult(null);
      return;
    }
    try {
      const integral = adaptiveSimpson(fn, a, b);
      if (!Number.isFinite(integral.value)) {
        setError('The integral could not be estimated on that interval.');
        setResult(null);
        return;
      }
      setResult(
        `∫[${formatNumber(a)}, ${formatNumber(b)}] f(x) dx ≈ ${formatNumber(integral.value, { mode: 'decimals', digits: 6 })}`
      );
    } catch {
      setError('The integral could not be estimated on that interval.');
      setResult(null);
    }
  };

  return (
    <ToolShell title="Integrate">
      <ExpressionField value={expression} onChange={setExpression} label="Function f(x)" />
      <div className="grid grid-cols-2 gap-4">
        <NumberField value={lower} onChange={setLower} label="Lower bound" />
        <NumberField value={upper} onChange={setUpper} label="Upper bound" />
      </div>
      <button type="button" onClick={compute} className={buttonClass}>
        Compute integral
      </button>
      {result && (
        <p
          role="status"
          className="rounded-md bg-slate-100 p-3 font-mono text-slate-900 dark:bg-slate-800 dark:text-white"
        >
          {result}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}
    </ToolShell>
  );
}

/** Find all roots of f in [a, b]. */
export function RootFinderTool() {
  const [expression, setExpression] = useState('x^2 - 4');
  const [lower, setLower] = useState('-10');
  const [upper, setUpper] = useState('10');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compute = () => {
    setError(null);
    const fn = compile(expression);
    if (typeof fn !== 'function') {
      setError(fn.error);
      setResult(null);
      return;
    }
    const a = Number(lower);
    const b = Number(upper);
    if (!Number.isFinite(a) || !Number.isFinite(b) || a >= b) {
      setError('Enter a valid interval with lower bound < upper bound.');
      setResult(null);
      return;
    }
    try {
      const roots = findAllRoots(fn, a, b);
      setResult(
        roots.length === 0
          ? `No roots found in [${formatNumber(a)}, ${formatNumber(b)}].`
          : `Roots in [${formatNumber(a)}, ${formatNumber(b)}]: ${roots
              .map((root) => formatNumber(root, { mode: 'decimals', digits: 6 }))
              .join(', ')}`
      );
    } catch {
      setError('Roots could not be found on that interval.');
      setResult(null);
    }
  };

  return (
    <ToolShell title="Find roots">
      <ExpressionField value={expression} onChange={setExpression} label="Function f(x)" />
      <div className="grid grid-cols-2 gap-4">
        <NumberField value={lower} onChange={setLower} label="Interval start" />
        <NumberField value={upper} onChange={setUpper} label="Interval end" />
      </div>
      <button type="button" onClick={compute} className={buttonClass}>
        Find roots
      </button>
      {result && (
        <p
          role="status"
          className="rounded-md bg-slate-100 p-3 font-mono text-slate-900 dark:bg-slate-800 dark:text-white"
        >
          {result}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}
    </ToolShell>
  );
}
