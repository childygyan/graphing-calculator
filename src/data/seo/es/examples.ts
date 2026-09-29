/**
 * Gráficas de ejemplo seleccionadas en español.
 *
 * Cada ejemplo precarga expresiones reales en la calculadora mediante un
 * enlace `#s=…` construido en tiempo de compilación, así que el botón
 * «Abrir en la calculadora» abre exactamente la gráfica descrita.
 * Los slugs, las expresiones, los viewports y las etiquetas matemáticas
 * NO SE TRADUCEN; la prosa sí. Las rutas `related` llevan prefijo `/es/`.
 */
import type { ExampleGraphData } from '../types.js';

export const EXAMPLE_GRAPHS: ExampleGraphData[] = [
  {
    slug: 'trigonometric-interference',
    title: 'Interferencia trigonométrica: sin(x) + cos(2x)',
    description:
      'Descubre qué pasa cuando dos ondas trigonométricas se combinan. Abre este ejemplo interactivo de sin(x) + cos(2x) en la calculadora gráfica.',
    expressions: [
      { kind: 'cartesian', rhs: 'sin(x)', label: 'sin(x)' },
      { kind: 'cartesian', rhs: 'cos(2*x)', label: 'cos(2x)' },
      { kind: 'cartesian', rhs: 'sin(x) + cos(2*x)', label: 'sin(x) + cos(2x)' },
    ],
    story: [
      'Cuando dos ondas viajan por el mismo medio, sus desplazamientos se suman punto por punto —un fenómeno llamado superposición. Graficar sin(x), cos(2x) y su suma en los mismos ejes hace visible esta suma: en cada x, la altura de la curva combinada es exactamente la suma de las alturas de las dos curvas componentes.',
      'Observa que la suma no es simplemente una onda senoidal más grande. El término cos(2x) oscila al doble de velocidad, así que alternativamente refuerza y cancela la onda sin(x). Donde ambas ondas alcanzan su pico juntas, la suma llega a sus puntos más altos; donde una está en una cresta y la otra en un valle, se cancelan parcialmente. Son las mismas matemáticas detrás de las pulsaciones del sonido y los patrones de interferencia de la luz.',
    ],
    insights: [
      'La onda combinada sin(x) + cos(2x) es periódica, pero su forma es más compleja que la de cada componente por separado.',
      'Activa y desactiva cada expresión en la calculadora para aislar la contribución de cada onda.',
      'Prueba cambiar cos(2*x) por cos(3*x) y observa cómo una segunda onda más rápida cambia el patrón de interferencia.',
    ],
    related: [
      '/es/math-functions/sine/',
      '/es/math-functions/cosine/',
      '/es/examples/damped-oscillation/',
      '/es/learn/what-is-a-function/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'projectile-motion',
    title: 'Movimiento de proyectil: graficar una pelota lanzada',
    description:
      'Modela la altura de una pelota lanzada con una función cuadrática. Abre este ejemplo de proyectil y halla su altura máxima en la calculadora.',
    expressions: [{ kind: 'cartesian', rhs: '-4.9*x^2 + 20*x + 1.5', label: 'height(x)' }],
    viewport: { xMin: -1, xMax: 5, yMin: -5, yMax: 25 },
    story: [
      'La altura de una pelota lanzada hacia arriba sigue una función cuadrática del tiempo: la gravedad tira con aceleración constante, así que la altura es una parábola que se abre hacia abajo. Aquí, -4.9x² + 20x + 1.5 modela una pelota lanzada a 20 metros por segundo desde una altura de 1.5 metros (el 4.9 viene de la mitad de la aceleración gravitatoria terrestre, 9.8 m/s²).',
      'El vértice de la parábola es el momento en que la pelota alcanza su punto más alto —el instante en que su velocidad es cero antes de empezar a caer. Como la parábola es simétrica, la pelota tarda en aterrizar lo mismo que tardó en subir. Las dos intersecciones con el eje x marcan el lanzamiento (cerca de x = 0) y el aterrizaje; solo la raíz positiva tiene sentido físico.',
    ],
    insights: [
      'El vértice de la parábola da la altura máxima y el momento en que se alcanza.',
      'La intersección positiva con el eje x es cuando la pelota toca el suelo —encuéntrala con el buscador de raíces.',
      'El coeficiente -4.9 controla lo «ancho» que es el vuelo; una mayor velocidad de lanzamiento (el término 20x) alarga el vuelo.',
    ],
    related: [
      '/es/math-functions/quadratic/',
      '/es/calculators/root-finder/',
      '/es/learn/what-is-a-function/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'damped-oscillation',
    title: 'Oscilación amortiguada: e^(-x/2) · cos(3x)',
    description:
      'Explora una onda que decae y modela muelles y circuitos reales. Abre este ejemplo de oscilación amortiguada en la calculadora gráfica interactiva.',
    expressions: [
      { kind: 'cartesian', rhs: 'exp(-x/2) * cos(3*x)', label: 'e^(-x/2)·cos(3x)' },
      { kind: 'cartesian', rhs: 'exp(-x/2)', label: 'envelope e^(-x/2)' },
      { kind: 'cartesian', rhs: '-exp(-x/2)', label: 'envelope -e^(-x/2)' },
    ],
    viewport: { xMin: -1, xMax: 15, yMin: -2, yMax: 2 },
    story: [
      'Una cuerda de guitarra pulsada, la suspensión de un coche al pasar un bache y un circuito RLC comparten la misma forma matemática: una oscilación cuya amplitud decae con el tiempo. Multiplicar cos(3x) por la exponencial decreciente exp(-x/2) produce exactamente eso —cada oscilación es una fracción fija de la anterior.',
      'Las dos curvas envolventes, ±exp(-x/2), son los «rieles» entre los que viaja la oscilación. La onda toca la envolvente superior exactamente en las crestas del coseno y la inferior en sus valles, y las envolventes en sí nunca oscilan. Esta separación entre «lo rápido que vibra» (el coseno) y «lo rápido que se apaga» (la exponencial) es por lo que los ingenieros analizan ambos factores por separado.',
    ],
    insights: [
      'La oscilación nunca sale de sus envolventes exponenciales.',
      'Aumentar el 3 en cos(3x) mete más oscilaciones en el mismo decaimiento; aumentar el 1/2 del exponente apaga el movimiento más rápido.',
      'Aleja la vista a lo largo del eje x para ver cómo la onda se asienta hacia cero —la firma matemática del amortiguamiento.',
    ],
    related: [
      '/es/math-functions/cosine/',
      '/es/math-functions/exponential/',
      '/es/examples/trigonometric-interference/',
      '/es/learn/understanding-derivatives/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'logistic-growth',
    title: 'Crecimiento logístico: la curva S de los recursos limitados',
    description:
      'Grafica la curva S que modela poblaciones con recursos limitados. Abre este ejemplo de crecimiento logístico en la calculadora gráfica.',
    expressions: [{ kind: 'cartesian', rhs: '10 / (1 + 9*exp(-x))', label: 'logistic' }],
    viewport: { xMin: -5, xMax: 10, yMin: -2, yMax: 12 },
    story: [
      'El crecimiento ilimitado es exponencial, pero las poblaciones reales chocan con límites: alimento, espacio o tamaño del mercado. La función logística 10 / (1 + 9·exp(-x)) empieza pareciendo exponencial, luego se dobla y se nivela en una capacidad de carga —aquí, 10. El resultado es la famosa curva S que se ve en colonias de bacterias, adopción de productos y propagación de ideas.',
      'La curva tiene un punto de inflexión donde pasa de acelerar a desacelerar —el momento de crecimiento más rápido, exactamente a mitad de camino hacia la capacidad de carga. Antes de ese punto la curva se dobla hacia arriba (el crecimiento se alimenta a sí mismo); después, se dobla hacia abajo a medida que el límite muerde. Encontrar ese punto de inflexión es una de las cosas más útiles que el cálculo puede hacer por un modelo.',
    ],
    insights: [
      'La asíntota horizontal y = 10 es la capacidad de carga a la que la curva se acerca sin superar nunca.',
      'La parte más empinada de la S es el punto de inflexión —donde el crecimiento es más rápido.',
      'Prueba 10 / (1 + 9*exp(-2*x)) para ver cómo una tasa de crecimiento mayor empina el centro de la S sin cambiar su techo.',
    ],
    related: [
      '/es/math-functions/exponential/',
      '/es/learn/asymptotes-explained/',
      '/es/learn/understanding-derivatives/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'lissajous-curve',
    title: 'Curva de Lissajous: arte paramétrico con ondas senoidales',
    description:
      'Dibuja una figura de Lissajous con ecuaciones paramétricas x = sin(3t), y = cos(2t). Abre este ejemplo paramétrico en la calculadora gráfica.',
    expressions: [
      {
        kind: 'parametric',
        xOfT: 'sin(3*t)',
        yOfT: 'cos(2*t)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'Lissajous 3:2',
      },
    ],
    viewport: { xMin: -1.5, xMax: 1.5, yMin: -1.5, yMax: 1.5 },
    story: [
      'Antes de que los osciloscopios tuvieran pantallas digitales, los físicos estudiaban cocientes de frecuencias alimentando dos ondas senoidales a las placas horizontal y vertical de un tubo de rayos catódicos. Los patrones luminosos que trazaban —figuras de Lissajous— revelan el cociente de las dos frecuencias de un vistazo. Aquí, x = sin(3t) oscila tres veces por cada dos oscilaciones de y = cos(2t), tejiendo un nudo cerrado y simétrico.',
      'Lo que hace imposible esta curva como gráfica regular y = f(x) es que falla la prueba de la recta vertical de forma estrepitosa: una sola x puede corresponder a muchos valores de y a medida que la curva se repliega sobre sí misma. Las ecuaciones paramétricas evitan esa limitación dando a x e y sus propias fórmulas en un parámetro compartido t —la misma idea que anima desde las manecillas de un reloj hasta las órbitas planetarias.',
    ],
    insights: [
      'El cociente de frecuencias 3:2 determina el patrón: cuenta los lóbulos que tocan cada lado del cuadrado que la encierra.',
      'Cambia sin(3*t) por sin(4*t) para una figura 4:2 y compara la simetría.',
      'Como t recorre 2π completos, la curva se cierra perfectamente —acorta el rango de t y observa cómo se convierte en un arco abierto.',
    ],
    related: [
      '/es/math-functions/sine/',
      '/es/math-functions/cosine/',
      '/es/learn/parametric-vs-cartesian/',
      '/es/examples/polar-rose/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'polar-rose',
    title: 'Rosa polar: r = 2·cos(3θ)',
    description:
      'Traza una rosa de tres pétalos con la ecuación polar r = 2cos(3θ). Abre este ejemplo de gráfica polar en la calculadora interactiva.',
    expressions: [
      {
        kind: 'polar',
        rOfTheta: '2*cos(3*theta)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'r = 2cos(3θ)',
      },
    ],
    viewport: { xMin: -2.5, xMax: 2.5, yMin: -2.5, yMax: 2.5 },
    story: [
      'En coordenadas polares, cada punto se describe con una distancia r al origen y un ángulo θ, y la ecuación r = 2·cos(3θ) dibuja una flor con exactamente tres pétalos. A medida que θ gira, r oscila entre -2 y 2 tres veces; los valores negativos de r se trazan en la dirección opuesta, que es lo que pliega los pétalos en su disposición simétrica.',
      'El número de pétalos sigue una regla simple: para r = a·cos(nθ) con n impar, la rosa tiene exactamente n pétalos. Prueba valores pares de n en la calculadora y obtendrás el doble —el patrón se duplica porque la curva necesita una vuelta extra completa para cerrarse. Pocas ecuaciones muestran el poder de las coordenadas polares con tanta elegancia como la rosa.',
    ],
    insights: [
      'Un coeficiente impar (3) da 3 pétalos; prueba 2*cos(4*theta) para ver cómo el caso par produce 8.',
      'La amplitud 2 fija la longitud del pétalo —el punto más lejano al origen.',
      'Cada pétalo se traza exactamente una vez cuando θ va de 0 a π; la segunda mitad los repasa.',
    ],
    related: [
      '/es/math-functions/cosine/',
      '/es/learn/parametric-vs-cartesian/',
      '/es/examples/lissajous-curve/',
      '/es/graphing-calculator/',
    ],
  },
];

export function getExampleBySlug(slug: string): ExampleGraphData | undefined {
  return EXAMPLE_GRAPHS.find((example) => example.slug === slug);
}
