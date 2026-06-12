"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sets up Lenis smooth scrolling and wires it to GSAP ScrollTrigger.
// Rendered first on the page so the other sections' ScrollTriggers
// run against a smooth-scrolled viewport.
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    if (typeof window !== "undefined") window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      if (typeof window !== "undefined") delete window.lenis;
    };
  }, []);

  return null;
}
