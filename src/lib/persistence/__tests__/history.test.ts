/**
 * Tests: undo/redo history stack transitions and the depth cap.
 */
import { describe, expect, it } from 'vitest';
import {
  UNDO_HISTORY_CAP,
  canRedo,
  canUndo,
  clearHistory,
  createHistory,
  recordHistory,
  redoHistory,
  undoHistory,
} from '../history.js';

describe('history stacks', () => {
  it('starts empty', () => {
    const history = createHistory<number>();
    expect(canUndo(history)).toBe(false);
    expect(canRedo(history)).toBe(false);
  });

  it('undoes and redoes a single step', () => {
    const history = createHistory<number>();
    recordHistory(history, 1);
    expect(canUndo(history)).toBe(true);
    expect(undoHistory(history, 2)).toBe(1);
    expect(canUndo(history)).toBe(false);
    expect(canRedo(history)).toBe(true);
    expect(redoHistory(history, 1)).toBe(2);
    expect(canRedo(history)).toBe(false);
  });

  it('clears the redo stack on a new record', () => {
    const history = createHistory<number>();
    recordHistory(history, 1);
    undoHistory(history, 2);
    expect(canRedo(history)).toBe(true);
    recordHistory(history, 2);
    expect(canRedo(history)).toBe(false);
    expect(undoHistory(history, 3)).toBe(2);
  });

  it('returns null when there is nothing to undo/redo', () => {
    const history = createHistory<number>();
    expect(undoHistory(history, 1)).toBeNull();
    expect(redoHistory(history, 1)).toBeNull();
  });

  it('caps the undo depth, dropping the oldest entries', () => {
    const history = createHistory<number>();
    for (let i = 1; i <= UNDO_HISTORY_CAP + 10; i++) {
      recordHistory(history, i);
    }
    expect(history.past).toHaveLength(UNDO_HISTORY_CAP);
    expect(history.past[0]).toBe(11);
    expect(history.past[UNDO_HISTORY_CAP - 1]).toBe(UNDO_HISTORY_CAP + 10);
  });

  it('clearHistory empties both stacks', () => {
    const history = createHistory<number>();
    recordHistory(history, 1);
    undoHistory(history, 2);
    clearHistory(history);
    expect(canUndo(history)).toBe(false);
    expect(canRedo(history)).toBe(false);
  });
});
