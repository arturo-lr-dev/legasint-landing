'use client';

import { GA_EVENTS, trackEvent } from '@/lib/analytics';
import { homeCopy, type Locale } from '@/i18n/home-copy';
import ServicesHeroVisual from './ServicesHeroVisual';
import ErpHeroVisual from './ErpHeroVisual';

type ServiceHeroProps = {
  locale: Locale;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref: string;
  secondaryHref: string;
  eventLabel: string;
  variant: 'services' | 'erp';
};

export default function ServiceHero({
  locale,
  title,
  description,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref,
  eventLabel,
  variant,
}: ServiceHeroProps) {
  return (
    <section className={`dispatch-hero dispatch-hero--machine dispatch-service-hero dispatch-service-hero--${variant}`} aria-labelledby="service-hero-title">
      <div className="dispatch-machine-hero__copy">
        <h1 id="service-hero-title" className="dispatch-display">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="dispatch-machine-hero__actions">
        <div className="dispatch-actions">
          <a
            href={primaryHref}
            onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, { event_category: 'lead', event_label: eventLabel })}
            className="dispatch-button"
          >
            {primaryCta}
          </a>
          <a href={secondaryHref} className="dispatch-button dispatch-button--secondary">
            {secondaryCta}
          </a>
        </div>
        <p className="dispatch-microcopy">{homeCopy[locale].hero.microcopy}</p>
      </div>
      {variant === 'erp' ? <ErpHeroVisual locale={locale} /> : <ServicesHeroVisual locale={locale} />}
    </section>
  );
}
