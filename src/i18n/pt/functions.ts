/**
 * Portuguese (pt) functions dictionary — the `/math-functions/` index prose
 * and the shared `[slug]` template labels.
 *
 * Mirrors `../en/functions.ts` exactly: same keys, same nesting, same
 * placeholder names. Math syntax, slugs, and expressions are not translated.
 */

import type { FunctionsStrings } from '../types.js';

export const functions: FunctionsStrings = {
  seo: {
    title: 'Biblioteca de Funções — Represente e Explore Funções Comuns | Graphing Calculator',
    description:
      'Explore a biblioteca de funções: seno, cosseno, funções quadráticas, exponenciais, ' +
      'logaritmos e mais — cada uma com raízes, extremos e propriedades-chave calculados.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Biblioteca de Funções', href: '/math-functions/' },
  ],
  heading: 'Biblioteca de Funções',
  intro:
    'Cada página abaixo cobre uma função notável em profundidade: o que ela é, suas principais ' +
    'propriedades matemáticas, onde ela aparece — além de um painel de propriedades calculadas ' +
    'em tempo real pelo próprio motor matemático da calculadora (raízes, extremos, interseções, ' +
    'derivadas e integrais).',
  related: ['/graphing-calculator/', '/learn/', '/examples/', '/calculators/'],
  template: {
    eyebrow: 'Biblioteca de funções',
    computedHeading: 'Propriedades calculadas',
    computedNoteTemplate:
      'Calculado pelo próprio motor matemático da calculadora gráfica em tempo de construção para {expression}.',
    rootsLabel: 'Raízes em [−10, 10]',
    yInterceptLabel: 'Interseção com o eixo y f(0)',
    extremaLabel: 'Extremos locais em [−10, 10]',
    samplesLabel: 'Valores de amostra',
    derivativeLabel: 'Derivada f′(1)',
    integralLabel: 'Integral ∫₀¹ f(x) dx',
    noneFound: 'nenhuma encontrada',
    moreTemplate: '…e mais {count}',
    computeFailed: 'Não foi possível calcular as propriedades para esta expressão.',
    keyFactsHeading: 'Fatos principais',
    ctaTemplate: 'Represente {notation} na calculadora',
    undefinedValue: 'indefinido',
    slugTitleTemplate: '{displayName} — Gráfico e propriedades',
  },
};
