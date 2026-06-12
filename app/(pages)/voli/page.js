import FlightSearch from "@/components/FlightSearch";
import { airports } from "@/lib/flights";

export const metadata = {
  title: "Voli per la Calabria · Bella Calabria",
  description: "Cerca voli verso Lamezia Terme, Reggio Calabria e Crotone.",
};

export default function VoliPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-16 md:px-8 md:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">Voli</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-[1.05] md:text-6xl">
        Vola in Calabria
      </h1>
      <p className="mt-4 max-w-2xl text-white/70">
        Tre aeroporti, collegamenti diretti da tutta Italia. Trova il volo verso
        il mare degli Dei e i borghi dello Ionio.
      </p>

      <div className="mt-8">
        <FlightSearch />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold uppercase md:text-3xl">
          Gli aeroporti
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {airports.map((a) => (
            <div key={a.code} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-gold px-2.5 py-1 text-sm font-bold text-ink">
                  {a.code}
                </span>
                <span className="font-semibold">{a.name}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{a.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
