import React from "react";
import { motion } from "framer-motion";
import { FaServer } from "react-icons/fa";

const SystemHeader = ({ finalStage, message, progress }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      className="flex items-center mb-4 mt-6 space-x-4 w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl xl:max-w-xl mx-auto px-4"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <FaServer
          className={`text-2xl sm:text-3xl md:text-4xl xl:text-3xl transition-colors duration-7000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            progress > 99.9
              ? "text-cyber-primary animate-pulse-fast"
              : "text-[#555555] animate-pulse shadow-[#555555]"
          }`}
        />
      </motion.div>
      <div className="space-y-1">
        <motion.h1
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`text-[10px] sm:text-xs md:text-sm xl:text-[11px] font-bold tracking-wider font-hacker transition-colors duration-700 ${
            finalStage ? "text-cyber-primary" : "text-[#555]"
          }`}
        >
          CYBER_SYSTEM v4.2.5
        </motion.h1>
        <motion.p
          id="system-message"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`text-[8px] sm:text-[10px] md:text-xs xl:text-[9.5px] ${
            finalStage
              ? "text-green-700 font-bold tracking-wider"
              : "text-cyber-secondary"
          } font-mono mt-2`}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SystemHeader;
