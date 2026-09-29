/**
 * robots.txt — generated at build time so the Sitemap line always uses the
 * current siteUrl. /graph/ (user share content) and /api/ are disallowed;
 * everything else is crawlable.
 */
import { siteConfig } from '../data/site';

export const prerender = true;

export function GET(): Response {
  const site = siteConfig.siteUrl.replace(/\/+$/, '');
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /graph/',
    'Disallow: /api/',
    '',
    `Sitemap: ${site}/sitemap-index.xml`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
