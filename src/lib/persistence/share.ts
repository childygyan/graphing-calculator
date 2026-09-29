/**
 * Shareable-URL encoding for graph documents.
 *
 * A document is serialized to JSON, optionally compressed with
 * deflate-raw (via the platform CompressionStream), and base64url-encoded
 * into a URL hash fragment (`#s=…`). Hash fragments are used (not query
 * params) so the link works on purely static hosting with no server logic.
 *
 * Share payloads are DATA, parsed with JSON.parse + schema validation —
 * never evaluated. Oversized payloads are rejected before decoding.
 */

import {
  GRAPH_DOCUMENT_VERSION,
  MAX_JSON_NESTING_DEPTH,
  migrateDocument,
  type GraphDocument,
} from './document.js';
import { validateGraphDocument } from './validate.js';

/** Reject share payloads longer than this many characters before decoding. */
export const MAX_SHARE_PAYLOAD_CHARS = 300000;

/** `#s=` hash prefix for shared graphs. */
export const SHARE_HASH_PREFIX = '#s=';

const PAYLOAD_VERSION = '1';

type CompressionMode = 'd' | 'p'; // d = deflate-raw, p = plain (fallback)

function hasCompressionStreams(): boolean {
  return typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBytes(encoded: string): Uint8Array {
  if (!/^[A-Za-z0-9\-_]*$/.test(encoded)) {
    throw new Error('The share link is not valid base64url.');
  }
  const padded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = new CompressionStream('deflate-raw');
  const writer = stream.writable.getWriter();
  // Copy into a fresh ArrayBuffer so the stream types accept the chunk.
  await writer.write(new Uint8Array(bytes));
  await writer.close();
  const chunks: Uint8Array[] = [];
  const reader = stream.readable.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value as Uint8Array);
  }
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

async function inflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  const stream = new DecompressionStream('deflate-raw');
  const writer = stream.writable.getWriter();
  // Copy into a fresh ArrayBuffer so the stream types accept the chunk.
  await writer.write(new Uint8Array(bytes));
  await writer.close();
  const chunks: Uint8Array[] = [];
  const reader = stream.readable.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value as Uint8Array);
  }
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

/**
 * Encode a validated document into a compact share payload (no `#s=`
 * prefix). Picks the shorter of deflate-raw and plain base64url.
 */
export async function encodeSharePayload(document: GraphDocument): Promise<string> {
  const json = JSON.stringify(document);
  const utf8 = new TextEncoder().encode(json);
  const plain = bytesToBase64Url(utf8);
  if (hasCompressionStreams()) {
    try {
      const compressed = bytesToBase64Url(await deflateRaw(utf8));
      // Small documents can compress larger than the raw form — take the min.
      return compressed.length < plain.length
        ? `${PAYLOAD_VERSION}d${compressed}`
        : `${PAYLOAD_VERSION}p${plain}`;
    } catch {
      // Compression failed: fall through to the plain encoding.
    }
  }
  return `${PAYLOAD_VERSION}p${plain}`;
}

/** Cheap pre-scan: reject JSON that nests deeper than the safe limit. */
function checkNestingDepth(json: string): boolean {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = 0; i < json.length; i++) {
    const char = json[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
    } else if (char === '{' || char === '[') {
      depth += 1;
      if (depth > MAX_JSON_NESTING_DEPTH) return false;
    } else if (char === '}' || char === ']') {
      depth -= 1;
    }
  }
  return true;
}

export type DecodeShareResult =
  { ok: true; document: GraphDocument } | { ok: false; error: string };

/**
 * Decode a share payload (the part after `#s=`) back into a validated
 * document. Every failure mode returns an honest error string.
 */
export async function decodeSharePayload(payload: string): Promise<DecodeShareResult> {
  if (payload.length === 0) {
    return { ok: false, error: 'The share link is empty.' };
  }
  if (payload.length > MAX_SHARE_PAYLOAD_CHARS) {
    return { ok: false, error: 'The share link is too long to open safely.' };
  }
  const version = payload[0];
  const mode = payload[1] as CompressionMode | undefined;
  const data = payload.slice(2);
  if (version !== PAYLOAD_VERSION || (mode !== 'd' && mode !== 'p')) {
    return { ok: false, error: 'This share link uses an unsupported format.' };
  }
  let bytes: Uint8Array;
  try {
    bytes = base64UrlToBytes(data);
  } catch {
    return { ok: false, error: 'The share link is corrupted (invalid encoding).' };
  }
  if (mode === 'd') {
    if (!hasCompressionStreams()) {
      return { ok: false, error: 'This browser cannot decompress the share link.' };
    }
    try {
      bytes = await inflateRaw(bytes);
    } catch {
      return { ok: false, error: 'The share link is corrupted (cannot decompress).' };
    }
  }
  let json: string;
  try {
    json = new TextDecoder().decode(bytes);
  } catch {
    return { ok: false, error: 'The share link is corrupted (invalid text).' };
  }
  if (!checkNestingDepth(json)) {
    return { ok: false, error: 'The share link contains suspiciously nested data.' };
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch {
    return { ok: false, error: 'The share link is corrupted (invalid JSON).' };
  }
  const migrated = migrateDocument(parsed);
  if (!migrated.ok) return { ok: false, error: migrated.error };
  const validated = validateGraphDocument(migrated.document);
  if (!validated.ok) {
    return {
      ok: false,
      error: `The shared graph failed validation: ${validated.errors.slice(0, 3).join(' ')}`,
    };
  }
  return { ok: true, document: validated.document };
}

/** Build a full share URL for the `/graph/` route from a hash payload. */
export function buildShareUrl(payload: string, origin?: string): string {
  const base = typeof origin === 'string' && origin.length > 0 ? origin : '';
  return `${base}/graph/${SHARE_HASH_PREFIX}${payload}`;
}

/**
 * Extract and decode the share payload from a location hash (e.g.
 * `#s=1d…`). Returns null when the hash carries no share state.
 */
export async function decodeSharedDocumentFromHash(
  hash: string
): Promise<DecodeShareResult | null> {
  if (!hash.startsWith(SHARE_HASH_PREFIX)) return null;
  return decodeSharePayload(hash.slice(SHARE_HASH_PREFIX.length));
}

/** Assert at module scope that the document version matches the payload version. */
export const SHARE_DOCUMENT_VERSION: number = GRAPH_DOCUMENT_VERSION;
