import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us - Legasint',
  description: 'Get in touch with Legasint. Contact us via WhatsApp or email for technology solutions, software development, and digital transformation services.',
  alternates: {
    canonical: 'https://legasint.com/contact',
    languages: {
      'en': 'https://legasint.com/contact',
      'es': 'https://legasint.com/contacto',
    },
  },
  openGraph: {
    title: 'Contact Us - Legasint',
    description: 'Get in touch with Legasint for technology solutions and digital transformation.',
    url: 'https://legasint.com/contact',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
