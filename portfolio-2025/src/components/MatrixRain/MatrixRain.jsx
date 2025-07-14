import React, { useRef, useEffect } from "react";
import { MatrixRainEffect } from "../../Hooks/MatrixRainEffect";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  MatrixRainEffect(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 bg-black opacity-60"
    />
  );
};

export default MatrixRain;
