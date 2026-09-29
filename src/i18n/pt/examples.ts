/**
 * Portuguese (pt) examples dictionary — the `/examples/` index prose and the
 * shared `[slug]` template labels.
 *
 * Mirrors `../en/examples.ts` exactly: same keys, same nesting, same
 * placeholder names. Expression syntax is not translated.
 */

import type { ExamplesStrings } from '../types.js';

export const examples: ExamplesStrings = {
  seo: {
    title: 'Exemplos de Gráficos — Gráficos Interativos Selecionados | Graphing Calculator',
    description:
      'Explore exemplos de gráficos selecionados — movimento de projéteis, oscilação ' +
      'amortecida, crescimento logístico, curvas de Lissajous e mais — cada um abre ' +
      'pré-carregado na calculadora.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Exemplos', href: '/examples/' },
  ],
  heading: 'Exemplos de Gráficos',
  intro:
    'Gráficos escolhidos a dedo que mostram o que a calculadora pode fazer — da física e da ' +
    'engenharia à beleza matemática pura. Cada exemplo abre pré-carregado na calculadora, ' +
    'com notas sobre o que observar.',
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/calculators/'],
  template: {
    eyebrow: 'Exemplo resolvido',
    plottedHeading: 'Expressões representadas',
    openCta: 'Abrir este gráfico na calculadora',
    preloadNote:
      'O link pré-carrega exatamente estas expressões na calculadora — sem precisar digitar.',
    noticeHeading: 'O que observar',
  },
};
