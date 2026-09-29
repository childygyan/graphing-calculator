/**
 * Tests: canonical snapshots and dirty-state tracking.
 */
import { describe, expect, it } from 'vitest';
import { canonicalStringify, createDirtyTracker } from '../dirty.js';

describe('canonicalStringify', () => {
  it('is insensitive to object key order', () => {
    const a = canonicalStringify({ x: 1, y: { b: 2, a: 1 } });
    const b = canonicalStringify({ y: { a: 1, b: 2 }, x: 1 });
    expect(a).toBe(b);
  });

  it('distinguishes real changes', () => {
    expect(canonicalStringify({ x: 1 })).not.toBe(canonicalStringify({ x: 2 }));
    expect(canonicalStringify([1, 2])).not.toBe(canonicalStringify([2, 1]));
  });

  it('handles nested structures without throwing', () => {
    const value = { list: [{ id: 'a' }, { id: 'b' }], flag: true, missing: null };
    expect(() => canonicalStringify(value)).not.toThrow();
  });
});

describe('createDirtyTracker', () => {
  it('starts dirty until a baseline is set', () => {
    const tracker = createDirtyTracker();
    expect(tracker.isDirty({ a: 1 })).toBe(true);
  });

  it('is clean after reset and dirty after a change', () => {
    const tracker = createDirtyTracker();
    tracker.reset({ a: 1, b: [1, 2] });
    expect(tracker.isDirty({ a: 1, b: [1, 2] })).toBe(false);
    // Same content, different key order → still clean.
    expect(tracker.isDirty({ b: [1, 2], a: 1 })).toBe(false);
    expect(tracker.isDirty({ a: 1, b: [1, 3] })).toBe(true);
  });

  it('markSaved clears the dirty flag', () => {
    const tracker = createDirtyTracker();
    tracker.reset({ a: 1 });
    expect(tracker.isDirty({ a: 2 })).toBe(true);
    tracker.markSaved({ a: 2 });
    expect(tracker.isDirty({ a: 2 })).toBe(false);
  });
});
