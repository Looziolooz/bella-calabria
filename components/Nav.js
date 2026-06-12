import Link from "next/link";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Vacanze", href: "/vacanze" },
  { label: "Destinazioni", href: "/destinazioni" },
  { label: "Voli", href: "/voli" },
  { label: "Offerte", href: "/offerte" },
  { label: "Contatti", href: "/contatti" },
];

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3.5 font-medium text-white md:px-9 md:py-5">
      <Link href="/" className="inline-flex items-center gap-2.5 text-sm uppercase text-white no-underline">
        <span className="grid h-5 w-5 place-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </span>
        <span>Bella Calabria</span>
      </Link>

      <div className="inline-flex items-center gap-4 text-sm uppercase md:gap-6">
        {LINKS.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className="relative hidden text-white no-underline transition-opacity hover:opacity-80 md:inline-flex"
          >
            {l.label}
            {i === 0 && (
              <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gold" />
            )}
          </Link>
        ))}

        <Link href="/vacanze" aria-label="Cerca" className="grid h-5 w-5 place-items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Link>
        <Link href="/contatti" aria-label="Account" className="grid h-5 w-5 place-items-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}
