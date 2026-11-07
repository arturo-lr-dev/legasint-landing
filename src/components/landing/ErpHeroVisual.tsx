'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'framer-motion';
import { getGpuTier, type GpuTier } from '@/lib/device';
import type { Locale } from '@/i18n/home-copy';

const NetworkScene = dynamic(() => import('./ErpNetworkScene'), { ssr: false, loading: () => null });

const modules = {
  es: ['Ventas', 'Compras', 'Almacén', 'Producción', 'RRHH', 'Finanzas'],
  en: ['Sales', 'Purchasing', 'Inventory', 'Production', 'HR', 'Finance'],
};

export default function ErpHeroVisual({ locale }: { locale: Locale }) {
  const [gpuTier, setGpuTier] = useState<GpuTier>('off');
  const [sceneReady, setSceneReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: '160px' });

  useEffect(() => {
    setGpuTier(getGpuTier());
  }, []);

  return (
    <div ref={rootRef} className="dispatch-erp-network">
      <div className="dispatch-erp-network__viewport" aria-hidden="true">
        {!sceneReady && (
          <div className="dispatch-erp-network__fallback">
            <span>ERP</span>
          </div>
        )}
        {gpuTier !== 'off' && <NetworkScene active={inView} onReady={() => setSceneReady(true)} />}
      </div>
      <ul className="dispatch-erp-network__modules" aria-label={locale === 'es' ? 'Módulos conectados' : 'Connected modules'}>
        {modules[locale].map((module, index) => (
          <li key={module}>
            <span>{`0${index + 1}`}</span>
            {module}
          </li>
        ))}
      </ul>
    </div>
  );
}
