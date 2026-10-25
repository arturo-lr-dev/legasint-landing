import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';

export default function ProcessSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].process;

  return (
    <section className="brand-section-blue border-y border-brand-blue/10 px-4 py-16 md:py-24" aria-labelledby="process-title">
      <Reveal className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="process-title" className="text-balance text-3xl font-bold tracking-tight text-brand-heading md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-brand-body md:text-lg">
            {copy.subtitle}
          </p>
        </div>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((item, index) => {
            const isViolet = index % 2 === 1;
            return (
              <li key={item.step} className={`border-t-2 pt-5 ${isViolet ? 'border-brand-violet/45' : 'border-brand-blue/45'}`}>
                <span className={`font-mono text-sm font-semibold ${isViolet ? 'text-violet-300' : 'text-brand-blue'}`}>{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-brand-heading">{item.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-body">{item.description}</p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
