/**
 * GraphPanel — the right-hand side of the calculator workspace.
 * The real canvas is still to come, so the placeholder is wrapped in an
 * error boundary and renders with zero fake functionality.
 */

import { ErrorBoundary } from '../calculator/ErrorBoundary.js';
import { GraphCanvasPlaceholder } from './GraphCanvasPlaceholder.js';

export function GraphPanel() {
  return (
    <section aria-label="Graph" className="flex h-full flex-col">
      <ErrorBoundary fallbackTitle="Graph failed to load">
        <GraphCanvasPlaceholder />
      </ErrorBoundary>
    </section>
  );
}

export default GraphPanel;
