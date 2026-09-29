export const prerender = false;
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
 * NOTE — server runtime: this route runs on demand in the Cloudflare Pages
 * worker (`output: 'static'` + Cloudflare adapter; `export const prerender =
 * false` above is what keeps it server-rendered). All content pages are
 * statically prerendered; only /api/* runs in the worker. Secrets are
 * read from the runtime bindings first (`locals.runtime.env`), so a
 * DEEPSEEK_API_KEY configured on the deployed project is picked up
 * without a rebuild.
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
function readApiKey(locals: unknown): string | null {
  return readServerEnv(locals, 'DEEPSEEK_API_KEY') ?? null;
}

function readModel(locals: unknown): string {
  return readServerEnv(locals, 'DEEPSEEK_MODEL') ?? DEEPSEEK_DEFAULT_MODEL;
}

/**
 * Read a secret from the Cloudflare Pages runtime bindings first
 * (`context.locals.runtime.env`), so a key configured on the deployed
 * project is picked up without a rebuild. Falls back to the standard
 * Node / Astro build-time sources. Never logs the value.
 */
function readServerEnv(locals: unknown, name: string): string | undefined {
  try {
    const runtime = (locals as { runtime?: { env?: Record<string, unknown> } } | undefined)
      ?.runtime;
    const bound = runtime?.env?.[name];
    if (typeof bound === 'string' && bound.trim().length > 0) return bound.trim();
  } catch {
    /* runtime bindings unavailable — use fallbacks below */
  }
  const fromProcess = typeof process !== 'undefined' ? process.env[name] : undefined;
  const fromAstro = import.meta.env[name] as string | undefined;
  const value = fromProcess ?? fromAstro;
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
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
      // Defense in depth for a JSON API: never sniff, never leak referrer,
      // never embeddable.
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'no-referrer',
      'x-frame-options': 'DENY',
      ...extraHeaders,
    },
  });
}

export const POST: APIRoute = async ({ request, locals }) => {
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

  const apiKey = readApiKey(locals);
  const provider: AiProvider = apiKey
    ? new DeepSeekProvider({ apiKey, model: readModel(locals) })
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
