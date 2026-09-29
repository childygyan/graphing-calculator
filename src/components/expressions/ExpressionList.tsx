/**
 * ExpressionList — the ordered list of expressions in the calculator.
 * Shows an honest empty state when the user has removed every expression.
 */

import { Button } from '../ui/index.js';
import { InfoIcon, PlusIcon } from '../ui/icons.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { ExpressionRow } from './ExpressionRow.js';

export function ExpressionList() {
  const { state, dispatch } = useCalculator();

  if (state.expressions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <InfoIcon className="h-8 w-8 text-slate-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">No expressions yet.</p>
        <Button
          size="sm"
          icon={<PlusIcon className="h-4 w-4" />}
          onClick={() => dispatch({ type: 'ADD_EXPRESSION', kind: 'cartesian' })}
        >
          Add expression
        </Button>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
      {state.expressions.map((expression) => (
        <ExpressionRow
          key={expression.id}
          expression={expression}
          isSelected={state.selectedExpressionId === expression.id}
        />
      ))}
    </ul>
  );
}

export default ExpressionList;
