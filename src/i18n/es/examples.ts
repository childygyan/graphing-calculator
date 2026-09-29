/**
 * Diccionario español de ejemplos — textos del índice `/examples/` y
 * etiquetas compartidas de la plantilla `[slug]`.
 *
 * El contenido por ejemplo (title, story, expressions, insights) está en
 * `src/data/seo/es/examples.ts`. Las etiquetas de las expresiones derivan
 * de sintaxis de expresión que NO SE TRADUCE.
 */

export const examples = {
  seo: {
    title: 'Ejemplos de gráficas — Gráficas interactivas | Graphing Calculator',
    description:
      'Explora ejemplos de gráficas seleccionados: movimiento de proyectiles, oscilación ' +
      'amortiguada, crecimiento logístico, curvas de Lissajous y más; cada uno se abre ' +
      'precargado en la calculadora.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Ejemplos', href: '/examples/' },
  ],
  heading: 'Ejemplos de gráficas',
  intro:
    'Gráficas seleccionadas a mano que muestran lo que la calculadora puede hacer: desde ' +
    'la física y la ingeniería hasta la belleza matemática pura. Cada ejemplo se abre ' +
    'precargado en la calculadora, con notas sobre qué observar.',
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/calculators/'],
  template: {
    eyebrow: 'Ejemplo resuelto',
    plottedHeading: 'Expresiones graficadas',
    openCta: 'Abrir esta gráfica en la calculadora',
    preloadNote:
      'El enlace precarga estas expresiones exactas en la calculadora, sin necesidad de escribir.',
    noticeHeading: 'Qué observar',
  },
};
