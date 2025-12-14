// components/SectionInvert.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionInvert() {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景：夜 → 余熱の白
      gsap.fromTo(
        rootRef.current,
        { backgroundColor: "#0b0b0b" },
        {
          backgroundColor: "#f4f3ef",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: 1.6,
          },
        }
      );

      // テキスト：浮かび → 定着
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 28,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 60%",
          },
        }
      );

      // 文字の“呼吸”
      gsap.to(textRef.current, {
        y: -6,
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // 光の残像（余韻）
      gsap.fromTo(
        glowRef.current,
        { opacity: 0 },
        {
          opacity: 0.25,
          duration: 2.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 55%",
          },
        }
      );

      // ライン：伸びて、止まる
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 0.25,
          transformOrigin: "top",
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 58%",
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
        flex items-center justify-center
        px-8
        text-neutral-800
        relative
        overflow-hidden
      "
    >
      {/* 余熱の光 */}
      <div
        ref={glowRef}
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent_70%)]
        "
      />

      <div className="flex flex-col items-center relative z-10">
        <div
          ref={textRef}
          className="text-center max-w-md"
        >
          <p className="text-[10px] tracking-[0.4em] opacity-60 mb-8">
            AFTER
          </p>

          <h2 className="text-3xl md:text-4xl font-light mb-10 leading-relaxed">
            A quiet dialogue
          </h2>

          <p className="text-sm leading-loose opacity-75">
            Between ingredients, hands, and time.<br />
            What remains is resonance.
          </p>
        </div>

        {/* 静止する縦ライン */}
        <div
          ref={lineRef}
          className="mt-20 h-28 w-px bg-neutral-400 opacity-0"
        />
      </div>
    </section>
  );
}
