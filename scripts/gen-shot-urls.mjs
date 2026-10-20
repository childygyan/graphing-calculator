#!/usr/bin/env node
// Generate share-link URLs for the 8 regenerated learn screenshots.
// Pure computation (no browser, no network). Writes scripts/_regen_out/shot-urls.json
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://graphingcalculator.online';
const OUT_DIR = new URL('./_regen_out/', import.meta.url).pathname;
const DEFAULT_VIEWPORT = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

const SHOTS = [
  { slug: 'increasing-and-decreasing-intervals', rhs: 'x^3 - 3*x', viewport: { xMin: -4, xMax: 4, yMin: -6, yMax: 6 } },
  { slug: 'derivative-at-a-point', rhs: 'x^3 - 3*x', viewport: { xMin: -5, xMax: 5, yMin: -10, yMax: 10 } },
  { slug: 'function-transformations', rhs: 'x^2', viewport: { xMin: -4, xMax: 4, yMin: -2, yMax: 10 } },
  { slug: 'getting-started-graphing-calculator', rhs: 'x^2', viewport: { xMin: -20, xMax: 20, yMin: -20, yMax: 20 } },
  { slug: 'tangent-line-at-a-point', rhs: 'x^2', tangents: [{ x: 1 }] },
  { slug: 'find-roots-and-zeros', rhs: 'x^2 - 4', markers: [{ kind: 'root', x: -2, y: 0 }, { kind: 'root', x: 2, y: 0 }] },
  { slug: 'how-to-use-the-table-of-values', rhs: 'x^2 - 4', viewport: { xMin: -5, xMax: 5, yMin: -6, yMax: 6 } },
  { slug: 'solve-quadratic-equations', rhs: 'x^2 - 4', viewport: { xMin: -4, xMax: 4, yMin: -8, yMax: 4 } },
];

function buildDocument(shot) {
  const now = Date.now();
  return {
    app: 'graphing-calculator',
    version: 1,
    expressions: [{
      id: 'expr-1', kind: 'cartesian', label: shot.rhs, visible: true,
      color: '#2563eb', metadata: {}, definition: { rhs: shot.rhs },
      createdAt: now, updatedAt: now,
    }],
    variables: [],
    viewport: shot.viewport || { ...DEFAULT_VIEWPORT },
    settings: { showGrid: true, showAxes: true, showAxisLabels: true, degreeMode: false, squareAspectRatio: false },
    selectedExpressionId: null,
    theme: 'light',
    analysis: {
      precision: { mode: 'decimals', digits: 4 },
      markers: (shot.markers || []).map((m, i) => ({
        id: `marker-${i + 1}`, kind: m.kind, x: m.x, y: m.y,
        expressionId: 'expr-1', color: '#ef4444', visible: true,
      })),
      integrals: [],
      tangents: (shot.tangents || []).map((t, i) => ({
        id: `tangent-${i + 1}`, expressionId: 'expr-1', x: t.x,
        showTangent: true, showNormal: false, visible: true,
      })),
      derivativePlots: [],
      annotations: [],
    },
  };
}

function b64url(bytes) {
  return Buffer.from(bytes).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function encodeSharePayload(doc) {
  const utf8 = new TextEncoder().encode(JSON.stringify(doc));
  const plain = b64url(utf8);
  try {
    const cs = new CompressionStream('deflate-raw');
    const w = cs.writable.getWriter();
    const body = new Response(cs.readable).arrayBuffer();
    await w.write(utf8);
    await w.close();
    const compressed = b64url(new Uint8Array(await body));
    return compressed.length < plain.length ? `1d${compressed}` : `1p${plain}`;
  } catch {
    return `1p${plain}`;
  }
}

const out = [];
for (const s of SHOTS) {
  const payload = await encodeSharePayload(buildDocument(s));
  out.push({ slug: s.slug, rhs: s.rhs, url: `${SITE}/graph/#s=${payload}` });
}
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'shot-urls.json'), JSON.stringify(out, null, 1));
console.log('wrote', out.length, 'urls to', path.join(OUT_DIR, 'shot-urls.json'));
