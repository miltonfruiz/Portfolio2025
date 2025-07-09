import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingParticles({ count = 100, radius = 2 }) {
  const meshRefs = useRef([]);
  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const r = radius * Math.sqrt(Math.random());
      const x = r * Math.cos(angle);
      const y = (Math.random() - 0.5) * 2;
      const z = r * Math.sin(angle);
      temp.push(new THREE.Vector3(x, y, z));
    }
    return temp;
  }, [count, radius]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.position.y += Math.sin(t + i) * 0.002;
        ref.rotation.y += 0.01;
      }
    });
  });

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} ref={(el) => (meshRefs.current[i] = el)} position={pos}>
          <sphereGeometry args={[0.013, 6, 6]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
