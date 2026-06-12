import { Inter, Oswald, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-oswald",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata = {
  title: "Bella Calabria · Viaggio tra i luoghi più belli di Calabria",
  description:
    "Tropea, Scilla, la Sila, l'Aspromonte, i Bronzi di Riace e i sapori di Calabria — in un'esperienza scroll animata.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${oswald.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
