import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDusk() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    // 背景：昼 → 夕 → 夜直前
    gsap.fromTo(
      section,
      { backgroundColor: "#ffffff" },
      {
        backgroundColor: "#e6e0d6",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // 写真：沈む・暗くなる・寄る
   gsap.fromTo(
  image,
  { scale: 1.12, filter: "brightness(1) contrast(1)" },
  {
    scale: 1.04,
    filter: "brightness(0.85) contrast(1.1)",
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  }
);


    // テキスト：遅れて現れる（熱の予兆）
    gsap.fromTo(
      text,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "center 80%"
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 背景イメージ */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="/dusk-space1.png"
          alt="Dusk atmosphere"
          className="w-full h-full object-cover"
        />
        {/* 夕の膜 */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/35" />
      </div>

      {/* コピー */}
      <div
        ref={textRef}
        className="relative z-10 max-w-xl px-6 md:px-16"
      >
        <p className="text-xs tracking-widest text-neutral-400 mb-6">
          DUSK
        </p>

        <h2 className="text-2xl md:text-3xl font-light leading-relaxed mb-8 text-neutral-100">
          The room begins to breathe.
        </h2>

        <p className="text-sm text-neutral-300 leading-loose max-w-sm">
          Light falls lower.<br />
          Silence thickens.<br />
          Something is about to begin.
        </p>
      </div>
    </section>
  );
}
