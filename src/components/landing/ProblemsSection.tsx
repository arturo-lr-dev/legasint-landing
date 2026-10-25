import { homeCopy, type Locale } from '@/i18n/home-copy';
import Reveal from './Reveal';

export default function ProblemsSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].problems;

  return (
    <section className="px-4 py-16 md:py-24" aria-labelledby="problems-title">
      <Reveal className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 id="problems-title" className="text-balance text-3xl font-bold tracking-tight text-brand-heading md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-brand-body md:text-lg">
            {copy.subtitle}
          </p>
        </div>
        <ul className="border-t border-white/12">
          {copy.items.map((item) => (
            <li key={item.title} className="border-b border-white/12 py-6">
              <div className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-violet" aria-hidden="true" />
                <div>
                  <h3 className="text-pretty text-lg font-semibold text-brand-heading">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-brand-body sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
