import { describe, expect, it, vi } from 'vitest';
import { requestAiCommand } from '../client.js';

const CONTEXT = {
  expressions: [],
  viewport: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
  variables: [],
};

function jsonFetch(status: number, body: unknown) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status }));
}

describe('requestAiCommand', () => {
  it('returns the validated command on success', async () => {
    const fetchImpl = jsonFetch(200, {
      ok: true,
      command: { type: 'help' },
      provider: 'mock',
      mock: true,
    });
    const result = await requestAiCommand('help', CONTEXT, [], fetchImpl);
    expect(result).toEqual({ ok: true, command: { type: 'help' }, provider: 'mock', mock: true });
  });

  it('re-validates the server command client-side and discards invalid ones', async () => {
    const fetchImpl = jsonFetch(200, {
      ok: true,
      command: { type: 'plot_expression', expression: 'x^^' },
      provider: 'deepseek',
      mock: false,
    });
    const result = await requestAiCommand('plot x^^', CONTEXT, [], fetchImpl);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.status).toBe(502);
  });

  it('maps 429 to a rate-limit message', async () => {
    const fetchImpl = jsonFetch(429, { ok: false, error: 'slow down' });
    const result = await requestAiCommand('hi', CONTEXT, [], fetchImpl);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(429);
      expect(result.error).toMatch(/too many/i);
    }
  });

  it('maps network failure to an honest unreachable message', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error('down');
    });
    const result = await requestAiCommand('hi', CONTEXT, [], fetchImpl);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(0);
      expect(result.error).toMatch(/could not reach/i);
    }
  });

  it('surfaces the server error message when present', async () => {
    const fetchImpl = jsonFetch(400, { ok: false, error: 'message must be a non-empty string' });
    const result = await requestAiCommand('', CONTEXT, [], fetchImpl);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toContain('non-empty string');
  });
});
