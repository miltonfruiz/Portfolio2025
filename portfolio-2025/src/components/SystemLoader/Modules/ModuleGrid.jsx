import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ModuleGrid = ({ modules, activeModules }) => {
  const [activeAnimations, setActiveAnimations] = useState([]);

  useEffect(() => {
    return () => setActiveAnimations([]);
  }, []);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
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
            className={`module-${i} flex flex-col items-center p-2 transition-colors duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              activeAnimations.includes(i)
                ? `${module.color} bg-black/10`
                : "text-gray-500"
            }`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: isActive ? -5 : 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
          >
            <span className={`module-icon module-icon-${i} text-xl mb-1`}>
              {module.icon}
            </span>
            <span className="text-[8px] font-montserrat text-center">
              {module.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ModuleGrid;
