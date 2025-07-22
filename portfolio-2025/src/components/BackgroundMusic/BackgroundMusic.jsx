import React, { useEffect, useRef, useState } from "react";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [volume] = useState(0.5);
  const [startTime] = useState(2);
  const [showUnmuteButton, setShowUnmuteButton] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.1;
    audio.loop = true;
    audio.muted = true;

    const startPlayback = () => {
      audio.currentTime = startTime;
      audio.muted = false;
      audio.volume = volume;
      audio
        .play()
        .then(() => {
          console.log("Reproducción automática exitosa");
          setShowUnmuteButton(false);
        })
        .catch((error) => {
          console.log("Error en autoplay:", error);
          setShowUnmuteButton(true);
        });
    };
    audio
      .play()
      .then(() => {
        setTimeout(startPlayback, 1000);
      })
      .catch((error) => {
        console.log("Autoplay muteado bloqueado, intentando con carga");
        window.addEventListener("load", () => {
          startPlayback();
        });
        const retryInterval = setInterval(() => {
          audio
            .play()
            .then(() => {
              clearInterval(retryInterval);
              startPlayback();
            })
            .catch((e) => console.log("Reintento fallido:", e));
        }, 1000);
        return () => clearInterval(retryInterval);
      });
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [volume, startTime]);
  const handleUnmuteClick = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      audio.volume = volume;
      audio
        .play()
        .then(() => setShowUnmuteButton(false))
        .catch((e) => console.log("Error al desmutear:", e));
    }
  };
  return (
    <div>
      <audio ref={audioRef} preload="auto">
        <source src="/music/interstellar.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      {showUnmuteButton && (
        <button
          onClick={handleUnmuteClick}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            borderRadius: "5px",
            zIndex: 1000,
            border: "none",
            cursor: "pointer",
          }}
        >
          Activar música
        </button>
      )}
    </div>
  );
};

export default BackgroundMusic;
