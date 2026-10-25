#!/usr/bin/env node
/**
 * Capture genuine homepage-tutorial screenshots for graphingcalculator.online.
 *
 * Uses the site's OWN share-link encoding (GET /graph/#s=...) so every image
 * is a genuine render of the production calculator — no UI automation, no
 * fake imagery. Same technique as scripts/regen-learn-screenshots.mjs.
 *
 * Usage: node scripts/tutorial-screenshots.mjs
 * Output: public/images/tutorial/step-N-<name>.png (1280x720)
 *
 * Requires the /_astro -> <repo>/dist/_astro symlink (absolute asset paths
 * in the build resolve against file:///) and a current dist/ build.
 */
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/\/$/, '');
const OUT_DIR = new URL('../public/images/tutorial/', import.meta.url).pathname;
const CHROME = '/opt/meta-chromium/chrome';
const DEBUG_PORT = 9335;

let shotCounter = 0;
const pageUrl = (payload) => `file://${DIST}/graph/index.html?shot=${++shotCounter}#s=${payload}`;

const DEFAULT_VIEWPORT = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

// Each shot: what the tutorial step's text claims, nothing more.
const SHOTS = [
  {
    file: 'step-1-first-expression.png',
    expressions: [{ rhs: 'x^2', color: '#2563eb' }],
    viewport: { ...DEFAULT_VIEWPORT },
    waitFor: 'x^2',
    note: 'single parabola, default view',
  },
  {
    file: 'step-2-compare-curves.png',
    expressions: [
      { rhs: 'x^2', color: '#2563eb' },
      { rhs: 'sin(x)', color: '#dc2626' },
    ],
    viewport: { ...DEFAULT_VIEWPORT },
    waitFor: 'sin(x)',
    note: 'two expressions, two colors',
  },
  {
    file: 'step-3-zoom-in.png',
    expressions: [{ rhs: 'x^2', color: '#2563eb' }],
    viewport: { xMin: -4, xMax: 4, yMin: -2, yMax: 10 },
    waitFor: 'x^2',
    note: 'zoomed view on the vertex',
  },
  {
    file: 'step-4-roots.png',
    expressions: [{ rhs: 'x^2 - 4', color: '#2563eb' }],
    viewport: { xMin: -5, xMax: 5, yMin: -6, yMax: 6 },
    markers: [
      { kind: 'root', x: -2, y: 0 },
      { kind: 'root', x: 2, y: 0 },
    ],
    waitFor: 'x^2 - 4',
    note: 'real root markers at x = -2 and x = 2',
  },
  {
    file: 'step-5-tangent.png',
    expressions: [{ rhs: 'x^2', color: '#2563eb' }],
    viewport: { ...DEFAULT_VIEWPORT },
    tangents: [{ x: 1 }],
    waitFor: 'x^2',
    note: 'real tangent tool overlay at x = 1',
  },
];

function buildDocument(shot) {
  const now = Date.now();
  return {
    app: 'graphing-calculator',
    version: 1,
    expressions: shot.expressions.map((e, i) => ({
      id: `expr-${i + 1}`,
      kind: 'cartesian',
      label: e.rhs,
      visible: true,
      color: e.color,
      metadata: {},
      definition: { rhs: e.rhs },
      createdAt: now,
      updatedAt: now,
    })),
    variables: [],
    viewport: shot.viewport,
    settings: {
      showGrid: true,
      showAxes: true,
      showAxisLabels: true,
      degreeMode: false,
      squareAspectRatio: false,
    },
    selectedExpressionId: null,
    theme: 'light',
    analysis: {
      precision: { mode: 'decimals', digits: 4 },
      markers: (shot.markers || []).map((m, i) => ({
        id: `marker-${i + 1}`,
        kind: m.kind,
        x: m.x,
        y: m.y,
        expressionId: 'expr-1',
        color: '#ef4444',
        visible: true,
      })),
      integrals: [],
      tangents: (shot.tangents || []).map((t, i) => ({
        id: `tangent-${i + 1}`,
        expressionId: 'expr-1',
        x: t.x,
        showTangent: true,
        showNormal: false,
        visible: true,
      })),
      derivativePlots: [],
      annotations: [],
    },
  };
}

function b64url(bytes) {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
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

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const firstPayload = await encodeSharePayload(buildDocument(SHOTS[0]));
  const firstUrl = pageUrl(firstPayload);
  const chrome = spawn(CHROME, [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=/tmp/cdp-gc-tutorial-${process.pid}`,
    firstUrl,
  ], { stdio: 'ignore' });
  // Chrome needs several seconds before the debugging port answers.
  let list = null;
  for (let attempt = 0; attempt < 12 && !list; attempt++) {
    await new Promise((r) => setTimeout(r, 2000));
    try {
      const out = execSync(`curl -s http://127.0.0.1:${DEBUG_PORT}/json/list`).toString();
      const parsed = JSON.parse(out);
      if (Array.isArray(parsed) && parsed.length) list = parsed;
    } catch { /* not up yet */ }
  }
  if (!list) throw new Error('Chrome debugging port never came up');
  const pageTarget = list.find((t) => t.type === 'page');
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl, {
    maxPayload: 256 * 1024 * 1024,
  });
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const cur = ++id;
      pending.set(cur, { resolve, reject });
      ws.send(JSON.stringify({ id: cur, method, params }));
    });
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve } = pending.get(msg.id);
      pending.delete(msg.id);
      resolve(msg.result);
    }
  };
  const evaluate = async (expression) => {
    const res = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
    });
    if (res.exceptionDetails) throw new Error('evaluate failed: ' + expression.slice(0, 80));
    return res.result.value;
  };

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false,
  });

  const hashes = new Map();
  let first = true;
  for (const shot of SHOTS) {
    if (first) {
      first = false; // chrome already opened this URL at startup
    } else {
      const payload = await encodeSharePayload(buildDocument(shot));
      await send('Page.navigate', { url: pageUrl(payload) });
    }
    let ready = false;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      try {
        const text = await evaluate('document.body.innerText');
        if (typeof text === 'string' && text.includes(shot.waitFor)) {
          ready = true;
          break;
        }
      } catch { /* keep waiting */ }
    }
    if (!ready) {
      console.error(`WARN: ${shot.file} — expression text not detected; screenshotting anyway`);
    }
    await new Promise((r) => setTimeout(r, 2500)); // let canvas + overlays settle
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const out = path.join(OUT_DIR, shot.file);
    const buf = Buffer.from(data, 'base64');
    fs.writeFileSync(out, buf);
    const hash = crypto.createHash('md5').update(buf).digest('hex').slice(0, 12);
    hashes.set(shot.file, hash);
    console.log(`saved ${shot.file} (${buf.length} bytes, md5 ${hash}) — ${shot.note}`);
  }

  const seen = new Map();
  let dup = 0;
  for (const [file, h] of hashes) {
    if (seen.has(h)) {
      console.error(`DUPLICATE: ${file} matches ${seen.get(h)} (${h})`);
      dup++;
    } else seen.set(h, file);
  }
  console.log(dup === 0 ? 'OK: all tutorial screenshots unique' : `FAIL: ${dup} duplicates`);

  ws.close();
  chrome.kill();
  process.exit(dup === 0 ? 0 : 2);
}

main().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
