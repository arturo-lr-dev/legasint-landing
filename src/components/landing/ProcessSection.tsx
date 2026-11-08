'use client';

import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';
import { StaggerGroup, StaggerItem } from './motion';

export default function ProcessSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].process;

  return (
    <section className="dispatch-section dispatch-process" aria-labelledby="process-title">
      <div className="dispatch-container">
        <Reveal className="dispatch-section-heading">
          <h2 id="process-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </Reveal>
        <StaggerGroup as="ol" className="dispatch-process-list">
          {copy.steps.map((item) => (
            <StaggerItem as="li" key={item.step}>
              <span className="dispatch-process-number">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
