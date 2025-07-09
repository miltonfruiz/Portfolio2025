import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const ProgressBar = ({ progress, finalStage }) => {
  useEffect(() => {
    if (finalStage) {
      gsap.to("#progress-bar", {
        boxShadow: "0 0 15px 3px rgba(0, 255, 100, 0.8)",
        duration: 0.5,
        yoyo: true,
        repeat: 3,
      });
    }
  }, [finalStage]);

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-[10px] text-green-700 font-mono">
          BOOT_SEQUENCE
        </span>
        <span
          id="progress-text"
          className="text-[10px] text-green-700 font-mono"
        >
          {Math.floor(progress)}%
        </span>
      </div>
      <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
        <motion.div
          id="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{
            background:
              "linear-gradient(to right, #000000, #00b8ff, #00ff9d, #ffffff)",
            boxShadow:
              "0 0 5px #00b8ff, 0 0 10px #00ff9d, 0 0 15px rgba(255,255,255,0.3)",
          }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
