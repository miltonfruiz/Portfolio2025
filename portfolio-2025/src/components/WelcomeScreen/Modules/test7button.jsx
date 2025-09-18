import React from "react";
import { FaDoorOpen, FaArrowRight, FaMoon } from "react-icons/fa6";
import { MdWavingHand } from "react-icons/md";

const ActionButtons = ({ glitchActive, showButtons, handleAccess }) => {
  const buttonBase =
    "relative flex items-center justify-center gap-1 sm:gap-2 md:gap-2 w-full sm:w-auto md:w-44 h-11 rounded-sm font-mono font-semibold transition-all duration-400 border focus:outline-none overflow-hidden";

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
          className={`${buttonBase} ${
            glitchActive
              ? "glitch-button border-[#ff0020] bg-black/80 backdrop-blur-sm"
              : "bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-green-400/50 hover:border-green-400 hover:from-green-500/30 hover:to-cyan-500/30"
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4 group backdrop-blur-sm`}
          style={{
            boxShadow: glitchActive
              ? "0 0 20px #ff0020, inset 0 0 20px rgba(255, 0, 32, 0.1)"
              : "0 0 20px rgba(34, 197, 94, 0.4), inset 0 0 20px rgba(34, 197, 94, 0.1)",
          }}
          aria-label={glitchActive ? "Error de sistema" : "Acceder"}
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse opacity-20"></div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-current opacity-60"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-current opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-current opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-current opacity-60"></div>

          <div className="relative w-4 h-4 flex items-center z-10">
            <FaDoorOpen
              className={`absolute transition-all duration-300 ${
                glitchActive
                  ? "text-[#ff0020]"
                  : "text-green-400 group-hover:opacity-0 group-hover:translate-x-[100px]"
              }`}
            />
            <FaArrowRight
              className={`absolute right-full transition-all duration-300 opacity-0 ${
                glitchActive
                  ? "hidden"
                  : "text-green-400 group-hover:opacity-100 group-hover:translate-x-[100%]"
              }`}
            />
          </div>
          <div className="relative inline-flex items-center h-5 overflow-hidden z-10">
            <span
              className={`absolute right-full text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive
                  ? "hidden"
                  : "group-hover:translate-x-[200%] text-green-400"
              }`}
            >
              go!
            </span>
            <span
              className={`ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive
                  ? "glitch-effect-small text-[#ff0020]"
                  : "group-hover:translate-x-[100%] text-green-400"
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
          className={`${buttonBase} ${
            glitchActive
              ? "glitch-button border-[#ff0020] bg-black/80 backdrop-blur-sm"
              : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50 hover:border-blue-400 hover:from-blue-500/30 hover:to-purple-500/30"
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4 backdrop-blur-sm`}
          style={{
            boxShadow: glitchActive
              ? "0 0 20px #ff0020, inset 0 0 20px rgba(255, 0, 32, 0.1)"
              : "0 0 20px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(59, 130, 246, 0.1)",
          }}
          aria-label="Modo invitado"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse opacity-20"></div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-current opacity-60"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-current opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-current opacity-60"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-current opacity-60"></div>

          <div className="relative w-4 h-4 flex items-center z-10">
            <FaMoon
              className={`absolute transition-all duration-300 ${
                glitchActive
                  ? "text-[#ff0020]"
                  : "text-blue-400 group-hover/hibernate:opacity-0 group-hover/hibernate:translate-x-[100px]"
              }`}
            />
            <MdWavingHand
              className={`absolute right-full transition-all duration-300 opacity-0 ${
                glitchActive
                  ? "hidden"
                  : "text-blue-400 group-hover/hibernate:opacity-100 group-hover/hibernate:translate-x-[100%]"
              }`}
            />
          </div>
          <div className="relative inline-flex items-center h-5 overflow-hidden z-10">
            <span
              className={`absolute right-full ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive
                  ? "hidden"
                  : "group-hover/hibernate:translate-x-[200%] text-blue-400"
              }`}
            >
              Bye!
            </span>
            <span
              className={`ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker transition-transform duration-300 ${
                glitchActive
                  ? "glitch-effect-small text-[#ff0020]"
                  : "group-hover/hibernate:translate-x-[100%] text-blue-400"
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
