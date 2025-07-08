import React from "react";
import { FaServer } from "react-icons/fa";

const SystemHeader = ({ finalStage, message, progress }) => {
  return (
    <div className="flex items-center mb-6 space-x-4">
      <FaServer
        className={`text-3xl transition-colors duration-7000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          progress > 99.9
            ? "text-cyber-primary animate-pulse-fast"
            : "text-[#555555] animate-pulse shadow-[#555555]"
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
              ? "text-green-700 font-bold tracking-wider"
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
