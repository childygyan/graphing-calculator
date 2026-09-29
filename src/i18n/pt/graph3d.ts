/**
 * Dicionário português de 3D — o texto da página `/3d/` mais as strings do
 * island Graph3D.
 */

import type { Graph3DStrings } from '../types.js';

export const graph3d: Graph3DStrings = {
  seo: {
    title: 'Traçador 3D — Traçar superfícies z = f(x, y) online | Graphing Calculator',
    description:
      'Traçador 3D online grátis: trace superfícies z = f(x, y) com arrastar para girar, zoom ' +
      'e detalhe ajustável. Experimente as predefinições paraboloide, ondulação e sela.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Traçador 3D', href: '/3d/' },
  ],
  heading: 'Traçador 3D',
  intro: [
    'Trace qualquer superfície z = f(x, y) no seu navegador — sem downloads, sem plugins. Digite uma expressão usando x e y, arraste para orbitar, role ou use pinça para zoom e aumente o detalhe da grade para refinar a malha.',
    'O traçador usa o mesmo motor de expressões da calculadora gráfica 2D, então toda função que você já conhece — sin, cos, sqrt, ^ e mais — funciona aqui também. Onde uma função é indefinida, a superfície mostra uma falha honesta em vez de um risco falso.',
  ],
  sections: [
    {
      heading: 'Como funciona a rotação 3D',
      body: [
        'Arrastar o gráfico orbita uma câmera virtual ao redor da superfície: arrastos horizontais mudam o azimute (a direção de bússola de onde você olha) e arrastos verticais mudam a elevação (a altura da câmera acima do plano xy). Rolar ou usar pinça aproxima ou afasta a câmera. Se você usa teclado, foque o gráfico e use as setas para girar e + / − para zoom.',
        'A superfície é desenhada com o algoritmo do pintor: cada quadrilátero da malha é projetado com uma câmera de perspectiva verdadeira, ordenado de trás para frente por profundidade e desenhado do mais distante ao mais próximo com sombreamento por profundidade. A geometria mais próxima, portanto, oculta o que está atrás, e é isso que dá ao gráfico sua sensação de profundidade sólida. Deixe o gráfico parado por alguns segundos e ele gira lentamente sozinho — a menos que você tenha o movimento reduzido preferido ativado, caso em que ele permanece perfeitamente parado.',
      ],
    },
    {
      heading: 'O que as predefinições mostram',
      body: [
        'Paraboloide (x²+y²) é a tigela clássica: z cresce com a distância da origem em todas as direções, com mínimo 0 em (0, 0). É o análogo 3D da parábola y = x².',
        'Ondulação (sin(√(x²+y²))) desenha ondas concêntricas irradiando da origem — o valor depende apenas da distância da origem, então todo contorno é um círculo. É uma boa forma de ver como a simetria radial aparece como superfície.',
        'Sela (x²−y²) curva para cima ao longo do eixo x e para baixo ao longo do eixo y. A origem é um ponto de sela: um mínimo em uma direção e um máximo em outra, a versão 3D de um ponto crítico do tipo inflexão.',
      ],
    },
    {
      heading: 'Renderização honesta: falhas e escala z',
      body: [
        'Pontos indefinidos viram falhas, nunca palpites. Trace 1/(x²+y²) e você verá a malha se romper ao redor da singularidade na origem, exatamente como o traçador 2D quebra uma curva em uma assíntota vertical.',
        'Superfícies muito altas são uniformemente encolhidas em z para caber na tela — o traçador informa o fator de escala (por exemplo, "eixo z autoescalado ×0,22"). A forma e os valores mínimo/máximo de z reportados permanecem fiéis à sua expressão; apenas as proporções verticais são comprimidas para visualização.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Quais expressões posso traçar em 3D?',
      answer:
        'Qualquer expressão nas variáveis x e y, usando as mesmas funções da calculadora 2D: ' +
        'potências (x^2), raízes (sqrt), funções trigonométricas (sin, cos, tan), exponenciais, ' +
        'logaritmos e constantes como pi. Qualquer outra coisa — por exemplo, uma variável z ' +
        'perdida — é rejeitada com uma mensagem de erro clara em vez de traçar silenciosamente ' +
        'a coisa errada.',
    },
    {
      question: 'Por que há buracos na minha superfície?',
      answer:
        'Buracos são falhas honestas onde sua função é indefinida: divisão por zero, raiz ' +
        'quadrada de número negativo ou logaritmo de número não positivo. O renderizador pula ' +
        'esses quadriláteros em vez de desenhar um pico enganoso através da singularidade.',
    },
    {
      question: 'O que a configuração Detalhe muda?',
      answer:
        'Ela define a resolução da malha — quantas divisões da grade são amostradas ao longo de ' +
        'cada eixo (24, 36, 48 ou 64). Mais detalhe desenha uma superfície mais suave, mas avalia ' +
        'a função mais vezes (64² = 4.225 pontos por redesenho), então comece baixo em celulares ' +
        'mais antigos.',
    },
    {
      question: 'O traçador 3D funciona no celular?',
      answer:
        'Sim. Um dedo arrasta para girar, pinça com dois dedos dá zoom e arrastar com dois ' +
        'dedos gira com sensibilidade reduzida. O layout é mobile-first e o canvas é ' +
        'dimensionado para seu contêiner com escala de proporção de pixels do dispositivo para ' +
        'linhas nítidas.',
    },
    {
      question: 'O gráfico 3D é preciso?',
      answer:
        'A superfície é amostrada da sua expressão exata em cada ponto da grade — sem estimativa ' +
        'de IA, sem suavização da matemática subjacente. Entre os pontos da grade, a malha conecta ' +
        'as amostras com quadriláteros retos, então recursos muito afiados podem parecer levemente ' +
        'facetados em detalhe baixo; aumente a configuração Detalhe para apertar a malha.',
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/learn/'],
  island: {
    surfaceLabel: 'Superfície: z = f(x, y)',
    placeholder: 'ex.: x^2 + y^2',
    plot: 'Traçar',
    emptyError: 'Digite uma expressão em x e y, por exemplo x^2+y^2.',
    genericError: 'Não foi possível traçar essa expressão.',
    parseError: 'Não foi possível analisar essa expressão.',
    unknownVariablesTemplate: 'Variável desconhecida: {names}. Superfícies 3D usam apenas x e y.',
    presetGroup: 'Superfícies predefinidas',
    presets: [
      { label: 'Paraboloide', description: 'Uma tigela abrindo para cima; mínimo 0 na origem.' },
      { label: 'Ondulação', description: 'Ondas concêntricas irradiando da origem.' },
      {
        label: 'Sela',
        description:
          'Curva para cima ao longo de x, para baixo ao longo de y — um ponto de sela na origem.',
      },
    ],
    detailGroup: 'Resolução da grade',
    detailLabel: 'Detalhe:',
    hint: 'Arraste para girar · role ou use pinça para zoom · foque o gráfico e use as setas / + / −',
    zMin: 'z mín',
    zMax: 'z máx',
    autoScaledTemplate: '(eixo z autoescalado ×{scale} para caber)',
    noFiniteGrid: 'Sem valores finitos nesta grade — tente outra expressão.',
    canvasAriaTemplate:
      'Gráfico 3D de superfície de z igual a {expression}. {stats}' +
      'Arraste para girar, role ou use pinça para zoom. Quando focado, as setas giram e mais/menos dão zoom.',
    canvasAriaEmpty: 'Traçador 3D de superfícies. Nenhuma expressão traçada ainda.',
    summaryTemplate: 'Resumo da superfície: z = {expression} em x e y de -5 a 5. {stats}',
    summaryStatsTemplate: 'z mínimo {zMin}, z máximo {zMax}, calculado em {count} pontos da grade.',
    summaryNoFinite: 'Sem valores finitos de z na grade atual.',
    summaryEmpty: 'Nenhuma superfície traçada.',
    canvasAriaStatsTemplate: 'Com x e y de -5 a 5, z varia de {zMin} a {zMax}. ',
    canvasAriaNoFiniteStats: 'Sem valores finitos na grade atual. ',
  },
};
