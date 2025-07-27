import React, { useState, useEffect } from "react";
import {
  Cpu,
  Wifi,
  HardDrive,
  Activity,
  Terminal,
  Zap,
  Globe,
  Clock,
} from "lucide-react";

const CyberpunkFooter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemLoad, setSystemLoad] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [diskUsage, setDiskUsage] = useState(0);
  const [networkSpeed, setNetworkSpeed] = useState(0);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemLoad(Math.floor(Math.random() * 100));
      setMemoryUsage(Math.floor(60 + Math.random() * 35));
      setDiskUsage(Math.floor(45 + Math.random() * 25));
      setNetworkSpeed(Math.floor(50 + Math.random() * 950));
      setUptime((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const SystemMetric = ({ icon: Icon, label, value, unit, color = "cyan" }) => (
    <div className="flex items-center space-x-3 group">
      <div
        className={`p-1.5 rounded-md bg-${color}-400/10 border border-${color}-400/20 group-hover:border-${color}-400/40 transition-all duration-300`}
      >
        <Icon
          size={12}
          className={`text-${color}-400/80 group-hover:text-${color}-400 transition-colors`}
        />
      </div>
      <div className="flex flex-col">
        <span
          className={`text-${color}-400/70 text-[10px] font-mono uppercase tracking-wide`}
        >
          {label}
        </span>
        <span className={`text-${color}-400/90 text-xs font-mono tabular-nums`}>
          {value}
          {unit}
        </span>
      </div>
    </div>
  );

  const ProgressBar = ({ value, color = "cyan", width = "w-16" }) => (
    <div
      className={`${width} h-1.5 bg-gray-800/50 rounded-full overflow-hidden border border-${color}-400/20`}
    >
      <div
        className={`h-full bg-gradient-to-r from-${color}-400 to-green-400 rounded-full transition-all duration-3000 ease-out relative`}
        style={{ width: `${value}%` }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse`}
        ></div>
      </div>
    </div>
  );

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 backdrop-blur-xl border-t border-cyan-400/30 z-50">
      {/* Enhanced scan line with glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-lg shadow-cyan-400/30"
          style={{
            animation: "scan 6s infinite linear",
          }}
        ></div>
      </div>

      {/* Hexagonal pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative h-full flex items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Left Section - System Status */}
        <div className="flex items-center space-x-6">
          {/* Main Status */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-green-400/90 text-sm font-mono tracking-wide font-semibold">
                SYSTEM ACTIVE
              </span>
              <span className="text-green-400/50 text-[10px] font-mono">
                UPTIME {formatUptime(uptime)}
              </span>
            </div>
          </div>

          {/* System Metrics */}
          <div className="flex items-center space-x-4">
            <SystemMetric
              icon={Cpu}
              label="CPU"
              value={systemLoad}
              unit="%"
              color="cyan"
            />
            <SystemMetric
              icon={Activity}
              label="RAM"
              value={memoryUsage}
              unit="%"
              color="green"
            />
            <SystemMetric
              icon={HardDrive}
              label="DISK"
              value={diskUsage}
              unit="%"
              color="yellow"
            />
          </div>
        </div>

        {/* Center Section - Enhanced Brand */}
        <div className="text-center group">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Terminal
              size={14}
              className="text-cyan-400/80 group-hover:text-cyan-400 transition-colors"
            />
            <div className="text-cyan-400/90 text-sm font-mono tracking-[0.3em] uppercase font-bold">
              Portfolio_v2.5
            </div>
            <Zap
              size={12}
              className="text-green-400/80 group-hover:text-green-400 transition-colors animate-pulse"
            />
          </div>
          <div className="text-green-400/50 text-[10px] font-mono tracking-wider">
            MILTON_FRUIZ_SYSTEMS © 2025
          </div>

          {/* Progress indicators */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <ProgressBar value={systemLoad} width="w-8" />
            <ProgressBar value={memoryUsage} width="w-8" color="green" />
            <ProgressBar value={diskUsage} width="w-8" color="yellow" />
          </div>
        </div>

        {/* Right Section - Network & Time */}
        <div className="flex items-center space-x-6">
          {/* Network Info */}
          <div className="flex items-center space-x-4">
            <SystemMetric
              icon={Globe}
              label="NET"
              value={networkSpeed}
              unit="kb/s"
              color="green"
            />

            <div className="flex items-center space-x-2">
              <Wifi size={12} className="text-green-400/80" />
              <div className="flex space-x-0.5">
                {[1, 2, 3, 4, 5].map((bar, i) => (
                  <div
                    key={bar}
                    className="w-0.5 bg-green-400 rounded-full animate-pulse"
                    style={{
                      height: `${6 + i * 2}px`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: "2s",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Display */}
          <div className="flex items-center space-x-3">
            <Clock size={14} className="text-cyan-400/80" />
            <div className="text-right">
              <div className="text-cyan-400/90 text-lg font-mono tabular-nums tracking-wider font-bold">
                {formatTime(currentTime)}
              </div>
              <div className="text-green-400/60 text-[10px] font-mono uppercase tracking-wide">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "2-digit",
                  year: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced corner accents */}
      <div className="absolute top-0 left-6 w-8 h-px bg-gradient-to-r from-cyan-400/80 to-transparent shadow-sm shadow-cyan-400/50"></div>
      <div className="absolute top-0 right-6 w-8 h-px bg-gradient-to-l from-cyan-400/80 to-transparent shadow-sm shadow-cyan-400/50"></div>
      <div className="absolute bottom-0 left-6 w-12 h-px bg-gradient-to-r from-green-400/60 to-transparent"></div>
      <div className="absolute bottom-0 right-6 w-12 h-px bg-gradient-to-l from-green-400/60 to-transparent"></div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100vw);
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
