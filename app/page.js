import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import HeroCarousel from "@/components/HeroCarousel";
import TravelDiary from "@/components/TravelDiary";
import BimGrid from "@/components/BimGrid";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Nav />
      <HeroCarousel />
      <TravelDiary />
      <BimGrid />
    </main>
  );
}
