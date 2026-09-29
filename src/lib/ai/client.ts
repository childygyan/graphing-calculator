/**
 * Phase 6 client for POST /api/ai/math.
 *
 * Thin fetch wrapper used by the chat UI. Timeouts, honest error
 * mapping (429 → rate-limit message, network failure → service
 * unavailable), and no API key anywhere — the key lives server-side.
 */

import type { AiCommand } from './commands.js';
import { validateAiCommand } from './commands.js';
import type { AiContextSnapshot } from './context.js';
import type { AiChatHistoryItem } from './request.js';

export type AiChatProvider = 'deepseek' | 'mock';

export type AiChatResult =
  | { ok: true; command: AiCommand; provider: AiChatProvider; mock: boolean }
  | { ok: false; error: string; status: number };

export const AI_CLIENT_TIMEOUT_MS = 30_000;

interface ServerSuccessBody {
  ok: true;
  command: unknown;
  provider: AiChatProvider;
  mock: boolean;
}

interface ServerErrorBody {
  ok: false;
  error?: string;
}

/**
 * Send a chat message to the AI endpoint. The server schema-validates the
 * model output, but the client re-validates the command anyway —
 * defense in depth against a compromised or misbehaving endpoint.
 */
export async function requestAiCommand(
  message: string,
  context: AiContextSnapshot,
  history: AiChatHistoryItem[] = [],
  fetchImpl: typeof fetch = fetch
): Promise<AiChatResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_CLIENT_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetchImpl('/api/ai/math', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message, context, history }),
      signal: controller.signal,
    });
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error:
        error instanceof Error && error.name === 'AbortError'
          ? 'The AI service took too long to respond. Please try again.'
          : 'Could not reach the AI service. Check your connection and try again.',
    };
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    return {
      ok: false,
      status: 429,
      error: 'Too many AI requests — please wait a moment and try again.',
    };
  }

  let body: ServerSuccessBody | ServerErrorBody;
  try {
    body = (await response.json()) as ServerSuccessBody | ServerErrorBody;
  } catch {
    return {
      ok: false,
      status: response.status,
      error: 'The AI service returned an unreadable response.',
    };
  }

  if (!body.ok || !response.ok) {
    const serverError = (body as ServerErrorBody).error;
    return {
      ok: false,
      status: response.status,
      error:
        typeof serverError === 'string' && serverError.length > 0
          ? serverError
          : 'The AI service is unavailable right now. Please try again later.',
    };
  }

  const success = body as ServerSuccessBody;
  const validated = validateAiCommand(success.command);
  if (!validated.ok) {
    return {
      ok: false,
      status: 502,
      error: 'The AI returned an invalid command, so it was discarded.',
    };
  }
  return {
    ok: true,
    command: validated.command,
    provider: success.provider === 'deepseek' ? 'deepseek' : 'mock',
    mock: success.mock === true,
  };
}
