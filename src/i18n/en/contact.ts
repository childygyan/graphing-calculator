/**
 * English contact dictionary — the `/contact/` page prose.
 *
 * The email address is a site-config value (currently a placeholder) and is
 * DO-NOT-TRANSLATE; only the surrounding copy is dictionary-driven.
 */

import type { ContactStrings } from '../types.js';

export const contact: ContactStrings = {
  seo: {
    title: 'Contact',
    description: 'How to get in touch about the Graphing Calculator.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact/' },
  ],
  heading: 'Contact',
  body: [
    'Questions, bug reports, or feedback about the calculator are welcome. The best way to ' +
      'reach us is email:',
  ],
  emailNote:
    'There is no contact form on this page — the project has no backend yet, and a form ' +
    'that submitted to nowhere would be dishonest. Email reaches a real inbox.',
  related: [],
};
