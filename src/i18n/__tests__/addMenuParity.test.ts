import { describe, expect, it } from 'vitest';
import { de, en, es, fr, it as italian, pt } from '../index.js';

const LOCALES = { en, es, de, fr, it: italian, pt } as const;

/** Collect every leaf key path of a nested object. */
function leafPaths(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null) return [prefix];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leafPaths(item, `${prefix}[${index}]`));
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    leafPaths(child, prefix === '' ? key : `${prefix}.${key}`)
  );
}

describe('calculator i18n parity for the Add menu', () => {
  const reference = leafPaths(en.calculator.shell.expressions).sort();

  for (const locale of Object.keys(LOCALES)) {
    it(`locale ${locale} has every expressions key`, () => {
      const dictionary = LOCALES[locale as keyof typeof LOCALES];
      const actual = leafPaths(dictionary.calculator.shell.expressions).sort();
      expect(actual).toEqual(reference);
    });
  }

  it('has no empty strings in the new editor namespaces', () => {
    for (const [locale, dictionary] of Object.entries(LOCALES)) {
      const expressions = dictionary.calculator.shell.expressions;
      for (const namespace of [
        'addMenu',
        'tableEditor',
        'noteEditor',
        'folderRow',
        'imageEditor',
        'actionEditor',
      ] as const) {
        for (const path of leafPaths(expressions[namespace])) {
          const value = path
            .split('.')
            .reduce<unknown>(
              (acc, part) => (acc as Record<string, unknown>)?.[part],
              expressions[namespace]
            );
          // Array entries are {kind,label} objects — labels must be non-empty.
          if (typeof value === 'string') {
            expect(value.trim().length, `${locale}.${namespace}.${path}`).toBeGreaterThan(0);
          }
        }
      }
    }
  });

  it('offers all ten kinds in the row type selector', () => {
    for (const [locale, dictionary] of Object.entries(LOCALES)) {
      const kinds = dictionary.calculator.shell.expressions.kindOptions.map((o) => o.kind).sort();
      expect(kinds, locale).toEqual(
        [
          'action',
          'cartesian',
          'folder',
          'image',
          'inequality',
          'parametric',
          'point',
          'polar',
          'table',
          'text',
        ].sort()
      );
    }
  });
});
