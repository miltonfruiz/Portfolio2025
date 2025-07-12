import React, { useEffect, useState } from "react";
import ActivationIcon from "./ActivationIcon";

const ModuleGrid = ({ modules, activeModules }) => {
  const [activeAnimations, setActiveAnimations] = useState([]);

  useEffect(() => {
    return () => setActiveAnimations([]);
  }, []);

  return (
    <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-6 gap-2 mb-4 sm:gap-3 md:gap-4 w-full max-w-xl sm:max-w-xl mx-auto mt-12 sm:mt-8">
      {modules.map((module, i) => (
        <ActivationIcon
          key={i}
          module={module}
          index={i}
          isActive={activeModules.includes(i)}
        />
      ))}
    </div>
  );
};

export default ModuleGrid;
