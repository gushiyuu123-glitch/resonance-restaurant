// components/SectionInvertSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionInvertSP() {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景：夜 → 余韻グレー → 白
      gsap.to(rootRef.current, {
        backgroundColor: "#f6f6f4",
        color: "#111",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // テキスト：現れる → 少し沈む（余熱）
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 18, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.to(textRef.current, {
        opacity: 0.85,
        y: -4,
        duration: 1.6,
        ease: "power1.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });

      // ライン：遅れて静かに
      gsap.fromTo(
        lineRef.current,
        { opacity: 0, scaleY: 0 },
        {
          opacity: 0.25,
          scaleY: 1,
          transformOrigin: "top",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 65%",
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
        min-h-[85vh]
        bg-neutral-950
        text-neutral-200
        flex items-center justify-center
        px-6
      "
    >
      <div className="flex flex-col items-center text-center">
        <div
          ref={textRef}
          className="
            max-w-[30ch]
            text-shadow-[0_1px_6px_rgba(0,0,0,0.35)]
          "
        >
          <p className="text-[10px] tracking-[0.4em] opacity-50 mb-6">
            AFTER
          </p>

          <h2 className="text-[1.6rem] font-light mb-8 leading-snug">
            A quiet dialogue
          </h2>

          <p className="text-[13px] leading-[2.05] opacity-75">
            Between ingredients,
            <br />
            hands, and time.
          </p>
        </div>

        {/* Menuへの余韻ライン */}
        <div
          ref={lineRef}
          className="mt-12 h-16 w-px bg-neutral-400 opacity-0"
        />
      </div>
    </section>
  );
}
