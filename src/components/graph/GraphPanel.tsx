/**
 * GraphPanel — the right-hand side of the calculator workspace.
 * Hosts the interactive 2D graph (canvas, toolbar, coordinate readout)
 * inside a graph-specific error boundary so a renderer failure never
 * takes down the rest of the calculator.
 */

import { GraphErrorBoundary } from './GraphErrorBoundary.js';
import { GraphViewport } from './GraphViewport.js';

export function GraphPanel() {
  return (
    <section aria-label="Graph" className="flex h-full flex-col">
      <GraphErrorBoundary>
        <GraphViewport />
      </GraphErrorBoundary>
    </section>
  );
}

export default GraphPanel;
