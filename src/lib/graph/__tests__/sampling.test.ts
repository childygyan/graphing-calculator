import { describe, expect, it } from 'vitest';
import { sampleCartesian } from '../sampling.js';
import type { GraphViewport } from '../../../types/calculator.js';
import type { CanvasSize } from '../types.js';

const VIEWPORT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const SIZE: CanvasSize = { width: 800, height: 600 };

describe('sampleCartesian', () => {
  it('samples a straight line into one segment at pixel resolution', () => {
    const { segments, sampleCount } = sampleCartesian((x) => x, -10, 10, VIEWPORT, SIZE);
    expect(segments).toHaveLength(1);
    expect(segments[0].length).toBe(800);
    // 800 base columns + one midpoint curvature probe per base interval.
    expect(sampleCount).toBe(800 + 799);
    expect(segments[0][0]).toMatchObject({ x: -10, y: -10 });
    expect(segments[0][799]).toMatchObject({ x: 10, y: 10 });
  });

  it('splits 1/x into two segments with no streak across x = 0', () => {
    const { segments } = sampleCartesian((x) => (x === 0 ? NaN : 1 / x), -10, 10, VIEWPORT, SIZE);
    expect(segments).toHaveLength(2);
    for (const segment of segments) {
      const signs = new Set(segment.map((p) => Math.sign(p.x)));
      expect(signs.size).toBe(1);
    }
  });

  it('splits tan(x) at every asymptote in view', () => {
    const { segments } = sampleCartesian((x) => Math.tan(x), -10, 10, VIEWPORT, SIZE);
    // Asymptotes at ±π/2, ±3π/2, ±5π/2 → 7 continuous runs.
    expect(segments.length).toBeGreaterThanOrEqual(6);
    const asymptotes = [
      -Math.PI / 2,
      Math.PI / 2,
      (-3 * Math.PI) / 2,
      (3 * Math.PI) / 2,
      (-5 * Math.PI) / 2,
      (5 * Math.PI) / 2,
    ];
    for (const segment of segments) {
      for (const a of asymptotes) {
        const below = segment.some((p) => p.x < a);
        const above = segment.some((p) => p.x > a);
        expect(below && above).toBe(false);
      }
    }
  });

  it('skips undefined regions: sqrt(x) has no points left of 0', () => {
    const { segments } = sampleCartesian(
      (x) => (x < 0 ? NaN : Math.sqrt(x)),
      -10,
      10,
      VIEWPORT,
      SIZE
    );
    expect(segments.length).toBeGreaterThanOrEqual(1);
    for (const segment of segments) {
      for (const p of segment) {
        expect(p.x).toBeGreaterThanOrEqual(-1e-9);
      }
    }
  });

  it('keeps steep-but-continuous curves whole: x^3 stays one segment', () => {
    const { segments } = sampleCartesian((x) => x * x * x, -10, 10, VIEWPORT, SIZE);
    expect(segments).toHaveLength(1);
  });

  it('refines adaptively: sin(40x) needs more samples than a line', () => {
    const line = sampleCartesian((x) => x, -10, 10, VIEWPORT, SIZE);
    const wiggly = sampleCartesian((x) => Math.sin(40 * x), -10, 10, VIEWPORT, SIZE);
    expect(wiggly.sampleCount).toBeGreaterThan(line.sampleCount);
    expect(wiggly.segments).toHaveLength(1);
  });

  it('respects the sample budget', () => {
    const { sampleCount } = sampleCartesian((x) => Math.sin(40 * x), -10, 10, VIEWPORT, SIZE, {
      maxSamples: 100,
    });
    expect(sampleCount).toBeLessThanOrEqual(100);
  });

  it('clamps emitted y to a sane range near asymptotes', () => {
    const viewport: GraphViewport = { xMin: -1, xMax: 1, yMin: -10, yMax: 10 };
    const { segments } = sampleCartesian((x) => (x === 0 ? NaN : 1 / x), -1, 1, viewport, SIZE);
    for (const segment of segments) {
      for (const p of segment) {
        expect(Math.abs(p.y)).toBeLessThanOrEqual(1e4 * 20 + 10);
      }
    }
  });

  it('returns empty for degenerate input', () => {
    expect(sampleCartesian((x) => x, 5, 5, VIEWPORT, SIZE).segments).toEqual([]);
    expect(sampleCartesian((x) => x, 10, -10, VIEWPORT, SIZE).segments).toEqual([]);
    expect(
      sampleCartesian((x) => x, -10, 10, VIEWPORT, { width: 0, height: 600 }).segments
    ).toEqual([]);
  });

  it('survives a throwing function as gaps', () => {
    const fn = (x: number): number => {
      if (x > 0) throw new Error('boom');
      return x;
    };
    const { segments } = sampleCartesian(fn, -10, 10, VIEWPORT, SIZE);
    expect(segments.length).toBeGreaterThanOrEqual(1);
    for (const segment of segments) {
      for (const p of segment) expect(p.x).toBeLessThanOrEqual(0);
    }
  });
});
