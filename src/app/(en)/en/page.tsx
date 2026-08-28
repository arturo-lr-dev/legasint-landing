// app/(en)/en/page.tsx — English home (/en)
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
  title: 'Legasint - Custom Software Development & Tech Partner',
  description:
    'Legasint is your technology partner: custom software development, automation and AI for businesses.',
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      en: `${BASE_URL}/en`,
      es: BASE_URL,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
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
        <AnimatedLanding locale="en" />
        <ServicesSection locale="en" />
        <PortfolioSection locale="en" />
        <SocialImpactSection locale="en" />
        <FaqSection locale="en" />
        <section className="relative z-10 px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <ContactForm locale="en" />
          </div>
        </section>
      </div>
    </>
  );
}
