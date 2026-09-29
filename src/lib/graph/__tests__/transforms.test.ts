import { describe, expect, it } from 'vitest';

import { getDevicePixelRatio, snapToPixel } from '../transforms.js';

describe('getDevicePixelRatio', () => {
  it('returns 1 when window is unavailable (node)', () => {
    expect(typeof window).toBe('undefined');
    expect(getDevicePixelRatio()).toBe(1);
  });
});

describe('snapToPixel', () => {
  it('offsets integer coordinates by half a pixel', () => {
    expect(snapToPixel(10)).toBe(10.5);
    expect(snapToPixel(0)).toBe(0.5);
    expect(snapToPixel(-4)).toBe(-3.5);
  });

  it('rounds fractional coordinates before offsetting', () => {
    expect(snapToPixel(10.4)).toBe(10.5);
    expect(snapToPixel(10.6)).toBe(11.5);
    expect(snapToPixel(10.5)).toBe(11.5);
  });
});
