/**
 * Diccionario español 3D — textos de la página `/3d/` más las cadenas de la
 * isla Graph3D (aún sin conectar; ver docs/I18N-CONTRACTS.md).
 */

export const graph3d = {
  seo: {
    title: 'Graficador 3D — Grafica superficies z = f(x, y) online | Graphing Calculator',
    description:
      'Graficador 3D online gratis: grafica superficies z = f(x, y) con rotación ' +
      'arrastrando, zoom y detalle ajustable. Prueba los predefinidos paraboloide, ondas y silla.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Graficador 3D', href: '/3d/' },
  ],
  heading: 'Graficador 3D',
  intro: [
    'Grafica cualquier superficie z = f(x, y) en tu navegador, sin descargas ni complementos. Escribe una expresión con x e y, arrastra para orbitar a su alrededor, desplázate o pellizca para acercar, y sube el detalle de la malla para afinar la superficie.',
    'El graficador usa el mismo motor de expresiones que la calculadora gráfica 2D, así que cada función que ya conoces —sin, cos, sqrt, ^ y más— funciona aquí también. Donde una función no está definida, la superficie muestra un hueco honesto en lugar de una falsa estela.',
  ],
  sections: [
    {
      heading: 'Cómo funciona la rotación 3D',
      body: [
        'Arrastrar la gráfica orbita una cámara virtual alrededor de la superficie: los arrastres horizontales cambian el acimut (la dirección de la brújula desde la que miras) y los verticales cambian la elevación (la altura de la cámara sobre el plano xy). Desplazarte o pellizcar acerca o aleja la cámara. Si usas teclado, enfoca la gráfica y usa las flechas para rotar y + / − para acercar.',
        'La superficie se dibuja con el algoritmo del pintor: cada celda de la malla se proyecta con una cámara de perspectiva real, se ordena de atrás hacia adelante por profundidad y se dibuja de la más lejana a la más cercana con sombreado por profundidad. La geometría más cercana oculta así lo que está detrás, lo que le da a la gráfica su sensación de profundidad sólida. Si dejas la gráfica quieta unos segundos, rota lentamente por sí sola, a menos que tengas activada la preferencia de movimiento reducido, en cuyo caso permanece perfectamente quieta.',
      ],
    },
    {
      heading: 'Lo que muestran los predefinidos',
      body: [
        'Paraboloide (x²+y²) es el cuenco clásico: z crece con la distancia al origen en todas direcciones, con su mínimo de 0 en (0, 0). Es el análogo 3D de la parábola y = x².',
        'Ondulación (sin(√(x²+y²))) dibuja ondas concéntricas que irradian desde el origen: el valor depende solo de la distancia al origen, así que cada curva de nivel es un círculo. Es una buena forma de ver cómo luce la simetría radial como superficie.',
        'Silla (x²−y²) se curva hacia arriba a lo largo del eje x y hacia abajo a lo largo del eje y. El origen es un punto de silla: un mínimo en una dirección y un máximo en otra, la versión 3D de un punto crítico tipo inflexión.',
      ],
    },
    {
      heading: 'Renderizado honesto: huecos y escala de z',
      body: [
        'Los puntos indefinidos se convierten en huecos, nunca en suposiciones. Grafica 1/(x²+y²) y verás cómo la malla se rompe alrededor de la singularidad en el origen, igual que la graficadora 2D rompe una curva en una asíntota vertical.',
        'Las superficies muy altas se reducen uniformemente en z para que quepan en pantalla: el graficador te dice el factor de escala (por ejemplo, «eje z autoescalado ×0.22»). La forma y los valores mínimo y máximo de z reportados siguen siendo fieles a tu expresión; solo las proporciones verticales se comprimen para visualizarlas.',
      ],
    },
  ],
  faqs: [
    {
      question: '¿Qué expresiones puedo graficar en 3D?',
      answer:
        'Cualquier expresión en las variables x e y, con las mismas funciones que la ' +
        'calculadora 2D: potencias (x^2), raíces (sqrt), funciones trigonométricas (sin, cos, ' +
        'tan), exponenciales, logaritmos y constantes como pi. Cualquier otra cosa —por ' +
        'ejemplo una variable z suelta— se rechaza con un mensaje de error claro en lugar de ' +
        'graficar silenciosamente algo incorrecto.',
    },
    {
      question: '¿Por qué mi superficie tiene agujeros?',
      answer:
        'Los agujeros son huecos honestos donde tu función no está definida: división entre ' +
        'cero, raíz cuadrada de un número negativo o logaritmo de un número no positivo. El ' +
        'renderizador omite esas celdas en lugar de dibujar un pico engañoso a través de la ' +
        'singularidad.',
    },
    {
      question: '¿Qué cambia el ajuste de Detalle?',
      answer:
        'Fija la resolución de la malla: cuántas divisiones de la cuadrícula se muestrean en ' +
        'cada eje (24, 36, 48 o 64). Más detalle dibuja una superficie más suave pero evalúa ' +
        'la función más veces (64² = 4225 puntos por redibujado), así que empieza con poco en ' +
        'teléfonos antiguos.',
    },
    {
      question: '¿El graficador 3D funciona en el móvil?',
      answer:
        'Sí. Un dedo arrastra para rotar, pellizcar con dos dedos acerca, y arrastrar con dos ' +
        'dedos rota con sensibilidad reducida. El diseño es móvil primero y el canvas se ' +
        'dimensiona según su contenedor con escalado por densidad de píxeles para líneas nítidas.',
    },
    {
      question: '¿La gráfica 3D es precisa?',
      answer:
        'La superficie se muestrea a partir de tu expresión exacta en cada punto de la ' +
        'malla: sin estimación de IA ni suavizado de las matemáticas subyacentes. Entre ' +
        'puntos de la malla, la superficie conecta las muestras con celdas rectas, así que ' +
        'los rasgos muy afilados pueden verse algo facetados con poco detalle; sube el ajuste ' +
        'de Detalle para afinar la malla.',
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/learn/'],
  island: {
    surfaceLabel: 'Superficie: z = f(x, y)',
    placeholder: 'p. ej. x^2 + y^2',
    plot: 'Graficar',
    emptyError: 'Escribe una expresión en x e y, por ejemplo x^2+y^2.',
    genericError: 'No se pudo graficar esa expresión.',
    parseError: 'No se pudo interpretar esa expresión.',
    unknownVariablesTemplate:
      'Variable{plural} desconocida{plural}: {names}. Las superficies 3D solo usan x e y.',
    presetGroup: 'Superficies predefinidas',
    presets: [
      {
        label: 'Paraboloide',
        description: 'Un cuenco que se abre hacia arriba; mínimo 0 en el origen.',
      },
      { label: 'Ondulación', description: 'Ondas concéntricas que irradian desde el origen.' },
      {
        label: 'Silla',
        description:
          'Se curva hacia arriba en x y hacia abajo en y: un punto de silla en el origen.',
      },
    ],
    detailGroup: 'Resolución de la malla',
    detailLabel: 'Detalle:',
    hint: 'Arrastra para rotar · desplázate o pellizca para acercar · enfoca la gráfica y usa las flechas / + / −',
    zMin: 'z mín',
    zMax: 'z máx',
    autoScaledTemplate: '(eje z autoescalado ×{scale} para ajustarse)',
    noFiniteGrid: 'No hay valores finitos en esta malla: prueba con otra expresión.',
    canvasAriaTemplate:
      'Gráfica 3D de la superficie z igual a {expression}. {stats}' +
      'Arrastra para rotar, desplázate o pellizca para acercar. Al enfocarla, las flechas rotan y más/menos acercan.',
    canvasAriaEmpty: 'Graficador de superficies 3D. Aún no hay ninguna expresión graficada.',
    summaryTemplate: 'Resumen de la superficie: z = {expression} con x e y de -5 a 5. {stats}',
    summaryStatsTemplate:
      'z mínima {zMin}, z máxima {zMax}, calculado en {count} puntos de la malla.',
    summaryNoFinite: 'No hay valores finitos de z en la malla actual.',
    summaryEmpty: 'No hay superficie graficada.',
    canvasAriaStatsTemplate: 'Con x e y de -5 a 5, z varía de {zMin} a {zMax}. ',
    canvasAriaNoFiniteStats: 'Sin valores finitos en la cuadrícula actual. ',
  },
};
