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
import type { CalculatorShellStrings } from '../../i18n/types.js';
import { format } from '../../i18n/locales.js';

type PersistenceStrings = CalculatorShellStrings['persistence'];
type ModalStrings = PersistenceStrings['modal'];

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

export function SaveDialog({
  onClose,
  strings,
  modal,
}: {
  onClose: () => void;
  strings: PersistenceStrings['saveDialog'];
  modal: ModalStrings;
}) {
  const { state, markSaved } = useCalculator();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const t = strings;

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
    <Modal
      open
      onClose={onClose}
      title={t.title}
      closeLabel={modal.close}
      backdropLabel={modal.backdrop}
    >
      {saved ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-300" role="status">
          {t.saved}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <TextInput
            label={t.nameLabel}
            value={name}
            onChange={setName}
            placeholder={t.namePlaceholder}
            hint={t.nameHint}
            error={error ?? undefined}
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              {t.cancel}
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {t.save}
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

export function LibraryDialog({
  onClose,
  strings,
  modal,
}: {
  onClose: () => void;
  strings: PersistenceStrings['libraryDialog'];
  modal: ModalStrings;
}) {
  const { dispatch, isDirty } = useCalculator();
  const t = strings;
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
    <Modal
      open
      onClose={onClose}
      title={t.title}
      closeLabel={modal.close}
      backdropLabel={modal.backdrop}
    >
      <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto">
        {entries.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.emptyLead} <strong>{t.emptySave}</strong>
            {t.emptyTail}
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
                      label={t.renameLabel}
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
                        {t.cancel}
                      </Button>
                      <Button variant="primary" size="sm" onClick={commitRename}>
                        {t.rename}
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
                        {format(t.entryMetaTemplate, {
                          date: formatDate(entry.savedAt),
                          count: summary.expressionCount,
                          plural: summary.expressionCount === 1 ? '' : 's',
                          variables:
                            summary.variableCount > 0
                              ? format(t.variablesPartTemplate, {
                                  count: summary.variableCount,
                                  plural: summary.variableCount === 1 ? '' : 's',
                                })
                              : '',
                        })}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <Button variant="secondary" size="sm" onClick={() => requestRestore(entry)}>
                        {t.restore}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={format(t.renameAriaTemplate, { name: entry.name })}
                        onClick={() => startRename(entry)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={format(t.deleteAriaTemplate, { name: entry.name })}
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
                    <span>{t.deleteConfirm}</span>
                    <span className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
                        {t.keep}
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => confirmDelete(entry.id)}>
                        {t.delete}
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
                      {t.unsavedWarning}
                    </span>
                    <span className="flex shrink-0 gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setPendingRestore(null)}>
                        {t.cancel}
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => restoreEntry(entry)}>
                        {t.restoreAnyway}
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

export function ShareDialog({
  onClose,
  strings,
  modal,
}: {
  onClose: () => void;
  strings: PersistenceStrings['shareDialog'];
  modal: ModalStrings;
}) {
  const { state } = useCalculator();
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = strings;

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
        if (!cancelled) setError(t.createFailed);
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
      setError(t.copyFailed);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={t.title}
      closeLabel={modal.close}
      backdropLabel={modal.backdrop}
    >
      <div className="flex flex-col gap-3">
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : link === null ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">{t.creating}</p>
        ) : (
          <>
            <label
              htmlFor="share-link-input"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              {t.linkLabel}
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
                {copied ? t.copied : t.copyLink}
              </Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.note}</p>
            <div className="flex justify-end">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
              >
                {t.openNewTab}
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

export function ImportDialog({
  onClose,
  strings,
  modal,
}: {
  onClose: () => void;
  strings: PersistenceStrings['importDialog'];
  modal: ModalStrings;
}) {
  const { dispatch, isDirty } = useCalculator();
  const t = strings;
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
      setError(t.errors.empty);
      return;
    }
    if (raw.length > MAX_IMPORT_BYTES) {
      setError(
        format(t.errors.tooLargeTemplate, { source: sourceLabel, maxKb: MAX_IMPORT_BYTES / 1024 })
      );
      return;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch {
      setError(t.errors.invalidJson);
      return;
    }
    const migrated = migrateDocument(parsed);
    if (!migrated.ok) {
      setError(migrated.error);
      return;
    }
    const validated = validateGraphDocument(migrated.document);
    if (!validated.ok) {
      setError(
        format(t.errors.validationFailedTemplate, {
          issues: validated.errors.slice(0, 3).join(' '),
          more: validated.errors.length > 3 ? ` (${validated.errors.length - 3} more issues)` : '',
        })
      );
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
      setError(
        format(t.errors.fileTooLargeTemplate, { name: file.name, maxKb: MAX_IMPORT_BYTES / 1024 })
      );
      return;
    }
    try {
      const raw = await file.text();
      setText(raw);
      reviewText(raw, 'file');
    } catch {
      setError(t.errors.unreadable);
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
    <Modal
      open
      onClose={onClose}
      title={t.title}
      closeLabel={modal.close}
      backdropLabel={modal.backdrop}
    >
      {stage === 'input' ? (
        <div className="flex flex-col gap-3">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="sr-only"
              aria-label={t.chooseFileAriaLabel}
              onChange={(event) => void handleFileChange(event.target.files?.[0] ?? null)}
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              icon={<UploadIcon className="h-4 w-4" />}
            >
              {fileName ? format(t.fileChosenTemplate, { name: fileName }) : t.chooseFile}
            </Button>
          </div>
          <label
            htmlFor="import-json-text"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {t.orPaste}
          </label>
          <textarea
            id="import-json-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={6}
            spellCheck={false}
            placeholder={t.pastePlaceholder}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs
              text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          )}
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {format(t.sizeNoteTemplate, { maxKb: MAX_IMPORT_BYTES / 1024 })}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              {t.cancel}
            </Button>
            <Button variant="primary" onClick={() => reviewText(text, 'pasted text')}>
              {t.review}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {summary && (
            <div className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {summary.name ?? t.untitled}
              </p>
              <ul className="mt-2 flex max-h-48 flex-col gap-1 overflow-y-auto text-slate-700 dark:text-slate-300">
                {summary.expressions.map((expression, index) => (
                  <li key={index} className="font-mono text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{expression.label}: </span>
                    {expression.summary}
                    {expression.visible ? '' : t.hiddenSuffix}
                  </li>
                ))}
              </ul>
              {summary.variableCount > 0 && (
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  {t.variablesPrefix}
                  {summary.variables.map((v) => `${v.name} = ${v.expression}`).join(', ')}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {format(t.viewTemplate, {
                  xMin: summary.viewport.xMin,
                  xMax: summary.viewport.xMax,
                  yMin: summary.viewport.yMin,
                  yMax: summary.viewport.yMax,
                })}
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
                {t.unsavedWarning}
              </span>
              <span className="flex shrink-0 gap-2">
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                  {t.cancel}
                </Button>
                <Button variant="primary" size="sm" onClick={doImport}>
                  {t.importAnyway}
                </Button>
              </span>
            </div>
          ) : (
            <div className="flex justify-between gap-2">
              <Button variant="ghost" onClick={resetToInput}>
                {t.back}
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={onClose}>
                  {t.cancel}
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
