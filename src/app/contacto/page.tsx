import { Metadata } from 'next';
import ContactoContent from './ContactoContent';

export const metadata: Metadata = {
  title: 'Contacto - Legasint',
  description: 'Ponte en contacto con Legasint. Contáctanos por WhatsApp o email para soluciones tecnológicas, desarrollo de software y servicios de transformación digital.',
  alternates: {
    canonical: 'https://legasint.com/contacto',
    languages: {
      'es': 'https://legasint.com/contacto',
      'en': 'https://legasint.com/contact',
    },
  },
  openGraph: {
    title: 'Contacto - Legasint',
    description: 'Ponte en contacto con Legasint para soluciones tecnológicas y transformación digital.',
    url: 'https://legasint.com/contacto',
    locale: 'es_ES',
  },
};

export default function ContactoPage() {
  return <ContactoContent />;
}
