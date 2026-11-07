import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';

export default function FitSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].fit;

  return (
    <section className="dispatch-section dispatch-fit" aria-labelledby="fit-title">
      <Reveal className="dispatch-container">
        <div className="dispatch-section-heading dispatch-section-heading--dark">
          <h2 id="fit-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="dispatch-fit-grid">
          <article>
            <h3>{copy.standardTitle}</h3>
            <ul>
              {copy.standardItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
          <article>
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
          </article>
        </div>
        <p className="dispatch-fit__note">{copy.note}</p>
      </Reveal>
    </section>
  );
}
