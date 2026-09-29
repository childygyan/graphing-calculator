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

type DialogKind = 'save' | 'library' | 'share' | 'import';

function ShortcutHint({ label }: { label: string }) {
  return (
    <span className="ml-1 hidden rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 lg:inline dark:bg-slate-800 dark:text-slate-400">
      {label}
    </span>
  );
}

export function PersistenceControls() {
  const { state, undo, redo, canUndo, canRedo, isDirty } = useCalculator();
  const { notify } = useToast();
  const [dialog, setDialog] = useState<DialogKind | null>(null);
  const [exportOpen, setExportOpen] = useState(false);

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
      notify('Graph exported as JSON.', 'success');
    } catch {
      notify('JSON export failed.', 'error');
    }
  };

  const handleExportPng = async (): Promise<void> => {
    setExportOpen(false);
    const result = await exportGraphPng(2);
    if (result.ok) {
      notify('Graph exported as PNG (2x).', 'success');
    } else {
      notify(result.error, 'error');
    }
  };

  const handleCopyEquations = async (): Promise<void> => {
    if (state.expressions.length === 0) {
      notify('There are no expressions to copy.', 'info');
      return;
    }
    const text = state.expressions.map((expression) => getExpressionSummary(expression)).join('\n');
    const ok = await copyTextToClipboard(text);
    notify(
      ok ? 'Equations copied to the clipboard.' : 'Copying failed in this browser.',
      ok ? 'success' : 'error'
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-1" aria-label="Graph persistence">
      <Button
        variant="ghost"
        size="sm"
        aria-label="Undo"
        title="Undo"
        disabled={!canUndo}
        onClick={undo}
      >
        <UndoIcon className="h-4 w-4" />
        <ShortcutHint label="Ctrl+Z" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        aria-label="Redo"
        title="Redo"
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
        aria-label={isDirty ? 'Save graph (unsaved changes)' : 'Save graph'}
      >
        Save
        {isDirty && (
          <span
            className="ml-1 inline-block h-2 w-2 rounded-full bg-amber-500"
            role="img"
            aria-label="Unsaved changes"
            title="Unsaved changes"
          />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDialog('library')}
        icon={<FolderIcon className="h-4 w-4" />}
      >
        My graphs
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setDialog('share')}
        icon={<ShareIcon className="h-4 w-4" />}
      >
        Share
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
          Export
          <ChevronDownIcon className="h-3 w-3" />
        </Button>
        {exportOpen && (
          <>
            <button
              type="button"
              aria-label="Close export menu"
              className="fixed inset-0 z-10 cursor-default"
              onClick={() => setExportOpen(false)}
            />
            <div
              role="menu"
              aria-label="Export options"
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
                Download JSON
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => void handleExportPng()}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700
                  hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ImageIcon className="h-4 w-4" />
                Download PNG (2x)
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
        Import
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => void handleCopyEquations()}
        icon={<DuplicateIcon className="h-4 w-4" />}
        aria-label="Copy equations as text"
        title="Copy equations as text"
      >
        Copy equations
      </Button>

      {dialog === 'save' && <SaveDialog onClose={closeDialog} />}
      {dialog === 'library' && <LibraryDialog onClose={closeDialog} />}
      {dialog === 'share' && <ShareDialog onClose={closeDialog} />}
      {dialog === 'import' && <ImportDialog onClose={closeDialog} />}
    </div>
  );
}

export default PersistenceControls;
