/**
 * Portuguese (pt) desmos-alternative dictionary — the `/desmos-alternative/`
 * page prose.
 *
 * Mirrors `../en/desmosAlt.ts` exactly: same keys, same nesting, same
 * placeholder names. Legal constraints (from the page source, do not weaken):
 * "Desmos" appears only in nominative, comparative use; about Desmos only
 * publicly well-known facts are stated; no reviews, ratings, statistics, or
 * user counts.
 */

import type { DesmosAltStrings } from '../types.js';

export const desmosAlt: DesmosAltStrings = {
  seo: {
    title:
      'Melhor Alternativa ao Desmos — Calculadora Gráfica Online Gratuita | Graphing Calculator',
    description:
      'Procurando uma alternativa ao Desmos? A Graphing Calculator é uma calculadora gráfica ' +
      'online gratuita e independente, com gráficos 2D/3D, ajuda de IA e ferramentas de análise.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Alternativa ao Desmos', href: '/desmos-alternative/' },
  ],
  heading: 'Melhor Alternativa ao Desmos — Calculadora Gráfica Online Gratuita',
  asideAriaLabel: 'Aviso de independência',
  disclaimer:
    'Produto independente. A Graphing Calculator não é afiliada, endossada nem conectada ao ' +
    'Desmos ou à Amplify. "Desmos" é usado nesta página apenas para descrever aquilo para o ' +
    'qual este site é uma alternativa.',
  sections: [
    {
      heading: 'Desmos vs. Graphing Calculator',
      body: [
        'Muitas pessoas pesquisam na web por uma calculadora Desmos quando precisam ' +
          'representar uma função rapidamente. Se esse é o seu caso, a Graphing Calculator é uma ' +
          'alternativa gratuita e independente que você pode usar agora mesmo — sem cadastro, sem ' +
          'download, sem conta.',
        'Uma visão lado a lado do básico. Sobre o Desmos, esta tabela declara apenas fatos ' +
          'publicamente conhecidos — nada adivinhado ou não verificado.',
      ],
    },
    {
      heading: 'O que você obtém com a Graphing Calculator',
      body: [
        'A calculadora gráfica 2D representa funções instantaneamente à medida que você digita, ' +
          'com zoom em direção ao cursor, deslocamento e suporte a toque. Adicione controles ' +
          'deslizantes para explorar parâmetros em tempo real, alterne para o modo paramétrico ou ' +
          'polar, ou sombreie desigualdades — tudo na mesma visualização.',
        'Para três dimensões, o plotador de superfícies 3D renderiza z = f(x, y) com controles ' +
          'de órbita, zoom, controle de resolução e superfícies predefinidas, compiladas pelo ' +
          'próprio motor matemático do site.',
        'A análise integrada encontra raízes, interseções, derivadas, integrais, limites e ' +
          'extremos, e desenha retas tangentes e normais diretamente no gráfico. As calculadoras ' +
          'matemáticas autônomas cobrem as mesmas operações passo a passo, e os guias de ' +
          'aprendizado explicam as ideias por trás delas.',
        'Um assistente de IA de matemática está integrado para explicar conceitos e ajudar a ' +
          'configurar gráficos. Até que o dono do site configure uma chave de API, ele é ' +
          'executado em um modo de simulação claramente rotulado — a própria calculadora, nunca ' +
          'a IA, é a fonte da verdade para os resultados.',
        'Cada gráfico pode ser compartilhado como um link que reabre exatamente a mesma ' +
          'visualização, sem necessidade de conta em nenhuma das pontas. E não há nada com que ' +
          'concordar além do básico: sem contas, sem cookies, sem rastreadores de terceiros.',
      ],
      links: [
        { label: 'A calculadora gráfica 2D', href: '/graphing-calculator/' },
        { label: 'plotador de superfícies 3D', href: '/3d/' },
        { label: 'calculadoras matemáticas autônomas', href: '/calculators/' },
        { label: 'guias de aprendizado', href: '/learn/' },
      ],
    },
  ],
  faqs: [
    {
      question: 'Isso é afiliado ao Desmos?',
      answer:
        'Não. A Graphing Calculator é um produto independente. Não é afiliada, endossada nem ' +
        'conectada ao Desmos ou à Amplify. O nome "Desmos" aparece nesta página apenas para ' +
        'descrever aquilo para o qual este site é uma alternativa.',
    },
    {
      question: 'A Graphing Calculator é gratuita?',
      answer: 'Sim. A Graphing Calculator é gratuita, e não há cadastro — o site não tem contas.',
    },
    {
      question: 'Preciso de uma conta para salvar ou compartilhar gráficos?',
      answer:
        'Não. Não há contas para criar. Você pode transformar qualquer gráfico em um link ' +
        'compartilhável que reabre exatamente a mesma visualização, e quem abrir o link também ' +
        'não precisa de conta.',
    },
    {
      question: 'Posso representar gráficos 3D?',
      answer:
        'Sim. A Graphing Calculator inclui um plotador interativo de superfícies 3D para funções ' +
        'da forma z = f(x, y), com controles de órbita, zoom, controle de resolução e superfícies ' +
        'predefinidas.',
    },
    {
      question: 'Ela tem um assistente de IA?',
      answer:
        'Sim. O assistente de IA de matemática integrado pode explicar conceitos e ajudar você ' +
        'a configurar gráficos. Até que o dono do site configure uma chave de API, ele é ' +
        'executado em um modo de simulação claramente rotulado, e a própria calculadora — não ' +
        'a IA — é sempre a fonte da verdade para os resultados.',
    },
    {
      question: 'Quais ferramentas de análise estão incluídas?',
      answer:
        'Raízes, interseções, derivadas, integrais, limites, extremos e retas tangentes/normais ' +
        '— tudo calculado pelo próprio motor matemático do site e desenhado diretamente no ' +
        'gráfico.',
    },
  ],
  table: {
    caption: 'Comparação do básico: Desmos vs. Graphing Calculator',
    headers: ['Recurso', 'Desmos', 'Graphing Calculator'],
    rows: [
      { feature: 'Preço', ours: 'Gratuito', theirs: 'Gratuito' },
      {
        feature: 'É necessário criar uma conta?',
        ours: 'Não — o site não tem contas',
        theirs: 'Não — o gráfico básico funciona sem uma conta',
      },
      {
        feature: 'Gráfico 2D',
        ours: 'Sim — com controles deslizantes, modos paramétrico e polar, e desigualdades',
        theirs: 'Sim',
      },
    ],
  },
  related: ['/graphing-calculator/', '/calculators/', '/learn/'],
};
