/**
 * ValueTable — a keyboard-navigable table of (x, y) values.
 *
 * The scroll region is a single tab stop; arrow keys / Home / End /
 * PageUp / PageDown move the active row (roving highlight). Domain errors
 * render as "—". A truncation notice appears when the row budget cut the
 * table short.
 */

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { formatNumber } from '../../lib/math/format.js';
import type { TableRow } from '../../lib/math/table.js';
import type { PrecisionSettings } from '../../types/calculator.js';

interface ValueTableProps {
  rows: TableRow[];
  totalRows: number;
  truncated: boolean;
  step: number;
  precision: PrecisionSettings;
  title: string;
}

export function ValueTable({
  rows,
  totalRows,
  truncated,
  step,
  precision,
  title,
}: ValueTableProps) {
  const [active, setActive] = useState(0);
  const rowRefs = useRef(new Map<number, HTMLTableRowElement>());

  useEffect(() => {
    setActive(0);
    rowRefs.current.clear();
  }, [rows]);

  const move = (next: number): void => {
    if (rows.length === 0) return;
    const clamped = Math.max(0, Math.min(rows.length - 1, next));
    setActive(clamped);
    rowRefs.current.get(clamped)?.scrollIntoView({ block: 'nearest' });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        move(active + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        move(active - 1);
        break;
      case 'Home':
        event.preventDefault();
        move(0);
        break;
      case 'End':
        event.preventDefault();
        move(rows.length - 1);
        break;
      case 'PageDown':
        event.preventDefault();
        move(active + 10);
        break;
      case 'PageUp':
        event.preventDefault();
        move(active - 10);
        break;
      default:
        break;
    }
  };

  if (rows.length === 0) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">No rows to show.</p>;
  }

  return (
    <div>
      <div
        role="region"
        aria-label={title}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="max-h-72 overflow-auto rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800">
            <tr>
              <th
                scope="col"
                className="border-b border-slate-200 px-3 py-1.5 text-left font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                x
              </th>
              <th
                scope="col"
                className="border-b border-slate-200 px-3 py-1.5 text-left font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                y
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                ref={(el) => {
                  if (el) rowRefs.current.set(i, el);
                  else rowRefs.current.delete(i);
                }}
                aria-selected={i === active}
                className={
                  i === active
                    ? 'bg-brand-50 dark:bg-brand-950/40'
                    : 'odd:bg-white even:bg-slate-50/60 dark:odd:bg-slate-900 dark:even:bg-slate-800/40'
                }
              >
                <td className="px-3 py-1 font-mono text-slate-900 dark:text-slate-100">
                  {formatNumber(row.x, precision)}
                </td>
                <td className="px-3 py-1 font-mono text-slate-900 dark:text-slate-100">
                  {row.y === null ? (
                    <span title="Not defined at this x">—</span>
                  ) : (
                    formatNumber(row.y, precision)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Step {formatNumber(step, precision)} · showing {rows.length} of {totalRows} rows
        {truncated ? ' — narrow the range or increase the step to see the rest' : ''}. Focus the
        table and use ↑/↓ to move between rows.
      </p>
    </div>
  );
}

export default ValueTable;
