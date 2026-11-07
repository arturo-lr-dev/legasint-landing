'use client';

import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/landing/FaqSection';
import ProcessSection from '@/components/landing/ProcessSection';
import ServiceHero from '@/components/landing/ServiceHero';
import { GA_EVENTS, trackEvent, trackOutboundContact } from '@/lib/analytics';
import { homeCopy, type Locale, type ServiceId } from '@/i18n/home-copy';

const serviceNavigationLabels: Record<Locale, Record<ServiceId, string>> = {
  es: {
    software: 'Software',
    apis: 'Integraciones',
    ia: 'Automatización e IA',
    consultoria: 'CTO externo',
  },
  en: {
    software: 'Software',
    apis: 'Integrations',
    ia: 'Automation & AI',
    consultoria: 'Fractional CTO',
  },
};

export default function ServicesPageContent({ locale = 'es' }: { locale?: Locale }) {
  const content = homeCopy[locale];
  const services = content.services.items;
  const copy = content.servicesPage;
  const homeHref = locale === 'en' ? '/en' : '/';
  const casesHref = `${homeHref}#casos`;
  const whatsappMessage = locale === 'es'
    ? 'Hola Arturo, me gustaría solicitar un diagnóstico gratuito de 30 minutos sobre un proceso de mi empresa.'
    : 'Hi Arturo, I would like to request a free 30-minute assessment about a process in my company.';
  const whatsappUrl = `https://wa.me/34649355701?text=${encodeURIComponent(whatsappMessage)}`;
  const emailUrl = 'mailto:arturo@legasint.com';
  const proofProjects = ['Cronos', 'Ambar PRO'].flatMap((title) => {
    const project = content.portfolio.projects.find((item) => item.title === title);
    return project ? [project] : [];
  });
  const faqContent = {
    title: copy.faqTitle,
    subtitle: copy.faqSubtitle,
    items: copy.faqItems,
  };

  const getServiceHref = (id: ServiceId) => {
    if (locale === 'en') return '#formulario';
    const links: Record<ServiceId, string> = {
      software: '/software-a-medida',
      apis: '#formulario',
      ia: '/automatizacion-ia',
      consultoria: '/cto-as-a-service',
    };
    return links[id];
  };

  const trackService = (id: ServiceId, href: string) => {
    if (href === '#formulario') {
      trackEvent(GA_EVENTS.CONTACT_CLICK, {
        event_category: 'lead',
        event_label: `services_${locale}_${id}_diagnostic`,
      });
      return;
    }
    trackEvent('service_click', {
      event_category: 'navigation',
      event_label: `services_${locale}_${id}`,
    });
  };

  return (
    <main id="main-content" className="dispatch-home services-page">
      <ServiceHero
        locale={locale}
        title={copy.title}
        description={copy.subtitle}
        primaryCta={copy.primaryCta}
        secondaryCta={copy.secondaryCta}
        primaryHref="#formulario"
        secondaryHref="#servicios-lista"
        eventLabel={`services_${locale}_hero`}
        variant="services"
      />

      <section className="dispatch-service-navigation" aria-label={copy.navigationTitle}>
        <div className="dispatch-container">
          <h2>{copy.navigationTitle}</h2>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <a href={`#${service.id}`}>{serviceNavigationLabels[locale][service.id]}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="servicios-lista" className="dispatch-section dispatch-services-detail scroll-mt-24" aria-label={copy.navigationTitle}>
        <div className="dispatch-container dispatch-services-detail__grid">
          {services.map((service) => {
            const href = getServiceHref(service.id);
            return (
              <article key={service.id} id={service.id} className="scroll-mt-28">
                <h2>{service.title}</h2>
                <p className="dispatch-service-detail__description">{service.description}</p>
                <ul className="dispatch-service-detail__features">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="dispatch-service-detail__deliverable">
                  <h3>{locale === 'en' ? 'What you can expect' : 'Qué puedes esperar'}</h3>
                  <p>{service.deliverable}</p>
                </div>
                {service.relatedCase && (
                  <p className="dispatch-service-detail__related">
                    {locale === 'en' ? 'Related project: ' : 'Proyecto relacionado: '}
                    <Link href={`${homeHref}#caso-${service.relatedCase.toLowerCase().replace(/\s+/g, '-')}`}>
                      {service.relatedCase}
                    </Link>
                  </p>
                )}
                <Link href={href} onClick={() => trackService(service.id, href)} className="dispatch-text-link">
                  {href === '#formulario' ? copy.serviceContactCta : service.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="dispatch-section dispatch-service-proof" aria-labelledby="service-proof-title">
        <div className="dispatch-container">
          <div className="dispatch-section-heading dispatch-section-heading--dark">
            <h2 id="service-proof-title" className="dispatch-display">{copy.proofTitle}</h2>
            <p>{copy.proofSubtitle}</p>
          </div>
          <div className="dispatch-service-proof__grid">
            {proofProjects.map((project) => (
              <article key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.solution}</p>
                <p>{project.outcome}</p>
              </article>
            ))}
          </div>
          <Link href={casesHref} className="dispatch-text-link">{copy.proofCta}</Link>
        </div>
      </section>

      <ProcessSection locale={locale} />
      <FaqSection locale={locale} content={faqContent} id="services-faq" split />

      <section className="dispatch-final-cta" aria-labelledby="services-final-title">
        <div className="dispatch-container">
          <h2 id="services-final-title" className="dispatch-display">{copy.finalTitle}</h2>
          <p>{copy.finalSubtitle}</p>
          <a
            href="#formulario"
            onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, { event_category: 'lead', event_label: `services_${locale}_final` })}
            className="dispatch-button"
          >
            {copy.primaryCta}
          </a>
        </div>
      </section>

      <section id="formulario" className="dispatch-diagnostic scroll-mt-24" aria-label={copy.primaryCta}>
        <div className="dispatch-container dispatch-diagnostic__inner">
          <aside className="dispatch-diagnostic-aside" aria-labelledby="services-diagnostic-aside-title">
            <h2 id="services-diagnostic-aside-title">{content.diagnostic.title}</h2>
            <ul>
              {content.diagnostic.items.map((item) => (
                <li key={item}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="dispatch-direct-contact">
              <p>{copy.directContact}</p>
              <a
                href={whatsappUrl}
                onClick={(event) => {
                  event.preventDefault();
                  trackOutboundContact(whatsappUrl, GA_EVENTS.WHATSAPP_CLICK, `services_${locale}_form`);
                }}
              >
                {copy.whatsappLabel}
              </a>
              <a
                href={emailUrl}
                onClick={(event) => {
                  event.preventDefault();
                  trackOutboundContact(emailUrl, GA_EVENTS.EMAIL_CLICK, `services_${locale}_form`);
                }}
              >
                arturo@legasint.com
              </a>
            </div>
          </aside>
          <ContactForm locale={locale} variant="diagnostic" location={`services_${locale}_form`} />
        </div>
      </section>
    </main>
  );
}
