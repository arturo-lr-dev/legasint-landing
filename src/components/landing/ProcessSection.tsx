import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';

export default function ProcessSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].process;

  return (
    <section className="process-section px-4 py-16 md:py-24" aria-labelledby="process-title">
      <Reveal className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div className="max-w-md">
          <h2 id="process-title" className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-blue-100 md:text-lg">
            {copy.subtitle}
          </p>
        </div>
        <ol className="border-t border-blue-200/30">
          {copy.steps.map((item) => (
            <li key={item.step} className="grid gap-3 border-b border-blue-200/30 py-6 sm:grid-cols-[2.5rem_1fr] md:grid-cols-[2.5rem_10rem_1fr] md:gap-5">
              <span className="font-mono text-sm font-semibold text-blue-200">{item.step}</span>
              <h3 className="text-pretty text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-blue-100 sm:col-start-2 md:col-start-auto">{item.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
