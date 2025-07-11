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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="w-full max-w-[90vw] sm:max-w-md md:max-w-lg xl:max-w-xl mx-auto mb-4 px-4"
    >
      <div className="flex justify-between mb-2">
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[9px] sm:text-[10px] md:text-[11px] xl:text-[10px] text-green-600 font-mono"
        >
          BOOT_SEQUENCE
        </motion.span>

        <motion.span
          id="progress-text"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[9px] sm:text-[10px] md:text-[11px] xl:text-[10px] text-green-600 font-mono"
        >
          {Math.floor(progress)}%
        </motion.span>
      </div>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="relative h-[8px] sm:h-[10px] md:h-[12px] xl:h-2.5 bg-[#0c0f11] rounded-full overflow-hidden border-0 shadow-[0_0_6px_#00ff9d55] transition-all duration-300"
      >
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
      </motion.div>
    </motion.div>
  );
};

export default ProgressBar;
