import StaysBrowser from "@/components/StaysBrowser";

export const metadata = {
  title: "Vacanze in Calabria · Calabria Escapes",
  description: "Ville, case e B&B con vista mare e nei borghi della Calabria.",
};

export default function VacanzePage() {
  return (
    <main className="pb-20">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 md:px-8 md:pt-20">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">
            Vacanze
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold uppercase leading-[1.05] md:text-6xl">
            Dormi dove la Calabria è più bella
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Ville sul mare, case nei borghi e chalet in montagna. Scegli il tuo
            rifugio tra la Costa degli Dei, la Sila e lo Stretto.
          </p>
        </div>
      </section>

      <div className="px-4 md:px-8">
        <StaysBrowser />
      </div>
    </main>
  );
}
