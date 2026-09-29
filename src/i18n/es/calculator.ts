/**
 * Diccionario español de calculator — textos de la página de la calculadora
 * gráfica más todas las cadenas de las islas de la calculadora y las
 * bibliotecas de soporte.
 *
 * Las cadenas de las islas/bibliotecas aún NO están conectadas: los
 * componentes React y los módulos de matemáticas/análisis siguen con sus
 * propios literales. Este diccionario es la única fuente de verdad que
 * consumirá la futura refactorización con props `strings` — ver
 * docs/I18N-CONTRACTS.md.
 *
 * Las plantillas usan marcadores `{name}` resueltos por `format` en
 * `src/i18n/locales.ts`. La notación matemática (f′(x), ∫, θ, …) y la
 * sintaxis de expresiones NO SE TRADUCEN.
 */

export const calculator = {
  seo: {
    title: 'Calculadora gráfica — Graficador de funciones online gratis',
    description:
      'Calculadora gráfica online gratis: grafica funciones, curvas paramétricas y polares, ' +
      'encuentra raíces, derivadas e integrales, y explora las matemáticas con un asistente ' +
      'de IA. Sin registro.',
  },
  intro: {
    heading: 'Acerca de esta calculadora gráfica',
    lede:
      'Una calculadora gráfica gratis y sin registro que se ejecuta por completo en tu ' +
      'navegador. Grafica funciones, analízalas con métodos numéricos reales, anima parámetros ' +
      'con controles deslizantes y recibe ayuda en lenguaje sencillo del asistente de IA.',
  },
  sections: [
    {
      heading: 'Qué puedes hacer',
      body: [
        'Escribe una expresión como x^2, sin(x) o 1/x y mírala graficarse al instante. Añade más expresiones para compararlas, alterna la visibilidad y cambia los colores. La gráfica admite zoom suave centrado en el cursor, desplazamiento y gestos táctiles completos, incluido pellizcar para acercar.',
        'Más allá de graficar, las herramientas de análisis convierten la gráfica en un laboratorio: localiza intersecciones con el eje x, calcula la pendiente en cualquier punto, mide el área bajo una curva, genera tablas de valores y dibuja rectas tangentes y normales. Las variables y los controles deslizantes te permiten animar parámetros: arrastra un control y mira cómo toda una familia de curvas se transforma en tiempo real.',
      ],
    },
    {
      heading: 'Cómo graficar una función',
      body: [
        'Escribe tu expresión en la lista de expresiones usando x como variable, por ejemplo x^3 - 3*x. La gráfica se actualiza mientras escribes. Desplázate para acercar hacia el cursor, arrastra para desplazarte y haz doble clic (o usa la barra de herramientas) para restablecer la vista.',
        'Para profundizar, selecciona una expresión y abre el panel de análisis: encuentra sus raíces, extremos e intersecciones, o evalúa la derivada y la integral en los puntos que elijas. Si prefieres palabras a fórmulas, abre el asistente de IA y pregunta, por ejemplo: «grafica sin(x) y muéstrame sus raíces».',
      ],
    },
  ],
  faqs: [
    {
      question: '¿Esta calculadora gráfica es gratis?',
      answer:
        'Sí. La calculadora se ejecuta por completo en tu navegador y es gratis, sin ' +
        'registro. Tus gráficas se guardan en tu propio dispositivo, no en un servidor.',
    },
    {
      question: '¿Qué tipos de expresiones puedo graficar?',
      answer:
        'Funciones cartesianas como sin(x) o x^2 - 4, curvas paramétricas, ecuaciones polares, ' +
        'desigualdades y puntos individuales. Puedes graficar muchas expresiones a la vez, cada ' +
        'una con su propio color.',
    },
    {
      question: '¿Puede encontrar raíces, derivadas e integrales?',
      answer:
        'Sí. El panel de análisis encuentra raíces con el método de Brent, estima derivadas ' +
        'con diferencias centrales, calcula integrales definidas con la regla de Simpson ' +
        'adaptativa y dibuja rectas tangentes. Los resultados que no se pueden calcular se ' +
        'informan con honestidad.',
    },
    {
      question: '¿Cómo funciona el asistente de IA?',
      answer:
        'Puedes hacer preguntas en lenguaje sencillo. El asistente traduce tu solicitud en ' +
        'comandos de la calculadora: graficar expresiones, ajustar la vista o explicar un ' +
        'concepto paso a paso. El motor matemático siempre realiza los cálculos reales; la IA ' +
        'nunca inventa resultados numéricos.',
    },
    {
      question: '¿Necesito una cuenta para guardar o compartir gráficas?',
      answer:
        'No existen cuentas. Puedes guardar gráficas con nombre en tu navegador, ' +
        'exportarlas como JSON o PNG y compartirlas como enlaces compactos que cualquiera puede ' +
        'abrir.',
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
    loadFailedTitle: 'Error al cargar la calculadora',
    errorFallback: {
      defaultTitle: 'Algo salió mal',
      message:
        'Un error inesperado interrumpió esta parte de la página. Tus otros datos no se vieron afectados.',
      retry: 'Intentar de nuevo',
    },
    toolbar: {
      regionLabel: 'Acciones de la calculadora',
      title: 'Calculadora gráfica',
      addExpression: 'Añadir expresión',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      resetView: 'Restablecer vista',
    },
    expressions: {
      panelTitle: 'Expresiones',
      add: 'Añadir',
      addAriaLabel: 'Añadir expresión',
      fallbackTitle: 'No se pudo cargar la lista de expresiones',
      kinds: {
        cartesian: 'Cartesiana',
        parametric: 'Paramétrica',
        polar: 'Polar',
        inequality: 'Desigualdad',
        point: 'Punto',
        table: 'Tabla',
        textNote: 'Nota de texto',
        folder: 'Carpeta',
        image: 'Imagen',
        action: 'Acción',
      },
      kindOptions: [
        { kind: 'cartesian', label: 'y = f(x)' },
        { kind: 'parametric', label: 'Paramétrica' },
        { kind: 'polar', label: 'Polar' },
        { kind: 'inequality', label: 'Desigualdad' },
        { kind: 'point', label: 'Punto' },
        { kind: 'table', label: 'Tabla' },
        { kind: 'text', label: 'Nota' },
        { kind: 'folder', label: 'Carpeta' },
        { kind: 'image', label: 'Imagen' },
        { kind: 'action', label: 'Acción' },
      ],
      addKindOptions: [
        { kind: 'cartesian', label: 'Función y = f(x)' },
        { kind: 'parametric', label: 'Paramétrica (x(t), y(t))' },
        { kind: 'polar', label: 'Polar r(θ)' },
        { kind: 'inequality', label: 'Desigualdad' },
        { kind: 'point', label: 'Punto' },
      ],
      addKindLabel: 'Tipo de expresión',
      emptyState: 'Aún no hay expresiones.',
      changeColorTemplate: 'Cambiar el color de {label}',
      renameAriaTemplate: 'Renombrar {label}',
      changeTypeAriaTemplate: 'Cambiar el tipo de {label}',
      editDefinitionAriaTemplate: 'Editar la definición de {label}',
      duplicateAriaTemplate: 'Duplicar {label}',
      deleteAriaTemplate: 'Eliminar {label}',
      hideAria: 'Ocultar expresión',
      showAria: 'Mostrar expresión',
      fields: {
        xOfT: 'definición de x(t)',
        yOfT: 'definición de y(t)',
        tMin: 't mín',
        tMax: 't máx',
        xCoordinate: 'coordenada x',
        yCoordinate: 'coordenada y',
        polarHint: 'θ de 0 a 2π: escribe theta o θ',
        inequalitySide: 'Lado de la desigualdad',
        inequalityOperator: 'Operador de la desigualdad',
      },
      defaultLabelTemplate: '{kind} {n}',
      summaryTemplates: {
        cartesian: 'y = {rhs}',
        parametric: '(x(t), y(t)) = ({x}, {y})',
        polar: 'r = {r}',
        point: '({x}, {y})',
        inequality: '{lhs} {op} {rhs}',
        table: 'Tabla ({cols} columnas x {rows} filas)',
        note: 'Nota: {preview}',
        noteEmpty: 'Nota: (vacía)',
        folder: 'Carpeta ({n} elementos)',
        image: 'Imagen',
        imageEmpty: 'Imagen: (sin origen)',
        action: 'Acción ({n} asignaciones)',
      },
      addMenu: {
        buttonAriaLabel: 'Añadir elemento al gráfico',
        expression: 'Expresión',
        expressionKindsAriaLabel: 'Tipo de expresión',
        table: 'Tabla',
        folder: 'Carpeta',
        note: 'Nota',
        image: 'Imagen',
        action: 'Acción',
      },
      tableEditor: {
        columnX: 'x',
        columnY: 'y',
        addRow: 'Añadir fila',
        removeRowAriaTemplate: 'Eliminar fila {n}',
        cellAriaTemplate: 'Fila {row}, columna {col}',
        emptyHint: 'Añade filas para trazar puntos desde esta tabla.',
      },
      noteEditor: {
        placeholder: 'Escribe una nota…',
        ariaLabel: 'Texto de la nota',
      },
      folderRow: {
        collapseAriaTemplate: 'Contraer {label}',
        expandAriaTemplate: 'Expandir {label}',
        itemCountTemplate: '{n} elementos',
        emptyFolder: 'Carpeta vacía — mueve expresiones aquí para organizarlas.',
        moveToFolder: 'Mover a la carpeta',
        moveToTopLevel: 'Sacar de la carpeta',
        noFolders: 'Aún no hay carpetas',
      },
      imageEditor: {
        srcLabel: 'URL de la imagen',
        srcPlaceholder: 'https://example.com/image.png',
        invalidSrc: 'Usa una URL https:// o data:image/.',
        centerX: 'Centro x',
        centerY: 'Centro y',
        width: 'Ancho',
        height: 'Alto',
        opacity: 'Opacidad',
        uploadLabel: 'Subir imagen',
        uploadAria: 'Subir un archivo de imagen',
        uploadedLabel: 'Imagen subida (guardada en este gráfico)',
        clearImageAria: 'Quitar imagen',
        uploadTooLarge: 'La imagen es demasiado grande (máx. 500 KB).',
        loadFailed: 'No se pudo cargar esta imagen.',
      },
      actionEditor: {
        defaultButtonLabel: 'Ejecutar',
        buttonLabelLabel: 'Etiqueta del botón',
        variableHeader: 'Variable',
        valueHeader: 'Valor',
        addAssignment: 'Añadir asignación',
        removeAssignmentAriaTemplate: 'Eliminar asignación {n}',
        runAriaTemplate: 'Ejecutar {label}',
        lastRunTemplate: 'Última ejecución: {time}',
        invalidVariableTemplate: '"{variable}" no es un nombre de variable válido.',
        evaluationErrorTemplate: 'No se pudo evaluar el valor de "{variable}".',
        nonFiniteTemplate: 'El valor de "{variable}" no es un número finito.',
      },
    },
    graph: {
      regionLabel: 'Gráfica',
      toolbarLabel: 'Controles de vista de la gráfica',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      resetView: 'Restablecer vista',
      fitView: 'Ajustar vista',
      toggleGrid: 'Mostrar/ocultar cuadrícula',
      toggleAxes: 'Mostrar/ocultar ejes',
      inspectedPoint: 'Punto inspeccionado',
      dismissInspectedPoint: 'Descartar punto inspeccionado',
      tangentButton: 'Tangente',
      noteButton: 'Nota',
      notePlaceholder: 'Etiqueta de la nota…',
      noteAriaLabel: 'Etiqueta de la anotación',
      coordinateTemplate: 'x: {x}, y: {y}',
      canvasDefaultLabel:
        'Gráfica cartesiana interactiva. Usa la barra de herramientas de la gráfica para acercar, alejar o restablecer la vista.',
      unknownCurveLabel: 'Curva',
      loadErrorTitle: 'La gráfica interactiva tuvo un problema',
      loadErrorMessage: 'Tus expresiones y ajustes no se vieron afectados.',
      reloadGraph: 'Recargar gráfica',
    },
    variables: {
      panelTitle: 'Variables',
      add: 'Añadir',
      nameLabel: 'Nombre de la variable',
      animationSpeed: 'Velocidad de animación',
      animationSpeedTitle: 'Velocidad del barrido de animación',
      speeds: { slow: 'Lenta', normal: 'Normal', fast: 'Rápida' },
      reducedMotionNote:
        'La animación está desactivada porque tu sistema prefiere movimiento reducido.',
      emptyState:
        'Aún no hay variables. Añade una y úsala en cualquier expresión, p. ej. y = a·sin(b·x).',
      emptyStateLead: 'Aún no hay variables. Añade una y úsala en cualquier expresión, p. ej.',
      undefinedHeading: 'Usadas en expresiones pero no definidas:',
      defineVariableAriaTemplate: 'Definir la variable {name}',
      valueAriaTemplate: 'valor de {name}',
      currentValueTitle: 'Valor resuelto actual',
      sliderAriaTemplate: 'control deslizante de {name}',
      dragToChangeTemplate: 'Arrastra para cambiar {name}',
      sliderUnavailable: 'Control deslizante no disponible: el valor proviene de una fórmula.',
      animateAriaTemplate: 'Animar {name}',
      pauseAriaTemplate: 'Pausar la animación de {name}',
      animateAcrossRangeTemplate: 'Animar {name} en su rango',
      animationDisabledReducedMotion:
        'Animación desactivada: tu sistema prefiere movimiento reducido.',
      animationNeedsPlainValue: 'La animación necesita un valor numérico simple (no una fórmula).',
      deleteVariableAriaTemplate: 'Eliminar la variable {name}',
      min: 'Mín',
      max: 'Máx',
      stepLabel: 'Paso',
      validation: {
        enterName: 'Escribe un nombre de variable.',
        namePattern: 'Usa letras, dígitos o guion bajo, empezando con una letra.',
        reservedTemplate: '«{name}» está reservado (x, t, theta son parámetros de la gráfica).',
        takenTemplate: '«{name}» ya es un nombre de función o constante.',
        undefinedTemplate:
          'Variable {names} sin definir: defínela en Variables o corrige el nombre.',
        reservedUseTemplate:
          'La variable «{name}» no puede usar «{used}»: las variables deben ser números simples o depender ' +
          'solo de otras variables.',
        unknownTemplate: 'Variable {names} desconocida en la definición de «{name}».',
        circularTemplate: 'Referencia circular: {path}.',
        duplicateTemplate: 'Variable «{name}» duplicada: se conserva la primera.',
        invalidExpression: 'Expresión no válida.',
      },
    },
    analysis: {
      precision: {
        formatLabel: 'Formato',
        decimals: 'Decimales',
        significant: 'Significativas',
        digitsTemplate: 'Dígitos (1–15)',
        placesTemplate: 'Decimales (0–12)',
      },
      table: {
        title: 'Tabla de valores',
        start: 'Inicio',
        end: 'Fin',
        step: 'Paso ("auto")',
        build: 'Crear tabla',
        startError: 'Escribe números válidos para el inicio y el fin.',
        stepError: 'El paso debe ser un número positivo o "auto".',
        captionTemplate: 'Tabla de valores de {label}',
        stepCaptionTemplate: 'Paso {step} · mostrando {shown} de {total} filas',
        captionTruncatedSuffix: ' — reduce el rango o aumenta el paso para ver el resto',
        keyboardHint: 'Enfoca la tabla y usa ↑/↓ para moverte entre filas.',
        noRows: 'No hay filas que mostrar.',
        notDefinedTitle: 'No definida en esta x',
        useTappedPoint: 'Usar punto tocado',
        useTappedPointTitle: 'Usar el punto seleccionado tocando la gráfica',
      },
      roots: {
        title: 'Raíces',
        from: 'Desde',
        to: 'Hasta',
        find: 'Buscar raíces',
        useViewport: 'Usar vista',
        showOnGraph: 'Mostrar en la gráfica',
        none: 'No se encontraron raíces en este rango.',
        resultTemplate: 'x = {x}',
      },
      intersections: {
        title: 'Intersecciones',
        noneDefined: 'Añade una segunda expresión cartesiana para encontrar intersecciones.',
        with: 'Con',
        find: 'Buscar intersecciones',
        showOnGraph: 'Mostrar en la gráfica',
        viewportNote: 'Búsqueda dentro del rango x de la vista actual.',
        none: 'No se encontraron intersecciones en la vista.',
      },
      derivative: {
        title: 'Derivada',
        atX: 'En x =',
        compute: 'f′(x)',
        plot: 'Graficar f′(x)',
        hide: 'Ocultar f′(x)',
        resultTemplate: 'f′({x}) = {value}',
        note: 'Numérica (diferencias centrales), no una derivada simbólica.',
      },
      integral: {
        title: 'Integral definida',
        fromA: 'Desde a',
        toB: 'Hasta b',
        compute: 'Calcular',
        shadeArea: 'Sombrear área',
        hideShading: 'Ocultar sombreado',
        resultTemplate: '∫ = {value}',
        noConvergence:
          'La cuadratura no convergió en este intervalo (posible singularidad o ' +
          'hueco en el dominio): no se reporta ningún valor.',
      },
      limit: {
        title: 'Límite',
        atX: 'En x =',
        side: 'Lado',
        sides: { twoSided: 'Bilateral', left: 'Izquierdo', right: 'Derecho' },
        compute: 'Calcular',
        convergesTemplate: 'Límite = {value}',
        unboundedTemplate: 'No acotado: tiende a {direction}',
        doesNotExist: 'No existe (los límites laterales no coinciden o la función oscila)',
        indeterminate: 'No se puede determinar: la función no está definida cerca de este punto',
      },
      extrema: {
        title: 'Extremos locales',
        find: 'Buscar en la vista',
        showOnGraph: 'Mostrar en la gráfica',
        none: 'No se encontraron mínimos ni máximos locales en la vista.',
        minTemplate: 'Mín en ({x}, {y})',
        maxTemplate: 'Máx en ({x}, {y})',
      },
      tangent: {
        title: 'Tangente y normal',
        atX: 'En x =',
        compute: 'Calcular',
        showTangent: 'Mostrar tangente',
        showNormal: 'Mostrar normal',
        failed: 'No hay tangente aquí: la función no está definida o no es derivable en esta x.',
        tangentTemplate: 'Tangente: {equation}',
        normalTemplate: 'Normal: {equation}',
        slopeTemplate: 'pendiente f′({x}) = {slope}',
        cannotAnalyzeTemplate: 'No se puede analizar esta expresión: {error}',
        unknownParseError: 'error de interpretación desconocido.',
        couldNotParse: 'No se pudo interpretar esta expresión.',
      },
      annotations: {
        title: 'Anotaciones',
        annotateTapped: 'Anotar punto tocado',
        empty:
          'Aún no hay anotaciones. Toca una curva en la gráfica y anota el punto, o renombra ' +
          'y elimina anotaciones aquí.',
        showAriaTemplate: 'Mostrar la anotación {label}',
        deleteAriaTemplate: 'Eliminar la anotación {label}',
        show: 'Mostrar',
        label: 'Etiqueta',
      },
      panelEmpty:
        'Añade una expresión cartesiana (y = …) para desbloquear tablas, raíces, derivadas, ' +
        'integrales, límites, extremos y tangentes.',
      panelTitle: 'Análisis',
      panelAriaLabel: 'Análisis matemático',
    },
    persistence: {
      regionLabel: 'Persistencia de la gráfica',
      undo: 'Deshacer',
      redo: 'Rehacer',
      save: 'Guardar gráfica',
      saveUnsaved: 'Guardar gráfica (cambios sin guardar)',
      unsavedChanges: 'Cambios sin guardar',
      myGraphs: 'Mis gráficas',
      share: 'Compartir',
      export: 'Exportar',
      closeExportMenu: 'Cerrar el menú de exportación',
      exportOptions: 'Opciones de exportación',
      downloadJson: 'Descargar JSON',
      downloadPng: 'Descargar PNG (2x)',
      import: 'Importar',
      copyEquations: 'Copiar ecuaciones',
      copyEquationsAria: 'Copiar ecuaciones como texto',
      modal: { close: 'Cerrar', backdrop: 'Cerrar el diálogo' },
      toasts: {
        exportedJson: 'Gráfica exportada como JSON.',
        exportJsonFailed: 'Falló la exportación JSON.',
        exportedPng: 'Gráfica exportada como PNG (2x).',
        noExpressions: 'No hay expresiones para copiar.',
        copied: 'Ecuaciones copiadas al portapapeles.',
        copyFailed: 'Falló la copia en este navegador.',
      },
      saveDialog: {
        title: 'Guardar gráfica',
        saved: 'Guardada en este navegador.',
        nameLabel: 'Nombre',
        namePlaceholder: 'p. ej. Exploración de parábola',
        nameHint: 'Se guarda solo en este navegador. Guardar con el mismo nombre lo sobrescribe.',
        cancel: 'Cancelar',
        save: 'Guardar gráfica',
        errors: {
          emptyName: 'Dale un nombre a la gráfica.',
          nameTooLongTemplate: 'El nombre debe tener menos de {max} caracteres.',
          storageUnavailable: 'El almacenamiento local no está disponible en este navegador.',
          readFailed: 'No se pudo leer la biblioteca de gráficas guardadas.',
          libraryFullTemplate:
            'La biblioteca está llena ({max} gráficas guardadas). Elimina una primero.',
          saveFailed:
            'No se pudo guardar: el almacenamiento del navegador no está disponible o está lleno.',
          unexpected: 'El guardado falló inesperadamente.',
        },
      },
      libraryDialog: {
        title: 'Mis gráficas guardadas',
        empty: 'Nada guardado aún. Usa Guardar para conservar la gráfica actual en este navegador.',
        emptyLead: 'Nada guardado aún. Usa',
        emptySave: 'Guardar',
        emptyTail: ' para conservar la gráfica actual en este navegador.',
        entryMetaTemplate: '{date} · {count} expresión(es){variables}',
        variablesPartTemplate: ' · {count} variable(s)',
        renameLabel: 'Renombrar gráfica',
        rename: 'Renombrar',
        cancel: 'Cancelar',
        restore: 'Restaurar',
        renameAriaTemplate: 'Renombrar {name}',
        deleteAriaTemplate: 'Eliminar {name}',
        deleteConfirm: '¿Eliminar esta gráfica guardada?',
        keep: 'Conservar',
        delete: 'Eliminar',
        unsavedWarning: 'Tienes cambios sin guardar. Restaurar reemplaza la gráfica actual.',
        restoreAnyway: 'Restaurar de todos modos',
        errors: {
          noLongerExists: 'Esa gráfica guardada ya no existe.',
          duplicateName: 'Ya existe una gráfica guardada con ese nombre.',
          renameFailed:
            'No se pudo renombrar: el almacenamiento del navegador no está disponible o está lleno.',
        },
      },
      shareDialog: {
        title: 'Compartir esta gráfica',
        creating: 'Creando tu enlace…',
        linkLabel: 'Enlace para compartir',
        copyLink: 'Copiar enlace',
        copied: 'Copiado',
        openNewTab: 'Abrir el enlace en una pestaña nueva',
        note:
          'El enlace contiene los datos de tu gráfica: quien lo tenga puede verla. Se abre ' +
          'en una página que los motores de búsqueda nunca indexan.',
        createFailed: 'No se pudo crear un enlace para compartir en este navegador.',
        copyFailed: 'Falló la copia: selecciona el enlace de arriba y cópialo manualmente.',
      },
      importDialog: {
        title: 'Importar gráfica',
        chooseFile: 'Elige un archivo .json',
        chooseFileAriaLabel: 'Elige un archivo JSON de gráfica',
        fileChosenTemplate: 'Archivo: {name}',
        orPaste: 'O pega el JSON de la gráfica',
        pastePlaceholder: '{"app": "graphing-calculator", "version": 1, …}',
        sizeNoteTemplate:
          'Las importaciones se validan y tienen límite de tamaño ({maxKb} KB máx.). Los datos ' +
          'importados nunca se ejecutan: solo se leen como datos.',
        cancel: 'Cancelar',
        review: 'Revisar importación',
        back: 'Atrás',
        importAnyway: 'Importar de todos modos',
        untitled: 'Gráfica sin título',
        hiddenSuffix: ' (oculta)',
        variablesPrefix: 'Variables: ',
        viewTemplate: 'Vista: x ∈ [{xMin}, {xMax}], y ∈ [{yMin}, {yMax}]',
        unsavedWarning: 'Tienes cambios sin guardar. Importar reemplaza la gráfica actual.',
        errors: {
          empty: 'Pega el JSON de la gráfica o elige un archivo primero.',
          tooLargeTemplate: '{source} supera los {maxKb} KB y fue rechazado.',
          fileTooLargeTemplate: '«{name}» supera los {maxKb} KB y fue rechazado.',
          invalidJson: 'El archivo no es un JSON válido.',
          validationFailedTemplate: 'La gráfica no pasó la validación: {issues}{more}',
          unreadable: 'No se pudo leer el archivo.',
        },
      },
      shared: {
        noGraph: 'Este enlace no contiene una gráfica compartida.',
        openFailed: 'No se pudo abrir la gráfica compartida.',
        opening: 'Abriendo la gráfica compartida…',
        heading: 'No se pudo abrir esta gráfica compartida',
        openCalculator: 'Abrir la calculadora gráfica',
        fallbackTitle: 'Falló la carga de la gráfica compartida',
      },
    },
    ai: {
      toggleOpen: 'Abrir el asistente matemático con IA',
      toggleClose: 'Cerrar el asistente matemático con IA',
      panelLabel: 'Asistente matemático con IA',
      heading: 'Asistente matemático con IA',
      statusMock: 'Modo simulado: sin clave de IA configurada',
      statusDeepseek: 'Con tecnología de DeepSeek',
      statusDefault: 'Pregunta sobre la gráfica',
      messagesLabel: 'Mensajes del chat de IA',
      intro:
        'Puedo graficar funciones, ajustar la vista y gestionar controles deslizantes. Prueba una:',
      suggestions: ['Grafica y = x^2', 'Aleja', 'Haz a = 2', '¿Qué puedes hacer?'],
      conceptualNote: 'Explicación conceptual de la IA: no calculada por el motor matemático.',
      mockNote: 'Respuesta simulada',
      thinking: 'Pensando…',
      inputLabel: 'Envía un mensaje al asistente matemático con IA',
      inputPlaceholder: 'Prueba "grafica y = x^2"',
      send: 'Enviar',
      footer:
        'La IA nunca calcula resultados: lo hace el motor matemático. El historial permanece en esta sesión.',
      chatCleared: 'Chat borrado.',
      intent: {
        parseFailedTemplate:
          'No pude interpretar «{source}». Revisa la expresión e inténtalo de nuevo.',
        notFiniteTemplate:
          'Al evaluar {source} en x = {x}: el resultado no es un número finito (indefinido allí).',
        computedTemplate: 'Calculado por el motor matemático: {source} en x = {x} es {value}.',
        zoomedOut: 'Vista alejada.',
        zoomedIn: 'Vista acercada.',
        viewReset: 'Vista restablecida a la región por defecto.',
        badVariableNameTemplate:
          '«{name}» no es un nombre de variable utilizable (evita x, t, theta y nombres de funciones).',
        noExpressionToPlot:
          'No encontré una expresión matemática para graficar. Prueba "grafica x^2".',
      },
      processor: {
        helpLines: [
          'Esto es lo que puedo hacer:',
          '• "grafica x^2": grafica una función',
          '• "acerca" / "aleja" / "restablece la vista": cambia la vista',
          '• "haz a = 2": añade una variable deslizante',
          '• "evalúa x^2+1 en x = 3": calcula un valor con el motor matemático',
          '• "explica las derivadas": explicación conceptual',
          '• "borra": borra este chat',
          'Lo más complicado va al servicio de IA cuando está configurado.',
        ],
        invalidExpression: 'expresión no válida',
        plotFailedTemplate: 'No pude graficar eso: {detail}',
        undefinedHintTemplate: ' Nota: {names} sin definir: prueba "haz {first} = 2".',
        plottedTemplate: 'Graficada y = {expression}.{hint}',
        sliderUpdatedTemplate: 'Control deslizante {name} actualizado a {value}.',
        sliderAddedTemplate: 'Control deslizante {name} = {value} añadido.',
        viewportUpdated: 'Vista actualizada.',
      },
    },
    engine: {
      parse: {
        unexpectedCharacterTemplate: 'Carácter inesperado «{char}»',
        enterExpression: 'Escribe una expresión',
        unexpectedTokenTemplate: '«{token}» inesperado',
        expectedButFoundTemplate: 'Se esperaba {what} pero se encontró «{token}»',
        expectedClosingTemplate: 'Se esperaba «)» pero se encontró «{token}»',
        unexpectedEnd: 'Fin inesperado de la expresión',
        needsArgumentTemplate: '«{name}» necesita un argumento',
        expectedSeparatorTemplate: 'Se esperaba «,» o «)» pero se encontró «{token}»',
        arityTemplate: '«{name}» espera {arity} argumento(s) pero recibió {count}',
      },
    },
  },
};
