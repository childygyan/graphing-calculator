/**
 * Named local saves: a small library of graphs stored in localStorage.
 * Quota and privacy-mode failures are caught and reported honestly —
 * the in-memory workspace keeps working regardless.
 */

import {
  GRAPH_DOCUMENT_VERSION,
  MAX_DOCUMENT_NAME_CHARS,
  migrateDocument,
  type GraphDocument,
} from './document.js';
import { validateGraphDocument } from './validate.js';

/** localStorage key for the named-save library. */
export const SAVED_GRAPHS_KEY = 'graphing-calculator-saved-graphs-v1';

/** Hard cap on the number of named saves (localStorage is small). */
export const MAX_SAVED_GRAPHS = 50;

export interface SavedGraphEntry {
  id: string;
  name: string;
  savedAt: number;
  document: GraphDocument;
}

export type SaveResult = { ok: true; entry: SavedGraphEntry } | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function createEntryId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'save-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

function readRaw(): SavedGraphEntry[] {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return [];
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(SAVED_GRAPHS_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return [];
  }
  if (!isRecord(parsed) || !Array.isArray(parsed.saves)) return [];
  const out: SavedGraphEntry[] = [];
  for (const item of parsed.saves) {
    if (!isRecord(item) || typeof item.id !== 'string' || typeof item.name !== 'string') continue;
    const migrated = migrateDocument(item.document);
    if (!migrated.ok) continue;
    const validated = validateGraphDocument(migrated.document);
    if (!validated.ok) continue;
    out.push({
      id: item.id,
      name: item.name,
      savedAt: typeof item.savedAt === 'number' ? item.savedAt : 0,
      document: validated.document,
    });
  }
  return out;
}

function writeRaw(entries: SavedGraphEntry[]): void {
  window.localStorage.setItem(SAVED_GRAPHS_KEY, JSON.stringify({ saves: entries }));
}

/** List named saves, newest first. Never throws. */
export function listSavedGraphs(): SavedGraphEntry[] {
  try {
    return readRaw().sort((a, b) => b.savedAt - a.savedAt);
  } catch {
    return [];
  }
}

/** Validate a save name; returns the trimmed name or an error. */
export function cleanSaveName(
  name: string
): { ok: true; name: string } | { ok: false; error: string } {
  const trimmed = name.trim();
  if (trimmed.length === 0) return { ok: false, error: 'Give the graph a name.' };
  if (trimmed.length > MAX_DOCUMENT_NAME_CHARS) {
    return { ok: false, error: `Keep the name under ${MAX_DOCUMENT_NAME_CHARS} characters.` };
  }
  return { ok: true, name: trimmed };
}

/** Save (or overwrite by name) a document under a human-readable name. */
export function saveNamedGraph(name: string, document: GraphDocument): SaveResult {
  const cleaned = cleanSaveName(name);
  if (!cleaned.ok) return cleaned;
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return { ok: false, error: 'Local storage is not available in this browser.' };
  }
  let entries: SavedGraphEntry[];
  try {
    entries = readRaw();
  } catch {
    return { ok: false, error: 'Could not read the saved-graph library.' };
  }
  const now = Date.now();
  const documentWithName: GraphDocument = { ...document, name: cleaned.name, savedAt: now };
  const existingIndex = entries.findIndex(
    (entry) => entry.name.toLowerCase() === cleaned.name.toLowerCase()
  );
  if (existingIndex >= 0) {
    entries[existingIndex] = {
      ...entries[existingIndex],
      savedAt: now,
      document: documentWithName,
    };
  } else {
    if (entries.length >= MAX_SAVED_GRAPHS) {
      return {
        ok: false,
        error: `The library is full (${MAX_SAVED_GRAPHS} saved graphs). Delete one first.`,
      };
    }
    entries.push({
      id: createEntryId(),
      name: cleaned.name,
      savedAt: now,
      document: documentWithName,
    });
  }
  try {
    writeRaw(entries);
  } catch {
    return {
      ok: false,
      error: 'Could not save — browser storage is unavailable or full.',
    };
  }
  const entry = entries.find((e) => e.name.toLowerCase() === cleaned.name.toLowerCase());
  if (!entry) return { ok: false, error: 'Save failed unexpectedly.' };
  return { ok: true, entry };
}

/** Rename a saved graph. */
export function renameSavedGraph(id: string, name: string): SaveResult {
  const cleaned = cleanSaveName(name);
  if (!cleaned.ok) return cleaned;
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return { ok: false, error: 'Local storage is not available in this browser.' };
  }
  let entries: SavedGraphEntry[];
  try {
    entries = readRaw();
  } catch {
    return { ok: false, error: 'Could not read the saved-graph library.' };
  }
  const index = entries.findIndex((entry) => entry.id === id);
  if (index < 0) return { ok: false, error: 'That saved graph no longer exists.' };
  if (
    entries.some(
      (entry) => entry.id !== id && entry.name.toLowerCase() === cleaned.name.toLowerCase()
    )
  ) {
    return { ok: false, error: 'A saved graph with that name already exists.' };
  }
  entries[index] = {
    ...entries[index],
    name: cleaned.name,
    document: { ...entries[index].document, name: cleaned.name },
  };
  try {
    writeRaw(entries);
  } catch {
    return { ok: false, error: 'Could not rename — browser storage is unavailable or full.' };
  }
  return { ok: true, entry: entries[index] };
}

/** Delete a saved graph. Returns true when something was removed. */
export function deleteSavedGraph(id: string): boolean {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return false;
  let entries: SavedGraphEntry[];
  try {
    entries = readRaw();
  } catch {
    return false;
  }
  const next = entries.filter((entry) => entry.id !== id);
  if (next.length === entries.length) return false;
  try {
    writeRaw(next);
  } catch {
    return false;
  }
  return true;
}

/** Find one saved graph by id (validated document). */
export function getSavedGraph(id: string): SavedGraphEntry | null {
  return listSavedGraphs().find((entry) => entry.id === id) ?? null;
}

/** Current document version, re-exported for save metadata honesty. */
export const SAVED_DOCUMENT_VERSION: number = GRAPH_DOCUMENT_VERSION;
