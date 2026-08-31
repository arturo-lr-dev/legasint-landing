import { Metadata } from 'next';
import PpcLanding from '@/components/ppc/PpcLanding';
import { ppcCopy } from '@/i18n/ppc-copy';

const copy = ppcCopy['software-a-medida'];

export const metadata: Metadata = {
  // absolute: metaTitle ya incluye "| Legasint"; evita que el template del layout lo duplique
  title: { absolute: copy.metaTitle },
  description: copy.metaDescription,
  alternates: {
    canonical: 'https://legasint.com/software-a-medida',
  },
  openGraph: {
    title: copy.metaTitle,
    description: copy.metaDescription,
    url: 'https://legasint.com/software-a-medida',
    locale: 'es_ES',
  },
};

export default function SoftwareAMedidaPage() {
  return <PpcLanding copy={copy} />;
}
