# Phase 6 Report — Secure AI Math Assistant

**Date:** 2026-09-29
**Branch:** `main` (local commit; push handled by parent agent)
**Status:** ✅ Complete — all validation gates passed

## Scope delivered

Phase 6 adds a secure AI math assistant on top of the Phase 1–5 calculator,
continuing the existing architecture (no restructuring, no branding changes,
nothing copied from Desmos). The AI is an _interpreter_, never the
calculation source of truth: it emits strict JSON commands that are
schema-validated before the existing store applies them, and any numeric
result shown as computed comes from the real math engine.

- **AIProvider abstraction** (`src/lib/ai/providers.ts`): `AiProvider`
  interface (`complete(request) → { provider, rawText }`). Two providers:
  `MockAiProvider` (deterministic, pure function of input — same input →
  byte-identical JSON) and `DeepSeekProvider` (`src/lib/ai/deepseek.ts`,
  **server-only**).
- **DeepSeek provider**: `POST https://api.deepseek.com/chat/completions`,
  `Authorization: Bearer <key>`, OpenAI-compatible body (`model`,
  `messages`, `temperature: 0`, `response_format: {type:'json_object'}`).
  Default model `deepseek-chat`, overridable via `DEEPSEEK_MODEL` env.
  Timeout 25 s, key passed only via constructor, errors never leak the key.
- **Server endpoint** (`src/pages/api/ai/math.ts`, Astro API route per
  project convention): validates the JSON body (`request.ts`: message ≤
  2000 chars, capped context/history), applies per-IP sliding-window rate
  limiting (20 req/min, honest 429 + `Retry-After`), reads
  `DEEPSEEK_API_KEY` **only from the server environment** (never logged,
  never in responses), calls the provider server-side, then
  parses **and** schema-validates the model output
  (`parseAndValidateAiOutput`). Invalid AI output → 502, never applied.
  No key configured → mock provider, response labeled `mock: true`.
- **Strict command schema** (`src/lib/ai/commands.ts`, hand-rolled, no
  new dependency): discriminated union of `plot_expression`,
  `add_variable`, `set_viewport`, `explain {topic, explanation}`,
  `step_by_step {problem, steps[]}`, `clear`, `help`, `unknown`.
  Expression sources must **parse with the real math engine** (injection
  gate); variable names reuse `validateVariableName`; viewport numbers are
  finite and range-bounded. Unknown discriminator or mistyped fields →
  rejected with a reason.
- **MathCommandProcessor** (`src/lib/ai/processor.ts`): validated command
  → existing store actions only (`INSERT_EXPRESSION` (new, minimal),
  `ADD/UPDATE_VARIABLE`, `SET_VIEWPORT`). No parallel state. `explain` /
  `step_by_step` text is flagged `conceptual` so the UI labels it honestly
  instead of presenting AI prose as computed results.
- **Calculator context awareness** (`src/lib/ai/context.ts`): compact
  snapshot (≤8 expression summaries, viewport, ≤16 variables) sent with
  each request. Summaries only — no PII, no cookies.
- **Explanation modes**: AI text travels _inside_ the validated schema
  and renders as plain text with a persistent "Conceptual AI explanation
  — not computed by the math engine" label. Engine-truthful numbers come
  from the local `evaluate <expr> at x = <n>` intent, computed by the math
  engine in the browser and labeled as such.
- **Local-first intent detector** (`src/lib/ai/intent.ts`, zero network):
  `plot y = x^2`, `clear`, `zoom in/out`, `reset view`, `let a = 2` /
  `add slider`, `help`, and engine-evaluated `evaluate … at x = …`.
  Ambiguous input falls through to the API.
- **Chat UI** (`src/components/ai/AiChat.tsx`, mounted by `AiPanel`):
  floating button + panel, desktop and mobile layouts, labeled controls,
  focus management (focus input on open, return focus on close), Escape
  to close, `aria-live` message log, suggestion chips, pending indicator,
  mock-mode badge, in-session message history only (no persistence).
  AI text renders as plain text (`whitespace-pre-wrap`) — no
  `dangerouslySetInnerHTML` anywhere; `sanitize.ts` escapes HTML as
  defense-in-depth.
- **Prompt-injection resistance**: system prompt mandates JSON-only output
  and treats the user request as data inside `<user_request>` tags; the
  schema validator is the real gate — non-conforming output is rejected,
  never applied (tested with hostile inputs).

Out of scope per spec and NOT built: auth, payments, accounts, sharing, SEO.

## Validation

| Check                            | Result                                                          |
| -------------------------------- | --------------------------------------------------------------- |
| `npx tsc --noEmit`               | 0 errors                                                        |
| `npx eslint .`                   | 0 errors, 0 warnings                                            |
| `npx prettier --check .`         | clean                                                           |
| `npm test`                       | **362/362 passed** (29 files) — 300 Phase 1–5 baseline + 62 new |
| `npm run build`                  | clean, **8 pages** (unchanged)                                  |
| `eval()` / `new Function()` grep | none in `src/`                                                  |
| `DEEPSEEK_API_KEY` in `dist/`    | absent (key name only exists in the server route source)        |
| `deepseek.ts` importers          | only `src/pages/api/ai/math.ts` (+ its unit test)               |

New tests (8 files, 62 tests): `commands` (schema accept/reject,
injection attempts, fenced-JSON tolerance), `providers` (mock
determinism, every mock output passes the schema, hostile-input
refusal), `deepseek` (stubbed fetch: bearer header, body shape, model
override, error mapping without key leakage — **zero real network**),
`intent` (all local patterns + null for ambiguous), `processor`
(dispatch capture: plot/insert, variable add vs update, viewport,
conceptual labeling, clear/help/unknown), `rateLimit` (window sliding,
per-key isolation, retry hints), `request` (body shape/size limits),
`client` (429/network-error mapping, client-side re-validation),
`sanitize` (escaping, control chars, truncation).

Smoke checks: plotted `y = x^2` via processor dispatches
`INSERT_EXPRESSION` with a cartesian definition; `evaluate x^2+1 at x=3`
→ engine-computed `10`; mock zoom-out on the default viewport →
`[-20, 20]`; dev-server probe confirmed the rate limiter returns 429
with `Retry-After` after 20 requests (see known issue below for the
static-mode caveat).

## Files

- New (11 source + 8 test):
  `src/lib/ai/commands.ts`, `providers.ts`, `deepseek.ts`, `intent.ts`,
  `context.ts`, `prompt.ts`, `request.ts`, `rateLimit.ts`, `sanitize.ts`,
  `processor.ts`, `client.ts`, `src/pages/api/ai/math.ts`,
  `src/components/ai/AiChat.tsx`, `src/lib/ai/__tests__/*.test.ts` (8).
- Modified: `src/lib/ai/ai.ts` (Phase 6 facade; `isAiEnabled()` now true
  via flag), `src/components/ai/AiPanel.tsx` (mounts `AiChat`),
  `src/data/site.ts` (`aiAssistant: true`), `src/env.d.ts` (minimal
  server `process.env` typing — no new dependency),
  `src/components/calculator/CalculatorStore.tsx` (one new action,
  `INSERT_EXPRESSION`: insert a fully-built expression + select it, with
  id-collision guard).

## Configuring the DeepSeek key later

Firoz chose DeepSeek; the key is still pending ("wo baad me dooga").
When ready, set the key **server-side only** — never in client code:

```bash
# server environment (adapter / host env vars)
DEEPSEEK_API_KEY=sk-...        # required for live AI
DEEPSEEK_MODEL=deepseek-chat   # optional override
```

Until then the assistant runs in clearly-labeled mock mode: local
intents work fully offline and the endpoint answers deterministically.
No code changes are needed when the key arrives — the route picks it up
from the environment automatically. (Key handover should use the Secure
Vault flow, not chat.)

## Known non-blockers

- **Static-output endpoint limitation (verified 2026-09-29):** with the
  current `output: 'static'` config, `POST /api/ai/math` builds cleanly
  but cannot receive POST bodies/headers — not in `astro preview`, not
  on static hosts, and not even in `astro dev` (Astro warns "POST
  requests are not available in static endpoints"; the handler ran but
  saw an empty body). `export const prerender = false` is not an option
  without an adapter (build errors with `no-adapter-installed`). The
  endpoint needs `output: 'server'`/`'hybrid'` + an adapter — a Phase 10
  deployment decision; the file needs no code changes for it. The chat UI
  degrades gracefully meanwhile (local intents fully offline; server
  errors shown honestly).
- `siteUrl` remains the `https://example.com` placeholder (unchanged from
  Phase 1; production domain TBD).
- The mock provider's `explain`/`step_by_step` answers are canned and
  labeled mock — real explanations need the DeepSeek key.
- `clear` clears the AI chat history only, never the graph (deliberate —
  AI does not get a destructive graph command).

## Handoff

- Report: `docs/PHASE6-REPORT.md`
- Archive: `~/workspace/graphing-calculator-phase6-20260929.zip`
- **STOP — Phase 7 starts only on the next instruction.**
