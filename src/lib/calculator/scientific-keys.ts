/**
 * Scientific calculator key layout: which keys exist, where they sit,
 * what text they insert, and how 2nd-shift swaps them. Pure data —
 * visible labels and accessible names come from the i18n dictionaries
 * (`ScientificStrings['island'].keys`), keyed by the same stable ids.
 *
 * Every `insert` string is plain expression syntax the shared engine
 * already understands (probed in `scientific-keys.test.ts`), except the
 * factorial/combinatorics notations (`!`, `nCr(`, `nPr(`), which the
 * engine honestly rejects — identical to typing them on a keyboard today.
 * No evaluation logic lives here.
 */

import type { ScientificKeyId } from '../../i18n/types.js';

export type KeyAction = 'insert' | 'evaluate' | 'clear' | 'backspace' | 'shift' | 'negate' | 'ans';

export type KeyKind = 'digit' | 'operator' | 'function' | 'control' | 'equals';

export interface KeyLayout {
  id: ScientificKeyId;
  action: KeyAction;
  /** Expression text inserted when 2nd-shift is off (insert actions only). */
  insert: string;
  /** Expression text inserted when 2nd-shift is on. */
  altInsert?: string;
  kind: KeyKind;
  /** Grid columns spanned. */
  span?: 2 | 3;
}

/** True when the key changes under 2nd-shift. */
export function isShiftable(key: KeyLayout): boolean {
  return key.altInsert !== undefined;
}

/** Resolve the text a key inserts given the current 2nd-shift state. */
export function resolveInsert(key: KeyLayout, shifted: boolean): string {
  return shifted && key.altInsert !== undefined ? key.altInsert : key.insert;
}

/** Scientific function rows (6 columns each), above the keypad. */
export const FUNCTION_ROWS: KeyLayout[][] = [
  [
    { id: 'sin', action: 'insert', insert: 'sin(', altInsert: 'asin(', kind: 'function' },
    { id: 'cos', action: 'insert', insert: 'cos(', altInsert: 'acos(', kind: 'function' },
    { id: 'tan', action: 'insert', insert: 'tan(', altInsert: 'atan(', kind: 'function' },
    { id: 'log', action: 'insert', insert: 'log10(', altInsert: '10^(', kind: 'function' },
    { id: 'ln', action: 'insert', insert: 'ln(', altInsert: 'e^(', kind: 'function' },
    { id: 'pow', action: 'insert', insert: '^', kind: 'function' },
  ],
  [
    { id: 'sqrt', action: 'insert', insert: '√(', kind: 'function' },
    { id: 'square', action: 'insert', insert: '^2', kind: 'function' },
    { id: 'reciprocal', action: 'insert', insert: '^(-1)', kind: 'function' },
    { id: 'abs', action: 'insert', insert: 'abs(', kind: 'function' },
    { id: 'factorial', action: 'insert', insert: '!', kind: 'function' },
    { id: 'ncr', action: 'insert', insert: 'nCr(', kind: 'function' },
  ],
];

/** Main keypad (5 columns each); the = key spans 3 columns. */
export const KEYPAD_ROWS: KeyLayout[][] = [
  [
    { id: 'shift', action: 'shift', insert: '', kind: 'control' },
    { id: 'lparen', action: 'insert', insert: '(', kind: 'control' },
    { id: 'rparen', action: 'insert', insert: ')', kind: 'control' },
    { id: 'ac', action: 'clear', insert: '', kind: 'control' },
    { id: 'backspace', action: 'backspace', insert: '', kind: 'control' },
  ],
  [
    { id: 'pi', action: 'insert', insert: 'π', kind: 'function' },
    { id: 'd7', action: 'insert', insert: '7', kind: 'digit' },
    { id: 'd8', action: 'insert', insert: '8', kind: 'digit' },
    { id: 'd9', action: 'insert', insert: '9', kind: 'digit' },
    { id: 'div', action: 'insert', insert: '÷', kind: 'operator' },
  ],
  [
    { id: 'e', action: 'insert', insert: 'e', kind: 'function' },
    { id: 'd4', action: 'insert', insert: '4', kind: 'digit' },
    { id: 'd5', action: 'insert', insert: '5', kind: 'digit' },
    { id: 'd6', action: 'insert', insert: '6', kind: 'digit' },
    { id: 'mul', action: 'insert', insert: '×', kind: 'operator' },
  ],
  [
    { id: 'ee', action: 'insert', insert: '×10^(', kind: 'function' },
    { id: 'd1', action: 'insert', insert: '1', kind: 'digit' },
    { id: 'd2', action: 'insert', insert: '2', kind: 'digit' },
    { id: 'd3', action: 'insert', insert: '3', kind: 'digit' },
    { id: 'sub', action: 'insert', insert: '−', kind: 'operator' },
  ],
  [
    { id: 'ans', action: 'ans', insert: '', kind: 'function' },
    { id: 'negate', action: 'negate', insert: '', kind: 'control' },
    { id: 'd0', action: 'insert', insert: '0', kind: 'digit' },
    { id: 'dot', action: 'insert', insert: '.', kind: 'digit' },
    { id: 'add', action: 'insert', insert: '+', kind: 'operator' },
  ],
  [
    { id: 'percent', action: 'insert', insert: '÷100', kind: 'function' },
    { id: 'npr', action: 'insert', insert: 'nPr(', kind: 'function' },
    { id: 'equals', action: 'evaluate', insert: '', kind: 'equals', span: 3 },
  ],
];

/** Every key on the calculator, in layout order. */
export const ALL_KEYS: KeyLayout[] = [...FUNCTION_ROWS.flat(), ...KEYPAD_ROWS.flat()];
