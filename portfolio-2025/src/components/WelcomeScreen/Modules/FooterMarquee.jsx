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

const FooterMarquee = ({ glitchActive, glitchedFooter, footerData }) => {
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [threatsBlocked] = useState(Math.floor(Math.random() * 5));
  const [uptime] = useState((99.95 + Math.random() * 0.04).toFixed(2));
  const [systemMode, setSystemMode] = useState("OPERATIONAL");
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
      setCurrentDataIndex((prev) => (prev + 1) % cyberpunkFooterData.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, [cyberpunkFooterData.length]);

  const currentData = cyberpunkFooterData[currentDataIndex];
  const Icon = currentData.icon;

  if (glitchActive) {
    return (
      <div
        className={`absolute bottom-0 left-0 right-0 h-10 overflow-hidden z-50 border-t text-[10px] border-red-500 bg-black/90 shadow-[0_0_10px_#ff0000]`}
      >
        <div className="relative h-full w-full overflow-hidden font-montserrat flex items-center justify-center">
          <div
            className={`flex gap-4 items-center h-full text-red-500 font-bold [text-shadow:_0_0_5px_#ff0000] text-[10px]`}
            style={{
              animation: "marquee 60s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            <span className="flex gap-4">
              {glitchedFooter || "SYSTEM FAILURE DETECTED ••• "}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-black/98 backdrop-blur-xl z-50 overflow-hidden border-t border-cyan-400/20">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
      </div>
      <div className="relative h-full flex items-center justify-between px-6 z-20">
        <div className="flex items-center space-x-4">
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
        </div>
        <div className="flex-1 flex items-center justify-center space-x-6 max-w-md">
          <div className="flex items-center space-x-3">
            <div
              className={`relative p-2 rounded-full bg-${
                currentData.color === "green" ? "green" : "cyan"
              }-400/10 border border-${
                currentData.color === "green" ? "green" : "cyan"
              }-400/50`}
            >
              <Icon
                size={10}
                className={`${
                  currentData.color === "green"
                    ? "text-green-400"
                    : "text-cyan-400"
                }`}
              />
              <div
                className={`absolute -top-0.5 -right-0.5 w-2 h-2 bg-${
                  currentData.color === "green" ? "green" : "cyan"
                }-400 rounded-full animate-pulse`}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`${
                  currentData.color === "green"
                    ? "text-green-400/70"
                    : "text-cyan-400/70"
                } text-[9px] font-mono uppercase tracking-wider leading-tight py-1`}
              >
                [{currentData.sector}] {currentData.label}
              </span>
              <span
                className={`${
                  currentData.color === "green"
                    ? "text-green-400"
                    : "text-cyan-400"
                } text-[10px] font-mono font-medium tracking-wide leading-tight`}
              >
                {currentData.value}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {cyberpunkFooterData.map((_, index) => (
              <div key={index} className="relative">
                <div
                  className={`w-1 h-1 rounded-full transition-all duration-500 ${
                    index === currentDataIndex
                      ? "bg-cyan-400 shadow-lg shadow-cyan-400/50 scale-125"
                      : index < currentDataIndex
                      ? "bg-green-400/80"
                      : "bg-gray-600/50"
                  }`}
                />
                {index === currentDataIndex && (
                  <div className="absolute inset-0 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
        </div>
      </div>
      <style jsx>{`
        @keyframes scan {
          0%,
          20% {
            transform: translateY(0) scaleX(0);
            opacity: 0;
          }
          30% {
            transform: translateY(10px) scaleX(1);
            opacity: 1;
          }
          70% {
            transform: translateY(60px) scaleX(1);
            opacity: 1;
          }
          80%,
          100% {
            transform: translateY(80px) scaleX(0);
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

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </footer>
  );
};

export default FooterMarquee;
