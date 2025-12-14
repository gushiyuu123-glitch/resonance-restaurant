// src/components/layout/HeroWrapper.jsx
import HeroPC from "../hero/HeroPC";
import HeroSP from "../hero/HeroSP";

export default function HeroWrapper() {
  return (
    <>
      {/* PC */}
      <div className="hidden sm:block">
        <HeroPC />
      </div>

      {/* SP */}
      <div className="sm:hidden">
        <HeroSP />
      </div>
    </>
  );
}
