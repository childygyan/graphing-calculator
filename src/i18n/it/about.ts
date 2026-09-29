/**
 * Dizionario italiano about — la pagina `/about/`.
 *
 * I link del creatore sono identificatori nominativi (URL esatti dalla pagina);
 * NON si traducono — solo le etichette dei link e la copy circostante sono
 * stringhe del dizionario.
 */

import type { AboutStrings } from '../types.js';

export const about: AboutStrings = {
  seo: {
    title: 'Chi siamo',
    description:
      'Cos\u2019\u00e8 Graphing Calculator: funzionalit\u00e0, come funziona il motore matematico e come ' +
      'vengono gestiti i tuoi dati.',
  },
  crumbs: [{ label: 'Home', href: '/' }],
  heading: 'Chi siamo',
  intro: [
    'Graphing Calculator \u00e8 uno strumento matematico originale, basato su browser, per tracciare grafici di ' +
      'funzioni ed esplorare la matematica. \u00c8 un\u2019implementazione indipendente — costruita da zero, ' +
      'non derivata da nessun altro prodotto grafico.',
    'Cosa fa oggi: traccia funzioni cartesiane, curve parametriche, equazioni polari e ' +
      'disequazioni su un grafico canvas interattivo con zoom, panoramica e supporto touch; analizza ' +
      'espressioni con veri metodi numerici (radici con il metodo di Brent, derivate con le ' +
      'differenze centrali, integrali con la regola di Simpson adattiva, tabelle, rette tangenti); ' +
      'anima i parametri con variabili e cursori; offre aiuto in linguaggio naturale da un assistente ' +
      'AI che emette comandi della calcolatrice mentre il motore matematico esegue i calcoli ' +
      'reali; e salva, condivide, importa ed esporta stati dei grafici.',
  ],
  creator: {
    heading: 'Il creatore',
    imageAlt: 'Firoz Khan, creatore di Graphing Calculator',
    name: 'Firoz Khan',
    body: 'Graphing Calculator \u00e8 costruito e mantenuto da Firoz Khan. Contattalo qui:',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/firoz-khan-1153358a/' },
      { label: 'GitHub', href: 'https://github.com/fkdigitalmedia' },
      { label: 'Instagram', href: 'https://www.instagram.com/rtibyfiroz/' },
    ],
  },
  sections: [
    {
      heading: 'Come vengono gestiti i tuoi dati',
      body: [
        'Tutto viene eseguito sul tuo dispositivo. I grafici salvati sono archiviati nella memoria ' +
          'locale del tuo browser; i link di condivisione codificano lo stato del grafico direttamente ' +
          'nell\u2019URL. Non ci sono account e la calcolatrice non invia dati personali ad alcun ' +
          'server. Il sito utilizza Google Analytics per misurare l\u2019utilizzo complessivo (vedi ' +
          'l\u2019informativa sulla privacy). Le richieste all\u2019assistente IA raggiungono il ' +
          'provider IA configurato solo quando utilizzi l\u2019assistente.',
      ],
    },
    {
      heading: 'Onest\u00e0 sui risultati',
      body: [
        'I metodi numerici sono approssimazioni, e la calcolatrice lo dice dove conta: ' +
          'quando una radice, una derivata o un integrale non possono essere calcolati — un punto angoloso, un salto, una ' +
          'singolarit\u00e0 — lo strumento lo segnala onestamente invece di restituire un numero fuorviante.',
      ],
    },
    {
      heading: 'Come revisioniamo i contenuti',
      body: [
        'Ogni guida di questo sito \u00e8 controllata per accuratezza matematica prima della ' +
          'pubblicazione. I fatti matematici di ciascuna guida — radici, domini, valori di esempio — ' +
          'sono verificati con il motore di espressioni del sito, lo stesso codice che alimenta ' +
          'la calcolatrice, cos\u00ec ci\u00f2 che leggi corrisponde a ci\u00f2 che lo strumento calcola.',
        'Un revisore umano del team di Graphing Calculator legge poi ogni guida per chiarezza ' +
          'e correttezza. Quando viene trovato un errore — un segno sbagliato, un esempio fuorviante, un passaggio ' +
          'che salta troppo — viene corretto prima che la guida vada online, e la guida ' +
          'riporta una data di “Ultima revisione” cos\u00ec puoi vedere quando \u00e8 avvenuto quel controllo.',
      ],
    },
  ],
  related: ['/graphing-calculator/', '/math-functions/', '/learn/', '/examples/'],
};
