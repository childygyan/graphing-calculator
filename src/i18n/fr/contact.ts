/**
 * French contact dictionary — the `/contact/` page prose.
 * Mirrors `src/i18n/en/contact.ts` exactly.
 *
 * The email address is a site-config value (currently a placeholder) and is
 * DO-NOT-TRANSLATE; only the surrounding copy is dictionary-driven.
 */

import type { ContactStrings } from '../types.js';

export const contact: ContactStrings = {
  seo: {
    title: 'Nous contacter',
    description: 'Comment nous contacter au sujet de Graphing Calculator.',
  },
  crumbs: [
    { label: 'Accueil', href: '/' },
    { label: 'Contact', href: '/contact/' },
  ],
  heading: 'Contact',
  body: [
    'Les questions, rapports de bogues ou retours sur la calculatrice sont les bienvenus. ' +
      'Le meilleur moyen de nous joindre est l’e-mail :',
  ],
  emailNote:
    'Il n’y a pas de formulaire de contact sur cette page — le projet n’a pas encore de ' +
    'backend, et un formulaire qui ne mènerait nulle part serait malhonnête. L’e-mail ' +
    'parvient à une vraie boîte de réception.',
  related: [],
};
