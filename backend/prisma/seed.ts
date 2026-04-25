import { PrismaClient, Category } from '@prisma/client'

const prisma = new PrismaClient()

interface QuizQuestionData {
  text: string
  options: { text: string; isCorrect: boolean }[]
}

interface QuestionData {
  number: number
  title: string
  content: string
  category: Category
  keyConcepts: string[]
  quizQuestions: QuizQuestionData[]
}

const questions: QuestionData[] = [
  {
    number: 1,
    title: 'Logički satovi i Lamportovi satovi',
    category: 'CRVENA',
    keyConcepts: ['C = max(C,T) + 1', 'happened-before (→)', 'konkurentni događaji', 'kauzalni redoslijed', 'drift fizičkih satova'],
    content: `Zašto postoje logički satovi?
U raspodijeljenom sustavu svako računalo ima vlastiti fizički sat koji se razilazi (drift) — jedno misli da je 10:00:01, drugo 10:00:03. Lamport je predložio rješenje: ne trebamo stvarno vrijeme, trebamo samo znati što se dogodilo PRIJE čega.

Relacija 'dogodilo se prije' (→):
• Ako su a i b na ISTOM procesu i a se izvodi prije b → a→b
• Ako je a SLANJE poruke i b PRIMITAK te iste poruke → a→b
• Tranzitivnost: ako a→b i b→c, onda a→c
• Ako niti jedno ne vrijedi → događaji su KONKURENTNI (a ‖ b)

Pravilo sata — kako funkcionira:
• Prije svakog događaja: C = C + 1 (brojač se povećava)
• Kad ŠALJEŠ poruku: pošalji i trenutnu vrijednost C uz poruku
• Kad PRIMIŠ poruku s vremenom T: C = max(C, T) + 1
• Sat uvijek ide NAPRIJED, NIKAD NAZAD

Primjer: Proces A ima C=1 i šalje poruku. Proces B ima C=5 i prima tu poruku s oznakom C=1. B izračuna: C = max(5,1)+1 = 6.

Ključna razlika: Fizički satovi mjere stvarno vrijeme ali se razilaze. Logički satovi ne mjere stvarno vrijeme ali garantiraju konzistentni redoslijed događaja — to je sve što raspodijeljeni sustav treba.`,
    quizQuestions: [
      {
        text: 'Koji je ispravni algoritam za ažuriranje Lamportovog logičkog sata pri primitku poruke s vremenskom oznakom T?',
        options: [
          { text: 'C = max(C, T) + 1', isCorrect: true },
          { text: 'C = C + T', isCorrect: false },
          { text: 'C = T + 1', isCorrect: false },
          { text: 'C = min(C, T) + 1', isCorrect: false },
        ],
      },
      {
        text: 'Dva događaja a i b nisu na istom procesu i nije jedno slanje/primanje poruke. Koji je njihov odnos?',
        options: [
          { text: 'Konkurentni su (a ‖ b) — nije moguće odrediti koji se događio prvi', isCorrect: true },
          { text: 'a → b jer su uvijek u kauzalnom redoslijedu', isCorrect: false },
          { text: 'b → a jer je primatelj uvijek kasniji', isCorrect: false },
          { text: 'Oba imaju isti logički sat pa su identična', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'Java RMI arhitektura',
    category: 'CRVENA',
    keyConcepts: ['Stub (klijentska strana)', 'Skeleton (serverska strana)', 'RMI Registry', 'Remote Interface', '8 koraka', 'samo Java'],
    content: `Što je RMI?
RMI (Remote Method Invocation) = pozivanje metode na objektu koji se nalazi na DRUGOM računalu, kao da je lokalni. To je objektno-orijentirana verzija RPC-a, isključivo za Javu.

Arhitektura — tko što radi:
• Stub (klijentska strana) — Proxy koji simulira pravi objekt; pakira parametre i šalje ih mrežom
• Skeleton (poslužiteljska strana) — Prima poziv, raspakira parametre, poziva pravi objekt
• RMI Registry — Direktorij udaljenih objekata; klijent ga pita gdje je objekt (telefonski imenik)
• Remote Interface — Java sučelje koje definira metode koje se mogu pozivati udaljeno

8 koraka stvaranja RMI aplikacije:
1. Definirati udaljeno sučelje (Remote interface)
2. Implementirati udaljene objekte
3. Implementirati klijenta
4. Registrirati udaljeni objekt u registry imenika
5. Generirati Stub/Skeleton koristeći rmic alat
6. Pokrenuti registry
7. Pokrenuti poslužitelja
8. Pokrenuti klijenta

RMI vs CORBA:
• Java RMI: Samo Java, Java Remote interface, razvio Sun Microsystems, jednostavniji
• CORBA: C++, Java, Python, COBOL..., IDL jezik, razvio OMG, kompleksniji ali moćniji`,
    quizQuestions: [
      {
        text: 'Koja komponenta Java RMI sustava djeluje kao "proxy" na klijentskoj strani i pakira pozive za slanje mrežom?',
        options: [
          { text: 'Stub', isCorrect: true },
          { text: 'Skeleton', isCorrect: false },
          { text: 'RMI Registry', isCorrect: false },
          { text: 'Remote Interface', isCorrect: false },
        ],
      },
      {
        text: 'Koja je ključna razlika između Java RMI i CORBA sustava?',
        options: [
          { text: 'Java RMI podržava samo Javu, dok CORBA podržava više programskih jezika', isCorrect: true },
          { text: 'CORBA je samo za Java objekte, a RMI za sve jezike', isCorrect: false },
          { text: 'Java RMI koristi IIOP protokol, a CORBA koristi TCP', isCorrect: false },
          { text: 'CORBA je noviji i razvio ga Sun Microsystems', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'Principi uštede energije procesora i RAM-a',
    category: 'CRVENA',
    keyConcepts: ['DVFS', 'P = C × V² × f', 'CLTT', 'OLTT', 'Power-down', 'kvadratni pad snage'],
    content: `Zašto je ovo važno?
Moderni datacentri troše ogromne količine energije. CPU i RAM su najveći potrošači.

CPU — DVFS (Dynamic Voltage and Frequency Scaling):
Kad procesor nema puno posla, smanji napon i frekvenciju.
Formula snage: P = C × V² × f
• C = kapacitivnost (konstanta hardvera)
• V = napon (voltage)
• f = frekvencija
Smanjivanjem napona i frekvencije, potrošnja pada KVADRATNO — iznimno učinkovito.
Analogija: kao auto koji smanjuje gas kad vozi nizbrdo — isti rezultat, manje goriva.

RAM — tri tehnike:
• CLTT (Closed Loop Thermal Throttling) — Memorija sama prati vlastitu temperaturu i usporava se kad se pregrije. Automatski, bez vanjskog kontrolera.
• OLTT (Open Loop Thermal Throttling) — Vanjski kontroler (ne sama memorija) odlučuje kada prigušiti memoriju. Koristi se kad postoji centralizirani nadzor topline.
• Gašenje memorije (Power-down) — Dijelovi RAM-a koji nisu potrebni stavljaju se u sleep stanje niže potrošnje. Kad je opterećenje nisko, cijeli DIMM može spavati.`,
    quizQuestions: [
      {
        text: 'Što znači DVFS tehnika za uštedu energije procesora?',
        options: [
          { text: 'Dynamic Voltage and Frequency Scaling — smanjuje napon i frekvenciju kada nema opterećenja', isCorrect: true },
          { text: 'Direct Virtual File System — komprimira datoteke za efikasniji pristup', isCorrect: false },
          { text: 'Dynamic Virtual Function Switching — prebacuje između procesorskih funkcija', isCorrect: false },
          { text: 'Distributed Variable Frequency Synchronization — sinkronizira procesore', isCorrect: false },
        ],
      },
      {
        text: 'Koja je razlika između CLTT i OLTT tehnika za RAM?',
        options: [
          { text: 'CLTT: memorija sama prati temperaturu; OLTT: vanjski kontroler odlučuje o prigušivanju', isCorrect: true },
          { text: 'CLTT gasi memoriju, a OLTT samo smanjuje frekvenciju', isCorrect: false },
          { text: 'OLTT je brži jer koristi interni kontroler memorije', isCorrect: false },
          { text: 'Nema razlike — obje tehnike koriste isti mehanizam', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 4,
    title: 'Zeleno računarstvo — metrike PUE, DCE, TGI, DWPE',
    category: 'CRVENA',
    keyConcepts: ['PUE = ukupna / IT', 'PUE idealno = 1.0', 'DCE = 1/PUE', 'TGI', 'DWPE', 'Google PUE ≈ 1.1'],
    content: `Zašto ove metrike?
Datacentri troše megawatte struje. Samo dio te energije ide u stvarno računanje — ostatak ide na hlađenje, rasvjetu, gubitke u napajanju. Metrike mjere koliko smo "zeleni".

Metrike:
• PUE (Power Usage Effectiveness) = Ukupna energija / Energija IT opreme | Idealno: 1.0
• DCE (Data Center Efficiency) = 1 / PUE (ili Energija IT / Ukupna) | Idealno: 1.0 (100%)
• TGI (Total Green Index) = Kombinacija PUE i iskorištenosti IT | Što viši, to bolje
• DWPE (Data Center Work Power Efficiency) = Korisni rad / Ukupna potrošnja | Što viši, to bolje

PUE — najvažnija metrika:
• PUE = 1.0 → savršeno, sva energija ide u računanje (nemoguće u praksi)
• PUE = 1.5 → za svaki 1W računanja troši se 0.5W na infrastrukturu
• PUE = 2.0 → za svaki 1W računanja troši se još 1W na hlađenje, rasvjetu itd.
• Prosječni datacentar: PUE ≈ 1.5–1.6
• Google datacentri: PUE ≈ 1.1 (iznimno dobro)

Primjena: Hladne klimatske zone (Island, Skandinavija) imaju prirodno bolji PUE. Microsoft gradi podvodne datacentre. Otpadna toplina može se koristiti za grijanje zgrada.`,
    quizQuestions: [
      {
        text: 'Datacentar ima PUE vrijednost 2.0. Što to znači?',
        options: [
          { text: 'Za svaki 1W u IT opremu troši se još 1W na hlađenje i infrastrukturu', isCorrect: true },
          { text: 'Datacentar je 200% energetski efikasan', isCorrect: false },
          { text: 'Sva energija ide u IT opremu, bez ikakvih gubitaka', isCorrect: false },
          { text: 'IT oprema troši dvostruko više nego hlađenje', isCorrect: false },
        ],
      },
      {
        text: 'Koji je odnos između DCE i PUE metrika?',
        options: [
          { text: 'DCE = 1 / PUE — DCE je inverzija PUE vrijednosti', isCorrect: true },
          { text: 'DCE = PUE × 2 — DCE je dvostruki PUE', isCorrect: false },
          { text: 'DCE i PUE su iste metrike s različitim nazivima', isCorrect: false },
          { text: 'DCE = PUE - 1 — DCE mjeri samo gubitke', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 5,
    title: 'CORBA sustav raspodijeljenih objekata',
    category: 'NARANCASTA',
    keyConcepts: ['ORB (Object Request Broker)', 'IDL (Interface Definition Language)', 'IIOP protokol', 'višejezičnost', 'OMG standard'],
    content: `Što je CORBA?
CORBA (Common Object Request Broker Architecture) = standard koji omogućava objektima na RAZLIČITIM računalima, pisanim u RAZLIČITIM jezicima da međusobno komuniciraju. Razvio ga OMG (Object Management Group).

Analogija: CORBA je kao UN prevoditelj — Java objekt može razgovarati s C++ objektom, kao što Hrvat može razgovarati s Japancem kroz prevoditelja. Ni jedan ne mora znati jezik drugoga.

Ključne komponente:
• ORB (Object Request Broker) — Posrednik koji prima zahtjev i prosljeđuje ga pravom objektu; srce CORBA sustava
• IDL (Interface Definition Language) — Neutralni jezik za definiranje sučelja, neovisno o programskom jeziku
• IDL Prevoditelj — Prevodi IDL u ciljni jezik (Java, C++, Python...) i generira stub/skeleton
• IIOP protokol — Standardni mrežni protokol za komunikaciju između ORB-ova

Tijek poziva u CORBA sustavu:
1. Klijent (Java) poziva metodu na lokalnom stubu
2. Stub pakira poziv i šalje ga lokalnom ORB-u
3. ORB šalje poziv mrežom do udaljenog ORB-a (IIOP protokol)
4. Udaljeni ORB ga prosljeđuje Skeletonu
5. Skeleton raspakira parametre i poziva pravi C++ objekt
6. Rezultat ide natrag istim putem`,
    quizQuestions: [
      {
        text: 'Što je IDL u CORBA sustavu?',
        options: [
          { text: 'Neutralni jezik za definiranje sučelja, neovisan o programskom jeziku', isCorrect: true },
          { text: 'Protokol za prijenos podataka između ORB-ova', isCorrect: false },
          { text: 'Alat za praćenje performansi CORBA sustava', isCorrect: false },
          { text: 'Baza podataka za pohranu CORBA objekata', isCorrect: false },
        ],
      },
      {
        text: 'Koji je protokol standardan za komunikaciju između ORB-ova u CORBA sustavu?',
        options: [
          { text: 'IIOP (Internet Inter-ORB Protocol)', isCorrect: true },
          { text: 'SOAP (Simple Object Access Protocol)', isCorrect: false },
          { text: 'RMI (Remote Method Invocation Protocol)', isCorrect: false },
          { text: 'gRPC (Google Remote Procedure Call)', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 6,
    title: 'Socketi — TCP vs UDP',
    category: 'NARANCASTA',
    keyConcepts: ['TCP = pouzdan + spor', 'UDP = brz + nepouzdan', '3-way handshake', 'Request-Reply', 'Publish-Subscribe', 'Pipeline'],
    content: `Što je socket?
Socket = sučelje (vrata) koje OS daje aplikaciji za slanje i primanje poruka po mreži. Definiran je s: IP adresa + broj porta.

TCP socket programiranje — s konekcijom:
• Poslužitelj: kreira socket → bind → listen → accept
• Klijent: kreira socket → connect
• Uspostavlja se 3-way handshake (SYN, SYN-ACK, ACK)
• Nakon toga: obostrani send/recv → close

Usporedba:
• TCP: konekcija (handshake), garantirana isporuka, paketi stižu redom, sporiji, za HTTP/FTP/email
• UDP: nema konekcije, nema garancije, paketi mogu stići neuredeni ili biti izgubljeni, brži, za DNS/video streaming/gaming

3 osnovna uzorka socketa:
• Request-Reply: klijent pita, server odgovara (HTTP)
• Publish-Subscribe: publisher objavljuje, subscriberi primaju
• Pipeline: output jednog socketa je input sljedećeg`,
    quizQuestions: [
      {
        text: 'Online igrica šalje pozicije igrača 60 puta u sekundi. Koji protokol je bolji i zašto?',
        options: [
          { text: 'UDP — brzina je važnija od garantirane isporuke; stariji podaci svejedno zastare', isCorrect: true },
          { text: 'TCP — garantirana isporuka je kritična za pozicije igrača', isCorrect: false },
          { text: 'FTP — dizajniran je specifično za brze prijenose podataka u realnom vremenu', isCorrect: false },
          { text: 'HTTP — standardni protokol svih web aplikacija', isCorrect: false },
        ],
      },
      {
        text: 'U TCP 3-way handshake, kojim redoslijedom se šalju poruke?',
        options: [
          { text: 'SYN → SYN-ACK → ACK', isCorrect: true },
          { text: 'ACK → SYN → SYN-ACK', isCorrect: false },
          { text: 'SYN → ACK → SYN-ACK', isCorrect: false },
          { text: 'CONNECT → ACCEPT → CONFIRM', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 7,
    title: 'Dva glavna tipa web usluga (REST i SOAP)',
    category: 'NARANCASTA',
    keyConcepts: ['REST = JSON + HTTP + stateless', 'SOAP = XML + envelope + moćniji', 'GET/POST/PUT/DELETE', 'URI resursi', 'enterprise'],
    content: `REST web usluge:
REST (Representational State Transfer) = arhitekturalni stil za web usluge zasnovan na HTTP-u.
• Koristi standardne HTTP metode: GET, POST, PUT, DELETE
• STATELESS — svaki zahtjev je samostalan, server ne pamti stanje klijenta
• Podaci u JSON ili XML formatu
• Resursi identificirani URI-jem (npr. /api/korisnici/123)
• Jednostavniji, lakši, moderniji — dominantan na webu danas
• Primjeri: Twitter API, GitHub API

SOAP web usluge:
SOAP (Simple Object Access Protocol) = XML-baziran protokol za komunikaciju web usluga.
• Koristi XML poruke u SOAP omotnici (envelope)
• Omotnica ima: Header (opcionalan, metadata) i Body (aktualna poruka)
• Može raditi preko HTTP, SMTP i drugih protokola
• Stroži standard, kompleksniji ali moćniji
• Koriste ga uglavnom bankarski i enterprise sustavi

REST vs SOAP:
• Format: REST=JSON ili XML | SOAP=Samo XML
• Protokol: REST=HTTP | SOAP=HTTP, SMTP i drugi
• Stanje: REST=Stateless | SOAP=Može biti stateful
• Performanse: REST=Brži | SOAP=Sporiji (veći XML overhead)`,
    quizQuestions: [
      {
        text: 'Koje je ključno svojstvo REST web usluga koje ga razlikuje od SOAP-a?',
        options: [
          { text: 'Stateless — svaki zahtjev je samostalan, server ne pamti stanje klijenta', isCorrect: true },
          { text: 'Koristi SOAP omotnicu za strukturiranje svih poruka', isCorrect: false },
          { text: 'Radi isključivo s XML formatom podataka', isCorrect: false },
          { text: 'Podržava samo HTTP GET metodu za sigurnost', isCorrect: false },
        ],
      },
      {
        text: 'Koji bankarski sustavi uglavnom koriste i zašto?',
        options: [
          { text: 'SOAP — stroži standard, formalniji, podržava stateful operacije', isCorrect: true },
          { text: 'REST — brži je i jednostavniji za implementaciju', isCorrect: false },
          { text: 'gRPC — binarni format je sigurniji za financijske transakcije', isCorrect: false },
          { text: 'GraphQL — klijent definira točno koje podatke treba', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 8,
    title: 'API-ji u složenim računalnim okolinama',
    category: 'NARANCASTA',
    keyConcepts: ['Integracija', 'Apstrakcija', 'Skalabilnost', 'Ponovna upotreba', 'REST/SOAP/gRPC/GraphQL'],
    content: `Što je API?
API (Application Programming Interface) = skup pravila i definicija kako jedna aplikacija može koristiti usluge druge. API je "ugovor" između komponenti sustava.

Zašto su API-ji ključni u složenim sustavima?
• Integracija — Povezuju heterogene sustave; različiti jezici i platforme mogu komunicirati (Java backend + Python ML model)
• Apstrakcija — Sakrivaš implementaciju; korisnik API-ja ne mora znati kako nešto radi (Google Maps API)
• Skalabilnost — Mikroservisi komuniciraju kroz API-je; svaki se može skalirati neovisno (Netflix ima 700+ mikroservisa)
• Ponovna upotreba — Isti API koriste mnogi klijenti: web, mobile, third-party (Stripe payment API)

Tipovi API-ja u složenim okolinama:
• REST API — najčešći, HTTP-baziran, JSON
• SOAP API — XML-baziran, formalniji, enterprise
• gRPC — Google-ov, binaran, izuzetno brz (mikroservisi)
• GraphQL — klijent definira što želi (Facebook)`,
    quizQuestions: [
      {
        text: 'Google Maps API koriste tisuće aplikacija. Koja je ključna prednost API-ja koja to omogućava?',
        options: [
          { text: 'Apstrakcija — korisnik ne mora znati kako karte rade, samo kako ih koristiti', isCorrect: true },
          { text: 'Šifriranje — API automatski kriptira sve podatke u prijenosu', isCorrect: false },
          { text: 'Kompresija — API automatski smanjuje veličinu podataka', isCorrect: false },
          { text: 'Validacija — API provjerava ispravnost svih ulaznih parametara', isCorrect: false },
        ],
      },
      {
        text: 'Netflix koristi 700+ mikroservisa. Koji tip API-ja je najbrži za komunikaciju između mikroservisa?',
        options: [
          { text: 'gRPC — binarni protokol, izuzetno brz', isCorrect: true },
          { text: 'REST — najrašireniji i najlakši za implementaciju', isCorrect: false },
          { text: 'SOAP — striži standard garantira pouzdanost', isCorrect: false },
          { text: 'GraphQL — klijent definira točno što mu treba', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 9,
    title: 'Transparentnost raspodijeljenog sustava',
    category: 'NARANCASTA',
    keyConcepts: ['8 vrsta transparentnosti', 'položaj', 'pristup', 'istovremenost', 'repliciranje', 'pogreška', 'mobilnost', 'performanse', 'nadogradnja'],
    content: `Što je transparentnost?
Transparentnost = skrivanje složenosti sustava od korisnika i aplikacija. Cilj: raspodijeljeni sustav izgleda kao jedan, jednostavan stroj. Problem: potpuna transparentnost je nemoguća (ne možeš sakriti mrežna kašnjenja).

8 vrsta transparentnosti:
• Pristupa — Skriva razliku između lokalnog i udaljenog pristupa. Isti API za lokalnu i udaljenu datoteku.
• Položaja — Skriva fizičku i mrežnu lokaciju resursa. www.google.com — ne znaš gdje su serveri.
• Istovremenosti — Skriva da više korisnika dijeli isti resurs. Baza podataka — ne vidiš ostale korisnike.
• Repliciranja — Skriva da postoji više kopija resursa. CDN — ne znaš s kojeg servera dobivaš sliku.
• Pogreške — Skriva kvarove hardvera i softvera. Failover — kad server padne, automatski drugi preuzima.
• Mobilnosti — Skriva premještanje resursa unutar sustava. Live migracija VM-a bez prekida usluge.
• Performansi — Skriva rekonfiguraciju zbog opterećenja. Auto-scaling — ne vidiš kad se dodaju serveri.
• Nadogradnje (Scaling) — Skriva širenje sustava bez promjene strukture. Dodaješ node u cluster bez mijenjanja koda.`,
    quizQuestions: [
      {
        text: 'Posjećuješ www.google.com — ne znaš na kojim serverima diljem svijeta se stranica nalazi. Koja vrsta transparentnosti ovo skriva?',
        options: [
          { text: 'Transparentnost položaja', isCorrect: true },
          { text: 'Transparentnost pristupa', isCorrect: false },
          { text: 'Transparentnost repliciranja', isCorrect: false },
          { text: 'Transparentnost pogreška', isCorrect: false },
        ],
      },
      {
        text: 'CDN (Content Delivery Network) dostavlja sliku s najbližeg servera, a ti ne znaš s kojeg. Koja je to vrsta transparentnosti?',
        options: [
          { text: 'Transparentnost repliciranja', isCorrect: true },
          { text: 'Transparentnost položaja', isCorrect: false },
          { text: 'Transparentnost mobilnosti', isCorrect: false },
          { text: 'Transparentnost nadogradnje', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 10,
    title: 'Usporedba raspodijeljenih, mrežnih i posredničkih OS-a',
    category: 'NARANCASTA',
    keyConcepts: ['Mrežni OS = svjesno udaljeno', 'Raspodijeljeni OS = jedan OS', 'Posrednički OS = middleware', 'CORBA', 'Java RMI'],
    content: `Tri tipa operacijskih sustava:

Mrežni OS (Network OS):
• Svaki čvor ima vlastiti OS
• Korisnik SVJESNO pristupa udaljenim resursima
• Niska transparentnost
• Primjeri: Windows Server, Linux s NFS-om
• Jednostavan za implementaciju

Raspodijeljeni OS (Distributed OS):
• JEDAN OS upravlja svim čvorovima
• Korisnik ne zna na kojoj mašini se izvodi
• Visoka transparentnost — potpuna
• Primjeri: Amoeba, Plan 9
• Teško implementirati; rijetko u praksi; idealan model

Posrednički OS (Middleware-based):
• Svaki čvor ima vlastiti OS + Middleware sloj iznad koji daje iluziju jednog sustava
• Srednja transparentnost — ovisi o middleware-u
• Primjeri: CORBA, Java RMI, JEE
• Kompromis između mrežnog i raspodijeljenog; NAJČEŠĆI U PRAKSI

Vizualizacija:
• Mrežni: [OS1] [OS2] [OS3] — korisnik bira čvor eksplicitno
• Raspodijeljeni: [Jedan OS za sve čvorove]
• Posrednički: [OS1][OS2][OS3] + [Middleware] + [Aplikacija]`,
    quizQuestions: [
      {
        text: 'CORBA i Java RMI su primjeri kojeg tipa operacijskog sustava?',
        options: [
          { text: 'Posrednički OS (Middleware-based) — najčešći kompromis u praksi', isCorrect: true },
          { text: 'Raspodijeljeni OS — jedan OS za sve čvorove', isCorrect: false },
          { text: 'Mrežni OS — korisnik svjesno pristupa udaljenim resursima', isCorrect: false },
          { text: 'Virtualni OS — temelji se na virtualizaciji', isCorrect: false },
        ],
      },
      {
        text: 'Koji tip OS-a ima VISOKU transparentnost ali je rijetko u praksi?',
        options: [
          { text: 'Raspodijeljeni OS — jedan OS upravlja svim čvorovima (Amoeba, Plan 9)', isCorrect: true },
          { text: 'Posrednički OS — middleware daje transparentnost', isCorrect: false },
          { text: 'Mrežni OS — korisnik svjesno bira čvor', isCorrect: false },
          { text: 'Virtualni OS — VM hypervisor skriva hardver', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 11,
    title: 'Grid Service Broker (GSB)',
    category: 'ZUTA',
    keyConcepts: ['Single window', 'otkrivanje resursa', 'accounting', 'raspoređivanje zadataka', 'putnička agencija analogija'],
    content: `Što je GSB?
Grid Service Broker = broker koji raspoređuje zadatke aplikacija na resurse grida (mrežnog spleta računala) na temelju statičkih i dinamičkih parametara.

Analogija: GSB je kao putnička agencija — ti kažeš "trebam let A do B, najjeftinije", a agencija pronađe i rezervira. Ti ne brineš o detaljima.

Glavne mogućnosti GSB-a:
• Single window — jedno sučelje za upravljanje cijelim eksperimentom
• Otkrivanje resursa — pronalazi dostupna računala i usluge na gridu
• Trgovina resursima — pregovara o korištenju i cijeni resursa
• Otkrivanje optimalnih izvora podataka — gdje su podaci najbliže
• Accounting — praćenje potrošnje resursa i naplate
• Raspoređivanje zadataka — optimalna dodjela poslova slobodnim resursima

Grid computing koriste znanstvenici i istraživači za zajednički pristup distribuiranim računalnim resursima različitih organizacija (CERN grid, HR-ZOO).`,
    quizQuestions: [
      {
        text: 'Koja je primarna uloga Grid Service Brokera (GSB)?',
        options: [
          { text: 'Raspoređivanje zadataka aplikacija na optimalne resurse grida', isCorrect: true },
          { text: 'Šifriranje komunikacije između čvorova grida', isCorrect: false },
          { text: 'Upravljanje korisničkim računima na grid sustavima', isCorrect: false },
          { text: 'Komprimiranje podataka za efikasan mrežni prijenos', isCorrect: false },
        ],
      },
      {
        text: 'Što znači "Single window" mogućnost Grid Service Brokera?',
        options: [
          { text: 'Jedno sučelje za upravljanje cijelim eksperimentom na gridu', isCorrect: true },
          { text: 'Samo jedan korisnik može pristupiti gridu u isto vrijeme', isCorrect: false },
          { text: 'Svi podaci se prikazuju u jednom prozoru preglednika', isCorrect: false },
          { text: 'Grid radi na jednom operacijskom sustavu Windows', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 12,
    title: 'Skalabilna content-aware nakupina web poslužitelja',
    category: 'ZUTA',
    keyConcepts: ['content-aware load balancer', 'cache hit rate', 'horizontalna skalabilnost', 'specijalizirani serveri', 'tipovi sadržaja'],
    content: `Problem koji rješava:
Jedan web server ne može podnijeti milijune zahtjeva istovremeno. Trebamo više servera koji dijele opterećenje — ali ne nasumično, nego PAMETNO prema sadržaju.

Arhitektura nakupine:
Klijenti → Load Balancer (content-aware) → [Server za slike] [Server za video] [Server za HTML]

Što znači 'content-aware'?
Load balancer gleda SADRŽAJ zahtjeva (ne samo opterećenje servera) i šalje zahtjev na specijalizirani server:
• Zahtjev za sliku (.jpg, .png) → Server specijaliziran za slike (ima ih u cache-u)
• Zahtjev za video (.mp4) → Video server s velikom bandwidth-om
• Zahtjev za HTML stranicu → Aplikacijski server

Prednosti content-aware pristupa:
• Viši cache hit rate — svaki server cachira samo jedan tip sadržaja
• Bolje performanse — server je optimiziran za svoju vrstu sadržaja
• Manja potrošnja bandwidth-a — sadržaj se ne mora premještati između servera
• Horizontalna skalabilnost — lako dodaješ servere za preopterećeni tip sadržaja`,
    quizQuestions: [
      {
        text: 'Što razlikuje "content-aware" load balancer od običnog load balancera?',
        options: [
          { text: 'Analizira sadržaj zahtjeva i šalje ga specijaliziranom serveru za taj tip sadržaja', isCorrect: true },
          { text: 'Balancira opterećenje isključivo prema CPU iskorištenosti servera', isCorrect: false },
          { text: 'Distribuira zahtjeve metodom round-robin bez analize sadržaja', isCorrect: false },
          { text: 'Prioritizira zahtjeve prema IP adresi klijenta', isCorrect: false },
        ],
      },
      {
        text: 'Zašto content-aware nakupina ima viši cache hit rate od obične nakupine?',
        options: [
          { text: 'Svaki server cachira samo jedan tip sadržaja — specijalizacija povećava pogotke', isCorrect: true },
          { text: 'Content-aware ima više memorije za cache pohranupodataka', isCorrect: false },
          { text: 'Zahtjevi se nasumično raspoređuju pa se cache automatski puni', isCorrect: false },
          { text: 'Klijenti cachiraju podatke lokalno i ne šalju duplikate', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 13,
    title: 'Problemi visokih performansi sa stajališta potrošnje energije',
    category: 'ZUTA',
    keyConcepts: ['disipacija topline', 'gustoća snage', 'do 40% za hlađenje', 'peak vs prosječno', 'tekuće hlađenje', 'Project Natick'],
    content: `Ključni problemi HPC (High Performance Computing) energetike:

• Disipacija topline — HPC procesori generiraju ogromne količine topline. Hlađenje troši do 40% ukupne energije datacentra.

• Gustoća snage (Power density) — Što su čipovi manji i gušći, više topline na cm². Standardno hlađenje zrakom nije dovoljno — treba tekuće hlađenje.

• Ukupna potrošnja energije — Superračunala troše megawatte. Troškovi struje mogu premašiti troškove hardvera. Energija postaje bottleneck, ne procesorska snaga.

• Pouzdanost komponenti — Visoke temperature smanjuju životni vijek tranzistora. Češći kvarovi, skuplje održavanje.

• Peak vs. prosječno opterećenje — Serveri su dimenzionirani za peak, ali rade na 10–20% kapaciteta. Energija se troši i kada nema posla.

Rješenja:
• DVFS — smanjivanje napona i frekvencije kad nema opterećenja
• Tekuće hlađenje direktno na chip (liquid cooling)
• Smještaj datacentara u hladne klimate (Island — prirodno hlađenje)
• Iskorištavanje otpadne topline za grijanje susjednih zgrada
• Microsoft Project Natick — podvodni datacentri (more hladi)`,
    quizQuestions: [
      {
        text: 'Koliki postotak ukupne energije datacentra može trošiti samo hlađenje HPC sustava?',
        options: [
          { text: 'Do 40%', isCorrect: true },
          { text: 'Do 5%', isCorrect: false },
          { text: 'Do 15%', isCorrect: false },
          { text: 'Do 70%', isCorrect: false },
        ],
      },
      {
        text: 'Zašto su serveri u datacentrima "dimenzionirani za peak" energetski neučinkoviti?',
        options: [
          { text: 'Rade na 10–20% kapaciteta, a puna energija se troši i pri niskom opterećenju', isCorrect: true },
          { text: 'Peak opterećenje traje 24h/dan pa je potrošnja uvijek maksimalna', isCorrect: false },
          { text: 'Hlađenje ne može pratiti peak pa se procesori automatski gase', isCorrect: false },
          { text: 'Više servera mora raditi paralelno što troši više energije', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 14,
    title: 'Višenitni poslužitelj dispečer/radnik',
    category: 'ZUTA',
    keyConcepts: ['dispečer nikad ne blokira', 'pool niti', 'paralelna obrada', 'recikliranje niti', 'kontrola opterećenja'],
    content: `Model dispečer/radnik:
• Dispečer = jedna nit koja PRIMA sve zahtjeve i raspoređuje ih radnicima
• Radnici = pool niti koje OBRAĐUJU zahtjeve i vraćaju odgovore

Vizualizacija:
Zahtjevi → [DISPEČER] → raspodjeljuje → [Radnik 1] [Radnik 2] [Radnik 3]
                                         ↓ obrađuje ↓ obrađuje ↓ obrađuje

Tijek rada:
1. Dispečer stalno sluša na portu (accept() petlja)
2. Stigne zahtjev → dispečer ga stavlja u red ili šalje slobodnom radniku
3. Radnik obrađuje zahtjev (može trajati dugo — npr. čitanje baze)
4. Radnik šalje odgovor klijentu i vraća se u pool slobodnih radnika
5. Dispečer NIKAD ne blokira — odmah spreman za sljedeći zahtjev

Prednosti:
• Paralelna obrada — više zahtjeva se obrađuje istovremeno
• Dispečer ne blokira — dok radnik čeka na bazu, dispečer prima nove zahtjeve
• Pool niti — niti se recikliraju; stvaranje niti je skupo (vrijeme + memorija)
• Kontrola opterećenja — lako ograničiti broj radnika`,
    quizQuestions: [
      {
        text: 'Zašto dispečer u modelu dispečer/radnik NIKAD ne blokira?',
        options: [
          { text: 'Dok radnik čeka na bazu podataka, dispečer je slobodan primati nove zahtjeve', isCorrect: true },
          { text: 'Dispečer radi na zasebnom procesoru bez dijeljenja resursa', isCorrect: false },
          { text: 'Dispečer ne obrađuje zahtjeve — samo ih bilježi u log datoteku', isCorrect: false },
          { text: 'Dispečer automatski odbija zahtjeve koji bi trajali dulje od 1 sekunde', isCorrect: false },
        ],
      },
      {
        text: 'Zašto se koristi pool niti umjesto kreiranja nove niti za svaki zahtjev?',
        options: [
          { text: 'Stvaranje niti je skupo (vreme + memorija) — recikliranje je efikasnije', isCorrect: true },
          { text: 'Novi zahtjevi mogu koristiti samo slobodne portove koji su limitirani', isCorrect: false },
          { text: 'Kreiranje niti nije podržano u višenitnom programiranju', isCorrect: false },
          { text: 'Svaka nova nit zahtijeva posebnu mrežnu konekciju', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 15,
    title: 'Izravno i T-razinsko dodjeljivanje imena',
    category: 'ZUTA',
    keyConcepts: ['Flat = nasumičan ID (MAC, UUID)', 'Hijerarhijsko = DNS struktura', 'broadcasting', 'DHT', 'iterativno vs rekurzivno razrješavanje'],
    content: `Problem: kako pronaći entitet u raspodijeljenom sustavu?

Izravno dodjeljivanje (Flat naming):
Ime entiteta nema strukturu — samo jedinstveni identifikator (npr. MAC adresa: 00:1A:2B:3C:4D:5E).
Metode pronalaska:
• Broadcasting — pitaj SVE računala na mreži "tko je 00:1A:..." → ne skalira
• DHT (Distributed Hash Table) — pametan algoritam za brzo pronalaženje → skalira
• Prosljeđivanje pokazivača — svaki stari položaj zna novi → lanac referenci

Hijerarhijsko / T-razinsko dodjeljivanje:
Ime ima STRUKTURU — kao DNS. www.fer.hr se čita desno na lijevo: .hr → fer → www.
Stablo: Root → [.hr, .com, .org] → [fer, unizg] → [www, mail, ftp]

Usporedba:
• Flat: bez strukture, MAC/UUID, teže za pronaći, manje skalabilno
• Hijerarhijsko: ima strukturu, DNS, lakše za pronaći, bolje skalabilno

DNS razrješavanje:
• Iterativno: Klijent sam pita svaki server (Root → .hr → fer → IP)
• Rekurzivno: Klijent pita Root, pa Root pita .hr, pa .hr pita fer, i rezultat dolazi nazad istim putem. Klijent čeka jedan odgovor.`,
    quizQuestions: [
      {
        text: 'Kod iterativnog DNS razrješavanja, tko postavlja svaki pojedinačni upit serverima?',
        options: [
          { text: 'Klijent (resolver) sam pita svaki DNS server jedan po jedan', isCorrect: true },
          { text: 'Root server koji prosljeđuje upite kroz hijerarhiju prema dolje', isCorrect: false },
          { text: 'ISP-ov DNS server koji koordinira sve upite u ime klijenta', isCorrect: false },
          { text: 'Odredišni server koji obrnuto šalje odgovore klijentu', isCorrect: false },
        ],
      },
      {
        text: 'MAC adresa i UUID su primjeri kojeg tipa imenovanja?',
        options: [
          { text: 'Flat (Izravno) — nasumičan identifikator bez logičke strukture', isCorrect: true },
          { text: 'Hijerarhijskog — drvo kao DNS struktura', isCorrect: false },
          { text: 'Simboličnog — tekstualni opis entiteta', isCorrect: false },
          { text: 'Lokacijskog — identificira entitet po položaju', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 16,
    title: 'CAP Teorem',
    category: 'ZUTA',
    keyConcepts: ['C = Consistency', 'A = Availability', 'P = Partition Tolerance', 'uvijek P', 'bira se C ili A', 'CP vs AP'],
    content: `Što CAP teorem kaže?
U raspodijeljenom sustavu NIJE MOGUĆE istovremeno garantirati sva tri svojstva:
• C — Consistency (Konzistentnost): Svi čvorovi vide iste podatke u isto vrijeme
• A — Availability (Dostupnost): Svaki zahtjev dobiva odgovor (možda nisu najnoviji podaci)
• P — Partition Tolerance (Tolerancija particije): Sustav radi čak i kada mreža padne

Zašto ne možeš imati sva tri?
U realnim sustavima mreža MOŽE pasti (particija se uvijek može dogoditi). Dakle P moraš imati. Kad mreža padne i čvorovi ne mogu komunicirati:
• Ako želiš Consistency → moraš odbiti zahtjeve dok sustav nije konzistentan → gubiš Availability
• Ako želiš Availability → moraš odgovoriti sa starim podacima → gubiš Consistency
Zaključak: moraš birati između C i A (uz uvijek nužan P)

Primjeri sustava:
• Bankovni sustav → CP (konzistentnost je kritična)
• Amazon košarica → AP (bolje zastarjela košarica nego ništa)
• DNS → AP (dostupnost je ključna)
• Zookeeper → CP (koordinacija zahtijeva konzistentnost)
• Cassandra → AP (dizajniran za visoku dostupnost)`,
    quizQuestions: [
      {
        text: 'Bankovni sustav bira CP u CAP teoremu. Što to znači u praksi?',
        options: [
          { text: 'Ako mreža padne, sustav će odbiti zahtjeve dok podaci nisu konzistentni', isCorrect: true },
          { text: 'Sustav će uvijek odgovoriti, ali možda s nedovoljno točnim podacima', isCorrect: false },
          { text: 'Sustav može raditi bez ikakve mrežne veze neograničeno dugo', isCorrect: false },
          { text: 'Konzistentnost i dostupnost se garantiraju, ali ne i particija', isCorrect: false },
        ],
      },
      {
        text: 'Zašto u realnim sustavima P (Partition Tolerance) mora uvijek biti uključen?',
        options: [
          { text: 'Mreža MOŽE pasti u bilo kada — particija je neizbježna u realnom sustavu', isCorrect: true },
          { text: 'P je zadana vrijednost i ne može se isključiti u bazi podataka', isCorrect: false },
          { text: 'Bez P sustav ne može komunicirati s internetom', isCorrect: false },
          { text: 'P se automatski uključuje čim se doda drugi čvor', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 17,
    title: 'Tehnologija virtualizacije',
    category: 'ZELENA',
    keyConcepts: ['Hypervisor Tip 1 = bare metal', 'Hypervisor Tip 2 = hosted', 'izolacija', 'bolje iskorištenje', 'live migracija', 'snapshot'],
    content: `Što je virtualizacija?
Virtualizacija = stvaranje VIRTUALNE verzije nečega (OS, server, storage, mreža) — softver oponaša hardver tako da više virtualnih sustava može raditi na jednom fizičkom.

Zašto virtualizirati?
• Bolje iskorištenje resursa — server utilization ide s 15% na 70%+
• Izolacija — greška u jednoj VM ne utječe na drugu
• Lakša migracija — cijeli VM možeš kopirati na drugi server
• Brzi backup i restore — snapshot VM-a u sekundi

Razine virtualizacije:
• ISA razina — Oponaša cijeli procesor (QEMU, Rosetta)
• Sustavski pozivi — Oponaša OS pozive (Wine: Windows aplikacije na Linuxu)
• Bibliotečni pozivi (API) — JVM: Java bytecode radi na bilo kojoj platformi
• Hypervisor (puni VM) — Cijeli OS s kernelom u virtualnoj mašini (VMware, VirtualBox)

Hypervisor tip 1 vs tip 2:
• Tip 1 (Bare metal): Direktno na hardveru, bez host OS-a. Performanse izvrsne. Primjer: VMware ESXi, Microsoft Hyper-V (server)
• Tip 2 (Hosted): Unutar host OS-a. Jednostavniji za instalaciju, malo lošije performanse. Primjer: VirtualBox, VMware Workstation`,
    quizQuestions: [
      {
        text: 'VMware ESXi i Microsoft Hyper-V (server) su primjeri kojeg tipa hypervisora?',
        options: [
          { text: 'Tip 1 (Bare metal) — rade direktno na hardveru bez host OS-a', isCorrect: true },
          { text: 'Tip 2 (Hosted) — rade unutar host OS-a kao aplikacija', isCorrect: false },
          { text: 'Tip 3 (Kontejnerski) — koriste Linux namespaces', isCorrect: false },
          { text: 'Tip 0 (Firmware) — ugrađeni su u matičnu ploču', isCorrect: false },
        ],
      },
      {
        text: 'Koja je ključna prednost virtualizacije za datacentre?',
        options: [
          { text: 'Iskorištenost servera raste s 15% na 70%+ jer više VM-ova dijeli fizički hardver', isCorrect: true },
          { text: 'VM-ovi su brži od fizičkih servera jer nema hardware overheada', isCorrect: false },
          { text: 'Virtualizacija eliminira potrebu za operacijskim sustavom', isCorrect: false },
          { text: 'Svaki VM troši manje energije od fizičkog servera', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 18,
    title: 'Paradigma mobilnih agenata',
    category: 'ZELENA',
    keyConcepts: ['putuju s kodom + stanjem', 'lokalna obrada', 'itinerary (ruta)', 'autonomni', 'smanjenje mrežnog prometa'],
    content: `Što je mobilni agent?
Mobilni agent = autonomni program koji PUTUJE s računala na računalo kroz mrežu, noseći sa sobom kod, podatke i stanje izvođenja.

Tijek rada mobilnog agenta:
1. Agent se LANSIRA s izvornog domaćina s unaprijed definiranom rutom (itinerary)
2. Agent PUTUJE do prvog odredišta — prenosi se cijeli program i stanje
3. Na odredištu PRISTUPA resursima i obavlja zadatak (lokalno!)
4. PREMJEŠTA SE na sljedeće odredište na ruti
5. Ponavlja dok ne završi sve zadatke ili se vrati kući

Ključna prednost — lokalna obrada:
• Bez agenata: Šalješ 1GB podataka sebi, obrađuješ lokalno → puno mrežnog prometa
• S agentom: Pošalješ mali program koji obrađuje podatke TAMO gdje su, vraća ti samo rezultat (npr. 1KB)

Prednosti mobilnih agenata:
• Smanjenje mrežnog prometa — obrada blizu podataka; mrežom idu samo rezultati
• Autonomnost — agent radi i kada veza padne; dovoljno da se jednom prenese
• Fleksibilnost — agent može mijenjati rutu ovisno o situaciji
• Paralelizam — više agenata može raditi istovremeno na različitim čvorovima`,
    quizQuestions: [
      {
        text: 'Mobilni agent treba analizirati 1GB podataka na udaljenom serveru. Koja je prednost nasuprot klasičnom pristupu?',
        options: [
          { text: 'Agent putuje do servera i obrađuje lokalno — vraća samo rezultat, ne 1GB podataka', isCorrect: true },
          { text: 'Agent komprimira podatke na 100MB prije slanja klijentu', isCorrect: false },
          { text: 'Agent automatski dijeli obradu između 10 servera paralelno', isCorrect: false },
          { text: 'Agent kriptira podatke pa je transfer brži i sigurniji', isCorrect: false },
        ],
      },
      {
        text: 'Što je "itinerary" mobilnog agenta?',
        options: [
          { text: 'Unaprijed definirana ruta — popis čvorova koje agent treba posjetiti', isCorrect: true },
          { text: 'Algoritam koji agent koristi za obradu podataka', isCorrect: false },
          { text: 'Sigurnosni certifikat koji domaćin provjerava pri dolasku agenta', isCorrect: false },
          { text: 'Format zapisa u koji agent pohranjuje rezultate obrade', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 19,
    title: 'Hijerarhijski pristup lociranja entiteta',
    category: 'ZELENA',
    keyConcepts: ['domene', 'pretraži gore pa slijedi dolje', 'O(log N) složenost', 'ažuriranje prema gore', 'brisanje prema gore'],
    content: `Organizacija hijerarhije domena:
Cijela mreža podijeljena je u domene. Svaka domena ima direktorijski čvor koji prati entitete.
Struktura: Root čvor → Domene 1. razine → Domene 2. razine → Čvorovi (LAN)

Pretraživanje entiteta:
1. Počni od najniže (lokalne) domene
2. Ako nije tamo, idi GORE u nadređenu domenu
3. Nastavi prema gore dok ne nađeš zapis entiteta
4. Kada nađeš zapis, prati pokazivače PREMA DOLJE do trenutne lokacije

Ažuriranje — ubacivanje novog entiteta:
Pretraži prema gore dok ne nađeš PRVI zajednički čvor između novog i starog položaja. Osvježi taj čvor i sve čvorove prema dolje u stablu.

Ažuriranje — brisanje entiteta:
Ukloni zapis od lokalnog čvora prema korijenu stabla (suprotno od pretraživanja).

Prednost hijerarhijskog pristupa:
Ne trebaš pretraživati CIJELU mrežu — samo hijerarhiju. Za N čvorova, pretraživanje traje O(log N) umjesto O(N).
Analogija: traženje broja u telefonskom imeniku po prezimenu — ne čitaš svaki broj.`,
    quizQuestions: [
      {
        text: 'Kolika je složenost pretraživanja u hijerarhijskom sustavu lociranja za N čvorova?',
        options: [
          { text: 'O(log N) — pretraživanje hijerarhije, ne cijele mreže', isCorrect: true },
          { text: 'O(N) — svaki čvor se mora pitati', isCorrect: false },
          { text: 'O(N²) — provjera svih parova čvorova', isCorrect: false },
          { text: 'O(1) — direktno pronalaženje bez pretrage', isCorrect: false },
        ],
      },
      {
        text: 'Pretraživanje entiteta u hijerarhijskom sustavu počinje od:',
        options: [
          { text: 'Lokalne (najniže) domene, pa ide prema gore ako entitet nije pronađen', isCorrect: true },
          { text: 'Root čvora, pa se spušta prema dolje do lokalnog čvora', isCorrect: false },
          { text: 'Slučajno odabranog čvora u mreži', isCorrect: false },
          { text: 'Zadnjeg poznatog položaja entiteta', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 20,
    title: 'Oblak računala — usporedba s gridom i modeli isporuke',
    category: 'ZELENA',
    keyConcepts: ['IaaS + PaaS + SaaS', 'Grid vs Cloud', 'pay-as-you-go', 'virtualizacija temelj', 'AWS/Azure/GCP'],
    content: `Što je oblak računala?
Oblak = proširenje SOA (Service Oriented Architecture) na resurse dostupne PUTEM INTERNETA na zahtjev. Plaćaš samo ono što koristiš (pay-as-you-go).

Grid vs Oblak:
• Grid: Znanstvenici/istraživači, kompleksan pristup (Globus), uglavnom besplatno, fokus na dijeljenju resursa (CERN, HR-ZOO)
• Oblak: Tvrtke/pojedinci, jednostavan pristup (web konzola), pay-as-you-go, usluge na zahtjev (AWS, Azure, GCP)

Tri modela isporuke:
• IaaS (Infrastructure as a Service) — Virtualni serveri, storage, mreža. Upravljaš OS, middleware, aplikacijama. Primjeri: AWS EC2, Azure VM
• PaaS (Platform as a Service) — Platforma za razvoj bez brige o infrastrukturi. Upravljaš samo aplikacijama i podacima. Primjeri: Google App Engine, Heroku
• SaaS (Software as a Service) — Gotova aplikacija u pregledniku. Ne upravljaš ničim osim korisničkih podataka. Primjeri: Gmail, Office 365, Dropbox

Kada je oblak optimalan?
• Visoko nezavisni procesi i aplikacije
• Dobro definirane točke integracije
• Varijabilno opterećenje (oblak se lako skalira)
• Troškovi i fleksibilnost važniji od kontrole`,
    quizQuestions: [
      {
        text: 'Razvojni tim želi deployati aplikaciju bez brige o serverima, OS-u i middleware-u. Koji model oblaka?',
        options: [
          { text: 'PaaS (Platform as a Service) — platforma za razvoj bez brige o infrastrukturi', isCorrect: true },
          { text: 'IaaS (Infrastructure as a Service) — goli virtualni serveri', isCorrect: false },
          { text: 'SaaS (Software as a Service) — gotova aplikacija u pregledniku', isCorrect: false },
          { text: 'Grid computing — dijeljenje resursa između organizacija', isCorrect: false },
        ],
      },
      {
        text: 'Koja je ključna razlika između Grid i Cloud računarstva?',
        options: [
          { text: 'Grid koriste istraživači za dijeljenje resursa; Cloud je komercijalan (pay-as-you-go) za sve', isCorrect: true },
          { text: 'Grid je novija tehnologija koja je zamijenila Cloud', isCorrect: false },
          { text: 'Cloud computing nema virtualizaciju, za razliku od Grida', isCorrect: false },
          { text: 'Grid je dostupan samo u Europi, Cloud je globalan', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 21,
    title: 'Paradigma izmjene poruka (Message Passing)',
    category: 'ZELENA',
    keyConcepts: ['Point-to-Point', 'Publish/Subscribe', 'send + receive', 'asinkrono', 'Kafka', 'MQTT', 'topic'],
    content: `Što je paradigma izmjene poruka?
Temeljna paradigma raspodijeljenih aplikacija. Procesi komuniciraju isključivo slanjem i primanjem poruka — ne dijele memoriju.

Osnovne operacije:
• send(poruka, odredište) — šalje poruku odredišnom procesu
• receive(poruka) — prima poruku (može blokirati dok ne stigne)
• Za komunikaciju sa spajanjem: connect() i disconnect()

Point-to-point model:
Poslužitelj šalje poruku DIREKTNO u red poruka primatelja. Posrednički sloj omogućava asinkronu komunikaciju — pošiljatelj ne čeka da primatelj pročita poruku. Analogija: email (šalješ osobi).

Publish/Subscribe model:
Svaka poruka ima TEMU (topic). Aplikacije se pretplaćuju na teme koje ih zanimaju. Kad se objavi poruka — SVI pretplatnici je primaju automatski. Analogija: newsletter.

Usporedba:
• Point-to-Point: jedan primatelj, pošiljatelj zna primatelja, primjeri: MPI, message queues
• Publish/Subscribe: svi pretplatnici na temu, pošiljatelj ne zna tko prima, primjeri: Kafka, MQTT, Redis Pub/Sub`,
    quizQuestions: [
      {
        text: 'Kafka i MQTT koriste koji model izmjene poruka?',
        options: [
          { text: 'Publish/Subscribe — poruka se šalje svim pretplatnicima određene teme', isCorrect: true },
          { text: 'Point-to-Point — poruka ide direktno jednom specificiranom primatelju', isCorrect: false },
          { text: 'Request-Reply — primatelj obvezno odgovara na svaku poruku', isCorrect: false },
          { text: 'Pipeline — poruka prolazi kroz niz procesnih koraka sekvencijalno', isCorrect: false },
        ],
      },
      {
        text: 'Koja je ključna prednost asinkronog Publish/Subscribe modela?',
        options: [
          { text: 'Pošiljatelj ne zna tko prima i ne čeka odgovor — olabavljeno spajanje (loose coupling)', isCorrect: true },
          { text: 'Garantirana isporuka svake poruke bez gubitaka', isCorrect: false },
          { text: 'Samo jedan pretplatnik može primiti poruku — sprečava duplikate', isCorrect: false },
          { text: 'Poruke se automatski kriptiraju između pub i sub', isCorrect: false },
        ],
      },
    ],
  },
  {
    number: 22,
    title: 'Blockchain i pametni ugovori',
    category: 'ZELENA',
    keyConcepts: ['hash lanac', 'PoW vs PoS', 'if-then pametni ugovori', 'oracle', 'Bitcoin / Ethereum', 'nepromjenjivost'],
    content: `Što je Blockchain?
Blockchain = decentralizirana baza podataka blokova povezanih u jednosmjerni lanac. Svaki blok sadrži: podatke (transakcije), hash prethodnog bloka, vlastiti hash i vremensku oznaku.

Zašto je nepromjenjiv?
Promjena jednog bloka mijenja njegov hash → to mijenja hash sljedećeg bloka → lom cijelog lanca → odmah vidljivo svima. Nema centralne vlasti koja kontrolira — svi čvorovi imaju kopiju.

Mehanizmi konsenzusa:
• Proof of Work (PoW) — Rudari rješavaju matematičke probleme za potvrdu transakcija. Siguran ali ENERGETSKI ZAHTJEVAN (Bitcoin troši kao Norveška).
• Proof of Stake (PoS) — Validatori "ulažu" kriptovalutu kao zalog. Energetski učinkovitije, ali bogatiji imaju prednost (Ethereum 2.0).

Pametni ugovori (Smart Contracts):
Samoizvršavajući programi pohranjeni na blockchainu. Logika je "if-then":
IF (kupac pošalje 1 ETH) THEN (automatski pošalji vlasništvo)
• Nema posrednika (banke, odvjetnika, bilježnika)
• Automatski se izvršavaju kad su uvjeti ispunjeni
• Nepromjenjivi kad su postavljeni na blockchain
• Koriste oracle — pouzdani vanjski izvor podataka iz stvarnog svijeta`,
    quizQuestions: [
      {
        text: 'Zašto je blockchain nepromjenjiv?',
        options: [
          { text: 'Promjena jednog bloka mijenja njegov hash — lom cijelog lanca je odmah vidljiv svima', isCorrect: true },
          { text: 'Blockchain je pohranjen na centralnom, visoko zaštićenom serveru', isCorrect: false },
          { text: 'Svaki blok zahtijeva potvrdu od svih korisnika mreže prije pohrane', isCorrect: false },
          { text: 'Podaci su kriptirani AES-256 algoritmom koji se ne može razbiti', isCorrect: false },
        ],
      },
      {
        text: 'Proof of Work (PoW) je kritiziran zbog?',
        options: [
          { text: 'Ogromne potrošnje energije — Bitcoin troši struje kao cijela Norveška', isCorrect: true },
          { text: 'Centralizacije — jedna tvrtka kontrolira potvrdu svih transakcija', isCorrect: false },
          { text: 'Sporog rasta blockchain baze podataka na disku', isCorrect: false },
          { text: 'Nemogućnosti pohrane pametnih ugovora na lancu', isCorrect: false },
        ],
      },
    ],
  },
]

async function main() {
  console.log('🌱 Starting seed...')

  // Questions + quiz questions
  for (const q of questions) {
    const question = await prisma.question.upsert({
      where: { number: q.number },
      update: {
        title: q.title,
        content: q.content,
        category: q.category,
        keyConcepts: q.keyConcepts,
      },
      create: {
        number: q.number,
        title: q.title,
        content: q.content,
        category: q.category,
        keyConcepts: q.keyConcepts,
      },
    })

    for (const qq of q.quizQuestions) {
      const existing = await prisma.quizQuestion.findFirst({
        where: { questionId: question.id, text: qq.text },
      })

      if (!existing) {
        await prisma.quizQuestion.create({
          data: {
            questionId: question.id,
            text: qq.text,
            options: {
              create: qq.options,
            },
          },
        })
      }
    }

    console.log(`✅ Question ${q.number}: ${q.title}`)
  }

  console.log('🎉 Seed completed!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
