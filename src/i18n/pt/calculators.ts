/**
 * Dicionário português de calculators — o hub `/calculators/` mais as páginas
 * das ferramentas de derivada, integral e busca de raízes, e as strings do
 * island MathTools.
 */

import type { CalculatorsStrings } from '../types.js';

export const calculators: CalculatorsStrings = {
  index: {
    seo: {
      title:
        'Calculadoras — Ferramentas de gráficos, científica, 3D, derivada, integral e raízes | Graphing Calculator',
      description:
        'Navegue pela coleção de calculadoras funcionais: a calculadora gráfica, a ' +
        'calculadora científica, gráficos 3D de superfícies, além de ferramentas focadas de ' +
        'derivada, integral e busca de raízes. Grátis, sem cadastro.',
    },
    crumbs: [
      { label: 'Início', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
    ],
    heading: 'Calculadoras',
    intro:
      'Uma pequena coleção de ferramentas matemáticas focadas. Cada uma é listada aqui apenas ' +
      'quando realmente funciona — nada é uma entrada de espaço reservado.',
    tools: [
      {
        title: 'Graphing Calculator',
        description: 'O espaço de trabalho principal',
        blurb:
          'Trace expressões cartesianas, paramétricas e polares com um gráfico interativo em ' +
          'canvas, analise raízes, derivadas e integrais, anime variáveis com controles ' +
          'deslizantes e pergunte ao assistente de IA.',
        href: '/graphing-calculator/',
        cta: 'Abrir a calculadora gráfica',
      },
      {
        title: 'Calculadora de derivadas',
        description: 'f′(a) numericamente',
        blurb:
          'Digite qualquer função f(x) e um ponto a para estimar a derivada f′(a) com o método ' +
          'das diferenças centrais — a mesma rotina por trás das retas tangentes do gráfico.',
        href: '/calculators/derivative/',
        cta: 'Derivar uma função',
      },
      {
        title: 'Calculadora de integrais',
        description: 'Integrais definidas',
        blurb:
          'Calcule ∫[a,b] f(x) dx numericamente com a regra de Simpson adaptativa, com uma ' +
          'explicação de área com sinal e quando as integrais se anulam.',
        href: '/calculators/integral/',
        cta: 'Integrar uma função',
      },
      {
        title: 'Localizador de raízes',
        description: 'Resolver f(x) = 0',
        blurb:
          'Encontre todas as raízes reais de f(x) em um intervalo de sua escolha, usando ' +
          'varredura por mudança de sinal refinada pelo método de Brent — verificado, nunca ' +
          'adivinhado.',
        href: '/calculators/root-finder/',
        cta: 'Encontrar raízes',
      },
      {
        title: 'Calculadora científica',
        description: 'Trig, logs, potências e mais',
        blurb:
          'Uma calculadora completa com teclado: funções trigonométricas e inversas com modos ' +
          'DEG/RAD, logaritmos, potências, raízes e constantes — com mensagens de erro honestas ' +
          'em vez de NaN silencioso.',
        href: '/scientific-calculator/',
        cta: 'Calcular',
      },
      {
        title: 'Gráfico 3D',
        description: 'Superfícies z = f(x, y)',
        blurb:
          'Trace superfícies 3D como x²+y² ou sin(√(x²+y²)). Arraste para girar, role para zoom ' +
          'e ajuste o detalhe da malha — renderizado ao vivo em canvas com falhas honestas onde ' +
          'a função é indefinida.',
        href: '/3d/',
        cta: 'Explorar superfícies 3D',
      },
    ],
    related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
  },
  derivative: {
    seo: {
      title: 'Calculadora de derivadas — Calcule f′(x) instantaneamente | Graphing Calculator',
      description:
        'Calculadora de derivadas online grátis: digite qualquer função f(x) e um ponto para ' +
        'obter f′(a) numericamente, com uma explicação do que a derivada significa.',
    },
    crumbs: [
      { label: 'Início', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Calculadora de derivadas', href: '/calculators/derivative/' },
    ],
    heading: 'Calculadora de derivadas',
    intro: [
      'A derivada de uma função em um ponto mede sua taxa de variação instantânea — ' +
        'geometricamente, a inclinação da reta tangente ao gráfico naquele ponto. Digite qualquer ' +
        'função abaixo e esta ferramenta estima f′(a) numericamente.',
    ],
    sections: [
      {
        heading: 'Como o cálculo funciona',
        body: [
          'Esta ferramenta usa a fórmula das diferenças centrais: f′(a) ≈ (f(a + h) − f(a − h)) / 2h, ' +
            'com um passo h pequeno. É o mesmo método numérico que a calculadora gráfica usa em ' +
            'sua análise de retas tangentes, então os resultados aqui coincidem com o que você vê ' +
            'ao inspecionar uma tangente no gráfico.',
          'A diferenciação numérica é uma aproximação. Para funções suaves como polinômios, ' +
            'funções trigonométricas e exponenciais, a estimativa é precisa até muitas casas ' +
            'decimais. Em cantos afiados (como |x| em x = 0) ou descontinuidades, a derivada pode ' +
            'não existir, e a ferramenta dirá isso honestamente em vez de retornar um número ' +
            'enganoso.',
        ],
      },
      {
        heading: 'O que a derivada diz a você',
        body: [
          'Uma derivada positiva significa que a função está crescendo naquele ponto; uma ' +
            'derivada negativa significa que está decrescendo. Quanto maior a magnitude, mais ' +
            'íngreme o gráfico. Onde a derivada é zero, o gráfico momentaneamente se achata — ' +
            'esses são os locais candidatos a máximos e mínimos locais.',
          'Derivadas também têm significado físico: se f(x) é a posição ao longo do tempo, f′(x) ' +
            'é a velocidade; se f(x) é a velocidade, f′(x) é a aceleração. Experimente f(x) = x² ' +
            'em a = 2 (resultado: 4) e em a = −2 (resultado: −4) para ver a mudança de sinal ao ' +
            'cruzar o mínimo.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Esta é uma derivada simbólica exata?',
        answer:
          'Não — esta ferramenta calcula uma aproximação numérica usando o método das ' +
          'diferenças centrais. É altamente precisa para funções suaves, mas continua sendo uma ' +
          'estimativa, mostrada arredondada para 6 casas decimais.',
      },
      {
        question: 'Por que ela falha em alguns pontos?',
        answer:
          'Algumas funções não são diferenciáveis em todos os lugares: |x| tem um canto em x = 0, ' +
          'e funções com saltos ou assíntotas verticais não têm inclinação significativa ali. A ' +
          'ferramenta reporta que não pode estimar a derivada em vez de adivinhar.',
      },
      {
        question: 'Como isso se relaciona com o recurso de reta tangente?',
        answer:
          'A reta tangente a f em x = a tem inclinação f′(a) — exatamente o que esta ferramenta ' +
          'calcula. Na calculadora gráfica, você pode desenhar a reta tangente no gráfico e ler ' +
          'visualmente a mesma inclinação.',
      },
    ],
    related: [
      '/calculators/integral/',
      '/calculators/root-finder/',
      '/learn/understanding-derivatives/',
      '/math-functions/quadratic/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Calculadora de derivadas',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'ex.: x^2',
      atLabel: 'em a =',
      atPlaceholder: 'ex.: 2',
      calculate: 'Calcular f′(a)',
      fillError: 'Digite uma função e um ponto.',
      parseError: 'Não foi possível analisar f(x). Verifique a expressão.',
      badPoint: 'O ponto a deve ser um número.',
      resultTemplate: 'f′({a}) ≈ {value}',
      noDerivative:
        'Não foi possível estimar a derivada aqui — a função pode ser indefinida ou não ' +
        'suave neste ponto.',
      loadFailedTitle: 'Falha ao carregar a ferramenta de derivadas',
      panelTitle: 'Derivar',
      functionNameLabel: 'Função f(x)',
      examplePlaceholder: 'ex.: x^2 - 4',
      pointLabel: 'Ponto a',
      compute: 'Calcular f′(a)',
      pointFiniteError: 'Digite um número finito para o ponto.',
      notDifferentiableError:
        'Não foi possível estimar a derivada nesse ponto (a função pode não ser diferenciável nesse ponto).',
      estimateError: 'Não foi possível estimar a derivada nesse ponto.',
      resultLineTemplate: "f'({a}) ≈ {value}",
      parseFallback: 'Não foi possível analisar essa expressão.',
    },
  },
  integral: {
    seo: {
      title: 'Calculadora de integrais — Integrais definidas online | Graphing Calculator',
      description:
        'Calculadora de integrais online grátis: calcule integrais definidas ∫[a,b] f(x) dx ' +
        'numericamente com a regra de Simpson adaptativa, explicadas passo a passo.',
    },
    crumbs: [
      { label: 'Início', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Calculadora de integrais', href: '/calculators/integral/' },
    ],
    heading: 'Calculadora de integrais',
    intro: [
      'A integral definida de f de a até b mede a área com sinal entre o gráfico e o eixo x ' +
        'nesse intervalo. Digite uma função e os limites abaixo para calculá-la numericamente.',
    ],
    sections: [
      {
        heading: 'Como o cálculo funciona',
        body: [
          'Esta ferramenta usa a regra de Simpson adaptativa: ela aproxima a função com ' +
            'parábolas em pequenos subintervalos e subdivide recursivamente onde a estimativa ' +
            'ainda não é precisa o suficiente. É a mesma rotina de quadratura por trás das ' +
            'regiões de integral sombreadas na calculadora gráfica, então os números coincidem.',
          'Como o método é adaptativo, funções suaves convergem rapidamente, enquanto regiões ' +
            'complicadas — picos afiados, oscilações — recebem automaticamente mais subdivisões. ' +
            'O resultado é arredondado para 6 casas decimais; a estimativa subjacente costuma ser ' +
            'precisa bem além disso.',
        ],
      },
      {
        heading: 'Lendo o resultado',
        body: [
          'A área acima do eixo x conta positiva e a área abaixo conta negativa, então uma ' +
            'integral pode ser zero mesmo quando a função não é — por exemplo, ∫[−1,1] x³ dx = 0 ' +
            'porque os dois lóbulos se cancelam exatamente. Se você quer a área geométrica total, ' +
            'integre o valor absoluto.',
          'Integrais também acumulam quantidades: se f(x) é uma taxa (litros por minuto, digamos), ' +
            'a integral sobre um intervalo de tempo é a quantidade total. Experimente f(x) = x² de ' +
            '0 a 1 (resultado: 1/3 ≈ 0,333333) — um clássico que todo estudante de cálculo conhece.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Esta é uma avaliação exata de antiderivada?',
        answer:
          'Não — a ferramenta integra numericamente com a regra de Simpson adaptativa em vez de ' +
          'encontrar uma antiderivada simbólica. Para funções bem comportadas, a aproximação é ' +
          'precisa até muitas casas decimais.',
      },
      {
        question: 'Por que minha integral é zero quando a função claramente tem área?',
        answer:
          'A integral definida é área com sinal: regiões abaixo do eixo x subtraem das regiões ' +
          'acima. Funções simétricas como sin(x) em [0, 2π] integram exatamente zero por esse ' +
          'motivo.',
      },
      {
        question: 'E se a função for indefinida em algum ponto do intervalo?',
        answer:
          'Funções com singularidades dentro de [a, b] (como 1/x cruzando x = 0) não têm ' +
          'integrais definidas ordinárias ali. A ferramenta reportará que a integral não pôde ser ' +
          'estimada em vez de retornar um número errado.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/root-finder/',
      '/learn/understanding-integrals/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Calculadora de integrais definidas',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'ex.: x^2',
      fromLabel: 'de a =',
      toLabel: 'até b =',
      fromPlaceholder: '0',
      toPlaceholder: '1',
      calculate: 'Calcular integral',
      fillError: 'Digite uma função e ambos os limites.',
      parseError: 'Não foi possível analisar f(x). Verifique a expressão.',
      badBounds: 'Os limites a e b devem ser números.',
      resultTemplate: '∫[{a}, {b}] f(x) dx ≈ {value}',
      noConvergence: 'A integral não pôde ser estimada neste intervalo.',
      loadFailedTitle: 'Falha ao carregar a ferramenta de integrais',
      panelTitle: 'Integrar',
      functionNameLabel: 'Função f(x)',
      examplePlaceholder: 'ex.: x^2 - 4',
      lowerBoundLabel: 'Limite inferior',
      upperBoundLabel: 'Limite superior',
      boundsFiniteError: 'Digite números finitos para ambos os limites.',
      estimateError: 'Não foi possível estimar a integral nesse intervalo.',
      parseFallback: 'Não foi possível analisar essa expressão.',
    },
  },
  rootFinder: {
    seo: {
      title: 'Localizador de raízes — Resolver f(x) = 0 online | Graphing Calculator',
      description:
        'Localizador de raízes online grátis: digite qualquer função f(x) e um intervalo para ' +
        'encontrar todas as suas raízes (interceptos x) usando o método de Brent, com reportagem ' +
        'honesta.',
    },
    crumbs: [
      { label: 'Início', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Localizador de raízes', href: '/calculators/root-finder/' },
    ],
    heading: 'Localizador de raízes',
    intro: [
      'Uma raiz de f é um valor x onde f(x) = 0 — os pontos onde o gráfico cruza ou toca o eixo ' +
        'x. Digite uma função e um intervalo de busca abaixo para encontrar todas as raízes ' +
        'dentro dele.',
    ],
    sections: [
      {
        heading: 'Como o cálculo funciona',
        body: [
          'A ferramenta primeiro varre o intervalo em busca de mudanças de sinal e depois refina ' +
            'cada raiz enquadrada com o método de Brent — um algoritmo robusto que combina a ' +
            'segurança da bisseção com a velocidade da secante e da interpolação quadrática ' +
            'inversa. É a mesma rotina que a calculadora gráfica usa em sua análise de raízes.',
          'Raízes onde a função apenas toca o eixo sem mudar de sinal (como x² em x = 0) são ' +
            'encontradas por uma varredura separada sensível a extremos, já que a detecção pura ' +
            'por mudança de sinal as perderia. Toda raiz reportada é verificada avaliando f no ' +
            'resultado.',
        ],
      },
      {
        heading: 'Dicas para bons resultados',
        body: [
          'Escolha um intervalo que enquadre as raízes que lhe interessam: a ferramenta só ' +
            'pesquisa onde você mandar. Para x² − 4 em [−10, 10], ela encontra −2 e 2; reduza o ' +
            'intervalo para [0, 10] e ela reporta apenas 2.',
          'Se nenhuma raiz for reportada, ou a função realmente não tem nenhuma no intervalo ' +
            '(como x² + 1 na reta real) ou as raízes estão exatamente nas extremidades do ' +
            'intervalo — ajuste levemente os limites e tente novamente.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Ela encontra raízes complexas (não reais)?',
        answer:
          'Não — esta ferramenta encontra apenas raízes reais. Funções como x² + 1 não têm ' +
          'raízes reais, então a ferramenta reporta honestamente nenhuma em qualquer intervalo ' +
          'real.',
      },
      {
        question: 'Por que ela perdeu uma raiz que vejo no gráfico?',
        answer:
          'A causa mais comum é uma raiz exatamente na extremidade do intervalo ou uma raiz que ' +
          'o passo da varredura pula em uma função que oscila muito. Estreite o intervalo ao ' +
          'redor da raiz suspeita e pesquise novamente.',
      },
      {
        question: 'Quão precisas são as raízes reportadas?',
        answer:
          'O método de Brent converge para perto da precisão da máquina; os valores reportados ' +
          'são arredondados para 6 casas decimais. Substituir uma raiz reportada de volta em f(x) ' +
          'dá um valor extremamente próximo de zero.',
      },
    ],
    related: [
      '/calculators/derivative/',
      '/calculators/integral/',
      '/math-functions/quadratic/',
      '/math-functions/sine/',
      '/graphing-calculator/',
    ],
    tool: {
      title: 'Localizador de raízes',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'ex.: x^2 - 4',
      fromLabel: 'de',
      toLabel: 'até',
      fromPlaceholder: '-10',
      toPlaceholder: '10',
      calculate: 'Encontrar raízes',
      fillError: 'Digite uma função e um intervalo de busca.',
      parseError: 'Não foi possível analisar f(x). Verifique a expressão.',
      badInterval: 'Os limites do intervalo devem ser números.',
      rootsFoundTemplate: '{count} raiz(es) encontrada(s):',
      noneFound: 'Nenhuma raiz encontrada neste intervalo.',
      loadFailedTitle: 'Falha ao carregar o localizador de raízes',
      panelTitle: 'Encontrar raízes',
      functionNameLabel: 'Função f(x)',
      intervalStartLabel: 'Início do intervalo',
      intervalEndLabel: 'Fim do intervalo',
      intervalValidError: 'Digite um intervalo válido com limite inferior < limite superior.',
      noRootsTemplate: 'Nenhuma raiz encontrada em [{a}, {b}].',
      rootsListTemplate: 'Raízes em [{a}, {b}]: {roots}',
      searchError: 'Não foi possível encontrar raízes nesse intervalo.',
      parseFallback: 'Não foi possível analisar essa expressão.',
    },
  },
};
