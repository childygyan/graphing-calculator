/**
 * Portuguese (pt) about dictionary — the `/about/` page prose.
 *
 * Mirrors `../en/about.ts` exactly: same keys, same nesting, same placeholder
 * names. Creator URLs and link labels are nominative identifiers and are not
 * translated; math syntax is not translated.
 */

import type { AboutStrings } from '../types.js';

export const about: AboutStrings = {
  seo: {
    title: 'Sobre',
    description:
      'O que é a Graphing Calculator: recursos, como funciona o motor matemático e como seus ' +
      'dados são tratados.',
  },
  crumbs: [{ label: 'Início', href: '/' }],
  heading: 'Sobre',
  intro: [
    'A Graphing Calculator é uma ferramenta matemática original, baseada no navegador, para ' +
      'representar gráficos de funções e explorar a matemática. É uma implementação independente — ' +
      'construída do zero, não derivada de nenhum outro produto de gráficos.',
    'O que ela faz hoje: representa funções cartesianas, curvas paramétricas, equações polares e ' +
      'desigualdades em um gráfico interativo em canvas com zoom, deslocamento e suporte a toque; ' +
      'analisa expressões com métodos numéricos reais (raízes pelo método de Brent, derivadas por ' +
      'diferenças centrais, integrais pela regra de Simpson adaptativa, tabelas, retas tangentes); ' +
      'anima parâmetros com variáveis e controles deslizantes; oferece ajuda em linguagem simples ' +
      'de um assistente de IA que emite comandos da calculadora enquanto o motor matemático faz os ' +
      'cálculos de verdade; e salva, compartilha, importa e exporta estados de gráficos.',
  ],
  creator: {
    heading: 'Sobre o criador',
    imageAlt: 'Firoz Khan, criador da Graphing Calculator',
    name: 'Firoz Khan',
    body: 'A Graphing Calculator é construída e mantida por Firoz Khan. Conecte-se com ele aqui:',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/firoz-khan-1153358a/' },
      { label: 'GitHub', href: 'https://github.com/fkdigitalmedia' },
      { label: 'Instagram', href: 'https://www.instagram.com/rtibyfiroz/' },
    ],
  },
  sections: [
    {
      heading: 'Como seus dados são tratados',
      body: [
        'Tudo é executado no seu dispositivo. Os gráficos que você salva ficam armazenados no ' +
          'armazenamento local do seu navegador; os links de compartilhamento codificam o estado ' +
          'do gráfico no próprio URL. Não há contas, nenhuma análise de rastreamento ativada por ' +
          'padrão e nenhum dado pessoal enviado a um servidor pela calculadora. Solicitações ao ' +
          'assistente de IA vão apenas para o provedor de IA configurado, e somente quando você ' +
          'usa o assistente.',
      ],
    },
    {
      heading: 'Honestidade sobre os resultados',
      body: [
        'Métodos numéricos são aproximações, e a calculadora deixa isso claro onde importa: ' +
          'quando uma raiz, derivada ou integral não pode ser calculada — um canto, um salto, ' +
          'uma singularidade — a ferramenta relata isso honestamente em vez de devolver um número ' +
          'enganoso.',
      ],
    },
    {
      heading: 'Como revisamos o conteúdo',
      body: [
        'Cada guia deste site é verificado quanto à precisão matemática antes de ser publicado. ' +
          'Os fatos matemáticos de cada guia — raízes, domínios, valores de exemplo — são ' +
          'verificados com o próprio motor de expressões do site, o mesmo código que alimenta a ' +
          'calculadora, para que o que você lê corresponda ao que a ferramenta calcula.',
        'Um revisor humano da equipe da Graphing Calculator então lê cada guia para verificar ' +
          'clareza e correção. Quando um erro é encontrado — um sinal errado, um exemplo ' +
          'enganoso, uma etapa que pula demais — ele é corrigido antes de o guia ser publicado, ' +
          'e o guia traz uma data de «Última revisão» para que você saiba quando essa verificação ' +
          'aconteceu.',
      ],
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
};
