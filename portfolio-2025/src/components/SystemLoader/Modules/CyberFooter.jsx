import React from "react";
import { motion } from "framer-motion";
import { FaPowerOff } from "react-icons/fa";

const CyberFooter = ({ finalStage }) => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanlines" />
        {finalStage && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute bottom-28 w-full text-center text-cyber-primary font-hacker text-base glitch"
          >
            <FaPowerOff className="inline-block text-cyber-primary animate-pulse" />
            <span className="ml-2">SYSTEM READY</span>
          </motion.h2>
        )}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 w-full text-center text-[10px] font-quakerhack tracking-wider pointer-events-none"
      >
        {finalStage ? (
          <span
            style={{
              background: "linear-gradient(90deg, #ff009d, #00b8ff, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            © CYBERNETIC SYSTEMS • Designed by Milton
          </span>
        ) : (
          <span className="text-[#555]">
            © CYBERNETIC SYSTEMS • Designed by Milton
          </span>
        )}
      </motion.p>
    </>
  );
};

export default CyberFooter;
