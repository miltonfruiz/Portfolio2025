import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import {
  OrbitControls,
  shaderMaterial,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Color } from "three";

// -------------- Scanline shader
const ScanlineMaterial = shaderMaterial(
  { time: 0, color: new Color("#00ffff") },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  `
    varying vec2 vUv;
    uniform float time;
    uniform vec3 color;
    void main() {
      float line = step(0.95, fract(vUv.y * 40.0 + time*5.0));
      gl_FragColor = vec4(color, line * 0.07);
    }
  `
);
extend({ ScanlineMaterial });

// -------------- Reactor Rings
const ReactorRings = ({ active }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (active && groupRef.current) {
      groupRef.current.rotation.z += 0.003;
      groupRef.current.rotation.y += 0.002;
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
            emissiveIntensity={0.6}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// -------------- Sparks
const Sparks = ({ active }) => {
  const positions = useMemo(
    () =>
      new Float32Array(
        Array.from({ length: 200 }, () => (Math.random() - 0.5) * 4)
      ),
    []
  );

  return (
    <Points positions={positions} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffea00"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={active ? 0.7 : 0}
      />
    </Points>
  );
};

// -------------- Scanlines Overlay
const ScanlinesOverlay = () => {
  const scanlineRef = useRef();

  useFrame((state) => {
    if (scanlineRef.current) {
      scanlineRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <scanlineMaterial ref={scanlineRef} />
    </mesh>
  );
};

// -------------- Main Reactor
const ReactorCore3D = ({ finalStage }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* background */}
        <color attach="background" args={["#05010f"]} />

        {/* luces */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#00ffff" />
        <pointLight position={[0, 0, -5]} intensity={1} color="#ff00ff" />

        {/* núcleo */}
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial
            emissive="#00ffff"
            emissiveIntensity={finalStage ? 5 : 0}
            color="#111"
          />
        </mesh>

        {/* anillos */}
        <ReactorRings active={finalStage} />

        {/* sparks */}
        <Sparks active={finalStage} />

        {/* scanlines */}
        <ScanlinesOverlay />

        {/* bloom */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={1.5}
          />
        </EffectComposer>

        {/* controles para debug */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default ReactorCore3D;
