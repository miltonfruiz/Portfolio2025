import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSkullCrossbones, FaRadiation } from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { GiDeathSkull } from "react-icons/gi";
import { FaDoorOpen } from "react-icons/fa6";
import "./WelcomeScreen.css";
import Glitch from "../../Hooks/Glitch";
import MatrixRain from "../MatrixRain/MatrixRain";
import TypeWriter from "../../Hooks/Typewriter";

const WelcomeScreen = () => {
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
    setShowSubtitle(false);
    const timer = setTimeout(() => {
      setShowSubtitle(true);
      setTimeout(() => setShowButtons(true), 1000);
    }, 7400);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();
  const [glitchActive, setGlitchActive] = useState(false);
  const baseTexts = {
    terminal: "[root@portfolio ~]$ run miltonfruiz.exe",
    title: "$ ./welcome.sh",
    subtitle: "# are you ready? ",
    footer:
      "SYSTEM STATUS: OPERATIONAL    •    USER: miltonfruiz    •   ACCESS: ADMIN    •    CPU: 12TH GEN i9 @ 5.2GHz    •    GPU: RTX 4090    •    RAM: 64GB DDR5    •    STORAGE: 2TB NVMe    •    NETWORK: 10Gbps    •    THREATS BLOCKED: 0    •    LAST BACKUP: TODAY    •    UPTIME: 99.98%    •    ",
  };
  const subtitleRef = useRef(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  useEffect(() => {
    setShowSubtitle(false);
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 7400);
    return () => clearTimeout(timer);
  }, []);
  const { displayedTerminal, displayedTitle, isTyping } = TypeWriter(
    [baseTexts.terminal, baseTexts.title],
    80,
    1500
  );
  const [glitchedTexts, setGlitchedTexts] = useState({
    terminal: "",
    title: "",
    subtitle: "",
    footer: "",
  });
  const displayTexts = glitchActive
    ? glitchedTexts
    : {
        terminal: displayedTerminal,
        title: displayedTitle,
        subtitle: baseTexts.subtitle,
        footer: baseTexts.footer,
      };
  const buttonBaseClasses =
    "flex items-center justify-center gap-1 sm:gap-2 md:gap-1 w-full sm:w-auto md:w-48 h-12 rounded-sm font-mono font-semibold transition-all duration-200 border-2 hover:-translate-y-0.5 focus:outline-none";
  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\";
  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 1500);
    let iterations = 0;
    const glitchInterval = setInterval(() => {
      setGlitchedTexts({
        terminal: glitchText(baseTexts.terminal, iterations, 10),
        title: glitchText(baseTexts.title, iterations, 8),
        subtitle: glitchText(baseTexts.subtitle, iterations, 5),
        footer: glitchText(baseTexts.footer, iterations, 15),
      });
      iterations++;
      if (iterations > 10) {
        clearInterval(glitchInterval);
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
    let recurringInterval;
    const initialGlitchTimer = setTimeout(() => {
      triggerGlitch();
      recurringInterval = setInterval(() => {
        triggerGlitch();
      }, 5000 + Math.random() * 1000);
    }, 10000);
    return () => {
      clearTimeout(initialGlitchTimer);
      if (recurringInterval) clearInterval(recurringInterval);
    };
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
      <MatrixRain speed={10} glitchActive={glitchActive} />
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
      <div className="relative z-50 text-center mb-12 w-full max-w-2xl">
        <div
          className={`font-mono mb-4 tracking-widest min-h-6 ${
            glitchActive
              ? "text-[#ff0020] text-xs md:text-2xl glitch-font-style hover:translate-y-0"
              : "text-cyber-primary text-sm md:text-base"
          }`}
        >
          {displayTexts.terminal}
          {!glitchActive &&
            displayedTerminal.length < baseTexts.terminal.length && (
              <span
                className={`ml-2 animate-terminal-blink ${
                  glitchActive ? "text-red-500" : ""
                }`}
              >
                _
              </span>
            )}
        </div>
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
        <h1
          ref={subtitleRef}
          className={`flex items-center justify-center gap-2 min-h-6 font-bold mt-6 mb-8 ${
            glitchActive
              ? "text-[#ff0020] text-xs md:text-xl glitch-font-style hover:translate-y-0"
              : `text-cyber-accent text-sm md:text-xs  tracking-wider
  ${
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
      <div
        className={`flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full max-w-lg z-50 justify-center transition-all duration-700 ${
          showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={() => handleAccess("login")}
          className={`${buttonBaseClasses}  text-cyber-primary shadow-hacker-glow ${
            glitchActive
              ? "glitch-button border-[#ff0020] shadow-[#ff0020]"
              : "border-cyber-primary"
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4`}
          aria-label="Iniciar sesión"
        >
          <FaDoorOpen
            className={`${
              glitchActive
                ? "text-[#ff0020]"
                : "text-[0.1rem] sm:text-[1rem] md:text-[1rem]"
            }`}
          />
          <span
            className={`ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker ${
              glitchActive ? "glitch-effect-small text-[#ff0020]" : ""
            }`}
          >
            {glitchActive ? "ERROR_0x7F" : "ACCESS"}
          </span>
        </button>
        <button
          onClick={() => handleAccess("guest")}
          className={`${buttonBaseClasses}  text-cyber-secondary shadow-hacker-glow-blue ${
            glitchActive
              ? "glitch-button border-[#ff0020] shadow-[#ff0020]"
              : "border-cyber-secondary"
          } text-xs sm:text-sm md:text-base px-3 sm:px-6 md:px-8 py-1.5 sm:py-3 md:py-4`}
          aria-label="Modo invitado"
        >
          <FaMoon
            className={`${
              glitchActive
                ? "text-[#ff0020]"
                : "text-[0.1rem] sm:text-[1rem] md:text-[1rem]"
            }`}
          />
          <span
            className={`ml-1 sm:ml-2 text-[7px] tracking-[3px] font-hacker ${
              glitchActive ? "glitch-effect-small text-[#ff0020]" : ""
            }`}
          >
            {glitchActive ? "CORRUPTED" : "HIBERNATE"}
          </span>
        </button>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-10 px-4 py-2 overflow-hidden z-50 border-t text-[10px] ${
          glitchActive
            ? "border-red-500 bg-black/90 shadow-[0_0_10px_#ff0000]"
            : "border-cyber-primary bg-black"
        }`}
      >
        <div
          className={`animate-marquee whitespace-pre flex items-center h-full ${
            glitchActive
              ? "text-red-500 font-bold [text-shadow:_0_0_5px_#ff0000] text-sm "
              : "text-cyber-code"
          }`}
        >
          {displayTexts.footer}
        </div>
      </div>
    </div>
  );
};
export default WelcomeScreen;
