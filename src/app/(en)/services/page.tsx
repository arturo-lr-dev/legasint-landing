import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Custom software & automation for SMEs',
  description: 'Custom software, ERP, integrations, AI and technology leadership that remove manual work. Request a free 30-minute assessment.',
  alternates: {
    canonical: 'https://legasint.com/services',
    languages: {
      es: 'https://legasint.com/servicios',
      en: 'https://legasint.com/services',
      'x-default': 'https://legasint.com/servicios',
    },
  },
  openGraph: {
    title: 'Custom software & automation for SMEs | Legasint',
    description: 'Solutions designed around your processes, with scope and pricing defined before starting.',
    url: 'https://legasint.com/services',
    locale: 'en_US',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
