/**
 * Scientific calculator React island (Workstream B).
 *
 * A touch-friendly keypad + expression display that evaluates through
 * the shared math engine via `evaluateScientificExpression` — no
 * evaluation logic lives in this component. Full keyboard support:
 * digits and operators type natively, Enter evaluates, Escape clears.
 */
import { useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ErrorBoundary } from '../calculator/ErrorBoundary.js';
import type { AngleMode } from '../../lib/math/scientific.js';
import { calculatorKeyAction, evaluateScientificExpression } from '../../lib/math/scientific.js';

type Output = { type: 'value'; display: string } | { type: 'error'; message: string } | null;

type KeyAction = 'evaluate' | 'clear' | 'backspace' | 'toggle-angle';

interface KeyDef {
  label: string;
  ariaLabel: string;
  /** Text inserted into the expression at the cursor. */
  insert?: string;
  action?: KeyAction;
  kind: 'digit' | 'operator' | 'function' | 'control' | 'equals';
  span?: 2;
}

const KEYS: KeyDef[] = [
  { label: 'DEG', ariaLabel: 'Angle mode', action: 'toggle-angle', kind: 'control' },
  { label: 'sin', ariaLabel: 'sine', insert: 'sin(', kind: 'function' },
  { label: 'cos', ariaLabel: 'cosine', insert: 'cos(', kind: 'function' },
  { label: 'tan', ariaLabel: 'tangent', insert: 'tan(', kind: 'function' },
  { label: 'AC', ariaLabel: 'clear', action: 'clear', kind: 'control' },
  { label: 'asin', ariaLabel: 'arcsine', insert: 'asin(', kind: 'function' },
  { label: 'acos', ariaLabel: 'arccosine', insert: 'acos(', kind: 'function' },
  { label: 'atan', ariaLabel: 'arctangent', insert: 'atan(', kind: 'function' },
  { label: '(', ariaLabel: 'left parenthesis', insert: '(', kind: 'operator' },
  { label: ')', ariaLabel: 'right parenthesis', insert: ')', kind: 'operator' },
  // The engine's `log` is the natural logarithm; base-10 log is `log10`.
  { label: 'log', ariaLabel: 'logarithm base 10', insert: 'log10(', kind: 'function' },
  { label: 'ln', ariaLabel: 'natural logarithm', insert: 'ln(', kind: 'function' },
  { label: '√', ariaLabel: 'square root', insert: '√(', kind: 'function' },
  { label: 'π', ariaLabel: 'pi', insert: 'π', kind: 'function' },
  { label: 'e', ariaLabel: "Euler's number e", insert: 'e', kind: 'function' },
  { label: '7', ariaLabel: '7', insert: '7', kind: 'digit' },
  { label: '8', ariaLabel: '8', insert: '8', kind: 'digit' },
  { label: '9', ariaLabel: '9', insert: '9', kind: 'digit' },
  { label: '÷', ariaLabel: 'divide', insert: '÷', kind: 'operator' },
  { label: '⌫', ariaLabel: 'backspace', action: 'backspace', kind: 'control' },
  { label: '4', ariaLabel: '4', insert: '4', kind: 'digit' },
  { label: '5', ariaLabel: '5', insert: '5', kind: 'digit' },
  { label: '6', ariaLabel: '6', insert: '6', kind: 'digit' },
  { label: '×', ariaLabel: 'multiply', insert: '×', kind: 'operator' },
  { label: 'xʸ', ariaLabel: 'power', insert: '^', kind: 'operator' },
  { label: '1', ariaLabel: '1', insert: '1', kind: 'digit' },
  { label: '2', ariaLabel: '2', insert: '2', kind: 'digit' },
  { label: '3', ariaLabel: '3', insert: '3', kind: 'digit' },
  { label: '−', ariaLabel: 'minus', insert: '−', kind: 'operator' },
  { label: '+', ariaLabel: 'plus', insert: '+', kind: 'operator' },
  { label: '0', ariaLabel: '0', insert: '0', kind: 'digit', span: 2 },
  { label: '.', ariaLabel: 'decimal point', insert: '.', kind: 'digit' },
  { label: '=', ariaLabel: 'equals', action: 'evaluate', kind: 'equals', span: 2 },
];

/** Tokens that continue from the previous result after evaluation. */
const CONTINUE_TOKENS = new Set(['+', '−', '×', '÷', '^', ')']);

const KIND_CLASS: Record<KeyDef['kind'], string> = {
  digit:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
  operator:
    'bg-brand-100 text-brand-800 hover:bg-brand-200 dark:bg-brand-900/50 dark:text-brand-200 dark:hover:bg-brand-900',
  function:
    'bg-slate-200/70 text-sm text-slate-800 hover:bg-slate-300/70 dark:bg-slate-700/60 dark:text-slate-100 dark:hover:bg-slate-700',
  control:
    'bg-slate-200/70 text-slate-800 hover:bg-slate-300/70 dark:bg-slate-700/60 dark:text-slate-100 dark:hover:bg-slate-700',
  equals:
    'bg-brand-600 text-lg text-white hover:bg-brand-700 dark:bg-brand-600 dark:hover:bg-brand-500',
};

export function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<AngleMode>('deg');
  const [output, setOutput] = useState<Output>(null);
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [lastValue, setLastValue] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const insert = (text: string) => {
    if (justEvaluated) {
      // After "=", digits/functions start a fresh expression while
      // operators continue from the previous result.
      const next =
        lastValue !== null && CONTINUE_TOKENS.has(text) ? `${String(lastValue)}${text}` : text;
      setExpression(next);
      setOutput(null);
      setJustEvaluated(false);
      placeCursor(next.length);
      return;
    }
    const input = inputRef.current;
    const cursor = input?.selectionStart ?? expression.length;
    const end = input?.selectionEnd ?? expression.length;
    const next = expression.slice(0, cursor) + text + expression.slice(end);
    setExpression(next);
    setOutput(null);
    placeCursor(cursor + text.length);
  };

  const evaluate = () => {
    const result = evaluateScientificExpression(expression, angleMode);
    if (result.ok) {
      setOutput({ type: 'value', display: result.display });
      setLastValue(result.value);
    } else {
      setOutput({ type: 'error', message: result.message });
      setLastValue(null);
    }
    setJustEvaluated(true);
    focusInput();
  };

  const clear = () => {
    setExpression('');
    setOutput(null);
    setJustEvaluated(false);
    setLastValue(null);
    focusInput();
  };

  const backspace = () => {
    if (justEvaluated && lastValue !== null) {
      const text = String(lastValue);
      setExpression(text.slice(0, -1));
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
      setExpression(expression.slice(0, cursor) + expression.slice(end));
      placeCursor(cursor);
    } else if (cursor > 0) {
      setExpression(expression.slice(0, cursor - 1) + expression.slice(cursor));
      placeCursor(cursor - 1);
    }
    setOutput(null);
  };

  const toggleAngle = () => {
    setAngleMode((mode) => (mode === 'deg' ? 'rad' : 'deg'));
    setOutput(null);
    setJustEvaluated(false);
    focusInput();
  };

  const pressKey = (key: KeyDef) => {
    if (key.action === 'evaluate') evaluate();
    else if (key.action === 'clear') clear();
    else if (key.action === 'backspace') backspace();
    else if (key.action === 'toggle-angle') toggleAngle();
    else if (key.insert !== undefined) insert(key.insert);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    const action = calculatorKeyAction(event.key);
    if (!action) return;
    event.preventDefault();
    if (action.type === 'evaluate') evaluate();
    else if (action.type === 'clear') clear();
    else insert(action.text);
  };

  return (
    <ErrorBoundary fallbackTitle="Scientific calculator failed to load">
      <div className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Scientific Calculator
          </h2>
          <span
            className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800 dark:bg-brand-900/50 dark:text-brand-200"
            aria-label={`Angle mode: ${angleMode === 'deg' ? 'degrees' : 'radians'}`}
          >
            {angleMode === 'deg' ? 'DEG' : 'RAD'}
          </span>
        </div>

        <div className="mt-4">
          <label htmlFor="scientific-expression" className="sr-only">
            Expression
          </label>
          <input
            id="scientific-expression"
            ref={inputRef}
            type="text"
            value={expression}
            onChange={(event) => {
              setExpression(event.target.value);
              setOutput(null);
              setJustEvaluated(false);
            }}
            onKeyDown={onKeyDown}
            placeholder="e.g. sin(30) + √(16)"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-right font-mono text-xl text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          <div className="mt-2 min-h-[3.5rem] rounded-lg bg-slate-50 px-4 py-2 dark:bg-slate-800">
            {output?.type === 'value' && (
              <p
                role="status"
                aria-live="polite"
                className="break-all text-right font-mono text-2xl font-semibold text-slate-900 dark:text-white"
              >
                = {output.display}
              </p>
            )}
            {output?.type === 'error' && (
              <p
                role="alert"
                className="text-right text-base font-medium text-red-700 dark:text-red-300"
              >
                {output.message}
              </p>
            )}
            {!output && (
              <p className="text-right text-base text-slate-400 dark:text-slate-500">
                Press = or Enter to evaluate
              </p>
            )}
          </div>
        </div>

        <div role="group" aria-label="Calculator keypad" className="mt-4 grid grid-cols-5 gap-2">
          {KEYS.map((key) => (
            <button
              key={key.ariaLabel + key.label}
              type="button"
              aria-label={key.ariaLabel}
              aria-pressed={key.action === 'toggle-angle' ? angleMode === 'deg' : undefined}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => pressKey(key)}
              className={[
                'flex min-h-[48px] items-center justify-center rounded-lg font-medium',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                'active:scale-95',
                key.span === 2 ? 'col-span-2' : '',
                KIND_CLASS[key.kind],
                key.action === 'toggle-angle' ? 'font-bold text-brand-800 dark:text-brand-200' : '',
                key.label === 'AC' ? 'font-bold text-red-700 dark:text-red-300' : '',
              ].join(' ')}
            >
              {key.action === 'toggle-angle' ? (angleMode === 'deg' ? 'DEG' : 'RAD') : key.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Tip: type on your keyboard — Enter evaluates, Esc clears, × ÷ and ^ work as usual.
        </p>
      </div>
    </ErrorBoundary>
  );
}
