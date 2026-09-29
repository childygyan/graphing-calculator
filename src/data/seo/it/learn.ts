/**
 * Articoli didattici per l\u2019hub /it/learn/ (italiano).
 *
 * Traduzione di `src/data/seo/learn.ts`: stessa struttura, stessi slug,
 * stessi `tryExpressions` (sintassi inglese della calcolatrice — NON
 * tradotta), stessi link `related` con prefisso `/it/`. Tutta la prosa
 * afferma solo fatti matematicamente certi. `reviewedOn` \u00e8 preservato.
 */
import type { LearnArticle } from '../types.js';

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: 'what-is-a-function',
    title: 'Che cos\u2019\u00e8 una funzione? Una guida semplice',
    description:
      'Impara cos\u2019\u00e8 davvero una funzione: input, output, dominio, codominio e notazione f(x) — con esempi concreti da tracciare tu stesso.',
    reviewedOn: '2026-09-29',
    sections: [
      {
        heading: 'La definizione di funzione',
        body: [
          'Formalmente, una funzione f da un insieme A a un insieme B assegna a ogni elemento x di A esattamente un elemento y di B, scritto y = f(x). La parola chiave \u00e8 esattamente uno: un input non pu\u00f2 mai produrre due output diversi. Un distributore automatico \u00e8 un\u2019utile analogia — premi B4 e ottieni sempre lo stesso articolo, mai a caso uno o l\u2019altro.',
          'Ci\u00f2 che una funzione NON pu\u00f2 fare \u00e8 importante quanto ci\u00f2 che pu\u00f2 fare. Il cerchio x² + y² = 1 non \u00e8 una funzione di x, perch\u00e9 l\u2019input x = 0 d\u00e0 due output, y = 1 e y = −1. Il test della retta verticale lo rileva istantaneamente: se una retta verticale tocca un grafico in pi\u00f9 di un punto, quel grafico non \u00e8 una funzione. Il cerchio fallisce il test; la parabola y = x² lo supera.',
        ],
      },
      {
        heading: 'Notazione: leggere f(x)',
        body: [
          'La notazione f(x) si legge “f di x” — NON “f per x”. La f nomina la regola, la x \u00e8 l\u2019input che stai inserendo. Quindi se f(x) = x² + 1, allora f(3) significa “applica la regola a 3”, dando 3² + 1 = 10. Le lettere sono arbitrarie: g(t) = 2t \u00e8 la stessa idea con una regola diversa chiamata g e una variabile diversa chiamata t.',
          'Pensa a f come a una macchina: la materia prima x entra, gli ingranaggi della formula girano, e il prodotto y esce. Comporre macchine d\u00e0 la composizione di funzioni — g(f(x)) significa far passare x prima attraverso f e poi attraverso g — che \u00e8 come le formule complesse sono costruite da quelle semplici. Nella calcolatrice puoi tracciare f(x) = x^2 + 1 e g(x) = 2*x separatamente, poi tracciare g(x^2+1) per vedere la composizione.',
        ],
      },
      {
        heading: 'Dominio e codominio',
        body: [
          'Il dominio \u00e8 l\u2019insieme di tutti gli input che una funzione accetta — gli ingredienti che la macchina pu\u00f2 gestire. Per f(x) = √x il dominio \u00e8 x ≥ 0, perch\u00e9 nessun numero reale al quadrato d\u00e0 un negativo; chiedere √(−4) sui reali \u00e8 come chiedere a un distributore un articolo che non ha. Per f(x) = 1/x il dominio esclude lo 0, perch\u00e9 la divisione per zero \u00e8 indefinita.',
          'Il codominio \u00e8 l\u2019insieme di tutti gli output possibili. Per f(x) = x² il codominio \u00e8 y ≥ 0 — gli output non sono mai negativi, per quanto l\u2019input sia grande o piccolo. Tracciare il grafico rende entrambi visibili: il dominio \u00e8 quanta parte dell\u2019asse x \u00e8 coperta dalla curva, il codominio \u00e8 quanta parte dell\u2019asse y. La V di |x| copre tutta la x ma solo la met\u00e0 superiore della y.',
        ],
      },
      {
        heading: 'Funzioni ovunque intorno a te',
        body: [
          'Le funzioni modellano il mondo perch\u00e9 il mondo \u00e8 pieno di relazioni input-output. L\u2019altezza di una palla lanciata \u00e8 una funzione del tempo trascorso dal lancio; la bolletta elettrica \u00e8 una funzione dei kilowattora consumati; la posizione di un\u2019ombra \u00e8 una funzione dell\u2019ora del giorno. Ciascuna prende un input e restituisce esattamente un output — la firma di una funzione.',
          'In informatica ogni subroutine \u00e8 una funzione in questo senso: stessi argomenti, stesso valore restituito (quando \u00e8 pura). Le reti neurali sono gigantesche funzioni composte — milioni di semplici regole incatenate — che mappano pixel in etichette o parole in risposte. Riconoscere lo schema input-output \u00e8 il primo passo per leggere la matematica dietro la tecnologia.',
        ],
      },
    ],
    tryExpressions: ['x^2', 'sqrt(x)', '1/x', 'sin(x)'],
    keyTakeaways: [
      'Una funzione assegna a ogni input esattamente un output — un input, un output, sempre.',
      'f(x) si legge “f di x”: f nomina la regola, x \u00e8 l\u2019input inserito.',
      'Il test della retta verticale: un grafico \u00e8 una funzione se ogni retta verticale lo tocca al massimo una volta.',
      'Il dominio \u00e8 l\u2019insieme degli input consentiti; il codominio \u00e8 l\u2019insieme degli output possibili.',
      'La composizione incatena le funzioni: g(f(x)) fa passare x prima attraverso f e poi attraverso g.',
    ],
    faqs: [
      {
        q: 'Una funzione pu\u00f2 avere due output per lo stesso input?',
        a: 'No — \u00e8 proprio ci\u00f2 che la definizione vieta. Se un input produce due output, la relazione non \u00e8 una funzione. Il cerchio x² + y² = 1 fallisce perch\u00e9 x = 0 d\u00e0 y = 1 e y = −1. Per\u00f2 l\u2019inverso va bene: input diversi possono condividere un output, come f(2) = f(−2) = 4 per f(x) = x².',
      },
      {
        q: 'Cosa significa f(x)?',
        a: 'Si legge “f di x” e significa il valore output della funzione f all\u2019input x. Se f(x) = 3x − 2, allora f(4) = 3·4 − 2 = 10. La lettera f \u00e8 solo un nome per la regola; g, h o qualsiasi lettera funzionano allo stesso modo.',
      },
      {
        q: 'Qual \u00e8 la differenza tra dominio e codominio?',
        a: 'Il dominio \u00e8 ci\u00f2 che puoi inserire (input consentiti); il codominio \u00e8 ci\u00f2 che pu\u00f2 uscire (output possibili). Per f(x) = 1/x, il dominio \u00e8 tutti i reali tranne 0 e il codominio \u00e8 tutti i reali tranne 0 — la funzione non tocca mai nessuno dei due assi.',
      },
    ],
    related: [
      '/it/learn/understanding-derivatives/',
      '/it/math-functions/sine/',
      '/it/math-functions/quadratic/',
      '/it/math-functions/square-root/',
      '/it/math-functions/reciprocal/',
      '/it/examples/logistic-growth/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-derivatives',
    title: 'Capire le derivate: pendenze e tassi di variazione',
    description:
      'Cosa misura una derivata, come d\u00e0 la pendenza di una curva e come leggervi crescenza, decrescenza, massimi e punti di minimo.',
    reviewedOn: '2026-09-29',
    sections: [
      {
        heading: 'Dalla pendenza media alla pendenza istantanea',
        body: [
          'La pendenza media tra due punti \u00e8 facile: (variazione di y)/(variazione di x), la salita sulla corsa della retta secante che li unisce. Ma “quanto in fretta sta cambiando proprio ORA?” richiede di restringere l\u2019intervallo a zero. Mentre il secondo punto scivola verso il primo, le pendenze delle secanti si assestano su un valore limite — la pendenza della retta tangente — e quel limite \u00e8 la derivata.',
          'Formalmente, f′(x) = lim(h→0) [f(x+h) − f(x)]/h. Il numeratore \u00e8 la variazione di output su un minuscolo passo h; dividere per h d\u00e0 il tasso; il limite restringe il passo a zero. Nella calcolatrice, traccia f(x) = x^2 e aumenta lo zoom su x = 1: la curva sembra sempre pi\u00f9 una retta di pendenza 2 — la derivata resa visibile.',
        ],
      },
      {
        heading: 'Cosa ti dice la derivata',
        body: [
          'Il segno della derivata racconta la direzione: f′ > 0 significa che la funzione sta salendo, f′ < 0 che sta scendendo, f′ = 0 un momento piatto — un potenziale picco, avvallamento o pianoro. La sua grandezza racconta la ripidit\u00e0: |f′| grande significa variazione rapida, |f′| piccolo significa deriva lenta. Per la posizione s(t), la derivata \u00e8 la velocit\u00e0; la derivata della velocit\u00e0 \u00e8 l\u2019accelerazione.',
          'I punti in cui f′ = 0 (o \u00e8 indefinita) sono punti critici — i candidati per max e min. La derivata seconda f″ misura la curvatura: f″ > 0 significa concava verso l\u2019alto (a forma di U, la pendenza aumenta), f″ < 0 concava verso il basso. Dove f″ cambia segno siede un punto di flesso, il momento in cui la curva passa dal piegarsi in un modo al piegarsi nell\u2019altro.',
        ],
      },
      {
        heading: 'Regole di derivazione che rendono tutto meccanico',
        body: [
          'I limiti sono la fondazione, ma le regole di derivazione sono gli strumenti di lavoro. La regola delle potenze — d/dx xⁿ = nx^(n−1) — gestisce da sola ogni polinomio: la derivata di x³ − 3x \u00e8 3x² − 3. Le regole di somma, prodotto e quoziente combinano i pezzi, e la regola della catena gestisce la composizione: la derivata di sin(x²) \u00e8 cos(x²)·2x, la derivata esterna per la derivata interna.',
          'Alcune derivate valgono la pena di essere memorizzate: d/dx eˣ = eˣ (l\u2019unica funzione uguale alla propria derivata), d/dx ln(x) = 1/x, d/dx sin(x) = cos(x) e d/dx cos(x) = −sin(x). Con queste pi\u00f9 la regola della catena puoi derivare quasi tutto ci\u00f2 che compare in un corso standard — la calcolatrice pu\u00f2 verificare il tuo lavoro numericamente.',
        ],
      },
      {
        heading: 'Vedere le derivate sulla calcolatrice',
        body: [
          'La calcolatrice grafica rende le derivate concrete. Traccia una funzione, poi traccia la sua derivata come seconda espressione — per f(x) = x^3 - 3*x aggiungi 3*x^2 - 3 e osserva la derivata attraversare lo zero esattamente dove f ha la sua collina e la sua valle. Dove la derivata \u00e8 positiva, f sale; dove \u00e8 negativa, f scende; la corrispondenza \u00e8 esatta.',
          'Puoi anche stimare le derivate numericamente con il quoziente differenziale: per f in x = a, calcola (f(a + 0.001) − f(a − 0.001))/0.002. Questo \u00e8 essenzialmente ci\u00f2 che la calcolatrice fa internamente per le sue tangenti e annotazioni — il limite reso computazionale restringendo h a una piccola tolleranza invece che a zero.',
        ],
      },
    ],
    tryExpressions: ['x^3 - 3*x', 'sin(x)', 'exp(x)', 'x^2 * sin(x)'],
    keyTakeaways: [
      'La derivata f′(x) \u00e8 il limite delle pendenze delle secanti — la pendenza della retta tangente, il tasso di variazione istantaneo.',
      'Il segno indica la direzione (salita/discesa/piatto); la grandezza indica la rapidit\u00e0 della variazione.',
      'f′ = 0 segna i punti critici; f″ misura la curvatura e i suoi cambi di segno segnano i punti di flesso.',
      'La regola delle potenze, la regola della catena e una manciata di derivate memorizzate coprono quasi tutto.',
      'Tracciare f e f′ insieme mostra la corrispondenza: gli zeri della derivata sono i picchi e gli avvallamenti di f.',
    ],
    faqs: [
      {
        q: 'Qual \u00e8 la differenza tra pendenza media e derivata?',
        a: 'La pendenza media \u00e8 la variazione su un intervallo — salita su corsa tra due punti. La derivata \u00e8 ci\u00f2 a cui tendono le pendenze medie mentre l\u2019intervallo si restringe a zero: il tasso istantaneo in un singolo punto. La media ti dice il viaggio; la derivata ti dice il tachimetro.',
      },
      {
        q: 'Perch\u00e9 la derivata di x² \u00e8 2x?',
        a: 'Dalla definizione di limite: [(x+h)² − x²]/h = [2xh + h²]/h = 2x + h, e mentre h → 0 questo tende a 2x. Geometricamente, la parabola si irripidisce linearmente — pendenza 0 nell\u2019origine, pendenza 2 in x = 1, pendenza −2 in x = −1 — ed \u00e8 per questo che la derivata \u00e8 essa stessa una retta.',
      },
      {
        q: 'Una funzione pu\u00f2 essere continua ma non derivabile?',
        a: 'S\u00ec — il valore assoluto |x| \u00e8 continua in 0 ma ha un punto angoloso l\u00ec, quindi non esiste retta tangente. La derivabilit\u00e0 richiede liscezza; la continuit\u00e0 richiede solo assenza di salti. Ogni funzione derivabile \u00e8 continua, ma non vale il viceversa.',
      },
    ],
    related: [
      '/it/learn/what-is-a-function/',
      '/it/learn/understanding-integrals/',
      '/it/math-functions/quadratic/',
      '/it/math-functions/cubic/',
      '/it/math-functions/sine/',
      '/it/math-functions/exponential/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'understanding-integrals',
    title: 'Capire gli integrali: area e accumulo',
    description:
      'Cosa significano gli integrali definiti come area con segno sotto una curva, come il teorema fondamentale li lega alle derivate e quando usarli.',
    reviewedOn: '2026-09-29',
    sections: [
      {
        heading: 'Integrali come area sotto la curva',
        body: [
          'L\u2019immagine pi\u00f9 semplice: ∫ₐᵇ f(x)dx \u00e8 l\u2019area (con segno) tra il grafico di f e l\u2019asse x da a a b. L\u2019area sopra l\u2019asse conta positiva, quella sotto negativa — l\u2019integrale \u00e8 il netto. Per f(x) = x da 0 a 3, la regione \u00e8 un triangolo di area 9/2, quindi l\u2019integrale \u00e8 4.5, un controllo che puoi fare a occhio prima di fidarti di qualsiasi regola.',
          'Per le curve, l\u2019area \u00e8 definita tramite somme di Riemann: taglia [a, b] in n strisce, approssima ciascuna con un rettangolo di altezza f(xᵢ), somma e lascia n → ∞. Mentre le strisce si assottigliano, la somma a gradini converge all\u2019area vera — lo stesso schema limite delle derivate, applicato all\u2019accumulo invece che alla pendenza. La calcolatrice ombreggia questa regione quando esplori gli integrali.',
        ],
      },
      {
        heading: 'Il teorema fondamentale del calcolo',
        body: [
          'Il teorema fondamentale lega gli integrali alle derivate in entrambe le direzioni. Prima parte: se F \u00e8 una primitiva di f (cio\u00e8 F′ = f), allora ∫ₐᵇ f(x)dx = F(b) − F(a) — l\u2019area si calcola valutando una primitiva agli estremi. \u00c8 per questo che ∫x²dx = x³/3 + C rende banali gli integrali definiti: basta inserire gli estremi.',
          'Seconda parte: derivare una funzione integrale restituisce l\u2019integranda — d/dx ∫ₐˣ f(t)dt = f(x). Derivazione e integrazione si disfano a vicenda (a meno di una costante), ed \u00e8 per questo che sono insegnate come un\u2019unica materia. La costante +C ricorda che molte funzioni condividono la stessa derivata: l\u2019integrazione recupera la forma, non il punto di partenza.',
        ],
      },
      {
        heading: 'Integrali come accumulo',
        body: [
          'Oltre l\u2019area, pensa all\u2019accumulo: se f(t) \u00e8 un tasso (litri al minuto, dollari al giorno), allora ∫f(t)dt \u00e8 il totale accumulato. La distanza percorsa \u00e8 l\u2019integrale della velocit\u00e0; il saldo del conto \u00e8 l\u2019integrale del flusso di cassa netto. Il segno conta — il deflusso sottrae — quindi l\u2019integrale d\u00e0 la variazione netta, non la somma dei valori assoluti.',
          'Questa visione spiega perch\u00e9 gli integrali compaiono in fisica e ingegneria: lavoro = ∫forza·distanza, carica = ∫corrente·tempo, valore atteso = ∫x·densit\u00e0. Ogni volta che una quantit\u00e0 totale \u00e8 costruita da un tasso variabile, un integrale sta facendo la somma. Nella calcolatrice, l\u2019area ombreggiata sotto una curva di velocit\u00e0 \u00e8 letteralmente la distanza percorsa.',
        ],
      },
      {
        heading: 'Tecniche e quando usarle',
        body: [
          'Le primitive di base vengono dall\u2019invertire le regole di derivazione: la regola delle potenze al contrario d\u00e0 ∫xⁿdx = x^(n+1)/(n+1) (per n ≠ −1), e 1/x integra a ln|x|. La sostituzione disfa la regola della catena — se vedi f(g(x))·g′(x), poni u = g(x). L\u2019integrazione per parti disfa la regola del prodotto: ∫u dv = uv − ∫v du, la scelta giusta quando l\u2019integranda \u00e8 un prodotto come x·eˣ.',
          'Alcuni integrali non hanno primitive elementari — e^(−x²) \u00e8 il famoso esempio — e allora i metodi numerici prendono il posto: la regola dei trapezi, Simpson o il campionamento adattivo approssimano l\u2019area direttamente. \u00c8 ci\u00f2 che fa la calcolatrice sotto il cofano per gli integrali definiti: valuta la funzione in molti punti e somma con cura, gestendo gli asintoti dividendo l\u2019intervallo.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'abs(x - 2)', 'exp(-x^2)'],
    keyTakeaways: [
      'Un integrale definito \u00e8 l\u2019area (con segno) sotto la curva — sopra l\u2019asse positiva, sotto negativa.',
      'Le somme di Riemann definiscono l\u2019integrale come limite delle approssimazioni a rettangoli mentre le strisce si assottigliano.',
      'Il teorema fondamentale: gli integrali si valutano tramite primitive, e derivare un integrale restituisce l\u2019integranda.',
      'Gli integrali accumulano tassi in totali: distanza dalla velocit\u00e0, carica dalla corrente, lavoro dalla forza.',
      'La sostituzione disfa la regola della catena; l\u2019integrazione per parti disfa la regola del prodotto; i metodi numerici gestiscono il resto.',
    ],
    faqs: [
      {
        q: 'Qual \u00e8 la differenza tra integrale definito e indefinito?',
        a: 'L\u2019indefinito ∫f(x)dx \u00e8 una famiglia di funzioni (primitive, pi\u00f9 +C) la cui derivata \u00e8 f. Il definito ∫ₐᵇf(x)dx \u00e8 un numero — l\u2019area netta da a a b — calcolato come F(b) − F(a) per qualsiasi primitiva F. Uno d\u00e0 funzioni, l\u2019altro d\u00e0 valori.',
      },
      {
        q: 'Perch\u00e9 c\u2019\u00e8 +C negli integrali indefiniti?',
        a: 'Perch\u00e9 la derivazione distrugge le costanti additive — x², x² + 5 e x² − 100 hanno tutte derivata 2x. Quindi invertire la derivata pu\u00f2 recuperare la forma solo a meno di una costante sconosciuta, e +C la rappresenta. Gli integrali definiti non ne hanno bisogno perch\u00e9 la costante si cancella in F(b) − F(a).',
      },
      {
        q: 'L\u2019area pu\u00f2 essere negativa in un integrale?',
        a: 'L\u2019area geometrica no, ma l\u2019integrale s\u00ec — conta la regione sotto l\u2019asse come negativa. ∫₀^{2π} sin(x)dx = 0 perch\u00e9 i due lobi uguali si cancellano. Se vuoi l\u2019area totale geometrica, integra |f(x)| invece di f(x).',
      },
    ],
    related: [
      '/it/learn/understanding-derivatives/',
      '/it/learn/what-is-a-function/',
      '/it/math-functions/sine/',
      '/it/math-functions/quadratic/',
      '/it/math-functions/absolute-value/',
      '/it/examples/damped-oscillation/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'asymptotes-explained',
    title: 'Asintoti spiegati: cosa i grafici non toccano mai',
    description:
      'Capisci gli asintoti — rette che un grafico avvicina ma non tocca mai: verticali, orizzontali e obliqui spiegati con esempi chiari.',
    reviewedOn: '2026-09-29',
    sections: [
      {
        heading: 'Asintoti verticali: i punti di esplosione',
        body: [
          'Un asintoto verticale in x = a significa che la funzione esplode a ±∞ mentre x si avvicina ad a. La causa classica \u00e8 la divisione per zero: in f(x) = 1/x, mentre x si restringe verso 0 il reciproco cresce senza limite — 1/0.1 = 10, 1/0.001 = 1000 — quindi x = 0 \u00e8 un asintoto verticale. La funzione \u00e8 indefinita l\u00ec; il grafico mostra due rami che schizzano in direzioni opposte.',
          'La tangente ha infiniti asintoti verticali, in x = π/2 + nπ, perch\u00e9 tan(x) = sin(x)/cos(x) e il coseno si annulla l\u00ec. Nota l\u2019asimmetria: 1/x tende a +∞ da destra e −∞ da sinistra, mentre tan(x) fa l\u2019opposto attorno a π/2. Il comportamento laterale pu\u00f2 differire — ci\u00f2 che conta \u00e8 che almeno un lato esploda.',
        ],
      },
      {
        heading: 'Asintoti orizzontali: i valori di assestamento',
        body: [
          'Un asintoto orizzontale y = L significa che la funzione si assesta su L mentre x → ±∞ — il valore lontano della funzione. Per f(x) = 1/x, mentre x cresce i valori si restringono verso 0, quindi y = 0 \u00e8 l\u2019asintoto orizzontale (l\u2019asse x). Per eˣ, mentre x → −∞ la funzione decade verso 0, quindi y = 0 \u00e8 di nuovo l\u2019asintoto — ma mentre x → +∞ non c\u2019\u00e8 assestamento, solo crescita.',
          'Le funzioni razionali seguono una regola semplice: se il grado del numeratore \u00e8 minore di quello del denominatore, l\u2019asintoto orizzontale \u00e8 y = 0; se i gradi sono uguali, \u00e8 il rapporto dei coefficienti direttori; se il numeratore \u00e8 di un grado pi\u00f9 alto, c\u2019\u00e8 un asintoto obliquo invece di uno orizzontale. E s\u00ec — un grafico PU\u00d2 attraversare il suo asintoto orizzontale: (2ˣ·sin x)/x² lo fa infinite volte mentre si assesta sullo zero.',
        ],
      },
      {
        heading: 'Asintoti obliqui e curiosit\u00e0',
        body: [
          'Quando il numeratore di una funzione razionale supera il denominatore di esattamente un grado, il grafico si assesta su una retta inclinata — un asintoto obliquo. Per f(x) = (x² + 1)/x = x + 1/x, il termine 1/x svanisce lontano, quindi la curva abbraccia la retta y = x mentre |x| cresce. La divisione tra polinomi rivela l\u2019asintoto: il quoziente \u00e8 la retta, il resto svanisce.',
          'Alcune “curiosit\u00e0” valgono la pena di essere sapute. Una curva pu\u00f2 attraversare un asintoto orizzontale o obliquo (ma mai uno verticale, dove la funzione \u00e8 indefinita). La funzione 1/x² ha lo stesso asintoto verticale di 1/x ma entrambi i rami puntano verso l\u2019alto. E alcune funzioni, come e^(−x²), hanno asintoti orizzontali in entrambe le direzioni — la curva a campana si assesta a zero su entrambi i lati.',
        ],
      },
      {
        heading: 'Individuare gli asintoti sulla calcolatrice',
        body: [
          'Traccia 1/x e allontana lo zoom: vedrai i rami appiattirsi contro l\u2019asse x e impennarsi lungo l\u2019asse y — entrambi gli asintoti resi visibili. Aumenta lo zoom vicino a x = 0 e osserva i valori esplodere: in x = 0.001, y = 1000. La calcolatrice potrebbe disegnare una quasi-linea verticale collegando i punti attraverso il varco — \u00e8 un artefatto di rendering, non parte del grafico; la funzione \u00e8 genuinamente indefinita in x = 0.',
          'Per tan(x), traccia su un intervallo ampio come [−2π, 2π] e conta i muri verticali — uno ogni π, in π/2 + nπ. Per gli asintoti orizzontali, valuta la funzione in x grandi: e^(−10) ≈ 0.000045 conferma che eˣ abbraccia lo zero a sinistra. I controlli numerici trasformano gli asintoti da definizioni astratte in fatti osservati.',
        ],
      },
    ],
    tryExpressions: ['1/x', '(x^2 + 1)/x', '(2*x^2 + 3)/(x^2 - 1)', 'tan(x)'],
    keyTakeaways: [
      'Asintoto verticale in x = a: la funzione → ±∞ mentre x → a — spesso da divisione per zero.',
      'Asintoto orizzontale y = L: la funzione → L mentre x → ±∞ — il valore di assestamento lontano.',
      'Asintoto obliquo: quando il numeratore supera il denominatore di un grado, il grafico abbraccia una retta inclinata.',
      'Le curve possono attraversare asintoti orizzontali/obliqui ma mai quelli verticali (la funzione l\u00ec \u00e8 indefinita).',
      'Le linee quasi-verticali vicino ai varchi nei grafici resi sono artefatti — la funzione \u00e8 davvero indefinita l\u00ec.',
    ],
    faqs: [
      {
        q: 'Un grafico pu\u00f2 toccare il suo asintoto?',
        a: 'Dipende dal tipo. Un grafico non pu\u00f2 mai toccare un asintoto verticale, perch\u00e9 la funzione \u00e8 indefinita l\u00ec. Ma pu\u00f2 attraversare un asintoto orizzontale o obliquo — l\u2019asintoto descrive solo il comportamento lontano. Molte curve oscillanti attraversano ripetutamente il loro asintoto orizzontale mentre si assestano.',
      },
      {
        q: 'Come si trova l\u2019asintoto orizzontale di una funzione razionale?',
        a: 'Confronta i gradi: numeratore di grado minore del denominatore → y = 0; gradi uguali → y = (coefficiente direttore del numeratore)/(coefficiente direttore del denominatore); numeratore di un grado pi\u00f9 alto → nessun asintoto orizzontale (ma uno obliquo); pi\u00f9 di un grado → nessun asintoto lineare.',
      },
      {
        q: 'Perch\u00e9 1/x ha due asintoti?',
        a: 'Perch\u00e9 due cose diverse vanno all\u2019infinito. Mentre x → 0 i valori esplodono (asintoto verticale x = 0); mentre x → ±∞ i valori si restringono a zero (asintoto orizzontale y = 0). Una funzione pu\u00f2 avere entrambi i tipi contemporaneamente — descrivono comportamenti in posti diversi.',
      },
    ],
    related: [
      '/it/learn/what-is-a-function/',
      '/it/math-functions/reciprocal/',
      '/it/math-functions/tangent/',
      '/it/math-functions/natural-logarithm/',
      '/it/examples/logistic-growth/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'graphing-inequalities',
    title: 'Tracciare disequazioni in due variabili',
    description:
      'Come tracciare disequazioni come y > x^2: curve di frontiera, linee tratteggiate o continue, ombreggiatura e punti di prova — passo passo.',
    reviewedOn: '2026-09-29',
    sections: [
      {
        heading: 'Dalle equazioni alle disequazioni',
        body: [
          'L\u2019equazione y = x^2 disegna una singola curva: la parabola. La disequazione y > x^2 chiede qualcosa di pi\u00f9 grande — ogni punto (x, y) la cui coordinata y sta sopra la parabola. Invece di una curva, la soluzione \u00e8 un\u2019intera regione: l\u2019area infinita che si estende sopra la curva. Tracciare una disequazione significa disegnare la frontiera e ombreggiare il lato che la soddisfa.',
          'Questo passaggio dalla curva alla regione \u00e8 l\u2019intero salto concettuale. Un\u2019equazione in due variabili descrive tipicamente una curva unidimensionale; una disequazione descrive una regione bidimensionale il cui bordo \u00e8 quella curva. Ogni punto che provi appartiene alla regione oppure no, e la curva di frontiera \u00e8 dove vale l\u2019uguaglianza.',
        ],
      },
      {
        heading: 'Curve di frontiera: tratteggiate o continue',
        body: [
          'Il primo passo \u00e8 tracciare la frontiera — l\u2019equazione che ottieni sostituendo il segno di disequazione con =. Per y ≥ x^2 la frontiera \u00e8 la parabola y = x^2, e si disegna continua perch\u00e9 i suoi punti soddisfano la disequazione: la frontiera \u00e8 inclusa nella soluzione.',
          'Per le disequazioni strette (< o >), la frontiera si disegna tratteggiata, perch\u00e9 i punti sulla curva non soddisfano la disequazione. y > x^2 e y ≥ x^2 differiscono solo sulla parabola stessa, eppure quella differenza spessa un punto conta nei problemi di ottimizzazione, dove un ottimo esattamente su una frontiera stretta \u00e8 irraggiungibile. La calcolatrice segue questa convenzione: tratteggiata per le strette, continua per le non strette.',
        ],
      },
      {
        heading: 'Ombreggiatura e metodo del punto di prova',
        body: [
          'Una volta disegnata la frontiera, essa divide il piano in regioni (di solito due). Scegli un punto qualsiasi non sulla frontiera — un punto di prova — inseriscilo nella disequazione e vedi se l\u2019affermazione \u00e8 vera. Se lo \u00e8, ombreggia l\u2019intera regione di quel punto; altrimenti ombreggia l\u2019altro lato.',
          'Per y > x^2, l\u2019origine (0, 0) \u00e8 un comodo punto di prova — aspetta, sta sulla frontiera. Scegli invece (0, 1): 1 > 0 \u00e8 vero, quindi ombreggia la regione sopra la parabola che contiene (0, 1). Un\u2019abitudine sicura: verifica sempre che il punto di prova non sia sulla frontiera prima di fidarti del risultato, e ricontrolla con un secondo punto nella regione ombreggiata se la disequazione \u00e8 complicata.',
        ],
      },
      {
        heading: 'Sistemi di disequazioni e regioni ammissibili',
        body: [
          'I problemi reali di solito coinvolgono pi\u00f9 disequazioni alla volta — un sistema. La soluzione \u00e8 l\u2019insieme dei punti che le soddisfano tutte simultaneamente: l\u2019intersezione delle singole regioni ombreggiate. Ogni nuova disequazione pu\u00f2 solo restringere la soluzione, mai allargarla, perch\u00e9 i punti devono ora superare un test in pi\u00f9.',
          'Questo \u00e8 il cuore geometrico della programmazione lineare: vincoli come x ≥ 0, y ≥ 0 e 2*x + 3*y ≤ 12 ritagliano una regione ammissibile poligonale, e l\u2019ottimo di un obiettivo lineare sta sempre in uno dei suoi vertici. Ombreggia ciascuna disequazione a turno, conserva solo la sovrapposizione, e la regione ammissibile che resta \u00e8 dove tutti i vincoli valgono insieme. Prova y ≤ x^2 e y ≥ −x insieme per vedere un\u2019intersezione a forma di lente delimitata da due curve.',
        ],
      },
      {
        heading: 'Leggere un grafico ombreggiato',
        body: [
          'Un grafico di disequazione finito comunica tre cose: la frontiera (con il suo significato tratteggiato/continuo), la regione di soluzione ombreggiata e implicitamente tutto ci\u00f2 fuori dall\u2019ombreggiatura che non va bene. Quando leggi un grafico del genere, identifica prima la curva di frontiera e la sua rigidit\u00e0, poi conferma che l\u2019ombreggiatura corrisponda a un rapido punto di prova mentale.',
          'Errori comuni: dimenticare che il lato non ombreggiato \u00e8 escluso (non “sconosciuto”), scambiare una frontiera tratteggiata per una inclusa e, per i sistemi, ombreggiare ciascuna disequazione senza mai prendere l\u2019intersezione. Inserisci le espressioni qui sotto, alterna le forme strette e non strette e osserva come cambiano ombreggiatura e stile della frontiera mentre il significato della regione cambia di esattamente la curva di frontiera.',
        ],
      },
    ],
    tryExpressions: ['x^2', '2 - x', 'abs(x)', 'sin(x)'],
    keyTakeaways: [
      'Una disequazione in due variabili descrive una regione del piano; il suo bordo \u00e8 la curva di frontiera dove vale l\u2019uguaglianza.',
      'Disegna la frontiera tratteggiata per le disequazioni strette (<, >) e continua quando la frontiera \u00e8 inclusa (≤, ≥).',
      'Usa un punto di prova fuori dalla frontiera per decidere quale lato ombreggiare; ricontrolla con un secondo punto nei casi complessi.',
      'La soluzione di un sistema di disequazioni \u00e8 l\u2019intersezione delle singole regioni — ogni vincolo pu\u00f2 solo restringerla.',
      'Nella programmazione lineare, i vertici della regione ammissibile sono dove deve trovarsi l\u2019ottimo di un obiettivo lineare.',
    ],
    faqs: [
      {
        q: 'Quando uso una linea tratteggiata invece di una continua?',
        a: 'Usa una frontiera tratteggiata per le disequazioni strette (< o >), perch\u00e9 i punti sulla frontiera non soddisfano la disequazione. Usa una frontiera continua per ≤ o ≥, dove i punti della frontiera sono inclusi nella soluzione.',
      },
      {
        q: 'Come faccio a sapere quale lato della frontiera ombreggiare?',
        a: 'Scegli un punto di prova che non sia sulla frontiera, sostituiscilo nella disequazione e ombreggia la regione che contiene il punto se l\u2019affermazione \u00e8 vera — altrimenti ombreggia l\u2019altra regione.',
      },
      {
        q: 'Cos\u2019\u00e8 la regione ammissibile in un sistema di disequazioni?',
        a: 'È l\u2019intersezione di tutte le singole regioni di soluzione: l\u2019insieme dei punti che soddisfano ogni disequazione alla volta. Nella programmazione lineare, l\u2019ottimo di un obiettivo lineare su una regione ammissibile poligonale sta sempre in un vertice di quella regione.',
      },
    ],
    related: [
      '/it/learn/what-is-a-function/',
      '/it/math-functions/quadratic/',
      '/it/math-functions/absolute-value/',
      '/it/math-functions/square-root/',
      '/it/examples/projectile-motion/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'parametric-vs-cartesian',
    title: 'Equazioni parametriche contro cartesiane',
    description:
      'Equazioni cartesiane y = f(x) contro parametriche x(t), y(t): cosa esprime ciascuna, quando usare l\u2019una o l\u2019altra e come convertire tra loro.',
    reviewedOn: '2026-09-29',
    sections: [
      {
        heading: 'Forma cartesiana: y come funzione di x',
        body: [
          'La forma cartesiana y = f(x) \u00e8 quella familiare: per ogni x, l\u2019equazione ti consegna la y. \u00c8 il linguaggio naturale delle funzioni — ogni retta verticale incontra il grafico al massimo una volta, quindi la curva non torna mai indietro su s\u00e9 stessa verticalmente. Il pensiero input-output, dominio e codominio e il test della retta verticale appartengono tutti a questa forma.',
          'Ma la forma ha un limite invalicabile: non pu\u00f2 descrivere curve che formano cappi, si auto-intersecano o viaggiano verticalmente. Un cerchio richiede due equazioni cartesiane (met\u00e0 superiore e inferiore); una curva tracciata due volte, o tracciata all\u2019indietro, \u00e8 inesprimibile. Ogni volta che posizione, forma o moto sono pi\u00f9 ricchi di “un y per x”, la forma cartesiana esaurisce lo spazio.',
        ],
      },
      {
        heading: 'Forma parametrica: entrambe le coordinate seguono un parametro',
        body: [
          'Le equazioni parametriche introducono una terza variabile, il parametro t, e definiscono x e y separatamente: x = x(t), y = y(t). Mentre t percorre il suo intervallo, il punto (x(t), y(t)) traccia la curva. Il cerchio unitario diventa x = cos(t), y = sin(t) per t in [0, 2π) — una coppia pulita di equazioni, senza divisioni in met\u00e0, senza ambiguit\u00e0 ±.',
          'Il parametro spesso ha un significato: pu\u00f2 essere il tempo. Allora x = t, y = t^2 traccia la parabola y = x^2 da sinistra a destra mentre t cresce, mentre x = −t, y = t^2 traccia la stessa parabola da destra a sinistra. Stessa forma, viaggi opposti — una distinzione che la forma cartesiana non pu\u00f2 nemmeno esprimere. La forma parametrica separa l\u2019aspetto della curva dal modo in cui \u00e8 percorsa.',
        ],
      },
      {
        heading: 'Convertire tra le due forme',
        body: [
          'Passare da parametrico a cartesiano significa eliminare il parametro. Se x = t e y = t^2, la sostituzione d\u00e0 direttamente y = x^2. Per x = cos(t), y = sin(t), elevare al quadrato e sommare usa cos²t + sin²t = 1 per recuperare x² + y² = 1. L\u2019eliminazione \u00e8 di solito algebra pi\u00f9 un\u2019identit\u00e0 ben scelta.',
          'La direzione inversa — parametrizzare una curva cartesiana — ha sempre almeno una risposta banale: poni x = t, y = f(t). Le parametrizzazioni interessanti sono quelle non banali, come il cerchio sopra o x = t^2, y = t^4 − 3*t^2 per una curva che rivisita punti. Nota che la conversione pu\u00f2 perdere informazioni: eliminare t da x = t, y = t^2 scarta la direzione di percorrenza, che solo la forma parametrica registrava.',
        ],
      },
      {
        heading: 'Quando ciascuna forma \u00e8 lo strumento giusto',
        body: [
          'Usa la forma cartesiana quando la relazione \u00e8 genuinamente funzionale — un output per input — e quando vuoi gli strumenti del calcolo (derivate, integrali, ricerca di radici) nella loro forma pi\u00f9 semplice. La maggior parte delle formule in scienza ed economia arriva cos\u00ec.',
          'Usa la forma parametrica per curve chiuse, curve auto-intersecanti e tutto ci\u00f2 che coinvolge moto o tracciamento — traiettorie di proiettili con il tempo come parametro, figure di Lissajous, epicicli a forma di ingranaggio. Ricorri ad essa anche quando un\u2019equazione cartesiana \u00e8 scomoda: la curva x = y^2 \u00e8 una parabola orizzontale perfettamente valida, ma non \u00e8 una funzione di x, mentre x = t^2, y = t la parametrizza senza sforzo. Se la curva forma cappi o il viaggio conta, vai di parametrico.',
        ],
      },
      {
        heading: 'Vedere la differenza nella calcolatrice',
        body: [
          'Traccia y = sin(x) in forma cartesiana, poi traccia x = t, y = sin(t) in forma parametrica sulla stessa finestra: curve identiche, perch\u00e9 la seconda \u00e8 solo una riparametrizzazione della prima. Ora prova x = sin(t), y = sin(2*t) — una figura di Lissajous — e chiediti quale singola equazione cartesiana y = f(x) potrebbe produrla. Nessuna: la curva si auto-interseca e assegna pi\u00f9 valori y a una x.',
          'Regola l\u2019intervallo di t e osserva il tracciamento: con t da 0 a π ottieni met\u00e0 della figura, con 0 a 2π tutta quanta. Quel controllo su quanta parte della curva \u00e8 disegnata, e in quale ordine, \u00e8 il vantaggio distintivo della forma parametrica — e il motivo per cui il moto, dai proiettili alle orbite planetarie, \u00e8 modellato parametricamente.',
        ],
      },
    ],
    tryExpressions: ['sin(x)', 'x^2', 'cos(x)', 'sqrt(4 - x^2)'],
    keyTakeaways: [
      'La forma cartesiana y = f(x) d\u00e0 un y per x — non pu\u00f2 descrivere cappi, segmenti verticali o auto-intersezioni.',
      'La forma parametrica x = x(t), y = y(t) traccia una curva mentre t varia; t rappresenta spesso il tempo, codificando la direzione di percorrenza.',
      'Il cerchio unitario richiede due equazioni cartesiane ma una sola coppia parametrica: x = cos(t), y = sin(t).',
      'Eliminare il parametro converte da parametrico a cartesiano, ma l\u2019informazione sulla direzione di percorrenza va persa.',
      'Usa la forma parametrica quando la curva forma cappi, si auto-interseca o quando il viaggio lungo di essa conta; la cartesiana per relazioni funzionali.',
    ],
    faqs: [
      {
        q: 'Ogni curva parametrica pu\u00f2 essere scritta come y = f(x)?',
        a: 'No. Solo le curve che superano il test della retta verticale possono. Un cerchio, una figura di Lissajous o qualsiasi curva che assegna due valori y a una x non ha una singola equazione cartesiana y = f(x) — anche se i suoi pezzi possono essere scritti cos\u00ec separatamente.',
      },
      {
        q: 'Cosa rappresenta di solito il parametro t?',
        a: 'Spesso il tempo: x = x(t), y = y(t) descrive allora una posizione che evolve nel tempo. Ma t \u00e8 solo una variabile di tracciamento — va bene qualsiasi intervallo, e la stessa curva geometrica pu\u00f2 essere tracciata da molte parametrizzazioni diverse, in avanti o all\u2019indietro, veloce o lenta.',
      },
      {
        q: 'Come converto equazioni parametriche in forma cartesiana?',
        a: 'Elimina il parametro: risolvi un\u2019equazione per t (o usa un\u2019identit\u00e0) e sostituisci nell\u2019altra. Per x = cos(t), y = sin(t), elevare al quadrato e sommare d\u00e0 x² + y² = 1 tramite cos²t + sin²t = 1.',
      },
    ],
    related: [
      '/it/learn/what-is-a-function/',
      '/it/learn/graphing-inequalities/',
      '/it/math-functions/sine/',
      '/it/math-functions/cosine/',
      '/it/math-functions/quadratic/',
      '/it/math-functions/square-root/',
      '/it/examples/lissajous-curve/',
      '/it/examples/projectile-motion/',
      '/it/graphing-calculator/',
    ],
  },
];
