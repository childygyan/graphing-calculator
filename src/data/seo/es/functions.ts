/**
 * Contenido educativo en español para las diez páginas de funciones notables.
 *
 * Cada `expression` la compila el propio motor matemático del proyecto al
 * generar la página para derivar raíces, extremos e intersecciones, así que
 * las expresiones usan solo sintaxis admitida por el motor. Toda la prosa
 * presenta solo datos matemáticamente ciertos: sin estadísticas, estudios
 * ni reseñas. Los slugs, la notación, las expresiones y las fechas
 * `reviewedOn` NO SE TRADUCEN.
 */
import type { FunctionPageData } from '../types.js';

export const FUNCTION_PAGES: FunctionPageData[] = [
  {
    slug: 'sine',
    name: 'Seno',
    displayName: 'Función seno',
    notation: 'f(x) = sin(x)',
    expression: 'sin(x)',
    tagline: 'La onda clásica de la trigonometría: una oscilación suave que se repite cada 2π.',
    description:
      'Grafica f(x) = sin(x): período 2π, amplitud, ceros y picos, simetría impar y el papel de la onda senoidal en el sonido, la luz y las oscilaciones.',
    intro: [
      'La función seno es una de las curvas más reconocibles de todas las matemáticas: una onda suave y repetitiva que oscila eternamente entre −1 y 1. Definida originalmente con triángulos rectángulos —el seno de un ángulo es el cociente entre el cateto opuesto y la hipotenusa—, se extiende de forma natural a todos los números reales midiendo los ángulos en radianes alrededor del círculo unitario. En el círculo unitario, sin(x) es simplemente la coordenada y del punto alcanzado tras rotar x radianes desde el eje x positivo.',
      'Como se repite cada 2π radianes, el seno es el prototipo de todo fenómeno periódico: la corriente alterna, las ondas sonoras, la luz, las mareas y la vibración de una cuerda de guitarra pueden describirse con ondas senoidales de distintas frecuencias y amplitudes. Escribe sin(x) en la calculadora gráfica para trazar la onda tú mismo; luego desplázala, estírala y combínala con otras expresiones para ver cómo se construyen las oscilaciones del mundo real a partir de esta única curva.',
    ],
    sections: [
      {
        heading: 'Qué es el seno',
        body: [
          'La definición con el círculo unitario es lo que permite al seno aceptar cualquier entrada real, no solo ángulos de un triángulo. Partiendo de (1, 0) y moviéndote en sentido antihorario por el círculo de radio 1, cada ángulo x cae en un punto cuya altura sobre el eje x es sin(x). Tras una vuelta completa de 2π radianes vuelves al punto de partida, y por eso la gráfica se repite: la historia de la función está escrita en la geometría del círculo.',
          'Esa geometría también explica la simetría de la onda: el seno es una función impar, es decir sin(−x) = −sin(x), así que la mitad izquierda de la gráfica es la mitad derecha rotada 180° sobre el origen. La gráfica cruza el eje x en cada múltiplo de π, alcanza su pico de 1 en π/2 más cada vuelta completa, y toca fondo en −1 en 3π/2 más cada vuelta completa.',
        ],
      },
      {
        heading: 'Amplitud, período y fase',
        body: [
          'Tres números describen cualquier onda senoidal: amplitud, período y fase. La amplitud es la altura de la onda: para sin(x) es 1, la distancia desde la línea media y = 0 hasta cada pico. Multiplicar por una constante, como en 3*sin(x), estira la onda verticalmente sin cambiar su forma, y así se modelan sonidos más fuertes y señales más intensas.',
          'El período es la longitud horizontal de un ciclo completo: 2π para sin(x). Escribir sin(2*x) comprime dos ondas completas en el mismo tramo, reduciendo el período a la mitad (π) y duplicando la frecuencia: el tono de una nota una octava más alta. Añadir un desfase, sin(x − π/2), desplaza toda la onda lateralmente, y por eso el coseno es en secreto un seno desplazado: cos(x) = sin(x + π/2).',
        ],
      },
      {
        heading: 'Dónde aparece el seno',
        body: [
          'Las ondas senoidales son los bloques de construcción del procesamiento de señales. Cualquier señal repetitiva —un tono musical, una emisión de radio, el zumbido de 50 o 60 Hz de la red eléctrica— puede descomponerse en una suma de ondas senoidales de distintas frecuencias, un hecho conocido como análisis de Fourier. Cuando dos ondas senoidales de frecuencias casi iguales se superponen, interfieren y producen pulsaciones, el efecto palpitante que oyes cuando dos instrumentos ligeramente desafinados tocan juntos.',
          'Más allá de las señales, el seno rige el movimiento armónico simple: el vaivén de una masa en un muelle, la oscilación de un péndulo pequeño y el subir y bajar de una boya flotante siguen curvas sinusoidales en el tiempo. En geometría y física, el seno proyecta una cantidad giratoria sobre un eje: la posición vertical de la cabina de una noria a lo largo del tiempo traza exactamente sin(x).',
        ],
      },
    ],
    keyFacts: [
      'Dominio: todos los números reales; rango: −1 ≤ sin(x) ≤ 1.',
      'Período 2π: sin(x + 2π) = sin(x) para todo x.',
      'Función impar: sin(−x) = −sin(x); la gráfica tiene simetría rotacional de 180° sobre el origen.',
      'Ceros en x = nπ; máximos de 1 en x = π/2 + 2πn; mínimos de −1 en x = 3π/2 + 2πn.',
      'Intersección con el eje y en (0, 0); la derivada es cos(x); una antiderivada es −cos(x).',
    ],
    faqs: [
      {
        q: '¿Por qué la gráfica del seno es una onda?',
        a: 'Porque el seno mide la altura en el círculo unitario mientras rotas. Dar la vuelta al círculo hace que la altura suba y baje suavemente y se repita en cada vuelta completa, así que la gráfica de la altura frente al ángulo es una onda. La onda es suave porque la rotación es continua: no hay esquinas ni saltos.',
      },
      {
        q: '¿Cuál es la diferencia entre seno y coseno?',
        a: 'Son la misma onda desplazada lateralmente: cos(x) = sin(x + π/2). En el círculo unitario, el coseno es la coordenada x mientras que el seno es la coordenada y. El coseno empieza en su máximo, cos(0) = 1, mientras que el seno empieza en cero, sin(0) = 0.',
      },
      {
        q: '¿sin(x) supera alguna vez el 1?',
        a: 'No: para x real, |sin(x)| ≤ 1 siempre. En el círculo unitario, la coordenada y nunca puede ser mayor en magnitud que el radio, que es 1. (El seno de números complejos sí puede superar 1 en magnitud, pero la gráfica real de la calculadora se mantiene dentro de [−1, 1].)',
      },
    ],
    related: [
      '/es/math-functions/cosine/',
      '/es/math-functions/tangent/',
      '/es/examples/trigonometric-interference/',
      '/es/examples/damped-oscillation/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'cosine',
    name: 'Coseno',
    displayName: 'Función coseno',
    notation: 'f(x) = cos(x)',
    expression: 'cos(x)',
    tagline:
      'El hermano par del seno, con forma de onda: el coseno empieza en su pico y se repite cada 2π.',
    description:
      'Grafica f(x) = cos(x): período 2π, amplitud, intersecciones y extremos, simetría par y los usos del coseno en ondas, fases y movimiento.',
    intro: [
      'El coseno es la contraparte horizontal del seno: en el círculo unitario da la coordenada x del punto en el ángulo x, mientras que el seno da la coordenada y. Esa única diferencia moldea todo sobre su gráfica: empieza en su valor máximo de 1 cuando x = 0, baja a −1 en x = π y vuelve a 1 en x = 2π, trazando la misma onda suave que el seno pero desplazada un cuarto de vuelta. Como el seno, oscila eternamente entre −1 y 1 y se repite cada 2π radianes.',
      'El coseno aparece donde algo se proyecta sobre un eje horizontal o parte de un máximo: la sombra de una rueda giratoria, el voltaje de un circuito de corriente alterna medido desde su pico, o la coordenada x de un movimiento circular uniforme. Como cos(x) = sin(x + π/2), todo lo que puedas decir de las ondas senoidales vale para las cosenoidales con un desfase: escribe cos(x) en la calculadora y arrastra la vista para verla repetirse.',
    ],
    sections: [
      {
        heading: 'Qué es el coseno',
        body: [
          'Imagina un punto que viaja en sentido antihorario por el círculo unitario, partiendo de (1, 0). En el ángulo x su posición es (cos x, sin x): el coseno registra lo lejos a la derecha o a la izquierda que está el punto. En x = 0 el punto está en el extremo derecho, así que cos(0) = 1, la intersección con el eje y de la gráfica. A medida que el ángulo crece, el punto se balancea a la izquierda y el coseno cae suavemente pasando por 0 en x = π/2 hasta −1 en x = π, el extremo izquierdo del círculo.',
          'El coseno es una función par, cos(−x) = cos(x), así que su gráfica es una imagen especular respecto al eje y: el lado izquierdo refleja exactamente el derecho. Cruza el cero en x = π/2 + nπ, a medio camino entre cada pico y cada valle, y sus máximos de 1 ocurren en x = 2πn mientras que los mínimos de −1 ocurren en x = π + 2πn. La familiar forma de onda proviene de la misma geometría circular que el seno, vista de lado.',
        ],
      },
      {
        heading: 'Coseno, seno y desfases',
        body: [
          'La identidad cos(x) = sin(x + π/2) dice que ambas funciones son una onda vista desde dos puntos de partida: el coseno es lo que el seno parece un cuarto de período antes. Esto importa al modelar oscilaciones reales, porque elegir entre seno y coseno es solo elegir cuándo pones en marcha tu reloj: un muelle soltado desde el reposo en su máxima elongación sigue un coseno en el tiempo, mientras que uno empujado pasando por el equilibrio sigue un seno.',
          'Los desfases también explican sumas como sin(x) + cos(x): combinar dos ondas de la misma frecuencia siempre produce otra onda de esa frecuencia, aquí √2·sin(x + π/4), un hecho que se deduce de las fórmulas de suma de ángulos. En la calculadora, grafica sin(x) y cos(x) juntas y añade una tercera expresión sin(x) + cos(x) para ver cómo la suma sigue siendo una onda perfecta.',
        ],
      },
      {
        heading: 'Dónde aparece el coseno',
        body: [
          'En física, el coseno describe cualquier oscilación medida desde su extremo: el movimiento armónico simple x(t) = A·cos(ωt) para una masa soltada desde el reposo, la parte real de la exponencial compleja e^(iθ) = cos θ + i·sin θ que sustenta el análisis de circuitos de corriente alterna y las funciones de onda cuánticas, y las funciones base pares de las series de Fourier. Cuando los ingenieros escriben una señal periódica como suma de cosenos, cada término captura la parte simétrica de la onda.',
          'El coseno también aparece lejos de las ondas. El producto escalar de dos vectores es |a||b|cos θ, donde θ es el ángulo entre ellos, así que el coseno mide la alineación: 1 para paralelos, 0 para perpendiculares, −1 para opuestos. La ley de los cosenos, c² = a² + b² − 2ab·cos(C), generaliza el teorema de Pitágoras a cualquier triángulo.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: todos los números reales; rango: −1 ≤ cos(x) ≤ 1.',
      'Período 2π: cos(x + 2π) = cos(x) para todo x.',
      'Función par: cos(−x) = cos(x); la gráfica es simétrica respecto al eje y.',
      'Ceros en x = π/2 + nπ; máximos de 1 en x = 2πn; mínimos de −1 en x = π + 2πn.',
      'Intersección con el eje y en (0, 1); la derivada es −sin(x); una antiderivada es sin(x).',
    ],
    faqs: [
      {
        q: '¿El coseno es solo un seno desplazado?',
        a: 'Exactamente: cos(x) = sin(x + π/2), así que la gráfica del coseno es la del seno movida a la izquierda un cuarto de período. Comparten amplitud, período y rango; solo difiere el punto de partida. En el círculo unitario son las coordenadas x e y del mismo punto giratorio.',
      },
      {
        q: '¿Por qué cos(0) = 1?',
        a: 'En el ángulo 0 el punto giratorio del círculo unitario está en (1, 0), el extremo derecho del círculo, así que su coordenada x —el coseno— es 1 y su coordenada y —el seno— es 0. Por eso la gráfica del coseno empieza en su pico.',
      },
      {
        q: '¿Qué tiene que ver el coseno con el producto escalar?',
        a: 'La fórmula del producto escalar a·b = |a||b|cos θ usa el coseno del ángulo entre los vectores para medir cuánto apuntan en la misma dirección. El coseno vale 1 cuando son paralelos, 0 cuando son perpendiculares y −1 cuando son opuestos: actúa como una puntuación de alineación entre −1 y 1.',
      },
    ],
    related: [
      '/es/math-functions/sine/',
      '/es/math-functions/tangent/',
      '/es/examples/trigonometric-interference/',
      '/es/examples/damped-oscillation/',
      '/es/learn/what-is-a-function/',
    ],
  },
  {
    slug: 'tangent',
    name: 'Tangente',
    displayName: 'Función tangente',
    notation: 'f(x) = tan(x)',
    expression: 'tan(x)',
    tagline:
      'Una curva repetitiva que sube de −∞ a +∞, con asíntotas verticales donde el coseno se anula.',
    description:
      'Grafica f(x) = tan(x): ramas repetitivas, asíntotas en π/2 + nπ, período π, rango no acotado y dónde aparece la tangente en matemáticas.',
    intro: [
      'La función tangente, tan(x) = sin(x)/cos(x), no se parece en nada a sus hermanas con forma de onda: en lugar de oscilar entre −1 y 1, barre hacia arriba pasando por cada valor real, luego salta y empieza de nuevo. Cada rama repetitiva pasa por un cero en x = nπ, sube cada vez más empinada y se dispara al infinito cuando x se acerca a π/2 + nπ, los puntos donde cos(x) = 0 y el cociente explota. Esas son las asíntotas verticales de la función, los muros punteados a los que la curva puede acercarse pero nunca tocar.',
      'La tangente mide la inclinación: en un triángulo rectángulo es cateto opuesto sobre cateto adyacente, la pendiente de la hipotenusa, y para un ángulo de inclinación da directamente la pendiente de la recta. Como tan(x + π) = tan(x), su período es solo π, la mitad que el del seno y el coseno. Escribe tan(x) en la calculadora y aleja la vista para ver cómo las ramas recubren el plano, cada una una curva en S estirada entre dos asíntotas.',
    ],
    sections: [
      {
        heading: 'Qué es la tangente',
        body: [
          'Geométricamente, tan(x) es la pendiente del rayo en el ángulo x: dibuja el rayo desde el origen con ángulo x y mira lo empinado que sube, que es elevación sobre avance, opuesto sobre adyacente. Equivalentemente, es la coordenada y donde ese rayo corta la recta vertical x = 1 tangente al círculo unitario, de ahí el nombre. Cuando el rayo gira hacia la vertical, el punto de intersección se aleja corriendo al infinito, y en el momento en que el rayo apunta exactamente hacia arriba no hay intersección: la asíntota.',
          'Como tan(x) = sin(x)/cos(x), los ceros de la función vienen del seno (en x = nπ) y sus asíntotas de los ceros del coseno (en x = π/2 + nπ). La tangente es una función impar, tan(−x) = −tan(x), así que cada rama es simétrica por rotación sobre su propio cero, y toda la gráfica se repite cada π porque desplazar π tanto el seno como el coseno cambia ambos signos, dejando el cociente igual.',
        ],
      },
      {
        heading: 'Asíntotas y comportamiento no acotado',
        body: [
          'Las asíntotas verticales en x = π/2 + nπ son el rasgo más llamativo de tan(x): al acercarse por la izquierda la curva tiende a +∞, por la derecha a −∞. La función es continua en cada intervalo entre asíntotas pero tiene un salto inevitable en cada asíntota: ninguna redefinición puede arreglarlo, porque los límites por la izquierda y por la derecha no coinciden. Esto hace de la tangente el ejemplo clásico en clase de una función con infinitas asíntotas verticales.',
          'A diferencia del seno y el coseno, la tangente no está acotada en ninguna dirección: su rango son todos los números reales. Cerca de cero se comporta casi como la recta y = x (la aproximación de ángulo pequeño tan(x) ≈ x), luego se empina dramáticamente: en x = 1.4 radianes el valor ya es unos 5.8, y en 1.57 es enorme. Su derivada, sec²(x) = 1 + tan²(x), siempre es al menos 1, lo que confirma que la curva nunca se aplana.',
        ],
      },
      {
        heading: 'Dónde aparece la tangente',
        body: [
          'La tangente convierte ángulos en pendientes, así que aparece donde la inclinación importa: la pendiente de una colina (una cuesta de 45° es un 100% de pendiente porque tan(45°) = 1), las matemáticas de la trayectoria de proyectiles y el ángulo de la sombra de un reloj de sol. En cálculo, la propia derivada es una pendiente tangente —la recta tangente a una curva en un punto—, y la tangente inversa, arctan, es como las calculadoras recuperan ángulos a partir de pendientes, por ejemplo para hallar un rumbo a partir de Δy/Δx.',
          'En física, tan aparece en relaciones de fase: el ángulo de fase de un oscilador forzado cumple tan(φ) = (término de amortiguación)/(término de rigidez), y en óptica el ángulo de Brewster obedece tan(θ) = n₂/n₁. Dondequiera que importe un cociente entre componentes vertical y horizontal, la tangente es el lenguaje natural.',
        ],
      },
    ],
    keyFacts: [
      'tan(x) = sin(x)/cos(x); el dominio son todos los x reales excepto π/2 + nπ.',
      'Rango: todos los números reales; la tangente no está acotada ni por arriba ni por abajo.',
      'Período π: tan(x + π) = tan(x); función impar, tan(−x) = −tan(x).',
      'Ceros en x = nπ; asíntotas verticales en x = π/2 + nπ.',
      'La derivada es sec²(x) = 1 + tan²(x), siempre ≥ 1; cerca de 0, tan(x) ≈ x.',
    ],
    faqs: [
      {
        q: '¿Por qué tan(x) tiene asíntotas?',
        a: 'Porque tan(x) = sin(x)/cos(x), y cos(x) = 0 en x = π/2 + nπ. Dividir entre valores cada vez más cercanos a cero hace que el cociente crezca sin límite, así que la gráfica se dispara a ±∞ a cada lado de esos puntos. La función simplemente no está definida allí.',
      },
      {
        q: '¿Cuál es el período de la tangente?',
        a: 'π, la mitad del período del seno y el coseno. Sumar π al ángulo cambia el signo tanto de sin(x) como de cos(x), y los dos cambios de signo se cancelan en el cociente, así que tan(x + π) = tan(x). La gráfica repite su patrón de ramas cada π radianes.',
      },
      {
        q: '¿La tangente es creciente en todas partes?',
        a: 'Es creciente en cada intervalo entre asíntotas consecutivas, pero no es creciente como función global: salta de +∞ de vuelta a −∞ en cada asíntota. Así que «tan es creciente» solo es cierto dentro de una rama, como (−π/2, π/2).',
      },
    ],
    related: [
      '/es/math-functions/sine/',
      '/es/math-functions/cosine/',
      '/es/learn/asymptotes-explained/',
      '/es/learn/what-is-a-function/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'quadratic',
    name: 'Cuadrática',
    displayName: 'Función cuadrática',
    notation: 'f(x) = x^2 - 4',
    expression: 'x^2 - 4',
    tagline: 'La parábola x² − 4: una curva en U con raíces en ±2 y su punto más bajo en (0, −4).',
    description:
      'Grafica f(x) = x² − 4: vértice de la parábola, raíces en ±2, eje de simetría, valor mínimo y usos de las cuadráticas en física y álgebra.',
    intro: [
      'La función cuadrática f(x) = x² − 4 es la parábola más simple con algo interesante pasando: cruza el eje x dos veces, se hunde por debajo de él y da la vuelta en un único punto más bajo. Elevar al cuadrado hace que cada entrada sea no negativa, así que x² es mínimo en x = 0, y restar 4 desliza toda la forma de U cuatro unidades hacia abajo. El resultado es una curva simétrica con vértice en (0, −4), que se abre hacia arriba eternamente.',
      'Las cuadráticas son las caballos de batalla del álgebra: modelan todo lo que depende del cuadrado de otra cantidad —el área de un cuadrado, la altura de una pelota lanzada a lo largo del tiempo, el beneficio de un negocio con demanda lineal—. El ejemplo x² − 4 es especialmente instructivo porque se factoriza limpiamente como (x − 2)(x + 2), así que sus intersecciones con el eje x en 2 y −2 se leen directamente del álgebra. Gráficala en la calculadora y observa la simetría respecto al eje y.',
    ],
    sections: [
      {
        heading: 'Qué es esta cuadrática',
        body: [
          'Toda cuadrática tiene la forma ax² + bx + c, y su gráfica es siempre una parábola: la forma de U que obtienes al elevar al cuadrado. Aquí a = 1 (positivo, así que la U se abre hacia arriba), b = 0 (sin inclinación, así que el vértice está sobre el eje y) y c = −4 (la intersección con el eje y). La fórmula del vértice x = −b/(2a) da x = 0, y f(0) = −4, lo que confirma el mínimo en (0, −4).',
          'La factorización revela las raíces: x² − 4 = (x − 2)(x + 2), una diferencia de cuadrados, así que la curva cruza el eje x exactamente donde cada factor se anula: en x = 2 y x = −2. Entre las raíces la función es negativa (la depresión bajo el eje); fuera de ellas es positiva y crece sin límite. Como el término x² domina para |x| grande, ambos brazos de la parábola se dirigen a +∞.',
        ],
      },
      {
        heading: 'Simetría, vértice y razón de cambio',
        body: [
          'El eje y es el eje de simetría de la parábola: f(−x) = f(x), así que la mitad izquierda refleja la derecha. El vértice es el punto de giro de la parábola: aquí el mínimo global, ya que los brazos suben eternamente. Toda cuadrática tiene exactamente un vértice y exactamente un valor extremo, y por eso las cuadráticas son el modelo ideal para la optimización: beneficio máximo, costo mínimo, punto más alto de una trayectoria.',
          'La derivada f′(x) = 2x cuenta el resto de la historia: negativa para x < 0 (cayendo hacia el vértice), cero en x = 0 (el fondo plano), positiva para x > 0 (saliendo en ascenso). La propia pendiente crece linealmente, una segunda derivada constante de 2: la firma de la aceleración constante, y por eso la distancia bajo la gravedad es cuadrática en el tiempo.',
        ],
      },
      {
        heading: 'Dónde aparecen las cuadráticas',
        body: [
          'Lanza una pelota y su altura sigue una parábola: h(t) = −4.9t² + v₀t + h₀, la misma forma que x² − 4 pero invertida y desplazada. Las áreas y los volúmenes producen cuadráticas y cúbicas de forma natural —duplicar el lado de un cuadrado cuadruplica su área— y la fórmula cuadrática resuelve toda ecuación de este tipo, incluida esta: x = ±√4 = ±2.',
          'En economía, el beneficio en función del precio suele modelarse como una parábola que se abre hacia abajo (los ingresos suben y luego caen al subir el precio), y su vértice da el precio óptimo. En estadística, el ajuste por mínimos cuadrados minimiza una función de error cuadrática, y la campana de la distribución normal es e^(−x²): una cuadrática en el exponente.',
        ],
      },
    ],
    keyFacts: [
      'Forma factorizada: x² − 4 = (x − 2)(x + 2); raíces (intersecciones con el eje x) en x = 2 y x = −2.',
      'Vértice (mínimo global) en (0, −4); el eje de simetría es el eje y (x = 0).',
      'Dominio: todos los números reales; rango: y ≥ −4.',
      'Función par: f(−x) = f(x); la gráfica se refleja en el eje y.',
      'Intersección con el eje y en (0, −4); la función es negativa entre las raíces y positiva fuera de ellas.',
      'Derivada f′(x) = 2x; la pendiente es cero en el vértice y la segunda derivada es la constante 2.',
    ],
    faqs: [
      {
        q: '¿Cómo se encuentran las raíces de x² − 4?',
        a: 'Factorízala como diferencia de cuadrados: x² − 4 = (x − 2)(x + 2). Un producto es cero cuando algún factor es cero, así que x = 2 o x = −2. Equivalentemente, la fórmula cuadrática da x = (0 ± √(0 + 16))/2 = ±2.',
      },
      {
        q: '¿Cuál es el valor mínimo de x² − 4?',
        a: '−4, alcanzado en x = 0. Como x² ≥ 0 para todo x real, restar 4 da x² − 4 ≥ −4, con igualdad solo cuando x² = 0. El vértice (0, −4) es el punto más bajo de la parábola, y la función crece sin límite por ambos lados.',
      },
      {
        q: '¿Por qué la gráfica es simétrica?',
        a: 'Porque solo aparecen potencias pares de x: (−x)² − 4 = x² − 4, así que f(−x) = f(x). Cada entrada y su negativa dan la misma salida, lo que refleja la mitad derecha de la gráfica en el eje y sobre la mitad izquierda.',
      },
    ],
    related: [
      '/es/examples/projectile-motion/',
      '/es/math-functions/square-root/',
      '/es/math-functions/absolute-value/',
      '/es/learn/understanding-derivatives/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'cubic',
    name: 'Cúbica',
    displayName: 'Función cúbica',
    notation: 'f(x) = x^3 - 3*x',
    expression: 'x^3 - 3*x',
    tagline:
      'Una cúbica en forma de S con tres raíces reales, una colina y un valle locales, y simetría rotacional de 180°.',
    description:
      'Grafica f(x) = x³ − 3x: sus tres raíces reales, máximo y mínimo locales, punto de inflexión y su vínculo con la trigonometría del ángulo triple.',
    intro: [
      'La cúbica f(x) = x³ − 3x traza una S alargada: sube desde −∞, corona una pequeña colina en (−1, 2), desciende por el origen hasta un valle en (1, −2) y se aleja trepando hacia +∞. A diferencia de una parábola no tiene máximo ni mínimo global: el término x³ termina dominando todo, arrastrando el brazo izquierdo hacia abajo eternamente y el derecho hacia arriba eternamente. Entre los extremos, la curva cruza el eje x tres veces, en −√3, 0 y √3.',
      'Esta cúbica en particular es una favorita de los libros de texto porque todo en ella se puede calcular a mano: sus raíces se factorizan con x(x² − 3), sus puntos de giro vienen de la limpia derivada 3x² − 3, y esconde una hermosa conexión con la trigonometría del ángulo triple. Las cúbicas modelan el crecimiento de volúmenes, ecuaciones cúbicas de estado y cualquier relación donde importa el cubo de una cantidad. Grafica x^3 - 3*x en la calculadora y aleja la vista para ver cómo la S se endereza en su comportamiento final.',
    ],
    sections: [
      {
        heading: 'Qué es esta cúbica',
        body: [
          'Saca factor común x y aparecen las raíces: x³ − 3x = x(x² − 3) = x(x − √3)(x + √3), así que la gráfica cruza el eje x en −√3 ≈ −1.732, 0 y √3 ≈ 1.732. Tres raíces reales es lo máximo que una cúbica puede mostrar como cruces distintos: el grado de la función fija el máximo. Entre raíces consecutivas la curva debe dar la vuelta, que es exactamente lo que hacen la colina y el valle.',
          'El comportamiento final lo dicta solo x³: cuando x → +∞ la función → +∞, y cuando x → −∞ la función → −∞. El término −3x solo moldea el centro de la gráfica, tallando la ondulación. Todo polinomio de grado impar comparte este comportamiento de extremos opuestos, lo que garantiza al menos una raíz real: la curva debe cruzar el eje para ir de −∞ a +∞.',
        ],
      },
      {
        heading: 'Puntos de giro y punto de inflexión',
        body: [
          'La derivada f′(x) = 3x² − 3 = 3(x − 1)(x + 1) se anula en x = ±1, marcando los dos puntos de giro: un máximo local en (−1, 2) y un mínimo local en (1, −2). La función sube hasta x = −1, baja hasta x = 1 y luego sube eternamente: el clásico subir-bajar-subir de una cúbica con dos puntos críticos. Estos son solo extremos locales; el comportamiento global no está acotado en ninguna dirección.',
          'A medio camino entre ellos, en (0, 0), está el punto de inflexión, donde la curva cambia de cóncava hacia abajo a cóncava hacia arriba. La segunda derivada f″(x) = 6x lo confirma: negativa a la izquierda de 0, positiva a la derecha de 0, cero exactamente en el origen. Como la cúbica es una función impar, el punto de inflexión es también el centro de su simetría rotacional de 180°: rota la gráfica media vuelta sobre (0, 0) y coincide consigo misma.',
        ],
      },
      {
        heading: 'Una identidad trigonométrica oculta',
        body: [
          'Aquí está la sorpresa por la que esta cúbica es famosa: sustituir x = 2cos θ da x³ − 3x = 2cos(3θ). Puedes verificarlo con la fórmula del ángulo triple cos(3θ) = 4cos³θ − 3cos θ: con x = 2cos θ, el lado izquierdo se convierte en 8cos³θ − 6cos θ = 2(4cos³θ − 3cos θ) = 2cos(3θ). La cúbica es en secreto un ángulo triplicado disfrazado.',
          'Esta identidad es más que una curiosidad: es la clave para resolver ecuaciones cúbicas trigonométricamente. Una cúbica con tres raíces reales, como esta, se puede resolver escribiendo sus raíces como cosenos escalados de ángulos adecuados, un método que se remonta a Viète. También explica por qué la colina y el valle tienen las alturas exactas ±2: son 2cos(3θ) evaluado en sus propios picos.',
        ],
      },
    ],
    keyFacts: [
      'Factorizada: x(x − √3)(x + √3); tres raíces reales en x = −√3, 0 y √3.',
      'Máximo local en (−1, 2); mínimo local en (1, −2); sin máximo ni mínimo global.',
      'Punto de inflexión en (0, 0); función impar con simetría rotacional de 180° sobre el origen.',
      'Dominio y rango: todos los números reales.',
      'Comportamiento final: f(x) → −∞ cuando x → −∞ y f(x) → +∞ cuando x → +∞.',
      'Identidad: con x = 2cos θ, x³ − 3x = 2cos(3θ).',
    ],
    faqs: [
      {
        q: '¿Por qué x³ − 3x cruza el eje x tres veces?',
        a: 'Su forma factorizada x(x − √3)(x + √3) muestra tres factores lineales distintos, cada uno aportando un cero: x = 0, x = √3 y x = −√3. Un polinomio de grado 3 puede tener como máximo tres raíces reales, y este alcanza el máximo. Entre cada par de raíces, los puntos de giro de la derivada obligan a la curva a cambiar de dirección.',
      },
      {
        q: '¿Cuáles son el máximo y el mínimo locales?',
        a: 'Resuelve f′(x) = 3x² − 3 = 0 para obtener x = ±1. Entonces f(−1) = −1 + 3 = 2 es el máximo local y f(1) = 1 − 3 = −2 es el mínimo local. Son «locales» porque la función supera cualquier cota lejos a la derecha y cae por debajo de cualquier cota lejos a la izquierda.',
      },
      {
        q: '¿Qué tiene que ver esta cúbica con la trigonometría?',
        a: 'La identidad x³ − 3x = 2cos(3θ) bajo la sustitución x = 2cos θ vincula la cúbica con las fórmulas del ángulo triple. Históricamente esta conexión dio un método trigonométrico para resolver cúbicas con tres raíces reales: el «casus irreducibilis» que desconcertó a los algebristas del siglo XVI.',
      },
    ],
    related: [
      '/es/math-functions/quadratic/',
      '/es/learn/understanding-derivatives/',
      '/es/learn/what-is-a-function/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'exponential',
    name: 'Exponencial',
    displayName: 'Función exponencial',
    notation: 'f(x) = e^x',
    expression: 'e^x',
    tagline:
      'La función que es su propia derivada: crecimiento relativo constante, siempre creciente, sin tocar nunca el cero.',
    description:
      'Grafica f(x) = eˣ: crecimiento relativo constante, asíntota horizontal y = 0, punto (0, 1) y modelos exponenciales en ciencia y finanzas.',
    intro: [
      'La función exponencial f(x) = eˣ es la encarnación matemática del crecimiento proporcional al tamaño: dinero que genera interés compuesto, bacterias que se duplican en una placa o un rumor que se propaga entre la gente. Su propiedad definitoria es que su razón de cambio iguala su valor actual —d/dx eˣ = eˣ—, y por eso aparece siempre que la tasa de crecimiento de una cantidad es proporcional a la propia cantidad. La base e ≈ 2.71828 es el único número que hace que esto funcione.',
      'La gráfica cuenta la historia de un vistazo: pasa por (0, 1), se arrastra casi plana junto al eje x para x muy negativa (acercándose a 0 sin llegar nunca) y luego se curva hacia arriba y trepa cada vez más empinada para x positiva. En x = 1 vale e ≈ 2.718, en x = 2 es e² ≈ 7.389, y cada paso unitario multiplica el valor por otro factor de e. Escribe e^x en la calculadora y compárala con 2^x para ver cómo la base controla la inclinación.',
    ],
    sections: [
      {
        heading: 'Qué es la función exponencial',
        body: [
          'La multiplicación repetida es el corazón de eˣ: e³ significa e·e·e, y las leyes de los exponentes e^(a+b) = e^a·e^b extienden esto a todas las potencias reales, incluidas fracciones y negativas (e^(−x) = 1/eˣ). El propio número e puede definirse como el límite de (1 + 1/n)ⁿ cuando n crece —el resultado de capitalizar un 100% de interés en infinitos períodos— o como la suma infinita 1 + 1 + 1/2! + 1/3! + ⋯.',
          'Lo que hace especial a e entre todas las bases es la derivada: d/dx aˣ = aˣ·ln(a), y solo para a = e el factor ln vale 1, dejando la función inalterada al derivar. Equivalentemente, eˣ es la única función que cumple f′ = f con f(0) = 1. Por eso e se llama la base natural: el cálculo la distingue.',
        ],
      },
      {
        heading: 'Forma, asíntota y crecimiento',
        body: [
          'Para x < 0 la gráfica abraza el eje x desde arriba, decayendo hacia 0 sin tocarlo nunca: la asíntota horizontal y = 0 cuando x → −∞. En x = 0 la curva pasa por (0, 1), su intersección con el eje y, y para x > 0 acelera hacia arriba, convexa en todas partes (segunda derivada eˣ > 0) y creciente en todas partes (primera derivada eˣ > 0). No hay ceros, ni puntos de giro, ni puntos de inflexión: solo un crecimiento implacable, suave y curvado hacia arriba.',
          'El crecimiento exponencial termina superando a cualquier polinomio: eˣ crece más rápido que x¹⁰⁰, más rápido que cualquier potencia fija. Por eso las exponenciales modelan procesos desbocados —reacciones en cadena, propagación viral en su fase inicial— y también por eso sus inversas, los logaritmos, crecen tan despacio. En escala logarítmica, eˣ se convierte en la recta y = x, una forma práctica de detectar datos exponenciales.',
        ],
      },
      {
        heading: 'Dónde aparecen las exponenciales',
        body: [
          'Toda ecuación diferencial de la forma dy/dx = ky tiene la solución y = Ce^(kx): la ley de enfriamiento de Newton, la desintegración radiactiva (con k < 0), el interés compuesto continuo y el crecimiento poblacional la siguen. La campana de la distribución normal, (1/√(2π))e^(−x²/2), pone una exponencial de una cuadrática en el centro de la estadística. En análisis complejo, la fórmula de Euler e^(iθ) = cos θ + i·sin θ fusiona exponenciales con trigonometría y sustenta toda la teoría de circuitos de corriente alterna y la mecánica cuántica.',
          'En computación, las exponenciales cortan en ambos sentidos: los algoritmos con complejidad temporal exponencial se vuelven inviables al crecer las entradas, mientras que el retroceso exponencial —esperar 1, 2, 4, 8… segundos entre reintentos— es la cura estándar para servidores sobrecargados. La curva logística, eˣ/(1 + eˣ), doma el crecimiento exponencial puro con una capacidad de carga y modela desde epidemias hasta activaciones de redes neuronales.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: todos los números reales; rango: y > 0 — eˣ nunca es cero ni negativa.',
      'Intersección con el eje y en (0, 1); asíntota horizontal y = 0 cuando x → −∞.',
      'Estrictamente creciente y convexa en todas partes; sin máximos, mínimos ni puntos de inflexión.',
      'Su propia derivada: d/dx eˣ = eˣ; una antiderivada es la propia eˣ.',
      'Leyes de exponentes: e^(a+b) = e^a·e^b, e^(−x) = 1/eˣ, (eˣ)^n = e^(nx).',
      'e ≈ 2.71828; eˣ supera a todo polinomio cuando x → ∞.',
    ],
    faqs: [
      {
        q: '¿Por qué eˣ es su propia derivada?',
        a: 'Por definición, e es la única base para la que d/dx aˣ = aˣ·ln(a) tiene ln(a) = 1. Derivar eˣ con la definición de límite da eˣ por el límite de (e^h − 1)/h, y e se define precisamente como el número que hace ese límite igual a 1. Así que la pendiente de la gráfica en cada punto iguala la altura de la función allí.',
      },
      {
        q: '¿Qué es e, exactamente?',
        a: 'Un número irracional de aproximadamente 2.71828, definible como el límite de (1 + 1/n)ⁿ cuando n → ∞ o la suma 1 + 1 + 1/2! + 1/3! + ⋯. Como π, su expansión decimal nunca se repite. Es la base «natural» porque el cálculo toma su forma más simple con ella.',
      },
      {
        q: '¿eˣ llega alguna vez a cero?',
        a: 'No. Para x real, eˣ > 0 siempre: la gráfica se acerca al eje x asintóticamente cuando x → −∞ pero nunca lo toca. Esto se deduce de eˣ·e^(−x) = e^0 = 1: si eˣ fuera cero, el producto no podría ser 1.',
      },
    ],
    related: [
      '/es/math-functions/natural-logarithm/',
      '/es/examples/logistic-growth/',
      '/es/learn/understanding-derivatives/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'natural-logarithm',
    name: 'Logaritmo natural',
    displayName: 'Función logaritmo natural',
    notation: 'f(x) = log(x)',
    expression: 'log(x)',
    tagline:
      'La inversa de eˣ: desenvuelve el crecimiento exponencial, convirtiendo la multiplicación en suma.',
    description:
      'Grafica f(x) = ln(x): dominio x > 0, asíntota en x = 0, leyes de los logaritmos, su papel como inversa de eˣ y usos del pH a los algoritmos.',
    intro: [
      'El logaritmo natural, escrito ln(x) o log(x), responde la pregunta «¿e elevado a qué potencia da x?». Es la inversa exacta de la función exponencial: ln(eˣ) = x y e^(ln x) = x, así que su gráfica es la imagen especular de y = eˣ reflejada en la recta y = x. Donde la exponencial se dispara hacia arriba, el logaritmo trepa con una lentitud agónica —ln(10) ≈ 2.303, ln(100) ≈ 4.605, ln(1 000 000) ≈ 13.816—: cada aumento de diez veces en x añade solo unos 2.303 a la salida.',
      'Ese crecimiento lento es precisamente la clave: los logaritmos comprimen rangos enormes en rangos manejables, y por eso la escala de Richter, los decibelios y el pH son todos logarítmicos. La gráfica pasa por (1, 0), sube para x > 1, se hunde a −∞ cuando x se acerca a 0 por la derecha (la asíntota vertical en x = 0) y no está definida para x ≤ 0: no puedes elevar e a ninguna potencia real y obtener cero o un número negativo. Escribe log(x) en la calculadora junto a e^x para ver la simetría especular.',
    ],
    sections: [
      {
        heading: 'Qué es el logaritmo natural',
        body: [
          'Los logaritmos se inventaron para convertir la multiplicación en suma: ln(ab) = ln(a) + ln(b). Antes de las calculadoras electrónicas, los científicos multiplicaban números grandes buscando sus logaritmos, sumando y convirtiendo de vuelta: la regla de cálculo es la encarnación física de esta idea. Lo «natural» del nombre se refiere a la base e, la base que hace limpio el cálculo: d/dx ln(x) = 1/x, la derivada más simple posible para una exponencial inversa.',
          'Las tres leyes de los logaritmos se deducen de las leyes de exponentes de su inversa: ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b y ln(a^b) = b·ln a. Juntas permiten desmontar expresiones multiplicativas complicadas en sumas, la razón por la que los logaritmos aparecen en fórmulas de entropía, cálculos de verosimilitud y dondequiera que los productos se vuelvan inmanejables.',
        ],
      },
      {
        heading: 'Dominio, asíntota y forma',
        body: [
          'El dominio es solo x > 0, consecuencia directa de eˣ > 0: no hay potencia real de e que dé cero o un número negativo, así que el logaritmo no puede aceptarlos. Cuando x → 0⁺, ln(x) → −∞, dando la asíntota vertical x = 0 (el eje y), el espejo de la asíntota horizontal de la exponencial. La intersección con el eje x está en (1, 0) ya que e^0 = 1, el espejo de la intersección con el eje y de eˣ en (0, 1).',
          'La curva es creciente en todas partes (derivada 1/x > 0 para x > 0) pero cóncava hacia abajo en todas partes (segunda derivada −1/x² < 0): sube rápido justo a la derecha del cero y luego se aplana sin piedad. No tiene máximo ni punto de inflexión, y es la antiderivada de 1/x: la integral que ninguna regla de potencias puede resolver, ya que ∫xⁿ dx falla en n = −1.',
        ],
      },
      {
        heading: 'Dónde aparecen los logaritmos',
        body: [
          'Las escalas logarítmicas miden fenómenos que abarcan muchos órdenes de magnitud: cada punto Richter es unas 32 veces la energía, cada unidad de pH es 10 veces la acidez, y los decibelios comprimen intensidades sonoras desde un susurro hasta un motor de avión en un rango de 0 a 140. En teoría de la información, la entropía se mide en nats (logaritmo natural) o bits (logaritmo en base 2), cuantificando la sorpresa y las longitudes óptimas de código.',
          'En informática, los algoritmos O(log n) —la búsqueda binaria es el clásico— reducen el problema a la mitad en cada paso, así que duplicar la entrada añade solo un paso más; eso es el crecimiento logarítmico en acción. En estadística, tomar logaritmos endereza los datos exponenciales en rectas, y la distribución log-normal modela cantidades como ingresos y tamaños de partícula que se multiplican en lugar de sumarse.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: x > 0; rango: todos los números reales. Indefinido en x ≤ 0.',
      'Inversa de eˣ: ln(eˣ) = x y e^(ln x) = x; las gráficas se reflejan en y = x.',
      'Intersección con el eje x en (1, 0); asíntota vertical x = 0 con ln(x) → −∞ cuando x → 0⁺.',
      'Leyes de los logaritmos: ln(ab) = ln a + ln b; ln(a/b) = ln a − ln b; ln(a^b) = b·ln a.',
      'Derivada d/dx ln(x) = 1/x; ln es la antiderivada de 1/x.',
      'Creciente y cóncava hacia abajo en todo su dominio; sin máximos, mínimos ni puntos de inflexión.',
    ],
    faqs: [
      {
        q: '¿Por qué ln(x) no está definido para x negativa?',
        a: 'Porque ln(x) pregunta «¿e elevado a qué potencia es igual a x?», y e elevado a cualquier potencia real siempre es positivo. Ningún exponente real produce cero ni un número negativo, así que el logaritmo no tiene valor real allí. (Existen logaritmos complejos, pero son multivaluados y están más allá de esta gráfica real.)',
      },
      {
        q: '¿Cuál es la diferencia entre ln(x) y log₁₀(x)?',
        a: 'Solo la base: ln usa e ≈ 2.718, log₁₀ usa 10. Son proporcionales —ln(x) = ln(10)·log₁₀(x) ≈ 2.303·log₁₀(x)—, así que sus gráficas tienen formas idénticas, solo distintas escalas verticales. Los logaritmos naturales dan el cálculo más limpio (derivada 1/x); los de base 10 sirven para mediciones en escala decimal.',
      },
      {
        q: '¿Por qué la gráfica se aplana tanto?',
        a: 'Porque deshacer el crecimiento exponencial es inherentemente lento: para aumentar ln(x) en 1 hay que multiplicar x por e ≈ 2.718. La derivada 1/x se encoge al crecer x, así que cada unidad adicional de altura requiere un múltiplo de x cada vez mayor. Ese aplanamiento es exactamente lo que hace a los logaritmos ideales para comprimir rangos enormes.',
      },
    ],
    related: [
      '/es/math-functions/exponential/',
      '/es/learn/understanding-integrals/',
      '/es/learn/understanding-derivatives/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'square-root',
    name: 'Raíz cuadrada',
    displayName: 'Función raíz cuadrada',
    notation: 'f(x) = sqrt(x)',
    expression: 'sqrt(x)',
    tagline:
      'La mitad de una parábola tumbada: empieza en el origen, sube rápido y luego se suaviza eternamente.',
    description:
      'Grafica f(x) = √x: dominio x ≥ 0, arranque empinado en el origen, tangente vertical y su papel como inversa de x² en física y estadística.',
    intro: [
      'La función raíz cuadrada, f(x) = √x, es la inversa de elevar al cuadrado (en los no negativos): responde «¿qué número, multiplicado por sí mismo, da x?». Su gráfica es la mitad superior de una parábola tumbada de lado: empieza en el origen, sale disparada casi vertical y luego se suaviza gradualmente, subiendo cada vez más despacio para siempre. Es la imagen especular de y = x² reflejada en la recta y = x, recortada a los valores no negativos donde elevar al cuadrado es invertible.',
      'La raíz cuadrada aparece donde las cantidades se relacionan mediante áreas o energías: el lado de un cuadrado de área x es √x, y la velocidad de un objeto con energía cinética E es proporcional a √E. Los estadísticos la encuentran en la desviación estándar, la raíz cuadrada de la varianza. Escribe sqrt(x) en la calculadora y observa la pendiente en el origen: la tangente es vertical allí, señal de que la inversa de una curva plana es empinada.',
    ],
    sections: [
      {
        heading: 'Qué es la raíz cuadrada',
        body: [
          'Elevar al cuadrado asigna tanto a 3 como a −3 el 9, así que no tiene inversa sobre todos los reales: dos entradas comparten cada salida positiva. Restringir a x ≥ 0 lo convierte en uno a uno, y su inversa es la raíz cuadrada principal, siempre no negativa. Por eso la calculadora da sqrt(9) = 3 y no ±3: √x significa la raíz no negativa por definición, la convención que mantiene la función bien definida.',
          'Reflejar la mitad derecha de y = x² (x ≥ 0) en la recta y = x produce exactamente la gráfica de √x: cada punto (a, a²) se convierte en (a², a). Los puntos fijos del reflejo están en la recta y = x, así que (0, 0) y (1, 1) pertenecen a ambas gráficas. √2 ≈ 1.414 es el ejemplo irracional clásico: la diagonal de un cuadrado unitario, probada irracional por los griegos.',
        ],
      },
      {
        heading: 'Dominio, pendiente vertical y forma',
        body: [
          'El dominio es x ≥ 0: ningún número real elevado al cuadrado da un valor negativo, así que la gráfica simplemente empieza en el origen. La derivada f′(x) = 1/(2√x) explota cuando x → 0⁺, dándole a la gráfica una tangente vertical en el origen: el espejo de la tangente horizontal de x² en el origen. A medida que x crece, la derivada se encoge y la curva se aplana, cóncava hacia abajo en todas partes como corresponde a una inversa de una curva convexa.',
          'Como la función logaritmo, √x crece sin límite pero más despacio que cualquier recta: es la tasa de crecimiento sublineal canónica, más rápida que ln(x) pero más lenta que xᵃ para cualquier a > 1/2. Es creciente en todas partes y no tiene extremos; su «punto final» en (0, 0) es el mínimo global sobre su dominio, y no hay máximo.',
        ],
      },
      {
        heading: 'Dónde aparece la raíz cuadrada',
        body: [
          'La física está llena de relaciones de raíz cuadrada: el período de un péndulo es proporcional a √(longitud), la velocidad de escape a √(1/radio), y la velocidad de una caída desde una altura h a √h (de mgh = ½mv²). En estadística, la desviación estándar es la raíz cuadrada de la varianza, y el error estándar de una media disminuye como 1/√n: cuadruplicar la muestra solo reduce a la mitad la incertidumbre.',
          'En geometría, √x convierte áreas en longitudes: un cuadrado de área A tiene lado √A, y la fórmula de la distancia es una raíz cuadrada del teorema de Pitágoras, d = √(Δx² + Δy²). En computación, la raíz cuadrada entera y la normalización de vectores (dividir por la longitud √(x² + y²)) son operaciones cotidianas, y el famoso truco de la «raíz cuadrada inversa rápida» de los gráficos 3D la aproximaba a toda velocidad.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: x ≥ 0; rango: y ≥ 0. La raíz cuadrada principal siempre es no negativa.',
      'Inversa de x² en [0, ∞): √(x²) = |x| y (√x)² = x para x ≥ 0.',
      'Pasa por (0, 0) y (1, 1); tangente vertical en el origen.',
      'Estrictamente creciente y cóncava hacia abajo en todo su dominio; sin extremos en el interior.',
      'Derivada f′(x) = 1/(2√x); √x crece más rápido que ln(x) pero más despacio que cualquier potencia xᵃ con a > 1/2.',
      '√2 ≈ 1.41421 es irracional: la diagonal del cuadrado unitario.',
    ],
    faqs: [
      {
        q: '¿Por qué sqrt(9) es 3 y no ±3?',
        a: 'Por convención, √x denota la raíz cuadrada principal: la no negativa. La ecuación x² = 9 tiene dos soluciones, ±3, pero la función raíz cuadrada devuelve solo +3 para que cada entrada tenga exactamente una salida. Cuando resuelvas x² = 9, recuerda añadir el ± tú mismo.',
      },
      {
        q: '¿Por qué la gráfica es tan empinada en el origen?',
        a: 'Porque es la inversa de x², que es plana en el origen. Reflejar una tangente horizontal en la recta y = x la convierte en una tangente vertical: la derivada 1/(2√x) tiende a infinito cuando x → 0⁺. Las inversas intercambian pendientes empinadas y planas.',
      },
      {
        q: '¿La raíz cuadrada está definida para números negativos?',
        a: 'No en los reales: ningún número real elevado al cuadrado da un negativo. La gráfica empieza en x = 0. En los complejos sí: √(−1) = i, la unidad imaginaria, pero la gráfica real de la calculadora solo muestra el dominio real x ≥ 0.',
      },
    ],
    related: [
      '/es/math-functions/quadratic/',
      '/es/learn/what-is-a-function/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'absolute-value',
    name: 'Valor absoluto',
    displayName: 'Función valor absoluto',
    notation: 'f(x) = abs(x)',
    expression: 'abs(x)',
    tagline:
      'La V más simple de las matemáticas: distancia desde cero, con una esquina afilada justo en el origen.',
    description:
      'Grafica f(x) = |x|: explora su forma de V, la esquina no derivable en x = 0, la simetría par y sus usos en distancias, errores y definiciones por tramos.',
    intro: [
      'El valor absoluto, f(x) = |x|, es la función de distancia de la recta numérica: mide lo lejos que está x del cero, ignorando la dirección. Los números positivos se quedan quietos, los negativos se reflejan: |−5| = 5. La gráfica es una V perfecta con su punta en el origen, la recta y = x a la derecha y su imagen especular y = −x a la izquierda, unidas en (0, 0).',
      'Esa punta es lo que hace interesante al valor absoluto: es el ejemplo más simple de una función continua pero no derivable, con una esquina afilada donde la pendiente salta de −1 a +1. El valor absoluto aparece en todas partes donde importa la magnitud y no el signo: errores de medición, tolerancias, distancias y la definición de límites. Escribe abs(x) en la calculadora y aleja la vista: la V se extiende eternamente, con cada brazo una semirrecta perfecta.',
    ],
    sections: [
      {
        heading: 'Qué es el valor absoluto',
        body: [
          'Formalmente, |x| = x si x ≥ 0 y |x| = −x si x < 0: una función definida por tramos que despoja el signo. Esto la convierte en la distancia de x al origen, y de forma más general |x − a| es la distancia entre x y a, razón por la que las desigualdades como |x − 3| < 2 describen intervalos (aquí, (1, 5): los puntos a menos de 2 unidades de 3).',
          'La V es una función par: |−x| = |x|, así que la mitad izquierda refleja la derecha en el eje y. La pendiente es exactamente −1 para x < 0 y +1 para x > 0: los brazos son semirrectas con inclinaciones constantes. En x = 0 los brazos se encuentran en el mínimo global (0, 0), el punto más bajo de la gráfica y el único donde la función vale cero.',
        ],
      },
      {
        heading: 'La esquina en el origen',
        body: [
          'En x = 0 el valor absoluto es continua —el límite por ambos lados es 0, que coincide con el valor— pero no derivable: la pendiente por la izquierda es −1 y por la derecha es +1, sin una única tangente en la punta. Esta es la esquina canónica que se muestra en clase de cálculo: la prueba de que la continuidad no implica derivabilidad. La calculadora gráfica dibuja la V sin dudar, pero cualquier herramienta numérica de derivadas debe manejar la punta con cuidado.',
          'La esquina también puede suavizarse: √(x² + ε) aproxima |x| con una curva redondeada, y promediar |x| sobre ruido produce transiciones suaves. En optimización, minimizar sumas de valores absolutos (como en la regresión de desviación mínima absoluta) requiere métodos que toleren esquinas, a diferencia de los mínimos cuadrados, suaves en todas partes.',
        ],
      },
      {
        heading: 'Dónde aparece el valor absoluto',
        body: [
          'Toda «distancia» unidimensional usa el valor absoluto: |x − a| es lo lejos que está x de a, la base de los intervalos de tolerancia («5 mm ± 0,1 mm» significa |longitud − 5| ≤ 0,1) y de las definiciones ε-δ de límite. En dos dimensiones se generaliza a la distancia euclidiana √((Δx)² + (Δy)²), con cuadrados que desempeñan el papel del valor absoluto.',
          'En aprendizaje automático, la función de pérdida de error absoluto medio (MAE) promedia |predicción − real|: robusta frente a valores atípicos porque, a diferencia del error cuadrático, no amplifica los errores grandes. La función de activación ReLU de las redes neuronales, max(0, x), es prima hermana del valor absoluto (|x| = ReLU(x) + ReLU(−x)), y las desigualdades triangulares |a + b| ≤ |a| + |b| sustentan el análisis real.',
        ],
      },
    ],
    keyFacts: [
      'Definición por tramos: |x| = x si x ≥ 0; |x| = −x si x < 0.',
      '|x − a| es la distancia entre x y a en la recta numérica.',
      'Función par: |−x| = |x|; la gráfica en V es simétrica respecto al eje y.',
      'Mínimo global en (0, 0); pendiente −1 para x < 0 y +1 para x > 0.',
      'Continua en todas partes pero no derivable en x = 0 (esquina afilada).',
      'Desigualdad triangular: |a + b| ≤ |a| + |b|.',
    ],
    faqs: [
      {
        q: '¿Por qué |x| no es derivable en x = 0?',
        a: 'Porque la pendiente salta de −1 (a la izquierda) a +1 (a la derecha): no hay una única recta tangente en la punta. La derivada como límite del cociente incremental da −1 por la izquierda y +1 por la derecha, así que el límite bilateral no existe. La función sigue siendo continua allí: la esquina es afilada pero sin saltos.',
      },
      {
        q: '¿Qué significa |x − 3| < 2?',
        a: '«La distancia de x a 3 es menor que 2», es decir, x está en el intervalo abierto (1, 5). El valor absoluto convierte las afirmaciones de distancia en álgebra: |x − a| < ε describe todos los puntos a menos de ε unidades de a, el lenguaje de las tolerancias y de las definiciones de límite.',
      },
      {
        q: '¿El valor absoluto es lo mismo que «quitar el signo menos»?',
        a: 'Para números concretos, sí: |−5| = 5. Pero como función es más que eso: es la distancia al cero, una función par con forma de V, no derivable en el origen y la base de las desigualdades triangulares. «Quitar el signo» es el cálculo; la distancia es el significado.',
      },
    ],
    related: [
      '/es/math-functions/quadratic/',
      '/es/learn/what-is-a-function/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'reciprocal',
    name: 'Recíproca',
    displayName: 'Función recíproca',
    notation: 'f(x) = 1/x',
    expression: '1/x',
    tagline: 'La hipérbola clásica: dos curvas espejadas que abrazan los ejes sin tocarlos jamás.',
    description:
      'Grafica f(x) = 1/x: su hipérbola, asíntotas en ambos ejes, simetría impar y apariciones en óptica, resistencias en paralelo y relaciones inversas.',
    intro: [
      'La función recíproca, f(x) = 1/x, dibuja la hipérbola más famosa de las matemáticas: dos curvas suaves en cuadrantes opuestos, cada una abrazando los ejes cada vez más cerca sin llegar a tocarlos. Para x positiva grande, 1/x es un susurro positivo diminuto; para x positiva diminuta, es un gigante: la entrada y la salida se equilibran de modo que su producto siempre es 1. En el lado negativo todo se refleja con el signo cambiado.',
      'La recíproca es el arquetipo de la relación inversa: duplicar la entrada reduce la salida a la mitad. Aparece en la ecuación de las lentes, en las resistencias en paralelo, en la ley de la gravitación y dondequiera que una cantidad fija se reparta entre más participantes. Escribe 1/x en la calculadora y observa las asíntotas: el eje y (x = 0, donde la división explota) y el eje x (y = 0, al que la curva se acerca eternamente).',
    ],
    sections: [
      {
        heading: 'Qué es la función recíproca',
        body: [
          'El recíproco de x es el número que multiplicado por x da 1: el inverso multiplicativo. Todo número real no nulo tiene uno, y la función 1/x los empareja: 2 ↔ 1/2, −4 ↔ −1/4, 0,5 ↔ 2. El cero queda excluido —ningún número multiplicado por 0 da 1—, así que el dominio son todos los reales excepto x = 0, y la gráfica se divide en dos ramas separadas.',
          'La función es su propia inversa: aplicar la recíproca dos veces devuelve el punto de partida, 1/(1/x) = x. Geométricamente esto significa que la gráfica es simétrica respecto a la recta y = x: reflejar la rama del primer cuadrante en esa diagonal la lleva sobre sí misma. También es una función impar, 1/(−x) = −(1/x), así que la rama del tercer cuadrante es la del primero rotada 180° sobre el origen.',
        ],
      },
      {
        heading: 'Asíntotas y comportamiento hiperbólico',
        body: [
          'Cuando x → 0⁺, 1/x → +∞; cuando x → 0⁻, 1/x → −∞: el eje y es una asíntota vertical con la curva disparándose hacia arriba en un lado y hacia abajo en el otro. Cuando x → ±∞, 1/x → 0: el eje x es una asíntota horizontal, con la curva acercándose desde arriba a la derecha y desde abajo a la izquierda. Los ejes enmarcan cada rama pero nunca la tocan.',
          'La derivada f′(x) = −1/x² es siempre negativa (donde existe), así que cada rama desciende de izquierda a derecha: la rama derecha cae de +∞ a 0, la izquierda sube de 0 a... espera, no: la rama izquierda va de 0 (en −∞) hacia abajo hasta −∞ (en 0⁻), también descendente. La curva es convexa en x > 0 y cóncava en x < 0, con la simetría impar intercambiando ambas.',
        ],
      },
      {
        heading: 'Dónde aparece la recíproca',
        body: [
          'Las relaciones inversas saturan la ciencia: la ley de la gravitación y la de Coulomb decaen como 1/r², la ecuación de las lentes delgadas dice 1/f = 1/do + 1/di, y las resistencias en paralelo se combinan como 1/R = 1/R₁ + 1/R₂. «Tiempo = distancia/velocidad» es una recíproca disfrazada, igual que «densidad = masa/volumen»: fijada una cantidad, la otra varía inversamente.',
          'En economía, la curva de demanda a menudo se modela con elasticidad constante mediante funciones de potencia que incluyen la recíproca, y el «reparto» —dividir un recurso fijo entre n personas da 1/n a cada una— es la recíproca en su forma más cotidiana. En cálculo, ∫(1/x)dx = ln|x| es la integral que la regla de potencias no puede tocar, vinculando la hipérbola con el logaritmo.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: todos los reales excepto x = 0; rango: todos los reales excepto y = 0.',
      'Asíntota vertical x = 0; asíntota horizontal y = 0.',
      'Función impar: 1/(−x) = −(1/x); simetría rotacional de 180° sobre el origen.',
      'Su propia inversa: 1/(1/x) = x; la gráfica es simétrica respecto a la recta y = x.',
      'Derivada f′(x) = −1/x² < 0 donde existe: cada rama es estrictamente decreciente.',
      'El producto x·(1/x) = 1 para todo x ≠ 0: la entrada y la salida se equilibran.',
    ],
    faqs: [
      {
        q: '¿Por qué 1/x no está definida en x = 0?',
        a: 'Porque ningún número multiplicado por 0 da 1: la ecuación 0·y = 1 no tiene solución. Al acercarse a 0 los valores explotan a ±∞, así que no hay ningún valor finito que asignar. La asíntota vertical marca una ruptura genuina, no un hueco rellenable.',
      },
      {
        q: '¿Las dos ramas están conectadas?',
        a: 'No: el dominio excluye x = 0, así que la rama del primer cuadrante (x > 0) y la del tercer cuadrante (x < 0) son piezas separadas sin puente entre ellas. La gráfica tiene dos componentes, aunque la simetría impar las haga parecer reflejos.',
      },
      {
        q: '¿Qué significa que sea «su propia inversa»?',
        a: 'Aplicar la función dos veces te devuelve al inicio: 1/(1/x) = x. Gráficamente, reflejar la curva en la recta y = x la deja inalterada. Muy pocas funciones tienen esta propiedad: la recíproca y la identidad son los ejemplos clásicos.',
      },
    ],
    related: [
      '/es/math-functions/natural-logarithm/',
      '/es/learn/asymptotes-explained/',
      '/es/learn/what-is-a-function/',
      '/es/graphing-calculator/',
    ],
  },
];
