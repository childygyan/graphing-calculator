/**
 * ExpressionRow — one row of the expression list: color swatch (native
 * color picker), selectable/renameable label, an editable definition for
 * cartesian and point expressions (a read-only summary for other kinds),
 * inline validation feedback, plus duplicate, visibility-toggle and
 * delete buttons.
 */

import { useMemo, useState } from 'react';
import { Button } from '../ui/index.js';
import { TextInput } from '../ui/index.js';
import { DuplicateIcon, EyeIcon, EyeOffIcon, PencilIcon, TrashIcon } from '../ui/icons.js';
import { cn } from '../../lib/utils/cn.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { getExpressionSummary } from '../../lib/expressions/expressions.js';
import { validateExpressionSource } from '../../lib/math/engine.js';
import type { Expression } from '../../types/calculator.js';

export interface ExpressionRowProps {
  expression: Expression;
  isSelected: boolean;
}

/** Validation error for a definition field, or null when it is fine. */
function useDefinitionError(source: string): string | null {
  return useMemo(() => {
    if (source.trim() === '') return null;
    const result = validateExpressionSource(source);
    if (result.valid) return null;
    return result.issues[0]?.message ?? 'Invalid expression';
  }, [source]);
}

function updateExpression(
  expression: Expression,
  patch: Partial<Expression>,
  dispatch: ReturnType<typeof useCalculator>['dispatch']
): void {
  dispatch({
    type: 'UPDATE_EXPRESSION',
    expression: { ...expression, ...patch, updatedAt: Date.now() } as Expression,
  });
}

export function ExpressionRow({ expression, isSelected }: ExpressionRowProps) {
  const { dispatch } = useCalculator();
  const [renaming, setRenaming] = useState(false);

  const cartesianRhs = expression.kind === 'cartesian' ? expression.definition.rhs : '';
  const pointX = expression.kind === 'point' ? expression.definition.x : '';
  const pointY = expression.kind === 'point' ? expression.definition.y : '';
  const rhsError = useDefinitionError(cartesianRhs);
  const pointXError = useDefinitionError(pointX);
  const pointYError = useDefinitionError(pointY);

  const setColor = (color: string): void => {
    updateExpression(expression, { color }, dispatch);
  };

  return (
    <li
      aria-current={isSelected || undefined}
      className={cn(
        'flex items-start gap-3 px-3 py-3',
        isSelected && 'bg-brand-50 dark:bg-slate-800/60'
      )}
    >
      <label className="mt-1.5 shrink-0 cursor-pointer" title={`Change ${expression.label} color`}>
        <span className="sr-only">{`Change ${expression.label} color`}</span>
        <input
          type="color"
          value={expression.color}
          onChange={(event) => setColor(event.target.value)}
          className="h-6 w-8 cursor-pointer rounded border border-slate-300 bg-transparent p-0 dark:border-slate-600"
        />
      </label>
      <div className="min-w-0 flex-1">
        {renaming ? (
          <div>
            <label htmlFor={`rename-${expression.id}`} className="sr-only">
              {`Rename ${expression.label}`}
            </label>
            <input
              id={`rename-${expression.id}`}
              type="text"
              value={expression.label}
              autoFocus
              onChange={(event) =>
                updateExpression(expression, { label: event.target.value }, dispatch)
              }
              onBlur={() => setRenaming(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Escape') setRenaming(false);
              }}
              className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => dispatch({ type: 'SELECT_EXPRESSION', id: expression.id })}
              className="rounded text-left text-sm font-medium text-slate-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 dark:text-slate-100"
            >
              {expression.label}
            </button>
            <Button
              size="sm"
              variant="ghost"
              icon={<PencilIcon className="h-3.5 w-3.5" />}
              aria-label={`Rename ${expression.label}`}
              onClick={() => setRenaming(true)}
            />
          </div>
        )}
        {expression.kind === 'cartesian' ? (
          <div className="mt-1 flex items-center gap-2">
            <span aria-hidden="true" className="shrink-0 font-mono text-sm text-slate-500">
              y =
            </span>
            <TextInput
              label={`Edit ${expression.label} definition`}
              value={expression.definition.rhs}
              error={rhsError ?? undefined}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_EXPRESSION',
                  expression: {
                    ...expression,
                    definition: { ...expression.definition, rhs: value },
                    updatedAt: Date.now(),
                  },
                })
              }
              inputClassName="font-mono"
            />
          </div>
        ) : expression.kind === 'point' ? (
          <div className="mt-1 grid grid-cols-2 gap-2">
            <TextInput
              label="x coordinate"
              value={expression.definition.x}
              error={pointXError ?? undefined}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_EXPRESSION',
                  expression: {
                    ...expression,
                    definition: { ...expression.definition, x: value },
                    updatedAt: Date.now(),
                  },
                })
              }
              inputClassName="font-mono"
            />
            <TextInput
              label="y coordinate"
              value={expression.definition.y}
              error={pointYError ?? undefined}
              onChange={(value) =>
                dispatch({
                  type: 'UPDATE_EXPRESSION',
                  expression: {
                    ...expression,
                    definition: { ...expression.definition, y: value },
                    updatedAt: Date.now(),
                  },
                })
              }
              inputClassName="font-mono"
            />
          </div>
        ) : (
          <p className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-300">
            {getExpressionSummary(expression)}
          </p>
        )}
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-1">
        <Button
          size="sm"
          variant="ghost"
          icon={<DuplicateIcon className="h-4 w-4" />}
          aria-label={`Duplicate ${expression.label}`}
          onClick={() => dispatch({ type: 'DUPLICATE_EXPRESSION', id: expression.id })}
        />
        <Button
          size="sm"
          variant="ghost"
          icon={
            expression.visible ? (
              <EyeIcon className="h-4 w-4" />
            ) : (
              <EyeOffIcon className="h-4 w-4" />
            )
          }
          aria-pressed={expression.visible}
          aria-label={expression.visible ? 'Hide expression' : 'Show expression'}
          onClick={() => dispatch({ type: 'TOGGLE_EXPRESSION_VISIBILITY', id: expression.id })}
        />
        <Button
          size="sm"
          variant="ghost"
          icon={<TrashIcon className="h-4 w-4" />}
          aria-label={`Delete ${expression.label}`}
          onClick={() => dispatch({ type: 'REMOVE_EXPRESSION', id: expression.id })}
        />
      </div>
    </li>
  );
}

export default ExpressionRow;
