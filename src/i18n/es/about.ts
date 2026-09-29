/**
 * Diccionario español de about — textos de la página `/about/`.
 *
 * Los enlaces del creador son identificadores nominales (URLs exactas de la
 * página) y NO SE TRADUCEN; solo las etiquetas de los enlaces y el texto que
 * los rodea son cadenas del diccionario.
 */

export const about = {
  seo: {
    title: 'Acerca de',
    description:
      'Qué es Graphing Calculator: características, cómo funciona el motor matemático y ' +
      'cómo se manejan tus datos.',
  },
  crumbs: [{ label: 'Inicio', href: '/' }],
  heading: 'Acerca de',
  intro: [
    'Graphing Calculator es una herramienta matemática original, basada en el navegador, ' +
      'para graficar funciones y explorar las matemáticas. Es una implementación ' +
      'independiente: construida desde cero, sin derivarse de ningún otro producto de graficación.',
    'Lo que hace hoy: graficar funciones cartesianas, curvas paramétricas, ecuaciones ' +
      'polares y desigualdades en una gráfica interactiva en canvas con zoom, desplazamiento ' +
      'y soporte táctil; analizar expresiones con métodos numéricos reales (raíces con el ' +
      'método de Brent, derivadas con diferencias centrales, integrales con la regla de ' +
      'Simpson adaptativa, tablas, rectas tangentes); animar parámetros con variables y ' +
      'controles deslizantes; recibir ayuda en lenguaje sencillo de un asistente de IA que ' +
      'emite comandos de la calculadora mientras el motor matemático hace los cálculos ' +
      'reales; y guardar, compartir, importar y exportar estados de gráficas.',
  ],
  creator: {
    heading: 'Sobre el creador',
    imageAlt: 'Firoz Khan, creador de Graphing Calculator',
    name: 'Firoz Khan',
    body: 'Graphing Calculator está creada y mantenida por Firoz Khan. Conéctate con él aquí:',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/firoz-khan-1153358a/' },
      { label: 'GitHub', href: 'https://github.com/fkdigitalmedia' },
      { label: 'Instagram', href: 'https://www.instagram.com/rtibyfiroz/' },
    ],
  },
  sections: [
    {
      heading: 'Cómo se manejan tus datos',
      body: [
        'Todo se ejecuta en tu dispositivo. Las gráficas que guardas se almacenan en el ' +
          'almacenamiento local de tu navegador; los enlaces para compartir codifican el ' +
          'estado de la gráfica en la propia URL. No hay cuentas, no hay analíticas de ' +
          'seguimiento activadas por defecto y la calculadora no envía datos personales a ' +
          'ningún servidor. Las solicitudes al asistente de IA solo llegan al proveedor de IA ' +
          'configurado cuando usas el asistente.',
      ],
    },
    {
      heading: 'Honestidad sobre los resultados',
      body: [
        'Los métodos numéricos son aproximaciones, y la calculadora lo dice donde importa: ' +
          'cuando una raíz, una derivada o una integral no se puede calcular —una esquina, ' +
          'un salto, una singularidad— la herramienta lo informa con honestidad en lugar de ' +
          'devolver un número engañoso.',
      ],
    },
    {
      heading: 'Cómo revisamos el contenido',
      body: [
        'Cada guía de este sitio se revisa por precisión matemática antes de publicarse. Los ' +
          'datos matemáticos de cada guía —raíces, dominios, valores de ejemplo— se verifican ' +
          'con el propio motor de expresiones del sitio, el mismo código que potencia la ' +
          'calculadora, para que lo que lees coincida con lo que la herramienta calcula.',
        'Un revisor humano del equipo de Graphing Calculator lee después cada guía para ' +
          'comprobar su claridad y corrección. Cuando se encuentra un error —un signo ' +
          'equivocado, un ejemplo engañoso, un paso que se salta demasiado— se corrige antes ' +
          'de publicar la guía, y la guía lleva una fecha de «Última revisión» para que ' +
          'puedas ver cuándo se hizo esa comprobación.',
      ],
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
};
