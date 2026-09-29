/**
 * Phase 6 server-side rate limiter for POST /api/ai/math.
 *
 * Sliding-window counter per key (client IP): at most `maxRequests`
 * requests in any `windowMs` window. In-memory; a serverless cold start
 * resets it, which only errs toward allowing more — acceptable for a
 * best-effort abuse guard. Pure and time-injectable for tests.
 */

export interface RateLimitDecision {
  allowed: boolean;
  /** Milliseconds the client should wait before retrying (0 when allowed). */
  retryAfterMs: number;
}

export class SlidingWindowRateLimiter {
  private readonly hits = new Map<string, number[]>();

  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number,
    private readonly now: () => number = () => Date.now(),
    /**
     * Phase 9 hardening: bound the tracked-key map. Past this many keys,
     * expired keys are swept. Without a bound, an attacker spraying random
     * X-Forwarded-For values could grow memory without limit.
     */
    private readonly maxTrackedKeys: number = 10_000
  ) {
    if (!Number.isInteger(maxRequests) || maxRequests < 1) {
      throw new Error('maxRequests must be a positive integer.');
    }
    if (!Number.isFinite(windowMs) || windowMs <= 0) {
      throw new Error('windowMs must be a positive number.');
    }
    if (!Number.isInteger(maxTrackedKeys) || maxTrackedKeys < 1) {
      throw new Error('maxTrackedKeys must be a positive integer.');
    }
  }

  check(key: string): RateLimitDecision {
    const now = this.now();
    const windowStart = now - this.windowMs;
    const existing = this.hits.get(key) ?? [];
    const recent = existing.filter((t) => t > windowStart);
    let decision: RateLimitDecision;
    if (recent.length >= this.maxRequests) {
      const oldest = recent[0];
      decision = { allowed: false, retryAfterMs: Math.max(0, oldest + this.windowMs - now) };
    } else {
      recent.push(now);
      this.hits.set(key, recent);
      decision = { allowed: true, retryAfterMs: 0 };
    }
    this.sweepExpired(now);
    return decision;
  }

  /**
   * Drop keys whose newest hit fell outside the window. Only runs when
   * the map exceeds maxTrackedKeys, so the steady-state cost is O(1).
   */
  private sweepExpired(now: number): void {
    if (this.hits.size <= this.maxTrackedKeys) return;
    const windowStart = now - this.windowMs;
    for (const [key, times] of this.hits) {
      const newest = times[times.length - 1];
      if (newest === undefined || newest <= windowStart) {
        this.hits.delete(key);
      }
    }
  }

  /** Test/introspection helper: number of keys currently tracked. */
  size(): number {
    return this.hits.size;
  }

  /** Test helper: forget all state. */
  clear(): void {
    this.hits.clear();
  }
}

/** Production limiter for the AI endpoint: 20 requests/minute per IP. */
export const AI_ENDPOINT_MAX_REQUESTS = 20;
export const AI_ENDPOINT_WINDOW_MS = 60_000;
