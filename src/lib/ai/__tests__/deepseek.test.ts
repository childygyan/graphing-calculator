import { describe, expect, it, vi } from 'vitest';
import { DeepSeekError, DeepSeekProvider } from '../deepseek.js';
import type { AiRequest } from '../providers.js';

const REQUEST: AiRequest = {
  systemPrompt: 'system',
  userPrompt: 'user',
  context: {
    expressions: [],
    viewport: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
    variables: [],
  },
};

function okFetch(content: string) {
  return vi.fn(
    async () =>
      new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      })
  );
}

describe('DeepSeekProvider', () => {
  it('sends an OpenAI-compatible request with the bearer key (stubbed fetch, zero network)', async () => {
    const fetchImpl = okFetch('{"type":"help"}');
    const provider = new DeepSeekProvider({ apiKey: 'test-key', fetchImpl });
    const result = await provider.complete(REQUEST);
    expect(result.provider).toBe('deepseek');
    expect(result.rawText).toBe('{"type":"help"}');

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.deepseek.com/chat/completions');
    expect((init.headers as Record<string, string>).authorization).toBe('Bearer test-key');
    const body = JSON.parse(init.body as string) as {
      model: string;
      messages: Array<{ role: string; content: string }>;
      response_format: { type: string };
    };
    expect(body.model).toBe('deepseek-chat');
    expect(body.messages).toEqual([
      { role: 'system', content: 'system' },
      { role: 'user', content: 'user' },
    ]);
    expect(body.response_format).toEqual({ type: 'json_object' });
  });

  it('honours a custom model override', async () => {
    const fetchImpl = okFetch('{"type":"help"}');
    const provider = new DeepSeekProvider({ apiKey: 'k', model: 'deepseek-reasoner', fetchImpl });
    await provider.complete(REQUEST);
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect((JSON.parse(init.body as string) as { model: string }).model).toBe('deepseek-reasoner');
  });

  it('maps HTTP errors to DeepSeekError without leaking the key', async () => {
    const fetchImpl = vi.fn(async () => new Response('unauthorized', { status: 401 }));
    const provider = new DeepSeekProvider({ apiKey: 'secret-key', fetchImpl });
    const error = await provider.complete(REQUEST).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DeepSeekError);
    expect((error as DeepSeekError).status).toBe(401);
    expect(String((error as Error).message)).not.toContain('secret-key');
  });

  it('rejects empty completions', async () => {
    const fetchImpl = okFetch('   ');
    const provider = new DeepSeekProvider({ apiKey: 'k', fetchImpl });
    await expect(provider.complete(REQUEST)).rejects.toBeInstanceOf(DeepSeekError);
  });

  it('requires a non-empty API key at construction', () => {
    expect(() => new DeepSeekProvider({ apiKey: '' })).toThrow();
  });
});
