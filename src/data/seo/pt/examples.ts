/**
 * Exemplos de gráficos em português.
 *
 * Mesma estrutura e tipos de `src/data/seo/examples.ts` (inglês).
 * slugs, expressões, viewports e labels são idênticos; apenas os campos de
 * texto (title, description, story, insights) foram traduzidos. Caminhos
 * `related` usam o prefixo /pt/.
 */
import type { ExampleGraphData } from '../types.js';

export const EXAMPLE_GRAPHS: ExampleGraphData[] = [
  {
    slug: 'trigonometric-interference',
    title: 'Interferência Trigonométrica: sin(x) + cos(2x)',
    description:
      'Veja o que acontece quando duas ondas trigonométricas se combinam. Abra este exemplo interativo de sin(x) + cos(2x) na calculadora gráfica.',
    expressions: [
      { kind: 'cartesian', rhs: 'sin(x)', label: 'sin(x)' },
      { kind: 'cartesian', rhs: 'cos(2*x)', label: 'cos(2x)' },
      { kind: 'cartesian', rhs: 'sin(x) + cos(2*x)', label: 'sin(x) + cos(2x)' },
    ],
    story: [
      'Quando duas ondas viajam pelo mesmo meio, seus deslocamentos se somam ponto a ponto — um fenômeno chamado superposição. Graficar sin(x), cos(2x) e sua soma nos mesmos eixos torna essa adição visível: em cada x, a altura da curva combinada é exatamente a soma das alturas das duas curvas componentes.',
      'Observe como a soma não é simplesmente uma onda senoidal maior. O termo cos(2x) oscila duas vezes mais rápido, de modo que alternadamente reforça e cancela a onda sin(x). Onde ambas as ondas atingem o pico juntas, a soma alcança seus pontos mais altos; onde uma está em uma crista e a outra em um vale, elas se cancelam parcialmente. É a mesma matemática por trás dos batimentos no som e dos padrões de interferência na luz.',
    ],
    insights: [
      'A onda combinada sin(x) + cos(2x) é periódica, mas sua forma é mais complexa que a de cada componente isolada.',
      'Ligue e desligue cada expressão na calculadora para isolar a contribuição de cada onda.',
      'Tente trocar cos(2*x) por cos(3*x) e observe como uma segunda onda mais rápida muda o padrão de interferência.',
    ],
    related: [
      '/pt/math-functions/sine/',
      '/pt/math-functions/cosine/',
      '/pt/examples/damped-oscillation/',
      '/pt/learn/what-is-a-function/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'projectile-motion',
    title: 'Movimento de Projétil: Graficando uma Bola Lançada',
    description:
      'Modele a altura de uma bola lançada com uma função quadrática. Abra este exemplo e encontre sua altura máxima na calculadora.',
    expressions: [{ kind: 'cartesian', rhs: '-4.9*x^2 + 20*x + 1.5', label: 'height(x)' }],
    viewport: { xMin: -1, xMax: 5, yMin: -5, yMax: 25 },
    story: [
      'A altura de uma bola lançada para cima segue uma função quadrática do tempo: a gravidade puxa com uma aceleração constante, de modo que a altura é uma parábola que abre para baixo. Aqui, -4.9x² + 20x + 1.5 modela uma bola lançada a 20 metros por segundo de uma altura de 1,5 metro (o 4,9 vem da metade da aceleração gravitacional da Terra, 9,8 m/s²).',
      'O vértice da parábola é o momento em que a bola atinge seu ponto mais alto — o instante em que sua velocidade é zero antes de começar a cair. Como a parábola é simétrica, a bola pousa tanto tempo depois do pico quanto levou para subir até ele. As duas interseções com o eixo x marcam o lançamento (perto de x = 0) e o pouso; apenas a raiz positiva é fisicamente significativa.',
    ],
    insights: [
      'O vértice da parábola dá a altura máxima e o tempo em que ela é atingida.',
      'A interseção positiva com o eixo x é quando a bola atinge o solo — encontre-a com o localizador de raízes.',
      'O coeficiente -4,9 controla o quão “largo” é o voo; uma velocidade de lançamento maior (o termo 20x) estende o voo por mais tempo.',
    ],
    related: [
      '/pt/math-functions/quadratic/',
      '/pt/calculators/root-finder/',
      '/pt/learn/what-is-a-function/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'damped-oscillation',
    title: 'Oscilação Amortecida: e^(-x/2) · cos(3x)',
    description:
      'Explore uma onda decadente que modela molas e circuitos reais. Abra este exemplo de oscilação amortecida na calculadora gráfica interativa.',
    expressions: [
      { kind: 'cartesian', rhs: 'exp(-x/2) * cos(3*x)', label: 'e^(-x/2)·cos(3x)' },
      { kind: 'cartesian', rhs: 'exp(-x/2)', label: 'envelope e^(-x/2)' },
      { kind: 'cartesian', rhs: '-exp(-x/2)', label: 'envelope -e^(-x/2)' },
    ],
    viewport: { xMin: -1, xMax: 15, yMin: -2, yMax: 2 },
    story: [
      'Uma corda de violão dedilhada, a suspensão de um carro quicando e um circuito RLC compartilham a mesma forma matemática: uma oscilação cuja amplitude decai com o tempo. Multiplicar cos(3x) pela exponencial decrescente exp(-x/2) produz exatamente isso — cada balanço é uma fração fixa do anterior.',
      'As duas curvas de envoltória, ±exp(-x/2), são os “trilhos” entre os quais a oscilação viaja. A onda toca a envoltória superior exatamente nas cristas do cosseno e a inferior nos seus vales, e as próprias envoltórias nunca oscilam. Essa separação entre “quão rápido ela oscila” (o cosseno) e “quão rápido ela morre” (a exponencial) é por que os engenheiros analisam os dois fatores separadamente.',
    ],
    insights: [
      'A oscilação nunca cruza para fora de suas envoltórias exponenciais.',
      'Aumentar o 3 em cos(3x) empacota mais oscilações no mesmo decaimento; aumentar o 1/2 no expoente mata o movimento mais rápido.',
      'Afaste o zoom ao longo do eixo x para ver a onda se acomodar em direção ao zero — a assinatura matemática do amortecimento.',
    ],
    related: [
      '/pt/math-functions/cosine/',
      '/pt/math-functions/exponential/',
      '/pt/examples/trigonometric-interference/',
      '/pt/learn/understanding-derivatives/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'logistic-growth',
    title: 'Crescimento Logístico: A Curva em S dos Recursos Limitados',
    description:
      'Grafique a curva em S que modela populações com recursos limitados. Abra este exemplo de crescimento logístico na calculadora gráfica.',
    expressions: [{ kind: 'cartesian', rhs: '10 / (1 + 9*exp(-x))', label: 'logistic' }],
    viewport: { xMin: -5, xMax: 10, yMin: -2, yMax: 12 },
    story: [
      'O crescimento ilimitado é exponencial, mas populações reais esbarram em limites: alimento, espaço ou tamanho de mercado. A função logística 10 / (1 + 9·exp(-x)) começa parecendo exponencial, depois se curva e se estabiliza em uma capacidade de suporte — aqui, 10. O resultado é a famosa curva em S vista em colônias de bactérias, adoção de produtos e disseminação de ideias.',
      'A curva tem um ponto de inflexão onde muda de aceleração para desaceleração — o momento em que o crescimento é mais rápido, exatamente na metade do caminho até a capacidade de suporte. Antes desse ponto, a curva se dobra para cima (o crescimento se alimentando de si mesmo); depois dele, a curva se dobra para baixo à medida que o limite aperta. Encontrar esse ponto de inflexão é uma das coisas mais úteis que o cálculo pode fazer por um modelo.',
    ],
    insights: [
      'A assíntota horizontal y = 10 é a capacidade de suporte da qual a curva se aproxima, mas que nunca excede.',
      'A parte mais íngreme do S é o ponto de inflexão — onde o crescimento é mais rápido.',
      'Tente 10 / (1 + 9*exp(-2*x)) para ver como uma taxa de crescimento maior inclina o meio do S sem mudar seu teto.',
    ],
    related: [
      '/pt/math-functions/exponential/',
      '/pt/learn/asymptotes-explained/',
      '/pt/learn/understanding-derivatives/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'lissajous-curve',
    title: 'Curva de Lissajous: Arte Paramétrica a partir de Ondas Senoidais',
    description:
      'Desenhe uma figura de Lissajous com as equações paramétricas x = sin(3t), y = cos(2t). Abra este exemplo paramétrico na calculadora gráfica.',
    expressions: [
      {
        kind: 'parametric',
        xOfT: 'sin(3*t)',
        yOfT: 'cos(2*t)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'Lissajous 3:2',
      },
    ],
    viewport: { xMin: -1.5, xMax: 1.5, yMin: -1.5, yMax: 1.5 },
    story: [
      'Antes de os osciloscópios terem telas digitais, os físicos estudavam razões de frequência alimentando duas ondas senoidais nas placas horizontal e vertical de um tubo de raios catódicos. Os padrões luminosos que traçavam — figuras de Lissajous — revelam a razão das duas frequências de relance. Aqui, x = sin(3t) oscila três vezes para cada duas oscilações de y = cos(2t), tecendo um nó fechado e simétrico.',
      'O que torna esta curva impossível como um gráfico regular y = f(x) é que ela falha dramaticamente no teste da reta vertical: um único x pode corresponder a muitos valores de y à medida que a curva se dobra sobre si mesma. As equações paramétricas contornam essa limitação dando a x e y suas próprias fórmulas em um parâmetro compartilhado t — a mesma ideia que anima tudo, de ponteiros de relógio a órbitas planetárias.',
    ],
    insights: [
      'A razão de frequências 3:2 determina o padrão: conte os lóbulos tocando cada lado do quadrado delimitador.',
      'Mude sin(3*t) para sin(4*t) para uma figura 4:2 e compare a simetria.',
      'Como t percorre 2π completos, a curva se fecha perfeitamente — encurte o intervalo de t e veja-a virar um arco aberto.',
    ],
    related: [
      '/pt/math-functions/sine/',
      '/pt/math-functions/cosine/',
      '/pt/learn/parametric-vs-cartesian/',
      '/pt/examples/polar-rose/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'polar-rose',
    title: 'Rosa Polar: r = 2·cos(3θ)',
    description:
      'Plote uma rosa de três pétalas com a equação polar r = 2cos(3θ). Abra este exemplo de gráfico polar na calculadora interativa.',
    expressions: [
      {
        kind: 'polar',
        rOfTheta: '2*cos(3*theta)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'r = 2cos(3θ)',
      },
    ],
    viewport: { xMin: -2.5, xMax: 2.5, yMin: -2.5, yMax: 2.5 },
    story: [
      'Em coordenadas polares, cada ponto é descrito por uma distância r da origem e um ângulo θ, e a equação r = 2·cos(3θ) desenha uma flor com exatamente três pétalas. À medida que θ varre a volta, r oscila entre -2 e 2 três vezes; valores negativos de r se plotam na direção oposta, que é o que dobra as pétalas em seu arranjo simétrico.',
      'O número de pétalas segue uma regra simples: para r = a·cos(nθ) com n ímpar, a rosa tem exatamente n pétalas. Tente valores pares de n na calculadora e você obterá o dobro — o padrão dobra porque a curva precisa de uma revolução extra completa para se fechar. Poucas equações mostram o poder das coordenadas polares com tanta elegância quanto a rosa.',
    ],
    insights: [
      'Um coeficiente ímpar (3) dá 3 pétalas; tente 2*cos(4*theta) para ver o caso par produzir 8.',
      'A amplitude 2 define o comprimento da pétala — o ponto mais distante da origem.',
      'Cada pétala é traçada exatamente uma vez à medida que θ vai de 0 a π; a segunda metade as retraça.',
    ],
    related: [
      '/pt/math-functions/cosine/',
      '/pt/learn/parametric-vs-cartesian/',
      '/pt/examples/lissajous-curve/',
      '/pt/graphing-calculator/',
    ],
  },
];

export function getExampleBySlug(slug: string): ExampleGraphData | undefined {
  return EXAMPLE_GRAPHS.find((example) => example.slug === slug);
}
