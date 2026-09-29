import { describe, expect, it } from 'vitest';
import { ensureImageLoaded, getLoadedImage, isAllowedImageSrc } from '../images.js';

describe('isAllowedImageSrc', () => {
  it('accepts https URLs', () => {
    expect(isAllowedImageSrc('https://example.com/image.png')).toBe(true);
    expect(isAllowedImageSrc('https://example.com/a?b=c#d')).toBe(true);
  });

  it('accepts image data URLs', () => {
    expect(isAllowedImageSrc('data:image/png;base64,iVBORw0KGgo=')).toBe(true);
    expect(isAllowedImageSrc('DATA:IMAGE/JPEG;base64,/9j/')).toBe(true);
  });

  it('rejects http, javascript:, and non-image data URLs', () => {
    expect(isAllowedImageSrc('http://example.com/image.png')).toBe(false);
    expect(isAllowedImageSrc('javascript:alert(1)')).toBe(false);
    expect(isAllowedImageSrc('data:text/html,<h1>hi</h1>')).toBe(false);
    expect(isAllowedImageSrc('not a url')).toBe(false);
    expect(isAllowedImageSrc('')).toBe(false);
  });
});

describe('image cache without a DOM', () => {
  it('returns null and never throws in SSR', () => {
    expect(getLoadedImage('https://example.com/a.png')).toBeNull();
    expect(() => ensureImageLoaded('https://example.com/a.png', () => {})).not.toThrow();
  });

  it('ignores disallowed sources silently', () => {
    expect(getLoadedImage('javascript:alert(1)')).toBeNull();
    expect(() => ensureImageLoaded('javascript:alert(1)', () => {})).not.toThrow();
  });
});
