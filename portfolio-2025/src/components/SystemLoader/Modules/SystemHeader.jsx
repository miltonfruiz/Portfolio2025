import React from "react";
import { FaServer } from "react-icons/fa";

const SystemHeader = ({ finalStage, message, progress }) => {
  return (
    <div className="flex items-center mb-6 space-x-4">
      <FaServer
        className={`text-3xl ${
          progress > 90
            ? "text-green-500 animate-pulse-fast shadow-hacker-glow"
            : "text-[#ff0020] animate-pulse shadow-[#ff0020]"
        }`}
      />
      <div>
        <h1 className="text-xs font-bold text-cyber-primary tracking-wider font-hacker">
          CYBER_SYSTEM v4.2.5
        </h1>
        <p
          id="system-message"
          className={`text-[10px] ${
            finalStage
              ? "text-green-500 font-bold tracking-wider"
              : "text-cyber-secondary"
          } font-mono mt-2`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default SystemHeader;
