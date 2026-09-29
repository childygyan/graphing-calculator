# Contributing

This project is built in strict, verified phases. The conventions below keep every
change safe to ship.

## Ground rules

1. **Continue the architecture — never restart it.** Extend the existing modules
   (`src/lib/math`, `src/lib/graph`, `src/lib/ai`, `src/lib/persistence`); do not
   introduce a parallel math engine, a second state store, or a new UI framework.
2. **No `eval()` / `new Function()`** — ever. Expressions compile through the
   tokenizer → parser → AST → closure compiler in `src/lib/math/`.
3. **The math engine is the source of truth.** The AI assistant interprets requests;
   it never performs calculations the engine can do.
4. **Independent implementation.** Do not copy branding, UI, code, or assets from
   existing graphing calculators.
5. **Honest claims only.** No fabricated statistics, reviews, ratings, or
   verification codes. Assumptions must be labeled as assumptions.

## Before every commit

```sh
npx tsc --noEmit        # 0 errors
npx eslint .            # 0 errors, 0 warnings
npx prettier --check .  # clean
npm test                # all tests pass
npm run build           # clean production build
```

If `dist/` exists, the bundle-budget tests run against it
(`src/lib/perf/__tests__/budgets.test.ts`): total client JS ≤ 150 KB gzip,
total CSS ≤ 12 KB gzip. If a change exceeds a budget, shrink the change —
do not raise the budget without documenting why.

## Code style

- Strict TypeScript. No `any` in new code; prefer narrow types and guards.
- Prettier formatting is enforced — run `npm run format` before committing.
- Colocate unit tests in `__tests__/` next to the module they cover.
- Security-sensitive code (endpoints, CSP, share-link decoding, import
  validation) gets a comment block explaining its threat model.

## Adding a page

1. Create `src/pages/<route>/index.astro` extending `BaseLayout`.
2. Supply `title`, `description`, `canonicalPath`. Every page needs a unique
   title and description — the SEO crawl script (see `docs/PHASE10-REPORT.md`)
   flags duplicates.
3. Add the route to the footer/nav config in `src/data/site.ts` if it should be
   discoverable, and check the sitemap filter in `astro.config.mjs` still applies
   (user-content and API routes stay out of the sitemap).
4. Interactive pages use React islands (`client:load` / `client:visible`); static
   content pages must ship zero JavaScript.

## Environment and secrets

- Never commit `.env` files. Secrets go to the hosting provider's environment
  settings, never into `src/data/site.ts`.
- New env vars must be documented in the README table with scope and purpose.

## Releases

Follow `RELEASE_CHECKLIST.md`. Version with semver; record every release in
`CHANGELOG.md`.
