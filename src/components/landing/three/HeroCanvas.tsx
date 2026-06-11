'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';
import { useIsTouch, type GpuTier } from '@/lib/device';

interface HeroCanvasProps {
  tier: Exclude<GpuTier, 'off'>;
  active: boolean;
}

const HeroCanvas: React.FC<HeroCanvasProps> = ({ tier, active }) => {
  const isTouch = useIsTouch();

  // Per-frame inputs live in refs so pointer/scroll never trigger React renders
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.current = Math.min(Math.max(window.scrollY / max, 0), 1);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 55 }}
      frameloop={active ? 'always' : 'never'}
      style={{ pointerEvents: 'none' }}
    >
      <AdaptiveDpr pixelated />
      <ParticleField
        count={tier === 'full' ? 1100 : 450}
        pointer={pointer}
        scrollProgress={scrollProgress}
        autoRotate={isTouch}
      />
      {tier === 'full' && <FloatingGeometry pointer={pointer} />}
    </Canvas>
  );
};

export default HeroCanvas;
