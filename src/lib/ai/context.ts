/**
 * Phase 6 calculator context for the AI endpoint.
 *
 * The client sends a small, privacy-safe snapshot: expression summaries
 * (definition strings the user already typed), the viewport, and variable
 * names/values. No PII, no cookies, no history beyond the chat itself.
 * Counts and lengths are capped so the prompt stays small.
 */

import type { CalculatorState, GraphViewport } from '../../types/calculator.js';
import { getExpressionSummary } from '../expressions/expressions.js';

export interface AiContextSnapshot {
  /** Human-readable expression summaries, e.g. "y = x^2". */
  expressions: string[];
  viewport: GraphViewport;
  /** "name = value" strings for slider variables. */
  variables: string[];
}

export const AI_CONTEXT_LIMITS = {
  maxExpressions: 8,
  maxExpressionLength: 120,
  maxVariables: 16,
  maxVariableLength: 48,
} as const;

/** Client-side: summarize live calculator state into a snapshot. */
export function summarizeCalculatorState(state: CalculatorState): AiContextSnapshot {
  const expressions = state.expressions.slice(0, AI_CONTEXT_LIMITS.maxExpressions).map((e) => {
    const summary = `${e.visible ? '' : '(hidden) '}${getExpressionSummary(e)}`;
    return summary.length > AI_CONTEXT_LIMITS.maxExpressionLength
      ? summary.slice(0, AI_CONTEXT_LIMITS.maxExpressionLength) + '…'
      : summary;
  });
  const variables = state.variables.slice(0, AI_CONTEXT_LIMITS.maxVariables).map((v) => {
    const text = `${v.name} = ${v.expression}`;
    return text.length > AI_CONTEXT_LIMITS.maxVariableLength
      ? text.slice(0, AI_CONTEXT_LIMITS.maxVariableLength) + '…'
      : text;
  });
  return { expressions, viewport: { ...state.viewport }, variables };
}

/** Server-side: render the snapshot as compact prompt text. */
export function buildContextSummary(snapshot: AiContextSnapshot): string {
  const lines: string[] = [];
  lines.push(
    snapshot.expressions.length > 0
      ? `Expressions on the graph: ${snapshot.expressions.map((e, i) => `[${i + 1}] ${e}`).join('; ')}`
      : 'Expressions on the graph: (none)'
  );
  const v = snapshot.viewport;
  lines.push(`Viewport: x in [${v.xMin}, ${v.xMax}], y in [${v.yMin}, ${v.yMax}]`);
  lines.push(
    snapshot.variables.length > 0
      ? `Slider variables: ${snapshot.variables.join(', ')}`
      : 'Slider variables: (none)'
  );
  return lines.join('\n');
}
