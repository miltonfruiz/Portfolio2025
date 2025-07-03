import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  FaMicrochip,
  FaShieldAlt,
  FaServer,
  FaBug,
  FaLock,
  FaWifi,
  FaSkullCrossbones,
} from "react-icons/fa";
import MatrixRain from "../MatrixRain/MatrixRain";
import "./SystemLoader.css";

const SystemLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showExtras, setShowExtras] = useState(false);
  const [statusText, setStatusText] = useState("System Booting...");
  const [hasError, setHasError] = useState(false);

  const [logs, setLogs] = useState([]);
  const logsContainerRef = useRef(null);

  // lista de comandos
  const fakeLogs = [
    "[OK] Checking system integrity...",
    "sudo reboot --force",
    "[INFO] Loading kernel modules...",
    "ls -la /boot/",
    "[WARN] Network delay detected, retrying...",
    "[OK] Kernel modules initialized",
    "ping 8.8.8.8 -c 3",
    "[OK] Memory check passed",
    "[INFO] Applying security patch 3.14.159",
    "cat /proc/cpuinfo",
    "[OK] Secure boot validated",
    "[INFO] Establishing secure session",
    "netstat -an | grep 443",
    "[OK] All systems green",
  ];

  // typing effect
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let typingInterval;

    const typeNext = () => {
      if (lineIndex >= fakeLogs.length) return;

      typingInterval = setInterval(() => {
        setLogs((prev) => {
          const currentLine = prev[lineIndex] || "";
          const currentFake = fakeLogs[lineIndex] || "";
          if (charIndex >= currentFake.length) {
            return prev;
          }
          const nextLine = currentLine + currentFake[charIndex];
          const newLogs = [...prev];
          newLogs[lineIndex] = nextLine;
          return newLogs;
        });

        charIndex++;
        if (charIndex >= (fakeLogs[lineIndex] || "").length) {
          clearInterval(typingInterval);
          lineIndex++;
          charIndex = 0;
          setTimeout(typeNext, 500);
        }
      }, 50);
    };

    typeNext();

    return () => clearInterval(typingInterval);
  }, []);
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop =
        logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev > 40 && prev < 60 && Math.random() > 0.95) {
          setHasError(true);
          setStatusText("SYSTEM ERROR - RETRYING...");
          setTimeout(() => {
            setHasError(false);
            setStatusText("Recovering Modules...");
          }, 1500);
          return prev;
        }
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          setProgress(100);
          setStatusText("System Ready");
          setTimeout(() => {
            setShowExtras(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 6000);
          }, 1000);
          return 100;
        } else {
          if (next > 20 && next <= 40) setStatusText("Verifying BIOS...");
          if (next > 60 && next <= 80) setStatusText("Loading Services...");
          if (next > 80 && next < 100) setStatusText("Initializing Drivers...");
          return next;
        }
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (showExtras) {
      gsap.from(".cyber-element", {
        opacity: 0,
        y: 20,
        stagger: 0.4,
        duration: 3,
        ease: "power3.out",
      });
    }
  }, [showExtras]);

  const getDynamicGradient = () => {
    if (progress < 30) return "linear-gradient(90deg, #00ffcc, #00ffee)";
    if (progress < 60) return "linear-gradient(90deg, #ffff00, #ffaa00)";
    if (progress < 90) return "linear-gradient(90deg, #ff9900, #ff3300)";
    return "linear-gradient(90deg, #00ffff, #00ffcc)";
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 font-mono text-cyan-300">
      <MatrixRain speed={10} glitchActive={showExtras} />

      {!showExtras && (
        <>
          <div className="relative w-2/3 max-w-md border border-cyan-500 rounded shadow-md overflow-hidden mt-6 z-50 glitch-container">
            <motion.div
              className={`h-4 glitch-bar ${hasError ? "glitch-error" : ""}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{
                background: getDynamicGradient(),
              }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
            <div className="absolute inset-0 flex justify-between items-center px-2 text-xs tracking-widest">
              <span className={hasError ? "text-red-500 animate-pulse" : ""}>
                {statusText}
              </span>
              <span>{progress}%</span>
            </div>
          </div>
          <div
            ref={logsContainerRef}
            className="mt-4 w-2/3 max-w-md h-64 bg-black border border-cyan-500 rounded p-2 text-green-400 text-xs overflow-hidden shadow-inner z-50"
          >
            {logs.map((line, idx) => (
              <div key={idx} className="whitespace-nowrap">
                {line}
              </div>
            ))}
          </div>
        </>
      )}

      {showExtras && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
          <motion.div
            className="cyber-element flex gap-4 text-3xl text-cyan-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 3 }}
          >
            <FaMicrochip className="animate-spin-slow" />
            <FaShieldAlt className="animate-pulse" />
            <FaServer className="animate-bounce" />
            <FaBug className="animate-ping" />
            <FaLock className="animate-pulse" />
            <FaWifi className="animate-ping" />
            <FaSkullCrossbones className="text-red-500 animate-pulse" />
          </motion.div>
          <motion.p
            className="cyber-element text-green-400 text-lg tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 3 }}
          >
            SYSTEM INITIALIZED
          </motion.p>
          <motion.p
            className="cyber-element text-cyan-400 text-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 3 }}
          >
            Standby for Launch...
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default SystemLoader;
