/**
 * Outbound transfer helpers: file downloads, PNG export of the graph
 * canvas, and clipboard copying with an honest fallback.
 */

import type { GraphDocument } from './document.js';

/** Single-slot registry so the toolbar (far from the canvas in the tree)
 * can reach the live canvas for PNG export. Registered by GraphViewport;
 * unregistered on unmount. */
let canvasGetter: (() => HTMLCanvasElement | null) | null = null;

/** Register the live graph canvas getter; returns an unregister function. */
export function registerGraphCanvas(getter: () => HTMLCanvasElement | null): () => void {
  canvasGetter = getter;
  return () => {
    if (canvasGetter === getter) canvasGetter = null;
  };
}

/** The currently registered graph canvas, if any. */
export function getRegisteredCanvas(): HTMLCanvasElement | null {
  try {
    return canvasGetter?.() ?? null;
  } catch {
    return null;
  }
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Download a graph document as a `.json` file. */
export function downloadDocumentJson(document: GraphDocument): void {
  const json = JSON.stringify(document, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const safeName =
    (document.name ?? 'graph')
      .replace(/[^\w\- ]+/g, '')
      .trim()
      .slice(0, 40) || 'graph';
  downloadBlob(blob, `${safeName}-${stamp}.json`);
}

export type PngExportResult = { ok: true } | { ok: false; error: string };

/**
 * Export the current graph canvas as a PNG, rendered offscreen at 2x the
 * on-screen size. The source canvas already renders at device pixel ratio,
 * so upscaling the bitmap 2x is a faithful enlargement, not a re-render.
 */
export function exportGraphPng(scale = 2): Promise<PngExportResult> {
  const source = getRegisteredCanvas();
  if (!source) {
    return Promise.resolve({ ok: false, error: 'The graph canvas is not available yet.' });
  }
  const width = Math.floor(source.clientWidth * scale);
  const height = Math.floor(source.clientHeight * scale);
  if (!(width > 0 && height > 0)) {
    return Promise.resolve({ ok: false, error: 'The graph has no size to export.' });
  }
  return new Promise((resolve) => {
    try {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const context = offscreen.getContext('2d');
      if (!context) {
        resolve({ ok: false, error: 'Could not create an export canvas.' });
        return;
      }
      const dark = document.documentElement.classList.contains('dark');
      context.fillStyle = dark ? '#020617' : '#ffffff';
      context.fillRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(source, 0, 0, width, height);
      offscreen.toBlob((blob) => {
        if (!blob) {
          resolve({ ok: false, error: 'PNG encoding failed.' });
          return;
        }
        try {
          const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
          downloadBlob(blob, `graph-${stamp}.png`);
          resolve({ ok: true });
        } catch {
          resolve({ ok: false, error: 'The download could not start.' });
        }
      }, 'image/png');
    } catch {
      resolve({ ok: false, error: 'PNG export failed unexpectedly.' });
    }
  });
}

/**
 * Copy text to the clipboard. Uses the async Clipboard API when available
 * (requires a secure context); falls back to a hidden textarea +
 * execCommand. Returns false when neither works.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path.
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const succeeded = document.execCommand('copy');
    textarea.remove();
    return succeeded;
  } catch {
    return false;
  }
}
