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
  tutorial: {
    ariaLabel: 'Tutorial',
    heading: 'Como usar a calculadora gráfica',
    lede:
      'Cinco passos, com a calculadora acima. Cada captura de tela é uma renderização ' +
      'real desta calculadora — sem mockups.',
    steps: [
      {
        title: 'Escreva sua primeira expressão',
        body:
          'Clique no painel Expressões e escreva x^2. A parábola é desenhada ' +
          'instantaneamente enquanto você escreve — nada para instalar e nenhuma conta ' +
          'para criar.',
        image: '/images/tutorial/step-1-first-expression.png',
        alt: 'Calculadora gráfica mostrando a parábola y = x ao quadrado',
      },
      {
        title: 'Compare duas curvas',
        body:
          'Clique em Adicionar e escreva sin(x). Cada expressão tem sua própria cor, e o ' +
          'ícone de olho mostra ou oculta cada curva, para que você possa comparar formas ' +
          'lado a lado.',
        image: '/images/tutorial/step-2-compare-curves.png',
        alt: 'Calculadora gráfica comparando a parábola y = x ao quadrado com uma onda senoidal',
      },
      {
        title: 'Aproxime e mova o gráfico',
        body:
          'Role para aproximar em direção ao cursor e arraste para mover a vista. Ao ' +
          'aproximar o vértice de x^2, vê-se a curva se achatando em (0, 0).',
        image: '/images/tutorial/step-3-zoom-in.png',
        alt: 'Vista aproximada da parábola y = x ao quadrado em torno de seu vértice em (0, 0)',
      },
      {
        title: 'Encontre onde uma curva cruza o eixo x',
        body:
          'Para x^2 - 4, as raízes aparecem como marcadores diretamente no gráfico — em ' +
          'x = -2 e x = 2. O painel Análise pode encontrar raízes, derivadas, integrais e ' +
          'muito mais para qualquer expressão.',
        image: '/images/tutorial/step-4-roots.png',
        alt: 'Gráfico de y = x ao quadrado menos 4 com marcadores de raiz em x = -2 e x = 2',
      },
      {
        title: 'Desenhe uma reta tangente',
        body:
          'Escolha um ponto em uma curva — aqui x = 1 em x^2 — e a reta tangente aparece ' +
          'em (1, 1), com sua inclinação calculada pelo motor matemático.',
        image: '/images/tutorial/step-5-tangent.png',
        alt: 'Gráfico de y = x ao quadrado com uma reta tangente em x = 1',
      },
    ],
  },
};
