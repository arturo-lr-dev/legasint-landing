'use client';

import { GA_EVENTS, trackOutboundContact } from '@/lib/analytics';
import { homeCopy, type Locale } from '@/i18n/home-copy';

export default function DiagnosticAside({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].diagnostic;
  const message = locale === 'es'
    ? 'Hola Arturo, me gustaría solicitar un diagnóstico gratuito de 30 minutos sobre un proceso de mi empresa.'
    : 'Hi Arturo, I would like to request a free 30-minute assessment about a process in my company.';
  const url = `https://wa.me/34649355701?text=${encodeURIComponent(message)}`;

  return (
    <aside className="dispatch-diagnostic-aside" aria-labelledby="diagnostic-aside-title">
      <h2 id="diagnostic-aside-title">{copy.title}</h2>
      <ul>
        {copy.items.map((item) => (
          <li key={item}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
      <a
        href={url}
        onClick={(event) => {
          event.preventDefault();
          trackOutboundContact(url, GA_EVENTS.WHATSAPP_CLICK, 'home_diagnostic_aside');
        }}
      >
        {copy.directLabel}
      </a>
    </aside>
  );
}
