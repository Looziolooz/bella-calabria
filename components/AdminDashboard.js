"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { stays } from "@/lib/stays";
import { offers } from "@/lib/offers";
import { bookings } from "@/lib/bookings";

const AUTH_KEY = "bc_admin_auth";
const ADMIN_USER = "admin";
const ADMIN_PASS = "calabria";

const TABS = [
  { key: "overview", label: "Panoramica" },
  { key: "stays", label: "Alloggi" },
  { key: "bookings", label: "Prenotazioni" },
  { key: "offers", label: "Offerte" },
];

function StatusBadge({ status }) {
  const map = {
    Confermata: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    "In attesa": "bg-amber-500/15 text-amber-300 border-amber-500/30",
    Completata: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    Annullata: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  };
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${map[status] || "border-white/20 text-white/70"}`}>
      {status}
    </span>
  );
}

function Kpi({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
      {sub && <div className="mt-1 text-sm text-white/50">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("overview");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [listings, setListings] = useState(() =>
    stays.map((s) => ({ ...s, active: true }))
  );

  useEffect(() => {
    try {
      setAuthed(localStorage.getItem(AUTH_KEY) === "1");
    } catch {}
    setReady(true);
  }, []);

  function login(e) {
    e.preventDefault();
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      try {
        localStorage.setItem(AUTH_KEY, "1");
      } catch {}
      setAuthed(true);
      setError("");
    } else {
      setError("Credenziali non valide.");
    }
  }

  function logout() {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
    setAuthed(false);
    setUser("");
    setPass("");
  }

  const kpis = useMemo(() => {
    const revenue = bookings
      .filter((b) => b.status === "Confermata" || b.status === "Completata")
      .reduce((s, b) => s + b.total, 0);
    const pending = bookings.filter((b) => b.status === "In attesa").length;
    const avgRating = (
      stays.reduce((s, x) => s + x.rating, 0) / stays.length
    ).toFixed(2);
    const activeListings = listings.filter((l) => l.active).length;
    return { revenue, pending, avgRating, activeListings };
  }, [listings]);

  function toggleActive(slug) {
    setListings((prev) =>
      prev.map((l) => (l.slug === slug ? { ...l, active: !l.active } : l))
    );
  }

  if (!ready) return null;

  // ---- Login gate (hardcoded) ----
  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0f0f10] px-4 text-white">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-7"
        >
          <div className="mb-1 text-xs font-semibold uppercase tracking-[3px] text-gold">
            Bella Calabria
          </div>
          <h1 className="text-2xl font-semibold">Area amministratore</h1>
          <p className="mt-1 text-sm text-white/50">Accedi per gestire il portale.</p>

          <label className="mt-6 block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Utente</span>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-gold"
              placeholder="admin"
            />
          </label>
          <label className="mt-4 block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Password</span>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-gold"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-gold py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:-translate-y-0.5"
          >
            Accedi
          </button>

          <p className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-white/40">
            Demo — utente <span className="text-white/70">admin</span> · password{" "}
            <span className="text-white/70">calabria</span>
          </p>
          <Link href="/" className="mt-4 block text-center text-xs text-white/40 no-underline hover:text-white">
            ← Torna al sito
          </Link>
        </form>
      </div>
    );
  }

  // ---- Dashboard ----
  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0f0f10]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold text-sm font-bold text-ink">
              B
            </span>
            <span className="text-sm font-semibold uppercase tracking-wide">
              Bella Calabria <span className="text-white/40">· Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 no-underline hover:text-white"
            >
              ↗ Vedi il sito
            </Link>
            <button
              onClick={logout}
              className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20"
            >
              Esci
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-sm transition ${
                tab === t.key
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "overview" && (
          <section>
            <h2 className="text-xl font-semibold">Panoramica</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Kpi label="Alloggi attivi" value={kpis.activeListings} sub={`su ${stays.length} totali`} />
              <Kpi label="Prenotazioni" value={bookings.length} sub={`${kpis.pending} in attesa`} />
              <Kpi label="Ricavi" value={`€${kpis.revenue.toLocaleString("it-IT")}`} sub="confermati + completati" />
              <Kpi label="Rating medio" value={`★ ${kpis.avgRating}`} sub="su tutti gli alloggi" />
            </div>

            <h3 className="mt-9 text-lg font-semibold">Prenotazioni recenti</h3>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/50">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Ospite</th>
                    <th className="px-4 py-3">Alloggio</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Totale</th>
                    <th className="px-4 py-3">Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id} className="border-t border-white/5">
                      <td className="px-4 py-3 font-mono text-white/60">{b.id}</td>
                      <td className="px-4 py-3">{b.guest}</td>
                      <td className="px-4 py-3 text-white/70">{b.stay}</td>
                      <td className="px-4 py-3 text-white/60">{b.checkIn} → {b.checkOut}</td>
                      <td className="px-4 py-3">€{b.total}</td>
                      <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "stays" && (
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Alloggi</h2>
              <span className="text-sm text-white/50">{kpis.activeListings} attivi</span>
            </div>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/50">
                  <tr>
                    <th className="px-4 py-3">Alloggio</th>
                    <th className="px-4 py-3">Località</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">€/notte</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((l) => (
                    <tr key={l.slug} className="border-t border-white/5">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={l.image} alt="" className="h-11 w-16 shrink-0 rounded-md object-cover" />
                          <span className="font-medium">{l.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/70">{l.location}</td>
                      <td className="px-4 py-3 text-white/70">{l.type}</td>
                      <td className="px-4 py-3">€{l.price}</td>
                      <td className="px-4 py-3 text-white/70">★ {l.rating}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(l.slug)}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                            l.active
                              ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                              : "border-white/15 bg-white/5 text-white/50"
                          }`}
                        >
                          {l.active ? "Attivo" : "Disattivo"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "bookings" && (
          <section>
            <h2 className="text-xl font-semibold">Prenotazioni</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/50">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Ospite</th>
                    <th className="px-4 py-3">Alloggio</th>
                    <th className="px-4 py-3">Check-in</th>
                    <th className="px-4 py-3">Check-out</th>
                    <th className="px-4 py-3">Ospiti</th>
                    <th className="px-4 py-3">Totale</th>
                    <th className="px-4 py-3">Stato</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-t border-white/5">
                      <td className="px-4 py-3 font-mono text-white/60">{b.id}</td>
                      <td className="px-4 py-3">{b.guest}</td>
                      <td className="px-4 py-3 text-white/70">{b.stay}</td>
                      <td className="px-4 py-3 text-white/60">{b.checkIn}</td>
                      <td className="px-4 py-3 text-white/60">{b.checkOut}</td>
                      <td className="px-4 py-3 text-white/70">{b.guests}</td>
                      <td className="px-4 py-3">€{b.total}</td>
                      <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "offers" && (
          <section>
            <h2 className="text-xl font-semibold">Offerte</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((o) => (
                <div key={o.slug} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <div className="relative h-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={o.image} alt="" className="h-full w-full object-cover" />
                    <span className="absolute left-2 top-2 rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-ink">
                      -{o.discount}%
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-white/50">{o.location} · {o.nights} notti</div>
                    <div className="mt-0.5 font-medium leading-snug">{o.title}</div>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-sm text-white/40 line-through">€{o.oldPrice}</span>
                      <span className="text-lg font-semibold">€{o.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
