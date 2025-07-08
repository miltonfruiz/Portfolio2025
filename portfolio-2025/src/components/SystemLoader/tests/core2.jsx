import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const ReactorRings = ({ active }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (active) {
      groupRef.current.rotation.z += 0.005;
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {[0.5, 0.8, 1.2, 1.6].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

const ReactorCore3D = ({ finalStage }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* luces */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[0, 0, -5]} intensity={1} color="#ff00ff" />

        {/* núcleo */}
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial
            emissive="#00ffff"
            emissiveIntensity={5}
            color="#222"
          />
        </mesh>

        {/* anillos con animación */}
        <ReactorRings active={finalStage} />

        {/* bloom */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={1.5}
          />
        </EffectComposer>

        {/* OrbitControls para debug */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ReactorCore3D;
