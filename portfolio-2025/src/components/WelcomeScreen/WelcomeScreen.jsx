import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSkullCrossbones, FaRadiation } from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { GiDeathSkull } from "react-icons/gi";
import { FaDoorOpen } from "react-icons/fa6";
import "./WelcomeScreen.css";
import Glitch from "../../Hooks/Glitch";
import MatrixRain from "../MatrixRain/MatrixRain";
import TypeWriter from "../../Hooks/Typewriter";
import GlitchOverlay from "./Modules/GlitchOverlay";
import TerminalTexts from "./Modules/TerminalTexts";
import { motion } from "framer-motion";

import {
  FaShieldAlt,
  FaClock,
  FaMemory,
  FaServer,
  FaSdCard,
  FaNetworkWired,
  FaUserShield,
  FaUser,
  FaCalendarCheck,
  FaBolt,
  FaArrowRight,
} from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";

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
  const footerData = [
    { icon: <FaShieldAlt />, label: "System Status", value: "Operational" },
    { icon: <FaUser />, label: "User", value: "miltonfruiz" },
    { icon: <FaUserShield />, label: "Access", value: "ADMIN" },
    { icon: <FaServer />, label: "CPU", value: "12TH GEN i9 @ 5.2GHz" },
    { icon: <FaBolt />, label: "GPU", value: "RTX 4090" },
    { icon: <FaMemory />, label: "RAM", value: "64GB DDR5" },
    { icon: <FaSdCard />, label: "Storage", value: "2TB NVMe" },
    { icon: <FaNetworkWired />, label: "Network", value: "10Gbps" },
    { icon: <FaShieldAlt />, label: "Threats Blocked", value: "0" },
    { icon: <FaCalendarCheck />, label: "Last Backup", value: "Today" },
    { icon: <FaClock />, label: "Uptime", value: "99.98%" },
  ];
  const baseTexts = {
    terminal: "[root@miltonfruiz ~]$ run portfolio-v2.5.exe",
    title: "$ ./welcome.sh",
    subtitle: "You're not ready",
    footer: footerData
      .map((item) => `${item.label}: ${item.value}`)
      .join(" • "),
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
    "flex items-center justify-center gap-1 sm:gap-2 md:gap-2 w-full sm:w-auto md:w-44 h-11 rounded-md font-mono font-semibold transition-all duration-400 border-2 focus:outline-none";
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
        footer: glitchText(
          footerData.map((item) => `${item.label}: ${item.value}`).join(" • "),
          iterations,
          15
        ),
      });
      iterations++;
      if (iterations > 10) {
        clearInterval(glitchInterval);
        setGlitchActive(false);
      }
    }, 50);
  };
  const glitchText = useCallback(
    (text, iterations, intensity) => {
      return text
        .split("")
        .map((char, index) =>
          index < iterations || Math.random() > intensity / 10
            ? char
            : glitchChars[Math.floor(Math.random() * glitchChars.length)]
        )
        .join("");
    },
    [glitchChars]
  );
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <div className="app-container min-h-screen flex flex-col items-center justify-center bg-cyber-dark p-4 crt-container relative overflow-hidden">
        <MatrixRain
          density={0.3}
          speed={60}
          showGrid={false}
          className="opacity-100"
        />
        <div className="scanlines" />
        <div className="crt-overlay" />
        <div className="crt-curvature" />
        <Glitch glitchActive={glitchActive} />
        {glitchActive && <GlitchOverlay />}
        <TerminalTexts
          glitchActive={glitchActive}
          displayTexts={displayTexts}
          isTyping={isTyping}
          showSubtitle={showSubtitle}
          subtitleRef={subtitleRef}
        />

        <div
          className={`flex flex-col sm:flex-row gap-2 sm:gap-33 md:gap-8 w-full max-w-lg z-50 justify-center transition-all duration-700 ${
            showButtons
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="group/access">
            <button
              onClick={() => handleAccess("login")}
              className={`${buttonBaseClasses} bg-cyber-primary shadow-hacker-glow hover:bg-white hover:border-0 hover:shadow-white hover:text-black ${
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
          <div className="group/hibernate">
            <button
              onClick={() => handleAccess("guest")}
              className={`${buttonBaseClasses} bg-cyber-secondary shadow-hacker-glow-blue hover:bg-white hover:border-0 hover:shadow-white hover:text-black ${
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
        <div
          className={`absolute bottom-0 left-0 right-0 h-8 px-4 py-2 overflow-hidden z-50 border-t text-[10px] ${
            glitchActive
              ? "border-red-500 bg-black/90 shadow-[0_0_10px_#ff0000]"
              : "border-cyber-primary bg-black"
          }`}
        >
          <div className="relative h-full w-full overflow-hidden font-montserrat ">
            <div
              className={`absolute flex gap-4 items-center h-full ${
                glitchActive
                  ? "text-red-500 font-bold [text-shadow:_0_0_5px_#ff0000] text-sm"
                  : "text-cyber-code"
              }`}
              style={{
                animation: "marquee 60s linear infinite",
                whiteSpace: "nowrap",
              }}
            >
              {glitchActive ? (
                <span className="flex gap-4">
                  {glitchedTexts.footer || "SYSTEM FAILURE DETECTED ••• "}
                </span>
              ) : (
                footerData.map((item, index) => (
                  <span
                    key={`original-${index}`}
                    className="inline-flex items-center"
                  >
                    <span className="mr-1 text-[11px]">{item.icon}</span>
                    <span className="mr-1 font-bold tracking-wider">
                      {item.label}:
                    </span>
                    <span className="mr-3">{item.value}</span>
                    {index < footerData.length - 1 && (
                      <span className="mx-4">•</span>
                    )}
                  </span>
                ))
              )}
              {glitchActive ? (
                <span className="flex gap-4">
                  {glitchedTexts.footer || "SYSTEM FAILURE DETECTED ••• "}
                </span>
              ) : (
                footerData.map((item, index) => (
                  <span
                    key={`clone-${index}`}
                    className="inline-flex items-center"
                  >
                    <span className="mr-1 text-[11px]">{item.icon}</span>
                    <span className="mr-1 font-bold tracking-wider">
                      {item.label}:
                    </span>
                    <span className="mr-3">{item.value}</span>
                    {index < footerData.length - 1 && (
                      <span className="mx-4">•</span>
                    )}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default WelcomeScreen;
