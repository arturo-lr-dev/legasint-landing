import Reveal from './Reveal';
import { homeCopy, type Locale } from '@/i18n/home-copy';

const icons = [
  <svg key="education" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>,
  <svg key="sustainability" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21c4.5-2.5 7-6.1 7-10.5V5c-4.4 0-8 2.5-7 7 1-4.5-2.5-7-7-7v5.5C5 14.9 7.5 18.5 12 21Zm0 0v-9" />
  </svg>,
  <svg key="inclusion" className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M15 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
  </svg>,
];

export default function SocialImpactSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].social;

  return (
    <section className="border-t border-brand-violet/10 px-4 py-16 md:py-20" aria-labelledby="social-title">
      <Reveal className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="social-title" className="text-balance text-2xl font-bold tracking-tight text-brand-heading md:text-3xl">
            {copy.title}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-brand-body">{copy.subtitle}</p>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {copy.causes.map((cause, index) => {
            const borders = ['border-brand-blue/40', 'border-brand-cyan/40', 'border-brand-violet/40'];
            const colors = ['text-brand-blue', 'text-brand-cyan', 'text-violet-300'];
            return (
              <div key={cause.title} className={`border-t pt-6 ${borders[index]}`}>
                <div className={colors[index]}>{icons[index]}</div>
                <h3 className="mt-4 text-lg font-semibold text-brand-heading">{cause.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-body">{cause.description}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
