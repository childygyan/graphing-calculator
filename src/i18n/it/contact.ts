/**
 * Dizionario italiano contact — la pagina `/contact/`.
 *
 * L'indirizzo email è un valore di site-config (attualmente un segnaposto) e
 * NON si traduce; solo la copy circostante è guidata dal dizionario.
 */

import type { ContactStrings } from '../types.js';

export const contact: ContactStrings = {
  seo: {
    title: 'Contatti',
    description: 'Come contattarci per questioni su Graphing Calculator.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Contatti', href: '/contact/' },
  ],
  heading: 'Contatti',
  body: [
    'Domande, segnalazioni di bug o feedback sulla calcolatrice sono benvenuti. Il modo migliore per ' +
      'raggiungerci \u00e8 l\u2019email:',
  ],
  emailNote:
    'Non c\u2019\u00e8 un modulo di contatto in questa pagina — il progetto non ha ancora un backend, e un modulo ' +
    'che inviasse nel vuoto sarebbe disonesto. L\u2019email arriva a una vera casella di posta.',
  related: [],
};
