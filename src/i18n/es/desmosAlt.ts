/**
 * Diccionario español de desmos-alternative — textos de la página
 * `/desmos-alternative/`.
 *
 * Restricciones legales (de la fuente de la página, no debilitarlas):
 * «Desmos» aparece solo en uso nominal y comparativo; sobre Desmos solo se
 * presentan datos públicos y conocidos; sin reseñas, valoraciones,
 * estadísticas ni cifras de usuarios.
 */

export const desmosAlt = {
  seo: {
    title: 'Mejor alternativa a Desmos — Calculadora gráfica gratis | Graphing Calculator',
    description:
      '¿Buscas una alternativa a Desmos? Graphing Calculator es una calculadora gráfica ' +
      'online gratis e independiente, con gráficas 2D/3D, ayuda de IA y herramientas de análisis.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Alternativa a Desmos', href: '/desmos-alternative/' },
  ],
  heading: 'Mejor alternativa a Desmos — Calculadora gráfica online gratis',
  asideAriaLabel: 'Aviso de independencia',
  disclaimer:
    'Producto independiente. Graphing Calculator no está afiliada a Desmos ni a Amplify, ' +
    'ni cuenta con su respaldo ni tiene conexión con ellas. «Desmos» se usa en esta página ' +
    'únicamente para describir aquello de lo que este sitio es una alternativa.',
  sections: [
    {
      heading: 'Desmos frente a Graphing Calculator',
      body: [
        'Mucha gente busca en la web una calculadora Desmos cuando necesita graficar una ' +
          'función rápidamente. Si eres una de esas personas, Graphing Calculator es una ' +
          'alternativa gratis e independiente que puedes usar ahora mismo: sin registro, sin ' +
          'descargas, sin cuenta.',
        'Una comparación lado a lado de lo básico. Sobre Desmos, esta tabla solo presenta ' +
          'datos públicos y conocidos: nada supuesto ni sin verificar.',
      ],
    },
    {
      heading: 'Lo que obtienes con Graphing Calculator',
      body: [
        'La calculadora gráfica 2D grafica funciones al instante mientras escribes, con zoom ' +
          'hacia el cursor, desplazamiento y soporte táctil. Añade controles deslizantes para ' +
          'explorar parámetros en vivo, cambia al modo paramétrico o polar, o sombrea ' +
          'desigualdades, todo en la misma vista.',
        'Para tres dimensiones, el graficador de superficies 3D dibuja z = f(x, y) con ' +
          'controles orbitales, zoom, control de resolución y superficies predefinidas, ' +
          'compiladas por el propio motor matemático del sitio.',
        'El análisis integrado encuentra raíces, intersecciones, derivadas, integrales, ' +
          'límites y extremos, y dibuja rectas tangentes y normales directamente sobre la ' +
          'gráfica. Las calculadoras matemáticas independientes cubren las mismas operaciones ' +
          'paso a paso, y las guías de aprendizaje explican las ideas que hay detrás.',
        'Incluye un asistente matemático con IA para explicar conceptos y ayudar a ' +
          'configurar gráficas. Hasta que el propietario del sitio configure una clave de ' +
          'API funciona en un modo simulado claramente etiquetado: la calculadora en sí, ' +
          'nunca la IA, es la fuente de verdad de los resultados.',
        'Cada gráfica se puede compartir como un enlace que reabre exactamente la misma ' +
          'vista, sin necesidad de cuenta en ningún extremo. Y no hay nada que aceptar más ' +
          'allá de lo básico: sin cuentas, sin cookies, sin rastreadores de terceros.',
      ],
      links: [
        { label: 'La calculadora gráfica 2D', href: '/graphing-calculator/' },
        { label: 'graficador de superficies 3D', href: '/3d/' },
        { label: 'calculadoras matemáticas independientes', href: '/calculators/' },
        { label: 'guías de aprendizaje', href: '/learn/' },
      ],
    },
  ],
  faqs: [
    {
      question: '¿Está afiliado a Desmos?',
      answer:
        'No. Graphing Calculator es un producto independiente. No está afiliada a Desmos ' +
        'ni a Amplify, ni cuenta con su respaldo ni tiene conexión con ellas. El nombre ' +
        '«Desmos» aparece en esta página únicamente para describir aquello de lo que este ' +
        'sitio es una alternativa.',
    },
    {
      question: '¿Graphing Calculator es gratis?',
      answer:
        'Sí. Graphing Calculator es gratis, y no hay registro: el sitio no tiene cuentas en ' +
        'absoluto.',
    },
    {
      question: '¿Necesito una cuenta para guardar o compartir gráficas?',
      answer:
        'No. No hay cuentas que crear. Puedes convertir cualquier gráfica en un enlace ' +
        'compartible que reabre exactamente la misma vista, y quien abra el enlace tampoco ' +
        'necesita cuenta.',
    },
    {
      question: '¿Puedo graficar en 3D?',
      answer:
        'Sí. Graphing Calculator incluye un graficador interactivo de superficies 3D para ' +
        'funciones de la forma z = f(x, y), con controles orbitales, zoom, control de ' +
        'resolución y superficies predefinidas.',
    },
    {
      question: '¿Tiene un asistente de IA?',
      answer:
        'Sí. El asistente matemático con IA integrado puede explicar conceptos y ayudarte a ' +
        'configurar gráficas. Hasta que el propietario del sitio configure una clave de API ' +
        'funciona en un modo simulado claramente etiquetado, y la calculadora en sí —no la ' +
        'IA— es siempre la fuente de verdad de los resultados.',
    },
    {
      question: '¿Qué herramientas de análisis incluye?',
      answer:
        'Raíces, intersecciones, derivadas, integrales, límites, extremos y rectas ' +
        'tangentes/normales: todo calculado por el propio motor matemático del sitio y ' +
        'dibujado directamente sobre la gráfica.',
    },
  ],
  table: {
    caption: 'Comparación de lo básico: Desmos frente a Graphing Calculator',
    headers: ['Característica', 'Desmos', 'Graphing Calculator'],
    rows: [
      { feature: 'Precio', ours: 'Gratis', theirs: 'Gratis' },
      {
        feature: '¿Requiere registro?',
        ours: 'No: el sitio no tiene cuentas en absoluto',
        theirs: 'No: la graficación básica funciona sin cuenta',
      },
      {
        feature: 'Gráficas 2D',
        ours: 'Sí: con controles deslizantes, modos paramétrico y polar, y desigualdades',
        theirs: 'Sí',
      },
    ],
  },
  related: ['/graphing-calculator/', '/calculators/', '/learn/'],
};
