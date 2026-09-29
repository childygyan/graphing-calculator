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
};
