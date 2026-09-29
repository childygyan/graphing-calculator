/**
 * Scientific calculator history: the last N evaluated expressions,
 * persisted to browser storage. Pure and UI-only — no math lives here.
 *
 * Storage is injected so the store stays testable without a DOM; the
 * React island passes a `localStorage`-backed adapter guarded for SSR
 * and private-browsing failures.
 */

export interface HistoryEntry {
  expression: string;
  result: string;
  /** Epoch milliseconds when the entry was evaluated. */
  at: number;
}

export interface HistoryStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const SCIENTIFIC_HISTORY_KEY = 'scientific-history-v1';
export const SCIENTIFIC_HISTORY_LIMIT = 50;

function isEntry(value: unknown): value is HistoryEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.expression === 'string' &&
    typeof entry.result === 'string' &&
    typeof entry.at === 'number'
  );
}

export class HistoryStore {
  private readonly storage: HistoryStorage | null;
  private readonly key: string;
  private readonly limit: number;

  constructor(
    storage: HistoryStorage | null,
    key: string = SCIENTIFIC_HISTORY_KEY,
    limit: number = SCIENTIFIC_HISTORY_LIMIT
  ) {
    this.storage = storage;
    this.key = key;
    this.limit = limit;
  }

  /** Newest-first list of stored entries; never throws. */
  load(): HistoryEntry[] {
    if (!this.storage) return [];
    try {
      const raw = this.storage.getItem(this.key);
      if (!raw) return [];
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(isEntry).slice(0, this.limit);
    } catch {
      return [];
    }
  }

  /**
   * Prepend an entry and trim to the limit. Returns the new newest-first
   * list. Never throws — a failing storage backend keeps the in-memory
   * list intact for the session.
   */
  add(expression: string, result: string): HistoryEntry[] {
    const entry: HistoryEntry = { expression, result, at: Date.now() };
    const next = [entry, ...this.load()].slice(0, this.limit);
    this.save(next);
    return next;
  }

  /** Remove every entry. Returns the now-empty list. */
  clear(): HistoryEntry[] {
    if (this.storage) {
      try {
        this.storage.removeItem(this.key);
      } catch {
        // Private browsing / quota errors: the session list is still cleared.
      }
    }
    return [];
  }

  private save(entries: HistoryEntry[]): void {
    if (!this.storage) return;
    try {
      this.storage.setItem(this.key, JSON.stringify(entries));
    } catch {
      // Storage failures must never break the calculator UI.
    }
  }
}
