import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const buttonBaseClasses =
    "w-full md:w-48 px-6 py-2 rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const buttonVariantClasses = {
    guest: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    user: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    admin: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  const handleButtonClick = (role) => {
    console.log(`Rol seleccionado: ${role}`);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8 animate-fade-in">
        ¿Estás listo para esto?
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full max-w-md">
        <button
          onClick={() => handleButtonClick("guest")}
          className={`${buttonBaseClasses} ${buttonVariantClasses.guest}`}
          aria-label="Acceder como invitado"
        >
          Invitado
        </button>
        <button
          onClick={() => handleButtonClick("user")}
          className={`${buttonBaseClasses} ${buttonVariantClasses.user}`}
          aria-label="Acceder como usuario"
        >
          Usuario
        </button>
        <button
          onClick={() => handleButtonClick("admin")}
          className={`${buttonBaseClasses} ${buttonVariantClasses.admin}`}
          aria-label="Acceder como administrador"
        >
          Administrador
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
