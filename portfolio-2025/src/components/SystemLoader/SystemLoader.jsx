import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  FaServer,
  FaShieldAlt,
  FaBolt,
  FaMemory,
  FaNetworkWired,
} from "react-icons/fa";

const SystemLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const binaryElements = useRef([]);
  const hexagonRefs = useRef([]);

  // Textos de estado del sistema
  const systemMessages = [
    "Inicializando núcleo del sistema...",
    "Cargando módulos de seguridad...",
    "Conectando a la red neural...",
    "Verificando integridad del sistema...",
    "Sincronizando bases de datos...",
    "Activando protocolos cibernéticos...",
  ];

  useEffect(() => {
    // Animación de elementos binarios
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

    // Animación de hexágonos
    hexagonRefs.current.forEach((hex, i) => {
      gsap.to(hex, {
        rotation: 360,
        duration: 15 + i * 5,
        repeat: -1,
        ease: "none",
      });
    });

    // Simular progreso de carga
    const loadProgress = { value: 0 };
    gsap.to(loadProgress, {
      value: 100,
      duration: 5,
      ease: "power2.inOut",
      onUpdate: () => {
        document.getElementById(
          "progress-bar"
        ).style.width = `${loadProgress.value}%`;
        document.getElementById("progress-text").textContent = `${Math.floor(
          loadProgress.value
        )}%`;
      },
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onComplete,
        });
      },
    });

    // Cambiar mensajes periódicamente
    const messageElement = document.getElementById("system-message");
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % systemMessages.length;
      gsap.to(messageElement, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          messageElement.textContent = systemMessages[messageIndex];
          gsap.to(messageElement, { opacity: 1, duration: 0.3 });
        },
      });
    }, 1500);

    return () => clearInterval(messageInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center crt-effect"
      >
        {/* Fondo de elementos binarios */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
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

        {/* Hexágonos animados */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[200, 150, 100].map((size, i) => (
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

        {/* Contenido principal */}
        <div className="relative z-10 w-full max-w-2xl px-6">
          <div className="flex items-center mb-6 space-x-4">
            <FaServer className="text-3xl text-cyber-accent animate-pulse" />
            <div>
              <h1 className="text-2xl font-bold text-cyber-primary font-mono tracking-wider">
                CYBER_SYSTEM v4.2.1
              </h1>
              <p
                id="system-message"
                className="text-sm text-cyber-secondary font-mono"
              >
                {systemMessages[0]}
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-cyber-primary font-mono">
                BOOT_SEQUENCE
              </span>
              <span
                id="progress-text"
                className="text-xs text-cyber-accent font-mono"
              >
                0%
              </span>
            </div>
            <div className="h-2 bg-cyber-dark rounded-full overflow-hidden">
              <motion.div
                id="progress-bar"
                initial={{ width: 0 }}
                className="h-full bg-gradient-to-r from-cyber-primary to-cyber-accent"
              />
            </div>
          </div>

          {/* Indicadores del sistema */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                icon: <FaShieldAlt />,
                label: "SECURITY",
                color: "text-green-500",
              },
              { icon: <FaBolt />, label: "POWER", color: "text-yellow-500" },
              { icon: <FaMemory />, label: "MEMORY", color: "text-blue-500" },
              {
                icon: <FaNetworkWired />,
                label: "NETWORK",
                color: "text-purple-500",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className={`flex items-center space-x-2 p-2 bg-black/30 border border-cyber-dark rounded ${item.color}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-mono">{item.label}</span>
                <div className="ml-auto h-2 w-2 rounded-full bg-current animate-pulse" />
              </motion.div>
            ))}
          </div>

          {/* Mensaje de copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-center text-xs text-cyber-secondary font-mono"
          >
            © 2025 CYBERNETIC SYSTEMS • ALL RIGHTS RESERVED
          </motion.p>
        </div>

        {/* Efectos visuales adicionales */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scanlines" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
        </div>
      </div>
    </motion.div>
  );
};

export default SystemLoader;
