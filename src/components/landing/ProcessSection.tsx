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
        <ol className="process-track relative mt-12 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {copy.steps.map((item, index) => {
            const accents = [
              'border-brand-blue/60 text-brand-blue',
              'border-brand-cyan/60 text-brand-cyan',
              'border-brand-violet/60 text-violet-300',
              'border-brand-blue/60 text-brand-blue',
            ];
            return (
              <li key={item.step} className="process-step relative pl-14 lg:pl-0 lg:pt-16">
                <span className={`process-step__node font-mono text-sm font-semibold ${accents[index]}`}>{item.step}</span>
                <h3 className="text-lg font-semibold text-brand-heading">{item.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-body">{item.description}</p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
