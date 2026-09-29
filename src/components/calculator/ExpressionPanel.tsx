/**
 * ExpressionPanel — the left-hand column of the calculator workspace:
 * the expression list plus an add button, with an error boundary so a
 * list failure never takes down the whole page.
 */

import { Button } from '../ui/index.js';
import { Panel } from '../ui/index.js';
import { PlusIcon } from '../ui/icons.js';
import { useCalculator } from './CalculatorStore.js';
import { ErrorBoundary } from './ErrorBoundary.js';
import { ExpressionList } from '../expressions/ExpressionList.js';

export function ExpressionPanel() {
  const { dispatch } = useCalculator();

  return (
    <Panel
      title="Expressions"
      actions={
        <Button
          size="sm"
          icon={<PlusIcon className="h-4 w-4" />}
          aria-label="Add expression"
          onClick={() => dispatch({ type: 'ADD_EXPRESSION', kind: 'cartesian' })}
        >
          Add
        </Button>
      }
    >
      <ErrorBoundary fallbackTitle="Expression list failed to load">
        <ExpressionList />
      </ErrorBoundary>
    </Panel>
  );
}

export default ExpressionPanel;
