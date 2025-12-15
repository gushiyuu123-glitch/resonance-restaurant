import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionPrelude() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const copyRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景トーン：夕 → 夜直前（少し重く）
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#e9e4db" },
        {
          backgroundColor: "#d6cec1",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 写真：ゆっくり寄る（Heat前の圧）
      gsap.fromTo(
        imageRef.current,
        {
          y: 0,
          scale: 1.02,
          filter: "brightness(1) contrast(1) saturate(1)",
        },
        {
          y: 60,
          scale: 1.14,
          filter: "brightness(0.82) contrast(1.08) saturate(1.05)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 影レイヤー：下から忍び寄る
      gsap.fromTo(
        shadowRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 0.55,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 25%",
            scrub: true,
          },
        }
      );

      // コピー：少し早めに出す（Heatに被らせない）
// コピー：一拍遅らせて、静かに出す
gsap.fromTo(
  copyRef.current,
  { opacity: 0, y: 16 },
  {
    opacity: 1,
    y: 0,
    duration: 1.1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 63%",
    },
  }
);

      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-6 md:px-12 overflow-hidden flex items-center"
    >
      {/* 夜の影 */}
      <div
        ref={shadowRef}
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/25 to-black/55"
      />

      {/* 予兆の写真 */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src="/prelude-kitchen-detail.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* コピー */}
      <div
        ref={copyRef}
        className="relative z-10 max-w-xl mx-auto text-center"
      >
        <p className="text-[11px] tracking-[0.32em] text-neutral-200 mb-6">
          PRELUDE
        </p>

        <h2 className="text-2xl md:text-3xl font-light text-white mb-8 leading-relaxed">
          The kitchen is awake.
        </h2>

        <p className="text-sm text-white/75 leading-loose">
          Steel waits.
          <br />
          Hands remember.
          <br />
          Heat has not arrived—
          <br />
          but it is inevitable.
        </p>
      </div>
    </section>
  );
}
