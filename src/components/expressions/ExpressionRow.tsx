/**
 * ExpressionRow — one row of the expression list: color swatch (native
 * color picker), selectable/renameable label, a per-kind type selector,
 * editable definitions for cartesian / parametric / polar / inequality /
 * point expressions (a read-only summary for other kinds), inline
 * validation feedback (syntax errors plus undefined-variable errors
 * against the Variables panel), plus duplicate, visibility-toggle and
 * delete buttons.
 */

import { useMemo, useRef, useState } from 'react';
import { Button } from '../ui/index.js';
import { TextInput } from '../ui/index.js';
import {
  BoltIcon,
  ChevronDownIcon,
  DuplicateIcon,
  EyeIcon,
  EyeOffIcon,
  FolderIcon,
  ImageIcon,
  NoteIcon,
  PencilIcon,
  PlayIcon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
} from '../ui/icons.js';
import { cn } from '../../lib/utils/cn.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { createExpression, getExpressionSummary } from '../../lib/expressions/expressions.js';
import {
  CARTESIAN_PARAMETER,
  definedVariableNames,
  normalizeVariableName,
  validateExpressionWithVariables,
  validateVariableName,
  VariableEnvironment,
} from '../../lib/math/variables.js';
import { compileExpressionScoped } from '../../lib/math/engine.js';
import { isAllowedImageSrc } from '../../lib/graph/images.js';
import {
  findParentFolder,
  getFolderChildren,
  isFolderExpression,
} from '../../lib/expressions/folders.js';
import type {
  ActionAssignment,
  Expression,
  ExpressionKind,
  InequalityOperator,
} from '../../types/calculator.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';
import { format } from '../../i18n/locales.js';

export interface ExpressionRowProps {
  expression: Expression;
  isSelected: boolean;
  strings: CalculatorShellStrings;
  /** Nested child rows (used for expanded folders). */
  nestedContent?: React.ReactNode;
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

const INEQUALITY_OPERATORS: Array<{ value: InequalityOperator; label: string }> = [
  { value: '<', label: '<' },
  { value: '<=', label: '≤' },
  { value: '>', label: '>' },
  { value: '>=', label: '≥' },
];

const selectClassName =
  'rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

/** Kinds that draw on the graph and therefore need a color swatch. */
const COLOR_KINDS: ReadonlySet<ExpressionKind> = new Set([
  'cartesian',
  'parametric',
  'polar',
  'inequality',
  'point',
  'table',
]);

/** Static kind glyph shown in place of the color swatch for list-only items. */
function KindGlyph({ kind }: { kind: ExpressionKind }): React.ReactNode {
  const className = 'h-6 w-6 text-slate-400 dark:text-slate-500';
  switch (kind) {
    case 'folder':
      return <FolderIcon className={className} />;
    case 'text':
      return <NoteIcon className={className} />;
    case 'image':
      return <ImageIcon className={className} />;
    case 'action':
      return <BoltIcon className={className} />;
    default:
      return null;
  }
}

type SetDefinition = (definition: Expression['definition']) => void;

/** Editable x/y grid for table expressions. Cells accept math expressions. */
function TableEditor({
  expression,
  setDefinition,
  strings,
}: {
  expression: Extract<Expression, { kind: 'table' }>;
  setDefinition: SetDefinition;
  strings: CalculatorShellStrings;
}) {
  const { state } = useCalculator();
  const t = strings.expressions.tableEditor;
  const rows = expression.definition.rows;
  const variableNames = useMemo(() => definedVariableNames(state.variables), [state.variables]);

  const errors = useMemo(
    () =>
      rows.map((row) =>
        row.map((cell) => {
          if (cell.trim() === '') return null;
          return validateExpressionWithVariables(cell, 'x', variableNames);
        })
      ),
    [rows, variableNames]
  );

  const setCell = (rowIndex: number, cellIndex: number, value: string): void => {
    const next = rows.map((row, r) =>
      r === rowIndex ? row.map((cell, c) => (c === cellIndex ? value : cell)) : row
    );
    setDefinition({ ...expression.definition, rows: next });
  };

  const addRow = (): void => {
    setDefinition({ ...expression.definition, rows: [...rows, ['', '']] });
  };

  const removeRow = (rowIndex: number): void => {
    setDefinition({
      ...expression.definition,
      rows: rows.filter((_, r) => r !== rowIndex),
    });
  };

  return (
    <div className="mt-2">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-slate-200 px-2 py-1 text-left font-medium text-slate-500 dark:border-slate-700">
              {t.columnX}
            </th>
            <th className="border border-slate-200 px-2 py-1 text-left font-medium text-slate-500 dark:border-slate-700">
              {t.columnY}
            </th>
            <th className="w-10 border border-slate-200 px-2 py-1 dark:border-slate-700">
              <span className="sr-only">{format(t.removeRowAriaTemplate, { n: '' })}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-slate-200 dark:border-slate-700">
                  <TextInput
                    label={format(t.cellAriaTemplate, {
                      row: String(rowIndex + 1),
                      col: cellIndex === 0 ? t.columnX : t.columnY,
                    })}
                    value={cell}
                    error={errors[rowIndex]?.[cellIndex] ?? undefined}
                    onChange={(value) => setCell(rowIndex, cellIndex, value)}
                    inputClassName="border-0 font-mono"
                  />
                </td>
              ))}
              <td className="border border-slate-200 text-center dark:border-slate-700">
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<TrashIcon className="h-3.5 w-3.5" />}
                  aria-label={format(t.removeRowAriaTemplate, { n: String(rowIndex + 1) })}
                  onClick={() => removeRow(rowIndex)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        size="sm"
        variant="secondary"
        icon={<PlusIcon className="h-3.5 w-3.5" />}
        onClick={addRow}
        className="mt-2"
      >
        {t.addRow}
      </Button>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.emptyHint}</p>
    </div>
  );
}

/** Multi-line text editor for note expressions (never drawn on the graph). */
function TextNoteEditor({
  expression,
  setDefinition,
  strings,
}: {
  expression: Extract<Expression, { kind: 'text' }>;
  setDefinition: SetDefinition;
  strings: CalculatorShellStrings;
}) {
  const t = strings.expressions.noteEditor;
  return (
    <div className="mt-1">
      <label htmlFor={`note-${expression.id}`} className="sr-only">
        {t.ariaLabel}
      </label>
      <textarea
        id={`note-${expression.id}`}
        value={expression.definition.content}
        rows={3}
        placeholder={t.placeholder}
        onChange={(event) =>
          setDefinition({ ...expression.definition, content: event.target.value })
        }
        className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
      />
    </div>
  );
}

/** Placement controls for image expressions. */
function ImageEditor({
  expression,
  setDefinition,
  strings,
}: {
  expression: Extract<Expression, { kind: 'image' }>;
  setDefinition: SetDefinition;
  strings: CalculatorShellStrings;
}) {
  const t = strings.expressions.imageEditor;
  const definition = expression.definition;
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewFailed, setPreviewFailed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const srcValid = definition.src.trim() === '' || isAllowedImageSrc(definition.src);
  const isDataUrl = definition.src.trim().toLowerCase().startsWith('data:');

  const setNumber = (field: 'centerX' | 'centerY' | 'width' | 'height', raw: string): void => {
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    if ((field === 'width' || field === 'height') && !(parsed > 0)) return;
    setDefinition({ ...definition, [field]: parsed });
  };

  const handleFile = (file: File | undefined): void => {
    setUploadError(null);
    if (!file) return;
    if (file.size > 500 * 1024) {
      setUploadError(t.uploadTooLarge);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewFailed(false);
        setDefinition({ ...definition, src: reader.result });
      }
    };
    reader.onerror = () => setUploadError(t.loadFailed);
    reader.readAsDataURL(file);
  };

  const numberInputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

  return (
    <div className="mt-1 space-y-2">
      {isDataUrl ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{t.uploadedLabel}</p>
      ) : (
        <TextInput
          label={t.srcLabel}
          value={definition.src}
          placeholder={t.srcPlaceholder}
          error={!srcValid ? t.invalidSrc : undefined}
          onChange={(value) => {
            setPreviewFailed(false);
            setDefinition({ ...definition, src: value });
          }}
          inputClassName="font-mono"
        />
      )}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          icon={<UploadIcon className="h-4 w-4" />}
          onClick={() => fileInputRef.current?.click()}
        >
          {t.uploadLabel}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-label={t.uploadAria}
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
        {isDataUrl && (
          <Button
            size="sm"
            variant="ghost"
            icon={<TrashIcon className="h-3.5 w-3.5" />}
            aria-label={t.clearImageAria}
            onClick={() => setDefinition({ ...definition, src: '' })}
          />
        )}
      </div>
      {uploadError && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {uploadError}
        </p>
      )}
      {definition.src.trim() !== '' && srcValid && (
        <div className="flex items-center gap-3">
          {previewFailed ? (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              {t.loadFailed}
            </p>
          ) : (
            <img
              src={definition.src}
              alt=""
              className="h-16 w-16 rounded-lg border border-slate-200 object-contain dark:border-slate-700"
              onError={() => setPreviewFailed(true)}
            />
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <label className="block text-xs text-slate-500 dark:text-slate-400">
          {t.centerX}
          <input
            type="number"
            step="any"
            value={definition.centerX}
            onChange={(event) => setNumber('centerX', event.target.value)}
            className={numberInputClass}
          />
        </label>
        <label className="block text-xs text-slate-500 dark:text-slate-400">
          {t.centerY}
          <input
            type="number"
            step="any"
            value={definition.centerY}
            onChange={(event) => setNumber('centerY', event.target.value)}
            className={numberInputClass}
          />
        </label>
        <label className="block text-xs text-slate-500 dark:text-slate-400">
          {t.width}
          <input
            type="number"
            step="any"
            min="0"
            value={definition.width}
            onChange={(event) => setNumber('width', event.target.value)}
            className={numberInputClass}
          />
        </label>
        <label className="block text-xs text-slate-500 dark:text-slate-400">
          {t.height}
          <input
            type="number"
            step="any"
            min="0"
            value={definition.height}
            onChange={(event) => setNumber('height', event.target.value)}
            className={numberInputClass}
          />
        </label>
      </div>
      <label className="block text-xs text-slate-500 dark:text-slate-400">
        {t.opacity}: {Math.round(definition.opacity * 100)}%
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(definition.opacity * 100)}
          onChange={(event) =>
            setDefinition({ ...definition, opacity: Number(event.target.value) / 100 })
          }
          className="w-full"
        />
      </label>
    </div>
  );
}

/** Assignment list + run button for action expressions. */
function ActionEditor({
  expression,
  setDefinition,
  strings,
}: {
  expression: Extract<Expression, { kind: 'action' }>;
  setDefinition: SetDefinition;
  strings: CalculatorShellStrings;
}) {
  const { state, dispatch } = useCalculator();
  const t = strings.expressions.actionEditor;
  const [error, setError] = useState<string | null>(null);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const definition = expression.definition;

  const setAssignment = (index: number, patch: Partial<ActionAssignment>): void => {
    const assignments = definition.assignments.map((assignment, i) =>
      i === index ? { ...assignment, ...patch } : assignment
    );
    setDefinition({ ...definition, assignments });
  };

  const addAssignment = (): void => {
    setDefinition({
      ...definition,
      assignments: [...definition.assignments, { variable: '', value: '' }],
    });
  };

  const removeAssignment = (index: number): void => {
    setDefinition({
      ...definition,
      assignments: definition.assignments.filter((_, i) => i !== index),
    });
  };

  const run = (): void => {
    setError(null);
    // Evaluate assignments in order through the real engine (no eval);
    // later assignments see earlier ones via a locally-updated environment.
    const defs = state.variables.map((v) => ({ ...v }));
    const env = new VariableEnvironment(defs);
    env.resolve();
    const updates: Array<{ name: string; expression: string }> = [];
    for (const assignment of definition.assignments) {
      const rawName = assignment.variable.trim();
      const name = normalizeVariableName(rawName);
      if (validateVariableName(name) !== null) {
        setError(format(t.invalidVariableTemplate, { variable: rawName === '' ? '?' : rawName }));
        return;
      }
      let computed: number;
      try {
        computed = compileExpressionScoped(assignment.value, {
          parameter: CARTESIAN_PARAMETER,
          env,
        }).fn(0);
      } catch {
        setError(format(t.evaluationErrorTemplate, { variable: rawName }));
        return;
      }
      if (!Number.isFinite(computed)) {
        setError(format(t.nonFiniteTemplate, { variable: rawName }));
        return;
      }
      const literal = String(Math.round(computed * 1e12) / 1e12);
      updates.push({ name, expression: literal });
      const index = defs.findIndex((v) => v.name === name);
      if (index >= 0) {
        defs[index] = { ...defs[index], expression: literal };
      } else {
        defs.push({
          name,
          expression: literal,
          min: computed - 10,
          max: computed + 10,
          step: 0.1,
        });
      }
      env.setDefinitions(defs);
      env.resolve();
    }
    dispatch({ type: 'APPLY_ACTION_RESULT', updates });
    setLastRun(
      format(t.lastRunTemplate, {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })
    );
  };

  return (
    <div className="mt-1 space-y-2">
      <TextInput
        label={t.buttonLabelLabel}
        value={definition.buttonLabel}
        placeholder={t.defaultButtonLabel}
        onChange={(value) => setDefinition({ ...definition, buttonLabel: value })}
      />
      <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
        <span>{t.variableHeader}</span>
        <span />
        <span>{t.valueHeader}</span>
        <span />
      </div>
      <ul className="space-y-1.5">
        {definition.assignments.map((assignment, index) => (
          <li key={index} className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-1.5">
            <TextInput
              label={`${t.variableHeader} ${index + 1}`}
              value={assignment.variable}
              placeholder="a"
              onChange={(value) => setAssignment(index, { variable: value })}
              inputClassName="font-mono"
            />
            <span aria-hidden="true" className="font-mono text-sm text-slate-500">
              =
            </span>
            <TextInput
              label={`${t.valueHeader} ${index + 1}`}
              value={assignment.value}
              placeholder="a + 1"
              onChange={(value) => setAssignment(index, { value: value })}
              inputClassName="font-mono"
            />
            <Button
              size="sm"
              variant="ghost"
              icon={<TrashIcon className="h-3.5 w-3.5" />}
              aria-label={format(t.removeAssignmentAriaTemplate, { n: String(index + 1) })}
              onClick={() => removeAssignment(index)}
            />
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={addAssignment}
          icon={<PlusIcon className="h-3.5 w-3.5" />}
        >
          {t.addAssignment}
        </Button>
        <Button
          size="sm"
          onClick={run}
          icon={<PlayIcon className="h-3.5 w-3.5" />}
          disabled={definition.assignments.length === 0}
          aria-label={format(t.runAriaTemplate, {
            label:
              definition.buttonLabel.trim() === '' ? t.defaultButtonLabel : definition.buttonLabel,
          })}
        >
          {definition.buttonLabel.trim() === '' ? t.defaultButtonLabel : definition.buttonLabel}
        </Button>
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {lastRun && !error && <p className="text-xs text-slate-500 dark:text-slate-400">{lastRun}</p>}
    </div>
  );
}

export function ExpressionRow({
  expression,
  isSelected,
  strings,
  nestedContent,
}: ExpressionRowProps) {
  const { state, dispatch } = useCalculator();
  const [renaming, setRenaming] = useState(false);
  const parameter = parameterFor(expression);
  const t = strings.expressions;
  const KIND_OPTIONS = t.kindOptions;

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

  const folders = useMemo(() => state.expressions.filter(isFolderExpression), [state.expressions]);
  const parentFolderId = findParentFolder(state.expressions, expression.id)?.id ?? null;

  return (
    <li
      aria-current={isSelected || undefined}
      className={cn('px-3 py-3', isSelected && 'bg-brand-50 dark:bg-slate-800/60')}
    >
      <div className="flex items-start gap-3">
        {COLOR_KINDS.has(expression.kind) ? (
          <label
            className="mt-1.5 shrink-0 cursor-pointer"
            title={format(t.changeColorTemplate, { label: expression.label })}
          >
            <span className="sr-only">
              {format(t.changeColorTemplate, { label: expression.label })}
            </span>
            <input
              type="color"
              value={expression.color}
              onChange={(event) => setColor(event.target.value)}
              className="h-6 w-8 cursor-pointer rounded border border-slate-300 bg-transparent p-0 dark:border-slate-600"
            />
          </label>
        ) : (
          <span className="mt-1.5 shrink-0" aria-hidden="true">
            <KindGlyph kind={expression.kind} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          {renaming ? (
            <div>
              <label htmlFor={`rename-${expression.id}`} className="sr-only">
                {format(t.renameAriaTemplate, { label: expression.label })}
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
                aria-label={format(t.renameAriaTemplate, { label: expression.label })}
                onClick={() => setRenaming(true)}
              />
            </div>
          )}
          <div className="mt-1.5">
            <label htmlFor={`kind-${expression.id}`} className="sr-only">
              {format(t.changeTypeAriaTemplate, { label: expression.label })}
            </label>
            <select
              id={`kind-${expression.id}`}
              value={expression.kind}
              onChange={(event) =>
                changeExpressionKind(expression, event.target.value as ExpressionKind, dispatch)
              }
              className={cn(selectClassName, 'text-xs')}
              aria-label={format(t.changeTypeAriaTemplate, { label: expression.label })}
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
                label={format(t.editDefinitionAriaTemplate, { label: expression.label })}
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
                  label={t.fields.xOfT}
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
                  label={t.fields.yOfT}
                  value={expression.definition.yOfT}
                  error={paramYTError ?? undefined}
                  onChange={(value) => setDefinition({ ...expression.definition, yOfT: value })}
                  inputClassName="font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <TextInput
                  label={t.fields.tMin}
                  value={expression.definition.tMin}
                  error={paramTMinError ?? undefined}
                  onChange={(value) => setDefinition({ ...expression.definition, tMin: value })}
                  inputClassName="font-mono"
                />
                <TextInput
                  label={t.fields.tMax}
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
                label={format(t.editDefinitionAriaTemplate, { label: expression.label })}
                value={expression.definition.rOfTheta}
                error={polarRError ?? undefined}
                hint={t.fields.polarHint}
                onChange={(value) => setDefinition({ ...expression.definition, rOfTheta: value })}
                inputClassName="font-mono"
              />
            </div>
          ) : expression.kind === 'inequality' ? (
            <div className="mt-1 flex items-center gap-2">
              <label className="sr-only" htmlFor={`ineq-lhs-${expression.id}`}>
                {t.fields.inequalitySide}
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
                {t.fields.inequalityOperator}
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
                label={format(t.editDefinitionAriaTemplate, { label: expression.label })}
                value={expression.definition.rhs}
                error={ineqRhsError ?? undefined}
                onChange={(value) => setDefinition({ ...expression.definition, rhs: value })}
                inputClassName="font-mono"
              />
            </div>
          ) : expression.kind === 'point' ? (
            <div className="mt-1 grid grid-cols-2 gap-2">
              <TextInput
                label={t.fields.xCoordinate}
                value={expression.definition.x}
                error={pointXError ?? undefined}
                onChange={(value) => setDefinition({ ...expression.definition, x: value })}
                inputClassName="font-mono"
              />
              <TextInput
                label={t.fields.yCoordinate}
                value={expression.definition.y}
                error={pointYError ?? undefined}
                onChange={(value) => setDefinition({ ...expression.definition, y: value })}
                inputClassName="font-mono"
              />
            </div>
          ) : expression.kind === 'table' ? (
            <TableEditor expression={expression} setDefinition={setDefinition} strings={strings} />
          ) : expression.kind === 'text' ? (
            <TextNoteEditor
              expression={expression}
              setDefinition={setDefinition}
              strings={strings}
            />
          ) : expression.kind === 'folder' ? (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {format(t.folderRow.itemCountTemplate, {
                n: String(getFolderChildren(expression, state.expressions).length),
              })}
            </p>
          ) : expression.kind === 'image' ? (
            <ImageEditor expression={expression} setDefinition={setDefinition} strings={strings} />
          ) : expression.kind === 'action' ? (
            <ActionEditor expression={expression} setDefinition={setDefinition} strings={strings} />
          ) : (
            <p className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-300">
              {getExpressionSummary(expression)}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1">
          {expression.kind === 'folder' ? (
            <Button
              size="sm"
              variant="ghost"
              icon={
                <ChevronDownIcon
                  className={cn(
                    'h-4 w-4 transition-transform',
                    expression.definition.collapsed && '-rotate-90'
                  )}
                />
              }
              aria-expanded={!expression.definition.collapsed}
              aria-label={format(
                expression.definition.collapsed
                  ? t.folderRow.expandAriaTemplate
                  : t.folderRow.collapseAriaTemplate,
                { label: expression.label }
              )}
              onClick={() => dispatch({ type: 'TOGGLE_FOLDER_COLLAPSED', id: expression.id })}
            />
          ) : (
            folders.length > 0 && (
              <label className="flex items-center gap-1" title={t.folderRow.moveToFolder}>
                <FolderIcon className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="sr-only">{t.folderRow.moveToFolder}</span>
                <select
                  value={parentFolderId ?? ''}
                  onChange={(event) =>
                    dispatch({
                      type: 'MOVE_EXPRESSION_TO_FOLDER',
                      expressionId: expression.id,
                      folderId: event.target.value === '' ? null : event.target.value,
                    })
                  }
                  className={cn(selectClassName, 'max-w-28 text-xs')}
                  aria-label={t.folderRow.moveToFolder}
                >
                  <option value="">{t.folderRow.moveToTopLevel}</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.label}
                    </option>
                  ))}
                </select>
              </label>
            )
          )}
          <Button
            size="sm"
            variant="ghost"
            icon={<DuplicateIcon className="h-4 w-4" />}
            aria-label={format(t.duplicateAriaTemplate, { label: expression.label })}
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
            aria-label={expression.visible ? t.hideAria : t.showAria}
            onClick={() => dispatch({ type: 'TOGGLE_EXPRESSION_VISIBILITY', id: expression.id })}
          />
          <Button
            size="sm"
            variant="ghost"
            icon={<TrashIcon className="h-4 w-4" />}
            aria-label={format(t.deleteAriaTemplate, { label: expression.label })}
            onClick={() => dispatch({ type: 'REMOVE_EXPRESSION', id: expression.id })}
          />
        </div>
      </div>
      {nestedContent}
    </li>
  );
}

export default ExpressionRow;
