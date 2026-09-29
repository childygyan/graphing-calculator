/**
 * SharedGraphLoader — the client island for the `/graph/` route. Reads a
 * share payload from the URL hash (`#s=…`), decodes and validates it, then
 * mounts the calculator pre-loaded with the shared document.
 *
 * The route never writes to the visitor's local draft (persistStorage is
 * off) and is served with `noindex, nofollow`. Invalid links get an honest
 * error, never a crash and never a silent empty graph.
 */

import { useEffect, useState } from 'react';
import { CalculatorPage } from '../calculator/CalculatorPage.js';
import type { GraphDocument } from '../../lib/persistence/document.js';
import { decodeSharedDocumentFromHash } from '../../lib/persistence/share.js';

type LoaderState =
  | { status: 'loading' }
  | { status: 'ready'; document: GraphDocument }
  | { status: 'error'; error: string };

export function SharedGraphLoader() {
  const [loaderState, setLoaderState] = useState<LoaderState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    decodeSharedDocumentFromHash(window.location.hash)
      .then((result) => {
        if (cancelled) return;
        if (result === null) {
          setLoaderState({
            status: 'error',
            error: 'This link does not contain a shared graph.',
          });
          return;
        }
        if (result.ok) {
          setLoaderState({ status: 'ready', document: result.document });
        } else {
          setLoaderState({ status: 'error', error: result.error });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoaderState({ status: 'error', error: 'The shared graph could not be opened.' });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loaderState.status === 'loading') {
    return (
      <div className="flex h-[calc(100dvh-4rem)] items-center justify-center">
        <p className="text-sm text-slate-600 dark:text-slate-400" role="status">
          Opening the shared graph…
        </p>
      </div>
    );
  }

  if (loaderState.status === 'error') {
    return (
      <div className="flex h-[calc(100dvh-4rem)] items-center justify-center p-6">
        <div className="max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Couldn&apos;t open this shared graph
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{loaderState.error}</p>
          <a
            href="/graphing-calculator/"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Open the graphing calculator
          </a>
        </div>
      </div>
    );
  }

  return <CalculatorPage initialDocument={loaderState.document} persistStorage={false} />;
}

export default SharedGraphLoader;
