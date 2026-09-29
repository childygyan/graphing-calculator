/**
 * InspectedPointCard — floating readout for the curve point selected by
 * tapping the graph. Shows the (x, y) coordinate and offers one-tap
 * actions: draw the tangent there, or drop a text annotation.
 */

import { useState } from 'react';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { Button } from '../ui/Button.js';
import { formatNumber } from '../../lib/math/format.js';
import { createExpressionId } from '../../lib/expressions/expressions.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';

export function InspectedPointCard({ strings }: { strings: CalculatorShellStrings }) {
  const { state, dispatch } = useCalculator();
  const [label, setLabel] = useState('');
  const t = strings.graph;
  const point = state.inspectedPoint;

  if (!point) return null;
  const expression = state.expressions.find((e) => e.id === point.expressionId);
  const precision = state.analysis.precision;
  const formatted = `(${formatNumber(point.x, precision)}, ${formatNumber(point.y, precision)})`;

  const addTangent = (): void => {
    dispatch({
      type: 'ADD_TANGENT',
      tangent: {
        id: createExpressionId(),
        expressionId: point.expressionId,
        x: point.x,
        showTangent: true,
        showNormal: false,
        visible: true,
      },
    });
  };

  const addAnnotation = (): void => {
    const trimmed = label.trim().slice(0, 120);
    dispatch({
      type: 'ADD_ANNOTATION',
      annotation: {
        id: createExpressionId(),
        x: point.x,
        y: point.y,
        label: trimmed.length > 0 ? trimmed : formatted,
        color: expression?.color ?? '#0f172a',
        visible: true,
      },
    });
    setLabel('');
  };

  return (
    <div
      role="status"
      aria-label={t.inspectedPoint}
      className="absolute bottom-2 left-2 z-10 w-64 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: expression?.color ?? '#64748b' }}
            />
            <span className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
              {expression?.label ?? t.unknownCurveLabel}
            </span>
          </div>
          <div className="mt-0.5 font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
            {formatted}
          </div>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_INSPECTED_POINT', point: null })}
          aria-label={t.dismissInspectedPoint}
          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
        >
          ×
        </button>
      </div>
      <div className="mt-2 flex gap-2">
        <Button size="sm" variant="secondary" onClick={addTangent}>
          {t.tangentButton}
        </Button>
        <div className="flex min-w-0 flex-1 gap-1">
          <input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder={t.notePlaceholder}
            aria-label={t.noteAriaLabel}
            maxLength={120}
            className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <Button size="sm" variant="secondary" onClick={addAnnotation}>
            {t.noteButton}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InspectedPointCard;
