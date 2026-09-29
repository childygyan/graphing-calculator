/**
 * Phase 6 AI command schema — the ONLY shape AI output may take before it
 * is allowed to touch the calculator.
 *
 * The model is instructed to emit a single JSON object. `validateAiCommand`
 * enforces a strict discriminated union: the `type` discriminator must be a
 * known command, every required field must have the right type, numeric
 * ranges are bounded, and expression sources must actually parse with the
 * real math engine. Anything else is REJECTED — unvalidated AI output is
 * never applied to calculator state.
 *
 * Extra unknown keys are ignored (models add fluff); missing or
 * mistyped required fields fail validation. This file is hand-rolled
 * (no zod dependency) and is pure: safe to import on client and server.
 */

import { validateExpressionSource } from '../math/engine.js';
import { normalizeVariableName, validateVariableName } from '../math/variables.js';

/** Plot a Cartesian expression `y = <expression>`. */
export interface PlotExpressionCommand {
  type: 'plot_expression';
  /** Right-hand side source, e.g. "x^2". Must parse with the math engine. */
  expression: string;
}

/** Add (or update) a named slider variable. */
export interface AddVariableCommand {
  type: 'add_variable';
  /** Lowercase identifier; validated like any variable name. */
  name: string;
  value: number;
}

/** Replace the graph viewport. */
export interface SetViewportCommand {
  type: 'set_viewport';
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/** Conceptual explanation of a math topic. Never engine-computed. */
export interface ExplainCommand {
  type: 'explain';
  topic: string;
  /** The explanation prose itself. Always rendered with a conceptual label. */
  explanation: string;
}

/** Conceptual step-by-step walkthrough. Never engine-computed. */
export interface StepByStepCommand {
  type: 'step_by_step';
  problem: string;
  /** Ordered walkthrough steps. */
  steps: string[];
}

/** Clear the AI chat history (client-side; never touches the graph). */
export interface ClearCommand {
  type: 'clear';
}

/** Show the assistant's capabilities. */
export interface HelpCommand {
  type: 'help';
}

/** The model could not map the request to a command. */
export interface UnknownCommand {
  type: 'unknown';
  message: string;
}

export type AiCommand =
  | PlotExpressionCommand
  | AddVariableCommand
  | SetViewportCommand
  | ExplainCommand
  | StepByStepCommand
  | ClearCommand
  | HelpCommand
  | UnknownCommand;

export const AI_COMMAND_TYPES = [
  'plot_expression',
  'add_variable',
  'set_viewport',
  'explain',
  'step_by_step',
  'clear',
  'help',
  'unknown',
] as const;

export type AiCommandType = (typeof AI_COMMAND_TYPES)[number];

/** Bounds that keep AI-supplied numbers sane. */
export const AI_LIMITS = {
  maxExpressionLength: 200,
  maxTextLength: 500,
  maxExplanationLength: 4000,
  maxSteps: 20,
  maxStepLength: 1000,
  maxAbsCoordinate: 1e9,
  minViewportSpan: 1e-6,
  maxViewportSpan: 1e9,
  maxAbsVariableValue: 1e6,
} as const;

export type CommandValidationResult =
  { ok: true; command: AiCommand } | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function fail(error: string): CommandValidationResult {
  return { ok: false, error };
}

/**
 * Validate a plot_expression command. The expression source must parse
 * with the real math engine — this is the injection gate: anything that
 * is not a genuine math expression (SQL-ish junk, code, prose) fails to
 * parse and is rejected here.
 */
function validatePlotExpression(record: Record<string, unknown>): CommandValidationResult {
  const expression = record.expression;
  if (!isNonEmptyString(expression, AI_LIMITS.maxExpressionLength)) {
    return fail('plot_expression.expression must be a non-empty string (max 200 chars).');
  }
  const validation = validateExpressionSource(expression);
  if (!validation.valid) {
    const detail = validation.issues[0]?.message ?? 'invalid expression';
    return fail(`plot_expression.expression does not parse: ${detail}`);
  }
  return { ok: true, command: { type: 'plot_expression', expression: expression.trim() } };
}

function validateAddVariable(record: Record<string, unknown>): CommandValidationResult {
  const name = record.name;
  if (!isNonEmptyString(name, 32)) {
    return fail('add_variable.name must be a non-empty string.');
  }
  const nameError = validateVariableName(name);
  if (nameError !== null) {
    return fail(`add_variable.name is invalid: ${nameError}`);
  }
  const value = record.value;
  if (!isFiniteNumber(value) || Math.abs(value) > AI_LIMITS.maxAbsVariableValue) {
    return fail('add_variable.value must be a finite number within ±1e6.');
  }
  return {
    ok: true,
    command: { type: 'add_variable', name: normalizeVariableName(name), value },
  };
}

function validateSetViewport(record: Record<string, unknown>): CommandValidationResult {
  const coords = ['xMin', 'xMax', 'yMin', 'yMax'] as const;
  const out: Record<string, number> = {};
  for (const key of coords) {
    const value = record[key];
    if (!isFiniteNumber(value) || Math.abs(value) > AI_LIMITS.maxAbsCoordinate) {
      return fail(`set_viewport.${key} must be a finite number within ±1e9.`);
    }
    out[key] = value;
  }
  if (!(out.xMin < out.xMax) || !(out.yMin < out.yMax)) {
    return fail('set_viewport requires xMin < xMax and yMin < yMax.');
  }
  const xSpan = out.xMax - out.xMin;
  const ySpan = out.yMax - out.yMin;
  if (
    xSpan < AI_LIMITS.minViewportSpan ||
    ySpan < AI_LIMITS.minViewportSpan ||
    xSpan > AI_LIMITS.maxViewportSpan ||
    ySpan > AI_LIMITS.maxViewportSpan
  ) {
    return fail('set_viewport spans must be within [1e-6, 1e9].');
  }
  return {
    ok: true,
    command: {
      type: 'set_viewport',
      xMin: out.xMin,
      xMax: out.xMax,
      yMin: out.yMin,
      yMax: out.yMax,
    },
  };
}

function validateExplain(record: Record<string, unknown>): CommandValidationResult {
  const topic = record.topic;
  if (!isNonEmptyString(topic, AI_LIMITS.maxTextLength)) {
    return fail('explain.topic must be a non-empty string (max 500 chars).');
  }
  const explanation = record.explanation;
  if (!isNonEmptyString(explanation, AI_LIMITS.maxExplanationLength)) {
    return fail('explain.explanation must be a non-empty string (max 4000 chars).');
  }
  return {
    ok: true,
    command: { type: 'explain', topic: topic.trim(), explanation: explanation.trim() },
  };
}

function validateStepByStep(record: Record<string, unknown>): CommandValidationResult {
  const problem = record.problem;
  if (!isNonEmptyString(problem, AI_LIMITS.maxTextLength)) {
    return fail('step_by_step.problem must be a non-empty string (max 500 chars).');
  }
  const steps = record.steps;
  if (
    !Array.isArray(steps) ||
    steps.length === 0 ||
    steps.length > AI_LIMITS.maxSteps ||
    !steps.every((s) => isNonEmptyString(s, AI_LIMITS.maxStepLength))
  ) {
    return fail(
      `step_by_step.steps must be an array of 1-${AI_LIMITS.maxSteps} non-empty strings (max 1000 chars each).`
    );
  }
  return {
    ok: true,
    command: {
      type: 'step_by_step',
      problem: problem.trim(),
      steps: steps.map((s) => (s as string).trim()),
    },
  };
}

function validateUnknown(record: Record<string, unknown>): CommandValidationResult {
  const message = record.message;
  if (!isNonEmptyString(message, AI_LIMITS.maxTextLength)) {
    return fail('unknown.message must be a non-empty string (max 500 chars).');
  }
  return { ok: true, command: { type: 'unknown', message: message.trim() } };
}

/**
 * Strictly validate a decoded-JSON value as an AiCommand.
 * Returns the command on success; anything else is rejected with a
 * human-readable reason (used in server 502s and test assertions).
 */
export function validateAiCommand(value: unknown): CommandValidationResult {
  if (!isRecord(value)) {
    return fail('AI output must be a JSON object.');
  }
  const type = value.type;
  if (typeof type !== 'string' || !(AI_COMMAND_TYPES as readonly string[]).includes(type)) {
    return fail(
      `Unknown command type: ${typeof type === 'string' ? JSON.stringify(type.slice(0, 40)) : typeof type}.`
    );
  }
  switch (type as AiCommandType) {
    case 'plot_expression':
      return validatePlotExpression(value);
    case 'add_variable':
      return validateAddVariable(value);
    case 'set_viewport':
      return validateSetViewport(value);
    case 'explain':
      return validateExplain(value);
    case 'step_by_step':
      return validateStepByStep(value);
    case 'clear':
      return { ok: true, command: { type: 'clear' } };
    case 'help':
      return { ok: true, command: { type: 'help' } };
    case 'unknown':
      return validateUnknown(value);
  }
}

/**
 * Parse raw model text as JSON, then schema-validate. A single entry
 * point so the server route cannot forget either step.
 */
export function parseAndValidateAiOutput(rawText: string): CommandValidationResult {
  const trimmed = rawText.trim();
  // Tolerate models that wrap the JSON in markdown fences.
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  const jsonText = fenced ? fenced[1] : trimmed;
  let decoded: unknown;
  try {
    decoded = JSON.parse(jsonText);
  } catch {
    return fail('AI output was not valid JSON.');
  }
  return validateAiCommand(decoded);
}
