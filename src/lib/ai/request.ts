/**
 * Phase 6 validation for the POST /api/ai/math request body.
 *
 * Pure and server/client-agnostic so it is unit-testable without Astro.
 * Tight bounds keep prompts small and block abuse (oversized payloads,
 * non-JSON shapes, wrong types).
 */

import type { AiContextSnapshot } from './context.js';
import { AI_CONTEXT_LIMITS } from './context.js';

export interface AiChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiMathRequestBody {
  message: string;
  context: AiContextSnapshot;
  history?: AiChatHistoryItem[];
}

export const AI_REQUEST_LIMITS = {
  maxMessageLength: 2000,
  maxHistoryItems: 10,
  maxHistoryContentLength: 800,
} as const;

export type RequestValidationResult =
  { ok: true; body: AiMathRequestBody } | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function fail(error: string): RequestValidationResult {
  return { ok: false, error };
}

function validateViewport(value: unknown): value is AiContextSnapshot['viewport'] {
  if (!isRecord(value)) return false;
  return (
    isFiniteNumber(value.xMin) &&
    isFiniteNumber(value.xMax) &&
    isFiniteNumber(value.yMin) &&
    isFiniteNumber(value.yMax)
  );
}

function validateContext(value: unknown): value is AiContextSnapshot {
  if (!isRecord(value)) return false;
  if (!validateViewport(value.viewport)) return false;
  if (
    !Array.isArray(value.expressions) ||
    value.expressions.length > AI_CONTEXT_LIMITS.maxExpressions
  ) {
    return false;
  }
  if (
    !value.expressions.every(
      (e) => typeof e === 'string' && e.length <= AI_CONTEXT_LIMITS.maxExpressionLength
    )
  ) {
    return false;
  }
  if (!Array.isArray(value.variables) || value.variables.length > AI_CONTEXT_LIMITS.maxVariables) {
    return false;
  }
  if (
    !value.variables.every(
      (v) => typeof v === 'string' && v.length <= AI_CONTEXT_LIMITS.maxVariableLength
    )
  ) {
    return false;
  }
  return true;
}

function validateHistory(value: unknown): value is AiChatHistoryItem[] | undefined {
  if (value === undefined) return true;
  if (!Array.isArray(value) || value.length > AI_REQUEST_LIMITS.maxHistoryItems) return false;
  return value.every(
    (item) =>
      isRecord(item) &&
      (item.role === 'user' || item.role === 'assistant') &&
      typeof item.content === 'string' &&
      item.content.length <= AI_REQUEST_LIMITS.maxHistoryContentLength
  );
}

/** Validate the decoded JSON body of POST /api/ai/math. */
export function validateAiRequestBody(value: unknown): RequestValidationResult {
  if (!isRecord(value)) return fail('Request body must be a JSON object.');
  const { message, context, history } = value;
  if (
    typeof message !== 'string' ||
    message.trim().length === 0 ||
    message.length > AI_REQUEST_LIMITS.maxMessageLength
  ) {
    return fail('message must be a non-empty string (max 2000 chars).');
  }
  if (!validateContext(context)) {
    return fail('context is malformed or exceeds size limits.');
  }
  if (!validateHistory(history)) {
    return fail('history is malformed or exceeds size limits.');
  }
  const body: AiMathRequestBody = {
    message: message.trim(),
    context: {
      expressions: [...context.expressions],
      viewport: { ...context.viewport },
      variables: [...context.variables],
    },
  };
  if (history !== undefined) {
    body.history = history.map((h) => ({ role: h.role, content: h.content }));
  }
  return { ok: true, body };
}
