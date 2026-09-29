/**
 * Diccionario español de scientific — textos de la página
 * `/scientific-calculator/` más las cadenas de la isla ScientificCalculator
 * (aún sin conectar; ver docs/I18N-CONTRACTS.md).
 *
 * Las `label` del teclado son lo que el usuario ve en las teclas; las
 * `ariaLabel` son los nombres accesibles. El texto `insert` que escribe cada
 * tecla es sintaxis de expresión y deliberadamente NO SE TRADUCE: vive en el
 * componente.
 */

export const scientific = {
  seo: {
    title: 'Calculadora científica online — Gratis con modos DEG/RAD | Graphing Calculator',
    description:
      'Calculadora científica online gratis: trigonometría, trigonometría inversa, log, ln, ' +
      'potencias, raíces, π y e, con modos DEG/RAD, soporte de teclado y mensajes de error claros.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Calculadora científica', href: '/scientific-calculator/' },
  ],
  heading: 'Calculadora científica',
  intro: [
    'Una calculadora científica online gratis para las matemáticas de todos los días: ' +
      'aritmética con el orden correcto de las operaciones, funciones trigonométricas y ' +
      'trigonométricas inversas, logaritmos en base 10 y naturales, potencias, raíces y las ' +
      'constantes π y e. Escribe con el teclado o toca el teclado numérico: cada cálculo se ' +
      'ejecuta en tu navegador con el mismo motor de expresiones que nuestra calculadora gráfica.',
  ],
  sections: [
    {
      heading: 'Qué hace esta calculadora',
      body: [
        'Escribe cualquier expresión —por ejemplo sin(30) + √(16), log(1000) o 2^10— y pulsa = para evaluarla. La calculadora sigue la precedencia estándar (paréntesis, luego potencias, luego multiplicación y división, luego suma y resta), así que 2 + 3 × 4 da 14, no 20.',
        'Más allá de la aritmética tienes el conjunto científico completo: sin, cos, tan y sus inversas asin, acos, atan; log (base 10) y ln (logaritmo natural); potencias xʸ incluyendo exponentes fraccionarios; raíces cuadradas; y las constantes π y e. Las expresiones se pueden anidar libremente, p. ej. sin(π/6)^2 + cos(π/6)^2.',
      ],
    },
    {
      heading: 'Grados frente a radianes (modos DEG y RAD)',
      body: [
        'Los ángulos se pueden medir en grados o en radianes, y las funciones trigonométricas dan respuestas distintas según cuál uses: sin(30°) = 0.5, pero sin(30 radianes) ≈ −0.988. El conmutador DEG/RAD en la parte superior izquierda del teclado cambia entre ambos, y la insignia sobre la pantalla muestra siempre el modo activo.',
        'En modo DEG, sin, cos y tan leen su entrada como grados, mientras que asin, acos y atan devuelven sus resultados en grados, igual que una calculadora científica física. En modo RAD todo funciona en radianes, que es lo que esperan la mayoría de las fórmulas de cálculo y física. Si un resultado trigonométrico parece incorrecto, lo primero que debes revisar es el modo de ángulo.',
      ],
    },
    {
      heading: 'Atajos de teclado',
      body: [
        'Nunca necesitas tocar el teclado numérico: haz clic en el campo de expresión y escribe. Los dígitos, +, −, (, ), ^ y . funcionan tal cual; escribir * inserta × y / inserta ÷; Intro o = evalúa; Escape lo borra todo; Retroceso borra como siempre. Tras un resultado, escribir un dígito empieza una expresión nueva, mientras que escribir un operador continúa desde la respuesta anterior.',
      ],
    },
    {
      heading: 'Errores honestos, no NaN',
      body: [
        'Cuando una expresión no tiene una respuesta con sentido, esta calculadora lo dice en lenguaje claro en lugar de mostrar NaN o Infinito. Dividir entre cero, tomar la raíz cuadrada de un número negativo o el logaritmo de un número no positivo producen cada uno una explicación específica. Las expresiones incompletas también reciben orientación: un operador al final o paréntesis sin cerrar te dicen exactamente qué corregir.',
      ],
    },
  ],
  faqs: [
    {
      question: '¿Debo usar el modo DEG o RAD?',
      answer:
        'Usa DEG para problemas de ángulos cotidianos (una pendiente de 30°, un triángulo con ' +
        'ángulos en grados) y RAD para cálculo, fórmulas de física y todo lo que use π como ' +
        'ángulo. El modo solo afecta a sin, cos, tan, asin, acos y atan; todo lo demás es idéntico.',
    },
    {
      question: '¿Cuál es la diferencia entre log y ln?',
      answer:
        'La tecla log calcula el logaritmo en base 10 (log 1000 = 3) y ln calcula el ' +
        'logaritmo natural, en base e (ln(e) = 1). Ambos están indefinidos para el cero y los ' +
        'números negativos, y la calculadora te lo dirá.',
    },
    {
      question: '¿Por qué 1 ÷ 0 muestra un error en lugar de infinito?',
      answer:
        'La división entre cero está indefinida en matemáticas: no tiene un único valor ' +
        'con sentido. Mostrar «infinito» sería engañoso (1 ÷ 0 y −1 ÷ 0 no pueden ser ambos ' +
        'infinito), así que la calculadora lo reporta con honestidad como indefinido.',
    },
    {
      question: '¿Puedo escribir expresiones con el teclado?',
      answer:
        'Sí. Enfoca el campo de expresión y escribe con normalidad; Intro evalúa y Escape ' +
        'borra. La tecla * inserta ×, / inserta ÷ y ^ es el operador de potencia, así que 2^10 ' +
        'da 1024.',
    },
    {
      question: '¿Qué precisión tienen los resultados?',
      answer:
        'Los resultados se muestran con 10 cifras significativas, calculados en coma flotante ' +
        'de doble precisión, la misma aritmética que usa una calculadora científica física. ' +
        'Los resultados muy grandes que desbordan se reportan como desbordamiento en lugar de ' +
        'infinito.',
    },
    {
      question: '¿Puedo graficar una expresión en lugar de solo evaluarla?',
      answer:
        'Sí: la calculadora gráfica de este sitio grafica funciones de x con zoom, trazado, ' +
        'raíces y análisis de rectas tangentes. Usa el mismo motor de expresiones, así que ' +
        'todo lo que evalúes aquí se comporta de forma idéntica allí.',
    },
  ],
  related: ['/graphing-calculator/', '/calculators/', '/calculators/derivative/', '/learn/'],
  island: {
    heading: 'Calculadora científica',
    title: 'Científica',
    angleModeLabel: 'Modo de ángulo',
    angleModeTemplate: 'Modo de ángulo: {mode}',
    degrees: 'grados',
    radians: 'radianes',
    expressionLabel: 'Expresión',
    expressionPlaceholder: 'Escribe una expresión',
    resultLabel: 'Resultado',
    fractionToggle: 'Fracción ↔ Decimal',
    copyResult: 'Copiar resultado',
    copied: 'Copiado',
    memoryLabel: 'Memoria',
    memoryClear: 'Borrar memoria',
    memoryRecall: 'Recuperar memoria',
    memoryAdd: 'Sumar el resultado a la memoria',
    memorySubtract: 'Restar el resultado de la memoria',
    undo: 'Deshacer',
    redo: 'Rehacer',
    functionRowsLabel: 'Funciones científicas',
    loadFailedTitle: 'Error al cargar la calculadora científica',
    keypadLabel: 'Teclado de la calculadora',
    historyTitle: 'Historial',
    historyEmptyTitle: 'Un pequeño espacio para tu trabajo.',
    historyEmptyBody: 'Tus cálculos aparecerán aquí. Selecciona uno para usarlo de nuevo.',
    historyStoredNote: 'Últimos 50 cálculos · guardados en este navegador',
    historyClear: 'Borrar historial',
    historyReuse: 'Reutilizar cálculo',
    footerEnter: 'Intro para calcular',
    footerDevice: 'Calculado en tu dispositivo',
    keys: {
      sin: { label: 'sin', ariaLabel: 'seno', altLabel: 'asin', altAriaLabel: 'arcoseno' },
      cos: { label: 'cos', ariaLabel: 'coseno', altLabel: 'acos', altAriaLabel: 'arcocoseno' },
      tan: { label: 'tan', ariaLabel: 'tangente', altLabel: 'atan', altAriaLabel: 'arcotangente' },
      log: {
        label: 'log',
        ariaLabel: 'logaritmo en base 10',
        altLabel: '10ˣ',
        altAriaLabel: 'diez elevado a x',
      },
      ln: {
        label: 'ln',
        ariaLabel: 'logaritmo natural',
        altLabel: 'eˣ',
        altAriaLabel: 'e elevado a x',
      },
      pow: { label: 'xʸ', ariaLabel: 'potencia' },
      sqrt: { label: '√', ariaLabel: 'raíz cuadrada' },
      square: { label: 'x²', ariaLabel: 'al cuadrado' },
      reciprocal: { label: '1/x', ariaLabel: 'inverso' },
      abs: { label: '|x|', ariaLabel: 'valor absoluto' },
      factorial: { label: 'n!', ariaLabel: 'factorial' },
      ncr: { label: 'nCr', ariaLabel: 'combinaciones' },
      shift: { label: '2nd', ariaLabel: 'segundas funciones' },
      lparen: { label: '(', ariaLabel: 'paréntesis izquierdo' },
      rparen: { label: ')', ariaLabel: 'paréntesis derecho' },
      ac: { label: 'AC', ariaLabel: 'borrar' },
      backspace: { label: '⌫', ariaLabel: 'retroceso' },
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
      ee: { label: 'EE', ariaLabel: 'por diez elevado a' },
      d1: { label: '1', ariaLabel: '1' },
      d2: { label: '2', ariaLabel: '2' },
      d3: { label: '3', ariaLabel: '3' },
      sub: { label: '−', ariaLabel: 'menos' },
      ans: { label: 'Ans', ariaLabel: 'respuesta anterior' },
      negate: { label: '±', ariaLabel: 'cambiar de signo' },
      d0: { label: '0', ariaLabel: '0' },
      dot: { label: '.', ariaLabel: 'punto decimal' },
      add: { label: '+', ariaLabel: 'más' },
      percent: { label: '%', ariaLabel: 'porcentaje' },
      npr: { label: 'nPr', ariaLabel: 'permutaciones' },
      equals: { label: '=', ariaLabel: 'igual' },
    },
    errors: {
      divisionByZero: 'Indefinido: división entre cero.',
      sqrtNegative: 'Indefinido: la raíz cuadrada de un número negativo no es un número real.',
      logNonPositive: 'Indefinido: el logaritmo de un número no positivo no es un número real.',
      asinAcosDomain: 'Indefinido: asin y acos necesitan un argumento entre −1 y 1.',
      tanUndefined: 'Indefinido: tan no está definida en múltiplos impares de 90°.',
      emptyExpression: 'Escribe primero una expresión.',
      trailingOperator: 'La expresión termina con un operador: añade un número después.',
      mismatchedParens: 'Paréntesis sin cerrar: cada «(» necesita su «)» correspondiente.',
      badCharTemplate: 'No entiendo el carácter «{char}»: elimínalo e inténtalo de nuevo.',
      unreadable: 'No se pudo leer la expresión: revisa si hay errores de escritura.',
      notReal: 'Indefinido: el resultado no es un número real.',
      overflow: 'Desbordamiento: el resultado es demasiado grande para mostrarse.',
    },
  },
};
