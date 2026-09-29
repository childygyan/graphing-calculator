/**
 * DPR-aware canvas setup. This is the only graph-engine module besides
 * interaction.ts that touches the DOM: it sizes the canvas backing store for
 * the device pixel ratio and installs the matching 2D transform so all
 * drawing code can keep working in CSS pixels.
 */

export interface CanvasSetup {
  ctx: CanvasRenderingContext2D;
  dpr: number;
  cssWidth: number;
  cssHeight: number;
}

/** Upper bound for either backing-store dimension, in device pixels. */
const MAX_BACKING_STORE_DIMENSION = 8192;

/**
 * The device pixel ratio clamped to [1, 3]. Returns 1 when `window` is
 * unavailable (SSR) or the value is missing/non-finite/non-positive.
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  const dpr = window.devicePixelRatio;
  if (!Number.isFinite(dpr) || dpr <= 0) return 1;
  return Math.min(3, Math.max(1, dpr));
}

/**
 * Size a canvas for CSS-pixel drawing at the current DPR. Returns null for
 * non-finite/non-positive sizes or when no 2D context is available. The
 * backing store is clamped so a huge CSS size on a high-DPR display cannot
 * trigger an absurd allocation: the effective DPR is scaled down so neither
 * backing-store dimension exceeds 8192 device pixels.
 */
export function setupCanvas(
  canvas: HTMLCanvasElement,
  cssWidth: number,
  cssHeight: number
): CanvasSetup | null {
  if (
    !Number.isFinite(cssWidth) ||
    !Number.isFinite(cssHeight) ||
    cssWidth <= 0 ||
    cssHeight <= 0
  ) {
    return null;
  }
  let dpr = getDevicePixelRatio();
  const maxDpr = Math.min(
    MAX_BACKING_STORE_DIMENSION / cssWidth,
    MAX_BACKING_STORE_DIMENSION / cssHeight
  );
  if (dpr > maxDpr) dpr = maxDpr;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  canvas.width = Math.max(1, Math.round(cssWidth * dpr));
  canvas.height = Math.max(1, Math.round(cssHeight * dpr));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  // From here on, drawing coordinates are CSS pixels.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, dpr, cssWidth, cssHeight };
}

/** Offset for crisp 1px strokes: a line at integer x spans two pixel rows. */
export function snapToPixel(p: number): number {
  return Math.round(p) + 0.5;
}
