import { Metadata } from 'next';
import ErpAMedidaContent from './ErpAMedidaContent';

export const metadata: Metadata = {
  title: 'ERP a medida para empresas | Legasint',
  description:
    'Desarrollamos ERP a medida para pymes y empresas que necesitan más que un software estándar. Módulos de ventas, compras, almacén, producción, RRHH y finanzas integrados.',
  keywords: [
    'ERP a medida',
    'software ERP personalizado',
    'desarrollo ERP',
    'ERP para pymes',
    'sistema de gestión empresarial',
    'ERP industrial',
    'software de gestión a medida',
  ],
  alternates: {
    canonical: 'https://legasint.com/erp-a-medida',
    languages: {
      'es': 'https://legasint.com/erp-a-medida',
      'en': 'https://legasint.com/custom-erp',
      'x-default': 'https://legasint.com/erp-a-medida',
    },
  },
  openGraph: {
    title: 'ERP a medida para empresas | Legasint',
    description:
      'Software de gestión empresarial desarrollado específicamente para tus procesos. Ventas, compras, almacén, producción, RRHH y finanzas en un solo sistema.',
    url: 'https://legasint.com/erp-a-medida',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ERP a medida para empresas | Legasint',
    description:
      'Software de gestión empresarial desarrollado específicamente para tus procesos.',
  },
};

export default function ErpAMedidaPage() {
  const faqItems = [
    {
      question: '¿Cuánto cuesta un ERP a medida?',
      answer:
        'Depende del número de módulos e integraciones. Proyectos típicos van desde 15.000 € para un ERP básico de 3-4 módulos hasta 60.000 € o más para sistemas complejos con producción y multi-almacén. Tras la primera sesión te damos presupuesto cerrado.',
    },
    {
      question: '¿Cuánto tiempo tarda en estar listo?',
      answer:
        'Un MVP funcional suele estar listo en 3-4 meses. Un ERP completo con todos los módulos puede llevar 6-12 meses, pero entregamos valor desde el primer mes con módulos funcionales.',
    },
    {
      question: '¿Migráis datos de nuestro sistema actual?',
      answer:
        'Sí. Migramos datos desde Excel, Access, ERPs legacy (Sage, SAP Business One, Navision, Odoo...) o cualquier base de datos. Limpiamos, transformamos y validamos la información antes de la migración.',
    },
    {
      question: '¿Se integra con otras herramientas?',
      answer:
        'Sí. Integramos con ecommerce, TPV, bancos, agencias de transporte, SII, facturación electrónica, CRMs y cualquier API externa que uses.',
    },
    {
      question: '¿Quién mantiene el sistema después?',
      answer:
        'Ofrecemos mantenimiento evolutivo: soporte técnico, copias de seguridad, actualizaciones de seguridad y nuevas funcionalidades bajo demanda.',
    },
    {
      question: '¿Es mejor un ERP a medida o uno estándar como SAP u Odoo?',
      answer:
        'Si tus procesos son estándar y no necesitas personalización, un ERP SaaS puede ser más barato. Pero si tienes procesos únicos, necesitas integraciones complejas o quieres escalar sin depender de licencias, el ERP a medida suele ser más rentable a medio plazo.',
    },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'ERP a medida',
    description:
      'Desarrollo de software ERP personalizado para empresas: ventas, compras, almacén, producción, RRHH y finanzas integrados.',
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
      <ErpAMedidaContent />
    </>
  );
}
