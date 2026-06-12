"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { polaroidData } from "@/lib/data";

export default function TravelDiary() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray(".polaroid");
    if (!cards.length) return;

    const N = cards.length;
    const jitter = cards.map(() => gsap.utils.random(-9, 9));
    const scatterX = cards.map(() => gsap.utils.random(-1, 1));
    const scatterY = cards.map(() => gsap.utils.random(-1, 1));
    cards.forEach((card) => {
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        y: window.innerHeight,
        rotation: 0,
      });
    });

    // Each card rises from the bottom and settles into a scattered grid that
    // fills the whole section — left, right, top, bottom, corners and centre —
    // so the photos and captions stay spread out and readable.
    const st = ScrollTrigger.create({
      trigger: ".cards-section",
      start: "top top",
      end: () => `+=${window.innerHeight * N * 0.55}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const holdStart = 0.82; // fully scattered by here, then holds
        const per = holdStart / N;
        const W = window.innerWidth;
        const H = window.innerHeight;
        const cardScale = W < 700 ? 0.62 : 0.7; // bigger polaroids
        const cardW = 250 * cardScale;
        const cardH = 320 * cardScale;
        const cols = W < 700 ? 3 : 4;
        const rows = Math.ceil(N / cols);
        const cellW = Math.max(120, (W - cardW - 24) / cols);
        const cellH = Math.max(120, (H - cardH - 110) / rows);

        cards.forEach((card, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const centerX = (col - (cols - 1) / 2) * cellW;
          const centerY = (row - (rows - 1) / 2) * cellH;
          // big random offset within each cell → casually scattered, not lined up
          const targetX = centerX + scatterX[i] * cellW * 0.45;
          const targetY = centerY + scatterY[i] * cellH * 0.45;
          const targetRot = jitter[i] * 1.7;

          let cp = (progress - i * per) / per;
          cp = Math.max(0, Math.min(1, cp));

          gsap.set(card, {
            x: targetX * cp,
            y: H * (1 - cp) + targetY * cp,
            rotation: targetRot * cp,
            scale: 1 + (cardScale - 1) * cp,
            zIndex: i + 1,
          });
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section className="relative bg-[#141414] text-white">
      <div className="flex min-h-[78vh] flex-col items-center justify-center px-6 pb-[70px] pt-[120px] text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-gold">
          Diario di viaggio
        </p>
        <h2 className="m-0 font-display text-[clamp(34px,8.5vw,88px)] font-semibold uppercase leading-none">
          Cartoline dalla Calabria
        </h2>
        <p className="mx-auto mt-[18px] max-w-[520px] text-[clamp(14px,3.6vw,17px)] leading-relaxed text-white/70">
          Gli scatti dei viaggiatori, uno dopo l&apos;altro. Scorri verso il
          basso per sfogliare il diario.
        </p>
        <div className="mt-10 animate-bob text-xs uppercase tracking-[2px] text-white/50">
          Scorri ↓
        </div>
      </div>

      <div className="cards-section">
        <div id="polaroids">
          {polaroidData.map((p, i) => (
            <div className="polaroid" id={`polaroid-${i}`} key={`pol-${i}`}>
              <div
                className="polaroid-img"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="polaroid-cap">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-[78vh] flex-col items-center justify-center px-6 pb-[70px] pt-[120px] text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-gold">
          Bella Calabria
        </p>
        <h2 className="m-0 font-display text-[clamp(34px,8.5vw,88px)] font-semibold uppercase leading-none">
          La Calabria ti aspetta
        </h2>
        <p className="mx-auto mt-[18px] max-w-[520px] text-[clamp(14px,3.6vw,17px)] leading-relaxed text-white/70">
          Ogni angolo è una storia. Qual è la prossima cartolina?
        </p>
        <button className="mt-7 rounded-full bg-gold px-[30px] py-3.5 text-[13px] font-semibold uppercase tracking-wide text-ink transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-8px_rgba(236,173,41,0.6)]">
          Inizia a pianificare
        </button>
      </div>
    </section>
  );
}
