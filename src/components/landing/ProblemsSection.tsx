'use client';

import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';
import { StaggerGroup, StaggerItem } from './motion';

export default function ProblemsSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].problems;

  return (
    <section className="dispatch-section dispatch-problems" aria-labelledby="problems-title">
      <div className="dispatch-container">
        <Reveal className="dispatch-section-heading dispatch-section-heading--dark">
          <h2 id="problems-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </Reveal>
        <StaggerGroup as="ul" className="dispatch-problem-list">
          {copy.items.map((item) => (
            <StaggerItem as="li" key={item.title}>
              <span className="dispatch-registration" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
