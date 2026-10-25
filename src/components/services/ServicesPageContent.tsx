'use client';

import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/landing/FaqSection';
import ProcessSection from '@/components/landing/ProcessSection';
import { GA_EVENTS, trackEvent, trackOutboundContact } from '@/lib/analytics';
import { homeCopy, type Locale, type ServiceId } from '@/i18n/home-copy';

const primaryCtaClass = 'brand-button-primary inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 py-3.5 text-center text-sm font-semibold text-white transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-canvas sm:w-auto sm:text-base';
const secondaryCtaClass = 'inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-center text-sm font-semibold text-brand-heading transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-canvas sm:w-auto sm:text-base';
const textLinkClass = 'inline-flex w-fit rounded text-sm font-semibold text-brand-blue underline decoration-brand-blue/35 underline-offset-4 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue';
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
    <main id="main-content" className="brand-page min-h-screen">
      <section
        className="relative overflow-hidden px-4 pb-14 pt-28 md:pb-20 md:pt-40"
        style={{ background: 'linear-gradient(115deg, #0b2254 0%, #111831 48%, #2b1058 100%)' }}
        aria-labelledby="services-page-title"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(circle at 80% 15%, rgba(124,58,237,0.24), transparent 42%), radial-gradient(circle at 8% 12%, rgba(37,99,235,0.2), transparent 38%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 id="services-page-title" className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-brand-heading sm:text-4xl md:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-[65ch] text-pretty text-base leading-relaxed text-brand-body md:mt-6 md:text-lg">
              {copy.subtitle}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
              <a
                href="#formulario"
                onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, { event_category: 'lead', event_label: `services_${locale}_hero` })}
                className={primaryCtaClass}
              >
                {copy.primaryCta}
              </a>
              <a href="#servicios-lista" className={secondaryCtaClass}>
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <nav className="mt-8 md:mt-12" aria-label={copy.navigationTitle}>
            <h2 className="text-base font-semibold text-brand-heading">{copy.navigationTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`#${service.id}`}
                    className="inline-flex rounded-lg border border-white/12 bg-white/[0.035] px-3.5 py-2.5 text-xs font-medium text-brand-body transition-colors hover:border-brand-blue/40 hover:text-brand-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:text-sm"
                  >
                    {serviceNavigationLabels[locale][service.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section id="servicios-lista" className="scroll-mt-24 px-4 pb-16 md:pb-24" aria-label={copy.navigationTitle}>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {services.map((service) => {
            const href = getServiceHref(service.id);
            return (
              <article
                key={service.id}
                id={service.id}
                className={`${service.id === 'apis' || service.id === 'consultoria' ? 'brand-card-violet' : 'brand-card'} flex scroll-mt-28 flex-col rounded-2xl border border-white/10 p-6 md:p-8`}
              >
                <h2 className="text-pretty text-2xl font-semibold text-brand-heading">{service.title}</h2>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-body sm:text-base">{service.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-brand-heading/85">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-l-2 border-brand-violet pl-4">
                  <h3 className="text-sm font-semibold text-brand-heading">
                    {locale === 'en' ? 'What you can expect' : 'Qué puedes esperar'}
                  </h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-brand-body">{service.deliverable}</p>
                </div>
                {service.relatedCase && (
                  <p className="mt-5 text-sm text-brand-body">
                    {locale === 'en' ? 'Related project: ' : 'Proyecto relacionado: '}
                    <Link
                      href={`${homeHref}#caso-${service.relatedCase.toLowerCase().replace(/\s+/g, '-')}`}
                      className="rounded font-medium text-brand-blue transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    >
                      {service.relatedCase}
                    </Link>
                  </p>
                )}
                <div className="mt-auto pt-6">
                  <Link href={href} onClick={() => trackService(service.id, href)} className={textLinkClass}>
                    {href === '#formulario' ? copy.serviceContactCta : service.cta}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="brand-section-violet px-4 py-16 md:py-20" aria-labelledby="service-proof-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="service-proof-title" className="text-balance text-3xl font-bold tracking-tight text-brand-heading md:text-4xl">
              {copy.proofTitle}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-brand-body">{copy.proofSubtitle}</p>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {proofProjects.map((project) => (
              <article key={project.title} className="border-l-2 border-brand-blue/45 pl-5">
                <h3 className="text-xl font-semibold text-brand-heading">{project.title}</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-body">{project.solution}</p>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-heading/85">{project.outcome}</p>
              </article>
            ))}
          </div>
          <Link href={casesHref} className={`${textLinkClass} mt-8`}>
            {copy.proofCta}
          </Link>
        </div>
      </section>

      <ProcessSection locale={locale} />
      <FaqSection locale={locale} content={faqContent} id="services-faq" />

      <section className="brand-section-violet px-4 py-16 md:py-20" aria-labelledby="services-final-title">
        <div className="mx-auto max-w-3xl">
          <h2 id="services-final-title" className="text-balance text-3xl font-bold tracking-tight text-brand-heading md:text-4xl">
            {copy.finalTitle}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-brand-body md:text-lg">{copy.finalSubtitle}</p>
          <a
            href="#formulario"
            onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, { event_category: 'lead', event_label: `services_${locale}_final` })}
            className={`${primaryCtaClass} mt-7`}
          >
            {copy.primaryCta}
          </a>
        </div>
      </section>

      <section id="formulario" className="scroll-mt-24 px-4 py-16 md:py-24" aria-label={copy.primaryCta}>
        <div className="mx-auto max-w-3xl">
          <ContactForm locale={locale} variant="diagnostic" location={`services_${locale}_form`} />
          <div className="mt-6 text-center">
            <p className="text-sm text-brand-body">{copy.directContact}</p>
            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                onClick={(event) => {
                  event.preventDefault();
                  trackOutboundContact(whatsappUrl, GA_EVENTS.WHATSAPP_CLICK, `services_${locale}_form`);
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-green-300/25 bg-green-400/5 px-5 py-2.5 text-sm font-medium text-green-300 transition-colors hover:border-green-300/45 hover:bg-green-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
              >
                {copy.whatsappLabel}
              </a>
              <a
                href={emailUrl}
                onClick={(event) => {
                  event.preventDefault();
                  trackOutboundContact(emailUrl, GA_EVENTS.EMAIL_CLICK, `services_${locale}_form`);
                }}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.035] px-5 py-2.5 text-sm font-medium text-brand-body transition-colors hover:border-white/25 hover:text-brand-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                arturo@legasint.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
