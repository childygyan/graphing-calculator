/**
 * Dicionário português de errors — páginas 404/500, limites de erro e
 * mensagens de erro da API de IA.
 */

import type { ErrorsStrings } from '../types.js';

export const errors: ErrorsStrings = {
  notFound: {
    title: 'Página não encontrada',
    description:
      'A página que você procurava não existe. Volte para a calculadora gráfica ou para a página inicial.',
    heading: 'Página não encontrada',
    body: 'Esta página não existe. Ela pode ter sido movida ou o link pode estar errado.',
    homeCta: 'Voltar para o início',
  },
  serverError: {
    title: 'Algo deu errado',
    description:
      'Ocorreu um erro inesperado. Volte para a calculadora gráfica ou para a página inicial.',
    heading: 'Algo deu errado',
    body:
      'Ocorreu um erro inesperado ao carregar esta página. Seus gráficos salvos estão ' +
      'armazenados no seu navegador e estão seguros — tente recarregar ou volte para o início.',
    homeCta: 'Voltar para o início',
    calculatorCta: 'Abrir a calculadora',
  },
  errorBoundary: {
    defaultTitle: 'Algo deu errado',
    message:
      'Um erro inesperado interrompeu esta parte da página. Seus outros dados não foram afetados.',
    retry: 'Tentar novamente',
  },
  api: {
    rateLimited: 'Muitas solicitações à IA. Aguarde um momento e tente novamente.',
    invalidJson: 'O corpo da solicitação deve ser um JSON válido.',
    serviceUnavailable: 'O serviço de IA está indisponível no momento. Tente novamente mais tarde.',
    invalidResponse: 'A IA retornou uma resposta inválida. Tente novamente.',
  },
};
