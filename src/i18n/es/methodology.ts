/**
 * Diccionario español de methodology — textos de la página `/methodology/`.
 *
 * Los enlaces dentro del texto se listan por sección en `links`; el texto de
 * la etiqueta aparece en el párrafo en la misma posición. Los hrefs se
 * mantienen constantes (las páginas los relocalizan al renderizar).
 */

export const methodology = {
  seo: {
    title: 'Metodología — Cómo verificamos las matemáticas | Graphing Calculator',
    description:
      'Cómo Graphing Calculator verifica sus matemáticas y su contenido: un motor ' +
      'determinista, cientos de pruebas automatizadas, ejemplos comprobados con el motor y ' +
      'revisiones fechadas.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Metodología', href: '/methodology/' },
  ],
  heading: 'Nuestra metodología',
  sections: [
    {
      heading: '1. Cómo se calculan y verifican los cálculos',
      body: [
        'Una calculadora solo es útil si puedes confiar en lo que te dice. Esta página ' +
          'documenta exactamente cómo Graphing Calculator calcula los resultados, cómo se ' +
          'escribe y revisa su contenido educativo, y lo que deliberadamente no hacemos.',
        'Cada número de este sitio proviene de un motor matemático determinista escrito ' +
          'específicamente para él. Una expresión que escribes se convierte en tokens, se ' +
          'analiza en un árbol de sintaxis abstracta y se compila en funciones ejecutables: ' +
          'nunca pasa por eval ni por código generado. Las raíces se encuentran con el método ' +
          'de Brent, las derivadas con diferencias centrales, las integrales con la regla de ' +
          'Simpson adaptativa y los límites con estimación numérica bilateral.',
        'Más de 550 pruebas automatizadas cubren el motor de expresiones, los métodos ' +
          'numéricos, el estado de las gráficas, el graficador 3D y la calculadora científica. ' +
          'Se ejecutan antes de cada lanzamiento, y ningún lanzamiento sale si no pasan todas. ' +
          'Cuando un cálculo no se puede realizar de forma fiable —una discontinuidad, una ' +
          'integral que no converge, una evaluación fuera del dominio— la herramienta informa ' +
          'del fallo con honestidad en lugar de inventar un número.',
      ],
      links: [{ label: 'Calculadora gráfica', href: '/graphing-calculator/' }],
    },
    {
      heading: '2. Cómo se escribe y revisa el contenido educativo',
      body: [
        'Las guías de aprendizaje enseñan a graficar desde cero: qué son las funciones, cómo ' +
          'funcionan el dominio y el rango, cómo leer intersecciones y asíntotas, y cómo usar ' +
          'cada herramienta de este sitio. Cada guía se escribe a partir de material ' +
          'curricular estándar de matemáticas, no se copia ni se genera a partir de otros ' +
          'sitios web.',
        'Antes de publicar una guía, sus afirmaciones matemáticas se verifican con el propio ' +
          'motor de expresiones del sitio: las raíces, los valores de ejemplo y los dominios ' +
          'que aparecen en el texto deben coincidir con lo que la propia calculadora calcula. ' +
          'Un revisor humano del equipo de Graphing Calculator lee después la guía para ' +
          'comprobar su claridad y corrección. Cada guía lleva una fecha de «Última revisión» ' +
          'y una firma que nombra al revisor, para que puedas ver exactamente cuándo se hizo ' +
          'esa comprobación.',
      ],
      links: [{ label: 'guías de aprendizaje', href: '/learn/' }],
    },
    {
      heading: '3. Cómo está limitado el asistente de IA',
      body: [
        'El asistente de IA integrado puede explicar conceptos, sugerir expresiones para ' +
          'graficar y ayudarte a configurar gráficas. Funciona con un esquema estricto de ' +
          'comandos: solo puede emitir comandos de la calculadora, y el motor de la ' +
          'calculadora —no la IA— realiza cada cálculo. El asistente no puede cambiar lo que ' +
          'el motor calcula ni puede acceder a tus gráficas guardadas.',
        'Hasta que el propietario del sitio configure una clave de proveedor de IA, el ' +
          'asistente funciona en un modo simulado claramente etiquetado que lo indica en ' +
          'pantalla. Nunca finge estar conectado a un modelo en vivo cuando no lo está.',
      ],
    },
    {
      heading: '4. Lo que no hacemos',
      body: [
        'Sin revisores inventados. No publicamos nombres, fotos ni credenciales falsas. Las ' +
          'firmas de revisión dicen exactamente quién revisó el contenido —el equipo de ' +
          'Graphing Calculator— y cuándo.',
        'Sin estadísticas fabricadas. No afirmamos cifras de usuarios, valoraciones ni ' +
          'clasificaciones de «el mejor» que no podamos verificar. Las comparaciones con otros ' +
          'productos solo presentan datos públicos y conocidos.',
        'Sin interfaces copiadas. La calculadora es una implementación independiente. No ' +
          'reproduce la marca, la interfaz ni el material con derechos de autor de ningún ' +
          'otro producto.',
        'Sin recopilaci\u00f3n oculta de datos. Los gr\u00e1ficos se almacenan en tu navegador; ' +
          'los enlaces para compartir codifican el estado en la URL. No hay cuentas. El sitio s\u00ed ' +
          'utiliza Google Analytics para estad\u00edsticas de uso agregadas. Consulta la pol\u00edtica ' +
          'de privacidad para m\u00e1s detalles.',
      ],
      links: [{ label: 'política de privacidad', href: '/privacy-policy/' }],
    },
    {
      heading: '5. Correcciones',
      body: [
        'Si encuentras un error en un cálculo o en una guía, contáctanos con los detalles. ' +
          'Los errores reportados se investigan con el motor matemático, se corrigen cuando se ' +
          'confirman, y la fecha de «Última revisión» de la guía se actualiza para reflejar ' +
          'la corrección.',
      ],
      links: [{ label: 'contáctanos', href: '/contact/' }],
    },
  ],
  faqs: [
    {
      question: '¿Cómo se verifican los cálculos?',
      answer:
        'Cada resultado proviene de un motor matemático determinista integrado en el sitio: ' +
        'las expresiones se convierten en tokens, se analizan en un árbol de sintaxis ' +
        'abstracta y se compilan en funciones, nunca se evalúan con eval. Más de 550 pruebas ' +
        'automatizadas cubren el motor, los métodos de análisis y la interfaz, y se ejecutan ' +
        'antes de cada lanzamiento.',
    },
    {
      question: '¿El asistente de IA hace las matemáticas?',
      answer:
        'No. El asistente de IA explica conceptos y emite comandos de la calculadora, pero ' +
        'el propio motor de la calculadora es siempre la fuente de verdad de los resultados. ' +
        'Hasta que el propietario del sitio configure una clave de API, el asistente funciona ' +
        'en un modo simulado claramente etiquetado.',
    },
    {
      question: '¿Cómo se revisan las guías de aprendizaje?',
      answer:
        'Cada guía se revisa por precisión matemática antes de publicarse: las raíces, los ' +
        'dominios y los valores de ejemplo que presenta se verifican con el propio motor de ' +
        'expresiones del sitio. Un revisor humano del equipo de Graphing Calculator lee ' +
        'después cada guía para comprobar su claridad y corrección, y la guía lleva una fecha ' +
        'de «Última revisión» que muestra cuándo se hizo esa comprobación.',
    },
    {
      question: '¿Quién revisa el contenido?',
      answer:
        'El contenido lo revisa el equipo de Graphing Calculator: las personas que crean y ' +
        'mantienen este sitio. No inventamos nombres, fotos ni credenciales de revisores; la ' +
        'firma de cada guía dice exactamente quién la revisó y cuándo.',
    },
    {
      question: '¿Qué pasa cuando se encuentra un error?',
      answer:
        'Se corrige, y la fecha de «Última revisión» de la guía se actualiza. Si detectas un ' +
        'error, puedes reportarlo desde la página de contacto y se investigará con el motor ' +
        'matemático.',
    },
    {
      question: '¿La salida numérica es exacta?',
      answer:
        'Los métodos numéricos son aproximaciones, y la calculadora lo dice donde importa. ' +
        'Cuando una raíz, una derivada o una integral no se puede calcular —una esquina, un ' +
        'salto, una singularidad— la herramienta lo informa con honestidad en lugar de ' +
        'devolver un número engañoso.',
    },
  ],
  related: ['/about/', '/learn/', '/graphing-calculator/', '/desmos-alternative/'],
};
