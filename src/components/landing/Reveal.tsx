'use client';

import { createElement, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { dispatchEase, dispatchViewport } from '@/lib/animations';
import { useHydrated, usePrefersReducedMotion } from '@/lib/device';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  index?: number;
  y?: number;
  as?: 'div' | 'article';
  id?: string;
  className?: string;
}

export default function Reveal({ children, className, as = 'div', id, delay = 0, y = 28 }: RevealProps) {
  const hydrated = useHydrated();
  const reducedMotion = usePrefersReducedMotion();

  if (!hydrated || reducedMotion) {
    return createElement(as, { className, id }, children);
  }

  return createElement(
    motion[as],
    {
      className,
      id,
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: dispatchViewport,
      transition: { duration: 0.7, delay, ease: dispatchEase },
    },
    children
  );
}
