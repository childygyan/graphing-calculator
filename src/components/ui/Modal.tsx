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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !open) return;
    closeButtonRef.current?.focus();
  }, [mounted, open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
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
