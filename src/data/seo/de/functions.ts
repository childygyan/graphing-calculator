/**
 * Handgeschriebene Lerninhalte für die zehn Seiten bemerkenswerter Funktionen
 * (Phase-8-SEO-Content-Architektur) — deutsche Übersetzung.
 *
 * Jeder `expression` wird zur Build-Zeit von der eigenen Rechen-Engine des
 * Projekts kompiliert, um Nullstellen, Extremstellen und Achsenabschnitte
 * abzuleiten, die auf der Seite gezeigt werden; Ausdrücke nutzen daher nur
 * engine-unterstützte Syntax. Alle Prosa nennt nur mathematisch gewisse
 * Fakten — keine Statistiken, Studien oder Bewertungen.
 *
 * Slugs, Ausdrücke, Notation und `reviewedOn`-Daten sind DO-NOT-TRANSLATE.
 * `related`-Pfade tragen das `/de/`-Präfix.
 */
import type { FunctionPageData } from '../types.js';

export const FUNCTION_PAGES: FunctionPageData[] = [
  {
    slug: 'sine',
    name: 'Sinus',
    displayName: 'Sinusfunktion',
    notation: 'f(x) = sin(x)',
    expression: 'sin(x)',
    tagline:
      'Die klassische Welle der Trigonometrie: eine glatte Schwingung, die sich alle 2π wiederholt.',
    description:
      'Graph f(x) = sin(x): Periode 2π, Amplitude, Nullstellen und Gipfel der Sinuskurve — ungerade Symmetrie und die Rolle in Schall, Licht und Schwingungen.',
    intro: [
      'Die Sinusfunktion ist eine der bekanntesten Kurven der gesamten Mathematik: eine glatte, sich wiederholende Welle, die ewig zwischen −1 und 1 oszilliert. Ursprünglich über rechtwinklige Dreiecke definiert — der Sinus eines Winkels ist das Verhältnis von Gegenkathete zu Hypotenuse — dehnt sie sich natürlich auf alle reellen Zahlen aus, indem Winkel im Bogenmaß um den Einheitskreis gemessen werden. Auf dem Einheitskreis ist sin(x) einfach die y-Koordinate des Punkts, der nach einer Drehung um x Bogenmaß von der positiven x-Achse erreicht wird.',
      'Weil sie sich alle 2π Bogenmaß wiederholt, ist der Sinus der Prototyp jedes periodischen Phänomens: Wechselstrom, Schallwellen, Licht, Gezeiten und die Schwingung einer Gitarrensaite lassen sich alle mit Sinuswellen unterschiedlicher Frequenz und Amplitude beschreiben. Geben Sie sin(x) in den Grafikrechner ein, um die Welle selbst nachzuzeichnen, verschieben Sie sie dann, strecken Sie sie und kombinieren Sie sie mit anderen Ausdrücken, um zu sehen, wie reale Schwingungen aus dieser einen Kurve aufgebaut sind.',
    ],
    sections: [
      {
        heading: 'Was der Sinus ist',
        body: [
          'Die Einheitskreis-Definition lässt den Sinus jede reelle Eingabe akzeptieren, nicht nur Winkel in einem Dreieck. Beginnend bei (1, 0) und gegen den Uhrzeigersinn um den Kreis mit Radius 1 wandernd, landet jeder Winkel x auf einem Punkt, dessen Höhe über der x-Achse sin(x) ist. Nach einer vollen Umdrehung von 2π Bogenmaß kehren Sie dorthin zurück, wo Sie gestartet sind — darum wiederholt sich der Graph: Die Geschichte der Funktion ist in die Geometrie des Kreises eingeschrieben.',
          'Diese Geometrie erklärt auch die Symmetrie der Welle: Der Sinus ist eine ungerade Funktion, also sin(−x) = −sin(x), sodass die linke Hälfte des Graphen die rechte Hälfte um 180° um den Ursprung gedreht ist. Der Graph kreuzt die x-Achse bei jedem Vielfachen von π, erreicht seinen Gipfel von 1 bei π/2 plus jeder vollen Umdrehung und seinen Tiefpunkt von −1 bei 3π/2 plus jeder vollen Umdrehung.',
        ],
      },
      {
        heading: 'Amplitude, Periode und Phase',
        body: [
          'Drei Zahlen beschreiben jede Sinuswelle: Amplitude, Periode und Phase. Die Amplitude ist die Höhe der Welle — für schlichtes sin(x) ist sie 1, der Abstand von der Mittellinie y = 0 zu jedem Gipfel. Die Multiplikation mit einer Konstanten, wie in 3*sin(x), streckt die Welle vertikal, ohne ihre Form zu ändern — so werden lautere Klänge und stärkere Signale modelliert.',
          'Die Periode ist die horizontale Länge eines vollen Zyklus: 2π für sin(x). Die Schreibweise sin(2*x) quetscht zwei volle Wellen in dieselbe Spanne, halbiert die Periode auf π und verdoppelt die Frequenz — die Tonhöhe einer Note eine Oktave höher. Eine Phasenverschiebung hinzuzufügen, sin(x − π/2), schiebt die ganze Welle seitwärts — darum ist der Kosinus heimlich ein verschobener Sinus: cos(x) = sin(x + π/2).',
        ],
      },
      {
        heading: 'Wo der Sinus vorkommt',
        body: [
          'Sinuswellen sind die Bausteine der Signalverarbeitung. Jedes sich wiederholende Signal — ein Musikton, eine Radiosendung, das 50- oder 60-Hz-Brummen des Stromnetzes — lässt sich in eine Summe von Sinuswellen unterschiedlicher Frequenzen zerlegen, eine Tatsache, die als Fourier-Analyse bekannt ist. Wenn sich zwei Sinuswellen fast gleicher Frequenz überlagern, interferieren sie zu Schwebungen, dem pochenden Effekt, den man hört, wenn zwei leicht verstimmte Instrumente zusammenspielen.',
          'Jenseits von Signalen regiert der Sinus die einfache harmonische Schwingung: das Hin und Her einer Masse an einer Feder, das Schwingen eines kleinen Pendels und das Auf und Ab einer schwimmenden Boje folgen alle sinusförmigen Kurven in der Zeit. In Geometrie und Physik projiziert der Sinus eine rotierende Größe auf eine Achse — die vertikale Position einer Riesenradgondel über die Zeit zeichnet exakt sin(x).',
        ],
      },
    ],
    keyFacts: [
      'Definitionsbereich: alle reellen Zahlen; Wertebereich: −1 ≤ sin(x) ≤ 1.',
      'Periode 2π: sin(x + 2π) = sin(x) für jedes x.',
      'Ungerade Funktion: sin(−x) = −sin(x); der Graph hat 180°-Drehsymmetrie um den Ursprung.',
      'Nullstellen bei x = nπ; Maxima von 1 bei x = π/2 + 2πn; Minima von −1 bei x = 3π/2 + 2πn.',
      'y-Achsenabschnitt bei (0, 0); Ableitung ist cos(x); eine Stammfunktion ist −cos(x).',
    ],
    faqs: [
      {
        q: 'Warum ist der Sinusgraph eine Welle?',
        a: 'Weil der Sinus die Höhe auf dem Einheitskreis bei der Drehung misst. Das Umrunden des Kreises lässt die Höhe glatt steigen und fallen und sich bei jeder vollen Umdrehung wiederholen, sodass der Graph von Höhe gegen Winkel eine Welle ist. Die Welle ist glatt, weil die Drehung stetig ist — es gibt keine Ecken oder Sprünge.',
      },
      {
        q: 'Was ist der Unterschied zwischen Sinus und Kosinus?',
        a: 'Es ist dieselbe Welle, seitwärts verschoben: cos(x) = sin(x + π/2). Auf dem Einheitskreis ist der Kosinus die x-Koordinate, während der Sinus die y-Koordinate ist. Der Kosinus startet bei seinem Maximum, cos(0) = 1, während der Sinus bei null startet, sin(0) = 0.',
      },
      {
        q: 'Überschreitet sin(x) jemals 1?',
        a: 'Nein — für reelles x gilt immer |sin(x)| ≤ 1. Auf dem Einheitskreis kann die y-Koordinate betragsmäßig niemals größer sein als der Radius, der 1 ist. (Der Sinus komplexer Zahlen kann 1 betragsmäßig überschreiten, aber der reellwertige Graph des Rechners bleibt innerhalb von [−1, 1].)',
      },
    ],
    related: [
      '/de/math-functions/cosine/',
      '/de/math-functions/tangent/',
      '/de/examples/trigonometric-interference/',
      '/de/examples/damped-oscillation/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'cosine',
    name: 'Kosinus',
    displayName: 'Kosinusfunktion',
    notation: 'f(x) = cos(x)',
    expression: 'cos(x)',
    tagline:
      'Der gerade, wellenförmige Bruder des Sinus — der Kosinus startet an seinem Gipfel und wiederholt sich alle 2π.',
    description:
      'Graph f(x) = cos(x): Periode 2π, Amplitude, Achsenabschnitte und Wendepunkte — gerade Symmetrie der Kosinuskurve und Anwendungen in Wellen und Bewegung.',
    intro: [
      'Der Kosinus ist das horizontale Gegenstück zum Sinus: Auf dem Einheitskreis gibt er die x-Koordinate des Punkts beim Winkel x an, während der Sinus die y-Koordinate gibt. Dieser einzige Unterschied prägt alles an seinem Graphen — er startet bei seinem Maximalwert von 1, wenn x = 0, sinkt auf −1 bei x = π und kehrt bei x = 2π zu 1 zurück, wobei er dieselbe glatte Welle wie der Sinus zeichnet, aber eine Viertelumdrehung seitwärts verschoben. Wie der Sinus oszilliert er ewig zwischen −1 und 1 und wiederholt sich alle 2π Bogenmaß.',
      'Der Kosinus zeigt sich überall dort, wo etwas auf eine horizontale Achse projiziert wird oder von einem Maximum startet: der Schatten eines rotierenden Rads, die Spannung in einem Wechselstromkreis gemessen von ihrem Gipfel, oder die x-Koordinate gleichförmiger Kreisbewegung. Weil cos(x) = sin(x + π/2), gilt alles, was man über Sinuswellen sagen kann, für Kosinuswellen mit einer Phasenverschiebung — geben Sie cos(x) in den Rechner ein und ziehen Sie die Ansicht, um ihn sich wiederholen zu sehen.',
    ],
    sections: [
      {
        heading: 'Was der Kosinus ist',
        body: [
          'Stellen Sie sich einen Punkt vor, der gegen den Uhrzeigersinn um den Einheitskreis wandert, beginnend bei (1, 0). Beim Winkel x ist seine Position (cos x, sin x): Der Kosinus verfolgt, wie weit rechts oder links der Punkt ist. Bei x = 0 sitzt der Punkt ganz rechts, also cos(0) = 1 — der y-Achsenabschnitt des Graphen. Wenn der Winkel wächst, schwingt der Punkt nach links, und der Kosinus fällt glatt durch 0 bei x = π/2 auf −1 bei x = π, ganz links am Kreis.',
          'Der Kosinus ist eine gerade Funktion, cos(−x) = cos(x), sodass sein Graph ein Spiegelbild über die y-Achse ist: Die linke Seite spiegelt die rechte exakt. Er kreuzt null bei x = π/2 + nπ, auf halbem Weg zwischen jedem Gipfel und Tal, und seine Maxima von 1 treten bei x = 2πn auf, während Minima von −1 bei x = π + 2πn auftreten. Die vertraute Wellenform stammt aus derselben Kreisgeometrie wie beim Sinus, von der Seite betrachtet.',
        ],
      },
      {
        heading: 'Kosinus, Sinus und Phasenverschiebungen',
        body: [
          'Die Identität cos(x) = sin(x + π/2) besagt, dass die beiden Funktionen eine Welle sind, gesehen von zwei Startpunkten: Der Kosinus ist das, wie der Sinus eine Viertelperiode früher aussieht. Das ist wichtig beim Modellieren realer Schwingungen, denn die Wahl zwischen Sinus und Kosinus ist nur eine Wahl des Startzeitpunkts Ihrer Uhr — eine Feder, die aus der Ruhelage bei maximaler Auslenkung losgelassen wird, folgt einer Kosinuskurve in der Zeit, während eine durch die Gleichgewichtslage gestoßene einem Sinus folgt.',
          'Phasenverschiebungen erklären auch Summen wie sin(x) + cos(x): Das Kombinieren zweier Wellen derselben Frequenz erzeugt immer eine weitere Welle dieser Frequenz, hier √2·sin(x + π/4), eine Tatsache, die aus den Additionstheoremen folgt. Zeichnen Sie im Rechner sin(x) und cos(x) zusammen und fügen Sie einen dritten Ausdruck sin(x) + cos(x) hinzu, um zu sehen, wie die Summe eine perfekte Welle bleibt.',
        ],
      },
      {
        heading: 'Wo der Kosinus vorkommt',
        body: [
          'In der Physik beschreibt der Kosinus jede Schwingung, gemessen von ihrem Extremum: einfache harmonische Schwingung x(t) = A·cos(ωt) für eine aus der Ruhelage losgelassene Masse, den Realteil der komplexen Exponentialfunktion e^(iθ) = cos θ + i·sin θ, die der Wechselstromkreis-Analyse und Quantenwellenfunktionen zugrunde liegt, und die geraden Basisfunktionen von Fourier-Reihen. Wenn Ingenieure ein periodisches Signal als Summe von Kosinusfunktionen schreiben, erfasst jeder Term den symmetrischen Anteil der Welle.',
          'Der Kosinus erscheint auch fernab von Wellen. Das Skalarprodukt zweier Vektoren ist |a||b|cos θ, wobei θ der Winkel zwischen ihnen ist, sodass der Kosinus die Ausrichtung misst: 1 für parallel, 0 für senkrecht, −1 für entgegengesetzt. Der Kosinussatz, c² = a² + b² − 2ab·cos(C), verallgemeinert Pythagoras auf jedes Dreieck.',
        ],
      },
    ],
    keyFacts: [
      'Definitionsbereich: alle reellen Zahlen; Wertebereich: −1 ≤ cos(x) ≤ 1.',
      'Periode 2π: cos(x + 2π) = cos(x) für jedes x.',
      'Gerade Funktion: cos(−x) = cos(x); der Graph ist symmetrisch zur y-Achse.',
      'Nullstellen bei x = π/2 + nπ; Maxima von 1 bei x = 2πn; Minima von −1 bei x = π + 2πn.',
      'y-Achsenabschnitt bei (0, 1); Ableitung ist −sin(x); eine Stammfunktion ist sin(x).',
    ],
    faqs: [
      {
        q: 'Ist der Kosinus nur ein verschobener Sinus?',
        a: 'Genau — cos(x) = sin(x + π/2), sodass der Kosinusgraph der um eine Viertelperiode nach links verschobene Sinusgraph ist. Sie teilen Amplitude, Periode und Wertebereich; nur der Startpunkt unterscheidet sich. Auf dem Einheitskreis sind sie die x- und y-Koordinaten desselben rotierenden Punkts.',
      },
      {
        q: 'Warum ist cos(0) = 1?',
        a: 'Beim Winkel 0 sitzt der rotierende Punkt auf dem Einheitskreis bei (1, 0), ganz rechts am Kreis, sodass seine x-Koordinate — der Kosinus — 1 ist und seine y-Koordinate — der Sinus — 0. Darum beginnt der Kosinusgraph an seinem Gipfel.',
      },
      {
        q: 'Was hat der Kosinus mit dem Skalarprodukt zu tun?',
        a: 'Die Skalarproduktformel a·b = |a||b|cos θ nutzt den Kosinus des Winkels zwischen den Vektoren, um zu messen, wie sehr sie in dieselbe Richtung zeigen. Der Kosinus ist 1, wenn sie parallel sind, 0 bei senkrecht und −1 bei entgegengesetzt — er wirkt also als Ausrichtungsmaß zwischen −1 und 1.',
      },
    ],
    related: [
      '/de/math-functions/sine/',
      '/de/math-functions/tangent/',
      '/de/examples/trigonometric-interference/',
      '/de/examples/damped-oscillation/',
      '/de/learn/what-is-a-function/',
    ],
  },
  {
    slug: 'tangent',
    name: 'Tangens',
    displayName: 'Tangensfunktion',
    notation: 'f(x) = tan(x)',
    expression: 'tan(x)',
    tagline:
      'Eine sich wiederholende Kurve, die von −∞ nach +∞ klettert, mit senkrechten Asymptoten, wo der Kosinus null wird.',
    description:
      'Graph f(x) = tan(x): Äste, Asymptoten bei π/2 + nπ, Periode π und unbeschränkter Wertebereich — und wo der Tangens in der Mathematik vorkommt.',
    intro: [
      'Die Tangensfunktion, tan(x) = sin(x)/cos(x), sieht ganz anders aus als ihre wellenförmigen Geschwister: Statt zwischen −1 und 1 zu oszillieren, fegt sie durch jeden reellen Wert nach oben, springt dann und beginnt von vorn. Jeder sich wiederholende Ast passiert eine Nullstelle bei x = nπ, klettert immer steiler und schießt ins Unendliche, wenn x sich π/2 + nπ nähert — den Punkten, wo cos(x) = 0 und das Verhältnis explodiert. Das sind die senkrechten Asymptoten der Funktion, die gestrichelten Mauern, denen sich die Kurve nähern, aber die sie niemals berühren kann.',
      'Der Tangens misst Steilheit: In einem rechtwinkligen Dreieck ist er Gegenkathete durch Ankathete, die Steigung der Hypotenuse, und für einen Neigungswinkel gibt er die Steigung der Geraden direkt an. Weil tan(x + π) = tan(x), beträgt seine Periode nur π — die Hälfte der von Sinus und Kosinus. Geben Sie tan(x) in den Rechner ein und zoomen Sie heraus, um zu sehen, wie die Äste die Ebene kacheln, jeder eine gestreckte S-Kurve zwischen zwei Asymptoten.',
    ],
    sections: [
      {
        heading: 'Was der Tangens ist',
        body: [
          'Geometrisch ist tan(x) die Steigung des Strahls beim Winkel x: Zeichnen Sie den Strahl vom Ursprung beim Winkel x und sehen Sie, wie steil er ansteigt — Anstieg durch waagrechte Strecke, Gegenkathete durch Ankathete. Äquivalent ist es die y-Koordinate, wo dieser Strahl die senkrechte Gerade x = 1 trifft, die den Einheitskreis berührt — daher der Name. Wenn der Strahl gerade nach oben schwingt, rast der Schnittpunkt ins Unendliche davon, und in dem Moment, wo der Strahl exakt nach oben zeigt, gibt es gar keinen Schnittpunkt — die Asymptote.',
          'Da tan(x) = sin(x)/cos(x), stammen die Nullstellen der Funktion vom Sinus (bei x = nπ) und ihre Asymptoten von den Nullstellen des Kosinus (bei x = π/2 + nπ). Der Tangens ist eine ungerade Funktion, tan(−x) = −tan(x), sodass jeder Ast drehsymmetrisch um seine eigene Nullstelle ist, und der gesamte Graph wiederholt sich alle π, weil das Verschieben von Sinus und Kosinus um π beide Vorzeichen kippt und das Verhältnis unverändert lässt.',
        ],
      },
      {
        heading: 'Asymptoten und unbeschränktes Verhalten',
        body: [
          'Die senkrechten Asymptoten bei x = π/2 + nπ sind das auffälligste Merkmal von tan(x): Von links kommend strebt die Kurve gegen +∞, von rechts gegen −∞. Die Funktion ist auf jedem Intervall zwischen Asymptoten stetig, hat aber an jeder Asymptote einen unvermeidlichen Sprung — keine Umdefinition kann ihn beheben, weil linker und rechter Grenzwert nicht übereinstimmen. Das macht den Tangens zum Standard-Schulbeispiel einer Funktion mit unendlich vielen senkrechten Asymptoten.',
          'Anders als Sinus und Kosinus ist der Tangens in beide Richtungen unbeschränkt: Sein Wertebereich sind alle reellen Zahlen. Nahe null verhält er sich fast wie die Gerade y = x (die Kleinwinkelnäherung tan(x) ≈ x), wird dann dramatisch steiler — bei x = 1,4 Bogenmaß beträgt der Wert bereits etwa 5,8, und bei 1,57 ist er enorm. Seine Ableitung, sec²(x) = 1 + tan²(x), ist immer mindestens 1, was bestätigt, dass die Kurve niemals abflacht.',
        ],
      },
      {
        heading: 'Wo der Tangens vorkommt',
        body: [
          'Der Tangens wandelt Winkel in Steigungen um, sodass er überall vorkommt, wo Neigung zählt: die Steigung eines Hügels (eine 45°-Steigung sind 100 % Steigung, weil tan(45°) = 1), die Wurfmathematik von Projektilen und der Winkel des Schattens einer Sonnenuhr. In der Analysis ist die Ableitung selbst eine Tangentensteigung — die Tangente an eine Kurve in einem Punkt — und der Arkustangens, arctan, ist, wie Rechner Winkel aus Steigungen zurückgewinnen, etwa beim Finden einer Peilung aus Δy/Δx.',
          'In der Physik taucht tan in Phasenbeziehungen auf: Der Phasenwinkel eines getriebenen Oszillators erfüllt tan(φ) = (Dämpfungsterm)/(Steifigkeitsterm), und in der Optik gehorcht der Brewster-Winkel tan(θ) = n₂/n₁. Überall, wo ein Verhältnis von vertikaler zu horizontaler Komponente zählt, ist der Tangens die natürliche Sprache.',
        ],
      },
    ],
    keyFacts: [
      'tan(x) = sin(x)/cos(x); Definitionsbereich sind alle reellen x außer π/2 + nπ.',
      'Wertebereich: alle reellen Zahlen — der Tangens ist nach oben und unten unbeschränkt.',
      'Periode π: tan(x + π) = tan(x); ungerade Funktion, tan(−x) = −tan(x).',
      'Nullstellen bei x = nπ; senkrechte Asymptoten bei x = π/2 + nπ.',
      'Ableitung ist sec²(x) = 1 + tan²(x), immer ≥ 1; nahe 0 gilt tan(x) ≈ x.',
    ],
    faqs: [
      {
        q: 'Warum hat tan(x) Asymptoten?',
        a: 'Weil tan(x) = sin(x)/cos(x), und cos(x) = 0 bei x = π/2 + nπ. Das Dividieren durch Werte immer näher bei null lässt das Verhältnis unbeschränkt wachsen, sodass der Graph auf beiden Seiten jedes dieser Punkte gegen ±∞ schießt. Die Funktion ist dort schlicht undefiniert.',
      },
      {
        q: 'Was ist die Periode des Tangens?',
        a: 'π, die halbe Periode von Sinus und Kosinus. Das Addieren von π zum Winkel kippt die Vorzeichen von sin(x) und cos(x), und die beiden Kippungen heben sich im Verhältnis auf, sodass tan(x + π) = tan(x). Der Graph wiederholt sein Astmuster alle π Bogenmaß.',
      },
      {
        q: 'Ist der Tangens überall steigend?',
        a: 'Er steigt auf jedem Intervall zwischen aufeinanderfolgenden Asymptoten, aber er steigt nicht als ganze Funktion — er springt an jeder Asymptote von +∞ zurück auf −∞. Die Aussage „tan steigt“ gilt also nur innerhalb eines einzelnen Asts, etwa (−π/2, π/2).',
      },
    ],
    related: [
      '/de/math-functions/sine/',
      '/de/math-functions/cosine/',
      '/de/learn/asymptotes-explained/',
      '/de/learn/what-is-a-function/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'quadratic',
    name: 'Quadratisch',
    displayName: 'Quadratische Funktion',
    notation: 'f(x) = x^2 - 4',
    expression: 'x^2 - 4',
    tagline:
      'Die Parabel x² − 4: eine U-förmige Kurve mit Nullstellen bei ±2 und ihrem Tiefpunkt bei (0, −4).',
    description:
      'Graph f(x) = x² − 4: Scheitel, Nullstellen bei ±2, Symmetrieachse und Minimum — und wo quadratische Funktionen in Physik und Algebra vorkommen.',
    intro: [
      'Die quadratische Funktion f(x) = x² − 4 ist die einfachste Parabel, bei der etwas Interessantes passiert: Sie kreuzt die x-Achse zweimal, taucht darunter und kehrt an einem einzigen Tiefpunkt um. Das Quadrieren macht jede Eingabe nicht-negativ, sodass x² bei x = 0 am kleinsten ist, und das Subtrahieren von 4 schiebt die ganze U-Form vier Einheiten nach unten. Das Ergebnis ist eine symmetrische Kurve mit Scheitel bei (0, −4), die sich für immer nach oben öffnet.',
      'Parabeln sind die Arbeitstiere der Algebra: Sie modellieren alles, wo eine Größe vom Quadrat einer anderen abhängt — die Fläche eines Quadrats, die Höhe eines geworfenen Balls über die Zeit, den Gewinn eines Unternehmens mit linearer Nachfrage. Das Beispiel x² − 4 ist besonders lehrreich, weil es sauber als (x − 2)(x + 2) faktorisiert, sodass seine x-Achsenabschnitte bei 2 und −2 direkt aus der Algebra ablesbar sind. Zeichnen Sie es im Rechner und beobachten Sie die Symmetrie zur y-Achse.',
    ],
    sections: [
      {
        heading: 'Was diese quadratische Funktion ist',
        body: [
          'Jede quadratische Funktion hat die Form ax² + bx + c, und ihr Graph ist immer eine Parabel — die U-Form, die man vom Quadrieren erhält. Hier ist a = 1 (positiv, also öffnet sich das U nach oben), b = 0 (keine Neigung, also sitzt der Scheitel auf der y-Achse) und c = −4 (der y-Achsenabschnitt). Die Scheitelformel x = −b/(2a) ergibt x = 0, und f(0) = −4 bestätigt das Minimum bei (0, −4).',
          'Die Faktorisierung enthüllt die Nullstellen: x² − 4 = (x − 2)(x + 2), eine Differenz von Quadraten, sodass die Kurve die x-Achse genau dort kreuzt, wo jeder Faktor null ist — bei x = 2 und x = −2. Zwischen den Nullstellen ist die Funktion negativ (das Tal unter der Achse); außerhalb ist sie positiv und wächst unbeschränkt. Weil der x²-Term für große |x| dominiert, streben beide Arme der Parabel gegen +∞.',
        ],
      },
      {
        heading: 'Symmetrie, Scheitel und Änderungsrate',
        body: [
          'Die y-Achse ist die Symmetrieachse der Parabel: f(−x) = f(x), sodass die linke Hälfte die rechte spiegelt. Der Scheitel ist der Wendepunkt der Parabel — hier das globale Minimum, da die Arme ewig steigen. Jede quadratische Funktion hat genau einen Scheitel und genau einen Extremwert, darum sind Parabeln das Standardmodell für Optimierung: maximaler Gewinn, minimale Kosten, höchster Punkt einer Flugbahn.',
          'Die Ableitung f′(x) = 2x erzählt den Rest der Geschichte: negativ für x < 0 (Abstieg in den Scheitel), null bei x = 0 (der flache Boden), positiv für x > 0 (Aufstieg heraus). Die Steigung selbst wächst linear, eine konstante zweite Ableitung von 2 — die Signatur konstanter Beschleunigung, darum ist die Strecke unter Schwerkraft quadratisch in der Zeit.',
        ],
      },
      {
        heading: 'Wo quadratische Funktionen vorkommen',
        body: [
          'Werfen Sie einen Ball, und seine Höhe folgt einer Parabel: h(t) = −4,9t² + v₀t + h₀, dieselbe Form wie x² − 4, aber gedreht und verschoben. Flächen und Volumina erzeugen natürlicherweise Parabeln und Kubiken — das Verdoppeln der Quadratseite vervierfacht seine Fläche — und die Mitternachtsformel löst jede Gleichung dieses Typs, auch diese: x = ±√4 = ±2.',
          'In der Wirtschaft wird der Gewinn als Funktion des Preises oft als nach unten geöffnete Parabel modelliert (der Umsatz steigt und fällt dann mit steigendem Preis), und ihr Scheitel gibt den optimalen Preis. In der Statistik minimiert die Kleinste-Quadrate-Anpassung eine quadratische Fehlerfunktion, und die Glockenkurve der Normalverteilung ist e^(−x²) — ein Quadrat im Exponenten.',
        ],
      },
    ],
    keyFacts: [
      'Faktorisierte Form: x² − 4 = (x − 2)(x + 2); Nullstellen (x-Achsenabschnitte) bei x = 2 und x = −2.',
      'Scheitel (globales Minimum) bei (0, −4); Symmetrieachse ist die y-Achse (x = 0).',
      'Definitionsbereich: alle reellen Zahlen; Wertebereich: y ≥ −4.',
      'Gerade Funktion: f(−x) = f(x); der Graph spiegelt sich über die y-Achse.',
      'y-Achsenabschnitt bei (0, −4); die Funktion ist zwischen den Nullstellen negativ und außerhalb positiv.',
      'Ableitung f′(x) = 2x; die Steigung ist null am Scheitel und die zweite Ableitung ist die Konstante 2.',
    ],
    faqs: [
      {
        q: 'Wie findet man die Nullstellen von x² − 4?',
        a: 'Faktorisieren Sie als Differenz von Quadraten: x² − 4 = (x − 2)(x + 2). Ein Produkt ist null, wenn ein Faktor null ist, also x = 2 oder x = −2. Äquivalent gibt die Mitternachtsformel x = (0 ± √(0 + 16))/2 = ±2.',
      },
      {
        q: 'Was ist der Minimalwert von x² − 4?',
        a: '−4, angenommen bei x = 0. Da x² ≥ 0 für alle reellen x, ergibt das Subtrahieren von 4 x² − 4 ≥ −4, mit Gleichheit nur wenn x² = 0. Der Scheitel (0, −4) ist der tiefste Punkt der Parabel, und die Funktion steigt auf beiden Seiten unbeschränkt.',
      },
      {
        q: 'Warum ist der Graph symmetrisch?',
        a: 'Weil nur gerade Potenzen von x vorkommen: (−x)² − 4 = x² − 4, also f(−x) = f(x). Jede Eingabe und ihr Negatives geben dieselbe Ausgabe, was die rechte Hälfte des Graphen über die y-Achse auf die linke Hälfte spiegelt.',
      },
    ],
    related: [
      '/de/examples/projectile-motion/',
      '/de/math-functions/square-root/',
      '/de/math-functions/absolute-value/',
      '/de/learn/understanding-derivatives/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'cubic',
    name: 'Kubisch',
    displayName: 'Kubische Funktion',
    notation: 'f(x) = x^3 - 3*x',
    expression: 'x^3 - 3*x',
    tagline:
      'Eine S-förmige Kubik mit drei reellen Nullstellen, einem lokalen Berg und Tal und 180°-Drehsymmetrie.',
    description:
      'Graph f(x) = x³ − 3x: Drei reelle Nullstellen, lokales Max und Min, Wendepunkt — und die überraschende Verbindung zur Dreifachwinkel-Trigonometrie.',
    intro: [
      'Die Kubik f(x) = x³ − 3x zeichnet ein gestrecktes S: Sie steigt von −∞ auf, krönt einen kleinen Hügel bei (−1, 2), taucht durch den Ursprung in ein Tal bei (1, −2) und klettert nach +∞ davon. Anders als eine Parabel hat sie kein globales Maximum oder Minimum — der x³-Term überwältigt schließlich alles, zieht den linken Arm ewig nach unten und den rechten Arm ewig nach oben. Zwischen den Extremen kreuzt die Kurve die x-Achse dreimal, bei −√3, 0 und √3.',
      'Diese besondere Kubik ist ein Liebling der Lehrbücher, weil sich alles an ihr von Hand berechnen lässt: Ihre Nullstellen faktorisieren über x(x² − 3), ihre Extrempunkte kommen aus der sauberen Ableitung 3x² − 3, und sie verbirgt eine wunderschöne Verbindung zur Dreifachwinkel-Trigonometrie. Kubiken modellieren Volumenwachstum, kubische Zustandsgleichungen und jede Beziehung, wo der Kubus einer Größe zählt. Zeichnen Sie x^3 - 3*x im Rechner und zoomen Sie heraus, um zu sehen, wie sich das S in sein steiles Endverhalten geradezieht.',
    ],
    sections: [
      {
        heading: 'Was diese Kubik ist',
        body: [
          'Klammern Sie x aus, und die Nullstellen erscheinen: x³ − 3x = x(x² − 3) = x(x − √3)(x + √3), sodass der Graph die x-Achse bei −√3 ≈ −1,732, 0 und √3 ≈ 1,732 kreuzt. Drei reelle Nullstellen sind das meiste, was eine Kubik als einzelne Kreuzungen zeigen kann — der Grad der Funktion setzt das Maximum. Zwischen aufeinanderfolgenden Nullstellen muss die Kurve umkehren, was genau Hügel und Tal tun.',
          'Das Endverhalten wird allein von x³ diktiert: Wenn x → +∞, dann → +∞, und wenn x → −∞, dann → −∞. Der −3x-Term formt nur die Mitte des Graphen und meißelt die Schlängelung heraus. Jedes Polynom ungeraden Grades teilt dieses Gegensätze-Enden-Verhalten, das mindestens eine reelle Nullstelle garantiert — die Kurve muss die Achse kreuzen, um von −∞ nach +∞ zu gelangen.',
        ],
      },
      {
        heading: 'Extrempunkte und der Wendepunkt',
        body: [
          'Die Ableitung f′(x) = 3x² − 3 = 3(x − 1)(x + 1) verschwindet bei x = ±1 und markiert die zwei Extrempunkte: ein lokales Maximum bei (−1, 2) und ein lokales Minimum bei (1, −2). Die Funktion steigt bis x = −1, fällt bis x = 1, steigt dann ewig — das klassische Auf-Ab-Auf einer Kubik mit zwei kritischen Punkten. Das sind nur lokale Extreme; das globale Verhalten ist beidseitig unbeschränkt.',
          'Auf halbem Weg dazwischen, bei (0, 0), sitzt der Wendepunkt, wo die Kurve von rechtsgekrümmt zu linksgekrümmt wechselt. Die zweite Ableitung f″(x) = 6x bestätigt es: negativ links von 0, positiv rechts von 0, exakt null am Ursprung. Weil die Kubik eine ungerade Funktion ist, ist der Wendepunkt auch das Zentrum ihrer 180°-Drehsymmetrie — drehen Sie den Graphen eine halbe Umdrehung um (0, 0), bildet er sich auf sich selbst ab.',
        ],
      },
      {
        heading: 'Eine verborgene trigonometrische Identität',
        body: [
          'Hier ist die Überraschung, für die diese Kubik berühmt ist: Das Einsetzen von x = 2cos θ ergibt x³ − 3x = 2cos(3θ). Man kann es aus der Dreifachwinkelformel cos(3θ) = 4cos³θ − 3cos θ verifizieren: Mit x = 2cos θ wird die linke Seite zu 8cos³θ − 6cos θ = 2(4cos³θ − 3cos θ) = 2cos(3θ). Die Kubik ist heimlich ein verdreifachter Winkel in Verkleidung.',
          'Diese Identität ist mehr als eine Kuriosität — sie ist der Schlüssel zum trigonometrischen Lösen kubischer Gleichungen. Eine Kubik mit drei reellen Nullstellen, wie diese, lässt sich lösen, indem man ihre Nullstellen als skalierte Kosinus geeigneter Winkel schreibt, eine Methode, die auf Viète zurückgeht. Sie erklärt auch, warum Hügel und Tal die exakten Höhen ±2 haben: Sie sind 2cos(3θ), ausgewertet an seinen eigenen Gipfeln.',
        ],
      },
    ],
    keyFacts: [
      'Faktorisiert: x(x − √3)(x + √3); drei reelle Nullstellen bei x = −√3, 0 und √3.',
      'Lokales Maximum bei (−1, 2); lokales Minimum bei (1, −2); kein globales Max oder Min.',
      'Wendepunkt bei (0, 0); ungerade Funktion mit 180°-Drehsymmetrie um den Ursprung.',
      'Definitions- und Wertebereich: alle reellen Zahlen.',
      'Endverhalten: f(x) → −∞ für x → −∞ und f(x) → +∞ für x → +∞.',
      'Identität: Mit x = 2cos θ gilt x³ − 3x = 2cos(3θ).',
    ],
    faqs: [
      {
        q: 'Warum kreuzt x³ − 3x die x-Achse dreimal?',
        a: 'Ihre faktorisierte Form x(x − √3)(x + √3) zeigt drei verschiedene lineare Faktoren, von denen jeder eine Nullstelle beisteuert: x = 0, x = √3 und x = −√3. Ein Polynom dritten Grades kann höchstens drei reelle Nullstellen haben, und dieses erreicht das Maximum. Zwischen jedem Nullstellenpaar zwingen die lokalen Extrema der Funktion die Kurve zur Richtungsumkehr.',
      },
      {
        q: 'Was sind das lokale Max und Min?',
        a: 'Lösen Sie f′(x) = 3x² − 3 = 0, um x = ±1 zu erhalten. Dann ist f(−1) = −1 + 3 = 2 das lokale Maximum und f(1) = 1 − 3 = −2 das lokale Minimum. Sie sind „lokal“, weil die Funktion weit rechts jede Schranke überschreitet und weit links unter jede Schranke fällt.',
      },
      {
        q: 'Was hat diese Kubik mit Trigonometrie zu tun?',
        a: 'Die Identität x³ − 3x = 2cos(3θ) unter der Substitution x = 2cos θ verknüpft die Kubik mit Dreifachwinkelformeln. Historisch gab diese Verbindung eine trigonometrische Methode zum Lösen von Kubiken mit drei reellen Nullstellen — den „casus irreducibilis“, der die Algebraiker des 16. Jahrhunderts rätseln ließ.',
      },
    ],
    related: [
      '/de/math-functions/quadratic/',
      '/de/learn/understanding-derivatives/',
      '/de/learn/what-is-a-function/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'exponential',
    name: 'Exponential',
    displayName: 'Exponentialfunktion',
    notation: 'f(x) = e^x',
    expression: 'e^x',
    tagline:
      'Die Funktion, die ihre eigene Ableitung ist — konstantes relatives Wachstum, ewig steigend, niemals null berührend.',
    description:
      'Graph f(x) = eˣ: Konstantes relatives Wachstum, waagrechte Asymptote y = 0, Punkt (0, 1) — Exponentialmodelle in Wissenschaft und Finanz.',
    intro: [
      'Die Exponentialfunktion f(x) = eˣ ist die mathematische Verkörperung von Wachstum proportional zur Größe: Geld, das Zinseszinsen trägt, Bakterien, die sich in einer Schale verdoppeln, oder ein Gerücht, das sich durch eine Menge verbreitet. Ihre definierende Eigenschaft ist, dass ihre Änderungsrate ihrem aktuellen Wert gleicht — d/dx eˣ = eˣ — darum erscheint sie überall, wo die Wachstumsrate einer Größe proportional zur Größe selbst ist. Die Basis e ≈ 2,71828 ist die einzige Zahl, die das möglich macht.',
      'Der Graph erzählt die Geschichte auf einen Blick: Er passiert (0, 1), kriecht für große negative x fast flach entlang der x-Achse (nähert sich 0, erreicht es aber nie) und biegt dann nach oben und klettert für positive x immer steiler. Bei x = 1 gleicht er e ≈ 2,718, bei x = 2 ist er e² ≈ 7,389, und jeder Einheitsschritt multipliziert den Wert mit einem weiteren Faktor e. Geben Sie e^x in den Rechner ein und vergleichen Sie mit 2^x, um zu sehen, wie die Basis die Steilheit steuert.',
    ],
    sections: [
      {
        heading: 'Was die Exponentialfunktion ist',
        body: [
          'Wiederholte Multiplikation ist das Herz von eˣ: e³ bedeutet e·e·e, und die Potenzgesetze e^(a+b) = e^a·e^b dehnen dies auf alle reellen Potenzen aus, inklusive Brüchen und Negativen (e^(−x) = 1/eˣ). Die Zahl e selbst lässt sich als Grenzwert von (1 + 1/n)ⁿ für wachsendes n definieren — das Ergebnis von 100 % Zinseszins über unendlich viele Perioden — oder als unendliche Summe 1 + 1 + 1/2! + 1/3! + ⋯.',
          'Was e unter allen Basen besonders macht, ist die Ableitung: d/dx aˣ = aˣ·ln(a), und nur für a = e gleicht der ln-Faktor 1 und lässt die Funktion durch Differenzieren unverändert. Äquivalent ist eˣ die einzige Funktion, die f′ = f mit f(0) = 1 erfüllt. Darum heißt e die natürliche Basis — die Analysis zeichnet sie aus.',
        ],
      },
      {
        heading: 'Form, Asymptote und Wachstum',
        body: [
          'Für x < 0 schmiegt sich der Graph von oben an die x-Achse und zerfällt gegen 0, ohne sie je zu berühren — die waagrechte Asymptote y = 0 für x → −∞. Bei x = 0 passiert die Kurve (0, 1), ihren y-Achsenabschnitt, und für x > 0 beschleunigt sie nach oben, überall konvex (zweite Ableitung eˣ > 0) und überall steigend (erste Ableitung eˣ > 0). Es gibt keine Nullstellen, keine Wendepunkte, keine Krümmungswechsel: nur unerbittliches, glattes, aufwärts gekrümmtes Wachstum.',
          'Exponentielles Wachstum überholt schließlich jedes Polynom: eˣ wächst schneller als x¹⁰⁰, schneller als jede feste Potenz. Darum modellieren Exponentialfunktionen außer Kontrolle geratene Prozesse — Kettenreaktionen, virale Ausbreitung in ihrer Frühphase — und darum wachsen auch ihre Umkehrungen, die Logarithmen, so langsam. Auf einer logarithmischen Skala wird eˣ zur Geraden y = x, eine praktische Art, exponentielle Daten zu erkennen.',
        ],
      },
      {
        heading: 'Wo Exponentialfunktionen vorkommen',
        body: [
          'Jede Differenzialgleichung der Form dy/dx = ky hat die Lösung y = Ce^(kx): Newtons Abkühlungsgesetz, radioaktiver Zerfall (mit k < 0), stetig verzinste Zinsen und Bevölkerungswachstum folgen ihr alle. Die Glockenkurve der Normalverteilung, (1/√(2π))e^(−x²/2), setzt eine Exponentialfunktion eines Quadrats ins Zentrum der Statistik. In der komplexen Analysis verschmilzt Eulers Formel e^(iθ) = cos θ + i·sin θ Exponentialfunktionen mit Trigonometrie und trägt die gesamte Wechselstromkreis-Theorie und Quantenmechanik.',
          'In der Informatik schneiden Exponentialfunktionen beidseitig: Algorithmen mit exponentieller Zeitkomplexität werden mit wachsenden Eingaben undurchführbar, während exponentielles Backoff — 1, 2, 4, 8 … Sekunden zwischen Wiederholungen warten — das Standardheilmittel für überlastete Server ist. Die logistische Kurve, eˣ/(1 + eˣ), zähmt reines exponentielles Wachstum mit einer Tragfähigkeit und modelliert alles von Epidemien bis zu neuronalen Netzaktivierungen.',
        ],
      },
    ],
    keyFacts: [
      'Definitionsbereich: alle reellen Zahlen; Wertebereich: y > 0 — eˣ ist niemals null oder negativ.',
      'y-Achsenabschnitt bei (0, 1); waagrechte Asymptote y = 0 für x → −∞.',
      'Streng steigend und überall konvex; keine Maxima, Minima oder Wendepunkte.',
      'Ihre eigene Ableitung: d/dx eˣ = eˣ; eine Stammfunktion ist eˣ selbst.',
      'Potenzgesetze: e^(a+b) = e^a·e^b, e^(−x) = 1/eˣ, (eˣ)^n = e^(nx).',
      'e ≈ 2,71828; eˣ übertrifft jedes Polynom für x → ∞.',
    ],
    faqs: [
      {
        q: 'Warum ist eˣ seine eigene Ableitung?',
        a: 'Per Definition ist e die einzige Basis, für die d/dx aˣ = aˣ·ln(a) den ln(a) = 1 hat. Das Differenzieren von eˣ über die Grenzwertdefinition ergibt eˣ mal den Grenzwert von (e^h − 1)/h, und e ist genau als die Zahl definiert, die diesen Grenzwert gleich 1 macht. Die Steigung des Graphen an jedem Punkt gleicht also der Funktionshöhe dort.',
      },
      {
        q: 'Was ist e genau?',
        a: 'Eine irrationale Zahl, etwa 2,71828, definierbar als Grenzwert von (1 + 1/n)ⁿ für n → ∞ oder die Summe 1 + 1 + 1/2! + 1/3! + ⋯. Wie π wiederholt sich ihre Dezimalentwicklung niemals. Sie ist die „natürliche“ Basis, weil die Analysis mit ihr ihre einfachste Form annimmt.',
      },
      {
        q: 'Erreicht eˣ jemals null?',
        a: 'Nein. Für reelles x gilt immer eˣ > 0 — der Graph nähert sich der x-Achse asymptotisch für x → −∞, berührt sie aber nie. Das folgt aus eˣ·e^(−x) = e^0 = 1: Wäre eˣ null, könnte das Produkt nicht 1 sein.',
      },
    ],
    related: [
      '/de/math-functions/natural-logarithm/',
      '/de/examples/logistic-growth/',
      '/de/learn/understanding-derivatives/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'natural-logarithm',
    name: 'Natürlicher Logarithmus',
    displayName: 'Natürliche Logarithmusfunktion',
    notation: 'f(x) = log(x)',
    expression: 'log(x)',
    tagline:
      'Die Umkehrung von eˣ — sie wickelt exponentielles Wachstum auf und verwandelt Multiplikation in Addition.',
    description:
      'Graph f(x) = ln(x): Definitionsbereich x > 0, Asymptote bei x = 0, Logarithmengesetze — die Umkehrung von eˣ und Anwendungen von pH bis Algorithmen.',
    intro: [
      'Der natürliche Logarithmus, geschrieben ln(x) oder log(x), beantwortet die Frage „e hoch was ergibt x?“ Er ist die exakte Umkehrung der Exponentialfunktion: ln(eˣ) = x und e^(ln x) = x, sodass sein Graph das Spiegelbild von y = eˣ an der Geraden y = x ist. Wo die Exponentialfunktion nach oben schießt, klettert der Logarithmus quälend langsam — ln(10) ≈ 2,303, ln(100) ≈ 4,605, ln(1.000.000) ≈ 13,816 — jede Verzehnfachung von x fügt der Ausgabe nur etwa 2,303 hinzu.',
      'Dieses langsame Wachstum ist genau der Punkt: Logarithmen komprimieren enorme Bereiche in handhabbare, darum sind die Richter-Skala, Dezibel und pH alle logarithmisch. Der Graph passiert (1, 0), steigt für x > 1, taucht gegen −∞ ab, wenn x sich 0 von rechts nähert (die senkrechte Asymptote bei x = 0), und ist für x ≤ 0 undefiniert — man kann e auf keine reelle Potenz erheben und null oder eine negative Zahl erhalten. Geben Sie log(x) in den Rechner ein, neben e^x, um die Spiegelsymmetrie zu sehen.',
    ],
    sections: [
      {
        heading: 'Was der natürliche Logarithmus ist',
        body: [
          'Logarithmen wurden erfunden, um Multiplikation in Addition zu verwandeln: ln(ab) = ln(a) + ln(b). Vor elektronischen Rechnern multiplizierten Wissenschaftler große Zahlen, indem sie ihre Logarithmen nachschlugen, addierten und zurückverwandelten — der Rechenschieber ist eine physische Verkörperung dieser Idee. Das „natürlich“ im Namen bezieht sich auf die Basis e, die Basis, die die Analysis sauber macht: d/dx ln(x) = 1/x, die einfachstmögliche Ableitung für eine Umkehr-Exponentialfunktion.',
          'Die drei Logarithmengesetze folgen aus den Potenzgesetzen seiner Umkehrung: ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b und ln(a^b) = b·ln a. Zusammen lassen sie komplizierte multiplikative Ausdrücke in Summen zerlegen — der Grund, warum Logarithmen in Entropieformeln, Likelihood-Berechnungen und überall auftauchen, wo Produkte unhandlich werden.',
        ],
      },
      {
        heading: 'Definitionsbereich, Asymptote und Form',
        body: [
          'Der Definitionsbereich ist nur x > 0, eine direkte Folge von eˣ > 0: Es gibt keine reelle Potenz von e, die null oder eine negative Zahl ergibt, sodass der Logarithmus sie nicht akzeptieren kann. Für x → 0⁺ gilt ln(x) → −∞, was die senkrechte Asymptote x = 0 (die y-Achse) ergibt — das Spiegelbild der waagrechten Asymptote der Exponentialfunktion. Der x-Achsenabschnitt liegt bei (1, 0), da e^0 = 1, das Spiegelbild des y-Achsenabschnitts von eˣ bei (0, 1).',
          'Die Kurve steigt überall (Ableitung 1/x > 0 für x > 0), ist aber überall rechtsgekrümmt (zweite Ableitung −1/x² < 0): Sie steigt direkt rechts von null schnell an und flacht dann unerbittlich ab. Sie hat kein Maximum und keinen Wendepunkt und ist die Stammfunktion von 1/x — das Integral, das keine Potenzregel bewältigen kann, da ∫xⁿ dx bei n = −1 versagt.',
        ],
      },
      {
        heading: 'Wo Logarithmen vorkommen',
        body: [
          'Logarithmische Skalen messen Phänomene, die viele Größenordnungen umspannen: Jeder Richter-Punkt ist etwa 32× die Energie, jede pH-Einheit 10× die Säure, und Dezibel komprimieren Schallintensitäten vom Flüstern bis zum Düsenjet in einen Bereich von 0–140. In der Informationstheorie wird Entropie in Nats (natürlicher Logarithmus) oder Bits (Logarithmus zur Basis 2) gemessen und quantifiziert Überraschung und optimale Codelängen.',
          'In der Informatik halbieren O(log n)-Algorithmen — die binäre Suche ist der Klassiker — jeden Schritt das Problem, sodass das Verdoppeln der Eingabe nur einen weiteren Schritt hinzufügt; das ist logarithmisches Wachstum in Aktion. In der Statistik begradigt das Logarithmieren exponentielle Daten zu Geraden, und die Log-Normalverteilung modelliert Größen wie Einkommen und Partikelgrößen, die sich multiplizieren statt addieren.',
        ],
      },
    ],
    keyFacts: [
      'Definitionsbereich: x > 0; Wertebereich: alle reellen Zahlen. Undefiniert bei x ≤ 0.',
      'Umkehrung von eˣ: ln(eˣ) = x und e^(ln x) = x; Graphen spiegeln sich an y = x.',
      'x-Achsenabschnitt bei (1, 0); senkrechte Asymptote x = 0 mit ln(x) → −∞ für x → 0⁺.',
      'Logarithmengesetze: ln(ab) = ln a + ln b; ln(a/b) = ln a − ln b; ln(a^b) = b·ln a.',
      'Ableitung d/dx ln(x) = 1/x; ln ist die Stammfunktion von 1/x.',
      'Steigend und rechtsgekrümmt auf seinem ganzen Definitionsbereich; keine Maxima, Minima oder Wendepunkte.',
    ],
    faqs: [
      {
        q: 'Warum ist ln(x) für negative x undefiniert?',
        a: 'Weil ln(x) fragt „e hoch was ergibt x?“, und e hoch eine reelle Potenz immer positiv ist. Kein reeller Exponent erzeugt null oder eine negative Zahl, sodass der Logarithmus dort keinen reellen Wert hat. (Komplexe Logarithmen existieren, sind aber mehrdeutig und jenseits dieses reellwertigen Graphen.)',
      },
      {
        q: 'Was ist der Unterschied zwischen ln(x) und log₁₀(x)?',
        a: 'Nur die Basis: ln nutzt e ≈ 2,718, log₁₀ nutzt 10. Sie sind proportional — ln(x) = ln(10)·log₁₀(x) ≈ 2,303·log₁₀(x) — sodass ihre Graphen identische Formen haben, nur unterschiedliche vertikale Skalen. Natürliche Logarithmen geben die sauberste Analysis (Ableitung 1/x); dekadische Logarithmen passen zu dezimalen Messskalen.',
      },
      {
        q: 'Warum flacht der Graph so stark ab?',
        a: 'Weil das Aufwickeln exponentiellen Wachstums von Natur aus langsam ist: Um ln(x) um 1 zu erhöhen, muss man x mit e ≈ 2,718 multiplizieren. Die Ableitung 1/x schrumpft mit wachsendem x, sodass jede zusätzliche Höheneinheit ein immer größeres Vielfaches von x erfordert. Diese Abflachung macht Logarithmen ideal zum Komprimieren riesiger Bereiche.',
      },
    ],
    related: [
      '/de/math-functions/exponential/',
      '/de/learn/understanding-integrals/',
      '/de/learn/understanding-derivatives/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'square-root',
    name: 'Quadratwurzel',
    displayName: 'Quadratwurzelfunktion',
    notation: 'f(x) = sqrt(x)',
    expression: 'sqrt(x)',
    tagline: 'Die sanfte Halbparabel — die Umkehrung des Quadrierens, definiert für x ≥ 0.',
    description:
      'Graph f(x) = √x: Definitionsbereich x ≥ 0, die Halbparabel-Form, die Punkte (0,0) und (4,2) und Quadratwurzeln in Abstands- und Geometrieproblemen.',
    intro: [
      'Die Quadratwurzelfunktion f(x) = √x beantwortet „welche nicht-negative Zahl, mit sich selbst multipliziert, ergibt x?“ Ihr Graph ist die obere Hälfte einer seitlichen Parabel: Beginnend am Ursprung steigt sie steil an — mit einer senkrechten Tangente — biegt dann um und flacht ab, wobei sie (1, 1), (4, 2) und (9, 3) passiert. Sie ist die Umkehrung von x² eingeschränkt auf x ≥ 0, sodass ihr Graph das Spiegelbild der rechten Hälfte der Parabel y = x² an der Geraden y = x ist.',
      'Quadratwurzeln erscheinen überall, wo Pythagoras es tut: Die Abstandsformel √((Δx)² + (Δy)²) ist eine Quadratwurzel, ebenso die Standardabweichung, der Diskriminantenterm der Mitternachtsformel und der quadratische Mittelwert hinter Wechselspannungsangaben. Die Funktion wächst unbeschränkt, aber immer langsamer — √1.000.000 ist nur 1.000. Geben Sie sqrt(x) in den Rechner ein und zeichnen Sie x^2 auf [0, ∞) daneben, um die Spiegelsymmetrie zu sehen.',
    ],
    sections: [
      {
        heading: 'Was die Quadratwurzel ist',
        body: [
          'Das Symbol √ bezeichnet die Hauptwurzel (nicht-negativ): √9 = 3, nicht ±3, weil eine Funktion pro Eingabe eine Ausgabe geben muss. Die Gleichung x² = 9 hat zwei Lösungen, ±3, aber die Funktion √x gibt nur die nicht-negative zurück — das ± gehört zum Lösen von Gleichungen, nicht zur Funktion. Diese Eindeutigkeit macht √x differenzierbar und als eine saubere Kurve zeichenbar.',
          'Algebraisch gilt √(x²) = |x|, nicht x — die Wurzel macht das Quadrat rückgängig, stellt aber Nicht-Negativität wieder her, darum erscheint die Betragsfunktion. Die Wurzel gehorcht auch √(ab) = √a·√b und √(a/b) = √a/√b für nicht-negative a, b, den multiplikativen Gesetzen, die von den Exponenten geerbt sind, da √x = x^(1/2).',
        ],
      },
      {
        heading: 'Definitionsbereich, Form und die senkrechte Tangente',
        body: [
          'Der Definitionsbereich ist x ≥ 0: Keine reelle Zahl quadriert sich zu einer negativen, sodass die Funktion negative Eingaben nicht akzeptieren kann (über den reellen Zahlen). Bei x = 0 startet der Graph mit einer senkrechten Tangente — die Ableitung 1/(2√x) explodiert gegen +∞ — was man sieht, wie die Kurve den Ursprung gerade nach oben verlässt, bevor sie nach rechts biegt. Sie steigt überall auf ihrem Definitionsbereich und ist überall rechtsgekrümmt, wobei sie mit wachsendem x abflacht.',
          'Der Wertebereich ist y ≥ 0, und bemerkenswerte Punkte sind perfekte Quadrate: (0, 0), (1, 1), (4, 2), (9, 3), (16, 4). Dazwischen interpoliert die Kurve glatt — √2 ≈ 1,414, die berühmte irrationale Zahl, deren Entdeckung die pythagoreische Mathematik erschütterte. Die Funktion hat kein Maximum, und ihr einziges Randextremum ist das Minimum 0 bei x = 0.',
        ],
      },
      {
        heading: 'Wo Quadratwurzeln vorkommen',
        body: [
          'Abstand ist das Heimatterrain der Quadratwurzel: von der Pythagoras-Hypotenuse über die n-dimensionale Abstandsformel bis zur Standardabweichung (der Quadratwurzel der Varianz) ist „quadrieren, addieren, Wurzel ziehen“ eines der meistwiederholten Muster der Mathematik. Die Mitternachtsformel x = (−b ± √(b² − 4ac))/(2a) setzt eine Quadratwurzel ins Herz des Lösens quadratischer Gleichungen — inklusive des Findens, wo x² − 4 null kreuzt.',
          'In der Physik involvieren viele Gesetze Quadratwurzeln: Die Periode eines Pendels ist proportional zu √(Länge), die Fluchtgeschwindigkeit zu √(1/Radius), und die Effektivspannung des Wechselstromnetzes ist die Spitzenspannung geteilt durch √2. In der Geometrie ist √2 die Diagonale eines Einheitsquadrats und das Seitenverhältnis von A-Serien-Papier.',
        ],
      },
    ],
    keyFacts: [
      'Hauptwurzel: √x ≥ 0 für alle x im Definitionsbereich; √9 = 3, nicht ±3.',
      'Definitionsbereich: x ≥ 0; Wertebereich: y ≥ 0. Undefiniert für negative x (über den reellen Zahlen).',
      'Umkehrung von x² auf [0, ∞): √(x²) = |x|, und (√x)² = x für x ≥ 0.',
      'Schlüsselpunkte: (0, 0), (1, 1), (4, 2), (9, 3); senkrechte Tangente am Ursprung.',
      'Steigend und rechtsgekrümmt auf ihrem Definitionsbereich; Minimum 0 bei x = 0, kein Maximum.',
      'Ableitung d/dx √x = 1/(2√x); Gesetze √(ab) = √a·√b für a, b ≥ 0.',
    ],
    faqs: [
      {
        q: 'Warum ist √9 nicht gleich ±3?',
        a: 'Weil √ eine Funktion bezeichnet und Funktionen pro Eingabe genau einen Wert zurückgeben — per Konvention die nicht-negative Wurzel. Die Gleichung x² = 9 hat zwar zwei Lösungen, x = 3 und x = −3, aber nur 3 ist √9. Das Schreiben von ±√9 stellt beim Lösen beide Lösungen wieder her.',
      },
      {
        q: 'Warum kann man keine Quadratwurzel aus einer negativen Zahl ziehen (in den reellen Zahlen)?',
        a: 'Weil jede reelle Zahl quadriert nicht-negativ ist: Positive geben positive Quadrate, Negative geben positive Quadrate, und null gibt null. Nichts Reelles quadriert sich zu −1, sodass √(−1) keinen reellen Wert hat. Die Erweiterung des Zahlensystems mit i, wobei i² = −1, ergibt komplexe Quadratwurzeln.',
      },
      {
        q: 'Was ist die Ableitung von √x bei x = 0?',
        a: 'Sie existiert nicht — die Ableitung 1/(2√x) strebt gegen +∞ für x → 0⁺, sodass der Graph eine senkrechte Tangente am Ursprung hat. Geometrisch verlässt die Kurve (0, 0) gerade nach oben; es gibt dort keine endliche Steigung, obwohl die Funktion selbst bei 0 stetig ist.',
      },
    ],
    related: [
      '/de/math-functions/quadratic/',
      '/de/math-functions/absolute-value/',
      '/de/learn/what-is-a-function/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'absolute-value',
    name: 'Betrag',
    displayName: 'Betragsfunktion',
    notation: 'f(x) = abs(x)',
    expression: 'abs(x)',
    tagline:
      'Das V-förmige Maß des Abstands von null — einfach, symmetrisch, mit einer Ecke am Ursprung.',
    description:
      'Graph f(x) = |x|: Den V-förmigen Graphen, die Ecke am Ursprung, seine Abstandsdeutung, die abschnittsweise Definition und Anwendungen in Fehlerschranken.',
    intro: [
      'Die Betragsfunktion f(x) = |x| ist Abstand sichtbar gemacht: |x| ist, wie weit x auf der Zahlengeraden von null sitzt, unabhängig von der Richtung. Ihr Graph ist ein perfektes V — die Gerade y = −x für negative Eingaben trifft die Gerade y = x für positive an der scharfen Ecke (0, 0). Diese Ecke ist das berühmteste Merkmal der Funktion: der eine Punkt, wo sie stetig, aber nicht differenzierbar ist, wo die Steigung von −1 auf 1 springt.',
      'Der Betrag taucht überall auf, wo der Betrag mehr zählt als das Vorzeichen: Fehlerschranken (|gemessen − wahr| < Toleranz), Toleranzen in der Fertigung, der Abstand zwischen zwei Zahlen (|a − b|) und abschnittsweise Definitionen in der gesamten angewandten Mathematik. Er ist auch das einfachste Beispiel einer Funktion, die aus dem Zusammenkleben zweier Formeln gebaut ist. Geben Sie abs(x) in den Rechner ein, versuchen Sie dann abs(x - 3), um zu beobachten, wie das V gleitet, und sehen Sie Abstand-von-3 als Graphen gezeichnet.',
    ],
    sections: [
      {
        heading: 'Was der Betrag ist',
        body: [
          'Die Definition ist abschnittsweise: |x| = x, wenn x ≥ 0, und |x| = −x, wenn x < 0 — das Minuszeichen kippt Negative zurück zu Positiven. Also |5| = 5 und |−5| = −(−5) = 5. Äquivalent ist |x| = √(x²), was zeigt, warum die Ausgabe niemals negativ ist: Das Quadrieren löscht das Vorzeichen und die Hauptwurzel hält es gelöscht. Beide Formen sagen dasselbe: Betrag ohne Richtung.',
          'Das macht |x − a| zum Abstand zwischen x und a, der Arbeitspferd-Interpretation. Die Ungleichung |x − 3| < 2 beschreibt alle Punkte innerhalb von 2 Einheiten um 3, also das offene Intervall (1, 5) — der Betrag wandelt Abstandssprache in Algebra um und zurück. Es ist eine gerade Funktion, |−x| = |x|, sodass das V perfekt über die y-Achse spiegelt.',
        ],
      },
      {
        heading: 'Die Ecke am Ursprung',
        body: [
          'Bei x = 0 treffen sich die beiden Arme des V in einem Winkel, und dieser Winkel ist eine echte Singularität der Glattheit: Von links kommend ist die Steigung −1, von rechts +1, sodass keine einzelne Tangente existiert. Die Funktion ist bei 0 stetig — die Arme verbinden sich ohne Lücke — aber nicht differenzierbar dort, das Standard-Gegenbeispiel, das die beiden Konzepte in jeder Analysis-Vorlesung trennt.',
          'Abseits der Ecke ist alles zahm: Die Ableitung ist −1 für x < 0 und +1 für x > 0, oft als Vorzeichenfunktion geschrieben, und die zweite Ableitung ist 0, wo immer sie existiert. Das V hat sein globales Minimum von 0 bei x = 0 und kein Maximum; beide Arme steigen mit konstanter Steigung nach +∞, ohne sich je zu biegen.',
        ],
      },
      {
        heading: 'Wo der Betrag vorkommt',
        body: [
          'Fehleranalyse läuft auf dem Betrag: „innerhalb von 0,5 des wahren Werts“ ist |Fehler| < 0,5, und numerische Verfahren stoppen, wenn aufeinanderfolgende Näherungen |xₙ₊₁ − xₙ| < Toleranz erfüllen. In der Statistik misst die mittlere absolute Abweichung Streuung ohne Quadrieren, bleibt in den ursprünglichen Einheiten und widersteht Ausreißern besser als die Varianz.',
          'In Optimierung und maschinellem Lernen ist der Betrag die L1-Strafe: Das Minimieren von Summen von |·| fördert Sparsamkeit (viele exakte Nullen), anders als die quadrierte L2-Strafe. Stückweise lineare Modelle, von Steuerklassen bis zu ReLU-neuronalen Netzen (max(0, x) = (x + |x|)/2), sind aus betragsartigen Ecken gebaut — der Knick bei null ist ein Merkmal, kein Fehler.',
        ],
      },
    ],
    keyFacts: [
      'Abschnittsweise Definition: |x| = x für x ≥ 0, |x| = −x für x < 0; äquivalent |x| = √(x²).',
      'Definitionsbereich: alle reellen Zahlen; Wertebereich: y ≥ 0.',
      'V-förmiger Graph mit Scheitel (Ecke) bei (0, 0); gerade Funktion, symmetrisch zur y-Achse.',
      'Überall stetig, aber nicht differenzierbar bei x = 0 (Steigung springt von −1 auf 1).',
      '|x − a| ist der Abstand zwischen x und a; globales Minimum 0 bei x = 0, kein Maximum.',
    ],
    faqs: [
      {
        q: 'Warum ist |x| bei 0 nicht differenzierbar?',
        a: 'Differenzierbarkeit an einem Punkt erfordert, dass die Steigungen von beiden Seiten übereinstimmen. Für |x| ist die Steigung von links −1 und von rechts +1 — sie stimmen nicht überein, sodass keine Tangente an der Ecke existiert. Die Funktion ist dort trotzdem stetig; sie hat nur einen Knick.',
      },
      {
        q: 'Was ist der Unterschied zwischen |x| und √(x²)?',
        a: 'Keiner — es ist dieselbe Funktion. Das Quadrieren entfernt das Vorzeichen von x und die Hauptquadratwurzel gibt das nicht-negative Ergebnis zurück, was genau der Betrag ist. Die Identität |x| = √(x²) wird oft genutzt, um |x| abseits von null zu differenzieren.',
      },
      {
        q: 'Wie löst man |x − 3| = 5?',
        a: 'Lesen Sie es als „der Abstand von x zu 3 ist 5“, was x = 3 + 5 = 8 oder x = 3 − 5 = −2 ergibt. Algebraisch, aufgeteilt in Fälle: x − 3 = 5 ergibt x = 8, und x − 3 = −5 ergibt x = −2. Beides geht auf: |8 − 3| = 5 und |−2 − 3| = 5.',
      },
    ],
    related: [
      '/de/math-functions/square-root/',
      '/de/learn/what-is-a-function/',
      '/de/math-functions/quadratic/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'reciprocal',
    name: 'Kehrwert',
    displayName: 'Kehrwertfunktion',
    notation: 'f(x) = 1/x',
    expression: '1/x',
    tagline:
      'Die Hyperbel 1/x — zwei gespiegelte Äste, getrennt durch Asymptoten auf beiden Achsen.',
    description:
      'Graph f(x) = 1/x: Die zwei Äste der Hyperbel, Asymptoten auf beiden Achsen, ungerade Symmetrie — Modelle umgekehrter Proportionalität.',
    intro: [
      'Die Kehrwertfunktion f(x) = 1/x ist der Graph umgekehrter Proportionalität: die Eingabe verdoppeln, die Ausgabe halbieren. Ihr Graph ist eine Hyperbel mit zwei Ästen — einer im ersten Quadranten, der von +∞ zur x-Achse hinunterfegt, einer im dritten Quadranten, der von −∞ zu ihr hinaufsteigt — getrennt durch eine unüberwindbare Lücke bei x = 0. Die Kurve berührt niemals eine Achse: Die y-Achse (x = 0) ist eine senkrechte Asymptote und die x-Achse (y = 0) eine waagrechte.',
      'Wo immer eine Größe durch eine andere geteilt wird, lauert der Kehrwert: Bei fester Spannung ist der Strom proportional zu 1/R (Ohmsches Gesetz); bei fester Gasmenge ist der Druck proportional zu 1/V (Boyle-Mariotte-Gesetz); die Zeit zur Erledigung einer Arbeit ist proportional zu 1/(Arbeiter). Die Funktion ist ihre eigene Umkehrung — zweimaliges Anwenden gibt x zurück — und ungerade, mit 180°-Drehsymmetrie um den Ursprung. Geben Sie 1/x in den Rechner ein und zoomen Sie heraus: Die Äste schmiegen sich an die Achsen, landen aber nie.',
    ],
    sections: [
      {
        heading: 'Was der Kehrwert ist',
        body: [
          'Einen Kehrwert bilden heißt 1 durch die Eingabe teilen: 1/2 = 0,5, 1/4 = 0,25, 1/0,5 = 2. Kleine Eingaben erzeugen riesige Ausgaben und riesige Eingaben winzige — die definierende Wippe umgekehrter Proportionalität. Weil 1/(1/x) = x, ist die Funktion eine Involution: Sie macht sich selbst rückgängig, sodass ihr Graph symmetrisch zur Geraden y = x ist, dem Kennzeichen von Umkehrfunktionen.',
          'Die Funktion ist ungerade, f(−x) = −f(x): Der Ast im dritten Quadranten ist der Ast im ersten Quadranten, um 180° um den Ursprung gedreht. Bemerkenswerte Punkte sind (1, 1) und (−1, −1), die einzigen Punkte, wo Eingabe gleich Ausgabe ist (das Lösen von 1/x = x ergibt x² = 1). Überall sonst unterscheiden sich Eingabe und Ausgabe — dramatisch so nahe null.',
        ],
      },
      {
        heading: 'Zwei Asymptoten, zwei Äste',
        body: [
          'x = 0 ist eine senkrechte Asymptote: Für x → 0⁺ gehen die Werte gegen +∞, für x → 0⁻ gegen −∞, und 1/0 ist undefiniert — Division durch null hat keine Bedeutung, sodass sich die Äste niemals verbinden können. y = 0 ist eine waagrechte Asymptote: Für |x| → ∞ gehen die Werte gegen 0 und nähern sich der x-Achse immer weiter an, ohne sie zu erreichen. Die Achsen sind Mauern, denen sich die Kurve nähert, aber die sie niemals berührt.',
          'Jeder Ast ist streng fallend: Auf (0, ∞) gibt größeres x kleineres 1/x, und dasselbe gilt auf (−∞, 0). Aber die Funktion als Ganzes fällt nicht — sie springt über die Lücke bei null von −∞ auf +∞. Die Ableitung f′(x) = −1/x² ist negativ, wo immer sie definiert ist, was den Abwärtsgleit auf jedem Ast bestätigt, und die Kurve ist konvex auf (0, ∞) und konkav auf (−∞, 0).',
        ],
      },
      {
        heading: 'Wo der Kehrwert vorkommt',
        body: [
          'Umgekehrte Proportionalität ist überall in der Wissenschaft: Boyle-Mariotte-Gesetz (P ∝ 1/V), Ohmsches Gesetz (I = U/R), die Linsengleichung 1/f = 1/g + 1/b und Gravitations- und elektrostatische Kräfte, die als 1/r² fallen. In jedem Fall halbiert das Verdoppeln des Nenners das Ergebnis — die Signatur des Kehrwerts. Frequenz und Periode sind Kehrwerte (f = 1/T): Eine 0,01-s-Periode ist ein 100-Hz-Ton.',
          'In der Analysis ist 1/x berühmt als die Funktion, deren Stammfunktion keine Potenz ist: ∫(1/x)dx = ln|x| + C, das Integral, das die Erfindung des Logarithmus erzwang. Ihr uneigentliches Integral von 1 bis ∞ divergiert (der stetige Cousin der harmonischen Reihe), doch dieselbe Form rotiert ergibt Gabriels Horn — endliches Volumen, unendliche Oberfläche.',
        ],
      },
    ],
    keyFacts: [
      'Definitionsbereich: alle reellen x ≠ 0; Wertebereich: alle reellen y ≠ 0. Undefiniert bei x = 0.',
      'Hyperbel mit zwei Ästen: (0, ∞) gibt positive Werte, (−∞, 0) gibt negative Werte.',
      'Senkrechte Asymptote x = 0; waagrechte Asymptote y = 0.',
      'Ungerade Funktion: f(−x) = −f(x); 180°-Drehsymmetrie um den Ursprung; ihre eigene Umkehrung.',
      'Passiert (1, 1) und (−1, −1); streng fallend auf jedem Ast.',
      'Ableitung f′(x) = −1/x²; Stammfunktion ist ln|x| + C.',
    ],
    faqs: [
      {
        q: 'Warum ist 1/0 undefiniert?',
        a: 'Division fragt „was mal dem Divisor ergibt den Dividenden?“ — keine Zahl mal 0 ergibt 1, sodass 1/0 keine Antwort hat. Auf dem Graphen zeigt sich das als senkrechte Asymptote: Werte explodieren nahe null gegen ±∞, setzen sich aber an null selbst auf keinen Wert.',
      },
      {
        q: 'Ist 1/x steigend oder fallend?',
        a: 'Fallend auf jedem seiner zwei Intervalle — nehmen Sie zwei beliebige positive Zahlen, und die größere Eingabe gibt die kleinere Ausgabe — aber nicht insgesamt fallend, weil sie über x = 0 von −∞ auf +∞ springt. Die Ableitung −1/x² ist negativ überall, wo die Funktion definiert ist, was nur über das Verhalten innerhalb jedes Asts spricht.',
      },
      {
        q: 'Was ist das Integral von 1/x?',
        a: 'ln|x| + C. Die Potenzregel ∫xⁿ dx = x^(n+1)/(n+1) versagt bei n = −1 (Division durch null), sodass 1/x seine eigene Stammfunktion braucht — historisch ist dieses Integral, wie der natürliche Logarithmus zuerst definiert wurde. Der Betrag hält die Formel auch für negative x gültig.',
      },
    ],
    related: [
      '/de/learn/asymptotes-explained/',
      '/de/math-functions/natural-logarithm/',
      '/de/learn/understanding-integrals/',
      '/de/graphing-calculator/',
    ],
  },
];
