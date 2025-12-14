// SectionDuskSP.jsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDuskSP() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 背景：昼 → 夕（SPは控えめ）
      gsap.fromTo(
        sectionRef.current,
        { backgroundColor: "#ffffff" },
        {
          backgroundColor: "#e8e2d8",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // 写真：わずかに沈む
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.05,
          filter: "brightness(1)",
        },
        {
          scale: 1,
          filter: "brightness(0.88)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // テキスト：静かに現れる
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        sm:hidden
        relative
        min-h-screen
        flex items-center
        overflow-hidden
      "
    >
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="/dusk-space1.png"
          alt=""
          className="w-full h-full object-cover"
        />

        {/* 夕の膜（SPは1レイヤーだけ） */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* テキスト */}
      <div
        ref={textRef}
        className="
          relative z-10
          px-6
          max-w-[36ch]
        "
      >
        <p className="text-[11px] tracking-[0.3em] text-neutral-300 mb-6">
          DUSK
        </p>

        <h2 className="text-[1.6rem] font-light leading-[1.5] text-neutral-100 mb-8">
          The room begins
          <br />
          to breathe.
        </h2>

        <p className="text-[13px] text-neutral-300 leading-[2.1]">
          Light falls lower.<br />
          Silence thickens.<br />
          Something is about to begin.
        </p>
      </div>
    </section>
  );
}
