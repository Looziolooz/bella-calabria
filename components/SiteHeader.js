"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Vacanze", href: "/vacanze" },
  { label: "Destinazioni", href: "/destinazioni" },
  { label: "Voli", href: "/voli" },
  { label: "Offerte", href: "/offerte" },
  { label: "Contatti", href: "/contatti" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 ${
        onHome ? "" : "border-b border-white/10 bg-ink/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wide text-white no-underline"
        >
          <span className="grid h-6 w-6 place-items-center text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </span>
          <span className="hidden sm:inline">Calabria Escapes</span>
          <span className="sm:hidden">Calabria</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {LINKS.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative no-underline transition-colors ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide no-underline transition ${
              pathname.startsWith("/admin")
                ? "border-gold bg-gold text-ink"
                : "border-white/25 text-white hover:bg-white/10"
            }`}
          >
            Admin
          </Link>
          <Link
            href="/vacanze"
            className="rounded-full bg-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink no-underline transition hover:-translate-y-0.5"
          >
            Prenota
          </Link>
        </div>
      </div>
    </header>
  );
}
