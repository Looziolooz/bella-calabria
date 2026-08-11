import Link from "next/link";
import { notFound } from "next/navigation";
import { stays, getStay } from "@/lib/stays";
import BookingBox from "@/components/BookingBox";

export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const stay = getStay(params.slug);
  return { title: stay ? `${stay.name} · Calabria Escapes` : "Alloggio" };
}

export default function StayPage({ params }) {
  const stay = getStay(params.slug);
  if (!stay) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:px-8">
      <Link href="/vacanze" className="text-sm text-white/60 no-underline hover:text-white">
        ← Tutti gli alloggi
      </Link>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold uppercase leading-tight md:text-5xl">
            {stay.name}
          </h1>
          <p className="mt-2 text-white/70">
            ★ {stay.rating} · {stay.reviews} recensioni · {stay.location},{" "}
            {stay.province}
            {stay.superhost && (
              <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-ink">
                Superhost
              </span>
            )}
          </p>
        </div>
        <span className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/70">
          {stay.type}
        </span>
      </div>

      {/* Gallery */}
      <div className="mt-5 grid gap-2 overflow-hidden rounded-2xl md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={stay.gallery[0]}
          alt={stay.name}
          className="h-72 w-full object-cover md:h-[460px]"
        />
        <div className="grid grid-rows-2 gap-2">
          {stay.gallery.slice(1, 3).map((g, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={g}
              alt={`${stay.name} ${i + 2}`}
              className="hidden h-full w-full object-cover md:block"
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="text-xl font-semibold">
                {stay.type} ospitata da {stay.host}
              </h2>
              <p className="mt-1 text-white/60">
                {stay.guests} ospiti · {stay.bedrooms} camere · {stay.beds} letti ·{" "}
                {stay.baths} bagni
              </p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-lg font-bold text-ink">
              {stay.host[0]}
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-white/80">{stay.description}</p>

          <h3 className="mt-8 text-lg font-semibold">Cosa troverai</h3>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stay.amenities.map((a) => (
              <li key={a} className="flex items-center gap-3 text-white/80">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-gold">
                  ✓
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <BookingBox
            price={stay.price}
            rating={stay.rating}
            reviews={stay.reviews}
            maxGuests={stay.guests}
            stayName={stay.name}
            location={stay.location}
          />
        </aside>
      </div>
    </main>
  );
}
