import type { Metadata } from 'next';
import AnimatedLanding from '@/components/landing/AnimatedLanding';
import ProblemsSection from '@/components/landing/ProblemsSection';
import ServicesSection from '@/components/landing/ServicesSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import ProcessSection from '@/components/landing/ProcessSection';
import SocialImpactSection from '@/components/landing/SocialSection';
import FaqSection from '@/components/landing/FaqSection';
import ContactForm from '@/components/ContactForm';
import ConsoleEasterEgg from '@/components/landing/ConsoleEasterEgg';
import { ServiceJsonLd, FaqPageJsonLd } from '@/components/seo/JsonLd';
import { homeCopy } from '@/i18n/home-copy';

const BASE_URL = 'https://legasint.com';

export const metadata: Metadata = {
  title: { absolute: 'Software a medida para pymes | Legasint' },
  description: 'Software a medida, ERP, integraciones y automatización para eliminar trabajo manual en pymes. Solicita un diagnóstico gratuito de 30 minutos.',
  alternates: {
    canonical: BASE_URL,
    languages: {
      es: BASE_URL,
      en: `${BASE_URL}/en`,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    title: 'Software a medida para pymes | Legasint',
    description: 'Convertimos procesos manuales en herramientas adaptadas a tu empresa.',
    url: BASE_URL,
    locale: 'es_ES',
    alternateLocale: ['en_US'],
  },
};

export default function Home() {
  return (
    <>
      <ServiceJsonLd locale="es" />
      <FaqPageJsonLd items={homeCopy.es.faq.items} />
      <ConsoleEasterEgg />
      <main id="main-content" className="brand-page">
        <AnimatedLanding locale="es" />
        <ProblemsSection locale="es" />
        <PortfolioSection locale="es" />
        <ServicesSection locale="es" />
        <ProcessSection locale="es" />
        <FaqSection locale="es" />
        <section id="diagnostico" aria-label="Diagnóstico gratuito" className="brand-section-violet scroll-mt-20 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <ContactForm locale="es" variant="diagnostic" location="home_es_form" />
          </div>
        </section>
        <SocialImpactSection locale="es" />
      </main>
    </>
  );
}
