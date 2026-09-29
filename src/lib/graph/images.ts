/**
 * Async image cache for image drawables.
 *
 * Bitmaps load outside the synchronous drawable pipeline: the renderer
 * asks for the cached element each frame, and this module kicks off the
 * network load on first sight, invoking `onReady` once so the viewport can
 * schedule a repaint. SSR-safe (no-ops without a DOM).
 */

/** Sources we accept: https URLs and image data URLs. */
export function isAllowedImageSrc(src: string): boolean {
  const value = src.trim();
  if (value.toLowerCase().startsWith('data:image/')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

type CacheEntry =
  { status: 'loading' } | { status: 'ready'; element: HTMLImageElement } | { status: 'error' };

const cache = new Map<string, CacheEntry>();
const pendingCallbacks = new Map<string, Set<() => void>>();

function getDocument(): Document | null {
  return typeof document !== 'undefined' ? document : null;
}

/**
 * Return the loaded bitmap for `src`, or null when it is still loading,
 * failed, disallowed, or there is no DOM. Never throws.
 */
export function getLoadedImage(src: string): HTMLImageElement | null {
  if (!isAllowedImageSrc(src)) return null;
  const entry = cache.get(src);
  return entry && entry.status === 'ready' ? entry.element : null;
}

/**
 * Ensure a load is in flight for `src`; `onReady` fires once when the
 * bitmap becomes available (or is already cached). Disallowed sources and
 * missing DOM are silent no-ops.
 */
export function ensureImageLoaded(src: string, onReady: () => void): void {
  if (!isAllowedImageSrc(src)) return;
  const existing = cache.get(src);
  if (existing) {
    if (existing.status === 'ready') {
      // Defer so a repaint callback can never re-enter the drawable build
      // that is currently calling us (stack overflow via sync recursion).
      queueMicrotask(onReady);
    } else if (existing.status === 'loading') {
      let callbacks = pendingCallbacks.get(src);
      if (!callbacks) {
        callbacks = new Set();
        pendingCallbacks.set(src, callbacks);
      }
      callbacks.add(onReady);
    }
    return;
  }
  const doc = getDocument();
  if (!doc) return;
  cache.set(src, { status: 'loading' });
  const callbacks = new Set<() => void>([onReady]);
  pendingCallbacks.set(src, callbacks);
  const notify = (): void => {
    const waiting = pendingCallbacks.get(src);
    pendingCallbacks.delete(src);
    waiting?.forEach((callback) => {
      try {
        callback();
      } catch {
        // A failing repaint callback must never break image loading.
      }
    });
  };
  const element = doc.createElement('img');
  // Images are decorative graph content; never send page credentials.
  element.referrerPolicy = 'no-referrer';
  element.onload = () => {
    cache.set(src, { status: 'ready', element });
    notify();
  };
  element.onerror = () => {
    cache.set(src, { status: 'error' });
    pendingCallbacks.delete(src);
  };
  element.src = src;
}

/** Forget cached state (used by tests). */
export function clearImageCache(): void {
  cache.clear();
  pendingCallbacks.clear();
}
