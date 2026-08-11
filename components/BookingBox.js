"use client";

import { useMemo, useState } from "react";
import { addBooking } from "@/lib/bookingStore";

export default function BookingBox({ price, rating, reviews, maxGuests, stayName, location }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState("");
  const [confirmedId, setConfirmedId] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const a = new Date(checkIn);
    const b = new Date(checkOut);
    const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const cleaning = 45;
  const serviceFee = nights ? Math.round(nights * price * 0.1) : 0;
  const total = nights ? nights * price + cleaning + serviceFee : 0;

  function handleBook() {
    const saved = addBooking({
      guest: guestName.trim() || "Ospite demo",
      stay: stayName,
      location,
      checkIn,
      checkOut,
      nights,
      guests,
      total,
      status: "In attesa",
      type: "stay",
    });
    setConfirmedId(saved.id);
  }

  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 p-5 shadow-xl">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-semibold text-white">€{price}</span>
          <span className="text-white/60"> / notte</span>
        </div>
        <div className="text-sm text-white/70">
          ★ {rating} · {reviews} recensioni
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-white/15">
        <label className="border-r border-white/15 p-3">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/50">Check-in</span>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
        </label>
        <label className="p-3">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/50">Check-out</span>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm text-white outline-none [color-scheme:dark]"
          />
        </label>
        <label className="col-span-2 border-t border-white/15 p-3">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/50">Ospiti</span>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full bg-transparent text-sm text-white outline-none"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option className="text-ink" key={n} value={n}>
                {n} {n === 1 ? "ospite" : "ospiti"}
              </option>
            ))}
          </select>
        </label>
        <label className="col-span-2 border-t border-white/15 p-3">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/50">Nome (facoltativo)</span>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Ospite demo"
            className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
        </label>
      </div>

      <button
        onClick={handleBook}
        disabled={!nights || !!confirmedId}
        className="mt-4 w-full rounded-xl bg-gold py-3 text-sm font-semibold uppercase tracking-wide text-ink transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {confirmedId ? "Prenotato" : nights ? "Prenota" : "Scegli le date"}
      </button>

      {nights > 0 && (
        <div className="mt-4 space-y-2 text-sm text-white/70">
          <div className="flex justify-between">
            <span>€{price} × {nights} notti</span>
            <span>€{price * nights}</span>
          </div>
          <div className="flex justify-between">
            <span>Pulizie</span>
            <span>€{cleaning}</span>
          </div>
          <div className="flex justify-between">
            <span>Servizio</span>
            <span>€{serviceFee}</span>
          </div>
          <div className="flex justify-between border-t border-white/15 pt-2 text-base font-semibold text-white">
            <span>Totale</span>
            <span>€{total}</span>
          </div>
        </div>
      )}

      {confirmedId && nights > 0 && (
        <div className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-3 text-sm text-white">
          ✓ Richiesta inviata · codice <span className="font-semibold text-gold">{confirmedId}</span>.{" "}
          Ti contatteremo per confermare {nights} notti per{" "}
          {guests} {guests === 1 ? "ospite" : "ospiti"}. <span className="text-white/60">(demo)</span>
        </div>
      )}
    </div>
  );
}
