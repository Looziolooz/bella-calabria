# Handoff per OpenCode — Calabria Escapes

Documento di passaggio consegne. Contiene lo stato del progetto, cosa è già stato fatto e cosa resta da implementare, con indicazioni precise sui file da toccare.

## Contesto progetto

- **Nome sito:** Calabria Escapes (rinominato da "Bella Calabria" — rename già completato ovunque, non ci sono residui).
- **Stack:** Next.js (App Router, JavaScript, non TypeScript) + Tailwind CSS. Nessun backend reale: tutti i dati sono mock hardcoded in `lib/`.
- **Lingua UI:** italiano. Mantienila in tutti i nuovi testi.
- **Stile:** tema scuro, pannelli `border-white/10 bg-white/5 rounded-2xl`, accento color `gold`, bottoni `bg-gold text-ink uppercase tracking-wide`. Riusa questi pattern, non introdurre nuovi stili.
- **Nessuna nuova dipendenza:** il progetto deve restare a zero dipendenze extra (solo next/react/tailwind già presenti).

## Obiettivo: attivare i flussi demo di prenotazione (voli + camere)

L'utente vuole che nella demo si possano davvero "prenotare" voli e alloggi, e che le prenotazioni compaiano nella dashboard admin.

**IMPORTANTE — decisione già presa:** NON usare/integrare il repo `aws-samples/aws-serverless-airline-booking`. È stato valutato ed escluso: progetto abbandonato (lo dichiara il README stesso), stack incompatibile (Vue/Quasar + Amplify + AppSync + Lambda + DynamoDB + Cognito + Step Functions + Stripe), richiederebbe un account AWS con troppa infrastruttura per una demo. Tutto va implementato in-app.

**Scelta tecnica consigliata: store client-side su `localStorage`**, non API route con store in memoria. Motivo: su Vercel le funzioni serverless non condividono memoria tra invocazioni, quindi uno store in-memory perderebbe le prenotazioni una volta deployato. Con localStorage la demo funziona identica in locale e in produzione, senza database.

## Stato attuale dei componenti coinvolti

| File | Stato |
|---|---|
| `lib/bookings.js` | Esporta `bookings`: array hardcoded di 7 prenotazioni alloggio (id `BC-2041`…`BC-2047`, campi: `id, guest, stay, location, checkIn, checkOut, nights, guests, total, status`). Status possibili: `Confermata`, `In attesa`, `Completata`, `Annullata`. |
| `components/BookingBox.js` | Client component usato nella pagina dettaglio alloggio. Calcola già notti, pulizie (€45), commissione (10%) e totale. Il bottone "Prenota" fa solo `setConfirmed(true)` locale: non salva nulla. Props attuali: `price, rating, reviews, maxGuests` — **manca il nome/località dell'alloggio**. |
| `components/FlightSearch.js` | Client component della pagina `/voli`. Cerca sui mock di `lib/flights.js` e mostra risultati con prezzo `€{f.price * pax}`. **Non c'è alcun bottone "Prenota"** sulle card risultato (righe ~85-110). |
| `components/AdminDashboard.js` | Client component di `/admin` (login hardcoded `admin`/`calabria`, chiave localStorage `bc_admin_auth`). Ha 4 tab: Panoramica, Alloggi, Prenotazioni, Offerte. Importa `bookings` statico da `lib/bookings.js`. **Bug esistente:** il `useMemo` dei KPI (riga ~84) dipende solo da `[listings]`, quindi anche rendendo dinamiche le prenotazioni i KPI non si aggiornerebbero — va sistemata la dependency array. |
| `app/(pages)/vacanze/[slug]/page.js` | Pagina dettaglio alloggio: è qui che viene montato `BookingBox`. Ha già l'oggetto `stay` a disposizione, quindi passare nome/località come nuove props è banale. |

## Task da eseguire (in ordine)

### 1. Creare `lib/bookingStore.js` (client-side)

Modulo che gestisce le prenotazioni dinamiche in localStorage:

- Chiave: `ce_bookings` (prefisso `ce_` = Calabria Escapes; NON riusare `bc_`).
- `getStoredBookings()` → array da localStorage (con `try/catch`, come già fa AdminDashboard per l'auth).
- `addBooking(booking)` → genera id progressivo `BC-3001, BC-3002, …` (serie 3xxx per distinguerle dai mock 2xxx), salva, e fa `window.dispatchEvent(new Event("ce-bookings-changed"))` così la dashboard aperta in un altro tab/componente si aggiorna.
- `getAllBookings()` → mock di `lib/bookings.js` + quelle salvate, ordinate per check-in o inserimento.
- Ogni prenotazione nuova deve avere un campo aggiuntivo `type: "stay" | "flight"` (i mock esistenti si trattano come `type: "stay"` di default).

### 2. Collegare `BookingBox` allo store

- Aggiungere props `stayName` e `location` (passarle da `app/(pages)/vacanze/[slug]/page.js`, dove `stay` è già disponibile).
- Al click su "Prenota": costruire la prenotazione (`guest: "Ospite demo"` oppure aggiungere un piccolo input nome facoltativo, `stay: stayName`, `location`, `checkIn`, `checkOut`, `nights`, `guests`, `total`, `status: "In attesa"`, `type: "stay"`) e chiamare `addBooking`.
- Nella conferma già esistente (`confirmed`) mostrare il codice prenotazione generato (es. "Richiesta inviata · codice BC-3001").

### 3. Aggiungere "Prenota" ai risultati voli in `FlightSearch`

- Su ogni card risultato (blocco righe ~85-110) aggiungere un bottone "Prenota" coerente con lo stile (`bg-gold text-ink`).
- Al click: `addBooking` con `type: "flight"`, `stay: `\`Volo ${f.airline} ${f.from} → ${destName}\``, `location: destName`, `checkIn: date` (la data selezionata; se vuota usare stringa vuota o la data odierna), `nights: 0`, `guests: pax`, `total: f.price * pax`, `status: "In attesa"`.
- Feedback inline sulla card dopo il click (es. il bottone diventa "Prenotato ✓" disabilitato, con il codice).

### 4. Rendere dinamico `AdminDashboard`

- Sostituire l'import statico di `bookings` con lo store: stato locale inizializzato con `getAllBookings()` dentro `useEffect` (evitare mismatch SSR/idratazione: leggere localStorage solo dopo il mount, pattern già usato per l'auth con `ready`).
- Ascoltare gli eventi `ce-bookings-changed` e `storage` per riaggiornare la lista.
- Correggere la dependency array del `useMemo` dei KPI includendo le prenotazioni dinamiche.
- Nella tab Prenotazioni: mostrare un badge per `type` (Volo / Soggiorno) e — opzionale ma gradito — azioni "Conferma" / "Annulla" che aggiornano lo `status` delle prenotazioni salvate (solo quelle in localStorage; i mock possono restare immutabili).
- KPI "In attesa" e "Ricavi" devono riflettere anche le prenotazioni nuove.

### 5. Verifica finale

- `npm run dev` e testare il flusso end-to-end:
  1. `/voli` → cerca → "Prenota" un volo → feedback con codice.
  2. `/vacanze` → apri un alloggio → date + ospiti → "Prenota" → conferma con codice.
  3. `/admin` (login `admin`/`calabria`) → tab Prenotazioni: compaiono le due nuove voci con badge tipo e stato "In attesa"; KPI aggiornati.
  4. Ricaricare la pagina admin: le prenotazioni persistono (localStorage).
- `npm run build` deve passare senza errori (attenzione a non usare `localStorage` fuori da `useEffect`/handler: romperebbe il prerender).

## Cose da NON fare

- Non integrare AWS, Amplify, DynamoDB o Stripe (vedi sopra).
- Non aggiungere dipendenze npm.
- Non convertire file a TypeScript.
- Non toccare il rename già fatto (il brand è "Calabria Escapes" ovunque; email demo `ciao@calabriaescapes.com`).
- Non introdurre un vero sistema di pagamento o autenticazione: è una demo dimostrativa.
