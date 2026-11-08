'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import { StaggerGroup, StaggerItem } from './motion';
import { homeCopy, type Locale } from '@/i18n/home-copy';

const projectMeta: Record<string, { imageUrl: string; projectUrl: string }> = {
  'Valle Hub': { imageUrl: '/projects/offpeaks.webp', projectUrl: 'https://www.vallehub.com/' },
  'SF Education': { imageUrl: '/projects/sfeducation.webp', projectUrl: 'https://sfeducation.es' },
  LeCrep: { imageUrl: '/projects/lacrep.webp', projectUrl: 'https://la-crep-webapp.web.app' },
  Cronos: { imageUrl: '/projects/cronos.jpg', projectUrl: 'https://academiacronos.es' },
  'Smart Stadium Pricing': { imageUrl: '/projects/smart-stadium-pricing.webp', projectUrl: 'https://github.com/arturo-lr-dev/stadium-smart-pricing' },
  'Ambar PRO': { imageUrl: '/projects/ambarpro.webp', projectUrl: 'https://ambarpro.net' },
};

type Project = ReturnType<typeof getProjects>[number];
type Labels = { challenge: string; solution: string; outcome: string };

function getProjects(locale: Locale) {
  return homeCopy[locale].portfolio.projects.flatMap((project) => {
    const meta = projectMeta[project.title];
    if (!project.featured || !meta) return [];
    return [{ ...project, ...meta }];
  });
}

function ProjectDetails({ project, labels }: { project: Project; labels: Labels }) {
  return (
    <dl className="dispatch-case-details">
      {[
        [labels.challenge, project.challenge],
        [labels.solution, project.solution],
        [labels.outcome, project.outcome],
      ].map(([term, description]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="dispatch-tags">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  );
}

export default function PortfolioSection({ locale = 'es' }: { locale?: Locale }) {
  const copy = homeCopy[locale].portfolio;
  const labels = locale === 'es'
    ? { challenge: 'El reto', solution: 'La solución', outcome: 'Resultado funcional' }
    : { challenge: 'The challenge', solution: 'The solution', outcome: 'Functional outcome' };
  const projects = getProjects(locale);
  const [featuredProject, ...otherProjects] = projects;

  return (
    <section id="casos" className="dispatch-section dispatch-cases scroll-mt-20" aria-labelledby="cases-title">
      <div className="dispatch-container">
        <Reveal className="dispatch-section-heading">
          <h2 id="cases-title" className="dispatch-display">{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </Reveal>

        {featuredProject && (
          <Reveal as="article" id={`caso-${featuredProject.title.toLowerCase().replace(/\s+/g, '-')}`} className="dispatch-case dispatch-case--featured scroll-mt-24">
            <div className="dispatch-case__image">
              <Image
                src={featuredProject.imageUrl}
                alt={`${featuredProject.title}: ${featuredProject.description}`}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="dispatch-case__content">
              <h3>{featuredProject.title}</h3>
              <p className="dispatch-case__description">{featuredProject.description}</p>
              <ProjectTags tags={featuredProject.tags} />
              <ProjectDetails project={featuredProject} labels={labels} />
              <a
                href={featuredProject.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${copy.cta}: ${featuredProject.title}`}
                className="dispatch-text-link"
              >
                {copy.cta}
              </a>
            </div>
          </Reveal>
        )}

        <StaggerGroup as="div" className="dispatch-case-grid" stagger={0.12}>
          {otherProjects.map((project) => (
            <StaggerItem
              as="article"
              key={project.title}
              id={`caso-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="dispatch-case scroll-mt-24"
            >
              <div className="dispatch-case__image">
                <Image
                  src={project.imageUrl}
                  alt={`${project.title}: ${project.description}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="dispatch-case__content">
                <h3>{project.title}</h3>
                <p className="dispatch-case__description">{project.description}</p>
                <ProjectTags tags={project.tags} />
                <ProjectDetails project={project} labels={labels} />
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.cta}: ${project.title}`}
                  className="dispatch-text-link"
                >
                  {copy.cta}
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
