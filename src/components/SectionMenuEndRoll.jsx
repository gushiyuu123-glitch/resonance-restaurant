import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionMenuEndRoll() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=360%",
          scrub: 1.8,
          pin: true,
        },
      })
        // MORNING
        .to(trackRef.current, {
          yPercent: -22,
          duration: 0.28,
          ease: "none",
        })
        // DUSK
        .to(trackRef.current, {
          yPercent: -44,
          duration: 0.52,
          ease: "none",
        })
        // NIGHT
        .to(trackRef.current, {
          yPercent: -66,
          duration: 0.28,
          ease: "none",
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen bg-white text-neutral-900 overflow-hidden"
    >
      <div
        ref={trackRef}
        className="absolute top-0 left-0 w-full h-[400vh] flex flex-col"
      >
        <MenuPhase
          align="start"
          label="MORNING"
          title="Tasting"
          price="¥18,000"
          tone="morning"
          image="/menu-shadow-morning.png"
          items={[
            "Spring water, citrus peel",
            "White asparagus, silence",
            "Gentle fire, early herbs",
            "Milk skin, restraint",
            "Bread, warmth",
          ]}
        />

        <MenuPhase
          align="center"
          label="DUSK"
          title="Seasonal Resonance"
          price="¥24,000"
          tone="dusk"
          image="/menu-shadow-dusk.png"
          items={[
            "Fermented grain, shadow",
            "Root vegetables, depth",
            "Fish, heat withheld",
            "Butter, fading light",
            "Broth, memory",
          ]}
        />

        <MenuPhase
          align="end"
          label="NIGHT"
          title="Chef’s Table"
          price="¥30,000"
          tone="night"
          image="/menu-shadow-night.png"
          items={[
            "Fire, intention",
            "Hands moving faster",
            "Meat, decision",
            "Sauce, concentration",
            "Silence after heat",
          ]}
        />
      </div>
    </section>
  );
}
function MenuPhase({ align, label, title, items, price, tone, image }) {
  const alignMap = {
    start: "items-start text-left pl-[10vw]",
    center: "items-center text-center",
    end: "items-end text-right pr-[10vw]",
  };

  const imagePosition = {
    start: "left-[13%]",
    center: "left-1/2 -translate-x-1/2",
    end: "left-[57%]",
  };

  const imageTone = {
    morning: "opacity-45 scale-[1.02]",
    dusk: "opacity-36 scale-[1.05]",
    night: "opacity-41 scale-[1.08]",
  };

  const veilTone = {
    morning: "bg-white/0",
    dusk: "bg-white/55",
    night: "bg-white/60",
  };

  return (
    <div className={`relative h-screen flex flex-col justify-center ${alignMap[align]}`}>
      {/* 料理画像（視線を中央に固定） */}
      <img
        src={image}
        alt=""
        className={`
          absolute top-1/2 -translate-y-1/2
          ${imagePosition[align]}
          w-[42vw] max-w-[560px]
          pointer-events-none
          blur-[1px]
          z-0
          ${imageTone[tone]}
        `}
      />

      {/* 白ベール */}
      <div className={`absolute inset-0 z-10 ${veilTone[tone]}`} />
      <div
        className="
          absolute inset-0 z-10
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]
        "
      />

      {/* テキスト */}
      <div className="relative z-20">
        <p className="text-xs tracking-[0.4em] mb-12 opacity-60 text-shadow: 0 1px 6px rgba(0,0,0,0.04);
">
          
          {label}
        </p>

        <h3 className="text-2xl mb-14 font-light">
          {title}
        </h3>

        <ul className="space-y-4 text-sm leading-loose mb-20">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="text-xs opacity-45 tracking-wide">
          {price}
        </p>
      </div>
    </div>
  );
}
