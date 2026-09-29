/**
 * Diccionario español de errores — páginas 404/500, límites de error y
 * textos de error de la API del servidor.
 */

export const errors = {
  notFound: {
    title: 'Página no encontrada',
    description:
      'La página que buscabas no existe. Vuelve a la calculadora gráfica o a la página de inicio.',
    heading: 'Página no encontrada',
    body: 'Esta página no existe. Es posible que se haya movido o que el enlace sea incorrecto.',
    homeCta: 'Volver al inicio',
  },
  serverError: {
    title: 'Algo salió mal',
    description:
      'Ocurrió un error inesperado. Vuelve a la calculadora gráfica o a la página de inicio.',
    heading: 'Algo salió mal',
    body:
      'Ocurrió un error inesperado al cargar esta página. Tus gráficas guardadas están en ' +
      'tu navegador y están a salvo: prueba a recargar la página o vuelve al inicio.',
    homeCta: 'Volver al inicio',
    calculatorCta: 'Abrir la calculadora',
  },
  errorBoundary: {
    defaultTitle: 'Algo salió mal',
    message:
      'Un error inesperado interrumpió esta parte de la página. El resto de tus datos no se ha visto afectado.',
    retry: 'Reintentar',
  },
  api: {
    rateLimited: 'Demasiadas solicitudes a la IA. Espera un momento e inténtalo de nuevo.',
    invalidJson: 'El cuerpo de la solicitud debe ser un JSON válido.',
    serviceUnavailable:
      'El servicio de IA no está disponible en este momento. Inténtalo más tarde.',
    invalidResponse: 'La IA devolvió una respuesta no válida. Inténtalo de nuevo.',
  },
};
