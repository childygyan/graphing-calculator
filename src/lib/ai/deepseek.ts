/**
 * Phase 6 DeepSeek provider — SERVER ONLY.
 *
 * Never import this module from client-side code: the constructor takes
 * the raw API key, and the key must never enter the client bundle. The
 * server route (src/pages/api/ai/math.ts) is the only importer.
 *
 * DeepSeek API: POST https://api.deepseek.com/chat/completions with an
 * OpenAI-compatible JSON body and `Authorization: Bearer <key>`.
 */

import type { AiProvider, AiProviderName, AiProviderResult, AiRequest } from './providers.js';

export const DEEPSEEK_API_HOST = 'api.deepseek.com';
export const DEEPSEEK_DEFAULT_MODEL = 'deepseek-chat';
export const DEEPSEEK_TIMEOUT_MS = 25_000;

export class DeepSeekError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'DeepSeekError';
    this.status = status;
  }
}

export interface DeepSeekProviderOptions {
  apiKey: string;
  model?: string;
  baseUrl?: string;
  timeoutMs?: number;
  /** Injectable for tests — production uses global fetch. */
  fetchImpl?: typeof fetch;
}

interface ChatCompletionChoice {
  message?: { content?: string | null };
}

interface ChatCompletionResponse {
  choices?: ChatCompletionChoice[];
  error?: { message?: string };
}

export class DeepSeekProvider implements AiProvider {
  readonly name: AiProviderName = 'deepseek';
  private readonly apiKey: string;
  private readonly model: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(options: DeepSeekProviderOptions) {
    if (!options.apiKey || options.apiKey.trim().length === 0) {
      throw new Error('DeepSeekProvider requires a non-empty apiKey.');
    }
    this.apiKey = options.apiKey;
    this.model = options.model ?? DEEPSEEK_DEFAULT_MODEL;
    this.baseUrl = options.baseUrl ?? `https://${DEEPSEEK_API_HOST}`;
    this.timeoutMs = options.timeoutMs ?? DEEPSEEK_TIMEOUT_MS;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async complete(request: AiRequest): Promise<AiProviderResult> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    let response: Response;
    try {
      response = await this.fetchImpl(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: request.systemPrompt },
            { role: 'user', content: request.userPrompt },
          ],
          temperature: 0,
          response_format: { type: 'json_object' },
        }),
        signal: controller.signal,
      });
    } catch (error) {
      throw new DeepSeekError(
        0,
        error instanceof Error && error.name === 'AbortError'
          ? 'DeepSeek request timed out.'
          : 'Could not reach the DeepSeek API.'
      );
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) {
      // Never include the key or raw body in the error.
      throw new DeepSeekError(response.status, `DeepSeek API error (HTTP ${response.status}).`);
    }

    let payload: ChatCompletionResponse;
    try {
      payload = (await response.json()) as ChatCompletionResponse;
    } catch {
      throw new DeepSeekError(response.status, 'DeepSeek returned a non-JSON response.');
    }
    if (payload.error?.message) {
      throw new DeepSeekError(response.status, 'DeepSeek returned an API error.');
    }
    const content = payload.choices?.[0]?.message?.content;
    if (typeof content !== 'string' || content.trim().length === 0) {
      throw new DeepSeekError(response.status, 'DeepSeek returned an empty completion.');
    }
    return { provider: 'deepseek', rawText: content };
  }
}
