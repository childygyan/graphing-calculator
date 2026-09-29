/**
 * Undo/redo history: pure stack helpers. The store owns the stacks; these
 * functions only move immutable state snapshots between them.
 */

/** Maximum undo depth — old entries are dropped, newest-first. */
export const UNDO_HISTORY_CAP = 50;

export interface HistoryStacks<T> {
  past: T[];
  future: T[];
}

export function createHistory<T>(): HistoryStacks<T> {
  return { past: [], future: [] };
}

/**
 * Record the state being left behind. Clears the redo stack (a new branch
 * of history starts) and drops the oldest entry past the cap.
 */
export function recordHistory<T>(history: HistoryStacks<T>, previous: T): void {
  history.past.push(previous);
  if (history.past.length > UNDO_HISTORY_CAP) {
    history.past.splice(0, history.past.length - UNDO_HISTORY_CAP);
  }
  history.future = [];
}

/** Undo: move `current` to the redo stack, return the state to restore. */
export function undoHistory<T>(history: HistoryStacks<T>, current: T): T | null {
  const previous = history.past.pop();
  if (previous === undefined) return null;
  history.future.push(current);
  return previous;
}

/** Redo: move `current` back to the undo stack, return the state to restore. */
export function redoHistory<T>(history: HistoryStacks<T>, current: T): T | null {
  const next = history.future.pop();
  if (next === undefined) return null;
  history.past.push(current);
  return next;
}

/** Clear both stacks (used on load / import / restore). */
export function clearHistory<T>(history: HistoryStacks<T>): void {
  history.past = [];
  history.future = [];
}

export function canUndo<T>(history: HistoryStacks<T>): boolean {
  return history.past.length > 0;
}

export function canRedo<T>(history: HistoryStacks<T>): boolean {
  return history.future.length > 0;
}
