import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageWrapRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.35,
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 26,
          letterSpacing: "0.26em",
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.2em",
          filter: "blur(0px)",
          duration: 1.2,
        }
      )
        .fromTo(
          metaRef.current,
          {
            opacity: 0,
            y: 16,
            filter: "blur(4px)",
          },
          {
            opacity: 0.75,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
          },
          "-=0.6"
        )
        .fromTo(
          imageWrapRef.current,
          {
            opacity: 0,
            y: 40,
            scale: 1.06,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.6,
          },
          "-=1"
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
        bg-white
        overflow-hidden
      "
    >
      {/* ===== TEXT ZONE ===== */}
<div
  className="
    relative
    z-20
    max-w-7xl
    mx-auto
    px-8 md:px-20
    pt-[30vh]
    md:pl-[9vw]   /* ← 右に侵入させる */
  "
>
<h1
  ref={titleRef}
  className="
    text-[clamp(3rem,7vw,6rem)]
    tracking-[0.2em]
 text-[#2a2a2a]

    mb-14
    relative
    z-30
    drop-shadow-[0_10px_40px_rgba(0,0,0,0.12)]
  "
>
  RÉSONANCE
</h1>


    <p
  ref={metaRef}
  className="
    relative
    inline-block
    text-[11.5px]
    tracking-[0.26em]
    text-neutral-700/90
    drop-shadow-[0_1px_6px_rgba(0,0,0,0.12)]
    after:content-['']
    after:absolute
    after:left-0
    after:-bottom-2
    after:w-6
    after:h-[1.5px]
    after:bg-neutral-500/60
  "
>
  French table in Tokyo
</p>

      </div>

      {/* ===== IMAGE ZONE（レイアウト破壊） ===== */}
<div
  ref={imageWrapRef}
  className="
    absolute
    right-[-20vw]
    top-[-20vh]
    w-[75vw]       /* ← 少しだけ拡張 */
    h-[120vh]
    z-10
  "
>
^^
        <img
          src="/hero-bg1.png"
          alt=""
          className="
            w-full
            h-full
            object-cover
            shadow-[0_120px_280px_rgba(0,0,0,0.45)]
            contrast-[0.98]
          "
        />
      </div>

      {/* ===== 空気レイヤー ===== */}
 <div className="
  pointer-events-none
  absolute
  inset-0
  bg-gradient-to-r
  from-white via-white/25 to-transparent
  z-30
" />

    </section>
  );
}
