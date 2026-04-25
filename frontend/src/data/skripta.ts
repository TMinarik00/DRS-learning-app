export interface SkriptaQuestion {
  number: number
  title: string
  content: string
}

export interface SkriptaLecture {
  title: string
  questions: SkriptaQuestion[]
}

export const skripta: SkriptaLecture[] = [
  {
    title: 'Predavanje 1 — Uvod u raspodijeljene sustave',
    questions: [
      {
        number: 1,
        title: 'Usporedite raspodijeljeno i centralizirano računarstvo te navedite primjere',
        content:
          'Centralizirano računarstvo: Nekada su se računalne operacije obavljale na jednoprocesorskom računalu. Jednoprocesorsko računarstvo može se nazvati centraliziranim.\n\nRaspodijeljeno računarstvo: Raspodijeljeni sustav je skupina nezavisnih računala, spojenih mrežom, sposobnih za suradnju u obavljanju postavljenog zadatka. Značajno raste zahvaljujući povećanju performansi i smanjenju cijene računala i mreža.\n\nPrimjeri:\n• Internet\n• ATM (bankovna) računala\n• Intranet / Radne skupine (workgroups)\n• Sveprisutni (ubiquitous) umreženi uređaji ("Mreža je računalo").',
      },
      {
        number: 2,
        title: 'Programske komponente raspodijeljenog sustava i njihova uloga',
        content:
          '• Radne stanice (workstations): računala krajnjih korisnika za zahtjevne primjene.\n• Posrednički sloj (middleware): širi se preko više strojeva i daje aplikacijama isto sučelje.\n• Poslužitelji (servers): omogućavaju računalna sredstva (resources) i usluge (services).\n• Uređaji osobne pomoći (Personal Assistance Devices): ručna računala spojena bežičnom mrežom.',
      },
      {
        number: 3,
        title: 'Izazovi raspodijeljenog računarstva (najmanje 5)',
        content:
          '• Raznorodnost (heterogeneity): različiti hardver, softver, mreže.\n• Kašnjenje/prikrivenost (latency): kašnjenja u komunikaciji.\n• Udaljena vs. lokalna memorija: razlike u pristupu podacima.\n• Sinkronizacija: istovremeno (concurrent) međudjelovanje je normalno.\n• Djelomični kvarovi: aplikacije se moraju prilagoditi parcijalnim ispadima.\n• Otvorenost (openness): standardizirana sučelja i protokoli.\n• Sigurnost (security): odbijanje napada na razini usluga, mobilni kodovi.\n• Nadogradivost / proširivost (scalability).\n• Transparentnost (transparency).',
      },
      {
        number: 4,
        title: 'Problem i rješenje proširivosti (nadogradivosti)',
        content:
          'Nadogradivost postaje sve značajnija jer se računalna okružja bitno mijenjaju. Ključ su decentralizirani algoritmi i strukture podataka:\n• Niti jedan stroj nema cjelovitu informaciju cijelog sustava.\n• Strojevi donose odluke na temelju lokalno raspoloživih informacija.\n• Kvar na jednom stroju ne narušava izvođenje algoritama.\n• Implicitno se ne pretpostavlja globalno vrijeme ili sat.',
      },
      {
        number: 5,
        title: 'Problem i rješenje transparentnosti',
        content:
          'Transparentnost skriva složenost sustava od korisnika i aplikacija:\n• Pristupa: lokalni i udaljeni resursi dostupni istim operacijama.\n• Položaja: pristup bez saznanja o fizičkom ili mrežnom položaju.\n• Istovremenosti: mnoštvo procesa rade s dijeljenim resursima bez ometanja.\n• Repliciranja: višestruki resursi za pouzdanost/performanse, neprimjetno korisniku.\n• Pogreške/kvarova: prikrivanje pogrešaka, korisnik završava posao.\n• Mobilnosti: premještanje resursa i klijenta bez utjecaja.\n• Performansi: rekonfiguriranje sustava ovisno o opterećenju.\n• Nadogradnje (scaling): širenje bez promjene strukture.',
      },
      {
        number: 6,
        title: 'Usporedba asinkronog i sinkronog raspodijeljenog sustava',
        content:
          'Sinkroni sustav:\n• Vrijeme za izvođenje koraka procesa ima donju i gornju granicu.\n• Svaka poruka prenesena kanalom primljena je s poznatim ograničenjem kašnjenja.\n• Lokalni sat ima ograničen drift.\n\nAsinkroni sustav:\n• Korak procesa može trajati proizvoljno dugo.\n• Vrijeme isporuke poruka je proizvoljno.\n• Driftovi satova su proizvoljni.\n\nPosljedice:\n• U sinkronom: timeouts mogu otkriti pogreške.\n• U asinkronom: nemoguće otkriti pogrešku ili "postići sporazum" (reach agreement).',
      },
      {
        number: 7,
        title: 'Proizvoljne i vremenske pogreške',
        content:
          'Proizvoljne pogreške:\n• Stop pogreška: proces staje, ostali mogu otkriti.\n• Ispad (crash): proces staje, ostali NE mogu otkriti.\n• Propust (omission): poruka ne stiže.\n• Send-omission: send završen, no poruka nije u odlaznom spremniku.\n• Receive-omission: poruka u dolaznom spremniku, ali je proces ne prima.\n• Proizvoljna: proces ili kanal ponašaju se proizvoljno.\n\nVremenske pogreške:\n• Sat: lokalni sat prekoračuje drift.\n• Performanse procesa: prekoračenje intervala između koraka.\n• Performanse kanala: prijenos poruke traje dulje od ograničenja.',
      },
      {
        number: 8,
        title: 'Osnovni ciljevi posredničkog sloja (Middleware)',
        content:
          '• Vodi računa o raznorodnosti.\n• Podrška više razine: čini raspodijeljenu prirodu aplikacije transparentnom (npr. RPC, RPC + OO = CORBA).\n• Podrška prema programeru: prikazuje udaljene objekte, parcijalne pogreške (npr. JINI, JavaSpaces).\n• Dogradivost.',
      },
      {
        number: 9,
        title: 'Svojstva raspodijeljenih aplikacija i pozivanje poslužitelja',
        content:
          'Aplikacija = skup procesa raspodijeljenih po mreži, rade zajedno za rješavanje zajedničkog problema.\n• U prošlosti uglavnom klijent-poslužitelj: upravljanje resursima centralizirano na poslužitelju.\n• Peer-to-Peer računarstvo predstavlja pomak prema istinskim raspodijeljenim aplikacijama.',
      },
      {
        number: 10,
        title: 'Organizacija procesa i memorije',
        content:
          '• Višeprocesorski sustavi: dijeljena memorija.\n• Višeračunalni sustavi: zasebna memorija, komunikacija porukama.',
      },
      {
        number: 11,
        title: 'Usporedba OS-a (Raspodijeljeni, Mrežni, Posrednički)',
        content:
          'Raspodijeljeni OS: jedinstveni OS koji upravlja višeprocesorskim ili višeračunalnim sustavom kao jednom cjelinom (transparentnost potpuna).\n\nMrežni OS: svako računalo ima svoj OS; resursi se dijele preko mreže (npr. NFS), korisnik je svjestan udaljenosti.\n\nOS s posredničkim slojem: na vrhu mrežnog OS-a dodaje se middleware koji nudi transparentnost aplikacijama.',
      },
    ],
  },
  {
    title: 'Predavanje 2 — Paradigme raspodijeljenih sustava',
    questions: [
      {
        number: 12,
        title: 'Paradigme raspodijeljenih sustava prema razini složenosti',
        content:
          'Paradigme poredane od nižih prema višim razinama apstrakcije:\n1. Izmjena poruka\n2. Klijent-poslužitelj\n3. P2P\n4. Point-to-point i publish/subscribe\n5. RPC\n6. RMI\n7. Object Request Broker (ORB)\n8. Prostori objekata\n9. Mobilni agenti',
      },
      {
        number: 13,
        title: 'Paradigma izmjene poruka',
        content:
          'Temeljna paradigma raspodijeljenih aplikacija.\n• Proces šalje poruku (često zahtjev), prijemnik je obrađuje i može poslati odziv.\n• Osnovne operacije: send, receive (te connect/disconnect za spojnu komunikaciju).\n• Apstrakcija slična I/O datotekama; OS skriva detalje.\n• Socket API zasnovan je na ovoj paradigmi.',
      },
      {
        number: 14,
        title: 'Paradigma klijent-poslužitelj',
        content:
          'Najpoznatija paradigma mrežnih aplikacija. Asimetrične uloge:\n• Poslužitelj: davatelj usluge, pasivno čeka zahtjeve.\n• Klijent: izdaje zahtjeve i prihvaća odzive.\n• Sinkronizacija je pojednostavljena.\n• Primjeri: HTTP, FTP, DNS, finger, gopher.',
      },
      {
        number: 15,
        title: 'P2P raspodijeljena paradigma',
        content:
          'Računalni resursi i usluge izravno se izmjenjuju između računala.\n• Svaki sudionik može biti i klijent i poslužitelj.\n• Procesi imaju jednake uloge i odgovornosti ("peer" = ravnopravan).\n• Svaki sudionik može uputiti zahtjev drugom i primiti odziv.',
      },
      {
        number: 16,
        title: 'Point-to-point i publish/subscribe modeli poruka',
        content:
          'Point-to-point:\n• Sustav prosljeđuje poruku u red poruka primatelja.\n• Pohrana poruka, odvojeno slanje i prijem (asinkrono).\n• Primatelj izdvaja poruke iz reda.\n\nPublish/subscribe:\n• Svakoj poruci pridružena tema/događaj.\n• Pretplatnici primaju poruke svojih tema.\n• Operacije publish (multicast) i subscribe (osluškivanje).\n• Apstrakcija za multicasting.',
      },
      {
        number: 17,
        title: 'Poziv udaljene procedure (RPC)',
        content:
          'Cilj: programirati raspodijeljene programe slično jednoprocesnim.\n• IPC se odvija kao funkcijski poziv.\n• Proces A poziva proceduru na B s argumentima; B vraća rezultat.\n• Glavni API-ji:\n  – Open Network Computing RPC (Sun, 1980-e)\n  – Open Group DCE RPC\n• Alat rpcgen za pretvorbu RPC-a u LPC.',
      },
      {
        number: 18,
        title: 'Poziv udaljene metode (RMI)',
        content:
          '• RMI je objektno orijentirani ekvivalent od RMC (remote method call).\n• Proces poziva metode u objektima na udaljenom domaćinu.\n• Argumenti se prosljeđuju pozivanjem (kao u RPC-u).',
      },
      {
        number: 19,
        title: 'Object Request Broker (ORB) paradigma',
        content:
          '• Aplikacija izdaje zahtjeve prema ORB-u, koji ih usmjerava prema odgovarajućem objektu.\n• Bliska je RMI-u, ali ORB radi kao posrednički sloj za višestruki pristup udaljenim/lokalnim objektima.\n• Broker može raditi s raznorodnim objektima (razni jezici, platforme).\n• Osnova: OMG CORBA arhitektura.',
      },
      {
        number: 20,
        title: 'Paradigma prostora objekata',
        content:
          'Najveća apstrakcija OO paradigmi.\n• Pretpostavlja postojanje logičkog prostora objekata (object space).\n• Davatelj smješta objekte, tražitelji su pretplaćeni.\n• Virtualna "soba za sastanke" između davanja i zahtijevanja resursa.\n• Skriva detalje (RMI, ORB, mrežne usluge).\n• Primjer: JavaSpaces.',
      },
      {
        number: 21,
        title: 'Paradigma mobilnih agenata',
        content:
          '• Mobilni agent: prenosivi (transportable) program ili objekt.\n• Lansiran s izvornog domaćina, putuje od domaćina do domaćina po itineraryju.\n• Pri svakom stajanju pristupa resursima i obavlja zadatke.\n• Apstrakcija prenosivog programa: podatke nose programi koji putuju.',
      },
    ],
  },
  {
    title: 'Predavanje 3 — Niti, klijent/poslužitelj, virtualizacija, migracija koda',
    questions: [
      {
        number: 22,
        title: 'Prednosti i nedostaci višenitnosti u raspodijeljenim sustavima',
        content:
          'Prednosti:\n• Niti dijele adresni prostor → izmjena okoline jeftina.\n• Višenitni proces se izvodi transparentno na 1 ili više procesora.\n• Niti su prirodan strukturni mehanizam za neke aplikacije.\n• Blokiranje sustavskog poziva pogađa samo nit, ne cijeli proces.\n\nNedostaci:\n• Nadzor dijeljenih podataka u potpunosti je na programeru.\n• Isti adresni prostor → veća mogućnost pogreške.',
      },
      {
        number: 23,
        title: 'Izraz za paralelizam na razini niti',
        content:
          'Definicije:\n• cᵢ = vrijeme u kojem se i niti izvodi istovremeno.\n• N = maksimalan broj niti koje se mogu izvesti u isto vrijeme.\n\nParalelizam = Σ(i·cᵢ) / Σ(cᵢ), za i = 1..N.',
      },
      {
        number: 24,
        title: 'Detalji dizajna klijenta i poslužitelja',
        content:
          'Klijent:\n• Cilj: sredina za međudjelovanje korisnika s udaljenim poslužiteljima.\n• Višenitnost: skrivanje latency, više simultanih spajanja.\n• Položaj poslužitelja: poznat ili otkriven (lookup).\n• Način rada: blokiranje (sinkrono) ili neblokiranje (asinkrono).\n• Transparentnost repliciranja.\n\nPoslužitelj:\n• Krajnje točke: poznata, daemon, superposlužitelj.\n• Vrsta spajanja: TCP (connection-oriented) ili UDP (connectionless).\n• Obrada zahtjeva: concurrent ili iterative.\n• Stanje: stateful ili stateless.',
      },
      {
        number: 27,
        title: 'Razlika između poslužitelja s pamćenjem i bez pamćenja stanja',
        content:
          'Stateful:\n• Pamti stanja klijenata.\n• Bilježi otvorene datoteke, može prefetchirati.\n• Zna što je klijent cachirao, dopušta lokalne kopije.\n\nStateless:\n• Ne zadržava informacije o stanju klijenta.\n• Ne bilježi otvaranje datoteka (samo zatvori).\n• Ne brine o cachiranju.\n• Ne pamti aktivnosti klijenta.',
      },
      {
        number: 28,
        title: 'Virtualizacija',
        content:
          'Razlozi:\n• Sklopovlje se mijenja brže od softvera.\n• Pojednostavljuje prenosivost i migriranje koda.\n• Izolira neispravne ili napadnute komponente.\n\nRazine sučelja:\n• Arhitektura instrukcijskog skupa (privilegirane + opće instrukcije).\n• Sustavski pozivi (OS).\n• Bibliotečni pozivi (API).\n\nAlati: VirtualBox, JVM.',
      },
      {
        number: 29,
        title: 'Postupak i razlozi migriranja koda',
        content:
          'Definicije:\n• Migriranje procesa: cijeli proces premješten s jednog stroja na drugi.\n• Migriranje koda: premještaj dijela posla (klijent↔poslužitelj).\n\nRazlozi:\n• Dijeljenje opterećenja (load balancing).\n• Klijent-poslužitelj: kod s podacima ide klijentu (manje prijenosa za velike količine).\n• Dinamički konfigurabilni klijent.\n• Enterprise i Desktop Grids (npr. SETI@home).\n\nDinamičko konfiguriranje klijenta: klijent prvo dohvati kod, pa zove poslužitelj.',
      },
    ],
  },
  {
    title: 'Predavanje 4 — RPC, RMI, sockets',
    questions: [
      {
        number: 30,
        title: 'Koraci poziva udaljene procedure (RPC)',
        content:
          '1. Klijentska procedura poziva klijentski stub.\n2. Stub stvara poruku (marshalling parametara) i poziva lokalni OS.\n3. Klijentov OS šalje poruku preko mreže.\n4. Udaljeni OS daje poruku poslužiteljskom stubu.\n5. Poslužiteljski stub odpakira parametre.\n6. Poziv stvarne funkcije na poslužitelju.\n7. Poslužitelj obavi posao i vrati rezultat.\n8. Stub pakira rezultat u poruku i šalje preko OS-a.\n9. Poslužiteljski OS šalje poruku klijentovom OS-u.\n10. Klijentov OS daje poruku klijentskom stubu.\n11. Stub odpakira rezultat i vraća ga klijentskoj proceduri.',
      },
      {
        number: 33,
        title: 'Osam koraka stvaranja raspodijeljene aplikacije pomoću RMI-ja',
        content:
          '1. Definirati udaljeno sučelje (remote interface).\n2. Implementirati udaljene objekte.\n3. Implementirati klijenta.\n4. Registrirati udaljeni objekt u registry imena poslužitelja.\n5. Generirati komunikacijsku točku klijenta pomoću rmic.\n6. Pokrenuti registry.\n7. Pokrenuti poslužitelja.\n8. Pokrenuti klijenta.',
      },
      {
        number: 34,
        title: 'Pojam socketa, programiranje TCP-om i usporedba s UDP-om',
        content:
          'Socket: host-lokalno, aplikacijski kreirano, OS-upravljano sučelje (vrata) za slanje/prijem poruka.\n\nTCP socket programiranje:\n• Poslužitelj se prvo pokreće i osluškuje.\n• Klijent kreira TCP socket s IP-om i portom poslužitelja.\n• Kreira se veza (handshaking).\n• Poslužitelj kreira novi socket za komunikaciju s klijentom (može više klijenata).\n• Pouzdan, poredani prijenos bajta ("pipe").\n\nUDP socket programiranje:\n• Bez konekcije (no handshaking).\n• Pošiljatelj eksplicitno dodaje IP/port odredišta.\n• Primatelj izdvaja IP/port pošiljatelja iz datagrama.\n• Nepouzdan prijenos grupa bajta (datagrams), moguć gubitak ili neredoslijed.',
      },
      {
        number: 35,
        title: 'Tri uzorka prilagodbe socketa',
        content:
          '1. Request-reply\n2. Publish-subscribe\n3. Pipeline',
      },
    ],
  },
  {
    title: 'Predavanje 5 — Imenovanje i lociranje entiteta',
    questions: [
      {
        number: 36,
        title: 'Raspodijeljene hash tablice (DHT)',
        content:
          '• Hash tablica ubrzava traženje po identifikatoru.\n• Raspodijeljena hash tablica = raspodijeljeni pristup za lookups.\n• Svaki čvor prati svoje susjede i pokreće linearno pretraživanje po prstenu.',
      },
      {
        number: 38,
        title: 'Hijerarhijski pristup lociranju entiteta',
        content:
          'Organizacija domena:\n• Svaka domena ima direktorijski čvor.\n• Domena gornje razine predstavlja cijelu mrežu.\n• Stablo domena se rekurzivno dijeli (npr. LAN čvorne domene).\n\nZapisi i pretraživanje:\n• Svaki entitet ima zapis u svakom nasljedniku u stablu (do korijena).\n• Pretraživanje ide prema gore dok se ne nađe zapis, pa pokazivači dolje do entiteta.\n\nUbacivanje/brisanje:\n• Insert: traži se prvi referenciran čvor; svi čvorovi prema dolje se osvježavaju.\n• Delete: udaljavanje od čvora prema korijenu.',
      },
      {
        number: 39,
        title: 'Mobilni entiteti s gledišta dodjeljivanja imena',
        content:
          'Pronalazak mobilnog entiteta:\n• Prosljeđivanje pokazivača stvara povezanu listu (klijentska/poslužiteljska krajnja točka).\n• Ažuriranje lokacije: A→B, A ostavlja referencu na B.\n• Shortcut na klijentskoj krajnjoj točki drži lanac kratkim.\n• Krajnja točka koja se dugo ne koristi može se udaljiti.\n\nDomaća lokacija (Home Location):\n• Uvijek zna trenutnu lokaciju entiteta.\n• Ako entiteta nema na home, poruka se preusmjeri i nova lokacija se javi klijentu.',
      },
      {
        number: 40,
        title: 'Definicije: LDAP, UDDI i WSDL',
        content:
          'LDAP (Lightweight Directory Access Protocol):\n• Aplikacijski protokol za upite i izmjene direktorija u IP mrežama.\n• Direktorij = skup objekata s atributima u hijerarhiji.\n• Koristi DNS imena za gornje slojeve hijerarhije.\n• Zapis = parovi (attribute, value); zbirka = Directory Information Base (DIB).\n\nUDDI (Universal Description, Discovery and Integration):\n• XML/SOAP registry za opis, otkrivanje i upravljanje web uslugama.\n• Standardni taxonomy za poslove, usluge, tipove usluga.\n• UDDI Business Registry: globalna lista, ne sadrži detaljne specifikacije.\n\nWSDL (Web Services Definition Language):\n• Formalni jezik (IDL) za RPC komunikaciju na webu.\n• Sadrži definicije sučelja (tipovi podataka, položaj…).\n• Može se prevesti za klijent/poslužitelj komunikacijsku točku.\n• Često se koristi sa SOAP-om.',
      },
    ],
  },
  {
    title: 'Predavanje 6 — Sinkronizacija, satovi, koordinacija',
    questions: [
      {
        number: 41,
        title: 'Christianov algoritam sinkronizacije fizičkog sata',
        content:
          'Problem: svaki stroj ima svoj sat, satovi driftaju.\n\nRješenje:\n• Christianov algoritam i NTP periodično uzimaju vrijeme s pouzdanog vremenskog poslužitelja.\n• Proces P snima round-trip vrijeme T = (t₁ - t₀) i procjenjuje vrijeme: t_server + T/2.\n• Pretpostavka: simetrično kašnjenje u oba smjera.',
      },
      {
        number: 42,
        title: 'Logički satovi i Lamportovi satovi',
        content:
          'Često nije bitno stvarno vrijeme, već redoslijed događaja.\n\nLamportovi logički satovi:\n• Sustav = procesi koji komuniciraju porukama; svaki proces niz događaja.\n• Relacija "dogodilo se prije" (→):\n  – Ako su a, b u istom procesu i a prije b → a → b.\n  – Ako je a slanje, b prijem iste poruke → a → b.\n• Dva događaja su konkurentna ako ne postoji relacija (a || b).\n• Tranzitivna, definira parcijalnu uređenost.\n• Totalna uređenost: pridruži broj procesa.\n\nPravilo sata: ako a → b, onda C(a) < C(b). Sat se može samo pomicati unaprijed.',
      },
      {
        number: 43,
        title: 'Usporedba tri algoritma međusobnog isključivanja',
        content:
          '1. Centralizirani:\n• Proces pita koordinatora; ako je slobodno, dobiva dozvolu.\n• Drugi se stavlja na čekanje.\n• Kad prvi izađe, koordinator obavještava drugog.\n\n2. Ricart/Agrawala (decentralizirani):\n• Procesi se nadmeću; pobjeđuje onaj s najmanjom timestamp.\n• Pobjednik šalje OK ostalima nakon završetka.\n\n3. Token Ring (prsten s oznakom):\n• Token kruži prstenom.\n• Tko ima token, smije ući u kritični odsječak; zatim ga prosljeđuje.\n• Problem: gubitak tokena teško je detektirati.',
      },
      {
        number: 44,
        title: 'Bullyjev algoritam nadglasavanja (izbor koordinatora)',
        content:
          'Postupak:\n• Proces P uoči da koordinator ne odgovara → inicira izbore.\n• P šalje ELECTION svim procesima s većim brojevima.\n• Ako nitko ne odgovori, P postaje koordinator.\n• Ako veći proces odgovori, on preuzima izbore.\n\nPrimjer:\n• Proces 4 vidi da 7 (koordinator) ne radi → šalje na 5 i 6.\n• 5 i 6 odgovaraju, govore 4 da stane.\n• 6 govori 5 da stane (6 ima veći broj).\n• 6 dobiva izbore, javlja svima da je novi koordinator.\n• Ako se 7 vrati, preuzima jer ima najveći broj.',
      },
      {
        number: 45,
        title: 'GPS i WiFi lokacijske usluge',
        content:
          'GPS:\n• Informacije o blizini dohvaćaju se upitima prema satelitima.\n\nWiFi:\n• Baza poznatih pristupnih točaka (AP) s koordinatama.\n• Iz signala se procjenjuje udaljenost; s 3 AP-a triangulacija.\n• Centroid: AP otkriven na N lokacija s GPS koordinatama → položaj AP-a = prosjek koordinata.\n\nProblemi:\n• Ograničena točnost GPS-a.\n• Nejednak domet AP-a.\n• Mali broj uzoraka → pogreške izračuna udaljenosti.',
      },
    ],
  },
  {
    title: 'Predavanje 7 — Raspodijeljeni objekti (RMI, CORBA)',
    questions: [
      {
        number: 46,
        title: 'Mehanizmi koji podržavaju paradigmu raspodijeljenih objekata',
        content:
          '• Java Remote Method Invocation (RMI)\n• Common Object Request Broker Architecture (CORBA)\n• Distributed Component Object Model (DCOM)\n• Simple Object Access Protocol (SOAP)',
      },
      {
        number: 47,
        title: 'Osnove rada Java RMI arhitekture',
        content:
          'Definicija:\n• RMI = OO implementacija RPC-a, isključivo za Javu.\n• Object server isporučuje udaljeni objekt i registrira ga s directory uslugom.\n• Klijent poziva udaljene metode.\n\nSintaksa:\n• Udaljeni objekt deklariran s remote interface (ekstenzija Java sučelja).\n• Object server ga implementira.\n• Klijent pristupa pomoću RMI sintakse.\n\nAPI uključuje:\n• Remote Interface (Java Remote class)\n• Server-side: implementacija sučelja, generiranje Stub i Skeleton, Object Server\n• Client-side: stub\n\nLociranje:\n• Klijent locira RMI Registry na poslužitelju i traži referencu na objekt.',
      },
      {
        number: 48,
        title: 'Osnove rada CORBA sustava raspodijeljenih objekata',
        content:
          'Definicija:\n• CORBA = standardna arhitektura sustava raspodijeljenih objekata.\n• Suradnja u raznorodnim okružjima (razni jezici i platforme).\n\nRazlike od RMI:\n• RMI: Sun Microsystems, samo Java.\n• CORBA: OMG, industrijski konzorcij, mnogo jezika.\n\nNačin rada:\n• CORBA = skup protokola.\n• Object Interface definiran u CORBA IDL (univerzalan jezik).\n• IDL syntax slična Javi/C++; mapiranje za C, C++, Java, COBOL, Smalltalk, Ada, Python…\n• OMG standardizira mapiranje, prevoditelj generira sučelje i proxy datoteke.',
      },
    ],
  },
  {
    title: 'Predavanje 8 — Paralelno i raspodijeljeno računarstvo, MPI',
    questions: [
      {
        number: 49,
        title: 'Pitanja na koja odgovaraju problemi paralelizacije',
        content:
          '• Kako dodijeliti jedinice posla radnicima?\n• Što kada imamo više jedinica posla nego radnika?\n• Što kada radnici trebaju dijeliti parcijalne rezultate?\n• Kako skupiti parcijalne rezultate?\n• Kad ćemo znati da su svi obavili posao?\n• Što ako radnik nestane?',
      },
      {
        number: 50,
        title: 'Razlika između paralelne i raspodijeljene obradbe',
        content:
          'Paralelno računarstvo:\n• Vektorska obrada podataka.\n• Više CPU jedinica u jednom računalu.\n\nRaspodijeljeno računarstvo:\n• Više CPU jedinica na više računala.',
      },
      {
        number: 51,
        title: 'Model raspodijeljenog računala: Grozd i Splet',
        content:
          'Grozd (Cluster):\n• Skup računala povezanih lokalnom mrežom.\n• Manji broj računala, veća brzina komunikacije.\n• Najsličniji multiračunalu.\n\nSplet (Grid):\n• Infrastruktura za pristup resursima na svakom mjestu.\n• Veći broj računala, različita brzina komunikacije.',
      },
      {
        number: 52,
        title: 'Načini obradbe',
        content:
          '• Master/Worker (Gospodar/Radnik)\n• Producer/Consumer (Proizvođač/Potrošač)\n• Shared Queue (Dijeljeni red čekanja)',
      },
      {
        number: 53,
        title: 'Osnovni modeli (paradigme) paralelnih programa',
        content:
          '1. Komunikacija porukama (Message Passing):\n• Najkorišteniji model.\n• Više zadataka neovisno; podaci preko poruka.\n• SPMD (Single Program Multiple Data) — jedan program na više procesora.\n• Različite uloge (npr. master-slave) unutar jednog programa.\n\n2. Podatkovni paralelizam (Data Parallelism):\n• Ista operacija nad više elemenata strukture.\n• Primjer: HPF (High Performance Fortran).\n\n3. Zajednička memorija (Shared Memory):\n• Procesori dijele isti memorijski spremnik (asinkrono).\n• Mogući nedeterministički algoritmi.\n• Eksplicitni mehanizmi zaštite (semafori).\n• Jednostavnije programiranje.\n\n4. Sustav zadataka i kanala (Tasks and Channels):\n• Usmjereni graf: čvorovi = zadaci, veze = kanali.\n• Broj zadataka može se mijenjati tijekom izvođenja.\n• Poopćenje komunikacije porukama.',
      },
      {
        number: 54,
        title: 'Amdahlov zakon ubrzanja',
        content:
          'Potencijalno ubrzanje definirano udjelom P (P ∈ [0,1]) slijednog programa koji se može paralelizirati.\n\nFormula: Speedup = 1 / ((1-P) + P/N), gdje N je broj procesora.\n\nPrimjer:\n• P = 0.5 → max ubrzanje 2.\n• P = 1 → ubrzanje (teoretski) beskonačno.',
      },
      {
        number: 55,
        title: 'Koraci pretvorbe slijednog algoritma u paralelni',
        content:
          '1. Pronaći dijelove koji se mogu izvoditi istodobno (znati algoritam ili čak ga izmijeniti).\n2. Rastaviti algoritam:\n   • Funkcionalna dekompozicija\n   • Podatkovna dekompozicija\n   • Kombinacija\n3. Ostvarenje programa:\n   • Odabir paradigme i sklopovskog okruženja\n   • Komunikacija (način, učestalost, sinkronizacija)\n   • Vanjska kontrola izvođenja\n   • Ispravljanje grešaka i optimiranje.',
      },
      {
        number: 56,
        title: 'Tipovi dekompozicije problema',
        content:
          'Funkcionalna dekompozicija:\n• Podjela na manje funkcionalne dijelove.\n• Svaki procesor dio petlje.\n• Primjeri: pretraživanje stabla, klimatski model (atmosfera, ocean, površina).\n\nPodatkovna dekompozicija:\n• Podjela podataka; obično jednostavnija.\n• Svaki procesor obrađuje stupac/redak/podmatricu.\n• Primjeri: višedimenzijske strukture (volumen, površina).',
      },
      {
        number: 59,
        title: 'Nakupine računala (Clusters)',
        content:
          'Definicija: postrojenje umreženih COTS računala koja zajedno rješavaju problem.\n\nVrste:\n• HPC (High Performance Computing) — npr. Beowulf Cluster (90-e: data mining, simulacije, klima); ROCKS NPACI.\n• Load Balancing — performanse kroz raspodjelu opterećenja (FTP, web).\n• HA (High Availability) — sprječavaju ispade, sa zalihošću; RedHat HA, Turbolinux, Linux Virtual Server.',
      },
      {
        number: 60,
        title: 'Primjeri raspodijeljenih računalnih sustava',
        content:
          '• ATM mreže\n• IoT\n• Gridovi i clusteri (CRO NGI, HR-ZOO, Isabella Cluster)\n• Sveprisutni umreženi uređaji\n\nRaspodijeljeni su jer mogu obavljati zadatke odvojeno ili zajednički, povezani LAN-om ili Internetom.',
      },
      {
        number: 61,
        title: 'Željena svojstva paralelnih programa',
        content:
          '• Istodobnost: izvođenje više radnji istovremeno.\n• Skalabilnost: prilagodba broju procesora ("algoritam koji radi samo na X procesora je loš").\n• Lokalnost: veći omjer lokalnog vs. udaljenog pristupa memoriji.\n• Modularnost: dijelovi algoritma koristiti u različitim programima.',
      },
      {
        number: 62,
        title: 'Četiri faze razvoja paralelnog algoritma',
        content:
          '1. Podjela (Partitioning) — dekompozicija problema na cjeline (zanemaruje broj procesora).\n2. Komunikacija (Communication) — definiranje potrebne komunikacije među zadacima.\n3. Aglomeracija (Agglomeration) — grupiranje zadataka i kanala radi performansi.\n4. Pridruživanje (Mapping) — dodjela zadataka procesorima (statički ili dinamički).',
      },
      {
        number: 63,
        title: 'Podjela međuprocesne komunikacije',
        content:
          '• Lokalna / Globalna: lokalna s manjim skupom; globalna sa svima.\n• Strukturirana / Nestrukturirana: pravilna struktura (stablo, prsten) vs. proizvoljan skup.\n• Statična / Dinamična: skup zadataka fiksan ili se mijenja.\n• Sinkrona / Asinkrona: koordinirano sudjelovanje vs. samostalan zahtjev bez aktivne suradnje.',
      },
      {
        number: 64,
        title: 'Datoteke zaglavlja (Header files)',
        content:
          '• OpenMP: #include <omp.h>\n• MPI: #include <mpi.h>',
      },
      {
        number: 65,
        title: 'Osnovne funkcije u MPI programu',
        content:
          '• int MPI_Init(int *argc, char ***argv) — prije svake MPI komunikacije.\n• int MPI_Finalize() — na kraju programa.',
      },
      {
        number: 66,
        title: 'Tipovi podataka u MPI C++ okruženju',
        content:
          '• MPI_CHAR, MPI_SHORT\n• MPI_INT, MPI_LONG\n• MPI_UNSIGNED (i varijante)\n• MPI_FLOAT, MPI_DOUBLE',
      },
      {
        number: 67,
        title: 'Funkcije slanja i prijema (blokirajuća komunikacija)',
        content:
          'Pošiljatelj zove Send, primatelj Recv.\n\nParametri:\n• buf — adresa podataka\n• count — broj jedinica\n• datatype — MPI tip\n• dest/source — rank\n• tag — vrsta poruke\n• comm — komunikator (npr. MPI_COMM_WORLD)\n• status — info o poruci (status.MPI_TAG, status.MPI_SOURCE)\n\nPonašanje:\n• Povratak iz MPI_Recv → poruka primljena.\n• Povratak iz MPI_Send → memorija ponovno upotrebljiva (ne nužno primljeno).',
      },
      {
        number: 68,
        title: 'Funkcije slanja i prijema (neblokirajuća komunikacija)',
        content:
          'Funkcije: MPI_Isend, MPI_Irecv.\n\nParametri:\n• Isti kao kod blokirajućih + request umjesto status.\n\nPonašanje:\n• MPI_Isend završava kad se izlazni međuspremnik može opet koristiti.\n• MPI_Irecv završava kad se ulazni međuspremnik može koristiti.',
      },
      {
        number: 69,
        title: 'Kolektivna komunikacija: Scatter i Gather',
        content:
          'MPI_Scatter:\n• Raspodjeljuje dijelove niza s root procesa svakom procesu.\n\nMPI_Gather:\n• Prikuplja dijelove niza od svih procesa u recvbuf na root.',
      },
      {
        number: 70,
        title: 'Razašiljanje poruka (Broadcast)',
        content:
          '• Šalje isti podatak svim procesima u komunikatoru.\n• Na root procesu buffer se čita; na ostalima upisuje.',
      },
      {
        number: 71,
        title: 'Sinkronizacija na barijeru',
        content:
          '• int MPI_Barrier(MPI_Comm comm)\n• Globalna sinkronizacija svih procesa unutar komunikatora.\n• Niti jedan ne nastavlja dok svi ne stignu.',
      },
      {
        number: 72,
        title: 'Redukcija (Reduce)',
        content:
          '• Skuplja podatke s adrese sendbuf svih procesa.\n• Provodi operaciju definiranu parametrom op.\n• Rezultat sprema u recvbuf na root procesu.',
      },
      {
        number: 73,
        title: 'Dohvaćanje broja i ranga procesa',
        content:
          '• Broj procesa: int MPI_Comm_size(MPI_Comm comm, int *size)\n• Rang procesa: int MPI_Comm_rank(MPI_Comm comm, int *rank)',
      },
    ],
  },
  {
    title: 'Predavanje 9 — OpenMP',
    questions: [
      {
        number: 75,
        title: 'Osnovni elementi OpenMP programske okoline',
        content:
          '• Stvaranje niti\n• Raspodjela opterećenja\n• Upravljanje okolinom podataka\n• Sinkronizacija niti\n• Run-time rutine korisničkog sloja\n• Varijable okoline',
      },
      {
        number: 76,
        title: 'Smjernica (pragma) za paraleliziranje for petlje',
        content:
          'Pragma: smjernica prevoditelju u C/C++ (može je ignorirati).\n\nPrimjer:\n#pragma omp parallel for\nfor (i = 0; i < N; i++)\n    a[i] = b[i] + c[i];\n\nPrevoditelj omogućuje run-time raspoređivanje ponavljanja petlje.',
      },
      {
        number: 77,
        title: 'Funkcije omp_get_num_procs i omp_set_num_threads',
        content:
          '• omp_get_num_procs(void) — vraća broj fizički raspoloživih procesora.\n• omp_set_num_threads(int t) — postavlja broj niti u paralelnim sekcijama (može se zvati više puta).',
      },
      {
        number: 78,
        title: 'Klauzule definiranja vidljivosti varijabli',
        content:
          '• private — svaka nit ima svoju privatnu kopiju.\n• firstprivate — privatna + inicijalna vrijednost (jednom po niti).\n• lastprivate — kopira vrijednost iz zadnje (slijedne) iteracije natrag u master.\n• critical (pragma) — kritični odsječak: u nekom trenutku samo jedna nit.',
      },
      {
        number: 79,
        title: 'Redukcija (Reduce) u OpenMP',
        content:
          '• reduction klauzula u parallel for pragmi.\n• OpenMP sprema parcijalne rezultate u privatne varijable i kombinira ih nakon petlje.\n\nSintaksa: reduction(<op>:<var>)\n\nOperatori: + (zbroj), * (umnožak), & (Bit I), | (Bit ILI), ^ (Bit EX-ILI), && (Logički I), || (Logički ILI).',
      },
      {
        number: 80,
        title: 'Mogućnosti i opcije raspoređivanja u OpenMP',
        content:
          'Statičko: niski troškovi, moguća neravnoteža.\nDinamičko: visoki troškovi, manja neravnoteža.\nKomadić (chunk): neprekidan raspon iteracija. Veći chunk → manje overhead, bolji cache hit; manji → bolja ravnoteža.\n\nOpcije:\n• schedule(static) — blokovi neprekidnih iteracija.\n• schedule(static, C) — chunkovi duljine C umetnuti niti.\n• schedule(dynamic) — jedan-po-jedan dinamički.\n• schedule(dynamic, C) — C iteracija odjednom.\n• schedule(guided, C) — početni veći chunkovi, zatim manji (do C).\n• schedule(runtime) — odluka prema OMP_SCHEDULE.',
      },
      {
        number: 81,
        title: 'Smjernice parallel, for, single, nowait i sections',
        content:
          '• parallel — sve niti izvode blok (replicirano izvođenje).\n• for — for petlja se dijeli među nitima.\n• single — samo jedna nit izvodi blok (npr. ispis).\n• nowait — uklanja implicitnu barijeru na kraju.\n• section — različitim nitima dodjeljuju se uzastopni nezavisni blokovi.',
      },
      {
        number: 82,
        title: 'Dva glavna pristupa paralelizmu u OpenMP-u',
        content:
          '• Inkrementalni paralelizam — paralelizacija postupno, dio po dio.\n• Podatkovni paralelizam — ista operacija nad različitim dijelovima podataka.',
      },
      {
        number: 83,
        title: 'Razlika između zajedničkih i privatnih varijabli',
        content:
          '• Zajedničke (Shared): iste adrese u okolini svake niti.\n• Privatne (Private): različite adrese u okolini svake niti.',
      },
      {
        number: 84,
        title: 'Temeljne funkcije OpenMP okruženja',
        content:
          'Za SPMD programiranje:\n• omp_get_thread_num() — broj niti.\n• omp_get_num_threads() — ukupan broj niti.',
      },
    ],
  },
  {
    title: 'Predavanje 10 — Splet računala (Grid)',
    questions: [
      {
        number: 85,
        title: 'Splet računala (Grid Computing)',
        content:
          'Definicija: paralelni i raspodijeljeni sustav za dijeljenje, izmjenu, izbor i nakupljanje zemljopisno raspodijeljenih autonomnih sredstava.\n\nResursi: računala, programi, baze podataka, posebni uređaji (npr. radio teleskop), ljudi.\n\nOblici upotrebe:\n• Utility computing\n• Data center automation\n• Financial modelling\n• Life sciences',
      },
      {
        number: 87,
        title: 'Primjeri spleta računala u primjeni',
        content:
          '• Problem Solving Environment (PSE) za kemiju — koristi Globus za autentifikaciju, podnošenje poslova, nadzor.\n• High-Throughput Computing (HTCondor) — okvir za distribuiranu paralelizaciju zahtjevnih zadataka.\n• Kolaborativni inženjering — dijeljeni prostor sa simulacijama i tokovima (video, audio, podaci); Globus komunikacija.',
      },
      {
        number: 88,
        title: 'Usluge spleta računala',
        content:
          '• Sigurnost\n• Informacije / direktoriji\n• Upravljanje resursima\n• Pristup podacima\n• Računovodstvo (accounting)',
      },
      {
        number: 89,
        title: 'Osnovna načela oblaka računala (Cloud Computing)',
        content:
          '• Proširenje SOA na resurse u oblaku.\n• Uključuje: spremnik, podaci, platforma kao usluga.\n• Oslanja se na skalabilnost Interneta i niz uređaja.',
      },
      {
        number: 90,
        title: 'Potrošači vs. davatelji usluga spleta računala',
        content:
          'Potrošači:\n• Izvršavaju poslove za rješavanje problema.\n• Profitiraju mudrim korištenjem resursa (manji troškovi).\n\nDavatelji:\n• Doprinose resurse za izvođenje poslova.\n• Profitiraju povećanjem korisnosti resursa (povrat uloženog).',
      },
      {
        number: 91,
        title: 'Grid Service Broker (GSB)',
        content:
          'Broker koji raspoređuje aplikacijske zadatke na temelju statičkih i dinamičkih parametara spleta.\n\nMogućnosti:\n• Single window za upravljanje eksperimentom\n• Otkrivanje resursa i trgovina resursima\n• Otkrivanje optimalnih izvora podataka\n• Računovodstvo (accounting)',
      },
      {
        number: 92,
        title: 'Dodatni primjeri spleta računala',
        content:
          '• Collaborative Engineering — dijeljeni prostor i tokovi.\n• High-Throughput Computing — više nezavisnih zadataka uz sigurnost i otkrivanje.\n• Problem Solving Environment — specifična okruženja (npr. kemija).',
      },
    ],
  },
  {
    title: 'Predavanje 11 + dodatno — Web usluge, oblak, lanci blokova',
    questions: [
      {
        number: 93,
        title: 'Dva glavna tipa web usluga',
        content:
          '• REST web usluge — XML/JSON reprezentacije resursa, uniformni stateless skup operacija.\n• Proizvoljne web usluge — usluga može obavljati proizvoljan skup operacija.',
      },
      {
        number: 95,
        title: 'Oblak računala: načela i usporedba',
        content:
          'Načela:\n• Proširenje SOA na resurse (IaaS, PaaS, SaaS).\n• Bitno je odrediti koje usluge su dobri kandidati za oblak.\n\nUsporedba:\n• Oblak i splet dijele namjeru i arhitekture, ali se razlikuju u programskom i poslovnom modelu.\n• Virtualizacija je neizostavna za oblak; splet se ne mora oslanjati na nju.',
      },
      {
        number: 97,
        title: 'Modeli isporuke oblak računala',
        content:
          '• SaaS (Software as a Service) — korisnici koriste usluge na zahtjev kroz preglednik; ne rukuju sklopovljem.\n• PaaS (Platform as a Service) — platforme izgrađene na infrastrukturi; složeno upravljanje platformom.\n• IaaS (Infrastructure as a Service) — virtualizirana platforma (računala, spremnici).',
      },
      {
        number: 98,
        title: 'Usluge oblaka računala (≥7)',
        content:
          '1. Spremnik kao usluga (Storage-as-a-service)\n2. Baza podataka kao usluga\n3. Informacija kao usluga\n4. Aplikacija kao usluga\n5. Platforma kao usluga\n6. Sigurnost kao usluga\n7. Testiranje kao usluga',
      },
      {
        number: 99,
        title: 'Kada je oblak optimalan izbor?',
        content:
          'Oblak je optimalan kada:\n• Procesi i aplikacije su visoko nezavisni.\n• Točke integracije su dobro definirane.\n• Dopuštena je niža razina sigurnosti.\n• Web je priželjkivana platforma.\n• Troškovi su bitni.',
      },
      {
        number: 100,
        title: 'Google App Engine',
        content:
          '• Najpoznatija PaaS usluga.\n• Korisnik pristupa preko preglednika aplikaciji u Pythonu ili Javi.\n• Poslovi se pokreću kao raspoređeni cron poslovi.',
      },
      {
        number: 101,
        title: 'Microsoft Windows Azure',
        content:
          '• Oblak računala i infrastruktura za izgradnju, implementaciju i upravljanje aplikacijama.\n• Pruža PaaS i IaaS usluge.\n• Razvoj uz alate poput Visual Studija.',
      },
      {
        number: 102,
        title: 'Usporedba AWS, Azure i Google Cloud',
        content:
          '• AWS — globalni doseg, stabilan servis, fleksibilnost; veće kompanije.\n• Azure — migracija na cloud, Windows aplikacije, hibridna rješenja, developeri.\n• Google Cloud — kontejner-bazirani modeli, hiperskala, "zeleno računarstvo".',
      },
      {
        number: 103,
        title: 'Višeslojna arhitektura i CGI',
        content:
          '• CGI (Common Gateway Interface) — standardni način izvršavanja programa na poslužitelju s podacima kao ulazom.\n• Troslojna arhitektura web sjedišta: web poslužitelj, poslužitelj aplikacija, baza podataka.',
      },
      {
        number: 104,
        title: 'HTTP metode',
        content:
          '• HEAD — povratak zaglavlja dokumenta.\n• GET — povratak dokumenta klijentu.\n• PUT — pohranjivanje dokumenta.\n• POST — slanje podataka koji se dodaju u dokument.\n• DELETE — brisanje dokumenta.',
      },
      {
        number: 105,
        title: 'SOAP protokol',
        content:
          '• SOAP (Simple Object Access Protocol) — XML-based, neovisan o platformi.\n• Tekstualna komunikacija preko HTTP-a.\n• Poruka u omotnici: body (aktualna poruka) + header (proizvoljno).',
      },
      {
        number: 106,
        title: 'REST arhitektura',
        content:
          '• Načela: HTTP metode, stateless, struktura aplikacije pomoću URI-ja.\n• Formati prijenosa: XHTML, JSON ili XML.',
      },
      {
        number: 107,
        title: 'Skalabilna sadržajno osviještena nakupina web poslužitelja',
        content:
          '• Potpuno ili djelomično repliciranje sadržaja.\n• Sadržajno osviješteno cachiranje (content-aware caching).',
      },
      {
        number: 108,
        title: 'Formati podataka: XML, JSON, RSS',
        content:
          '• XML — hijerarhijska struktura s tagovima (<tag>...</tag>).\n• JSON — parovi ključ-vrijednost ("za": "ImePrezime").\n• RSS — XML format specifičan za feedove (<rss>...</rss>).',
      },
      {
        number: 109,
        title: 'MVC i WCF',
        content:
          '• MVC (Model-View-Controller) — Model (podaci), View (prikaz), Controller (logika i interakcija).\n• WCF (Windows Communication Foundation) — okvir za izradu uslugama orijentiranih aplikacija s komunikacijom među poslužiteljima.',
      },
      {
        number: 111,
        title: 'Obrasci MVC, MVVM i MVP',
        content:
          '• MVC — vidi pitanje 109.\n• MVVM (Model-View-ViewModel) — ViewModel je veza između modela i prikaza (često u Xamarinu).\n• MVP (Model-View-Presenter) — Presenter djeluje na model i pogled, dovodi podatke i formatira ih za prikaz.',
      },
      {
        number: 112,
        title: 'Zeleno računarstvo (Green Computing)',
        content:
          'Problemi:\n• Disipacija topline, potrošnja energije, troškovi.\n\nCilj:\n• Smanjiti potrošnju uz očuvanje performansi (standardi: EPEAT, Energy Star).\n\nRješenja:\n• Napredno upravljanje potrošnjom\n• "Pametnije aplikacije"\n• Virtualizacija',
      },
      {
        number: 113,
        title: 'Principi uštede energije procesora i memorije',
        content:
          '• CPU: DVFS (Dynamic Voltage and Frequency Scaling) — smanjenje napona/frekvencije kad je iskorištenost niska.\n• Memorija: CLTT i OLTT (prigušivanje propusnosti). Gašenje memorije kad nije potrebna.',
      },
      {
        number: 117,
        title: 'Kriptovalute',
        content:
          '• Bitcoin: izvor su P2P transakcije, ograničena količina (21 milijun), bez posrednika.\n• Tokeni: pohrana vrijednosti, djeluju kao novac.\n• Tipovi: Bitcoin, Pi, Ethereum, Litecoin.',
      },
      {
        number: 118,
        title: 'Pametni ugovori (Smart Contracts)',
        content:
          '• Samoautomatizirajući programi koji brinu o uvjetima ugovora ("if-then" kriterij).\n• Uključuju varijable i proročanstva (oracles) kao pouzdane izvore.',
      },
      {
        number: 120,
        title: 'Koncept lanaca blokova (Blockchain)',
        content:
          '• Baza podataka blokova povezanih u jednosmjerni lanac.\n• Proof of Work (PoW): rudari potvrđuju transakcije zahtjevnim izračunima.\n• Proof of Stake (PoS): ulaganje kriptokovanica za potvrđivanje.\n\nGrananje (forks):\n• Soft fork — kompatibilan unatrag.\n• Hard fork — nije kompatibilan; alternativni lanac (oni koji ne prihvate ne sudjeluju).',
      },
      {
        number: 122,
        title: 'Tokovi podataka',
        content:
          '• Neograničeni slijedovi događaja.\n• Operatori toka podataka troše i proizvode tokove.\n• Događaji se mogu samo jednom koristiti.',
      },
      {
        number: 123,
        title: 'MapReduce, Hadoop, Spark, Flink',
        content:
          '• MapReduce — jednostavnija obrada na velikim nakupinama.\n• Hadoop (HDFS) — raspodijeljeni datotečni sustav (write-once-read-many).\n• Spark — in-memory okvir, podržava SQL, grafove, strojno učenje.\n• Flink — open source okvir sa stvarnim streamingom u jezgri.',
      },
    ],
  },
]
