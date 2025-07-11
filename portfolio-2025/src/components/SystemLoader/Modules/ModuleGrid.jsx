import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ModuleGrid = ({ modules, activeModules }) => {
  const [activeAnimations, setActiveAnimations] = useState([]);

  useEffect(() => {
    return () => setActiveAnimations([]);
  }, []);

  return (
    <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 gap-2 mb-4 sm:gap-3 md:gap-4 w-full max-w-xl sm:max-w-xl mx-auto mt-12 sm:mt-8">
      {modules.map((module, i) => {
        const isActive = activeModules.includes(i);
        useEffect(() => {
          if (isActive && !activeAnimations.includes(i)) {
            const timer = setTimeout(() => {
              setActiveAnimations((prev) => [...prev, i]);
            }, 100);
            return () => clearTimeout(timer);
          }
        }, [isActive, i, activeAnimations]);
        return (
          <motion.div
            key={i}
            className={`module-${i} flex flex-col items-center p-1 sm:p-2 transition-colors duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              activeAnimations.includes(i) ? module.color : "text-gray-500"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: isActive ? -10 : 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: i * 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            <span
              className={`module-icon module-icon-${i} text-lg sm:text-xl md:text-xl xl-text-xl mb-1`}
            >
              {module.icon}
            </span>
            <span className="hidden sm:inline text-[7px] sm:text-[8px] md:text-[10px] xl:text-[8px] font-montserrat text-center leading-tight">
              {module.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ModuleGrid;
