import { describe, expect, it } from 'vitest';
import { validateGraphDocument } from '../validate.js';
import { createExpression } from '../../expressions/expressions.js';
import type { Expression } from '../../../types/calculator.js';

function documentWith(expressions: Expression[]) {
  return {
    app: 'graphing-calculator',
    version: 1,
    expressions,
    variables: [],
    viewport: { xMin: -10, xMax: 10, yMin: -10, yMax: 10 },
    settings: {
      showGrid: true,
      showAxes: true,
      showAxisLabels: true,
      degreeMode: false,
      squareAspectRatio: false,
    },
    selectedExpressionId: null,
    theme: 'system',
    analysis: {
      precision: { mode: 'decimals', digits: 2 },
      markers: [],
      integrals: [],
      tangents: [],
      derivativePlots: [],
      annotations: [],
    },
  };
}

function withDefinition(kind: 'folder' | 'image' | 'action', definition: unknown): Expression {
  const base = createExpression(kind);
  return { ...base, definition } as Expression;
}

describe('persistence validation for new kinds', () => {
  it('accepts valid folder, image, and action expressions', () => {
    const result = validateGraphDocument(
      documentWith([
        withDefinition('folder', { collapsed: true, children: [] }),
        withDefinition('image', {
          src: 'https://example.com/a.png',
          centerX: 0,
          centerY: 0,
          width: 4,
          height: 3,
          opacity: 0.75,
        }),
        withDefinition('action', {
          buttonLabel: 'Step',
          assignments: [{ variable: 'a', value: 'a + 1' }],
        }),
      ])
    );
    expect(result.ok).toBe(true);
  });

  it('rejects folders with a non-boolean collapsed flag', () => {
    const result = validateGraphDocument(
      documentWith([withDefinition('folder', { collapsed: 'yes', children: [] })])
    );
    expect(result.ok).toBe(false);
  });

  it('rejects images with bad geometry or opacity', () => {
    const bad = (definition: unknown) =>
      validateGraphDocument(documentWith([withDefinition('image', definition)]));
    expect(
      bad({
        src: 'https://example.com/a.png',
        centerX: 0,
        centerY: 0,
        width: -1,
        height: 2,
        opacity: 1,
      }).ok
    ).toBe(false);
    expect(
      bad({
        src: 'https://example.com/a.png',
        centerX: 0,
        centerY: 0,
        width: 2,
        height: 2,
        opacity: 1.5,
      }).ok
    ).toBe(false);
    expect(bad({ src: 42, centerX: 0, centerY: 0, width: 2, height: 2, opacity: 1 }).ok).toBe(
      false
    );
  });

  it('rejects actions with invalid assignments', () => {
    const bad = (definition: unknown) =>
      validateGraphDocument(documentWith([withDefinition('action', definition)]));
    expect(bad({ buttonLabel: 'x', assignments: [{ variable: '', value: '1' }] }).ok).toBe(false);
    expect(bad({ buttonLabel: 'x', assignments: 'nope' }).ok).toBe(false);
    expect(
      bad({
        buttonLabel: 'x',
        assignments: Array.from({ length: 21 }, (_, i) => ({ variable: `a${i}`, value: '1' })),
      }).ok
    ).toBe(false);
  });

  it('rejects unknown expression kinds', () => {
    const base = createExpression('cartesian');
    const result = validateGraphDocument(
      documentWith([{ ...base, kind: 'fancy' } as unknown as Expression])
    );
    expect(result.ok).toBe(false);
  });
});
