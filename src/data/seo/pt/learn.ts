/**
 * Artigos de aprendizado em português para o hub /learn/.
 *
 * Mesma estrutura e tipos de `src/data/seo/learn.ts` (inglês).
 * slugs, tryExpressions e reviewedOn são idênticos; apenas os campos de
 * texto (title, description, sections, keyTakeaways, faqs) foram traduzidos.
 * Caminhos `related` usam o prefixo /pt/.
 */

import type { LearnArticle } from '../types.js';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'what-is-a-function',
    reviewedOn: '2026-09-29',
    title: 'O que é uma Função? Domínio, Imagem e Notação',
    description:
      'Aprenda o que uma função realmente é: entradas, saídas, domínio, imagem e notação f(x) — com exemplos concretos para graficar você mesmo.',
    sections: [
      {
        heading: 'Uma função é uma regra com uma promessa',
        body: [
          'Uma função é uma regra que toma cada valor de entrada e atribui a ele exatamente um valor de saída. Essa palavra “exatamente” faz todo o trabalho: uma função nunca pode entregar duas saídas diferentes para a mesma entrada. Se você fornece x = 2, a função devolve uma resposta, e se você fornecer 2 de novo amanhã, obtém a mesma resposta. Os matemáticos chamam esse requisito de “bem definido”, e é o que separa as funções de tipos mais frouxos de relações entre quantidades.',
          'Considere f(x) = x^2. A entrada 3 produz a saída 9, e a entrada −3 também produz 9. Isso está bem — duas entradas diferentes podem compartilhar uma saída. O que não estaria bem é se a regra atribuísse 9 e 10 à entrada 3. Então a regra não seria uma função.',
        ],
      },
      {
        heading: 'A notação f(x) e o que ela significa',
        body: [
          'A expressão f(x) se lê “f de x” e nomeia a saída da função f quando a entrada é x. A letra f é apenas um nome; você poderia igualmente usar g, h ou custoDe. Escrever f(x) = 2*x + 1 diz: a função f calcula sua saída dobrando sua entrada e somando um. Então f(4) = 9, f(−1) = −1, e assim por diante.',
          'Essa notação se torna poderosa quando você compara funções. Se g(x) = x^2, então f(g(2)) = f(4) = 9 — você alimentou a saída de g em f. Encadear funções assim se chama composição, e a notação facilita acompanhar exatamente qual regra é aplicada a qual valor. Ela também permite falar sobre a função inteira de uma vez (“f é crescente”) em vez de apenas sobre valores individuais.',
        ],
      },
      {
        heading: 'Domínio: o conjunto de entradas permitidas',
        body: [
          'Toda função tem um domínio: o conjunto de valores de entrada que ela aceita. Para f(x) = x^2, qualquer número real é permitido, então o domínio é todos os números reais. Mas g(x) = sqrt(x) recusa entradas negativas — não há número real cujo quadrado seja negativo — então seu domínio é x ≥ 0.',
          'Às vezes o domínio é restrito pela própria regra, e às vezes pela situação que a função modela. A função h(x) = 1/x exclui x = 0, porque divisão por zero é indefinida. E se uma função modela o preço de n maçãs, seu domínio natural pode ser os números de contagem 1, 2, 3, …, mesmo que a fórmula 2.5*n aceite tranquilamente entradas fracionárias. Ao trabalhar com uma função, saiba sempre quais entradas ela pode realmente receber.',
        ],
      },
      {
        heading: 'Imagem: o conjunto de saídas produzidas',
        body: [
          'A imagem é o conjunto de valores de saída que a função realmente produz à medida que a entrada percorre o domínio. Para f(x) = x^2, elevar ao quadrado nunca dá um número negativo, e todo número não negativo aparece como algum quadrado (o quadrado de sua raiz quadrada). Assim, a imagem é todos os números y ≥ 0.',
          'Domínio e imagem respondem a perguntas diferentes: o domínio pergunta “o que posso colocar?” e a imagem pergunta “o que pode sair?” Para f(x) = 2*x + 1, ambos são todos os números reais, porque dobrar e deslocar pode alcançar qualquer valor real. Para f(x) = sin(x), o domínio é todos os números reais, mas a imagem é apenas [−1, 1], já que a onda senoidal oscila entre −1 e 1 para sempre. Notar a imagem ajuda a ler um gráfico: é exatamente a extensão vertical da curva.',
        ],
      },
      {
        heading: 'Lendo tudo isso a partir de um gráfico',
        body: [
          'Um gráfico mostra uma função diretamente: cada ponto (x, y) na curva diz f(x) = y. O domínio é a sombra da curva no eixo x — a extensão horizontal dos pontos que realmente aparecem. A imagem é a sombra no eixo y. Se a curva quebra ou para, essas quebras aparecem como lacunas no domínio.',
          'Há também um teste rápido: o teste da reta vertical. Se toda reta vertical que você desenhar cruzar a curva no máximo uma vez, a curva representa uma função — porque cada x tem no máximo um y. Um círculo falha neste teste (uma reta vertical pelo seu centro o encontra duas vezes), e é por isso que um círculo completo não é o gráfico de uma única função. Tente digitar as expressões abaixo na calculadora gráfica, ajuste a janela de visualização e leia o domínio e a imagem de cada uma você mesmo.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sqrt(x)', '1/x', 'sin(x)'],
    keyTakeaways: [
      'Uma função atribui exatamente uma saída a cada entrada — essa promessa de saída única é a propriedade definidora.',
      'f(x) é “f de x”: a saída de f na entrada x. A composição f(g(x)) encadeia duas regras.',
      'O domínio é o conjunto de entradas permitidas; divisão por zero e raízes quadradas de negativos são as restrições de domínio clássicas.',
      'A imagem é o conjunto de saídas que a função realmente produz — a extensão vertical do seu gráfico.',
      'O teste da reta vertical decide se uma curva é uma função: qualquer reta vertical pode cruzá-la no máximo uma vez.',
    ],
    faqs: [
      {
        q: 'Um círculo é uma função?',
        a: 'Não — um círculo completo não é o gráfico de uma função, porque algumas retas verticais o cruzam duas vezes (falhando no teste da reta vertical). No entanto, a metade superior de um círculo é: y = sqrt(r^2 − x^2) atribui a cada x exatamente um y, e o mesmo vale para a metade inferior y = −sqrt(r^2 − x^2).',
      },
      {
        q: 'Qual é a diferença entre domínio e imagem?',
        a: 'O domínio é o conjunto de entradas que uma função aceita; a imagem é o conjunto de saídas que ela realmente produz. Para sin(x), o domínio é todos os números reais, enquanto a imagem é [−1, 1].',
      },
      {
        q: 'Duas entradas diferentes podem dar a mesma saída?',
        a: 'Sim. Uma função deve dar a cada entrada exatamente uma saída, mas entradas diferentes podem compartilhar uma saída — por exemplo, f(x) = x^2 dá f(3) = f(−3) = 9.',
      },
    ],
    related: [
      '/pt/learn/understanding-derivatives/',
      '/pt/math-functions/sine/',
      '/pt/math-functions/quadratic/',
      '/pt/math-functions/square-root/',
      '/pt/math-functions/reciprocal/',
      '/pt/examples/logistic-growth/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-derivatives',
    reviewedOn: '2026-09-29',
    title: 'Derivadas: Entendendo Taxa de Variação e Inclinação',
    description:
      'O que uma derivada mede, como ela dá a inclinação de uma curva e como ler crescimento, decrescimento e pontos extremos a partir dela.',
    sections: [
      {
        heading: 'A derivada mede a rapidez com que as coisas mudam',
        body: [
          'A derivada de uma função é uma nova função que informa, em cada ponto, quão rápido a função original está mudando. Se f(x) descreve uma quantidade — posição, preço, população — então f′(x), a derivada em x, é a taxa à qual essa quantidade está mudando quando a entrada é x. Uma derivada positiva significa que a quantidade está crescendo; uma negativa significa que está diminuindo; zero significa que está momentaneamente plana.',
          'Concretamente, f′(x) é a inclinação da reta tangente à curva em x. Aproxime o zoom o suficiente em quase qualquer curva suave e ela parecerá uma reta — a reta tangente — e sua inclinação é a derivada. É por isso que a derivada tem um significado geométrico e um significado físico ao mesmo tempo: inclinação no gráfico, taxa de variação no mundo.',
        ],
      },
      {
        heading: 'Taxa de variação média vs. instantânea',
        body: [
          'Em um intervalo, a taxa de variação média de f de x = a até x = b é (f(b) − f(a)) / (b − a) — subida sobre deslocamento da reta secante entre os dois pontos. É exatamente assim que você calcula a velocidade média: distância percorrida dividida pelo tempo decorrido. Mas isso nada diz sobre o que aconteceu entre a e b.',
          'A taxa de variação instantânea é o que você obtém quando o intervalo encolhe até nada: o limite de (f(a+h) − f(a)) / h quando h se aproxima de zero. Esse limite, quando existe, é f′(a). Na prática, a calculadora calcula derivadas numericamente a partir dessa ideia, e você pode ver a reta secante se inclinar até virar a reta tangente à medida que o intervalo encolhe. A taxa instantânea é o que o velocímetro mostra; a taxa média é o que o computador de bordo mostra.',
        ],
      },
      {
        heading: 'Lendo o comportamento de crescimento e decrescimento',
        body: [
          'O sinal da derivada diz o comportamento da função. Onde f′(x) > 0, a função é crescente — o gráfico sobe da esquerda para a direita. Onde f′(x) < 0, é decrescente. Onde f′(x) = 0, a tangente é horizontal, e a função está momentaneamente nem subindo nem descendo.',
          'Tome f(x) = x^2. Sua derivada é f′(x) = 2*x, que é negativa para x < 0 e positiva para x > 0. De fato, a parábola desce em direção à origem vindo da esquerda e sobe afastando-se dela à direita. Para f(x) = sin(x), a derivada é cos(x): a onda senoidal sobe onde o cosseno é positivo e desce onde é negativo, com picos planos exatamente onde cos(x) = 0.',
        ],
      },
      {
        heading: 'Pontos críticos e extremos locais',
        body: [
          'Pontos onde f′(x) = 0 ou onde a derivada não existe são chamados de pontos críticos, e são os candidatos a máximos e mínimos locais — os picos e vales da curva. Em x = 0, f(x) = x^2 tem derivada 2*x = 0, e de fato (0, 0) é o fundo da parábola: a função cai, se achata e depois sobe.',
          'Mas uma derivada zero não garante um pico ou vale. Para f(x) = x^3, a derivada é 3*x^2, que é zero em x = 0 — mas a função passa direto, achatando-se por um instante em um ponto de inflexão e continuando a subir. Para classificar um ponto crítico, verifique se a derivada muda de sinal ao seu redor: de negativo para positivo é um mínimo local, de positivo para negativo é um máximo local, sem mudança significa nenhum dos dois.',
        ],
      },
      {
        heading: 'A segunda derivada e a concavidade',
        body: [
          'Diferenciar duas vezes dá f′′(x), a segunda derivada — a taxa de variação da taxa de variação. Geometricamente, ela descreve a concavidade: onde f′′(x) > 0, a curva se dobra para cima como uma xícara (côncava para cima), e onde f′′(x) < 0, ela se dobra para baixo como uma careta (côncava para baixo).',
          'Para f(x) = x^3, a segunda derivada é f′′(x) = 6*x: negativa à esquerda da origem, positiva à direita. A cúbica se dobra para baixo à esquerda, para cima à direita, e troca de concavidade em x = 0 — essa troca é um ponto de inflexão. A concavidade completa o retrato da forma de uma curva depois que a primeira derivada já disse onde ela sobe e desce.',
        ],
      },
    ],
    tryExpressions: ['x^3 - 3*x', 'sin(x)', 'exp(x)', 'x^2 * sin(x)'],
    keyTakeaways: [
      'A derivada f′(x) é a taxa de variação instantânea de f em x — a inclinação da reta tangente.',
      'Derivada positiva significa crescente, negativa significa decrescente, zero significa momentaneamente plana.',
      'Pontos críticos (onde f′ = 0 ou é indefinida) são os candidatos a máximos e mínimos locais; a mudança de sinal de f′ os classifica.',
      'Uma derivada zero nem sempre marca um extremo — x^3 tem f′(0) = 0, mas continua subindo através de um ponto de inflexão.',
      'A segunda derivada f′′ descreve a concavidade: xícara para cima onde positiva, careta para baixo onde negativa.',
    ],
    faqs: [
      {
        q: 'Qual é a diferença entre taxa de variação média e instantânea?',
        a: 'A taxa média em [a, b] é (f(b) − f(a)) / (b − a), a inclinação da reta secante entre os pontos extremos. A taxa instantânea em a é o limite desse quociente quando o intervalo encolhe até zero — a inclinação da reta tangente, ou seja, f′(a).',
      },
      {
        q: 'Se a derivada é zero em um ponto, é sempre um máximo ou mínimo?',
        a: 'Não. Uma derivada zero apenas torna o ponto um ponto crítico. Para f(x) = x^3, f′(0) = 0, mas a função continua crescendo através de x = 0 (um ponto de inflexão). Verifique se f′ muda de sinal de cada lado para classificar o ponto.',
      },
      {
        q: 'O que a segunda derivada diz?',
        a: 'Ela descreve a concavidade: onde f′′(x) > 0, a curva se dobra para cima (côncava para cima), e onde f′′(x) < 0, ela se dobra para baixo (côncava para baixo). Pontos onde a concavidade troca são pontos de inflexão.',
      },
    ],
    related: [
      '/pt/learn/what-is-a-function/',
      '/pt/learn/understanding-integrals/',
      '/pt/math-functions/quadratic/',
      '/pt/math-functions/cubic/',
      '/pt/math-functions/sine/',
      '/pt/math-functions/exponential/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-integrals',
    reviewedOn: '2026-09-29',
    title: 'Integrais e a Área sob a Curva',
    description:
      'Aprenda o que integrais definidas significam como área com sinal sob a curva, como o Teorema Fundamental liga integrais a derivadas e quando usá-las.',
    sections: [
      {
        heading: 'Uma integral mede quantidade acumulada',
        body: [
          'A integral definida ∫ₐᵇ f(x) dx mede a acumulação total de f entre a e b. Se f(x) é uma taxa — velocidade, chuva por hora, reais por item — então a integral dessa taxa em um intervalo é o total: distância total, chuva total, custo total. A integração soma infinitas partes infinitesimais, dx, cada uma ponderada por f(x).',
          'A imagem mais direta é geométrica: quando f(x) é positiva em [a, b], a integral é igual à área delimitada pela curva, pelo eixo x e pelas retas verticais x = a e x = b. Toda aplicação de integrais é alguma versão dessa ideia — área primeiro, acumulação em geral.',
        ],
      },
      {
        heading: 'Área com sinal: por que a área pode ser negativa',
        body: [
          'Quando a curva mergulha abaixo do eixo x, a integral conta essa região como área negativa. A integral é área com sinal: regiões acima do eixo somam, regiões abaixo subtraem. Assim, ∫₀^{2π} sin(x) dx = 0, porque a corcova positiva de 0 a π e o vale negativo de π a 2π têm áreas exatamente iguais e se cancelam.',
          'Esse cancelamento é um recurso, não um defeito: reflete física genuína. Se a velocidade é positiva na primeira metade de uma viagem e negativa na segunda, a integral dá o deslocamento (variação líquida da posição), que pode ser zero mesmo que o odômetro tenha acumulado distância. Se você quer a área total independentemente do sinal, integre |f(x)| ou integre as partes positiva e negativa separadamente.',
        ],
      },
      {
        heading: 'O Teorema Fundamental do Cálculo',
        body: [
          'O Teorema Fundamental do Cálculo liga integrais e derivadas como inversas. Se F é uma primitiva de f — ou seja, F′(x) = f(x) — então ∫ₐᵇ f(x) dx = F(b) − F(a). Em vez de aproximar uma área com milhares de retângulos, você avalia uma única função em dois pontos e subtrai.',
          'É por isso que as integrais são calculadas simbolicamente onde possível: a primitiva de 2*x é x^2, então ∫₀³ 2*x dx = 3² − 0² = 9, e você pode verificar que isso é igual à área de um triângulo com base 3 e altura 6. O teorema transforma o problema difícil (somar infinitas fatias) no problema fácil (avaliar uma função duas vezes).',
        ],
      },
      {
        heading: 'Área entre duas curvas',
        body: [
          'As integrais também medem a área presa entre duas curvas. Se g(x) ≤ h(x) em [a, b], a região entre elas tem área ∫ₐᵇ (h(x) − g(x)) dx. Você subtrai a curva inferior da superior, transformando a lacuna em um problema comum de área sob a curva.',
          'Por exemplo, entre x = 0 e x = 1, a reta y = x fica acima da curva y = x². A área entre elas é ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6. Um erro comum é esquecer que as curvas podem se cruzar: onde elas trocam de papéis, divida a integral nos pontos de cruzamento e integre |h(x) − g(x)|, ou você deixará a área com sinal cancelar regiões que deveriam somar.',
        ],
      },
      {
        heading: 'Testando integrais na calculadora',
        body: [
          'Escolha qualquer expressão abaixo e use as ferramentas de integral da calculadora para sombrear a área sob a curva entre dois limites. Observe como a região sombreada troca de sinal quando a curva cruza o eixo — a ferramenta informa a área com sinal, de modo que uma onda simétrica como sin(x) em um período completo resulta em zero.',
          'Depois experimente a relação com a primitiva: plote f(x) e sua acumulação derivada da integral juntas. Onde f é positiva, a curva acumulada sobe; onde f é negativa, ela desce; onde f é zero, ela se nivela. Essa conexão — a derivada da acumulação é a função original — é o Teorema Fundamental em forma visível.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'abs(x - 2)', 'exp(-x^2)'],
    keyTakeaways: [
      'A integral definida ∫ₐᵇ f(x) dx mede quantidade acumulada — geometricamente, a área sob a curva quando f é positiva.',
      'As integrais calculam área com sinal: regiões abaixo do eixo x contam como negativas e podem cancelar regiões acima.',
      'O Teorema Fundamental do Cálculo: ∫ₐᵇ f(x) dx = F(b) − F(a), onde F′ = f — diferenciação e integração se desfazem.',
      'A área entre duas curvas é ∫ₐᵇ (superior − inferior) dx; divida a integral onde quer que as curvas se cruzem.',
      'Deslocamento vs. distância: a integral da velocidade dá a variação líquida; integrar o valor absoluto dá a distância total percorrida.',
    ],
    faqs: [
      {
        q: 'Uma integral definida pode ser negativa?',
        a: 'Sim. A integral mede área com sinal, de modo que porções da curva abaixo do eixo x contribuem com área negativa. Por exemplo, ∫₀^{2π} sin(x) dx = 0 porque as corcovas positiva e negativa se cancelam exatamente.',
      },
      {
        q: 'O que é o Teorema Fundamental do Cálculo?',
        a: 'Ele afirma que, se F′(x) = f(x), então ∫ₐᵇ f(x) dx = F(b) − F(a). Em palavras: para integrar f, encontre uma função cuja derivada seja f, avalie-a nos extremos e subtraia.',
      },
      {
        q: 'Como encontro a área entre duas curvas?',
        a: 'Integre a diferença superior − inferior no intervalo: ∫ₐᵇ (h(x) − g(x)) dx, onde h é a curva superior. Se as curvas se cruzam dentro de [a, b], divida a integral em cada cruzamento para que nada se cancele incorretamente.',
      },
    ],
    related: [
      '/pt/learn/understanding-derivatives/',
      '/pt/learn/what-is-a-function/',
      '/pt/math-functions/sine/',
      '/pt/math-functions/quadratic/',
      '/pt/math-functions/absolute-value/',
      '/pt/examples/damped-oscillation/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'asymptotes-explained',
    reviewedOn: '2026-09-29',
    title: 'Assíntotas: Verticais, Horizontais e Oblíquas',
    description:
      'Entenda as assíntotas — retas das quais um gráfico se aproxima sem tocar. Verticais, horizontais e oblíquas com exemplos claros.',
    sections: [
      {
        heading: 'O que uma assíntota realmente é',
        body: [
          'Uma assíntota é uma reta da qual uma curva se aproxima arbitrariamente à medida que a entrada vai para algum extremo — para o infinito, ou para um ponto onde a função explode — sem nunca tocar a reta (no sentido do limite). A ideia-chave é aproximação, não contato: a curva pode chegar tão perto da reta quanto você quiser, desde que você vá longe o suficiente.',
          'As assíntotas vêm em três sabores. Assíntotas verticais são retas verticais x = a onde a função cresce sem limite perto de a. Assíntotas horizontais são retas horizontais y = L para as quais a função se acomoda quando x → ±∞. Assíntotas oblíquas (inclinadas) são retas diagonais que a função acompanha quando cresce aproximadamente de forma linear no infinito. Cada tipo é diagnosticado de forma diferente, e cada um diz algo sobre o comportamento de longo prazo ou próximo a singularidades da função.',
        ],
      },
      {
        heading: 'Assíntotas verticais: onde a função explode',
        body: [
          'Uma assíntota vertical x = a ocorre onde os valores da função disparam em direção a +∞ ou −∞ à medida que x se aproxima de a. O exemplo clássico é f(x) = 1/x em x = 0: coloque 0,1 e obtenha 10, coloque 0,001 e obtenha 1000, e não há valor finito em exatamente 0 porque divisão por zero é indefinida.',
          'Para encontrá-las em uma função racional, fatore o denominador: cada fator (x − a) que não se cancela com o numerador normalmente dá uma assíntota vertical em x = a. Mas o cancelamento importa — em g(x) = (x^2 − 1)/(x − 1), o fator (x − 1) se cancela, então x = 1 é um buraco (uma descontinuidade removível), não uma assíntota. Quando você grafica f(x) = 1/x e dá zoom em direção a x = 0, os dois ramos se separam verticalmente, e a amostragem adaptativa da calculadora precisa evitar desenhar um traço enganoso através da lacuna.',
        ],
      },
      {
        heading: 'Assíntotas horizontais: o comportamento final',
        body: [
          'Uma assíntota horizontal descreve para onde a função tende à medida que x cresce em qualquer direção. Se f(x) se aproxima de um valor finito L quando x → ∞ (ou x → −∞), então y = L é uma assíntota horizontal. Para f(x) = 1/x, os valores encolhem em direção a 0 à medida que x cresce — então y = 0 é a assíntota horizontal.',
          'Para uma função racional p(x)/q(x), compare os graus: se o grau do denominador for maior, a assíntota horizontal é y = 0; se os graus forem iguais, é y = (coeficiente líder de p) / (coeficiente líder de q); se o grau do numerador for maior, não há assíntota horizontal — a função cresce sem limite, e possivelmente segue uma oblíqua. Note que uma curva pode cruzar sua assíntota horizontal para x moderado; a assíntota só restringe as extremidades distantes.',
        ],
      },
      {
        heading: 'Assíntotas oblíquas: acompanhando uma reta diagonal',
        body: [
          'Quando o numerador de uma função racional é exatamente um grau maior que o denominador, a função cresce aproximadamente como uma reta no infinito, e essa reta é a assíntota oblíqua (inclinada). Tome f(x) = (x^2 + 1)/x: a divisão polinomial dá x + 1/x, e quando x → ±∞, o termo 1/x desaparece, restando y = x como a assíntota que a curva abraça.',
          'Você pode verificar isso visualmente plotando a função e a reta y = x juntas e afastando bastante o zoom: a lacuna entre elas encolhe até nada. Assíntotas oblíquas são mais raras na prática que os outros dois tipos, mas aparecem sempre que um quociente cresce linearmente — por exemplo, em certos modelos econômicos com custo por unidade mais um custo fixo dividido pela quantidade.',
        ],
      },
      {
        heading: 'Por que as assíntotas importam ao graficar',
        body: [
          'As assíntotas são o esqueleto de um gráfico: elas dizem para onde a curva precisa ir perto de seus pontos problemáticos e nos extremos, antes de você calcular um único ponto intermediário. Esboçar as assíntotas primeiro — retas verticais nos pontos de explosão, o guia horizontal ou oblíquo no infinito — deixa você preencher segmentos bem comportados entre elas.',
          'Elas também alertam sobre restrições de domínio (assíntotas verticais marcam entradas excluídas) e sobre renderizações enganosas. Um plotador ingênuo pode desenhar uma reta quase vertical através de uma assíntota vertical, conectando os dois ramos como se a função passasse pela lacuna. Digite 1/x na calculadora, dê zoom em x = 0 e confirme que você vê dois ramos separados com uma lacuna genuína — essa lacuna é a assíntota tornada visível.',
        ],
      },
    ],
    tryExpressions: ['1/x', '(x^2 + 1)/x', '(2*x^2 + 3)/(x^2 - 1)', 'tan(x)'],
    keyTakeaways: [
      'Uma assíntota é uma reta da qual uma curva se aproxima arbitrariamente — vertical (x = a), horizontal (y = L) ou oblíqua (diagonal).',
      'Assíntotas verticais ocorrem onde a função explode para ±∞; em funções racionais, procure zeros não cancelados do denominador.',
      'Assíntotas horizontais descrevem o comportamento final: compare os graus do numerador e do denominador em funções racionais.',
      'Quando o numerador é um grau maior que o denominador, o gráfico acompanha uma assíntota oblíqua como y = x.',
      'Uma curva pode cruzar uma assíntota horizontal em valores moderados de x — a assíntota só governa as extremidades distantes.',
    ],
    faqs: [
      {
        q: 'Qual é a diferença entre uma assíntota vertical e um buraco?',
        a: 'Uma assíntota vertical x = a é onde a função cresce sem limite perto de a (por exemplo, 1/x em x = 0). Um buraco (descontinuidade removível) é onde um fator cancelado tornou a função indefinida em um único ponto, mas os valores próximos permanecem finitos — por exemplo, (x^2 − 1)/(x − 1) se simplifica para x + 1 com um buraco em x = 1.',
      },
      {
        q: 'Um gráfico pode cruzar sua assíntota?',
        a: 'Pode cruzar uma assíntota horizontal para x finito — por exemplo, f(x) = sin(x)/x cruza y = 0 repetidamente, mas y = 0 continua sendo sua assíntota horizontal, já que f(x) → 0 quando x → ±∞. Assíntotas verticais, no sentido de cruzamento, não são cruzadas no próprio ponto de explosão, já que a função é indefinida ali.',
      },
      {
        q: 'Como encontro a assíntota horizontal de uma função racional?',
        a: 'Compare os graus: se o grau do denominador for maior, a assíntota é y = 0; se os graus forem iguais, é y = (coeficiente líder do numerador)/(coeficiente líder do denominador); se o grau do numerador for exatamente um maior, há uma assíntota oblíqua (encontrada por divisão polinomial).',
      },
    ],
    related: [
      '/pt/learn/what-is-a-function/',
      '/pt/math-functions/reciprocal/',
      '/pt/math-functions/tangent/',
      '/pt/math-functions/natural-logarithm/',
      '/pt/examples/logistic-growth/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'graphing-inequalities',
    reviewedOn: '2026-09-29',
    title: 'Graficando Inequações em Duas Variáveis',
    description:
      'Como graficar inequações como y > x^2: curvas de fronteira, linhas tracejadas vs. contínuas, sombreamento e pontos de teste — passo a passo.',
    sections: [
      {
        heading: 'De equações para inequações',
        body: [
          'A equação y = x^2 desenha uma única curva: a parábola. A inequação y > x^2 pede algo maior — todo ponto (x, y) cuja coordenada y está acima da parábola. Em vez de uma curva, a solução é uma região inteira: a área infinita varrida acima da curva. Graficar uma inequação significa desenhar a fronteira e sombrear o lado que a satisfaz.',
          'Essa mudança de curva para região é todo o passo conceitual. Uma equação em duas variáveis normalmente descreve uma curva unidimensional; uma inequação descreve uma região bidimensional cuja borda é essa curva. Cada ponto que você testa ou pertence à região ou não, e a curva de fronteira é onde a igualdade vale.',
        ],
      },
      {
        heading: 'Curvas de fronteira: tracejadas vs. contínuas',
        body: [
          'O primeiro passo é graficar a fronteira — a equação que você obtém ao trocar o sinal de inequação por =. Para y ≥ x^2, a fronteira é a parábola y = x^2, e ela é desenhada contínua porque seus pontos satisfazem a inequação: a fronteira está incluída na solução.',
          'Para inequações estritas (< ou >), a fronteira é desenhada tracejada, porque pontos na própria curva não satisfazem a inequação. y > x^2 e y ≥ x^2 diferem apenas na própria parábola, mas essa diferença de um ponto de espessura importa em problemas de otimização, onde um ótimo situado exatamente em uma fronteira estrita é inatingível. A calculadora segue essa convenção: tracejada para estrita, contínua para não estrita.',
        ],
      },
      {
        heading: 'Sombreamento e o método do ponto de teste',
        body: [
          'Uma vez desenhada a fronteira, ela divide o plano em regiões (geralmente duas). Escolha qualquer ponto fora da fronteira — um ponto de teste — coloque-o na inequação e veja se a afirmação é verdadeira. Se for, sombreie toda a região desse ponto; se não, sombreie o outro lado.',
          'Para y > x^2, a origem (0, 0) é um ponto de teste conveniente — espera, ela está na fronteira. Escolha (0, 1): 1 > 0 é verdadeiro, então sombreie a região acima da parábola contendo (0, 1). Um hábito seguro: sempre verifique se seu ponto de teste não está na fronteira antes de confiar no resultado, e confira com um segundo ponto na região sombreada se a inequação for complicada.',
        ],
      },
      {
        heading: 'Sistemas de inequações e regiões viáveis',
        body: [
          'Problemas reais geralmente envolvem várias inequações de uma vez — um sistema. A solução é o conjunto de pontos que satisfazem todas elas simultaneamente: a interseção das regiões sombreadas individuais. Cada nova inequação só pode encolher a solução, nunca aumentá-la, porque os pontos agora precisam passar em mais um teste.',
          'Este é o coração geométrico da programação linear: restrições como x ≥ 0, y ≥ 0 e 2*x + 3*y ≤ 12 esculpem uma região viável poligonal, e o ótimo de um objetivo linear sempre fica em um de seus cantos. Sombreie cada inequação por vez, mantenha apenas a sobreposição, e a região viável que resta é onde todas as restrições valem ao mesmo tempo. Tente y ≤ x^2 e y ≥ −x juntas para ver uma interseção em forma de lente delimitada por duas curvas.',
        ],
      },
      {
        heading: 'Lendo um gráfico sombreado',
        body: [
          'Um gráfico de inequação pronto comunica três coisas: a fronteira (com seu significado tracejado/contínuo), a região sombreada da solução e, implicitamente, tudo fora do sombreamento que falha. Ao ler tal gráfico, primeiro identifique a curva de fronteira e sua estritude, depois confirme que o sombreamento corresponde a um rápido ponto de teste mental.',
          'Leituras erradas comuns: esquecer que o lado não sombreado está excluído (não “desconhecido”), confundir uma fronteira tracejada com uma incluída e, em sistemas, sombrear cada inequação sem nunca tomar a interseção. Digite as expressões abaixo, alterne entre formas estritas e não estritas e observe como o sombreamento e o estilo da fronteira mudam enquanto o significado da região muda exatamente na curva de fronteira.',
        ],
      },
    ],
    tryExpressions: ['x^2', '2 - x', 'abs(x)', 'sin(x)'],
    keyTakeaways: [
      'Uma inequação em duas variáveis descreve uma região do plano; sua borda é a curva de fronteira onde a igualdade vale.',
      'Desenhe a fronteira tracejada para inequações estritas (<, >) e contínua quando a fronteira está incluída (≤, ≥).',
      'Use um ponto de teste fora da fronteira para decidir qual lado sombrear; confira com um segundo ponto em casos complexos.',
      'A solução de um sistema de inequações é a interseção das regiões individuais — cada restrição só pode encolhê-la.',
      'Na programação linear, os pontos de canto da região viável são onde o ótimo de um objetivo linear precisa ocorrer.',
    ],
    faqs: [
      {
        q: 'Quando uso uma linha tracejada em vez de uma contínua?',
        a: 'Use uma fronteira tracejada para inequações estritas (< ou >), porque pontos na fronteira não satisfazem a inequação. Use uma fronteira contínua para ≤ ou ≥, onde os pontos da fronteira estão incluídos na solução.',
      },
      {
        q: 'Como sei qual lado da fronteira sombrear?',
        a: 'Escolha um ponto de teste que não esteja na fronteira, substitua-o na inequação e sombreie a região que contém o ponto se a afirmação for verdadeira — caso contrário, sombreie a outra região.',
      },
      {
        q: 'O que é a região viável em um sistema de inequações?',
        a: 'É a interseção de todas as regiões de solução individuais: o conjunto de pontos que satisfazem cada inequação ao mesmo tempo. Na programação linear, o ótimo de um objetivo linear sobre uma região viável poligonal sempre ocorre em um canto (vértice) dessa região.',
      },
    ],
    related: [
      '/pt/learn/what-is-a-function/',
      '/pt/math-functions/quadratic/',
      '/pt/math-functions/absolute-value/',
      '/pt/math-functions/square-root/',
      '/pt/examples/projectile-motion/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'parametric-vs-cartesian',
    reviewedOn: '2026-09-29',
    title: 'Equações Paramétricas vs. Cartesianas',
    description:
      'Equações cartesianas y = f(x) vs. paramétricas x(t), y(t): o que cada uma expressa, quando usar cada uma e como converter entre elas.',
    sections: [
      {
        heading: 'Forma cartesiana: y como função de x',
        body: [
          'A forma cartesiana y = f(x) é a familiar: para cada x, a equação entrega o y. É a linguagem natural das funções — toda reta vertical encontra o gráfico no máximo uma vez, de modo que a curva nunca se dobra sobre si mesma verticalmente. O pensamento entrada-saída, domínio e imagem, e o teste da reta vertical pertencem a esta forma.',
          'Mas a forma tem um limite rígido: não consegue descrever curvas que fazem laços, se auto-intersectam ou viajam verticalmente. Um círculo precisa de duas equações cartesianas (metades superior e inferior); uma curva traçada duas vezes, ou traçada para trás, é inexprimível. Sempre que posição, forma ou movimento é mais rico que “um y por x”, a forma cartesiana fica sem espaço.',
        ],
      },
      {
        heading: 'Forma paramétrica: ambas as coordenadas seguem um parâmetro',
        body: [
          'As equações paramétricas introduzem uma terceira variável, o parâmetro t, e definem x e y separadamente: x = x(t), y = y(t). À medida que t percorre seu intervalo, o ponto (x(t), y(t)) traça a curva. O círculo unitário vira x = cos(t), y = sin(t) para t em [0, 2π) — um par limpo de equações, sem dividir em metades, sem ambiguidade de ±.',
          'O parâmetro frequentemente carrega significado: pode ser o tempo. Então x = t, y = t^2 traça a parábola y = x^2 da esquerda para a direita à medida que t aumenta, enquanto x = −t, y = t^2 traça a mesma parábola da direita para a esquerda. Mesma forma, jornadas opostas — uma distinção que a forma cartesiana sequer consegue enunciar. A forma paramétrica separa como a curva se parece de como ela é percorrida.',
        ],
      },
      {
        heading: 'Convertendo entre as duas formas',
        body: [
          'Ir da paramétrica para a cartesiana significa eliminar o parâmetro. Se x = t e y = t^2, a substituição dá y = x^2 diretamente. Para x = cos(t), y = sin(t), elevar ao quadrado e somar usa cos²t + sin²t = 1 para recuperar x² + y² = 1. A eliminação é geralmente álgebra mais uma identidade bem escolhida.',
          'A direção reversa — parametrizar uma curva cartesiana — sempre tem pelo menos uma resposta trivial: faça x = t, y = f(t). As parametrizações interessantes são as não triviais, como a do círculo acima ou x = t^2, y = t^4 − 3*t^2 para uma curva que revisita pontos. Note que a conversão pode perder informação: eliminar t de x = t, y = t^2 descarta a direção do percurso, que só a forma paramétrica registrava.',
        ],
      },
      {
        heading: 'Quando cada forma é a ferramenta certa',
        body: [
          'Use a forma cartesiana quando a relação for genuinamente funcional — uma saída por entrada — e quando você quiser ferramentas de cálculo (derivadas, integrais, busca de raízes) em seu cenário mais simples. A maioria das fórmulas na ciência e na economia chega assim.',
          'Use a forma paramétrica para curvas fechadas, curvas auto-intersectantes e qualquer coisa envolvendo movimento ou traçado — trajetórias de projéteis com o tempo como parâmetro, figuras de Lissajous, epiciclos como engrenagens. Recorra a ela também quando uma equação cartesiana for desajeitada: a curva x = y^2 é uma parábola deitada perfeitamente boa, mas não é uma função de x, enquanto x = t^2, y = t a parametriza sem esforço. Se a curva faz laços ou a jornada importa, vá de paramétrica.',
        ],
      },
      {
        heading: 'Vendo a diferença na calculadora',
        body: [
          'Plote y = sin(x) na forma cartesiana e depois plote x = t, y = sin(t) parametricamente sobre a mesma janela: curvas idênticas, porque a segunda é apenas uma reparametrização da primeira. Agora tente x = sin(t), y = sin(2*t) — uma figura de Lissajous — e pergunte que equação cartesiana única y = f(x) poderia produzi-la. Nenhuma pode: a curva se cruza e atribui múltiplos valores de y a um x.',
          'Ajuste o intervalo de t e observe o traçado: com t de 0 a π, você obtém metade da figura; com 0 a 2π, a figura inteira. Esse controle sobre quanto da curva é desenhado, e em que ordem, é a vantagem característica da forma paramétrica — e a razão pela qual o movimento, de projéteis a órbitas planetárias, é modelado parametricamente.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'cos(x)', 'sqrt(4 - x^2)'],
    keyTakeaways: [
      'A forma cartesiana y = f(x) dá um y por x — não consegue descrever laços, segmentos verticais ou auto-interseções.',
      'A forma paramétrica x = x(t), y = y(t) traça uma curva à medida que t varia; t frequentemente representa o tempo, codificando a direção do percurso.',
      'O círculo unitário precisa de duas equações cartesianas, mas de um par paramétrico: x = cos(t), y = sin(t).',
      'Eliminar o parâmetro converte paramétrica em cartesiana, mas a informação da direção do percurso se perde.',
      'Use a forma paramétrica quando a curva faz laços, se auto-intersecta ou quando a jornada ao longo dela importa; use a cartesiana para relações funcionais.',
    ],
    faqs: [
      {
        q: 'Toda curva paramétrica pode ser escrita como y = f(x)?',
        a: 'Não. Apenas curvas que passam no teste da reta vertical podem. Um círculo, uma figura de Lissajous ou qualquer curva que atribua dois valores de y a um x não tem uma única equação cartesiana y = f(x) — embora pedaços dela possam ser escritos assim separadamente.',
      },
      {
        q: 'O que o parâmetro t geralmente representa?',
        a: 'Frequentemente o tempo: x = x(t), y = y(t) descreve então uma posição evoluindo ao longo do tempo. Mas t é apenas uma variável de traçado — qualquer intervalo serve, e a mesma curva geométrica pode ser traçada por muitas parametrizações diferentes, para frente ou para trás, rápida ou devagar.',
      },
      {
        q: 'Como converto equações paramétricas para a forma cartesiana?',
        a: 'Elimine o parâmetro: resolva uma equação para t (ou use uma identidade) e substitua na outra. Para x = cos(t), y = sin(t), elevar ao quadrado e somar dá x² + y² = 1 via cos²t + sin²t = 1.',
      },
    ],
    related: [
      '/pt/learn/what-is-a-function/',
      '/pt/learn/graphing-inequalities/',
      '/pt/math-functions/sine/',
      '/pt/math-functions/cosine/',
      '/pt/math-functions/quadratic/',
      '/pt/math-functions/square-root/',
      '/pt/examples/lissajous-curve/',
      '/pt/examples/projectile-motion/',
      '/pt/graphing-calculator/',
    ],
  },
];
