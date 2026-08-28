import { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Custom software development, APIs, integrations, artificial intelligence and technology consulting services for businesses.',
  alternates: {
    canonical: 'https://legasint.com/services',
    languages: {
      'es': 'https://legasint.com/servicios',
      'en': 'https://legasint.com/services',
      'x-default': 'https://legasint.com/servicios',
    },
  },
  openGraph: {
    title: 'Services | Legasint',
    description: 'Custom software, automation and AI solutions for businesses.',
    url: 'https://legasint.com/services',
    locale: 'en_US',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
