/**
 * GraphCanvasPlaceholder — an honest, labeled placeholder for the 2D graph
 * renderer, which lands in the next phase. Shows the live viewport readout
 * and the visible-expression count so the shell feels real without faking
 * functionality.
 */

import { LineChartIcon } from '../ui/icons.js';
import { useCalculator } from '../calculator/CalculatorStore.js';

/** Format a number with up to 4 significant digits (drops trailing zeros). */
function formatNumber(value: number): string {
  return String(Number(value.toPrecision(4)));
}

export function GraphCanvasPlaceholder() {
  const { state } = useCalculator();
  const { viewport, expressions } = state;
  const visibleCount = expressions.filter((expression) => expression.visible).length;
  const expressionWord = expressions.length === 1 ? 'expression' : 'expressions';

  return (
    <div
      aria-label="Graph placeholder"
      className="flex h-full flex-1 items-center justify-center p-4"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
        <LineChartIcon className="h-10 w-10 text-slate-400" />
        <p className="font-medium text-slate-900 dark:text-slate-100">Interactive graph</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The 2D graph renderer arrives in the next phase.
        </p>
        <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
          x: [{formatNumber(viewport.xMin)}, {formatNumber(viewport.xMax)}] &middot; y: [
          {formatNumber(viewport.yMin)}, {formatNumber(viewport.yMax)}]
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {visibleCount} of {expressions.length} {expressionWord} visible
        </p>
      </div>
    </div>
  );
}

export default GraphCanvasPlaceholder;
