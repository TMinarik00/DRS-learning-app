# DRS — Distribuirani Računalni Sustavi

Web aplikacija za pripremu ispita iz kolegija **Distribuirani Računalni Sustavi**. Sadrži skriptu, brzo učenje s 22 najčešća ispitna pitanja i kvizove kao simulaciju za ponavljanje gradiva.

## Stack

- **Frontend:** Vue 3 + Vite + Pinia + Tailwind CSS
- **Backend:** Express + TypeScript + Prisma 5
- **Baza:** PostgreSQL 16
- **Auth:** JWT (HTTP-only cookie)

## Pokretanje

### Opcija A — Docker (preporuka)

Iz root foldera:

```bash
docker compose up -d --build
```

Aplikacija je dostupna na:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

Prilikom prvog pokretanja backend kontejner sam pokreće migracije i seed (pitanja iz skripte). Baza je perzistentna kroz `postgres_data` volume.

Zaustavljanje:

```bash
docker compose down
```

### Opcija B — Lokalni dev (hot-reload)

Pokreni samo bazu kroz Docker, a backend i frontend lokalno:

```bash
# 1. Baza
docker compose up -d db

# 2. Backend (u jednom terminalu)
cd backend
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev

# 3. Frontend (u drugom terminalu)
cd frontend
npm install
npm run dev
```

Frontend će se pokrenuti na http://localhost:5173 i proxyati `/api` zahtjeve na backend (port 3000).

## Korisnici

Aplikacija nema seedanih korisnika. Registriraj se kroz `/register` i prijavi se na `/login`. XP, ljestvica i statistika rastu iz stvarnih kvizova koje odigraš.

## Sadržaj

### Učenje

- **Brzo učenje** (`/ucenje/brzo`) — 22 najčešća ispitna pitanja s kratkim sažecima i ključnim konceptima. Najbolje za zadnji dan prije ispita.
- **Obično učenje** (`/ucenje/skripta`) — kompletna skripta razlomljena po predavanjima (P1–P11) s pretragom i collapsible Q&A.

### Kviz

Kvizovi su **simulacija za ponavljanje gradiva** — ne zamjenjuju ispit, nego služe kao alat za samoprovjeru.

- **Brzi kviz** (`/kviz/brzi`) — multiple-choice iz 22 ispitna pitanja, 30s po pitanju, XP za točne i brze odgovore.
- **Obični kviz** (`/kviz/obicni`) — flashcard stil iz cijele skripte, samoocjenjivanje "Znao sam / Nisam znao".

### Kategorije pitanja u brzom učenju

22 pitanja je razvrstano po vjerojatnosti pojavljivanja na ispitu:

- 🔴 **Crvena — Zagarantirana** (pitanja 1–4): pojavljuju se skoro svaki rok
- 🟠 **Narančasta — Visoka vjerojatnost** (pitanja 5–10): često na ispitu
- 🟡 **Žuta — Srednja vjerojatnost** (pitanja 11–16): malo rjeđe od narančaste
- 🟢 **Zelena — Strateški izbor** (pitanja 17–22): česta na zadnjim rokovima

## XP i razine

- +100 XP točan odgovor
- +50 XP brz odgovor (<10s)
- +50 XP završen kviz
- +300 XP savršen rezultat

Razine: Početnik (0), Student (500), Napredni (1500), Ekspert (3000), Majstor (6000).

## Struktura projekta

```
drs/
├── backend/              Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts       Pitanja iz skripte
│   └── src/
│       ├── controllers/
│       ├── routes/
│       └── middleware/
├── frontend/             Vue 3 SPA
│   └── src/
│       ├── views/        Početna, Učenje, Kviz, Ljestvica, Profil
│       ├── components/
│       ├── stores/       Pinia (auth)
│       └── data/skripta.ts
└── docker-compose.yml
```

## Env varijable

Sve env varijable su u repu (`backend/.env`, `docker-compose.yml`) — projekt je edukativni demo i ne sadrži privatne tajne. Za produkciju zamijeni `JWT_SECRET` i `POSTGRES_PASSWORD`.

## Korisne komande (backend)

```bash
npm run db:migrate    # primijeni migracije
npm run db:seed       # ubaci pitanja iz skripte
npm run db:reset      # wipe + migrate + seed
npm run db:studio     # Prisma Studio GUI
```
