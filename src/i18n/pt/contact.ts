/**
 * Portuguese (pt) contact dictionary — the `/contact/` page prose.
 *
 * Mirrors `../en/contact.ts` exactly: same keys, same nesting, same
 * placeholder names. The email address is a site-config value and is not
 * translated; only the surrounding copy is dictionary-driven.
 */

import type { ContactStrings } from '../types.js';

export const contact: ContactStrings = {
  seo: {
    title: 'Contato',
    description: 'Como entrar em contato sobre a Graphing Calculator.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Contato', href: '/contact/' },
  ],
  heading: 'Contato',
  body: [
    'Dúvidas, relatórios de erros ou comentários sobre a calculadora são bem-vindos. A melhor ' +
      'maneira de nos alcançar é por e-mail:',
  ],
  emailNote:
    'Não há formulário de contato nesta página — o projeto ainda não tem backend, e um ' +
    'formulário que enviasse para lugar nenhum seria desonesto. O e-mail chega a uma caixa de ' +
    'entrada real.',
  related: [],
};
