import React, { useState, useEffect } from "react";
import {
  FaShieldAlt as Shield,
  FaUser as User,
  FaUserCheck as UserCheck,
  FaServer as Server,
  FaBolt as Zap,
  FaHdd as HardDrive,
  FaCalendarAlt as Calendar,
  FaTerminal as Terminal,
  FaChartLine as Activity,
  FaNetworkWired as Network,
} from "react-icons/fa";

const CyberpunkFooter = () => {
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [threatsBlocked] = useState(Math.floor(Math.random() * 5));
  const [uptime] = useState((99.95 + Math.random() * 0.04).toFixed(2));
  const [systemMode, setSystemMode] = useState("OPERATIONAL");

  const [networkActivity, setNetworkActivity] = useState(0);
  const [cpuTemp, setCpuTemp] = useState(45);

  const footerData = [
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
      setCurrentDataIndex((prev) => (prev + 1) % footerData.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, [footerData.length]);

  const currentData = footerData[currentDataIndex];
  const Icon = currentData.icon;

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-gray-900/95 to-black/90 backdrop-blur-2xl z-50 overflow-hidden border-t border-cyan-400/20">
      {/* Layer 1: Background Elements */}
      <div className="absolute inset-0">
        {/* Hexagonal Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322d3ee' fill-opacity='1'%3E%3Cpath d='M30 15l12.99 7.5v15L30 45l-12.99-7.5v-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Layer 2: HUD Framework */}
      <div className="absolute inset-0 z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 160"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="hudGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Top border line */}
          <path
            d="M 0 20 L 200 20 L 220 10 L 350 10 L 370 20 L 830 20 L 850 10 L 980 10 L 1000 20 L 1200 20"
            stroke="#22d3ee"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
            filter="url(#glow)"
          />

          {/* Data Flow Channels */}
          <path
            d="M 220 80 L 580 80"
            stroke="#4ade80"
            strokeWidth="2"
            fill="none"
            opacity={networkActivity / 150}
            strokeDasharray="6,3"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;9"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M 620 80 L 980 80"
            stroke="#4ade80"
            strokeWidth="2"
            fill="none"
            opacity={networkActivity / 150}
            strokeDasharray="6,3"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;9"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>

          {/* Corner decorations */}
          <g stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.6">
            <path d="M 240 25 L 270 25 L 270 35 M 270 25 L 270 55" />
            <path d="M 930 25 L 960 25 L 960 35 M 960 25 L 960 55" />
          </g>
        </svg>
      </div>

      {/* Layer 3: Content */}
      <div className="relative h-full flex items-center justify-between px-8 z-20">
        {/* Left System Status Panel */}
        <div className="w-48 flex flex-col items-center justify-center space-y-2 py-4">
          <div className="text-cyan-400/80 text-xs font-mono uppercase tracking-wider mb-1">
            SYSTEM STATUS
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60" />
              <div className="absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-40" />
              <div className="absolute inset-1 w-4 h-4 bg-white/90 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-green-400 text-sm font-mono tracking-wide font-bold">
                {systemMode}
              </span>
              <span className="text-green-400/60 text-xs font-mono">
                CPU: {cpuTemp.toFixed(0)}°C
              </span>
            </div>
          </div>

          <div className="text-cyan-400/50 text-[10px] font-mono mt-1">
            THREAT LEVEL: LOW
          </div>

          <div className="text-cyan-400/50 text-[10px] font-mono">
            BLOCKS: {threatsBlocked}
          </div>
        </div>

        {/* Central HUD Interface */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 max-w-lg mx-8">
          {/* Main Data Display */}
          <div className="flex items-center space-x-8">
            <div
              className={`relative p-4 rounded-full bg-${
                currentData.color === "green" ? "green" : "cyan"
              }-400/10 border-2 border-${
                currentData.color === "green" ? "green" : "cyan"
              }-400/50`}
            >
              <Icon
                size={24}
                className={`${
                  currentData.color === "green"
                    ? "text-green-400"
                    : "text-cyan-400"
                }`}
              />
              <div
                className={`absolute inset-0 rounded-full border-2 border-${
                  currentData.color === "green" ? "green" : "cyan"
                }-400/30 animate-ping`}
              />
              <div
                className={`absolute -top-1 -right-1 w-3 h-3 bg-${
                  currentData.color === "green" ? "green" : "cyan"
                }-400 rounded-full animate-pulse`}
              />
            </div>

            <div className="flex flex-col text-center">
              <span
                className={`${
                  currentData.color === "green"
                    ? "text-green-400/70"
                    : "text-cyan-400/70"
                } text-xs font-mono uppercase tracking-wider`}
              >
                [{currentData.sector}] {currentData.label}
              </span>
              <span
                className={`${
                  currentData.color === "green"
                    ? "text-green-400"
                    : "text-cyan-400"
                } text-xl font-mono font-bold tracking-wide mt-1`}
              >
                {currentData.value}
              </span>
              <span
                className={`${
                  currentData.color === "green"
                    ? "text-green-400/50"
                    : "text-cyan-400/50"
                } text-[10px] font-mono mt-1`}
              >
                TEMP: {currentData.temp}°C | NOMINAL
              </span>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center space-x-3 mt-6">
            {footerData.map((_, index) => (
              <div key={index} className="relative">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentDataIndex
                      ? "bg-cyan-400 shadow-lg shadow-cyan-400/50 scale-125"
                      : index < currentDataIndex
                      ? "bg-green-400/80"
                      : "bg-gray-600/50"
                  }`}
                />
                {index === currentDataIndex && (
                  <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-60" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Network Panel */}
        <div className="w-48 flex flex-col items-center justify-center space-y-2 py-4">
          <div className="text-cyan-400/80 text-xs font-mono uppercase tracking-wider mb-1">
            NETWORK STATUS
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60" />
              <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping opacity-40" />
            </div>
            <div className="flex flex-col">
              <div className="text-green-400 text-sm font-mono font-bold">
                {networkActivity}%
              </div>
              <div className="text-green-400/60 text-xs font-mono">
                ACTIVITY
              </div>
            </div>
          </div>

          <div className="text-cyan-400/50 text-[10px] font-mono mt-1">
            UPTIME: {uptime}%
          </div>

          <div className="text-cyan-400/50 text-[10px] font-mono">
            LATENCY: 12ms
          </div>
        </div>
      </div>

      {/* Layer 4: Scanning Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/60 to-transparent opacity-80"
          style={{
            animation: "scan 8s infinite ease-in-out",
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          style={{
            animation: "secondaryScan 6s infinite linear reverse",
          }}
        />
      </div>

      {/* Layer 5: Holographic Interference */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/3 to-transparent"
          style={{
            animation: "glitch 12s infinite ease-in-out",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes scan {
          0%,
          20% {
            transform: translateY(0) scaleX(0);
            opacity: 0;
          }
          30% {
            transform: translateY(20px) scaleX(1);
            opacity: 1;
          }
          70% {
            transform: translateY(120px) scaleX(1);
            opacity: 1;
          }
          80%,
          100% {
            transform: translateY(160px) scaleX(0);
            opacity: 0;
          }
        }

        @keyframes secondaryScan {
          0% {
            transform: translateY(-10px);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(170px);
            opacity: 0;
          }
        }

        @keyframes glitch {
          0%,
          94% {
            transform: translateX(0);
            opacity: 0;
          }
          95% {
            transform: translateX(-1px);
            opacity: 0.1;
          }
          96% {
            transform: translateX(1px);
            opacity: 0.2;
          }
          97% {
            transform: translateX(-0.5px);
            opacity: 0.1;
          }
          98%,
          100% {
            transform: translateX(0);
            opacity: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default CyberpunkFooter;
