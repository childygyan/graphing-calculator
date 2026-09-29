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
  CalculatorState,
  Expression,
  ExpressionKind,
  GraphSettings,
  GraphViewport,
} from '../../types/calculator.js';
import {
  createExpression,
  createExpressionId,
  createInitialCalculatorState,
  DEFAULT_VIEWPORT,
} from '../../lib/expressions/expressions.js';

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
  | { type: 'HYDRATE'; state: CalculatorState };

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
