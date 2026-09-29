# AI Graphing Calculator

A fast, accessible, open-source graphing calculator for the web. Plot mathematical
functions, analyze them (roots, derivatives, integrals, limits, extrema), save and
share graphs, and get plain-language help from an AI math assistant.

Built with **Astro 5**, **React 19**, **strict TypeScript**, and **Tailwind CSS 3**.
Deployed on **Cloudflare Pages**.

> An independent implementation — no third-party calculator branding, UI, code, or
> assets were copied.

## Quick start

Requirements: Node.js ≥ 22.12.

```sh
npm install
npm run dev        # local dev server at http://localhost:4321
npm test           # unit tests (Vitest)
npm run build      # production build -> ./dist/
```

Validation (all must be clean before a release):

```sh
npx tsc --noEmit
npx eslint .
npx prettier --check .
npm test
npm run build
```

## Project structure

```text
src/
  pages/            # routes: index, graphing-calculator, calculators/*,
                    # functions/[slug], examples/[slug], learn/[slug],
                    # graph (share target, noindex), api/ai/math (server endpoint),
                    # legal pages, 404, 500, robots.txt.ts, llms.txt.ts
  layouts/          # BaseLayout — head metadata, theme, header/footer
  components/
    calculator/     # React islands: calculator shell, expression editor, graph canvas
    persistence/    # save/share/import/export dialogs
    seo/            # SeoHead, JSON-LD, breadcrumbs
    ai/             # AI chat UI
    ui/             # reusable UI primitives
  lib/
    math/           # expression engine: tokenizer -> parser -> AST -> compiler,
                    # math function library, numerical analysis
    graph/          # 2D graph engine: transforms, sampling, grid/ticks, renderer
    ai/             # AI provider abstraction, DeepSeek + mock, command schema,
                    # rate limiting, intent detection
    persistence/   # versioned graph documents, validation, migrations,
                    # share-link encoding, undo/redo
    seo/            # metadata builders, content engine, internal linking
    security/       # CSP builder, security-header tests
    perf/           # production bundle budgets (enforced by tests)
  data/             # site.ts — THE single source for siteUrl and site config
public/             # favicon, icons, web manifest, _headers (CSP), _redirects
docs/               # phase reports, PRODUCTION_AUDIT.md, perf/a11y reports
```

## Environment variables

Secrets are server-only. Nothing secret belongs in client JavaScript.

| Variable                          | Scope  | Required | Purpose                                                        |
| --------------------------------- | ------ | -------- | -------------------------------------------------------------- |
| `DEEPSEEK_API_KEY`                | server | no       | DeepSeek key for the AI assistant. Absent = labeled mock mode. |
| `DEEPSEEK_MODEL`                  | server | no       | Model override (default `deepseek-chat`).                      |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | build  | no       | Search Console verification meta tag.                          |
| `PUBLIC_ANALYTICS_SCRIPT_SRC`     | build  | no       | Optional analytics script. Unset by default = no analytics.    |

Environments: **dev** (`npm run dev`), **preview** (`npm run preview` after build),
**production** (Cloudflare Pages). The only per-environment value is `siteUrl` in
`src/data/site.ts` / `astro.config.mjs` — set once to the production domain at
deploy time; canonicals, sitemap, and Open Graph tags all derive from it.

## AI assistant modes

- **Local intents** (e.g. "plot y = x^2") run entirely in the browser — no server call.
- **Server endpoint** `POST /api/ai/math` handles the rest. With no `DEEPSEEK_API_KEY`
  configured it answers via a deterministic mock provider and labels every response
  `mock: true`, which the chat UI surfaces honestly.
- The endpoint is server-rendered by the Cloudflare adapter; all content pages stay
  statically prerendered.

## Deployment

Cloudflare Pages, direct upload (not git-connected):

```sh
npm run build
npx wrangler pages deploy dist/ --project-name=<project>
```

After the first deploy, set `siteUrl` in `src/data/site.ts` and `astro.config.mjs`
to the production URL, rebuild, and redeploy so canonicals/sitemap/OG are correct.
See `docs/PRODUCTION_AUDIT.md` for the full launch record and
`RELEASE_CHECKLIST.md` for the release process.

## Docs

- `docs/PRODUCTION_AUDIT.md` — every production check, pass/fail, measured numbers
- `docs/PERFORMANCE_REPORT.md`, `docs/ACCESSIBILITY_REPORT.md` — Phase 9 reports
- `docs/PHASE1-REPORT.md` … `docs/PHASE10-REPORT.md` — per-phase build records
- `SECURITY.md` — security policy and audit notes
- `CHANGELOG.md` — release history
