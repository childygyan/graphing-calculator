/**
 * PersistenceControls — save / share / export / import / undo / redo
 * buttons for the calculator toolbar, plus the dirty-state indicator.
 * Owns the persistence dialogs and the export dropdown.
 */

import { useEffect, useState } from 'react';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { Button } from '../ui/Button.js';
import {
  ChevronDownIcon,
  DownloadIcon,
  DuplicateIcon,
  FolderIcon,
  ImageIcon,
  RedoIcon,
  SaveIcon,
  ShareIcon,
  UndoIcon,
  UploadIcon,
} from '../ui/icons.js';
import { useToast } from '../ui/Toast.js';
import { stateToDocument } from '../../lib/persistence/document.js';
import { getExpressionSummary } from '../../lib/expressions/expressions.js';
import {
  copyTextToClipboard,
  downloadDocumentJson,
  exportGraphPng,
} from '../../lib/persistence/transfer.js';
import { ImportDialog, LibraryDialog, SaveDialog, ShareDialog } from './PersistenceDialogs.js';
import type { CalculatorShellStrings } from '../../i18n/types.js';

type DialogKind = 'save' | 'library' | 'share' | 'import';

function ShortcutHint({ label }: { label: string }) {
  return (
    <span className="ml-1 hidden rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 lg:inline dark:bg-slate-800 dark:text-slate-400">
      {label}
    </span>
  );
}

export function PersistenceControls({
  strings,
}: {
  strings: CalculatorShellStrings['persistence'];
}) {
  const { state, undo, redo, canUndo, canRedo, isDirty } = useCalculator();
  const { notify } = useToast();
  const [dialog, setDialog] = useState<DialogKind | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const t = strings;

  // Close the export menu on Escape.
  useEffect(() => {
    if (!exportOpen) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setExportOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [exportOpen]);

  const closeDialog = (): void => setDialog(null);

  const handleExportJson = (): void => {
    setExportOpen(false);
    try {
      downloadDocumentJson(stateToDocument(state));
      notify(t.toasts.exportedJson, 'success');
    } catch {
      notify(t.toasts.exportJsonFailed, 'error');
    }
  };

  const handleExportPng = async (): Promise<void> => {
    setExportOpen(false);
    const result = await exportGraphPng(2);
    if (result.ok) {
      notify(t.toasts.exportedPng, 'success');
    } else {
      notify(result.error, 'error');
    }
  };

  const handleCopyEquations = async (): Promise<void> => {
    if (state.expressions.length === 0) {
      notify(t.toasts.noExpressions, 'info');
      return;
    }
    const text = state.expressions.map((expression) => getExpressionSummary(expression)).join('\n');
    const ok = await copyTextToClipboard(text);
    notify(ok ? t.toasts.copied : t.toasts.copyFailed, ok ? 'success' : 'error');
  };

  return (
    <div className="flex flex-wrap items-center gap-1" aria-label={t.regionLabel}>
      <Button
        variant="ghost"
        size="sm"
        aria-label={t.undo}
        title={t.undo}
        disabled={!canUndo}
        onClick={undo}
      >
        <UndoIcon className="h-4 w-4" />
        <ShortcutHint label="Ctrl+Z" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        aria-label={t.redo}
        title={t.redo}
        disabled={!canRedo}
        onClick={redo}
      >
        <RedoIcon className="h-4 w-4" />
        <ShortcutHint label="Ctrl+Shift+Z" />
      </Button>

      <span aria-hidden="true" className="mx-1 h-5 w-px bg-slate-200 dark:bg-slate-800" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDialog('save')}
        icon={<SaveIcon className="h-4 w-4" />}
        aria-label={isDirty ? t.saveUnsaved : t.save}
      >
        Save
        {isDirty && (
          <span
            className="ml-1 inline-block h-2 w-2 rounded-full bg-amber-500"
            role="img"
            aria-label={t.unsavedChanges}
            title={t.unsavedChanges}
          />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDialog('library')}
        icon={<FolderIcon className="h-4 w-4" />}
      >
        {t.myGraphs}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDialog('share')}
        icon={<ShareIcon className="h-4 w-4" />}
      >
        {t.share}
      </Button>

      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExportOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={exportOpen}
          icon={<DownloadIcon className="h-4 w-4" />}
        >
          {t.export}
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
        {exportOpen && (
          <>
            <button
              type="button"
              aria-label={t.closeExportMenu}
              className="fixed inset-0 z-10 cursor-default"
              onClick={() => setExportOpen(false)}
            />
            <div
              role="menu"
              aria-label={t.exportOptions}
              className="absolute right-0 z-20 mt-1 w-52 rounded-lg border border-slate-200 bg-white py-1
                shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleExportJson}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700
                  hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <DownloadIcon className="h-4 w-4" />
                {t.downloadJson}
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => void handleExportPng()}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700
                  hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ImageIcon className="h-4 w-4" />
                {t.downloadPng}
              </button>
            </div>
          </>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDialog('import')}
        icon={<UploadIcon className="h-4 w-4" />}
      >
        {t.import}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => void handleCopyEquations()}
        icon={<DuplicateIcon className="h-4 w-4" />}
        aria-label={t.copyEquationsAria}
        title={t.copyEquationsAria}
      >
        {t.copyEquations}
      </Button>

      {dialog === 'save' && (
        <SaveDialog onClose={closeDialog} strings={t.saveDialog} modal={t.modal} />
      )}
      {dialog === 'library' && (
        <LibraryDialog onClose={closeDialog} strings={t.libraryDialog} modal={t.modal} />
      )}
      {dialog === 'share' && (
        <ShareDialog onClose={closeDialog} strings={t.shareDialog} modal={t.modal} />
      )}
      {dialog === 'import' && (
        <ImportDialog onClose={closeDialog} strings={t.importDialog} modal={t.modal} />
      )}
    </div>
  );
}

export default PersistenceControls;
