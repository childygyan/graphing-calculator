/**
 * Portuguese (pt) learn dictionary — the `/learn/` index prose and the shared
 * `[slug]` article template labels.
 *
 * Mirrors `../en/learn.ts` exactly: same keys, same nesting, same placeholder
 * names. Slugs, expressions, `tryExpressions`, and `reviewedOn` dates are not
 * translated; the month-name arrays exist so locale formatters can render
 * those dates in Portuguese.
 */

import type { LearnStrings } from '../types.js';

export const learn: LearnStrings = {
  seo: {
    title: 'Aprender Gráficos — Funções, Derivadas, Integrais e Mais | Graphing Calculator',
    description:
      'Aprenda conceitos de gráficos passo a passo: funções, derivadas, integrais, ' +
      'assíntotas, desigualdades e equações paramétricas — com exemplos para testar.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Aprender', href: '/learn/' },
  ],
  heading: 'Aprender Gráficos',
  intro:
    'Guias curtos e práticos sobre as ideias por trás dos gráficos — escritos para serem lidos ' +
    'junto com a calculadora, com expressões que você pode testar.',
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  shortMonths: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/calculators/'],
  template: {
    minReadTemplate: 'Aprender · {minutes} min de leitura',
    reviewAriaLabel: 'Informações de revisão',
    reviewLine: 'Revisado quanto à precisão matemática pela equipe da Graphing Calculator',
    lastReviewedTemplate: 'Última revisão: {date}',
    indexCardReviewTemplate: 'Revisado para precisão · {date}',
    tryHeading: 'Teste na calculadora',
    tryIntroTemplate: 'Digite qualquer uma destas na {link} para ver as ideias acima em ação:',
    calculatorLinkText: 'calculadora gráfica',
    takeawaysHeading: 'Principais conclusões',
  },
};
