import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  index?: number;
  className?: string;
}

export default function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
