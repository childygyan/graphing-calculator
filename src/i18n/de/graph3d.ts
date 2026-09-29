/**
 * Deutsche 3D-Wörterliste — die Seite `/3d/` plus die Graph3D-Insel-Texte
 * (derzeit nicht verdrahtet; siehe docs/I18N-CONTRACTS.md).
 */

import type { Graph3DStrings } from '../types.js';

export const graph3d: Graph3DStrings = {
  seo: {
    title: '3D-Grapher — z = f(x, y)-Flächen online zeichnen | Graphing Calculator',
    description:
      'Kostenloser Online-3D-Grapher: Flächen z = f(x, y) mit Ziehen-zum-Drehen, Zoom und ' +
      'einstellbarer Detailstufe zeichnen. Probieren Sie die Voreinstellungen Paraboloid, Welle und Sattel.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: '3D-Grapher', href: '/3d/' },
  ],
  heading: '3D-Grapher',
  intro: [
    'Zeichnen Sie jede Fläche z = f(x, y) in Ihrem Browser — ohne Downloads, ohne Plugins. Geben Sie einen Ausdruck mit x und y ein, ziehen Sie dann, um darum herumzukreisen, scrollen oder zoomen Sie per Pinch, und erhöhen Sie die Rasterdetailstufe, um das Netz zu schärfen.',
    'Der Plotter nutzt dieselbe Ausdrucks-Engine wie der 2D-Grafikrechner, sodass jede Funktion, die Sie bereits kennen — sin, cos, sqrt, ^ und mehr — auch hier funktioniert. Wo eine Funktion undefiniert ist, zeigt die Fläche eine ehrliche Lücke statt eines falschen Streifens.',
  ],
  sections: [
    {
      heading: 'Wie die 3D-Rotation funktioniert',
      body: [
        'Das Ziehen am Plot kreist eine virtuelle Kamera um die Fläche: Horizontales Ziehen ändert den Azimut (die Himmelsrichtung, aus der Sie blicken) und vertikales Ziehen die Elevation (wie hoch über der xy-Ebene die Kamera sitzt). Scrollen oder Pinchen bewegt die Kamera näher heran oder weiter weg. Wenn Sie eine Tastatur nutzen, fokussieren Sie den Plot und verwenden die Pfeiltasten zum Drehen und + / − zum Zoomen.',
        'Die Fläche wird mit dem Painter-Algorithmus gezeichnet: Jedes Netz-Quad wird mit einer echten perspektivischen Kamera projiziert, nach Tiefe von hinten nach vorn sortiert und mit Tiefenschattierung am weitesten zuerst gezeichnet. Nähere Geometrie verdeckt daher, was dahinter liegt — das verleiht dem Plot sein Gefühl solider Tiefe. Lassen Sie den Plot einige Sekunden allein, rotiert er langsam von selbst — außer Sie haben „Bewegung reduzieren“ aktiviert; dann bleibt er vollkommen still.',
      ],
    },
    {
      heading: 'Was die Voreinstellungen zeigen',
      body: [
        'Paraboloid (x²+y²) ist die klassische Schale: z wächst mit dem Abstand vom Ursprung in jede Richtung, mit seinem Minimum von 0 bei (0, 0). Es ist das 3D-Analogon der Parabel y = x².',
        'Welle (sin(√(x²+y²))) zeichnet konzentrische Wellen, die vom Ursprung ausgehen — der Wert hängt nur vom Abstand zum Ursprung ab, sodass jede Höhenlinie ein Kreis ist. Eine gute Möglichkeit zu sehen, wie radiale Symmetrie als Fläche aussieht.',
        'Sattel (x²−y²) krümmt sich entlang der x-Achse nach oben und entlang der y-Achse nach unten. Der Ursprung ist ein Sattelpunkt: ein Minimum in einer Richtung und ein Maximum in einer anderen — die 3D-Version eines wendepunktartigen kritischen Punkts.',
      ],
    },
    {
      heading: 'Ehrliches Rendern: Lücken und z-Skalierung',
      body: [
        'Undefinierte Punkte werden zu Lücken, niemals zu Vermutungen. Zeichnen Sie 1/(x²+y²) und Sie sehen, wie das Netz um die Singularität am Ursprung auseinanderbricht — genau wie der 2D-Grapher eine Kurve an einer senkrechten Asymptote unterbricht.',
        'Sehr hohe Flächen werden in z gleichmäßig geschrumpft, damit sie auf den Bildschirm passen — der Plotter nennt Ihnen den Skalierungsfaktor (zum Beispiel „z-Achse automatisch skaliert ×0,22“). Form sowie gemeldetes z-Minimum und z-Maximum bleiben Ihrem Ausdruck treu; nur die vertikalen Proportionen werden für die Ansicht komprimiert.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Welche Ausdrücke kann ich in 3D zeichnen?',
      answer:
        'Jeden Ausdruck in den Variablen x und y, mit denselben Funktionen wie der 2D-Rechner: ' +
        'Potenzen (x^2), Wurzeln (sqrt), trigonometrische Funktionen (sin, cos, tan), ' +
        'Exponentialfunktionen, Logarithmen und Konstanten wie pi. Alles andere — zum Beispiel ' +
        'eine verirrte Variable z — wird mit einer klaren Fehlermeldung abgelehnt, statt still ' +
        'etwas Falsches zu zeichnen.',
    },
    {
      question: 'Warum hat meine Fläche Löcher?',
      answer:
        'Löcher sind ehrliche Lücken, wo Ihre Funktion undefiniert ist: Division durch null, die ' +
        'Quadratwurzel einer negativen Zahl oder der Logarithmus einer nicht-positiven Zahl. Der ' +
        'Renderer überspringt diese Quads, statt eine irreführende Spitze durch die Singularität ' +
        'zu zeichnen.',
    },
    {
      question: 'Was ändert die Detail-Einstellung?',
      answer:
        'Sie legt die Netzauflösung fest — wie viele Rasterunterteilungen entlang jeder Achse ' +
        'abgetastet werden (24, 36, 48 oder 64). Höhere Detailstufe zeichnet eine glattere Fläche, ' +
        'wertet die Funktion aber öfter aus (64² = 4.225 Punkte pro Neuzeichnung); beginnen Sie ' +
        'auf älteren Handys niedrig.',
    },
    {
      question: 'Funktioniert der 3D-Grapher auf Mobilgeräten?',
      answer:
        'Ja. Ein Finger zieht zum Drehen, Zwei-Finger-Pinch zoomt, und Zwei-Finger-Ziehen dreht ' +
        'mit reduzierter Empfindlichkeit. Das Layout ist mobil-zuerst und die Leinwand ist für ' +
        'ihren Container bemessen, mit Device-Pixel-Ratio-Skalierung für scharfe Linien.',
    },
    {
      question: 'Ist der 3D-Plot genau?',
      answer:
        'Die Fläche wird aus Ihrem exakten Ausdruck an jedem Rasterpunkt abgetastet — keine ' +
        'KI-Schätzung, keine Glättung der zugrundeliegenden Mathematik. Zwischen Rasterpunkten ' +
        'verbindet das Netz die Abtastwerte mit geraden Quads, sodass sehr scharfe Merkmale bei ' +
        'niedriger Detailstufe leicht facettiert aussehen können; erhöhen Sie die Detail-Einstellung, ' +
        'um das Netz zu straffen.',
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/examples/', '/learn/'],
  island: {
    surfaceLabel: 'Fläche: z = f(x, y)',
    placeholder: 'z. B. x^2 + y^2',
    plot: 'Zeichnen',
    emptyError: 'Geben Sie einen Ausdruck in x und y ein, zum Beispiel x^2+y^2.',
    genericError: 'Dieser Ausdruck konnte nicht gezeichnet werden.',
    parseError: 'Dieser Ausdruck konnte nicht geparst werden.',
    unknownVariablesTemplate:
      'Unbekannte Variable{plural}: {names}. 3D-Flächen nutzen nur x und y.',
    presetGroup: 'Voreingestellte Flächen',
    presets: [
      {
        label: 'Paraboloid',
        description: 'Eine nach oben geöffnete Schale; Minimum 0 am Ursprung.',
      },
      { label: 'Welle', description: 'Konzentrische Wellen, die vom Ursprung ausgehen.' },
      {
        label: 'Sattel',
        description:
          'Krümmt sich entlang x nach oben, entlang y nach unten — ein Sattelpunkt am Ursprung.',
      },
    ],
    detailGroup: 'Rasterauflösung',
    detailLabel: 'Detail:',
    hint: 'Ziehen zum Drehen · Scrollen oder Pinchen zum Zoomen · Plot fokussieren und Pfeiltasten / + / − nutzen',
    zMin: 'z min',
    zMax: 'z max',
    autoScaledTemplate: '(z-Achse automatisch skaliert ×{scale} zur Anpassung)',
    noFiniteGrid: 'Keine endlichen Werte auf diesem Raster — versuchen Sie einen anderen Ausdruck.',
    canvasAriaTemplate:
      '3D-Flächenplot von z gleich {expression}. {stats}' +
      'Ziehen zum Drehen, Scrollen oder Pinchen zum Zoomen. Bei Fokus drehen die Pfeiltasten und Plus/Minus zoomt.',
    canvasAriaEmpty: '3D-Flächenplotter. Noch kein Ausdruck gezeichnet.',
    summaryTemplate: 'Flächenzusammenfassung: z = {expression} auf x und y von -5 bis 5. {stats}',
    summaryStatsTemplate: 'Minimum z {zMin}, Maximum z {zMax}, berechnet an {count} Rasterpunkten.',
    summaryNoFinite: 'Keine endlichen z-Werte auf dem aktuellen Raster.',
    summaryEmpty: 'Keine Fläche gezeichnet.',
    canvasAriaStatsTemplate: 'Für x und y von -5 bis 5 reicht z von {zMin} bis {zMax}. ',
    canvasAriaNoFiniteStats: 'Keine endlichen Werte im aktuellen Raster. ',
  },
};
