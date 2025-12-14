// HeroSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSP() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.35,
        defaults: { ease: "power3.out" },
      });

      // 画像（最初は気配だけ）
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.4 }
      )

        // ライン（存在確認）
        .fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.35, duration: 1 },
          "-=1.1"
        )

        // タイトル
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 18,
            scale: 1.04,
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
          },
          "-=0.7"
        )

        // メタ
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 0.6, y: 0, duration: 0.9 },
          "-=0.6"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-white
        flex items-center
        px-6
      "
    >
      {/* ===== IMAGE ===== */}
      <div
        ref={imageRef}
        className="
          absolute
          inset-0
          z-0
        "
      >
        <img
          src="/hero-bg1.png"
          alt=""
          className="
            w-full h-full
            object-cover
            contrast-[0.98]
          "
        />
        {/* 空気レイヤー */}
        <div className="absolute inset-0 bg-white/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20" />
      </div>

      {/* ===== TEXT ===== */}
      <div className="relative z-10 w-full">
        {/* ライン */}
        <div
          ref={lineRef}
          className="h-px w-full bg-black/40 origin-left mb-8"
        />

        <h1
          ref={titleRef}
          className="
            text-[clamp(2.4rem,9vw,3.2rem)]
            tracking-[0.2em]
            text-[#1c1c1c]
            mb-6
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]
          "
        >
          RÉSONANCE
        </h1>

        <p
          ref={metaRef}
          className="
            text-[11px]
            tracking-[0.3em]
            text-[#1c1c1c]/70
          "
        >
          French table in Tokyo
        </p>
      </div>
    </section>
  );
}
