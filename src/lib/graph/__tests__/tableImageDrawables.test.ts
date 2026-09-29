import { describe, expect, it } from 'vitest';
import { buildFunctionDrawables } from '../drawables.js';
import { VariableEnvironment } from '../../math/variables.js';
import { createExpression } from '../../expressions/expressions.js';
import type {
  Expression,
  GraphViewport,
  ImageExpression,
  TableExpression,
} from '../../../types/calculator.js';
import type { CanvasSize, ImageDrawable, PointMarkerDrawable } from '../types.js';

const VIEWPORT: GraphViewport = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };
const SIZE: CanvasSize = { width: 800, height: 600 };

let nextId = 0;
function table(rows: string[][]): TableExpression {
  nextId += 1;
  const base = createExpression('table');
  return {
    ...base,
    id: `table-${nextId}`,
    definition: { columns: ['x', 'y'], rows },
  } as TableExpression;
}

function image(definition: Partial<ImageExpression['definition']>): ImageExpression {
  nextId += 1;
  const base = createExpression('image');
  return {
    ...base,
    id: `image-${nextId}`,
    definition: {
      src: '',
      centerX: 0,
      centerY: 0,
      width: 4,
      height: 4,
      opacity: 1,
      ...definition,
    },
  } as ImageExpression;
}

function build(expressions: Expression[]) {
  const env = new VariableEnvironment([]);
  env.resolve();
  return buildFunctionDrawables(expressions, VIEWPORT, SIZE, env);
}

describe('table drawables', () => {
  it('plots each valid row as a point marker', () => {
    const drawables = build([
      table([
        ['1', '2'],
        ['3', '4'],
      ]),
    ]);
    expect(drawables).toHaveLength(1);
    const drawable = drawables[0] as PointMarkerDrawable;
    expect(drawable.kind).toBe('point');
    expect(drawable.points).toEqual([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ]);
  });

  it('evaluates math expressions in cells', () => {
    const drawables = build([table([['1 + 2', 'sqrt(16)']])]);
    const drawable = drawables[0] as PointMarkerDrawable;
    expect(drawable.points).toEqual([{ x: 3, y: 4 }]);
  });

  it('skips blank, unparsable, and non-finite cells', () => {
    const drawables = build([
      table([
        ['', ''],
        ['oops(', '1'],
        ['1/0', '1'],
        ['2', '3'],
      ]),
    ]);
    expect(drawables).toHaveLength(1);
    const drawable = drawables[0] as PointMarkerDrawable;
    expect(drawable.points).toEqual([{ x: 2, y: 3 }]);
  });

  it('draws nothing when no row is plottable', () => {
    expect(build([table([['', '']])])).toHaveLength(0);
  });

  it('follows variables used inside cells', () => {
    const env = new VariableEnvironment([
      { name: 'a', expression: '5', min: -10, max: 10, step: 0.1 },
    ]);
    env.resolve();
    const drawables = buildFunctionDrawables([table([['a', 'a * 2']])], VIEWPORT, SIZE, env);
    const drawable = drawables[0] as PointMarkerDrawable;
    expect(drawable.points).toEqual([{ x: 5, y: 10 }]);
  });
});

describe('image drawables', () => {
  it('emits an image drawable with world geometry', () => {
    const drawables = build([
      image({
        src: 'https://example.com/a.png',
        centerX: 1,
        centerY: 2,
        width: 4,
        height: 2,
        opacity: 0.5,
      }),
    ]);
    expect(drawables).toHaveLength(1);
    const drawable = drawables[0] as ImageDrawable;
    expect(drawable.kind).toBe('image');
    expect(drawable.src).toBe('https://example.com/a.png');
    expect(drawable.centerX).toBe(1);
    expect(drawable.centerY).toBe(2);
    expect(drawable.width).toBe(4);
    expect(drawable.height).toBe(2);
    expect(drawable.opacity).toBe(0.5);
  });

  it('skips images with an empty source', () => {
    expect(build([image({ src: '' })])).toHaveLength(0);
    expect(build([image({ src: '   ' })])).toHaveLength(0);
  });

  it('skips images with non-positive geometry', () => {
    expect(build([image({ src: 'https://example.com/a.png', width: 0 })])).toHaveLength(0);
    expect(build([image({ src: 'https://example.com/a.png', height: -2 })])).toHaveLength(0);
  });

  it('clamps opacity into [0, 1]', () => {
    const drawables = build([image({ src: 'https://example.com/a.png', opacity: 7 })]);
    expect((drawables[0] as ImageDrawable).opacity).toBe(1);
  });
});

describe('list-only kinds', () => {
  it('never draws text, folder, or action expressions', () => {
    const note = createExpression('text');
    const folder = createExpression('folder');
    const action = createExpression('action');
    expect(build([note, folder, action])).toHaveLength(0);
  });
});
