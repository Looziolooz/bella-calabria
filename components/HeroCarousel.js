"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { heroData } from "@/lib/data";

export default function HeroCarousel() {
  useEffect(() => {
    const data = heroData;
    const ease = "sine.inOut";
    const set = gsap.set;

    const getCard = (i) => `#card${i}`;
    const getCardContent = (i) => `#card-content-${i}`;
    const getSliderItem = (i) => `#slide-item-${i}`;

    function animate(target, duration, properties) {
      return new Promise((resolve) => {
        gsap.to(target, { ...properties, duration, onComplete: resolve });
      });
    }

    let order = data.map((_, index) => index);
    let detailsEven = true;
    let offsetTop = 200;
    let offsetLeft = 700;
    let cardWidth = 200;
    let cardHeight = 300;
    let gap = 40;
    let numberSize = 50;
    let progressWidth = 500;
    let pagLeft = 0;
    let pagTop = 0;
    let loopToken = 0;
    let clicks = 0;

    function setLayoutVars() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w >= 1024) {
        cardWidth = 200;
        cardHeight = 300;
        gap = 40;
        numberSize = 50;
        progressWidth = 500;
        offsetLeft = w - 830;
        pagLeft = w - 830;
      } else if (w >= 640) {
        cardWidth = 160;
        cardHeight = 235;
        gap = 28;
        numberSize = 48;
        progressWidth = 320;
        offsetLeft = w - 600;
        pagLeft = 40;
      } else {
        cardWidth = 118;
        cardHeight = 172;
        gap = 16;
        numberSize = 42;
        progressWidth = Math.max(140, Math.min(240, w - 130));
        offsetLeft = w - Math.round(cardWidth * 1.7);
        pagLeft = 20;
      }
      offsetTop = h - (cardHeight + 130);
      pagTop = offsetTop + cardHeight + 24;
      if (pagTop > h - 60) pagTop = h - 60;
    }

    function setDetailsContent(sel, d) {
      document.querySelector(`${sel} .place-box .text`).textContent = d.place;
      document.querySelector(`${sel} .title-1`).textContent = d.title;
      document.querySelector(`${sel} .title-2`).textContent = d.title2;
      document.querySelector(`${sel} .desc`).textContent = d.description;
    }

    function init(replay = false) {
      loopToken++;
      const myToken = loopToken;
      setLayoutVars();
      gsap.set(".card", { scale: 1 });
      const [active, ...rest] = order;
      const detailsActive = detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
      const { innerWidth: width } = window;

      gsap.set("#pagination", {
        top: pagTop,
        left: pagLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
      });
      gsap.set([".progress-sub-container", ".progress-sub-background"], {
        width: progressWidth,
      });
      gsap.set(".site-header", { y: -200, opacity: 0 });

      gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
      gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
      gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
      gsap.set(`${detailsInactive} .text`, { y: 100 });
      gsap.set(`${detailsInactive} .title-1`, { y: 100 });
      gsap.set(`${detailsInactive} .title-2`, { y: 100 });
      gsap.set(`${detailsInactive} .desc`, { y: 50 });
      gsap.set(`${detailsInactive} .cta`, { y: 60 });

      gsap.set(".progress-sub-foreground", {
        width: progressWidth * (1 / order.length) * (active + 1),
      });

      rest.forEach((i, index) => {
        gsap.set(getCard(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
        gsap.set(getCardContent(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          zIndex: 40,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
      });

      gsap.set(".indicator", { x: -window.innerWidth });

      const startDelay = replay ? 0 : 0.6;

      if (replay) {
        gsap.set(".cover", { x: width + 400 });
        setTimeout(() => loop(myToken), 400);
      } else {
        gsap.to(".cover", {
          x: width + 400,
          delay: 0.5,
          ease,
          onComplete: () => {
            setTimeout(() => loop(myToken), 500);
          },
        });
      }

      rest.forEach((i, index) => {
        gsap.to(getCard(i), {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 30,
          ease,
          delay: startDelay,
        });
        gsap.to(getCardContent(i), {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 40,
          ease,
          delay: startDelay,
        });
      });
      gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
      gsap.to(".site-header", { y: 0, opacity: 1, ease, delay: startDelay });
      gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
    }

    function step() {
      return new Promise((resolve) => {
        order.push(order.shift());
        detailsEven = !detailsEven;

        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        setDetailsContent(detailsActive, data[order[0]]);

        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
        gsap.to(`${detailsActive} .text`, { y: 0, delay: 0.1, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-1`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .title-2`, { y: 0, delay: 0.15, duration: 0.7, ease });
        gsap.to(`${detailsActive} .desc`, { y: 0, delay: 0.3, duration: 0.4, ease });
        gsap.to(`${detailsActive} .cta`, {
          y: 0,
          delay: 0.35,
          duration: 0.4,
          onComplete: resolve,
          ease,
        });
        gsap.set(detailsInactive, { zIndex: 12 });

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(getCard(prv), { zIndex: 10 });
        gsap.set(getCard(active), { zIndex: 20 });
        gsap.to(getCard(prv), { scale: 1.5, ease });

        gsap.to(getCardContent(active), {
          y: offsetTop + cardHeight - 10,
          opacity: 0,
          duration: 0.3,
          ease,
        });
        gsap.to(getSliderItem(active), { x: 0, ease });
        gsap.to(getSliderItem(prv), { x: -numberSize, ease });
        gsap.to(".progress-sub-foreground", {
          width: progressWidth * (1 / order.length) * (active + 1),
          ease,
        });

        gsap.to(getCard(active), {
          x: 0,
          y: 0,
          ease,
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
          onComplete: () => {
            const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
            gsap.set(getCard(prv), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              zIndex: 30,
              borderRadius: 10,
              scale: 1,
            });
            gsap.set(getCardContent(prv), {
              x: xNew,
              y: offsetTop + cardHeight - 100,
              opacity: 1,
              zIndex: 40,
            });
            gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

            gsap.set(detailsInactive, { opacity: 0 });
            gsap.set(`${detailsInactive} .text`, { y: 100 });
            gsap.set(`${detailsInactive} .title-1`, { y: 100 });
            gsap.set(`${detailsInactive} .title-2`, { y: 100 });
            gsap.set(`${detailsInactive} .desc`, { y: 50 });
            gsap.set(`${detailsInactive} .cta`, { y: 60 });
            clicks -= 1;
            if (clicks > 0) step();
          },
        });

        rest.forEach((i, index) => {
          if (i !== prv) {
            const xNew = offsetLeft + index * (cardWidth + gap);
            gsap.set(getCard(i), { zIndex: 30 });
            gsap.to(getCard(i), {
              x: xNew,
              y: offsetTop,
              width: cardWidth,
              height: cardHeight,
              ease,
              delay: 0.1 * (index + 1),
            });
            gsap.to(getCardContent(i), {
              x: xNew,
              y: offsetTop + cardHeight - 100,
              opacity: 1,
              zIndex: 40,
              ease,
              delay: 0.1 * (index + 1),
            });
            gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
          }
        });
      });
    }

    async function loop(token) {
      if (token !== loopToken) return;
      await animate(".indicator", 2, { x: 0 });
      if (token !== loopToken) return;
      await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
      if (token !== loopToken) return;
      set(".indicator", { x: -window.innerWidth });
      await step();
      if (token !== loopToken) return;
      loop(token);
    }

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        loopToken++;
        gsap.killTweensOf([
          ".card",
          ".card-content",
          ".slide-numbers .item",
          ".indicator",
          ".progress-sub-foreground",
          "#pagination",
          ".site-header",
          ".details",
          ".details .text",
          ".details .title-1",
          ".details .title-2",
          ".details .desc",
          ".details .cta",
          ".cover",
        ]);
        order = data.map((_, index) => index);
        detailsEven = true;
        clicks = 0;
        setDetailsContent("#details-even", data[0]);
        init(true);
      }, 280);
    }

    window.addEventListener("resize", onResize);
    init();

    return () => {
      loopToken++;
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      gsap.killTweensOf([
        ".card",
        ".card-content",
        ".slide-numbers .item",
        ".indicator",
        ".progress-sub-foreground",
        "#pagination",
        ".site-header",
        ".details",
        ".cover",
      ]);
    };
  }, []);

  const d0 = heroData[0];

  const bookmarkSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <section className="hero">
      <div className="indicator" />

      <div id="demo">
        {heroData.map((d, i) => (
          <div
            key={`card-${i}`}
            className="card"
            id={`card${i}`}
            style={{ backgroundImage: `url(${d.image})` }}
          />
        ))}
        {heroData.map((d, i) => (
          <div key={`cc-${i}`} className="card-content" id={`card-content-${i}`}>
            <div className="content-start" />
            <div className="content-place">{d.place}</div>
            <div className="content-title-1">{d.title}</div>
            <div className="content-title-2">{d.title2}</div>
          </div>
        ))}
      </div>

      <div className="scrim" />

      {["details-even", "details-odd"].map((id) => (
        <div className="details" id={id} key={id}>
          <div className="place-box">
            <div className="text">{d0.place}</div>
          </div>
          <div className="title-box-1">
            <div className="title-1">{d0.title}</div>
          </div>
          <div className="title-box-2">
            <div className="title-2">{d0.title2}</div>
          </div>
          <div className="desc">{d0.description}</div>
          <div className="cta">
            <button className="bookmark" aria-label="Salva">
              {bookmarkSvg}
            </button>
            <button className="discover">Scopri il luogo</button>
          </div>
        </div>
      ))}

      <div className="pagination" id="pagination">
        <div className="arrow arrow-left">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="arrow arrow-right">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
        <div className="progress-sub-container">
          <div className="progress-sub-background">
            <div className="progress-sub-foreground" />
          </div>
        </div>
        <div className="slide-numbers" id="slide-numbers">
          {heroData.map((_, i) => (
            <div className="item" id={`slide-item-${i}`} key={`sn-${i}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="cover" />
    </section>
  );
}
