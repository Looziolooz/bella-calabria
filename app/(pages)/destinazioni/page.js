import Link from "next/link";
import { destinations } from "@/lib/destinations";

export const metadata = {
  title: "Destinazioni in Calabria · Bella Calabria",
  description: "Mare, montagna, borghi e città: dove andare in Calabria.",
};

const INFO = [
  {
    title: "Quando andare",
    text: "Mare da maggio a ottobre, con luglio e agosto più affollati. Primavera e autunno sono perfetti per borghi e parchi; la Sila d'inverno si fa con la neve.",
  },
  {
    title: "Come arrivare",
    text: "Aeroporti di Lamezia Terme, Reggio Calabria e Crotone. In auto la A2 del Mediterraneo attraversa la regione; in treno la linea tirrenica costeggia il mare.",
  },
  {
    title: "Cosa mangiare",
    text: "'Nduja, peperoncino, cipolla di Tropea, pecorino crotonese, pesce spada, fichi e liquirizia. Da bere: il Cirò e, immancabile, la Brasilena.",
  },
];

export default function DestinazioniPage() {
  return (
    <main className="pb-20">
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-8 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">
          Destinazioni
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-[1.05] md:text-6xl">
          Due mari, una montagna verde, cento borghi
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          La Calabria è la punta dello Stivale: oltre 700 km di costa tra Tirreno
          e Ionio, tre parchi nazionali e borghi sospesi nel tempo. Ecco dove
          andare.
        </p>
      </section>

      {/* Destination grid */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
        {destinations.map((d) => (
          <article
            key={d.slug}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={d.image}
                alt={d.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium backdrop-blur">
                {d.tag}
              </span>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold">{d.name}</h2>
              <div className="mt-0.5 text-sm text-white/50">{d.area}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{d.blurb}</p>
              <Link
                href="/vacanze"
                className="mt-4 inline-flex text-sm font-semibold text-gold no-underline hover:underline"
              >
                Vedi alloggi →
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Practical info */}
      <section className="mx-auto mt-16 max-w-6xl px-4 md:px-8">
        <h2 className="font-display text-2xl font-semibold uppercase md:text-3xl">
          Informazioni utili
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {INFO.map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
                {b.title}
              </div>
              <p className="text-sm leading-relaxed text-white/75">{b.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
