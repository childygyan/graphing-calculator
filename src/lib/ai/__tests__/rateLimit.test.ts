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
  });
});
