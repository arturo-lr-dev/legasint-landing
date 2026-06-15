'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingGeometryProps {
  pointer: React.RefObject<{ x: number; y: number }>;
}

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({ pointer }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const target = pointer.current ?? { x: 0, y: 0 };
    // Counter-rotate slightly against the particle field for depth
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, -target.x * 0.08, 0.04);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -target.y * 0.06, 0.04);
    group.rotation.z += delta * 0.01;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-3.2, 1.4, -2]}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.14} />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.8} floatIntensity={1}>
        <mesh position={[3.4, -1.2, -1.5]}>
          <torusGeometry args={[0.9, 0.28, 12, 36]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.12} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.4}>
        <mesh position={[2.2, 2, -3]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

export default FloatingGeometry;
