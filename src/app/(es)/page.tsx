// app/(es)/page.tsx — Home en español (/)
import type { Metadata } from 'next';
import AnimatedLanding from '@/components/landing/AnimatedLanding';
import ServicesSection from '@/components/landing/ServicesSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import SocialImpactSection from '@/components/landing/SocialSection';
import FaqSection from '@/components/landing/FaqSection';
import ContactForm from '@/components/ContactForm';
import SmoothScroll from '@/components/landing/SmoothScroll';
import ScrollProgress from '@/components/landing/ScrollProgress';
import ConsoleEasterEgg from '@/components/landing/ConsoleEasterEgg';
import HeroBackground from '@/components/landing/three/HeroBackground';
import { ServiceJsonLd, FaqPageJsonLd } from '@/components/seo/JsonLd';
import { homeCopy } from '@/i18n/home-copy';

const BASE_URL = 'https://legasint.com';

export const metadata: Metadata = {
  // absolute: el título ya incluye la marca; evita que el template del layout añada "| Legasint" de nuevo
  title: { absolute: 'Legasint - Desarrollo de software a medida y socio tecnológico' },
  description:
    'Legasint es tu socio tecnológico: desarrollo de software a medida, automatización e inteligencia artificial para empresas en España.',
  alternates: {
    canonical: BASE_URL,
    languages: {
      es: BASE_URL,
      en: `${BASE_URL}/en`,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
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
      <SmoothScroll />
      <ScrollProgress />
      <ConsoleEasterEgg />
      <HeroBackground />
      {/* Single continuous gradient under every section so colors flow
          smoothly across section boundaries with no visible seams */}
      <div
        className="relative"
        style={{
          background:
            'linear-gradient(180deg, #1e3a8a 0%, #581c87 30%, #46217e 55%, #1e3a8a 78%, #581c87 100%)',
        }}
      >
        <AnimatedLanding locale="es" />
        <ServicesSection locale="es" />
        <PortfolioSection locale="es" />
        <SocialImpactSection locale="es" />
        <FaqSection locale="es" />
        <section className="relative z-10 px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <ContactForm locale="es" />
          </div>
        </section>
      </div>
    </>
  );
}
