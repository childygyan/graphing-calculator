/**
 * Kuratierte Beispielgraphen (Phase 8) — deutsche Übersetzung.
 *
 * Jedes Beispiel lädt reale Ausdrücke über einen Share-ähnlichen `#s=…`-Link,
 * der zur Build-Zeit von der Content-Engine gebaut wird, in den Rechner, sodass
 * der Button „Im Rechner öffnen“ exakt den Graphen öffnet, den die Seite
 * beschreibt. Prosa ist handgeschrieben; berechnete Werte kommen aus
 * `content-engine.ts`.
 *
 * Slugs, Ausdrücke und Viewports sind DO-NOT-TRANSLATE.
 * `related`-Pfade tragen das `/de/`-Präfix.
 */
import type { ExampleGraphData } from '../types.js';

export const EXAMPLE_GRAPHS: ExampleGraphData[] = [
  {
    slug: 'trigonometric-interference',
    title: 'Trigonometrische Interferenz: sin(x) + cos(2x)',
    description:
      'Was passiert, wenn sich zwei trigonometrische Wellen überlagern? Dieses interaktive Beispiel von sin(x) + cos(2x) im Grafikrechner öffnen.',
    expressions: [
      { kind: 'cartesian', rhs: 'sin(x)', label: 'sin(x)' },
      { kind: 'cartesian', rhs: 'cos(2*x)', label: 'cos(2x)' },
      { kind: 'cartesian', rhs: 'sin(x) + cos(2*x)', label: 'sin(x) + cos(2x)' },
    ],
    story: [
      'Wenn zwei Wellen durch dasselbe Medium laufen, addieren sich ihre Auslenkungen Punkt für Punkt — ein Phänomen namens Superposition. Das Zeichnen von sin(x), cos(2x) und ihrer Summe auf denselben Achsen macht diese Addition sichtbar: An jedem x ist die Höhe der kombinierten Kurve exakt die Summe der Höhen der beiden Komponenten.',
      'Beachten Sie, wie die Summe nicht einfach eine größere Sinuswelle ist. Der cos(2x)-Term oszilliert doppelt so schnell, verstärkt und löscht die sin(x)-Welle also abwechselnd. Wo beide Wellen gemeinsam gipfeln, erreicht die Summe ihre höchsten Punkte; wo eine auf einem Wellenberg und die andere in einem Wellental ist, löschen sie sich teilweise aus. Das ist dieselbe Mathematik hinter Schwebungen im Schall und Interferenzmustern im Licht.',
    ],
    insights: [
      'Die kombinierte Welle sin(x) + cos(2x) ist periodisch, aber ihre Form ist komplexer als jede Komponente allein.',
      'Schalten Sie jeden Ausdruck im Rechner ein und aus, um den Beitrag jeder Welle zu isolieren.',
      'Versuchen Sie, cos(2*x) in cos(3*x) zu ändern, und beobachten Sie, wie eine schnellere zweite Welle das Interferenzmuster verändert.',
    ],
    related: [
      '/de/math-functions/sine/',
      '/de/math-functions/cosine/',
      '/de/examples/damped-oscillation/',
      '/de/learn/what-is-a-function/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'projectile-motion',
    title: 'Wurfbewegung: Einen geworfenen Ball zeichnen',
    description:
      'Die Höhe eines geworfenen Balls mit einer Parabel modellieren. Dieses Wurf-Beispiel öffnen und die maximale Höhe im Rechner finden.',
    expressions: [{ kind: 'cartesian', rhs: '-4.9*x^2 + 20*x + 1.5', label: 'height(x)' }],
    viewport: { xMin: -1, xMax: 5, yMin: -5, yMax: 25 },
    story: [
      'Die Höhe eines gerade nach oben geworfenen Balls folgt einer quadratischen Funktion der Zeit: Die Schwerkraft zieht mit konstanter Beschleunigung, sodass die Höhe eine nach unten geöffnete Parabel ist. Hier modelliert -4.9x² + 20x + 1.5 einen Ball, der mit 20 Metern pro Sekunde aus 1,5 Metern Höhe gestartet wird (die 4,9 stammen aus der Hälfte der Erdbeschleunigung, 9,8 m/s²).',
      'Der Scheitel der Parabel ist der Moment, in dem der Ball seinen höchsten Punkt erreicht — der Augenblick, in dem seine Geschwindigkeit null ist, bevor er zu fallen beginnt. Weil die Parabel symmetrisch ist, landet der Ball so lange nach dem Gipfel, wie er zum Aufstieg brauchte. Die zwei x-Achsenabschnitte markieren Start (nahe x = 0) und Landung; nur die positive Nullstelle ist physikalisch sinnvoll.',
    ],
    insights: [
      'Der Scheitel der Parabel gibt die maximale Höhe und den Zeitpunkt, zu dem sie erreicht wird.',
      'Der positive x-Achsenabschnitt ist, wenn der Ball den Boden trifft — finden Sie ihn mit dem Nullstellenfinder.',
      'Der Koeffizient -4.9 steuert, wie „breit“ der Flug ist; eine größere Startgeschwindigkeit (der 20x-Term) streckt den Flug länger.',
    ],
    related: [
      '/de/math-functions/quadratic/',
      '/de/calculators/root-finder/',
      '/de/learn/what-is-a-function/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'damped-oscillation',
    title: 'Gedämpfte Schwingung: e^(-x/2) · cos(3x)',
    description:
      'Eine abklingende Welle erkunden, die echte Federn und Schaltungen modelliert. Dieses Beispiel gedämpfter Schwingung im interaktiven Grafikrechner öffnen.',
    expressions: [
      { kind: 'cartesian', rhs: 'exp(-x/2) * cos(3*x)', label: 'e^(-x/2)·cos(3x)' },
      { kind: 'cartesian', rhs: 'exp(-x/2)', label: 'envelope e^(-x/2)' },
      { kind: 'cartesian', rhs: '-exp(-x/2)', label: 'envelope -e^(-x/2)' },
    ],
    viewport: { xMin: -1, xMax: 15, yMin: -2, yMax: 2 },
    story: [
      'Eine gezupfte Gitarrensaite, eine federnde Autofederung und ein RLC-Schwingkreis teilen alle dieselbe mathematische Form: eine Schwingung, deren Amplitude mit der Zeit abklingt. Das Multiplizieren von cos(3x) mit der abklingenden Exponentialfunktion exp(-x/2) erzeugt genau das — jede Schwingung ist ein fester Bruchteil der vorherigen.',
      'Die zwei Hüllkurven, ±exp(-x/2), sind die „Schienen“, zwischen denen die Schwingung fährt. Die Welle berührt die obere Hüllkurve exakt an den Wellenbergen des Kosinus und die untere an seinen Wellentälern, und die Hüllkurven selbst oszillieren niemals. Diese Trennung von „wie schnell sie wackelt“ (der Kosinus) und „wie schnell sie ausstirbt“ (die Exponentialfunktion) ist, warum Ingenieure die beiden Faktoren getrennt analysieren.',
    ],
    insights: [
      'Die Schwingung kreuzt niemals außerhalb ihrer exponentiellen Hüllkurven.',
      'Das Erhöhen der 3 in cos(3x) packt mehr Schwingungen in dasselbe Abklingen; das Erhöhen der 1/2 im Exponenten tötet die Bewegung schneller.',
      'Zoomen Sie entlang der x-Achse heraus, um zu beobachten, wie sich die Welle gegen null beruhigt — die mathematische Signatur der Dämpfung.',
    ],
    related: [
      '/de/math-functions/cosine/',
      '/de/math-functions/exponential/',
      '/de/examples/trigonometric-interference/',
      '/de/learn/understanding-derivatives/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'logistic-growth',
    title: 'Logistisches Wachstum: Die S-Kurve begrenzter Ressourcen',
    description:
      'Die S-Kurve zeichnen, die Populationen mit begrenzten Ressourcen modelliert. Dieses Beispiel logistischen Wachstums im Grafikrechner öffnen.',
    expressions: [{ kind: 'cartesian', rhs: '10 / (1 + 9*exp(-x))', label: 'logistic' }],
    viewport: { xMin: -5, xMax: 10, yMin: -2, yMax: 12 },
    story: [
      'Unbegrenztes Wachstum ist exponentiell, aber reale Populationen stoßen an Grenzen: Nahrung, Raum oder Marktgröße. Die logistische Funktion 10 / (1 + 9·exp(-x)) beginnt exponentiell auszusehen, biegt dann um und ebnet sich bei einer Tragfähigkeit ab — hier 10. Das Ergebnis ist die berühmte S-Kurve, zu sehen in Bakterienkolonien, Produktadoption und der Verbreitung von Ideen.',
      'Die Kurve hat einen Wendepunkt, wo sie von beschleunigend zu abbremsend wechselt — der Moment schnellsten Wachstums, exakt auf halbem Weg zur Tragfähigkeit. Vor diesem Punkt biegt sich die Kurve nach oben (Wachstum, das sich selbst nährt); danach biegt sie sich nach unten, wenn die Grenze greift. Diesen Wendepunkt zu finden, ist eines der nützlichsten Dinge, die Analysis für ein Modell tun kann.',
    ],
    insights: [
      'Die waagrechte Asymptote y = 10 ist die Tragfähigkeit, der sich die Kurve nähert, aber die sie niemals überschreitet.',
      'Der steilste Teil des S ist der Wendepunkt — wo das Wachstum am schnellsten ist.',
      'Versuchen Sie 10 / (1 + 9*exp(-2*x)), um zu sehen, wie eine schnellere Wachstumsrate die Mitte des S versteilert, ohne seine Decke zu ändern.',
    ],
    related: [
      '/de/math-functions/exponential/',
      '/de/learn/asymptotes-explained/',
      '/de/learn/understanding-derivatives/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'lissajous-curve',
    title: 'Lissajous-Kurve: Parametrische Kunst aus Sinuswellen',
    description:
      'Eine Lissajous-Figur mit den parametrischen Gleichungen x = sin(3t), y = cos(2t) zeichnen. Dieses parametrische Beispiel im Grafikrechner öffnen.',
    expressions: [
      {
        kind: 'parametric',
        xOfT: 'sin(3*t)',
        yOfT: 'cos(2*t)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'Lissajous 3:2',
      },
    ],
    viewport: { xMin: -1.5, xMax: 1.5, yMin: -1.5, yMax: 1.5 },
    story: [
      'Bevor Oszilloskope digitale Anzeigen hatten, studierten Physiker Frequenzverhältnisse, indem sie zwei Sinuswellen in die Horizontal- und Vertikalplatten einer Kathodenstrahlröhre einspeisten. Die leuchtenden Muster, die sie zeichneten — Lissajous-Figuren — enthüllen das Verhältnis der beiden Frequenzen auf einen Blick. Hier oszilliert x = sin(3t) dreimal für je zwei Schwingungen von y = cos(2t) und webt einen geschlossenen, symmetrischen Knoten.',
      'Was diese Kurve als regulären y = f(x)-Graphen unmöglich macht, ist, dass sie den Vertikallinientest dramatisch nicht besteht: Ein einzelnes x kann vielen y-Werten entsprechen, wenn sich die Kurve auf sich selbst zurückschlingt. Parametrische Gleichungen umgehen diese Einschränkung, indem sie x und y eigene Formeln in einem gemeinsamen Parameter t geben — dieselbe Idee animiert alles von Uhrzeigern bis zu Planetenbahnen.',
    ],
    insights: [
      'Das 3:2-Frequenzverhältnis bestimmt das Muster: Zählen Sie die Keulen, die jede Seite des Begrenzungsquadrats berühren.',
      'Ändern Sie sin(3*t) zu sin(4*t) für eine 4:2-Figur und vergleichen Sie die Symmetrie.',
      'Weil t volle 2π läuft, schließt sich die Kurve perfekt — verkürzen Sie den t-Bereich und beobachten Sie, wie sie ein offener Bogen wird.',
    ],
    related: [
      '/de/math-functions/sine/',
      '/de/math-functions/cosine/',
      '/de/learn/parametric-vs-cartesian/',
      '/de/examples/polar-rose/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'polar-rose',
    title: 'Polare Rose: r = 2·cos(3θ)',
    description:
      'Eine dreiblättrige Rose mit der Polargleichung r = 2cos(3θ) zeichnen. Dieses polare Graphenbeispiel im interaktiven Rechner öffnen.',
    expressions: [
      {
        kind: 'polar',
        rOfTheta: '2*cos(3*theta)',
        tMin: '0',
        tMax: String(2 * Math.PI),
        label: 'r = 2cos(3θ)',
      },
    ],
    viewport: { xMin: -2.5, xMax: 2.5, yMin: -2.5, yMax: 2.5 },
    story: [
      'In Polarkoordinaten wird jeder Punkt durch einen Abstand r vom Ursprung und einen Winkel θ beschrieben, und die Gleichung r = 2·cos(3θ) zeichnet eine Blume mit exakt drei Blütenblättern. Während θ herumfegt, oszilliert r dreimal zwischen -2 und 2; negative r-Werte zeichnen in die entgegengesetzte Richtung, was die Blütenblätter in ihre symmetrische Anordnung faltet.',
      'Die Anzahl der Blütenblätter folgt einer einfachen Regel: Für r = a·cos(nθ) mit ungeradem n hat die Rose exakt n Blütenblätter. Versuchen Sie gerade Werte von n im Rechner, und Sie erhalten doppelt so viele — das Muster verdoppelt sich, weil die Kurve eine volle Extrarunde braucht, um sich zu schließen. Wenige Gleichungen zeigen die Kraft der Polarkoordinaten so elegant wie die Rose.',
    ],
    insights: [
      'Ein ungerader Koeffizient (3) gibt 3 Blütenblätter; versuchen Sie 2*cos(4*theta), um zu sehen, wie der gerade Fall 8 erzeugt.',
      'Die Amplitude 2 setzt die Blütenblattlänge — den fernsten Punkt vom Ursprung.',
      'Jedes Blütenblatt wird exakt einmal gezeichnet, während θ von 0 bis π läuft; die zweite Hälfte zeichnet sie erneut.',
    ],
    related: [
      '/de/math-functions/cosine/',
      '/de/learn/parametric-vs-cartesian/',
      '/de/examples/lissajous-curve/',
      '/de/graphing-calculator/',
    ],
  },
];

export function getExampleBySlug(slug: string): ExampleGraphData | undefined {
  return EXAMPLE_GRAPHS.find((example) => example.slug === slug);
}
