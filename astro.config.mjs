// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// NOTE: `site` is a build-time placeholder until a production domain exists.
// Canonical URLs are generated from the centralized config in src/data/site.ts,
// so updating the domain in one place updates every page.
export default defineConfig({
  site: 'https://example.com',
  integrations: [react(), tailwind()],
});
