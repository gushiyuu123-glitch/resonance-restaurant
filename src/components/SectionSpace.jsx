import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionSpace() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);

      if (prefersReduced) {
        gsap.set(q("[data-reveal]"), { opacity: 1, y: 0, filter: "none" });
        gsap.set(q("[data-photo]"), { opacity: 1, y: 0, scale: 1, filter: "none" });
        return;
      }

      // --- Copy ---
      gsap.fromTo(
        q("[data-reveal]"),
        { opacity: 0, y: 18, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
          },
        }
      );

      // --- Photos ---
      gsap.fromTo(
        q("[data-photo]"),
        { opacity: 0, y: 28, scale: 1.03, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: q("[data-grid]")[0],
            start: "top 72%",
          },
        }
      );

      // --- Gentle parallax (subtle) ---
      gsap.to(q("[data-parallax]"), {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        relative
        bg-white
        overflow-hidden
      "
    >
      {/* air */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.035),transparent_58%)]
        "
      />

      <div className="max-w-7xl mx-auto px-8 md:px-20 py-24 md:py-32">
        {/* ===== Label ===== */}
        <div
          data-reveal
          className="
            text-[11px]
            tracking-[0.28em]
            uppercase
            text-neutral-500
            mb-10
          "
        >
          Concept / Space
        </div>

        {/* ===== Top Copy ===== */}
        <div className="grid grid-cols-12 gap-10 items-end mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-7">
            <h2
              data-reveal
              className="
                text-[clamp(1.65rem,2.8vw,2.6rem)]
                tracking-[-0.01em]
                text-neutral-900
                leading-[1.15]
              "
            >
              A quiet dialogue
              <br />
              between fire, time, and ingredients.
            </h2>
          </div>

          <div className="col-span-12 md:col-span-5">
            <p
              data-reveal
              className="
                text-[13px] md:text-sm
                leading-[2.05]
                text-neutral-600
                max-w-[40ch]
              "
            >
              Light is allowed to remain. Silence is designed.
              <br className="hidden md:block" />
              Everything else arrives slowly.
            </p>
          </div>
        </div>

        {/* ===== Image Grid ===== */}
        <div
          data-grid
          className="
            grid grid-cols-12 gap-6 md:gap-8
            items-stretch
          "
        >
          {/* Left tall (morning) */}
          <figure
            data-photo
            className="
              col-span-12 md:col-span-5
              relative
              overflow-hidden
              rounded-[0px]
              bg-neutral-100
              shadow-[0_40px_120px_rgba(0,0,0,0.10)]
            "
          >
            <img
              data-parallax
              src="/space-01.png"
              alt=""
              className="
                w-full h-[56vh] md:h-[64vh]
                object-cover
                scale-[1.05]
              "
            />
            <div
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-t
                from-white/0 via-white/0 to-white/0
              "
            />
          </figure>

          {/* Right stack (noon) */}
          <div className="col-span-12 md:col-span-7 grid grid-cols-12 gap-6 md:gap-8">
            <figure
              data-photo
              className="
                col-span-12
                relative
                overflow-hidden
                rounded-[0px]
                bg-neutral-100
                shadow-[0_40px_120px_rgba(0,0,0,0.10)]
              "
            >
              <img
                data-parallax
                src="/space-022.png"
                alt=""
                className="
                  w-full h-[28vh] md:h-[30vh]
                  object-cover
                  scale-[1.04]
                "
              />
            </figure>

            <figure
              data-photo
              className="
                col-span-12 md:col-span-7
                relative
                overflow-hidden
                rounded-[28px]
                bg-neutral-100
                shadow-[0_40px_120px_rgba(0,0,0,0.10)]
              "
            >
              <img
                data-parallax
                src="/space-03.png"
                alt=""
                className="
                  w-full h-[26vh] md:h-[30vh]
                  object-cover
                  scale-[1.04]
                "
              />
            </figure>

            {/* micro text card */}
            <div
              data-photo
              className="
                col-span-12 md:col-span-5
                rounded-[28px]
                border border-black/[0.06]
                bg-white
                shadow-[0_30px_90px_rgba(0,0,0,0.06)]
                p-8 md:p-10
                flex flex-col justify-between
              "
            >
              <div>
                <div className="text-[11px] tracking-[0.28em] uppercase text-neutral-500 mb-5">
                  Details
                </div>
                <p className="text-sm leading-[2.05] text-neutral-700">
                  Tableware, shadows, and distance
                  <br />
                  are part of the course.
                </p>
              </div>

              <div className="mt-10">
                <div className="h-px w-10 bg-neutral-300/60 mb-5" />
                <p className="text-[12px] tracking-[0.22em] text-neutral-500">
                  Light · Silence · Precision
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom Note ===== */}
        <div className="mt-16 md:mt-20 grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 md:col-span-6">
            <p
              data-reveal
              className="
                text-[12px]
                tracking-[0.24em]
                text-neutral-500
                uppercase
              "
            >
              Noon arrives without announcement.
            </p>
          </div>

          <div className="col-span-12 md:col-span-6">
            <p
              data-reveal
              className="
                text-[13px] md:text-sm
                leading-[2.05]
                text-neutral-600
                md:text-right
              "
            >
              A place where the dish does not shout—
              <br className="hidden md:block" />
              it simply stays in your memory.
            </p>
          </div>
        </div>
      </div>

      {/* bottom fade (pre-heat) */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-28
          bg-gradient-to-b
          from-transparent to-white
        "
      />
    </section>
  );
}
