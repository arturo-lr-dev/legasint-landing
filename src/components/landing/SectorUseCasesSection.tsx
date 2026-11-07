import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';

export default function SectorUseCasesSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].sectors;

  return (
    <section id="sectores" className="dispatch-section dispatch-sectors" aria-labelledby="sectors-title">
      <Reveal className="dispatch-container">
        <div className="dispatch-section-heading">
          <h2 id="sectors-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <div className="dispatch-sector-grid">
          {copy.groups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <p className="dispatch-sector-grid__intro">{group.description}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.title}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M5 12h14m-5-5 5 5-5 5" />
                    </svg>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
