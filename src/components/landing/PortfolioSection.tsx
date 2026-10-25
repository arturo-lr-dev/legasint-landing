import Image from 'next/image';
import Reveal from './Reveal';
import { homeCopy, type Locale } from '@/i18n/home-copy';

const projectMeta: Record<string, { imageUrl: string; projectUrl: string }> = {
  'Valle Hub': { imageUrl: '/projects/offpeaks.webp', projectUrl: 'https://www.vallehub.com/' },
  'SF Education': { imageUrl: '/projects/sfeducation.webp', projectUrl: 'https://sfeducation.es' },
  LeCrep: { imageUrl: '/projects/lacrep.webp', projectUrl: 'https://la-crep-webapp.web.app' },
  Cronos: { imageUrl: '/projects/cronos.webp', projectUrl: 'https://academiacronos.es' },
  'Smart Stadium Pricing': { imageUrl: '/projects/smart-stadium-pricing.webp', projectUrl: 'https://github.com/arturo-lr-dev/stadium-smart-pricing' },
  'Ambar PRO': { imageUrl: '/projects/ambarpro.webp', projectUrl: 'https://ambarpro.net' },
};

export default function PortfolioSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].portfolio;
  const labels = locale === 'es'
    ? { challenge: 'El reto', solution: 'La solución', outcome: 'Resultado funcional' }
    : { challenge: 'The challenge', solution: 'The solution', outcome: 'Functional outcome' };
  const projects = copy.projects.flatMap((project) => {
    const meta = projectMeta[project.title];
    if (!project.featured || !meta) return [];
    return [{ ...project, ...meta }];
  });

  return (
    <section id="casos" className="brand-section-blue scroll-mt-20 px-4 py-16 md:py-24" aria-labelledby="cases-title">
      <Reveal className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="cases-title" className="text-balance text-3xl font-bold tracking-tight text-brand-heading md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-brand-body md:text-lg">{copy.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              id={`caso-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`${index % 2 === 0 ? 'brand-card' : 'brand-card-violet'} flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-white/10`}
            >
              <div className="relative aspect-[16/9] border-b border-white/10">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title}: ${project.description}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-brand-heading">{project.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-brand-blue/10 px-2.5 py-1 text-xs text-brand-blue">
                      {tag}
                    </span>
                  ))}
                </div>
                <dl className="mt-6 flex-1 space-y-5">
                  <div>
                    <dt className="text-sm font-semibold text-brand-heading">{labels.challenge}</dt>
                    <dd className="mt-1 text-pretty text-sm leading-relaxed text-brand-body">{project.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-brand-heading">{labels.solution}</dt>
                    <dd className="mt-1 text-pretty text-sm leading-relaxed text-brand-body">{project.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-brand-heading">{labels.outcome}</dt>
                    <dd className="mt-1 text-pretty text-sm leading-relaxed text-brand-body">{project.outcome}</dd>
                  </div>
                </dl>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.cta}: ${project.title}`}
                  className="mt-6 inline-flex w-fit rounded text-sm font-semibold text-brand-blue underline decoration-brand-blue/35 underline-offset-4 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  {copy.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
