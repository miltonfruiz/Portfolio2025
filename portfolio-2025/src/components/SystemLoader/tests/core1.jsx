import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Torus, Sphere, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Reactor3D({ active = false }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <color attach="background" args={["#05010f"]} />
        <ambientLight intensity={0.2} />
        <pointLight
          position={[0, 0, 0]}
          intensity={active ? 5 : 0.5}
          color={"#00ffff"}
        />

        <ReactorCore active={active} />
        <ReactorRings active={active} />

        {/* efectos de glow */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>

        <Stars
          radius={30}
          depth={60}
          count={2000}
          factor={2}
          saturation={0}
          fade
        />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

function ReactorCore({ active }) {
  const coreRef = useRef();

  useFrame(({ clock }) => {
    const scale = active ? 1 + Math.sin(clock.getElapsedTime() * 3) * 0.1 : 1;
    coreRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Sphere ref={coreRef} args={[0.5, 32, 32]}>
      <meshStandardMaterial
        color={active ? "#00ffff" : "#333"}
        emissive={active ? "#00ffff" : "#111"}
        emissiveIntensity={active ? 1 : 0.1}
      />
    </Sphere>
  );
}

function ReactorRings({ active }) {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame(({ clock }) => {
    if (active) {
      ring1.current.rotation.z = clock.getElapsedTime() * 0.5;
      ring2.current.rotation.x = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <>
      <Torus ref={ring1} args={[1, 0.02, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={"#00ffff"}
          emissive={"#00ffff"}
          emissiveIntensity={0.5}
        />
      </Torus>
      <Torus ref={ring2} args={[1.3, 0.02, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={"#00ffff"}
          emissive={"#00ffff"}
          emissiveIntensity={0.5}
        />
      </Torus>
    </>
  );
}
