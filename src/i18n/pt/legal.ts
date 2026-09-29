/**
 * Portuguese (pt) legal dictionary — privacy policy, terms of service, and
 * disclaimer pages.
 *
 * Mirrors `../en/legal.ts` exactly: same keys, same nesting, same placeholder
 * names. `updatedTemplate` takes a `{date}` formatted by the page from the
 * page's own last-updated value (dates stay with the page source). The contact
 * email template is filled with the site-config address. API route and
 * provider names (`/api/ai/math`, DeepSeek) are identifiers and stay as-is.
 * The page-top `notice` is translated (interface chrome, not legal text);
 * the legal bodies stay in English.
 */

import type { LegalStrings } from '../types.js';

export const legal: LegalStrings = {
  notice: {
    title: 'Nota importante sobre esta página',
    body:
      'O texto jurídico abaixo é a versão inglesa oficial. Em caso de conflito entre a ' +
      'interface traduzida desta página e o texto jurídico em inglês, prevalece o texto em ' +
      'inglês.',
  },
  privacy: {
    seo: {
      title: 'Política de Privacidade',
      description:
        'Política de privacidade da Graphing Calculator: sem contas, sem análises, sem cookies. ' +
        'Suas mensagens ao assistente de IA vão para o endpoint do próprio servidor do aplicativo.',
    },
    updatedTemplate: 'Última atualização: {date}',
    heading: 'Política de Privacidade',
    intro: [
      'A Graphing Calculator foi projetada para funcionar sem coletar seus dados pessoais. ' +
        'Esta política descreve, em termos simples, o que acontece com suas informações.',
    ],
    sections: [
      {
        heading: 'O que coletamos',
        body: [
          'Nada por padrão. Não há contas, cadastros nem análises. Navegar no site, representar ' +
            'funções e salvar gráficos não enviam dados de uso, identificadores ou informações ' +
            'pessoais a nenhum servidor.',
        ],
      },
      {
        heading: 'Assistente de IA',
        body: [
          'Quando você envia uma mensagem ao assistente de IA de matemática, sua mensagem e um ' +
            'resumo compacto do estado atual da sua calculadora (expressões, área de visualização) ' +
            'são enviados ao endpoint do próprio servidor do site (/api/ai/math). Se uma chave de ' +
            'provedor de IA estiver configurada, o servidor encaminha sua mensagem ao provedor de ' +
            'IA (DeepSeek) para gerar uma resposta. O servidor nunca registra suas mensagens nem ' +
            'nenhuma chave de API; o estado de limitação de taxa fica apenas na memória e expira ' +
            'em minutos.',
          'Quando nenhuma chave de provedor está configurada, o assistente é executado em um ' +
            'modo de simulação claramente rotulado: as respostas são geradas por lógica local ' +
            'determinística e nenhum provedor de IA é contatado. Intenções locais (por exemplo, ' +
            '«plot y = x^2») são tratadas inteiramente no seu navegador e nunca chegam a um servidor.',
        ],
      },
      {
        heading: 'Cookies',
        body: [
          'O site não define cookies e não usa rastreadores de terceiros. Como não há análises ' +
            'nem publicidade, não há banner de cookies nem consentimento a gerenciar.',
        ],
      },
      {
        heading: 'O que permanece no seu navegador',
        body: [
          'Sua preferência de tema e seu espaço de trabalho da calculadora (expressões, área de ' +
            'visualização, configurações) são armazenados apenas no localStorage do seu próprio ' +
            'navegador. Eles nunca saem do seu dispositivo. Limpar os dados do site no navegador ' +
            'os remove permanentemente.',
        ],
      },
      {
        heading: 'Contato',
        body: ['Se você tiver dúvidas sobre esta política, envie um e-mail para {email}.'],
      },
    ],
    outro: [
      'Esta política será atualizada se as práticas de dados do produto mudarem. A data de ' +
        'última atualização acima sempre reflete a versão atual.',
    ],
  },
  terms: {
    seo: {
      title: 'Termos de Serviço',
      description: 'Termos de serviço da Graphing Calculator: regras de uso e isenções.',
    },
    updatedTemplate: 'Última atualização: {date}',
    heading: 'Termos de Serviço',
    sections: [
      {
        heading: 'O serviço',
        body: [
          'A Graphing Calculator é fornecida como está, para educação e exploração. Embora ' +
            'busquemos a correção, não oferecemos garantias sobre a precisão de qualquer ' +
            'resultado, e a ferramenta não constitui aconselhamento profissional matemático, de ' +
            'engenharia ou financeiro.',
        ],
      },
      {
        heading: 'Uso aceitável',
        body: [
          'Use a calculadora apenas para fins lícitos. Não tente interromper o serviço, ' +
            'sondá-lo em busca de vulnerabilidades nem usá-lo de forma que prejudique outros.',
        ],
      },
      {
        heading: 'Alterações',
        body: [
          'Estes termos podem ser atualizados à medida que o produto evolui; a data de última ' +
            'atualização acima reflete a versão atual. O uso continuado do site após alterações ' +
            'constitui aceitação dos termos atualizados.',
        ],
      },
    ],
  },
  disclaimer: {
    seo: {
      title: 'Isenção de Responsabilidade',
      description:
        'Aviso legal da Graphing Calculator: respostas de IA e resultados numéricos são ' +
        'informativos; verifique cálculos importantes de forma independente.',
    },
    updatedTemplate: 'Última atualização: {date}',
    heading: 'Isenção de Responsabilidade',
    sections: [
      {
        heading: 'A saída do assistente de IA é informativa',
        body: [
          'O assistente de IA de matemática integrado explica conceitos e interpreta solicitações ' +
            'em linguagem simples, mas pode cometer erros — incluindo erros declarados com ' +
            'confiança. Trate as respostas de IA como um ponto de partida, não como matemática ' +
            'autoritária.',
        ],
      },
      {
        heading: 'Resultados numéricos são calculados, não provados',
        body: [
          'Raízes, derivadas, integrais, limites e outros resultados de análise são calculados ' +
            'numericamente com aritmética de ponto flutuante. São precisos até a precisão exibida ' +
            'em condições normais, mas arredondamentos e amostragem podem introduzir pequenos ' +
            'erros — especialmente perto de descontinuidades, cantos acentuados ou assíntotas. ' +
            'Para lições de casa, provas, engenharia ou qualquer decisão importante, verifique ' +
            'cálculos importantes de forma independente.',
        ],
      },
      {
        heading: 'Nenhum aconselhamento profissional',
        body: [
          'Nada neste site constitui aconselhamento profissional de qualquer tipo — matemático, ' +
            'educacional, financeiro ou de outro tipo. O conteúdo é fornecido para fins ' +
            'educacionais gerais.',
        ],
      },
      {
        heading: 'Seus gráficos continuam sendo seus',
        body: [
          'Os gráficos que você salva são armazenados apenas no seu próprio navegador. Links ' +
            'compartilhados codificam o gráfico no próprio link, para que qualquer pessoa com o ' +
            'link possa abri-lo. Não compartilhe links que contenham algo que você não gostaria ' +
            'que outros vissem.',
        ],
      },
    ],
    outro: [
      'Ao usar este site, você aceita que seus autores não são responsáveis por decisões ' +
        'tomadas com base em seus resultados. Consulte os Termos de Serviço para detalhes.',
    ],
  },
};
