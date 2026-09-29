/**
 * Diccionario español de chrome — textos compartidos del diseño (cabecera,
 * pie, navegación, migas de pan, modal, selector de idioma, etiqueta de tema).
 */

export const chrome = {
  skipLink: 'Saltar al contenido principal',
  logoAriaLabel: 'Inicio de Graphing Calculator',
  nav: {
    primaryLabel: 'Principal',
    mobileLabel: 'Móvil',
    openMenu: 'Abrir menú',
    items: [
      { label: 'Calculadora gráfica', href: '/graphing-calculator/' },
      { label: 'Funciones', href: '/math-functions/' },
      { label: 'Ejemplos', href: '/examples/' },
      { label: 'Aprender', href: '/learn/' },
      { label: 'Calculadoras', href: '/calculators/' },
      { label: 'Gráfica 3D', href: '/3d/' },
      { label: 'Calculadora científica', href: '/scientific-calculator/' },
      { label: 'Acerca de', href: '/about/' },
    ],
  },
  language: {
    label: 'Idioma',
    summaryTemplate: 'Idioma: {language}',
    note: '',
  },
  footer: {
    description:
      'Una calculadora gráfica online rápida y accesible. Grafica funciones matemáticas, ' +
      'gestiona múltiples expresiones y —en futuras versiones— explora las matemáticas con ' +
      'ayuda de la IA.',
    columns: [
      {
        heading: 'Producto',
        links: [
          { label: 'Calculadora gráfica', href: '/graphing-calculator/' },
          { label: 'Calculadoras', href: '/calculators/' },
          { label: 'Acerca de', href: '/about/' },
          { label: 'Metodología', href: '/methodology/' },
        ],
      },
      {
        heading: 'Explorar',
        links: [
          { label: 'Biblioteca de funciones', href: '/math-functions/' },
          { label: 'Ejemplos de gráficas', href: '/examples/' },
          { label: 'Aprender a graficar', href: '/learn/' },
          { label: 'Gráficas 3D', href: '/3d/' },
          { label: 'Alternativa a Desmos', href: '/desmos-alternative/' },
        ],
      },
      {
        heading: 'Calculadoras',
        links: [
          { label: 'Calculadora de derivadas', href: '/calculators/derivative/' },
          { label: 'Calculadora de integrales', href: '/calculators/integral/' },
          { label: 'Buscador de raíces', href: '/calculators/root-finder/' },
          { label: 'Calculadora científica', href: '/scientific-calculator/' },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Política de privacidad', href: '/privacy-policy/' },
          { label: 'Términos de servicio', href: '/terms/' },
          { label: 'Aviso legal', href: '/disclaimer/' },
          { label: 'Contacto', href: '/contact/' },
        ],
      },
    ],
    social: {
      groupLabel: 'Enlaces sociales',
      comingSoonTitle: 'Próximamente',
      comingSoon: '(pronto)',
      links: [
        { label: 'X', href: '' },
        { label: 'GitHub', href: '' },
        { label: 'YouTube', href: '' },
      ],
    },
    copyrightTemplate: '{year} {name}. Todos los derechos reservados.',
  },
  breadcrumbs: {
    ariaLabel: 'Ruta de navegación',
    homeLabel: 'Inicio',
  },
  faqDefaultHeading: 'Preguntas frecuentes',
  relatedDefaultHeading: 'Páginas relacionadas',
  modal: {
    close: 'Cerrar',
    backdrop: 'Cerrar diálogo',
  },
  themeLabelTemplate: 'Tema: {mode}. Actívalo para cambiar el tema.',
};
