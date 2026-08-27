import { Metadata } from 'next';
import ServiciosContent from './ServiciosContent';

export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Servicios de desarrollo de software a medida, APIs, integraciones, inteligencia artificial y consultoría tecnológica para empresas.',
  alternates: {
    canonical: 'https://legasint.com/servicios',
    languages: {
      'es': 'https://legasint.com/servicios',
      'en': 'https://legasint.com/services',
      'x-default': 'https://legasint.com/servicios',
    },
  },
  openGraph: {
    title: 'Servicios | Legasint',
    description: 'Soluciones de software a medida, automatización e IA para empresas.',
    url: 'https://legasint.com/servicios',
    locale: 'es_ES',
  },
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
