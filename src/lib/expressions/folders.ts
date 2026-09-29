/**
 * Folder helpers — grouping logic for folder expressions.
 *
 * Folders reference their children by id (`definition.children`); the flat
 * `expressions` array stays the source of truth for ordering. An expression
 * nested in a folder still renders on the graph unless the folder (or the
 * expression itself) is hidden.
 */

import type { Expression, FolderExpression } from '../../types/calculator.js';

export function isFolderExpression(expression: Expression): expression is FolderExpression {
  return expression.kind === 'folder';
}

/** All folders in list order. */
export function getFolders(expressions: Expression[]): FolderExpression[] {
  return expressions.filter(isFolderExpression);
}

/** Ids of expressions nested inside any folder (first folder wins). */
export function getNestedExpressionIds(expressions: Expression[]): Set<string> {
  const nested = new Set<string>();
  for (const folder of getFolders(expressions)) {
    for (const childId of folder.definition.children) {
      if (!nested.has(childId)) nested.add(childId);
    }
  }
  return nested;
}

/** Top-level rows: folders plus expressions that no folder claims. */
export function getTopLevelExpressions(expressions: Expression[]): Expression[] {
  const nested = getNestedExpressionIds(expressions);
  return expressions.filter((e) => !nested.has(e.id));
}

/** Children of one folder, in the folder's order, skipping stale ids. */
export function getFolderChildren(
  folder: FolderExpression,
  expressions: Expression[]
): Expression[] {
  const byId = new Map(expressions.map((e) => [e.id, e]));
  const children: Expression[] = [];
  for (const childId of folder.definition.children) {
    const child = byId.get(childId);
    // Folders cannot nest: a folder id listed as a child is ignored.
    if (child && child.id !== folder.id && child.kind !== 'folder') children.push(child);
  }
  return children;
}

/** The folder (if any) that directly contains the given expression id. */
export function findParentFolder(
  expressions: Expression[],
  expressionId: string
): FolderExpression | null {
  for (const folder of getFolders(expressions)) {
    if (folder.definition.children.includes(expressionId)) return folder;
  }
  return null;
}

/**
 * Effective graph visibility: an expression hidden by itself or by its
 * parent folder does not draw. Returns a shallow-copied array; folders,
 * notes, and actions never draw (handled by the drawable builders).
 */
export function applyFolderVisibility(expressions: Expression[]): Expression[] {
  const hiddenFolderIds = new Set(
    getFolders(expressions)
      .filter((f) => f.visible !== true || f.definition.collapsed === true)
      .map((f) => f.id)
  );
  if (hiddenFolderIds.size === 0) return expressions;
  const parentOf = new Map<string, string>();
  for (const folder of getFolders(expressions)) {
    for (const childId of folder.definition.children) {
      if (!parentOf.has(childId)) parentOf.set(childId, folder.id);
    }
  }
  return expressions.map((e) => {
    const parentId = parentOf.get(e.id);
    if (parentId && hiddenFolderIds.has(parentId) && e.visible) {
      return { ...e, visible: false };
    }
    return e;
  });
}

/**
 * Move an expression into a folder (or back to the top level with null).
 * Removes the id from every other folder first so an expression is never
 * claimed twice. Folders cannot be nested.
 */
export function moveExpressionToFolder(
  expressions: Expression[],
  expressionId: string,
  folderId: string | null
): Expression[] {
  const moving = expressions.find((e) => e.id === expressionId);
  // Folders cannot be nested inside other folders.
  if (!moving || moving.kind === 'folder') return expressions;
  return expressions.map((e) => {
    if (!isFolderExpression(e)) return e;
    const children = e.definition.children.filter((id) => id !== expressionId);
    if (e.id === folderId) children.push(expressionId);
    if (children.length === e.definition.children.length && e.id !== folderId) return e;
    return { ...e, definition: { ...e.definition, children } };
  });
}

/** Drop an expression id from every folder's children (used on delete). */
export function removeExpressionFromFolders(
  expressions: Expression[],
  expressionId: string
): Expression[] {
  return expressions.map((e) => {
    if (!isFolderExpression(e) || !e.definition.children.includes(expressionId)) return e;
    return {
      ...e,
      definition: {
        ...e.definition,
        children: e.definition.children.filter((id) => id !== expressionId),
      },
    };
  });
}
