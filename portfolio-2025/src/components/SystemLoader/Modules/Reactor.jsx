import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaBolt } from "react-icons/fa";

const Reactor = ({ activeStage }) => {
  const coreRef = useRef(null);
  const ringsRef = useRef([]);
  const energyParticlesRef = useRef([]);
  const connectionBeamsRef = useRef([]);

  useEffect(() => {
    const rings = ringsRef.current.filter(Boolean);
    const energyParticles = energyParticlesRef.current.filter(Boolean);
    const connectionBeams = connectionBeamsRef.current.filter(Boolean);

    if (activeStage) {
      // Animación de activación completa
      const activationTimeline = gsap.timeline();

      // 1. Activación del núcleo
      activationTimeline.to(coreRef.current, {
        scale: 1.5,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      });

      // 2. Activación de anillos con efecto secuencial
      rings.forEach((ring, i) => {
        activationTimeline.to(
          ring,
          {
            rotation: 360,
            duration: 20 - i * 5,
            repeat: -1,
            ease: "none",
            opacity: 0.9,
            borderWidth: "3px",
            duration: 1,
          },
          i * 0.3
        );
      });

      // 3. Partículas de energía
      energyParticles.forEach((particle, i) => {
        gsap.to(particle, {
          y: `+=${Math.random() * 100 - 50}`,
          x: `+=${Math.random() * 100 - 50}`,
          opacity: 0.8,
          duration: 2 + Math.random() * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });

      // 4. Rayos de conexión con las partículas
      connectionBeams.forEach((beam) => {
        gsap.fromTo(
          beam,
          { opacity: 0, scaleY: 0 },
          {
            opacity: 0.7,
            scaleY: 1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }
        );
      });

      // 5. Pulsos energéticos
      const pulse = gsap.timeline({ repeat: -1 });
      pulse.to(coreRef.current, {
        scale: 1.7,
        duration: 2,
        ease: "power1.inOut",
      });
      pulse.to(coreRef.current, {
        scale: 1.5,
        duration: 2,
        ease: "power1.inOut",
      });
    } else {
      // Estado apagado
      gsap.to(
        [coreRef.current, ...rings, ...energyParticles, ...connectionBeams],
        {
          opacity: 0.2,
          scale: 0.8,
          duration: 2,
          ease: "power2.out",
        }
      );

      gsap.set(connectionBeams, { opacity: 0 });
    }

    return () => {
      gsap.killTweensOf([
        coreRef.current,
        ...rings,
        ...energyParticles,
        ...connectionBeams,
      ]);
    };
  }, [activeStage]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Anillos del reactor */}
      {[200, 150, 100].map((size, i) => (
        <div
          key={`ring-${i}`}
          ref={(el) => (ringsRef.current[i] = el)}
          className="absolute rounded-full border-2 opacity-30"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderColor: `hsl(${180 + i * 60}, 100%, 50%)`,
            filter: `blur(${i}px) drop-shadow(0 0 5px hsl(${
              180 + i * 60
            }, 100%, 50%))`,
          }}
        />
      ))}

      {/* Rayos de conexión */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`beam-${i}`}
          ref={(el) => (connectionBeamsRef.current[i] = el)}
          className="absolute w-1 bg-gradient-to-b from-cyan-500 to-transparent opacity-0"
          style={{
            height: "200px",
            transform: `rotate(${i * 45}deg) translateY(-100px)`,
            transformOrigin: "bottom center",
          }}
        />
      ))}

      {/* Núcleo del reactor */}
      <div
        ref={coreRef}
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 opacity-70 flex items-center justify-center"
        style={{
          filter: "blur(2px) drop-shadow(0 0 20px #00ff9d)",
          boxShadow: "inset 0 0 20px rgba(0, 255, 157, 0.8)",
        }}
      >
        <FaBolt className="text-white text-2xl animate-pulse" />
      </div>

      {/* Partículas de energía */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`particle-${i}`}
          ref={(el) => (energyParticlesRef.current[i] = el)}
          className="absolute rounded-full bg-cyan-400 opacity-0"
          style={{
            width: "6px",
            height: "6px",
            left: "50%",
            top: "50%",
            filter: "blur(1px)",
            transform: `translate(${Math.random() * 100 - 50}px, ${
              Math.random() * 100 - 50
            }px)`,
          }}
        />
      ))}
    </div>
  );
};

export default Reactor;
