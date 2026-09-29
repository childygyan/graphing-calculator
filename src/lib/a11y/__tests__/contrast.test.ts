import { describe, expect, it } from 'vitest';
import {
  AA_LARGE_TEXT_RATIO,
  AA_NORMAL_TEXT_RATIO,
  contrastRatio,
  relativeLuminance,
} from '../contrast.js';
import { darkGraphTheme, lightGraphTheme } from '../../graph/theme.js';

describe('contrastRatio math', () => {
  it('is 21 for black on white and 1 for identical colors', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
    expect(contrastRatio('#123456', '#123456')).toBeCloseTo(1, 5);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#475569', '#ffffff')).toBeCloseTo(
      contrastRatio('#ffffff', '#475569'),
      10
    );
  });

  it('accepts 3-digit hex', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 1);
  });

  it('rejects malformed input', () => {
    expect(() => relativeLuminance('red')).toThrow();
    expect(() => contrastRatio('#ffff', '#ffffff')).toThrow();
  });
});

describe('graph theme contrast (WCAG 2.2 AA)', () => {
  it('light tick labels pass AA on the light canvas', () => {
    expect(
      contrastRatio(lightGraphTheme.tickLabel, lightGraphTheme.background)
    ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('dark tick labels pass AA on the dark canvas', () => {
    expect(
      contrastRatio(darkGraphTheme.tickLabel, darkGraphTheme.background)
    ).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('axes stay visible against the canvas (non-text 3:1)', () => {
    expect(contrastRatio(lightGraphTheme.axis, lightGraphTheme.background)).toBeGreaterThanOrEqual(
      AA_LARGE_TEXT_RATIO
    );
    expect(contrastRatio(darkGraphTheme.axis, darkGraphTheme.background)).toBeGreaterThanOrEqual(
      AA_LARGE_TEXT_RATIO
    );
  });
});

describe('key UI color pairs (WCAG 2.2 AA)', () => {
  const WHITE = '#ffffff';
  const SLATE_950 = '#020617';

  it('secondary body text (slate-500) passes on white', () => {
    expect(contrastRatio('#64748b', WHITE)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('secondary body text (slate-400) passes on dark background', () => {
    expect(contrastRatio('#94a3b8', SLATE_950)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('brand-700 nav links pass on white', () => {
    expect(contrastRatio('#4338ca', WHITE)).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('white text passes on the blue-600 AI button', () => {
    expect(contrastRatio(WHITE, '#2563eb')).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('white text passes on the brand-600 skip-link background', () => {
    expect(contrastRatio(WHITE, '#4f46e5')).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('success toast text (emerald-800) passes on emerald-50', () => {
    expect(contrastRatio('#065f46', '#ecfdf5')).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });

  it('error toast text (red-800) passes on red-50', () => {
    expect(contrastRatio('#991b1b', '#fef2f2')).toBeGreaterThanOrEqual(AA_NORMAL_TEXT_RATIO);
  });
});
