// src/components/SectionMenuEndRollSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionMenuEndRollSP() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-menu-sp]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          stagger: 0.22,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        sm:hidden
        bg-white
        text-neutral-900
        px-6
        py-28
        space-y-32
      "
    >
      <MenuBlock
        label="MORNING"
        title="Tasting"
        price="¥18,000"
        image="/menu-shadow-morning.png"
        items={[
          "Spring water, citrus peel",
          "White asparagus, silence",
          "Gentle fire, early herbs",
          "Milk skin, restraint",
          "Bread, warmth",
        ]}
      />

      <MenuBlock
        label="DUSK"
        title="Seasonal Resonance"
        price="¥24,000"
        image="/menu-shadow-dusk.png"
        items={[
          "Fermented grain, shadow",
          "Root vegetables, depth",
          "Fish, heat withheld",
          "Butter, fading light",
          "Broth, memory",
        ]}
      />

      <MenuBlock
        label="NIGHT"
        title="Chef’s Table"
        price="¥30,000"
        image="/menu-shadow-night.png"
        items={[
          "Fire, intention",
          "Hands moving faster",
          "Meat, decision",
          "Sauce, concentration",
          "Silence after heat",
        ]}
      />
    </section>
  );
}

/* ========================= */

function MenuBlock({ label, title, items, price, image }) {
  return (
    <div data-menu-sp className="space-y-10">
      <p className="text-[11px] tracking-[0.4em] opacity-50">
        {label}
      </p>

      <h3 className="text-2xl font-light">
        {title}
      </h3>

      {/* image（影扱い） */}
      <div className="relative">
        <img
          src={image}
          alt=""
          className="
            w-full
            max-h-[42vh]
            object-contain
            opacity-35
          "
        />
      </div>

      <ul className="space-y-3 text-sm leading-loose">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <p className="pt-6 text-xs opacity-45 tracking-wide">
        {price}
      </p>
    </div>
  );
}
