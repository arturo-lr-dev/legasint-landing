'use client';

import { useState } from 'react';
import { homeCopy, type Locale } from '@/i18n/home-copy';

export default function ServicesHeroVisual({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const services = homeCopy[locale].services.items;
  const current = services[activeIndex];

  return (
    <div className="dispatch-catalog">
      <div className="dispatch-catalog__tabs" role="group" aria-label={homeCopy[locale].servicesPage.navigationTitle}>
        {services.map((service, index) => (
          <button
            key={service.id}
            type="button"
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            <span>{`0${index + 1}`}</span>
            {service.title}
          </button>
        ))}
      </div>
      <div className="dispatch-catalog__detail" key={current.id}>
        <h2>{current.title}</h2>
        <p>{current.description}</p>
        <ul>
          {current.features.map((feature) => (
            <li key={feature}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <a href={`#${current.id}`}>{current.cta}</a>
      </div>
    </div>
  );
}
