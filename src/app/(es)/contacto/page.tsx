import { Metadata } from 'next';
import ContactoContent from './ContactoContent';
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con Legasint. Contáctanos por WhatsApp o email para soluciones tecnológicas, desarrollo de software y servicios de transformación digital.',
  alternates: {
    canonical: 'https://legasint.com/contacto',
    languages: {
      'es': 'https://legasint.com/contacto',
      'en': 'https://legasint.com/contact',
      'x-default': 'https://legasint.com/contacto',
    },
  },
  openGraph: {
    title: 'Contacto',
    description: 'Ponte en contacto con Legasint para soluciones tecnológicas y transformación digital.',
    url: 'https://legasint.com/contacto',
    locale: 'es_ES',
  },
};

export default function ContactoPage() {
  return (
    <>
      <LocalBusinessJsonLd locale="es" />
      <ContactoContent />
    </>
  );
}
