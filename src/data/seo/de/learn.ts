/**
 * Lernartikel (Phase 8) — deutsche Übersetzung.
 *
 * Slugs, reviewedOn und tryExpressions sind DO-NOT-TRANSLATE.
 * `related`-Pfade tragen das `/de/`-Präfix.
 */
import type { LearnArticle } from '../types.js';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'what-is-a-function',
    reviewedOn: '2026-09-29',
    title: 'Was ist eine Funktion? Definitionsbereich, Wertebereich und Notation',
    description:
      'Was eine Funktion wirklich ist: Eingaben, Ausgaben, Definitionsbereich, Wertebereich und f(x)-Notation — mit konkreten Beispielen zum Selberzeichnen.',
    sections: [
      {
        heading: 'Eine Funktion ist eine Regel mit einem Versprechen',
        body: [
          'Eine Funktion ist eine Regel, die jedem Eingabewert exakt einen Ausgabewert zuordnet. Das Wort „exakt“ leistet die ganze Arbeit: Eine Funktion darf niemals derselben Eingabe zwei verschiedene Ausgaben geben. Wenn Sie x = 2 hineingeben, liefert die Funktion eine Antwort zurück, und wenn Sie morgen wieder 2 hineingeben, erhalten Sie dieselbe Antwort. Mathematiker nennen diese Anforderung „wohldefiniert“, und sie trennt Funktionen von lockereren Beziehungen zwischen Größen.',
          'Betrachten Sie f(x) = x^2. Die Eingabe 3 erzeugt die Ausgabe 9, und die Eingabe −3 erzeugt ebenfalls 9. Das ist in Ordnung — zwei verschiedene Eingaben dürfen eine Ausgabe teilen. Was nicht in Ordnung wäre: wenn die Regel der Eingabe 3 sowohl 9 als auch 10 zuordnete. Dann wäre die Regel überhaupt keine Funktion.',
        ],
      },
      {
        heading: 'Die Notation f(x) und was sie bedeutet',
        body: [
          'Der Ausdruck f(x) wird „f von x“ gelesen und benennt die Ausgabe der Funktion f bei der Eingabe x. Der Buchstabe f ist nur ein Name; genauso gut könnten Sie g, h oder kostenVon verwenden. f(x) = 2*x + 1 zu schreiben heißt: Die Funktion f berechnet ihre Ausgabe, indem sie ihre Eingabe verdoppelt und eins addiert. Dann ist f(4) = 9, f(−1) = −1 und so weiter.',
          'Diese Notation wird mächtig, wenn Sie Funktionen vergleichen. Wenn g(x) = x^2, dann ist f(g(2)) = f(4) = 9 — Sie haben die Ausgabe von g in f hineingefüttert. Funktionen so zu verketten heißt Komposition, und die Notation macht es leicht zu verfolgen, welche Regel auf welchen Wert angewendet wird. Sie lässt Sie auch über die ganze Funktion auf einmal sprechen („f ist steigend“) statt nur über einzelne Werte.',
        ],
      },
      {
        heading: 'Definitionsbereich: die Menge der erlaubten Eingaben',
        body: [
          'Jede Funktion hat einen Definitionsbereich: die Menge der Eingabewerte, die sie akzeptiert. Für f(x) = x^2 ist jede reelle Zahl erlaubt, der Definitionsbereich ist also alle reellen Zahlen. Aber g(x) = sqrt(x) verweigert negative Eingaben — es gibt keine reelle Zahl, deren Quadrat negativ ist — also ist ihr Definitionsbereich x ≥ 0.',
          'Manchmal wird der Definitionsbereich durch die Regel selbst eingeschränkt, manchmal durch die Situation, die die Funktion modelliert. Die Funktion h(x) = 1/x schließt x = 0 aus, weil Division durch null undefiniert ist. Und wenn eine Funktion den Preis von n Äpfeln modelliert, könnte ihr natürlicher Definitionsbereich die Zählzahlen 1, 2, 3, … sein, obwohl die Formel 2.5*n gerne auch Bruchteile akzeptieren würde. Wenn Sie mit einer Funktion arbeiten, wissen Sie immer, welche Eingaben sie tatsächlich nehmen kann.',
        ],
      },
      {
        heading: 'Wertebereich: die Menge der erzeugten Ausgaben',
        body: [
          'Der Wertebereich ist die Menge der Ausgabewerte, die die Funktion tatsächlich erzeugt, während die Eingabe den Definitionsbereich durchläuft. Für f(x) = x^2 gibt Quadrieren niemals eine negative Zahl, und jede nicht-negative Zahl erscheint als irgendein Quadrat (das Quadrat ihrer Quadratwurzel). Der Wertebereich ist also alle Zahlen y ≥ 0.',
          'Definitionsbereich und Wertebereich beantworten verschiedene Fragen: Der Definitionsbereich fragt „was darf ich hineingeben?“, der Wertebereich „was kann herauskommen?“ Für f(x) = 2*x + 1 sind beide alle reellen Zahlen, weil Verdoppeln und Verschieben jeden reellen Wert erreichen kann. Für f(x) = sin(x) ist der Definitionsbereich alle reellen Zahlen, aber der Wertebereich nur [−1, 1], da die Sinuswelle ewig zwischen −1 und 1 oszilliert. Den Wertebereich zu beachten hilft, einen Graphen zu lesen: Er ist exakt die vertikale Ausdehnung der Kurve.',
        ],
      },
      {
        heading: 'All das aus einem Graphen ablesen',
        body: [
          'Ein Graph zeigt eine Funktion direkt: Jeder Punkt (x, y) auf der Kurve sagt f(x) = y. Der Definitionsbereich ist der Schatten der Kurve auf der x-Achse — die horizontale Spanne der Punkte, die tatsächlich erscheinen. Der Wertebereich ist der Schatten auf der y-Achse. Wenn die Kurve bricht oder aufhört, erscheinen diese Brüche als Lücken im Definitionsbereich.',
          'Es gibt auch einen schnellen Test: den Vertikallinientest. Wenn jede senkrechte Linie, die Sie zeichnen, die Kurve höchstens einmal kreuzt, stellt die Kurve eine Funktion dar — weil jedes x höchstens ein y hat. Ein Kreis besteht diesen Test nicht (eine senkrechte Linie durch seinen Mittelpunkt trifft ihn zweimal), darum ist ein voller Kreis nicht der Graph einer einzigen Funktion. Geben Sie die Ausdrücke unten in den Grafikrechner ein, passen Sie den Ansichtsausschnitt an und lesen Sie selbst Definitionsbereich und Wertebereich ab.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sqrt(x)', '1/x', 'sin(x)'],
    keyTakeaways: [
      'Eine Funktion ordnet jeder Eingabe exakt eine Ausgabe zu — dieses Eine-Ausgabe-Versprechen ist die definierende Eigenschaft.',
      'f(x) ist „f von x“: die Ausgabe von f bei Eingabe x. Komposition f(g(x)) verkettet zwei Regeln.',
      'Der Definitionsbereich ist die Menge der erlaubten Eingaben; Division durch null und Wurzeln aus Negativen sind die klassischen Einschränkungen.',
      'Der Wertebereich ist die Menge der Ausgaben, die die Funktion tatsächlich erzeugt — die vertikale Ausdehnung ihres Graphen.',
      'Der Vertikallinientest entscheidet, ob eine Kurve eine Funktion ist: Jede senkrechte Linie darf sie höchstens einmal kreuzen.',
    ],
    faqs: [
      {
        q: 'Ist ein Kreis eine Funktion?',
        a: 'Nein — ein voller Kreis ist nicht der Graph einer Funktion, weil manche senkrechten Linien ihn zweimal kreuzen (er besteht den Vertikallinientest nicht). Die obere Kreishälfte ist es jedoch: y = sqrt(r^2 − x^2) ordnet jedem x exakt ein y zu, und die untere Hälfte y = −sqrt(r^2 − x^2) ebenso.',
      },
      {
        q: 'Was ist der Unterschied zwischen Definitionsbereich und Wertebereich?',
        a: 'Der Definitionsbereich ist die Menge der Eingaben, die eine Funktion akzeptiert; der Wertebereich ist die Menge der Ausgaben, die sie tatsächlich erzeugt. Für sin(x) ist der Definitionsbereich alle reellen Zahlen, während der Wertebereich [−1, 1] ist.',
      },
      {
        q: 'Können zwei verschiedene Eingaben dieselbe Ausgabe geben?',
        a: 'Ja. Eine Funktion muss jeder Eingabe exakt eine Ausgabe geben, aber verschiedene Eingaben dürfen eine Ausgabe teilen — zum Beispiel gibt f(x) = x^2 f(3) = f(−3) = 9.',
      },
    ],
    related: [
      '/de/learn/understanding-derivatives/',
      '/de/math-functions/sine/',
      '/de/math-functions/quadratic/',
      '/de/math-functions/square-root/',
      '/de/math-functions/reciprocal/',
      '/de/examples/logistic-growth/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-derivatives',
    reviewedOn: '2026-09-29',
    title: 'Ableitungen: Änderungsrate und Steigung verstehen',
    description:
      'Was eine Ableitung misst, wie sie die Steigung einer Kurve liefert und wie man steigende, fallende und Extremstellen aus ihr abliest.',
    sections: [
      {
        heading: 'Die Ableitung misst, wie schnell sich Dinge ändern',
        body: [
          'Die Ableitung einer Funktion ist eine neue Funktion, die an jedem Punkt berichtet, wie schnell sich die ursprüngliche Funktion ändert. Wenn f(x) eine Größe beschreibt — Position, Preis, Population — dann ist f′(x), die Ableitung bei x, die Rate, mit der sich diese Größe ändert, wenn die Eingabe x ist. Eine positive Ableitung bedeutet, dass die Größe wächst; eine negative, dass sie schrumpft; null bedeutet, dass sie momentan flach ist.',
          'Konkret ist f′(x) die Steigung der Tangente an die Kurve bei x. Zoomen Sie nah genug an fast jede glatte Kurve heran, und sie sieht wie eine Gerade aus — die Tangente — und ihre Steilheit ist die Ableitung. Darum hat die Ableitung gleichzeitig eine geometrische und eine physikalische Bedeutung: Steigung auf dem Graphen, Änderungsrate in der Welt.',
        ],
      },
      {
        heading: 'Durchschnittliche vs. momentane Änderungsrate',
        body: [
          'Über einem Intervall ist die durchschnittliche Änderungsrate von f von x = a bis x = b (f(b) − f(a)) / (b − a) — Anstieg über Lauf der Sekante zwischen den beiden Punkten. Genau so berechnen Sie Durchschnittsgeschwindigkeit: zurückgelegte Strecke geteilt durch verstrichene Zeit. Aber sie sagt nichts darüber, was zwischen a und b geschah.',
          'Die momentane Änderungsrate erhalten Sie, wenn das Intervall auf nichts schrumpft: der Grenzwert von (f(a+h) − f(a)) / h für h gegen null. Dieser Grenzwert, wenn er existiert, ist f′(a). In der Praxis berechnet der Rechner Ableitungen numerisch aus dieser Idee, und Sie können beobachten, wie sich die Sekante in die Tangente neigt, während das Intervall schrumpft. Momentane Rate zeigt der Tacho; durchschnittliche Rate der Bordcomputer.',
        ],
      },
      {
        heading: 'Steigendes und fallendes Verhalten ablesen',
        body: [
          'Das Vorzeichen der Ableitung sagt Ihnen das Verhalten der Funktion. Wo f′(x) > 0, steigt die Funktion — der Graph klettert von links nach rechts. Wo f′(x) < 0, fällt er. Wo f′(x) = 0, ist die Tangente waagrecht, und die Funktion steigt und fällt momentan weder.',
          'Nehmen Sie f(x) = x^2. Ihre Ableitung ist f′(x) = 2*x, negativ für x < 0 und positiv für x > 0. Tatsächlich steigt die Parabel von links zum Ursprung hinab und von dort rechts wieder auf. Für f(x) = sin(x) ist die Ableitung cos(x): Die Sinuswelle steigt, wo der Kosinus positiv ist, und fällt, wo er negativ ist, mit flachen Gipfeln exakt dort, wo cos(x) = 0.',
        ],
      },
      {
        heading: 'Kritische Punkte und lokale Extrema',
        body: [
          'Punkte, wo f′(x) = 0 oder wo die Ableitung nicht existiert, heißen kritische Punkte, und sie sind die Kandidaten für lokale Maxima und Minima — die Gipfel und Täler der Kurve. Bei x = 0 hat f(x) = x^2 die Ableitung 2*x = 0, und tatsächlich ist (0, 0) der Boden der Parabel: Die Funktion fällt, wird flach, steigt dann.',
          'Aber eine null Ableitung garantiert keinen Gipfel oder kein Tal. Für f(x) = x^3 ist die Ableitung 3*x^2, null bei x = 0 — doch die Funktion läuft gerade durch, wird für einen Augenblick an einem Wendepunkt flach und klettert dann weiter. Um einen kritischen Punkt zu klassifizieren, prüfen Sie, ob die Ableitung um ihn herum das Vorzeichen wechselt: negativ-zu-positiv ist ein lokales Minimum, positiv-zu-negativ ein lokales Maximum, kein Wechsel bedeutet keins von beiden.',
        ],
      },
      {
        heading: 'Die zweite Ableitung und die Krümmung',
        body: [
          'Zweimaliges Differenzieren gibt f′′(x), die zweite Ableitung — die Änderungsrate der Änderungsrate. Geometrisch beschreibt sie die Krümmung: Wo f′′(x) > 0, biegt sich die Kurve wie eine Schale nach oben (linksgekrümmt), und wo f′′(x) < 0, biegt sie sich wie ein Stirnrunzeln nach unten (rechtsgekrümmt).',
          'Für f(x) = x^3 ist die zweite Ableitung f′′(x) = 6*x: negativ links vom Ursprung, positiv rechts davon. Die Kubik biegt sich links nach unten, rechts nach oben und wechselt die Krümmung bei x = 0 — dieser Wechsel ist ein Wendepunkt. Die Krümmung vervollständigt das Bild der Kurvenform, sobald die erste Ableitung gesagt hat, wo sie steigt und fällt.',
        ],
      },
    ],
    tryExpressions: ['x^3 - 3*x', 'sin(x)', 'exp(x)', 'x^2 * sin(x)'],
    keyTakeaways: [
      'Die Ableitung f′(x) ist die momentane Änderungsrate von f bei x — die Steigung der Tangente.',
      'Positive Ableitung bedeutet steigend, negative fallend, null momentan flach.',
      'Kritische Punkte (wo f′ = 0 oder undefiniert ist) sind die Kandidaten für lokale Maxima und Minima; der Vorzeichenwechsel von f′ klassifiziert sie.',
      'Eine null Ableitung markiert nicht immer ein Extrem — x^3 hat f′(0) = 0, klettert aber durch einen Wendepunkt weiter.',
      'Die zweite Ableitung f′′ beschreibt die Krümmung: schalenförmig nach oben, wo positiv, nach unten, wo negativ.',
    ],
    faqs: [
      {
        q: 'Was ist der Unterschied zwischen durchschnittlicher und momentaner Änderungsrate?',
        a: 'Die durchschnittliche Rate über [a, b] ist (f(b) − f(a)) / (b − a), die Steigung der Sekante zwischen den Endpunkten. Die momentane Rate bei a ist der Grenzwert dieses Quotienten, wenn das Intervall auf null schrumpft — die Steigung der Tangente, also f′(a).',
      },
      {
        q: 'Wenn die Ableitung an einem Punkt null ist, ist es immer ein Maximum oder Minimum?',
        a: 'Nein. Eine null Ableitung macht den Punkt nur zu einem kritischen Punkt. Für f(x) = x^3 ist f′(0) = 0, aber die Funktion steigt durch x = 0 weiter (ein Wendepunkt). Prüfen Sie, ob f′ auf beiden Seiten das Vorzeichen wechselt, um den Punkt zu klassifizieren.',
      },
      {
        q: 'Was sagt Ihnen die zweite Ableitung?',
        a: 'Sie beschreibt die Krümmung: Wo f′′(x) > 0, biegt sich die Kurve nach oben (linksgekrümmt), und wo f′′(x) < 0, biegt sie sich nach unten (rechtsgekrümmt). Punkte, wo die Krümmung wechselt, sind Wendepunkte.',
      },
    ],
    related: [
      '/de/learn/what-is-a-function/',
      '/de/learn/understanding-integrals/',
      '/de/math-functions/quadratic/',
      '/de/math-functions/cubic/',
      '/de/math-functions/sine/',
      '/de/math-functions/exponential/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-integrals',
    reviewedOn: '2026-09-29',
    title: 'Integrale und die Fläche unter einer Kurve',
    description:
      'Was bestimmte Integrale als orientierte Fläche unter einer Kurve bedeuten, wie der Hauptsatz sie mit Ableitungen verbindet und wann man sie nutzt.',
    sections: [
      {
        heading: 'Ein Integral misst angesammelte Menge',
        body: [
          'Das bestimmte Integral ∫ₐᵇ f(x) dx misst die gesamte Ansammlung von f zwischen a und b. Wenn f(x) eine Rate ist — Geschwindigkeit, Regen pro Stunde, Euro pro Stück — dann ist das Integral dieser Rate über ein Intervall die Gesamtmenge: Gesamtstrecke, Gesamtregen, Gesamtkosten. Integration addiert unendlich viele unendlich kleine Stücke, dx, jedes gewichtet mit f(x).',
          'Das direkteste Bild ist geometrisch: Wenn f(x) auf [a, b] positiv ist, gleicht das Integral der Fläche, die von der Kurve, der x-Achse und den senkrechten Linien x = a und x = b eingeschlossen wird. Jede Anwendung von Integralen ist eine Version dieser Idee — zuerst Fläche, allgemein Ansammlung.',
        ],
      },
      {
        heading: 'Orientierte Fläche: warum Fläche negativ sein kann',
        body: [
          'Wenn die Kurve unter die x-Achse taucht, zählt das Integral diese Region als negative Fläche. Das Integral ist orientierte Fläche: Regionen über der Achse addieren, Regionen darunter subtrahieren. Also ist ∫₀^{2π} sin(x) dx = 0, weil der positive Buckel von 0 bis π und das negative Tal von π bis 2π exakt gleiche Flächen haben und sich aufheben.',
          'Diese Aufhebung ist ein Merkmal, kein Fehler: Sie spiegelt echte Physik wider. Wenn die Geschwindigkeit in der ersten Hälfte einer Fahrt positiv und in der zweiten negativ ist, gibt das Integral die Verschiebung (Nettoänderung der Position), die null sein kann, obwohl der Kilometerzähler Strecke sammelte. Wenn Sie die Gesamtfläche unabhängig vom Vorzeichen wollen, integrieren Sie |f(x)| oder integrieren Sie die positiven und negativen Teile getrennt.',
        ],
      },
      {
        heading: 'Der Hauptsatz der Differential- und Integralrechnung',
        body: [
          'Der Hauptsatz der Differential- und Integralrechnung bindet Integrale und Ableitungen als Umkehrungen aneinander. Wenn F eine Stammfunktion von f ist — das heißt F′(x) = f(x) — dann ist ∫ₐᵇ f(x) dx = F(b) − F(a). Statt eine Fläche mit Tausenden Rechtecken anzunähern, werten Sie eine einzige Funktion an zwei Punkten aus und subtrahieren.',
          'Darum werden Integrale wo möglich symbolisch berechnet: Die Stammfunktion von 2*x ist x^2, also ist ∫₀³ 2*x dx = 3² − 0² = 9, und Sie können verifizieren, dass dies der Fläche eines Dreiecks mit Basis 3 und Höhe 6 gleicht. Der Satz verwandelt das schwere Problem (unendlich viele Schnipsel addieren) in das leichte Problem (eine Funktion zweimal auswerten).',
        ],
      },
      {
        heading: 'Fläche zwischen zwei Kurven',
        body: [
          'Integrale messen auch die Fläche, die zwischen zwei Kurven gefangen ist. Wenn g(x) ≤ h(x) auf [a, b], hat die Region zwischen ihnen die Fläche ∫ₐᵇ (h(x) − g(x)) dx. Sie subtrahieren die untere Kurve von der oberen und machen aus der Lücke ein gewöhnliches Fläche-unter-einer-Kurve-Problem.',
          'Zum Beispiel liegt zwischen x = 0 und x = 1 die Gerade y = x über der Kurve y = x². Die Fläche zwischen ihnen ist ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6. Ein häufiger Fehler ist zu vergessen, dass sich die Kurven kreuzen können: Wo sie die Rollen tauschen, teilen Sie das Integral an den Kreuzungspunkten und integrieren |h(x) − g(x)|, sonst löschen Sie durch orientierte Fläche Regionen, die sich addieren sollten.',
        ],
      },
      {
        heading: 'Integrale im Rechner ausprobieren',
        body: [
          'Nehmen Sie einen beliebigen Ausdruck unten und nutzen Sie die Integralwerkzeuge des Rechners, um die Fläche unter der Kurve zwischen zwei Grenzen zu schraffieren. Beobachten Sie, wie die schraffierte Region das Vorzeichen wechselt, wenn die Kurve die Achse kreuzt — das Werkzeug meldet orientierte Fläche, sodass eine symmetrische Welle wie sin(x) über eine volle Periode netto null ergibt.',
          'Versuchen Sie dann die Stammfunktions-Beziehung: Zeichnen Sie f(x) und seine integralgebildete Ansammlung zusammen. Wo f positiv ist, steigt die angesammelte Kurve; wo f negativ ist, fällt sie; wo f null ist, ebnet sie sich. Diese Verbindung — die Ableitung der Ansammlung ist die ursprüngliche Funktion — ist der Hauptsatz in sichtbarer Form.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'abs(x - 2)', 'exp(-x^2)'],
    keyTakeaways: [
      'Das bestimmte Integral ∫ₐᵇ f(x) dx misst angesammelte Menge — geometrisch die Fläche unter der Kurve, wenn f positiv ist.',
      'Integrale berechnen orientierte Fläche: Regionen unter der x-Achse zählen als negativ und können Regionen darüber aufheben.',
      'Der Hauptsatz: ∫ₐᵇ f(x) dx = F(b) − F(a), wobei F′ = f — Differenzieren und Integrieren heben sich gegenseitig auf.',
      'Die Fläche zwischen zwei Kurven ist ∫ₐᵇ (oben − unten) dx; teilen Sie das Integral überall, wo sich die Kurven kreuzen.',
      'Verschiebung vs. Weg: Das Integral der Geschwindigkeit gibt die Nettoänderung; das Integral des Betrags gibt die insgesamt zurückgelegte Strecke.',
    ],
    faqs: [
      {
        q: 'Kann ein bestimmtes Integral negativ sein?',
        a: 'Ja. Das Integral misst orientierte Fläche, sodass Kurvenanteile unter der x-Achse negative Fläche beitragen. Zum Beispiel ist ∫₀^{2π} sin(x) dx = 0, weil sich der positive und der negative Buckel exakt aufheben.',
      },
      {
        q: 'Was ist der Hauptsatz der Differential- und Integralrechnung?',
        a: 'Er besagt, dass wenn F′(x) = f(x), dann ∫ₐᵇ f(x) dx = F(b) − F(a). In Worten: Um f zu integrieren, finden Sie eine Funktion, deren Ableitung f ist, werten Sie sie an den Endpunkten aus und subtrahieren.',
      },
      {
        q: 'Wie finde ich die Fläche zwischen zwei Kurven?',
        a: 'Integrieren Sie die Differenz oben − unten über das Intervall: ∫ₐᵇ (h(x) − g(x)) dx, wobei h die obere Kurve ist. Wenn sich die Kurven innerhalb von [a, b] kreuzen, teilen Sie das Integral an jeder Kreuzung, damit sich nichts falsch aufhebt.',
      },
    ],
    related: [
      '/de/learn/understanding-derivatives/',
      '/de/learn/what-is-a-function/',
      '/de/math-functions/sine/',
      '/de/math-functions/quadratic/',
      '/de/math-functions/absolute-value/',
      '/de/examples/damped-oscillation/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'asymptotes-explained',
    reviewedOn: '2026-09-29',
    title: 'Asymptoten: Senkrecht, waagrecht und schräg',
    description:
      'Asymptoten verstehen — Geraden, denen sich ein Graph nähert, ohne sie je zu berühren. Senkrechte, waagrechte und schräge Asymptoten mit klaren Beispielen.',
    sections: [
      {
        heading: 'Was eine Asymptote wirklich ist',
        body: [
          'Eine Asymptote ist eine Gerade, der sich eine Kurve beliebig nahe annähert, während die Eingabe irgendwohin Extremes geht — hinaus ins Unendliche oder hinein in einen Punkt, wo die Funktion explodiert — ohne die Gerade je zu berühren (im Grenzwertsinn). Die Kernidee ist Annäherung, nicht Kontakt: Die Kurve kann der Geraden so nahe kommen, wie Sie wollen, vorausgesetzt, Sie gehen weit genug.',
          'Asymptoten gibt es in drei Geschmacksrichtungen. Senkrechte Asymptoten sind senkrechte Geraden x = a, wo die Funktion nahe a unbeschränkt wächst. Waagrechte Asymptoten sind waagrechte Geraden y = L, auf die sich die Funktion für x → ±∞ einpendelt. Schräge Asymptoten sind diagonale Geraden, denen die Funktion folgt, wenn sie im Unendlichen ungefähr linear wächst. Jeder Typ wird anders diagnostiziert, und jeder sagt Ihnen etwas über das Langzeit- oder Nah-an-der-Singularität-Verhalten der Funktion.',
        ],
      },
      {
        heading: 'Senkrechte Asymptoten: wo die Funktion explodiert',
        body: [
          'Eine senkrechte Asymptote x = a tritt auf, wo die Funktionswerte gegen +∞ oder −∞ schießen, während x sich a nähert. Das klassische Beispiel ist f(x) = 1/x bei x = 0: Setzen Sie 0,1 ein und erhalten 10, setzen Sie 0,001 ein und erhalten 1000, und es gibt keinen endlichen Wert bei exakt 0, weil Division durch null undefiniert ist.',
          'Um sie in einer rationalen Funktion zu finden, faktorisieren Sie den Nenner: Jeder Faktor (x − a), der sich nicht mit dem Zähler kürzt, gibt typischerweise eine senkrechte Asymptote bei x = a. Aber Kürzung zählt — in g(x) = (x^2 − 1)/(x − 1) kürzt sich der Faktor (x − 1), sodass x = 1 ein Loch (eine hebbare Unstetigkeit) ist, keine Asymptote. Wenn Sie f(x) = 1/x zeichnen und auf x = 0 zoomen, fliegen die zwei Äste vertikal auseinander, und das adaptive Sampling des Rechners muss vermeiden, einen irreführenden Strich über die Lücke zu zeichnen.',
        ],
      },
      {
        heading: 'Waagrechte Asymptoten: das Verhalten im Unendlichen',
        body: [
          'Eine waagrechte Asymptote beschreibt, wohin die Funktion tendiert, wenn x in einer Richtung groß wird. Wenn sich f(x) einem endlichen Wert L nähert für x → ∞ (oder x → −∞), dann ist y = L eine waagrechte Asymptote. Für f(x) = 1/x schrumpfen die Werte gegen 0, wenn x wächst — also ist y = 0 die waagrechte Asymptote.',
          'Für eine rationale Funktion p(x)/q(x) vergleichen Sie die Grade: Wenn der Grad des Nenners höher ist, ist die waagrechte Asymptote y = 0; wenn die Grade gleich sind, ist sie y = (Leitkoeffizient von p) / (Leitkoeffizient von q); wenn der Grad des Zählers höher ist, gibt es keine waagrechte Asymptote — die Funktion wächst unbeschränkt und folgt möglicherweise stattdessen einer schrägen. Beachten Sie, dass eine Kurve ihre waagrechte Asymptote für moderate x kreuzen darf; die Asymptote beschränkt nur die fernen Enden.',
        ],
      },
      {
        heading: 'Schräge Asymptoten: einer diagonalen Geraden folgen',
        body: [
          'Wenn der Zähler einer rationalen Funktion exakt einen Grad höher ist als der Nenner, wächst die Funktion im Unendlichen ungefähr wie eine Gerade, und diese Gerade ist die schräge Asymptote. Nehmen Sie f(x) = (x^2 + 1)/x: Polynomdivision gibt x + 1/x, und für x → ±∞ verschwindet der 1/x-Term und lässt y = x als die Asymptote zurück, an die sich die Kurve schmiegt.',
          'Sie können das visuell verifizieren, indem Sie die Funktion und die Gerade y = x zusammen zeichnen und weit herauszoomen: Die Lücke zwischen ihnen schrumpft auf nichts. Schräge Asymptoten sind in der Praxis seltener als die anderen beiden Typen, aber sie erscheinen, wann immer ein Quotient linear wächst — zum Beispiel in manchen Wirtschaftsmodellen mit Stückkosten plus fixen Gemeinkosten geteilt durch die Menge.',
        ],
      },
      {
        heading: 'Warum Asymptoten beim Zeichnen wichtig sind',
        body: [
          'Asymptoten sind das Skelett eines Graphen: Sie sagen Ihnen, wohin die Kurve nahe ihrer Problemstellen und an den Extremen muss, bevor Sie einen einzigen Zwischenpunkt berechnen. Zuerst die Asymptoten skizzieren — senkrechte Linien an den Explosionspunkten, die waagrechte oder schräge Leitlinie im Unendlichen — lässt Sie brave Segmente dazwischen ausfüllen.',
          'Sie warnen auch vor Definitionsbereichs-Einschränkungen (senkrechte Asymptoten markieren ausgeschlossene Eingaben) und vor irreführenden Darstellungen. Ein naiver Plotter kann eine fast senkrechte Linie über eine senkrechte Asymptote zeichnen und die zwei Äste verbinden, als ginge die Funktion durch die Lücke. Geben Sie 1/x in den Rechner ein, zoomen Sie auf x = 0 und bestätigen Sie, dass Sie zwei getrennte Äste mit einer echten Lücke sehen — diese Lücke ist die sichtbar gemachte Asymptote.',
        ],
      },
    ],
    tryExpressions: ['1/x', '(x^2 + 1)/x', '(2*x^2 + 3)/(x^2 - 1)', 'tan(x)'],
    keyTakeaways: [
      'Eine Asymptote ist eine Gerade, der sich eine Kurve beliebig nahe annähert — senkrecht (x = a), waagrecht (y = L) oder schräg (diagonal).',
      'Senkrechte Asymptoten treten auf, wo die Funktion gegen ±∞ explodiert; bei rationalen Funktionen suchen Sie nach ungekürzten Nennernullstellen.',
      'Waagrechte Asymptoten beschreiben das Verhalten im Unendlichen: Vergleichen Sie Zähler- und Nennergrad bei rationalen Funktionen.',
      'Wenn der Zähler einen Grad höher ist als der Nenner, folgt der Graph einer schrägen Asymptote wie y = x.',
      'Eine Kurve kann eine waagrechte Asymptote bei moderaten x-Werten kreuzen — die Asymptote regiert nur die fernen Enden.',
    ],
    faqs: [
      {
        q: 'Was ist der Unterschied zwischen einer senkrechten Asymptote und einem Loch?',
        a: 'Eine senkrechte Asymptote x = a ist, wo die Funktion nahe a unbeschränkt wächst (z. B. 1/x bei x = 0). Ein Loch (hebbare Unstetigkeit) ist, wo ein gekürzter Faktor die Funktion an einem einzelnen Punkt undefiniert machte, die nahen Werte aber endlich bleiben — z. B. vereinfacht sich (x^2 − 1)/(x − 1) zu x + 1 mit einem Loch bei x = 1.',
      },
      {
        q: 'Kann ein Graph seine Asymptote kreuzen?',
        a: 'Er kann eine waagrechte Asymptote für endliche x kreuzen — zum Beispiel kreuzt f(x) = sin(x)/x y = 0 wiederholt, doch y = 0 ist trotzdem ihre waagrechte Asymptote, da f(x) → 0 für x → ±∞. Senkrechte Asymptoten werden im Sinne des Kreuzens am Explosionspunkt selbst nicht gekreuzt, da die Funktion dort undefiniert ist.',
      },
      {
        q: 'Wie finde ich die waagrechte Asymptote einer rationalen Funktion?',
        a: 'Grade vergleichen: Wenn der Grad des Nenners größer ist, ist die Asymptote y = 0; wenn die Grade gleich sind, ist sie y = (Leitkoeffizient des Zählers)/(Leitkoeffizient des Nenners); wenn der Grad des Zählers exakt um eins größer ist, gibt es stattdessen eine schräge Asymptote (gefunden durch Polynomdivision).',
      },
    ],
    related: [
      '/de/learn/what-is-a-function/',
      '/de/math-functions/reciprocal/',
      '/de/math-functions/tangent/',
      '/de/math-functions/natural-logarithm/',
      '/de/examples/logistic-growth/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'graphing-inequalities',
    reviewedOn: '2026-09-29',
    title: 'Ungleichungen in zwei Variablen zeichnen',
    description:
      'Ungleichungen wie y > x^2 zeichnen: Randkurven, gestrichelte vs. durchgezogene Linien, Schraffur und Testpunkte — Schritt für Schritt erklärt.',
    sections: [
      {
        heading: 'Von Gleichungen zu Ungleichungen',
        body: [
          'Die Gleichung y = x^2 zeichnet eine einzige Kurve: die Parabel. Die Ungleichung y > x^2 verlangt etwas Größeres — jeden Punkt (x, y), dessen y-Koordinate über der Parabel liegt. Statt einer Kurve ist die Lösung eine ganze Region: die unendliche Fläche, die über der Kurve aufgespannt wird. Eine Ungleichung zu zeichnen heißt, die Grenze zu zeichnen und die Seite zu schraffieren, die sie erfüllt.',
          'Dieser Wechsel von Kurve zu Region ist der ganze konzeptionelle Schritt. Eine Gleichung in zwei Variablen beschreibt typischerweise eine eindimensionale Kurve; eine Ungleichung beschreibt eine zweidimensionale Region, deren Rand diese Kurve ist. Jeder Punkt, den Sie testen, gehört entweder zur Region oder nicht, und die Randkurve ist, wo Gleichheit gilt.',
        ],
      },
      {
        heading: 'Randkurven: gestrichelt vs. durchgezogen',
        body: [
          'Der erste Schritt ist, die Grenze zu zeichnen — die Gleichung, die Sie erhalten, wenn Sie das Ungleichheitszeichen durch = ersetzen. Für y ≥ x^2 ist die Grenze die Parabel y = x^2, und sie wird durchgezogen gezeichnet, weil ihre Punkte die Ungleichung erfüllen: Die Grenze ist in der Lösung enthalten.',
          'Für strikte Ungleichungen (< oder >) wird die Grenze gestrichelt gezeichnet, weil Punkte auf der Kurve selbst die Ungleichung nicht erfüllen. y > x^2 und y ≥ x^2 unterscheiden sich nur an der Parabel selbst, doch dieser eine-Punkt-dicke Unterschied zählt in Optimierungsproblemen, wo ein Optimum exakt auf einer strikten Grenze unerreichbar ist. Der Rechner folgt dieser Konvention: gestrichelt für strikt, durchgezogen für nicht-strikt.',
        ],
      },
      {
        heading: 'Schraffur und die Testpunkt-Methode',
        body: [
          'Sobald die Grenze gezeichnet ist, teilt sie die Ebene in Regionen (meist zwei). Wählen Sie einen beliebigen Punkt nicht auf der Grenze — einen Testpunkt — setzen Sie ihn in die Ungleichung ein und sehen Sie, ob die Aussage wahr ist. Wenn ja, schraffieren Sie die gesamte Region dieses Punkts; wenn nicht, schraffieren Sie die andere Seite.',
          'Für y > x^2 ist der Ursprung (0, 0) ein bequemer Testpunkt — Moment, er liegt auf der Grenze. Wählen Sie stattdessen (0, 1): 1 > 0 ist wahr, also schraffieren Sie die Region über der Parabel, die (0, 1) enthält. Eine sichere Gewohnheit: Verifizieren Sie immer, dass Ihr Testpunkt nicht auf der Grenze liegt, bevor Sie dem Ergebnis vertrauen, und prüfen Sie bei komplizierten Ungleichungen mit einem zweiten Punkt in der schraffierten Region nach.',
        ],
      },
      {
        heading: 'Systeme von Ungleichungen und zulässige Bereiche',
        body: [
          'Reale Probleme involvieren meist mehrere Ungleichungen auf einmal — ein System. Die Lösung ist die Menge der Punkte, die alle gleichzeitig erfüllen: der Schnitt der einzelnen schraffierten Regionen. Jede neue Ungleichung kann die Lösung nur schrumpfen, niemals wachsen lassen, weil Punkte nun einen weiteren Test bestehen müssen.',
          'Das ist das geometrische Herz der linearen Programmierung: Nebenbedingungen wie x ≥ 0, y ≥ 0 und 2*x + 3*y ≤ 12 schnitzen einen polygonalen zulässigen Bereich heraus, und das Optimum einer linearen Zielfunktion sitzt immer an einer seiner Ecken. Schraffieren Sie jede Ungleichung der Reihe nach, behalten Sie nur die Überlappung, und der zulässige Bereich, der übrig bleibt, ist, wo alle Nebenbedingungen auf einmal gelten. Versuchen Sie y ≤ x^2 und y ≥ −x zusammen, um einen linsenförmigen Schnitt zu sehen, der von zwei Kurven begrenzt wird.',
        ],
      },
      {
        heading: 'Einen schraffierten Graphen lesen',
        body: [
          'Ein fertiger Ungleichungsgraph kommuniziert drei Dinge: die Grenze (mit ihrer gestrichelt/durchgezogen-Bedeutung), die schraffierte Lösungsregion und implizit alles außerhalb der Schraffur, das scheitert. Wenn Sie einen solchen Graphen lesen, identifizieren Sie zuerst die Randkurve und ihre Striktheit und bestätigen dann die Schraffur mit einem schnellen mentalen Testpunkt.',
          'Häufige Fehlablesungen: vergessen, dass die unschraffierte Seite ausgeschlossen ist (nicht „unbekannt“), eine gestrichelte Grenze für eine enthaltene halten und bei Systemen jede Ungleichung schraffieren, aber niemals den Schnitt bilden. Geben Sie die Ausdrücke unten ein, schalten Sie zwischen strikten und nicht-strikten Formen um und beobachten Sie, wie sich Schraffur und Grenzstil ändern, während sich die Bedeutung der Region um exakt die Randkurve verschiebt.',
        ],
      },
    ],
    tryExpressions: ['x^2', '2 - x', 'abs(x)', 'sin(x)'],
    keyTakeaways: [
      'Eine Ungleichung in zwei Variablen beschreibt eine Region der Ebene; ihr Rand ist die Randkurve, wo Gleichheit gilt.',
      'Zeichnen Sie die Grenze gestrichelt für strikte Ungleichungen (<, >) und durchgezogen, wenn die Grenze enthalten ist (≤, ≥).',
      'Nutzen Sie einen Testpunkt abseits der Grenze, um zu entscheiden, welche Seite zu schraffieren ist; prüfen Sie bei komplexen Fällen mit einem zweiten Punkt nach.',
      'Die Lösung eines Ungleichungssystems ist der Schnitt der einzelnen Regionen — jede Nebenbedingung kann ihn nur schrumpfen.',
      'In der linearen Programmierung sind die Eckpunkte des zulässigen Bereichs, wo das Optimum einer linearen Zielfunktion auftreten muss.',
    ],
    faqs: [
      {
        q: 'Wann nutze ich eine gestrichelte statt einer durchgezogenen Linie?',
        a: 'Nutzen Sie eine gestrichelte Grenze für strikte Ungleichungen (< oder >), weil Punkte auf der Grenze die Ungleichung nicht erfüllen. Nutzen Sie eine durchgezogene Grenze für ≤ oder ≥, wo die Grenzpunkte in der Lösung enthalten sind.',
      },
      {
        q: 'Woher weiß ich, welche Seite der Grenze zu schraffieren ist?',
        a: 'Wählen Sie einen Testpunkt, der nicht auf der Grenze liegt, setzen Sie ihn in die Ungleichung ein und schraffieren Sie die Region, die den Punkt enthält, wenn die Aussage wahr ist — sonst schraffieren Sie die andere Region.',
      },
      {
        q: 'Was ist der zulässige Bereich in einem Ungleichungssystem?',
        a: 'Es ist der Schnitt aller einzelnen Lösungsregionen: die Menge der Punkte, die jede Ungleichung auf einmal erfüllen. In der linearen Programmierung tritt das Optimum einer linearen Zielfunktion über einem polygonalen zulässigen Bereich immer an einer Ecke (einem Scheitel) dieses Bereichs auf.',
      },
    ],
    related: [
      '/de/learn/what-is-a-function/',
      '/de/math-functions/quadratic/',
      '/de/math-functions/absolute-value/',
      '/de/math-functions/square-root/',
      '/de/examples/projectile-motion/',
      '/de/graphing-calculator/',
    ],
  },
  {
    slug: 'parametric-vs-cartesian',
    reviewedOn: '2026-09-29',
    title: 'Parametrische vs. kartesische Gleichungen',
    description:
      'Kartesische Gleichungen y = f(x) vs. parametrische x(t), y(t): was jede ausdrücken kann, wann welche passt und wie man zwischen ihnen umrechnet.',
    sections: [
      {
        heading: 'Kartesische Form: y als Funktion von x',
        body: [
          'Die kartesische Form y = f(x) ist die vertraute: Für jedes x liefert die Gleichung das y. Sie ist die natürliche Sprache der Funktionen — jede senkrechte Linie trifft den Graphen höchstens einmal, sodass die Kurve sich vertikal niemals auf sich selbst zurückbiegt. Eingabe-Ausgabe-Denken, Definitionsbereich und Wertebereich sowie der Vertikallinientest gehören alle zu dieser Form.',
          'Aber die Form hat eine harte Grenze: Sie kann keine Kurven beschreiben, die Schleifen bilden, sich selbst schneiden oder vertikal verlaufen. Ein Kreis braucht zwei kartesische Gleichungen (obere und untere Hälfte); eine zweimal gezeichnete oder rückwärts durchlaufene Kurve ist unausdrückbar. Wann immer Position, Form oder Bewegung reicher ist als „ein y pro x“, geht der kartesischen Form der Platz aus.',
        ],
      },
      {
        heading: 'Parametrische Form: beide Koordinaten folgen einem Parameter',
        body: [
          'Parametrische Gleichungen führen eine dritte Variable ein, den Parameter t, und definieren x und y getrennt: x = x(t), y = y(t). Während t seinen Bereich durchläuft, zeichnet der Punkt (x(t), y(t)) die Kurve. Der Einheitskreis wird zu x = cos(t), y = sin(t) für t in [0, 2π) — ein sauberes Gleichungspaar, kein Aufteilen in Hälften, keine ±-Mehrdeutigkeit.',
          'Der Parameter trägt oft Bedeutung: Er kann Zeit sein. Dann zeichnet x = t, y = t^2 die Parabel y = x^2 von links nach rechts, während t wächst, während x = −t, y = t^2 dieselbe Parabel von rechts nach links zeichnet. Gleiche Form, entgegengesetzte Reisen — eine Unterscheidung, die die kartesische Form nicht einmal aussprechen kann. Die parametrische Form trennt, wie die Kurve aussieht, davon, wie sie durchlaufen wird.',
        ],
      },
      {
        heading: 'Zwischen den beiden Formen umrechnen',
        body: [
          'Von parametrisch zu kartesisch zu gehen heißt, den Parameter zu eliminieren. Wenn x = t und y = t^2, gibt Einsetzen direkt y = x^2. Für x = cos(t), y = sin(t) nutzt Quadrieren und Addieren cos²t + sin²t = 1, um x² + y² = 1 zurückzugewinnen. Elimination ist meist Algebra plus eine gut gewählte Identität.',
          'Die umgekehrte Richtung — eine kartesische Kurve parametrisieren — hat immer mindestens eine triviale Antwort: Setzen Sie x = t, y = f(t). Die interessanten Parametrisierungen sind die nicht-trivialen, wie der Kreis oben oder x = t^2, y = t^4 − 3*t^2 für eine Kurve, die Punkte erneut besucht. Beachten Sie, dass Umrechnung Information verlieren kann: t aus x = t, y = t^2 zu eliminieren verwirft die Durchlaufrichtung, die nur die parametrische Form festhielt.',
        ],
      },
      {
        heading: 'Wann jede Form das richtige Werkzeug ist',
        body: [
          'Nutzen Sie die kartesische Form, wenn die Beziehung echt funktional ist — eine Ausgabe pro Eingabe — und wenn Sie Analysis-Werkzeuge (Ableitungen, Integrale, Nullstellensuche) in ihrer einfachsten Gestalt wollen. Die meisten Formeln in Wissenschaft und Wirtschaft kommen so daher.',
          'Nutzen Sie die parametrische Form für geschlossene Kurven, sich selbst schneidende Kurven und alles mit Bewegung oder Durchlauf — Wurfbahnen mit Zeit als Parameter, Lissajous-Figuren, zahnradartige Epizykel. Greifen Sie auch zu ihr, wenn eine kartesische Gleichung sperrig ist: Die Kurve x = y^2 ist eine vollkommen gute seitliche Parabel, aber sie ist keine Funktion von x, während x = t^2, y = t sie mühelos parametrisiert. Wenn die Kurve Schleifen bildet oder die Reise zählt, gehen Sie parametrisch.',
        ],
      },
      {
        heading: 'Den Unterschied im Rechner sehen',
        body: [
          'Zeichnen Sie y = sin(x) in kartesischer Form, dann zeichnen Sie x = t, y = sin(t) parametrisch über demselben Fenster: identische Kurven, weil das zweite nur eine Umparametrisierung des ersten ist. Versuchen Sie nun x = sin(t), y = sin(2*t) — eine Lissajous-Figur — und fragen Sie, welche einzige kartesische Gleichung y = f(x) sie erzeugen könnte. Keine kann: Die Kurve kreuzt sich selbst und ordnet einem x mehrere y-Werte zu.',
          'Passen Sie den t-Bereich an und beobachten Sie den Durchlauf: Mit t von 0 bis π erhalten Sie die halbe Figur, mit 0 bis 2π das Ganze. Diese Kontrolle darüber, wie viel der Kurve gezeichnet wird und in welcher Reihenfolge, ist der Signaturvorteil der parametrischen Form — und der Grund, warum Bewegung, von Wurfgeschossen bis zu Planetenbahnen, parametrisch modelliert wird.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'cos(x)', 'sqrt(4 - x^2)'],
    keyTakeaways: [
      'Die kartesische Form y = f(x) gibt ein y pro x — sie kann keine Schleifen, senkrechten Segmente oder Selbstschnitte beschreiben.',
      'Die parametrische Form x = x(t), y = y(t) zeichnet eine Kurve, während t variiert; t repräsentiert oft Zeit und kodiert die Durchlaufrichtung.',
      'Der Einheitskreis braucht zwei kartesische Gleichungen, aber ein parametrisches Paar: x = cos(t), y = sin(t).',
      'Den Parameter zu eliminieren rechnet parametrisch in kartesisch um, aber die Durchlaufrichtungs-Information geht verloren.',
      'Nutzen Sie die parametrische Form, wenn die Kurve Schleifen bildet, sich selbst schneidet oder wenn die Reise darauf zählt; nutzen Sie kartesisch für funktionale Beziehungen.',
    ],
    faqs: [
      {
        q: 'Kann jede parametrische Kurve als y = f(x) geschrieben werden?',
        a: 'Nein. Nur Kurven, die den Vertikallinientest bestehen, können das. Ein Kreis, eine Lissajous-Figur oder jede Kurve, die einem x zwei y-Werte zuordnet, hat keine einzige kartesische Gleichung y = f(x) — obwohl Teile davon separat so geschrieben werden können.',
      },
      {
        q: 'Was repräsentiert der Parameter t normalerweise?',
        a: 'Oft Zeit: x = x(t), y = y(t) beschreibt dann eine Position, die sich über die Zeit entwickelt. Aber t ist nur eine Durchlaufvariable — jedes Intervall funktioniert, und dieselbe geometrische Kurve kann von vielen verschiedenen Parametrisierungen durchlaufen werden, vorwärts oder rückwärts, schnell oder langsam.',
      },
      {
        q: 'Wie rechne ich parametrische Gleichungen in kartesische Form um?',
        a: 'Eliminieren Sie den Parameter: Lösen Sie eine Gleichung nach t auf (oder nutzen Sie eine Identität) und setzen Sie in die andere ein. Für x = cos(t), y = sin(t) gibt Quadrieren und Addieren x² + y² = 1 via cos²t + sin²t = 1.',
      },
    ],
    related: [
      '/de/learn/what-is-a-function/',
      '/de/learn/graphing-inequalities/',
      '/de/math-functions/sine/',
      '/de/math-functions/cosine/',
      '/de/math-functions/quadratic/',
      '/de/math-functions/square-root/',
      '/de/examples/lissajous-curve/',
      '/de/examples/projectile-motion/',
      '/de/graphing-calculator/',
    ],
  },
];
