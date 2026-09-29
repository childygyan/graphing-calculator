import { describe, expect, it } from 'vitest';

import type { GraphViewport } from '../../../types/calculator.js';
import type { CanvasSize, ScreenPoint, WorldPoint } from '../types.js';
import { createTransform, sanitizeNumber } from '../coordinate-system.js';

const VIEWPORT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const SIZE: CanvasSize = { width: 800, height: 600 };

describe('createTransform', () => {
  it('maps positive world coordinates to screen pixels', () => {
    const t = createTransform(VIEWPORT, SIZE);
    // x: (-10..10) -> (0..800); y: (10..-10) -> (0..600)
    expect(t.worldToScreen({ x: 5, y: 2.5 })).toEqual({ x: 600, y: 225 });
  });

  it('maps negative world coordinates to screen pixels', () => {
    const t = createTransform(VIEWPORT, SIZE);
    expect(t.worldToScreen({ x: -5, y: -2.5 })).toEqual({ x: 200, y: 375 });
  });

  it('maps the world origin to the center pixel of a ±10 viewport', () => {
    const t = createTransform(VIEWPORT, SIZE);
    expect(t.worldToScreen({ x: 0, y: 0 })).toEqual({ x: 400, y: 300 });
  });

  it('maps viewport corners to canvas corners', () => {
    const t = createTransform(VIEWPORT, SIZE);
    expect(t.worldToScreen({ x: -10, y: 10 })).toEqual({ x: 0, y: 0 });
    expect(t.worldToScreen({ x: 10, y: -10 })).toEqual({ x: 800, y: 600 });
  });

  it('screenToWorld inverts worldToScreen exactly', () => {
    const t = createTransform(VIEWPORT, SIZE);
    expect(t.screenToWorld({ x: 400, y: 300 })).toEqual({ x: 0, y: 0 });
    expect(t.screenToWorld({ x: 0, y: 0 })).toEqual({ x: -10, y: 10 });
    expect(t.screenToWorld({ x: 800, y: 600 })).toEqual({ x: 10, y: -10 });
  });

  it('round-trips screenToWorld(worldToScreen(p)) for a spread of points', () => {
    const t = createTransform(VIEWPORT, SIZE);
    const points: WorldPoint[] = [
      { x: 0, y: 0 },
      { x: -10, y: 10 },
      { x: 9.9999, y: -7.5 },
      { x: Math.PI, y: -Math.E },
      { x: -3.14159, y: 2.71828 },
      { x: 0.0001, y: -0.0001 },
    ];
    for (const p of points) {
      const roundTripped = t.screenToWorld(t.worldToScreen(p));
      expect(roundTripped.x).toBeCloseTo(p.x, 9);
      expect(roundTripped.y).toBeCloseTo(p.y, 9);
    }
  });

  it('round-trips worldToScreen(screenToWorld(s)) for a spread of pixels', () => {
    const t = createTransform(VIEWPORT, SIZE);
    const pixels: ScreenPoint[] = [
      { x: 0, y: 0 },
      { x: 400, y: 300 },
      { x: 799.5, y: 600 },
      { x: 123.456, y: 321.654 },
    ];
    for (const s of pixels) {
      const roundTripped = t.worldToScreen(t.screenToWorld(s));
      expect(roundTripped.x).toBeCloseTo(s.x, 9);
      expect(roundTripped.y).toBeCloseTo(s.y, 9);
    }
  });

  it('produces a different mapping when the viewport changes', () => {
    const t = createTransform(VIEWPORT, SIZE);
    const zoomed: GraphViewport = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
    const t2 = createTransform(zoomed, SIZE);
    expect(t.worldToScreen({ x: 5, y: 0 })).not.toEqual(t2.worldToScreen({ x: 5, y: 0 }));
    // Half the world span -> double the screen resolution per unit.
    expect(t2.pixelsPerUnitX()).toBeCloseTo(t.pixelsPerUnitX() * 2, 9);
  });

  it('reports consistent unitsPerPixel / pixelsPerUnit', () => {
    const t = createTransform(VIEWPORT, SIZE);
    // 20 world units over 800px -> 0.025 units/px; 20 units over 600px -> 1/30 units/px
    expect(t.unitsPerPixelX()).toBeCloseTo(0.025, 9);
    expect(t.pixelsPerUnitX()).toBeCloseTo(40, 9);
    expect(t.unitsPerPixelY()).toBeCloseTo(20 / 600, 9);
    expect(t.pixelsPerUnitY()).toBeCloseTo(30, 9);
    expect(t.unitsPerPixelX() * t.pixelsPerUnitX()).toBeCloseTo(1, 9);
  });

  it('never produces NaN or Infinity for a zero-span (degenerate) viewport', () => {
    const degenerate: GraphViewport = { xMin: 3, xMax: 3, yMin: -2, yMax: -2 };
    const t = createTransform(degenerate, SIZE);
    const screen = t.worldToScreen({ x: 3, y: -2 });
    const world = t.screenToWorld({ x: 100, y: 100 });
    for (const n of [
      screen.x,
      screen.y,
      world.x,
      world.y,
      t.unitsPerPixelX(),
      t.pixelsPerUnitX(),
    ]) {
      expect(Number.isFinite(n)).toBe(true);
    }
  });
});

describe('sanitizeNumber', () => {
  it('passes finite numbers through unchanged', () => {
    expect(sanitizeNumber(5)).toBe(5);
    expect(sanitizeNumber(-1.25)).toBe(-1.25);
    expect(sanitizeNumber(0)).toBe(0);
  });

  it('replaces NaN and ±Infinity with the fallback', () => {
    expect(sanitizeNumber(NaN)).toBe(0);
    expect(sanitizeNumber(Infinity)).toBe(0);
    expect(sanitizeNumber(-Infinity)).toBe(0);
  });

  it('honors a custom fallback', () => {
    expect(sanitizeNumber(NaN, 7)).toBe(7);
    expect(sanitizeNumber(Infinity, -1)).toBe(-1);
  });
});
