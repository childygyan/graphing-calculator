/**
 * Diccionario español de calculators — el centro `/calculators/` más las
 * páginas de herramientas de derivadas, integrales y buscador de raíces, y
 * las cadenas de la isla MathTools (aún sin conectar; ver
 * docs/I18N-CONTRACTS.md).
 */

export const calculators = {
  index: {
    seo: {
      title:
        'Calculadoras — Gráficas, científica, 3D, derivadas, integrales y raíces | Graphing Calculator',
      description:
        'Explora la colección de calculadoras: la calculadora gráfica, la calculadora ' +
        'científica, gráficas de superficies 3D, más herramientas de derivadas, integrales ' +
        'y búsqueda de raíces. Gratis, sin registro.',
    },
    crumbs: [
      { label: 'Inicio', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
    ],
    heading: 'Calculadoras',
    intro:
      'Una pequeña colección de herramientas matemáticas especializadas. Cada una aparece ' +
      'aquí solo cuando funciona de verdad: nada es una entrada de relleno.',
    tools: [
      {
        title: 'Calculadora gráfica',
        description: 'El espacio de trabajo principal',
        blurb:
          'Grafica expresiones cartesianas, paramétricas y polares con una gráfica ' +
          'interactiva en canvas, analiza raíces, derivadas e integrales, anima variables ' +
          'con controles deslizantes y pregunta al asistente de IA.',
        href: '/graphing-calculator/',
        cta: 'Abrir la calculadora gráfica',
      },
      {
        title: 'Calculadora de derivadas',
        description: 'f′(a) numéricamente',
        blurb:
          'Escribe cualquier función f(x) y un punto a para estimar la derivada f′(a) con ' +
          'el método de diferencias centrales: la misma rutina detrás de las rectas tangentes ' +
          'de la gráfica.',
        href: '/calculators/derivative/',
        cta: 'Derivar una función',
      },
      {
        title: 'Calculadora de integrales',
        description: 'Integrales definidas',
        blurb:
          'Calcula ∫[a,b] f(x) dx numéricamente con la regla de Simpson adaptativa, con una ' +
          'explicación del área con signo y de cuándo las integrales se anulan.',
        href: '/calculators/integral/',
        cta: 'Integrar una función',
      },
      {
        title: 'Buscador de raíces',
        description: 'Resuelve f(x) = 0',
        blurb:
          'Encuentra cada raíz real de f(x) en un intervalo que elijas, con barrido por ' +
          'cambios de signo refinado con el método de Brent: verificado, nunca supuesto.',
        href: '/calculators/root-finder/',
        cta: 'Buscar raíces',
      },
      {
        title: 'Calculadora científica',
        description: 'Trigonometría, logaritmos, potencias y más',
        blurb:
          'Una calculadora completa con teclado: funciones trigonométricas e inversas con ' +
          'modos DEG/RAD, logaritmos, potencias, raíces y constantes, con mensajes de error ' +
          'honestos en lugar de NaN silenciosos.',
        href: '/scientific-calculator/',
        cta: 'Calcular',
      },
      {
        title: 'Gráfica 3D',
        description: 'Superficies z = f(x, y)',
        blurb:
          'Grafica superficies 3D como x²+y² o sin(√(x²+y²)). Arrastra para rotar, ' +
          'desplázate para acercar y ajusta el detalle de la malla: renderizado en vivo en ' +
          'canvas con huecos honestos donde la función no está definida.',
        href: '/3d/',
        cta: 'Explorar superficies 3D',
      },
    ],
    related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
  },
  derivative: {
    seo: {
      title: 'Calculadora de derivadas — Calcula f′(x) al instante | Graphing Calculator',
      description:
        'Calculadora de derivadas online gratis: escribe cualquier función f(x) y un punto ' +
        'para obtener f′(a) numéricamente, con una explicación de qué significa la derivada.',
    },
    crumbs: [
      { label: 'Inicio', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Calculadora de derivadas', href: '/calculators/derivative/' },
    ],
    heading: 'Calculadora de derivadas',
    intro: [
      'La derivada de una función en un punto mide su razón de cambio instantánea: ' +
        'geométricamente, la pendiente de la recta tangente a la gráfica en ese punto. ' +
        'Escribe cualquier función abajo y esta herramienta estima f′(a) numéricamente.',
    ],
    sections: [
      {
        heading: 'Cómo funciona el cálculo',
        body: [
          'Esta herramienta usa la fórmula de diferencias centrales: f′(a) ≈ (f(a + h) − f(a − h)) / 2h, ' +
            'con un paso h pequeño. Es el mismo método numérico que la calculadora gráfica usa ' +
            'para su análisis de rectas tangentes, así que los resultados coinciden con lo que ves ' +
            'al inspeccionar una tangente en la gráfica.',
          'La diferenciación numérica es una aproximación. Para funciones suaves como ' +
            'polinomios, funciones trigonométricas y exponenciales, la estimación es precisa ' +
            'hasta muchos decimales. En esquinas afiladas (como |x| en x = 0) o discontinuidades, ' +
            'la derivada puede no existir, y la herramienta te lo dirá con honestidad en lugar de ' +
            'devolver un número engañoso.',
        ],
      },
      {
        heading: 'Qué te dice la derivada',
        body: [
          'Una derivada positiva significa que la función crece en ese punto; una derivada ' +
            'negativa significa que decrece. Cuanto mayor la magnitud, más empinada la gráfica. ' +
            'Donde la derivada es cero, la gráfica se aplana momentáneamente: son las ' +
            'ubicaciones candidatas para máximos y mínimos locales.',
          'Las derivadas también tienen significado físico: si f(x) es la posición en el ' +
            'tiempo, f′(x) es la velocidad; si f(x) es la velocidad, f′(x) es la aceleración. ' +
            'Prueba f(x) = x² en a = 2 (resultado: 4) y en a = −2 (resultado: −4) para ver el ' +
            'cambio de signo al cruzar el mínimo.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Es una derivada simbólica exacta?',
        answer:
          'No: esta herramienta calcula una aproximación numérica con el método de ' +
          'diferencias centrales. Es muy precisa para funciones suaves, pero sigue siendo una ' +
          'estimación, mostrada redondeada a 6 decimales.',
      },
      {
        question: '¿Por qué falla en algunos puntos?',
        answer:
          'Algunas funciones no son derivables en todas partes: |x| tiene una esquina en x = 0, ' +
          'y las funciones con saltos o asíntotas verticales no tienen una pendiente con sentido ' +
          'allí. La herramienta informa que no puede estimar la derivada en lugar de suponerla.',
      },
      {
        question: '¿Qué relación tiene con la función de recta tangente?',
        answer:
          'La recta tangente a f en x = a tiene pendiente f′(a), exactamente lo que calcula ' +
          'esta herramienta. En la calculadora gráfica puedes dibujar la recta tangente sobre la ' +
          'gráfica y leer visualmente la misma pendiente.',
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
      expressionPlaceholder: 'p. ej. x^2',
      atLabel: 'en a =',
      atPlaceholder: 'p. ej. 2',
      calculate: 'Calcular f′(a)',
      fillError: 'Escribe una función y un punto.',
      parseError: 'No se pudo interpretar f(x). Revisa la expresión.',
      badPoint: 'El punto a debe ser un número.',
      resultTemplate: 'f′({a}) ≈ {value}',
      noDerivative:
        'No se pudo estimar la derivada aquí: la función puede no estar definida o no ser ' +
        'suave en este punto.',
      loadFailedTitle: 'Error al cargar la herramienta de derivadas',
      panelTitle: 'Derivar',
      functionNameLabel: 'Función f(x)',
      examplePlaceholder: 'p. ej. x^2 - 4',
      pointLabel: 'Punto a',
      compute: 'Calcular f′(a)',
      pointFiniteError: 'Introduce un número finito para el punto.',
      notDifferentiableError:
        'No se pudo estimar la derivada en ese punto (es posible que la función no sea derivable en ese punto).',
      estimateError: 'No se pudo estimar la derivada en ese punto.',
      resultLineTemplate: "f'({a}) ≈ {value}",
      parseFallback: 'No se pudo analizar esa expresión.',
    },
  },
  integral: {
    seo: {
      title: 'Calculadora de integrales — Integrales definidas online | Graphing Calculator',
      description:
        'Calculadora de integrales online gratis: calcula integrales definidas ∫[a,b] f(x) dx ' +
        'numéricamente con la regla de Simpson adaptativa, explicada paso a paso.',
    },
    crumbs: [
      { label: 'Inicio', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Calculadora de integrales', href: '/calculators/integral/' },
    ],
    heading: 'Calculadora de integrales',
    intro: [
      'La integral definida de f desde a hasta b mide el área con signo entre la gráfica ' +
        'y el eje x en ese intervalo. Escribe una función y los límites abajo para calcularla ' +
        'numéricamente.',
    ],
    sections: [
      {
        heading: 'Cómo funciona el cálculo',
        body: [
          'Esta herramienta usa la regla de Simpson adaptativa: aproxima la función con ' +
            'parábolas en subintervalos pequeños y subdivide recursivamente donde la estimación ' +
            'aún no es lo bastante precisa. Es la misma rutina de cuadratura detrás de las ' +
            'regiones de integral sombreadas en la calculadora gráfica, así que los números coinciden.',
          'Como el método es adaptativo, las funciones suaves convergen rápido mientras que ' +
            'las regiones difíciles —picos afilados, oscilaciones— reciben automáticamente más ' +
            'subdivisiones. El resultado se redondea a 6 decimales; la estimación subyacente ' +
            'suele ser precisa mucho más allá.',
        ],
      },
      {
        heading: 'Cómo leer el resultado',
        body: [
          'El área sobre el eje x cuenta positiva y el área bajo el eje cuenta negativa, así ' +
            'que una integral puede ser cero aunque la función no lo sea: por ejemplo, ∫[−1,1] x³ dx = 0 ' +
            'porque los dos lóbulos se cancelan exactamente. Si quieres el área geométrica total, ' +
            'integra el valor absoluto en su lugar.',
          'Las integrales también acumulan cantidades: si f(x) es una razón (litros por ' +
            'minuto, digamos), la integral sobre un intervalo de tiempo es la cantidad total. ' +
            'Prueba f(x) = x² de 0 a 1 (resultado: 1/3 ≈ 0.333333), un clásico que todo ' +
            'estudiante de cálculo conoce.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Es una evaluación exacta con antiderivada?',
        answer:
          'No: la herramienta integra numéricamente con la regla de Simpson adaptativa en ' +
          'lugar de buscar una antiderivada simbólica. Para funciones bien comportadas la ' +
          'aproximación es precisa hasta muchos decimales.',
      },
      {
        question: '¿Por qué mi integral es cero si la función claramente tiene área?',
        answer:
          'La integral definida es área con signo: las regiones bajo el eje x restan de las ' +
          'regiones sobre él. Funciones simétricas como sin(x) en [0, 2π] integran exactamente ' +
          'cero por esta razón.',
      },
      {
        question: '¿Qué pasa si la función no está definida en algún punto del intervalo?',
        answer:
          'Las funciones con singularidades dentro de [a, b] (como 1/x cruzando x = 0) no ' +
          'tienen integrales definidas ordinarias allí. La herramienta informará que la ' +
          'integral no se pudo estimar en lugar de devolver un número incorrecto.',
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
      title: 'Calculadora de integral definida',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'p. ej. x^2',
      fromLabel: 'desde a =',
      toLabel: 'hasta b =',
      fromPlaceholder: '0',
      toPlaceholder: '1',
      calculate: 'Calcular integral',
      fillError: 'Escribe una función y ambos límites.',
      parseError: 'No se pudo interpretar f(x). Revisa la expresión.',
      badBounds: 'Los límites a y b deben ser números.',
      resultTemplate: '∫[{a}, {b}] f(x) dx ≈ {value}',
      noConvergence: 'La integral no se pudo estimar en este intervalo.',
      loadFailedTitle: 'Error al cargar la herramienta de integrales',
      panelTitle: 'Integrar',
      functionNameLabel: 'Función f(x)',
      examplePlaceholder: 'p. ej. x^2 - 4',
      lowerBoundLabel: 'Límite inferior',
      upperBoundLabel: 'Límite superior',
      boundsFiniteError: 'Introduce números finitos para ambos límites.',
      estimateError: 'No se pudo estimar la integral en ese intervalo.',
      parseFallback: 'No se pudo analizar esa expresión.',
    },
  },
  rootFinder: {
    seo: {
      title: 'Buscador de raíces — Resuelve f(x) = 0 online | Graphing Calculator',
      description:
        'Buscador de raíces online gratis: escribe cualquier función f(x) y un intervalo para ' +
        'encontrar todas sus raíces (intersecciones con el eje x) con el método de Brent, con ' +
        'informes honestos.',
    },
    crumbs: [
      { label: 'Inicio', href: '/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Buscador de raíces', href: '/calculators/root-finder/' },
    ],
    heading: 'Buscador de raíces',
    intro: [
      'Una raíz de f es un valor x donde f(x) = 0: los puntos donde la gráfica cruza o toca ' +
        'el eje x. Escribe una función y un intervalo de búsqueda abajo para encontrar cada ' +
        'raíz dentro de él.',
    ],
    sections: [
      {
        heading: 'Cómo funciona el cálculo',
        body: [
          'La herramienta primero barre el intervalo buscando cambios de signo y luego refina ' +
            'cada raíz acotada con el método de Brent: un algoritmo robusto que combina la ' +
            'seguridad de la bisección con la velocidad de la secante y la interpolación ' +
            'cuadrática inversa. Es la misma rutina que la calculadora gráfica usa para su ' +
            'análisis de raíces.',
          'Las raíces donde la función apenas toca el eje sin cambiar de signo (como x² en ' +
            'x = 0) se encuentran con un barrido separado sensible a extremos, ya que la ' +
            'detección pura de cambios de signo las pasaría por alto. Cada raíz reportada se ' +
            'verifica evaluando f en el resultado.',
        ],
      },
      {
        heading: 'Consejos para buenos resultados',
        body: [
          'Elige un intervalo que acote las raíces que te interesan: la herramienta solo ' +
            'busca donde le indiques. Para x² − 4 en [−10, 10] encuentra −2 y 2; reduce el ' +
            'intervalo a [0, 10] y reporta solo 2.',
          'Si no se reporta ninguna raíz, o la función realmente no tiene ninguna en el ' +
            'intervalo (como x² + 1 en la recta real) o las raíces están exactamente en los ' +
            'extremos de tu intervalo: ajusta un poco los límites e inténtalo de nuevo.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Puede encontrar raíces complejas (no reales)?',
        answer:
          'No: esta herramienta solo encuentra raíces reales. Funciones como x² + 1 no tienen ' +
          'raíces reales, así que la herramienta informa con honestidad que no hay ninguna en ' +
          'ningún intervalo real.',
      },
      {
        question: '¿Por qué pasó por alto una raíz que veo en la gráfica?',
        answer:
          'La causa más común es una raíz exactamente en un extremo del intervalo o una raíz ' +
          'que el paso del barrido salta en una función que oscila con violencia. Estrecha el ' +
          'intervalo alrededor de la raíz sospechosa y busca de nuevo.',
      },
      {
        question: '¿Qué precisión tienen las raíces reportadas?',
        answer:
          'El método de Brent converge hasta casi la precisión de la máquina; los valores ' +
          'reportados se redondean a 6 decimales. Sustituir una raíz reportada en f(x) da un ' +
          'valor extremadamente cercano a cero.',
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
      title: 'Buscador de raíces',
      functionLabel: 'f(x) =',
      expressionPlaceholder: 'p. ej. x^2 - 4',
      fromLabel: 'desde',
      toLabel: 'hasta',
      fromPlaceholder: '-10',
      toPlaceholder: '10',
      calculate: 'Buscar raíces',
      fillError: 'Escribe una función y un intervalo de búsqueda.',
      parseError: 'No se pudo interpretar f(x). Revisa la expresión.',
      badInterval: 'Los límites del intervalo deben ser números.',
      rootsFoundTemplate: '{count} cero{plural} encontrado{plural}:',
      noneFound: 'No se encontraron raíces en este intervalo.',
      loadFailedTitle: 'Error al cargar el buscador de raíces',
      panelTitle: 'Encontrar raíces',
      functionNameLabel: 'Función f(x)',
      intervalStartLabel: 'Inicio del intervalo',
      intervalEndLabel: 'Fin del intervalo',
      intervalValidError: 'Introduce un intervalo válido con límite inferior < límite superior.',
      noRootsTemplate: 'No se encontraron raíces en [{a}, {b}].',
      rootsListTemplate: 'Raíces en [{a}, {b}]: {roots}',
      searchError: 'No se pudieron encontrar raíces en ese intervalo.',
      parseFallback: 'No se pudo analizar esa expresión.',
    },
  },
};
