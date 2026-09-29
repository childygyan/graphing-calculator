/**
 * ExpressionList — the ordered list of expressions in the calculator.
 * Shows an honest empty state when the user has removed every expression.
 * New expressions can be added as cartesian functions, parametric curves,
 * polar curves, inequalities, or points; tables and text notes stay
 * read-only for now.
 */

import { useState } from 'react';
import { Button } from '../ui/index.js';
import { InfoIcon, PlusIcon } from '../ui/icons.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import type { ExpressionKind } from '../../types/calculator.js';
import { ExpressionRow } from './ExpressionRow.js';

/** Expression kinds creatable in Phase 5. */
const ADDABLE_KINDS: Array<{ kind: ExpressionKind; label: string }> = [
  { kind: 'cartesian', label: 'Function y = f(x)' },
  { kind: 'parametric', label: 'Parametric (x(t), y(t))' },
  { kind: 'polar', label: 'Polar r(θ)' },
  { kind: 'inequality', label: 'Inequality' },
  { kind: 'point', label: 'Point' },
];

function AddExpressionControls() {
  const { dispatch } = useCalculator();
  const [kind, setKind] = useState<ExpressionKind>('cartesian');

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="add-expression-kind" className="sr-only">
        Expression type
      </label>
      <select
        id="add-expression-kind"
        value={kind}
        onChange={(event) => setKind(event.target.value as ExpressionKind)}
        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        {ADDABLE_KINDS.map((option) => (
          <option key={option.kind} value={option.kind}>
            {option.label}
          </option>
        ))}
      </select>
      <Button
        size="sm"
        icon={<PlusIcon className="h-4 w-4" />}
        onClick={() => dispatch({ type: 'ADD_EXPRESSION', kind })}
      >
        Add
      </Button>
    </div>
  );
}

export function ExpressionList() {
  const { state } = useCalculator();

  if (state.expressions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <InfoIcon className="h-8 w-8 text-slate-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">No expressions yet.</p>
        <AddExpressionControls />
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {state.expressions.map((expression) => (
          <ExpressionRow
            key={expression.id}
            expression={expression}
            isSelected={state.selectedExpressionId === expression.id}
          />
        ))}
      </ul>
      <div className="flex justify-end px-3 py-3">
        <AddExpressionControls />
      </div>
    </div>
  );
}

export default ExpressionList;
