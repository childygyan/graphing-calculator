/**
 * Deutsche Chrome-Wörterliste — gemeinsame Layout-Texte (Header, Footer,
 * Navigation, Breadcrumbs, Modal, Sprachumschalter, Theme-Label-Vorlage).
 *
 * Navigationsreihenfolge und Footer-Struktur spiegeln `src/data/site.ts`
 * exakt wider; die zukünftige Header-/Footer-Umstellung wird diesen
 * Namensraum statt der siteConfig-Labels konsumieren.
 */

import type { ChromeStrings } from '../types.js';

export const chrome: ChromeStrings = {
  skipLink: 'Zum Hauptinhalt springen',
  logoAriaLabel: 'Startseite des Graphing Calculator',
  nav: {
    primaryLabel: 'Hauptnavigation',
    mobileLabel: 'Mobile Navigation',
    openMenu: 'Menü öffnen',
    items: [
      { label: 'Grafikrechner', href: '/graphing-calculator/' },
      { label: 'Funktionen', href: '/math-functions/' },
      { label: 'Beispiele', href: '/examples/' },
      { label: 'Lernen', href: '/learn/' },
      { label: 'Rechner', href: '/calculators/' },
      { label: '3D-Graph', href: '/3d/' },
      { label: 'Wissenschaftlicher Rechner', href: '/scientific-calculator/' },
      { label: 'Über uns', href: '/about/' },
    ],
  },
  language: {
    label: 'Sprache',
    summaryTemplate: 'Sprache: {language}',
    note: '',
  },
  footer: {
    description:
      'Ein schneller, barrierefreier Online-Grafikrechner. Mathematische Funktionen zeichnen, ' +
      'mehrere Ausdrücke verwalten und — in zukünftigen Versionen — mit KI-Unterstützung Mathe erkunden.',
    columns: [
      {
        heading: 'Produkt',
        links: [
          { label: 'Grafikrechner', href: '/graphing-calculator/' },
          { label: 'Rechner', href: '/calculators/' },
          { label: 'Über uns', href: '/about/' },
          { label: 'Methodik', href: '/methodology/' },
        ],
      },
      {
        heading: 'Entdecken',
        links: [
          { label: 'Funktionsbibliothek', href: '/math-functions/' },
          { label: 'Graph-Beispiele', href: '/examples/' },
          { label: 'Graphen lernen', href: '/learn/' },
          { label: '3D-Graphen', href: '/3d/' },
          { label: 'Desmos-Alternative', href: '/desmos-alternative/' },
        ],
      },
      {
        heading: 'Rechner',
        links: [
          { label: 'Ableitungsrechner', href: '/calculators/derivative/' },
          { label: 'Integralrechner', href: '/calculators/integral/' },
          { label: 'Nullstellenfinder', href: '/calculators/root-finder/' },
          { label: 'Wissenschaftlicher Rechner', href: '/scientific-calculator/' },
        ],
      },
      {
        heading: 'Rechtliches',
        links: [
          { label: 'Datenschutzerklärung', href: '/privacy-policy/' },
          { label: 'Nutzungsbedingungen', href: '/terms/' },
          { label: 'Haftungsausschluss', href: '/disclaimer/' },
          { label: 'Kontakt', href: '/contact/' },
        ],
      },
    ],
    social: {
      groupLabel: 'Social-Media-Links',
      comingSoonTitle: 'Bald verfügbar',
      comingSoon: '(bald)',
      links: [
        { label: 'X', href: '' },
        { label: 'GitHub', href: '' },
        { label: 'YouTube', href: '' },
      ],
    },
    copyrightTemplate: '{year} {name}. Alle Rechte vorbehalten.',
  },
  breadcrumbs: {
    ariaLabel: 'Brotkrumen-Navigation',
    homeLabel: 'Startseite',
  },
  faqDefaultHeading: 'Häufig gestellte Fragen',
  relatedDefaultHeading: 'Verwandte Seiten',
  modal: {
    close: 'Schließen',
    backdrop: 'Dialog schließen',
  },
  themeLabelTemplate: 'Farbschema: {mode}. Aktivieren, um das Farbschema zu wechseln.',
};
