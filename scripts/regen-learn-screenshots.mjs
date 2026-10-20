#!/usr/bin/env node
/**
 * Regenerate unique per-article graph-2 screenshots for the /learn/ program.
 *
 * Uses the site's OWN share-link encoding (GET /graph/#s=...) so every image
 * is a genuine render of the production calculator — no UI automation, no
 * fake imagery. Each shot gets a distinct expression / viewport / analysis
 * overlay so no two articles share the same file (hash-verified at the end).
 *
 * Usage: node scripts/regen-learn-screenshots.mjs [--only slug1,slug2]
 * Output: scripts/_regen_out/<slug>-graph-2.png (staged; caller installs them)
 */
import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// file:// render — no network at all, so Chromium's Local Network Access checks
// never trigger. Requires /_astro -> <repo>/dist/_astro symlink (absolute asset
// paths in the build resolve against file:///); see install notes below.
const DIST = new URL('../dist/', import.meta.url).pathname.replace(/\/$/, '');
// ?shot=N forces a full document reload: without it, navigating from one #s=
// URL to another is a same-document (fragment-only) navigation and the app
// never re-decodes the new payload (all screenshots came out identical).
let shotCounter = 0;
const pageUrl = (payload) => `file://${DIST}/graph/index.html?shot=${++shotCounter}#s=${payload}`;
const OUT_DIR = new URL('./_regen_out/', import.meta.url).pathname;
const CHROME = '/opt/meta-chromium/chrome';
const DEBUG_PORT = 9334;

const DEFAULT_VIEWPORT = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

// slug, rhs, viewport override, analysis overlays
// Every article keeps the function its body text is built around;
// uniqueness comes from distinct viewports / real tool overlays.
const SHOTS = [
  {
    slug: 'increasing-and-decreasing-intervals',
    rhs: 'x^3 - 3*x',
    viewport: { xMin: -4, xMax: 4, yMin: -6, yMax: 6 },
    note: 'same function as the article body; tighter viewport makes it unique',
  },
  {
    slug: 'derivative-at-a-point',
    rhs: 'x^3 - 3*x',
    viewport: { xMin: -5, xMax: 5, yMin: -10, yMax: 10 },
    note: 'same function as the article body; distinct viewport',
  },
  {
    slug: 'function-transformations',
    rhs: 'x^2',
    viewport: { xMin: -4, xMax: 4, yMin: -2, yMax: 10 },
    note: 'base parabola zoomed on the vertex; still the base function per caption',
  },
  {
    slug: 'getting-started-graphing-calculator',
    rhs: 'x^2',
    viewport: { xMin: -20, xMax: 20, yMin: -20, yMax: 20 },
    note: 'zoomed-out view; draft alt/caption updated to describe the wider view',
  },
  {
    slug: 'tangent-line-at-a-point',
    rhs: 'x^2',
    tangents: [{ x: 1 }],
    note: 'real tangent tool overlay at x=1 — exactly what the alt text claims',
  },
  {
    slug: 'find-roots-and-zeros',
    rhs: 'x^2 - 4',
    markers: [
      { kind: 'root', x: -2, y: 0 },
      { kind: 'root', x: 2, y: 0 },
    ],
    note: 'real root markers at the x-intercepts — exactly what the alt text claims',
  },
  {
    slug: 'how-to-use-the-table-of-values',
    rhs: 'x^2 - 4',
    viewport: { xMin: -5, xMax: 5, yMin: -6, yMax: 6 },
    note: 'same function as the article body; distinct viewport',
  },
  {
    slug: 'solve-quadratic-equations',
    rhs: 'x^2 - 4',
    viewport: { xMin: -4, xMax: 4, yMin: -8, yMax: 4 },
    note: 'same function as the article body; distinct viewport',
  },
];

function buildDocument(shot) {
  const now = Date.now();
  return {
    app: 'graphing-calculator',
    version: 1,
    expressions: [
      {
        id: 'expr-1',
        kind: 'cartesian',
        label: shot.rhs,
        visible: true,
        color: '#2563eb',
        metadata: {},
        definition: { rhs: shot.rhs },
        createdAt: now,
        updatedAt: now,
      },
    ],
    variables: [],
    viewport: shot.viewport || { ...DEFAULT_VIEWPORT },
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
  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const only = onlyArg ? new Set(onlyArg.slice(7).split(',')) : null;
  const shots = SHOTS.filter((s) => !only || only.has(s.slug));
  if (!shots.length) {
    console.error('no shots selected');
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const firstPayload = await encodeSharePayload(buildDocument(shots[0]));
  const firstUrl = pageUrl(firstPayload);
  const chrome = spawn(CHROME, [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--allow-file-access-from-files',
    `--remote-debugging-port=${DEBUG_PORT}`,
    // Fresh profile every run: avoids session-restore resurrecting stale tabs,
    // which made the script screenshot the wrong tab.
    `--user-data-dir=/tmp/cdp-gc-regen-${process.pid}`,
    firstUrl,
  ], { stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 3000));

  const list = JSON.parse(
    execSync(`curl -s http://127.0.0.1:${DEBUG_PORT}/json/list`).toString()
  );
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
  const evalResults = new Map();
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
  for (const shot of shots) {
    if (first) {
      first = false; // chrome already opened this URL at startup
    } else {
      const payload = await encodeSharePayload(buildDocument(shot));
      await send('Page.navigate', { url: pageUrl(payload) });
    }
    // wait for the expression label to appear in the Expressions panel
    let ready = false;
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 1000));
      try {
        const text = await evaluate('document.body.innerText');
        if (typeof text === 'string' && text.includes(shot.rhs)) {
          ready = true;
          break;
        }
        if (typeof text === 'string' && /could not|not valid|error/i.test(text) && text.includes('Shared graph')) {
          break;
        }
      } catch { /* keep waiting */ }
    }
    if (!ready) {
      console.error(`WARN: ${shot.slug} — expression text not detected; screenshotting anyway`);
    }
    await new Promise((r) => setTimeout(r, 2500)); // let canvas + overlays settle
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const out = path.join(OUT_DIR, `${shot.slug}-graph-2.png`);
    const buf = Buffer.from(data, 'base64');
    fs.writeFileSync(out, buf);
    const hash = crypto.createHash('md5').update(buf).digest('hex').slice(0, 12);
    hashes.set(shot.slug, hash);
    console.log(`saved ${shot.slug} (${buf.length} bytes, md5 ${hash}) — ${shot.note}`);
  }

  const seen = new Map();
  let dup = 0;
  for (const [slug, h] of hashes) {
    if (seen.has(h)) {
      console.error(`DUPLICATE: ${slug} matches ${seen.get(h)} (${h})`);
      dup++;
    } else seen.set(h, slug);
  }
  console.log(dup === 0 ? 'OK: all new screenshots unique' : `FAIL: ${dup} duplicates`);

  ws.close();
  chrome.kill();
  process.exit(dup === 0 ? 0 : 2);
}

main().catch((e) => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
