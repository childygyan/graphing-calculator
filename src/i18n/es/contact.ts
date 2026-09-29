/**
 * Diccionario español de contacto — textos de la página `/contact/`.
 *
 * La dirección de correo es un valor de configuración del sitio (actualmente
 * un marcador de posición) y NO SE TRADUCE; solo el texto que la rodea es
 * parte del diccionario.
 */

export const contact = {
  seo: {
    title: 'Contacto',
    description: 'Cómo ponerte en contacto sobre Graphing Calculator.',
  },
  crumbs: [
    { label: 'Inicio', href: '/' },
    { label: 'Contacto', href: '/contact/' },
  ],
  heading: 'Contacto',
  body: [
    '¿Preguntas, informes de errores o comentarios sobre la calculadora? Son bienvenidos. ' +
      'La mejor forma de contactarnos es por correo electrónico:',
  ],
  emailNote:
    'No hay ningún formulario de contacto en esta página: el proyecto aún no tiene ' +
    'servidor, y un formulario que no llegara a ningún sitio sería deshonesto. El correo ' +
    'electrónico llega a una bandeja de entrada real.',
  related: [],
};
