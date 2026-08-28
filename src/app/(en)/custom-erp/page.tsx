import { Metadata } from 'next';
import CustomErpContent from './CustomErpContent';

export const metadata: Metadata = {
  title: 'Custom ERP Development for Businesses',
  description:
    'We build custom ERP systems for SMEs and companies that need more than off-the-shelf software. Sales, purchasing, inventory, production, HR and finance integrated.',
  keywords: [
    'custom ERP development',
    'ERP software development',
    'bespoke ERP',
    'ERP for SMEs',
    'business management software',
    'industrial ERP',
    'custom business software',
  ],
  alternates: {
    canonical: 'https://legasint.com/custom-erp',
    languages: {
      'es': 'https://legasint.com/erp-a-medida',
      'en': 'https://legasint.com/custom-erp',
      'x-default': 'https://legasint.com/erp-a-medida',
    },
  },
  openGraph: {
    title: 'Custom ERP Development for Businesses',
    description:
      'Business management software built specifically for your processes. Sales, purchasing, inventory, production, HR and finance in one system.',
    url: 'https://legasint.com/custom-erp',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom ERP Development for Businesses',
    description:
      'Business management software built specifically for your processes.',
  },
};

export default function CustomErpPage() {
  const faqItems = [
    {
      question: 'How much does a custom ERP cost?',
      answer:
        'It depends on the number of modules and integrations. Typical projects range from €15,000 for a basic 3-4 module ERP to €60,000+ for complex systems with production and multi-warehouse. After the first session we provide a fixed quote.',
    },
    {
      question: 'How long does it take to be ready?',
      answer:
        'A functional MVP is usually ready in 3-4 months. A complete ERP with all modules can take 6-12 months, but we deliver value from the first month with working modules.',
    },
    {
      question: 'Do you migrate data from our current system?',
      answer:
        'Yes. We migrate data from Excel, Access, legacy ERPs (Sage, SAP Business One, Navision, Odoo...) or any database. We clean, transform and validate the information before migration.',
    },
    {
      question: 'Does it integrate with other tools?',
      answer:
        'Yes. We integrate with ecommerce, POS, banks, transport agencies, e-invoicing, CRMs and any external API you use.',
    },
    {
      question: 'Who maintains the system afterwards?',
      answer:
        'We offer ongoing maintenance: technical support, backups, security updates and new features on demand.',
    },
    {
      question: 'Is a custom ERP better than a standard one like SAP or Odoo?',
      answer:
        'If your processes are standard and you don’t need customisation, a SaaS ERP may be cheaper. But if you have unique processes, need complex integrations or want to scale without licence dependency, a custom ERP is usually more cost-effective in the medium term.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Custom ERP Development',
    description:
      'Custom ERP software development for businesses: sales, purchasing, inventory, production, HR and finance integrated.',
    provider: {
      '@type': 'Organization',
      '@id': 'https://legasint.com/#organization',
      name: 'Legasint',
    },
    areaServed: ['ES', 'EU'],
    serviceType: 'Custom software development',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CustomErpContent />
    </>
  );
}
