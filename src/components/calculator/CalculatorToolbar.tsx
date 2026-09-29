/**
 * CalculatorToolbar — top action bar for the calculator workspace:
 * add expressions, zoom the viewport, reset the view.
 */

import { Button } from '../ui/index.js';
import { PlusIcon } from '../ui/icons.js';
import { useCalculator } from './CalculatorStore.js';
import { PersistenceControls } from '../persistence/PersistenceControls.js';
import { zoomViewport } from '../../lib/graph/viewport.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';

export function CalculatorToolbar({ strings }: { strings: CalculatorShellStrings }) {
  const { state, dispatch } = useCalculator();
  const t = strings.toolbar;

  return (
    <div
      role="toolbar"
      aria-label={t.regionLabel}
      className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-3 py-2 dark:border-slate-800"
    >
      <span className="hidden text-sm font-semibold text-slate-900 dark:text-slate-100 sm:inline">
        {t.title}
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="sm"
          icon={<PlusIcon className="h-4 w-4" />}
          onClick={() => dispatch({ type: 'ADD_EXPRESSION', kind: 'cartesian' })}
        >
          {t.addExpression}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t.zoomIn}
          onClick={() =>
            dispatch({ type: 'SET_VIEWPORT', viewport: zoomViewport(state.viewport, 0.8) })
          }
        >
          {t.zoomIn}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t.zoomOut}
          onClick={() =>
            dispatch({ type: 'SET_VIEWPORT', viewport: zoomViewport(state.viewport, 1.25) })
          }
        >
          {t.zoomOut}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'RESET_VIEWPORT' })}>
          {t.resetView}
        </Button>
      </div>
      <div className="ml-auto">
        <PersistenceControls strings={strings.persistence} />
      </div>
    </div>
  );
}

export default CalculatorToolbar;
