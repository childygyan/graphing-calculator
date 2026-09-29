/**
 * SEO audit tests (Phase 8).
 *
 * These crawl the BUILT output in dist/ and assert site-wide SEO
 * invariants: metadata completeness, uniqueness, noindex rules, sitemap
 * coverage, internal-link integrity, reachability (no orphans), and
 * minimum content depth (no thin pages).
 *
 * Requires `npm run build` first — the suite fails loudly when dist/
 * is missing instead of silently passing.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';
import { siteConfig } from '../../../data/site.js';
import { getPageRegistry } from '../page-registry.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..', '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  throw new Error(
    'dist/ not found — run `npm run build` before `npm test` so the SEO audit has output to crawl.'
  );
}

interface CrawledPage {
  /** Route path with trailing slash, e.g. '/functions/sine/'. */
  route: string;
  html: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
}

function collectHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectHtmlFiles(full));
    } else if (entry.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function fileToRoute(file: string): string {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '/')}`;
}

function extractTagContent(html: string, pattern: RegExp): string {
  const match = html.match(pattern);
  return match ? match[1].trim() : '';
}

function extractMeta(html: string, name: string): string {
  // Astro renders attributes with double quotes; content may contain apostrophes.
  const byName = new RegExp(`<meta\\s+[^>]*name="${name}"[^>]*content="([^"]*)"`, 'i');
  const byProperty = new RegExp(`<meta\\s+[^>]*property="${name}"[^>]*content="([^"]*)"`, 'i');
  return extractTagContent(html, byName) || extractTagContent(html, byProperty);
}

function extractCanonical(html: string): string {
  return extractTagContent(html, /<link\s+[^>]*rel="canonical"[^>]*href="([^"]*)"/i);
}

function extractInternalHrefs(html: string): string[] {
  const hrefs: string[] = [];
  const pattern = /<a\s+[^>]*href=["']([^"']*)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('//')) hrefs.push(href);
  }
  return hrefs;
}

function visibleTextLength(html: string): number {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const text = withoutScripts
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length;
}

function crawl(): CrawledPage[] {
  return collectHtmlFiles(DIST).map((file) => {
    const html = readFileSync(file, 'utf8');
    return {
      route: fileToRoute(file),
      html,
      title: extractTagContent(html, /<title>([^<]*)<\/title>/i),
      description: extractMeta(html, 'description'),
      canonical: extractCanonical(html),
      robots: extractMeta(html, 'robots'),
    };
  });
}

const pages = crawl();
const byRoute = new Map(pages.map((page) => [page.route, page]));
const registry = getPageRegistry().map((entry) => entry.path);

function sitemapUrls(): string[] {
  const indexPath = join(DIST, 'sitemap-index.xml');
  expect(existsSync(indexPath), 'sitemap-index.xml exists in dist/').toBe(true);
  const indexXml = readFileSync(indexPath, 'utf8');
  const locs = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls: string[] = [];
  for (const loc of locs) {
    const fileName = loc.split('/').pop() as string;
    const sitemapPath = join(DIST, fileName);
    if (!existsSync(sitemapPath)) continue;
    const xml = readFileSync(sitemapPath, 'utf8');
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return urls;
}

describe('SEO audit — page metadata', () => {
  it('every page has a non-empty title', () => {
    for (const page of pages) {
      expect(page.title.length, `${page.route} title`).toBeGreaterThan(0);
    }
  });

  it('titles are unique across pages', () => {
    const seen = new Map<string, string>();
    for (const page of pages) {
      expect(seen.has(page.title), `duplicate title "${page.title}" on ${page.route}`).toBe(false);
      seen.set(page.title, page.route);
    }
  });

  it('every page has a meta description of sane length', () => {
    for (const page of pages) {
      expect(page.description.length, `${page.route} description`).toBeGreaterThanOrEqual(50);
      expect(page.description.length, `${page.route} description`).toBeLessThanOrEqual(320);
    }
  });

  it('meta descriptions are unique across pages', () => {
    const seen = new Map<string, string>();
    for (const page of pages) {
      expect(seen.has(page.description), `duplicate description on ${page.route}`).toBe(false);
      seen.set(page.description, page.route);
    }
  });

  it('every page has an absolute canonical URL on the configured site', () => {
    const base = siteConfig.siteUrl.replace(/\/+$/, '');
    for (const page of pages) {
      expect(page.canonical.startsWith(`${base}/`), `${page.route} canonical`).toBe(true);
    }
  });

  it('/graph/ is noindex (share route must not be indexed)', () => {
    const graph = byRoute.get('/graph/');
    expect(graph, '/graph/ exists').toBeDefined();
    expect(graph?.robots).toMatch(/noindex/i);
  });

  it('all other registry pages are indexable', () => {
    for (const route of registry) {
      const page = byRoute.get(route);
      expect(page, `${route} built`).toBeDefined();
      expect(page?.robots).not.toMatch(/noindex/i);
    }
  });
});

describe('SEO audit — sitemap, robots, llms.txt', () => {
  it('sitemap covers every registry page', () => {
    const urls = sitemapUrls();
    const base = siteConfig.siteUrl.replace(/\/+$/, '');
    for (const route of registry) {
      expect(urls, `sitemap contains ${route}`).toContain(`${base}${route}`);
    }
  });

  it('sitemap excludes /graph/, /api/ and /404/', () => {
    const urls = sitemapUrls();
    for (const url of urls) {
      expect(url).not.toMatch(/\/graph\//);
      expect(url).not.toMatch(/\/api\//);
      expect(url).not.toMatch(/\/404\//);
    }
  });

  it('robots.txt disallows /graph/ and /api/ and points at the sitemap', () => {
    const robotsPath = join(DIST, 'robots.txt');
    expect(existsSync(robotsPath), 'robots.txt exists').toBe(true);
    const robots = readFileSync(robotsPath, 'utf8');
    expect(robots).toMatch(/Disallow:\s*\/graph\//);
    expect(robots).toMatch(/Disallow:\s*\/api\//);
    expect(robots).toMatch(/Sitemap:\s*https?:\/\/\S+\/sitemap-index\.xml/);
  });

  it('llms.txt exists and lists real pages', () => {
    const llmsPath = join(DIST, 'llms.txt');
    expect(existsSync(llmsPath), 'llms.txt exists').toBe(true);
    const llms = readFileSync(llmsPath, 'utf8');
    expect(llms.length).toBeGreaterThan(500);
    expect(llms).toContain('/functions/sine/');
    expect(llms).toContain('/learn/');
  });
});

describe('SEO audit — links and reachability', () => {
  it('every internal link resolves to a built page', () => {
    const known = new Set(byRoute.keys());
    const problems: string[] = [];
    for (const page of pages) {
      for (const href of extractInternalHrefs(page.html)) {
        const pathname = href.split('#')[0].split('?')[0];
        const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
        if (!known.has(pathname) && !known.has(normalized)) {
          problems.push(`${page.route} -> ${href}`);
        }
      }
    }
    expect(problems, `broken internal links: ${problems.join(', ')}`).toEqual([]);
  });

  it('no orphan pages: every registry page is reachable from /', () => {
    const known = new Set(byRoute.keys());
    const visited = new Set<string>(['/']);
    const queue = ['/'];
    while (queue.length > 0) {
      const current = queue.pop() as string;
      const page = byRoute.get(current);
      if (!page) continue;
      for (const href of extractInternalHrefs(page.html)) {
        const pathname = href.split('#')[0].split('?')[0];
        const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
        const target = known.has(pathname) ? pathname : normalized;
        if (known.has(target) && !visited.has(target)) {
          visited.add(target);
          queue.push(target);
        }
      }
    }
    for (const route of registry) {
      expect(visited.has(route), `${route} reachable from /`).toBe(true);
    }
  });
});

describe('SEO audit — content depth', () => {
  it('no thin pages: every registry page has substantial visible text', () => {
    const thin: string[] = [];
    for (const route of registry) {
      const page = byRoute.get(route);
      if (!page) continue;
      const length = visibleTextLength(page.html);
      if (length < 300) thin.push(`${route} (${length} chars)`);
    }
    expect(thin, `thin pages: ${thin.join(', ')}`).toEqual([]);
  });
});
