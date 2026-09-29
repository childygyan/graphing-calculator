/**
 * Phase 6: POST /api/ai/math — server-side AI math assistant endpoint.
 *
 * Security properties (read carefully before changing):
 * - The DeepSeek API key is read ONLY from the server environment
 *   (`DEEPSEEK_API_KEY`, optional `DEEPSEEK_MODEL` override). It is never
 *   sent to the client, never logged, and never appears in any response.
 * - The request body is strictly validated (see lib/ai/request.ts).
 * - Per-IP sliding-window rate limiting with honest 429 + Retry-After.
 * - The provider is called server-side; its raw text is parsed AND
 *   schema-validated (`parseAndValidateAiOutput`) before anything is
 *   returned. Invalid model output → 502, never applied.
 * - When no API key is configured, the deterministic mock provider
 *   answers and the response is labeled `mock: true` so the UI says so.
 *
 * NOTE — server runtime required: this route needs `output: 'server'` /
 * `'hybrid'` with an adapter (or equivalent serverless deployment) to
 * receive POST bodies. With the current static output it builds cleanly
 * but POSTs cannot reach it — neither `astro preview` nor static hosts
 * execute it, and `astro dev` in static mode does not forward POST
 * bodies/headers to it either (verified 2026-09-29). The chat UI is
 * built for this: local intents work fully offline and server failures
 * surface as honest errors. Phase 10 (deployment) owns the adapter
 * choice; this file needs no code changes for it.
 */

import type { APIRoute } from 'astro';
import { validateAiRequestBody } from '../../../lib/ai/request.js';
import {
  AI_ENDPOINT_MAX_REQUESTS,
  AI_ENDPOINT_WINDOW_MS,
  SlidingWindowRateLimiter,
} from '../../../lib/ai/rateLimit.js';
import { buildContextSummary } from '../../../lib/ai/context.js';
import { buildSystemPrompt, buildUserPrompt } from '../../../lib/ai/prompt.js';
import { MockAiProvider } from '../../../lib/ai/providers.js';
import type { AiProvider } from '../../../lib/ai/providers.js';
import {
  DEEPSEEK_DEFAULT_MODEL,
  DeepSeekError,
  DeepSeekProvider,
} from '../../../lib/ai/deepseek.js';
import { parseAndValidateAiOutput } from '../../../lib/ai/commands.js';

const limiter = new SlidingWindowRateLimiter(AI_ENDPOINT_MAX_REQUESTS, AI_ENDPOINT_WINDOW_MS);

/** Best-effort client IP for rate limiting (proxies/CDN aware). */
function getClientIp(request: Request): string {
  const headers = request.headers;
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return headers.get('cf-connecting-ip') ?? headers.get('x-real-ip') ?? 'unknown';
}

/**
 * Read the DeepSeek key from the server environment only.
 * Returns null when not configured (mock mode). Never logs the value.
 */
function readApiKey(): string | null {
  const fromProcess = typeof process !== 'undefined' ? process.env.DEEPSEEK_API_KEY : undefined;
  const fromAstro = import.meta.env.DEEPSEEK_API_KEY as string | undefined;
  const key = fromProcess ?? fromAstro;
  return key && key.trim().length > 0 ? key : null;
}

function readModel(): string {
  const fromProcess = typeof process !== 'undefined' ? process.env.DEEPSEEK_MODEL : undefined;
  const fromAstro = import.meta.env.DEEPSEEK_MODEL as string | undefined;
  const model = fromProcess ?? fromAstro;
  return model && model.trim().length > 0 ? model.trim() : DEEPSEEK_DEFAULT_MODEL;
}

function jsonResponse(
  body: unknown,
  status: number = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      ...extraHeaders,
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const ip = getClientIp(request);
  const limit = limiter.check(ip);
  if (!limit.allowed) {
    return jsonResponse(
      { ok: false, error: 'Too many AI requests. Please wait a moment and try again.' },
      429,
      { 'retry-after': String(Math.max(1, Math.ceil(limit.retryAfterMs / 1000))) }
    );
  }

  let decoded: unknown;
  try {
    decoded = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Request body must be valid JSON.' }, 400);
  }

  const validated = validateAiRequestBody(decoded);
  if (!validated.ok) {
    return jsonResponse({ ok: false, error: validated.error }, 400);
  }
  const { message, context, history } = validated.body;

  const apiKey = readApiKey();
  const provider: AiProvider = apiKey
    ? new DeepSeekProvider({ apiKey, model: readModel() })
    : new MockAiProvider();

  const userPrompt = buildUserPrompt(message, buildContextSummary(context), history);

  let rawText: string;
  try {
    const result = await provider.complete({
      systemPrompt: buildSystemPrompt(),
      userPrompt,
      context,
    });
    rawText = result.rawText;
  } catch (error) {
    // Generic message outward; the key and provider internals stay server-side.
    const status = error instanceof DeepSeekError && error.status > 0 ? 502 : 502;
    return jsonResponse(
      { ok: false, error: 'The AI service is unavailable right now. Please try again later.' },
      status
    );
  }

  const commandResult = parseAndValidateAiOutput(rawText);
  if (!commandResult.ok) {
    return jsonResponse(
      { ok: false, error: 'The AI returned an invalid response. Please try again.' },
      502
    );
  }

  return jsonResponse({
    ok: true,
    command: commandResult.command,
    provider: provider.name,
    mock: provider.name === 'mock',
  });
};
