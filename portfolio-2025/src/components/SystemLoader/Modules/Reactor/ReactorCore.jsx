import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { FloatingParticles } from "./FloatingParticles";
import CoreSphere from "./CoreSphere";

const ReactorCore = ({ finalStage }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[0, 0, -5]} intensity={1} color="#ff00ff" />
        <CoreSphere active={finalStage} />
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

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ReactorCore;
