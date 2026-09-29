/**
 * AI integration boundary (future work — NOT Phase 1).
 *
 * This file only names the shapes a later AI assistant integration will use.
 * The `aiAssistant` feature flag in site config is off, `isAiEnabled()`
 * returns false, and `requestAiExplanation()` rejects with an honest
 * AiNotAvailableError. No network calls, no AI SDKs, no mock responses
 * pretending to be AI output.
 */

import { siteConfig } from '../../data/site.js';

export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiExplainRequest {
  expressionSource: string;
}

export interface AiExplainResponse {
  explanation: string;
}

export class AiNotAvailableError extends Error {
  constructor() {
    super('AI features are not available in Phase 1.');
    this.name = 'AiNotAvailableError';
  }
}

export function isAiEnabled(): boolean {
  return siteConfig.featureFlags.aiAssistant;
}

export function requestAiExplanation(_request: AiExplainRequest): Promise<AiExplainResponse> {
  return Promise.reject(new AiNotAvailableError());
}
