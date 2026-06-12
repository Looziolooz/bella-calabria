import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function PagesLayout({ children }) {
  return (
    <div className="min-h-screen bg-ink text-white">
      <SiteHeader />
      <div className="pt-[57px]">{children}</div>
      <Footer />
    </div>
  );
}
