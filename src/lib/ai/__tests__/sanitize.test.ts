import { describe, expect, it } from 'vitest';
import { escapeHtml, sanitizeAiText, stripControlChars } from '../sanitize.js';

describe('sanitize', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml("a & b 'c'")).toBe('a &amp; b &#39;c&#39;');
  });

  it('leaves plain math text untouched', () => {
    expect(escapeHtml('y = x^2 + 1')).toBe('y = x^2 + 1');
  });

  it('strips control characters but keeps newlines and tabs', () => {
    expect(stripControlChars('a\u0000b\nc\td')).toBe('ab\nc\td');
  });

  it('sanitizeAiText truncates long output and escapes', () => {
    const long = 'x'.repeat(5000);
    const out = sanitizeAiText(long, 100);
    expect(out.length).toBeLessThanOrEqual(101);
    expect(out.endsWith('…')).toBe(true);
    expect(sanitizeAiText('<b>hi</b>')).toBe('&lt;b&gt;hi&lt;/b&gt;');
  });
});
