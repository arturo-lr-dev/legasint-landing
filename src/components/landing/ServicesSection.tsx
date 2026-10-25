'use client';

import Link from 'next/link';
import Reveal from './Reveal';
import { trackEvent } from '@/lib/analytics';
import { homeCopy, type Locale } from '@/i18n/home-copy';

export default function ServicesSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].services;
  const servicesHref = locale === 'en' ? '/services' : '/servicios';

  return (
    <section className="brand-section-violet px-4 py-16 md:py-24" aria-labelledby="services-title">
      <Reveal className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="services-title" className="text-balance text-3xl font-bold tracking-tight text-brand-heading md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-brand-body md:text-lg">{copy.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {copy.items.map((item, index) => (
            <Link
              key={item.id}
              href={`${servicesHref}#${item.id}`}
              onClick={() => trackEvent('service_click', { event_category: 'navigation', event_label: `home_${item.id}` })}
              className={`${index % 2 === 0 ? 'brand-card' : 'brand-card-violet'} group flex h-full flex-col rounded-2xl border border-white/10 p-6 transition-colors hover:border-brand-blue/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-canvas md:p-7`}
            >
              <h3 className="text-pretty text-xl font-semibold text-brand-heading transition-colors group-hover:text-brand-blue">{item.title}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-body sm:text-base">{item.description}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-brand-heading/85">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="mt-6 text-sm font-semibold text-brand-blue">{item.cta}</span>
            </Link>
          ))}
        </div>

        <Link
          href={servicesHref}
          className="mt-8 inline-flex rounded text-sm font-semibold text-brand-blue underline decoration-brand-blue/35 underline-offset-4 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          {locale === 'en' ? 'See all services' : 'Ver todos los servicios'}
        </Link>
      </Reveal>
    </section>
  );
}
