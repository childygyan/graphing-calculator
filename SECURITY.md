# SECURITY.md — AI Graphing Calculator

Threat model: a static client-side app with one server endpoint
(`POST /api/ai/math`). No accounts, no database, no payments, no
third-party trackers. The main risks are XSS via AI/imported/shared
content, abuse of the AI endpoint, malicious share links / imports, and
misconfiguration at deploy time.

## Content Security Policy

Delivered via `public/_headers` (Cloudflare Pages) — see
`src/lib/security/csp.ts` for the builder (unit-tested) and
`src/lib/security/__tests__/headers.test.ts`, which verifies the shipped
`_headers` against the actual production build.

- `script-src 'self'` + sha256 hashes of the four inline scripts the build
  emits (no-FOUC theme script, ThemeToggle script, two Astro island-loader
  snippets). **No `'unsafe-inline'`.**
- `style-src 'self' 'unsafe-inline'` — pragmatic: Tailwind emits classes,
  but components use a handful of inline `style` attributes. Inline styles
  cannot execute script.
- `connect-src 'self'` — the browser only calls our own `/api/ai/math`;
  the DeepSeek call happens server-side, so the key can never leak via
  page JS and a stolen page cannot exfiltrate to third parties.
- `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`,
  `frame-ancestors 'self'`, `upgrade-insecure-requests`.
- Plus `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy` (camera/mic/geolocation/payment/usb disabled),
  `X-Frame-Options: SAMEORIGIN`.

**Maintenance:** after upgrading Astro or editing an inline script,
rebuild, recompute the hashes from `dist/*.html`, and update
`public/_headers`. The headers test fails the build's test suite if the
hashes drift. If `PUBLIC_ANALYTICS_SCRIPT_SRC` is ever enabled, its host
must be added to `script-src`/`connect-src` with its hash documented.

## API route: POST /api/ai/math

- DeepSeek key read **only** from server env (`DEEPSEEK_API_KEY`);
  never sent to the client, never logged, never in responses.
- Strict request validation (`src/lib/ai/request.ts`): message ≤ 2000
  chars, ≤ 10 history items, bounded context (expressions/variables
  counts and lengths capped).
- Sliding-window rate limit: **20 req/min per IP**, honest `429` with
  `Retry-After`. Phase 9 added a 10 000-key bound with expired-key
  sweeping so X-Forwarded-For spraying cannot grow memory unboundedly
  (unit-tested edge cases).
- IP is best-effort (`x-forwarded-for` first entry, `cf-connecting-ip`,
  `x-real-ip`); behind the CDN the connecting-IP header is authoritative.
- Provider output is parsed **and schema-validated** before anything is
  returned; invalid model JSON → `502`, never applied. Error messages to
  the client are generic (no key/provider internals).
- No API key configured → deterministic mock provider, response labeled
  `mock: true` (UI says so).
- `Cache-Control: no-store` on all responses.
- Known deployment note: the route needs a server runtime
  (`output: 'server'`/adapter). Under pure static hosting POSTs cannot
  reach it; the chat degrades honestly to local intents (Phase 10 owns
  the adapter choice).

## XSS review (Phase 9)

- AI assistant text renders via React text nodes (`{m.text}` with
  `whitespace-pre-wrap`) — never `dangerouslySetInnerHTML`. Zero
  occurrences of `dangerouslySetInnerHTML`/`innerHTML` in `src/`
  (excluding the sanitizer's own doc comment).
- `src/lib/ai/sanitize.ts` (`escapeHtml`, `stripControlChars`,
  `sanitizeAiText`) is defense-in-depth for any future markup path.
- Share URLs (`#s=…`): decoded with size cap (300 000 chars), base64url
  charset check, nesting-depth pre-scan, then `migrateDocument` +
  strict `validateGraphDocument` — hostile payloads produce honest
  errors, never code execution (payloads are data; the expression
  compiler never uses `eval`/`new Function` — grep-verified).
- JSON import: `MAX_IMPORT_BYTES` (256 KB) + 100-expression / 50-variable
  caps, field-by-field validation, preview before applying.
- Imported text annotations render on canvas via `fillText` (no HTML
  parsing) and in React via escaped text nodes.
- Expression labels/user strings: always React-escaped text.
- `localStorage` reads are wrapped in try/catch; corrupt entries are
  ignored, never trusted.

## AI output safety

- The AI is an **interpreter, not the calculator**: every command is
  schema-validated (`plot`, `add_variable`, `set_viewport`, `explain`,
  `step_by_step`, `clear`, `help`, `unknown`) and executed through the
  same store actions as manual input. Unknown/invalid → honest message.
- `evaluate`-style intents are computed by the local math engine, never
  by trusting model arithmetic.
- System prompt constrains the model to JSON-only command output;
  `parseAndValidateAiOutput` rejects anything else.

## Secrets

- No secrets in the repo, in `dist/`, or in client bundles. The only
  secret is `DEEPSEEK_API_KEY`, server-env-only.
- `grep` for `sk-`, `api_key`, `DEEPSEEK_API_KEY` in `src/` returns only
  the server-side reader (never a value).

## Dependency / supply-chain posture

- Runtime dependencies: `astro`, `@astrojs/react`, `@astrojs/sitemap`,
  `react`, `react-dom` only. No math, AI, or utility libraries vendored
  into the client.
- `npm audit` should be run at release time (Phase 10 checklist).

## Reporting

Found a vulnerability? Do not open a public issue. Contact the
maintainer (see `src/data/site.ts`) with details; sensitive reports are
handled privately.
