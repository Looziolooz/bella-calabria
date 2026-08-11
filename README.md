# Calabria Escapes

Sito di viaggi per la Calabria — **Next.js (App Router) + Tailwind CSS**.
Mare, montagna, borghi e sapori, con un'esperienza scroll animata in homepage
(GSAP + ScrollTrigger + Lenis) e funzionalità tipo Airbnb.

## Sezioni

- **Home** — carosello hero animato, diario di cartoline (polaroid sparse) e
  griglia "tradizioni & sapori" che zooma allo scroll.
- **Vacanze** (`/vacanze`) — listing di alloggi con ricerca e filtri, pagina di
  dettaglio con box di prenotazione.
- **Destinazioni** (`/destinazioni`) — mete della Calabria + info utili.
- **Voli** (`/voli`) — ricerca voli verso Lamezia, Reggio e Crotone.
- **Offerte** (`/offerte`) — pacchetti scontati.
- **Contatti** (`/contatti`) — form di contatto.
- **Admin** (`/admin`) — dashboard di gestione (demo, login hardcoded
  `admin` / `calabria`): KPI, alloggi, prenotazioni e offerte.

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Note

Demo dimostrativa: dati mock in [`lib/`](lib/), prenotazioni/voli/form non
inviano dati reali. Le foto provengono da Wikimedia Commons.
