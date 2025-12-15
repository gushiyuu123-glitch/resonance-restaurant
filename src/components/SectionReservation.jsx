// components/SectionReservation.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionReservation() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
gsap.fromTo(
  contentRef.current,
  { opacity: 0, y: 24 },
  {
    opacity: 1,
    y: 0,
    duration: 1.6, // ← 1.4 → 1.6
    ease: "power2.out",
    scrollTrigger: {
      trigger: rootRef.current,
      start: "top 75%", // ← 少し遅らせる
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
        min-h-screen
        bg-white
        text-neutral-900
        flex items-center justify-center
        px-8
      "
    >
      <div
        ref={contentRef}
        className="
          text-center
          max-w-md
        "
      >
        <p className="text-[10px] tracking-[0.4em] opacity-50 mb-10">
          RESERVATION
        </p>

        <h2 className="text-3xl md:text-4xl font-light mb-12 leading-relaxed">
          When you are ready,
          <br />
          we will prepare the table.
        </h2>

        <p className="text-sm leading-loose opacity-65 mb-16">
          Reservations are limited.<br />
          Each evening is prepared for a small number of guests.
        </p>

    <a
  href="#"
  className="
    inline-block
    text-sm
    tracking-[0.18em]
    pb-[3px]
    border-b border-neutral-400/70
    transition-all duration-300 ease-out
    hover:border-neutral-900
    hover:tracking-[0.22em]
  "
>
  Make a reservation
</a>

      </div>
    </section>
  );
}
