import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeScreen.css";
import Glitch from "../../Hooks/Glitch";
import MatrixRain from "../MatrixRain/MatrixRain";
import TypeWriter from "../../Hooks/Typewriter";
import GlitchOverlay from "./Modules/GlitchOverlay";
import TerminalTexts from "./Modules/TerminalTexts";
import ActionButtons from "./Modules/ActionButtons";
import FooterMarquee from "./Modules/FooterMarquee";
import { useGlitchEffect } from "./Modules/GlitchEffectLogic";
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
} from "react-icons/fa";

const WelcomeScreen = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const navigate = useNavigate();
  const subtitleRef = useRef(null);

  useEffect(() => {
    setShowSubtitle(false);
    const timer = setTimeout(() => {
      setShowSubtitle(true);
      setTimeout(() => setShowButtons(true), 1000);
    }, 7400);
    return () => clearTimeout(timer);
  }, []);

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

  const { glitchActive, glitchedTexts, triggerGlitch } = useGlitchEffect(
    baseTexts,
    footerData
  );

  const { displayedTerminal, displayedTitle, isTyping } = TypeWriter(
    [baseTexts.terminal, baseTexts.title],
    80,
    1500
  );

  const displayTexts = glitchActive
    ? glitchedTexts
    : {
        terminal: displayedTerminal,
        title: displayedTitle,
        subtitle: baseTexts.subtitle,
        footer: baseTexts.footer,
      };

  const handleAccess = (type) => {
    console.log(`[SYSTEM] Access: ${type.toUpperCase()}`);
    triggerGlitch();
    setTimeout(() => {
      if (type === "login") navigate("/auth");
    }, 500);
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

        <ActionButtons
          glitchActive={glitchActive}
          showButtons={showButtons}
          handleAccess={handleAccess}
        />

        <FooterMarquee
          glitchActive={glitchActive}
          glitchedFooter={glitchedTexts.footer}
          footerData={footerData}
        />
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
