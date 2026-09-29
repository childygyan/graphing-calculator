/**
 * Conteúdo educacional em português para as dez páginas de funções notáveis.
 *
 * Mesma estrutura e tipos de `src/data/seo/functions.ts` (inglês).
 * slugs, expressões, notação e tryExpressions são idênticos; apenas os
 * campos de texto (name, displayName, tagline, description, intro, sections,
 * keyFacts, faqs) foram traduzidos. Caminhos `related` usam o prefixo /pt/.
 */
import type { FunctionPageData } from '../types.js';

export const FUNCTION_PAGES: FunctionPageData[] = [
  {
    slug: 'sine',
    name: 'Seno',
    displayName: 'Função Seno',
    notation: 'f(x) = sin(x)',
    expression: 'sin(x)',
    tagline: 'A onda clássica da trigonometria: uma oscilação suave que se repete a cada 2π.',
    description:
      'Grafique f(x) = sin(x) na calculadora gráfica: explore período 2π, amplitude, zeros e picos da função seno, essencial em ondas e oscilações.',
    intro: [
      'A função seno é uma das curvas mais reconhecíveis de toda a matemática: uma onda suave e repetitiva que oscila para sempre entre −1 e 1. Definida originalmente por triângulos retângulos — o seno de um ângulo é a razão entre o cateto oposto e a hipotenusa —, ela se estende naturalmente a todos os números reais ao medir ângulos em radianos ao redor do círculo unitário. No círculo unitário, sin(x) é simplesmente a coordenada y do ponto alcançado após girar x radianos a partir do eixo x positivo.',
      'Como se repete a cada 2π radianos, o seno é o protótipo de todo fenômeno periódico: corrente alternada, ondas sonoras, luz, marés e a vibração da corda de um violão podem ser descritos com ondas senoidais de diferentes frequências e amplitudes. Digite sin(x) na calculadora gráfica para traçar a onda você mesmo e, em seguida, desloque-a, estique-a e combine-a com outras expressões para ver como as oscilações do mundo real são construídas a partir desta única curva.',
    ],
    sections: [
      {
        heading: 'O que é o seno',
        body: [
          'A definição pelo círculo unitário é o que permite ao seno aceitar qualquer entrada real, e não apenas ângulos de um triângulo. Partindo de (1, 0) e movendo-se no sentido anti-horário ao redor do círculo de raio 1, cada ângulo x chega a um ponto cuja altura acima do eixo x é sin(x). Após uma volta completa de 2π radianos, você retorna ao ponto de partida — é por isso que o gráfico se repete: a história da função está escrita na geometria do círculo.',
          'Essa geometria também explica a simetria da onda: o seno é uma função ímpar, ou seja, sin(−x) = −sin(x), de modo que a metade esquerda do gráfico é a metade direita girada 180° em torno da origem. O gráfico cruza o eixo x em cada múltiplo de π, atinge seu pico de 1 em π/2 mais cada volta completa e chega ao mínimo de −1 em 3π/2 mais cada volta completa.',
        ],
      },
      {
        heading: 'Amplitude, período e fase',
        body: [
          'Três números descrevem qualquer onda senoidal: amplitude, período e fase. A amplitude é a altura da onda — para o sin(x) puro, ela vale 1, a distância da linha média y = 0 até cada pico. Multiplicar por uma constante, como em 3*sin(x), estica a onda verticalmente sem mudar sua forma; é assim que sons mais altos e sinais mais fortes são modelados.',
          'O período é o comprimento horizontal de um ciclo completo: 2π para sin(x). Escrever sin(2*x) comprime duas ondas completas no mesmo intervalo, reduzindo o período à metade (π) e dobrando a frequência — a altura de uma nota uma oitava acima. Adicionar um deslocamento de fase, sin(x − π/2), desliza toda a onda para o lado, e é por isso que o cosseno é secretamente um seno deslocado: cos(x) = sin(x + π/2).',
        ],
      },
      {
        heading: 'Onde o seno aparece',
        body: [
          'As ondas senoidais são os blocos de construção do processamento de sinais. Qualquer sinal repetitivo — um tom musical, uma transmissão de rádio, o zumbido de 50 ou 60 Hz da rede elétrica — pode ser decomposto em uma soma de ondas senoidais de diferentes frequências, fato conhecido como análise de Fourier. Quando duas ondas senoidais de frequências quase iguais se sobrepõem, elas interferem e produzem batimentos, o efeito pulsante que você ouve quando dois instrumentos ligeiramente desafinados tocam juntos.',
          'Além dos sinais, o seno governa o movimento harmônico simples: o vai e vem de uma massa presa a uma mola, o balanço de um pêndulo pequeno e o sobe e desce de uma boia flutuante seguem curvas senoidais no tempo. Na geometria e na física, o seno projeta uma grandeza giratória sobre um eixo — a posição vertical da cabine de uma roda-gigante ao longo do tempo traça exatamente sin(x).',
        ],
      },
    ],
    keyFacts: [
      'Domínio: todos os números reais; imagem: −1 ≤ sin(x) ≤ 1.',
      'Período 2π: sin(x + 2π) = sin(x) para todo x.',
      'Função ímpar: sin(−x) = −sin(x); o gráfico tem simetria rotacional de 180° em torno da origem.',
      'Zeros em x = nπ; máximos de 1 em x = π/2 + 2πn; mínimos de −1 em x = 3π/2 + 2πn.',
      'Interseção com o eixo y em (0, 0); a derivada é cos(x); uma primitiva é −cos(x).',
    ],
    faqs: [
      {
        q: 'Por que o gráfico do seno é uma onda?',
        a: 'Porque o seno mede a altura no círculo unitário à medida que você gira. Dar a volta no círculo faz a altura subir e descer suavemente e se repetir a cada volta completa, de modo que o gráfico da altura em função do ângulo é uma onda. A onda é suave porque a rotação é contínua — não há cantos nem saltos.',
      },
      {
        q: 'Qual é a diferença entre seno e cosseno?',
        a: 'Elas são a mesma onda deslocada lateralmente: cos(x) = sin(x + π/2). No círculo unitário, o cosseno é a coordenada x enquanto o seno é a coordenada y. O cosseno começa no seu máximo, cos(0) = 1, enquanto o seno começa em zero, sin(0) = 0.',
      },
      {
        q: 'sin(x) alguma vez passa de 1?',
        a: 'Não — para x real, |sin(x)| ≤ 1 sempre. No círculo unitário, a coordenada y nunca pode ser maior, em módulo, que o raio, que é 1. (O seno de números complexos pode exceder 1 em módulo, mas o gráfico real da calculadora permanece dentro de [−1, 1].)',
      },
    ],
    related: [
      '/pt/math-functions/cosine/',
      '/pt/math-functions/tangent/',
      '/pt/examples/trigonometric-interference/',
      '/pt/examples/damped-oscillation/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'cosine',
    name: 'Cosseno',
    displayName: 'Função Cosseno',
    notation: 'f(x) = cos(x)',
    expression: 'cos(x)',
    tagline: 'O par, em forma de onda, do seno — o cosseno começa no pico e se repete a cada 2π.',
    description:
      'Grafique f(x) = cos(x) na calculadora gráfica: período 2π, amplitude, interseções e pontos de virada, simetria par e usos em ondas e movimento.',
    intro: [
      'O cosseno é a contraparte horizontal do seno: no círculo unitário, ele fornece a coordenada x do ponto no ângulo x, enquanto o seno fornece a coordenada y. Essa única diferença molda tudo no seu gráfico — ele começa no valor máximo de 1 quando x = 0, desce até −1 em x = π e retorna a 1 em x = 2π, traçando a mesma onda suave do seno, mas deslocada um quarto de volta para o lado. Como o seno, oscila para sempre entre −1 e 1 e se repete a cada 2π radianos.',
      'O cosseno aparece onde algo se projeta sobre um eixo horizontal ou parte de um máximo: a sombra de uma roda girando, a tensão de um circuito de corrente alternada medida a partir do pico ou a coordenada x de um movimento circular uniforme. Como cos(x) = sin(x + π/2), tudo o que se pode dizer sobre ondas senoidais vale para ondas cossenoidais com um deslocamento de fase — digite cos(x) na calculadora e arraste a janela de visualização para vê-lo se repetir.',
    ],
    sections: [
      {
        heading: 'O que é o cosseno',
        body: [
          'Imagine um ponto viajando no sentido anti-horário ao redor do círculo unitário, começando em (1, 0). No ângulo x, sua posição é (cos x, sin x): o cosseno acompanha o quanto o ponto está à direita ou à esquerda. Em x = 0, o ponto está na extrema direita, então cos(0) = 1 — a interseção do gráfico com o eixo y. À medida que o ângulo cresce, o ponto balança para a esquerda, e o cosseno cai suavemente, passando por 0 em x = π/2 até chegar a −1 em x = π, a extrema esquerda do círculo.',
          'O cosseno é uma função par, cos(−x) = cos(x), de modo que seu gráfico é uma imagem espelhada em relação ao eixo y: o lado esquerdo reflete exatamente o direito. Ele cruza o zero em x = π/2 + nπ, no meio do caminho entre cada pico e cada vale, e seus máximos de 1 ocorrem em x = 2πn, enquanto os mínimos de −1 ocorrem em x = π + 2πn. A forma familiar da onda vem da mesma geometria circular do seno, vista de lado.',
        ],
      },
      {
        heading: 'Cosseno, seno e deslocamentos de fase',
        body: [
          'A identidade cos(x) = sin(x + π/2) diz que as duas funções são uma única onda vista de dois pontos de partida: o cosseno é o que o seno parece um quarto de período antes. Isso importa ao modelar oscilações reais, porque a escolha entre seno e cosseno é apenas uma escolha de quando você inicia o relógio — uma mola solta do repouso na extensão máxima segue um cosseno no tempo, enquanto uma empurrada passando pelo equilíbrio segue um seno.',
          'Deslocamentos de fase também explicam somas como sin(x) + cos(x): combinar duas ondas da mesma frequência sempre produz outra onda dessa frequência, aqui √2·sin(x + π/4), fato que decorre das fórmulas de adição de arcos. Na calculadora, plote sin(x) e cos(x) juntos e adicione uma terceira expressão sin(x) + cos(x) para ver a soma permanecer uma onda perfeita.',
        ],
      },
      {
        heading: 'Onde o cosseno aparece',
        body: [
          'Na física, o cosseno descreve qualquer oscilação medida a partir do seu extremo: o movimento harmônico simples x(t) = A·cos(ωt) para uma massa solta do repouso, a parte real da exponencial complexa e^(iθ) = cos θ + i·sin θ que sustenta a análise de circuitos de corrente alternada e as funções de onda quânticas, e as funções de base pares das séries de Fourier. Quando engenheiros escrevem um sinal periódico como soma de cossenos, cada termo captura a parte simétrica da onda.',
          'O cosseno também aparece longe das ondas. O produto escalar de dois vetores é |a||b|cos θ, onde θ é o ângulo entre eles, de modo que o cosseno mede o alinhamento: 1 para paralelos, 0 para perpendiculares, −1 para opostos. A lei dos cossenos, c² = a² + b² − 2ab·cos(C), generaliza o teorema de Pitágoras para qualquer triângulo.',
        ],
      },
    ],
    keyFacts: [
      'Domínio: todos os números reais; imagem: −1 ≤ cos(x) ≤ 1.',
      'Período 2π: cos(x + 2π) = cos(x) para todo x.',
      'Função par: cos(−x) = cos(x); o gráfico é simétrico em relação ao eixo y.',
      'Zeros em x = π/2 + nπ; máximos de 1 em x = 2πn; mínimos de −1 em x = π + 2πn.',
      'Interseção com o eixo y em (0, 1); a derivada é −sin(x); uma primitiva é sin(x).',
    ],
    faqs: [
      {
        q: 'O cosseno é apenas um seno deslocado?',
        a: 'Exatamente — cos(x) = sin(x + π/2), de modo que o gráfico do cosseno é o gráfico do seno movido para a esquerda em um quarto de período. Eles compartilham a mesma amplitude, período e imagem; apenas o ponto de partida difere. No círculo unitário, são as coordenadas x e y do mesmo ponto giratório.',
      },
      {
        q: 'Por que cos(0) = 1?',
        a: 'No ângulo 0, o ponto giratório no círculo unitário está em (1, 0), a extrema direita do círculo, de modo que sua coordenada x — o cosseno — é 1 e sua coordenada y — o seno — é 0. É também por isso que o gráfico do cosseno começa no seu pico.',
      },
      {
        q: 'O que o cosseno tem a ver com o produto escalar?',
        a: 'A fórmula do produto escalar a·b = |a||b|cos θ usa o cosseno do ângulo entre os vetores para medir o quanto eles apontam na mesma direção. O cosseno é 1 quando são paralelos, 0 quando perpendiculares e −1 quando opostos — funciona como uma nota de alinhamento entre −1 e 1.',
      },
    ],
    related: [
      '/pt/math-functions/sine/',
      '/pt/math-functions/tangent/',
      '/pt/examples/trigonometric-interference/',
      '/pt/examples/damped-oscillation/',
      '/pt/learn/what-is-a-function/',
    ],
  },
  {
    slug: 'tangent',
    name: 'Tangente',
    displayName: 'Função Tangente',
    notation: 'f(x) = tan(x)',
    expression: 'tan(x)',
    tagline:
      'Uma curva repetitiva que sobe de −∞ a +∞, com assíntotas verticais onde o cosseno zera.',
    description:
      'Grafique f(x) = tan(x) na calculadora gráfica: ramos repetitivos, assíntotas em π/2 + nπ, período π, imagem ilimitada e usos da tangente.',
    intro: [
      'A função tangente, tan(x) = sin(x)/cos(x), não se parece em nada com suas irmãs em forma de onda: em vez de oscilar entre −1 e 1, ela varre para cima todos os valores reais, depois salta e recomeça. Cada ramo repetitivo passa por um zero em x = nπ, sobe cada vez mais íngreme e dispara para o infinito à medida que x se aproxima de π/2 + nπ — os pontos onde cos(x) = 0 e a razão explode. Essas são as assíntotas verticais da função, as paredes tracejadas que a curva pode se aproximar, mas nunca tocar.',
      'A tangente mede inclinação: em um triângulo retângulo, ela é cateto oposto sobre cateto adjacente, a inclinação da hipotenusa, e para um ângulo de inclinação ela fornece diretamente a inclinação da reta. Como tan(x + π) = tan(x), seu período é apenas π — metade do período do seno e do cosseno. Digite tan(x) na calculadora e afaste o zoom para ver os ramos ladrilharem o plano, cada um uma curva em S esticada entre duas assíntotas.',
    ],
    sections: [
      {
        heading: 'O que é a tangente',
        body: [
          'Geometricamente, tan(x) é a inclinação do raio no ângulo x: desenhe o raio a partir da origem no ângulo x e veja quão íngreme ele sobe — subida sobre deslocamento, ou seja, oposto sobre adjacente. Equivalentemente, é a coordenada y onde esse raio encontra a reta vertical x = 1, tangente ao círculo unitário — daí vem o nome. À medida que o raio gira em direção ao alto, o ponto de interseção corre para o infinito, e no momento em que o raio aponta exatamente para cima não há interseção alguma — a assíntota.',
          'Como tan(x) = sin(x)/cos(x), os zeros da função vêm do seno (em x = nπ) e suas assíntotas vêm dos zeros do cosseno (em x = π/2 + nπ). A tangente é uma função ímpar, tan(−x) = −tan(x), de modo que cada ramo é rotacionalmente simétrico em torno do seu próprio zero, e todo o gráfico se repete a cada π, porque deslocar seno e cosseno em π inverte ambos os sinais, deixando a razão inalterada.',
        ],
      },
      {
        heading: 'Assíntotas e comportamento ilimitado',
        body: [
          'As assíntotas verticais em x = π/2 + nπ são a característica mais marcante de tan(x): aproximando-se pela esquerda, a curva tende a +∞; pela direita, a −∞. A função é contínua em cada intervalo entre assíntotas, mas tem um salto inevitável em cada assíntota — nenhuma redefinição pode consertá-lo, porque os limites laterais discordam. Isso faz da tangente o exemplo clássico em sala de aula de uma função com infinitas assíntotas verticais.',
          'Ao contrário do seno e do cosseno, a tangente é ilimitada em ambas as direções: sua imagem é todos os números reais. Perto de zero, ela se comporta quase como a reta y = x (a aproximação de ângulo pequeno tan(x) ≈ x) e depois se inclina dramaticamente — em x = 1,4 radianos o valor já é cerca de 5,8, e em 1,57 é enorme. Sua derivada, sec²(x) = 1 + tan²(x), é sempre pelo menos 1, confirmando que a curva nunca se achata.',
        ],
      },
      {
        heading: 'Onde a tangente aparece',
        body: [
          'A tangente converte ângulos em inclinações, por isso aparece onde quer que a inclinação importe: o declive de uma ladeira (uma rampa de 45° é um declive de 100% porque tan(45°) = 1), a matemática da trajetória de projéteis e o ângulo da sombra de um relógio de sol. No cálculo, a própria derivada é uma inclinação tangente — a reta tangente a uma curva em um ponto — e a tangente inversa, arctan, é como as calculadoras recuperam ângulos a partir de inclinações, por exemplo ao encontrar um rumo a partir de Δy/Δx.',
          'Na física, tan aparece em relações de fase: o ângulo de fase de um oscilador forçado satisfaz tan(φ) = (termo de amortecimento)/(termo de rigidez), e na óptica o ângulo de Brewster obedece tan(θ) = n₂/n₁. Onde quer que uma razão entre componentes vertical e horizontal importe, a tangente é a linguagem natural.',
        ],
      },
    ],
    keyFacts: [
      'tan(x) = sin(x)/cos(x); o domínio é todo x real exceto π/2 + nπ.',
      'Imagem: todos os números reais — a tangente é ilimitada para cima e para baixo.',
      'Período π: tan(x + π) = tan(x); função ímpar, tan(−x) = −tan(x).',
      'Zeros em x = nπ; assíntotas verticais em x = π/2 + nπ.',
      'A derivada é sec²(x) = 1 + tan²(x), sempre ≥ 1; perto de 0, tan(x) ≈ x.',
    ],
    faqs: [
      {
        q: 'Por que tan(x) tem assíntotas?',
        a: 'Porque tan(x) = sin(x)/cos(x), e cos(x) = 0 em x = π/2 + nπ. Dividir por valores cada vez mais próximos de zero faz a razão crescer sem limite, de modo que o gráfico dispara para ±∞ de cada lado de cada um desses pontos. A função simplesmente não está definida ali.',
      },
      {
        q: 'Qual é o período da tangente?',
        a: 'π, metade do período do seno e do cosseno. Somar π ao ângulo inverte os sinais de sin(x) e cos(x), e as duas inversões se cancelam na razão, de modo que tan(x + π) = tan(x). O gráfico repete seu padrão de ramos a cada π radianos.',
      },
      {
        q: 'A tangente é crescente em todos os lugares?',
        a: 'Ela é crescente em cada intervalo entre assíntotas consecutivas, mas não é crescente como função inteira — ela salta de +∞ de volta para −∞ em cada assíntota. Assim, a afirmação “tan é crescente” só é verdadeira dentro de um único ramo, como (−π/2, π/2).',
      },
    ],
    related: [
      '/pt/math-functions/sine/',
      '/pt/math-functions/cosine/',
      '/pt/learn/asymptotes-explained/',
      '/pt/learn/what-is-a-function/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'quadratic',
    name: 'Quadrática',
    displayName: 'Função Quadrática',
    notation: 'f(x) = x^2 - 4',
    expression: 'x^2 - 4',
    tagline: 'A parábola x² − 4: uma curva em U com raízes em ±2 e ponto mais baixo em (0, −4).',
    description:
      'Grafique f(x) = x² − 4: vértice, raízes em ±2, eixo de simetria, valor mínimo e usos das quadráticas na física e na álgebra.',
    intro: [
      'A função quadrática f(x) = x² − 4 é a parábola mais simples com algo interessante acontecendo: ela cruza o eixo x duas vezes, mergulha abaixo dele e dá a volta em um único ponto mais baixo. Elevar ao quadrado torna toda entrada não negativa, de modo que x² é mínimo em x = 0, e subtrair 4 desliza toda a forma em U quatro unidades para baixo. O resultado é uma curva simétrica com vértice em (0, −4), abrindo-se para cima para sempre.',
      'As quadráticas são os cavalos de batalha da álgebra: modelam qualquer coisa em que uma quantidade depende do quadrado de outra — a área de um quadrado, a altura de uma bola lançada ao longo do tempo, o lucro de um negócio com demanda linear. O exemplo x² − 4 é especialmente instrutivo porque se fatora de forma limpa como (x − 2)(x + 2), de modo que suas interseções com o eixo x em 2 e −2 podem ser lidas diretamente da álgebra. Plote-a na calculadora e observe a simetria em torno do eixo y.',
    ],
    sections: [
      {
        heading: 'O que é esta quadrática',
        body: [
          'Toda quadrática tem a forma ax² + bx + c, e seu gráfico é sempre uma parábola — a forma em U que se obtém ao elevar ao quadrado. Aqui a = 1 (positivo, então o U abre para cima), b = 0 (sem inclinação, então o vértice fica sobre o eixo y) e c = −4 (a interseção com o eixo y). A fórmula do vértice x = −b/(2a) dá x = 0, e f(0) = −4, confirmando o mínimo em (0, −4).',
          'A fatoração revela as raízes: x² − 4 = (x − 2)(x + 2), uma diferença de quadrados, de modo que a curva cruza o eixo x exatamente onde cada fator é zero — em x = 2 e x = −2. Entre as raízes, a função é negativa (o mergulho abaixo do eixo); fora delas, é positiva e cresce sem limite. Como o termo x² domina para |x| grande, ambos os braços da parábola se dirigem a +∞.',
        ],
      },
      {
        heading: 'Simetria, vértice e taxa de variação',
        body: [
          'O eixo y é o eixo de simetria da parábola: f(−x) = f(x), de modo que a metade esquerda espelha a direita. O vértice é o ponto de virada da parábola — aqui o mínimo global, já que os braços sobem para sempre. Toda quadrática tem exatamente um vértice e exatamente um valor extremo, e é por isso que as quadráticas são o modelo ideal para otimização: lucro máximo, custo mínimo, ponto mais alto de uma trajetória.',
          'A derivada f′(x) = 2x conta o resto da história: negativa para x < 0 (descendo até o vértice), zero em x = 0 (o fundo plano), positiva para x > 0 (subindo). A própria inclinação cresce linearmente, com segunda derivada constante de 2 — a assinatura da aceleração constante, que é por que a distância sob a gravidade é quadrática no tempo.',
        ],
      },
      {
        heading: 'Onde as quadráticas aparecem',
        body: [
          'Lance uma bola e sua altura segue uma parábola: h(t) = −4,9t² + v₀t + h₀, a mesma forma de x² − 4, mas invertida e deslocada. Áreas e volumes produzem quadráticas e cúbicas naturalmente — dobrar o lado de um quadrado quadruplica sua área — e a fórmula quadrática resolve toda equação desse tipo, incluindo esta: x = ±√4 = ±2.',
          'Na economia, o lucro em função do preço é frequentemente modelado como uma parábola que abre para baixo (a receita sobe e depois cai à medida que o preço aumenta), e seu vértice dá o preço ótimo. Na estatística, o ajuste por mínimos quadrados minimiza uma função de erro quadrática, e a curva em sino da distribuição normal é e^(−x²) — uma quadrática no expoente.',
        ],
      },
    ],
    keyFacts: [
      'Forma fatorada: x² − 4 = (x − 2)(x + 2); raízes (interseções com o eixo x) em x = 2 e x = −2.',
      'Vértice (mínimo global) em (0, −4); o eixo de simetria é o eixo y (x = 0).',
      'Domínio: todos os números reais; imagem: y ≥ −4.',
      'Função par: f(−x) = f(x); o gráfico espelha-se em relação ao eixo y.',
      'Interseção com o eixo y em (0, −4); a função é negativa entre as raízes e positiva fora delas.',
      'Derivada f′(x) = 2x; a inclinação é zero no vértice e a segunda derivada é a constante 2.',
    ],
    faqs: [
      {
        q: 'Como encontrar as raízes de x² − 4?',
        a: 'Fatore como diferença de quadrados: x² − 4 = (x − 2)(x + 2). Um produto é zero quando algum fator é zero, então x = 2 ou x = −2. Equivalentemente, a fórmula quadrática dá x = (0 ± √(0 + 16))/2 = ±2.',
      },
      {
        q: 'Qual é o valor mínimo de x² − 4?',
        a: '−4, atingido em x = 0. Como x² ≥ 0 para todo x real, subtrair 4 dá x² − 4 ≥ −4, com igualdade apenas quando x² = 0. O vértice (0, −4) é o ponto mais baixo da parábola, e a função cresce sem limite em ambos os lados.',
      },
      {
        q: 'Por que o gráfico é simétrico?',
        a: 'Porque só aparecem potências pares de x: (−x)² − 4 = x² − 4, então f(−x) = f(x). Cada entrada e seu negativo dão a mesma saída, o que espelha a metade direita do gráfico sobre o eixo y para a metade esquerda.',
      },
    ],
    related: [
      '/pt/examples/projectile-motion/',
      '/pt/math-functions/square-root/',
      '/pt/math-functions/absolute-value/',
      '/pt/learn/understanding-derivatives/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'cubic',
    name: 'Cúbica',
    displayName: 'Função Cúbica',
    notation: 'f(x) = x^3 - 3*x',
    expression: 'x^3 - 3*x',
    tagline:
      'Uma cúbica em forma de S com três raízes reais, uma colina e um vale locais e simetria rotacional de 180°.',
    description:
      'Grafique f(x) = x³ − 3x na calculadora gráfica: três raízes reais, máximo e mínimo locais, ponto de inflexão e sua ligação com a trigonometria.',
    intro: [
      'A cúbica f(x) = x³ − 3x traça um S alongado: sobe de −∞, atinge uma pequena colina em (−1, 2), mergulha passando pela origem até um vale em (1, −2) e sobe em direção a +∞. Ao contrário de uma parábola, não tem máximo nem mínimo global — o termo x³ acaba dominando tudo, arrastando o braço esquerdo para baixo para sempre e o braço direito para cima para sempre. Entre os extremos, a curva cruza o eixo x três vezes, em −√3, 0 e √3.',
      'Esta cúbica em particular é uma favorita nos livros-texto porque tudo nela pode ser calculado à mão: suas raízes se fatoram via x(x² − 3), seus pontos de virada vêm da derivada limpa 3x² − 3, e ela esconde uma bela conexão com a trigonometria do ângulo triplo. As cúbicas modelam crescimento de volume, equações de estado cúbicas e qualquer relação em que o cubo de uma quantidade importe. Plote x^3 - 3*x na calculadora e afaste o zoom para ver o S se endireitar no seu comportamento final.',
    ],
    sections: [
      {
        heading: 'O que é esta cúbica',
        body: [
          'Colocando x em evidência, as raízes aparecem: x³ − 3x = x(x² − 3) = x(x − √3)(x + √3), de modo que o gráfico cruza o eixo x em −√3 ≈ −1,732, 0 e √3 ≈ 1,732. Três raízes reais é o máximo que uma cúbica pode exibir como cruzamentos distintos — o grau da função define o máximo. Entre raízes consecutivas, a curva precisa dar a volta, que é exatamente o que a colina e o vale fazem.',
          'O comportamento final é ditado apenas por x³: quando x → +∞, a função → +∞, e quando x → −∞, ela → −∞. O termo −3x apenas molda o meio do gráfico, esculpindo a ondulação. Todo polinômio de grau ímpar compartilha esse comportamento de extremidades opostas, que garante pelo menos uma raiz real — a curva precisa cruzar o eixo para ir de −∞ a +∞.',
        ],
      },
      {
        heading: 'Pontos de virada e o ponto de inflexão',
        body: [
          'A derivada f′(x) = 3x² − 3 = 3(x − 1)(x + 1) se anula em x = ±1, marcando os dois pontos de virada: um máximo local em (−1, 2) e um mínimo local em (1, −2). A função sobe até x = −1, desce até x = 1 e depois sobe para sempre — o clássico sobe-desce-sobe de uma cúbica com dois pontos críticos. Estes são apenas extremos locais; o comportamento global é ilimitado em ambas as direções.',
          'No meio do caminho entre eles, em (0, 0), está o ponto de inflexão, onde a curva muda de côncava para baixo para côncava para cima. A segunda derivada f″(x) = 6x confirma: negativa à esquerda de 0, positiva à direita de 0, zero exatamente na origem. Como a cúbica é uma função ímpar, o ponto de inflexão também é o centro de sua simetria rotacional de 180° — gire o gráfico meia volta em torno de (0, 0) e ele se mapeia sobre si mesmo.',
        ],
      },
      {
        heading: 'Uma identidade trigonométrica escondida',
        body: [
          'Eis a surpresa que tornou esta cúbica famosa: substituir x = 2cos θ dá x³ − 3x = 2cos(3θ). Você pode verificá-la a partir da fórmula do ângulo triplo cos(3θ) = 4cos³θ − 3cos θ: com x = 2cos θ, o lado esquerdo vira 8cos³θ − 6cos θ = 2(4cos³θ − 3cos θ) = 2cos(3θ). A cúbica é secretamente um ângulo triplicado disfarçado.',
          'Esta identidade é mais que uma curiosidade — é a chave para resolver equações cúbicas trigonometricamente. Uma cúbica com três raízes reais, como esta, pode ser resolvida escrevendo suas raízes como cossenos escalados de ângulos adequados, método que remonta a Viète. Também explica por que a colina e o vale têm exatamente as alturas ±2: são 2cos(3θ) avaliado nos seus próprios picos.',
        ],
      },
    ],
    keyFacts: [
      'Fatorada: x(x − √3)(x + √3); três raízes reais em x = −√3, 0 e √3.',
      'Máximo local em (−1, 2); mínimo local em (1, −2); sem máximo ou mínimo global.',
      'Ponto de inflexão em (0, 0); função ímpar com simetria rotacional de 180° em torno da origem.',
      'Domínio e imagem: todos os números reais.',
      'Comportamento final: f(x) → −∞ quando x → −∞ e f(x) → +∞ quando x → +∞.',
      'Identidade: com x = 2cos θ, x³ − 3x = 2cos(3θ).',
    ],
    faqs: [
      {
        q: 'Por que x³ − 3x cruza o eixo x três vezes?',
        a: 'Sua forma fatorada x(x − √3)(x + √3) mostra três fatores lineares distintos, cada um contribuindo com um zero: x = 0, x = √3 e x = −√3. Um polinômio de grau 3 pode ter no máximo três raízes reais, e este atinge o máximo. Entre cada par de raízes, os pontos de virada da derivada forçam a curva a inverter a direção.',
      },
      {
        q: 'Quais são o máximo e o mínimo locais?',
        a: 'Resolva f′(x) = 3x² − 3 = 0 para obter x = ±1. Então f(−1) = −1 + 3 = 2 é o máximo local e f(1) = 1 − 3 = −2 é o mínimo local. Eles são “locais” porque a função excede qualquer limite bem à direita e cai abaixo de qualquer limite bem à esquerda.',
      },
      {
        q: 'O que esta cúbica tem a ver com trigonometria?',
        a: 'A identidade x³ − 3x = 2cos(3θ), sob a substituição x = 2cos θ, liga a cúbica às fórmulas do ângulo triplo. Historicamente, essa conexão deu um método trigonométrico para resolver cúbicas com três raízes reais — o “casus irreducibilis” que intrigou os algebristas do século XVI.',
      },
    ],
    related: [
      '/pt/math-functions/quadratic/',
      '/pt/learn/understanding-derivatives/',
      '/pt/learn/what-is-a-function/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'exponential',
    name: 'Exponencial',
    displayName: 'Função Exponencial',
    notation: 'f(x) = e^x',
    expression: 'e^x',
    tagline:
      'A função que é a própria derivada — crescimento relativo constante, sempre crescente, nunca tocando o zero.',
    description:
      'Grafique f(x) = eˣ na calculadora gráfica: crescimento relativo constante, assíntota horizontal y = 0, o ponto (0, 1) e modelos exponenciais.',
    intro: [
      'A função exponencial f(x) = eˣ é a personificação matemática do crescimento proporcional ao tamanho: dinheiro rendendo juros compostos, bactérias dobrando em uma placa de Petri ou um boato se espalhando por uma multidão. Sua propriedade definidora é que sua taxa de variação é igual ao seu valor atual — d/dx eˣ = eˣ — e é por isso que ela aparece sempre que a taxa de crescimento de uma quantidade é proporcional à própria quantidade. A base e ≈ 2,71828 é o número único que torna isso possível.',
      'O gráfico conta a história de relance: passa por (0, 1), rasteja quase plano ao longo do eixo x para x muito negativo (aproximando-se de 0 sem nunca alcançá-lo) e depois se curva para cima, subindo cada vez mais íngreme para x positivo. Em x = 1, vale e ≈ 2,718; em x = 2, é e² ≈ 7,389; e cada passo unitário multiplica o valor por outro fator de e. Digite e^x na calculadora e compare com 2^x para ver como a base controla a inclinação.',
    ],
    sections: [
      {
        heading: 'O que é a função exponencial',
        body: [
          'A multiplicação repetida é o coração de eˣ: e³ significa e·e·e, e as leis dos expoentes e^(a+b) = e^a·e^b estendem isso a todas as potências reais, incluindo frações e negativas (e^(−x) = 1/eˣ). O próprio número e pode ser definido como o limite de (1 + 1/n)ⁿ quando n cresce — o resultado de compor 100% de juros em infinitos períodos — ou como a soma infinita 1 + 1 + 1/2! + 1/3! + ⋯.',
          'O que torna e especial entre todas as bases é a derivada: d/dx aˣ = aˣ·ln(a), e apenas para a = e o fator ln vale 1, deixando a função inalterada pela diferenciação. Equivalentemente, eˣ é a única função que satisfaz f′ = f com f(0) = 1. É por isso que e é chamado de base natural — o cálculo o destaca.',
        ],
      },
      {
        heading: 'Forma, assíntota e crescimento',
        body: [
          'Para x < 0, o gráfico abraça o eixo x por cima, decaindo em direção a 0 sem nunca tocá-lo — a assíntota horizontal y = 0 quando x → −∞. Em x = 0, a curva passa por (0, 1), sua interseção com o eixo y, e para x > 0 acelera para cima, convexa em todos os lugares (segunda derivada eˣ > 0) e crescente em todos os lugares (primeira derivada eˣ > 0). Não há zeros, pontos de virada nem pontos de inflexão: apenas crescimento implacável, suave e curvado para cima.',
          'O crescimento exponencial acaba superando qualquer polinômio: eˣ cresce mais rápido que x¹⁰⁰, mais rápido que qualquer potência fixa. É por isso que as exponenciais modelam processos descontrolados — reações em cadeia, disseminação viral em sua fase inicial — e também por que suas inversas, os logaritmos, crescem tão devagar. Em escala logarítmica, eˣ vira a reta y = x, uma maneira prática de identificar dados exponenciais.',
        ],
      },
      {
        heading: 'Onde as exponenciais aparecem',
        body: [
          'Qualquer equação diferencial da forma dy/dx = ky tem a solução y = Ce^(kx): a lei do resfriamento de Newton, o decaimento radioativo (com k < 0), os juros compostos continuamente e o crescimento populacional seguem-na. A curva em sino da distribuição normal, (1/√(2π))e^(−x²/2), coloca uma exponencial de uma quadrática no centro da estatística. Na análise complexa, a fórmula de Euler e^(iθ) = cos θ + i·sin θ funde exponenciais com trigonometria e sustenta toda a teoria de circuitos de corrente alternada e a mecânica quântica.',
          'Na computação, as exponenciais cortam para os dois lados: algoritmos com complexidade de tempo exponencial tornam-se inviáveis à medida que as entradas crescem, enquanto o backoff exponencial — esperar 1, 2, 4, 8… segundos entre tentativas — é o remédio padrão para servidores sobrecarregados. A curva logística, eˣ/(1 + eˣ), doma o crescimento exponencial puro com uma capacidade de suporte e modela desde epidemias até ativações de redes neurais.',
        ],
      },
    ],
    keyFacts: [
      'Domínio: todos os números reais; imagem: y > 0 — eˣ nunca é zero nem negativo.',
      'Interseção com o eixo y em (0, 1); assíntota horizontal y = 0 quando x → −∞.',
      'Estritamente crescente e convexa em todos os lugares; sem máximos, mínimos ou pontos de inflexão.',
      'É a própria derivada: d/dx eˣ = eˣ; uma primitiva é o próprio eˣ.',
      'Leis dos expoentes: e^(a+b) = e^a·e^b, e^(−x) = 1/eˣ, (eˣ)^n = e^(nx).',
      'e ≈ 2,71828; eˣ supera todo polinômio quando x → ∞.',
    ],
    faqs: [
      {
        q: 'Por que eˣ é a própria derivada?',
        a: 'Por definição, e é a base única para a qual d/dx aˣ = aˣ·ln(a) tem ln(a) = 1. Diferenciar eˣ pela definição de limite dá eˣ vezes o limite de (e^h − 1)/h, e e é definido precisamente como o número que torna esse limite igual a 1. Assim, a inclinação do gráfico em cada ponto é igual à altura da função ali.',
      },
      {
        q: 'O que é e, exatamente?',
        a: 'Um número irracional de aproximadamente 2,71828, definível como o limite de (1 + 1/n)ⁿ quando n → ∞ ou a soma 1 + 1 + 1/2! + 1/3! + ⋯. Como π, sua expansão decimal nunca se repete. É a base “natural” porque o cálculo assume sua forma mais simples com ela.',
      },
      {
        q: 'eˣ alguma vez chega a zero?',
        a: 'Não. Para x real, eˣ > 0 sempre — o gráfico se aproxima do eixo x assintoticamente quando x → −∞, mas nunca o toca. Isso decorre de eˣ·e^(−x) = e^0 = 1: se eˣ fosse zero, o produto não poderia ser 1.',
      },
    ],
    related: [
      '/pt/math-functions/natural-logarithm/',
      '/pt/examples/logistic-growth/',
      '/pt/learn/understanding-derivatives/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'natural-logarithm',
    name: 'Logaritmo Natural',
    displayName: 'Função Logaritmo Natural',
    notation: 'f(x) = log(x)',
    expression: 'log(x)',
    tagline:
      'A inversa de eˣ — ela desfaz o crescimento exponencial, transformando multiplicação em adição.',
    description:
      'Grafique f(x) = ln(x) na calculadora gráfica: domínio x > 0, assíntota em x = 0, leis dos logaritmos, inversa de eˣ e usos do pH a algoritmos.',
    intro: [
      'O logaritmo natural, escrito ln(x) ou log(x), responde à pergunta “e elevado a qual potência dá x?” É a inversa exata da função exponencial: ln(eˣ) = x e e^(ln x) = x, de modo que seu gráfico é a imagem espelhada de y = eˣ refletida na reta y = x. Onde a exponencial dispara para cima, o logaritmo sobe com uma lentidão agonizante — ln(10) ≈ 2,303, ln(100) ≈ 4,605, ln(1.000.000) ≈ 13,816 — cada aumento de dez vezes em x adiciona apenas cerca de 2,303 à saída.',
      'Essa lentidão de crescimento é justamente o ponto: os logaritmos comprimem faixas enormes em faixas gerenciáveis, e é por isso que a escala Richter, os decibéis e o pH são todos logarítmicos. O gráfico passa por (1, 0), sobe para x > 1, mergulha para −∞ à medida que x se aproxima de 0 pela direita (a assíntota vertical em x = 0) e é indefinido para x ≤ 0 — você não pode elevar e a nenhuma potência real e obter zero ou um número negativo. Digite log(x) na calculadora ao lado de e^x para ver a simetria espelhada.',
    ],
    sections: [
      {
        heading: 'O que é o logaritmo natural',
        body: [
          'Os logaritmos foram inventados para transformar multiplicação em adição: ln(ab) = ln(a) + ln(b). Antes das calculadoras eletrônicas, os cientistas multiplicavam números grandes consultando seus logaritmos, somando e convertendo de volta — a régua de cálculo é a personificação física dessa ideia. O “natural” no nome refere-se à base e, a base que torna o cálculo limpo: d/dx ln(x) = 1/x, a derivada mais simples possível para uma exponencial inversa.',
          'As três leis dos logaritmos decorrem das leis dos expoentes de sua inversa: ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b e ln(a^b) = b·ln a. Juntas, elas permitem desmontar expressões multiplicativas complicadas em somas — a razão pela qual os logaritmos aparecem em fórmulas de entropia, cálculos de verossimilhança e onde quer que produtos se tornem difíceis de manejar.',
        ],
      },
      {
        heading: 'Domínio, assíntota e forma',
        body: [
          'O domínio é apenas x > 0, consequência direta de eˣ > 0: não existe potência real de e que produza zero ou um número negativo, de modo que o logaritmo não pode aceitá-los. Quando x → 0⁺, ln(x) → −∞, dando a assíntota vertical x = 0 (o eixo y) — o espelho da assíntota horizontal da exponencial. A interseção com o eixo x está em (1, 0), já que e^0 = 1, o espelho da interseção de eˣ com o eixo y em (0, 1).',
          'A curva é crescente em todos os lugares (derivada 1/x > 0 para x > 0), mas côncava para baixo em todos os lugares (segunda derivada −1/x² < 0): sobe rápido logo à direita do zero e depois se achata implacavelmente. Não tem máximo nem ponto de inflexão, e é a primitiva de 1/x — a integral que nenhuma regra de potência consegue resolver, já que ∫xⁿ dx falha em n = −1.',
        ],
      },
      {
        heading: 'Onde os logaritmos aparecem',
        body: [
          'Escalas logarítmicas medem fenômenos que abrangem muitas ordens de grandeza: cada ponto Richter representa cerca de 32× a energia, cada unidade de pH é 10× a acidez, e os decibéis comprimem intensidades sonoras de um sussurro a um motor a jato em uma faixa de 0–140. Na teoria da informação, a entropia é medida em nats (log natural) ou bits (log base 2), quantificando surpresa e comprimentos ótimos de código.',
          'Na ciência da computação, algoritmos O(log n) — a busca binária sendo o clássico — reduzem o problema à metade a cada passo, de modo que dobrar a entrada adiciona apenas mais um passo; isso é crescimento logarítmico em ação. Na estatística, tirar logaritmos endireita dados exponenciais em retas, e a distribuição log-normal modela quantidades como rendas e tamanhos de partículas que se multiplicam em vez de se somar.',
        ],
      },
    ],
    keyFacts: [
      'Domínio: x > 0; imagem: todos os números reais. Indefinido para x ≤ 0.',
      'Inversa de eˣ: ln(eˣ) = x e e^(ln x) = x; os gráficos se espelham na reta y = x.',
      'Interseção com o eixo x em (1, 0); assíntota vertical x = 0 com ln(x) → −∞ quando x → 0⁺.',
      'Leis dos logaritmos: ln(ab) = ln a + ln b; ln(a/b) = ln a − ln b; ln(a^b) = b·ln a.',
      'Derivada d/dx ln(x) = 1/x; ln é a primitiva de 1/x.',
      'Crescente e côncava para baixo em todo o domínio; sem máximos, mínimos ou pontos de inflexão.',
    ],
    faqs: [
      {
        q: 'Por que ln(x) é indefinido para x negativo?',
        a: 'Porque ln(x) pergunta “e elevado a qual potência é igual a x?”, e e elevado a qualquer potência real é sempre positivo. Nenhum expoente real produz zero ou um número negativo, de modo que o logaritmo não tem valor real ali. (Logaritmos complexos existem, mas são multivalorados e estão além deste gráfico real.)',
      },
      {
        q: 'Qual é a diferença entre ln(x) e log₁₀(x)?',
        a: 'Apenas a base: ln usa e ≈ 2,718, log₁₀ usa 10. Elas são proporcionais — ln(x) = ln(10)·log₁₀(x) ≈ 2,303·log₁₀(x) — de modo que seus gráficos têm formas idênticas, apenas escalas verticais diferentes. Os logaritmos naturais dão o cálculo mais limpo (derivada 1/x); os logaritmos de base 10 servem a medições em escala decimal.',
      },
      {
        q: 'Por que o gráfico se achata tanto?',
        a: 'Porque desfazer o crescimento exponencial é inerentemente lento: para aumentar ln(x) em 1, você precisa multiplicar x por e ≈ 2,718. A derivada 1/x encolhe à medida que x cresce, de modo que cada unidade adicional de altura exige um múltiplo cada vez maior de x. Esse achatamento é exatamente o que torna os logaritmos ideais para comprimir faixas enormes.',
      },
    ],
    related: [
      '/pt/math-functions/exponential/',
      '/pt/learn/understanding-integrals/',
      '/pt/learn/understanding-derivatives/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'square-root',
    name: 'Raiz Quadrada',
    displayName: 'Função Raiz Quadrada',
    notation: 'f(x) = sqrt(x)',
    expression: 'sqrt(x)',
    tagline: 'A suave meia-parábola — a inversa de elevar ao quadrado, definida para x ≥ 0.',
    description:
      'Grafique f(x) = √x na calculadora gráfica: domínio x ≥ 0, forma de meia-parábola, pontos (0,0) e (4,2), e raízes em distâncias e geometria.',
    intro: [
      'A função raiz quadrada f(x) = √x responde “qual número não negativo, multiplicado por si mesmo, dá x?” Seu gráfico é a metade superior de uma parábola deitada: partindo da origem, sobe íngreme — com uma tangente vertical — depois se curva e se achata, passando por (1, 1), (4, 2) e (9, 3). É a inversa de x² restrita a x ≥ 0, de modo que seu gráfico é o espelho da metade direita da parábola y = x² refletida na reta y = x.',
      'As raízes quadradas aparecem onde quer que Pitágoras apareça: a fórmula da distância √((Δx)² + (Δy)²) é uma raiz quadrada, assim como o desvio padrão, o termo do discriminante da fórmula quadrática e a média quadrática por trás das tensões nominais de corrente alternada. A função cresce sem limite, mas cada vez mais devagar — √1.000.000 é apenas 1.000. Digite sqrt(x) na calculadora e plote x^2 em [0, ∞) ao lado para ver a simetria espelhada.',
    ],
    sections: [
      {
        heading: 'O que é a raiz quadrada',
        body: [
          'O símbolo √ denota a raiz quadrada principal (não negativa): √9 = 3, não ±3, porque uma função deve dar uma única saída por entrada. A equação x² = 9 tem duas soluções, ±3, mas a função √x retorna apenas a não negativa — o ± pertence à resolução de equações, não à função. Essa univocidade é o que torna √x diferenciável e graficável como uma única curva limpa.',
          'Algebricamente, √(x²) = |x|, não x — a raiz desfaz o quadrado, mas restaura a não negatividade, e é por isso que a função valor absoluto aparece. A raiz também obedece √(ab) = √a·√b e √(a/b) = √a/√b para a, b não negativos, as leis multiplicativas herdadas dos expoentes, já que √x = x^(1/2).',
        ],
      },
      {
        heading: 'Domínio, forma e a tangente vertical',
        body: [
          'O domínio é x ≥ 0: nenhum número real ao quadrado dá um negativo, de modo que a função não pode aceitar entradas negativas (sobre os reais). Em x = 0, o gráfico começa com uma tangente vertical — a derivada 1/(2√x) explode para +∞ — o que você pode ver como a curva saindo da origem direto para cima antes de se curvar para a direita. Ela é crescente em todo o seu domínio e côncava para baixo em todo o domínio, achatando-se à medida que x cresce.',
          'A imagem é y ≥ 0, e pontos notáveis são os quadrados perfeitos: (0, 0), (1, 1), (4, 2), (9, 3), (16, 4). Entre eles, a curva interpola suavemente — √2 ≈ 1,414, o famoso irracional cuja descoberta abalou a matemática pitagórica. A função não tem máximo, e seu único extremo de ponta é o mínimo 0 em x = 0.',
        ],
      },
      {
        heading: 'Onde as raízes quadradas aparecem',
        body: [
          'A distância é o território natal da raiz quadrada: da hipotenusa de Pitágoras à fórmula da distância n-dimensional ao desvio padrão (a raiz quadrada da variância), “elevar ao quadrado, somar, extrair a raiz” é um dos padrões mais repetidos da matemática. A fórmula quadrática x = (−b ± √(b² − 4ac))/(2a) coloca uma raiz quadrada no coração da resolução de quadráticas — incluindo encontrar onde x² − 4 cruza o zero.',
          'Na física, muitas leis envolvem raízes quadradas: o período de um pêndulo é proporcional a √(comprimento), a velocidade de escape a √(1/raio), e a tensão RMS da rede de corrente alternada é a tensão de pico dividida por √2. Na geometria, √2 é a diagonal de um quadrado unitário e a proporção das folhas de papel da série A.',
        ],
      },
    ],
    keyFacts: [
      'Raiz principal: √x ≥ 0 para todo x no domínio; √9 = 3, não ±3.',
      'Domínio: x ≥ 0; imagem: y ≥ 0. Indefinida para x negativo (sobre os reais).',
      'Inversa de x² em [0, ∞): √(x²) = |x|, e (√x)² = x para x ≥ 0.',
      'Pontos-chave: (0, 0), (1, 1), (4, 2), (9, 3); tangente vertical na origem.',
      'Crescente e côncava para baixo em seu domínio; mínimo 0 em x = 0, sem máximo.',
      'Derivada d/dx √x = 1/(2√x); leis √(ab) = √a·√b para a, b ≥ 0.',
    ],
    faqs: [
      {
        q: 'Por que √9 não é igual a ±3?',
        a: 'Porque √ denota uma função, e funções retornam exatamente um valor por entrada — por convenção, a raiz não negativa. A equação x² = 9 de fato tem duas soluções, x = 3 e x = −3, mas apenas 3 é √9. Escrever ±√9 recupera ambas as soluções ao resolver.',
      },
      {
        q: 'Por que não se pode tirar a raiz quadrada de um número negativo (nos reais)?',
        a: 'Porque todo número real ao quadrado é não negativo: positivos dão quadrados positivos, negativos dão quadrados positivos e zero dá zero. Nada real ao quadrado dá −1, então √(−1) não tem valor real. Estender o sistema numérico com i, onde i² = −1, dá raízes quadradas complexas.',
      },
      {
        q: 'Qual é a derivada de √x em x = 0?',
        a: 'Ela não existe — a derivada 1/(2√x) tende a +∞ quando x → 0⁺, de modo que o gráfico tem uma tangente vertical na origem. Geometricamente, a curva sai de (0, 0) rumo direto para cima; não há inclinação finita ali, embora a própria função seja contínua em 0.',
      },
    ],
    related: [
      '/pt/math-functions/quadratic/',
      '/pt/math-functions/absolute-value/',
      '/pt/learn/what-is-a-function/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'absolute-value',
    name: 'Valor Absoluto',
    displayName: 'Função Valor Absoluto',
    notation: 'f(x) = abs(x)',
    expression: 'abs(x)',
    tagline:
      'A medida em forma de V da distância até o zero — simples, simétrica, com um canto na origem.',
    description:
      'Grafique f(x) = |x| na calculadora gráfica: o gráfico em V, o canto na origem, seu significado de distância, a definição por partes e usos.',
    intro: [
      'A função valor absoluto f(x) = |x| é a distância tornada visível: |x| é o quanto x está distante do zero na reta numérica, independentemente da direção. Seu gráfico é um V perfeito — a reta y = −x para entradas negativas encontrando a reta y = x para as positivas no canto agudo (0, 0). Esse canto é a característica mais famosa da função: o único ponto onde ela é contínua, mas não diferenciável, onde a inclinação salta de −1 para 1.',
      'O valor absoluto aparece onde quer que a magnitude importe mais que o sinal: margens de erro (|medido − verdadeiro| < tolerância), tolerâncias na manufatura, a distância entre dois números (|a − b|) e definições por partes em toda a matemática aplicada. É também o exemplo mais simples de uma função construída colando duas fórmulas. Digite abs(x) na calculadora e depois experimente abs(x - 3) para ver o V deslizar e a distância até 3 desenhada como um gráfico.',
    ],
    sections: [
      {
        heading: 'O que é o valor absoluto',
        body: [
          'A definição é por partes: |x| = x quando x ≥ 0 e |x| = −x quando x < 0 — o sinal de menos inverte os negativos de volta para positivo. Assim, |5| = 5 e |−5| = −(−5) = 5. Equivalentemente, |x| = √(x²), o que mostra por que a saída nunca é negativa: elevar ao quadrado apaga o sinal e a raiz principal o mantém apagado. Ambas as formas dizem a mesma coisa: magnitude sem direção.',
          'Isso faz de |x − a| a distância entre x e a, a interpretação campeã. A inequação |x − 3| < 2 descreve todos os pontos a menos de 2 unidades de 3, ou seja, o intervalo aberto (1, 5) — o valor absoluto converte a linguagem da distância em álgebra e vice-versa. É uma função par, |−x| = |x|, de modo que o V se espelha perfeitamente em relação ao eixo y.',
        ],
      },
      {
        heading: 'O canto na origem',
        body: [
          'Em x = 0, os dois braços do V se encontram em um ângulo, e esse ângulo é uma singularidade genuína de suavidade: aproximando-se pela esquerda, a inclinação é −1; pela direita, é +1, de modo que não existe uma única reta tangente. A função é contínua em 0 — os braços se unem sem lacuna — mas não é diferenciável ali, o contraexemplo padrão que separa os dois conceitos em todo curso de cálculo.',
          'Longe do canto, tudo é manso: a derivada é −1 para x < 0 e +1 para x > 0, frequentemente escrita como a função sinal, e a segunda derivada é 0 onde quer que exista. O V tem seu mínimo global de 0 em x = 0 e nenhum máximo; ambos os braços sobem até +∞ com inclinação constante, sem nunca se curvar.',
        ],
      },
      {
        heading: 'Onde o valor absoluto aparece',
        body: [
          'A análise de erros funciona com valor absoluto: “dentro de 0,5 do valor verdadeiro” é |erro| < 0,5, e métodos numéricos param quando aproximações sucessivas satisfazem |xₙ₊₁ − xₙ| < tolerância. Na estatística, o desvio absoluto médio mede a dispersão sem elevar ao quadrado, permanecendo nas unidades originais e resistindo melhor aos outliers que a variância.',
          'Na otimização e no aprendizado de máquina, o valor absoluto é a penalidade L1: minimizar somas de |·| incentiva a esparsidade (muitos zeros exatos), ao contrário da penalidade L2 ao quadrado. Modelos lineares por partes, de faixas de imposto a redes neurais ReLU (max(0, x) = (x + |x|)/2), são construídos a partir de cantos como os do valor absoluto — a dobra no zero é um recurso, não um defeito.',
        ],
      },
    ],
    keyFacts: [
      'Definição por partes: |x| = x para x ≥ 0, |x| = −x para x < 0; equivalentemente |x| = √(x²).',
      'Domínio: todos os números reais; imagem: y ≥ 0.',
      'Gráfico em V com vértice (canto) em (0, 0); função par, simétrica em relação ao eixo y.',
      'Contínua em todos os lugares, mas não diferenciável em x = 0 (a inclinação salta de −1 para 1).',
      '|x − a| é a distância entre x e a; mínimo global 0 em x = 0, sem máximo.',
    ],
    faqs: [
      {
        q: 'Por que |x| não é diferenciável em 0?',
        a: 'Diferenciabilidade em um ponto exige que as inclinações de ambos os lados concordem. Para |x|, a inclinação à esquerda é −1 e à direita é +1 — elas discordam, de modo que não existe reta tangente no canto. A função continua sendo contínua ali; apenas tem uma dobra.',
      },
      {
        q: 'Qual é a diferença entre |x| e √(x²)?',
        a: 'Nenhuma — são a mesma função. Elevar ao quadrado remove o sinal de x e a raiz quadrada principal devolve o resultado não negativo, que é exatamente o valor absoluto. A identidade |x| = √(x²) é frequentemente usada para diferenciar |x| longe do zero.',
      },
      {
        q: 'Como resolver |x − 3| = 5?',
        a: 'Leia como “a distância de x até 3 é 5”, dando x = 3 + 5 = 8 ou x = 3 − 5 = −2. Algebricamente, divida em casos: x − 3 = 5 dá x = 8, e x − 3 = −5 dá x = −2. Ambos conferem: |8 − 3| = 5 e |−2 − 3| = 5.',
      },
    ],
    related: [
      '/pt/math-functions/square-root/',
      '/pt/learn/what-is-a-function/',
      '/pt/math-functions/quadratic/',
      '/pt/graphing-calculator/',
    ],
  },
  {
    slug: 'reciprocal',
    name: 'Recíproca',
    displayName: 'Função Recíproca',
    notation: 'f(x) = 1/x',
    expression: '1/x',
    tagline: 'A hipérbole 1/x — dois ramos espelhados divididos por assíntotas em ambos os eixos.',
    description:
      'Grafique f(x) = 1/x na calculadora gráfica: os dois ramos da hipérbole, assíntotas em ambos os eixos, simetria ímpar e modelos de proporção inversa.',
    intro: [
      'A função recíproca f(x) = 1/x é o gráfico da proporção inversa: dobre a entrada, reduza a saída à metade. Seu gráfico é uma hipérbole com dois ramos — um no primeiro quadrante varrendo de +∞ em direção ao eixo x, outro no terceiro quadrante subindo de −∞ em direção a ele — separados por uma lacuna intransponível em x = 0. A curva nunca toca nenhum dos eixos: o eixo y (x = 0) é uma assíntota vertical e o eixo x (y = 0) é uma horizontal.',
      'Onde quer que uma quantidade seja dividida por outra, a recíproca espreita: com tensão fixa, a corrente é proporcional a 1/R (lei de Ohm); com quantidade fixa de gás, a pressão é proporcional a 1/V (lei de Boyle); o tempo para concluir um trabalho é proporcional a 1/(trabalhadores). A função é a própria inversa — aplicá-la duas vezes devolve x — e ímpar, com simetria rotacional de 180° em torno da origem. Digite 1/x na calculadora e afaste o zoom: os ramos se achatam contra os eixos, mas nunca pousam.',
    ],
    sections: [
      {
        heading: 'O que é a recíproca',
        body: [
          'Tomar uma recíproca significa dividir 1 pela entrada: 1/2 = 0,5, 1/4 = 0,25, 1/0,5 = 2. Entradas pequenas produzem saídas enormes e entradas enormes produzem saídas minúsculas — a gangorra definidora da proporção inversa. Como 1/(1/x) = x, a função é uma involução: ela se desfaz sozinha, de modo que seu gráfico é simétrico em relação à reta y = x, a marca registrada das funções inversas.',
          'A função é ímpar, f(−x) = −f(x): o ramo do terceiro quadrante é o ramo do primeiro quadrante girado 180° em torno da origem. Pontos notáveis são (1, 1) e (−1, −1), os únicos pontos onde entrada é igual à saída (resolver 1/x = x dá x² = 1). Em todos os outros lugares, entrada e saída diferem — dramaticamente perto do zero.',
        ],
      },
      {
        heading: 'Duas assíntotas, dois ramos',
        body: [
          'x = 0 é uma assíntota vertical: quando x → 0⁺, os valores → +∞; quando x → 0⁻, eles → −∞; e 1/0 é indefinido — divisão por zero não tem significado, de modo que os ramos nunca podem se unir. y = 0 é uma assíntota horizontal: quando |x| → ∞, os valores → 0, aproximando-se do eixo x cada vez mais sem alcançá-lo. Os eixos são paredes que a curva se aproxima, mas nunca toca.',
          'Cada ramo é estritamente decrescente: em (0, ∞), um x maior dá um 1/x menor, e o mesmo vale em (−∞, 0). Mas a função como um todo não é decrescente — ela salta de −∞ para +∞ através da lacuna no zero. A derivada f′(x) = −1/x² é negativa onde quer que esteja definida, confirmando a descida em cada ramo, e a curva é convexa em (0, ∞) e côncava em (−∞, 0).',
        ],
      },
      {
        heading: 'Onde a recíproca aparece',
        body: [
          'A proporcionalidade inversa está em toda parte na ciência: a lei de Boyle (P ∝ 1/V), a lei de Ohm (I = V/R), a equação das lentes 1/f = 1/dₒ + 1/dᵢ, e as forças gravitacionais e eletrostáticas caindo como 1/r². Em cada caso, dobrar o denominador reduz o resultado à metade — a assinatura da recíproca. Frequência e período são recíprocos (f = 1/T): um período de 0,01 s é um tom de 100 Hz.',
          'No cálculo, 1/x é famosa como a função cuja primitiva não é uma potência: ∫(1/x)dx = ln|x| + C, a integral que forçou a invenção do logaritmo. Sua integral imprópria de 1 a ∞ diverge (a prima contínua da série harmônica), mas a mesma forma girada dá a trombeta de Gabriel — volume finito, área de superfície infinita.',
        ],
      },
    ],
    keyFacts: [
      'Domínio: todo x real ≠ 0; imagem: todo y real ≠ 0. Indefinida em x = 0.',
      'Hipérbole com dois ramos: (0, ∞) dá valores positivos, (−∞, 0) dá valores negativos.',
      'Assíntota vertical x = 0; assíntota horizontal y = 0.',
      'Função ímpar: f(−x) = −f(x); simetria rotacional de 180° em torno da origem; é a própria inversa.',
      'Passa por (1, 1) e (−1, −1); estritamente decrescente em cada ramo.',
      'Derivada f′(x) = −1/x²; a primitiva é ln|x| + C.',
    ],
    faqs: [
      {
        q: 'Por que 1/0 é indefinido?',
        a: 'A divisão pergunta “o que vezes o divisor dá o dividendo?” — nenhum número vezes 0 dá 1, então 1/0 não tem resposta. No gráfico, isso aparece como a assíntota vertical: os valores explodem para ±∞ perto do zero, mas nunca se estabilizam em um valor no próprio zero.',
      },
      {
        q: '1/x é crescente ou decrescente?',
        a: 'Decrescente em cada um de seus dois intervalos — escolha dois números positivos quaisquer e a entrada maior dá a saída menor — mas não decrescente como um todo, porque salta de −∞ para +∞ através de x = 0. A derivada −1/x² é negativa em todos os lugares onde a função está definida, o que só fala do comportamento dentro de cada ramo.',
      },
      {
        q: 'Qual é a integral de 1/x?',
        a: 'ln|x| + C. A regra da potência ∫xⁿ dx = x^(n+1)/(n+1) falha em n = −1 (divisão por zero), de modo que 1/x precisa de sua própria primitiva — historicamente, esta integral é como o logaritmo natural foi definido pela primeira vez. O valor absoluto mantém a fórmula válida também para x negativo.',
      },
    ],
    related: [
      '/pt/learn/asymptotes-explained/',
      '/pt/math-functions/natural-logarithm/',
      '/pt/learn/understanding-integrals/',
      '/pt/graphing-calculator/',
    ],
  },
];
