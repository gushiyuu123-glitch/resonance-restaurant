// SectionSpaceSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionSpaceSP() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-sp-reveal]",
        { opacity: 0, y: 16, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.14,
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
        relative
        bg-white
        overflow-hidden
        px-6
        py-24
      "
    >
      {/* 空気 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_60%)]" />

      {/* ===== Label ===== */}
      <p
        data-sp-reveal
        className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 mb-8"
      >
        Concept / Space
      </p>

      {/* ===== Copy ===== */}
      <h2
        data-sp-reveal
        className="
          text-[1.7rem]
          leading-[1.25]
          tracking-[-0.01em]
          text-neutral-900
          mb-10
        "
      >
        A quiet dialogue
        <br />
        between fire, time,
        <br />
        and ingredients.
      </h2>

      <p
        data-sp-reveal
        className="
          text-[13px]
          leading-[2.1]
          text-neutral-600
          mb-14
          max-w-[38ch]
        "
      >
        Light is allowed to remain.
        <br />
        Silence is designed.
        <br />
        Everything else arrives slowly.
      </p>

      {/* ===== Image ===== */}
      <figure
        data-sp-reveal
        className="
          relative
          overflow-hidden
          mb-16
          shadow-[0_32px_90px_rgba(0,0,0,0.12)]
        "
      >
        <img
          src="/space-01.png"
          alt=""
          className="w-full h-[48vh] object-cover"
        />
      </figure>

      {/* ===== Detail Card ===== */}
      <div
        data-sp-reveal
        className="
          border border-black/[0.06]
          bg-white
          shadow-[0_24px_72px_rgba(0,0,0,0.06)]
          p-8
          mb-16
        "
      >
        <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-500 mb-4">
          Details
        </p>

        <p className="text-sm leading-[2.05] text-neutral-700 mb-8">
          Tableware, shadows,
          <br />
          and distance
          <br />
          are part of the course.
        </p>

        <div className="h-px w-8 bg-neutral-300/60 mb-4" />
        <p className="text-[12px] tracking-[0.22em] text-neutral-500">
          Light · Silence · Precision
        </p>
      </div>

      {/* ===== Bottom Note ===== */}
      <p
        data-sp-reveal
        className="
          text-[12px]
          tracking-[0.24em]
          uppercase
          text-neutral-500
          leading-loose
        "
      >
        Noon arrives
        <br />
        without announcement.
      </p>
    </section>
  );
}
