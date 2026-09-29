/**
 * VariablePanel — the Variables panel of the calculator workspace.
 *
 * - Named variable definitions (name, value expression, slider range).
 * - Per-variable sliders with debounced live updates.
 * - Play/pause animation sweeping a variable across its range at an
 *   adjustable speed; disabled when the OS prefers reduced motion.
 * - "Undefined variable" candidates detected in expressions, with
 *   one-click quick-add.
 * - Honest inline errors: parse errors, unknown names, circular
 *   references — all reported by the VariableEnvironment.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../ui/index.js';
import { Panel } from '../ui/index.js';
import { TextInput } from '../ui/index.js';
import { PauseIcon, PlayIcon, PlusIcon, TrashIcon } from '../ui/icons.js';
import { cn } from '../../lib/utils/cn.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import {
  CARTESIAN_PARAMETER,
  definedVariableNames,
  findFreeVariables,
  findUndefinedVariables,
  validateVariableName,
  VariableEnvironment,
} from '../../lib/math/variables.js';
import { formatNumber } from '../../lib/math/format.js';
import type { Expression, PrecisionSettings, VariableDefinition } from '../../types/calculator.js';

/** Trailing debounce before a slider drag writes to the store. */
const SLIDER_COMMIT_DELAY_MS = 70;
/** Animation dispatches are throttled to this frame budget. */
const ANIMATION_FRAME_MS = 50;
/** Fraction of the slider range swept per second, per speed setting. */
const SPEED_FRACTIONS = { slow: 0.1, normal: 0.25, fast: 0.5 } as const;
type SpeedKey = keyof typeof SPEED_FRACTIONS;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (): void => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/** (source, bound parameter) pairs for every editable field of an expression. */
function expressionSources(expression: Expression): Array<{ source: string; parameter: string }> {
  switch (expression.kind) {
    case 'cartesian':
      return [{ source: expression.definition.rhs, parameter: 'x' }];
    case 'parametric':
      return [
        { source: expression.definition.xOfT, parameter: 't' },
        { source: expression.definition.yOfT, parameter: 't' },
        { source: expression.definition.tMin, parameter: 't' },
        { source: expression.definition.tMax, parameter: 't' },
      ];
    case 'polar':
      return [{ source: expression.definition.rOfTheta, parameter: 'theta' }];
    case 'point':
      return [
        { source: expression.definition.x, parameter: 'x' },
        { source: expression.definition.y, parameter: 'x' },
      ];
    case 'inequality': {
      const parameter = expression.definition.lhs.trim().toLowerCase() === 'x' ? 'y' : 'x';
      return [{ source: expression.definition.rhs, parameter }];
    }
    default:
      return [];
  }
}

/**
 * True when the variable's value is a plain number the slider can own.
 * A definition referencing other variables keeps its formula — dragging
 * would silently destroy it, so the slider stays disabled with a hint.
 */
function isSlidable(def: VariableDefinition): boolean {
  try {
    return findFreeVariables(def.expression, CARTESIAN_PARAMETER).length === 0;
  } catch {
    return false;
  }
}

function formatValue(value: number, precision: PrecisionSettings): string {
  if (!Number.isFinite(value)) return '—';
  return formatNumber(value, precision);
}

function VariableRow({
  def,
  value,
  issues,
  playing,
  animationBlocked,
  precision,
  onTogglePlay,
  onPause,
}: {
  def: VariableDefinition;
  value: number;
  issues: string[];
  playing: boolean;
  animationBlocked: boolean;
  precision: PrecisionSettings;
  onTogglePlay: () => void;
  onPause: () => void;
}) {
  const { dispatch } = useCalculator();
  const [nameDraft, setNameDraft] = useState(def.name);
  const [sliderMirror, setSliderMirror] = useState<number | null>(null);
  const commitTimer = useRef<number | null>(null);

  // Keep the name draft in sync when the store value changes elsewhere.
  useEffect(() => {
    setNameDraft(def.name);
  }, [def.name]);

  useEffect(() => {
    return () => {
      if (commitTimer.current !== null) {
        window.clearTimeout(commitTimer.current);
        commitTimer.current = null;
      }
    };
  }, []);

  const nameError = validateVariableName(nameDraft);
  const slidable = isSlidable(def);
  const sliderValue = sliderMirror ?? (Number.isFinite(value) ? value : def.min);

  const commitName = (): void => {
    const trimmed = nameDraft.trim().toLowerCase();
    if (trimmed !== def.name && nameError === null) {
      dispatch({ type: 'UPDATE_VARIABLE', name: def.name, patch: { name: trimmed } });
    } else {
      setNameDraft(def.name);
    }
  };

  const queueValueCommit = (next: number): void => {
    if (commitTimer.current !== null) window.clearTimeout(commitTimer.current);
    commitTimer.current = window.setTimeout(() => {
      commitTimer.current = null;
      setSliderMirror(null);
      dispatch({ type: 'SET_VARIABLE_VALUE', name: def.name, value: next });
    }, SLIDER_COMMIT_DELAY_MS);
  };

  const handleSliderChange = (next: number): void => {
    onPause();
    setSliderMirror(next);
    queueValueCommit(next);
  };

  const setRange = (patch: Partial<VariableDefinition>): void => {
    dispatch({ type: 'UPDATE_VARIABLE', name: def.name, patch });
  };

  const rangeStep = def.step > 0 ? def.step : 0.1;

  return (
    <div className="rounded-lg border border-slate-200 px-3 py-2.5 dark:border-slate-700">
      <div className="flex items-center gap-2">
        <div className="w-20 shrink-0">
          <label htmlFor={`var-name-${def.name}`} className="sr-only">
            Variable name
          </label>
          <input
            id={`var-name-${def.name}`}
            type="text"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            onBlur={commitName}
            onKeyDown={(event) => {
              if (event.key === 'Enter') (event.target as HTMLInputElement).blur();
            }}
            aria-invalid={nameError ? true : undefined}
            className={cn(
              'block w-full rounded-lg border px-2 py-1.5 font-mono text-sm',
              'bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100',
              nameError
                ? 'border-red-500 dark:border-red-400'
                : 'border-slate-200 dark:border-slate-700'
            )}
          />
        </div>
        <span aria-hidden="true" className="font-mono text-sm text-slate-500">
          =
        </span>
        <div className="min-w-0 flex-1">
          <TextInput
            label={`${def.name} value`}
            value={def.expression}
            onChange={(expr) =>
              dispatch({ type: 'UPDATE_VARIABLE', name: def.name, patch: { expression: expr } })
            }
            inputClassName="font-mono"
          />
        </div>
        <div
          className="w-20 shrink-0 text-right font-mono text-sm text-slate-600 dark:text-slate-300"
          title="Current resolved value"
        >
          {formatValue(value, precision)}
        </div>
        <Button
          size="sm"
          variant="ghost"
          icon={playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          aria-label={playing ? `Pause ${def.name} animation` : `Animate ${def.name}`}
          aria-pressed={playing}
          title={
            animationBlocked
              ? 'Animation disabled: your system prefers reduced motion.'
              : !slidable
                ? 'Animation needs a plain numeric value (not a formula).'
                : playing
                  ? `Pause ${def.name} animation`
                  : `Animate ${def.name} across its range`
          }
          disabled={animationBlocked || !slidable}
          onClick={onTogglePlay}
        />
        <Button
          size="sm"
          variant="ghost"
          icon={<TrashIcon className="h-4 w-4" />}
          aria-label={`Delete variable ${def.name}`}
          onClick={() => dispatch({ type: 'REMOVE_VARIABLE', name: def.name })}
        />
      </div>
      {nameError ? (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">{nameError}</p>
      ) : null}
      {issues.length > 0 ? (
        <ul className="mt-1 space-y-0.5">
          {issues.map((message, index) => (
            <li key={index} className="text-xs text-red-600 dark:text-red-400">
              {message}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-2 flex items-center gap-2">
        <span className="shrink-0 font-mono text-xs text-slate-500">{def.min}</span>
        <label htmlFor={`var-slider-${def.name}`} className="sr-only">
          {`${def.name} slider`}
        </label>
        <input
          id={`var-slider-${def.name}`}
          type="range"
          min={def.min}
          max={def.max}
          step={rangeStep}
          value={Math.min(def.max, Math.max(def.min, sliderValue))}
          disabled={!slidable}
          onChange={(event) => handleSliderChange(Number(event.target.value))}
          className="h-2 w-full accent-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
          title={
            slidable
              ? `Drag to change ${def.name}`
              : 'Slider unavailable: value comes from a formula.'
          }
        />
        <span className="shrink-0 font-mono text-xs text-slate-500">{def.max}</span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <TextInput
          label="Min"
          type="number"
          value={String(def.min)}
          onChange={(raw) => {
            const next = Number(raw);
            if (Number.isFinite(next)) setRange({ min: next });
          }}
          inputClassName="font-mono"
        />
        <TextInput
          label="Max"
          type="number"
          value={String(def.max)}
          onChange={(raw) => {
            const next = Number(raw);
            if (Number.isFinite(next)) setRange({ max: next });
          }}
          inputClassName="font-mono"
        />
        <TextInput
          label="Step"
          type="number"
          value={String(def.step)}
          onChange={(raw) => {
            const next = Number(raw);
            if (Number.isFinite(next) && next > 0) setRange({ step: next });
          }}
          inputClassName="font-mono"
        />
      </div>
    </div>
  );
}

export function VariablePanel() {
  const { state, dispatch } = useCalculator();
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const [speed, setSpeed] = useState<SpeedKey>('normal');
  const reducedMotion = usePrefersReducedMotion();

  const { env, issuesByName } = useMemo(() => {
    const environment = new VariableEnvironment(state.variables);
    const resolution = environment.resolve();
    const byName = new Map<string, string[]>();
    for (const issue of resolution.issues) {
      const list = byName.get(issue.variable) ?? [];
      list.push(issue.message);
      byName.set(issue.variable, list);
    }
    return { env: environment, issuesByName: byName };
  }, [state.variables]);

  const envRef = useRef(env);
  envRef.current = env;
  const playingRef = useRef(playing);
  playingRef.current = playing;
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const variablesRef = useRef(state.variables);
  variablesRef.current = state.variables;

  // Animation loop: one rAF drives every playing variable (ping-pong across
  // its range), throttling store writes to ~20fps. Refs keep the loop
  // reading current definitions without restarting it.
  //
  // Phase 9 perf: the loop only runs while at least one variable is
  // playing. Previously it spun at 60fps for the life of the page even
  // with nothing playing, burning CPU/battery on every frame.
  const anyPlaying = !reducedMotion && Object.values(playing).some((p) => p === true);
  useEffect(() => {
    if (!anyPlaying) return;
    let raf = 0;
    let last = 0;
    let lastDispatch = 0;
    const phases = new Map<string, { p: number; dir: 1 | -1 }>();
    const tick = (now: number): void => {
      if (last === 0) last = now;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const playingNow = playingRef.current;
      const vars = variablesRef.current;
      const liveEnv = envRef.current;
      const fracPerSec = SPEED_FRACTIONS[speedRef.current];
      const updates: Array<{ name: string; value: number }> = [];
      for (const def of vars) {
        if (playingNow[def.name] !== true || !isSlidable(def)) {
          phases.delete(def.name);
          continue;
        }
        const range = def.max - def.min;
        if (!(range > 0)) continue;
        let phase = phases.get(def.name);
        if (!phase) {
          const current = liveEnv.get(def.name);
          const p0 = Number.isFinite(current)
            ? Math.min(1, Math.max(0, (current - def.min) / range))
            : 0;
          phase = { p: p0, dir: 1 };
          phases.set(def.name, phase);
        }
        phase.p += phase.dir * fracPerSec * dt;
        if (phase.p >= 1) {
          phase.p = 1;
          phase.dir = -1;
        } else if (phase.p <= 0) {
          phase.p = 0;
          phase.dir = 1;
        }
        updates.push({ name: def.name, value: def.min + phase.p * range });
      }
      if (updates.length > 0 && now - lastDispatch >= ANIMATION_FRAME_MS) {
        lastDispatch = now;
        for (const update of updates) {
          dispatch({ type: 'SET_VARIABLE_VALUE', name: update.name, value: update.value });
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [anyPlaying, dispatch]);

  // Undefined-variable candidates: free identifiers in expressions that no
  // variable defines yet, offered as one-click quick-adds.
  const candidates = useMemo(() => {
    const defined = definedVariableNames(state.variables);
    const found = new Set<string>();
    for (const expression of state.expressions) {
      for (const { source, parameter } of expressionSources(expression)) {
        if (source.trim() === '') continue;
        try {
          for (const name of findUndefinedVariables(source, parameter, defined)) {
            found.add(name);
          }
        } catch {
          // Syntax errors are shown inline in the expression row.
        }
      }
    }
    return [...found].sort();
  }, [state.expressions, state.variables]);

  const togglePlay = (name: string): void => {
    setPlaying((prev) => ({ ...prev, [name]: prev[name] !== true }));
  };
  const pause = (name: string): void => {
    setPlaying((prev) => (prev[name] === true ? { ...prev, [name]: false } : prev));
  };

  return (
    <Panel
      title="Variables"
      actions={
        <>
          <label htmlFor="variable-animation-speed" className="sr-only">
            Animation speed
          </label>
          <select
            id="variable-animation-speed"
            value={speed}
            onChange={(event) => setSpeed(event.target.value as SpeedKey)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            title="Animation sweep speed"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
          <Button
            size="sm"
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={() => dispatch({ type: 'ADD_VARIABLE' })}
          >
            Add
          </Button>
        </>
      }
    >
      {reducedMotion ? (
        <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
          Animation is off because your system prefers reduced motion.
        </p>
      ) : null}
      {state.variables.length === 0 ? (
        <p className="py-2 text-sm text-slate-500 dark:text-slate-400">
          No variables yet. Add one, then use it in any expression — e.g.{' '}
          <span className="font-mono">y = a·sin(b·x)</span>.
        </p>
      ) : (
        <div className="space-y-2">
          {state.variables.map((def) => (
            <VariableRow
              key={def.name}
              def={def}
              value={env.get(def.name)}
              issues={issuesByName.get(def.name) ?? []}
              playing={playing[def.name] === true && !reducedMotion}
              animationBlocked={reducedMotion}
              precision={state.analysis.precision}
              onTogglePlay={() => togglePlay(def.name)}
              onPause={() => pause(def.name)}
            />
          ))}
        </div>
      )}
      {candidates.length > 0 ? (
        <div className="mt-3 border-t border-slate-200 pt-2 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Used in expressions but not defined:
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {candidates.map((name) => (
              <Button
                key={name}
                size="sm"
                variant="ghost"
                icon={<PlusIcon className="h-3.5 w-3.5" />}
                onClick={() => dispatch({ type: 'ADD_VARIABLE', name })}
                aria-label={`Define variable ${name}`}
              >
                <span className="font-mono">{name}</span>
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </Panel>
  );
}

export default VariablePanel;
