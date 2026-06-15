'use client';

import { motion, useMotionTemplate } from 'framer-motion';
import { useTilt } from '@/lib/useTilt';
import { useIsTouch, usePrefersReducedMotion } from '@/lib/device';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className, maxTilt = 8, glare = true }) => {
  const isTouch = useIsTouch();
  const prefersReducedMotion = usePrefersReducedMotion();
  const disabled = isTouch || prefersReducedMotion;

  const tilt = useTilt({ maxTilt, disabled });

  const glareBackground = useMotionTemplate`radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.12), transparent 60%)`;

  return (
    <div className="h-full [perspective:1000px]">
      <motion.div
        ref={tilt.ref}
        className={`relative h-full [transform-style:preserve-3d] ${className ?? ''}`}
        style={disabled ? undefined : { rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        whileHover={disabled ? undefined : { scale: tilt.scale }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
      >
        {children}
        {glare && !disabled && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: glareBackground }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
