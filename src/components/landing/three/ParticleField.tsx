'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count: number;
  pointer: React.RefObject<{ x: number; y: number }>;
  scrollProgress: React.RefObject<number>;
  autoRotate: boolean;
}

// Brand color ramp: blue-900 -> violet-500 -> blue-400
const RAMP = [new THREE.Color('#1e3a8a'), new THREE.Color('#8b5cf6'), new THREE.Color('#60a5fa')];

const ParticleField: React.FC<ParticleFieldProps> = ({ count, pointer, scrollProgress, autoRotate }) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Random shell distribution: spherical cloud with hollow-ish center
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi) * 0.8;

      const t = Math.random();
      if (t < 0.5) {
        color.lerpColors(RAMP[0], RAMP[1], t * 2);
      } else {
        color.lerpColors(RAMP[1], RAMP[2], (t - 0.5) * 2);
      }
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const scroll = scrollProgress.current ?? 0;

    if (autoRotate) {
      group.rotation.y += delta * 0.05;
      group.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
    } else {
      const target = pointer.current ?? { x: 0, y: 0 };
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, target.x * 0.15, 0.05);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, target.y * 0.1, 0.05);
    }

    // Slow constant drift so the field never feels frozen
    group.rotation.z += delta * 0.008;

    // Subtle camera dolly across the whole page; the field stays visible
    // behind every section so the home feels like one continuous space
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6 + scroll * 1.5, 0.1);
    group.rotation.y += scroll * delta * 0.05;
    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        0.55 - scroll * 0.15,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <PointMaterial
          ref={materialRef}
          transparent
          vertexColors
          size={0.032}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.55}
        />
      </points>
    </group>
  );
};

export default ParticleField;
