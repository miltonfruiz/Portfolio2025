import React, { useState, useEffect, useRef } from "react";
import { FaSkullCrossbones } from "react-icons/fa";

const TerminalTexts = ({
  glitchActive,
  displayTexts,
  isTyping,
  showSubtitle,
  subtitleRef,
}) => {
  const [typedTerminalText, setTypedTerminalText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const hasTyped = useRef(false);

  useEffect(() => {
    if (!glitchActive && !hasTyped.current) {
      const delay = setTimeout(() => {
        setStartTyping(true);
      }, 7000); // Esperar 7s antes de empezar a escribir Terminal Line

      return () => clearTimeout(delay);
    }
  }, [glitchActive]);

  useEffect(() => {
    if (startTyping && !hasTyped.current && displayTexts.terminal) {
      let currentIndex = 0;
      const totalDuration = 3000; // 3 segundos
      const intervalTime = Math.floor(
        totalDuration / displayTexts.terminal.length
      );

      const typingInterval = setInterval(() => {
        currentIndex++;
        setTypedTerminalText(displayTexts.terminal.slice(0, currentIndex));

        if (currentIndex >= displayTexts.terminal.length) {
          clearInterval(typingInterval);
          hasTyped.current = true;

          // Mostrar el título después de 2s
          setTimeout(() => {
            setShowTitle(true);
          }, 2000);
        }
      }, intervalTime);

      return () => clearInterval(typingInterval);
    }
  }, [startTyping, displayTexts.terminal]);

  return (
    <div className="relative z-50 text-center mb-8 w-full max-w-2xl">
      {/* Terminal Line */}
      <div
        className={`font-mono mb-4 tracking-widest min-h-6 ${
          glitchActive
            ? "text-[#ff0020] text-xs md:text-[18px] glitch-font-style hover:translate-y-0"
            : "text-cyber-primary text-sm md:text-[11px]"
        }`}
      >
        {glitchActive ? displayTexts.terminal : typedTerminalText}

        {!glitchActive &&
          typedTerminalText.length < displayTexts.terminal.length && (
            <span className="ml-2 animate-terminal-blink">_</span>
          )}
      </div>

      {/* Title */}
      {showTitle && (
        <h1
          className={`font-mono font-bold tracking-tighter min-h-12 transition-opacity duration-500 ${
            glitchActive
              ? "text-[#ff0020] text-2xl md:text-4xl glitch-font-style italic"
              : "text-cyber-primary text-3xl md:text-4xl"
          }`}
        >
          {displayTexts.title}
          {!glitchActive && isTyping && (
            <span className="ml-2 animate-terminal-blink">_</span>
          )}
        </h1>
      )}

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
