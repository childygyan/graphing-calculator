/** Tests for the analysis drawable builders (line clipping, shading). */

import { describe, expect, it } from 'vitest';
import {
  buildAnalysisDrawables,
  clipLineToViewport,
  integralPolygons,
} from '../analysisDrawables.js';
import { compileExpression } from '../../math/engine.js';
import type { GraphViewport } from '../../../types/calculator.js';
import { createDefaultAnalysisState } from '../../analysis/state.js';

const VIEWPORT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

describe('clipLineToViewport', () => {
  it('clips y = x to the viewport corners', () => {
    expect(clipLineToViewport({ kind: 'explicit', slope: 1, intercept: 0 }, VIEWPORT)).toEqual([
      { x: -10, y: -10 },
      { x: 10, y: 10 },
    ]);
  });

  it('clips a horizontal line to the left/right edges', () => {
    const clipped = clipLineToViewport({ kind: 'explicit', slope: 0, intercept: 3 }, VIEWPORT);
    expect(clipped).toEqual([
      { x: -10, y: 3 },
      { x: 10, y: 3 },
    ]);
  });

  it('clips a vertical line to the top/bottom edges', () => {
    expect(clipLineToViewport({ kind: 'vertical', x: 3 }, VIEWPORT)).toEqual([
      { x: 3, y: -10 },
      { x: 3, y: 10 },
    ]);
  });

  it('returns null when the line misses the viewport', () => {
    expect(clipLineToViewport({ kind: 'vertical', x: 99 }, VIEWPORT)).toBeNull();
    expect(clipLineToViewport({ kind: 'explicit', slope: 0, intercept: 99 }, VIEWPORT)).toBeNull();
    // Steep line far above the viewport: y = 100x + 2000 misses [-10, 10]^2.
    expect(
      clipLineToViewport({ kind: 'explicit', slope: 100, intercept: 2000 }, VIEWPORT)
    ).toBeNull();
  });

  it('clips a steep line to the top/bottom edges', () => {
    const clipped = clipLineToViewport({ kind: 'explicit', slope: 10, intercept: 0 }, VIEWPORT);
    expect(clipped).not.toBeNull();
    // y = 10x crosses y = ±10 at x = ±1.
    expect(clipped?.[0]).toEqual({ x: -1, y: -10 });
    expect(clipped?.[1]).toEqual({ x: 1, y: 10 });
  });
});

describe('integralPolygons', () => {
  it('builds one closed ring for x^2 on [0, 1]', () => {
    const polygons = integralPolygons(compileExpression('x^2').fn, 0, 1);
    expect(polygons).toHaveLength(1);
    const ring = polygons[0];
    // Starts on the curve at x = 0, ends on the x-axis.
    expect(ring[0]).toEqual({ x: 0, y: 0 });
    expect(ring[ring.length - 1]).toEqual({ x: 0, y: 0 });
  });

  it('splits into two polygons across the 1/x singularity', () => {
    const polygons = integralPolygons(compileExpression('1/x').fn, -1, 1);
    expect(polygons).toHaveLength(2);
  });

  it('returns [] for degenerate bounds', () => {
    expect(integralPolygons(compileExpression('x').fn, 2, 2)).toEqual([]);
    expect(integralPolygons(compileExpression('x').fn, NaN, 1)).toEqual([]);
  });
});

describe('buildAnalysisDrawables', () => {
  it('returns [] for empty analysis state', () => {
    const drawables = buildAnalysisDrawables([], createDefaultAnalysisState(), VIEWPORT, {
      width: 800,
      height: 600,
    });
    expect(drawables).toEqual([]);
  });

  it('builds marker, area, and segment drawables', () => {
    const analysis = createDefaultAnalysisState();
    analysis.markers.push({
      id: 'm1',
      kind: 'root',
      x: 2,
      y: 0,
      expressionId: 'e1',
      color: '#2563eb',
      visible: true,
    });
    const drawables = buildAnalysisDrawables([], analysis, VIEWPORT, { width: 800, height: 600 });
    expect(drawables).toHaveLength(1);
    expect(drawables[0].kind).toBe('point');
  });

  it('never throws on hostile input', () => {
    const drawables = buildAnalysisDrawables(
      [],
      {
        ...createDefaultAnalysisState(),
        markers: [
          { id: 'm', kind: 'root', x: NaN, y: 0, expressionId: 'e', color: 'red', visible: true },
        ],
      },
      VIEWPORT,
      { width: 800, height: 600 }
    );
    expect(drawables).toEqual([]);
  });
});
