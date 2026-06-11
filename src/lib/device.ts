'use client';

import { useEffect, useState } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsTouch(): boolean {
  return useMediaQuery('(hover: none), (pointer: coarse)');
}

export type GpuTier = 'off' | 'lite' | 'full';

export function getGpuTier(): GpuTier {
  if (typeof window === 'undefined') return 'off';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'off';

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return 'off';
  } catch {
    return 'off';
  }

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  const lowMemory =
    ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;

  if (isMobile || lowCores || lowMemory) return 'lite';

  return 'full';
}
