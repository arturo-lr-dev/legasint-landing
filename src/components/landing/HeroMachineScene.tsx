'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Edges, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

type HeroMachineSceneProps = {
  processIndex: number;
  step: number;
  active: boolean;
  onReady: () => void;
};

const sceneCopy = [
  { colors: ['#60a5fa', '#8b5cf6', '#22d3ee'] },
  { colors: ['#8b5cf6', '#60a5fa', '#818cf8'] },
  { colors: ['#22d3ee', '#60a5fa', '#8b5cf6'] },
];

function ResponsiveCamera() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  useEffect(() => {
    camera.zoom = size.width < 600 ? 38 : size.width < 900 ? 54 : 72;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

function DocumentBlock({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <RoundedBox args={[1.35, 0.16, 1.55]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color={color} roughness={0.48} metalness={0.12} />
        <Edges color="#f5f7fa" threshold={25} />
      </RoundedBox>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.82, 0.025, 0.82]} />
        <meshStandardMaterial color="#f5f7fa" transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

function Machine({ processIndex, step, active }: Omit<HeroMachineSceneProps, 'onReady'>) {
  const root = useRef<THREE.Group>(null);
  const documents = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  const processingBars = useRef<THREE.Group>(null);
  const copy = sceneCopy[processIndex];

  useFrame(({ clock, pointer }, delta) => {
    if (!active || !root.current || !documents.current) return;

    const targetX = [3.8, 1.75, 0.55, -3.3][step];
    const targetScale = [1, 1, 0.45, 1][step];
    documents.current.position.x = THREE.MathUtils.damp(documents.current.position.x, targetX, 3.8, delta);
    const scale = THREE.MathUtils.damp(documents.current.scale.x, targetScale, 4.5, delta);
    documents.current.scale.setScalar(scale);

    documents.current.children.forEach((document, index) => {
      const targetY = step === 0 ? 0.82 + index * 0.28 : step === 3 ? 1.4 + index * 0.24 : 0.82;
      const targetZ = step === 0 ? -0.82 + index * 0.82 : step === 1 ? (index - 1) * 0.18 : step === 2 ? 0 : 0.4 + index * 0.18;
      document.position.y = THREE.MathUtils.damp(document.position.y, targetY, 4.5, delta);
      document.position.z = THREE.MathUtils.damp(document.position.z, targetZ, 4.5, delta);
      document.rotation.y = THREE.MathUtils.damp(document.rotation.y, step === 0 ? (index - 1) * 0.2 : 0, 4.5, delta);
      document.rotation.z = THREE.MathUtils.damp(document.rotation.z, step === 0 ? (index - 1) * 0.12 : 0, 4.5, delta);
    });

    if (screen.current) {
      const intensity = [0.16, 0.35, 0.9, 0.48][step];
      screen.current.emissiveIntensity = THREE.MathUtils.damp(screen.current.emissiveIntensity, intensity, 5, delta);
    }

    processingBars.current?.children.forEach((bar, index) => {
      const target = step === 2 ? 0.8 + Math.sin(clock.elapsedTime * 5 + index) * 0.25 : step === 3 ? 1 : 0.35;
      bar.scale.y = THREE.MathUtils.damp(bar.scale.y, target, 6, delta);
    });

    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, -0.32 + pointer.x * 0.12, 0.055);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -0.08 - pointer.y * 0.045, 0.055);
  });

  return (
    <group ref={root} position={[0.4, -0.6, 0]} rotation={[-0.08, -0.32, 0]}>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[8.6, 0.28, 2.8]} />
        <meshStandardMaterial color="#253354" roughness={0.62} metalness={0.32} />
      </mesh>

      {Array.from({ length: 9 }, (_, index) => (
        <mesh key={index} position={[-3.6 + index * 0.9, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2.35, 16]} />
          <meshStandardMaterial color={index % 2 ? '#2563eb' : '#7c3aed'} roughness={0.45} metalness={0.35} />
        </mesh>
      ))}

      <group ref={documents} position={[3.8, 0, 0]}>
        {copy.colors.map((color, index) => (
          <DocumentBlock key={color} position={[0, 0.82 + index * 0.28, -0.82 + index * 0.82]} color={color} />
        ))}
      </group>

      <group position={[0, 1.35, 0]}>
        <RoundedBox args={[2.15, 2.5, 2.25]} radius={0.14} smoothness={4}>
          <meshStandardMaterial color="#253354" roughness={0.35} metalness={0.45} />
          <Edges color="#8b5cf6" threshold={20} />
        </RoundedBox>
        <mesh position={[0, 0.15, 1.14]}>
          <boxGeometry args={[1.48, 0.92, 0.08]} />
          <meshStandardMaterial ref={screen} color="#2563eb" emissive="#2563eb" emissiveIntensity={0.2} roughness={0.3} />
        </mesh>
        <group ref={processingBars}>
          {[-0.36, 0, 0.36].map((y, index) => (
            <mesh key={y} position={[-0.48 + index * 0.48, 0.15, 1.2]}>
              <boxGeometry args={[0.22, 0.56 - index * 0.1, 0.06]} />
              <meshStandardMaterial color={index === 1 ? '#22d3ee' : '#f5f7fa'} />
            </mesh>
          ))}
        </group>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[1.35, 0.18, 1.35]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.42} />
        </mesh>
      </group>

      <ContactShadows position={[0, -0.12, 0]} opacity={0.5} scale={13} blur={2.2} far={6} resolution={256} frames={1} color="#050816" />
    </group>
  );
}

export default function HeroMachineScene({ processIndex, step, active, onReady }: HeroMachineSceneProps) {
  return (
    <Canvas
      orthographic
      camera={{ position: [7, 5, 8], zoom: 54, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={onReady}
      aria-hidden="true"
    >
      <ResponsiveCamera />
      <ambientLight intensity={1.6} />
      <directionalLight position={[5, 8, 6]} intensity={2.8} color="#f5f7fa" />
      <directionalLight position={[-5, 3, 2]} intensity={1.4} color="#8b5cf6" />
      <directionalLight position={[0, 4, 8]} intensity={1.3} color="#c3cbdd" />
      <pointLight position={[2, 2, 4]} intensity={20} color="#60a5fa" distance={12} />
      <Machine processIndex={processIndex} step={step} active={active} />
    </Canvas>
  );
}
