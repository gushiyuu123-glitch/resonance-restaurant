// components/SectionReservationSP.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionReservationSP() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0, // ← SPは少し早め
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
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
        bg-white
        text-neutral-900
        flex items-center justify-center
        px-6
      "
    >
      <div
        ref={contentRef}
        className="text-center max-w-[34ch]"
      >
        <p className="text-[10px] tracking-[0.4em] opacity-50 mb-8">
          RESERVATION
        </p>

        <h2 className="text-[1.6rem] font-light mb-10 leading-relaxed">
          When you are ready,
          <br />
          we will prepare the table.
        </h2>

        <p className="text-[13px] leading-loose opacity-65 mb-14">
          Reservations are limited.
          <br />
          Each evening is prepared
          <br />
          for a small number of guests.
        </p>
<a
  href="#"
  className="
    inline-block
    text-[12px]
    tracking-[0.25em]
    opacity-50
    border-b border-neutral-400
    pb-[2px]
    transition-all duration-300
    hover:opacity-80
    hover:border-neutral-600
    active:opacity-70
  "
>
  Make a reservation
</a>


      </div>
    </section>
  );
}
