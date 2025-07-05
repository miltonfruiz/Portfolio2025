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
        <span className="text-[11px] text-cyber-primary font-mono">
          BOOT_SEQUENCE
        </span>
        <span
          id="progress-text"
          className="text-xs text-cyber-accent font-mono"
        >
          {Math.floor(progress)}%
        </span>
      </div>
      <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
        <motion.div
          id="progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-cyber-primary to-cyber-accent"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
