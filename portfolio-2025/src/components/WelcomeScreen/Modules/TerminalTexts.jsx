import React from "react";
import { FaSkullCrossbones } from "react-icons/fa";

const TerminalTexts = ({
  glitchActive,
  displayTexts,
  isTyping,
  showSubtitle,
  subtitleRef,
}) => {
  return (
    <div className="relative z-50 text-center mb-12 w-full max-w-2xl">
      {/* Terminal Line */}
      <div
        className={`font-mono mb-4 tracking-widest min-h-6 ${
          glitchActive
            ? "text-[#ff0020] text-xs md:text-2xl glitch-font-style hover:translate-y-0"
            : "text-cyber-primary text-sm md:text-[11px]"
        }`}
      >
        {displayTexts.terminal}
        {!glitchActive && displayTexts.terminal?.length < 36 && (
          <span
            className={`ml-2 animate-terminal-blink ${
              glitchActive ? "text-red-500" : ""
            }`}
          >
            _
          </span>
        )}
      </div>

      {/* Title */}
      <h1
        className={`font-mono font-bold tracking-tighter min-h-12 ${
          glitchActive
            ? "text-[#ff0020] text-2xl md:text-4xl glitch-font-style italic"
            : "text-cyber-primary text-3xl md:text-4xl"
        }`}
      >
        {displayTexts.title}
        {!glitchActive && isTyping && (
          <span
            className={`ml-2 animate-terminal-blink ${
              glitchActive ? "text-red-600 text-4xl" : ""
            }`}
          >
            _
          </span>
        )}
      </h1>

      {/* Subtitle */}
      <h1
        ref={subtitleRef}
        className={`flex items-center justify-center gap-2 min-h-6 mt-6 mb-8 font-quakerhack ${
          glitchActive
            ? "text-[#ff0020] text-xs md:text-xl glitch-font-style hover:translate-y-0"
            : `text-cyber-accent text-sm md:text-base tracking-widest ${
                showSubtitle
                  ? "opacity-100 translate-y-0 transition-all duration-500 ease-out"
                  : "opacity-0 translate-y-2"
              }`
        }`}
        style={{
          transition: glitchActive
            ? "none"
            : "opacity 0.5s ease-out, transform 0.5s ease-out",
        }}
      >
        <span>{displayTexts.subtitle}</span>
        <FaSkullCrossbones
          className={`animate-pulse ${
            glitchActive ? "text-red-500 text-xl" : ""
          }`}
        />
      </h1>
    </div>
  );
};

export default TerminalTexts;
