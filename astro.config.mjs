// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// Production deployment: Cloudflare Pages (direct upload).
// In Astro 5, `output: 'static'` with an adapter prerenders every page
// at build time and serves server endpoints (POST /api/ai/math) on
// demand from the Pages Functions worker — the modern equivalent of
// the old `hybrid` mode.
export default defineConfig({
  // Production origin: Cloudflare Pages (https://graphing-calc.pages.dev).
  // Update + rebuild if a custom domain is attached later.
  site: 'https://graphing-calc.pages.dev',
  output: 'static',
  adapter: cloudflare({
    // Static assets are served from the CDN edge; only /api/* hits the worker.
    imageService: 'passthrough',
  }),
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
