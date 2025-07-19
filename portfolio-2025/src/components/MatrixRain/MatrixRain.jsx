import React, { useEffect, useRef } from "react";

const MatrixRain = ({
  density = 0.3,
  speed = 100,
  className = "",
  showGrid = true,
  characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const fontSize = 12;

    const updateDimensions = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Reinitialize drops when dimensions change
      const columns = Math.floor(rect.width / fontSize);
      dropsRef.current = Array(columns)
        .fill()
        .map(() => ({
          y: Math.random() * rect.height,
          speed: Math.random() * 2 + 1,
          chars: [],
          opacity: Math.random() * 0.5 + 0.5,
        }));
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const draw = () => {
      // Create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = "center";

      dropsRef.current.forEach((drop, i) => {
        const x = i * fontSize;

        // Update drop position
        drop.y += drop.speed * (speed / 50);

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + fontSize * 20) {
          drop.y = -fontSize * 20;
          drop.speed = Math.random() * 2 + 0.5;
          drop.opacity = Math.random() * 0.5 + 0.5;
          drop.chars = [];
        }

        // Add new characters to the trail
        if (Math.random() < density) {
          drop.chars.unshift({
            char: characters[Math.floor(Math.random() * characters.length)],
            y: drop.y,
            age: 0,
          });
        }

        // Update and draw characters
        drop.chars = drop.chars.filter((charObj, charIndex) => {
          charObj.age += 1;
          const alpha = Math.max(0, 1 - charObj.age / 30);

          if (alpha <= 0) return false;

          const isLeadingChar = charIndex === 0; // Primera letra de la columna

          // Extra bright white for the very first character (leading)
          if (isLeadingChar) {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(
              1,
              alpha * drop.opacity * 1.5
            )})`;
            ctx.shadowBlur = 20;

            // Añadir un glow extra para la primera letra con el nuevo color
            ctx.save();
            ctx.shadowColor = "#0fff50"; // Cambiado aquí
            ctx.shadowBlur = 15;
            ctx.fillText(charObj.char, x, charObj.y);
            ctx.restore();

            ctx.shadowBlur = 8;
          }
          // Bright green for recent characters
          else if (charObj.age < 3) {
            ctx.fillStyle = `rgba(255, 255, 255, ${
              alpha * drop.opacity * 0.9
            })`;
            ctx.shadowBlur = 12;
          }
          // Medium green for middle-aged characters - usando el nuevo color
          else if (charObj.age < 8) {
            // Convertir #0fff50 a RGB: 15, 255, 80
            ctx.fillStyle = `rgba(15, 255, 80, ${alpha * drop.opacity})`; // Cambiado aquí
            ctx.shadowBlur = 6;
          }
          // Dim green for older characters - usando una versión más oscura del nuevo color
          else {
            // Versión más oscura del nuevo color
            ctx.fillStyle = `rgba(10, 180, 60, ${alpha * drop.opacity * 0.7})`; // Cambiado aquí
            ctx.shadowBlur = 2;
          }

          ctx.fillText(charObj.char, x, charObj.y);

          return true;
        });

        // Randomly change characters in the trail
        drop.chars.forEach((charObj, charIndex) => {
          const isLeadingChar = charIndex === 0;
          // Las primeras letras cambian menos frecuentemente para que destaquen más
          const changeRate = isLeadingChar ? 0.02 : 0.1;

          if (Math.random() < changeRate) {
            charObj.char =
              characters[Math.floor(Math.random() * characters.length)];
          }
        });
      });

      // Add some random bright flashes

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, speed, showGrid, characters]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0, 40, 20, 0.3) 0%, rgba(0, 0, 0, 0.9) 70%)",
      }}
    />
  );
};

export default MatrixRain;
