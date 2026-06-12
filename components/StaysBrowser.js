"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { stays, stayTypes } from "@/lib/stays";

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-gold">
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export default function StaysBrowser() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Tutti");
  const [guests, setGuests] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stays.filter((s) => {
      const matchQ =
        !q ||
        s.location.toLowerCase().includes(q) ||
        s.coast.toLowerCase().includes(q) ||
        s.province.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q);
      const matchType = type === "Tutti" || s.type === type;
      const matchGuests = !guests || s.guests >= guests;
      return matchQ && matchType && matchGuests;
    });
  }, [query, type, guests]);

  return (
    <div>
      {/* Search bar */}
      <div className="mx-auto -mt-8 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur md:flex md:items-center md:gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-gold">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Dove vuoi andare? Tropea, Sila, Scilla…"
            className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-3 md:border-l md:border-white/10">
          <span className="text-sm text-white/50">Ospiti</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="rounded-lg bg-white/10 px-2 py-1 text-sm text-white outline-none"
          >
            <option className="text-ink" value={0}>Tutti</option>
            {[1, 2, 4, 6, 8].map((n) => (
              <option className="text-ink" key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
      </div>

      {/* Type chips */}
      <div className="mx-auto mt-6 flex max-w-6xl flex-wrap gap-2 px-1">
        {stayTypes.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              type === t
                ? "border-gold bg-gold text-ink"
                : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-6xl px-1 text-sm text-white/50">
        {results.length} alloggi disponibili
      </p>

      {/* Cards */}
      <div className="mx-auto mt-4 grid max-w-6xl grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((s) => (
          <Link key={s.slug} href={`/vacanze/${s.slug}`} className="group block no-underline text-white">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium backdrop-blur">
                {s.type}
              </span>
              {s.superhost && (
                <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">
                  Superhost
                </span>
              )}
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <div className="text-sm text-white/50">
                  {s.location} · {s.coast}
                </div>
                <div className="mt-0.5 font-medium leading-snug">{s.name}</div>
                <div className="mt-1 text-sm text-white/50">
                  {s.guests} ospiti · {s.bedrooms} camere · {s.beds} letti
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1 text-sm">
                <Star />
                {s.rating}
              </div>
            </div>
            <div className="mt-1.5 text-sm">
              <span className="font-semibold text-white">€{s.price}</span>
              <span className="text-white/50"> / notte</span>
            </div>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <p className="mx-auto mt-10 max-w-6xl px-1 text-white/60">
          Nessun alloggio per questa ricerca. Prova a cambiare filtri.
        </p>
      )}
    </div>
  );
}
