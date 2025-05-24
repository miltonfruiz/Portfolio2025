import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSkullCrossbones, FaRadiation } from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { GiDeathSkull } from "react-icons/gi";
import { FaDoorOpen } from "react-icons/fa6";
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
    "flex items-center justify-center gap-1 sm:gap-2 md:gap-1 w-full sm:w-auto md:w-48 h-12 rounded-sm font-mono font-semibold transition-all duration-200 border-2 hover:-translate-y-0.5 focus:outline-none";
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
    }, 1000 + Math.random() * 3000);
    return () => clearInterval(randomGlitch);
  }, []);
  const exclusionZones = useRef([
    { x: 25, y: 15, width: 50, height: 20 },
    { x: 20, y: 60, width: 60, height: 20 },
    { x: 0, y: 85, width: 100, height: 15 },
  ]);
  const getGlitchPosition = (defaultPosition) => {
    let x = defaultPosition.x;
    let y = defaultPosition.y;
    let attempts = 0;
    const maxAttempts = 50;
    const isInExclusionZone = (x, y) => {
      return exclusionZones.current.some(
        (zone) =>
          x >= zone.x &&
          x <= zone.x + zone.width &&
          y >= zone.y &&
          y <= zone.y + zone.height
      );
    };
    while (isInExclusionZone(x, y) && attempts < maxAttempts) {
      x = 10 + Math.random() * 80;
      y = 10 + Math.random() * 70;
      attempts++;
    }
    return { x, y };
  };
  return (
    <div className="app-container min-h-screen flex flex-col items-center justify-center bg-cyber-dark p-4 crt-container relative overflow-hidden">
      <MatrixRain speed={10} />
      <div className="scanlines" />
      <div className="crt-overlay" />
      <div className="crt-curvature" />
      <Glitch glitchActive={glitchActive} />
      {glitchActive && (
        <>
          <div className="absolute inset-0 bg-cyber-primary opacity-10 z-20 pointer-events-none"></div>
          <div className="glitch-lines absolute inset-0 z-20 pointer-events-none"></div>
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
      )}
      <div className="relative z-50 text-center mb-12">
        <div
          className={`font-mono text-cyber-primary text-sm md:text-base mb-2 tracking-widest`}
        >
          {textElements.terminal}
          <span className="ml-2 animate-terminal-blink">_</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-cyber-primary tracking-tighter ">
          {textElements.title}
        </h1>
        <h1 className="text-sm md:text-base font-mono italic text-cyber-accent mt-6 mb-8 flex items-center justify-center gap-2">
          <span>{textElements.subtitle}</span>
          <FaSkullCrossbones className="animate-pulse" />
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full max-w-lg z-50 justify-center">
        <button
          onClick={() => handleAccess("login")}
          className={`${buttonBaseClasses}  border-cyber-primary text-cyber-primary shadow-hacker-glow ${
            glitchActive ? "glitch-button" : ""
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4`}
          aria-label="Iniciar sesión"
        >
          <FaDoorOpen className="text-[0.1rem] sm:text-[1rem] md:text-[1rem]" />
          <span
            className={`ml-1 sm:ml-2 text-[8px] tracking-[3px] font-hacker ${
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
          <FaMoon className="text-[0.1rem] sm:text-[1rem] md:text-[1rem]" />
          <span
            className={`ml-1 sm:ml-2 text-xs text-[8px] tracking-[3px]  font-hacker${
              glitchActive ? "glitch-effect-small" : ""
            }`}
          >
            {glitchActive ? "CORRUPTED" : "HIBERNATE"}
          </span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-cyber-primary text-cyber-code text-xs font-mono px-4 py-2 overflow-hidden z-50">
        <div className="animate-marquee whitespace-nowrap">
          {textElements.footer}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
