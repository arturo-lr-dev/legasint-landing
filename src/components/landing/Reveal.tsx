'use client';

import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { useIsMobile, usePrefersReducedMotion } from '@/lib/device';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  index?: number;
  className?: string;
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0, index = 0, className }) => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = isMobile
    ? index % 2 === 0
      ? fadeInLeft
      : fadeInRight
    : fadeInUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.15, margin: '0px 0px 50px 0px' }}
      variants={variants}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
