import { describe, expect, it } from 'vitest';
import { buildCspHeader, buildDefaultCspHeader, defaultCspDirectives } from '../csp.js';

describe('buildCspHeader', () => {
  it('serializes directives in insertion order, space-joined values', () => {
    expect(
      buildCspHeader({
        'default-src': ["'self'"],
        'script-src': ["'self'", "'sha256-abc'"],
      })
    ).toBe("default-src 'self'; script-src 'self' 'sha256-abc'");
  });

  it('serializes valueless directives as bare names', () => {
    expect(buildCspHeader({ 'upgrade-insecure-requests': [] })).toBe('upgrade-insecure-requests');
  });

  it('trims values and drops empties', () => {
    expect(buildCspHeader({ 'img-src': ["'self'", '  ', 'data:'] })).toBe("img-src 'self' data:");
  });

  it('never emits unsafe-inline in script-src for the default policy', () => {
    const header = buildDefaultCspHeader({ scriptHashes: ['abc123'] });
    const scriptSrc = header.split('; ').find((part) => part.startsWith('script-src')) as string;
    expect(scriptSrc).not.toContain('unsafe-inline');
    expect(scriptSrc).toContain("'sha256-abc123'");
  });
});

describe('defaultCspDirectives', () => {
  const directives = defaultCspDirectives({ scriptHashes: ['h1', 'h2'] });

  it('locks down plugins, framing, forms, and base-uri', () => {
    expect(directives['object-src']).toEqual(["'none'"]);
    expect(directives['frame-ancestors']).toEqual(["'self'"]);
    expect(directives['form-action']).toEqual(["'self'"]);
    expect(directives['base-uri']).toEqual(["'self'"]);
  });

  it('keeps connect-src same-origin (the browser never calls DeepSeek directly)', () => {
    expect(directives['connect-src']).toEqual(["'self'"]);
  });

  it('allows data: and blob: images (PNG export uses canvas data URLs)', () => {
    expect(directives['img-src']).toContain('data:');
    expect(directives['img-src']).toContain('blob:');
  });

  it('embeds every supplied script hash exactly once', () => {
    const values = directives['script-src'] as readonly string[];
    expect(values).toContain("'sha256-h1'");
    expect(values).toContain("'sha256-h2'");
    expect(values.filter((v) => v.startsWith("'sha256-"))).toHaveLength(2);
  });

  it('upgrades insecure requests', () => {
    expect(directives['upgrade-insecure-requests']).toEqual([]);
  });
});
