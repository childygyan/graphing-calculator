import { describe, expect, it } from 'vitest';
import { validateAiRequestBody } from '../request.js';

const VALID_CONTEXT = {
  expressions: ['y = x^2'],
  viewport: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
  variables: ['a = 2'],
};

describe('validateAiRequestBody', () => {
  it('accepts a well-formed body', () => {
    const result = validateAiRequestBody({
      message: 'plot x^2',
      context: VALID_CONTEXT,
      history: [{ role: 'user', content: 'hi' }],
    });
    expect(result.ok).toBe(true);
  });

  it('accepts a body without history', () => {
    expect(validateAiRequestBody({ message: 'help', context: VALID_CONTEXT }).ok).toBe(true);
  });

  it('rejects empty, missing, or oversized messages', () => {
    expect(validateAiRequestBody({ message: '', context: VALID_CONTEXT }).ok).toBe(false);
    expect(validateAiRequestBody({ message: '   ', context: VALID_CONTEXT }).ok).toBe(false);
    expect(validateAiRequestBody({ context: VALID_CONTEXT }).ok).toBe(false);
    expect(validateAiRequestBody({ message: 'x'.repeat(2001), context: VALID_CONTEXT }).ok).toBe(
      false
    );
    expect(validateAiRequestBody({ message: 42, context: VALID_CONTEXT }).ok).toBe(false);
  });

  it('rejects malformed or oversized contexts', () => {
    expect(validateAiRequestBody({ message: 'hi', context: null }).ok).toBe(false);
    expect(
      validateAiRequestBody({
        message: 'hi',
        context: { ...VALID_CONTEXT, viewport: { xMin: 0, xMax: 1 } },
      }).ok
    ).toBe(false);
    expect(
      validateAiRequestBody({
        message: 'hi',
        context: { ...VALID_CONTEXT, expressions: Array(9).fill('y=x') },
      }).ok
    ).toBe(false);
    expect(
      validateAiRequestBody({
        message: 'hi',
        context: { ...VALID_CONTEXT, variables: ['x'.repeat(49)] },
      }).ok
    ).toBe(false);
  });

  it('rejects malformed history', () => {
    expect(
      validateAiRequestBody({
        message: 'hi',
        context: VALID_CONTEXT,
        history: [{ role: 'user' }],
      }).ok
    ).toBe(false);
    expect(
      validateAiRequestBody({
        message: 'hi',
        context: VALID_CONTEXT,
        history: Array(11).fill({ role: 'user', content: 'x' }),
      }).ok
    ).toBe(false);
    expect(
      validateAiRequestBody({
        message: 'hi',
        context: VALID_CONTEXT,
        history: [{ role: 'system', content: 'x' }],
      }).ok
    ).toBe(false);
  });

  it('rejects non-object bodies', () => {
    for (const bad of [null, 'str', 42, []]) {
      expect(validateAiRequestBody(bad).ok).toBe(false);
    }
  });
});
