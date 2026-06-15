'use client';

import { ReactLenis } from 'lenis/react';
import { usePrefersReducedMotion } from '@/lib/device';

const SmoothScroll = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    />
  );
};

export default SmoothScroll;
