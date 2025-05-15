import React, { useEffect, useRef, useState } from "react";
import {
  FaSkull,
  FaRadiationAlt,
  FaExclamationTriangle,
  FaVirus,
  FaArrowAltCircleDown,
  FaMemory,
  FaStackOverflow,
} from "react-icons/fa";
import { MdOutlineSecurity, MdDangerous } from "react-icons/md";
import { PiNetworkXFill } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { GiSharpSmile } from "react-icons/gi";
import { LuServerOff } from "react-icons/lu";

const Glitch = ({ glitchActive }) => {
  const audioRef = useRef(null);
  const [errorElements, setErrorElements] = useState([]);
  const allIcons = [
    <FaSkull className="text-red-500" />,
    <FaRadiationAlt className="text-red-500" />,
    <FaExclamationTriangle className="text-red-500" />,
    <FaVirus className="text-red-500" />,
    <FaArrowAltCircleDown className="text-red-500" />,
    <LuServerOff className="text-red-500" />,
    <FaMemory className="text-red-500" />,
    <FaStackOverflow className="text-red-500" />,
    <MdOutlineSecurity className="text-red-500" />,
    <PiNetworkXFill className="text-red-500" />,
    <MdDangerous className="text-red-600" />,
    <RxCross1 className="text-red-600" />,
    <GiSharpSmile className="text-red-600" />,
  ];
  const errorMessages = {
    critical: [
      "KERNEL PANIC",
      "FATAL EXCEPTION",
      "SYSTEM FAILURE",
      "CORRUPTED MEMORY",
    ],
    security: [
      "ACCESS DENIED",
      "SECURITY VIOLATION",
      "UNAUTHORIZED",
      "MALWARE DETECTED",
    ],
    network: [
      "NETWORK TIMEOUT",
      "CONNECTION LOST",
      "SERVER DOWN",
      "I/O ERROR",
      "NOT FOUND",
    ],
    system: [
      "STACK OVERFLOW",
      "INVALID OPCODE",
      "CONFIG MISMATCH",
      "MEMORY LEAK",
    ],
  };
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

  useEffect(() => {
    if (glitchActive) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.error("Audio error:", e));
      const elements = [];
      const elementCount = 4 + Math.floor(Math.random() * 3);
      const iconCount = Math.floor(elementCount / 2);
      const textCount = elementCount - iconCount;
      for (let i = 0; i < iconCount; i++) {
        elements.push(createIconElement());
      }
      for (let i = 0; i < textCount; i++) {
        elements.push(createTextElement());
      }
      setErrorElements(shuffleArray(elements));
      const timeout = setTimeout(
        () => setErrorElements([]),
        1000 + Math.random() * 1000
      );
      return () => clearTimeout(timeout);
    }
  }, [glitchActive]);
  const createIconElement = () => {
    const icon = allIcons[Math.floor(Math.random() * allIcons.length)];
    return {
      id: Date.now() + Math.random(),
      type: "icon",
      content: icon,
      position: getRandomPosition(),
      size: 18 + Math.random() * 36,
    };
  };
  const createTextElement = () => {
    const categories = Object.keys(errorMessages);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const message =
      errorMessages[category][
        Math.floor(Math.random() * errorMessages[category].length)
      ];
    return {
      id: Date.now() + Math.random(),
      type: "text",
      content: message,
      position: getRandomPosition(),
      size: 10 + Math.random() * 18,
    };
  };
  const getRandomPosition = () => {
    let x, y;
    let attempts = 0;
    const maxAttempts = 10;
    do {
      x = 10 + Math.random() * 80;
      y = 10 + Math.random() * 80;
      attempts++;
    } while (hasCollision(x, y) && attempts < maxAttempts);
    return { x, y };
  };
  const hasCollision = (x, y) => {
    return errorElements.some((el) => {
      const distance = Math.sqrt(
        Math.pow(el.position.x - x, 2) + Math.pow(el.position.y - y, 2)
      );
      return distance < 15;
    });
  };
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  return (
    <>
      {errorElements.map((element) => (
        <div
          key={element.id}
          className="fixed z-50 pointer-events-none animate-glitch-appear font-bad-signal"
          style={{
            left: `${element.position.x}%`,
            top: `${element.position.y}%`,
            fontSize: `${element.size}px`,
            transform: "translate(-50%, -50%)",
            opacity: 0.9,
            textShadow: element.type === "text" ? "0 0 5px #ff0000" : "none",
            color: element.type === "text" ? "#ff5555" : "inherit",
            animationDuration: `${0.5 + Math.random()}s`,
            letterSpacing: element.type === "text" ? "2px" : "normal",
          }}
        >
          {element.content}
        </div>
      ))}
    </>
  );
};

export default React.memo(Glitch);
