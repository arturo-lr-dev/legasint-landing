import type { Metadata } from 'next';
import AnimatedLanding from '@/components/landing/AnimatedLanding';
import ProblemsSection from '@/components/landing/ProblemsSection';
import ServicesSection from '@/components/landing/ServicesSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import ProcessSection from '@/components/landing/ProcessSection';
import SocialImpactSection from '@/components/landing/SocialSection';
import FaqSection from '@/components/landing/FaqSection';
import SectionTransition from '@/components/landing/SectionTransition';
import ContactForm from '@/components/ContactForm';
import ConsoleEasterEgg from '@/components/landing/ConsoleEasterEgg';
import { ServiceJsonLd, FaqPageJsonLd } from '@/components/seo/JsonLd';
import { homeCopy } from '@/i18n/home-copy';

const BASE_URL = 'https://legasint.com';

export const metadata: Metadata = {
  title: { absolute: 'Custom software for SMEs | Legasint' },
  description: 'Custom software, ERP, integrations and automation that remove manual work. Request a free 30-minute assessment for your business.',
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      en: `${BASE_URL}/en`,
      es: BASE_URL,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    title: 'Custom software for SMEs | Legasint',
    description: 'We turn manual processes into tools designed around your business.',
    url: `${BASE_URL}/en`,
    locale: 'en_US',
    alternateLocale: ['es_ES'],
  },
};

export default function HomeEn() {
  return (
    <>
      <ServiceJsonLd locale="en" />
      <FaqPageJsonLd items={homeCopy.en.faq.items} />
      <ConsoleEasterEgg />
      <main id="main-content" className="brand-page">
        <AnimatedLanding locale="en" />
        <ProblemsSection locale="en" />
        <SectionTransition tone="blue" direction="left" />
        <PortfolioSection locale="en" />
        <ServicesSection locale="en" />
        <SectionTransition tone="violet" direction="right" />
        <ProcessSection locale="en" />
        <FaqSection locale="en" />
        <SectionTransition tone="blue" direction="left" />
        <section id="diagnostico" aria-label="Free assessment" className="diagnostic-section scroll-mt-20 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <ContactForm locale="en" variant="diagnostic" location="home_en_form" />
          </div>
        </section>
        <SocialImpactSection locale="en" />
      </main>
    </>
  );
}
