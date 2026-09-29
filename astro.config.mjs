// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// NOTE: `site` is a build-time placeholder until a production domain exists.
// Canonical URLs are generated from the centralized config in src/data/site.ts,
// so updating the domain in one place updates every page.
export default defineConfig({
  site: 'https://example.com',
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
