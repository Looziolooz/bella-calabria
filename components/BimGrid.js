"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tipicaData } from "@/lib/data";

const LANDSCAPE = [
  [false, true, false, true],
  [true, false, true, false],
  [false, true, false, true],
];

export default function BimGrid() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!document.querySelector(".bim-viewport")) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".bim",
        start: "top top",
        end: () => `+=${window.innerHeight * 2.2}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(".bim-viewport", { scale: 2.6 }, { scale: 1, ease: "none", duration: 1 }, 0)
      .fromTo(".bim-row-a", { xPercent: -14 }, { xPercent: 0, ease: "none", duration: 1 }, 0)
      .fromTo(".bim-row-b", { xPercent: 14 }, { xPercent: 0, ease: "none", duration: 1 }, 0)
      .fromTo(
        ".bim-info",
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, ease: "power2.out", duration: 0.4 },
        0.62
      );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  const rows = [0, 1, 2].map((r) => tipicaData.slice(r * 4, r * 4 + 4));

  return (
    <section id="tipica" className="bim">
      <div className="bim-sticky">
        <div className="bim-viewport" id="bim-viewport">
          {rows.map((row, r) => (
            <div
              className={`bim-row ${r === 1 ? "bim-row-b" : "bim-row-a"}`}
              key={`row-${r}`}
            >
              {row.map((item, c) => (
                <div
                  className={`bim-card ${
                    LANDSCAPE[r][c] ? "bim-card-landscape" : ""
                  }`}
                  key={`card-${r}-${c}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="bim-info">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-gold">
            Tradizioni &amp; sapori
          </p>
          <h2 className="bim-title">
            La Calabria
            <br />
            che resta
          </h2>
          <a
            href="#tipica"
            className="group pointer-events-auto mt-7 inline-flex flex-col items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white no-underline"
          >
            <span>Scopri le tradizioni</span>
            <span className="h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}
