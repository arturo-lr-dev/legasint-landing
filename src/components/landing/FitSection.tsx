'use client';

import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';
import { StaggerGroup, StaggerItem } from './motion';

export default function FitSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].fit;

  return (
    <section className="dispatch-section dispatch-fit" aria-labelledby="fit-title">
      <div className="dispatch-container">
        <Reveal className="dispatch-section-heading dispatch-section-heading--dark">
          <h2 id="fit-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </Reveal>
        <StaggerGroup as="div" className="dispatch-fit-grid" stagger={0.14}>
          <StaggerItem as="article">
            <h3>{copy.standardTitle}</h3>
            <ul>
              {copy.standardItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </StaggerItem>
          <StaggerItem as="article">
            <h3>{copy.customTitle}</h3>
            <ul>
              {copy.customItems.map((item) => (
                <li key={item}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerGroup>
        <Reveal className="dispatch-fit__note" y={16} delay={0.15}>
          <p>{copy.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
