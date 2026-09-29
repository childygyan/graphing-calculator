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
import { ErrorBoundary } from '../calculator/ErrorBoundary.js';
import type { GraphDocument } from '../../lib/persistence/document.js';
import { decodeSharedDocumentFromHash } from '../../lib/persistence/share.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';

type LoaderState =
  | { status: 'loading' }
  | { status: 'ready'; document: GraphDocument }
  | { status: 'error'; error: string };

export function SharedGraphLoader({ strings }: { strings: CalculatorShellStrings }) {
  const [loaderState, setLoaderState] = useState<LoaderState>({ status: 'loading' });
  const t = strings.persistence.shared;

  useEffect(() => {
    let cancelled = false;
    decodeSharedDocumentFromHash(window.location.hash)
      .then((result) => {
        if (cancelled) return;
        if (result === null) {
          setLoaderState({
            status: 'error',
            error: t.noGraph,
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
          setLoaderState({ status: 'error', error: t.openFailed });
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
          {t.opening}
        </p>
      </div>
    );
  }

  if (loaderState.status === 'error') {
    return (
      <div className="flex h-[calc(100dvh-4rem)] items-center justify-center p-6">
        <div className="max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {t.heading}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{loaderState.error}</p>
          <a
            href="/graphing-calculator/"
            className="mt-4 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            {t.openCalculator}
          </a>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallbackTitle={t.fallbackTitle}
      fallbackMessage={strings.errorFallback.message}
      retryLabel={strings.errorFallback.retry}
    >
      <CalculatorPage
        initialDocument={loaderState.document}
        persistStorage={false}
        strings={strings}
      />
    </ErrorBoundary>
  );
}

export default SharedGraphLoader;
