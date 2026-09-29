/**
 * Central calculator state store (React context + useReducer).
 *
 * This is the ONLY place calculator state lives. Components read via
 * `useCalculator()` and change state by dispatching `CalculatorAction`s —
 * there is no math computation in here, only state transitions.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
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
import {
  moveExpressionToFolder,
  removeExpressionFromFolders,
} from '../../lib/expressions/folders.js';
import { sanitizeAnalysisState } from '../../lib/analysis/state.js';
import { normalizeVariableName, validateVariableName } from '../../lib/math/variables.js';
import { suggestVariableName } from '../../lib/math/variables.js';
import type { GraphDocument } from '../../lib/persistence/document.js';
import { documentToState } from '../../lib/persistence/document.js';
import {
  clearHistory,
  createHistory,
  recordHistory,
  redoHistory,
  undoHistory,
  type HistoryStacks,
} from '../../lib/persistence/history.js';
import { canonicalStringify } from '../../lib/persistence/dirty.js';

export type CalculatorAction =
  | { type: 'ADD_EXPRESSION'; kind: ExpressionKind }
  | { type: 'INSERT_EXPRESSION'; expression: Expression }
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
  | { type: 'SET_VARIABLE_VALUE'; name: string; value: number }
  | { type: 'TOGGLE_FOLDER_COLLAPSED'; id: string }
  | { type: 'MOVE_EXPRESSION_TO_FOLDER'; expressionId: string; folderId: string | null }
  | {
      type: 'APPLY_ACTION_RESULT';
      updates: Array<{ name: string; expression: string }>;
    };

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
 * Lazily build the provider's initial state. Priority: an explicit document
 * (shared links, imports) first; otherwise a previously persisted state from
 * localStorage when it has a recognizable shape; otherwise defaults. Guards
 * against SSR (no window) and corrupt payloads.
 */
interface InitializeArgs {
  initialTheme?: ThemeMode;
  /** When provided, the store starts from this document instead of storage. */
  initialDocument?: GraphDocument | null;
}

function initializeState(args: InitializeArgs): CalculatorState {
  const defaults = createInitialCalculatorState(args.initialTheme ?? siteConfig.defaultTheme);
  if (args.initialDocument) {
    try {
      return documentToState(args.initialDocument);
    } catch {
      return defaults;
    }
  }
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

/**
 * Actions that participate in undo/redo history. Deliberately excludes
 * SET_VIEWPORT (gesture-driven floods; RESET_VIEWPORT is the undoable
 * "viewport" action), selection, theme, transient inspection, and settings
 * toggles — those are either not content or change too often to be useful
 * as undo steps.
 */
const UNDOABLE_ACTION_TYPES: ReadonlySet<CalculatorAction['type']> = new Set([
  'ADD_EXPRESSION',
  'INSERT_EXPRESSION',
  'UPDATE_EXPRESSION',
  'REMOVE_EXPRESSION',
  'DUPLICATE_EXPRESSION',
  'TOGGLE_EXPRESSION_VISIBILITY',
  'TOGGLE_FOLDER_COLLAPSED',
  'MOVE_EXPRESSION_TO_FOLDER',
  'APPLY_ACTION_RESULT',
  'ADD_VARIABLE',
  'UPDATE_VARIABLE',
  'REMOVE_VARIABLE',
  'SET_VARIABLE_VALUE',
  'RESET_VIEWPORT',
  'ADD_INTEGRAL',
  'UPDATE_INTEGRAL',
  'REMOVE_INTEGRAL',
  'ADD_TANGENT',
  'UPDATE_TANGENT',
  'REMOVE_TANGENT',
  'TOGGLE_DERIVATIVE_PLOT',
  'ADD_ANNOTATION',
  'UPDATE_ANNOTATION',
  'REMOVE_ANNOTATION',
  'SET_MARKERS',
  'CLEAR_MARKERS',
]);

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState {
  switch (action.type) {
    case 'ADD_EXPRESSION': {
      const expression = createExpression(action.kind);
      return {
        ...state,
        expressions: [...state.expressions, expression],
        selectedExpressionId: expression.id,
      };
    }
    case 'INSERT_EXPRESSION': {
      // Insert a fully-built expression (used by the AI command processor).
      // A colliding id is regenerated so state can never hold duplicates.
      const exists = state.expressions.some((e) => e.id === action.expression.id);
      const expression: Expression = exists
        ? { ...action.expression, id: createExpressionId() }
        : action.expression;
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
        expressions: removeExpressionFromFolders(expressions, action.id),
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
    case 'TOGGLE_FOLDER_COLLAPSED': {
      const target = state.expressions.find((e) => e.id === action.id);
      if (!target || target.kind !== 'folder') return state;
      return {
        ...state,
        expressions: state.expressions.map((e) =>
          e.id === action.id && e.kind === 'folder'
            ? {
                ...e,
                definition: { ...e.definition, collapsed: !e.definition.collapsed },
                updatedAt: Date.now(),
              }
            : e
        ),
      };
    }
    case 'MOVE_EXPRESSION_TO_FOLDER': {
      const next = moveExpressionToFolder(state.expressions, action.expressionId, action.folderId);
      if (next === state.expressions) return state;
      return { ...state, expressions: next };
    }
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
    case 'APPLY_ACTION_RESULT': {
      // Atomic application of an action button's computed assignments: one
      // undo step no matter how many variables changed. The caller evaluates
      // each assignment against the engine; the reducer only writes.
      if (action.updates.length === 0) return state;
      let variables = state.variables;
      let changed = false;
      for (const update of action.updates) {
        const name = normalizeVariableName(update.name);
        if (validateVariableName(name) !== null) continue;
        const numeric = Number(update.expression);
        const finiteValue = Number.isFinite(numeric) ? numeric : 0;
        const index = variables.findIndex((v) => v.name === name);
        if (index >= 0) {
          if (variables[index].expression === update.expression) continue;
          variables = variables.map((v, i) =>
            i === index ? { ...v, expression: update.expression } : v
          );
        } else {
          variables = [
            ...variables,
            {
              name,
              expression: update.expression,
              min: finiteValue - 10,
              max: finiteValue + 10,
              step: 0.1,
            },
          ];
        }
        changed = true;
      }
      if (!changed) return state;
      return { ...state, variables };
    }
    case 'HYDRATE':
      return action.state;
  }
}

/** An editable element where the browser's native undo must win. */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable
  );
}

interface CalculatorContextValue {
  state: CalculatorState;
  dispatch: Dispatch<CalculatorAction>;
  /** Undo/redo (Phase 7). */
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  /** Dirty-state tracking (Phase 7): true since the last save/load. */
  isDirty: boolean;
  /** Mark the current state as saved (clears the dirty flag). */
  markSaved: () => void;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({
  children,
  initialTheme,
  initialDocument,
  persist = true,
}: {
  children: ReactNode;
  initialTheme?: ThemeMode;
  initialDocument?: GraphDocument | null;
  /**
   * Write state changes to localStorage. Disable for the shared `/graph/`
   * route so opening someone's link never clobbers the visitor's draft.
   */
  persist?: boolean;
}): ReactNode {
  const [state, baseDispatch] = useReducer(
    calculatorReducer,
    { initialTheme, initialDocument },
    initializeState
  );

  // History + dirty baseline live in refs so the wrapped dispatch below
  // stays referentially stable; canUndo/canRedo/isDirty mirror into React
  // state for rendering.
  const stateRef = useRef(state);
  const historyRef = useRef<HistoryStacks<CalculatorState>>(createHistory());
  const baselineRef = useRef<string>(canonicalStringify(state));
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const syncHistoryFlags = useCallback(() => {
    const history = historyRef.current;
    setCanUndo(history.past.length > 0);
    setCanRedo(history.future.length > 0);
  }, []);

  const undo = useCallback(() => {
    const previous = undoHistory(historyRef.current, stateRef.current);
    if (previous === null) return;
    stateRef.current = previous;
    syncHistoryFlags();
    baseDispatch({ type: 'HYDRATE', state: previous });
  }, [syncHistoryFlags]);

  const redo = useCallback(() => {
    const next = redoHistory(historyRef.current, stateRef.current);
    if (next === null) return;
    stateRef.current = next;
    syncHistoryFlags();
    baseDispatch({ type: 'HYDRATE', state: next });
  }, [syncHistoryFlags]);

  const markSaved = useCallback(() => {
    baselineRef.current = canonicalStringify(stateRef.current);
    setIsDirty(false);
  }, []);

  const dispatch = useCallback<Dispatch<CalculatorAction>>(
    (action) => {
      if (action.type === 'HYDRATE') {
        // Loads (restore, import, share, undo/redo): a new branch of
        // history starts — past undo steps no longer apply.
        clearHistory(historyRef.current);
        syncHistoryFlags();
        baselineRef.current = canonicalStringify(action.state);
        stateRef.current = action.state;
        baseDispatch(action);
        setIsDirty(false);
        return;
      }
      const current = stateRef.current;
      const next = calculatorReducer(current, action);
      if (next === current) return;
      if (UNDOABLE_ACTION_TYPES.has(action.type)) {
        recordHistory(historyRef.current, current);
        syncHistoryFlags();
      }
      stateRef.current = next;
      baseDispatch(action);
    },
    [syncHistoryFlags]
  );

  // Recompute the dirty flag after every state change. The canonical
  // snapshot ignores object key order, so hydrated documents compare
  // correctly against the baseline.
  useEffect(() => {
    setIsDirty(canonicalStringify(state) !== baselineRef.current);
  }, [state]);

  // Keyboard shortcuts: Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z or Ctrl+Y redo.
  // Never hijacks native text-field undo.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (isEditableTarget(event.target)) return;
      if (!event.ctrlKey && !event.metaKey) return;
      const key = event.key.toLowerCase();
      if (key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (key === 'y' || (key === 'z' && event.shiftKey)) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Warn on navigation away, but only when there are actual unsaved changes.
  useEffect(() => {
    if (!isDirty || typeof window === 'undefined') return;
    const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Persist every state change to localStorage (best-effort), unless the
  // caller disabled persistence (shared-link route).
  useEffect(() => {
    if (!persist) return;
    try {
      window.localStorage.setItem(siteConfig.stateStorageKey, JSON.stringify(state));
    } catch {
      // Storage unavailable (private mode, quota, SSR) — state still works in memory.
    }
  }, [state, persist]);

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
    <CalculatorContext.Provider
      value={{ state, dispatch, undo, redo, canUndo, canRedo, isDirty, markSaved }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator(): CalculatorContextValue {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
