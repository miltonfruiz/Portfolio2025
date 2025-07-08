// components/ReactorSmoke.jsx
import { Cloud, Clouds } from "@react-three/drei";

export const ReactorSmoke = () => {
  return (
    <Clouds material={{ transparent: true, opacity: 0.15 }}>
      <Cloud
        bounds={[2, 2, 2]}
        volume={6}
        color="#00ffff"
        fade={60}
        growth={2}
        seed={4}
        concentrate="outside"
      />
    </Clouds>
  );
};
