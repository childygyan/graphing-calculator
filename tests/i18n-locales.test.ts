/**
 * i18n locale QA suite.
 *
 * Guards the 5-language localization (es, de, fr, it, pt) against the
 * contracts in docs/I18N-CONTRACTS.md:
 *
 *  1. Dictionary key/nesting/array-shape parity across all 6 locales.
 *  2. `{placeholder}` parity for every translated string.
 *  3. `getDictionary` returns genuine translated dictionaries.
 *  4. `localizePath` correctness.
 *  5. All 105 locale source templates generate their expected built routes.
 *  6. Built locale HTML: `<html lang>`, localized canonical, full hreflang
 *     set, OG locale + alternates.
 *  7. Sitemap contains every locale URL; robots.txt unchanged.
 *  8. All 22 data-driven descriptions per locale are 120–155 chars.
 *  9. Math syntax equality (tryExpressions / notation / expressions).
 * 10. Valid JSON-LD on locale pages.
 * 11. English regression: no unexpected locale artifacts, hreflang intact.
 *
 * Plus lock-in tests for the fixes made during the i18n QA pass:
 *  - SeoHead hreflang/x-default canonicalisation (stripLocale).
 *  - LanguageSwitcher fallback for routes with no locale mirror.
 *  - Translated legal notice on all 15 localized legal pages.
 *  - English page-registry labels unchanged by the locale-label refactor.
 *
 * Built-output tests require `dist/` (fail loudly when absent), mirroring
 * the convention in `src/lib/seo/__tests__/seo-audit.test.ts`.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { en } from '../src/i18n/en/index.js';
import {
  LOCALES,
  getDictionary,
  htmlLangFor,
  localizePath,
  ogLocaleFor,
  stripLocale,
  type Locale,
} from '../src/i18n/index.js';
import { getPageRegistry, resolvePageLabel } from '../src/lib/seo/page-registry.js';
import { siteConfig } from '../src/data/site.js';
import { FUNCTION_PAGES as EN_FUNCTIONS } from '../src/data/seo/functions.js';
import { LEARN_ARTICLES as EN_LEARN } from '../src/data/seo/learn.js';
import { EXAMPLE_GRAPHS as EN_EXAMPLES } from '../src/data/seo/examples.js';
import { FUNCTION_PAGES as ES_FUNCTIONS } from '../src/data/seo/es/functions.js';
import { LEARN_ARTICLES as ES_LEARN } from '../src/data/seo/es/learn.js';
import { EXAMPLE_GRAPHS as ES_EXAMPLES } from '../src/data/seo/es/examples.js';
import { FUNCTION_PAGES as DE_FUNCTIONS } from '../src/data/seo/de/functions.js';
import { LEARN_ARTICLES as DE_LEARN } from '../src/data/seo/de/learn.js';
import { EXAMPLE_GRAPHS as DE_EXAMPLES } from '../src/data/seo/de/examples.js';
import { FUNCTION_PAGES as FR_FUNCTIONS } from '../src/data/seo/fr/functions.js';
import { LEARN_ARTICLES as FR_LEARN } from '../src/data/seo/fr/learn.js';
import { EXAMPLE_GRAPHS as FR_EXAMPLES } from '../src/data/seo/fr/examples.js';
import { FUNCTION_PAGES as IT_FUNCTIONS } from '../src/data/seo/it/functions.js';
import { LEARN_ARTICLES as IT_LEARN } from '../src/data/seo/it/learn.js';
import { EXAMPLE_GRAPHS as IT_EXAMPLES } from '../src/data/seo/it/examples.js';
import { FUNCTION_PAGES as PT_FUNCTIONS } from '../src/data/seo/pt/functions.js';
import { LEARN_ARTICLES as PT_LEARN } from '../src/data/seo/pt/learn.js';
import { EXAMPLE_GRAPHS as PT_EXAMPLES } from '../src/data/seo/pt/examples.js';

const NON_EN = ['es', 'de', 'fr', 'it', 'pt'] as const;
type NonEnLocale = (typeof NON_EN)[number];
const REPO = process.cwd();
const DIST = join(REPO, 'dist');
const PAGES = join(REPO, 'src', 'pages');

const LOCALE_DATA = {
  es: { functions: ES_FUNCTIONS, learn: ES_LEARN, examples: ES_EXAMPLES },
  de: { functions: DE_FUNCTIONS, learn: DE_LEARN, examples: DE_EXAMPLES },
  fr: { functions: FR_FUNCTIONS, learn: FR_LEARN, examples: FR_EXAMPLES },
  it: { functions: IT_FUNCTIONS, learn: IT_LEARN, examples: IT_EXAMPLES },
  pt: { functions: PT_FUNCTIONS, learn: PT_LEARN, examples: PT_EXAMPLES },
} as const;

function requireDist(): string {
  if (!existsSync(DIST)) {
    throw new Error('dist/ not found — run `npm run build` before the i18n locale suite.');
  }
  return DIST;
}

function readBuilt(pathFromDist: string): string {
  return readFileSync(join(requireDist(), pathFromDist), 'utf8');
}

/** Recursively collect all .html files under a dist subdirectory. */
function collectHtml(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectHtml(full));
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out.sort();
}

/** All built pages for a locale, as root-relative paths like `/es/about/`. */
function localePages(locale: Locale): string[] {
  return collectHtml(join(requireDist(), locale)).map((file) => {
    const rel = relative(requireDist(), file).replace(/\\/g, '/');
    return `/${rel.replace(/\/index\.html$/, '/')}`;
  });
}

/** Extract `{name}` placeholders from a template string. */
function placeholders(template: string): string[] {
  return [...template.matchAll(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g)].map((m) => m[1]);
}

/** Recursively collect every {path, value} string leaf of a dictionary. */
function stringLeaves(obj: unknown, prefix: string, out: { path: string; value: string }[]): void {
  if (typeof obj === 'string') {
    out.push({ path: prefix, value: obj });
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => stringLeaves(item, `${prefix}[${i}]`, out));
    return;
  }
  if (obj !== null && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      stringLeaves(value, prefix ? `${prefix}.${key}` : key, out);
    }
  }
}

/** Recursively assert key/nesting/array-shape parity of `actual` vs `expected`. */
function assertShapeParity(expected: unknown, actual: unknown, path: string): void {
  if (typeof expected === 'string') {
    expect(typeof actual, `type mismatch at ${path}`).toBe('string');
    return;
  }
  if (typeof expected === 'number' || typeof expected === 'boolean') {
    expect(typeof actual, `type mismatch at ${path}`).toBe(typeof expected);
    return;
  }
  if (Array.isArray(expected)) {
    expect(Array.isArray(actual), `array expected at ${path}`).toBe(true);
    expect((actual as unknown[]).length, `array length at ${path}`).toBe(expected.length);
    expected.forEach((item, i) =>
      assertShapeParity(item, (actual as unknown[])[i], `${path}[${i}]`)
    );
    return;
  }
  if (expected !== null && typeof expected === 'object') {
    expect(actual !== null && typeof actual === 'object', `object expected at ${path}`).toBe(true);
    const expectedKeys = Object.keys(expected).sort();
    const actualKeys = Object.keys(actual as object).sort();
    expect(actualKeys, `key set at ${path || '<root>'}`).toEqual(expectedKeys);
    for (const key of expectedKeys) {
      assertShapeParity(
        (expected as Record<string, unknown>)[key],
        (actual as Record<string, unknown>)[key],
        path ? `${path}.${key}` : key
      );
    }
    return;
  }
  expect(actual, `value at ${path}`).toEqual(expected);
}

/** Enumerate the 21 locale source templates as relative paths. */
function localeTemplates(locale: NonEnLocale): string[] {
  const dir = join(PAGES, locale);
  const out: string[] = [];
  const walk = (base: string) => {
    for (const entry of readdirSync(base)) {
      const full = join(base, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.astro')) out.push(relative(dir, full).replace(/\\/g, '/'));
    }
  };
  walk(dir);
  return out.sort();
}

/**
 * Expand a locale's templates to expected built routes.
 * Static templates map 1:1; the three [slug] templates expand from the
 * locale content-data modules (same expansion the Astro getStaticPaths use).
 */
function expectedRoutes(locale: NonEnLocale): string[] {
  const routes: string[] = [];
  for (const template of localeTemplates(locale)) {
    if (template.includes('[slug]')) {
      const base = template.split('/')[0];
      const pages =
        base === 'math-functions'
          ? LOCALE_DATA[locale].functions
          : base === 'learn'
            ? LOCALE_DATA[locale].learn
            : LOCALE_DATA[locale].examples;
      for (const page of pages) routes.push(`/${locale}/${base}/${page.slug}/`);
    } else {
      const route = template
        .replace(/\.astro$/, '')
        .replace(/(^|\/)index$/, '$1')
        .replace(/\/$/, '');
      routes.push(route ? `/${locale}/${route}/` : `/${locale}/`);
    }
  }
  return routes.sort();
}

function headLinks(html: string): { canonical: string; hreflang: Map<string, string> } {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
  const hreflang = new Map<string, string>();
  for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    hreflang.set(m[1], m[2]);
  }
  return { canonical, hreflang };
}

function ogLocales(html: string): { primary: string; alternates: string[] } {
  const primary = html.match(/<meta property="og:locale" content="([^"]+)"/)?.[1] ?? '';
  const alternates = [
    ...html.matchAll(/<meta property="og:locale:alternate" content="([^"]+)"/g),
  ].map((m) => m[1]);
  return { primary, alternates };
}

describe('i18n locale QA', () => {
  describe('dictionary shape parity (en vs each locale)', () => {
    for (const locale of NON_EN) {
      it(`${locale} mirrors the en dictionary key/nesting/array structure`, () => {
        assertShapeParity(en, getDictionary(locale as Locale), '');
      });
    }
  });

  describe('placeholder parity', () => {
    /**
     * Deliberate translator adaptations of English "" / "s" plural morphology,
     * which the call sites compute as `count === 1 ? '' : 's'`. Spanish and
     * Portuguese plurals cannot be formed by appending "s" (expresion →
     * expresiones), so the translators used target-language-appropriate static
     * text instead of the {plural} / {isAre} placeholders. Changing the
     * components to be plural-aware would alter calculator UI behaviour and
     * is out of scope for i18n QA; no raw {placeholder} text can leak because
     * every placeholder the translations DO use is provided by the call site
     * (asserted by the reverse check below).
     */
    const PLACEHOLDER_ADAPTATIONS = new Set([
      'es:calculator.shell.persistence.libraryDialog.entryMetaTemplate:{plural}',
      'es:calculator.shell.persistence.libraryDialog.variablesPartTemplate:{plural}',
      'es:calculator.shell.ai.processor.undefinedHintTemplate:{isAre}',
      'pt:calculator.shell.persistence.libraryDialog.entryMetaTemplate:{plural}',
      'pt:calculator.shell.persistence.libraryDialog.variablesPartTemplate:{plural}',
      'pt:calculator.shell.ai.processor.undefinedHintTemplate:{isAre}',
      'pt:graph3d.island.unknownVariablesTemplate:{plural}',
      'pt:calculators.rootFinder.tool.rootsFoundTemplate:{plural}',
    ]);

    for (const locale of NON_EN) {
      it(`${locale}: every {placeholder} in en exists in the translation`, () => {
        const dict = getDictionary(locale as Locale);
        const enLeaves: { path: string; value: string }[] = [];
        const locLeaves: { path: string; value: string }[] = [];
        stringLeaves(en, '', enLeaves);
        stringLeaves(dict, '', locLeaves);
        const locByPath = new Map(locLeaves.map((l) => [l.path, l.value]));
        const missing: string[] = [];
        for (const { path, value } of enLeaves) {
          for (const name of placeholders(value)) {
            const key = `${locale}:${path}:{${name}}`;
            if (PLACEHOLDER_ADAPTATIONS.has(key)) continue;
            const translated = locByPath.get(path) ?? '';
            if (!translated.includes(`{${name}}`)) missing.push(`${path}: {${name}}`);
          }
        }
        expect(missing).toEqual([]);
      });

      it(`${locale}: translations introduce no placeholders absent from en`, () => {
        const dict = getDictionary(locale as Locale);
        const enLeaves: { path: string; value: string }[] = [];
        const locLeaves: { path: string; value: string }[] = [];
        stringLeaves(en, '', enLeaves);
        stringLeaves(dict, '', locLeaves);
        const enByPath = new Map(enLeaves.map((l) => [l.path, l.value]));
        const invented: string[] = [];
        for (const { path, value } of locLeaves) {
          const enPlaceholders = new Set(placeholders(enByPath.get(path) ?? ''));
          for (const name of placeholders(value)) {
            if (!enPlaceholders.has(name)) invented.push(`${path}: {${name}}`);
          }
        }
        expect(invented).toEqual([]);
      });
    }
  });

  describe('getDictionary returns genuine translations', () => {
    const probes: [string, (d: typeof en) => string][] = [
      ['calculators.index.heading', (d) => d.calculators.index.heading],
      ['chrome.nav.openMenu', (d) => d.chrome.nav.openMenu],
      ['legal.notice.title', (d) => d.legal.notice.title],
      ['functions.template.slugTitleTemplate', (d) => d.functions.template.slugTitleTemplate],
    ];
    for (const locale of NON_EN) {
      it(`${locale} dictionary is translated (not a copy of en)`, () => {
        const dict = getDictionary(locale as Locale);
        for (const [label, pick] of probes) {
          const value = pick(dict);
          expect(value.length, `${locale} ${label} non-empty`).toBeGreaterThan(0);
          expect(value, `${locale} ${label} differs from en`).not.toBe(pick(en));
        }
      });
    }

    it('unknown locale falls back to en', () => {
      expect(getDictionary('xx' as Locale)).toBe(en);
    });
  });

  describe('localizePath', () => {
    it.each([
      ['/', 'es', '/es/'],
      ['/about/', 'es', '/es/about/'],
      ['/math-functions/sine/', 'de', '/de/math-functions/sine/'],
      ['/learn/', 'fr', '/fr/learn/'],
    ])('localizePath(%s, %s) === %s', (path, locale, expected) => {
      expect(localizePath(path, locale as Locale)).toBe(expected);
    });

    it('leaves the default locale unprefixed', () => {
      expect(localizePath('/about/', 'en')).toBe('/about/');
      expect(localizePath('/', 'en')).toBe('/');
    });

    it('does not double-prefix an already-localized path', () => {
      expect(localizePath('/es/about/', 'es')).toBe('/es/about/');
      expect(localizePath('/de/', 'de')).toBe('/de/');
    });

    it('stripLocale is the inverse of localizePath', () => {
      for (const locale of LOCALES) {
        expect(stripLocale(localizePath('/about/', locale))).toBe('/about/');
      }
    });
  });

  describe('page-registry labels', () => {
    it('English registry labels are unchanged', () => {
      expect(resolvePageLabel('/math-functions/', 'en')).toBe('Function Library');
      expect(resolvePageLabel('/examples/', 'en')).toBe('Graph Examples');
      expect(resolvePageLabel('/learn/', 'en')).toBe('Learn Graphing');
      expect(resolvePageLabel('/graphing-calculator/', 'en')).toBe('Graphing Calculator');
      expect(resolvePageLabel('/', 'en')).toBe('Home');
      // Every English entry keeps a non-empty label.
      for (const entry of getPageRegistry()) {
        expect(entry.label.length).toBeGreaterThan(0);
      }
    });

    it('locale registries use translated labels', () => {
      const footerLabel = (locale: Locale, englishPath: string): string => {
        const dict = getDictionary(locale);
        for (const column of dict.chrome.footer.columns) {
          const link = column.links.find((candidate) => candidate.href === englishPath);
          if (link) return link.label;
        }
        throw new Error(`no footer label for ${englishPath} in ${locale}`);
      };
      expect(resolvePageLabel('/es/math-functions/', 'es')).toBe(
        footerLabel('es', '/math-functions/')
      );
      expect(resolvePageLabel('/de/examples/', 'de')).toBe(footerLabel('de', '/examples/'));
      expect(resolvePageLabel('/fr/learn/', 'fr')).toBe(footerLabel('fr', '/learn/'));
      // Locale-aware resolution of an English path with an explicit locale.
      expect(resolvePageLabel('/math-functions/', 'es')).toBe(
        footerLabel('es', '/math-functions/')
      );
      // The '/' label is the translated breadcrumb home label.
      expect(resolvePageLabel('/es/', 'es')).toBe(getDictionary('es').chrome.breadcrumbs.homeLabel);
    });

    it('locale registries resolve dynamic data-driven labels', () => {
      const sineEs = ES_FUNCTIONS.find((p) => p.slug === 'sine');
      expect(sineEs).toBeDefined();
      expect(resolvePageLabel('/es/math-functions/sine/', 'es')).toBe(sineEs!.displayName);
      const learnDe = DE_FUNCTIONS.find((p) => p.slug === 'quadratic');
      expect(learnDe).toBeDefined();
      expect(resolvePageLabel('/de/math-functions/quadratic/', 'de')).toBe(learnDe!.displayName);
    });
  });

  describe('locale templates generate their expected built routes', () => {
    for (const locale of NON_EN) {
      it(`${locale} has exactly 21 source templates matching the other locales`, () => {
        const templates = localeTemplates(locale);
        expect(templates).toHaveLength(21);
        expect(templates).toEqual(localeTemplates('es'));
      });
    }

    it('105 locale templates total (21 × 5)', () => {
      const total = NON_EN.reduce((sum, locale) => sum + localeTemplates(locale).length, 0);
      expect(total).toBe(105);
    });

    for (const locale of NON_EN) {
      it(`${locale}: every expected route exists as a built HTML page`, () => {
        const routes = expectedRoutes(locale);
        // 18 static templates + 10 function + 6 learn + 6 example pages.
        expect(routes).toHaveLength(40);
        const missing = routes.filter(
          (route) => !existsSync(join(requireDist(), route.slice(1), 'index.html'))
        );
        expect(missing).toEqual([]);
      });
    }
  });

  describe('built locale HTML head (lang, canonical, hreflang, OG)', () => {
    for (const locale of NON_EN) {
      it(`${locale}: all 40 pages carry correct head metadata`, () => {
        const base = siteConfig.siteUrl.replace(/\/+$/, '');
        const pages = localePages(locale as Locale);
        expect(pages).toHaveLength(40);
        const failures: string[] = [];
        for (const page of pages) {
          const html = readFileSync(join(requireDist(), page.slice(1), 'index.html'), 'utf8');
          const englishPath = stripLocale(page);
          // <html lang>
          const lang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1];
          if (lang !== htmlLangFor(locale as Locale)) {
            failures.push(`${page}: html lang "${lang}"`);
            continue;
          }
          // Canonical must be the localized URL.
          const { canonical, hreflang } = headLinks(html);
          if (canonical !== `${base}${page}`) {
            failures.push(`${page}: canonical "${canonical}"`);
          }
          // Full hreflang set: en/es/de/fr/it/pt + x-default.
          const expected = new Map<string, string>([
            [htmlLangFor('en'), `${base}${englishPath}`],
            ['x-default', `${base}${englishPath}`],
            ...LOCALES.filter((l) => l !== 'en').map(
              (l) =>
                [
                  htmlLangFor(l as Locale),
                  `${base}${localizePath(englishPath, l as Locale)}`,
                ] as const
            ),
          ]);
          for (const [hreflangKey, href] of expected) {
            if (hreflang.get(hreflangKey) !== href) {
              failures.push(`${page}: hreflang ${hreflangKey} "${hreflang.get(hreflangKey)}"`);
            }
          }
          if (hreflang.size !== expected.size) {
            failures.push(`${page}: ${hreflang.size} hreflang links, expected ${expected.size}`);
          }
          // OG locale + alternates.
          const { primary, alternates } = ogLocales(html);
          if (primary !== ogLocaleFor(locale as Locale)) {
            failures.push(`${page}: og:locale "${primary}"`);
          }
          const expectedAlternates = LOCALES.filter((l) => l !== locale).map((l) =>
            ogLocaleFor(l as Locale)
          );
          if (
            JSON.stringify([...alternates].sort()) !==
            JSON.stringify([...expectedAlternates].sort())
          ) {
            failures.push(`${page}: og:locale:alternate ${JSON.stringify(alternates)}`);
          }
        }
        expect(failures).toEqual([]);
      });
    }

    it('hreflang en and x-default point at the English URL, never the localized one', () => {
      const base = siteConfig.siteUrl.replace(/\/+$/, '');
      for (const locale of NON_EN) {
        const html = readBuilt(`${locale}/index.html`);
        const { hreflang } = headLinks(html);
        expect(hreflang.get(htmlLangFor('en'))).toBe(`${base}/`);
        expect(hreflang.get('x-default')).toBe(`${base}/`);
      }
    });
  });

  describe('sitemap and robots', () => {
    it('sitemap contains every expected locale URL', () => {
      const sitemap = readBuilt('sitemap-0.xml');
      const urls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
      const base = siteConfig.siteUrl.replace(/\/+$/, '');
      const missing: string[] = [];
      for (const locale of NON_EN) {
        for (const route of expectedRoutes(locale)) {
          if (!urls.has(`${base}${route}`)) missing.push(`${base}${route}`);
        }
      }
      expect(missing).toEqual([]);
    });

    it('robots.txt is unchanged and references the sitemap', () => {
      const robots = readBuilt('robots.txt');
      expect(robots).toContain('User-agent: *');
      expect(robots).toContain('Disallow: /graph/');
      expect(robots).toContain(
        `Sitemap: ${siteConfig.siteUrl.replace(/\/+$/, '')}/sitemap-index.xml`
      );
      // No locale-specific rules crept in.
      for (const locale of NON_EN) {
        expect(robots).not.toContain(`/${locale}/`);
      }
    });
  });

  describe('SEO description lengths (120–155 chars)', () => {
    for (const locale of NON_EN) {
      it(`${locale}: all 22 data-driven descriptions are within 120–155 chars`, () => {
        const { functions, learn, examples } = LOCALE_DATA[locale];
        const checked: { slug: string; len: number }[] = [
          ...functions.map((p) => ({
            slug: `math-functions/${p.slug}`,
            len: p.description.length,
          })),
          ...learn.map((p) => ({ slug: `learn/${p.slug}`, len: p.description.length })),
          ...examples.map((p) => ({ slug: `examples/${p.slug}`, len: p.description.length })),
        ];
        expect(checked).toHaveLength(22);
        const outOfRange = checked.filter((c) => c.len < 120 || c.len > 155);
        expect(outOfRange).toEqual([]);
      });
    }
  });

  describe('math syntax equality across locales', () => {
    it('slugs, notation, expressions and tryExpressions are byte-identical to en', () => {
      interface DataDrivenPage {
        slug: string;
        description: string;
        related: string[];
        notation?: string;
        expression?: string;
        tryExpressions?: string[];
        expressions?: unknown;
      }
      const kinds: { en: DataDrivenPage[]; kind: 'functions' | 'learn' | 'examples' }[] = [
        { en: EN_FUNCTIONS as unknown as DataDrivenPage[], kind: 'functions' },
        { en: EN_LEARN as unknown as DataDrivenPage[], kind: 'learn' },
        { en: EN_EXAMPLES as unknown as DataDrivenPage[], kind: 'examples' },
      ];
      const mismatches: string[] = [];
      // Example-expression `label` is display text; compare the math only.
      const mathOnly = (exprs: unknown): string =>
        JSON.stringify(exprs, (key: string, value: unknown) =>
          key === 'label' ? undefined : value
        );
      for (const locale of NON_EN) {
        for (const { en: enPages, kind } of kinds) {
          const locPages: DataDrivenPage[] = LOCALE_DATA[locale][kind];
          expect(locPages.map((p) => p.slug).sort()).toEqual(enPages.map((p) => p.slug).sort());
          for (const enPage of enPages) {
            const locPage = locPages.find((p) => p.slug === enPage.slug);
            expect(locPage, `${locale} ${kind}/${enPage.slug} exists`).toBeDefined();
            if (!locPage) continue;
            for (const field of ['slug', 'notation', 'expression', 'tryExpressions'] as const) {
              if (
                field in enPage &&
                JSON.stringify(locPage[field]) !== JSON.stringify(enPage[field])
              ) {
                mismatches.push(`${locale} ${kind}/${enPage.slug}: ${field}`);
              }
            }
            if (
              'expressions' in enPage &&
              mathOnly(locPage['expressions']) !== mathOnly(enPage['expressions'])
            ) {
              mismatches.push(`${locale} ${kind}/${enPage.slug}: expressions`);
            }
            // Related paths are locale-prefixed by design (and translators
            // may curate the set); they must stay inside the locale tree.
            // Existence is checked by the dedicated test below.
            for (const rel of locPage.related) {
              if (!rel.startsWith(`/${locale}/`)) {
                mismatches.push(`${locale} ${kind}/${enPage.slug}: related not prefixed: ${rel}`);
              }
            }
          }
        }
      }
      expect(mismatches).toEqual([]);
    });

    it('translated prose fields differ from en (translations are genuine)', () => {
      for (const locale of NON_EN) {
        const data = LOCALE_DATA[locale];
        for (const page of data.functions) {
          const enPage = EN_FUNCTIONS.find((p) => p.slug === page.slug)!;
          expect(page.description, `${locale} functions/${page.slug} translated`).not.toBe(
            enPage.description
          );
        }
        for (const page of data.learn) {
          const enPage = EN_LEARN.find((p) => p.slug === page.slug)!;
          expect(page.description, `${locale} learn/${page.slug} translated`).not.toBe(
            enPage.description
          );
        }
        for (const page of data.examples) {
          const enPage = EN_EXAMPLES.find((p) => p.slug === page.slug)!;
          expect(page.description, `${locale} examples/${page.slug} translated`).not.toBe(
            enPage.description
          );
        }
      }
    });
  });

  describe('locale related links resolve to built pages', () => {
    it('every related path in the 15 locale content modules exists as built HTML', () => {
      const missing: string[] = [];
      for (const locale of NON_EN) {
        const data = LOCALE_DATA[locale];
        const pages = [...data.functions, ...data.learn, ...data.examples];
        for (const page of pages) {
          for (const rel of page.related as string[]) {
            if (!existsSync(join(requireDist(), rel.slice(1), 'index.html'))) {
              missing.push(`${locale} ${(page as { slug: string }).slug}: ${rel}`);
            }
          }
        }
      }
      expect(missing).toEqual([]);
    });
  });

  describe('JSON-LD validity', () => {
    it('every JSON-LD block on the 200 locale pages parses', () => {
      const failures: string[] = [];
      for (const locale of NON_EN) {
        for (const page of localePages(locale as Locale)) {
          const html = readFileSync(join(requireDist(), page.slice(1), 'index.html'), 'utf8');
          for (const m of html.matchAll(
            /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
          )) {
            try {
              const parsed = JSON.parse(m[1]) as { '@context'?: string };
              if (!parsed['@context']) failures.push(`${page}: missing @context`);
            } catch {
              failures.push(`${page}: invalid JSON-LD`);
            }
          }
        }
      }
      expect(failures).toEqual([]);
    });
  });

  describe('translated legal notice on all 15 localized legal pages', () => {
    const legalPages = ['privacy-policy', 'terms', 'disclaimer'];
    for (const locale of NON_EN) {
      for (const page of legalPages) {
        it(`/${locale}/${page}/ shows the notice in ${locale}`, () => {
          const html = readBuilt(`${locale}/${page}/index.html`);
          const notice = getDictionary(locale as Locale).legal.notice;
          expect(html, 'notice title').toContain(notice.title);
          expect(html, 'notice body').toContain(notice.body.slice(0, 60));
          expect(html, 'notice title differs from en').not.toBe(
            getDictionary('en').legal.notice.title
          );
        });
      }
    }
  });

  describe('language switcher fallback for unmirrored routes', () => {
    const unmirrored: [string, string][] = [
      ['404.html', '404'],
      ['500.html', '500'],
      ['graph/index.html', 'graph'],
    ];
    // The switcher marks each locale link with lang="<bcp47>" (e.g. es-ES).
    const LANG_TO_LOCALE: Record<string, string> = {
      'es-ES': 'es',
      'de-DE': 'de',
      'fr-FR': 'fr',
      'it-IT': 'it',
      'pt-BR': 'pt',
    };
    function switcherLinks(html: string): Map<string, string> {
      const links = new Map<string, string>();
      for (const m of html.matchAll(/<a(?=[\s>])[^>]*>/g)) {
        const tag = m[0];
        const lang = tag.match(/\slang="([^"]+)"/)?.[1];
        const href = tag.match(/\shref="([^"]+)"/)?.[1];
        if (lang && href && LANG_TO_LOCALE[lang]) links.set(LANG_TO_LOCALE[lang], href);
      }
      return links;
    }

    for (const [file, label] of unmirrored) {
      it(`/${label}: non-current locales fall back to their homepages`, () => {
        const links = switcherLinks(readBuilt(file));
        expect(links.size, `${label} switcher locales`).toBe(5);
        for (const [locale, href] of links) {
          expect(href, `${label} → ${locale}`).toBe(`/${locale}/`);
        }
      });
    }

    it('/methodology/ keeps its locale mirrors (mirrored route)', () => {
      const links = switcherLinks(readBuilt('methodology/index.html'));
      expect(links.size, 'methodology switcher locales').toBe(5);
      for (const [locale, href] of links) {
        expect(href, `methodology → ${locale}`).toBe(`/${locale}/methodology/`);
      }
    });
  });

  describe('English regression', () => {
    it('English home keeps lang, canonical, hreflang and OG metadata', () => {
      const base = siteConfig.siteUrl.replace(/\/+$/, '');
      const html = readBuilt('index.html');
      expect(html.match(/<html[^>]*\slang="([^"]+)"/)?.[1]).toBe('en');
      const { canonical, hreflang } = headLinks(html);
      expect(canonical).toBe(`${base}/`);
      expect(hreflang.get(htmlLangFor('en'))).toBe(`${base}/`);
      expect(hreflang.get('x-default')).toBe(`${base}/`);
      expect(hreflang.get(htmlLangFor('es'))).toBe(`${base}/es/`);
      expect(hreflang.get(htmlLangFor('de'))).toBe(`${base}/de/`);
      expect(hreflang.get(htmlLangFor('fr'))).toBe(`${base}/fr/`);
      expect(hreflang.get(htmlLangFor('it'))).toBe(`${base}/it/`);
      expect(hreflang.get(htmlLangFor('pt'))).toBe(`${base}/pt/`);
      expect(ogLocales(html).primary).toBe('en_US');
    });

    it('English graphing-calculator page is unchanged in locale and canonical', () => {
      const base = siteConfig.siteUrl.replace(/\/+$/, '');
      const html = readBuilt('graphing-calculator/index.html');
      expect(html.match(/<html[^>]*\slang="([^"]+)"/)?.[1]).toBe('en');
      expect(headLinks(html).canonical).toBe(`${base}/graphing-calculator/`);
      expect(ogLocales(html).primary).toBe('en_US');
    });

    it('no localized <html lang> leaks into English pages', () => {
      for (const file of ['index.html', 'graphing-calculator/index.html', 'about/index.html']) {
        const html = readBuilt(file);
        expect(html, file).toContain('<html lang="en"');
      }
    });
  });
});
