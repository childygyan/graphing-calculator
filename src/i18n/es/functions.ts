/**
 * Diccionario español de funciones — textos del índice `/math-functions/` y
 * etiquetas compartidas de la plantilla `[slug]`.
 *
 * El contenido por función (displayName, notation, tagline, intro, keyFacts,
 * sections, faqs) está en `src/data/seo/es/functions.ts`. Los slugs, las
 * expresiones, la notación y las etiquetas matemáticas calculadas NO SE
 * TRADUCEN. Solo la estructura de la página y las etiquetas de la plantilla
 * dependen del diccionario.
 */

export const functions = {
  seo: {
    title: 'Biblioteca de funciones — Grafica y explora funciones | Graphing Calculator',
    description:
      'Explora la biblioteca de funciones: seno, coseno, cuadráticas, exponenciales, ' +
      'logaritmos y más; cada una con raíces, extremos y propiedades clave calculadas.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Biblioteca de funciones', href: '/math-functions/' },
  ],
  heading: 'Biblioteca de funciones',
  intro:
    'Cada página a continuación cubre en profundidad una función notable: qué es, sus ' +
    'propiedades matemáticas clave, dónde aparece, además de un panel de propiedades ' +
    'calculadas en vivo por el propio motor matemático de la calculadora (raíces, extremos, ' +
    'intersecciones, derivadas e integrales).',
  related: ['/graphing-calculator/', '/learn/', '/examples/', '/calculators/'],
  template: {
    eyebrow: 'Biblioteca de funciones',
    computedHeading: 'Propiedades calculadas',
    computedNoteTemplate:
      'Calculado por el propio motor matemático de la calculadora gráfica al generar esta página para {expression}.',
    rootsLabel: 'Raíces en [−10, 10]',
    yInterceptLabel: 'Intersección con el eje y f(0)',
    extremaLabel: 'Extremos locales en [−10, 10]',
    samplesLabel: 'Valores de muestra',
    derivativeLabel: 'Derivada f′(1)',
    integralLabel: 'Integral ∫₀¹ f(x) dx',
    noneFound: 'ninguna',
    moreTemplate: '…y {count} más',
    computeFailed: 'No se pudieron calcular las propiedades de esta expresión.',
    keyFactsHeading: 'Datos clave',
    ctaTemplate: 'Graficar {notation} en la calculadora',
    undefinedValue: 'indefinido',
    slugTitleTemplate: '{displayName} — Gráfica y propiedades',
  },
};
