import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

export const ElectricArcs = ({ count = 6, radius = 0.5, active = false }) => {
  const lineRefs = useRef([]);
  const { scale, opacity } = useSpring({
    scale: active ? 0.7 : 0.2,
    opacity: active ? 0.6 : 0,
    config: { mass: 1, tension: 300, friction: 40 },
  });

  useFrame(() => {
    lineRefs.current.forEach((ref, i) => {
      if (ref && ref.isBufferGeometry) {
        const newPoints = generateArcPoints(radius);
        const newGeometry = new THREE.BufferGeometry().setFromPoints(newPoints);
        ref.copy(newGeometry);
      }
    });
  });

  return (
    <a.group scale={scale}>
      {Array.from({ length: count }).map((_, i) => (
        <line key={i}>
          <bufferGeometry
            ref={(el) => (lineRefs.current[i] = el)}
            attach="geometry"
          />
          <a.lineBasicMaterial
            //color="#00ffff"
            color="#ffff00"
            transparent
            opacity={opacity}
            linewidth={1}
          />
        </line>
      ))}
    </a.group>
  );
};
function generateArcPoints(radius) {
  const start = new THREE.Vector3(
    (Math.random() - 0.5) * radius,
    (Math.random() - 0.5) * radius,
    (Math.random() - 0.5) * radius
  );
  const end = new THREE.Vector3(
    (Math.random() - 0.5) * radius,
    (Math.random() - 0.5) * radius,
    (Math.random() - 0.5) * radius
  );
  const points = [];
  const segments = 12;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pos = new THREE.Vector3().lerpVectors(start, end, t);
    pos.x += (Math.random() - 0.5) * 0.08;
    pos.y += (Math.random() - 0.5) * 0.08;
    pos.z += (Math.random() - 0.5) * 0.08;
    points.push(pos);
  }

  return points;
}
