import React from "react";
import { motion } from "framer-motion";

const ModuleGrid = ({ modules, activeModules }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
      {modules.map((module, i) => (
        <motion.div
          key={i}
          className={`module-${i} flex flex-col items-center p-2 ${
            activeModules.includes(i)
              ? `${module.color} bg-black/10`
              : "text-gray-500"
          }`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <span className={`module-icon module-icon-${i} text-xl mb-1`}>
            {module.icon}
          </span>
          <span className="text-[8px] font-montserrat text-center">
            {module.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default ModuleGrid;
