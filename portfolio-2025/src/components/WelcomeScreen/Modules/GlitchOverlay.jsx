import { GiDeathSkull } from "react-icons/gi";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { FaRadiation } from "react-icons/fa";

const GlitchOverlay = () => (
  <>
    <div className="absolute inset-0 bg-cyber-primary opacity-10 z-20 pointer-events-none" />
    <div className="glitch-lines absolute inset-0 z-20 pointer-events-none" />
    <div className="absolute top-1/4 left-1/4 z-30 text-[#ff0020] text-4xl animate-pulse error-icon">
      <GiDeathSkull />
    </div>
    <div className="absolute top-1/3 right-1/4 z-30 text-[#ffff00] text-4xl animate-pulse warning-icon">
      <BsFillExclamationDiamondFill />
    </div>
    <div className="absolute bottom-1/3 left-1/4 z-30 text-[#00ff00] text-4xl animate-pulse radiation-icon">
      <FaRadiation />
    </div>
  </>
);

export default GlitchOverlay;
