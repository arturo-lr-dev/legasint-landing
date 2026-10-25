import type { Metadata } from 'next';
import ServiciosContent from './ServiciosContent';

export const metadata: Metadata = {
  title: 'Desarrollo y automatización para pymes',
  description: 'Software a medida, ERP, integraciones, IA y dirección tecnológica para eliminar trabajo manual. Diagnóstico gratuito de 30 minutos.',
  alternates: {
    canonical: 'https://legasint.com/servicios',
    languages: {
      es: 'https://legasint.com/servicios',
      en: 'https://legasint.com/services',
      'x-default': 'https://legasint.com/servicios',
    },
  },
  openGraph: {
    title: 'Desarrollo y automatización para pymes | Legasint',
    description: 'Soluciones adaptadas a tus procesos, con alcance y precio definidos antes de empezar.',
    url: 'https://legasint.com/servicios',
    locale: 'es_ES',
  },
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
