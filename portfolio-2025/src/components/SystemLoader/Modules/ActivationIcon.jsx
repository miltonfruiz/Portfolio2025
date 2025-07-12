import { motion } from "framer-motion";
import { useEffect } from "react";

const ActivationIcon = ({ module, index, isActive }) => {
  useEffect(() => {
    if (isActive) {
      const delay = index * 100;
      const timeout = setTimeout(() => {
        const audio = new Audio("/sounds/activation.mp3");
        audio.volume = 0.12;
        audio.play().catch((e) => console.warn("Audio playback failed:", e));
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isActive, index]);
  return (
    <motion.div
      key={index}
      className={`module-${index} flex flex-col items-center p-1 sm:p-2 transition-colors duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isActive ? module.color : "text-gray-500"
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: isActive ? -10 : 0 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
    >
      <span
        className={`module-icon module-icon-${index} text-lg sm:text-xl md:text-xl xl-text-xl mb-1`}
      >
        {module.icon}
      </span>
      <span className="hidden sm:inline text-[7px] sm:text-[8px] md:text-[10px] xl:text-[8px] font-montserrat text-center leading-tight">
        {module.label}
      </span>
    </motion.div>
  );
};

export default ActivationIcon;
