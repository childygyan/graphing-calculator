/**
 * Deutsche Kontakt-Wörterliste — die Seite `/contact/`.
 *
 * Die E-Mail-Adresse ist ein Site-Config-Wert (derzeit ein Platzhalter) und
 * ist DO-NOT-TRANSLATE; nur der umgebende Text ist wörterbuchgesteuert.
 */

import type { ContactStrings } from '../types.js';

export const contact: ContactStrings = {
  seo: {
    title: 'Kontakt',
    description: 'So erreichen Sie uns zum Grafikrechner: Fragen, Feedback und Hilfe.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: 'Kontakt', href: '/contact/' },
  ],
  heading: 'Kontakt',
  body: [
    'Fragen, Fehlerberichte oder Feedback zum Rechner sind willkommen. Am besten erreichen ' +
      'Sie uns per E-Mail:',
  ],
  emailNote:
    'Auf dieser Seite gibt es kein Kontaktformular — das Projekt hat noch kein Backend, und ein ' +
    'Formular, das ins Leere läuft, wäre unehrlich. E-Mails erreichen ein echtes Postfach.',
  related: [],
};
