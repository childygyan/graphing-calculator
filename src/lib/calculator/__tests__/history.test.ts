/**
 * Tests for the scientific calculator history store (pure UI logic —
 * the math engine is never involved).
 */
import { describe, expect, it, vi } from 'vitest';
import { HistoryStore, type HistoryStorage } from '../history.js';

function makeStorage(): HistoryStorage & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key: string) => (data.has(key) ? data.get(key)! : null),
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
  };
}

describe('HistoryStore', () => {
  it('starts empty when storage is empty', () => {
    const store = new HistoryStore(makeStorage());
    expect(store.load()).toEqual([]);
  });

  it('adds entries newest-first and persists them as JSON', () => {
    const storage = makeStorage();
    const store = new HistoryStore(storage);
    store.add('2+2', '4');
    const entries = store.add('sin(30)', '0.5');
    expect(entries.map((e) => e.expression)).toEqual(['sin(30)', '2+2']);
    expect(entries[0].result).toBe('0.5');
    expect(typeof entries[0].at).toBe('number');

    const reloaded = new HistoryStore(storage).load();
    expect(reloaded.map((e) => e.expression)).toEqual(['sin(30)', '2+2']);
  });

  it('caps the list at the configured limit', () => {
    const store = new HistoryStore(makeStorage(), 'k', 3);
    store.add('1', '1');
    store.add('2', '2');
    store.add('3', '3');
    const entries = store.add('4', '4');
    expect(entries.map((e) => e.expression)).toEqual(['4', '3', '2']);
  });

  it('clears every entry and removes the storage key', () => {
    const storage = makeStorage();
    const store = new HistoryStore(storage);
    store.add('2+2', '4');
    expect(store.clear()).toEqual([]);
    expect(store.load()).toEqual([]);
    expect(storage.data.size).toBe(0);
  });

  it('returns [] for corrupt JSON instead of throwing', () => {
    const storage = makeStorage();
    storage.setItem('k', 'not-json{{{');
    expect(new HistoryStore(storage, 'k').load()).toEqual([]);
  });

  it('skips malformed entries when loading', () => {
    const storage = makeStorage();
    storage.setItem(
      'k',
      JSON.stringify([{ expression: '1+1', result: '2', at: 1 }, { nope: true }, 'junk'])
    );
    const entries = new HistoryStore(storage, 'k').load();
    expect(entries).toHaveLength(1);
    expect(entries[0].expression).toBe('1+1');
  });

  it('works without any storage backend', () => {
    const store = new HistoryStore(null);
    expect(store.load()).toEqual([]);
    expect(store.add('2+2', '4')).toHaveLength(1);
    expect(store.clear()).toEqual([]);
  });

  it('never throws when the storage backend fails', () => {
    const failing: HistoryStorage = {
      getItem: () => {
        throw new Error('denied');
      },
      setItem: () => {
        throw new Error('denied');
      },
      removeItem: () => {
        throw new Error('denied');
      },
    };
    const store = new HistoryStore(failing);
    expect(store.load()).toEqual([]);
    expect(store.add('2+2', '4')).toHaveLength(1);
    expect(store.clear()).toEqual([]);
  });

  it('uses a fake clock value for entry timestamps', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_700_000_000_000);
    try {
      const entries = new HistoryStore(makeStorage()).add('2+2', '4');
      expect(entries[0].at).toBe(1_700_000_000_000);
    } finally {
      vi.useRealTimers();
    }
  });
});
