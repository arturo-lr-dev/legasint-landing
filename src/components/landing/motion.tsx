'use client';

import { createElement, type ElementType, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { dispatchStagger, dispatchStaggerItem, dispatchViewport } from '@/lib/animations';
import { useHydrated, usePrefersReducedMotion } from '@/lib/device';

export function useMotionEnabled(): boolean {
  const hydrated = useHydrated();
  const reducedMotion = usePrefersReducedMotion();
  return hydrated && !reducedMotion;
}

type StaggerTag = 'ul' | 'ol' | 'li' | 'div' | 'section' | 'article';

const motionTags: Record<StaggerTag, ElementType> = {
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  div: motion.div,
  section: motion.section,
  article: motion.article,
};

type StaggerGroupProps = {
  as?: StaggerTag;
  className?: string;
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
};

export function StaggerGroup({ as = 'div', className, children, stagger = 0.09, delayChildren = 0.1 }: StaggerGroupProps) {
  const enabled = useMotionEnabled();

  if (!enabled) {
    return createElement(as, { className }, children);
  }

  return createElement(
    motionTags[as],
    {
      className,
      variants: dispatchStagger(stagger, delayChildren),
      initial: 'hidden',
      whileInView: 'visible',
      viewport: dispatchViewport,
    },
    children
  );
}

type StaggerItemProps = {
  as?: StaggerTag;
  className?: string;
  id?: string;
  children: ReactNode;
};

export function StaggerItem({ as = 'div', className, id, children }: StaggerItemProps) {
  const enabled = useMotionEnabled();

  if (!enabled) {
    return createElement(as, { className, id }, children);
  }

  return createElement(motionTags[as], { className, id, variants: dispatchStaggerItem }, children);
}
