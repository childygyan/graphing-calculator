/**
 * Phase 6 AI provider abstraction.
 *
 * `AiProvider.complete()` takes a fully-built prompt request and returns
 * the model's raw text. Providers NEVER see the API key here — the key is
 * held by the server route and passed to the DeepSeek provider's
 * constructor. The mock provider is deterministic (pure function of the
 * input) and is what tests and key-less deployments use.
 */

import type { AiContextSnapshot } from './context.js';
import { AI_COMMAND_TYPES } from './commands.js';
import type { AiCommand } from './commands.js';

export type AiProviderName = 'deepseek' | 'mock';

/** Everything a provider needs to answer: prompts + structured context. */
export interface AiRequest {
  systemPrompt: string;
  userPrompt: string;
  context: AiContextSnapshot;
}

export interface AiProviderResult {
  provider: AiProviderName;
  /** Raw model text — the caller still schema-validates it. */
  rawText: string;
}

export interface AiProvider {
  readonly name: AiProviderName;
  complete(request: AiRequest): Promise<AiProviderResult>;
}

function commandJson(command: AiCommand): string {
  return JSON.stringify(command);
}

/**
 * Deterministic mock provider for tests, dev, and key-less deployments.
 * Pure function of the lowercased message + structured context — the same
 * input always yields the same JSON, so tests are stable and honest about
 * being mock output.
 */
export class MockAiProvider implements AiProvider {
  readonly name: AiProviderName = 'mock';

  async complete(request: AiRequest): Promise<AiProviderResult> {
    return { provider: 'mock', rawText: mockCommandFor(request) };
  }
}

/** Extract the math after a "plot"/"graph" keyword, tolerating "y =". */
function extractPlotExpression(message: string): string | null {
  const match = message.match(/(?:plot|graph|draw)\s+(?:y\s*=\s*)?(.+?)\s*$/i);
  if (!match) return null;
  let expr = match[1].trim();
  const yEquals = expr.match(/^y\s*=\s*(.+)$/i);
  if (yEquals) expr = yEquals[1].trim();
  if (expr.length === 0 || expr.length > 200) return null;
  // Reject obvious non-math so the mock never fabricates a plot.
  if (/[;{}<>]/.test(expr)) return null;
  return expr;
}

function extractVariableAssignment(message: string): { name: string; value: number } | null {
  const match = message.match(
    /(?:add\s+slider|let|set)\s+([a-z][a-z0-9_]*)\s*=\s*(-?\d+(?:\.\d+)?)/i
  );
  if (!match) return null;
  const value = Number(match[2]);
  if (!Number.isFinite(value)) return null;
  return { name: match[1].toLowerCase(), value };
}

/** Zoom the viewport by a factor around its center. */
function zoomViewport(viewport: AiContextSnapshot['viewport'], factor: number): AiCommand {
  const cx = (viewport.xMin + viewport.xMax) / 2;
  const cy = (viewport.yMin + viewport.yMax) / 2;
  const hw = ((viewport.xMax - viewport.xMin) / 2) * factor;
  const hh = ((viewport.yMax - viewport.yMin) / 2) * factor;
  return {
    type: 'set_viewport',
    xMin: cx - hw,
    xMax: cx + hw,
    yMin: cy - hh,
    yMax: cy + hh,
  };
}

export function mockCommandFor(request: AiRequest): string {
  // The user prompt wraps the message in <user_request> tags.
  const inner = request.userPrompt.match(/<user_request>([\s\S]*)<\/user_request>/);
  const message = (inner ? inner[1] : request.userPrompt).trim().toLowerCase();

  if (/\b(hi|hello|hey)\b/.test(message) && message.length < 20) {
    return commandJson({
      type: 'unknown',
      message:
        'Hello! I am a mock assistant (no AI key configured). Try "plot x^2", "zoom out", or "help".',
    });
  }
  if (message === 'help' || message.includes('what can you do')) {
    return commandJson({ type: 'help' });
  }
  if (/^\s*clear(\s+(chat|conversation))?\s*$/.test(message)) {
    return commandJson({ type: 'clear' });
  }
  if (message.includes('zoom out')) {
    return commandJson(zoomViewport(request.context.viewport, 2));
  }
  if (message.includes('zoom in')) {
    return commandJson(zoomViewport(request.context.viewport, 0.5));
  }
  if (message.includes('reset') && (message.includes('view') || message.includes('zoom'))) {
    return commandJson({
      type: 'set_viewport',
      xMin: -10,
      xMax: 10,
      yMin: -10,
      yMax: 10,
    });
  }
  const variable = extractVariableAssignment(message);
  if (variable) {
    return commandJson({ type: 'add_variable', name: variable.name, value: variable.value });
  }
  if (/\b(plot|graph|draw)\b/.test(message)) {
    const expression = extractPlotExpression(message);
    if (expression) {
      return commandJson({ type: 'plot_expression', expression });
    }
    return commandJson({
      type: 'unknown',
      message: 'I could not find a math expression to plot. Try "plot x^2".',
    });
  }
  if (message.includes('explain')) {
    const topic =
      message
        .replace(/.*explain\s*/i, '')
        .trim()
        .slice(0, 200) || 'this topic';
    return commandJson({
      type: 'explain',
      topic,
      explanation:
        `This is a mock explanation of "${topic}" (no AI key configured). ` +
        'Connect a DeepSeek API key for real explanations. Meanwhile, try plotting the ' +
        'function on the graph and exploring it with zoom and the analysis tools.',
    });
  }
  if (message.includes('step')) {
    const problem =
      message
        .replace(/.*step[-\s]?by[-\s]?step\s*/i, '')
        .trim()
        .slice(0, 200) || 'this problem';
    return commandJson({
      type: 'step_by_step',
      problem,
      steps: [
        'This is a mock walkthrough (no AI key configured).',
        'Connect a DeepSeek API key for real step-by-step guidance.',
        `Meanwhile, plot the function for "${problem}" and inspect it on the graph.`,
      ],
    });
  }
  return commandJson({
    type: 'unknown',
    message: `I am a mock assistant and did not understand that. Supported: ${AI_COMMAND_TYPES.join(', ')}.`,
  });
}
