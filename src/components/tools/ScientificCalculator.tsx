/**
 * Scientific calculator React island — two-column layout.
 *
 * Calculator on the left (display, memory row, function rows, keypad),
 * history panel on the right (collapses below the keypad on mobile).
 * The island never evaluates anything itself: every calculation goes
 * through `evaluateScientificExpression`. Full keyboard support: digits
 * and operators type natively, Enter evaluates, Escape clears,
 * Ctrl/Cmd+Z / Ctrl/Cmd+Shift+Z undo and redo edits.
 */
import { useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ErrorBoundary } from '../calculator/ErrorBoundary.js';
import type { ErrorFallbackStrings } from '../calculator/ErrorBoundary.js';
import type { AngleMode } from '../../lib/math/scientific.js';
import { calculatorKeyAction, evaluateScientificExpression } from '../../lib/math/scientific.js';
import { formatNumber } from '../../lib/math/format.js';
import type { ScientificStrings } from '../../i18n/types.js';
import { format } from '../../i18n/locales.js';
import {
  FUNCTION_ROWS,
  KEYPAD_ROWS,
  resolveInsert,
  type KeyLayout,
} from '../../lib/calculator/scientific-keys.js';
import {
  HistoryStore,
  type HistoryEntry,
  type HistoryStorage,
} from '../../lib/calculator/history.js';
import { addToMemory, hasMemoryValue, subtractFromMemory } from '../../lib/calculator/memory.js';
import { decimalToFraction, formatFraction } from '../../lib/calculator/fraction.js';

type Output = { type: 'value'; display: string } | { type: 'error'; message: string } | null;

/** Tokens that continue from the previous result after evaluation. */
const CONTINUE_TOKENS = new Set(['+', '−', '×', '÷', '^', '^2', '^(-1)', '!', ')']);

/** Format a computed value for insertion (Ans / MR) without float noise. */
function formatForInsert(value: number): string {
  return formatNumber(value, { mode: 'significant', digits: 10 });
}

/** localStorage adapter that never throws (SSR / private browsing safe). */
function browserStorage(): HistoryStorage | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    return {
      getItem: (key) => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: (key) => localStorage.removeItem(key),
    };
  } catch {
    return null;
  }
}

const KIND_CLASS: Record<KeyLayout['kind'], string> = {
  digit:
    'bg-white text-slate-900 border border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700',
  operator:
    'bg-emerald-50 text-emerald-800 border border-emerald-100 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-900/60 dark:hover:bg-emerald-900/60',
  function:
    'bg-slate-100 text-slate-800 border border-slate-200 text-sm hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700',
  control:
    'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700',
  equals:
    'bg-emerald-600 text-white text-xl hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500',
};

const KEY_BASE =
  'flex min-h-[48px] items-center justify-center rounded-lg font-medium transition-colors ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95';

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M6.5 4V2.75a.25.25 0 0 1 .25-.25h2.5a.25.25 0 0 1 .25.25V4M4 4l.65 8.45a1 1 0 0 0 1 .55h4.7a1 1 0 0 0 1-.55L12 4" />
      <path d="M6.5 7v4M9.5 7v4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 5.5v-2a1.5 1.5 0 0 0-1.5-1.5H4.5A1.5 1.5 0 0 0 3 3.5V9a1.5 1.5 0 0 0 1.5 1.5h1" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-slate-300 dark:text-slate-600"
    >
      <path d="M3 12a9 9 0 1 0 2.64-6.36" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function ScientificCalculator({
  strings,
  fallback,
}: {
  strings: ScientificStrings['island'];
  fallback?: ErrorFallbackStrings;
}) {
  const t = strings;
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<AngleMode>('deg');
  const [output, setOutput] = useState<Output>(null);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [lastValue, setLastValue] = useState<number | null>(null);
  const [memory, setMemory] = useState(0);
  const [shift, setShift] = useState(false);
  const [showFraction, setShowFraction] = useState(false);
  const [copied, setCopied] = useState(false);
  const [entries, setEntries] = useState<HistoryEntry[]>(() =>
    new HistoryStore(browserStorage()).load()
  );
  const undoRef = useRef<string[]>([]);
  const redoRef = useRef<string[]>([]);
  const [, forceRender] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const storeRef = useRef<HistoryStore | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const store = useMemo(() => {
    if (!storeRef.current) storeRef.current = new HistoryStore(browserStorage());
    return storeRef.current;
  }, []);

  /** Fraction approximation of the current result (null when unavailable). */
  const fraction =
    output?.type === 'value' && lastValue !== null ? decimalToFraction(lastValue, 10_000) : null;
  const resultText =
    output?.type === 'value'
      ? showFraction && fraction
        ? formatFraction(fraction)
        : output.display
      : null;

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  const placeCursor = (position: number) => {
    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (!input) return;
      input.focus({ preventScroll: true });
      try {
        input.setSelectionRange(position, position);
      } catch {
        // setSelectionRange can throw on unusual input types; ignore.
      }
    });
  };

  /** Set the expression, recording an undo step. */
  const commitExpression = (next: string) => {
    if (expression !== next) {
      undoRef.current.push(expression);
      if (undoRef.current.length > 100) undoRef.current.shift();
      redoRef.current = [];
    }
    setExpression(next);
  };

  const undo = () => {
    const previous = undoRef.current.pop();
    if (previous === undefined) return;
    redoRef.current.push(expression);
    setExpression(previous);
    setOutput(null);
    setJustEvaluated(false);
    forceRender((n) => n + 1);
    focusInput();
  };

  const redo = () => {
    const next = redoRef.current.pop();
    if (next === undefined) return;
    undoRef.current.push(expression);
    setExpression(next);
    setOutput(null);
    setJustEvaluated(false);
    forceRender((n) => n + 1);
    focusInput();
  };

  const insert = (text: string) => {
    if (justEvaluated) {
      // After "=", digits/functions start a fresh expression while
      // operators continue from the previous result.
      const next =
        lastValue !== null && CONTINUE_TOKENS.has(text)
          ? `${formatForInsert(lastValue)}${text}`
          : text;
      commitExpression(next);
      setOutput(null);
      setJustEvaluated(false);
      placeCursor(next.length);
      return;
    }
    const input = inputRef.current;
    const cursor = input?.selectionStart ?? expression.length;
    const end = input?.selectionEnd ?? expression.length;
    const next = expression.slice(0, cursor) + text + expression.slice(end);
    commitExpression(next);
    setOutput(null);
    placeCursor(cursor + text.length);
  };

  const evaluate = () => {
    const result = evaluateScientificExpression(expression, angleMode);
    if (result.ok) {
      setOutput({ type: 'value', display: result.display });
      setLastValue(result.value);
      setEntries(store.add(expression, result.display));
    } else {
      setOutput({ type: 'error', message: result.message });
      setLastValue(null);
    }
    setJustEvaluated(true);
    setShowFraction(false);
    setCopied(false);
    focusInput();
  };

  const clear = () => {
    commitExpression('');
    setOutput(null);
    setJustEvaluated(false);
    setLastValue(null);
    setShowFraction(false);
    focusInput();
  };

  const backspace = () => {
    if (justEvaluated && lastValue !== null) {
      const text = formatForInsert(lastValue);
      commitExpression(text.slice(0, -1));
      setJustEvaluated(false);
      setOutput(null);
      placeCursor(Math.max(0, text.length - 1));
      return;
    }
    setJustEvaluated(false);
    const input = inputRef.current;
    const cursor = input?.selectionStart ?? expression.length;
    const end = input?.selectionEnd ?? expression.length;
    if (cursor !== end) {
      commitExpression(expression.slice(0, cursor) + expression.slice(end));
      placeCursor(cursor);
    } else if (cursor > 0) {
      commitExpression(expression.slice(0, cursor - 1) + expression.slice(cursor));
      placeCursor(cursor - 1);
    }
    setOutput(null);
  };

  const negate = () => {
    if (expression.startsWith('-') || expression.startsWith('−')) {
      commitExpression(expression.slice(1));
    } else if (expression === '') {
      commitExpression('-');
    } else {
      commitExpression(`-${expression}`);
    }
    setOutput(null);
    setJustEvaluated(false);
    focusInput();
  };

  const insertAns = () => {
    if (lastValue === null) return;
    insert(formatForInsert(lastValue));
  };

  const toggleAngle = (mode: AngleMode) => {
    setAngleMode(mode);
    setOutput(null);
    setJustEvaluated(false);
    focusInput();
  };

  const pressKey = (key: KeyLayout) => {
    switch (key.action) {
      case 'evaluate':
        evaluate();
        break;
      case 'clear':
        clear();
        break;
      case 'backspace':
        backspace();
        break;
      case 'shift':
        setShift((s) => !s);
        focusInput();
        break;
      case 'negate':
        negate();
        break;
      case 'ans':
        insertAns();
        break;
      default:
        insert(resolveInsert(key, shift));
        if (shift && key.altInsert !== undefined) setShift(false);
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
      event.preventDefault();
      redo();
      return;
    }
    const action = calculatorKeyAction(event.key);
    if (!action) return;
    event.preventDefault();
    if (action.type === 'evaluate') evaluate();
    else if (action.type === 'clear') clear();
    else insert(action.text);
  };

  const copyResult = async () => {
    if (resultText === null) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(resultText);
      } else {
        throw new Error('clipboard unavailable');
      }
    } catch {
      // Clipboard API unavailable (permissions, insecure context): fall back
      // to a transient textarea + execCommand.
      try {
        const area = document.createElement('textarea');
        area.value = resultText;
        area.setAttribute('readonly', '');
        area.style.position = 'absolute';
        area.style.left = '-9999px';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      } catch {
        return;
      }
    }
    setCopied(true);
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 1500);
  };

  const reuseEntry = (entry: HistoryEntry) => {
    commitExpression(entry.expression);
    setOutput(null);
    setJustEvaluated(false);
    setLastValue(null);
    setShowFraction(false);
    focusInput();
  };

  const clearHistory = () => {
    setEntries(store.clear());
  };

  const renderKey = (key: KeyLayout) => {
    const ks = t.keys[key.id];
    const active = key.action === 'shift' && shift;
    const label = active || (shift && ks.altLabel) ? (ks.altLabel ?? ks.label) : ks.label;
    const ariaLabel =
      active || (shift && ks.altAriaLabel) ? (ks.altAriaLabel ?? ks.ariaLabel) : ks.ariaLabel;
    return (
      <button
        key={key.id}
        type="button"
        aria-label={ariaLabel}
        aria-pressed={key.action === 'shift' ? shift : undefined}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => pressKey(key)}
        className={[
          KEY_BASE,
          key.span === 2 ? 'col-span-2' : '',
          key.span === 3 ? 'col-span-3' : '',
          KIND_CLASS[key.kind],
          key.id === 'ac' ? 'font-bold text-red-700 dark:text-red-300' : '',
          active ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' : '',
        ].join(' ')}
      >
        {label}
      </button>
    );
  };

  return (
    <ErrorBoundary
      fallbackTitle={t.loadFailedTitle}
      fallbackMessage={fallback?.message}
      retryLabel={fallback?.retry}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Calculator column */}
          <section
            aria-label={t.title}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t.title}</h2>
              <div
                role="group"
                aria-label={t.angleModeLabel}
                className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-700 dark:bg-slate-800"
              >
                {(['deg', 'rad'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={angleMode === mode}
                    aria-label={format(t.angleModeTemplate, {
                      mode: mode === 'deg' ? t.degrees : t.radians,
                    })}
                    onClick={() => toggleAngle(mode)}
                    className={[
                      'rounded-md px-3 py-1 text-xs font-bold tracking-wide transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                      angleMode === mode
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                    ].join(' ')}
                  >
                    {mode === 'deg' ? 'DEG' : 'RAD'}
                  </button>
                ))}
              </div>
            </div>

            {/* Display */}
            <div className="mt-4 rounded-xl bg-slate-100 px-4 pb-3 pt-4 dark:bg-slate-800/70">
              <label htmlFor="scientific-expression" className="sr-only">
                {t.expressionLabel}
              </label>
              <input
                id="scientific-expression"
                ref={inputRef}
                type="text"
                value={expression}
                onChange={(event) => {
                  commitExpression(event.target.value);
                  setOutput(null);
                  setJustEvaluated(false);
                }}
                onKeyDown={onKeyDown}
                placeholder={t.expressionPlaceholder}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-describedby="scientific-result"
                className="w-full bg-transparent text-right font-mono text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-500"
              />
              <p
                id="scientific-result"
                role="status"
                aria-live="polite"
                aria-label={t.resultLabel}
                className="mt-1 min-h-[2.75rem] break-all text-right font-mono text-4xl font-semibold text-slate-900 dark:text-white"
              >
                {resultText ?? '0'}
              </p>
              {output?.type === 'error' && (
                <p
                  role="alert"
                  className="mt-1 text-right text-sm font-medium text-red-700 dark:text-red-300"
                >
                  {output.message}
                </p>
              )}
              <div className="mt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFraction((v) => !v)}
                  disabled={fraction === null}
                  aria-pressed={showFraction}
                  className="rounded-md px-2 py-1 text-xs text-slate-500 transition-colors hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {t.fractionToggle}
                </button>
                <button
                  type="button"
                  onClick={copyResult}
                  disabled={resultText === null}
                  aria-label={t.copyResult}
                  title={copied ? t.copied : t.copyResult}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 transition-colors hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <CopyIcon />
                  {copied ? t.copied : null}
                </button>
              </div>
            </div>

            {/* Memory row */}
            <div className="mt-3 flex items-center gap-1.5">
              <span
                aria-label={t.memoryLabel}
                title={t.memoryLabel}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold',
                  hasMemoryValue(memory)
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 dark:text-slate-600',
                ].join(' ')}
              >
                M
              </span>
              {(
                [
                  { id: 'mc', label: 'MC', aria: t.memoryClear, run: () => setMemory(0) },
                  {
                    id: 'mr',
                    label: 'MR',
                    aria: t.memoryRecall,
                    run: () => insert(formatForInsert(memory)),
                  },
                  {
                    id: 'mplus',
                    label: 'M+',
                    aria: t.memoryAdd,
                    run: () => setMemory((m) => addToMemory(m, lastValue)),
                  },
                  {
                    id: 'mminus',
                    label: 'M−',
                    aria: t.memorySubtract,
                    run: () => setMemory((m) => subtractFromMemory(m, lastValue)),
                  },
                ] as const
              ).map((button) => (
                <button
                  key={button.id}
                  type="button"
                  aria-label={button.aria}
                  onClick={button.run}
                  className="flex h-9 items-center justify-center rounded-lg px-2.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {button.label}
                </button>
              ))}
              <span className="flex-1" />
              <button
                type="button"
                aria-label={t.undo}
                onClick={undo}
                disabled={undoRef.current.length === 0}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6.5 3.5 3 7l3.5 3.5" />
                  <path d="M3.5 7H10a3.5 3.5 0 0 1 0 7H8" />
                </svg>
              </button>
              <button
                type="button"
                aria-label={t.redo}
                onClick={redo}
                disabled={redoRef.current.length === 0}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9.5 3.5 13 7l-3.5 3.5" />
                  <path d="M12.5 7H6a3.5 3.5 0 0 0 0 7h2" />
                </svg>
              </button>
            </div>

            {/* Function rows */}
            <div role="group" aria-label={t.functionRowsLabel} className="mt-3 space-y-2">
              {FUNCTION_ROWS.map((row, index) => (
                <div key={index} className="grid grid-cols-6 gap-2">
                  {row.map(renderKey)}
                </div>
              ))}
            </div>

            {/* Keypad */}
            <div role="group" aria-label={t.keypadLabel} className="mt-2 space-y-2">
              {KEYPAD_ROWS.map((row, index) => (
                <div key={index} className="grid grid-cols-5 gap-2">
                  {row.map(renderKey)}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  aria-hidden="true"
                >
                  <rect x="1.5" y="4" width="13" height="9" rx="1.5" />
                  <path
                    d="M4.5 7h1M7 7h1M9.5 7h1M12 7h.5M4.5 10h1M12 10h.5M6.5 10h3"
                    strokeLinecap="round"
                  />
                </svg>
                {t.footerEnter}
              </span>
              <span>{t.footerDevice}</span>
            </div>
          </section>

          {/* History column */}
          <aside
            aria-label={t.historyTitle}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 lg:max-h-none"
          >
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 2.64-6.36" />
                  <path d="M3 4v5h5" />
                  <path d="M12 7v5l3.5 2" />
                </svg>
                {t.historyTitle}
              </h3>
              <button
                type="button"
                onClick={clearHistory}
                disabled={entries.length === 0}
                aria-label={t.historyClear}
                title={t.historyClear}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-30 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <TrashIcon />
              </button>
            </div>

            {entries.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
                <HistoryIcon />
                <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {t.historyEmptyTitle}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {t.historyEmptyBody}
                </p>
              </div>
            ) : (
              <ul className="mt-3 flex-1 space-y-1 overflow-y-auto lg:max-h-[560px]">
                {entries.map((entry) => (
                  <li key={`${entry.at}-${entry.expression}`}>
                    <button
                      type="button"
                      onClick={() => reuseEntry(entry)}
                      aria-label={`${t.historyReuse}: ${entry.expression} = ${entry.result}`}
                      title={`${t.historyReuse}: ${entry.expression}`}
                      className="block w-full rounded-lg px-3 py-2 text-right transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span className="block truncate font-mono text-xs text-slate-500 dark:text-slate-400">
                        {entry.expression}
                      </span>
                      <span className="block truncate font-mono text-sm font-semibold text-slate-900 dark:text-white">
                        = {entry.result}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-4 border-t border-slate-100 pt-3 text-center text-[11px] text-slate-400 dark:border-slate-800 dark:text-slate-500">
              {t.historyStoredNote}
            </p>
          </aside>
        </div>
      </div>
    </ErrorBoundary>
  );
}
