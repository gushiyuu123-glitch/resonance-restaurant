// src/components/SectionHeat.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionHeat() {
  const rootRef = useRef(null);

  const pinRef = useRef(null);
  const bgRef = useRef(null);

  const veilRef = useRef(null);     // 白→消える
  const darkRef = useRef(null);     // 夜の黒
  const warmRef = useRef(null);     // 夕のアンバー
  const grainRef = useRef(null);    // ノイズ

  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // 初期値（確実に）
      gsap.set(bgRef.current, { scale: 1.02, yPercent: 6, filter: "contrast(1) saturate(1) brightness(1)" });
      gsap.set(veilRef.current, { opacity: 1 });
      gsap.set(darkRef.current, { opacity: 0 });
      gsap.set(warmRef.current, { opacity: 0 });
      gsap.set(grainRef.current, { opacity: 0.22 });

      gsap.set([titleRef.current, leadRef.current, lineRef.current], { opacity: 0, y: 12, filter: "blur(6px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1.1,
          pin: pinRef.current,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // 0% → 25%：白い膜が溶けて温度が入る
      tl.to(veilRef.current, { opacity: 0, duration: 0.25 }, 0)
        .to(warmRef.current, { opacity: 0.55, duration: 0.25 }, 0.05)
        .to(bgRef.current, {
          yPercent: 0,
          scale: 1.06,
          filter: "contrast(1.05) saturate(1.05) brightness(0.98)",
          duration: 0.25,
        }, 0.05);

      // 25% → 55%：夕→夜（黒が支配）
      tl.to(darkRef.current, { opacity: 0.62, duration: 0.30 }, 0.25)
        .to(warmRef.current, { opacity: 0.82, duration: 0.30 }, 0.25)
        .to(bgRef.current, {
          scale: 1.1,
          filter: "contrast(1.1) saturate(1.1) brightness(0.86)",
          duration: 0.30,
        }, 0.25);

      // テキスト（静かに浮かぶ）
// テキスト（静かに浮かぶ）
tl.to(
  [titleRef.current, leadRef.current],
  { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.18 },
  0.30 // ← 0.34 → 0.30
)
.to(
  lineRef.current,
  { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.14 },
  0.38 // ← 0.42 → 0.38
);

      // 55% → 100%：深夜（少しだけ奥へ）
      tl.to(warmRef.current, { opacity: 0.35, duration: 0.45 }, 0.55)
        .to(darkRef.current, { opacity: 0.78, duration: 0.45 }, 0.55)
        .to(bgRef.current, {
          scale: 1.14,
          filter: "contrast(1.15) saturate(1.05) brightness(0.78)",
          duration: 0.45,
        }, 0.55);

      // 後半、テキストをちょい沈めて「次のMenu」へ渡す余韻
      tl.to([titleRef.current, leadRef.current, lineRef.current], {
        opacity: 0.88,
        y: -6,
        duration: 0.35,
      }, 0.75);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative">
      {/* pinされる本体 */}
      <div
        ref={pinRef}
        className="
          relative
          h-screen
          w-full
          overflow-hidden
          bg-black
        "
      >
        {/* 背景（heat.jpg） */}
        <img
          ref={bgRef}
          src="/heat.png"
          alt=""
          className="
            absolute inset-0
            h-full w-full
            object-cover
            will-change-transform
          "
        />

        {/* 昼の白い膜（最初だけ） */}
        <div
          ref={veilRef}
          className="
            absolute inset-0
            bg-gradient-to-b
            from-white via-white/90 to-white/70
          "
        />

        {/* 夕方のアンバー（写真は薄くしすぎない） */}
        <div
          ref={warmRef}
          className="
            absolute inset-0
            bg-gradient-to-tr
            from-[#120a05]/0 via-[#ffb35c]/10 to-[#ff7a2f]/20
            mix-blend-multiply
          "
        />

        {/* 夜の黒（支配） */}
        <div
          ref={darkRef}
          className="
            absolute inset-0
            bg-gradient-to-b
            from-black/40 via-black/55 to-black/75
          "
        />

        {/* ちょい光の“滲み” */}
        <div
          className="
            pointer-events-none
            absolute -left-[20%] top-[10%]
            h-[70vh] w-[70vh]
            rounded-full
            bg-white/10
            blur-[70px]
            opacity-30
          "
        />

        {/* ノイズ（映画っぽい） */}
        <div
          ref={grainRef}
          className="
            pointer-events-none
            absolute inset-0
            opacity-20
            mix-blend-overlay
            [background-image:url('/grain.png')]
            [background-size:420px_420px]
          "
        />

        {/* コピー（左上に“語らない”） */}
 <div
  className="
    relative z-20
    h-full
    max-w-7xl mx-auto
    px-8 md:px-20
    pt-[20vh]   // ← 18vh → 28vh
  "
>

          <div className="max-w-md">
            <p
              ref={titleRef}
              className="
                text-[11px]
                tracking-[0.32em]
                text-white/85
              "
            >
              Fire, time, and silence.
            </p>

            <p
              ref={leadRef}
              className="
                mt-5
                text-sm
                leading-relaxed
                tracking-[0.04em]
                text-white/70
              "
            >
              Heat does not shout— it simply arrives.
              <br />
              And the room remembers.
            </p>

            <div
              ref={lineRef}
              className="
                mt-8
                h-px w-12
                bg-white/25
              "
            />
          </div>
        </div>
      </div>

      {/* pin終わりの“余白”：次のMenuへ落とす */}
      <div className="h-[20vh] bg-black" />
    </section>
  );
}
