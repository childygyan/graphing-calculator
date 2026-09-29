/**
 * Phase 6 local-first intent detector (client-side, zero network).
 *
 * Common patterns are handled directly in the browser and never reach
 * POST /api/ai/math: plotting, chat clear, zoom in/out, view reset,
 * slider variables, help, and — engine-truthfully — evaluating an
 * expression at a point (computed locally by the real math engine, never
 * by the AI). Only ambiguous requests fall through to the API.
 *
 * Pure: takes the raw input + current viewport, returns a local intent or
 * null when the request should go to the server.
 */

import type { GraphViewport } from '../../types/calculator.js';
import type { AiCommand } from './commands.js';
import { DEFAULT_VIEWPORT } from '../expressions/expressions.js';
import { compileExpression } from '../math/engine.js';
import { validateVariableName, normalizeVariableName } from '../math/variables.js';

export interface LocalIntent {
  /** Command to run through the MathCommandProcessor, or null for a pure reply. */
  command: AiCommand | null;
  /** Text shown in the chat for this intent. */
  reply: string;
}

function zoomCommand(viewport: GraphViewport, factor: number): AiCommand {
  const cx = (viewport.xMin + viewport.xMax) / 2;
  const cy = (viewport.yMin + viewport.yMax) / 2;
  const hw = ((viewport.xMax - viewport.xMin) / 2) * factor;
  const hh = ((viewport.yMax - viewport.yMin) / 2) * factor;
  return { type: 'set_viewport', xMin: cx - hw, xMax: cx + hw, yMin: cy - hh, yMax: cy + hh };
}

/** Extract the math after plot/graph/draw, tolerating a leading "y =". */
function extractExpression(input: string): string | null {
  const match = input.match(/(?:plot|graph|draw)\s+(?:y\s*=\s*)?(.+?)\s*$/i);
  if (!match) return null;
  let expr = match[1].trim();
  const yEquals = expr.match(/^y\s*=\s*(.+)$/i);
  if (yEquals) expr = yEquals[1].trim();
  if (expr.length === 0 || expr.length > 200) return null;
  if (/[;{}]/.test(expr)) return null;
  return expr;
}

/** "evaluate <expr> at x = <n>" — answered by the math engine locally. */
function tryEvaluate(input: string): LocalIntent | null {
  const match = input.match(
    /^(?:evaluate|eval|what is)\s+(.+?)\s+at\s+x\s*=\s*(-?\d+(?:\.\d+)?)\s*$/i
  );
  if (!match) return null;
  const source = match[1].trim();
  const x = Number(match[2]);
  let value: number;
  try {
    value = compileExpression(source).fn(x);
  } catch {
    return {
      command: null,
      reply: `I couldn't parse "${source}". Check the expression and try again.`,
    };
  }
  if (!Number.isFinite(value)) {
    return {
      command: null,
      reply: `Evaluating ${source} at x = ${x}: the result is not a finite number (undefined there).`,
    };
  }
  const rounded = Math.abs(value) < 1e-12 ? 0 : value;
  return {
    command: null,
    // Computed by the local math engine — labeled as such, never AI-invented.
    reply: `Computed by the math engine: ${source} at x = ${x} is ${formatNumber(rounded)}.`,
  };
}

function formatNumber(value: number): string {
  if (Number.isInteger(value) && Math.abs(value) < 1e15) return String(value);
  const text = value.toPrecision(10);
  return String(Number(text));
}

/**
 * Detect a locally-handlable intent. Returns null when the input is
 * ambiguous or needs the AI — the caller then calls the server endpoint.
 */
export function detectLocalIntent(input: string, viewport: GraphViewport): LocalIntent | null {
  const text = input.trim();
  if (text.length === 0) return null;
  const lower = text.toLowerCase();

  if (/^\s*help\s*$/.test(lower) || lower === 'what can you do') {
    return { command: { type: 'help' }, reply: '' };
  }
  if (/^\s*clear(\s+(chat|conversation))?\s*$/.test(lower)) {
    return { command: { type: 'clear' }, reply: '' };
  }
  if (/\bzoom\s+out\b/.test(lower)) {
    return {
      command: zoomCommand(viewport, 2),
      reply: 'Zoomed out.',
    };
  }
  if (/\bzoom\s+in\b/.test(lower)) {
    return {
      command: zoomCommand(viewport, 0.5),
      reply: 'Zoomed in.',
    };
  }
  if (/\breset\s+(view|viewport|zoom)\b/.test(lower)) {
    return {
      command: {
        type: 'set_viewport',
        xMin: DEFAULT_VIEWPORT.xMin,
        xMax: DEFAULT_VIEWPORT.xMax,
        yMin: DEFAULT_VIEWPORT.yMin,
        yMax: DEFAULT_VIEWPORT.yMax,
      },
      reply: 'View reset to the default region.',
    };
  }

  const evaluated = tryEvaluate(text);
  if (evaluated) return evaluated;

  const variableMatch = text.match(
    /^(?:add\s+slider|let|set)\s+([a-zA-Z][a-zA-Z0-9_]*)\s*=\s*(-?\d+(?:\.\d+)?)\s*$/
  );
  if (variableMatch) {
    const name = variableMatch[1];
    if (validateVariableName(name) !== null) {
      return {
        command: null,
        reply: `"${name}" is not a usable variable name (avoid x, t, theta and function names).`,
      };
    }
    const value = Number(variableMatch[2]);
    return {
      command: { type: 'add_variable', name: normalizeVariableName(name), value },
      reply: '',
    };
  }

  if (/\b(plot|graph|draw)\b/i.test(text)) {
    const expression = extractExpression(text);
    if (expression) {
      return { command: { type: 'plot_expression', expression }, reply: '' };
    }
    return {
      command: null,
      reply: 'I could not find a math expression to plot. Try "plot x^2".',
    };
  }

  return null;
}
