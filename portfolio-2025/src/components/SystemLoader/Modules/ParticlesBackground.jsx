import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import "./ParticlesBackground.css";

const ParticlesBackground = ({ progress, finalStage }) => {
  const isComplete = progress >= 100 && finalStage;

  // Inicialización de tsParticles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Configuración estática: nunca cambia durante la carga
  const particlesOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: -1,
      },

      background: {
        color: "#05010f",
      },

      fpsLimit: 60,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,

      particles: {
        color: {
          value: [
            "#087f91",
            "#08758a",
            "#15516b",
            "#00a6b8",
            "#00ffff",
            "#9d00ff",
            "#ff00ff",
            "#ffea00",
          ],
        },

        links: {
          enable: true,
          distance: 130,
          color: "#ffea00",
          opacity: 0.24,
          width: 0.65,

          triangles: {
            enable: true,
            color: "#00a6b8",
            opacity: 0.008,
          },
        },

        move: {
          enable: true,
          speed: 0.4,
          direction: "none",
          random: true,
          straight: false,

          outModes: {
            default: "bounce",
          },
        },

        number: {
          value: 180,
          density: {
            enable: true,
            area: 800,
          },
        },

        opacity: {
          value: {
            min: 0.25,
            max: 0.8,
          },

          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.1,
            sync: false,
          },
        },

        shape: {
          type: "circle",
        },

        size: {
          value: {
            min: 0.6,
            max: 1.8,
          },

          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.4,
            sync: false,
          },
        },

        twinkle: {
          particles: {
            enable: true,
            frequency: 0.04,
            opacity: 1,
            color: "#00ffff",
          },
        },
      },

      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },

          onClick: {
            enable: false,
          },

          resize: {
            enable: true,
          },
        },

        modes: {
          grab: {
            distance: 190,
            links: {
              opacity: 0.4,
            },
          },
        },
      },

      detectRetina: true,
    }),
    [],
  );

  return (
    <div
      className={`particles-background ${
        isComplete ? "particles-active" : "particles-inactive"
      }`}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />
    </div>
  );
};

export default ParticlesBackground;
