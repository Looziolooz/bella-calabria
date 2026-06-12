import Link from "next/link";
import { offers } from "@/lib/offers";

export const metadata = {
  title: "Offerte Calabria · Bella Calabria",
  description: "Pacchetti vacanza scontati in Calabria: mare, montagna e borghi.",
};

export default function OffertePage() {
  return (
    <main className="pb-20">
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-8 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">Offerte</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-[1.05] md:text-6xl">
          Pacchetti da non perdere
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Soggiorni selezionati a prezzo speciale. Posti limitati: il sud chiama.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
        {offers.map((o) => (
          <article
            key={o.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={o.image}
                alt={o.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
                -{o.discount}%
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium backdrop-blur">
                {o.badge}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="text-sm text-white/50">{o.location} · {o.nights} notti</div>
              <h2 className="mt-1 text-lg font-semibold leading-snug">{o.title}</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-white/75">
                {o.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="text-gold">✓</span> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between pt-5">
                <div>
                  <span className="text-sm text-white/40 line-through">€{o.oldPrice}</span>
                  <div className="text-2xl font-semibold text-white">€{o.price}</div>
                  <div className="text-xs text-white/50">a persona</div>
                </div>
                <Link
                  href="/contatti"
                  className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink no-underline transition hover:-translate-y-0.5"
                >
                  Prenota
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
