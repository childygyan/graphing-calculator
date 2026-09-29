/**
 * GraphPanel — the right-hand side of the calculator workspace.
 * Hosts the interactive 2D graph (canvas, toolbar, coordinate readout)
 * inside a graph-specific error boundary so a renderer failure never
 * takes down the rest of the calculator.
 */

import { GraphErrorBoundary } from './GraphErrorBoundary.js';
import { GraphViewport } from './GraphViewport.js';
import { InspectedPointCard } from './InspectedPointCard.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';

export function GraphPanel({ strings }: { strings: CalculatorShellStrings }) {
  return (
    <section aria-label={strings.graph.regionLabel} className="flex h-full flex-col">
      <GraphErrorBoundary
        strings={{
          title: strings.graph.loadErrorTitle,
          message: strings.graph.loadErrorMessage,
          retry: strings.graph.reloadGraph,
        }}
      >
        <div className="relative h-full w-full">
          <GraphViewport strings={strings} />
          <InspectedPointCard strings={strings} />
        </div>
      </GraphErrorBoundary>
    </section>
  );
}

export default GraphPanel;
