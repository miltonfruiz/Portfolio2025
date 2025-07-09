import { useSpring, a, config } from "@react-spring/three";

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

export default CoreSphere;
