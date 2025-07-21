import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MatrixRain = ({
  density = 0.3,
  speed = 100,
  className = "",
  characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const dropsRef = useRef([]);
  const lastFrameTimeRef = useRef(0);
  const gradientRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const fontSize = 10;
    const updateDimensions = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gradientRef.current = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradientRef.current.addColorStop(0, "#00ff9d");
      gradientRef.current.addColorStop(0.7, "#006432");
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
    const getCharStyle = (charObj, drop, charIndex) => {
      const isLeadingChar = charIndex === 0;
      const alpha = Math.max(0, 1 - charObj.age / 30) * drop.opacity;
      if (isLeadingChar) {
        return {
          fill: `rgba(255, 255, 255, ${Math.min(1, alpha * 1.5)})`,
          shadow: {
            color: "#00ff9d",
            blur: 15,
            offsetY: 2,
          },
          size: fontSize * 1.1,
        };
      } else if (charObj.age < 5) {
        return {
          fill: gradientRef.current,
          shadow: {
            color: "#00ff9d",
            blur: 8,
            offsetY: 1,
          },
          size: fontSize,
        };
      } else {
        return {
          fill: `rgba(10, 180, 60, ${alpha * 0.7})`,
          shadow: null,
          size: fontSize * 0.95,
        };
      }
    };
    const draw = (timestamp) => {
      if (
        !lastFrameTimeRef.current ||
        timestamp - lastFrameTimeRef.current > 16
      ) {
        lastFrameTimeRef.current = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
        ctx.textAlign = "center";
        dropsRef.current.forEach((drop, i) => {
          const x = i * fontSize;
          drop.y += drop.speed * (speed / 50);
          if (drop.y > canvas.height + fontSize * 20) {
            drop.y = -fontSize * 20;
            drop.speed = Math.random() * 2 + 0.5;
            drop.opacity = Math.random() * 0.5 + 0.5;
            drop.chars = [];
          }
          if (Math.random() < density) {
            drop.chars.unshift({
              char: characters[Math.floor(Math.random() * characters.length)],
              y: drop.y,
              age: 0,
            });
          }
          drop.chars = drop.chars.filter((charObj, charIndex) => {
            charObj.age += 1;
            const style = getCharStyle(charObj, drop, charIndex);
            ctx.font = `bold ${style.size}px 'Courier New', monospace`;
            ctx.fillStyle = style.fill;
            if (style.shadow) {
              ctx.shadowColor = style.shadow.color;
              ctx.shadowBlur = style.shadow.blur;
              ctx.shadowOffsetY = style.shadow.offsetY;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fillText(charObj.char, x, charObj.y);
            return charObj.age < 30;
          });
        });
      }
      animationRef.current = requestAnimationFrame(draw);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    draw();
    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, [density, speed, characters]);
  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(0, 40, 20, 0.3) 0%, rgba(0, 0, 0, 0.9) 70%)",
      }}
    />
  );
};

export default MatrixRain;
