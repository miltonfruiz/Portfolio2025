import React, { useState, useEffect } from "react";

const CyberpunkFooter = () => {
  const [time, setTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    security: 100,
  });
  const [glitchText, setGlitchText] = useState("NEURAL_LINK");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate system stats
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 40) + 30,
        network: Math.floor(Math.random() * 50) + 40,
        security: Math.floor(Math.random() * 10) + 95,
      });
    }, 2000);
    return () => clearInterval(statsTimer);
  }, []);

  // Glitch effect for text
  useEffect(() => {
    const glitchTimer = setInterval(() => {
      const texts = [
        "NEURAL_LINK",
        "CYBR_NET_",
        "SYS_ONLINE",
        "QUANTUM_OS",
        "MATRIX_CON",
      ];
      setGlitchText(texts[Math.floor(Math.random() * texts.length)]);
    }, 3000);
    return () => clearInterval(glitchTimer);
  }, []);

  const ProgressBar = ({ value, color = "#00b8ff", label }) => {
    return (
      <div className="group flex flex-col items-center space-y-3">
        {/* Minimalist label */}
        <span className="text-xs text-cyan-400 font-mono tracking-[0.2em] uppercase">
          {label}
        </span>

        {/* Epic circular/radial progress */}
        <div className="relative w-16 h-16">
          {/* Background circle */}
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(0, 184, 255, 0.1)"
              strokeWidth="2"
              className="drop-shadow-lg"
            />
            {/* Progress circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - value / 100)}`}
              className="transition-all duration-1000 ease-out drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 0 8px ${color}80)`,
              }}
            />
          </svg>

          {/* Center glow effect */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
            style={{ backgroundColor: color }}
          ></div>

          {/* Value display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-lg font-mono font-bold tracking-wider"
              style={{ color: color, textShadow: `0 0 10px ${color}60` }}
            >
              {value}
            </span>
          </div>

          {/* Corner accents */}
          <div
            className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 opacity-60"
            style={{ borderColor: color }}
          ></div>
          <div
            className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 opacity-60"
            style={{ borderColor: color }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 opacity-60"
            style={{ borderColor: color }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 opacity-60"
            style={{ borderColor: color }}
          ></div>
        </div>

        {/* Status dot - simple but effective */}
        <div className="flex items-center justify-center">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              value > 80
                ? "animate-pulse bg-red-400 shadow-lg shadow-red-400/60"
                : value > 60
                ? "bg-yellow-400 shadow-lg shadow-yellow-400/60"
                : "bg-green-400 shadow-lg shadow-green-400/60"
            }`}
          ></div>
        </div>
      </div>
    );
  };

  const HexGrid = () => (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="hexgrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points="10,1 19,6 19,14 10,19 1,14 1,6"
              fill="none"
              stroke="#00b8ff"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexgrid)" />
      </svg>
    </div>
  );

  return (
    <footer className="relative bg-black border-t-2 border-cyan-400 shadow-2xl overflow-hidden">
      {/* Hex grid background */}
      <HexGrid />

      {/* Animated top border */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>

      {/* Main content */}
      <div className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Left section - System Status */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-green-400 font-mono text-sm tracking-wider">
                  ONLINE
                </span>
              </div>
              <div className="h-8 w-px bg-cyan-800"></div>
              <div className="text-cyan-300 font-mono text-xs">
                <div>SYS: v2.077.3</div>
                <div className="text-cyan-500">ID: NX-7841</div>
              </div>
            </div>

            {/* Center-left - System stats */}
            <div className="flex justify-center space-x-12">
              <ProgressBar
                value={systemStats.cpu}
                color="#ff4757"
                label="CPU"
              />
              <ProgressBar
                value={systemStats.memory}
                color="#ffa502"
                label="RAM"
              />
              <ProgressBar
                value={systemStats.network}
                color="#00b8ff"
                label="NET"
              />
              <ProgressBar
                value={systemStats.security}
                color="#2ed573"
                label="SEC"
              />
            </div>

            {/* Center-right - Glitch text and data */}
            <div className="text-center">
              <div className="text-cyan-400 font-mono text-lg tracking-widest mb-1 relative">
                <span className="animate-pulse">{glitchText}</span>
                <div className="absolute inset-0 text-red-500 opacity-20 animate-ping">
                  {glitchText}
                </div>
              </div>
              <div className="text-gray-500 font-mono text-xs">
                <span>
                  UPTIME: {Math.floor(Date.now() / 1000 / 60 / 60)} HRS
                </span>
              </div>
            </div>

            {/* Right section - Time and location */}
            <div className="text-right">
              <div className="text-cyan-300 font-mono text-lg tracking-wider">
                {time.toLocaleTimeString("en-US", {
                  hour12: false,
                  timeZone: "UTC",
                })}{" "}
                UTC
              </div>
              <div className="text-cyan-500 font-mono text-sm">
                {time.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
              <div className="text-gray-400 font-mono text-xs mt-1">
                LAT: -32.9442° LON: -60.6505°
              </div>
            </div>
          </div>

          {/* Bottom diagnostic line */}
          <div className="mt-4 pt-3 border-t border-cyan-900/50">
            <div className="flex justify-between items-center text-xs font-mono">
              <div className="text-gray-500">
                QUANTUM_CORE: ACTIVE | NEURAL_NET: SYNCHRONIZED | DATA_FLOW:
                OPTIMAL
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-green-400">● SECURE</span>
                <span className="text-cyan-400">● CONNECTED</span>
                <span className="text-blue-400">● MATRIX_READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>

      {/* Subtle scan line animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-transparent animate-pulse"></div>
    </footer>
  );
};

export default CyberpunkFooter;
