import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const BinaryBackground = ({ count = 50 }) => {
  const binaryElements = useRef([]);

  useEffect(() => {
    binaryElements.current.forEach((el, i) => {
      gsap.to(el, {
        opacity: [0.2, 0.8],
        y: -20,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (binaryElements.current[i] = el)}
          className="absolute text-xs text-cyber-primary opacity-20 font-mono"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {Math.random() > 0.5 ? "1" : "0"}
        </div>
      ))}
    </div>
  );
};

export default BinaryBackground;
