/**
 * Phase 9 accessibility: WCAG contrast-ratio math (pure, unit-tested).
 *
 * Used to pin the contrast of the graph themes and key UI color pairs so
 * a palette regression fails the test suite instead of shipping silently.
 */

function parseHexChannel(hex: string): [number, number, number] {
  const clean = hex.replace(/^#/, '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`contrast: expected a hex color, got '${hex}'.`);
  }
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** WCAG 2.x relative luminance of an sRGB hex color, in [0, 1]. */
export function relativeLuminance(hex: string): number {
  const [r8, g8, b8] = parseHexChannel(hex);
  const linear = (channel: number): number => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linear(r8) + 0.7152 * linear(g8) + 0.0722 * linear(b8);
}

/** WCAG contrast ratio of two hex colors, in [1, 21]. */
export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG 2.2 AA minimum for normal text. */
export const AA_NORMAL_TEXT_RATIO = 4.5;

/** WCAG 2.2 AA minimum for large text (≥18pt / ≥14pt bold) and UI components. */
export const AA_LARGE_TEXT_RATIO = 3.0;
