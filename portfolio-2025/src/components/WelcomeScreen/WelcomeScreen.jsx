import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTerminal, FaMoon } from "react-icons/fa";
import "./WelcomeScreen.css";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const buttonBaseClasses =
    "flex items-center justify-center gap-3 w-full md:w-64 px-8 py-4 rounded-none font-mono font-bold transition-all duration-200 border-2 hover:-translate-y-0.5 focus:outline-none";
  const handleAccess = (type) => {
    console.log(`[SYSTEM] Access: ${type.toUpperCase()}`);
    if (type === "login") navigate("/auth");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-dark p-4 crt-container">
      <div className="scanlines" />
      <div className="crt-overlay" />
      <div className="crt-curvature" />
      <div className="relative z-10 text-center mb-12">
        <div className="font-mono text-cyber-primary text-sm md:text-base mb-2 tracking-widest">
          [root@portfolio ~]$ run miltonfruiz.exe
          <span className="ml-2 animate-terminal-blink">_</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-cyber-primary tracking-tighter">
          $ ./bienvenid@.sh
        </h1>
        <h1 className="text-2xl md:text-base font-mono italic text-cyber-accent mt-6 mb-8">
          # ¿Est@s listo?
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg z-10">
        <button
          onClick={() => handleAccess("login")}
          className={`${buttonBaseClasses} border-cyber-primary text-cyber-primary shadow-hacker-glow`}
          aria-label="Iniciar sesión"
        >
          <FaTerminal className="text-cyber-primary animate-pulse" />
          <span className="text-sm">ACCEDER</span>
        </button>

        <button
          onClick={() => handleAccess("guest")}
          className={`${buttonBaseClasses} border-cyber-secondary text-cyber-secondary shadow-hacker-glow-blue`}
          aria-label="Modo invitado"
        >
          <FaMoon className="text-cyber-secondary" />
          <span className="text-sm">SUSPENDER</span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-black border-t border-cyber-primary text-cyber-code text-xs font-mono px-4 py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          SYSTEM READY • [USER: miltonfruiz] • LOADING TERMINAL: 100% • MEMORY:
          64GB • CPU: 12TH GEN i9 • GPU: RTX 4090 • [###-------] 30%
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
