/**
 * ExpressionList — the ordered list of expressions in the calculator.
 * Shows an honest empty state when the user has removed every expression.
 *
 * The "+ Add" menu adds new items: expressions (cartesian, parametric,
 * polar, inequalities, points), tables, folders, text notes, images, and
 * actions. Folders render their children nested and collapsible.
 */

import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/index.js';
import {
  BoltIcon,
  ChevronDownIcon,
  FolderIcon,
  FunctionIcon,
  ImageIcon,
  InfoIcon,
  NoteIcon,
  PlusIcon,
  TableIcon,
} from '../ui/icons.js';
import { useCalculator } from '../calculator/CalculatorStore.js';
import type { Expression, ExpressionKind } from '../../types/calculator.js';
import {
  getFolderChildren,
  getTopLevelExpressions,
  isFolderExpression,
} from '../../lib/expressions/folders.js';
import { ExpressionRow } from './ExpressionRow.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';

function AddMenu({ strings }: { strings: CalculatorShellStrings }) {
  const { dispatch } = useCalculator();
  const t = strings.expressions;
  const menu = t.addMenu;
  const [open, setOpen] = useState(false);
  const [expressionOpen, setExpressionOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent): void => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
        setExpressionOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
        setExpressionOpen(false);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const add = (kind: ExpressionKind): void => {
    dispatch({ type: 'ADD_EXPRESSION', kind });
    setOpen(false);
    setExpressionOpen(false);
  };

  const itemClass =
    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800';

  return (
    <div ref={rootRef} className="relative">
      <Button
        size="sm"
        icon={<PlusIcon className="h-4 w-4" />}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={menu.buttonAriaLabel}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex items-center gap-1">
          {t.add}
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </span>
      </Button>
      {open && (
        <div
          role="menu"
          aria-label={menu.buttonAriaLabel}
          className="absolute right-0 z-30 mt-1 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="relative">
            <button
              type="button"
              role="menuitem"
              aria-haspopup="menu"
              aria-expanded={expressionOpen}
              aria-label={menu.expressionKindsAriaLabel}
              className={itemClass}
              onClick={() => setExpressionOpen((value) => !value)}
            >
              <FunctionIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="flex-1">{menu.expression}</span>
              <ChevronDownIcon className="h-3.5 w-3.5 -rotate-90 text-slate-400" />
            </button>
            {expressionOpen && (
              <div
                role="menu"
                aria-label={menu.expressionKindsAriaLabel}
                className="absolute right-full top-0 z-30 mr-1 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                {t.addKindOptions.map((option) => (
                  <button
                    key={option.kind}
                    type="button"
                    role="menuitem"
                    className={itemClass}
                    onClick={() => add(option.kind as ExpressionKind)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" role="menuitem" className={itemClass} onClick={() => add('table')}>
            <TableIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {menu.table}
          </button>
          <button type="button" role="menuitem" className={itemClass} onClick={() => add('folder')}>
            <FolderIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {menu.folder}
          </button>
          <button type="button" role="menuitem" className={itemClass} onClick={() => add('text')}>
            <NoteIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {menu.note}
          </button>
          <button type="button" role="menuitem" className={itemClass} onClick={() => add('image')}>
            <ImageIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {menu.image}
          </button>
          <button type="button" role="menuitem" className={itemClass} onClick={() => add('action')}>
            <BoltIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {menu.action}
          </button>
        </div>
      )}
    </div>
  );
}

function NestedRows({
  children,
  strings,
  selectedExpressionId,
}: {
  children: Expression[];
  strings: CalculatorShellStrings;
  selectedExpressionId: string | null;
}): React.ReactNode {
  return (
    <ul className="border-l-2 border-slate-200 pl-2 dark:border-slate-700">
      {children.map((child) => (
        <ExpressionRow
          key={child.id}
          expression={child}
          isSelected={selectedExpressionId === child.id}
          strings={strings}
        />
      ))}
    </ul>
  );
}

export function ExpressionList({ strings }: { strings: CalculatorShellStrings }) {
  const { state } = useCalculator();
  const t = strings.expressions;
  const topLevel = getTopLevelExpressions(state.expressions);

  if (state.expressions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <InfoIcon className="h-8 w-8 text-slate-400" />
        <p className="text-sm text-slate-500 dark:text-slate-400">{t.emptyState}</p>
        <AddMenu strings={strings} />
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-slate-200 dark:divide-slate-800">
        {topLevel.map((expression) => {
          const folderChildren = isFolderExpression(expression)
            ? getFolderChildren(expression, state.expressions)
            : [];
          return (
            <ExpressionRow
              key={expression.id}
              expression={expression}
              isSelected={state.selectedExpressionId === expression.id}
              strings={strings}
              nestedContent={
                isFolderExpression(expression) && !expression.definition.collapsed ? (
                  <div className="mt-2">
                    {folderChildren.length > 0 ? (
                      <NestedRows
                        children={folderChildren}
                        strings={strings}
                        selectedExpressionId={state.selectedExpressionId}
                      />
                    ) : (
                      <p className="py-2 text-xs text-slate-400 dark:text-slate-500">
                        {t.folderRow.emptyFolder}
                      </p>
                    )}
                  </div>
                ) : undefined
              }
            />
          );
        })}
      </ul>
      <div className="flex justify-end px-3 py-3">
        <AddMenu strings={strings} />
      </div>
    </div>
  );
}

export default ExpressionList;
