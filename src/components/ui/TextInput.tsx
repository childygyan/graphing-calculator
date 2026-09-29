import { useId } from 'react';
import { cn } from '../../lib/utils/cn.js';

export interface TextInputProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  inputClassName?: string;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  hint,
  error,
  disabled,
  autoComplete,
  required,
  inputClassName,
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? `text-input-${generatedId}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
        {required ? (
          <span className="text-red-600 dark:text-red-400" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
          'bg-white text-slate-900 placeholder:text-slate-400',
          'dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950',
          error ? 'border-red-500 dark:border-red-400' : 'border-slate-200 dark:border-slate-800',
          inputClassName
        )}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
      {hint && !error ? (
        <p id={hintId} className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default TextInput;
