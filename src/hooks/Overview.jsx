import { useInView } from "../hooks/useInView";

export default function Overview() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className={`
        max-w-5xl mx-auto px-6 py-32
        transition-all duration-700
        ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <h2 className="text-xl tracking-wide mb-6">Overview</h2>
      <p className="text-sm leading-relaxed text-neutral-600">
        Modern French restaurant in Tokyo.
      </p>
    </section>
  );
}
