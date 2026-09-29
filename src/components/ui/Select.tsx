import { useId } from 'react';
import { ChevronDownIcon } from './icons.js';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<SelectOption>;
  disabled?: boolean;
  hint?: string;
}

export function Select({ id, label, value, onChange, options, disabled, hint }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? `select-${generatedId}`;
  const hintId = `${selectId}-hint`;

  return (
    <div className="w-full">
      <label
        htmlFor={selectId}
        className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-describedby={hint ? hintId : undefined}
          className="block w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-9 text-sm
            text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-slate-400" />
      </div>
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default Select;
