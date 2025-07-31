import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt as Shield,
  FaUser as User,
  FaUserCheck as UserCheck,
  FaServer as Server,
  FaBolt as Zap,
  FaHdd as HardDrive,
  FaCalendarAlt as Calendar,
  FaChartLine as Activity,
  FaNetworkWired as Network,
} from "react-icons/fa";

const FooterMarquee = ({ glitchActive, glitchedFooter }) => {
  const hasAnimated = useRef(false);
  const [initialAnimationComplete, setInitialAnimationComplete] =
    useState(false);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [threatsBlocked] = useState(Math.floor(Math.random() * 5));
  const [uptime] = useState((99.95 + Math.random() * 0.04).toFixed(2));
  const [systemMode] = useState("OPERATIONAL");
  const [networkActivity, setNetworkActivity] = useState(0);
  const [cpuTemp, setCpuTemp] = useState(45);

  const cyberpunkFooterData = [
    {
      icon: Shield,
      label: "System Status",
      value: "OPERATIONAL",
      color: "green",
      sector: "A1",
      temp: 32,
    },
    {
      icon: User,
      label: "User",
      value: "miltonfruiz",
      color: "cyan",
      sector: "A2",
      temp: 28,
    },
    {
      icon: UserCheck,
      label: "Access",
      value: "ADMIN",
      color: "green",
      sector: "A3",
      temp: 30,
    },
    {
      icon: Server,
      label: "CPU",
      value: "12TH GEN i9 @ 5.2GHz",
      color: "cyan",
      sector: "B1",
      temp: 65,
    },
    {
      icon: Zap,
      label: "GPU",
      value: "RTX 4090",
      color: "green",
      sector: "B2",
      temp: 72,
    },
    {
      icon: Activity,
      label: "RAM",
      value: "64GB DDR5",
      color: "cyan",
      sector: "B3",
      temp: 42,
    },
    {
      icon: HardDrive,
      label: "Storage",
      value: "2TB NVMe",
      color: "green",
      sector: "C1",
      temp: 38,
    },
    {
      icon: Network,
      label: "Network",
      value: "10Gbps",
      color: "cyan",
      sector: "C2",
      temp: 35,
    },
    {
      icon: Shield,
      label: "Threats Blocked",
      value: threatsBlocked.toString(),
      color: "green",
      sector: "C3",
      temp: 28,
    },
    {
      icon: Calendar,
      label: "Last Backup",
      value: "TODAY",
      color: "cyan",
      sector: "D1",
      temp: 30,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNetworkActivity(Math.floor(Math.random() * 100));
      setCpuTemp(45 + Math.random() * 30);
    }, 1000);

    const dataTimer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentDataIndex((prev) => (prev + 1) % cyberpunkFooterData.length);
        setIsTransitioning(false);
      }, 600);
    }, 7000);

    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, [cyberpunkFooterData.length]);

  const currentData = cyberpunkFooterData[currentDataIndex];
  const Icon = currentData.icon;

  return (
    <motion.footer
      initial={hasAnimated.current ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 4.2, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 h-10 z-50 overflow-hidden"
      onAnimationComplete={() => (hasAnimated.current = true)}
    >
      {/* Glitch Mode */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 border-t border-red-500 bg-black/90 shadow-[0_0_10px_#ff0000]"
          >
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="text-red-500 font-bold [text-shadow:_0_0_5px_#ff0000] text-[10px] text-center">
                {glitchedFooter || "SYSTEM FAILURE DETECTED ••• "}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Normal Mode */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: glitchActive ? 0 : 1 }}
        transition={{ duration: 0.1 }}
        className="absolute inset-0 bg-black/98 backdrop-blur-xl border-t border-cyan-400/20"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
        </div>

        <motion.div
          initial={hasAnimated.current ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 1.2 }}
          className="relative h-full flex items-center justify-between px-6 z-20"
          onAnimationComplete={() => (hasAnimated.current = true)}
        >
          {/* Left Panel */}
          <motion.div
            initial={hasAnimated.current ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2, duration: 4.2 }}
            className="flex items-center space-x-4"
            onAnimationComplete={() => (hasAnimated.current = true)}
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60" />
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40" />
              </div>
              <div className="flex flex-col">
                <span className="text-green-400 text-[10px] font-mono font-medium leading-tight">
                  {systemMode}
                </span>
                <span className="text-green-400/60 text-[10px] font-mono leading-tight">
                  CPU: {cpuTemp.toFixed(0)}°C
                </span>
              </div>
            </div>
            <div className="h-8 w-px bg-cyan-400/30" />
            <div className="flex flex-col items-center">
              <span className="text-cyan-400/70 text-[10px] font-mono uppercase">
                THREATS
              </span>
              <span className="text-cyan-400 text-xs font-mono font-bold">
                {threatsBlocked}
              </span>
            </div>
          </motion.div>

          {/* HUD Center */}
          <motion.div className="overflow-hidden flex-1 flex items-center justify-center space-x-6 max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDataIndex}
                initial={
                  initialAnimationComplete
                    ? { opacity: 0, y: 10 }
                    : { opacity: 0 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={
                  initialAnimationComplete
                    ? { duration: 0.6, ease: "easeInOut" }
                    : {
                        delay: 4.2,
                        duration: 4.2,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                onAnimationComplete={() => setInitialAnimationComplete(true)}
                className="flex items-center space-x-3"
              >
                <motion.div
                  initial={initialAnimationComplete ? {} : { scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={
                    initialAnimationComplete
                      ? {}
                      : {
                          delay: 4.2,
                          duration: 4.2,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  className={`relative p-2 rounded-full bg-${currentData.color}-400/10 border border-${currentData.color}-400/50`}
                >
                  <Icon size={10} className={`text-${currentData.color}-400`} />
                  <div
                    className={`absolute -top-0.5 -right-0.5 w-2 h-2 bg-${currentData.color}-400 rounded-full animate-pulse`}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span
                    className={`text-${currentData.color}-400/70 text-[9px] font-mono uppercase tracking-wider leading-tight py-1`}
                  >
                    [{currentData.sector}] {currentData.label}
                  </span>
                  <span
                    className={`text-${currentData.color}-400 text-[10px] font-mono font-medium tracking-wide leading-tight`}
                  >
                    {currentData.value}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Points - Perfectamente sincronizados */}
            <motion.div
              className="flex items-center space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2, duration: 0.6 }}
            >
              {cyberpunkFooterData.map((_, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  animate={{
                    scale: index === currentDataIndex ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    times: [0, 0.5, 1],
                    repeatDelay: 7000,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay:
                      index === currentDataIndex && isTransitioning ? 0.3 : 0,
                  }}
                >
                  <div
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      index === currentDataIndex
                        ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                        : index < currentDataIndex
                        ? "bg-green-400/80"
                        : "bg-gray-600/50"
                    }`}
                  />
                  {index === currentDataIndex && (
                    <motion.div
                      className="absolute inset-0 w-1 h-1 bg-cyan-400 rounded-full"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatDelay: 7000 - 1.2,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Panel */}
          <motion.div
            initial={hasAnimated.current ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.2, duration: 4.2 }}
            className="flex items-center space-x-4"
            onAnimationComplete={() => (hasAnimated.current = true)}
          >
            <div className="flex flex-col items-center">
              <span className="text-cyan-400/70 text-[10px] font-mono uppercase">
                UPTIME
              </span>
              <span className="text-cyan-400 text-xs font-mono font-bold">
                {uptime}%
              </span>
            </div>
            <div className="h-8 w-px bg-cyan-400/30" />
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60" />
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40" />
              </div>
              <div className="flex flex-col">
                <span className="text-green-400 text-xs font-mono font-bold leading-tight">
                  {networkActivity}%
                </span>
                <span className="text-green-400/60 text-[10px] font-mono leading-tight">
                  NETWORK
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default FooterMarquee;
