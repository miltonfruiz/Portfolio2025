import React, { useEffect, useRef, useState } from "react";
import {
  FaRadiationAlt,
  FaRadiation,
  FaExclamationTriangle,
  FaBug,
  FaWifi,
  FaUsb,
  FaBan,
} from "react-icons/fa";
import { FaVirusCovid } from "react-icons/fa6";
import { SlTarget } from "react-icons/sl";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { PiNetworkXFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import {
  GiSharpSmile,
  GiDevilMask,
  GiCrossMark,
  GiCrossedSabres,
  GiNuclearBomb,
  GiBurningSkull,
  GiEvilEyes,
  GiBleedingEye,
  GiGooeyEyedSun,
  GiRollingBomb,
} from "react-icons/gi";
import { BsFillSignStopFill } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { SiAlienware } from "react-icons/si";

const Glitch = ({ glitchActive, getPosition }) => {
  const [showBackgroundImage, setShowBackgroundImage] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = "/images/img3.jpg";
  }, []);
  const audioRef = useRef(null);
  const [errorElements, setErrorElements] = useState([]);
  const allIcons = [
    <FaBan className="text-[#ffff00] warning-icon" />,
    <FaRadiationAlt className="text-[#ffff00] warning-icon" />,
    <FaRadiation className="text-[#ffff00] warning-icon" />,
    <FaExclamationTriangle className="text-[#ffff00] warning-icon" />,
    <MdKeyboardDoubleArrowDown className="text-[#ffff00] warning-icon" />,
    <FaVirusCovid className="text-[#ffff00] warning-icon" />,
    <FaBug className="text-[#ff0020] error-icon-static" />,
    <PiNetworkXFill className="text-[#ff0020] error-icon-static" />,
    <ImCross className="text-[#ff0020] error-icon-static" />,
    <BsFillSignStopFill className="text-[#ff0020] error-icon-static" />,
    <IoIosLock className="text-[#ff0020] error-icon-static" />,
    <FaWifi className="text-[#ff0020] error-icon-static" />,
    <GiCrossMark className="text-[#ff0020] error-icon-static" />,
    <GiBurningSkull className="text-[#ff0020] error-icon-static" />,
    <FaUsb className="text-[#ff0020] error-icon-static" />,
    <GiDevilMask className="text-[#00ff00] radiation-icon" />,
    <GiSharpSmile className="text-[#00ff00] radiation-icon" />,
    <SiAlienware className="text-[#00ff00] radiation-icon" />,
    <GiCrossedSabres className="text-[#00ff00] radiation-icon" />,
    <GiNuclearBomb className="text-[#00ff00] radiation-icon" />,
    <GiEvilEyes className="text-[#00ff00] radiation-icon" />,
    <GiBleedingEye className="text-[#00ff00] radiation-icon" />,
    <GiGooeyEyedSun className="text-[#00ff00] radiation-icon" />,
    <GiRollingBomb className="text-[#00ff00] radiation-icon" />,
    <SlTarget className="text-[#00ff00] radiation-icon" />,
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
    audioRef.current.volume = 0.2;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (glitchActive) {
      setShowBackgroundImage(true);
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
      const timeout = setTimeout(() => {
        setErrorElements([]);
        setShowBackgroundImage(false);
      }, 1000 + Math.random() * 1000);
      return () => {
        clearTimeout(timeout);
        setShowBackgroundImage(false);
      };
    }
  }, [glitchActive]);

  const createIconElement = () => {
    const icon = allIcons[Math.floor(Math.random() * allIcons.length)];
    const defaultPosition = {
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
    };
    const position = getPosition
      ? getPosition(defaultPosition)
      : defaultPosition;
    return {
      id: Date.now() + Math.random(),
      type: "icon",
      content: icon,
      position,
      size: 18 + Math.random() * 40,
    };
  };
  const createErrorTextElement = () => {
    const categories = Object.keys(errorMessages);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const message =
      errorMessages[category][
        Math.floor(Math.random() * errorMessages[category].length)
      ];
    const defaultPosition = {
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
    };
    const position = getPosition
      ? getPosition(defaultPosition)
      : defaultPosition;
    return {
      id: Date.now() + Math.random(),
      type: "error-text",
      content: message,
      position,
      size: Math.min(14 + Math.random() * 10, 36),
      color: "#ff0020",
    };
  };
  const createAlertTextElement = () => {
    const message =
      alertMessages[Math.floor(Math.random() * alertMessages.length)];
    const defaultPosition = {
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
    };
    const position = getPosition
      ? getPosition(defaultPosition)
      : defaultPosition;
    return {
      id: Date.now() + Math.random(),
      type: "alert-text",
      content: message,
      position,
      size: Math.min(18 + Math.random() * 10, 36),
      color: "#ffff20",
      font: "Quakerhack",
    };
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
      {showBackgroundImage && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <img
            src="/images/img3.jpg"
            alt="Glitch background"
            className="w-full h-full object-cover"
            style={{
              opacity: 0.7,
              filter: "grayscale(100%) contrast(200%) brightness(0.7)",
              mixBlendMode: "hard-light",
              animation: "glitchEffect 0.5s infinite",
            }}
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      )}
      {errorElements.map((element) => (
        <div
          key={element.id}
          className={`fixed z-50 pointer-events-none ${
            element.type.includes("text")
              ? "glitch-text-effect"
              : "animate-glitch-appear"
          } ${
            element.type === "alert-text"
              ? "font-quakerhack alert-text"
              : element.type === "error-text"
              ? "font-bad-signal error-text"
              : element.className
          } ${
            element.type.includes("text")
              ? "glitch-text-element"
              : "glitch-icon-element"
          }`}
          style={{
            left: `${element.position.x}%`,
            top: `${element.position.y}%`,
            fontSize: `${element.size}px`,
            transform: "translate(-50%, -50%)",
            opacity: 0.9,
            animationDuration: `${0.5 + Math.random()}s`,
            letterSpacing: element.type === "alert-text" ? "1px" : "2px",
          }}
        >
          {element.content}
        </div>
      ))}
    </>
  );
};

export default React.memo(Glitch);
