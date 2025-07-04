import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  FaServer,
  FaShieldAlt,
  FaBolt,
  FaMemory,
  FaNetworkWired,
  FaDatabase,
  FaMicrochip,
} from "react-icons/fa";

const SystemLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const binaryElements = useRef([]);
  const hexagonRefs = useRef([]);
  const [activeModules, setActiveModules] = useState([]);
  const [finalStage, setFinalStage] = useState(false);

  const systemModules = [
    {
      icon: <FaShieldAlt />,
      label: "SECURITY",
      color: "text-green-500",
      messages: [
        "Loading security protocols...",
        "Encrypting data channels...",
        "Activating firewalls...",
        "Security systems online",
      ],
    },
    {
      icon: <FaBolt />,
      label: "POWER",
      color: "text-yellow-500",
      messages: [
        "Initializing power systems...",
        "Calibrating energy flow...",
        "Stabilizing reactors...",
        "Power systems nominal",
      ],
    },
    {
      icon: <FaMemory />,
      label: "MEMORY",
      color: "text-blue-500",
      messages: [
        "Allocating memory...",
        "Optimizing neural cache...",
        "Testing RAM modules...",
        "Memory systems ready",
      ],
    },
    {
      icon: <FaNetworkWired />,
      label: "NETWORK",
      color: "text-purple-500",
      messages: [
        "Establishing connections...",
        "Synchronizing nodes...",
        "Testing bandwidth...",
        "Network operational",
      ],
    },
    {
      icon: <FaDatabase />,
      label: "DATABASE",
      color: "text-cyan-500",
      messages: [
        "Accessing data banks...",
        "Verifying integrity...",
        "Indexing records...",
        "Databases connected",
      ],
    },
    {
      icon: <FaMicrochip />,
      label: "PROCESSOR",
      color: "text-red-500",
      messages: [
        "Booting processors...",
        "Calibrating cores...",
        "Testing calculations...",
        "CPU online",
      ],
    },
  ];

  useEffect(() => {
    binaryElements.current.forEach((el, i) => {
      gsap.to(el, {
        opacity: [0.2, 0.8],
        y: -20,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
        ease: "power1.inOut",
      });
    });

    hexagonRefs.current.forEach((hex, i) => {
      gsap.to(hex, {
        rotation: 360,
        duration: 15 + i * 5,
        repeat: -1,
        ease: "none",
      });
    });

    const loadProgress = { value: 0 };
    const masterTimeline = gsap.timeline();
    const messageElement = document.getElementById("system-message");

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
            onUpdate: () => updateProgress(loadProgress.value),
            onStart: () => {
              messageElement.textContent = module.messages[i];
              gsap.fromTo(
                messageElement,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
              );

              if (i === steps - 1) {
                setActiveModules((prev) => [...prev, moduleIndex]);
                gsap.to(`.module-${moduleIndex}`, {
                  color: module.color,
                  duration: 0.5,
                });
                gsap.to(`.module-icon-${moduleIndex}`, {
                  color: module.color,
                  scale: 1.1,
                  duration: 0.3,
                  yoyo: true,
                  repeat: 1,
                });
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
      onUpdate: () => updateProgress(loadProgress.value),
      onComplete: () => {
        setFinalStage(true);
        showFinalMessage();
      },
    });
    return () => masterTimeline.kill();
  }, [onComplete]);
  const updateProgress = (value) => {
    document.getElementById("progress-bar").style.width = `${value}%`;
    document.getElementById("progress-text").textContent = `${Math.floor(
      value
    )}%`;
  };
  const showFinalMessage = () => {
    const messageElement = document.getElementById("system-message");
    const progressText = document.getElementById("progress-text");
    gsap.to(progressText, {
      textContent: "100%",
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(messageElement, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        messageElement.textContent = "Initializing system...";
        messageElement.className =
          "text-[10px] text-green-500 font-mono mt-2 font-bold tracking-wider";
        gsap.to(messageElement, {
          opacity: 1,
          duration: 0.5,
        });
      },
    });
    gsap.to("#progress-bar", {
      boxShadow: "0 0 15px 3px rgba(0, 255, 100, 0.8)",
      duration: 0.5,
      yoyo: true,
      repeat: 3,
    });
    gsap.to(".module-icon", {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      stagger: 0.1,
    });
    setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        onComplete: onComplete,
      });
    }, 2000);
  };

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
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (binaryElements.current[i] = el)}
              className="absolute text-xs text-cyber-primary opacity-20 font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {Math.random() > 0.5 ? "1" : "0"}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {[200, 150, 100].map((size, i) => (
            <div
              key={i}
              ref={(el) => (hexagonRefs.current[i] = el)}
              className="absolute border-2 border-cyber-primary opacity-20"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            />
          ))}
        </div>
        <div className="relative z-10 w-full max-w-3xl px-6">
          <div className="flex items-center mb-6 space-x-4">
            <FaServer
              className={`text-3xl text-cyber-accent ${
                finalStage ? "animate-pulse-fast" : "animate-pulse"
              }`}
            />
            <div>
              <h1 className="text-xs font-bold text-cyber-primary tracking-wider font-hacker">
                CYBER_SYSTEM v4.2.5
              </h1>
              <p
                id="system-message"
                className="text-[10px] text-cyber-secondary font-mono mt-2"
              >
                Initializing core systems...
              </p>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-[11px] text-cyber-primary font-mono">
                BOOT_SEQUENCE
              </span>
              <span
                id="progress-text"
                className="text-xs text-cyber-accent font-mono"
              >
                0%
              </span>
            </div>
            <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
              <motion.div
                id="progress-bar"
                initial={{ width: 0 }}
                className="h-full bg-gradient-to-r from-cyber-primary to-cyber-accent"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            {systemModules.map((module, i) => (
              <motion.div
                key={i}
                className={`module-${i} flex flex-col items-center p-2 ${
                  activeModules.includes(i)
                    ? `${module.color} bg-black/10`
                    : "text-gray-500"
                }`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className={`module-icon module-icon-${i} text-xl mb-1`}>
                  {module.icon}
                </span>
                <span className="text-[8px] font-montserrat text-center">
                  {module.label}
                </span>
              </motion.div>
            ))}
          </div>
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
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent animate-pulse-fast" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,255,100,0.05)_100%)]" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SystemLoader;
