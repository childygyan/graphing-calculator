/**
 * Dicionário português de home — a página inicial de marketing
 * (`src/pages/index.astro`).
 */

import type { HomeStrings } from '../types.js';

export const home: HomeStrings = {
  seo: {
    title: 'Calculadora gráfica online grátis | Graphing Calculator',
    description:
      'Calculadora gráfica online grátis: trace funções, analise raízes, derivadas e ' +
      'integrais, explore com controles deslizantes e receba ajuda matemática da IA. Sem cadastro.',
  },
  hero: {
    title: 'Graphing Calculator',
    subtitle:
      'Trace funções matemáticas no seu navegador — rápido, acessível e grátis. Plote ' +
      'expressões, analise-as com métodos numéricos reais e peça ajuda ao assistente de IA. ' +
      'Sem cadastro, sem download.',
    primaryCta: 'Abrir a Calculadora Gráfica',
    secondaryCta: 'Aprender a traçar gráficos',
  },
  features: {
    ariaLabel: 'Recursos',
    cards: [
      {
        title: 'Gráficos interativos',
        description: 'Aproxime, arraste e explore',
        body:
          'Um gráfico rápido em canvas com linhas de grade adaptativas, zoom suave centrado no ' +
          'cursor, movimento por arrasto e suporte a toque. Trace funções cartesianas, curvas ' +
          'paramétricas, equações polares e inequações — cada expressão com sua própria cor e ' +
          'controle de visibilidade.',
        cta: 'Abrir a calculadora',
        href: '/graphing-calculator/',
      },
      {
        title: 'Análise matemática real',
        description: 'Raízes, derivadas, integrais',
        body:
          'Encontre raízes com o método de Brent, calcule derivadas e integrais definidas ' +
          'numericamente, inspecione tabelas de valores e desenhe retas tangentes — tudo com o ' +
          'mesmo motor, relatando honestamente quando um resultado não pode ser calculado.',
        cta: 'Experimentar as ferramentas de matemática',
        href: '/calculators/',
      },
      {
        title: 'Assistente matemático de IA',
        description: 'Pergunte em linguagem simples',
        body:
          'Faça perguntas em linguagem simples — o assistente as traduz em comandos da ' +
          'calculadora, plota o que você pedir e explica passo a passo. O motor matemático ' +
          'sempre faz os cálculos de verdade; a IA nunca inventa resultados.',
        cta: 'Perguntar ao assistente',
        href: '/graphing-calculator/',
      },
      {
        title: 'Variáveis, controles deslizantes e compartilhamento',
        description: 'Explore e compartilhe',
        body:
          'Defina variáveis, anime-as com controles deslizantes, salve gráficos nomeados no seu ' +
          'navegador e compartilhe-os como links compactos. Seu espaço de trabalho persiste entre ' +
          'visitas — tudo fica no seu dispositivo.',
        cta: 'Ver exemplos de gráficos',
        href: '/examples/',
      },
    ],
  },
  explore: {
    ariaLabel: 'Explorar',
    heading: 'Explore a matemática',
    cards: [
      {
        title: 'Biblioteca de funções',
        body: 'Seno, quadráticas, exponenciais e mais — cada uma com propriedades calculadas.',
        href: '/math-functions/',
      },
      {
        title: 'Exemplos de gráficos',
        body: 'Gráficos selecionados que abrem pré-carregados na calculadora, com anotações.',
        href: '/examples/',
      },
      {
        title: 'Aprender a traçar gráficos',
        body: 'Guias curtos sobre funções, derivadas, integrais e assíntotas.',
        href: '/learn/',
      },
    ],
  },
};
