/**
 * Central calculator state store (React context + useReducer).
 *
 * This is the ONLY place calculator state lives. Components read via
 * `useCalculator()` and change state by dispatching `CalculatorAction`s —
 * there is no math computation in here, only state transitions.
 */

import { createContext, useContext, useEffect, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import { siteConfig } from '../../data/site.js';
import type { ThemeMode } from '../../data/site.js';
import type {
  AnalysisMarker,
  CalculatorState,
  DerivativePlot,
  Expression,
  ExpressionKind,
  GraphSettings,
  GraphViewport,
  InspectedPoint,
  IntegralAnalysis,
  PointAnnotation,
  PrecisionSettings,
  TangentAnalysis,
  VariableDefinition,
} from '../../types/calculator.js';
import {
  createExpression,
  createExpressionId,
  createInitialCalculatorState,
  DEFAULT_VIEWPORT,
} from '../../lib/expressions/expressions.js';
import { sanitizeAnalysisState } from '../../lib/analysis/state.js';
import { normalizeVariableName, validateVariableName } from '../../lib/math/variables.js';
import { suggestVariableName } from '../../lib/math/variables.js';

export type CalculatorAction =
  | { type: 'ADD_EXPRESSION'; kind: ExpressionKind }
  | { type: 'UPDATE_EXPRESSION'; expression: Expression }
  | { type: 'REMOVE_EXPRESSION'; id: string }
  | { type: 'DUPLICATE_EXPRESSION'; id: string }
  | { type: 'TOGGLE_EXPRESSION_VISIBILITY'; id: string }
  | { type: 'SELECT_EXPRESSION'; id: string | null }
  | { type: 'SET_VIEWPORT'; viewport: GraphViewport }
  | { type: 'RESET_VIEWPORT' }
  | { type: 'UPDATE_SETTINGS'; patch: Partial<GraphSettings> }
  | { type: 'SET_THEME'; theme: ThemeMode }
  | { type: 'HYDRATE'; state: CalculatorState }
  | { type: 'UPDATE_PRECISION'; precision: PrecisionSettings }
  | { type: 'SET_INSPECTED_POINT'; point: InspectedPoint | null }
  | { type: 'SET_MARKERS'; markers: AnalysisMarker[] }
  | { type: 'CLEAR_MARKERS'; expressionId?: string }
  | { type: 'ADD_INTEGRAL'; integral: IntegralAnalysis }
  | { type: 'UPDATE_INTEGRAL'; id: string; patch: Partial<IntegralAnalysis> }
  | { type: 'REMOVE_INTEGRAL'; id: string }
  | { type: 'ADD_TANGENT'; tangent: TangentAnalysis }
  | { type: 'UPDATE_TANGENT'; id: string; patch: Partial<TangentAnalysis> }
  | { type: 'REMOVE_TANGENT'; id: string }
  | { type: 'TOGGLE_DERIVATIVE_PLOT'; expressionId: string }
  | { type: 'ADD_ANNOTATION'; annotation: PointAnnotation }
  | { type: 'UPDATE_ANNOTATION'; id: string; patch: Partial<PointAnnotation> }
  | { type: 'REMOVE_ANNOTATION'; id: string }
  | { type: 'ADD_VARIABLE'; name?: string }
  | { type: 'UPDATE_VARIABLE'; name: string; patch: Partial<VariableDefinition> }
  | { type: 'REMOVE_VARIABLE'; name: string }
  | { type: 'SET_VARIABLE_VALUE'; name: string; value: number };

function isFiniteViewport(value: unknown): value is GraphViewport {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.xMin === 'number' &&
    typeof v.xMax === 'number' &&
    typeof v.yMin === 'number' &&
    typeof v.yMax === 'number' &&
    Number.isFinite(v.xMin) &&
    Number.isFinite(v.xMax) &&
    Number.isFinite(v.yMin) &&
    Number.isFinite(v.yMax)
  );
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Sanitize persisted variable definitions: drop invalid entries (bad
 * names, non-string expressions, broken ranges) so corrupt localStorage
 * data can never break the environment. Names are lowercased and
 * deduplicated, keeping the first occurrence.
 */
function sanitizeVariables(value: unknown): VariableDefinition[] {
  if (!Array.isArray(value)) return [];
  const out: VariableDefinition[] = [];
  const seen = new Set<string>();
  for (const entry of value) {
    if (typeof entry !== 'object' || entry === null) continue;
    const record = entry as Record<string, unknown>;
    if (typeof record.name !== 'string') continue;
    if (validateVariableName(record.name) !== null) continue;
    const name = normalizeVariableName(record.name);
    if (seen.has(name)) continue;
    seen.add(name);
    const expression = typeof record.expression === 'string' ? record.expression : '1';
    let min = isFiniteNumber(record.min) ? record.min : -10;
    let max = isFiniteNumber(record.max) ? record.max : 10;
    if (!(min < max)) {
      min = -10;
      max = 10;
    }
    const step = isFiniteNumber(record.step) && record.step > 0 ? record.step : 0.1;
    out.push({ name, expression, min, max, step });
  }
  return out;
}

/** Clamp a slider value into its range (NaN passes through untouched). */
function clampVariableValue(def: VariableDefinition, value: number): number {
  if (!Number.isFinite(value)) return value;
  return Math.min(def.max, Math.max(def.min, value));
}

/**
 * Lazily build the provider's initial state: restore a previously persisted
 * state from localStorage when it has a recognizable shape, otherwise fall
 * back to defaults. Guards against SSR (no window) and corrupt payloads.
 */
function initializeState(initialTheme: ThemeMode | undefined): CalculatorState {
  const defaults = createInitialCalculatorState(initialTheme ?? siteConfig.defaultTheme);
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(siteConfig.stateStorageKey);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== 'object' || parsed === null) return defaults;
    const p = parsed as Record<string, unknown>;
    if (!Array.isArray(p.expressions) || !isFiniteViewport(p.viewport)) return defaults;
    return {
      expressions: p.expressions as Expression[],
      variables: sanitizeVariables(p.variables),
      viewport: p.viewport,
      settings: {
        ...defaults.settings,
        ...((typeof p.settings === 'object' && p.settings !== null
          ? p.settings
          : {}) as Partial<GraphSettings>),
      },
      selectedExpressionId:
        typeof p.selectedExpressionId === 'string' ? p.selectedExpressionId : null,
      theme: isThemeMode(p.theme) ? p.theme : defaults.theme,
      analysis: sanitizeAnalysisState(p.analysis),
      inspectedPoint: null,
    };
  } catch {
    // Corrupt or unreadable storage: start from defaults.
    return defaults;
  }
}

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'ADD_EXPRESSION': {
      const expression = createExpression(action.kind);
      return {
        ...state,
        expressions: [...state.expressions, expression],
        selectedExpressionId: expression.id,
      };
    }
    case 'UPDATE_EXPRESSION': {
      const found = state.expressions.some((e) => e.id === action.expression.id);
      if (!found) return state;
      return {
        ...state,
        expressions: state.expressions.map((e) =>
          e.id === action.expression.id ? { ...action.expression, updatedAt: Date.now() } : e
        ),
      };
    }
    case 'REMOVE_EXPRESSION': {
      const expressions = state.expressions.filter((e) => e.id !== action.id);
      if (expressions.length === state.expressions.length) return state;
      return {
        ...state,
        expressions,
        selectedExpressionId:
          state.selectedExpressionId === action.id ? null : state.selectedExpressionId,
      };
    }
    case 'DUPLICATE_EXPRESSION': {
      const index = state.expressions.findIndex((e) => e.id === action.id);
      if (index === -1) return state;
      const source = state.expressions[index];
      const copy: Expression = Object.assign({}, source, {
        id: createExpressionId(),
        label: `${source.label} (copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      const expressions = [...state.expressions];
      expressions.splice(index + 1, 0, copy);
      return { ...state, expressions, selectedExpressionId: copy.id };
    }
    case 'TOGGLE_EXPRESSION_VISIBILITY': {
      return {
        ...state,
        expressions: state.expressions.map((e) =>
          e.id === action.id ? { ...e, visible: !e.visible, updatedAt: Date.now() } : e
        ),
      };
    }
    case 'SELECT_EXPRESSION':
      return { ...state, selectedExpressionId: action.id };
    case 'SET_VIEWPORT':
      return { ...state, viewport: { ...action.viewport } };
    case 'RESET_VIEWPORT':
      return { ...state, viewport: { ...DEFAULT_VIEWPORT } };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'UPDATE_PRECISION':
      return { ...state, analysis: { ...state.analysis, precision: action.precision } };
    case 'SET_INSPECTED_POINT':
      return { ...state, inspectedPoint: action.point };
    case 'SET_MARKERS':
      return { ...state, analysis: { ...state.analysis, markers: action.markers } };
    case 'CLEAR_MARKERS':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          markers:
            action.expressionId === undefined
              ? []
              : state.analysis.markers.filter((m) => m.expressionId !== action.expressionId),
        },
      };
    case 'ADD_INTEGRAL':
      return {
        ...state,
        analysis: { ...state.analysis, integrals: [...state.analysis.integrals, action.integral] },
      };
    case 'UPDATE_INTEGRAL':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          integrals: state.analysis.integrals.map((i) =>
            i.id === action.id ? { ...i, ...action.patch } : i
          ),
        },
      };
    case 'REMOVE_INTEGRAL':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          integrals: state.analysis.integrals.filter((i) => i.id !== action.id),
        },
      };
    case 'ADD_TANGENT':
      return {
        ...state,
        analysis: { ...state.analysis, tangents: [...state.analysis.tangents, action.tangent] },
      };
    case 'UPDATE_TANGENT':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          tangents: state.analysis.tangents.map((t) =>
            t.id === action.id ? { ...t, ...action.patch } : t
          ),
        },
      };
    case 'REMOVE_TANGENT':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          tangents: state.analysis.tangents.filter((t) => t.id !== action.id),
        },
      };
    case 'TOGGLE_DERIVATIVE_PLOT': {
      const existing = state.analysis.derivativePlots.find(
        (p) => p.expressionId === action.expressionId
      );
      return {
        ...state,
        analysis: {
          ...state.analysis,
          derivativePlots: existing
            ? state.analysis.derivativePlots.filter((p) => p.id !== existing.id)
            : [
                ...state.analysis.derivativePlots,
                {
                  id: createExpressionId(),
                  expressionId: action.expressionId,
                  visible: true,
                } satisfies DerivativePlot,
              ],
        },
      };
    }
    case 'ADD_ANNOTATION':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          annotations: [...state.analysis.annotations, action.annotation],
        },
      };
    case 'UPDATE_ANNOTATION':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          annotations: state.analysis.annotations.map((a) =>
            a.id === action.id ? { ...a, ...action.patch } : a
          ),
        },
      };
    case 'REMOVE_ANNOTATION':
      return {
        ...state,
        analysis: {
          ...state.analysis,
          annotations: state.analysis.annotations.filter((a) => a.id !== action.id),
        },
      };
    case 'ADD_VARIABLE': {
      const taken = new Set(state.variables.map((v) => v.name));
      const requested = action.name?.trim().toLowerCase();
      const name =
        requested && validateVariableName(requested) === null && !taken.has(requested)
          ? requested
          : suggestVariableName(taken);
      return {
        ...state,
        variables: [...state.variables, { name, expression: '1', min: -10, max: 10, step: 0.1 }],
      };
    }
    case 'UPDATE_VARIABLE': {
      const target = normalizeVariableName(action.name);
      const patch = { ...action.patch };
      // A rename goes through the same validation as a fresh name.
      if (patch.name !== undefined) {
        const renamed = normalizeVariableName(patch.name);
        if (validateVariableName(renamed) !== null) return state;
        if (renamed !== target && state.variables.some((v) => v.name === renamed)) {
          return state;
        }
        patch.name = renamed;
      }
      let changed = false;
      const variables = state.variables.map((v) => {
        if (v.name !== target) return v;
        changed = true;
        const next = { ...v, ...patch };
        if (!(next.min < next.max)) {
          next.min = v.min;
          next.max = v.max;
        }
        if (!(next.step > 0)) next.step = v.step;
        return next;
      });
      if (!changed) return state;
      return { ...state, variables };
    }
    case 'REMOVE_VARIABLE': {
      const target = normalizeVariableName(action.name);
      const variables = state.variables.filter((v) => v.name !== target);
      if (variables.length === state.variables.length) return state;
      return { ...state, variables };
    }
    case 'SET_VARIABLE_VALUE': {
      const target = normalizeVariableName(action.name);
      let changed = false;
      const variables = state.variables.map((v) => {
        if (v.name !== target) return v;
        changed = true;
        // Slider drags write a numeric literal into the definition.
        return { ...v, expression: String(clampVariableValue(v, action.value)) };
      });
      if (!changed) return state;
      return { ...state, variables };
    }
    case 'HYDRATE':
      return action.state;
  }
}

interface CalculatorContextValue {
  state: CalculatorState;
  dispatch: Dispatch<CalculatorAction>;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: ThemeMode;
}): ReactNode {
  const [state, dispatch] = useReducer(calculatorReducer, initialTheme, initializeState);

  // Persist every state change to localStorage (best-effort).
  useEffect(() => {
    try {
      window.localStorage.setItem(siteConfig.stateStorageKey, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode, quota, SSR) — state still works in memory.
    }
  }, [state]);

  // Sync the theme to the DOM so dispatches update the page chrome.
  // NOTE: ThemeToggle in the site header lives OUTSIDE this provider and keeps
  // its own DOM logic (per its brief). Both write the same theme storage key
  // and derive from the same stored value, so last write wins — acceptable
  // for Phase 1; unify in a later phase if it causes visible flicker.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = state.theme === 'dark' || (state.theme === 'system' && prefersDark);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try {
      window.localStorage.setItem(siteConfig.themeStorageKey, state.theme);
    } catch {
      // Storage unavailable — DOM classes are still applied above.
    }
  }, [state.theme]);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>{children}</CalculatorContext.Provider>
  );
}

export function useCalculator(): CalculatorContextValue {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
