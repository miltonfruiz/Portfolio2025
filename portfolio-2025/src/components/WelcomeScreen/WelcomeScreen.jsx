import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const buttonBaseClasses =
    "flex items-center justify-center gap-3 w-full md:w-56 px-8 py-3 rounded-xl font-bold transition-all duration-500 border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const buttonVariants = {
    yes: "bg-onyx text-gold-light border-gold-light hover:shadow-gold-glow hover:-translate-y-1",
    no: "bg-onyx text-platinum border-platinum hover:shadow-platinum-glow hover:-translate-y-1",
  };
  const handleResponse = (response) => {
    console.log(`Respuesta: ${response}`);
    if (response === "yes") {
      navigate("/auth");
    } else {
      document.querySelector("h1").classList.add("animate-shake");
      setTimeout(() => {
        document.querySelector("h1").classList.remove("animate-shake");
      }, 500);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/939494/neon-grid.png')] opacity-20"></div>

      <h1 className="text-5xl md:text-6xl font-bold text-center text-gold-light mb-12 z-10 animate-neon-pulse">
        ¿Estás list@ para esto?
      </h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg z-10">
        <button
          onClick={() => handleResponse("yes")}
          className={`${buttonBaseClasses} ${buttonVariants.yes}`}
          aria-label="Sí, continuar"
        >
          <FaCheck className="w-5 h-5 text-gold-light animate-pulse" />
          <span className="text-gold-light">Sí</span>
        </button>

        <button
          onClick={() => handleResponse("no")}
          className={`${buttonBaseClasses} ${buttonVariants.no}`}
          aria-label="No, cancelar"
        >
          <FaTimes className="w-5 h-5 text-platinum" />
          <span className="text-platinum">No</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
