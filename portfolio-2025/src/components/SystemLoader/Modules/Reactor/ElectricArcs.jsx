import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const ElectricArcs = ({ count = 6, radius = 1.5 }) => {
  const lineRefs = useRef([]);

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
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <line key={i}>
          <bufferGeometry
            ref={(el) => (lineRefs.current[i] = el)}
            attach="geometry"
          />
          <lineBasicMaterial color="#ffff00" transparent opacity={0.8} />
        </line>
      ))}
    </group>
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
  const segments = 10;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pos = new THREE.Vector3().lerpVectors(start, end, t);
    pos.x += (Math.random() - 0.5) * 0.1;
    pos.y += (Math.random() - 0.5) * 0.1;
    pos.z += (Math.random() - 0.5) * 0.1;
    points.push(pos);
  }

  return points;
}
