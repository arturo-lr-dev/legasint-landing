import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';

export default function ProcessSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].process;

  return (
    <section className="dispatch-section dispatch-process" aria-labelledby="process-title">
      <Reveal className="dispatch-container">
        <div className="dispatch-section-heading">
          <h2 id="process-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <ol className="dispatch-process-list">
          {copy.steps.map((item) => (
            <li key={item.step}>
              <span className="dispatch-process-number">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
