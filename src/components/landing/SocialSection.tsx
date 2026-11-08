'use client';

import Reveal from './Reveal';
import { StaggerGroup, StaggerItem } from './motion';
import { homeCopy, type Locale } from '@/i18n/home-copy';

const icons = [
  <svg key="education" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 20.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>,
  <svg key="sustainability" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21c4.5-2.5 7-6.1 7-10.5V5c-4.4 0-8 2.5-7 7 1-4.5-2.5-7-7-7v5.5C5 14.9 7.5 18.5 12 21Zm0 0v-9" />
  </svg>,
  <svg key="inclusion" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
  </svg>,
];

export default function SocialImpactSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].social;

  return (
    <section className="dispatch-section dispatch-social" aria-labelledby="social-title">
      <div className="dispatch-container">
        <Reveal className="dispatch-section-heading">
          <h2 id="social-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </Reveal>
        <StaggerGroup as="div" className="dispatch-social-list">
          {copy.causes.map((cause, index) => (
            <StaggerItem as="div" key={cause.title}>
              <span className="dispatch-social-icon">{icons[index]}</span>
              <h3>{cause.title}</h3>
              <p>{cause.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
