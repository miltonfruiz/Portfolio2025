import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ParticlesBackground from "./Modules/ParticlesBackground";
import ReactorCore from "./Modules/Reactor/ReactorCore";
import SystemHeader from "./Modules/SystemHeader";
import ProgressBar from "./Modules/ProgressBar";
import ModuleGrid from "./Modules/ModuleGrid";
import CyberFooter from "./Modules/CyberFooter";
import { systemModules } from "./Modules/systemModulesConfig";

const SystemLoader = ({ onComplete }) => {
  const [animationsReady, setAnimationsReady] = useState(false);
  useEffect(() => {
    const handleReady = () => setAnimationsReady(true);
    window.addEventListener("animationsReady", handleReady);
    return () => window.removeEventListener("animationsReady", handleReady);
  }, []);

  const containerRef = useRef(null);
  const [activeModules, setActiveModules] = useState([]);
  const [finalStage, setFinalStage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(
    "Initializing core systems..."
  );

  useEffect(() => {
    if (!animationsReady) return;

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
            duration: 0.6,
            ease: "power3.out",
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
      duration: 3.26,
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
        }, 10700);
      },
    });

    return () => masterTimeline.kill();
  }, [animationsReady, onComplete]);

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
        <ReactorCore progress={progress} finalStage={finalStage} />
        <div className="relative z-10 w-full max-w-3xl px-6">
          <SystemHeader
            finalStage={finalStage}
            message={currentMessage}
            progress={progress}
          />
          <ProgressBar progress={progress} finalStage={finalStage} />
          <ModuleGrid modules={systemModules} activeModules={activeModules} />
        </div>
        <CyberFooter finalStage={finalStage} />
      </div>
    </motion.div>
  );
};

export default SystemLoader;
