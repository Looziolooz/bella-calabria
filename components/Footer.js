import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white/70">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3 text-lg font-semibold uppercase tracking-wide text-white">
            Bella Calabria
          </div>
          <p className="text-sm leading-relaxed">
            Vacanze, alloggi e voli per scoprire la punta più bella d'Italia: mare,
            montagna, borghi e sapori.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">Esplora</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/vacanze" className="no-underline hover:text-white">Vacanze</Link></li>
            <li><Link href="/destinazioni" className="no-underline hover:text-white">Destinazioni</Link></li>
            <li><Link href="/offerte" className="no-underline hover:text-white">Offerte</Link></li>
            <li><Link href="/voli" className="no-underline hover:text-white">Voli</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">Supporto</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contatti" className="no-underline hover:text-white">Contatti</Link></li>
            <li><span className="cursor-default">Centro assistenza</span></li>
            <li><span className="cursor-default">Cancellazioni</span></li>
            <li><span className="cursor-default">Diventa host</span></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">Contatti</div>
          <ul className="space-y-2 text-sm">
            <li>Lungomare Falcomatà, Reggio Calabria</li>
            <li>+39 0965 000 000</li>
            <li>ciao@bellacalabria.it</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40 md:px-8">
        © 2026 Bella Calabria · Demo dimostrativa · Foto: Wikimedia Commons
      </div>
    </footer>
  );
}
