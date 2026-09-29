/**
 * Persistence dialogs: named save, saved-graph library (restore / rename /
 * delete), share-link generation, and JSON import with preview. All dialogs
 * use the shared accessible Modal; every destructive or replacing action
 * confirms inline first.
 */

import { useEffect, useRef, useState } from 'react';
import { useCalculator } from '../calculator/CalculatorStore.js';
import { Modal } from '../ui/Modal.js';
import { Button } from '../ui/Button.js';
import { TextInput } from '../ui/TextInput.js';
import { AlertTriangleIcon, LinkIcon, PencilIcon, TrashIcon, UploadIcon } from '../ui/icons.js';
import {
  MAX_IMPORT_BYTES,
  documentToState,
  migrateDocument,
  stateToDocument,
  summarizeDocument,
  type DocumentSummary,
  type GraphDocument,
} from '../../lib/persistence/document.js';
import { validateGraphDocument } from '../../lib/persistence/validate.js';
import {
  deleteSavedGraph,
  getSavedGraph,
  listSavedGraphs,
  renameSavedGraph,
  saveNamedGraph,
  type SavedGraphEntry,
} from '../../lib/persistence/storage.js';
import { buildShareUrl, encodeSharePayload } from '../../lib/persistence/share.js';
import { copyTextToClipboard } from '../../lib/persistence/transfer.js';

function formatDate(timestamp: number): string {
  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return '';
  }
}

/* ------------------------------------------------------------------ */
/* Save dialog                                                         */
/* ------------------------------------------------------------------ */

export function SaveDialog({ onClose }: { onClose: () => void }) {
  const { state, markSaved } = useCalculator();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = (): void => {
    setError(null);
    const result = saveNamedGraph(name, stateToDocument(state, name));
    if (!result.ok) {
      setError(result.error);
      return;
    }
    markSaved();
    setSaved(true);
    window.setTimeout(onClose, 900);
  };

  return (
    <Modal open onClose={onClose} title="Save graph">
      {saved ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-300" role="status">
          Saved to this browser.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <TextInput
            label="Name"
            value={name}
            onChange={setName}
            placeholder="e.g. Parabola exploration"
            hint="Saved in this browser only. Saving the same name overwrites it."
            error={error ?? undefined}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save graph
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Saved-graph library                                                 */
/* ------------------------------------------------------------------ */

export function LibraryDialog({ onClose }: { onClose: () => void }) {
  const { dispatch, isDirty } = useCalculator();
  const [entries, setEntries] = useState<SavedGraphEntry[]>(() => listSavedGraphs());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingRestore, setPendingRestore] = useState<SavedGraphEntry | null>(null);

  const refresh = (): void => setEntries(listSavedGraphs());

  const startRename = (entry: SavedGraphEntry): void => {
    setEditingId(entry.id);
    setEditName(entry.name);
    setEditError(null);
  };

  const commitRename = (): void => {
    if (!editingId) return;
    const result = renameSavedGraph(editingId, editName);
    if (!result.ok) {
      setEditError(result.error);
      return;
    }
    setEditingId(null);
    setEditName('');
    refresh();
  };

  const confirmDelete = (id: string): void => {
    if (deleteSavedGraph(id)) refresh();
    setDeletingId(null);
  };

  const restoreEntry = (entry: SavedGraphEntry): void => {
    const fresh = getSavedGraph(entry.id);
    if (!fresh) {
      refresh();
      return;
    }
    dispatch({ type: 'HYDRATE', state: documentToState(fresh.document) });
    onClose();
  };

  const requestRestore = (entry: SavedGraphEntry): void => {
    if (isDirty) {
      setPendingRestore(entry);
      return;
    }
    restoreEntry(entry);
  };

  return (
    <Modal open onClose={onClose} title="My saved graphs">
      <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
        {entries.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Nothing saved yet. Use <strong>Save</strong> to keep the current graph in this browser.
          </p>
        ) : (
          entries.map((entry) => {
            const summary = summarizeDocument(entry.document);
            return (
              <div
                key={entry.id}
                className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"
              >
                {editingId === entry.id ? (
                  <div className="flex flex-col gap-2">
                    <TextInput
                      label="Rename graph"
                      value={editName}
                      onChange={setEditName}
                      error={editError ?? undefined}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(null);
                          setEditError(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" onClick={commitRename}>
                        Rename
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {entry.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(entry.savedAt)} · {summary.expressionCount} expression
                        {summary.expressionCount === 1 ? '' : 's'}
                        {summary.variableCount > 0
                          ? ` · ${summary.variableCount} variable${summary.variableCount === 1 ? '' : 's'}`
                          : ''}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="secondary" size="sm" onClick={() => requestRestore(entry)}>
                        Restore
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Rename ${entry.name}`}
                        onClick={() => startRename(entry)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Delete ${entry.name}`}
                        onClick={() => setDeletingId(entry.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {deletingId === entry.id && (
                  <div
                    className="mt-2 flex items-center justify-between gap-2 rounded-md bg-red-50 px-3 py-2
                      text-sm text-red-800 dark:bg-red-950 dark:text-red-200"
                  >
                    <span>Delete this saved graph?</span>
                    <span className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
                        Keep
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => confirmDelete(entry.id)}>
                        Delete
                      </Button>
                    </span>
                  </div>
                )}
                {pendingRestore?.id === entry.id && (
                  <div
                    className="mt-2 flex items-center justify-between gap-2 rounded-md bg-amber-50 px-3 py-2
                      text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                  >
                    <span className="inline-flex items-center gap-2">
                      <AlertTriangleIcon className="h-4 w-4 shrink-0" />
                      You have unsaved changes. Restoring replaces the current graph.
                    </span>
                    <span className="flex shrink-0 gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setPendingRestore(null)}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => restoreEntry(entry)}>
                        Restore anyway
                      </Button>
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Share dialog                                                        */
/* ------------------------------------------------------------------ */

export function ShareDialog({ onClose }: { onClose: () => void }) {
  const { state } = useCalculator();
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLink(null);
    setError(null);
    encodeSharePayload(stateToDocument(state))
      .then((payload) => {
        if (cancelled) return;
        setLink(buildShareUrl(payload, window.location.origin));
      })
      .catch(() => {
        if (!cancelled) setError('Could not create a share link in this browser.');
      });
    return () => {
      cancelled = true;
    };
  }, [state]);

  const handleCopy = async (): Promise<void> => {
    if (!link) return;
    const ok = await copyTextToClipboard(link);
    if (ok) {
      setCopied(true);
      inputRef.current?.select();
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      inputRef.current?.select();
      setError('Copying failed — select the link above and copy it manually.');
    }
  };

  return (
    <Modal open onClose={onClose} title="Share this graph">
      <div className="flex flex-col gap-3">
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : link === null ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">Creating your link…</p>
        ) : (
          <>
            <label
              htmlFor="share-link-input"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Share link
            </label>
            <div className="flex gap-2">
              <input
                id="share-link-input"
                ref={inputRef}
                readOnly
                value={link}
                onFocus={(event) => event.target.select()}
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs
                  text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleCopy}
                icon={<LinkIcon className="h-4 w-4" />}
              >
                {copied ? 'Copied' : 'Copy link'}
              </Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The link contains your graph data — anyone with it can view this graph. It opens on a
              page that is never indexed by search engines.
            </p>
            <div className="flex justify-end">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
              >
                Open link in a new tab
              </a>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Import dialog                                                       */
/* ------------------------------------------------------------------ */

type ImportStage = 'input' | 'preview';

export function ImportDialog({ onClose }: { onClose: () => void }) {
  const { dispatch, isDirty } = useCalculator();
  const [stage, setStage] = useState<ImportStage>('input');
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [document, setDocument] = useState<GraphDocument | null>(null);
  const [summary, setSummary] = useState<DocumentSummary | null>(null);
  const [confirming, setConfirming] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetToInput = (): void => {
    setStage('input');
    setDocument(null);
    setSummary(null);
    setConfirming(false);
    setError(null);
  };

  const reviewText = (raw: string, sourceLabel: string): void => {
    setError(null);
    if (raw.trim().length === 0) {
      setError('Paste graph JSON or choose a file first.');
      return;
    }
    if (raw.length > MAX_IMPORT_BYTES) {
      setError(`The ${sourceLabel} is larger than ${MAX_IMPORT_BYTES / 1024} KB and was rejected.`);
      return;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch {
      setError('The file is not valid JSON.');
      return;
    }
    const migrated = migrateDocument(parsed);
    if (!migrated.ok) {
      setError(migrated.error);
      return;
    }
    const validated = validateGraphDocument(migrated.document);
    if (!validated.ok) {
      const shown = validated.errors.slice(0, 3).join(' ');
      const more =
        validated.errors.length > 3 ? ` (${validated.errors.length - 3} more issues)` : '';
      setError(`The graph failed validation: ${shown}${more}`);
      return;
    }
    setDocument(validated.document);
    setSummary(summarizeDocument(validated.document));
    setStage('preview');
  };

  const handleFileChange = async (file: File | null): Promise<void> => {
    if (!file) return;
    setFileName(file.name);
    if (file.size > MAX_IMPORT_BYTES) {
      setError(`“${file.name}” is larger than ${MAX_IMPORT_BYTES / 1024} KB and was rejected.`);
      return;
    }
    try {
      const raw = await file.text();
      setText(raw);
      reviewText(raw, 'file');
    } catch {
      setError('Could not read the file.');
    }
  };

  const doImport = (): void => {
    if (!document) return;
    dispatch({ type: 'HYDRATE', state: documentToState(document) });
    onClose();
  };

  const requestImport = (): void => {
    if (isDirty) {
      setConfirming(true);
      return;
    }
    doImport();
  };

  return (
    <Modal open onClose={onClose} title="Import graph">
      {stage === 'input' ? (
        <div className="flex flex-col gap-3">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="sr-only"
              aria-label="Choose a graph JSON file"
              onChange={(event) => void handleFileChange(event.target.files?.[0] ?? null)}
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              icon={<UploadIcon className="h-4 w-4" />}
            >
              {fileName ? `File: ${fileName}` : 'Choose a .json file'}
            </Button>
          </div>
          <label
            htmlFor="import-json-text"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Or paste graph JSON
          </label>
          <textarea
            id="import-json-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={6}
            spellCheck={false}
            placeholder='{"app": "graphing-calculator", "version": 1, …}'
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs
              text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Imports are validated and size-limited ({MAX_IMPORT_BYTES / 1024} KB max). Imported data
            is never executed — it is only read as data.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => reviewText(text, 'pasted text')}>
              Review import
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {summary && (
            <div className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {summary.name ?? 'Untitled graph'}
              </p>
              <ul className="mt-2 flex max-h-48 flex-col gap-1 overflow-y-auto text-slate-700 dark:text-slate-300">
                {summary.expressions.map((expression, index) => (
                  <li key={index} className="font-mono text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{expression.label}: </span>
                    {expression.summary}
                    {expression.visible ? '' : ' (hidden)'}
                  </li>
                ))}
              </ul>
              {summary.variableCount > 0 && (
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  Variables:{' '}
                  {summary.variables.map((v) => `${v.name} = ${v.expression}`).join(', ')}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                View: x ∈ [{summary.viewport.xMin}, {summary.viewport.xMax}], y ∈ [
                {summary.viewport.yMin}, {summary.viewport.yMax}]
              </p>
            </div>
          )}
          {confirming ? (
            <div
              className="flex items-center justify-between gap-2 rounded-md bg-amber-50 px-3 py-2 text-sm
                text-amber-900 dark:bg-amber-950 dark:text-amber-200"
            >
              <span className="inline-flex items-center gap-2">
                <AlertTriangleIcon className="h-4 w-4 shrink-0" />
                You have unsaved changes. Importing replaces the current graph.
              </span>
              <span className="flex shrink-0 gap-2">
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={doImport}>
                  Import anyway
                </Button>
              </span>
            </div>
          ) : (
            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={resetToInput}>
                Back
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={requestImport}>
                  Import graph
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
