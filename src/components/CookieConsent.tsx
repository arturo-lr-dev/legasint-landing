'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { setConsent } from '@/lib/analytics';

const CONSENT_KEY = 'legasint_cookie_consent';

const copy = {
  es: {
    title: 'Usamos cookies para mejorar tu experiencia',
    description:
      'Utilizamos cookies propias y de terceros (Google Analytics, Google Ads) para analizar el tráfico y medir el rendimiento de nuestras campañas. Puedes aceptar o rechazar su uso.',
    moreInfo: 'Más información',
    deny: 'Rechazar',
    accept: 'Aceptar cookies',
  },
  en: {
    title: 'We use cookies to improve your experience',
    description:
      'We use our own and third-party cookies (Google Analytics, Google Ads) to analyse traffic and measure the performance of our campaigns. You can accept or reject their use.',
    moreInfo: 'More information',
    deny: 'Reject',
    accept: 'Accept cookies',
  },
};

export default function CookieConsent() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/en') ? 'en' : 'es';
  const t = copy[locale];
  const privacyHref = locale === 'en' ? '/privacy-policy' : '/politica-de-privacidad';

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === 'granted') {
        grantConsent();
      } else if (stored !== 'denied') {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (e.g. private mode)
      setVisible(true);
    }
  }, []);

  const grantConsent = () => {
    setConsent('update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  };

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'granted');
    } catch {
      // ignore
    }
    grantConsent();
    setVisible(false);
  };

  const handleDeny = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'denied');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[100] px-2 pt-2 pb-[calc(0.5rem_+_env(safe-area-inset-bottom))] md:px-6 md:pt-6 md:pb-[calc(1.5rem_+_env(safe-area-inset-bottom))]"
          role="dialog"
          aria-live="polite"
          aria-label={locale === 'en' ? 'Cookie preferences' : 'Preferencias de cookies'}
        >
          <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm md:text-base mb-1">{t.title}</p>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                {t.description}{' '}
                <a
                  href={privacyHref}
                  className="text-blue-300 hover:text-white underline underline-offset-2 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  {t.moreInfo}
                </a>
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-row flex-wrap gap-2 sm:gap-3 md:w-auto">
              <button
                onClick={handleDeny}
                className="flex-1 whitespace-nowrap rounded-xl border border-white/20 px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-5 sm:text-sm md:flex-none"
              >
                {t.deny}
              </button>
              <button
                onClick={handleAccept}
                className="brand-button-primary flex-1 whitespace-nowrap rounded-xl px-3 py-2.5 text-xs font-semibold text-white transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-5 sm:text-sm md:flex-none"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
