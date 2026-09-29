/**
 * CalculatorPage — the calculator workspace shell. The only client:load
 * island on the calculator route: toolbar, expression panel, graph panel.
 * Desktop: expression panel left, graph right. Mobile: graph top,
 * expressions bottom.
 */

import { CalculatorProvider } from './CalculatorStore.js';
import { ErrorBoundary } from './ErrorBoundary.js';
import { CalculatorToolbar } from './CalculatorToolbar.js';
import { ExpressionPanel } from './ExpressionPanel.js';
import { VariablePanel } from '../variables/VariablePanel.js';
import { GraphPanel } from '../graph/GraphPanel.js';
import { AiPanel } from '../ai/AiPanel.js';
import { AnalysisPanel } from '../analysis/AnalysisPanel.js';
import { ToastProvider } from '../ui/Toast.js';
import type { GraphDocument } from '../../lib/persistence/document.js';

export interface CalculatorPageProps {
  /** Pre-load the workspace from a document (shared links, imports). */
  initialDocument?: GraphDocument | null;
  /** Disable localStorage persistence (shared `/graph/` route). */
  persistStorage?: boolean;
}

export function CalculatorPage({ initialDocument, persistStorage = true }: CalculatorPageProps) {
  return (
    <CalculatorProvider initialDocument={initialDocument ?? null} persist={persistStorage}>
      <ToastProvider>
        {/* Phase 9: top-level boundary so a render failure in any panel
            degrades to a fallback instead of blanking the whole app. */}
        <ErrorBoundary fallbackTitle="Calculator failed to load">
          <div className="flex h-[calc(100dvh-4rem)] flex-col">
            <CalculatorToolbar />
            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
              <div className="order-2 min-h-0 flex-1 overflow-y-auto border-t border-slate-200 p-3 dark:border-slate-800 md:order-1 md:w-80 md:flex-none md:border-r md:border-t-0">
                <ExpressionPanel />
                <VariablePanel />
                <AiPanel />
                <AnalysisPanel />
              </div>
              <div className="order-1 h-[36dvh] min-h-0 md:order-2 md:h-auto md:flex-1">
                <GraphPanel />
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </ToastProvider>
    </CalculatorProvider>
  );
}

export default CalculatorPage;
