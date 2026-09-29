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
    private readonly now: () => number = () => Date.now()
  ) {
    if (!Number.isInteger(maxRequests) || maxRequests < 1) {
      throw new Error('maxRequests must be a positive integer.');
    }
    if (!Number.isFinite(windowMs) || windowMs <= 0) {
      throw new Error('windowMs must be a positive number.');
    }
  }

  check(key: string): RateLimitDecision {
    const now = this.now();
    const windowStart = now - this.windowMs;
    const existing = this.hits.get(key) ?? [];
    const recent = existing.filter((t) => t > windowStart);
    if (recent.length >= this.maxRequests) {
      const oldest = recent[0];
      return { allowed: false, retryAfterMs: Math.max(0, oldest + this.windowMs - now) };
    }
    recent.push(now);
    this.hits.set(key, recent);
    return { allowed: true, retryAfterMs: 0 };
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
