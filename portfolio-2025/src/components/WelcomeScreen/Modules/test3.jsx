import React, { useState, useEffect } from "react";
import {
  FaShieldAlt,
  FaUser,
  FaUserCheck,
  FaServer,
  FaBolt,
  FaHeartbeat,
  FaHdd,
  FaNetworkWired,
  FaCalendarAlt,
  FaClock,
  FaTerminal,
} from "react-icons/fa";

const CyberpunkFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [threatsBlocked] = useState(Math.floor(Math.random() * 5));
  const [uptime] = useState((99.95 + Math.random() * 0.04).toFixed(2));

  const footerData = [
    {
      icon: FaShieldAlt,
      label: "System Status",
      value: "OPERATIONAL",
      color: "green",
      sector: "A1",
    },
    {
      icon: FaUser,
      label: "User",
      value: "miltonfruiz",
      color: "cyan",
      sector: "A2",
    },
    {
      icon: FaUserCheck,
      label: "Access",
      value: "ADMIN",
      color: "green",
      sector: "A3",
    },
    {
      icon: FaServer,
      label: "CPU",
      value: "12TH GEN i9 @ 5.2GHz",
      color: "cyan",
      sector: "B1",
    },
    {
      icon: FaBolt,
      label: "GPU",
      value: "RTX 4090",
      color: "green",
      sector: "B2",
    },
    {
      icon: FaHeartbeat,
      label: "RAM",
      value: "64GB DDR5",
      color: "cyan",
      sector: "B3",
    },
    {
      icon: FaHdd,
      label: "Storage",
      value: "2TB NVMe",
      color: "green",
      sector: "C1",
    },
    {
      icon: FaNetworkWired,
      label: "Network",
      value: "10Gbps",
      color: "cyan",
      sector: "C2",
    },
    {
      icon: FaShieldAlt,
      label: "Threats Blocked",
      value: threatsBlocked.toString(),
      color: "green",
      sector: "C3",
    },
    {
      icon: FaCalendarAlt,
      label: "Last Backup",
      value: "TODAY",
      color: "cyan",
      sector: "D1",
    },
    {
      icon: FaClock,
      label: "Uptime",
      value: `${uptime}%`,
      color: "green",
      sector: "D2",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const dataTimer = setInterval(
      () => setCurrentDataIndex((prev) => (prev + 1) % footerData.length),
      4000
    );
    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, [footerData.length]);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const currentData = footerData[currentDataIndex];
  const Icon = currentData.icon;

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-black/98 backdrop-blur-xl z-50 overflow-hidden">
      {/* SVG HUD background omitted for brevity, kept as in your original code */}

      {/* Content Layer */}
      <div className="relative h-full flex items-center justify-between px-16 max-w-7xl mx-auto">
        {/* 🡄 Left Panel */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-cyan-400/60 text-xs font-mono uppercase tracking-wider">
            SAT-01
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60"></div>
              <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-60"></div>
              <div className="absolute inset-1 w-2 h-2 bg-white/90 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-green-400/90 text-sm font-mono tracking-wide font-bold">
                ONLINE
              </span>
              <span className="text-green-400/50 text-xs font-mono">
                SECURE
              </span>
            </div>
          </div>
        </div>

        {/* 🡄 Central HUD */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-full bg-${currentData.color}-400/10 border-2 border-${currentData.color}-400/40 relative`}
                >
                  <Icon
                    size={20}
                    className={`text-${currentData.color}-400/90`}
                  />
                  <div
                    className={`absolute inset-0 rounded-full border-2 border-${currentData.color}-400/20 animate-ping`}
                  ></div>
                </div>
                <div className="flex flex-col text-center">
                  <span
                    className={`text-${currentData.color}-400/70 text-xs font-mono uppercase tracking-wider`}
                  >
                    [{currentData.sector}] {currentData.label}
                  </span>
                  <span
                    className={`text-${currentData.color}-400/95 text-lg font-mono font-bold tracking-wide`}
                  >
                    {currentData.value}
                  </span>
                </div>
              </div>
              {/* Progress dots */}
              <div className="flex items-center space-x-2">
                {footerData.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      idx === currentDataIndex
                        ? "bg-cyan-400 shadow-lg shadow-cyan-400/50 scale-125"
                        : idx < currentDataIndex
                        ? "bg-green-400/60"
                        : "bg-gray-700/50"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Brand */}
          </div>
        </div>

        {/* 🡄 Right Panel */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-cyan-400/60 text-xs font-mono uppercase tracking-wider">
            Sector-02
          </div>
          <div className="flex items-center space-x-3">
            <FaClock size={16} className="text-cyan-400/80" />
            <div className="text-right">
              <div className="text-cyan-400/95 text-lg font-mono tabular-nums tracking-wider font-bold">
                {formatTime(currentTime)}
              </div>
              <div className="text-cyan-400/60 text-xs font-mono uppercase">
                {currentTime.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
          style={{
            animation: "hudScan 8s infinite linear",
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes hudScan {
          0% {
            transform: translateX(-100%) scaleX(0);
            opacity: 0;
          }
          10% {
            transform: translateX(-50%) scaleX(1);
            opacity: 1;
          }
          90% {
            transform: translateX(50%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scaleX(0);
            opacity: 0;
          }
        }
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </footer>
  );
};

export default CyberpunkFooter;
