import { useInView } from "../hooks/useInView";

export default function SectionImage() {
  const { ref, isInView } = useInView({ threshold: 0.25 });

  return (
    <section
      ref={ref}
      className="py-40 px-8 md:px-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* IMAGE */}
        <img
          src="/dish.png"
          alt=""
          className={`
            w-full h-[70vh] object-cover mb-14
            transition-all duration-[1600ms] ease-out
            shadow-[0_40px_120px_rgba(0,0,0,0.35)]
            ${
              isInView
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-80 -translate-y-8 blur-[1.5px]"
            }
          `}
        />

        {/* COPY */}
        <p
          className={`
            text-sm tracking-wide text-neutral-500 max-w-md
            transition-all duration-[1200ms] ease-out delay-300
            ${
              isInView
                ? "opacity-90 translate-y-0"
                : "opacity-40 translate-y-2"
            }
          `}
        >
          A quiet dialogue between fire, time, and ingredients.
        </p>
      </div>
    </section>
  );
}
