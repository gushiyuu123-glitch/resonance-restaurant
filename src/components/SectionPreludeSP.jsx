// SectionPreludeSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionPreludeSP() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const copyRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 背景トーン：夕 → 夜直前（SPは弱め）
      gsap.fromTo(
        rootRef.current,
        { backgroundColor: "#e9e4db" },
        {
          backgroundColor: "#ded7cb",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 写真：ゆっくり沈む（SPは控えめ）
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05, y: 0 },
        {
          scale: 1.12,
          y: 24,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // コピー：静かに出現
      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
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
        min-h-[85vh]
        overflow-hidden
        flex items-center
        px-6
        bg-[#e9e4db]
      "
    >
      {/* 背景写真 */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src="/prelude-kitchen-detail.png"
          alt=""
          className="
            w-full h-full
            object-cover
            contrast-[0.95]
          "
        />
        {/* SP用の軽い影 */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* コピー */}
      <div
        ref={copyRef}
        className="
          relative z-10
          text-center
          max-w-[32ch]
          mx-auto
        "
      >
        <p className="text-[11px] tracking-[0.3em] text-white/70 mb-6">
          PRELUDE
        </p>

        <h2 className="text-[1.6rem] font-light text-white mb-6 leading-snug">
          The kitchen is awake.
        </h2>

        <p className="text-[13px] text-white/75 leading-[2]">
          Steel waits.<br />
          Hands remember.<br />
          Heat has not arrived—<br />
          but it is inevitable.
        </p>
      </div>
    </section>
  );
}
