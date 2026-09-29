/**
 * Dicionário português de chrome — textos compartilhados do layout (cabeçalho,
 * rodapé, navegação, breadcrumbs, modal, seletor de idioma, modelo de tema).
 */

import type { ChromeStrings } from '../types.js';

export const chrome: ChromeStrings = {
  skipLink: 'Pular para o conteúdo principal',
  logoAriaLabel: 'Início do Graphing Calculator',
  nav: {
    primaryLabel: 'Principal',
    mobileLabel: 'Móvel',
    openMenu: 'Abrir menu',
    items: [
      { label: 'Graphing Calculator', href: '/graphing-calculator/' },
      { label: 'Funções', href: '/math-functions/' },
      { label: 'Exemplos', href: '/examples/' },
      { label: 'Aprender', href: '/learn/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Gráfico 3D', href: '/3d/' },
      { label: 'Calculadora científica', href: '/scientific-calculator/' },
      { label: 'Sobre', href: '/about/' },
    ],
  },
  language: {
    label: 'Idioma',
    summaryTemplate: 'Idioma: {language}',
    note: '',
  },
  footer: {
    description:
      'Uma calculadora gráfica online rápida e acessível. Trace funções matemáticas, ' +
      'gerencie várias expressões e — em versões futuras — explore matemática com ajuda de IA.',
    columns: [
      {
        heading: 'Produto',
        links: [
          { label: 'Graphing Calculator', href: '/graphing-calculator/' },
          { label: 'Calculadoras', href: '/calculators/' },
          { label: 'Sobre', href: '/about/' },
          { label: 'Metodologia', href: '/methodology/' },
        ],
      },
      {
        heading: 'Explorar',
        links: [
          { label: 'Biblioteca de funções', href: '/math-functions/' },
          { label: 'Exemplos de gráficos', href: '/examples/' },
          { label: 'Aprender a traçar gráficos', href: '/learn/' },
          { label: 'Gráficos 3D', href: '/3d/' },
          { label: 'Alternativa ao Desmos', href: '/desmos-alternative/' },
        ],
      },
      {
        heading: 'Calculadoras',
        links: [
          { label: 'Calculadora de derivadas', href: '/calculators/derivative/' },
          { label: 'Calculadora de integrais', href: '/calculators/integral/' },
          { label: 'Localizador de raízes', href: '/calculators/root-finder/' },
          { label: 'Calculadora científica', href: '/scientific-calculator/' },
        ],
      },
      {
        heading: 'Jurídico',
        links: [
          { label: 'Política de privacidade', href: '/privacy-policy/' },
          { label: 'Termos de serviço', href: '/terms/' },
          { label: 'Aviso legal', href: '/disclaimer/' },
          { label: 'Contato', href: '/contact/' },
        ],
      },
    ],
    social: {
      groupLabel: 'Links sociais',
      comingSoonTitle: 'Em breve',
      comingSoon: '(em breve)',
      links: [
        { label: 'X', href: '' },
        { label: 'GitHub', href: '' },
        { label: 'YouTube', href: '' },
      ],
    },
    copyrightTemplate: '{year} {name}. Todos os direitos reservados.',
  },
  breadcrumbs: {
    ariaLabel: 'Caminho de navegação',
    homeLabel: 'Início',
  },
  faqDefaultHeading: 'Perguntas frequentes',
  relatedDefaultHeading: 'Páginas relacionadas',
  modal: {
    close: 'Fechar',
    backdrop: 'Fechar diálogo',
  },
  themeLabelTemplate: 'Tema: {mode}. Ative para trocar de tema.',
};
