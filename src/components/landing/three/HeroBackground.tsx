'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getGpuTier, type GpuTier } from '@/lib/device';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

// Fixed full-page particle layer: sits above section backgrounds (z-[1])
// and below all section content (z-10) so the 3D field runs through the
// entire home page instead of just the hero.
const HeroBackground = () => {
  const [tier, setTier] = useState<GpuTier>('off');
  const [ready, setReady] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [visible, setVisible] = useState(false);

  // Defer the 3D chunk until after window load + idle so it never competes
  // with first paint or blocks the main thread during page load
  useEffect(() => {
    const detectedTier = getGpuTier();
    if (detectedTier === 'off') return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const load = () => {
      if (cancelled) return;
      setTier(detectedTier);
      setReady(true);
    };

    const scheduleIdle = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(load, { timeout: 3000 });
      } else {
        timeoutId = setTimeout(load, 2000);
      }
    };

    if (document.readyState === 'complete') {
      scheduleIdle();
    } else {
      window.addEventListener('load', scheduleIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', scheduleIdle);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  // Pause rendering when the tab is hidden
  useEffect(() => {
    if (!ready) return;
    const onVisibilityChange = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [ready]);

  // Fade the canvas in after mount without any layout shift
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [ready]);

  if (tier === 'off' || !ready) return null;

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <HeroCanvas tier={tier} active={tabVisible} />
    </div>
  );
};

export default HeroBackground;
