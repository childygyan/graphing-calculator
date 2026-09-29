import { describe, expect, it } from 'vitest';

import type { GraphViewport } from '../../../types/calculator.js';
import { computeAxes } from '../axes.js';

const DEFAULT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const SIZE_800x600 = { width: 800, height: 600 };

describe('computeAxes', () => {
  it('shows both axes on the default viewport', () => {
    const { xAxis, yAxis } = computeAxes(DEFAULT, SIZE_800x600);
    expect(xAxis.visible).toBe(true);
    expect(yAxis.visible).toBe(true);
    expect(xAxis.orientation).toBe('x');
    expect(yAxis.orientation).toBe('y');
  });

  it('places the x axis at pixel 300 on a 600px-tall canvas', () => {
    const { xAxis } = computeAxes(DEFAULT, SIZE_800x600);
    expect(xAxis.pixel).toBeCloseTo(300, 9);
  });

  it('places the y axis at pixel 400 on an 800px-wide canvas', () => {
    const { yAxis } = computeAxes(DEFAULT, SIZE_800x600);
    expect(yAxis.pixel).toBeCloseTo(400, 9);
  });

  it('hides the y axis when 0 is outside the x range and pins edge labels', () => {
    const offX: GraphViewport = { xMin: 5, xMax: 15, yMin: -10, yMax: 10 };
    const { xAxis, yAxis } = computeAxes(offX, SIZE_800x600);
    expect(xAxis.visible).toBe(true);
    expect(yAxis.visible).toBe(false);
    expect(yAxis.ticks).toEqual([]);
    expect(yAxis.edgeLabels.length).toBeGreaterThan(0);
    expect(xAxis.edgeLabels).toEqual([]);
  });

  it('hides the x axis when 0 is outside the y range and pins edge labels', () => {
    const offY: GraphViewport = { xMin: -10, xMax: 10, yMin: 2, yMax: 12 };
    const { xAxis, yAxis } = computeAxes(offY, SIZE_800x600);
    expect(xAxis.visible).toBe(false);
    expect(yAxis.visible).toBe(true);
    expect(xAxis.ticks).toEqual([]);
    expect(xAxis.edgeLabels.length).toBeGreaterThan(0);
  });

  it("emits the origin label '0' exactly once across both axes", () => {
    const { xAxis, yAxis } = computeAxes(DEFAULT, SIZE_800x600);
    const allTicks = [...xAxis.ticks, ...yAxis.ticks];
    const originLabels = allTicks.filter((tick) => tick.label === '0');
    expect(originLabels).toHaveLength(1);
    expect(originLabels[0].value).toBe(0);
    // The x axis claims the origin label.
    expect(xAxis.ticks.some((tick) => tick.label === '0')).toBe(true);
    expect(yAxis.ticks.some((tick) => tick.label === '0')).toBe(false);
  });

  it('returns invisible axes for degenerate viewports', () => {
    const bad: GraphViewport = { xMin: 5, xMax: 5, yMin: -10, yMax: 10 };
    const { xAxis, yAxis } = computeAxes(bad, SIZE_800x600);
    expect(xAxis.visible).toBe(false);
    expect(yAxis.visible).toBe(false);
    expect(xAxis.ticks).toEqual([]);
    expect(yAxis.ticks).toEqual([]);
  });
});
