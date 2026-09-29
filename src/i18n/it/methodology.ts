/**
 * Dizionario italiano methodology — la pagina `/methodology/`.
 *
 * Le ancore inline sono elencate per sezione in `links`; il testo dell'etichetta
 * appare nel corpo nella stessa posizione. Gli href restano costanti (vengono
 * ri-localizzati al render dai page builder).
 */

import type { MethodologyStrings } from '../types.js';

export const methodology: MethodologyStrings = {
  seo: {
    title: 'Metodologia — Come verifichiamo matematica e contenuti | Graphing Calculator',
    description:
      'Come Graphing Calculator verifica matematica e contenuti: un motore deterministico, ' +
      'centinaia di test automatici, esempi verificati dal motore e revisioni datate.',
  },
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Metodologia', href: '/methodology/' },
  ],
  heading: 'La nostra metodologia',
  sections: [
    {
      heading: '1. Come i calcoli vengono eseguiti e verificati',
      body: [
        'Una calcolatrice è utile solo se puoi fidarti di ciò che ti dice. Questa pagina documenta ' +
          'esattamente come Graphing Calculator calcola i risultati, come i suoi contenuti educativi sono ' +
          'scritti e controllati, e cosa deliberatamente non facciamo.',
        'Ogni numero su questo sito proviene da un motore matematico deterministico scritto apposta ' +
          'per esso. Un’espressione che digiti viene tokenizzata, parsata in un albero di sintassi astratta e ' +
          'compilata in closure eseguibili — non passa mai attraverso eval o codice generato. ' +
          'Le radici si trovano con il metodo di Brent, le derivate con le differenze centrali, ' +
          'gli integrali con la regola di Simpson adattiva e i limiti con stima numerica bilaterale.',
        'Oltre 550 test automatici coprono il motore di espressioni, i metodi numerici, lo ' +
          'stato dei grafici, il tracciatore 3D e la calcolatrice scientifica. Girano prima di ogni release, e ' +
          'una release non esce a meno che non passino tutti. Quando un calcolo non può essere eseguito ' +
          'in modo affidabile — una discontinuità, un integrale non convergente, una valutazione fuori dominio — ' +
          'lo strumento segnala onestamente il fallimento invece di inventare un numero.',
      ],
      links: [{ label: 'Calcolatrice grafica', href: '/graphing-calculator/' }],
    },
    {
      heading: '2. Come i contenuti educativi sono scritti e revisionati',
      body: [
        'Le guide impara insegnano a tracciare grafici dalle basi: cosa sono le funzioni, come funzionano domini ' +
          'e codomini, come leggere intercette e asintoti e come usare ciascuno strumento di ' +
          'questo sito. Ogni guida è scritta da materiale curricolare matematico standard, non ' +
          'raschiata o rielaborata da altri siti.',
        'Prima che una guida sia pubblicata, le sue affermazioni matematiche sono verificate con il ' +
          'motore di espressioni del sito — le radici, i valori di esempio e i domini dichiarati nel ' +
          'testo devono corrispondere a ciò che la calcolatrice stessa calcola. Un revisore umano del ' +
          'team di Graphing Calculator legge poi la guida per chiarezza e correttezza. Ogni guida ' +
          'riporta una data di “Ultima revisione” e una firma che nomina il revisore, così puoi ' +
          'vedere esattamente quando è avvenuto il controllo.',
      ],
      links: [{ label: 'guide impara', href: '/learn/' }],
    },
    {
      heading: '3. Come l’assistente AI è vincolato',
      body: [
        'L’assistente AI integrato può spiegare concetti, suggerire espressioni da tracciare e aiutarti ' +
          'a impostare i grafici. Opera attraverso uno schema di comandi rigoroso: può solo emettere ' +
          'comandi della calcolatrice, e il motore della calcolatrice — non l’AI — esegue ogni ' +
          'calcolo. L’assistente non può cambiare ciò che il motore calcola e non può ' +
          'accedere ai tuoi grafici salvati.',
        'Finché il proprietario del sito non configura una chiave di un provider AI, l’assistente gira in una ' +
          'modalità simulata chiaramente etichettata che lo dice sullo schermo. Non finge mai di essere connesso a un ' +
          'modello live quando non lo è.',
      ],
    },
    {
      heading: '4. Cosa non facciamo',
      body: [
        'Nessun revisore inventato. Non pubblichiamo nomi, foto o credenziali falsi. Le firme ' +
          'di revisione dicono esattamente chi ha revisionato il contenuto — il team di Graphing Calculator — e quando.',
        'Nessuna statistica fabbricata. Non dichiariamo conteggi di utenti, valutazioni o ' +
          'classifiche “migliori” che non possiamo verificare. I confronti con altri prodotti riportano solo fatti ' +
          'pubblicamente noti.',
        'Nessuna interfaccia copiata. La calcolatrice è un’implementazione indipendente. Non ' +
          'riproduce branding, interfaccia o materiale protetto da copyright di altri prodotti.',
        'Nessuna raccolta dati nascosta. I grafici sono conservati nel tuo browser; i link di condivisione codificano ' +
          'lo stato nell’URL. Non ci sono account e nessuna analisi di tracciamento attiva di default. ' +
          'Vedi l’informativa sulla privacy per i dettagli.',
      ],
      links: [{ label: 'informativa sulla privacy', href: '/privacy-policy/' }],
    },
    {
      heading: '5. Correzioni',
      body: [
        'Se trovi un errore in un calcolo o in una guida, contattaci con i dettagli. ' +
          'Gli errori segnalati sono investigati con il motore matematico, corretti quando confermati, ' +
          'e la data di “Ultima revisione” della guida viene aggiornata per riflettere la correzione.',
      ],
      links: [{ label: 'contattaci', href: '/contact/' }],
    },
  ],
  faqs: [
    {
      question: 'Come vengono verificati i calcoli?',
      answer:
        'Ogni risultato proviene da un motore matematico deterministico integrato nel sito — ' +
        'le espressioni sono tokenizzate, parsate in un albero di sintassi astratta e compilate in ' +
        'closure, mai passate a eval. Oltre 550 test automatici coprono il motore, i metodi di ' +
        'analisi e la UI, e girano prima di ogni release.',
    },
    {
      question: 'L’assistente AI fa i calcoli?',
      answer:
        'No. L’assistente AI spiega concetti ed emette comandi della calcolatrice, ma il ' +
        'motore della calcolatrice è sempre la fonte di verità per i risultati. Finché il ' +
        'proprietario del sito non configura una chiave API, l’assistente gira in una modalità simulata chiaramente etichettata.',
    },
    {
      question: 'Come vengono revisionate le guide impara?',
      answer:
        'Ogni guida è controllata per accuratezza matematica prima della pubblicazione: le radici, ' +
        'i domini e i valori di esempio che dichiara sono verificati con il ' +
        'motore di espressioni del sito. Un revisore umano del team di Graphing Calculator legge poi ogni ' +
        'guida per chiarezza e correttezza, e la guida riporta una data di “Ultima revisione” ' +
        'che mostra quando è avvenuto quel controllo.',
    },
    {
      question: 'Chi revisiona i contenuti?',
      answer:
        'I contenuti sono revisionati dal team di Graphing Calculator — le persone che costruiscono e ' +
        'mantengono questo sito. Non inventiamo nomi, foto o credenziali di revisori; la ' +
        'firma su ogni guida dice esattamente chi l’ha revisionata e quando.',
    },
    {
      question: 'Cosa succede quando viene trovato un errore?',
      answer:
        'Viene corretto, e la data di “Ultima revisione” della guida viene aggiornata. Se ' +
        'individui un errore, puoi segnalarlo tramite la pagina contatti e sarà ' +
        'investigato con il motore matematico.',
    },
    {
      question: 'L’output numerico è esatto?',
      answer:
        'I metodi numerici sono approssimazioni, e la calcolatrice lo dice dove conta. ' +
        'Quando una radice, una derivata o un integrale non possono essere calcolati — un punto angoloso, un salto, una ' +
        'singolarità — lo strumento lo segnala onestamente invece di restituire un numero fuorviante.',
    },
  ],
  related: ['/about/', '/learn/', '/graphing-calculator/', '/desmos-alternative/'],
};
