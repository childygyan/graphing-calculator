/**
 * Unit tests for the Phase 8 mathematical content engine.
 *
 * These verify that build-time page facts are genuinely computed: known
 * mathematical truths (roots of sin, vertex of a parabola, e^1 = e) must
 * come out of the engine, not out of hand-written strings.
 */
import { describe, expect, it } from 'vitest';
import { buildExampleShareUrl, computeFunctionFacts, findRootNear } from '../content-engine.js';
import { decodeSharePayload } from '../../persistence/share.js';
import type { ExampleGraphData } from '../../../data/seo/types.js';

function closeTo(actual: number | null, expected: number, digits = 3): void {
  expect(actual).not.toBeNull();
  expect(Math.abs((actual as number) - expected)).toBeLessThan(10 ** -digits);
}

describe('computeFunctionFacts', () => {
  it('computes sine facts: roots at multiples of pi, intercept 0', () => {
    const facts = computeFunctionFacts('sin(x)');
    expect(facts.ok).toBe(true);
    // Roots in [-10, 10]: -3π, -2π, -π, 0, π, 2π, 3π
    expect(facts.roots).toHaveLength(7);
    closeTo(facts.roots[3], 0, 6);
    closeTo(facts.roots[4], Math.PI, 3);
    closeTo(facts.roots[2], -Math.PI, 3);
    expect(facts.yIntercept).toBeCloseTo(0, 10);
    closeTo(facts.derivativeAtOne, Math.cos(1), 4);
    closeTo(facts.integralZeroToOne, 1 - Math.cos(1), 4);
  });

  it('computes quadratic facts: roots at ±2, minimum at (0, -4)', () => {
    const facts = computeFunctionFacts('x^2 - 4');
    expect(facts.ok).toBe(true);
    expect(facts.roots).toHaveLength(2);
    closeTo(facts.roots[0], -2, 6);
    closeTo(facts.roots[1], 2, 6);
    expect(facts.extrema).toHaveLength(1);
    expect(facts.extrema[0].kind).toBe('min');
    closeTo(facts.extrema[0].x, 0, 4);
    closeTo(facts.extrema[0].y, -4, 4);
    expect(facts.yIntercept).toBe(-4);
  });

  it('computes exponential facts: no roots, f(0)=1, f′(1)=e', () => {
    const facts = computeFunctionFacts('e^x');
    expect(facts.ok).toBe(true);
    expect(facts.roots).toHaveLength(0);
    expect(facts.yIntercept).toBe(1);
    closeTo(facts.derivativeAtOne, Math.E, 4);
    closeTo(facts.integralZeroToOne, Math.E - 1, 4);
  });

  it('reports undefined where the function is undefined (1/x at x=0)', () => {
    const facts = computeFunctionFacts('1/x');
    expect(facts.ok).toBe(true);
    expect(facts.yIntercept).toBeNull();
    expect(facts.formatted.yIntercept).toBe('undefined');
    const zeroSample = facts.samples.find((sample) => sample.x === 0);
    expect(zeroSample?.y).toBeNull();
  });

  it('marks invalid expressions as not ok instead of throwing', () => {
    const facts = computeFunctionFacts('sin(');
    expect(facts.ok).toBe(false);
  });

  it('formats numbers for templates', () => {
    const facts = computeFunctionFacts('x^2 - 4');
    expect(facts.formatted.roots).toEqual(['-2.0000', '2.0000']);
    expect(facts.formatted.yIntercept).toBe('-4.0000');
  });
});

describe('findRootNear', () => {
  it('finds the positive root of x^2 - 4 near [1, 3]', () => {
    closeTo(findRootNear('x^2 - 4', 1, 3), 2, 6);
  });

  it('returns null when the bracket holds no root', () => {
    expect(findRootNear('x^2 + 1', -10, 10)).toBeNull();
  });
});

describe('buildExampleShareUrl', () => {
  const example: ExampleGraphData = {
    slug: 'test-example',
    title: 'Test',
    description: 'Test example.',
    expressions: [{ kind: 'cartesian', rhs: 'sin(x)', label: 'sin(x)' }],
    story: [],
    insights: [],
    related: [],
  };

  it('produces a /graph/#s= link whose payload decodes to a valid document', async () => {
    const url = await buildExampleShareUrl(example);
    expect(url.startsWith('/graph/#s=')).toBe(true);
    const payload = url.slice('/graph/#s='.length);
    const decoded = await decodeSharePayload(payload);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) {
      expect(decoded.document.expressions).toHaveLength(1);
      expect(decoded.document.app).toBe('graphing-calculator');
    }
  });

  it('encodes parametric and polar examples without throwing', async () => {
    const parametric: ExampleGraphData = {
      ...example,
      expressions: [
        { kind: 'parametric', xOfT: 'sin(3*t)', yOfT: 'cos(2*t)', tMin: '0', tMax: '6.28' },
        { kind: 'polar', rOfTheta: '2*cos(3*theta)', tMin: '0', tMax: '6.28' },
      ],
    };
    const url = await buildExampleShareUrl(parametric);
    const payload = url.slice('/graph/#s='.length);
    const decoded = await decodeSharePayload(payload);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) {
      expect(decoded.document.expressions).toHaveLength(2);
    }
  });
});
