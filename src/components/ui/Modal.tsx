import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from './icons.js';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  titleId?: string;
}

export function Modal({ open, onClose, title, children, titleId }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const generatedId = useId();
  const headingId = titleId ?? `modal-title-${generatedId}`;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On open: remember the previously focused element and move focus into
  // the dialog. On close: restore focus so keyboard users don't lose
  // their place (WCAG 2.4.3).
  useEffect(() => {
    if (!mounted || !open) return;
    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      const previous = previouslyFocusedRef.current;
      previouslyFocusedRef.current = null;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [mounted, open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap: keep Tab cycling inside the dialog (WCAG 2.1.2 —
      // with aria-modal="true" the dialog must behave modally).
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), ' +
          'select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 transition-colors dark:bg-slate-950/70"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl
          dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h2 id={headingId} className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex shrink-0 rounded-md p-1 text-slate-500 transition-colors
              hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400
              dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
