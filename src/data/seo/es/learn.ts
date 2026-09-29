/**
 * Artículos de aprendizaje en español para el centro /learn/.
 *
 * Cada dato es matemáticamente cierto. Sin estadísticas inventadas,
 * estudios, valoraciones ni afirmaciones de popularidad.
 * Los slugs, la notación matemática, las expresiones `tryExpressions`,
 * las fechas `reviewedOn` y las rutas con prefijo `/es/` NO SE TRADUCEN
 * (salvo el prefijo de locale en `related`).
 */
import type { LearnArticle } from '../types.js';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'what-is-a-function',
    reviewedOn: '2026-09-29',
    title: '¿Qué es una función? Dominio, rango y notación',
    description:
      'Aprende qué es realmente una función: entradas, salidas, dominio, rango y notación f(x), con ejemplos concretos que puedes graficar tú mismo.',
    sections: [
      {
        heading: 'Una función es una regla con una promesa',
        body: [
          'Una función es una regla que toma cada valor de entrada y le asigna exactamente un valor de salida. Esa palabra «exactamente» hace todo el trabajo: una función nunca puede entregar dos salidas distintas para la misma entrada. Si introduces x = 2, la función te devuelve una respuesta, y si introduces 2 de nuevo mañana, obtienes la misma respuesta. Los matemáticos llaman a este requisito estar «bien definida», y es lo que separa las funciones de tipos más laxos de relaciones entre cantidades.',
          'Considera f(x) = x^2. La entrada 3 produce la salida 9, y la entrada −3 también produce 9. Eso está bien —dos entradas distintas pueden compartir una salida. Lo que no estaría bien es que la regla asignara tanto 9 como 10 a la entrada 3. Entonces la regla no sería una función en absoluto.',
        ],
      },
      {
        heading: 'La notación f(x) y lo que significa',
        body: [
          'La expresión f(x) se lee «f de x», y nombra la salida de la función f cuando la entrada es x. La letra f es solo un nombre; igual podrías usar g, h o costeDe. Escribir f(x) = 2*x + 1 dice: la función f calcula su salida duplicando su entrada y sumando uno. Entonces f(4) = 9, f(−1) = −1, y así sucesivamente.',
          'Esta notación se vuelve poderosa cuando comparas funciones. Si g(x) = x^2, entonces f(g(2)) = f(4) = 9 —metiste la salida de g dentro de f. Encadenar funciones así se llama composición, y la notación facilita rastrear exactamente qué regla se aplica a qué valor. También te permite hablar de toda la función a la vez («f es creciente») en lugar de solo de valores individuales.',
        ],
      },
      {
        heading: 'Dominio: el conjunto de entradas permitidas',
        body: [
          'Toda función tiene un dominio: el conjunto de valores de entrada que acepta. Para f(x) = x^2, cualquier número real vale, así que el dominio son todos los números reales. Pero g(x) = sqrt(x) rechaza las entradas negativas —no hay ningún número real cuyo cuadrado sea negativo—, así que su dominio es x ≥ 0.',
          'A veces el dominio lo restringe la propia regla, y a veces la situación que la función modela. La función h(x) = 1/x excluye x = 0, porque dividir entre cero no está definido. Y si una función modela el precio de n manzanas, su dominio natural podrían ser los números de contar 1, 2, 3, …, aunque la fórmula 2.5*n aceptaría encantada entradas fraccionarias. Cuando trabajes con una función, ten siempre claro qué entradas puede realmente tomar.',
        ],
      },
      {
        heading: 'Rango: el conjunto de salidas producidas',
        body: [
          'El rango es el conjunto de valores de salida que la función produce realmente a medida que la entrada recorre el dominio. Para f(x) = x^2, elevar al cuadrado nunca da un número negativo, y todo número no negativo aparece como algún cuadrado (el cuadrado de su raíz cuadrada). Así que el rango son todos los números y ≥ 0.',
          'Dominio y rango responden preguntas distintas: el dominio pregunta «¿qué puedo meter?» y el rango pregunta «¿qué puede salir?». Para f(x) = 2*x + 1 ambos son todos los números reales, porque duplicar y desplazar puede alcanzar cualquier valor real. Para f(x) = sin(x) el dominio son todos los números reales pero el rango es solo [−1, 1], ya que la onda senoidal oscila entre −1 y 1 eternamente. Fijarse en el rango ayuda a leer una gráfica: es exactamente la extensión vertical de la curva.',
        ],
      },
      {
        heading: 'Leyendo todo esto en una gráfica',
        body: [
          'Una gráfica muestra una función directamente: cada punto (x, y) de la curva dice f(x) = y. El dominio es la sombra de la curva sobre el eje x —el tramo horizontal de puntos que aparecen realmente. El rango es la sombra sobre el eje y. Si la curva se rompe o se detiene, esas rupturas aparecen como huecos en el dominio.',
          'También hay una prueba rápida: la prueba de la recta vertical. Si cada recta vertical que dibujes cruza la curva como máximo una vez, la curva representa una función —porque cada x tiene como máximo una y. Un círculo falla esta prueba (una recta vertical por su centro lo cruza dos veces), y por eso un círculo completo no es la gráfica de una sola función. Prueba a introducir las expresiones de abajo en la calculadora gráfica, ajusta la vista y lee tú mismo el dominio y el rango de cada una.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sqrt(x)', '1/x', 'sin(x)'],
    keyTakeaways: [
      'Una función asigna exactamente una salida a cada entrada —esa promesa de salida única es la propiedad definitoria.',
      'f(x) es «f de x»: la salida de f en la entrada x. La composición f(g(x)) encadena dos reglas.',
      'El dominio es el conjunto de entradas permitidas; la división entre cero y las raíces cuadradas de negativos son las restricciones clásicas del dominio.',
      'El rango es el conjunto de salidas que la función produce realmente —la extensión vertical de su gráfica.',
      'La prueba de la recta vertical decide si una curva es una función: cualquier recta vertical puede cruzarla como máximo una vez.',
    ],
    faqs: [
      {
        q: '¿Un círculo es una función?',
        a: 'No —un círculo completo no es la gráfica de una función, porque algunas rectas verticales lo cruzan dos veces (falla la prueba de la recta vertical). Sin embargo, la mitad superior del círculo sí lo es: y = sqrt(r^2 − x^2) asigna a cada x exactamente una y, igual que la mitad inferior y = −sqrt(r^2 − x^2).',
      },
      {
        q: '¿Cuál es la diferencia entre dominio y rango?',
        a: 'El dominio es el conjunto de entradas que acepta una función; el rango es el conjunto de salidas que produce realmente. Para sin(x) el dominio son todos los números reales mientras que el rango es [−1, 1].',
      },
      {
        q: '¿Pueden dos entradas distintas dar la misma salida?',
        a: 'Sí. Una función debe dar a cada entrada exactamente una salida, pero entradas distintas pueden compartir una salida —por ejemplo, f(x) = x^2 da f(3) = f(−3) = 9.',
      },
    ],
    related: [
      '/es/learn/understanding-derivatives/',
      '/es/math-functions/sine/',
      '/es/math-functions/quadratic/',
      '/es/math-functions/square-root/',
      '/es/math-functions/reciprocal/',
      '/es/examples/logistic-growth/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-derivatives',
    reviewedOn: '2026-09-29',
    title: 'Derivadas: entender la razón de cambio y la pendiente',
    description:
      'Qué mide una derivada, cómo da la pendiente de una curva y cómo leer el crecimiento, el decrecimiento y los puntos extremos a partir de ella.',
    sections: [
      {
        heading: 'La derivada mide lo rápido que cambian las cosas',
        body: [
          'La derivada de una función es una nueva función que informa, en cada punto, lo rápido que cambia la función original. Si f(x) describe una cantidad —posición, precio, población—, entonces f′(x), la derivada en x, es la razón a la que esa cantidad cambia cuando la entrada es x. Una derivada positiva significa que la cantidad crece; una negativa, que se reduce; cero significa que está momentáneamente plana.',
          'En concreto, f′(x) es la pendiente de la recta tangente a la curva en x. Acércate lo suficiente a casi cualquier curva suave y parece una recta —la recta tangente—, y su inclinación es la derivada. Por eso la derivada tiene un significado geométrico y uno físico a la vez: pendiente en la gráfica, razón de cambio en el mundo.',
        ],
      },
      {
        heading: 'Razón de cambio media frente a instantánea',
        body: [
          'En un intervalo, la razón de cambio media de f desde x = a hasta x = b es (f(b) − f(a)) / (b − a) —elevación sobre avance de la recta secante entre los dos puntos. Así es exactamente como calculas la velocidad media: distancia recorrida dividida entre tiempo transcurrido. Pero no dice nada sobre lo que pasó entre a y b.',
          'La razón de cambio instantánea es lo que obtienes cuando el intervalo se encoge hasta desaparecer: el límite de (f(a+h) − f(a)) / h cuando h tiende a cero. Ese límite, cuando existe, es f′(a). En la práctica la calculadora computa las derivadas numéricamente a partir de esta idea, y puedes ver cómo la recta secante se inclina hasta convertirse en la tangente a medida que el intervalo se encoge. La razón instantánea es lo que muestra el velocímetro; la media es lo que muestra el ordenador de a bordo.',
        ],
      },
      {
        heading: 'Leer el crecimiento y el decrecimiento',
        body: [
          'El signo de la derivada te dice el comportamiento de la función. Donde f′(x) > 0, la función es creciente —la gráfica sube de izquierda a derecha. Donde f′(x) < 0, es decreciente. Donde f′(x) = 0, la tangente es horizontal y la función no está ni subiendo ni bajando momentáneamente.',
          'Toma f(x) = x^2. Su derivada es f′(x) = 2*x, negativa para x < 0 y positiva para x > 0. Efectivamente, la parábola desciende hacia el origen desde la izquierda y asciende alejándose de él a la derecha. Para f(x) = sin(x), la derivada es cos(x): la onda senoidal sube donde el coseno es positivo y baja donde es negativo, con picos planos exactamente donde cos(x) = 0.',
        ],
      },
      {
        heading: 'Puntos críticos y extremos locales',
        body: [
          'Los puntos donde f′(x) = 0 o donde la derivada no existe se llaman puntos críticos, y son los candidatos a máximos y mínimos locales —los picos y valles de la curva. En x = 0, f(x) = x^2 tiene derivada 2*x = 0, y efectivamente (0, 0) es el fondo de la parábola: la función cae, se aplana y luego sube.',
          'Pero una derivada cero no garantiza un pico o un valle. Para f(x) = x^3, la derivada es 3*x^2, que es cero en x = 0 —y sin embargo la función lo atraviesa directamente, aplanándose un instante en un punto de inflexión y siguiendo subiendo. Para clasificar un punto crítico, comprueba si la derivada cambia de signo a su alrededor: de negativo a positivo es un mínimo local, de positivo a negativo es un máximo local, sin cambio no es ninguno.',
        ],
      },
      {
        heading: 'La segunda derivada y la concavidad',
        body: [
          'Derivar dos veces da f′′(x), la segunda derivada —la razón de cambio de la razón de cambio. Geométricamente describe la concavidad: donde f′′(x) > 0 la curva se dobla hacia arriba como una copa (cóncava hacia arriba), y donde f′′(x) < 0 se dobla hacia abajo como un ceño (cóncava hacia abajo).',
          'Para f(x) = x^3, la segunda derivada es f′′(x) = 6*x: negativa a la izquierda del origen, positiva a su derecha. La cúbica se dobla hacia abajo a la izquierda, hacia arriba a la derecha, y cambia de concavidad en x = 0 —ese cambio es un punto de inflexión. La concavidad completa el retrato de la forma de una curva una vez que la primera derivada te ha dicho dónde sube y baja.',
        ],
      },
    ],
    tryExpressions: ['x^3 - 3*x', 'sin(x)', 'exp(x)', 'x^2 * sin(x)'],
    keyTakeaways: [
      'La derivada f′(x) es la razón de cambio instantánea de f en x —la pendiente de la recta tangente.',
      'Derivada positiva significa creciente, negativa significa decreciente, cero significa momentáneamente plana.',
      'Los puntos críticos (donde f′ = 0 o no existe) son los candidatos a máximos y mínimos locales; el cambio de signo de f′ los clasifica.',
      'Una derivada cero no siempre marca un extremo —x^3 tiene f′(0) = 0 pero sigue subiendo a través de un punto de inflexión.',
      'La segunda derivada f′′ describe la concavidad: copa hacia arriba donde es positiva, ceño hacia abajo donde es negativa.',
    ],
    faqs: [
      {
        q: '¿Cuál es la diferencia entre razón de cambio media e instantánea?',
        a: 'La razón media en [a, b] es (f(b) − f(a)) / (b − a), la pendiente de la recta secante entre los extremos. La instantánea en a es el límite de ese cociente cuando el intervalo se encoge a cero —la pendiente de la recta tangente, es decir, f′(a).',
      },
      {
        q: 'Si la derivada es cero en un punto, ¿siempre es un máximo o un mínimo?',
        a: 'No. Una derivada cero solo convierte el punto en crítico. Para f(x) = x^3, f′(0) = 0 pero la función sigue creciendo a través de x = 0 (un punto de inflexión). Comprueba si f′ cambia de signo a cada lado para clasificar el punto.',
      },
      {
        q: '¿Qué te dice la segunda derivada?',
        a: 'Describe la concavidad: donde f′′(x) > 0 la curva se dobla hacia arriba (cóncava hacia arriba), y donde f′′(x) < 0 se dobla hacia abajo (cóncava hacia abajo). Los puntos donde cambia la concavidad son puntos de inflexión.',
      },
    ],
    related: [
      '/es/learn/what-is-a-function/',
      '/es/learn/understanding-integrals/',
      '/es/math-functions/quadratic/',
      '/es/math-functions/cubic/',
      '/es/math-functions/sine/',
      '/es/math-functions/exponential/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-integrals',
    reviewedOn: '2026-09-29',
    title: 'Integrales y el área bajo la curva',
    description:
      'Aprende qué significan las integrales definidas como área con signo, cómo el teorema fundamental las vincula con las derivadas y cuándo usarlas.',
    sections: [
      {
        heading: 'Una integral mide la cantidad acumulada',
        body: [
          'La integral definida ∫ₐᵇ f(x) dx mide la acumulación total de f entre a y b. Si f(x) es una razón —velocidad, lluvia por hora, euros por artículo—, entonces la integral de esa razón en un intervalo es la cantidad total: distancia total, lluvia total, costo total. La integración suma infinitas piezas infinitesimales, dx, cada una ponderada por f(x).',
          'El retrato más directo es geométrico: cuando f(x) es positiva en [a, b], la integral equivale al área encerrada por la curva, el eje x y las rectas verticales x = a y x = b. Cada aplicación de las integrales es alguna versión de esta idea —primero el área, en general la acumulación.',
        ],
      },
      {
        heading: 'Área con signo: por qué el área puede ser negativa',
        body: [
          'Cuando la curva baja del eje x, la integral cuenta esa región como área negativa. La integral es área con signo: las regiones sobre el eje suman, las de debajo restan. Así ∫₀^{2π} sin(x) dx = 0, porque la joroba positiva de 0 a π y el valle negativo de π a 2π tienen áreas exactamente iguales y se cancelan.',
          'Esta cancelación es una virtud, no un defecto: refleja física genuina. Si la velocidad es positiva en la primera mitad de un viaje y negativa en la segunda, la integral da el desplazamiento (cambio neto de posición), que puede ser cero aunque el cuentakilómetros haya acumulado distancia. Si quieres el área total sin importar el signo, integra |f(x)| o integra las partes positiva y negativa por separado.',
        ],
      },
      {
        heading: 'El teorema fundamental del cálculo',
        body: [
          'El teorema fundamental del cálculo une integrales y derivadas como inversas. Si F es una antiderivada de f —es decir, F′(x) = f(x)—, entonces ∫ₐᵇ f(x) dx = F(b) − F(a). En lugar de aproximar un área con miles de rectángulos, evalúas una sola función en dos puntos y restas.',
          'Por eso las integrales se calculan simbólicamente cuando es posible: la antiderivada de 2*x es x^2, así que ∫₀³ 2*x dx = 3² − 0² = 9, y puedes verificar que esto equivale al área de un triángulo de base 3 y altura 6. El teorema convierte el problema difícil (sumar infinitas lonchas) en el problema fácil (evaluar una función dos veces).',
        ],
      },
      {
        heading: 'Área entre dos curvas',
        body: [
          'Las integrales también miden el área atrapada entre dos curvas. Si g(x) ≤ h(x) en [a, b], la región entre ellas tiene área ∫ₐᵇ (h(x) − g(x)) dx. Restas la curva inferior de la superior, convirtiendo el hueco en un problema ordinario de área bajo una curva.',
          'Por ejemplo, entre x = 0 y x = 1 la recta y = x está por encima de la curva y = x². El área entre ellas es ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6. Un error común es olvidar que las curvas pueden cruzarse: donde intercambian papeles, divide la integral en los puntos de cruce e integra |h(x) − g(x)|, o dejarás que el área con signo cancele regiones que deberían sumar.',
        ],
      },
      {
        heading: 'Probar integrales en la calculadora',
        body: [
          'Elige cualquier expresión de abajo y usa las herramientas de integración de la calculadora para sombrear el área bajo la curva entre dos límites. Observa cómo la región sombreada cambia de signo cuando la curva cruza el eje —la herramienta informa el área con signo, así que una onda simétrica como sin(x) en un período completo da neto cero.',
          'Luego prueba la relación con la antiderivada: grafica f(x) y su acumulación derivada de la integral juntas. Donde f es positiva, la curva acumulada sube; donde f es negativa, baja; donde f es cero, se nivela. Esa conexión —la derivada de la acumulación es la función original— es el teorema fundamental en forma visible.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'abs(x - 2)', 'exp(-x^2)'],
    keyTakeaways: [
      'La integral definida ∫ₐᵇ f(x) dx mide la cantidad acumulada —geométricamente, el área bajo la curva cuando f es positiva.',
      'Las integrales calculan área con signo: las regiones bajo el eje x cuentan como negativas y pueden cancelar las de arriba.',
      'El teorema fundamental del cálculo: ∫ₐᵇ f(x) dx = F(b) − F(a), donde F′ = f —derivación e integración se deshacen mutuamente.',
      'El área entre dos curvas es ∫ₐᵇ (superior − inferior) dx; divide la integral dondequiera que las curvas se crucen.',
      'Desplazamiento frente a distancia: la integral de la velocidad da el cambio neto; integrar el valor absoluto da la distancia total recorrida.',
    ],
    faqs: [
      {
        q: '¿Puede una integral definida ser negativa?',
        a: 'Sí. La integral mide área con signo, así que los tramos de la curva bajo el eje x aportan área negativa. Por ejemplo, ∫₀^{2π} sin(x) dx = 0 porque las jorobas positiva y negativa se cancelan exactamente.',
      },
      {
        q: '¿Qué es el teorema fundamental del cálculo?',
        a: 'Dice que si F′(x) = f(x), entonces ∫ₐᵇ f(x) dx = F(b) − F(a). En palabras: para integrar f, encuentra una función cuya derivada sea f, evalúala en los extremos y resta.',
      },
      {
        q: '¿Cómo hallo el área entre dos curvas?',
        a: 'Integra la diferencia superior − inferior en el intervalo: ∫ₐᵇ (h(x) − g(x)) dx donde h es la curva superior. Si las curvas se cruzan dentro de [a, b], divide la integral en cada cruce para que nada se cancele incorrectamente.',
      },
    ],
    related: [
      '/es/learn/understanding-derivatives/',
      '/es/learn/what-is-a-function/',
      '/es/math-functions/sine/',
      '/es/math-functions/quadratic/',
      '/es/math-functions/absolute-value/',
      '/es/examples/damped-oscillation/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'asymptotes-explained',
    reviewedOn: '2026-09-29',
    title: 'Asíntotas: verticales, horizontales y oblicuas',
    description:
      'Entiende las asíntotas —rectas a las que una gráfica se acerca sin tocar. Cubre asíntotas verticales, horizontales y oblicuas con ejemplos claros.',
    sections: [
      {
        heading: 'Qué es realmente una asíntota',
        body: [
          'Una asíntota es una recta a la que una curva se acerca arbitrariamente cuando la entrada se va a algún extremo —hacia el infinito, o hacia un punto donde la función explota— sin llegar a tocar la recta (en el sentido del límite). La idea clave es el acercamiento, no el contacto: la curva puede pegarse a la recta tanto como quieras, siempre que vayas lo bastante lejos.',
          'Las asíntotas vienen en tres sabores. Las asíntotas verticales son rectas verticales x = a donde la función crece sin cota cerca de a. Las horizontales son rectas horizontales y = L hacia las que la función se asienta cuando x → ±∞. Las oblicuas son rectas diagonales que la función sigue cuando crece aproximadamente lineal en el infinito. Cada tipo se diagnostica de forma distinta, y cada uno te dice algo sobre el comportamiento a largo plazo o cerca de la singularidad.',
        ],
      },
      {
        heading: 'Asíntotas verticales: donde la función explota',
        body: [
          'Una asíntota vertical x = a ocurre donde los valores de la función se disparan hacia +∞ o −∞ cuando x se acerca a a. El ejemplo clásico es f(x) = 1/x en x = 0: mete 0.1 y obtén 10, mete 0.001 y obtén 1000, y no hay ningún valor finito exactamente en 0 porque dividir entre cero no está definido.',
          'Para hallarlas en una función racional, factoriza el denominador: cada factor (x − a) que no se cancele con el numerador suele dar una asíntota vertical en x = a. Pero la cancelación importa —en g(x) = (x^2 − 1)/(x − 1), el factor (x − 1) se cancela, así que x = 1 es un hueco (una discontinuidad removible), no una asíntota. Cuando graficas f(x) = 1/x y amplías hacia x = 0, las dos ramas se separan volando verticalmente, y el muestreo adaptativo de la calculadora debe evitar dibujar una racha engañosa cruzando el hueco.',
        ],
      },
      {
        heading: 'Asíntotas horizontales: el comportamiento final',
        body: [
          'Una asíntota horizontal describe hacia qué tiende la función cuando x crece en cualquier dirección. Si f(x) se acerca a un valor finito L cuando x → ∞ (o x → −∞), entonces y = L es una asíntota horizontal. Para f(x) = 1/x, los valores se encogen hacia 0 cuando x crece —así que y = 0 es la asíntota horizontal.',
          'Para una función racional p(x)/q(x), compara grados: si el grado del denominador es mayor, la asíntota horizontal es y = 0; si los grados son iguales, es y = (coeficiente principal de p) / (coeficiente principal de q); si el grado del numerador es mayor, no hay asíntota horizontal —la función crece sin cota, y posiblemente siga una oblicua en su lugar. Observa que una curva puede cruzar su asíntota horizontal para x moderados; la asíntota solo restringe los extremos lejanos.',
        ],
      },
      {
        heading: 'Asíntotas oblicuas: seguir una recta diagonal',
        body: [
          'Cuando el numerador de una función racional supera exactamente en un grado al denominador, la función crece aproximadamente como una recta en el infinito, y esa recta es la asíntota oblicua. Toma f(x) = (x^2 + 1)/x: la división polinómica da x + 1/x, y cuando x → ±∞, el término 1/x se desvanece, dejando y = x como la asíntota a la que la curva se abraza.',
          'Puedes verificarlo visualmente graficando la función y la recta y = x juntas y alejando mucho la vista: el hueco entre ellas se encoge hasta desaparecer. Las asíntotas oblicuas son más raras en la práctica que los otros dos tipos, pero aparecen siempre que un cociente crece linealmente —por ejemplo en ciertos modelos económicos con costo por unidad más un costo fijo dividido entre la cantidad.',
        ],
      },
      {
        heading: 'Por qué importan las asíntotas al graficar',
        body: [
          'Las asíntotas son el esqueleto de una gráfica: te dicen a dónde debe ir la curva cerca de sus puntos problemáticos y en los extremos, antes de calcular un solo punto intermedio. Esbozar primero las asíntotas —rectas verticales en los puntos de explosión, la guía horizontal u oblicua en el infinito— deja solo rellenar segmentos bien portados entre ellas.',
          'También advierten sobre restricciones del dominio (las asíntotas verticales marcan entradas excluidas) y sobre representaciones engañosas. Un trazador ingenuo puede dibujar una línea casi vertical cruzando una asíntota vertical, conectando las dos ramas como si la función pasara por el hueco. Introduce 1/x en la calculadora, amplía en x = 0 y confirma que ves dos ramas separadas con un hueco genuino —ese hueco es la asíntota hecha visible.',
        ],
      },
    ],
    tryExpressions: ['1/x', '(x^2 + 1)/x', '(2*x^2 + 3)/(x^2 - 1)', 'tan(x)'],
    keyTakeaways: [
      'Una asíntota es una recta a la que una curva se acerca arbitrariamente —vertical (x = a), horizontal (y = L) u oblicua (diagonal).',
      'Las asíntotas verticales ocurren donde la función explota a ±∞; en funciones racionales, busca ceros no cancelados del denominador.',
      'Las asíntotas horizontales describen el comportamiento final: compara los grados del numerador y el denominador en funciones racionales.',
      'Cuando el numerador supera en un grado al denominador, la gráfica sigue una asíntota oblicua como y = x.',
      'Una curva puede cruzar una asíntota horizontal con valores moderados de x —la asíntota solo gobierna los extremos lejanos.',
    ],
    faqs: [
      {
        q: '¿Cuál es la diferencia entre una asíntota vertical y un hueco?',
        a: 'Una asíntota vertical x = a es donde la función crece sin cota cerca de a (p. ej., 1/x en x = 0). Un hueco (discontinuidad removible) es donde un factor cancelado dejó la función indefinida en un solo punto pero los valores cercanos se mantienen finitos —p. ej., (x^2 − 1)/(x − 1) se simplifica a x + 1 con un hueco en x = 1.',
      },
      {
        q: '¿Puede una gráfica cruzar su asíntota?',
        a: 'Puede cruzar una asíntota horizontal con x finita —por ejemplo, f(x) = sin(x)/x cruza y = 0 repetidamente, y aun así y = 0 sigue siendo su asíntota horizontal ya que f(x) → 0 cuando x → ±∞. Las asíntotas verticales, en el sentido de cruzarlas, no se cruzan en el propio punto de explosión puesto que la función no está definida allí.',
      },
      {
        q: '¿Cómo hallo la asíntota horizontal de una función racional?',
        a: 'Compara grados: si el grado del denominador es mayor, la asíntota es y = 0; si los grados son iguales, es y = (coeficiente principal del numerador)/(coeficiente principal del denominador); si el grado del numerador es exactamente uno mayor, hay en su lugar una asíntota oblicua (se halla con división polinómica).',
      },
    ],
    related: [
      '/es/learn/what-is-a-function/',
      '/es/math-functions/reciprocal/',
      '/es/math-functions/tangent/',
      '/es/math-functions/natural-logarithm/',
      '/es/examples/logistic-growth/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'graphing-inequalities',
    reviewedOn: '2026-09-29',
    title: 'Graficar desigualdades en dos variables',
    description:
      'Cómo graficar desigualdades como y > x^2: curvas frontera, líneas discontinuas frente a continuas, sombreado y puntos de prueba, paso a paso.',
    sections: [
      {
        heading: 'De ecuaciones a desigualdades',
        body: [
          'La ecuación y = x^2 dibuja una sola curva: la parábola. La desigualdad y > x^2 pide algo más grande —cada punto (x, y) cuya coordenada y esté por encima de la parábola. En lugar de una curva, la solución es una región entera: el área infinita barrida por encima de la curva. Graficar una desigualdad significa dibujar la frontera y sombrear el lado que la satisface.',
          'Este paso de curva a región es todo el salto conceptual. Una ecuación en dos variables suele describir una curva unidimensional; una desigualdad describe una región bidimensional cuyo borde es esa curva. Cada punto que pruebes o bien pertenece a la región o bien no, y la curva frontera es donde se cumple la igualdad.',
        ],
      },
      {
        heading: 'Curvas frontera: discontinuas frente a continuas',
        body: [
          'El primer paso es graficar la frontera —la ecuación que obtienes al reemplazar el signo de desigualdad por =. Para y ≥ x^2 la frontera es la parábola y = x^2, y se dibuja continua porque sus puntos satisfacen la desigualdad: la frontera está incluida en la solución.',
          'Para desigualdades estrictas (< o >), la frontera se dibuja discontinua, porque los puntos de la propia curva no satisfacen la desigualdad. y > x^2 e y ≥ x^2 difieren solo en la propia parábola, y sin embargo esa diferencia de un punto de grosor importa en problemas de optimización, donde un óptimo situado exactamente sobre una frontera estricta es inalcanzable. La calculadora sigue esta convención: discontinua para estrictas, continua para no estrictas.',
        ],
      },
      {
        heading: 'Sombreado y el método del punto de prueba',
        body: [
          'Una vez dibujada la frontera, esta divide el plano en regiones (normalmente dos). Elige cualquier punto que no esté en la frontera —un punto de prueba—, mételo en la desigualdad y mira si el enunciado es verdadero. Si lo es, sombrea toda la región de ese punto; si no, sombrea el otro lado.',
          'Para y > x^2, el origen (0, 0) es un punto de prueba cómodo —un momento, está en la frontera. Elige (0, 1) en su lugar: 1 > 0 es verdadero, así que sombrea la región sobre la parábola que contiene a (0, 1). Un hábito seguro: verifica siempre que tu punto de prueba no esté en la frontera antes de confiar en el resultado, y confirma con un segundo punto de la región sombreada si la desigualdad es complicada.',
        ],
      },
      {
        heading: 'Sistemas de desigualdades y regiones factibles',
        body: [
          'Los problemas reales suelen implicar varias desigualdades a la vez —un sistema. La solución es el conjunto de puntos que las satisfacen todas simultáneamente: la intersección de las regiones sombreadas individuales. Cada desigualdad nueva solo puede encoger la solución, nunca agrandarla, porque los puntos ahora deben pasar una prueba más.',
          'Este es el corazón geométrico de la programación lineal: restricciones como x ≥ 0, y ≥ 0 y 2*x + 3*y ≤ 12 recortan una región factible poligonal, y el óptimo de un objetivo lineal siempre está en una de sus esquinas. Sombrea cada desigualdad por turno, conserva solo el solapamiento, y la región factible que queda es donde todas las restricciones se cumplen a la vez. Prueba y ≤ x^2 e y ≥ −x juntas para ver una intersección en forma de lente limitada por dos curvas.',
        ],
      },
      {
        heading: 'Leer una gráfica sombreada',
        body: [
          'Una gráfica de desigualdad terminada comunica tres cosas: la frontera (con su significado discontinuo/continuo), la región sombreada de la solución e implícitamente todo lo que queda fuera del sombreado, que no la satisface. Al leer una gráfica así, primero identifica la curva frontera y su rigidez, luego confirma que el sombreado coincide con un rápido punto de prueba mental.',
          'Lecturas erróneas comunes: olvidar que el lado sin sombrear está excluido (no «se desconoce»), confundir una frontera discontinua con una incluida y, en sistemas, sombrear cada desigualdad pero no tomar nunca la intersección. Introduce las expresiones de abajo, alterna entre formas estrictas y no estrictas, y observa cómo cambian el sombreado y el estilo de la frontera mientras el significado de la región cambia exactamente en la curva frontera.',
        ],
      },
    ],
    tryExpressions: ['x^2', '2 - x', 'abs(x)', 'sin(x)'],
    keyTakeaways: [
      'Una desigualdad en dos variables describe una región del plano; su borde es la curva frontera donde se cumple la igualdad.',
      'Dibuja la frontera discontinua para desigualdades estrictas (<, >) y continua cuando la frontera está incluida (≤, ≥).',
      'Usa un punto de prueba fuera de la frontera para decidir qué lado sombrear; reconfirma con un segundo punto en casos complejos.',
      'La solución de un sistema de desigualdades es la intersección de las regiones individuales —cada restricción solo puede encogerla.',
      'En programación lineal, el óptimo de un objetivo lineal sobre una región factible poligonal siempre ocurre en una esquina de esa región.',
    ],
    faqs: [
      {
        q: '¿Cuándo uso una línea discontinua en lugar de una continua?',
        a: 'Usa una frontera discontinua para desigualdades estrictas (< o >), porque los puntos de la frontera no satisfacen la desigualdad. Usa una frontera continua para ≤ o ≥, donde los puntos de la frontera están incluidos en la solución.',
      },
      {
        q: '¿Cómo sé qué lado de la frontera sombrear?',
        a: 'Elige un punto de prueba que no esté en la frontera, sustitúyelo en la desigualdad y sombrea la región que contiene al punto si el enunciado es verdadero —si no, sombrea la otra región.',
      },
      {
        q: '¿Qué es la región factible en un sistema de desigualdades?',
        a: 'Es la intersección de todas las regiones de solución individuales: el conjunto de puntos que satisfacen cada desigualdad a la vez. En programación lineal, el óptimo de un objetivo lineal sobre una región factible poligonal siempre ocurre en una esquina (vértice) de esa región.',
      },
    ],
    related: [
      '/es/learn/what-is-a-function/',
      '/es/math-functions/quadratic/',
      '/es/math-functions/absolute-value/',
      '/es/math-functions/square-root/',
      '/es/examples/projectile-motion/',
      '/es/graphing-calculator/',
    ],
  },
  {
    slug: 'parametric-vs-cartesian',
    reviewedOn: '2026-09-29',
    title: 'Ecuaciones paramétricas frente a cartesianas',
    description:
      'Ecuaciones cartesianas y = f(x) frente a paramétricas x(t), y(t): qué puede expresar cada una, cuándo usar cada cuál y cómo convertir entre ellas.',
    sections: [
      {
        heading: 'Forma cartesiana: y como función de x',
        body: [
          'La forma cartesiana y = f(x) es la familiar: para cada x, la ecuación te entrega la y. Es el lenguaje natural de las funciones —cada recta vertical corta la gráfica como máximo una vez, así que la curva nunca se repliega sobre sí misma verticalmente. El pensamiento entrada-salida, el dominio y el rango, y la prueba de la recta vertical pertenecen a esta forma.',
          'Pero la forma tiene un límite duro: no puede describir curvas que se enrollan, se auto-intersecan o viajan verticalmente. Un círculo necesita dos ecuaciones cartesianas (mitades superior e inferior); una curva trazada dos veces, o trazada hacia atrás, es inexpresable. Siempre que la posición, la forma o el movimiento son más ricos que «una y por x», la forma cartesiana se queda sin espacio.',
        ],
      },
      {
        heading: 'Forma paramétrica: ambas coordenadas siguen un parámetro',
        body: [
          'Las ecuaciones paramétricas introducen una tercera variable, el parámetro t, y definen x e y por separado: x = x(t), y = y(t). A medida que t recorre su rango, el punto (x(t), y(t)) traza la curva. El círculo unitario se convierte en x = cos(t), y = sin(t) para t en [0, 2π) —un par limpio de ecuaciones, sin partir en mitades, sin ambigüedad de ±.',
          'El parámetro a menudo tiene significado: puede ser el tiempo. Entonces x = t, y = t^2 traza la parábola y = x^2 de izquierda a derecha a medida que t crece, mientras que x = −t, y = t^2 traza la misma parábola de derecha a izquierda. Misma forma, viajes opuestos —una distinción que la forma cartesiana ni siquiera puede enunciar. La forma paramétrica separa cómo es la curva de cómo se recorre.',
        ],
      },
      {
        heading: 'Convertir entre las dos formas',
        body: [
          'Pasar de paramétrica a cartesiana significa eliminar el parámetro. Si x = t e y = t^2, sustituir da y = x^2 directamente. Para x = cos(t), y = sin(t), elevar al cuadrado y sumar usa cos²t + sin²t = 1 para recuperar x² + y² = 1. La eliminación suele ser álgebra más una identidad bien elegida.',
          'La dirección inversa —parametrizar una curva cartesiana— siempre tiene al menos una respuesta trivial: pon x = t, y = f(t). Las parametrizaciones interesantes son las no triviales, como la del círculo de arriba o x = t^2, y = t^4 − 3*t^2 para una curva que revisita puntos. Observa que la conversión puede perder información: eliminar t de x = t, y = t^2 descarta la dirección del recorrido, que solo la forma paramétrica registraba.',
        ],
      },
      {
        heading: 'Cuándo cada forma es la herramienta adecuada',
        body: [
          'Usa la forma cartesiana cuando la relación sea genuinamente funcional —una salida por entrada— y cuando quieras las herramientas del cálculo (derivadas, integrales, búsqueda de raíces) en su escenario más simple. La mayoría de las fórmulas de la ciencia y la economía llegan así.',
          'Usa la forma paramétrica para curvas cerradas, curvas auto-intersecadas y todo lo que implique movimiento o trazado —trayectorias de proyectiles con el tiempo como parámetro, figuras de Lissajous, epiciclos como engranajes. Recurre también a ella cuando una ecuación cartesiana sea torpe: la curva x = y^2 es una parábola tumbada perfectamente buena, pero no es una función de x, mientras que x = t^2, y = t la parametriza sin esfuerzo. Si la curva se enrolla o el viaje importa, ve a lo paramétrico.',
        ],
      },
      {
        heading: 'Ver la diferencia en la calculadora',
        body: [
          'Grafica y = sin(x) en forma cartesiana, luego grafica x = t, y = sin(t) paramétricamente sobre la misma ventana: curvas idénticas, porque la segunda es solo una reparametrización de la primera. Ahora prueba x = sin(t), y = sin(2*t) —una figura de Lissajous— y pregunta qué única ecuación cartesiana y = f(x) podría producirla. Ninguna puede: la curva se cruza a sí misma y asigna múltiples valores de y a una x.',
          'Ajusta el rango de t y observa el trazado: con t de 0 a π obtienes la mitad de la figura, con 0 a 2π la figura entera. Ese control sobre cuánto de la curva se dibuja, y en qué orden, es la ventaja distintiva de la forma paramétrica —y la razón por la que el movimiento, desde proyectiles hasta órbitas planetarias, se modela paramétricamente.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'cos(x)', 'sqrt(4 - x^2)'],
    keyTakeaways: [
      'La forma cartesiana y = f(x) da una y por x —no puede describir bucles, segmentos verticales ni auto-intersecciones.',
      'La forma paramétrica x = x(t), y = y(t) traza una curva a medida que t varía; t a menudo representa el tiempo, codificando la dirección del recorrido.',
      'El círculo unitario necesita dos ecuaciones cartesianas pero un solo par paramétrico: x = cos(t), y = sin(t).',
      'Eliminar el parámetro convierte de paramétrica a cartesiana, pero la información de la dirección del recorrido se pierde.',
      'Usa la forma paramétrica cuando la curva se enrolla, se auto-interseca o cuando el viaje a lo largo de ella importa; usa la cartesiana para relaciones funcionales.',
    ],
    faqs: [
      {
        q: '¿Toda curva paramétrica puede escribirse como y = f(x)?',
        a: 'No. Solo las curvas que pasan la prueba de la recta vertical pueden. Un círculo, una figura de Lissajous o cualquier curva que asigne dos valores de y a una x no tiene una única ecuación cartesiana y = f(x) —aunque sus trozos sí puedan escribirse así por separado.',
      },
      {
        q: '¿Qué suele representar el parámetro t?',
        a: 'A menudo el tiempo: x = x(t), y = y(t) describe entonces una posición que evoluciona con el tiempo. Pero t es solo una variable de trazado —vale cualquier intervalo, y la misma curva geométrica puede trazarse con muchas parametrizaciones distintas, hacia adelante o hacia atrás, rápido o despacio.',
      },
      {
        q: '¿Cómo convierto ecuaciones paramétricas a forma cartesiana?',
        a: 'Elimina el parámetro: despeja t en una ecuación (o usa una identidad) y sustituye en la otra. Para x = cos(t), y = sin(t), elevar al cuadrado y sumar da x² + y² = 1 vía cos²t + sin²t = 1.',
      },
    ],
    related: [
      '/es/learn/what-is-a-function/',
      '/es/learn/graphing-inequalities/',
      '/es/math-functions/sine/',
      '/es/math-functions/cosine/',
      '/es/math-functions/quadratic/',
      '/es/math-functions/square-root/',
      '/es/examples/lissajous-curve/',
      '/es/examples/projectile-motion/',
      '/es/graphing-calculator/',
    ],
  },
];
