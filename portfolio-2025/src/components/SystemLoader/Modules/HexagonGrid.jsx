import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const HexagonGrid = ({ sizes = [200, 150, 100] }) => {
  const hexagonRefs = useRef([]);

  useEffect(() => {
    hexagonRefs.current.forEach((hex, i) => {
      gsap.to(hex, {
        rotation: 360,
        duration: 15 + i * 5,
        repeat: -1,
        ease: "none",
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {sizes.map((size, i) => (
        <div
          key={i}
          ref={(el) => (hexagonRefs.current[i] = el)}
          className="absolute border-2 border-cyber-primary opacity-20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
      ))}
    </div>
  );
};

export default HexagonGrid;
