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
import type { CalculatorShellStrings } from '../../i18n/types.js';

export function ExpressionPanel({ strings }: { strings: CalculatorShellStrings }) {
  const { dispatch } = useCalculator();
  const t = strings.expressions;

  return (
    <Panel
      title={t.panelTitle}
      actions={
        <Button
          size="sm"
          icon={<PlusIcon className="h-4 w-4" />}
          aria-label={t.addAriaLabel}
          onClick={() => dispatch({ type: 'ADD_EXPRESSION', kind: 'cartesian' })}
        >
          {t.add}
        </Button>
      }
    >
      <ErrorBoundary
        fallbackTitle={t.fallbackTitle}
        fallbackMessage={strings.errorFallback.message}
        retryLabel={strings.errorFallback.retry}
      >
        <ExpressionList strings={strings} />
      </ErrorBoundary>
    </Panel>
  );
}

export default ExpressionPanel;
