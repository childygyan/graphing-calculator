/**
 * CalculatorToolbar — top action bar for the calculator workspace:
 * add expressions, zoom the viewport, reset the view.
 */

import { Button } from '../ui/index.js';
import { PlusIcon } from '../ui/icons.js';
import { useCalculator } from './CalculatorStore.js';
import { zoomViewport } from '../../lib/graph/viewport.js';

export function CalculatorToolbar() {
  const { state, dispatch } = useCalculator();

  return (
    <div
      role="toolbar"
      aria-label="Calculator actions"
      className="flex items-center gap-2 border-b border-slate-200 px-3 py-2 dark:border-slate-800"
    >
      <span className="hidden text-sm font-semibold text-slate-900 dark:text-slate-100 sm:inline">
        Graphing calculator
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          icon={<PlusIcon className="h-4 w-4" />}
          onClick={() => dispatch({ type: 'ADD_EXPRESSION', kind: 'cartesian' })}
        >
          Add expression
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Zoom in"
          onClick={() =>
            dispatch({ type: 'SET_VIEWPORT', viewport: zoomViewport(state.viewport, 0.8) })
          }
        >
          Zoom in
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Zoom out"
          onClick={() =>
            dispatch({ type: 'SET_VIEWPORT', viewport: zoomViewport(state.viewport, 1.25) })
          }
        >
          Zoom out
        </Button>
        <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'RESET_VIEWPORT' })}>
          Reset view
        </Button>
      </div>
    </div>
  );
}

export default CalculatorToolbar;
