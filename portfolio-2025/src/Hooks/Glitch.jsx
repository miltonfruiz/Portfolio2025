import React, { useEffect, useRef, useState } from "react";
import {
  FaRadiationAlt,
  FaRadiation,
  FaExclamationTriangle,
  FaVirus,
  FaMemory,
  FaStackOverflow,
  FaWifi,
} from "react-icons/fa";
import { MdDangerous, MdKeyboardDoubleArrowDown } from "react-icons/md";
import { PiNetworkXFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import {
  GiSharpSmile,
  GiDevilMask,
  GiCrossMark,
  GiCrossedSabres,
  GiNuclearBomb,
  GiBurningSkull,
} from "react-icons/gi";
import { BsFillSignStopFill } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { SiAlienware } from "react-icons/si";

const Glitch = ({ glitchActive }) => {
  const audioRef = useRef(null);
  const [errorElements, setErrorElements] = useState([]);
  const allIcons = [
    <FaRadiationAlt className="text-[#ffff00] " />,
    <FaRadiation className="text-[#ffff00] " />,
    <FaExclamationTriangle className="text-[#ffff00]" />,
    <FaVirus className="text-[#ff0020]" />,
    <MdKeyboardDoubleArrowDown className="text-[#ff0020]" />,
    <FaMemory className="text-[#ff0020]" />,
    <FaStackOverflow className="text-[#ff0020]" />,
    <PiNetworkXFill className="text-[#ff0020]" />,
    <MdDangerous className="text-[#ff0020]" />,
    <ImCross className="text-[#ff0020]" />,
    <GiSharpSmile className="text-[#ff0020]" />,
    <GiDevilMask className="text-[#ff0020]" />,
    <BsFillSignStopFill className="text-[#ff0020]" />,
    <IoIosLock className="text-[#ff0020]" />,
    <FaWifi className="text-[#ff0020]" />,
    <GiCrossMark className="text-[#ff0020]" />,
    <GiCrossedSabres className="text-[#ff0020]" />,
    <GiNuclearBomb className="text-[#ffff00]" />,
    <GiBurningSkull className="text-[#ff0020]" />,
    <SiAlienware className="text-[#ff0020]" />,
  ];
  const errorMessages = {
    critical: [
      "( K3RNEL P@NIC )",
      "( FAT@L EXC3PTION )",
      "( SYST3M F@ILURE )",
      "( CORRUPT3D MEMORY )",
      "( SEGMENT@TION FAUL7 )",
    ],
    security: [
      "( ACCESS DENI3D )",
      "( S3CURITY VIOL@TION )",
      "( UN@UTHORIZED )",
      "( MALW@RE DET3CTED )",
      "( INTRUSION DETECTED )",
    ],
    network: [
      "( N3TWORK TIMEOUT )",
      "( CONN3CTION LOST )",
      "( SERV3R DOWN )",
      "( I/O ERROR! )",
      "( NOT FOUND! )",
    ],
    system: [
      "( ST@CK OVERFLOW )",
      "( INV@LID OPCODE )",
      "( CONFIG MISM@TCH )",
      "( M3MORY LE@K! )",
      "( HARDWARE F@ILURE )",
    ],
  };
  const alertMessages = [
    "DO NOT ENTER",
    "WARNING: DANGER ZONE",
    "UNAUTHORIZED ACCESS",
    "SYSTEM BREACH DETECTED",
    "CRITICAL ALERT",
    "EMERGENCY LOCKDOWN",
    "SECURITY PROTOCOL ENGAGED",
    "TERMINAL LOCKED",
    "ADMINISTRATOR REQUIRED",
    "QUARANTINE IN EFFECT",
    "VIRUS CONTAINMENT FAILURE",
    "FIREWALL BREACHED",
    "EXECUTING SAFE MODE",
    "ILLEGAL OPERATION",
    "TERMINATE PROCESS",
  ];
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
      const iconCount = Math.floor(elementCount * 0.4);
      const errorTextCount = Math.floor(elementCount * 0.4);
      const alertTextCount = elementCount - iconCount - errorTextCount;
      for (let i = 0; i < iconCount; i++) elements.push(createIconElement());
      for (let i = 0; i < errorTextCount; i++)
        elements.push(createErrorTextElement());
      for (let i = 0; i < alertTextCount; i++)
        elements.push(createAlertTextElement());
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
      className: "glitch-icon",
      id: Date.now() + Math.random(),
      type: "icon",
      content: icon,
      position: getRandomPosition(),
      size: 18 + Math.random() * 36,
    };
  };
  const createErrorTextElement = () => {
    const categories = Object.keys(errorMessages);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const message =
      errorMessages[category][
        Math.floor(Math.random() * errorMessages[category].length)
      ];
    return {
      id: Date.now() + Math.random(),
      type: "error-text",
      content: message,
      position: getRandomPosition(),
      size: 10 + Math.random() * 18,
      color: "#ff0020",
    };
  };
  const createAlertTextElement = () => {
    const message =
      alertMessages[Math.floor(Math.random() * alertMessages.length)];
    return {
      className: "glitch-alert-icon",
      id: Date.now() + Math.random(),
      type: "alert-text",
      content: message,
      position: getRandomPosition(),
      size: 10 + Math.random() * 24,
      color: "#ffff20",
      font: "Quakerhack",
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
          className={`fixed z-50 pointer-events-none animate-glitch-appear  ${
            element.type === "alert-text"
              ? "font-quakerhack"
              : "font-bad-signal"
          }`}
          style={{
            left: `${element.position.x}%`,
            top: `${element.position.y}%`,
            fontSize: `${element.size}px`,
            transform: "translate(-50%, -50%)",
            opacity: 0.9,
            textShadow: element.type.includes("text")
              ? `0 0 5px ${element.color}`
              : "none",
            color: element.color,
            animationDuration: `${0.5 + Math.random()}s`,
            letterSpacing: element.type === "alert-text" ? "1px" : "2px",
            fontWeight: element.type === "alert-text" ? "normal" : "normal",
            animation:
              element.type === "alert-text"
                ? "glitch-appear 0s ease-out, alert-pulse 1s infinite alternate"
                : "glitch-appear 0s ease-out",
          }}
        >
          {element.content}
        </div>
      ))}
    </>
  );
};

export default React.memo(Glitch);
