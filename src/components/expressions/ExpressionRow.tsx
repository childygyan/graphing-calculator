/**
 * ExpressionRow — one row of the expression list: color swatch (native
 * color picker), selectable/renameable label, a per-kind type selector,
 * editable definitions for cartesian / parametric / polar / inequality /
 * point expressions (a read-only summary for other kinds), inline
 * validation feedback (syntax errors plus undefined-variable errors
 * against the Variables panel), plus duplicate, visibility-toggle and
 * delete buttons.
 */

import { useMemo, useState } from 'react';
import { Button } from '../ui/index.js';
import { TextInput } from '../ui/index.js';
import { DuplicateIcon, EyeIcon, EyeOffIcon, PencilIcon, TrashIcon } from '../ui/icons.js';
import { cn } from '../../lib/utils/cn.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { createExpression, getExpressionSummary } from '../../lib/expressions/expressions.js';
import { definedVariableNames, validateExpressionWithVariables } from '../../lib/math/variables.js';
import type { Expression, ExpressionKind, InequalityOperator } from '../../types/calculator.js';

export interface ExpressionRowProps {
  expression: Expression;
  isSelected: boolean;
}

/** Bound parameter name for an expression's definition fields. */
function parameterFor(expression: Expression): string {
  switch (expression.kind) {
    case 'parametric':
      return 't';
    case 'polar':
      return 'theta';
    case 'inequality':
      return expression.definition.lhs.trim().toLowerCase() === 'x' ? 'y' : 'x';
    default:
      return 'x';
  }
}

/** Validation error for a definition field, or null when it is fine. */
function useDefinitionError(source: string, parameter: string): string | null {
  const { state } = useCalculator();
  return useMemo(() => {
    if (source.trim() === '') return null;
    return validateExpressionWithVariables(
      source,
      parameter,
      definedVariableNames(state.variables)
    );
  }, [source, parameter, state.variables]);
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

/** Switch an expression to a new kind, keeping its identity and style. */
function changeExpressionKind(
  expression: Expression,
  kind: ExpressionKind,
  dispatch: ReturnType<typeof useCalculator>['dispatch']
): void {
  if (expression.kind === kind) return;
  const fresh = createExpression(kind);
  dispatch({
    type: 'UPDATE_EXPRESSION',
    expression: {
      ...expression,
      kind,
      definition: fresh.definition,
      updatedAt: Date.now(),
    } as Expression,
  });
}

const KIND_OPTIONS: Array<{ kind: ExpressionKind; label: string }> = [
  { kind: 'cartesian', label: 'y = f(x)' },
  { kind: 'parametric', label: 'Parametric' },
  { kind: 'polar', label: 'Polar' },
  { kind: 'inequality', label: 'Inequality' },
  { kind: 'point', label: 'Point' },
];

const INEQUALITY_OPERATORS: Array<{ value: InequalityOperator; label: string }> = [
  { value: '<', label: '<' },
  { value: '<=', label: '≤' },
  { value: '>', label: '>' },
  { value: '>=', label: '≥' },
];

const selectClassName =
  'rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

export function ExpressionRow({ expression, isSelected }: ExpressionRowProps) {
  const { dispatch } = useCalculator();
  const [renaming, setRenaming] = useState(false);
  const parameter = parameterFor(expression);

  const cartesianRhs = expression.kind === 'cartesian' ? expression.definition.rhs : '';
  const pointX = expression.kind === 'point' ? expression.definition.x : '';
  const pointY = expression.kind === 'point' ? expression.definition.y : '';
  const paramXT = expression.kind === 'parametric' ? expression.definition.xOfT : '';
  const paramYT = expression.kind === 'parametric' ? expression.definition.yOfT : '';
  const paramTMin = expression.kind === 'parametric' ? expression.definition.tMin : '';
  const paramTMax = expression.kind === 'parametric' ? expression.definition.tMax : '';
  const polarR = expression.kind === 'polar' ? expression.definition.rOfTheta : '';
  const ineqRhs = expression.kind === 'inequality' ? expression.definition.rhs : '';

  const rhsError = useDefinitionError(cartesianRhs, 'x');
  const pointXError = useDefinitionError(pointX, 'x');
  const pointYError = useDefinitionError(pointY, 'x');
  const paramXTError = useDefinitionError(paramXT, 't');
  const paramYTError = useDefinitionError(paramYT, 't');
  const paramTMinError = useDefinitionError(paramTMin, 't');
  const paramTMaxError = useDefinitionError(paramTMax, 't');
  const polarRError = useDefinitionError(polarR, 'theta');
  const ineqRhsError = useDefinitionError(ineqRhs, parameter);

  const setColor = (color: string): void => {
    updateExpression(expression, { color }, dispatch);
  };

  const setDefinition = (definition: Expression['definition']): void => {
    updateExpression(expression, { definition } as Partial<Expression>, dispatch);
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
        <div className="mt-1.5">
          <label htmlFor={`kind-${expression.id}`} className="sr-only">
            {`Change ${expression.label} type`}
          </label>
          <select
            id={`kind-${expression.id}`}
            value={expression.kind}
            onChange={(event) =>
              changeExpressionKind(expression, event.target.value as ExpressionKind, dispatch)
            }
            className={cn(selectClassName, 'text-xs')}
            aria-label={`Change ${expression.label} type`}
          >
            {KIND_OPTIONS.map((option) => (
              <option key={option.kind} value={option.kind}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {expression.kind === 'cartesian' ? (
          <div className="mt-1 flex items-center gap-2">
            <span aria-hidden="true" className="shrink-0 font-mono text-sm text-slate-500">
              y =
            </span>
            <TextInput
              label={`Edit ${expression.label} definition`}
              value={expression.definition.rhs}
              error={rhsError ?? undefined}
              onChange={(value) => setDefinition({ ...expression.definition, rhs: value })}
              inputClassName="font-mono"
            />
          </div>
        ) : expression.kind === 'parametric' ? (
          <div className="mt-1 space-y-2">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="shrink-0 font-mono text-sm text-slate-500">
                x =
              </span>
              <TextInput
                label="x(t) definition"
                value={expression.definition.xOfT}
                error={paramXTError ?? undefined}
                onChange={(value) => setDefinition({ ...expression.definition, xOfT: value })}
                inputClassName="font-mono"
              />
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="shrink-0 font-mono text-sm text-slate-500">
                y =
              </span>
              <TextInput
                label="y(t) definition"
                value={expression.definition.yOfT}
                error={paramYTError ?? undefined}
                onChange={(value) => setDefinition({ ...expression.definition, yOfT: value })}
                inputClassName="font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                label="t min"
                value={expression.definition.tMin}
                error={paramTMinError ?? undefined}
                onChange={(value) => setDefinition({ ...expression.definition, tMin: value })}
                inputClassName="font-mono"
              />
              <TextInput
                label="t max"
                value={expression.definition.tMax}
                error={paramTMaxError ?? undefined}
                onChange={(value) => setDefinition({ ...expression.definition, tMax: value })}
                inputClassName="font-mono"
              />
            </div>
          </div>
        ) : expression.kind === 'polar' ? (
          <div className="mt-1 flex items-center gap-2">
            <span aria-hidden="true" className="shrink-0 font-mono text-sm text-slate-500">
              r =
            </span>
            <TextInput
              label={`Edit ${expression.label} definition`}
              value={expression.definition.rOfTheta}
              error={polarRError ?? undefined}
              hint="θ from 0 to 2π — type theta or θ"
              onChange={(value) => setDefinition({ ...expression.definition, rOfTheta: value })}
              inputClassName="font-mono"
            />
          </div>
        ) : expression.kind === 'inequality' ? (
          <div className="mt-1 flex items-center gap-2">
            <label className="sr-only" htmlFor={`ineq-lhs-${expression.id}`}>
              Inequality side
            </label>
            <select
              id={`ineq-lhs-${expression.id}`}
              value={expression.definition.lhs}
              onChange={(event) =>
                setDefinition({ ...expression.definition, lhs: event.target.value })
              }
              className={selectClassName}
            >
              <option value="y">y</option>
              <option value="x">x</option>
            </select>
            <label className="sr-only" htmlFor={`ineq-op-${expression.id}`}>
              Inequality operator
            </label>
            <select
              id={`ineq-op-${expression.id}`}
              value={expression.definition.operator}
              onChange={(event) =>
                setDefinition({
                  ...expression.definition,
                  operator: event.target.value as InequalityOperator,
                })
              }
              className={selectClassName}
            >
              {INEQUALITY_OPERATORS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <TextInput
              label={`Edit ${expression.label} definition`}
              value={expression.definition.rhs}
              error={ineqRhsError ?? undefined}
              onChange={(value) => setDefinition({ ...expression.definition, rhs: value })}
              inputClassName="font-mono"
            />
          </div>
        ) : expression.kind === 'point' ? (
          <div className="mt-1 grid grid-cols-2 gap-2">
            <TextInput
              label="x coordinate"
              value={expression.definition.x}
              error={pointXError ?? undefined}
              onChange={(value) => setDefinition({ ...expression.definition, x: value })}
              inputClassName="font-mono"
            />
            <TextInput
              label="y coordinate"
              value={expression.definition.y}
              error={pointYError ?? undefined}
              onChange={(value) => setDefinition({ ...expression.definition, y: value })}
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
