/**
 * Diccionario español de la página de inicio.
 */

export const home = {
  seo: {
    title: 'Calculadora gráfica online gratis | Graphing Calculator',
    description:
      'Calculadora gráfica online gratis: grafica funciones, analiza raíces, derivadas e ' +
      'integrales, explora con controles deslizantes y recibe ayuda matemática de la IA. Sin registro.',
  },
  hero: {
    title: 'Calculadora gráfica',
    subtitle:
      'Grafica funciones matemáticas en tu navegador: rápida, accesible y gratis. Traza ' +
      'expresiones, analízalas con métodos numéricos reales y pide ayuda al asistente de IA. ' +
      'Sin registro ni descargas.',
    primaryCta: 'Abrir la calculadora gráfica',
    secondaryCta: 'Aprender a graficar',
  },
  features: {
    ariaLabel: 'Características',
    cards: [
      {
        title: 'Gráficas interactivas',
        description: 'Acerca, desplaza y explora',
        body:
          'Una gráfica en canvas rápida con cuadrícula adaptativa, zoom suave hacia el cursor, ' +
          'desplazamiento y soporte táctil. Grafica funciones cartesianas, curvas paramétricas, ' +
          'ecuaciones polares y desigualdades, cada expresión con su propio color y control de ' +
          'visibilidad.',
        cta: 'Abrir la calculadora',
        href: '/graphing-calculator/',
      },
      {
        title: 'Análisis matemático real',
        description: 'Raíces, derivadas, integrales',
        body:
          'Encuentra raíces con el método de Brent, calcula derivadas e integrales definidas ' +
          'numéricamente, inspecciona tablas de valores y traza rectas tangentes, todo con el ' +
          'mismo motor, que informa con honestidad cuando un resultado no se puede calcular.',
        cta: 'Probar las herramientas matemáticas',
        href: '/calculators/',
      },
      {
        title: 'Asistente matemático con IA',
        description: 'Pregunta en lenguaje natural',
        body:
          'Haz preguntas en lenguaje sencillo: el asistente las convierte en comandos de la ' +
          'calculadora, grafica lo que pides y explica paso a paso. El motor matemático siempre ' +
          'hace los cálculos reales; la IA nunca inventa resultados.',
        cta: 'Preguntar al asistente',
        href: '/graphing-calculator/',
      },
      {
        title: 'Variables, controles deslizantes y compartir',
        description: 'Explora y comparte',
        body:
          'Define variables, anímalas con controles deslizantes, guarda gráficas con nombre en ' +
          'tu navegador y comparte gráficas como enlaces compactos. Tu espacio de trabajo ' +
          'persiste entre visitas: todo permanece en tu dispositivo.',
        cta: 'Ver ejemplos de gráficas',
        href: '/examples/',
      },
    ],
  },
  explore: {
    ariaLabel: 'Explorar',
    heading: 'Explora las matemáticas',
    cards: [
      {
        title: 'Biblioteca de funciones',
        body: 'Seno, cuadráticas, exponenciales y más, cada una con propiedades calculadas.',
        href: '/math-functions/',
      },
      {
        title: 'Ejemplos de gráficas',
        body: 'Gráficas seleccionadas que se abren precargadas en la calculadora, con notas.',
        href: '/examples/',
      },
      {
        title: 'Aprender a graficar',
        body: 'Guías breves sobre funciones, derivadas, integrales y asíntotas.',
        href: '/learn/',
      },
    ],
  },
  tutorial: {
    ariaLabel: 'Tutorial',
    heading: 'Cómo usar la calculadora gráfica',
    lede:
      'Cinco pasos, con la calculadora de arriba. Cada captura de pantalla es una imagen ' +
      'real de esta calculadora, sin maquetas.',
    steps: [
      {
        title: 'Escribe tu primera expresión',
        body:
          'Haz clic en el panel Expresiones y escribe x^2. La parábola se dibuja al instante ' +
          'mientras escribes: no hay nada que instalar ni ninguna cuenta que crear.',
        image: '/images/tutorial/step-1-first-expression.png',
        alt: 'Calculadora gráfica mostrando la parábola y = x al cuadrado',
      },
      {
        title: 'Compara dos curvas',
        body:
          'Haz clic en Añadir y escribe sin(x). Cada expresión tiene su propio color, y el ' +
          'icono del ojo muestra u oculta cada curva, para que puedas comparar formas una al ' +
          'lado de la otra.',
        image: '/images/tutorial/step-2-compare-curves.png',
        alt: 'Calculadora gráfica comparando la parábola y = x al cuadrado con una onda sinusoidal',
      },
      {
        title: 'Acerca y desplaza la gráfica',
        body:
          'Desplázate para acercar hacia el cursor y arrastra para mover la vista. Al acercar ' +
          'el vértice de x^2 se ve cómo la curva se aplana en (0, 0).',
        image: '/images/tutorial/step-3-zoom-in.png',
        alt: 'Vista ampliada de la parábola y = x al cuadrado alrededor de su vértice en (0, 0)',
      },
      {
        title: 'Encuentra dónde una curva cruza el eje x',
        body:
          'Para x^2 - 4, las raíces aparecen como marcadores directamente sobre la gráfica: ' +
          'en x = -2 y x = 2. El panel Análisis puede encontrar raíces, derivadas, ' +
          'integrales y más para cualquier expresión.',
        image: '/images/tutorial/step-4-roots.png',
        alt: 'Gráfica de y = x al cuadrado menos 4 con marcadores de raíz en x = -2 y x = 2',
      },
      {
        title: 'Dibuja una recta tangente',
        body:
          'Elige un punto de una curva — aquí x = 1 en x^2 — y la recta tangente aparece ' +
          'en (1, 1), con su pendiente calculada por el motor matemático.',
        image: '/images/tutorial/step-5-tangent.png',
        alt: 'Gráfica de y = x al cuadrado con una recta tangente en x = 1',
      },
    ],
  },
};
