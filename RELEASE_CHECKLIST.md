# Release Checklist

Run through this list, in order, for every production release.

## 1. Verify

- [ ] `npx tsc --noEmit` — 0 errors
- [ ] `npx eslint .` — 0 errors, 0 warnings
- [ ] `npx prettier --check .` — clean
- [ ] `npm test` — all tests pass (record the count)
- [ ] `npm run build` — clean; record page count and bundle sizes
- [ ] Bundle budgets pass: total client JS ≤ 150 KB gzip, total CSS ≤ 12 KB gzip
      (enforced by `src/lib/perf/__tests__/budgets.test.ts` against `dist/`)
- [ ] SEO crawl on `dist/`: unique titles/descriptions, 0 broken internal links,
      `/graph/` noindex + absent from sitemap (see `docs/PHASE10-REPORT.md` for the script)
- [ ] Math spot checks: roots, integrals, derivatives, limits, extrema (record values)

## 2. Configure

- [ ] `siteUrl` in `src/data/site.ts` and `site` in `astro.config.mjs` point at the
      production domain — rebuild after any change
- [ ] `contactEmail` in `src/data/site.ts` is a real monitored address
- [ ] Env vars set on the hosting project: `DEEPSEEK_API_KEY` (secret),
      optional `DEEPSEEK_MODEL`; build-time `PUBLIC_GOOGLE_SITE_VERIFICATION`
- [ ] `public/_headers` CSP hashes match the current build
      (verified by `src/lib/security/__tests__/headers.test.ts`)

## 3. Document

- [ ] `CHANGELOG.md` entry for the new version
- [ ] `docs/PRODUCTION_AUDIT.md` updated with this release's check results
- [ ] Phase report in `docs/PHASE<n>-REPORT.md` if this closes a phase

## 4. Release

- [ ] Commit on `main`; push after verification
- [ ] Tag the release: `git tag -a vX.Y.Z -m "vX.Y.Z"` and push the tag
- [ ] Create the phase archive zip (excludes `node_modules/`, `dist/`, `.git/`,
      `.astro/`) and upload to the project's Google Drive folder

## 5. Deploy

- [ ] `npm run build`, then deploy `dist/` to Cloudflare Pages (direct upload)
- [ ] Confirm the deployment status via the Cloudflare API
- [ ] Production smoke test: homepage 200, `/graphing-calculator/` 200, a content
      page 200, `/graph/` serves `noindex`, `sitemap.xml` + `robots.txt` correct,
      `/api/ai/math` responds (mock mode labeled when no key), CSP headers present
- [ ] If `siteUrl` changed for this deploy: rebuild, redeploy, re-run the smoke test

## 6. Post-deploy

- [ ] Record the production URL, deployment id, commit hash, and zip path in the
      phase report
- [ ] File follow-ups for anything deferred (custom domain, real-browser QA,
      DeepSeek key) — do not silently drop them
