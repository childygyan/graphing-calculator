/**
 * Tests: named local saves (CRUD) against an in-memory localStorage stub.
 * The storage module guards on `typeof window`, so the stub installs a
 * fake window with a Map-backed localStorage.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  MAX_SAVED_GRAPHS,
  deleteSavedGraph,
  getSavedGraph,
  listSavedGraphs,
  renameSavedGraph,
  saveNamedGraph,
} from '../storage.js';
import { stateToDocument } from '../document.js';
import { createInitialCalculatorState } from '../../expressions/expressions.js';

function installStorageStub(): () => void {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (key: string): string | null => (store.has(key) ? (store.get(key) as string) : null),
    setItem: (key: string, value: string): void => {
      store.set(key, String(value));
    },
    removeItem: (key: string): void => {
      store.delete(key);
    },
    clear: (): void => {
      store.clear();
    },
  };
  (globalThis as Record<string, unknown>).window = { localStorage };
  return () => {
    delete (globalThis as Record<string, unknown>).window;
  };
}

function makeDocument(name?: string) {
  return stateToDocument(createInitialCalculatorState('light'), name);
}

describe('named saves', () => {
  let uninstall: () => void = () => undefined;

  beforeEach(() => {
    uninstall = installStorageStub();
  });

  afterEach(() => {
    uninstall();
  });

  it('saves and lists a graph', () => {
    const result = saveNamedGraph('First', makeDocument());
    expect(result.ok).toBe(true);
    const entries = listSavedGraphs();
    expect(entries).toHaveLength(1);
    expect(entries[0].name).toBe('First');
    expect(entries[0].document.expressions).toHaveLength(1);
  });

  it('rejects an empty name', () => {
    expect(saveNamedGraph('   ', makeDocument()).ok).toBe(false);
  });

  it('overwrites a save with the same name (case-insensitive)', () => {
    expect(saveNamedGraph('Graph', makeDocument()).ok).toBe(true);
    expect(saveNamedGraph('graph', makeDocument()).ok).toBe(true);
    expect(listSavedGraphs()).toHaveLength(1);
  });

  it('renames a save', () => {
    const saved = saveNamedGraph('Old', makeDocument());
    expect(saved.ok).toBe(true);
    if (!saved.ok) return;
    const renamed = renameSavedGraph(saved.entry.id, 'New');
    expect(renamed.ok).toBe(true);
    expect(getSavedGraph(saved.entry.id)?.name).toBe('New');
  });

  it('rejects renaming to an existing name', () => {
    const first = saveNamedGraph('One', makeDocument());
    const second = saveNamedGraph('Two', makeDocument());
    expect(first.ok && second.ok).toBe(true);
    if (!first.ok || !second.ok) return;
    expect(renameSavedGraph(second.entry.id, 'one').ok).toBe(false);
  });

  it('deletes a save', () => {
    const saved = saveNamedGraph('Gone', makeDocument());
    expect(saved.ok).toBe(true);
    if (!saved.ok) return;
    expect(deleteSavedGraph(saved.entry.id)).toBe(true);
    expect(listSavedGraphs()).toHaveLength(0);
    expect(deleteSavedGraph(saved.entry.id)).toBe(false);
  });

  it('enforces the save-library cap', () => {
    for (let i = 0; i < MAX_SAVED_GRAPHS; i++) {
      expect(saveNamedGraph(`Graph ${i}`, makeDocument()).ok).toBe(true);
    }
    const overflow = saveNamedGraph('One too many', makeDocument());
    expect(overflow.ok).toBe(false);
    if (!overflow.ok) expect(overflow.error).toMatch(/full/i);
  });

  it('skips corrupt entries when listing', () => {
    const windowWithStorage = (globalThis as Record<string, unknown>).window as {
      localStorage: { setItem: (k: string, v: string) => void };
    };
    windowWithStorage.localStorage.setItem(
      'graphing-calculator-saved-graphs-v1',
      JSON.stringify({ saves: [{ id: 'bad', name: 'Bad', document: { nonsense: true } }] })
    );
    expect(listSavedGraphs()).toHaveLength(0);
  });

  it('returns [] without a window (SSR)', () => {
    uninstall();
    expect(listSavedGraphs()).toEqual([]);
    expect(saveNamedGraph('X', makeDocument()).ok).toBe(false);
  });
});
