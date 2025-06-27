import React, { useState, useEffect, useRef } from "react";
import "./MatrixRain.css";

const MatrixRain = ({ speed = 5, glitchActive = false }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const fpsInterval = 1000 / 30;
  const normalChars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const glitchChars = "!@#$%^&*()_+}{[]|\\:;\"'<>/?~`€¥£•";
  const [currentChars, setCurrentChars] = useState(normalChars);
  const fontSize = dimensions.width < 768 ? 12 : 16;
  const columns = Math.floor(dimensions.width / fontSize);
  const drops = useRef(Array(columns).fill(0));
  const speedFactor = Math.min(Math.max(speed, 0.6), 6);
  const dropSpeed = 0.02 * speedFactor;
  const audioRef = useRef(null);
  useEffect(() => {
    if (glitchActive && !audioRef.current) {
      audioRef.current = new Audio("/sounds/matrix-glitch.mp3");
      audioRef.current.volume = 0.1;
      const handleInteraction = () => {
        audioRef.current.play().catch(console.warn);
        document.removeEventListener("click", handleInteraction);
      };
      document.addEventListener("click", handleInteraction);
    }
  }, [glitchActive]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    ctx.font = `bold 10px 'Courier New', monospace`;
    const draw = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      if (deltaTime > fpsInterval) {
        ctx.fillStyle = glitchActive
          ? "rgba(10, 0, 0, 0.1)"
          : "rgba(0, 5, 10, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < drops.current.length; i++) {
          const text =
            currentChars[Math.floor(Math.random() * currentChars.length)];
          const x = i * fontSize;
          const y = drops.current[i] * fontSize;
          const opacity = Math.min(1, (y / canvas.height) * 2);
          if (glitchActive) {
            ctx.strokeStyle = `rgba(255, ${Math.random() * 100}, ${
              Math.random() * 100
            }, 0.3)`;
            ctx.beginPath();
            const y = Math.random() * canvas.height;
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          } else {
            const green = 150 + Math.floor(105 * opacity);
            const blue = 50 + Math.floor(110 * opacity);
            ctx.fillStyle = `rgba(0, ${green}, ${blue}, ${opacity})`;
            ctx.fillText(text, x, y);
          }
          if (glitchActive && Math.random() > 0.98) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          if (glitchActive && Math.random() > 0.95) {
            ctx.save();
            ctx.globalCompositeOperation = "xor";
            ctx.fillStyle = `rgba(${Math.random() * 255}, 0, 0, 0.2)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
          }
          const currentSpeed = glitchActive
            ? dropSpeed * (1.5 + Math.random() * 1.5)
            : dropSpeed * (y > canvas.height * 0.3 ? 1.5 : 1);
          drops.current[i] += currentSpeed;
          if (y > canvas.height && Math.random() > 0.975) {
            drops.current[i] = Math.random() * -20;
          }
        }
        lastTimeRef.current = timestamp - (deltaTime % fpsInterval);
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions, speedFactor, glitchActive, currentChars]);
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${
        glitchActive
          ? "opacity-80 mix-blend-screen glitch-matrix"
          : "opacity-30"
      } transition-all duration-300`}
    />
  );
};

export default React.memo(MatrixRain);
