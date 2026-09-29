/**
 * llms.txt — generated at build time from the page registry: a compact
 * map of the site for language-model consumers. Only real, existing
 * pages are listed; nothing is invented.
 */
import { siteConfig } from '../data/site';
import { buildCanonical } from '../lib/seo/metadata';
import { getPageRegistry } from '../lib/seo/page-registry';

export const prerender = true;

export function GET(): Response {
  const registry = getPageRegistry();
  const sections: string[] = [];
  const order = ['Tools', 'Functions', 'Examples', 'Learn', 'Site'] as const;
  for (const section of order) {
    const entries = registry.filter((entry) => entry.section === section);
    if (entries.length === 0) continue;
    const lines = entries.map((entry) => `- [${entry.label}](${buildCanonical(entry.path)})`);
    sections.push(`## ${section}\n\n${lines.join('\n')}`);
  }
  const body = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.tagline}`,
    '',
    'A free online graphing calculator: plot functions, analyze roots, derivatives and integrals, explore with sliders, and get AI math help. No sign-up.',
    '',
    ...sections.flatMap((section) => [section, '']),
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
