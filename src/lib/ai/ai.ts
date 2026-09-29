/**
 * Phase 6 AI integration facade (client-safe).
 *
 * The AI assistant is implemented across `src/lib/ai/`:
 * - commands.ts — strict command schema + validation (the trust boundary)
 * - providers.ts — AIProvider interface + deterministic mock provider
 * - deepseek.ts — DeepSeek provider (SERVER ONLY, never import client-side)
 * - intent.ts — local-first intent detector (no network)
 * - processor.ts — MathCommandProcessor (validated command → store actions)
 * - client.ts — POST /api/ai/math fetch wrapper
 * - rateLimit.ts / request.ts / context.ts / prompt.ts / sanitize.ts
 *
 * This module re-exports the client-safe surface and the feature-flag
 * check. It must never import deepseek.ts.
 */

import { siteConfig } from '../../data/site.js';

export type { AiCommand, AiCommandType } from './commands.js';
export { validateAiCommand } from './commands.js';
export { detectLocalIntent } from './intent.js';
export type { LocalIntent } from './intent.js';
export { processAiCommand } from './processor.js';
export type { ProcessorDeps, ProcessorOutcome } from './processor.js';
export { summarizeCalculatorState } from './context.js';
export type { AiContextSnapshot } from './context.js';
export { requestAiCommand } from './client.js';
export type { AiChatResult } from './client.js';

/** Backwards-compatible chat message shape used by the UI. */
export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function isAiEnabled(): boolean {
  return siteConfig.featureFlags.aiAssistant;
}
