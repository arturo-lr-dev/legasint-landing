'use client';

import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface UseTiltOptions {
  maxTilt?: number;
  scale?: number;
  disabled?: boolean;
}

interface UseTiltResult {
  ref: React.RefObject<HTMLDivElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  glareX: MotionValue<number>;
  glareY: MotionValue<number>;
  scale: number;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
}

export function useTilt({ maxTilt = 8, scale = 1.02, disabled = false }: UseTiltOptions = {}): UseTiltResult {
  const ref = useRef<HTMLDivElement>(null);

  // Normalized pointer position within the card, -0.5..0.5
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, { stiffness: 150, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Glare position in percent for the radial gradient
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || event.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return {
    ref,
    rotateX,
    rotateY,
    glareX,
    glareY,
    scale: disabled ? 1 : scale,
    onPointerMove,
    onPointerLeave,
  };
}
