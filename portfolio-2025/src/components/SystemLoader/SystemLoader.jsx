import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "./SystemLoader.css";
const SystemLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing system...");
  const loaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const digitRefs = useRef([]);
  const systemMessages = [
    "Booting kernel...",
    "Loading modules...",
    "Checking subsystems...",
    "Initializing UI...",
    "Verifying security...",
    "Establishing connection...",
    "Finalizing configuration...",
  ];
  useEffect(() => {
    gsap.from(loaderRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
    digitRefs.current.forEach((digit, i) => {
      gsap.from(digit, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        delay: i * 0.1,
        ease: "power2.out",
      });
    });
    const loadInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress < 20) setStatusText(systemMessages[0]);
        else if (newProgress < 35) setStatusText(systemMessages[1]);
        else if (newProgress < 50) setStatusText(systemMessages[2]);
        else if (newProgress < 65) setStatusText(systemMessages[3]);
        else if (newProgress < 80) setStatusText(systemMessages[4]);
        else if (newProgress < 95) setStatusText(systemMessages[5]);
        else setStatusText(systemMessages[6]);
        if (newProgress >= 100) {
          clearInterval(loadInterval);
          setTimeout(() => {
            gsap.to(loaderRef.current, {
              opacity: 0,
              y: -50,
              duration: 0.8,
              ease: "power3.in",
              onComplete: () => onComplete(),
            });
          }, 800);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    return () => clearInterval(loadInterval);
  }, [onComplete]);
  useEffect(() => {
    gsap.to(progressBarRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power2.out",
      backgroundColor:
        progress > 90
          ? "#00ff00"
          : progress > 70
          ? "#00ffff"
          : progress > 50
          ? "#0099ff"
          : "#ff00ff",
      boxShadow:
        progress > 90
          ? "0 0 10px #00ff00"
          : progress > 70
          ? "0 0 10px #00ffff"
          : progress > 50
          ? "0 0 10px #0099ff"
          : "0 0 10px #ff00ff",
    });
  }, [progress]);
  return (
    <motion.div
      ref={loaderRef}
      className="system-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loader-container">
        <h2 className="loader-title">SYSTEM BOOT SEQUENCE</h2>
        <div className="progress-container">
          <div className="progress-background">
            <div ref={progressBarRef} className="progress-bar" />
          </div>
          <div className="progress-digits">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                ref={(el) => (digitRefs.current[i] = el)}
                className="digit"
              >
                {Math.floor(progress).toString().padStart(3, "0")[i]}
              </span>
            ))}
            <span className="percent-symbol">%</span>
          </div>
        </div>
        <p className="status-text">{statusText}</p>
        <div className="scanlines" />
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />
      </div>
    </motion.div>
  );
};

export default SystemLoader;
