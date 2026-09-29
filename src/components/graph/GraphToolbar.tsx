/**
 * GraphToolbar — compact icon-only toolbar floating over the graph canvas.
 * Zoom in/out, reset, fit, and grid/axes visibility toggles. Every action
 * dispatches to the calculator store; GraphViewport's sync effect applies
 * the new viewport to the live renderer.
 */

import type { ReactNode } from 'react';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { fitViewportToDrawables, zoomViewport } from '../../lib/graph/viewport.js';
import type { GraphDrawable } from '../../lib/graph/types.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';
import {
  AxesIcon,
  FitViewIcon,
  GridIcon,
  MinusIcon,
  PlusIcon,
  ResetViewIcon,
} from '../ui/icons.js';

const TOOLBAR_BUTTON_CLASSES =
  'flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition-colors ' +
  'hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white';

const TOOLBAR_BUTTON_ACTIVE_CLASSES =
  'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white';

interface ToolbarButtonProps {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: ReactNode;
}

function ToolbarButton({ label, pressed, onClick, children }: ToolbarButtonProps) {
  const activeClasses = pressed === true ? ` ${TOOLBAR_BUTTON_ACTIVE_CLASSES}` : '';
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`${TOOLBAR_BUTTON_CLASSES}${activeClasses}`}
    >
      {children}
    </button>
  );
}

export function GraphToolbar({
  getDrawables,
  strings,
}: {
  /** Builds the current drawables (used by Fit view). Defaults to none. */
  getDrawables?: () => GraphDrawable[];
  strings: CalculatorShellStrings;
}) {
  const { state, dispatch } = useCalculator();
  const t = strings.graph;

  return (
    <div
      role="toolbar"
      aria-label={t.toolbarLabel}
      className="flex gap-1 rounded-lg border border-slate-200 bg-white/90 p-1 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
    >
      <ToolbarButton
        label={t.zoomIn}
        onClick={() =>
          dispatch({ type: 'SET_VIEWPORT', viewport: zoomViewport(state.viewport, 0.8) })
        }
      >
        <PlusIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label={t.zoomOut}
        onClick={() =>
          dispatch({ type: 'SET_VIEWPORT', viewport: zoomViewport(state.viewport, 1.25) })
        }
      >
        <MinusIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton label={t.resetView} onClick={() => dispatch({ type: 'RESET_VIEWPORT' })}>
        <ResetViewIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label={t.fitView}
        onClick={() =>
          dispatch({
            type: 'SET_VIEWPORT',
            viewport: fitViewportToDrawables(getDrawables?.() ?? [], state.viewport),
          })
        }
      >
        <FitViewIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label={t.toggleGrid}
        pressed={state.settings.showGrid}
        onClick={() =>
          dispatch({ type: 'UPDATE_SETTINGS', patch: { showGrid: !state.settings.showGrid } })
        }
      >
        <GridIcon className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        label={t.toggleAxes}
        pressed={state.settings.showAxes}
        onClick={() =>
          dispatch({ type: 'UPDATE_SETTINGS', patch: { showAxes: !state.settings.showAxes } })
        }
      >
        <AxesIcon className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
}

export default GraphToolbar;
