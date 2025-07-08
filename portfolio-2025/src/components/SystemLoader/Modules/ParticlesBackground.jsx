import React, { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import gsap from "gsap";

const ParticlesBackground = ({ progress, finalStage }) => {
  const [currentColor, setCurrentColor] = useState("#555555");
  const [particleSpeed, setParticleSpeed] = useState(0.2);
  const [linkWidth, setLinkWidth] = useState(0.5);
  const [linkOpacity, setLinkOpacity] = useState(0.1);

  useEffect(() => {
    if (finalStage) {
      gsap.to(
        { colorValue: "#555555", speedValue: 0.2 },
        {
          duration: 5,
          colorValue: "#00ffff",
          speedValue: 1.5,
          ease: "slow(0.7, 0.7, false)",
          onUpdate: function () {
            const t = this.targets()[0];
            setCurrentColor(t.colorValue);
            setParticleSpeed(t.speedValue);
          },
          onComplete: () => {
            gsap.to(
              { widthValue: 0.5, opacityValue: 0.1 },
              {
                duration: 3,
                widthValue: 1.5,
                opacityValue: 0.4,
                ease: "slow(0.7, 0.7, false)",
                onUpdate: function () {
                  const l = this.targets()[0];
                  setLinkWidth(l.widthValue);
                  setLinkOpacity(l.opacityValue);
                },
              }
            );
          },
        }
      );
    } else {
      setCurrentColor("#555555");
      setParticleSpeed(0.2);
      setLinkWidth(0.5);
      setLinkOpacity(0.1);
    }
  }, [finalStage]);
  const particleColors =
    progress >= 100 && finalStage
      ? ["#ff00ff", "#00ffff", "#ffea00", "#9d00ff"]
      : currentColor;

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#05010f",
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: particleColors,
          },
          links: {
            color: Array.isArray(particleColors) ? "#00ffff" : particleColors,
            distance: 150,
            enable: true,
            opacity: linkOpacity,
            width: linkWidth,
            warp: true,
          },
          move: {
            speed: particleSpeed,

            enable: true,
            direction: "none",
            outModes: { default: "bounce" },
            trail: {
              enable: true,
              length: 15,
              fillColor: "#05010f",
            },
          },
          number: {
            value: 80 + progress / 2,
            density: { enable: true, area: 800 },
          },
          opacity: {
            value: finalStage ? 0.8 : 0.2,
          },
          shape: {
            type: ["circle", "polygon"],
          },
          size: {
            value: { min: 0.5, max: 2 },
            animation: {
              enable: true,
              speed: 4,
              minimumValue: 0.1,
            },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
            resize: true,
          },
        },

        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
