import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ParticlesBackground from "./Modules/ParticlesBackground";
import HexagonGrid from "./Modules/HexagonGrid";
import SystemHeader from "./Modules/SystemHeader";
import ProgressBar from "./Modules/ProgressBar";
import ModuleGrid from "./Modules/ModuleGrid";
import { systemModules } from "./Modules/systemModulesConfig";

const SystemLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [activeModules, setActiveModules] = useState([]);
  const [finalStage, setFinalStage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(
    "Initializing core systems..."
  );

  useEffect(() => {
    const loadProgress = { value: 0 };
    const masterTimeline = gsap.timeline();

    const activateModule = (moduleIndex, progressStart, progressEnd) => {
      const module = systemModules[moduleIndex];
      const steps = module.messages.length;
      const stepDuration = (progressEnd - progressStart) / steps;

      for (let i = 0; i < steps; i++) {
        masterTimeline.to(
          loadProgress,
          {
            value: progressStart + (i + 1) * stepDuration,
            duration: (stepDuration / 100) * 25,
            onUpdate: () => setProgress(loadProgress.value),
            onStart: () => {
              setCurrentMessage(module.messages[i]);
              if (i === steps - 1) {
                setActiveModules((prev) => [...prev, moduleIndex]);
              }
            },
          },
          `>+=${i === 0 ? 0 : 0.2}`
        );
      }
    };

    const moduleCount = systemModules.length;
    const moduleProgressSegment = 100 / moduleCount;

    systemModules.forEach((_, i) => {
      const start = i * moduleProgressSegment;
      const end = (i + 1) * moduleProgressSegment;
      activateModule(i, start, end);
    });

    masterTimeline.to(loadProgress, {
      value: 100,
      duration: 4,
      onUpdate: () => setProgress(loadProgress.value),
      onComplete: () => {
        setFinalStage(true);
        setCurrentMessage("Initializing system...");
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            delay: 1,
            onComplete: onComplete,
          });
        }, 4000);
      },
    });

    return () => masterTimeline.kill();
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center crt-effect"
      >
        <ParticlesBackground
          key={finalStage ? (progress >= 100 ? "neon" : "cian") : "off"}
          progress={progress}
          finalStage={finalStage}
        />

        <HexagonGrid />

        <div className="relative z-10 w-full max-w-3xl px-6">
          <SystemHeader
            finalStage={finalStage}
            message={currentMessage}
            progress={progress}
          />

          <ProgressBar progress={progress} finalStage={finalStage} />
          <ModuleGrid modules={systemModules} activeModules={activeModules} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-center text-xs text-cyber-secondary font-quakerhack"
          >
            © CYBERNETIC SYSTEMS • ALL RIGHTS RESERVED
          </motion.p>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="scanlines" />
          {finalStage && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="absolute bottom-10 w-full text-center text-green-500 font-hacker text-xl glitch"
            >
              SYSTEM READY
            </motion.h2>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SystemLoader;
