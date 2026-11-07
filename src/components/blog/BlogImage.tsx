'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BlogImage({ src, alt, priority = false, className = '' }: { src: string; alt: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <Image
      src={failed ? '/og-image.png' : src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
