/**
 * Centralized site configuration.
 *
 * Production URL: the Cloudflare Pages deployment
 * (https://graphingcalculator.online). Canonical URLs, sitemap
 * entries, and Open Graph tags are all derived from `siteUrl`.
 * If a custom domain is attached later, update this single value and rebuild.
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
  name: 'Graphing Calculator',
  tagline: 'Graph functions, explore mathematics, and learn with AI assistance.',
  description:
    'A fast, accessible online graphing calculator. Plot mathematical functions, ' +
    'manage multiple expressions, and — in future releases — explore math with AI assistance.',
  /** Production origin (Cloudflare Pages). Update + rebuild if a custom domain is attached. */
  siteUrl: 'https://graphingcalculator.online',
  /** Contact address (Firoz, 2026-09-29). */
  contactEmail: 'support@graphingcalculator.online',
  /**
   * Google Analytics 4 measurement ID (Firoz, 2026-09-29). Rendered by
   * BaseLayout on every page. Public value — it appears in page source.
   */
  googleAnalyticsId: 'G-CT7LPWPCV4',
  /**
   * Google Search Console verification code (Firoz, 2026-09-29). Rendered
   * as a meta tag by SeoHead. Overridable at build time via
   * PUBLIC_GOOGLE_SITE_VERIFICATION.
   */
  googleSiteVerification: '9qSByFO2_LS68JSI9dZc6Ixc_SxPALwlXKyX6tNSIAY',
  defaultTheme: 'system' as ThemeMode,
  themeStorageKey: 'graphing-calculator-theme',
  stateStorageKey: 'graphing-calculator-state-v1',
  navigation: [
    { label: 'Graphing Calculator', href: '/graphing-calculator/' },
    { label: 'Functions', href: '/math-functions/' },
    { label: 'Examples', href: '/examples/' },
    { label: 'Learn', href: '/learn/' },
    { label: 'Calculators', href: '/calculators/' },
    { label: '3D Graph', href: '/3d/' },
    { label: 'Scientific Calculator', href: '/scientific-calculator/' },
    { label: 'About', href: '/about/' },
  ] as NavLink[],
  footerColumns: [
    {
      heading: 'Product',
      links: [
        { label: 'Graphing Calculator', href: '/graphing-calculator/' },
        { label: 'Calculators', href: '/calculators/' },
        { label: 'About', href: '/about/' },
        { label: 'Methodology', href: '/methodology/' },
      ] as NavLink[],
    },
    {
      heading: 'Explore',
      links: [
        { label: 'Function Library', href: '/math-functions/' },
        { label: 'Graph Examples', href: '/examples/' },
        { label: 'Learn Graphing', href: '/learn/' },
        { label: '3D Graphing', href: '/3d/' },
        { label: 'Desmos Alternative', href: '/desmos-alternative/' },
      ] as NavLink[],
    },
    {
      heading: 'Calculators',
      links: [
        { label: 'Derivative Calculator', href: '/calculators/derivative/' },
        { label: 'Integral Calculator', href: '/calculators/integral/' },
        { label: 'Root Finder', href: '/calculators/root-finder/' },
        { label: 'Scientific Calculator', href: '/scientific-calculator/' },
      ] as NavLink[],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy/' },
        { label: 'Terms of Service', href: '/terms/' },
        { label: 'Disclaimer', href: '/disclaimer/' },
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
