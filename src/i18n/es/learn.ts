/**
 * Diccionario español de learn — textos del índice `/learn/` y etiquetas
 * compartidas de la plantilla `[slug]` de los artículos.
 *
 * El contenido por artículo (title, sections, faqs, keyTakeaways) está en
 * `src/data/seo/es/learn.ts`. Los slugs, las expresiones, los `tryExpressions`
 * y las fechas `reviewedOn` NO SE TRADUCEN; los arreglos de nombres de meses
 * existen para que los formateadores de fecha puedan mostrar esas fechas en
 * español.
 */

export const learn = {
  seo: {
    title: 'Aprender a graficar — Funciones, derivadas, integrales | Graphing Calculator',
    description:
      'Aprende conceptos de graficación paso a paso: funciones, derivadas, integrales, ' +
      'asíntotas, desigualdades y ecuaciones paramétricas, con ejemplos para probar.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Aprender', href: '/learn/' },
  ],
  heading: 'Aprender a graficar',
  intro:
    'Guías breves y prácticas sobre las ideas detrás de las gráficas, escritas para leerse ' +
    'junto a la calculadora, con expresiones que puedes probar tú mismo.',
  months: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
  shortMonths: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/calculators/'],
  template: {
    minReadTemplate: 'Aprender · {minutes} min de lectura',
    reviewAriaLabel: 'Información de revisión',
    reviewLine: 'Revisado por precisión matemática por el equipo de Graphing Calculator',
    lastReviewedTemplate: 'Última revisión: {date}',
    indexCardReviewTemplate: 'Revisado por precisión · {date}',
    tryHeading: 'Pruébalo en la calculadora',
    tryIntroTemplate:
      'Escribe cualquiera de estas expresiones en la {link} para ver las ideas anteriores en acción:',
    calculatorLinkText: 'calculadora gráfica',
    takeawaysHeading: 'Ideas clave',
  },
};
