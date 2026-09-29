/**
 * ExpressionRow — one row of the expression list: color dot, selectable
 * label, an editable definition for cartesian expressions (a read-only
 * summary for other kinds), plus visibility-toggle and delete buttons.
 */

import { Button } from '../ui/index.js';
import { TextInput } from '../ui/index.js';
import { EyeIcon, EyeOffIcon, TrashIcon } from '../ui/icons.js';
import { cn } from '../../lib/utils/cn.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { getExpressionSummary } from '../../lib/expressions/expressions.js';
import type { Expression } from '../../types/calculator.js';

export interface ExpressionRowProps {
  expression: Expression;
  isSelected: boolean;
}

export function ExpressionRow({ expression, isSelected }: ExpressionRowProps) {
  const { dispatch } = useCalculator();

  return (
    <li
      aria-current={isSelected || undefined}
      className={cn(
        'flex items-start gap-3 px-3 py-3',
        isSelected && 'bg-brand-50 dark:bg-slate-800/60'
      )}
    >
      <span
        style={{ backgroundColor: expression.color }}
        className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => dispatch({ type: 'SELECT_EXPRESSION', id: expression.id })}
          className="rounded text-left text-sm font-medium text-slate-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 dark:text-slate-100"
        >
          {expression.label}
        </button>
        {expression.kind === 'cartesian' ? (
          <div className="mt-1 flex items-center gap-2">
            <span aria-hidden="true" className="shrink-0 font-mono text-sm text-slate-500">
              y =
            </span>
            <TextInput
              label={`Edit ${expression.label} definition`}
              value={expression.definition.rhs}
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
        ) : (
          <p className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-300">
            {getExpressionSummary(expression)}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1">
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
