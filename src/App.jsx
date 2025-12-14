import Hero from "./components/Hero";
import HeroSP from "./components/HeroSP";

import SectionSpace from "./components/SectionSpace";
import SectionSpaceSP from "./components/SectionSpaceSP";

import SectionDusk from "./components/SectionDusk";
import SectionDuskSP from "./components/SectionDuskSP";

import SectionPrelude from "./components/SectionPrelude";
import SectionPreludeSP from "./components/SectionPreludeSP";

import SectionHeat from "./components/SectionHeat";
import SectionHeatSP from "./components/SectionHeatSP";

import SectionInvert from "./components/SectionInvert";
import SectionInvertSP from "./components/SectionInvertSP";

import SectionMenuEndRoll from "./components/SectionMenuEndRoll";
import SectionMenuEndRollSP from "./components/SectionMenuEndRollSP";

import SectionReservation from "./components/SectionReservation";
import SectionReservationSP from "./components/SectionReservationSP";



export default function App() {
  return (
    <main>
      {/* Hero */}
      <div className="hidden sm:block">
        <Hero />
      </div>
      <div className="sm:hidden">
        <HeroSP />
      </div>

      {/* Space */}
      <div className="hidden sm:block">
        <SectionSpace />
      </div>
      <div className="sm:hidden">
        <SectionSpaceSP />
      </div>

      <div className="hidden sm:block"><SectionDusk /></div>
      <div className="sm:hidden"><SectionDuskSP /></div>

      <div className="hidden sm:block"><SectionPrelude /></div>
      <div className="sm:hidden"><SectionPreludeSP /></div>

      <div className="hidden sm:block"><SectionHeat /></div>
      <div className="sm:hidden"><SectionHeatSP /></div>

   
  <div className="hidden sm:block"><SectionInvert /></div>
      <div className="sm:hidden"><SectionInvertSP /></div>

 {/* PC */}
<div className="hidden sm:block">
  <SectionMenuEndRoll />
</div>
{/* SP */}
<div className="sm:hidden">
  <SectionMenuEndRollSP />
</div>

  {/* PC */}
<div className="hidden sm:block">
  <SectionReservation />
</div>
{/* SP */}
<div className="sm:hidden">
  <SectionReservationSP />
  
</div>
    </main>
  );
}
