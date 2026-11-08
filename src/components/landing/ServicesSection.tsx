'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import { useMotionEnabled } from './motion';
import { dispatchStagger, dispatchStaggerItem, dispatchViewport } from '@/lib/animations';
import { trackEvent } from '@/lib/analytics';
import { homeCopy, type Locale } from '@/i18n/home-copy';

const MotionServiceLink = motion.create(Link);

const serviceIcons = [
  <svg key="software" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9 5 12l3 3m8-6 3 3-3 3m-2-9-4 12" />
  </svg>,
  <svg key="apis" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8m-4-4 4 4-4 4M7 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2m10-14h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
  </svg>,
  <svg key="ia" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" />
    <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
  </svg>,
  <svg key="consultoria" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19V9m5 10V5m6 14v-7m5 7V3" />
  </svg>,
];

export default function ServicesSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].services;
  const servicesHref = locale === 'en' ? '/services' : '/servicios';
  const motionEnabled = useMotionEnabled();

  return (
    <section className="dispatch-section dispatch-services" aria-labelledby="services-title">
      <div className="dispatch-container">
        <Reveal className="dispatch-section-heading">
          <h2 id="services-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </Reveal>

        {motionEnabled ? (
          <motion.div
            className="dispatch-service-list"
            variants={dispatchStagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={dispatchViewport}
          >
            {copy.items.map((item, index) => (
              <MotionServiceLink
                key={item.id}
                href={`${servicesHref}#${item.id}`}
                onClick={() => trackEvent('service_click', { event_category: 'navigation', event_label: `home_${item.id}` })}
                className="dispatch-service"
                variants={dispatchStaggerItem}
              >
                <span className="dispatch-service__icon">{serviceIcons[index]}</span>
                <div className="dispatch-service__title">
                  <h3>{item.title}</h3>
                  <span>{item.cta}</span>
                </div>
                <div className="dispatch-service__content">
                  <p>{item.description}</p>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionServiceLink>
            ))}
          </motion.div>
        ) : (
          <div className="dispatch-service-list">
            {copy.items.map((item, index) => (
              <Link
                key={item.id}
                href={`${servicesHref}#${item.id}`}
                onClick={() => trackEvent('service_click', { event_category: 'navigation', event_label: `home_${item.id}` })}
                className="dispatch-service"
              >
                <span className="dispatch-service__icon">{serviceIcons[index]}</span>
                <div className="dispatch-service__title">
                  <h3>{item.title}</h3>
                  <span>{item.cta}</span>
                </div>
                <div className="dispatch-service__content">
                  <p>{item.description}</p>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link href={servicesHref} className="dispatch-text-link dispatch-services__all">
          {locale === 'en' ? 'See all services' : 'Ver todos los servicios'}
        </Link>
      </div>
    </section>
  );
}
