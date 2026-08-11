"use client";

import { useState } from "react";
import { airports, originCities, flightsByAirport } from "@/lib/flights";
import { addBooking } from "@/lib/bookingStore";

export default function FlightSearch() {
  const [origin, setOrigin] = useState("Milano");
  const [dest, setDest] = useState("SUF");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(1);
  const [searched, setSearched] = useState(false);
  const [booked, setBooked] = useState({});

  function handleBook(f, i) {
    const saved = addBooking({
      guest: "Ospite demo",
      stay: `Volo ${f.airline} ${f.from} → ${destName}`,
      location: destName,
      checkIn: date || "",
      checkOut: "",
      nights: 0,
      guests: pax,
      total: f.price * pax,
      status: "In attesa",
      type: "flight",
    });
    setBooked((prev) => ({ ...prev, [i]: saved.id }));
  }

  const all = flightsByAirport[dest] || [];
  const results = all.filter((f) =>
    origin ? f.from.toLowerCase().includes(origin.toLowerCase()) : true
  );
  const list = results.length ? results : all; // fall back to all for the airport

  const destName = airports.find((a) => a.code === dest)?.name;

  return (
    <div>
      <div className="grid gap-3 rounded-2xl border border-white/12 bg-white/5 p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Da</span>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3 py-2.5 text-sm text-white outline-none"
          >
            {originCities.map((c) => (
              <option className="text-ink" key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">A</span>
          <select
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3 py-2.5 text-sm text-white outline-none"
          >
            {airports.map((a) => (
              <option className="text-ink" key={a.code} value={a.code}>
                {a.name} ({a.code})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Data</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg bg-white/10 px-3 py-2.5 text-sm text-white outline-none [color-scheme:dark]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Passeggeri</span>
          <select
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            className="w-full rounded-lg bg-white/10 px-3 py-2.5 text-sm text-white outline-none"
          >
            {[1, 2, 3, 4].map((n) => (
              <option className="text-ink" key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
        <button
          onClick={() => setSearched(true)}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-ink transition hover:-translate-y-0.5"
        >
          Cerca voli
        </button>
      </div>

      {searched && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">
            Voli verso {destName} · {list.length} risultati
          </h2>
          <div className="mt-4 space-y-3">
            {list.map((f, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-gold">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">{f.airline}</div>
                    <div className="text-sm text-white/50">{f.from} → {destName}</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{f.dep} – {f.arr}</div>
                  <div className="text-sm text-white/50">{f.duration} · {f.stops}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-semibold">€{f.price * pax}</div>
                  <div className="text-xs text-white/50">{pax} pax · andata</div>
                </div>
                <div className="w-full text-right sm:w-auto">
                  {booked[i] ? (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300">
                      Prenotato ✓ · {booked[i]}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleBook(f, i)}
                      className="rounded-lg bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition enabled:hover:-translate-y-0.5"
                    >
                      Prenota
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
