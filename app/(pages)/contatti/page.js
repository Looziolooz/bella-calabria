import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contatti · Bella Calabria",
  description: "Scrivici per organizzare la tua vacanza in Calabria.",
};

const CONTACTS = [
  { label: "Indirizzo", value: "Lungomare Falcomatà, 89125 Reggio Calabria" },
  { label: "Telefono", value: "+39 0965 000 000" },
  { label: "Email", value: "ciao@bellacalabria.it" },
  { label: "Orari", value: "Lun–Sab, 9:00–19:00" },
];

export default function ContattiPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-16 md:px-8 md:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[3px] text-gold">Contatti</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold uppercase leading-[1.05] md:text-6xl">
        Parliamo del tuo viaggio
      </h1>
      <p className="mt-4 max-w-2xl text-white/70">
        Un consiglio su dove dormire, un pacchetto su misura o un gruppo da
        organizzare? Siamo qui.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">Dove siamo</h2>
            <ul className="mt-4 space-y-4">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gold">
                    {c.label}
                  </div>
                  <div className="mt-0.5 text-sm text-white/80">{c.value}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Reggio_Calabria_-_Lungomare_Falcomat%C3%A0_-_6.jpg/1280px-Reggio_Calabria_-_Lungomare_Falcomat%C3%A0_-_6.jpg"
              alt="Lungomare di Reggio Calabria"
              className="h-48 w-full object-cover"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
