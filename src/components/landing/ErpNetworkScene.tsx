'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Edges, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const modulePositions = Array.from({ length: 6 }, (_, index) => {
  const angle = (index / 6) * Math.PI * 2;
  return {
    position: new THREE.Vector3(Math.cos(angle) * 3.5, 0.9, Math.sin(angle) * 3.5),
    color: index % 3 === 0 ? '#60a5fa' : index % 3 === 1 ? '#8b5cf6' : '#22d3ee',
  };
});

function Connection({ target }: { target: THREE.Vector3 }) {
  const start = new THREE.Vector3(0, 0.9, 0);
  const direction = target.clone().sub(start);
  const midpoint = start.clone().add(target).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.035, 0.035, direction.length(), 8]} />
      <meshStandardMaterial color="#60a5fa" transparent opacity={0.55} />
    </mesh>
  );
}

function Network({ active }: { active: boolean }) {
  const root = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Group[]>([]);
  const startedAt = useRef(0);

  useFrame(({ clock, pointer }) => {
    if (!active || !root.current) return;
    if (!startedAt.current) startedAt.current = clock.elapsedTime;
    const progress = Math.min((clock.elapsedTime - startedAt.current) / 2.2, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    nodes.current.forEach((node, index) => {
      if (!node) return;
      const target = modulePositions[index].position;
      node.position.lerpVectors(new THREE.Vector3(0, 0.9, 0), target, eased);
      node.scale.setScalar(0.35 + eased * 0.65);
    });

    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, -0.2 + pointer.x * 0.16, 0.05);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -0.08 - pointer.y * 0.05, 0.05);
  });

  return (
    <group ref={root} position={[0, -0.5, 0]} rotation={[-0.08, -0.2, 0]}>
      {modulePositions.map((module, index) => <Connection key={index} target={module.position} />)}
      <RoundedBox position={[0, 0.9, 0]} args={[2.1, 1.8, 2.1]} radius={0.14} smoothness={4}>
        <meshStandardMaterial color="#253354" roughness={0.35} metalness={0.4} />
        <Edges color="#8b5cf6" threshold={20} />
      </RoundedBox>
      <mesh position={[0, 0.9, 1.08]}>
        <boxGeometry args={[1.35, 0.8, 0.08]} />
        <meshStandardMaterial color="#2563eb" emissive="#2563eb" emissiveIntensity={0.45} />
      </mesh>
      {[-0.36, 0, 0.36].map((x, index) => (
        <mesh key={x} position={[x, 0.9, 1.14]}>
          <boxGeometry args={[0.18, 0.48 + index * 0.12, 0.05]} />
          <meshStandardMaterial color={index === 1 ? '#22d3ee' : '#f5f7fa'} />
        </mesh>
      ))}
      {modulePositions.map((module, index) => (
        <group
          key={index}
          ref={(node) => {
            if (node) nodes.current[index] = node;
          }}
          position={[0, 0.9, 0]}
        >
          <RoundedBox args={[1.15, 0.52, 1.15]} radius={0.07} smoothness={3}>
            <meshStandardMaterial color={module.color} roughness={0.45} metalness={0.15} />
            <Edges color="#f5f7fa" threshold={25} />
          </RoundedBox>
        </group>
      ))}
      <ContactShadows position={[0, -0.1, 0]} opacity={0.45} scale={12} blur={2.2} far={6} resolution={256} frames={1} color="#050816" />
    </group>
  );
}

function ResponsiveCamera() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const width = size.width;
  camera.zoom = width < 600 ? 42 : 60;
  camera.updateProjectionMatrix();
  return null;
}

export default function ErpNetworkScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      orthographic
      camera={{ position: [7, 5, 8], zoom: 60, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={onReady}
      aria-hidden="true"
    >
      <ResponsiveCamera />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 8, 6]} intensity={2.6} color="#f5f7fa" />
      <directionalLight position={[-4, 3, 2]} intensity={1.3} color="#8b5cf6" />
      <pointLight position={[2, 2, 4]} intensity={18} color="#60a5fa" distance={12} />
      <Network active={active} />
    </Canvas>
  );
}
