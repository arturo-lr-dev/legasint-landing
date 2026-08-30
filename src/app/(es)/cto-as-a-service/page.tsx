import { Metadata } from 'next';
import PpcLanding from '@/components/ppc/PpcLanding';
import { ppcCopy } from '@/i18n/ppc-copy';

const copy = ppcCopy['cto-as-a-service'];

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: {
    canonical: 'https://legasint.com/cto-as-a-service',
  },
  openGraph: {
    title: copy.metaTitle,
    description: copy.metaDescription,
    url: 'https://legasint.com/cto-as-a-service',
    locale: 'es_ES',
  },
};

export default function CtoAsAServicePage() {
  return <PpcLanding copy={copy} />;
}
