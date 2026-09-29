/**
 * Centralized site configuration.
 *
 * IMPORTANT — `siteUrl` is a placeholder (`https://example.com`).
 * Replace it with the production domain before launch: canonical URLs,
 * sitemap entries, and Open Graph tags are all derived from this value.
 *
 * Environment variables are reserved for secrets only; nothing secret
 * belongs in this file or in any client-side JavaScript.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  /** Empty href = placeholder ("coming soon"); rendered as text, not a link. */
  href: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export const siteConfig = {
  name: 'AI Graphing Calculator',
  tagline: 'Graph functions, explore mathematics, and learn with AI assistance.',
  description:
    'A fast, accessible online graphing calculator. Plot mathematical functions, ' +
    'manage multiple expressions, and — in future releases — explore math with AI assistance.',
  /** PLACEHOLDER — replace with the production domain before launch. */
  siteUrl: 'https://example.com',
  /** PLACEHOLDER — replace with a real contact address before launch. */
  contactEmail: 'contact@example.com',
  defaultTheme: 'system' as ThemeMode,
  themeStorageKey: 'graphing-calculator-theme',
  stateStorageKey: 'graphing-calculator-state-v1',
  navigation: [
    { label: 'Graphing Calculator', href: '/graphing-calculator/' },
    { label: 'Calculators', href: '/calculators/' },
    { label: 'About', href: '/about/' },
  ] as NavLink[],
  footerColumns: [
    {
      heading: 'Product',
      links: [
        { label: 'Graphing Calculator', href: '/graphing-calculator/' },
        { label: 'Calculators', href: '/calculators/' },
        { label: 'About', href: '/about/' },
      ] as NavLink[],
    },
    {
      heading: 'Calculators',
      links: [{ label: 'Graphing Calculator', href: '/graphing-calculator/' }] as NavLink[],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy/' },
        { label: 'Terms of Service', href: '/terms/' },
        { label: 'Contact', href: '/contact/' },
      ] as NavLink[],
    },
  ],
  /** Placeholder social links — hrefs are intentionally empty until real profiles exist. */
  socialLinks: [
    { label: 'X', href: '' },
    { label: 'GitHub', href: '' },
    { label: 'YouTube', href: '' },
  ] as SocialLink[],
  /**
   * Feature flags gate functionality planned for later phases.
   * aiAssistant shipped in Phase 6 (DeepSeek + mock providers).
   * graphSharing shipped in Phase 7 (named saves, share links, import/export).
   */
  featureFlags: {
    aiAssistant: true,
    graphSharing: true,
    sliders: false,
    expressionTables: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;
