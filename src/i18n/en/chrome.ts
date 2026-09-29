/**
 * English chrome dictionary — shared layout copy (header, footer, nav,
 * breadcrumbs, modal, language switcher, theme label template).
 *
 * Navigation order and footer structure mirror `src/data/site.ts` exactly;
 * the future header/footer refactor will consume this namespace instead of
 * siteConfig labels.
 */

import type { ChromeStrings } from '../types.js';

export const chrome: ChromeStrings = {
  skipLink: 'Skip to main content',
  logoAriaLabel: 'Graphing Calculator home',
  nav: {
    primaryLabel: 'Primary',
    mobileLabel: 'Mobile',
    openMenu: 'Open menu',
    items: [
      { label: 'Graphing Calculator', href: '/graphing-calculator/' },
      { label: 'Functions', href: '/math-functions/' },
      { label: 'Examples', href: '/examples/' },
      { label: 'Learn', href: '/learn/' },
      { label: 'Calculators', href: '/calculators/' },
      { label: '3D Graph', href: '/3d/' },
      { label: 'Scientific Calculator', href: '/scientific-calculator/' },
      { label: 'About', href: '/about/' },
    ],
  },
  language: {
    label: 'Language',
    summaryTemplate: 'Language: {language}',
    note: '',
  },
  footer: {
    description:
      'A fast, accessible online graphing calculator. Plot mathematical functions, ' +
      'manage multiple expressions, and — in future releases — explore math with AI assistance.',
    columns: [
      {
        heading: 'Product',
        links: [
          { label: 'Graphing Calculator', href: '/graphing-calculator/' },
          { label: 'Calculators', href: '/calculators/' },
          { label: 'About', href: '/about/' },
          { label: 'Methodology', href: '/methodology/' },
        ],
      },
      {
        heading: 'Explore',
        links: [
          { label: 'Function Library', href: '/math-functions/' },
          { label: 'Graph Examples', href: '/examples/' },
          { label: 'Learn Graphing', href: '/learn/' },
          { label: '3D Graphing', href: '/3d/' },
          { label: 'Desmos Alternative', href: '/desmos-alternative/' },
        ],
      },
      {
        heading: 'Calculators',
        links: [
          { label: 'Derivative Calculator', href: '/calculators/derivative/' },
          { label: 'Integral Calculator', href: '/calculators/integral/' },
          { label: 'Root Finder', href: '/calculators/root-finder/' },
          { label: 'Scientific Calculator', href: '/scientific-calculator/' },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy-policy/' },
          { label: 'Terms of Service', href: '/terms/' },
          { label: 'Disclaimer', href: '/disclaimer/' },
          { label: 'Contact', href: '/contact/' },
        ],
      },
    ],
    social: {
      groupLabel: 'Social links',
      comingSoonTitle: 'Coming soon',
      comingSoon: '(soon)',
      links: [
        { label: 'X', href: '' },
        { label: 'GitHub', href: '' },
        { label: 'YouTube', href: '' },
      ],
    },
    copyrightTemplate: '{year} {name}. All rights reserved.',
  },
  breadcrumbs: {
    ariaLabel: 'Breadcrumb',
    homeLabel: 'Home',
  },
  faqDefaultHeading: 'Frequently asked questions',
  relatedDefaultHeading: 'Related pages',
  modal: {
    close: 'Close',
    backdrop: 'Close dialog',
  },
  themeLabelTemplate: 'Theme: {mode}. Activate to switch theme.',
};
