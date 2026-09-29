import { describe, expect, it } from 'vitest';
import { SlidingWindowRateLimiter } from '../rateLimit.js';

describe('SlidingWindowRateLimiter', () => {
  it('allows up to the limit, then blocks with a retry hint', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(3, 60_000, () => now);
    expect(limiter.check('ip').allowed).toBe(true);
    expect(limiter.check('ip').allowed).toBe(true);
    expect(limiter.check('ip').allowed).toBe(true);
    const blocked = limiter.check('ip');
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });

  it('slides: old hits expire after the window', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(2, 1_000, () => now);
    expect(limiter.check('ip').allowed).toBe(true);
    expect(limiter.check('ip').allowed).toBe(true);
    expect(limiter.check('ip').allowed).toBe(false);
    now = 1_001;
    expect(limiter.check('ip').allowed).toBe(true);
  });

  it('tracks keys independently', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(1, 60_000, () => now);
    expect(limiter.check('a').allowed).toBe(true);
    expect(limiter.check('a').allowed).toBe(false);
    expect(limiter.check('b').allowed).toBe(true);
  });

  it('retryAfterMs shrinks as the window elapses', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(1, 10_000, () => now);
    limiter.check('ip');
    const first = limiter.check('ip').retryAfterMs;
    now = 9_000;
    const later = limiter.check('ip').retryAfterMs;
    expect(later).toBeLessThan(first);
  });

  it('rejects invalid configuration', () => {
    expect(() => new SlidingWindowRateLimiter(0, 1000)).toThrow();
    expect(() => new SlidingWindowRateLimiter(1, -5)).toThrow();
    expect(() => new SlidingWindowRateLimiter(1, 1000, () => 0, 0)).toThrow();
  });

  it('sweeps expired keys once the tracked-key bound is exceeded', () => {
    let now = 0;
    // maxRequests 100 (never blocks in this test), maxTrackedKeys 3.
    const limiter = new SlidingWindowRateLimiter(100, 1_000, () => now, 3);
    limiter.check('old-a');
    limiter.check('old-b');
    limiter.check('old-c');
    expect(limiter.size()).toBe(3);
    // Advance past the window, then add a fresh key: the sweep must drop
    // the three expired keys while keeping the fresh one.
    now = 5_000;
    limiter.check('fresh');
    expect(limiter.size()).toBe(1);
    expect(limiter.check('fresh').allowed).toBe(true);
  });

  it('does not sweep keys that are still inside the window', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(100, 60_000, () => now, 2);
    limiter.check('a');
    now = 1_000;
    limiter.check('b');
    now = 2_000;
    limiter.check('c'); // exceeds bound, but all keys are fresh
    expect(limiter.size()).toBe(3);
  });

  it('keeps rate-limit decisions correct after a sweep', () => {
    let now = 0;
    const limiter = new SlidingWindowRateLimiter(1, 1_000, () => now, 1);
    expect(limiter.check('ip').allowed).toBe(true);
    expect(limiter.check('ip').allowed).toBe(false);
    now = 2_000; // window elapsed for 'ip'
    limiter.check('other'); // triggers sweep of the expired 'ip' key
    expect(limiter.check('ip').allowed).toBe(true);
  });
});
