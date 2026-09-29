/**
 * Deutsche Methodik-Wörterliste — die Seite `/methodology/`.
 *
 * Inline-Anker sind pro Abschnitt in `links` aufgeführt; der Labeltext
 * erscheint im Body an derselben Position. Hrefs bleiben konstant (sie werden
 * beim Rendern von den Seitenbauern neu lokalisiert).
 */

import type { MethodologyStrings } from '../types.js';

export const methodology: MethodologyStrings = {
  seo: {
    title: 'Methodik — Wie unsere Mathematik und Inhalte verifiziert werden | Graphing Calculator',
    description:
      'Wie der Graphing Calculator seine Mathematik und Inhalte verifiziert: eine deterministische ' +
      'Engine, Hunderte automatisierte Tests, engine-geprüfte Beispiele und datierte Prüfungen.',
  },
  crumbs: [
    { label: 'Startseite', href: '/' },
    { label: 'Methodik', href: '/methodology/' },
  ],
  heading: 'Unsere Methodik',
  sections: [
    {
      heading: '1. Wie Berechnungen durchgeführt und verifiziert werden',
      body: [
        'Ein Rechner ist nur nützlich, wenn man dem vertrauen kann, was er sagt. Diese Seite ' +
          'dokumentiert genau, wie der Graphing Calculator Ergebnisse berechnet, wie seine ' +
          'Lerninhalte geschrieben und geprüft werden — und was wir bewusst nicht tun.',
        'Jede Zahl auf dieser Seite stammt aus einer deterministischen Rechen-Engine, die eigens ' +
          'dafür geschrieben wurde. Ein Ausdruck, den Sie eintippen, wird tokenisiert, in einen ' +
          'abstrakten Syntaxbaum geparst und in ausführbare Closures kompiliert — er läuft niemals ' +
          'durch eval oder generierten Code. Nullstellen werden mit dem Brent-Verfahren gefunden, ' +
          'Ableitungen mit zentralen Differenzen, Integrale mit der adaptiven Simpson-Regel und ' +
          'Grenzwerte mit zweiseitiger numerischer Schätzung.',
        'Über 550 automatisierte Tests decken die Ausdrucks-Engine, die numerischen Verfahren, den ' +
          'Graphenzustand, den 3D-Plotter und den wissenschaftlichen Rechner ab. Sie laufen vor jedem ' +
          'Release, und ein Release erscheint nicht, solange nicht alle bestehen. Wenn eine ' +
          'Berechnung nicht verlässlich durchgeführt werden kann — eine Unstetigkeit, ein nicht ' +
          'konvergierendes Integral, eine Auswertung außerhalb des Definitionsbereichs — meldet das ' +
          'Tool den Fehler ehrlich, statt eine Zahl zu erfinden.',
      ],
      links: [{ label: 'Grafikrechner', href: '/graphing-calculator/' }],
    },
    {
      heading: '2. Wie Lerninhalte geschrieben und geprüft werden',
      body: [
        'Die Lernanleitungen lehren Graphen von Grund auf: was Funktionen sind, wie ' +
          'Definitions- und Wertebereiche funktionieren, wie man Achsenabschnitte und Asymptoten ' +
          'liest und wie man jedes Tool auf dieser Seite nutzt. Jede Anleitung ist aus ' +
          'Standard-Lehrplanmaterial der Mathematik geschrieben, nicht von anderen Websites ' +
          'kopiert oder zusammengesponnen.',
        'Bevor eine Anleitung veröffentlicht wird, werden ihre mathematischen Aussagen gegen die ' +
          'eigene Ausdrucks-Engine der Seite verifiziert — die Nullstellen, Beispielwerte und ' +
          'Definitionsbereiche im Text müssen mit dem übereinstimmen, was der Rechner selbst ' +
          'berechnet. Ein menschlicher Prüfer aus dem Team des Graphing Calculator liest die ' +
          'Anleitung dann auf Klarheit und Richtigkeit. Jede Anleitung trägt ein Datum „Zuletzt ' +
          'überprüft“ und eine Zeile, die den Prüfer nennt, damit Sie genau sehen können, wann die ' +
          'Prüfung stattfand.',
      ],
      links: [{ label: 'Lernanleitungen', href: '/learn/' }],
    },
    {
      heading: '3. Wie der KI-Assistent eingeschränkt ist',
      body: [
        'Der eingebaute KI-Assistent kann Konzepte erklären, Ausdrücke zum Zeichnen vorschlagen ' +
          'und Ihnen beim Einrichten von Graphen helfen. Er arbeitet über ein striktes ' +
          'Befehlsschema: Er darf nur Rechnerbefehle erteilen, und die Engine des Rechners — nicht ' +
          'die KI — führt jede Berechnung aus. Der Assistent kann nicht verändern, was die Engine ' +
          'berechnet, und er kann nicht auf Ihre gespeicherten Graphen zugreifen.',
        'Bis der Seitenbetreiber einen KI-Anbieter-Schlüssel konfiguriert, läuft der Assistent in ' +
          'einem klar gekennzeichneten Demo-Modus, der das auf dem Bildschirm sagt. Er gibt niemals ' +
          'vor, mit einem Live-Modell verbunden zu sein, wenn das nicht stimmt.',
      ],
    },
    {
      heading: '4. Was wir nicht tun',
      body: [
        'Keine erfundenen Prüfer. Wir veröffentlichen keine falschen Namen, Fotos oder ' +
          'Qualifikationen. Prüfzeilen nennen genau, wer den Inhalt geprüft hat — das Team des ' +
          'Graphing Calculator — und wann.',
        'Keine fabrizierten Statistiken. Wir behaupten keine Nutzerzahlen, Bewertungen oder ' +
          '„Beste“-Ranglisten, die wir nicht verifizieren können. Vergleiche mit anderen Produkten ' +
          'nennen nur öffentlich bekannte Fakten.',
        'Keine kopierten Oberflächen. Der Rechner ist eine unabhängige Implementierung. Er ' +
          'reproduziert weder Branding, Oberfläche noch urheberrechtlich geschütztes Material ' +
          'eines anderen Produkts.',
        'Keine versteckte Datenerfassung. Graphen werden in Ihrem Browser gespeichert; ' +
          'Freigabelinks kodieren den Zustand in der URL. Es gibt keine Konten und keine ' +
          'standardmäßig aktivierten Tracking-Analysen. Details finden Sie in der Datenschutzerklärung.',
      ],
      links: [{ label: 'Datenschutzerklärung', href: '/privacy-policy/' }],
    },
    {
      heading: '5. Korrekturen',
      body: [
        'Wenn Sie einen Fehler in einer Berechnung oder einer Anleitung finden, kontaktieren Sie ' +
          'uns mit den Details. Gemeldete Fehler werden gegen die Rechen-Engine untersucht, bei ' +
          'Bestätigung korrigiert, und das Datum „Zuletzt überprüft“ der Anleitung wird aktualisiert, ' +
          'um die Korrektur widerzuspiegeln.',
      ],
      links: [{ label: 'kontaktieren Sie uns', href: '/contact/' }],
    },
  ],
  faqs: [
    {
      question: 'Wie werden Berechnungen verifiziert?',
      answer:
        'Jedes Ergebnis stammt aus einer deterministischen Rechen-Engine, die in die Seite ' +
        'eingebaut ist — Ausdrücke werden tokenisiert, in einen abstrakten Syntaxbaum geparst und ' +
        'in Closures kompiliert, niemals per eval ausgewertet. Über 550 automatisierte Tests decken ' +
        'die Engine, Analysemethoden und Oberfläche ab und laufen vor jedem Release.',
    },
    {
      question: 'Rechnet der KI-Assistent selbst?',
      answer:
        'Nein. Der KI-Assistent erklärt Konzepte und erteilt Rechnerbefehle, aber die eigene ' +
        'Engine des Rechners ist immer die Quelle der Wahrheit für Ergebnisse. Bis der ' +
        'Seitenbetreiber einen API-Schlüssel konfiguriert, läuft der Assistent in einem klar ' +
        'gekennzeichneten Demo-Modus.',
    },
    {
      question: 'Wie werden die Lernanleitungen geprüft?',
      answer:
        'Jede Anleitung wird vor der Veröffentlichung auf mathematische Richtigkeit geprüft: Die ' +
        'Nullstellen, Definitionsbereiche und Beispielwerte, die sie nennt, werden gegen die eigene ' +
        'Ausdrucks-Engine der Seite verifiziert. Ein menschlicher Prüfer aus dem Team des Graphing ' +
        'Calculator liest dann jede Anleitung auf Klarheit und Richtigkeit, und die Anleitung trägt ' +
        'ein Datum „Zuletzt überprüft“, das zeigt, wann diese Prüfung stattfand.',
    },
    {
      question: 'Wer prüft die Inhalte?',
      answer:
        'Inhalte werden vom Team des Graphing Calculator geprüft — den Menschen, die diese Seite ' +
        'bauen und pflegen. Wir erfinden keine Prüfernamen, Fotos oder Qualifikationen; die ' +
        'Prüfzeile jeder Anleitung sagt genau, wer sie geprüft hat und wann.',
    },
    {
      question: 'Was passiert, wenn ein Fehler gefunden wird?',
      answer:
        'Er wird korrigiert, und das Datum „Zuletzt überprüft“ der Anleitung wird aktualisiert. ' +
        'Wenn Sie einen Fehler entdecken, können Sie ihn über die Kontaktseite melden, und er wird ' +
        'gegen die Rechen-Engine untersucht.',
    },
    {
      question: 'Sind numerische Ausgaben exakt?',
      answer:
        'Numerische Verfahren sind Näherungen, und der Rechner sagt das, wo es darauf ankommt. ' +
        'Wenn eine Nullstelle, Ableitung oder ein Integral nicht berechnet werden kann — eine Ecke, ' +
        'ein Sprung, eine Singularität — meldet das Tool das ehrlich, statt eine irreführende Zahl zurückzugeben.',
    },
  ],
  related: ['/about/', '/learn/', '/graphing-calculator/', '/desmos-alternative/'],
};
