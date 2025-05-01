import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTerminal, FaMoon } from "react-icons/fa";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const buttonBaseClasses =
    "flex items-center justify-center gap-3 w-full md:w-64 px-8 py-4 rounded-none font-mono font-bold transition-all duration-200 border-2 border-cyber-primary hover:bg-cyber-glow focus:outline-none";
  const handleAccess = (type) => {
    if (type === "login") navigate("/auth");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-dark p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,_transparent_0%,_rgba(0,255,157,0.05)_1%,_transparent_2%)] bg-[length:100%_4px] animate-scanline z-0 pointer-events-none"></div>
      <div className="relative z-10 text-center mb-12">
        <div className="font-mono text-cyber-primary text-sm md:text-base mb-2 tracking-widest">
          [root@portfolio ~]$ run miltonfruiz.exe
          <span className="ml-2 animate-terminal-blink">_</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-cyber-primary tracking-tighter">
          $ ./bienvenido.sh
        </h1>
        <h1 className="italic text-3xl md:text-base font-mono font-bold text-cyber-primary tracking-tight my-4">
          # ¿Estas listo?
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg z-10">
        <button
          onClick={() => handleAccess("login")}
          className={`${buttonBaseClasses} text-cyber-primary shadow-hacker-glow`}
          aria-label="Iniciar sesión"
        >
          <FaTerminal className="text-cyber-primary" />
          <span className="text-xs">ACCEDER</span>
        </button>
        <button
          onClick={() => handleAccess("guest")}
          className={`${buttonBaseClasses} text-cyber-secondary shadow-hacker-glow-blue`}
          aria-label="Modo invitado"
        >
          <FaMoon className="text-cyber-secondary" />
          <span className="text-xs">SUSPENDER </span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black text-cyber-code text-xs font-mono overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          01001000 01000001 01000011 01001011 00100000 01010100 01001000
          01000101 00100000 01010000 01001100 01000001 01001110 01000101
          01010100
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
