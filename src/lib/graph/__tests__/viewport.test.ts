import { describe, expect, it } from 'vitest';

import type { GraphViewport } from '../../../types/calculator.js';
import { createTransform } from '../coordinate-system.js';
import {
  MAX_VIEWPORT_SPAN,
  MIN_VIEWPORT_SPAN,
  createDefaultViewport,
  fitViewportToDrawables,
  panViewport,
  resetViewport,
  validateViewport,
  zoomViewport,
} from '../viewport.js';

const DEFAULT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

describe('createDefaultViewport', () => {
  it('returns the ±10 default viewport', () => {
    expect(createDefaultViewport()).toEqual(DEFAULT);
  });

  it('returns a fresh object each time', () => {
    const a = createDefaultViewport();
    const b = createDefaultViewport();
    expect(a).not.toBe(b);
    a.xMin = 999;
    expect(b.xMin).toBe(-10);
  });
});

describe('validateViewport', () => {
  it('accepts a good viewport and returns an equal copy', () => {
    const result = validateViewport({ ...DEFAULT });
    expect(result).toEqual(DEFAULT);
    expect(result).not.toBeNull();
  });

  it('rejects xMin >= xMax and yMin >= yMax', () => {
    expect(validateViewport({ ...DEFAULT, xMin: 10, xMax: -10 })).toBeNull();
    expect(validateViewport({ ...DEFAULT, xMin: 5, xMax: 5 })).toBeNull();
    expect(validateViewport({ ...DEFAULT, yMin: 3, yMax: 3 })).toBeNull();
  });

  it('rejects non-finite values', () => {
    expect(validateViewport({ ...DEFAULT, xMin: NaN })).toBeNull();
    expect(validateViewport({ ...DEFAULT, xMax: Infinity })).toBeNull();
    expect(validateViewport({ ...DEFAULT, yMin: 'a' })).toBeNull();
  });

  it('rejects non-objects', () => {
    expect(validateViewport(null)).toBeNull();
    expect(validateViewport(undefined)).toBeNull();
    expect(validateViewport('viewport')).toBeNull();
    expect(validateViewport(42)).toBeNull();
    expect(validateViewport([1, 2, 3, 4])).toBeNull();
    expect(validateViewport({})).toBeNull();
  });

  it('clamps a below-minimum span up to MIN_VIEWPORT_SPAN preserving the center', () => {
    const result = validateViewport({ xMin: 4.9999999999999, xMax: 5, yMin: -10, yMax: 10 });
    expect(result).not.toBeNull();
    if (result === null) return;
    // The span is clamped to MIN_VIEWPORT_SPAN; asserting relatively because
    // the center-preserving arithmetic carries ~1 ulp of float noise at |x| ≈ 5.
    expect((result.xMax - result.xMin) / MIN_VIEWPORT_SPAN).toBeCloseTo(1, 6);
    expect((result.xMin + result.xMax) / 2).toBeCloseTo(5, 12);
    expect(result.yMin).toBe(-10);
    expect(result.yMax).toBe(10);
  });

  it('clamps an above-maximum span down to MAX_VIEWPORT_SPAN preserving the center', () => {
    const result = validateViewport({ xMin: -1e16, xMax: 1e16, yMin: -10, yMax: 10 });
    expect(result).not.toBeNull();
    if (result === null) return;
    expect(result.xMax - result.xMin).toBe(MAX_VIEWPORT_SPAN);
    expect((result.xMin + result.xMax) / 2).toBe(0);
  });

  it('leaves an in-range span untouched', () => {
    const input: GraphViewport = { xMin: -3, xMax: 7, yMin: -1, yMax: 2 };
    expect(validateViewport(input)).toEqual(input);
  });
});

describe('zoomViewport', () => {
  it('halves both spans with factor 0.5', () => {
    const result = zoomViewport(DEFAULT, 0.5);
    expect(result).toEqual({ xMin: -5, xMax: 5, yMin: -5, yMax: 5 });
  });

  it('doubles both spans with factor 2', () => {
    const result = zoomViewport(DEFAULT, 2);
    expect(result).toEqual({ xMin: -20, xMax: 20, yMin: -20, yMax: 20 });
  });

  it('keeps the cursor anchor world point fixed on screen', () => {
    const size = { width: 800, height: 600 };
    const anchorScreen = { x: 600, y: 450 };
    const before = createTransform(DEFAULT, size);
    const anchorWorld = before.screenToWorld(anchorScreen);
    const zoomed = zoomViewport(DEFAULT, 0.5, anchorWorld);
    const after = createTransform(zoomed, size);
    const afterScreen = after.worldToScreen(anchorWorld);
    expect(afterScreen.x).toBeCloseTo(anchorScreen.x, 9);
    expect(afterScreen.y).toBeCloseTo(anchorScreen.y, 9);
  });

  it('returns an unchanged copy for invalid factors (0, -1, NaN, Infinity)', () => {
    for (const factor of [0, -1, -0.5, NaN, Infinity, -Infinity]) {
      const result = zoomViewport(DEFAULT, factor);
      expect(result).toEqual(DEFAULT);
      expect(result).not.toBe(DEFAULT);
    }
  });

  it('clamps spans that would exceed MAX_VIEWPORT_SPAN', () => {
    const huge: GraphViewport = { xMin: -1e14, xMax: 1e14, yMin: -1e14, yMax: 1e14 };
    const result = zoomViewport(huge, 100);
    expect(result.xMax - result.xMin).toBe(MAX_VIEWPORT_SPAN);
    expect(result.yMax - result.yMin).toBe(MAX_VIEWPORT_SPAN);
  });

  it('clamps spans that would go below MIN_VIEWPORT_SPAN', () => {
    const tiny: GraphViewport = { xMin: -1e-9, xMax: 1e-9, yMin: -1e-9, yMax: 1e-9 };
    const result = zoomViewport(tiny, 0.000001);
    expect(result.xMax - result.xMin).toBe(MIN_VIEWPORT_SPAN);
  });

  it('does not mutate the input viewport', () => {
    const input: GraphViewport = { ...DEFAULT };
    zoomViewport(input, 0.5);
    expect(input).toEqual(DEFAULT);
  });
});

describe('panViewport', () => {
  it('shifts xMin/xMax by shiftX and yMin/yMax by shiftY', () => {
    expect(panViewport(DEFAULT, 3, -2)).toEqual({
      xMin: -7,
      xMax: 13,
      yMin: -12,
      yMax: 8,
    });
  });

  it('preserves the span when panning', () => {
    const result = panViewport(DEFAULT, 100, 100);
    expect(result.xMax - result.xMin).toBe(20);
    expect(result.yMax - result.yMin).toBe(20);
  });

  it('returns an unchanged copy for non-finite shifts', () => {
    for (const bad of [NaN, Infinity, -Infinity]) {
      expect(panViewport(DEFAULT, bad, 1)).toEqual(DEFAULT);
      expect(panViewport(DEFAULT, 1, bad)).toEqual(DEFAULT);
    }
  });

  it('does not mutate the input viewport', () => {
    const input: GraphViewport = { ...DEFAULT };
    panViewport(input, 3, -2);
    expect(input).toEqual(DEFAULT);
  });
});

describe('resetViewport', () => {
  it('returns the ±10 default viewport as a fresh object', () => {
    const result = resetViewport();
    expect(result).toEqual(DEFAULT);
    expect(result).not.toBe(DEFAULT);
  });
});

describe('fitViewportToDrawables', () => {
  it('returns the fallback viewport (Phase 2 placeholder behavior)', () => {
    const fallback: GraphViewport = { xMin: -1, xMax: 1, yMin: -2, yMax: 2 };
    const result = fitViewportToDrawables([], fallback);
    expect(result).toEqual(fallback);
    expect(result).not.toBe(fallback);
  });

  it('defaults to the default viewport when no fallback is given', () => {
    expect(fitViewportToDrawables([])).toEqual(DEFAULT);
  });
});
