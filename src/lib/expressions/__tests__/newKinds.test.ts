import { describe, expect, it } from 'vitest';
import { createExpression, getExpressionSummary, isExpressionKind } from '../expressions.js';
import {
  applyFolderVisibility,
  findParentFolder,
  getFolderChildren,
  getFolders,
  getTopLevelExpressions,
  isFolderExpression,
  moveExpressionToFolder,
  removeExpressionFromFolders,
} from '../folders.js';
import type { Expression } from '../../../types/calculator.js';

let nextId = 0;
function make(kind: 'cartesian' | 'folder', overrides: Partial<Expression> = {}): Expression {
  nextId += 1;
  const base = createExpression(kind);
  return { ...base, id: `expr-${nextId}`, ...overrides } as Expression;
}

describe('new expression kinds', () => {
  it('creates folder/image/action expressions with sane defaults', () => {
    const folder = createExpression('folder');
    expect(folder.kind).toBe('folder');
    if (folder.kind === 'folder') {
      expect(folder.definition.collapsed).toBe(false);
      expect(folder.definition.children).toEqual([]);
    }

    const image = createExpression('image');
    expect(image.kind).toBe('image');
    if (image.kind === 'image') {
      expect(image.definition.src).toBe('');
      expect(image.definition.centerX).toBe(0);
      expect(image.definition.width).toBe(4);
      expect(image.definition.opacity).toBe(1);
    }

    const action = createExpression('action');
    expect(action.kind).toBe('action');
    if (action.kind === 'action') {
      expect(action.definition.assignments).toEqual([{ variable: 'a', value: 'a + 1' }]);
      expect(typeof action.definition.buttonLabel).toBe('string');
    }
  });

  it('recognizes the new kinds', () => {
    for (const kind of ['folder', 'image', 'action'] as const) {
      expect(isExpressionKind(kind)).toBe(true);
    }
    expect(isExpressionKind('nope')).toBe(false);
  });

  it('summarizes the new kinds', () => {
    expect(getExpressionSummary(createExpression('folder'))).toBe('Folder (0 items)');
    expect(getExpressionSummary(createExpression('image'))).toBe('Image: (no source)');
    expect(getExpressionSummary(createExpression('action'))).toBe('Action (1 assignment)');
    const note = createExpression('text');
    expect(getExpressionSummary(note)).toBe('Note: (empty)');
  });
});

describe('folder helpers', () => {
  it('nests children under their folder and keeps top-level order', () => {
    const a = make('cartesian');
    const b = make('cartesian');
    const folder = make('folder', {
      definition: { collapsed: false, children: [b.id] },
    } as Partial<Expression>);
    const expressions = [a, b, folder];

    expect(isFolderExpression(folder)).toBe(true);
    expect(isFolderExpression(a)).toBe(false);
    expect(getFolders(expressions)).toHaveLength(1);
    expect(getTopLevelExpressions(expressions).map((e) => e.id)).toEqual([a.id, folder.id]);
    expect(
      getFolderChildren(folder as Extract<Expression, { kind: 'folder' }>, expressions).map(
        (e) => e.id
      )
    ).toEqual([b.id]);
    expect(findParentFolder(expressions, b.id)?.id).toBe(folder.id);
    expect(findParentFolder(expressions, a.id)).toBeNull();
  });

  it('hides children of collapsed or hidden folders from the graph', () => {
    const a = make('cartesian');
    const b = make('cartesian');
    const folder = make('folder', {
      visible: true,
      definition: { collapsed: true, children: [b.id] },
    } as Partial<Expression>);
    const visible = applyFolderVisibility([a, b, folder]).filter((e) => e.visible !== false);
    expect(visible.map((e) => e.id)).toContain(a.id);
    expect(visible.map((e) => e.id)).toContain(folder.id);
    expect(visible.map((e) => e.id)).not.toContain(b.id);

    const hiddenFolder = make('folder', {
      visible: false,
      definition: { collapsed: false, children: [a.id] },
    } as Partial<Expression>);
    const visible2 = applyFolderVisibility([a, hiddenFolder]).filter((e) => e.visible !== false);
    expect(visible2.map((e) => e.id)).not.toContain(a.id);
  });

  it('moves expressions between folders without nesting folders', () => {
    const a = make('cartesian');
    const folderA = make('folder');
    const folderB = make('folder');
    const expressions = [a, folderA, folderB];

    const moved = moveExpressionToFolder(expressions, a.id, (folderA as { id: string }).id);
    const folderAfter = moved.find((e) => e.id === folderA.id);
    expect(
      folderAfter && folderAfter.kind === 'folder' ? folderAfter.definition.children : []
    ).toContain(a.id);
    expect(getTopLevelExpressions(moved).map((e) => e.id)).not.toContain(a.id);

    // Moving a folder into a folder is refused (no nesting).
    const refused = moveExpressionToFolder(moved, folderA.id, folderB.id);
    expect(refused).toBe(moved);

    // Moving back to top level cleans the folder's children.
    const top = moveExpressionToFolder(moved, a.id, null);
    expect(getTopLevelExpressions(top).map((e) => e.id)).toContain(a.id);
  });

  it('cleans folder membership when an expression is removed', () => {
    const a = make('cartesian');
    const folder = make('folder', {
      definition: { collapsed: false, children: [a.id] },
    } as Partial<Expression>);
    const cleaned = removeExpressionFromFolders([a, folder], a.id);
    const folderAfter = cleaned.find((e) => e.id === folder.id);
    expect(
      folderAfter && folderAfter.kind === 'folder' ? folderAfter.definition.children : []
    ).toEqual([]);
  });
});
