import { useEffect, useRef } from "react";

const GlitchSound = (glitchActive) => {
  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current = new Audio("/sounds/glitcherror.mp3");
    audioRef.current.volume = 0.3;
  }, []);
  useEffect(() => {
    if (glitchActive && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.error("Error de audio:", e));
    }
  }, [glitchActive]);
};

export default GlitchSound;
