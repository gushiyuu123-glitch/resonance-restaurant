// src/components/SectionHeatSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeatSP() {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const veilRef = useRef(null);
  const warmRef = useRef(null);
  const darkRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 初期
      gsap.set(bgRef.current, {
        scale: 1.05,
        filter: "contrast(1) saturate(1) brightness(1)",
      });
      gsap.set(veilRef.current, { opacity: 1 });
      gsap.set(warmRef.current, { opacity: 0 });
      gsap.set(darkRef.current, { opacity: 0 });
      gsap.set(textRef.current, { opacity: 0, y: 16 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: rootRef.current,
    start: "top 80%",
    end: "bottom 20%",
    scrub: 0.9,
  },
  defaults: { ease: "none" },
});

// 白 → 夕
tl.to(veilRef.current, { opacity: 0, duration: 0.25 }, 0)
  .to(warmRef.current, { opacity: 0.6, duration: 0.25 }, 0.05)
  .to(bgRef.current, {
    scale: 1.1,
    filter: "contrast(1.05) saturate(1.05) brightness(0.9)",
    duration: 0.25,
  }, 0.05);

// 夕 → 夜
tl.to(darkRef.current, { opacity: 0.7, duration: 0.35 }, 0.25)
  .to(bgRef.current, {
    scale: 1.15,
    filter: "contrast(1.1) saturate(1.05) brightness(0.78)",
    duration: 0.35,
  }, 0.25);

// コピー（早め）
tl.to(textRef.current, {
  opacity: 1,
  y: 0,
  duration: 0.3,
  ease: "power2.out",
}, 0.22);

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        sm:hidden
        relative
        min-h-screen
        overflow-hidden
        bg-black
        flex items-center
      "
    >
      {/* 背景 */}
      <img
        ref={bgRef}
        src="/heat.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 白い膜 */}
      <div
        ref={veilRef}
        className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white/65"
      />

      {/* 夕のアンバー */}
      <div
        ref={warmRef}
        className="absolute inset-0 bg-gradient-to-tr from-[#120a05]/0 via-[#ffb35c]/15 to-[#ff7a2f]/25 mix-blend-multiply"
      />

      {/* 夜 */}
      <div
        ref={darkRef}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"
      />

      {/* コピー */}
      <div
        ref={textRef}
        className="relative z-10 px-6"
      >
        <p className="text-[11px] tracking-[0.32em] text-white/80 mb-5">
          HEAT
        </p>

        <p className="text-sm leading-relaxed text-white/70 max-w-[28ch]">
          Heat does not shout.
          <br />
          It simply arrives.
        </p>

        <div className="mt-6 h-px w-10 bg-white/30" />
      </div>
    </section>
  );
}
