/**
 * Regression test for the "Share this graph" hang (2026-09-30).
 *
 * Root cause: `deflateRaw`/`inflateRaw` in `share.ts` awaited
 * `writer.close()` BEFORE reading from the stream. In Chromium, the
 * readable side fills with compressed output and backpressure blocks the
 * close-flush, so `close()` never resolves — the Share dialog hung forever
 * on "Creating your link…". (Node's CompressionStream does not exhibit the
 * deadlock, which is why the existing tests passed.)
 *
 * These tests replace CompressionStream/DecompressionStream with fakes that
 * reproduce the browser backpressure semantics: `close()` on the writable
 * side does not resolve until the readable side is being consumed. The old
 * close-before-read pattern deadlocks against them (the test times out);
 * the fixed concurrent-consumption pattern resolves.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { decodeSharePayload, encodeSharePayload } from '../share.js';
import { stateToDocument } from '../document.js';
import { createInitialCalculatorState } from '../../expressions/expressions.js';

function makeDocument() {
  return stateToDocument(createInitialCalculatorState('dark'), 'shared');
}

const FAKE_COMPRESSED = new Uint8Array([10, 20, 30, 40]);

/**
 * Fake CompressionStream with strict backpressure: the writer's `close()`
 * pends until the readable side is locked for consumption. Mirrors the
 * Chromium behavior that deadlocked the old implementation.
 */
class BackpressureCompressionStream {
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;

  constructor() {
    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(FAKE_COMPRESSED);
        controller.close();
      },
    });
    this.readable = readable;
    this.writable = new WritableStream<Uint8Array>({
      write() {
        /* chunk accepted; fake output already queued */
      },
      close() {
        // Backpressure: close() only resolves once someone consumes.
        if (readable.locked) return Promise.resolve();
        return new Promise<void>(() => {
          /* never resolves — the old pattern hangs here */
        });
      },
    });
  }
}

/** Same backpressure semantics for the decompression path. */
class BackpressureDecompressionStream {
  readonly readable: ReadableStream<Uint8Array>;
  readonly writable: WritableStream<Uint8Array>;

  constructor(output: Uint8Array) {
    const readable = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(output);
        controller.close();
      },
    });
    this.readable = readable;
    this.writable = new WritableStream<Uint8Array>({
      write() {},
      close() {
        if (readable.locked) return Promise.resolve();
        return new Promise<void>(() => {
          /* never resolves — the old pattern hangs here */
        });
      },
    });
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms — stream deadlocked`)), ms)
    ),
  ]);
}

describe('share compression backpressure (regression)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('encodeSharePayload resolves when close() waits for consumption', async () => {
    vi.stubGlobal('CompressionStream', BackpressureCompressionStream);
    vi.stubGlobal('DecompressionStream', BackpressureDecompressionStream);
    const payload = await withTimeout(encodeSharePayload(makeDocument()), 3000);
    expect(payload.startsWith('1d')).toBe(true);
  });

  it('decodeSharePayload resolves a compressed payload under backpressure', async () => {
    const doc = makeDocument();
    const json = new TextEncoder().encode(JSON.stringify(doc));
    vi.stubGlobal('CompressionStream', BackpressureCompressionStream);
    vi.stubGlobal(
      'DecompressionStream',
      class extends BackpressureDecompressionStream {
        constructor() {
          super(json);
        }
      }
    );
    const decoded = await withTimeout(decodeSharePayload('1dAQIDBA'), 3000);
    expect(decoded.ok).toBe(true);
    if (decoded.ok) expect(decoded.document).toEqual(doc);
  });
});
