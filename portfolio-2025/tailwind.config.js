/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "bad-signal": ["Bad Signal", "monospace"],
        quakerhack: ["Quakerhack", "monospace"],
        montserrat: ["Montserrat", "sans-serif"],
        hacker: ["Hacker", "sans-serif"],
      },
      colors: {
        cyber: {
          primary: "#00ff9d",
          secondary: "#00b8ff",
          accent: "#ff009d",
          dark: "#0a0a0a",
          code: "#0fff50",
          glow: "rgba(0, 255, 157, 0.07)",
        },
        red: {
          500: "#ff0000",
        },
      },
      boxShadow: {
        "hacker-glow": "0 0 10px #00ff9d, 0 0 20px rgba(0, 255, 157, 0.5)",
        "hacker-glow-blue": "0 0 10px #00b8ff, 0 0 20px rgba(0, 184, 255, 0.5)",
      },
      animation: {
        "terminal-blink": "blink 1s step-end infinite",
        scanline: "scanline 6s linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
