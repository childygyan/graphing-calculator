/**
 * Dicionário português de calculator — o texto da página da calculadora gráfica
 * mais todas as strings dos islands da calculadora e bibliotecas de apoio.
 */

import type { CalculatorStrings } from '../types.js';

export const calculator: CalculatorStrings = {
  seo: {
    title: 'Calculadora gráfica — Traçador de funções online grátis',
    description:
      'Calculadora gráfica online grátis: trace funções, curvas paramétricas e polares, ' +
      'encontre raízes, derivadas e integrais e explore matemática com um assistente de IA. ' +
      'Sem cadastro.',
  },
  intro: {
    heading: 'Sobre esta calculadora gráfica',
    lede:
      'Uma calculadora gráfica gratuita, sem cadastro, que roda inteiramente no seu navegador. ' +
      'Trace funções, analise-as com métodos numéricos reais, anime parâmetros com controles ' +
      'deslizantes e receba ajuda em linguagem simples do assistente de IA.',
  },
  sections: [
    {
      heading: 'O que você pode fazer',
      body: [
        'Digite uma expressão como x^2, sin(x) ou 1/x e veja-a ser traçada instantaneamente. Adicione mais expressões para compará-las, alterne a visibilidade e personalize as cores. O gráfico oferece zoom suave centrado no cursor, movimento por arrasto e gestos de toque completos, incluindo pinça para zoom.',
        'Além de traçar, as ferramentas de análise transformam o gráfico em um laboratório: localize interceptos com o eixo x, calcule a inclinação em qualquer ponto, meça a área sob uma curva, gere tabelas de valores e desenhe retas tangentes e normais. Variáveis e controles deslizantes permitem animar parâmetros — arraste um controle e veja toda uma família de curvas se transformar em tempo real.',
      ],
    },
    {
      heading: 'Como traçar o gráfico de uma função',
      body: [
        'Digite sua expressão na lista de expressões usando x como variável — por exemplo, x^3 - 3*x. O gráfico é atualizado enquanto você digita. Role para dar zoom em direção ao cursor, arraste para mover e clique duas vezes (ou use a barra de ferramentas) para redefinir a visualização.',
        'Para ir mais fundo, selecione uma expressão e abra o painel de análise: encontre suas raízes, extremos e interceptos, ou avalie a derivada e a integral em pontos de sua escolha. Se preferir palavras a fórmulas, abra o assistente de IA e pergunte — por exemplo, "trace sin(x) e mostre-me suas raízes".',
      ],
    },
  ],
  faqs: [
    {
      question: 'Esta calculadora gráfica é grátis?',
      answer:
        'Sim. A calculadora roda inteiramente no seu navegador e é gratuita, sem cadastro. ' +
        'Seus gráficos são salvos no seu próprio dispositivo, não em um servidor.',
    },
    {
      question: 'Que tipos de expressões posso traçar?',
      answer:
        'Funções cartesianas como sin(x) ou x^2 - 4, curvas paramétricas, equações polares, ' +
        'inequações e pontos individuais. Você pode traçar muitas expressões de uma vez, cada ' +
        'uma com sua própria cor.',
    },
    {
      question: 'Ela encontra raízes, derivadas e integrais?',
      answer:
        'Sim. O painel de análise encontra raízes com o método de Brent, estima derivadas ' +
        'com diferenças centrais, calcula integrais definidas com a regra de Simpson ' +
        'adaptativa e desenha retas tangentes. Resultados que não podem ser calculados são ' +
        'relatados honestamente.',
    },
    {
      question: 'Como funciona o assistente de IA?',
      answer:
        'Você pode fazer perguntas em linguagem simples. O assistente traduz seu pedido em ' +
        'comandos da calculadora — traçando expressões, ajustando a visualização ou explicando ' +
        'um conceito passo a passo. O motor matemático sempre executa os cálculos de verdade; a ' +
        'IA nunca inventa resultados numéricos.',
    },
    {
      question: 'Preciso de uma conta para salvar ou compartilhar gráficos?',
      answer:
        'Não existem contas. Você pode salvar gráficos nomeados no seu navegador, exportá-los ' +
        'como JSON ou PNG e compartilhá-los como links compactos que qualquer pessoa pode abrir.',
    },
  ],
  related: [
    '/math-functions/',
    '/examples/',
    '/learn/',
    '/calculators/derivative/',
    '/calculators/integral/',
    '/calculators/root-finder/',
  ],
  shell: {
    loadFailedTitle: 'Falha ao carregar a calculadora',
    errorFallback: {
      defaultTitle: 'Algo deu errado',
      message:
        'Um erro inesperado interrompeu esta parte da página. Seus outros dados não foram afetados.',
      retry: 'Tentar novamente',
    },
    toolbar: {
      regionLabel: 'Ações da calculadora',
      title: 'Calculadora gráfica',
      addExpression: 'Adicionar expressão',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      resetView: 'Redefinir visualização',
    },
    expressions: {
      panelTitle: 'Expressões',
      add: 'Adicionar',
      addAriaLabel: 'Adicionar expressão',
      fallbackTitle: 'Falha ao carregar a lista de expressões',
      kinds: {
        cartesian: 'Cartesiana',
        parametric: 'Paramétrica',
        polar: 'Polar',
        inequality: 'Inequação',
        point: 'Ponto',
        table: 'Tabela',
        textNote: 'Nota de texto',
      },
      kindOptions: [
        { kind: 'cartesian', label: 'y = f(x)' },
        { kind: 'parametric', label: 'Paramétrica' },
        { kind: 'polar', label: 'Polar' },
        { kind: 'inequality', label: 'Inequação' },
        { kind: 'point', label: 'Ponto' },
      ],
      addKindOptions: [
        { kind: 'cartesian', label: 'Função y = f(x)' },
        { kind: 'parametric', label: 'Paramétrica (x(t), y(t))' },
        { kind: 'polar', label: 'Polar r(θ)' },
        { kind: 'inequality', label: 'Inequação' },
        { kind: 'point', label: 'Ponto' },
      ],
      addKindLabel: 'Tipo de expressão',
      emptyState: 'Ainda não há expressões.',
      changeColorTemplate: 'Alterar a cor de {label}',
      renameAriaTemplate: 'Renomear {label}',
      changeTypeAriaTemplate: 'Alterar tipo de {label}',
      editDefinitionAriaTemplate: 'Editar definição de {label}',
      duplicateAriaTemplate: 'Duplicar {label}',
      deleteAriaTemplate: 'Excluir {label}',
      hideAria: 'Ocultar expressão',
      showAria: 'Mostrar expressão',
      fields: {
        xOfT: 'definição de x(t)',
        yOfT: 'definição de y(t)',
        tMin: 't mínimo',
        tMax: 't máximo',
        xCoordinate: 'coordenada x',
        yCoordinate: 'coordenada y',
        polarHint: 'θ de 0 a 2π — digite theta ou θ',
        inequalitySide: 'Lado da inequação',
        inequalityOperator: 'Operador da inequação',
      },
      defaultLabelTemplate: '{kind} {n}',
      summaryTemplates: {
        cartesian: 'y = {rhs}',
        parametric: '(x(t), y(t)) = ({x}, {y})',
        polar: 'r = {r}',
        point: '({x}, {y})',
        inequality: '{lhs} {op} {rhs}',
        table: 'Tabela ({cols} colunas x {rows} linhas)',
        note: 'Nota: {preview}',
        noteEmpty: 'Nota: (vazia)',
      },
    },
    graph: {
      regionLabel: 'Gráfico',
      toolbarLabel: 'Controles de visualização do gráfico',
      zoomIn: 'Aproximar',
      zoomOut: 'Afastar',
      resetView: 'Redefinir visualização',
      fitView: 'Ajustar visualização',
      toggleGrid: 'Alternar grade',
      toggleAxes: 'Alternar eixos',
      inspectedPoint: 'Ponto inspecionado',
      dismissInspectedPoint: 'Dispensar ponto inspecionado',
      tangentButton: 'Tangente',
      noteButton: 'Nota',
      notePlaceholder: 'Rótulo da nota…',
      noteAriaLabel: 'Rótulo da anotação',
      coordinateTemplate: 'x: {x}, y: {y}',
      canvasDefaultLabel:
        'Gráfico cartesiano interativo. Use a barra de ferramentas do gráfico para ampliar, reduzir ou redefinir a visualização.',
      unknownCurveLabel: 'Curva',
      loadErrorTitle: 'O gráfico interativo encontrou um problema',
      loadErrorMessage: 'Suas expressões e configurações não foram afetadas.',
      reloadGraph: 'Recarregar gráfico',
    },
    variables: {
      panelTitle: 'Variáveis',
      add: 'Adicionar',
      nameLabel: 'Nome da variável',
      animationSpeed: 'Velocidade da animação',
      animationSpeedTitle: 'Velocidade de varredura da animação',
      speeds: { slow: 'Lenta', normal: 'Normal', fast: 'Rápida' },
      reducedMotionNote: 'A animação está desligada porque seu sistema prefere movimento reduzido.',
      emptyState:
        'Ainda não há variáveis. Adicione uma e use-a em qualquer expressão — ex.: y = a·sin(b·x).',
      emptyStateLead: 'Ainda não há variáveis. Adicione uma e use-a em qualquer expressão, por ex.',
      undefinedHeading: 'Usadas em expressões, mas não definidas:',
      defineVariableAriaTemplate: 'Definir variável {name}',
      valueAriaTemplate: 'valor de {name}',
      currentValueTitle: 'Valor resolvido atual',
      sliderAriaTemplate: 'controle deslizante de {name}',
      dragToChangeTemplate: 'Arraste para alterar {name}',
      sliderUnavailable: 'Controle deslizante indisponível: o valor vem de uma fórmula.',
      animateAriaTemplate: 'Animar {name}',
      pauseAriaTemplate: 'Pausar animação de {name}',
      animateAcrossRangeTemplate: 'Animar {name} em seu intervalo',
      animationDisabledReducedMotion:
        'Animação desativada: seu sistema prefere movimento reduzido.',
      animationNeedsPlainValue:
        'A animação precisa de um valor numérico simples (não uma fórmula).',
      deleteVariableAriaTemplate: 'Excluir variável {name}',
      min: 'Mín',
      max: 'Máx',
      stepLabel: 'Passo',
      validation: {
        enterName: 'Digite um nome de variável.',
        namePattern: 'Use letras, dígitos ou sublinhado, começando com uma letra.',
        reservedTemplate: "'{name}' é reservado (x, t, theta são parâmetros do gráfico).",
        takenTemplate: "'{name}' já é um nome de função ou constante.",
        undefinedTemplate:
          'Variável indefinida: {names} — defina-a em Variáveis ou corrija o nome.',
        reservedUseTemplate:
          "A variável '{name}' não pode usar '{used}' — variáveis devem ser números simples ou " +
          'depender apenas de outras variáveis.',
        unknownTemplate: "Variável desconhecida: {names} na definição de '{name}'.",
        circularTemplate: 'Referência circular: {path}.',
        duplicateTemplate: "Variável duplicada '{name}' — mantendo a primeira.",
        invalidExpression: 'Expressão inválida.',
      },
    },
    analysis: {
      precision: {
        formatLabel: 'Formato',
        decimals: 'Decimais',
        significant: 'Significativos',
        digitsTemplate: 'Dígitos (1–15)',
        placesTemplate: 'Casas (0–12)',
      },
      table: {
        title: 'Tabela de valores',
        start: 'Início',
        end: 'Fim',
        step: 'Passo ("auto")',
        build: 'Montar tabela',
        startError: 'Digite números válidos para início e fim.',
        stepError: 'O passo deve ser um número positivo ou "auto".',
        captionTemplate: 'Tabela de valores de {label}',
        stepCaptionTemplate: 'Passo {step} · mostrando {shown} de {total} linhas',
        captionTruncatedSuffix: ' — reduza o intervalo ou aumente o passo para ver o restante',
        keyboardHint: 'Foque a tabela e use ↑/↓ para navegar entre as linhas.',
        noRows: 'Sem linhas para mostrar.',
        notDefinedTitle: 'Não definida neste x',
        useTappedPoint: 'Usar ponto tocado',
        useTappedPointTitle: 'Usar o ponto selecionado ao tocar no gráfico',
      },
      roots: {
        title: 'Raízes',
        from: 'De',
        to: 'Até',
        find: 'Encontrar raízes',
        useViewport: 'Usar visualização',
        showOnGraph: 'Mostrar no gráfico',
        none: 'Nenhuma raiz encontrada neste intervalo.',
        resultTemplate: 'x = {x}',
      },
      intersections: {
        title: 'Interseções',
        noneDefined: 'Adicione uma segunda expressão cartesiana para encontrar interseções.',
        with: 'Com',
        find: 'Encontrar interseções',
        showOnGraph: 'Mostrar no gráfico',
        viewportNote: 'Pesquisa dentro do intervalo x da visualização atual.',
        none: 'Nenhuma interseção encontrada na visualização.',
      },
      derivative: {
        title: 'Derivada',
        atX: 'Em x =',
        compute: 'f′(x)',
        plot: 'Traçar f′(x)',
        hide: 'Ocultar f′(x)',
        resultTemplate: 'f′({x}) = {value}',
        note: 'Numérica (diferença central) — não é uma derivada simbólica.',
      },
      integral: {
        title: 'Integral definida',
        fromA: 'De a',
        toB: 'Até b',
        compute: 'Calcular',
        shadeArea: 'Sombrear área',
        hideShading: 'Ocultar sombreamento',
        resultTemplate: '∫ = {value}',
        noConvergence:
          'A quadratura não convergiu neste intervalo (possível singularidade ou ' +
          'falha de domínio) — nenhum valor reportado.',
      },
      limit: {
        title: 'Limite',
        atX: 'Em x =',
        side: 'Lado',
        sides: { twoSided: 'Bilateral', left: 'Esquerda', right: 'Direita' },
        compute: 'Calcular',
        convergesTemplate: 'Limite = {value}',
        unboundedTemplate: 'Ilimitado — aproxima-se de {direction}',
        doesNotExist: 'Não existe (os limites laterais discordam ou a função oscila)',
        indeterminate: 'Não é possível determinar — a função não está definida perto deste ponto',
      },
      extrema: {
        title: 'Extremos locais',
        find: 'Encontrar na visualização',
        showOnGraph: 'Mostrar no gráfico',
        none: 'Nenhum mínimo ou máximo local encontrado na visualização.',
        minTemplate: 'Mín em ({x}, {y})',
        maxTemplate: 'Máx em ({x}, {y})',
      },
      tangent: {
        title: 'Tangente e normal',
        atX: 'Em x =',
        compute: 'Calcular',
        showTangent: 'Mostrar tangente',
        showNormal: 'Mostrar normal',
        failed: 'Sem tangente aqui — a função não está definida ou não é diferenciável neste x.',
        tangentTemplate: 'Tangente: {equation}',
        normalTemplate: 'Normal: {equation}',
        slopeTemplate: 'inclinação f′({x}) = {slope}',
        cannotAnalyzeTemplate: 'Não é possível analisar esta expressão: {error}',
        unknownParseError: 'erro de análise desconhecido.',
        couldNotParse: 'Não foi possível analisar esta expressão.',
      },
      annotations: {
        title: 'Anotações',
        annotateTapped: 'Anotar ponto tocado',
        empty:
          'Ainda não há anotações. Toque em uma curva no gráfico e anote o ponto — ou renomeie ' +
          'e remova anotações aqui.',
        showAriaTemplate: 'Mostrar anotação {label}',
        deleteAriaTemplate: 'Excluir anotação {label}',
        show: 'Mostrar',
        label: 'Rótulo',
      },
      panelEmpty:
        'Adicione uma expressão cartesiana (y = …) para desbloquear tabelas, raízes, derivadas, ' +
        'integrais, limites, extremos e tangentes.',
      panelTitle: 'Análise',
      panelAriaLabel: 'Análise matemática',
    },
    persistence: {
      regionLabel: 'Persistência do gráfico',
      undo: 'Desfazer',
      redo: 'Refazer',
      save: 'Salvar gráfico',
      saveUnsaved: 'Salvar gráfico (alterações não salvas)',
      unsavedChanges: 'Alterações não salvas',
      myGraphs: 'Meus gráficos',
      share: 'Compartilhar',
      export: 'Exportar',
      closeExportMenu: 'Fechar menu de exportação',
      exportOptions: 'Opções de exportação',
      downloadJson: 'Baixar JSON',
      downloadPng: 'Baixar PNG (2x)',
      import: 'Importar',
      copyEquations: 'Copiar equações',
      copyEquationsAria: 'Copiar equações como texto',
      modal: { close: 'Fechar', backdrop: 'Fechar a caixa de diálogo' },
      toasts: {
        exportedJson: 'Gráfico exportado como JSON.',
        exportJsonFailed: 'Falha na exportação JSON.',
        exportedPng: 'Gráfico exportado como PNG (2x).',
        noExpressions: 'Não há expressões para copiar.',
        copied: 'Equações copiadas para a área de transferência.',
        copyFailed: 'Falha ao copiar neste navegador.',
      },
      saveDialog: {
        title: 'Salvar gráfico',
        saved: 'Salvo neste navegador.',
        nameLabel: 'Nome',
        namePlaceholder: 'ex.: Exploração de parábola',
        nameHint: 'Salvo apenas neste navegador. Salvar com o mesmo nome substitui o anterior.',
        cancel: 'Cancelar',
        save: 'Salvar gráfico',
        errors: {
          emptyName: 'Dê um nome ao gráfico.',
          nameTooLongTemplate: 'Mantenha o nome com menos de {max} caracteres.',
          storageUnavailable: 'O armazenamento local não está disponível neste navegador.',
          readFailed: 'Não foi possível ler a biblioteca de gráficos salvos.',
          libraryFullTemplate:
            'A biblioteca está cheia ({max} gráficos salvos). Exclua um primeiro.',
          saveFailed:
            'Não foi possível salvar — o armazenamento do navegador está indisponível ou cheio.',
          unexpected: 'Falha inesperada ao salvar.',
        },
      },
      libraryDialog: {
        title: 'Meus gráficos salvos',
        // A palavra "Salvar" é enfatizada na interface; mantenha a ênfase ao conectar.
        empty: 'Nada salvo ainda. Use Salvar para manter o gráfico atual neste navegador.',
        emptyLead: 'Nada salvo ainda. Use',
        emptySave: 'Salvar',
        emptyTail: ' para manter o gráfico atual neste navegador.',
        entryMetaTemplate: '{date} · {count} expressão(ões){variables}',
        variablesPartTemplate: ' · {count} variável(is)',
        renameLabel: 'Renomear gráfico',
        rename: 'Renomear',
        cancel: 'Cancelar',
        restore: 'Restaurar',
        renameAriaTemplate: 'Renomear {name}',
        deleteAriaTemplate: 'Excluir {name}',
        deleteConfirm: 'Excluir este gráfico salvo?',
        keep: 'Manter',
        delete: 'Excluir',
        unsavedWarning: 'Você tem alterações não salvas. Restaurar substitui o gráfico atual.',
        restoreAnyway: 'Restaurar mesmo assim',
        errors: {
          noLongerExists: 'Esse gráfico salvo não existe mais.',
          duplicateName: 'Já existe um gráfico salvo com esse nome.',
          renameFailed:
            'Não foi possível renomear — o armazenamento do navegador está indisponível ou cheio.',
        },
      },
      shareDialog: {
        title: 'Compartilhar este gráfico',
        creating: 'Criando seu link…',
        linkLabel: 'Link de compartilhamento',
        copyLink: 'Copiar link',
        copied: 'Copiado',
        openNewTab: 'Abrir link em nova aba',
        note:
          'O link contém os dados do seu gráfico — qualquer pessoa com ele pode ver este gráfico. ' +
          'Ele abre em uma página que nunca é indexada por mecanismos de busca.',
        createFailed: 'Não foi possível criar um link de compartilhamento neste navegador.',
        copyFailed: 'Falha ao copiar — selecione o link acima e copie manualmente.',
      },
      importDialog: {
        title: 'Importar gráfico',
        chooseFile: 'Escolher um arquivo .json',
        chooseFileAriaLabel: 'Escolher um arquivo JSON de gráfico',
        fileChosenTemplate: 'Arquivo: {name}',
        orPaste: 'Ou cole o JSON do gráfico',
        pastePlaceholder: '{"app": "graphing-calculator", "version": 1, …}',
        sizeNoteTemplate:
          'Importações são validadas e têm limite de tamanho (máx. {maxKb} KB). Os dados ' +
          'importados nunca são executados — são lidos apenas como dados.',
        cancel: 'Cancelar',
        review: 'Revisar importação',
        back: 'Voltar',
        importAnyway: 'Importar mesmo assim',
        untitled: 'Gráfico sem título',
        hiddenSuffix: ' (oculta)',
        variablesPrefix: 'Variáveis: ',
        viewTemplate: 'Visualização: x ∈ [{xMin}, {xMax}], y ∈ [{yMin}, {yMax}]',
        unsavedWarning: 'Você tem alterações não salvas. Importar substitui o gráfico atual.',
        errors: {
          empty: 'Cole o JSON do gráfico ou escolha um arquivo primeiro.',
          tooLargeTemplate: 'O {source} é maior que {maxKb} KB e foi rejeitado.',
          fileTooLargeTemplate: '“{name}” é maior que {maxKb} KB e foi rejeitado.',
          invalidJson: 'O arquivo não é um JSON válido.',
          validationFailedTemplate: 'O gráfico falhou na validação: {issues}{more}',
          unreadable: 'Não foi possível ler o arquivo.',
        },
      },
      shared: {
        noGraph: 'Este link não contém um gráfico compartilhado.',
        openFailed: 'Não foi possível abrir o gráfico compartilhado.',
        opening: 'Abrindo o gráfico compartilhado…',
        heading: 'Não foi possível abrir este gráfico compartilhado',
        openCalculator: 'Abrir a calculadora gráfica',
        fallbackTitle: 'Falha ao carregar o gráfico compartilhado',
      },
    },
    ai: {
      toggleOpen: 'Abrir assistente matemático de IA',
      toggleClose: 'Fechar assistente matemático de IA',
      panelLabel: 'Assistente matemático de IA',
      heading: 'Assistente matemático de IA',
      statusMock: 'Modo de simulação — nenhuma chave de IA configurada',
      statusDeepseek: 'Com tecnologia DeepSeek',
      statusDefault: 'Pergunte sobre o gráfico',
      messagesLabel: 'Mensagens do chat de IA',
      intro:
        'Posso traçar funções, ajustar a visualização e gerenciar controles deslizantes. Experimente uma:',
      suggestions: ['Plotar y = x^2', 'Afastar', 'Definir a = 2', 'O que você pode fazer?'],
      conceptualNote: 'Explicação conceitual da IA — não calculada pelo motor matemático.',
      mockNote: 'Resposta simulada',
      thinking: 'Pensando…',
      inputLabel: 'Enviar mensagem ao assistente matemático de IA',
      inputPlaceholder: 'Tente "plotar y = x^2"',
      send: 'Enviar',
      footer:
        'A IA nunca calcula resultados — o motor matemático calcula. O histórico fica nesta sessão.',
      chatCleared: 'Chat limpo.',
      intent: {
        parseFailedTemplate:
          'Não consegui analisar "{source}". Verifique a expressão e tente novamente.',
        notFiniteTemplate:
          'Avaliando {source} em x = {x}: o resultado não é um número finito (indefinido ali).',
        computedTemplate: 'Calculado pelo motor matemático: {source} em x = {x} é {value}.',
        zoomedOut: 'Visualização afastada.',
        zoomedIn: 'Visualização aproximada.',
        viewReset: 'Visualização redefinida para a região padrão.',
        badVariableNameTemplate:
          '"{name}" não é um nome de variável utilizável (evite x, t, theta e nomes de funções).',
        noExpressionToPlot:
          'Não encontrei uma expressão matemática para traçar. Tente "traçar x^2".',
      },
      processor: {
        helpLines: [
          'Aqui está o que posso fazer:',
          '• "traçar x^2" — traçar uma função',
          '• "aproximar" / "afastar" / "redefinir visualização" — alterar a visualização',
          '• "definir a = 2" — adicionar uma variável deslizante',
          '• "avaliar x^2+1 em x = 3" — calcular um valor com o motor matemático',
          '• "explicar derivadas" — explicação conceitual',
          '• "limpar" — limpar este chat',
          'Qualquer coisa mais complicada vai para o serviço de IA quando ele estiver configurado.',
        ],
        invalidExpression: 'expressão inválida',
        plotFailedTemplate: 'Não consegui traçar isso: {detail}',
        undefinedHintTemplate:
          ' Observação: {names} não está(ão) definido(s) — tente "definir {first} = 2".',
        plottedTemplate: 'Traçado y = {expression}.{hint}',
        sliderUpdatedTemplate: 'Controle deslizante {name} atualizado para {value}.',
        sliderAddedTemplate: 'Controle deslizante {name} = {value} adicionado.',
        viewportUpdated: 'Visualização atualizada.',
      },
    },
    engine: {
      parse: {
        unexpectedCharacterTemplate: "Caractere inesperado '{char}'",
        enterExpression: 'Digite uma expressão',
        unexpectedTokenTemplate: "'{token}' inesperado",
        expectedButFoundTemplate: "Esperava {what}, mas encontrou '{token}'",
        expectedClosingTemplate: "Esperava ')', mas encontrou '{token}'",
        unexpectedEnd: 'Fim inesperado da expressão',
        needsArgumentTemplate: "'{name}' precisa de um argumento",
        expectedSeparatorTemplate: "Esperava ',' ou ')', mas encontrou '{token}'",
        arityTemplate: "'{name}' espera {arity} argumento(s), mas recebeu {count}",
      },
    },
  },
};
