/**
 * Contenuti educativi scritti a mano per le dieci pagine di funzioni notevoli
 * (italiano).
 *
 * Traduzione di `src/data/seo/functions.ts`: stessa struttura, stessi slug,
 * stesse espressioni e notazioni (matematica — NON tradotta). Tutta la prosa
 * afferma solo fatti matematicamente certi — niente statistiche, studi o
 * recensioni. I link `related` sono ri-scritti con il prefisso `/it/`.
 */
import type { FunctionPageData } from '../types.js';

export const FUNCTION_PAGES: FunctionPageData[] = [
  {
    slug: 'sine',
    name: 'Seno',
    displayName: 'Funzione seno',
    notation: 'f(x) = sin(x)',
    expression: 'sin(x)',
    tagline:
      'L\u2019onda classica della trigonometria: un\u2019oscillazione liscia che si ripete ogni 2π.',
    description:
      'Traccia il grafico di f(x) = sin(x): periodo 2π, ampiezza, zeri e picchi dell\u2019onda sinusoidale, simmetria dispari e ruolo in suono, luce e oscillazioni.',
    intro: [
      'La funzione seno \u00e8 una delle curve pi\u00f9 riconoscibili di tutta la matematica: un\u2019onda liscia e ripetuta che oscilla per sempre tra −1 e 1. Definita in origine tramite i triangoli rettangoli — il seno di un angolo \u00e8 il rapporto tra cateto opposto e ipotenusa — si estende naturalmente a tutti i numeri reali misurando gli angoli in radianti sul cerchio unitario. Sul cerchio unitario, sin(x) \u00e8 semplicemente la coordinata y del punto raggiunto dopo aver ruotato di x radianti dall\u2019asse x positivo.',
      'Poich\u00e9 si ripete ogni 2π radianti, il seno \u00e8 il prototipo di ogni fenomeno periodico: corrente alternata, onde sonore, luce, maree e la vibrazione di una corda di chitarra possono essere tutti descritti con onde sinusoidali di diverse frequenze e ampiezze. Digita sin(x) nella calcolatrice grafica per tracciare l\u2019onda tu stesso, poi spostala, stirala e combinala con altre espressioni per vedere come le oscillazioni del mondo reale sono costruite da questa unica curva.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 il seno',
        body: [
          'La definizione sul cerchio unitario \u00e8 ci\u00f2 che permette al seno di accettare qualsiasi input reale, non solo angoli di un triangolo. Partendo da (1, 0) e muovendosi in senso antiorario sul cerchio di raggio 1, ciascun angolo x atterra su un punto la cui altezza sopra l\u2019asse x \u00e8 sin(x). Dopo un giro completo di 2π radianti torni al punto di partenza, ed \u00e8 per questo che il grafico si ripete — la storia della funzione \u00e8 scritta nella geometria del cerchio.',
          'Quella geometria spiega anche la simmetria dell\u2019onda: il seno \u00e8 una funzione dispari, cio\u00e8 sin(−x) = −sin(x), quindi la met\u00e0 sinistra del grafico \u00e8 la met\u00e0 destra ruotata di 180° attorno all\u2019origine. Il grafico attraversa l\u2019asse x in ogni multiplo di π, raggiunge il picco di 1 in π/2 pi\u00f9 ogni giro completo, e tocca il fondo a −1 in 3π/2 pi\u00f9 ogni giro completo.',
        ],
      },
      {
        heading: 'Ampiezza, periodo e fase',
        body: [
          'Tre numeri descrivono qualsiasi onda sinusoidale: ampiezza, periodo e fase. L\u2019ampiezza \u00e8 l\u2019altezza dell\u2019onda — per il semplice sin(x) \u00e8 1, la distanza dalla linea mediana y = 0 a ciascun picco. Moltiplicare per una costante, come in 3*sin(x), stira l\u2019onda verticalmente senza cambiarne la forma, ed \u00e8 cos\u00ec che si modellano suoni pi\u00f9 forti e segnali pi\u00f9 intensi.',
          'Il periodo \u00e8 la lunghezza orizzontale di un ciclo completo: 2π per sin(x). Scrivere sin(2*x) comprime due onde intere nello stesso spazio, dimezzando il periodo a π e raddoppiando la frequenza — l\u2019altezza di una nota un\u2019ottava sopra. Aggiungere uno sfasamento, sin(x − π/2), fa scivolare l\u2019intera onda di lato, ed \u00e8 per questo che il coseno \u00e8 segretamente un seno spostato: cos(x) = sin(x + π/2).',
        ],
      },
      {
        heading: 'Dove compare il seno',
        body: [
          'Le onde sinusoidali sono i mattoni dell\u2019elaborazione dei segnali. Qualsiasi segnale ripetuto — un tono musicale, una trasmissione radio, il ronzio a 50 o 60 Hz della rete elettrica — pu\u00f2 essere scomposto in una somma di onde sinusoidali di diverse frequenze, un fatto noto come analisi di Fourier. Quando due onde sinusoidali di frequenza quasi uguale si sovrappongono, interferiscono producendo battimenti, l\u2019effetto pulsante che senti quando due strumenti leggermente scordati suonano insieme.',
          'Oltre ai segnali, il seno governa il moto armonico semplice: l\u2019andirivieni di una massa su una molla, l\u2019oscillazione di un piccolo pendolo e il su e gi\u00f9 di una boa galleggiante seguono tutti curve sinusoidali nel tempo. In geometria e fisica, il seno proietta una quantit\u00e0 rotante su un asse — la posizione verticale di una cabina di ruota panoramica nel tempo traccia esattamente sin(x).',
        ],
      },
    ],
    keyFacts: [
      'Dominio: tutti i numeri reali; codominio: −1 ≤ sin(x) ≤ 1.',
      'Periodo 2π: sin(x + 2π) = sin(x) per ogni x.',
      'Funzione dispari: sin(−x) = −sin(x); il grafico ha simmetria rotazionale di 180° attorno all\u2019origine.',
      'Zeri in x = nπ; massimi di 1 in x = π/2 + 2πn; minimi di −1 in x = 3π/2 + 2πn.',
      'Intercetta y in (0, 0); la derivata \u00e8 cos(x); una primitiva \u00e8 −cos(x).',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 il grafico del seno \u00e8 un\u2019onda?',
        a: 'Perch\u00e9 il seno misura l\u2019altezza sul cerchio unitario mentre ruoti. Girare intorno al cerchio fa salire e scendere l\u2019altezza in modo liscio e ripetuto a ogni giro completo, quindi il grafico dell\u2019altezza in funzione dell\u2019angolo \u00e8 un\u2019onda. L\u2019onda \u00e8 liscia perch\u00e9 la rotazione \u00e8 continua — niente spigoli n\u00e9 salti.',
      },
      {
        q: 'Qual \u00e8 la differenza tra seno e coseno?',
        a: 'Sono la stessa onda spostata di lato: cos(x) = sin(x + π/2). Sul cerchio unitario, il coseno \u00e8 la coordinata x mentre il seno \u00e8 la coordinata y. Il coseno parte dal suo massimo, cos(0) = 1, mentre il seno parte da zero, sin(0) = 0.',
      },
      {
        q: 'Sin(x) supera mai 1?',
        a: 'No — per x reale, |sin(x)| ≤ 1 sempre. Sul cerchio unitario, la coordinata y non pu\u00f2 mai superare in modulo il raggio, che \u00e8 1. (Il seno di numeri complessi pu\u00f2 superare 1 in modulo, ma il grafico a valori reali della calcolatrice resta entro [−1, 1].)',
      },
    ],
    related: [
      '/it/math-functions/cosine/',
      '/it/math-functions/tangent/',
      '/it/examples/trigonometric-interference/',
      '/it/examples/damped-oscillation/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'cosine',
    name: 'Coseno',
    displayName: 'Funzione coseno',
    notation: 'f(x) = cos(x)',
    expression: 'cos(x)',
    tagline:
      'Il gemello pari e ondulato del seno — il coseno parte dal suo picco e si ripete ogni 2π.',
    description:
      'Traccia il grafico di f(x) = cos(x): periodo 2π, ampiezza, intercette e punti di svolta dell\u2019onda coseno, simmetria pari e usi in onde e moto.',
    intro: [
      'Il coseno \u00e8 la controparte orizzontale del seno: sul cerchio unitario d\u00e0 la coordinata x del punto all\u2019angolo x, mentre il seno d\u00e0 la coordinata y. Quella singola differenza modella tutto del suo grafico — parte dal suo valore massimo di 1 quando x = 0, scende a −1 in x = π e torna a 1 in x = 2π, tracciando la stessa onda liscia del seno ma spostata di un quarto di giro. Come il seno, oscilla per sempre tra −1 e 1 e si ripete ogni 2π radianti.',
      'Il coseno compare ovunque qualcosa si proietti su un asse orizzontale o parta da un massimo: l\u2019ombra di una ruota che gira, la tensione in un circuito AC misurata dal suo picco, o la coordinata x del moto circolare uniforme. Poich\u00e9 cos(x) = sin(x + π/2), tutto ci\u00f2 che puoi dire delle onde sinusoidali vale per le onde coseno con uno sfasamento — digita cos(x) nella calcolatrice e trascina la vista per guardarlo ripetersi.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 il coseno',
        body: [
          'Immagina un punto che viaggia in senso antiorario sul cerchio unitario, partendo da (1, 0). All\u2019angolo x la sua posizione \u00e8 (cos x, sin x): il coseno traccia quanto a destra o a sinistra \u00e8 il punto. In x = 0 il punto \u00e8 all\u2019estremo destro, quindi cos(0) = 1 — l\u2019intercetta y del grafico. Man mano che l\u2019angolo cresce il punto oscilla a sinistra, e il coseno scende lisciamente attraverso 0 in x = π/2 fino a −1 in x = π, l\u2019estremo sinistro del cerchio.',
          'Il coseno \u00e8 una funzione pari, cos(−x) = cos(x), quindi il suo grafico \u00e8 un\u2019immagine speculare rispetto all\u2019asse y: il lato sinistro riflette esattamente il destro. Attraversa lo zero in x = π/2 + nπ, a met\u00e0 strada tra ciascun picco e avvallamento, e i suoi massimi di 1 occorrono in x = 2πn mentre i minimi di −1 in x = π + 2πn. La familiare forma d\u2019onda viene dalla stessa geometria circolare del seno, vista di lato.',
        ],
      },
      {
        heading: 'Coseno, seno e sfasamenti',
        body: [
          'L\u2019identit\u00e0 cos(x) = sin(x + π/2) dice che le due funzioni sono un\u2019unica onda vista da due punti di partenza: il coseno \u00e8 come appare il seno un quarto di periodo prima. Questo conta quando si modellano oscillazioni reali, perch\u00e9 la scelta tra seno e coseno \u00e8 solo una scelta di quando avvii l\u2019orologio — una molla rilasciata da ferma alla massima estensione segue un coseno nel tempo, mentre una spinta attraverso l\u2019equilibrio segue un seno.',
          'Gli sfasamenti spiegano anche somme come sin(x) + cos(x): combinare due onde della stessa frequenza produce sempre un\u2019altra onda di quella frequenza, qui √2·sin(x + π/4), un fatto che discende dalle formule di addizione degli angoli. Nella calcolatrice, traccia sin(x) e cos(x) insieme e aggiungi una terza espressione sin(x) + cos(x) per vedere la somma restare un\u2019onda perfetta.',
        ],
      },
      {
        heading: 'Dove compare il coseno',
        body: [
          'In fisica, il coseno descrive qualsiasi oscillazione misurata dal suo estremo: il moto armonico semplice x(t) = A·cos(ωt) per una massa rilasciata da ferma, la parte reale dell\u2019esponenziale complesso e^(iθ) = cos θ + i·sin θ che \u00e8 alla base dell\u2019analisi dei circuiti AC e delle funzioni d\u2019onda quantistiche, e le funzioni base pari delle serie di Fourier. Quando gli ingegneri scrivono un segnale periodico come somma di coseni, ciascun termine cattura la parte simmetrica dell\u2019onda.',
          'Il coseno compare anche lontano dalle onde. Il prodotto scalare di due vettori \u00e8 |a||b|cos θ, dove θ \u00e8 l\u2019angolo tra loro, quindi il coseno misura l\u2019allineamento: 1 per paralleli, 0 per perpendicolari, −1 per opposti. Il teorema del coseno, c² = a² + b² − 2ab·cos(C), generalizza Pitagora a qualsiasi triangolo.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: tutti i numeri reali; codominio: −1 ≤ cos(x) ≤ 1.',
      'Periodo 2π: cos(x + 2π) = cos(x) per ogni x.',
      'Funzione pari: cos(−x) = cos(x); il grafico \u00e8 simmetrico rispetto all\u2019asse y.',
      'Zeri in x = π/2 + nπ; massimi di 1 in x = 2πn; minimi di −1 in x = π + 2πn.',
      'Intercetta y in (0, 1); la derivata \u00e8 −sin(x); una primitiva \u00e8 sin(x).',
    ],
    faqs: [
      {
        q: 'Il coseno \u00e8 solo un seno spostato?',
        a: 'Esattamente — cos(x) = sin(x + π/2), quindi il grafico del coseno \u00e8 il grafico del seno spostato a sinistra di un quarto di periodo. Condividono stessa ampiezza, periodo e codominio; differisce solo il punto di partenza. Sul cerchio unitario sono le coordinate x e y dello stesso punto rotante.',
      },
      {
        q: 'Perch\u00e9 cos(0) = 1?',
        a: 'All\u2019angolo 0 il punto rotante sul cerchio unitario si trova in (1, 0), l\u2019estremo destro del cerchio, quindi la sua coordinata x — il coseno — \u00e8 1 e la sua coordinata y — il seno — \u00e8 0. \u00c8 anche per questo che il grafico del coseno inizia dal suo picco.',
      },
      {
        q: 'Cosa c\u2019entra il coseno con il prodotto scalare?',
        a: 'La formula del prodotto scalare a·b = |a||b|cos θ usa il coseno dell\u2019angolo tra i vettori per misurare quanto puntano nella stessa direzione. Il coseno \u00e8 1 quando sono paralleli, 0 quando perpendicolari e −1 quando opposti — quindi agisce come un punteggio di allineamento tra −1 e 1.',
      },
    ],
    related: [
      '/it/math-functions/sine/',
      '/it/math-functions/tangent/',
      '/it/examples/trigonometric-interference/',
      '/it/examples/damped-oscillation/',
      '/it/learn/what-is-a-function/',
    ],
  },
  {
    slug: 'tangent',
    name: 'Tangente',
    displayName: 'Funzione tangente',
    notation: 'f(x) = tan(x)',
    expression: 'tan(x)',
    tagline:
      'Una curva ripetuta che sale da −∞ a +∞, con asintoti verticali dove il coseno tocca lo zero.',
    description:
      'Traccia il grafico di f(x) = tan(x): rami ripetuti, asintoti in π/2 + nπ, periodo π, codominio illimitato e dove la tangente compare in matematica.',
    intro: [
      'La funzione tangente, tan(x) = sin(x)/cos(x), non assomiglia per niente alle sue sorelle ondulate: invece di oscillare tra −1 e 1, spazza verso l\u2019alto attraverso ogni valore reale, poi salta e ricomincia. Ciascun ramo ripetuto passa per uno zero in x = nπ, sale sempre pi\u00f9 ripidamente e schizza all\u2019infinito mentre x si avvicina a π/2 + nπ — i punti dove cos(x) = 0 e il rapporto esplode. Quelli sono gli asintoti verticali della funzione, i muri tratteggiati che la curva pu\u00f2 avvicinare ma mai toccare.',
      'La tangente misura la pendenza: in un triangolo rettangolo \u00e8 opposto su adiacente, la pendenza dell\u2019ipotenusa, e per un angolo di inclinazione d\u00e0 direttamente la pendenza della retta. Poich\u00e9 tan(x + π) = tan(x), il suo periodo \u00e8 solo π — met\u00e0 di quello di seno e coseno. Digita tan(x) nella calcolatrice e allontana lo zoom per vedere i rami piastrellare il piano, ciascuno una curva a S stirata tra due asintoti.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 la tangente',
        body: [
          'Geometricamente, tan(x) \u00e8 la pendenza del raggio all\u2019angolo x: disegna il raggio dall\u2019origine all\u2019angolo x e vedi quanto ripidamente sale, cio\u00e8 salita su corsa — opposto su adiacente. Equivalentemente, \u00e8 la coordinata y dove quel raggio incontra la retta verticale x = 1 tangente al cerchio unitario, da cui il nome. Mentre il raggio oscilla verso l\u2019alto in verticale, il punto di intersezione corre via all\u2019infinito, e nel momento in cui il raggio punta esattamente verso l\u2019alto non c\u2019\u00e8 pi\u00f9 intersezione — l\u2019asintoto.',
          'Poich\u00e9 tan(x) = sin(x)/cos(x), gli zeri della funzione vengono dal seno (in x = nπ) e i suoi asintoti dagli zeri del coseno (in x = π/2 + nπ). La tangente \u00e8 una funzione dispari, tan(−x) = −tan(x), quindi ciascun ramo \u00e8 simmetrico per rotazione attorno al proprio zero, e l\u2019intero grafico si ripete ogni π perch\u00e9 spostare sia seno che coseno di π ne inverte entrambi i segni, lasciando il rapporto invariato.',
        ],
      },
      {
        heading: 'Asintoti e comportamento illimitato',
        body: [
          'Gli asintoti verticali in x = π/2 + nπ sono la caratteristica pi\u00f9 sorprendente di tan(x): avvicinandosi da sinistra la curva tende a +∞, da destra a −∞. La funzione \u00e8 continua su ciascun intervallo tra asintoti ma ha un salto inevitabile a ogni asintoto — nessuna ridefinizione pu\u00f2 sistemarlo, perch\u00e9 i limiti sinistro e destro discordano. Questo rende la tangente l\u2019esempio scolastico standard di funzione con infiniti asintoti verticali.',
          'A differenza di seno e coseno, la tangente \u00e8 illimitata in entrambe le direzioni: il suo codominio \u00e8 tutti i numeri reali. Vicino a zero si comporta quasi come la retta y = x (l\u2019approssimazione per piccoli angoli tan(x) ≈ x), poi si irripidisce drammaticamente — in x = 1.4 radianti il valore \u00e8 gi\u00e0 circa 5.8, e in 1.57 \u00e8 enorme. La sua derivata, sec²(x) = 1 + tan²(x), \u00e8 sempre almeno 1, a conferma che la curva non si appiattisce mai.',
        ],
      },
      {
        heading: 'Dove compare la tangente',
        body: [
          'La tangente converte angoli in pendenze, quindi compare ovunque l\u2019inclinazione conta: la pendenza di una collina (una pendenza di 45° \u00e8 una pendenza del 100% perch\u00e9 tan(45°) = 1), la matematica delle traiettorie dei proiettili e l\u2019angolo dell\u2019ombra di una meridiana. In analisi, la derivata stessa \u00e8 una pendenza tangente — la retta tangente a una curva in un punto — e l\u2019arcotangente, arctan, \u00e8 come le calcolatrici recuperano gli angoli dalle pendenze, per esempio trovando una direzione da Δy/Δx.',
          'In fisica, tan compare nelle relazioni di fase: l\u2019angolo di fase di un oscillatore forzato soddisfa tan(φ) = (termine di smorzamento)/(termine di rigidezza), e in ottica l\u2019angolo di Brewster obbedisce a tan(θ) = n₂/n₁. Ovunque conti un rapporto tra componente verticale e orizzontale, la tangente \u00e8 il linguaggio naturale.',
        ],
      },
    ],
    keyFacts: [
      'tan(x) = sin(x)/cos(x); dominio: tutti gli x reali tranne π/2 + nπ.',
      'Codominio: tutti i numeri reali — la tangente \u00e8 illimitata sopra e sotto.',
      'Periodo π: tan(x + π) = tan(x); funzione dispari, tan(−x) = −tan(x).',
      'Zeri in x = nπ; asintoti verticali in x = π/2 + nπ.',
      'La derivata \u00e8 sec²(x) = 1 + tan²(x), sempre ≥ 1; vicino a 0, tan(x) ≈ x.',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 tan(x) ha asintoti?',
        a: 'Perch\u00e9 tan(x) = sin(x)/cos(x), e cos(x) = 0 in x = π/2 + nπ. Dividere per valori sempre pi\u00f9 vicini a zero fa crescere il rapporto senza limite, quindi il grafico schizza a ±∞ su entrambi i lati di ciascuno di quei punti. La funzione l\u00ec \u00e8 semplicemente indefinita.',
      },
      {
        q: 'Qual \u00e8 il periodo della tangente?',
        a: 'π, met\u00e0 del periodo di seno e coseno. Aggiungere π all\u2019angolo inverte i segni sia di sin(x) che di cos(x), e le due inversioni si cancellano nel rapporto, quindi tan(x + π) = tan(x). Il grafico ripete il suo motivo di rami ogni π radianti.',
      },
      {
        q: 'La tangente \u00e8 crescente ovunque?',
        a: '\u00c8 crescente su ciascun intervallo tra asintoti consecutivi, ma non \u00e8 crescente come funzione nel suo insieme — salta da +∞ di nuovo gi\u00f9 a −∞ a ogni asintoto. Quindi l\u2019affermazione “tan \u00e8 crescente” \u00e8 vera solo dentro un singolo ramo, come (−π/2, π/2).',
      },
    ],
    related: [
      '/it/math-functions/sine/',
      '/it/math-functions/cosine/',
      '/it/learn/asymptotes-explained/',
      '/it/learn/what-is-a-function/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'quadratic',
    name: 'Quadratica',
    displayName: 'Funzione quadratica',
    notation: 'f(x) = x^2 - 4',
    expression: 'x^2 - 4',
    tagline:
      'La parabola x² − 4: una curva a U con radici in ±2 e punto pi\u00f9 basso in (0, −4).',
    description:
      'Traccia il grafico di f(x) = x² − 4: vertice della parabola, radici ±2, asse di simmetria, valore minimo e quadratiche in fisica e algebra.',
    intro: [
      'La funzione quadratica f(x) = x² − 4 \u00e8 la parabola pi\u00f9 semplice con qualcosa di interessante in corso: attraversa l\u2019asse x due volte, scende sotto di esso e gira attorno a un unico punto pi\u00f9 basso. Elevare al quadrato rende ogni input non negativo, quindi x² \u00e8 minimo in x = 0, e sottrarre 4 fa scivolare l\u2019intera forma a U gi\u00f9 di quattro unit\u00e0. Il risultato \u00e8 una curva simmetrica con vertice in (0, −4), che si apre verso l\u2019alto per sempre.',
      'Le quadratiche sono i cavalli da lavoro dell\u2019algebra: modellano tutto ci\u00f2 in cui una quantit\u00e0 dipende dal quadrato di un\u2019altra — l\u2019area di un quadrato, l\u2019altezza di una palla lanciata nel tempo, il profitto di un\u2019azienda con domanda lineare. L\u2019esempio x² − 4 \u00e8 particolarmente istruttivo perch\u00e9 si fattorizza in modo pulito come (x − 2)(x + 2), quindi le sue intercette x in 2 e −2 si leggono direttamente dall\u2019algebra. Traccialo nella calcolatrice e osserva la simmetria rispetto all\u2019asse y.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 questa quadratica',
        body: [
          'Ogni quadratica ha la forma ax² + bx + c, e il suo grafico \u00e8 sempre una parabola — la forma a U che ottieni elevando al quadrato. Qui a = 1 (positivo, quindi la U si apre verso l\u2019alto), b = 0 (nessuna inclinazione, quindi il vertice sta sull\u2019asse y) e c = −4 (l\u2019intercetta y). La formula del vertice x = −b/(2a) d\u00e0 x = 0, e f(0) = −4, a conferma del minimo in (0, −4).',
          'La fattorizzazione rivela le radici: x² − 4 = (x − 2)(x + 2), una differenza di quadrati, quindi la curva attraversa l\u2019asse x esattamente dove ciascun fattore \u00e8 zero — in x = 2 e x = −2. Tra le radici la funzione \u00e8 negativa (l\u2019avvallamento sotto l\u2019asse); fuori \u00e8 positiva e cresce senza limite. Poich\u00e9 il termine x² domina per |x| grande, entrambi i bracci della parabola puntano a +∞.',
        ],
      },
      {
        heading: 'Simmetria, vertice e tasso di variazione',
        body: [
          'L\u2019asse y \u00e8 l\u2019asse di simmetria della parabola: f(−x) = f(x), quindi la met\u00e0 sinistra rispecchia la destra. Il vertice \u00e8 il punto di svolta della parabola — qui il minimo globale, poich\u00e9 i bracci salgono per sempre. Qualsiasi quadratica ha esattamente un vertice ed esattamente un valore estremo, ed \u00e8 per questo che le quadratiche sono il modello ideale per l\u2019ottimizzazione: profitto massimo, costo minimo, punto pi\u00f9 alto di una traiettoria.',
          'La derivata f′(x) = 2x racconta il resto della storia: negativa per x < 0 (scendendo nel vertice), zero in x = 0 (il fondo piatto), positiva per x > 0 (risalendo). La pendenza stessa cresce linearmente, una derivata seconda costante di 2 — la firma dell\u2019accelerazione costante, ed \u00e8 per questo che la distanza sotto gravit\u00e0 \u00e8 quadratica nel tempo.',
        ],
      },
      {
        heading: 'Dove compaiono le quadratiche',
        body: [
          'Lancia una palla e la sua altezza segue una parabola: h(t) = −4.9t² + v₀t + h₀, la stessa forma di x² − 4 ma capovolta e spostata. Aree e volumi producono quadratiche e cubiche naturalmente — raddoppiare il lato di un quadrato ne quadruplica l\u2019area — e la formula quadratica risolve ogni equazione di questo tipo, inclusa questa: x = ±√4 = ±2.',
          'In economia, il profitto in funzione del prezzo \u00e8 spesso modellato come una parabola che si apre verso il basso (il ricavo sale poi scende mentre il prezzo sale), e il suo vertice d\u00e0 il prezzo ottimale. In statistica, l\u2019adattamento ai minimi quadrati minimizza una funzione di errore quadratica, e la campana della distribuzione normale \u00e8 e^(−x²) — una quadratica all\u2019esponente.',
        ],
      },
    ],
    keyFacts: [
      'Forma fattorizzata: x² − 4 = (x − 2)(x + 2); radici (intercette x) in x = 2 e x = −2.',
      'Vertice (minimo globale) in (0, −4); l\u2019asse di simmetria \u00e8 l\u2019asse y (x = 0).',
      'Dominio: tutti i numeri reali; codominio: y ≥ −4.',
      'Funzione pari: f(−x) = f(x); il grafico si rispecchia rispetto all\u2019asse y.',
      'Intercetta y in (0, −4); la funzione \u00e8 negativa tra le radici e positiva fuori.',
      'Derivata f′(x) = 2x; la pendenza \u00e8 zero al vertice e la derivata seconda \u00e8 la costante 2.',
    ],
    faqs: [
      {
        q: 'Come si trovano le radici di x² − 4?',
        a: 'Fattorizzala come differenza di quadrati: x² − 4 = (x − 2)(x + 2). Un prodotto \u00e8 zero quando un fattore \u00e8 zero, quindi x = 2 o x = −2. Equivalentemente, la formula quadratica d\u00e0 x = (0 ± √(0 + 16))/2 = ±2.',
      },
      {
        q: 'Qual \u00e8 il valore minimo di x² − 4?',
        a: '−4, raggiunto in x = 0. Poich\u00e9 x² ≥ 0 per ogni x reale, sottrarre 4 d\u00e0 x² − 4 ≥ −4, con uguaglianza solo quando x² = 0. Il vertice (0, −4) \u00e8 il punto pi\u00f9 basso della parabola, e la funzione cresce senza limite da entrambi i lati.',
      },
      {
        q: 'Perch\u00e9 il grafico \u00e8 simmetrico?',
        a: 'Perch\u00e9 compaiono solo potenze pari di x: (−x)² − 4 = x² − 4, quindi f(−x) = f(x). Ogni input e il suo opposto danno lo stesso output, il che rispecchia la met\u00e0 destra del grafico rispetto all\u2019asse y sulla met\u00e0 sinistra.',
      },
    ],
    related: [
      '/it/examples/projectile-motion/',
      '/it/math-functions/square-root/',
      '/it/math-functions/absolute-value/',
      '/it/learn/understanding-derivatives/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'cubic',
    name: 'Cubica',
    displayName: 'Funzione cubica',
    notation: 'f(x) = x^3 - 3*x',
    expression: 'x^3 - 3*x',
    tagline:
      'Una cubica a forma di S con tre radici reali, una collina e una valle locali, e simmetria rotazionale di 180°.',
    description:
      'Traccia il grafico di f(x) = x³ − 3x: tre radici reali, max e min locale, punto di flesso e legame con la trigonometria dell\u2019angolo triplo.',
    intro: [
      'La cubica f(x) = x³ − 3x traccia una S allungata: sale da −∞, raggiunge la cresta di una piccola collina in (−1, 2), scende attraverso l\u2019origine in una valle in (1, −2) e si arrampica via verso +∞. A differenza di una parabola non ha massimo o minimo globale — il termine x³ alla fine travolge tutto, trascinando il braccio sinistro gi\u00f9 per sempre e quello destro su per sempre. Tra gli estremi, la curva attraversa l\u2019asse x tre volte, in −√3, 0 e √3.',
      'Questa particolare cubica \u00e8 una favorita nei libri di testo perch\u00e9 tutto di essa si pu\u00f2 calcolare a mano: le sue radici si fattorizzano via x(x² − 3), i suoi punti di svolta vengono dalla pulita derivata 3x² − 3, e nasconde una bellissima connessione con la trigonometria dell\u2019angolo triplo. Le cubiche modellano la crescita dei volumi, le equazioni di stato cubiche e qualsiasi relazione in cui conta il cubo di una quantit\u00e0. Traccia x^3 - 3*x nella calcolatrice e allontana lo zoom per vedere la S raddrizzarsi nel suo ripido comportamento agli estremi.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 questa cubica',
        body: [
          'Raccogli x e le radici appaiono: x³ − 3x = x(x² − 3) = x(x − √3)(x + √3), quindi il grafico attraversa l\u2019asse x in −√3 ≈ −1.732, 0 e √3 ≈ 1.732. Tre radici reali \u00e8 il massimo che una cubica pu\u00f2 mostrare come attraversamenti distinti — il grado della funzione fissa il massimo. Tra radici consecutive la curva deve girarsi, ed \u00e8 esattamente ci\u00f2 che fanno la collina e la valle.',
          'Il comportamento agli estremi \u00e8 dettato dal solo x³: mentre x → +∞ la funzione → +∞, e mentre x → −∞ essa → −∞. Il termine −3x modella solo il centro del grafico, scavando l\u2019oscillazione. Ogni polinomio di grado dispari condivide questo comportamento a estremi opposti, che garantisce almeno una radice reale — la curva deve attraversare l\u2019asse per andare da −∞ a +∞.',
        ],
      },
      {
        heading: 'Punti di svolta e punto di flesso',
        body: [
          'La derivata f′(x) = 3x² − 3 = 3(x − 1)(x + 1) si annulla in x = ±1, segnando i due punti di svolta: un massimo locale in (−1, 2) e un minimo locale in (1, −2). La funzione sale fino a x = −1, scende fino a x = 1, poi sale per sempre — il classico su-gi\u00f9-su di una cubica con due punti critici. Questi sono solo estremi locali; il comportamento globale \u00e8 illimitato in entrambe le direzioni.',
          'A met\u00e0 strada tra loro, in (0, 0), siede il punto di flesso, dove la curva cambia da concava verso il basso a concava verso l\u2019alto. La derivata seconda f″(x) = 6x lo conferma: negativa a sinistra di 0, positiva a destra di 0, zero esattamente nell\u2019origine. Poich\u00e9 la cubica \u00e8 una funzione dispari, il punto di flesso \u00e8 anche il centro della sua simmetria rotazionale di 180° — ruota il grafico di mezzo giro attorno a (0, 0) e si mappa su s\u00e9 stesso.',
        ],
      },
      {
        heading: 'Un\u2019identit\u00e0 trigonometrica nascosta',
        body: [
          'Ecco la sorpresa per cui questa cubica \u00e8 famosa: sostituendo x = 2cos θ si ottiene x³ − 3x = 2cos(3θ). Puoi verificarlo dalla formula dell\u2019angolo triplo cos(3θ) = 4cos³θ − 3cos θ: con x = 2cos θ, il lato sinistro diventa 8cos³θ − 6cos θ = 2(4cos³θ − 3cos θ) = 2cos(3θ). La cubica \u00e8 segretamente un angolo triplicato sotto mentite spoglie.',
          'Questa identit\u00e0 \u00e8 pi\u00f9 di una curiosit\u00e0 — \u00e8 la chiave per risolvere trigonometricamente le equazioni cubiche. Una cubica con tre radici reali, come questa, pu\u00f2 essere risolta scrivendo le sue radici come coseni scalati di angoli opportuni, un metodo che risale a Viète. Spiega anche perch\u00e9 la collina e la valle hanno le altezze esatte ±2: sono 2cos(3θ) valutato ai suoi stessi picchi.',
        ],
      },
    ],
    keyFacts: [
      'Fattorizzata: x(x − √3)(x + √3); tre radici reali in x = −√3, 0 e √3.',
      'Massimo locale in (−1, 2); minimo locale in (1, −2); nessun max o min globale.',
      'Punto di flesso in (0, 0); funzione dispari con simmetria rotazionale di 180° attorno all\u2019origine.',
      'Dominio e codominio: tutti i numeri reali.',
      'Comportamento agli estremi: f(x) → −∞ mentre x → −∞ e f(x) → +∞ mentre x → +∞.',
      'Identit\u00e0: con x = 2cos θ, x³ − 3x = 2cos(3θ).',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 x³ − 3x attraversa l\u2019asse x tre volte?',
        a: 'La sua forma fattorizzata x(x − √3)(x + √3) mostra tre fattori lineari distinti, ciascuno con uno zero: x = 0, x = √3 e x = −√3. Un polinomio di grado 3 pu\u00f2 avere al massimo tre radici reali, e questo raggiunge il massimo. Tra ciascuna coppia di radici i punti di svolta della derivata costringono la curva a invertire direzione.',
      },
      {
        q: 'Quali sono il max e il min locale?',
        a: 'Risolvi f′(x) = 3x² − 3 = 0 per ottenere x = ±1. Poi f(−1) = −1 + 3 = 2 \u00e8 il massimo locale e f(1) = 1 − 3 = −2 \u00e8 il minimo locale. Sono “locali” perch\u00e9 la funzione supera qualsiasi limite molto a destra e scende sotto qualsiasi limite molto a sinistra.',
      },
      {
        q: 'Cosa c\u2019entra questa cubica con la trigonometria?',
        a: 'L\u2019identit\u00e0 x³ − 3x = 2cos(3θ) sotto la sostituzione x = 2cos θ lega la cubica alle formule dell\u2019angolo triplo. Storicamente questa connessione diede un metodo trigonometrico per risolvere le cubiche con tre radici reali — il “casus irreducibilis” che lasci\u00f2 perplessi gli algebristi del XVI secolo.',
      },
    ],
    related: [
      '/it/math-functions/quadratic/',
      '/it/learn/understanding-derivatives/',
      '/it/learn/what-is-a-function/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'exponential',
    name: 'Esponenziale',
    displayName: 'Funzione esponenziale',
    notation: 'f(x) = e^x',
    expression: 'e^x',
    tagline:
      'La funzione che \u00e8 la propria derivata — crescita relativa costante, sempre crescente, mai tocca lo zero.',
    description:
      'Traccia il grafico di f(x) = eˣ: crescita relativa costante, asintoto orizzontale y = 0, punto (0, 1) e modelli esponenziali in scienza e finanza.',
    intro: [
      'La funzione esponenziale f(x) = eˣ \u00e8 l\u2019incarnazione matematica della crescita proporzionale alla dimensione: denaro che matura interessi composti, batteri che si raddoppiano in una piastra, o una voce che si diffonde tra la folla. La sua propriet\u00e0 definitoria \u00e8 che il suo tasso di variazione uguaglia il suo valore corrente — d/dx eˣ = eˣ — ed \u00e8 per questo che compare ogni volta che il tasso di crescita di una quantit\u00e0 \u00e8 proporzionale alla quantit\u00e0 stessa. La base e ≈ 2.71828 \u00e8 l\u2019unico numero che rende possibile questo.',
      'Il grafico racconta la storia a colpo d\u2019occhio: passa per (0, 1), striscia quasi piatto lungo l\u2019asse x per x molto negativo (avvicinandosi ma senza mai raggiungere lo 0), poi si piega verso l\u2019alto e sale sempre pi\u00f9 ripidamente per x positivo. In x = 1 vale e ≈ 2.718, in x = 2 \u00e8 e² ≈ 7.389, e ogni passo unitario moltiplica il valore per un altro fattore e. Digita e^x nella calcolatrice e confrontalo con 2^x per vedere come la base controlla la ripidit\u00e0.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 la funzione esponenziale',
        body: [
          'La moltiplicazione ripetuta \u00e8 il cuore di eˣ: e³ significa e·e·e, e le leggi degli esponenti e^(a+b) = e^a·e^b estendono questo a tutte le potenze reali, incluse frazioni e negativi (e^(−x) = 1/eˣ). Il numero e stesso pu\u00f2 essere definito come il limite di (1 + 1/n)ⁿ mentre n cresce — il risultato di capitalizzare un interesse del 100% su infiniti periodi — o come la somma infinita 1 + 1 + 1/2! + 1/3! + ⋯.',
          'Ci\u00f2 che rende e speciale tra tutte le basi \u00e8 la derivata: d/dx aˣ = aˣ·ln(a), e solo per a = e il fattore ln vale 1, lasciando la funzione invariata dalla derivazione. Equivalentemente, eˣ \u00e8 l\u2019unica funzione che soddisfa f′ = f con f(0) = 1. \u00c8 per questo che e \u00e8 chiamata base naturale — l\u2019analisi la individua.',
        ],
      },
      {
        heading: 'Forma, asintoto e crescita',
        body: [
          'Per x < 0 il grafico abbraccia l\u2019asse x dall\u2019alto, decadendo verso 0 senza mai toccarlo — l\u2019asintoto orizzontale y = 0 mentre x → −∞. In x = 0 la curva passa per (0, 1), la sua intercetta y, e per x > 0 accelera verso l\u2019alto, convessa ovunque (derivata seconda eˣ > 0) e crescente ovunque (derivata prima eˣ > 0). Niente zeri, niente punti di svolta, niente punti di flesso: solo crescita implacabile, liscia e incurvata verso l\u2019alto.',
          'La crescita esponenziale alla fine supera qualsiasi polinomio: eˣ cresce pi\u00f9 in fretta di x¹⁰⁰, pi\u00f9 in fretta di qualsiasi potenza fissa. \u00c8 per questo che gli esponenziali modellano processi incontrollati — reazioni a catena, diffusione virale nella sua fase iniziale — e anche perch\u00e9 le loro inverse, i logaritmi, crescono cos\u00ec lentamente. Su scala logaritmica, eˣ diventa la retta y = x, un modo pratico per individuare dati esponenziali.',
        ],
      },
      {
        heading: 'Dove compaiono gli esponenziali',
        body: [
          'Qualsiasi equazione differenziale della forma dy/dx = ky ha soluzione y = Ce^(kx): la legge di raffreddamento di Newton, il decadimento radioattivo (con k < 0), l\u2019interesse composto continuo e la crescita delle popolazioni la seguono. La campana della distribuzione normale, (1/√(2π))e^(−x²/2), mette un esponenziale di una quadratica al centro della statistica. In analisi complessa, la formula di Eulero e^(iθ) = cos θ + i·sin θ fonde esponenziali e trigonometria e alimenta tutta la teoria dei circuiti AC e la meccanica quantistica.',
          'In informatica, gli esponenziali tagliano in entrambi i sensi: gli algoritmi con complessit\u00e0 temporale esponenziale diventano impraticabili mentre gli input crescono, mentre il backoff esponenziale — attendere 1, 2, 4, 8… secondi tra i tentativi — \u00e8 la cura standard per i server sovraccarichi. La curva logistica, eˣ/(1 + eˣ), doma la pura crescita esponenziale con una capacit\u00e0 portante e modella tutto, dalle epidemie alle attivazioni delle reti neurali.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: tutti i numeri reali; codominio: y > 0 — eˣ non \u00e8 mai zero n\u00e9 negativa.',
      'Intercetta y in (0, 1); asintoto orizzontale y = 0 mentre x → −∞.',
      'Strettamente crescente e convessa ovunque; nessun massimo, minimo o punto di flesso.',
      '\u00c8 la propria derivata: d/dx eˣ = eˣ; una primitiva \u00e8 eˣ stessa.',
      'Leggi degli esponenti: e^(a+b) = e^a·e^b, e^(−x) = 1/eˣ, (eˣ)^n = e^(nx).',
      'e ≈ 2.71828; eˣ supera ogni polinomio mentre x → ∞.',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 eˣ \u00e8 la propria derivata?',
        a: 'Per definizione e \u00e8 l\u2019unica base per cui d/dx aˣ = aˣ·ln(a) ha ln(a) = 1. Derivare eˣ con la definizione di limite d\u00e0 eˣ per il limite di (e^h − 1)/h, ed e \u00e8 definito precisamente come il numero che rende quel limite uguale a 1. Quindi la pendenza del grafico in ciascun punto uguaglia l\u2019altezza della funzione l\u00ec.',
      },
      {
        q: 'Cos\u2019\u00e8 e, esattamente?',
        a: 'Un numero irrazionale circa 2.71828, definibile come il limite di (1 + 1/n)ⁿ mentre n → ∞ o la somma 1 + 1 + 1/2! + 1/3! + ⋯. Come π, la sua espansione decimale non si ripete mai. \u00c8 la base “naturale” perch\u00e9 l\u2019analisi assume con essa la sua forma pi\u00f9 semplice.',
      },
      {
        q: 'eˣ raggiunge mai lo zero?',
        a: 'No. Per x reale, eˣ > 0 sempre — il grafico si avvicina all\u2019asse x asintoticamente mentre x → −∞ ma non lo tocca mai. Questo segue da eˣ·e^(−x) = e^0 = 1: se eˣ fosse zero, il prodotto non potrebbe essere 1.',
      },
    ],
    related: [
      '/it/math-functions/natural-logarithm/',
      '/it/examples/logistic-growth/',
      '/it/learn/understanding-derivatives/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'natural-logarithm',
    name: 'Logaritmo naturale',
    displayName: 'Funzione logaritmo naturale',
    notation: 'f(x) = log(x)',
    expression: 'log(x)',
    tagline:
      'L\u2019inversa di eˣ — srotola la crescita esponenziale, trasformando la moltiplicazione in addizione.',
    description:
      'Traccia il grafico di f(x) = ln(x): dominio x > 0, asintoto in x = 0, leggi dei logaritmi, inversa di eˣ e usi dal pH agli algoritmi.',
    intro: [
      'Il logaritmo naturale, scritto ln(x) o log(x), risponde alla domanda “e a quale potenza d\u00e0 x?” \u00c8 l\u2019esatta inversa della funzione esponenziale: ln(eˣ) = x ed e^(ln x) = x, quindi il suo grafico \u00e8 l\u2019immagine speculare di y = eˣ riflessa sulla retta y = x. Dove l\u2019esponenziale schizza verso l\u2019alto, il logaritmo sale con esasperante lentezza — ln(10) ≈ 2.303, ln(100) ≈ 4.605, ln(1,000,000) ≈ 13.816 — ogni aumento di dieci volte di x aggiunge solo circa 2.303 all\u2019output.',
      'Quella lenta crescita \u00e8 precisamente il punto: i logaritmi comprimono intervalli enormi in intervalli gestibili, ed \u00e8 per questo che la scala Richter, i decibel e il pH sono tutti logaritmici. Il grafico passa per (1, 0), sale per x > 1, precipita a −∞ mentre x si avvicina a 0 da destra (l\u2019asintoto verticale in x = 0), ed \u00e8 indefinito per x ≤ 0 — non puoi elevare e a nessuna potenza reale e ottenere zero o un numero negativo. Digita log(x) nella calcolatrice accanto a e^x per vedere la simmetria speculare.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 il logaritmo naturale',
        body: [
          'I logaritmi furono inventati per trasformare la moltiplicazione in addizione: ln(ab) = ln(a) + ln(b). Prima delle calcolatrici elettroniche, gli scienziati moltiplicavano grandi numeri cercando i loro logaritmi, sommandoli e riconvertendo — il regolo calcolatore \u00e8 un\u2019incarnazione fisica di questa idea. Il “naturale” nel nome si riferisce alla base e, la base che rende pulita l\u2019analisi: d/dx ln(x) = 1/x, la derivata pi\u00f9 semplice possibile per un\u2019inversa esponenziale.',
          'Le tre leggi dei logaritmi seguono dalle leggi degli esponenti della sua inversa: ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b e ln(a^b) = b·ln a. Insieme permettono di smontare complicate espressioni moltiplicative in somme — il motivo per cui i logaritmi compaiono nelle formule di entropia, nei calcoli di verosimiglianza e ovunque i prodotti diventino ingestibili.',
        ],
      },
      {
        heading: 'Dominio, asintoto e forma',
        body: [
          'Il dominio \u00e8 solo x > 0, conseguenza diretta di eˣ > 0: non esiste una potenza reale di e che dia zero o un numero negativo, quindi il logaritmo non pu\u00f2 accettarli. Mentre x → 0⁺, ln(x) → −∞, dando l\u2019asintoto verticale x = 0 (l\u2019asse y) — lo specchio dell\u2019asintoto orizzontale dell\u2019esponenziale. L\u2019intercetta x \u00e8 in (1, 0) poich\u00e9 e^0 = 1, lo specchio dell\u2019intercetta y di eˣ in (0, 1).',
          'La curva \u00e8 crescente ovunque (derivata 1/x > 0 per x > 0) ma concava verso il basso ovunque (derivata seconda −1/x² < 0): sale rapidamente appena a destra dello zero, poi si appiattisce inesorabilmente. Non ha massimo n\u00e9 punto di flesso, ed \u00e8 la primitiva di 1/x — l\u2019integrale che nessuna regola delle potenze pu\u00f2 gestire, poich\u00e9 ∫xⁿ dx fallisce in n = −1.',
        ],
      },
      {
        heading: 'Dove compaiono i logaritmi',
        body: [
          'Le scale logaritmiche misurano fenomeni che abbracciano molti ordini di grandezza: ogni punto Richter \u00e8 circa 32× l\u2019energia, ogni unit\u00e0 di pH \u00e8 10× l\u2019acidit\u00e0, e i decibel comprimono intensit\u00e0 sonore da un sussurro a un motore a reazione in un intervallo 0–140. In teoria dell\u2019informazione, l\u2019entropia si misura in nat (log naturale) o bit (log base 2), quantificando sorpresa e lunghezze ottimali dei codici.',
          'In informatica, gli algoritmi O(log n) — la ricerca binaria \u00e8 il classico — dimezzano il problema a ogni passo, quindi raddoppiare l\u2019input aggiunge solo un passo in pi\u00f9; quella \u00e8 la crescita logaritmica in azione. In statistica, prendere i log raddrizza dati esponenziali in rette, e la distribuzione log-normale modella quantit\u00e0 come redditi e dimensioni di particelle che si moltiplicano invece di sommarsi.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: x > 0; codominio: tutti i numeri reali. Indefinito per x ≤ 0.',
      'Inversa di eˣ: ln(eˣ) = x ed e^(ln x) = x; i grafici si rispecchiano su y = x.',
      'Intercetta x in (1, 0); asintoto verticale x = 0 con ln(x) → −∞ mentre x → 0⁺.',
      'Leggi dei logaritmi: ln(ab) = ln a + ln b; ln(a/b) = ln a − ln b; ln(a^b) = b·ln a.',
      'Derivata d/dx ln(x) = 1/x; ln \u00e8 la primitiva di 1/x.',
      'Crescente e concava verso il basso su tutto il dominio; nessun massimo, minimo o punto di flesso.',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 ln(x) \u00e8 indefinito per x negativi?',
        a: 'Perch\u00e9 ln(x) chiede “e a quale potenza uguaglia x?”, ed e elevato a qualsiasi potenza reale \u00e8 sempre positivo. Nessun esponente reale produce zero o un numero negativo, quindi il logaritmo non ha valore reale l\u00ec. (Esistono logaritmi complessi ma sono multivalore e oltre questo grafico a valori reali.)',
      },
      {
        q: 'Qual \u00e8 la differenza tra ln(x) e log₁₀(x)?',
        a: 'Solo la base: ln usa e ≈ 2.718, log₁₀ usa 10. Sono proporzionali — ln(x) = ln(10)·log₁₀(x) ≈ 2.303·log₁₀(x) — quindi i loro grafici hanno forme identiche, solo scale verticali diverse. I logaritmi naturali danno l\u2019analisi pi\u00f9 pulita (derivata 1/x); i logaritmi in base 10 si adattano alle misure in scala decimale.',
      },
      {
        q: 'Perch\u00e9 il grafico si appiattisce cos\u00ec tanto?',
        a: 'Perch\u00e9 disfare la crescita esponenziale \u00e8 intrinsecamente lento: per aumentare ln(x) di 1 devi moltiplicare x per e ≈ 2.718. La derivata 1/x si restringe mentre x cresce, quindi ogni ulteriore unit\u00e0 di altezza richiede un multiplo sempre pi\u00f9 grande di x. Quell\u2019appiattimento \u00e8 esattamente ci\u00f2 che rende i logaritmi ideali per comprimere intervalli enormi.',
      },
    ],
    related: [
      '/it/math-functions/exponential/',
      '/it/learn/understanding-integrals/',
      '/it/learn/understanding-derivatives/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'square-root',
    name: 'Radice quadrata',
    displayName: 'Funzione radice quadrata',
    notation: 'f(x) = sqrt(x)',
    expression: 'sqrt(x)',
    tagline:
      'La dolce mezza parabola — l\u2019inversa dell\u2019elevamento al quadrato, definita per x ≥ 0.',
    description:
      'Traccia il grafico di f(x) = √x: dominio x ≥ 0, forma a mezza parabola, punti (0,0) e (4,2) e radici quadrate in distanza e geometria.',
    intro: [
      'La funzione radice quadrata f(x) = √x risponde a “quale numero non negativo, moltiplicato per s\u00e9 stesso, d\u00e0 x?” Il suo grafico \u00e8 la met\u00e0 superiore di una parabola sdraiata: partendo dall\u2019origine, sale ripidamente — con una tangente verticale — poi si piega e si appiattisce, passando per (1, 1), (4, 2) e (9, 3). \u00c8 l\u2019inversa di x² ristretta a x ≥ 0, quindi il suo grafico \u00e8 lo specchio della met\u00e0 destra della parabola y = x² riflessa sulla retta y = x.',
      'Le radici quadrate compaiono ovunque compare Pitagora: la formula della distanza √((Δx)² + (Δy)²) \u00e8 una radice quadrata, e cos\u00ec la deviazione standard, il termine discriminante della formula quadratica e la radice della media dei quadrati dietro le tensioni AC nominali. La funzione cresce senza limite ma sempre pi\u00f9 lentamente — √1,000,000 \u00e8 solo 1,000. Digita sqrt(x) nella calcolatrice e traccia x^2 su [0, ∞) accanto per vedere la simmetria speculare.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 la radice quadrata',
        body: [
          'Il simbolo √ denota la radice quadrata principale (non negativa): √9 = 3, non ±3, perch\u00e9 una funzione deve dare un output per input. L\u2019equazione x² = 9 ha due soluzioni, ±3, ma la funzione √x restituisce solo quella non negativa — il ± appartiene alla risoluzione di equazioni, non alla funzione. Questa univalenza \u00e8 ci\u00f2 che rende √x derivabile e tracciabile come un\u2019unica curva pulita.',
          'Algebricamente, √(x²) = |x|, non x — la radice disfa il quadrato ma ripristina la non negativit\u00e0, ed \u00e8 per questo che compare la funzione valore assoluto. La radice obbedisce anche a √(ab) = √a·√b e √(a/b) = √a/√b per a, b non negativi, le leggi moltiplicative ereditate dagli esponenti poich\u00e9 √x = x^(1/2).',
        ],
      },
      {
        heading: 'Dominio, forma e tangente verticale',
        body: [
          'Il dominio \u00e8 x ≥ 0: nessun numero reale al quadrato d\u00e0 un negativo, quindi la funzione non pu\u00f2 accettare input negativi (sui reali). In x = 0 il grafico parte con una tangente verticale — la derivata 1/(2√x) esplode a +∞ — cosa che puoi vedere come la curva che lascia l\u2019origine dritta verso l\u2019alto prima di piegarsi a destra. \u00c8 crescente ovunque sul suo dominio e concava verso il basso ovunque, appiattendosi mentre x cresce.',
          'Il codominio \u00e8 y ≥ 0, e i punti notevoli sono i quadrati perfetti: (0, 0), (1, 1), (4, 2), (9, 3), (16, 4). Tra loro la curva interpola lisciamente — √2 ≈ 1.414, il famoso irrazionale la cui scoperta scosse la matematica pitagorica. La funzione non ha massimo e il suo unico estremo di bordo \u00e8 il minimo 0 in x = 0.',
        ],
      },
      {
        heading: 'Dove compaiono le radici quadrate',
        body: [
          'La distanza \u00e8 il territorio domestico della radice quadrata: dall\u2019ipotenusa di Pitagora alla formula della distanza n-dimensionale alla deviazione standard (la radice quadrata della varianza), “eleva al quadrato, somma, radice” \u00e8 uno dei motivi pi\u00f9 ripetuti della matematica. La formula quadratica x = (−b ± √(b² − 4ac))/(2a) mette una radice quadrata al cuore della risoluzione delle quadratiche — incluso trovare dove x² − 4 attraversa lo zero.',
          'In fisica, molte leggi coinvolgono radici quadrate: il periodo di un pendolo \u00e8 proporzionale a √(lunghezza), la velocit\u00e0 di fuga a √(1/raggio), e la tensione RMS della rete AC \u00e8 la tensione di picco divisa per √2. In geometria, √2 \u00e8 la diagonale di un quadrato unitario e il rapporto d\u2019aspetto della carta in formato A.',
        ],
      },
    ],
    keyFacts: [
      'Radice principale: √x ≥ 0 per ogni x nel dominio; √9 = 3, non ±3.',
      'Dominio: x ≥ 0; codominio: y ≥ 0. Indefinita per x negativi (sui reali).',
      'Inversa di x² su [0, ∞): √(x²) = |x|, e (√x)² = x per x ≥ 0.',
      'Punti chiave: (0, 0), (1, 1), (4, 2), (9, 3); tangente verticale nell\u2019origine.',
      'Crescente e concava verso il basso sul suo dominio; minimo 0 in x = 0, nessun massimo.',
      'Derivata d/dx √x = 1/(2√x); leggi √(ab) = √a·√b per a, b ≥ 0.',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 √9 non \u00e8 uguale a ±3?',
        a: 'Perch\u00e9 √ denota una funzione, e le funzioni restituiscono esattamente un valore per input — per convenzione la radice non negativa. L\u2019equazione x² = 9 ha effettivamente due soluzioni, x = 3 e x = −3, ma solo 3 \u00e8 √9. Scrivere ±√9 recupera entrambe le soluzioni quando risolvi.',
      },
      {
        q: 'Perch\u00e9 non puoi fare la radice quadrata di un numero negativo (nei reali)?',
        a: 'Perch\u00e9 ogni numero reale al quadrato \u00e8 non negativo: i positivi danno quadrati positivi, i negativi danno quadrati positivi, e lo zero d\u00e0 zero. Niente di reale al quadrato d\u00e0 −1, quindi √(−1) non ha valore reale. Estendere il sistema numerico con i, dove i² = −1, d\u00e0 radici quadrate complesse.',
      },
      {
        q: 'Qual \u00e8 la derivata di √x in x = 0?',
        a: 'Non esiste — la derivata 1/(2√x) tende a +∞ mentre x → 0⁺, quindi il grafico ha una tangente verticale nell\u2019origine. Geometricamente la curva lascia (0, 0) puntando dritta verso l\u2019alto; non c\u2019\u00e8 una pendenza finita l\u00ec, sebbene la funzione stessa sia continua in 0.',
      },
    ],
    related: [
      '/it/math-functions/quadratic/',
      '/it/math-functions/absolute-value/',
      '/it/learn/what-is-a-function/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'absolute-value',
    name: 'Valore assoluto',
    displayName: 'Funzione valore assoluto',
    notation: 'f(x) = abs(x)',
    expression: 'abs(x)',
    tagline:
      'La misura a V della distanza da zero — semplice, simmetrica, con un punto angoloso nell\u2019origine.',
    description:
      'Traccia il grafico di f(x) = |x|: grafico a V, punto angoloso nell\u2019origine, significato di distanza, definizione a tratti e margini di errore.',
    intro: [
      'La funzione valore assoluto f(x) = |x| \u00e8 la distanza resa visibile: |x| \u00e8 quanto x dista dallo zero sulla retta numerica, indipendentemente dalla direzione. Il suo grafico \u00e8 una V perfetta — la retta y = −x per gli input negativi che incontra la retta y = x per quelli positivi nel punto angoloso tagliente (0, 0). Quel punto angoloso \u00e8 la caratteristica pi\u00f9 famosa della funzione: l\u2019unico punto in cui \u00e8 continua ma non derivabile, dove la pendenza salta da −1 a 1.',
      'Il valore assoluto compare ovunque la grandezza conta pi\u00f9 del segno: margini di errore (|misurato − vero| < tolleranza), tolleranze in produzione, la distanza tra due numeri (|a − b|) e definizioni a tratti in tutta la matematica applicata. \u00c8 anche l\u2019esempio pi\u00f9 semplice di funzione costruita incollando due formule. Digita abs(x) nella calcolatrice, poi prova abs(x - 3) per guardare la V scivolare e vedere la distanza-da-3 disegnata come grafico.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 il valore assoluto',
        body: [
          'La definizione \u00e8 a tratti: |x| = x quando x ≥ 0 e |x| = −x quando x < 0 — il segno meno ribalta i negativi in positivi. Quindi |5| = 5 e |−5| = −(−5) = 5. Equivalentemente, |x| = √(x²), il che mostra perch\u00e9 l\u2019output non \u00e8 mai negativo: elevare al quadrato cancella il segno e la radice principale lo mantiene cancellato. Entrambe le forme dicono la stessa cosa: grandezza senza direzione.',
          'Questo rende |x − a| la distanza tra x e a, l\u2019interpretazione da cavallo da lavoro. La disequazione |x − 3| < 2 descrive tutti i punti entro 2 unit\u00e0 da 3, cio\u00e8 l\u2019intervallo aperto (1, 5) — il valore assoluto converte il linguaggio della distanza in algebra e viceversa. \u00c8 una funzione pari, |−x| = |x|, quindi la V si rispecchia perfettamente rispetto all\u2019asse y.',
        ],
      },
      {
        heading: 'Il punto angoloso nell\u2019origine',
        body: [
          'In x = 0 i due bracci della V si incontrano ad angolo, e quell\u2019angolo \u00e8 una genuina singolarit\u00e0 di liscezza: avvicinandosi da sinistra la pendenza \u00e8 −1, da destra \u00e8 +1, quindi non esiste un\u2019unica retta tangente. La funzione \u00e8 continua in 0 — i bracci si uniscono senza buco — ma non derivabile l\u00ec, il controesempio standard che separa i due concetti in ogni corso di analisi.',
          'Lontano dal punto angoloso tutto \u00e8 docile: la derivata \u00e8 −1 per x < 0 e +1 per x > 0, spesso scritta come funzione segno, e la derivata seconda \u00e8 0 dove esiste. La V ha il suo minimo globale di 0 in x = 0 e nessun massimo; entrambi i bracci salgono a +∞ con pendenza costante, senza mai piegarsi.',
        ],
      },
      {
        heading: 'Dove compare il valore assoluto',
        body: [
          'L\u2019analisi degli errori gira sul valore assoluto: “entro 0.5 dal valore vero” \u00e8 |errore| < 0.5, e i metodi numerici si fermano quando approssimazioni successive soddisfano |xₙ₊₁ − xₙ| < tolleranza. In statistica, la deviazione media assoluta misura la dispersione senza elevare al quadrato, restando nelle unit\u00e0 originali e resistendo agli outlier meglio della varianza.',
          'In ottimizzazione e machine learning, il valore assoluto \u00e8 la penalit\u00e0 L1: minimizzare somme di |·| incoraggia la sparsit\u00e0 (molti zeri esatti), a differenza della penalit\u00e0 L2 al quadrato. I modelli lineari a tratti, dalle fasce fiscali alle reti neurali ReLU (max(0, x) = (x + |x|)/2), sono costruiti da punti angolosi tipo valore assoluto — il gomito in zero \u00e8 una caratteristica, non un bug.',
        ],
      },
    ],
    keyFacts: [
      'Definizione a tratti: |x| = x per x ≥ 0, |x| = −x per x < 0; equivalentemente |x| = √(x²).',
      'Dominio: tutti i numeri reali; codominio: y ≥ 0.',
      'Grafico a V con vertice (punto angoloso) in (0, 0); funzione pari, simmetrica rispetto all\u2019asse y.',
      'Continua ovunque ma non derivabile in x = 0 (la pendenza salta da −1 a 1).',
      '|x − a| \u00e8 la distanza tra x e a; minimo globale 0 in x = 0, nessun massimo.',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 |x| non \u00e8 derivabile in 0?',
        a: 'La derivabilit\u00e0 in un punto richiede che le pendenze da entrambi i lati concordino. Per |x|, la pendenza da sinistra \u00e8 −1 e quella da destra \u00e8 +1 — discordano, quindi non esiste retta tangente nel punto angoloso. La funzione \u00e8 comunque continua l\u00ec; ha solo un gomito.',
      },
      {
        q: 'Qual \u00e8 la differenza tra |x| e √(x²)?',
        a: 'Nessuna — sono la stessa funzione. Elevare al quadrato rimuove il segno di x e la radice quadrata principale restituisce il risultato non negativo, che \u00e8 esattamente il valore assoluto. L\u2019identit\u00e0 |x| = √(x²) \u00e8 spesso usata per derivare |x| lontano dallo zero.',
      },
      {
        q: 'Come si risolve |x − 3| = 5?',
        a: 'Leggila come “la distanza da x a 3 \u00e8 5”, dando x = 3 + 5 = 8 o x = 3 − 5 = −2. Algebricamente, dividi in casi: x − 3 = 5 d\u00e0 x = 8, e x − 3 = −5 d\u00e0 x = −2. Entrambe verificano: |8 − 3| = 5 e |−2 − 3| = 5.',
      },
    ],
    related: [
      '/it/math-functions/square-root/',
      '/it/learn/what-is-a-function/',
      '/it/math-functions/quadratic/',
      '/it/graphing-calculator/',
    ],
  },
  {
    slug: 'reciprocal',
    name: 'Reciproco',
    displayName: 'Funzione reciproca',
    notation: 'f(x) = 1/x',
    expression: '1/x',
    tagline: 'L\u2019iperbole 1/x — due rami speculari divisi da asintoti su entrambi gli assi.',
    description:
      'Traccia il grafico di f(x) = 1/x: i due rami dell\u2019iperbole, asintoti su entrambi gli assi, simmetria dispari e proporzionalità inversa.',
    intro: [
      'La funzione reciproca f(x) = 1/x \u00e8 il grafico della proporzionalit\u00e0 inversa: raddoppia l\u2019input, dimezza l\u2019output. Il suo grafico \u00e8 un\u2019iperbole con due rami — uno nel primo quadrante che spazza da +∞ gi\u00f9 verso l\u2019asse x, uno nel terzo quadrante che sale da −∞ su verso di esso — separati da un varco invalicabile in x = 0. La curva non tocca mai nessuno dei due assi: l\u2019asse y (x = 0) \u00e8 un asintoto verticale e l\u2019asse x (y = 0) \u00e8 orizzontale.',
      'Ovunque una quantit\u00e0 sia divisa per un\u2019altra, il reciproco \u00e8 in agguato: a tensione fissa, la corrente \u00e8 proporzionale a 1/R (legge di Ohm); a quantit\u00e0 di gas fissa, la pressione \u00e8 proporzionale a 1/V (legge di Boyle); il tempo per completare un lavoro \u00e8 proporzionale a 1/(lavoratori). La funzione \u00e8 la propria inversa — applicarla due volte restituisce x — e dispari, con simmetria rotazionale di 180° attorno all\u2019origine. Digita 1/x nella calcolatrice e allontana lo zoom: i rami si appiattiscono contro gli assi ma non atterrano mai.',
    ],
    sections: [
      {
        heading: 'Cos\u2019\u00e8 il reciproco',
        body: [
          'Fare il reciproco significa dividere 1 per l\u2019input: 1/2 = 0.5, 1/4 = 0.25, 1/0.5 = 2. Input piccoli producono output enormi e input enormi producono output minuscoli — l\u2019altalena definitoria della proporzionalit\u00e0 inversa. Poich\u00e9 1/(1/x) = x, la funzione \u00e8 un\u2019involuzione: disfa s\u00e9 stessa, quindi il suo grafico \u00e8 simmetrico rispetto alla retta y = x, il marchio delle funzioni inverse.',
          'La funzione \u00e8 dispari, f(−x) = −f(x): il ramo del terzo quadrante \u00e8 il ramo del primo ruotato di 180° attorno all\u2019origine. I punti notevoli sono (1, 1) e (−1, −1), gli unici punti in cui input e output coincidono (risolvere 1/x = x d\u00e0 x² = 1). Ovunque altrove, input e output differiscono — drammaticamente vicino allo zero.',
        ],
      },
      {
        heading: 'Due asintoti, due rami',
        body: [
          'x = 0 \u00e8 un asintoto verticale: mentre x → 0⁺ i valori → +∞, mentre x → 0⁻ essi → −∞, e 1/0 \u00e8 indefinito — la divisione per zero non ha significato, quindi i rami non possono mai unirsi. y = 0 \u00e8 un asintoto orizzontale: mentre |x| → ∞ i valori → 0, avvicinandosi all\u2019asse x sempre di pi\u00f9 senza raggiungerlo. Gli assi sono muri che la curva avvicina ma non tocca mai.',
          'Ciascun ramo \u00e8 strettamente decrescente: su (0, ∞), x pi\u00f9 grande d\u00e0 1/x pi\u00f9 piccolo, e lo stesso vale su (−∞, 0). Ma la funzione nel suo insieme non \u00e8 decrescente — salta da −∞ su a +∞ attraverso il varco in zero. La derivata f′(x) = −1/x² \u00e8 negativa dove definita, a conferma della discesa su ciascun ramo, e la curva \u00e8 convessa su (0, ∞) e concava su (−∞, 0).',
        ],
      },
      {
        heading: 'Dove compare il reciproco',
        body: [
          'La proporzionalit\u00e0 inversa \u00e8 ovunque nella scienza: la legge di Boyle (P ∝ 1/V), la legge di Ohm (I = V/R), l\u2019equazione delle lenti 1/f = 1/dₒ + 1/dᵢ, e le forze gravitazionali ed elettrostatiche che decadono come 1/r². In ciascun caso, raddoppiare il denominatore dimezza il risultato — la firma del reciproco. Frequenza e periodo sono reciproci (f = 1/T): un periodo di 0.01 s \u00e8 un tono di 100 Hz.',
          'In analisi, 1/x \u00e8 famosa come la funzione la cui primitiva non \u00e8 una potenza: ∫(1/x)dx = ln|x| + C, l\u2019integrale che costrinse all\u2019invenzione del logaritmo. Il suo integrale improprio da 1 a ∞ diverge (il cugino continuo della serie armonica), eppure la stessa forma ruotata d\u00e0 la tromba di Gabriele — volume finito, area superficiale infinita.',
        ],
      },
    ],
    keyFacts: [
      'Dominio: tutti gli x reali ≠ 0; codominio: tutti gli y reali ≠ 0. Indefinita in x = 0.',
      'Iperbole con due rami: (0, ∞) d\u00e0 valori positivi, (−∞, 0) d\u00e0 valori negativi.',
      'Asintoto verticale x = 0; asintoto orizzontale y = 0.',
      'Funzione dispari: f(−x) = −f(x); simmetria rotazionale di 180° attorno all\u2019origine; propria inversa.',
      'Passa per (1, 1) e (−1, −1); strettamente decrescente su ciascun ramo.',
      'Derivata f′(x) = −1/x²; la primitiva \u00e8 ln|x| + C.',
    ],
    faqs: [
      {
        q: 'Perch\u00e9 1/0 \u00e8 indefinito?',
        a: 'La divisione chiede “cosa per il divisore d\u00e0 il dividendo?” — nessun numero per 0 d\u00e0 1, quindi 1/0 non ha risposta. Sul grafico questo si mostra come l\u2019asintoto verticale: i valori esplodono a ±∞ vicino allo zero ma non si assestano mai su un valore in zero stesso.',
      },
      {
        q: '1/x \u00e8 crescente o decrescente?',
        a: 'Decrescente su ciascuno dei suoi due intervalli — prendi due numeri positivi qualsiasi e l\u2019input maggiore d\u00e0 l\u2019output minore — ma non decrescente nel complesso, perch\u00e9 salta da −∞ a +∞ attraverso x = 0. La derivata −1/x² \u00e8 negativa ovunque la funzione \u00e8 definita, il che parla solo del comportamento dentro ciascun ramo.',
      },
      {
        q: 'Qual \u00e8 l\u2019integrale di 1/x?',
        a: 'ln|x| + C. La regola delle potenze ∫xⁿ dx = x^(n+1)/(n+1) fallisce in n = −1 (divisione per zero), quindi 1/x ha bisogno della sua primitiva — storicamente, questo integrale \u00e8 come fu definito per primo il logaritmo naturale. Il valore assoluto mantiene la formula valida anche per x negativi.',
      },
    ],
    related: [
      '/it/learn/asymptotes-explained/',
      '/it/math-functions/natural-logarithm/',
      '/it/learn/understanding-integrals/',
      '/it/graphing-calculator/',
    ],
  },
];
