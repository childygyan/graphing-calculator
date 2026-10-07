# Share-Link Bug Fix Report — Graphing Calculator

**Date:** 2026-09-30
**Status:** Fixed, tested, deployed, live-verified

## Bug

Clicking "Share this graph" opened the dialog but it hung forever on
"Creating your link…" — no link was ever generated.

## Root cause

`deflateRaw()` / `inflateRaw()` in `src/lib/persistence/share.ts` awaited
`writer.close()` **before** reading from the stream. In Chromium, the
readable side fills with compressed output and TransformStream
backpressure blocks the close-flush, so `close()` never resolves — a
deterministic deadlock. (Node's CompressionStream does not deadlock this
way, which is why all existing tests passed.)

## Fix

Consume the readable side **concurrently** with writing:

```ts
const body = new Response(stream.readable).arrayBuffer(); // start consuming FIRST
await writer.write(new Uint8Array(bytes));
await writer.close();
return new Uint8Array(await body);
```

Applied to both `deflateRaw()` and `inflateRaw()`. Wire format
unchanged: GraphDocument v1, `1d` compressed / `1p` plain fallback,
base64url, `#s=` routing — all existing shared links stay valid.

## Regression tests

New file `src/lib/persistence/__tests__/share-backpressure.test.ts`
mocks CompressionStream/DecompressionStream with browser-style
backpressure (`close()` pends until the readable side is consumed):

- old code → deadlocks (test times out → FAIL)
- fixed code → resolves (PASS)

Verified both directions by stashing/unstashing the fix.

## Verification

- Full vitest suite: **722/722 passed** (720 existing + 2 new)
- `tsc --noEmit`: 0 errors
- ESLint: 0 errors, 0 warnings
- Prettier: clean
- Production build: clean

## Deployment

- GitHub: `childygyan/graphing-calculator`, branch `main`
- Commit `d0c35c07` — "Fix graph share-link generation"
- Cloudflare Pages project `graphing-calc`
- Deployment: `https://3b26d59d.graphing-calc.pages.dev`
- Production: `https://graphingcalculator.online`
- Deploy method: official wrangler, absolute dist path, minimal
  API-only `_worker.js` (~39 KB, no React SSR — the Astro full worker
  fails with `MessageChannel is not defined`)

## Live verification (real Chromium, 2026-09-30)

1. Opened `https://graphingcalculator.online/graph/`, added `y = x^2`.
2. Clicked Share → dialog generated the link **instantly** (no hang).
3. Opened the share URL → graph restored: expressions panel shows
   "Cartesian 2: y = x^2", parabola plotted correctly.

Working share URL:

https://graphingcalculator.online/graph/#s=1dlVLRitswEPyVMn2VwXESJ9ZbKKUUelD6Wq6wkTfOcrLsSpucQ8i_F7m5a-_x3jSzK83OrK6gcYRFF2k8SugKR96dPOkQYXDmmGQIsAsDnsbIKcME-_MKaWFRHbhsnHPF-rDkYrWttwWtN1yUy_VhVTV1s3QMA0979rD4RFE5CYUPVX5dkuw9w2o8sYEb_BBh8bFa10vew6BnpZaUYK83AxeZlNudwi42TblZl4tmWzcbg9PYvq0sVttts6kNniTkMd2LLgxaPkgQnW1dEY8JFtOvCrfbo8GZotDec7aYofDzOETNndODBNhiURpMDzTB5tPlH3m5kzeDxKoSupSvpePw_CXmsP66zHg3ZYH_saRvOaJXtuUuMj8MLcMeyKfc-PtEkXdpZKc_SGW4V2Y9z065_fy6oq_vWI4euWdYpEtS7mFAgfwlyTz-GNlJuofVz_OgZSc9-ZTDlE40wa5uBj3FJ4735CQodzE3zVApdBz0jlqOciaVM3_3wwtJIQyafc3_6zHbovPbpTZV3ZS3Pw
