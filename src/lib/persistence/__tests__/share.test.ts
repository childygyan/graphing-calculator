/**
 * Tests: share-link compact encoding round-trip and hostile payloads.
 */
import { describe, expect, it } from 'vitest';
import {
  MAX_SHARE_PAYLOAD_CHARS,
  buildShareUrl,
  decodeSharePayload,
  decodeSharedDocumentFromHash,
  encodeSharePayload,
} from '../share.js';
import { stateToDocument } from '../document.js';
import { createInitialCalculatorState } from '../../expressions/expressions.js';

function makeDocument() {
  return stateToDocument(createInitialCalculatorState('dark'), 'shared');
}

describe('share encoding', () => {
  it('round-trips a document through encode/decode', async () => {
    const document = makeDocument();
    const payload = await encodeSharePayload(document);
    expect(payload.length).toBeGreaterThan(0);
    // A compressed real document should be URL-safe and reasonably short.
    expect(payload).toMatch(/^[A-Za-z0-9\-_]+$/);
    const decoded = await decodeSharePayload(payload);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) {
      expect(decoded.document.expressions).toHaveLength(document.expressions.length);
      expect(decoded.document.viewport).toEqual(document.viewport);
      expect(decoded.document.theme).toBe('dark');
      expect(decoded.document.name).toBe('shared');
    }
  });

  it('round-trips the plain (uncompressed) mode too', async () => {
    const document = makeDocument();
    const json = JSON.stringify(document);
    const bytes = new TextEncoder().encode(json);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    const base64url = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const decoded = await decodeSharePayload(`1p${base64url}`);
    expect(decoded.ok).toBe(true);
  });

  it('rejects an empty payload', async () => {
    const result = await decodeSharePayload('');
    expect(result.ok).toBe(false);
  });

  it('rejects an unsupported payload version', async () => {
    const result = await decodeSharePayload('9pAAAA');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/unsupported/i);
  });

  it('rejects a corrupted payload', async () => {
    const result = await decodeSharePayload('1d!!!not-base64!!!');
    expect(result.ok).toBe(false);
  });

  it('rejects an oversized payload before decoding', async () => {
    const result = await decodeSharePayload(`1p${'A'.repeat(MAX_SHARE_PAYLOAD_CHARS + 1)}`);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/too long/i);
  });

  it('rejects deeply nested JSON', async () => {
    const nested = '['.repeat(100) + ']'.repeat(100);
    const bytes = new TextEncoder().encode(nested);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    const base64url = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const result = await decodeSharePayload(`1p${base64url}`);
    expect(result.ok).toBe(false);
  });
});

describe('share URL helpers', () => {
  it('builds a /graph/ URL with the hash payload', () => {
    const url = buildShareUrl('1pABC', 'https://example.com');
    expect(url).toBe('https://example.com/graph/#s=1pABC');
  });

  it('decodes a document from a location hash', async () => {
    const payload = await encodeSharePayload(makeDocument());
    const result = await decodeSharedDocumentFromHash(`#s=${payload}`);
    expect(result).not.toBeNull();
    expect(result?.ok).toBe(true);
  });

  it('returns null for a hash without share state', async () => {
    expect(await decodeSharedDocumentFromHash('')).toBeNull();
    expect(await decodeSharedDocumentFromHash('#about')).toBeNull();
  });
});
