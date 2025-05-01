/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          primary: "#00ff9d", // Verde neón
          secondary: "#00b8ff", // Azul neón
          accent: "#ff009d", // Rosa neón
          dark: "#0a0a0a", // Fondo negro
          code: "#0fff50", // Verde terminal
        },
      },
      boxShadow: {
        "hacker-glow": "0 0 10px #00ff9d, 0 0 20px rgba(0, 255, 157, 0.5)",
        "hacker-glow-pink": "0 0 10px #ff009d, 0 0 20px rgba(255, 0, 157, 0.5)",
      },
      animation: {
        "terminal-blink": "blink 1s step-end infinite",
        scanline: "scanline 8s linear infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
};
