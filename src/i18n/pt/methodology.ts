/**
 * Portuguese (pt) methodology dictionary — the `/methodology/` page prose.
 *
 * Mirrors `../en/methodology.ts` exactly: same keys, same nesting, same
 * placeholder names. Inline anchors are listed per-section in `links`; label
 * text appears in the body at the same position. Hrefs stay constant (they are
 * re-localized at render time by the page builders).
 */

import type { MethodologyStrings } from '../types.js';

export const methodology: MethodologyStrings = {
  seo: {
    title:
      'Metodologia — Como Nossa Matemática e Nosso Conteúdo São Verificados | Graphing Calculator',
    description:
      'Como a Graphing Calculator verifica sua matemática e seu conteúdo: um motor ' +
      'determinístico, centenas de testes automatizados, exemplos verificados pelo motor e ' +
      'revisões datadas.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Metodologia', href: '/methodology/' },
  ],
  heading: 'Nossa Metodologia',
  sections: [
    {
      heading: '1. Como os cálculos são computados e verificados',
      body: [
        'Uma calculadora só é útil se você puder confiar no que ela diz. Esta página documenta ' +
          'exatamente como a Graphing Calculator calcula resultados, como seu conteúdo educacional ' +
          'é escrito e verificado, e o que deliberadamente não fazemos.',
        'Cada número neste site vem de um motor matemático determinístico escrito especificamente ' +
          'para ele. Uma expressão que você digita é tokenizada, analisada em uma árvore sintática ' +
          'abstrata e compilada em closures executáveis — ela nunca passa por eval nem por código ' +
          'gerado. As raízes são encontradas pelo método de Brent, as derivadas por diferenças ' +
          'centrais, as integrais pela regra de Simpson adaptativa e os limites por estimativa ' +
          'numérica bilateral.',
        'Mais de 550 testes automatizados cobrem o motor de expressões, os métodos numéricos, o ' +
          'estado dos gráficos, o plotador 3D e a calculadora científica. Eles são executados ' +
          'antes de cada lançamento, e um lançamento não é publicado a menos que todos passem. ' +
          'Quando um cálculo não pode ser realizado de forma confiável — uma descontinuidade, uma ' +
          'integral que não converge, uma avaliação fora do domínio — a ferramenta relata a falha ' +
          'honestamente em vez de inventar um número.',
      ],
      links: [{ label: 'Graphing Calculator', href: '/graphing-calculator/' }],
    },
    {
      heading: '2. Como o conteúdo educacional é escrito e revisado',
      body: [
        'Os guias de aprendizado ensinam a representar gráficos desde o início: o que são funções, ' +
          'como domínios e contradomínios funcionam, como ler interseções e assíntotas, e como ' +
          'usar cada ferramenta deste site. Cada guia é escrito a partir de material padrão de ' +
          'currículo de matemática, não copiado nem reformulado de outros sites.',
        'Antes de um guia ser publicado, suas afirmações matemáticas são verificadas com o ' +
          'próprio motor de expressões do site — as raízes, os valores de exemplo e os domínios ' +
          'declarados no texto devem corresponder ao que a própria calculadora calcula. Um revisor ' +
          'humano da equipe da Graphing Calculator então lê o guia para verificar clareza e ' +
          'correção. Cada guia traz uma data de «Última revisão» e uma assinatura nomeando o ' +
          'revisor, para que você saiba exatamente quando a verificação aconteceu.',
      ],
      links: [{ label: 'guias de aprendizado', href: '/learn/' }],
    },
    {
      heading: '3. Como o assistente de IA é limitado',
      body: [
        'O assistente de IA integrado pode explicar conceitos, sugerir expressões para ' +
          'representar e ajudar você a configurar gráficos. Ele opera por meio de um esquema ' +
          'estrito de comandos: pode emitir apenas comandos da calculadora, e o motor da ' +
          'calculadora — não a IA — realiza todos os cálculos. O assistente não pode alterar o ' +
          'que o motor calcula e não pode acessar seus gráficos salvos.',
        'Até que o dono do site configure uma chave de provedor de IA, o assistente é executado ' +
          'em um modo de simulação claramente rotulado que informa isso na tela. Ele nunca finge ' +
          'estar conectado a um modelo ativo quando não está.',
      ],
    },
    {
      heading: '4. O que não fazemos',
      body: [
        'Sem revisores inventados. Não publicamos nomes, fotos ou credenciais falsas. As ' +
          'assinaturas de revisão dizem exatamente quem revisou o conteúdo — a equipe da ' +
          'Graphing Calculator — e quando.',
        'Sem estatísticas fabricadas. Não afirmamos contagens de usuários, classificações ou ' +
          'rankings de «melhor» que não possamos verificar. Comparações com outros produtos ' +
          'declaram apenas fatos publicamente conhecidos.',
        'Sem interfaces copiadas. A calculadora é uma implementação independente. Ela não ' +
          'reproduz a marca, a interface nem o material protegido por direitos autorais de ' +
          'nenhum outro produto.',
        'Sem coleta oculta de dados. Os gráficos ficam armazenados no seu navegador; os links ' +
          'de compartilhamento codificam o estado no URL. Não há contas nem análises de ' +
          'rastreamento ativadas por padrão. Consulte a política de privacidade para detalhes.',
      ],
      links: [{ label: 'política de privacidade', href: '/privacy-policy/' }],
    },
    {
      heading: '5. Correções',
      body: [
        'Se você encontrar um erro em um cálculo ou em um guia, entre em contato conosco com os ' +
          'detalhes. Os erros reportados são investigados com base no motor matemático, corrigidos ' +
          'quando confirmados, e a data de «Última revisão» do guia é atualizada para refletir a ' +
          'correção.',
      ],
      links: [{ label: 'entre em contato conosco', href: '/contact/' }],
    },
  ],
  faqs: [
    {
      question: 'Como os cálculos são verificados?',
      answer:
        'Cada resultado vem de um motor matemático determinístico integrado ao site — as ' +
        'expressões são tokenizadas, analisadas em uma árvore sintática abstrata e compiladas ' +
        'em closures, nunca passadas por eval. Mais de 550 testes automatizados cobrem o motor, ' +
        'os métodos de análise e a interface, e eles são executados antes de cada lançamento.',
    },
    {
      question: 'O assistente de IA faz os cálculos?',
      answer:
        'Não. O assistente de IA explica conceitos e emite comandos da calculadora, mas o ' +
        'próprio motor da calculadora é sempre a fonte da verdade para os resultados. Até que o ' +
        'dono do site configure uma chave de API, o assistente é executado em um modo de ' +
        'simulação claramente rotulado.',
    },
    {
      question: 'Como os guias de aprendizado são revisados?',
      answer:
        'Cada guia é verificado quanto à precisão matemática antes da publicação: as raízes, ' +
        'os domínios e os valores de exemplo que ele declara são verificados com o próprio ' +
        'motor de expressões do site. Um revisor humano da equipe da Graphing Calculator então lê ' +
        'cada guia para verificar clareza e correção, e o guia traz uma data de «Última revisão» ' +
        'mostrando quando essa verificação aconteceu.',
    },
    {
      question: 'Quem revisa o conteúdo?',
      answer:
        'O conteúdo é revisado pela equipe da Graphing Calculator — as pessoas que constroem e ' +
        'mantêm este site. Não inventamos nomes, fotos ou credenciais de revisores; a assinatura ' +
        'de cada guia diz exatamente quem o revisou e quando.',
    },
    {
      question: 'O que acontece quando um erro é encontrado?',
      answer:
        'Ele é corrigido, e a data de «Última revisão» do guia é atualizada. Se você encontrar ' +
        'um erro, pode reportá-lo pela página de contato e ele será investigado com base no motor ' +
        'matemático.',
    },
    {
      question: 'A saída numérica é exata?',
      answer:
        'Métodos numéricos são aproximações, e a calculadora diz isso onde importa. Quando uma ' +
        'raiz, derivada ou integral não pode ser calculada — um canto, um salto, uma ' +
        'singularidade — a ferramenta relata isso honestamente em vez de devolver um número ' +
        'enganoso.',
    },
  ],
  related: ['/about/', '/learn/', '/graphing-calculator/', '/desmos-alternative/'],
};
