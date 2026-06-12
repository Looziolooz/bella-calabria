import SiteHeader from "@/components/SiteHeader";
import SmoothScroll from "@/components/SmoothScroll";
import HeroCarousel from "@/components/HeroCarousel";
import TravelDiary from "@/components/TravelDiary";
import BimGrid from "@/components/BimGrid";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <SiteHeader />
      <HeroCarousel />
      <TravelDiary />
      <BimGrid />
    </main>
  );
}
