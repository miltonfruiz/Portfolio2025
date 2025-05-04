import React, { useState, useEffect, useRef } from "react";

const MatrixRain = ({ speed = 5 }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);
  const fpsInterval = 1000 / 30;
  const chars =
    "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const fontSize = dimensions.width < 768 ? 12 : 16;
  const columns = Math.floor(dimensions.width / fontSize);
  const drops = useRef(Array(columns).fill(0));
  const speedFactor = Math.min(Math.max(speed, 1), 10);
  const dropSpeed = 0.02 * speedFactor;
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    ctx.fillStyle = "rgba(0, 5, 10, 0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
    const draw = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;

      if (deltaTime > fpsInterval) {
        ctx.fillStyle = "rgba(0, 5, 10, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < drops.current.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops.current[i] * fontSize;
          const opacity = Math.min(1, (y / canvas.height) * 2);
          ctx.fillStyle = `rgba(0, ${255 * opacity}, ${
            160 * opacity
          }, ${opacity})`;
          ctx.fillText(text, x, y);
          drops.current[i] += dropSpeed * (y > canvas.height * 0.3 ? 1.5 : 1);
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
  }, [dimensions, speedFactor]);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-30 pointer-events-none"
    />
  );
};

export default React.memo(MatrixRain);
