import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ElectronicCircuits = ({ progress, finalStage }) => {
  const circuitRef = useRef(null);

  useEffect(() => {
    const paths = circuitRef.current.querySelectorAll("path");

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      const delay = i * 0.2;

      if (finalStage || progress >= ((i + 1) / paths.length) * 100) {
        gsap.fromTo(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
            stroke: "#333",
            filter: "none",
          },
          {
            strokeDashoffset: 0,
            stroke: "#00ffff",
            filter: "url(#glow)",
            duration: 2,
            delay,
            ease: "power2.out",
          }
        );
      } else {
        gsap.set(path, {
          stroke: "#333",
          strokeDasharray: 0,
          strokeDashoffset: 0,
          filter: "none",
        });
      }
    });
  }, [progress, finalStage]);

  return (
    <svg
      ref={circuitRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M 100 100 L 300 100 L 300 300" stroke="#333" strokeWidth="2" />
      <path d="M 300 300 L 500 300 L 500 500" stroke="#333" strokeWidth="2" />
      <path
        d="M 200 200 C 250 150 350 150 400 200"
        stroke="#333"
        strokeWidth="2"
      />
      <path d="M 600 100 L 600 400 L 700 400" stroke="#333" strokeWidth="2" />
      <path
        d="M 400 500 C 450 550 550 550 600 500"
        stroke="#333"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ElectronicCircuits;
