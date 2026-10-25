'use client';

import { GA_EVENTS, trackEvent, trackOutboundContact } from '@/lib/analytics';
import { homeCopy, type Locale } from '@/i18n/home-copy';
import HeroProcessVisual from './HeroProcessVisual';

export default function AnimatedLanding({ locale = 'es' }: { locale?: Locale }) {
  const t = homeCopy[locale].hero;
  const whatsappMessage = locale === 'es'
    ? 'Hola Arturo, me gustaría solicitar un diagnóstico gratuito de 30 minutos sobre un proceso de mi empresa.'
    : 'Hi Arturo, I would like to request a free 30-minute assessment about a process in my company.';
  const whatsappUrl = `https://wa.me/34649355701?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      className="relative overflow-hidden px-4 pb-16 pt-32 sm:pt-36 lg:flex lg:h-[100svh] lg:min-h-[720px] lg:items-center lg:px-8 lg:pb-10 lg:pt-24 xl:px-4"
      style={{ background: 'linear-gradient(115deg, #0b2254 0%, #111831 48%, #2b1058 100%)' }}
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 78% 22%, rgba(124,58,237,0.3), transparent 44%), radial-gradient(circle at 8% 12%, rgba(37,99,235,0.25), transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('/bg.svg')] bg-cover bg-center opacity-[0.055]" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
        <div className="max-w-2xl">
          <h1 id="hero-title" className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-brand-heading sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
            {t.h1}
          </h1>
          <p className="mt-6 max-w-[62ch] text-pretty text-base leading-relaxed text-brand-body sm:text-lg">
            {t.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-nowrap">
            <a
              href="#diagnostico"
              onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, { event_category: 'lead', event_label: 'home_hero_diagnostic' })}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[linear-gradient(120deg,#2563eb_0%,#7c3aed_100%)] px-5 py-3.5 text-center text-sm font-semibold text-white shadow-[0_12px_35px_-12px_rgba(37,99,235,0.65)] transition-shadow hover:shadow-[0_16px_40px_-12px_rgba(124,58,237,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-canvas sm:w-auto xl:px-6 xl:text-base"
            >
              {t.primaryCta}
            </a>
            <a
              href="#casos"
              onClick={() => trackEvent('case_study_click', { event_category: 'navigation', event_label: 'home_hero_cases' })}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-5 py-3.5 text-center text-sm font-semibold text-brand-heading transition-colors hover:border-brand-blue/45 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-canvas sm:w-auto xl:px-6 xl:text-base"
            >
              {t.secondaryCta}
            </a>
          </div>
          <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-brand-body/90">
            {t.microcopy}
          </p>
          <a
            href={whatsappUrl}
            aria-label={t.whatsappAria}
            onClick={(event) => {
              event.preventDefault();
              trackOutboundContact(whatsappUrl, GA_EVENTS.WHATSAPP_CLICK, 'home_hero');
            }}
            className="mt-4 inline-flex items-center gap-2 rounded text-sm font-medium text-green-300 underline decoration-green-300/40 underline-offset-4 transition-colors hover:text-green-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            {t.whatsappLabel}
          </a>
        </div>
        <HeroProcessVisual visual={t.visual} locale={locale} />
      </div>
    </section>
  );
}
