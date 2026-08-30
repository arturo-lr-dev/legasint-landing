import { Metadata } from 'next';
import PpcLanding from '@/components/ppc/PpcLanding';
import { ppcCopy } from '@/i18n/ppc-copy';

const copy = ppcCopy['automatizacion-ia'];

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: {
    canonical: 'https://legasint.com/automatizacion-ia',
  },
  openGraph: {
    title: copy.metaTitle,
    description: copy.metaDescription,
    url: 'https://legasint.com/automatizacion-ia',
    locale: 'es_ES',
  },
};

export default function AutomatizacionIaPage() {
  return <PpcLanding copy={copy} />;
}
