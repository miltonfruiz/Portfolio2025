import React from "react";
import { FaDoorOpen, FaArrowRight, FaMoon } from "react-icons/fa6";
import { MdWavingHand } from "react-icons/md";

const ActionButtons = ({ glitchActive, showButtons, handleAccess }) => {
  const buttonBase =
    "flex items-center justify-center gap-1 sm:gap-2 md:gap-2 w-full sm:w-auto md:w-44 h-11 rounded-md font-mono font-semibold transition-all duration-400 border-2 focus:outline-none";

  return (
    <div
      className={`flex flex-col sm:flex-row gap-2 sm:gap-33 md:gap-8 w-full max-w-lg z-50 justify-center transition-all duration-700 ${
        showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* ACCESS BUTTON */}
      <div className="group/access">
        <button
          onClick={() => handleAccess("login")}
          className={`${buttonBase} bg-cyber-primary shadow-hacker-glow hover:bg-white hover:border-0 hover:shadow-white hover:text-black ${
            glitchActive
              ? "glitch-button border-[#ff0020] shadow-[#ff0020] bg-transparent"
              : "border-cyber-primary"
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4 overflow-hidden group`}
          aria-label={glitchActive ? "Error de sistema" : "Acceder"}
        >
          <div className="relative w-4 h-4 flex items-center">
            <FaDoorOpen
              className={`absolute transition-all duration-300 ${
                glitchActive
                  ? "text-[#ff0020]"
                  : "text-current group-hover:opacity-0 group-hover:translate-x-[100px]"
              }`}
            />
            <FaArrowRight
              className={`absolute right-full transition-all duration-300 opacity-0 ${
                glitchActive
                  ? "hidden"
                  : "text-current group-hover:opacity-100 group-hover:translate-x-[100%]"
              }`}
            />
          </div>
          <div className="relative inline-flex items-center h-5 overflow-hidden">
            <span
              className={`absolute right-full text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive ? "hidden" : "group-hover:translate-x-[200%]"
              }`}
            >
              go!
            </span>
            <span
              className={`ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive
                  ? "glitch-effect-small text-[#ff0020]"
                  : "group-hover:translate-x-[100%]"
              }`}
            >
              ACCESS
            </span>
          </div>
        </button>
      </div>

      {/* HIBERNATE BUTTON */}
      <div className="group/hibernate">
        <button
          onClick={() => handleAccess("guest")}
          className={`${buttonBase} bg-cyber-secondary shadow-hacker-glow-blue hover:bg-white hover:border-0 hover:shadow-white hover:text-black ${
            glitchActive
              ? "glitch-button border-[#ff0020] shadow-[#ff0020] bg-transparent"
              : "border-cyber-secondary"
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4 overflow-hidden`}
          aria-label="Modo invitado"
        >
          <div className="relative w-4 h-4 flex items-center">
            <FaMoon
              className={`absolute transition-all duration-300 ${
                glitchActive
                  ? "text-[#ff0020]"
                  : "text-current group-hover/hibernate:opacity-0 group-hover/hibernate:translate-x-[100px]"
              }`}
            />
            <MdWavingHand
              className={`absolute right-full transition-all duration-300 opacity-0 ${
                glitchActive
                  ? "hidden"
                  : "text-current group-hover/hibernate:opacity-100 group-hover/hibernate:translate-x-[100%]"
              }`}
            />
          </div>
          <div className="relative inline-flex items-center h-5 overflow-hidden">
            <span
              className={`absolute right-full ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive
                  ? "hidden"
                  : "group-hover/hibernate:translate-x-[200%]"
              }`}
            >
              Bye!
            </span>
            <span
              className={`ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive
                  ? "glitch-effect-small text-[#ff0020]"
                  : "group-hover/hibernate:translate-x-[100%]"
              }`}
            >
              HIBERNATE
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
