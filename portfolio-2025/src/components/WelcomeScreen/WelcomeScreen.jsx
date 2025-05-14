import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTerminal,
  FaMoon,
  FaSkullCrossbones,
  FaRadiation,
  FaBan,
} from "react-icons/fa";
import { GiDeathSkull } from "react-icons/gi";
import "./WelcomeScreen.css";
import Glitch from "../../Hooks/Glitch";
import MatrixRain from "../MatrixRain/MatrixRain";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [glitchActive, setGlitchActive] = useState(false);
  const [textElements, setTextElements] = useState({
    title: "$ ./welcome.sh",
    subtitle: "# Are you ready?",
    terminal: "[root@portfolio ~]$ run miltonfruiz.exe",
    footer:
      "SYSTEM READY • [USER: miltonfruiz] • [PASSWORD: ******] • LOADING TERMINAL: 100% • MEMORY: 64GB • CPU: 12TH GEN i9 • GPU: RTX 4090 • [###-------] 30%",
  });

  const buttonBaseClasses =
    "flex items-center justify-center gap-1 sm:gap-2 md:gap-3 w-full sm:w-auto md:w-48 rounded-none font-mono font-bold transition-all duration-200 border-2 hover:-translate-y-0.5 focus:outline-none";
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\";

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 1000);

    const originalTexts = { ...textElements };
    let iterations = 0;

    const glitchInterval = setInterval(() => {
      setTextElements({
        title: glitchText(originalTexts.title, iterations, 8),
        subtitle: glitchText(originalTexts.subtitle, iterations, 5),
        terminal: glitchText(originalTexts.terminal, iterations, 10),
        footer: glitchText(originalTexts.footer, iterations, 15),
      });

      iterations++;
      if (iterations > 10) {
        clearInterval(glitchInterval);
        setTextElements(originalTexts);
        setGlitchActive(false);
      }
    }, 50);
  };

  const glitchText = (text, iterations, intensity) => {
    return text
      .split("")
      .map((char, index) => {
        if (index < iterations || Math.random() > intensity / 10) return char;
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      })
      .join("");
  };

  const handleAccess = (type) => {
    console.log(`[SYSTEM] Access: ${type.toUpperCase()}`);
    triggerGlitch();
    setTimeout(() => {
      if (type === "login") navigate("/auth");
    }, 500);
  };

  useEffect(() => {
    const randomGlitch = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch();
    }, 8000 + Math.random() * 7000);
    return () => clearInterval(randomGlitch);
  }, []);

  return (
    <div className="app-container min-h-screen flex flex-col items-center justify-center bg-cyber-dark p-4 crt-container relative overflow-hidden">
      <MatrixRain speed={10} />
      <div className="scanlines" />
      <div className="crt-overlay" />
      <div className="crt-curvature" />

      {/* Efectos Glitch Mejorados */}
      <Glitch glitchActive={glitchActive} />

      {glitchActive && (
        <>
          <div className="absolute inset-0 bg-cyber-primary opacity-10 z-20 pointer-events-none"></div>
          <div className="glitch-lines absolute inset-0 z-20 pointer-events-none"></div>

          {/* Elementos de error emergentes */}
          <div className="absolute top-1/4 left-1/4 z-30 text-red-500 text-4xl animate-pulse">
            <FaBan />
          </div>
          <div className="absolute top-1/3 right-1/4 z-30 text-red-500 text-4xl animate-pulse">
            <GiDeathSkull />
          </div>
          <div className="absolute bottom-1/3 left-1/3 z-30 text-red-500 text-4xl animate-pulse">
            <FaRadiation />
          </div>
        </>
      )}

      <div className="relative z-10 text-center mb-12">
        <div
          className={`font-mono text-cyber-primary text-sm md:text-base mb-2 tracking-widest ${
            glitchActive ? "glitch-effect" : ""
          }`}
          data-text={textElements.terminal}
        >
          {textElements.terminal}
          <span className="ml-2 animate-terminal-blink">_</span>
        </div>

        <h1
          className={`text-3xl md:text-4xl font-mono font-bold text-cyber-primary tracking-tighter ${
            glitchActive ? "glitch-effect" : ""
          }`}
          data-text={textElements.title}
        >
          {textElements.title}
        </h1>

        <h1
          className={`text-sm md:text-base font-mono italic text-cyber-accent mt-6 mb-8 flex items-center justify-center gap-2 ${
            glitchActive ? "glitch-effect" : ""
          }`}
          data-text={textElements.subtitle}
        >
          <span>{textElements.subtitle}</span>
          <FaSkullCrossbones
            className={`${glitchActive ? "animate-spin" : "animate-pulse"}`}
          />
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full max-w-lg z-10 justify-center">
        <button
          onClick={() => handleAccess("login")}
          className={`${buttonBaseClasses} border-cyber-primary text-cyber-primary shadow-hacker-glow ${
            glitchActive ? "glitch-button" : ""
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4`}
          aria-label="Iniciar sesión"
        >
          <FaTerminal className="text-[0.6rem] sm:text-[1rem] md:text-[1rem]" />
          <span
            className={`ml-1 sm:ml-2 text-xs ${
              glitchActive ? "glitch-effect-small" : ""
            }`}
          >
            {glitchActive ? "ERROR_0x7F" : "ACCESS"}
          </span>
        </button>

        <button
          onClick={() => handleAccess("guest")}
          className={`${buttonBaseClasses} border-cyber-secondary text-cyber-secondary shadow-hacker-glow-blue ${
            glitchActive ? "glitch-button" : ""
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4`}
          aria-label="Modo invitado"
        >
          <FaMoon className="text-[0.6rem] sm:text-[1rem] md:text-[1rem]" />
          <span
            className={`ml-1 sm:ml-2 text-xs ${
              glitchActive ? "glitch-effect-small" : ""
            }`}
          >
            {glitchActive ? "CORRUPTED" : "HIBERNATE"}
          </span>
        </button>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-cyber-primary text-cyber-code text-xs font-mono px-4 py-2 overflow-hidden ${
          glitchActive ? "glitch-effect-footer" : ""
        }`}
      >
        <div className="animate-marquee whitespace-nowrap">
          {glitchActive
            ? "SYSTEM FAILURE: 0x7F • KERNEL PANIC • MEMORY CORRUPTION DETECTED • PLEASE CONTACT SYSTEM ADMINISTRATOR • DANGER!"
            : textElements.footer}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
