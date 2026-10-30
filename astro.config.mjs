// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Production deployment: Cloudflare Pages (direct upload), fully static.
// No adapter: the build emits plain static files (no dist/_worker.js), so
// Cloudflare Pages runs the repo's `functions/` directory as Pages
// Functions instead of an adapter worker. That is what makes a server-side
// host redirect possible: `functions/_middleware.ts` 301s the production
// pages.dev hostname to the apex domain, which the adapter worker could
// never do (static pages bypassed it entirely). The server endpoints
// live as Pages Functions under `functions/api/` (same URLs as before:
// POST /api/ai/math, GET /api/health) and read secrets from the project's
// Pages env bindings (`context.env`), so a DEEPSEEK_API_KEY configured on
// the deployed project keeps working without a rebuild.
export default defineConfig({
  // Production origin: custom domain https://graphingcalculator.online
  // (Cloudflare Pages project graphing-calc serves it).
  site: 'https://graphingcalculator.online',
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // /graph/ is user share content (noindex) and /api/ is not content —
      // neither belongs in the sitemap. /404/ is an error page, not content.
      filter: (page) => !/\/graph\//.test(page) && !/\/api\//.test(page) && !/\/404\//.test(page),
    }),
  ],
});
