import { useEffect, useRef, useState } from "react";

const Glitch = ({ glitchActive }) => {
  const audioRef = useRef(null);
  const [errorElements, setErrorElements] = useState([]);
  const errorMessages = [
    "ERROR 0x7F: MEMORY CORRUPTION",
    "SYSTEM FAILURE: UNAUTHORIZED ACCESS",
    "CRITICAL PROCESS TERMINATED",
    "SECURITY VIOLATION DETECTED",
    "KERNEL PANIC: INVALID OPCODE",
    "STACK OVERFLOW EXCEPTION",
  ];
  const errorSymbols = [
    "☠️",
    "⚠️",
    "⛔",
    "❌",
    "💀",
    "🚫",
    "☢️",
    "⚡",
    "☣️",
    "ERROR",
    "404",
    "ACCESS DENIED",
    "FAILURE",
    "0xDEADBEEF",
    "0xC0FFEE",
    "SEGFAULT",
    "KERNEL PANIC",
  ];

  // Carga el sonido
  useEffect(() => {
    audioRef.current = new Audio("/sounds/glitcherror.mp3");
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Maneja la activación del glitch
  useEffect(() => {
    if (glitchActive) {
      // Reproduce el sonido
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.error("Audio error:", e));

      // Genera elementos de error aleatorios
      const newElements = [];
      const elementCount = 3 + Math.floor(Math.random() * 4); // 3-6 elementos

      for (let i = 0; i < elementCount; i++) {
        const type = Math.random() > 0.5 ? "message" : "symbol";
        const position = {
          x: Math.random() * 90 + 5, // 5-95%
          y: Math.random() * 80 + 10, // 10-90%
        };
        const duration = 1000 + Math.random() * 2000; // 1-3 segundos

        if (type === "message") {
          newElements.push({
            id: Date.now() + i,
            type: "message",
            content:
              errorMessages[Math.floor(Math.random() * errorMessages.length)],
            position,
            duration,
          });
        } else {
          newElements.push({
            id: Date.now() + i,
            type: "symbol",
            content:
              errorSymbols[Math.floor(Math.random() * errorSymbols.length)],
            position,
            duration,
            size: 20 + Math.random() * 40, // 20-60px
          });
        }
      }

      setErrorElements(newElements);

      // Limpia los elementos después de su duración
      const timeoutIds = newElements.map((el) =>
        setTimeout(() => {
          setErrorElements((prev) => prev.filter((e) => e.id !== el.id));
        }, el.duration)
      );

      return () => timeoutIds.forEach((id) => clearTimeout(id));
    } else {
      setErrorElements([]);
    }
  }, [glitchActive]);

  // Estilos para los elementos de error
  const getElementStyle = (element) => ({
    position: "fixed",
    left: `${element.position.x}%`,
    top: `${element.position.y}%`,
    transform: "translate(-50%, -50%)",
    fontSize: element.type === "symbol" ? `${element.size}px` : "14px",
    color: element.type === "symbol" ? "#ff0000" : "#ff5555",
    fontWeight: "bold",
    textShadow: "0 0 5px #ff0000",
    opacity: 0.9,
    zIndex: 1000,
    pointerEvents: "none",
    animation: "glitch-appear 0.2s ease-out",
  });

  return (
    <>
      {errorElements.map((element) => (
        <div
          key={element.id}
          style={getElementStyle(element)}
          className="glitch-error-element"
        >
          {element.content}
        </div>
      ))}
    </>
  );
};

export default Glitch;
