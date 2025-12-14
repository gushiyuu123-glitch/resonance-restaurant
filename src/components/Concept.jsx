import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Concept() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
        "+=0.1"
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
        "+=0.2"
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[220px] px-8 bg-white"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-y-28">

        {/* ラベル */}
        <div className="col-span-12 col-start-2">
          <span
            ref={labelRef}
            className="text-[10px] tracking-[0.45em] text-neutral-400"
          >
            CONCEPT
          </span>
        </div>

        {/* メインコピー */}
        <div className="col-span-5 col-start-2">
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl leading-[1.7] font-light"
          >
            静けさが、
            <br />
            味を深くする。
          </h2>
        </div>

        {/* 説明文 */}
        <div
          ref={textRef}
          className="col-span-4 col-start-8 text-[13px] leading-[2.4] text-neutral-600"
        >
          <p>
            料理は、語られません。
            <br />
            音のない時間と、余白の中で
            <br />
            ただ、置かれます。
          </p>

          <p className="mt-10">
            火入れの緊張。
            <br />
            何も起きない一瞬。
          </p>

          <p className="mt-10">
            その重なりの中にだけ、
            <br />
            共鳴は生まれる。
          </p>
        </div>

      </div>
    </section>
  );
}
