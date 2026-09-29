/**
 * Dirty-state tracking: "has the workspace changed since the last
 * save / load / restore?" Implemented by comparing a canonical (key-sorted)
 * JSON snapshot of the state against a baseline captured at the last clean
 * moment. Pure functions — the store owns the baseline.
 */

/** Canonical JSON: object keys sorted recursively, so key order from a
 * hydrated document can never produce a false "dirty" reading. */
export function canonicalStringify(value: unknown): string {
  const seen = new Set<object>();
  function stringify(node: unknown): string {
    if (node === null || node === undefined) return 'null';
    const type = typeof node;
    if (type === 'number') return Number.isFinite(node as number) ? String(node) : 'null';
    if (type === 'boolean') return (node as boolean) ? 'true' : 'false';
    if (type === 'string') return JSON.stringify(node);
    if (type !== 'object') return 'null';
    const obj = node as Record<string, unknown>;
    if (seen.has(obj)) return 'null';
    seen.add(obj);
    let result: string;
    if (Array.isArray(obj)) {
      result = `[${obj.map((item) => stringify(item)).join(',')}]`;
    } else {
      const keys = Object.keys(obj).sort();
      const parts: string[] = [];
      for (const key of keys) {
        const item = obj[key];
        if (item === undefined || typeof item === 'function') continue;
        parts.push(`${JSON.stringify(key)}:${stringify(item)}`);
      }
      result = `{${parts.join(',')}}`;
    }
    seen.delete(obj);
    return result;
  }
  return stringify(value);
}

export interface DirtyTracker {
  /** Capture the baseline for "clean" (after load, restore, or explicit save). */
  reset(state: unknown): void;
  /** Alias for reset — marks the current state as saved. */
  markSaved(state: unknown): void;
  /** True when the state differs from the baseline. */
  isDirty(state: unknown): boolean;
}

export function createDirtyTracker(): DirtyTracker {
  let baseline = '';
  return {
    reset(state: unknown): void {
      baseline = canonicalStringify(state);
    },
    markSaved(state: unknown): void {
      baseline = canonicalStringify(state);
    },
    isDirty(state: unknown): boolean {
      return canonicalStringify(state) !== baseline;
    },
  };
}
