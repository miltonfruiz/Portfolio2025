import React, { useState, useEffect, useRef } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.6);
  const [startTime] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.loop = true;
    const handlePlay = () => {
      const onLoaded = () => {
        audio.currentTime = startTime;
        audio
          .play()
          .then(() => console.log("Reproducción automática exitosa"))
          .catch((error) => console.log("Error en autoplay:", error));
      };
      if (audio.readyState > 0) {
        onLoaded();
      } else {
        audio.addEventListener("loadedmetadata", onLoaded, { once: true });
      }
    };
    const attemptAutoplay = () => {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          audio.volume = volume;
          handlePlay();
        })
        .catch((error) => {
          console.log(
            "Autoplay silenciado bloqueado, intentando con interacción"
          );
          const enableAudio = () => {
            audio.volume = volume;
            handlePlay();
            document.removeEventListener("click", enableAudio);
            document.removeEventListener("touchstart", enableAudio);
          };
          document.addEventListener("click", enableAudio);
          document.addEventListener("touchstart", enableAudio);
        });
    };
    attemptAutoplay();
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("loadedmetadata", handlePlay);
      }
    };
  }, [volume, startTime]);
  return (
    <audio ref={audioRef} preload="auto">
      <source src="/music/background.mp3" type="audio/mpeg" />
      Tu navegador no soporta el elemento de audio.
    </audio>
  );
};

export default BackgroundMusic;
