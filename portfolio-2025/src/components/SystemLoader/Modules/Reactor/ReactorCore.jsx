// ReactorCore.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useSpring, a } from "@react-spring/three";

import { FloatingParticles } from "./FloatingParticles";

const CoreSphere = ({ active }) => {
  const { emissiveIntensity } = useSpring({
    emissiveIntensity: active ? 5 : 0.1,
    config: { mass: 1, tension: 280, friction: 30 },
  });

  return (
    <a.mesh>
      <sphereGeometry args={[0.13, 32, 32]} />
      <a.meshStandardMaterial
        color="#222"
        emissive="#00ffff"
        emissiveIntensity={emissiveIntensity}
      />
    </a.mesh>
  );
};

const ReactorCore = ({ finalStage }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[0, 0, -5]} intensity={1} color="#ff00ff" />

        {/* Núcleo animado */}
        <CoreSphere active={finalStage} />

        {/* Efectos visuales si está encendido */}
        {finalStage && (
          <>
            <FloatingParticles />
            <EffectComposer>
              <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                intensity={1.5}
              />
            </EffectComposer>
          </>
        )}

        {/* OrbitControls solo debug */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ReactorCore;
