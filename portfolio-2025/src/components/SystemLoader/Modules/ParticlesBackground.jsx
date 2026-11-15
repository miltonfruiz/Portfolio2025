import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = ({ progress, finalStage }) => {
  const isComplete = progress >= 100 && finalStage;

  // Paleta de colores
  const particleColors = isComplete
    ? ["#00ffff", "#00d9ff", "#9d00ff", "#ff00ff", "#ffea00"]
    : ["#087f91", "#08758a", "#15516b", "#00a6b8"];

  // Inicialización de tsParticles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Configuración optimizada
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
          value: particleColors,
        },

        links: {
          enable: true,
          distance: 130,
          color: "#087f91",
          opacity: 0.24,
          width: 0.65,

          triangles: {
            enable: true,
            color: "#008caa",
            opacity: 0.008,
          },
        },

        move: {
          enable: true,
          speed: isComplete ? 0.8 : 0.4,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },

        number: {
          value: isComplete ? 190 : 150,
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

        // Pequeños destellos
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
    [isComplete],
  );

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
  );
};

export default ParticlesBackground;
