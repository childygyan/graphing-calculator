/**
 * Dicionário português de scientific — o texto da página `/scientific-calculator/`
 * mais as strings do island ScientificCalculator.
 *
 * Os `label`s das teclas são o que o usuário vê nas teclas; os `ariaLabel`s são os
 * nomes acessíveis. O texto `insert` que cada tecla digita é sintaxe de expressão e
 * NÃO é traduzido — ele fica com o componente.
 */

import type { ScientificStrings } from '../types.js';

export const scientific: ScientificStrings = {
  seo: {
    title: 'Calculadora científica online — Grátis com modos DEG/RAD | Graphing Calculator',
    description:
      'Calculadora científica online grátis: trig, trig inversa, log, ln, potências, raízes, ' +
      'π e e com modos DEG/RAD, suporte a teclado e mensagens de erro claras.',
  },
  crumbs: [
    { label: 'Início', href: '/' },
    { label: 'Calculadora científica', href: '/scientific-calculator/' },
  ],
  heading: 'Calculadora científica',
  intro: [
    'Uma calculadora científica online grátis para a matemática do dia a dia: aritmética com a ' +
      'ordem correta das operações, funções trigonométricas e trigonométricas inversas, ' +
      'logaritmos de base 10 e naturais, potências, raízes e as constantes π e e. Digite no ' +
      'teclado ou toque no teclado numérico — todo cálculo roda no seu navegador pelo mesmo ' +
      'motor de expressões da nossa calculadora gráfica.',
  ],
  sections: [
    {
      heading: 'O que esta calculadora faz',
      body: [
        'Digite qualquer expressão — por exemplo sin(30) + √(16), log(1000) ou 2^10 — e pressione = para avaliá-la. A calculadora segue a precedência padrão (parênteses, depois potências, depois multiplicação e divisão, depois adição e subtração), então 2 + 3 × 4 resulta em 14, não 20.',
        'Além da aritmética, você tem o conjunto científico completo: sin, cos, tan e suas inversas asin, acos, atan; log (base 10) e ln (logaritmo natural); potências xʸ incluindo expoentes fracionários; raízes quadradas; e as constantes π e e. As expressões podem ser aninhadas livremente, ex.: sin(π/6)^2 + cos(π/6)^2.',
      ],
    },
    {
      heading: 'Graus vs. radianos (modos DEG e RAD)',
      body: [
        'Ângulos podem ser medidos em graus ou radianos, e as funções trigonométricas dão respostas diferentes dependendo do que você quer dizer: sin(30°) = 0,5, mas sin(30 radianos) ≈ −0,988. O alternador DEG/RAD no canto superior esquerdo do teclado numérico alterna entre os dois, e o selo acima do visor sempre mostra o modo ativo.',
        'No modo DEG, sin, cos e tan leem a entrada como graus, enquanto asin, acos e atan reportam seus resultados em graus — igual ao comportamento de uma calculadora científica física. No modo RAD, tudo funciona em radianos, que é o que a maioria das fórmulas de cálculo e física espera. Se um resultado trigonométrico parecer errado, o modo de ângulo é a primeira coisa a verificar.',
      ],
    },
    {
      heading: 'Atalhos de teclado',
      body: [
        'Você nunca precisa tocar no teclado numérico: clique no campo de expressão e digite. Dígitos, +, −, (, ), ^ e . funcionam como digitados; digitar * insere × e / insere ÷; Enter ou = avalia; Escape limpa tudo; Backspace apaga normalmente. Após um resultado, digitar um dígito inicia uma nova expressão, enquanto digitar um operador continua a partir da resposta anterior.',
      ],
    },
    {
      heading: 'Erros honestos, não NaN',
      body: [
        'Quando uma expressão não tem resposta significativa, esta calculadora diz isso em linguagem simples em vez de mostrar NaN ou Infinity. Divisão por zero, raiz quadrada de número negativo ou logaritmo de número não positivo geram cada um uma explicação específica. Expressões incompletas também recebem orientação: um operador no final ou parênteses desemparelhados dizem exatamente o que corrigir.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Devo usar o modo DEG ou RAD?',
      answer:
        'Use DEG para problemas de ângulo do dia a dia (uma inclinação de 30°, um triângulo com ' +
        'ângulos em graus) e RAD para cálculo, fórmulas de física e qualquer coisa envolvendo π ' +
        'como ângulo. O modo afeta apenas sin, cos, tan, asin, acos e atan — todo o resto é ' +
        'idêntico.',
    },
    {
      question: 'Qual a diferença entre log e ln?',
      answer:
        'A tecla log calcula o logaritmo de base 10 (log 1000 = 3) e ln calcula o logaritmo ' +
        'natural, base e (ln(e) = 1). Ambos são indefinidos para zero e números negativos, e a ' +
        'calculadora avisará você.',
    },
    {
      question: 'Por que 1 ÷ 0 mostra um erro em vez de infinito?',
      answer:
        'Divisão por zero é indefinida na matemática — não tem um único valor significativo. ' +
        'Mostrar "infinito" seria enganoso (1 ÷ 0 e −1 ÷ 0 não podem ser ambos infinito), então ' +
        'a calculadora o reporta honestamente como indefinido.',
    },
    {
      question: 'Posso digitar expressões com o teclado?',
      answer:
        'Sim. Foque o campo de expressão e digite normalmente; Enter avalia e Escape limpa. A ' +
        'tecla * insere ×, / insere ÷ e ^ é o operador de potência, então 2^10 resulta em 1024.',
    },
    {
      question: 'Quão precisos são os resultados?',
      answer:
        'Os resultados são mostrados com 10 dígitos significativos, calculados em ponto ' +
        'flutuante de precisão dupla — a mesma aritmética de uma calculadora científica física. ' +
        'Resultados muito grandes que transbordam são reportados como estouro em vez de infinito.',
    },
    {
      question: 'Posso traçar uma expressão em vez de apenas avaliá-la?',
      answer:
        'Sim — a calculadora gráfica deste site traça funções de x com zoom, rastreamento, ' +
        'análise de raízes e de retas tangentes. Ela usa o mesmo motor de expressões, então tudo ' +
        'o que você avalia aqui se comporta de forma idêntica lá.',
    },
  ],
  related: ['/graphing-calculator/', '/calculators/', '/calculators/derivative/', '/learn/'],
  island: {
    heading: 'Calculadora científica',
    title: 'Científica',
    angleModeLabel: 'Modo de ângulo',
    angleModeTemplate: 'Modo de ângulo: {mode}',
    degrees: 'graus',
    radians: 'radianos',
    expressionLabel: 'Expressão',
    expressionPlaceholder: 'Digite uma expressão',
    resultLabel: 'Resultado',
    fractionToggle: 'Fração ↔ Decimal',
    copyResult: 'Copiar resultado',
    copied: 'Copiado',
    memoryLabel: 'Memória',
    memoryClear: 'Limpar memória',
    memoryRecall: 'Recuperar memória',
    memoryAdd: 'Somar o resultado à memória',
    memorySubtract: 'Subtrair o resultado da memória',
    undo: 'Desfazer',
    redo: 'Refazer',
    functionRowsLabel: 'Funções científicas',
    loadFailedTitle: 'Falha ao carregar a calculadora científica',
    keypadLabel: 'Teclado da calculadora',
    historyTitle: 'Histórico',
    historyEmptyTitle: 'Um pequeno espaço para o seu trabalho.',
    historyEmptyBody: 'Seus cálculos aparecerão aqui. Selecione um para usá-lo novamente.',
    historyStoredNote: 'Últimos 50 cálculos · salvos neste navegador',
    historyClear: 'Limpar histórico',
    historyReuse: 'Reutilizar cálculo',
    footerEnter: 'Enter para calcular',
    footerDevice: 'Calculado no seu dispositivo',
    keys: {
      sin: { label: 'sin', ariaLabel: 'seno', altLabel: 'asin', altAriaLabel: 'arco seno' },
      cos: { label: 'cos', ariaLabel: 'cosseno', altLabel: 'acos', altAriaLabel: 'arco cosseno' },
      tan: { label: 'tan', ariaLabel: 'tangente', altLabel: 'atan', altAriaLabel: 'arco tangente' },
      log: {
        label: 'log',
        ariaLabel: 'logaritmo base 10',
        altLabel: '10ˣ',
        altAriaLabel: 'dez elevado a x',
      },
      ln: {
        label: 'ln',
        ariaLabel: 'logaritmo natural',
        altLabel: 'eˣ',
        altAriaLabel: 'e elevado a x',
      },
      pow: { label: 'xʸ', ariaLabel: 'potência' },
      sqrt: { label: '√', ariaLabel: 'raiz quadrada' },
      square: { label: 'x²', ariaLabel: 'quadrado' },
      reciprocal: { label: '1/x', ariaLabel: 'inverso' },
      abs: { label: '|x|', ariaLabel: 'valor absoluto' },
      factorial: { label: 'n!', ariaLabel: 'fatorial' },
      ncr: { label: 'nCr', ariaLabel: 'combinações' },
      shift: { label: '2nd', ariaLabel: 'segundas funções' },
      lparen: { label: '(', ariaLabel: 'parêntese esquerdo' },
      rparen: { label: ')', ariaLabel: 'parêntese direito' },
      ac: { label: 'AC', ariaLabel: 'limpar' },
      backspace: { label: '⌫', ariaLabel: 'apagar' },
      pi: { label: 'π', ariaLabel: 'pi' },
      d7: { label: '7', ariaLabel: '7' },
      d8: { label: '8', ariaLabel: '8' },
      d9: { label: '9', ariaLabel: '9' },
      div: { label: '÷', ariaLabel: 'dividir' },
      e: { label: 'e', ariaLabel: 'número e de Euler' },
      d4: { label: '4', ariaLabel: '4' },
      d5: { label: '5', ariaLabel: '5' },
      d6: { label: '6', ariaLabel: '6' },
      mul: { label: '×', ariaLabel: 'multiplicar' },
      ee: { label: 'EE', ariaLabel: 'vezes dez elevado a' },
      d1: { label: '1', ariaLabel: '1' },
      d2: { label: '2', ariaLabel: '2' },
      d3: { label: '3', ariaLabel: '3' },
      sub: { label: '−', ariaLabel: 'menos' },
      ans: { label: 'Ans', ariaLabel: 'resposta anterior' },
      negate: { label: '±', ariaLabel: 'trocar sinal' },
      d0: { label: '0', ariaLabel: '0' },
      dot: { label: '.', ariaLabel: 'ponto decimal' },
      add: { label: '+', ariaLabel: 'mais' },
      percent: { label: '%', ariaLabel: 'porcentagem' },
      npr: { label: 'nPr', ariaLabel: 'permutações' },
      equals: { label: '=', ariaLabel: 'igual' },
    },
    errors: {
      divisionByZero: 'Indefinido — divisão por zero.',
      sqrtNegative: 'Indefinido — a raiz quadrada de um número negativo não é um número real.',
      logNonPositive: 'Indefinido — o logaritmo de um número não positivo não é um número real.',
      asinAcosDomain: 'Indefinido — asin e acos precisam de um argumento entre −1 e 1.',
      tanUndefined: 'Indefinido — tan não está definida em múltiplos ímpares de 90°.',
      emptyExpression: 'Digite uma expressão primeiro.',
      trailingOperator: 'A expressão termina com um operador — adicione um número após ele.',
      mismatchedParens: 'Parênteses desemparelhados — todo "(" precisa de um ")" correspondente.',
      badCharTemplate: 'Não entendo o caractere "{char}" — remova-o e tente novamente.',
      unreadable: 'A expressão não pôde ser lida — verifique se há erros de digitação.',
      notReal: 'Indefinido — o resultado não é um número real.',
      overflow: 'Estouro — o resultado é grande demais para exibir.',
    },
  },
};
