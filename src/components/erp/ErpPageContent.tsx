'use client';

import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/landing/FaqSection';
import ServiceHero from '@/components/landing/ServiceHero';
import type { Locale } from '@/i18n/home-copy';

const content = {
  es: {
    heroTitle: 'ERP a medida para empresas',
    heroDescription: 'Software de gestión empresarial diseñado específicamente para tus procesos. Ventas, compras, almacén, producción, RRHH y finanzas integrados en un solo sistema.',
    primaryCta: 'Solicitar presupuesto',
    secondaryCta: 'Hablar con nosotros',
    secondaryHref: '/contacto',
    problemTitle: '¿Tu ERP actual no encaja con tu negocio?',
    problemParagraphs: [
      'Los ERP estándar obligan a adaptar tus procesos al software. Con un ERP a medida, el software se adapta a tu forma de trabajar: sin módulos que no usas, sin licencias por usuario disparatadas y sin depender de un proveedor que tarda meses en cambiar una pantalla.',
      'Especialmente indicado para pymes industriales, distribuidoras y empresas de servicios que han crecido más allá de lo que Excel o un ERP básico pueden gestionar.',
    ],
    modulesTitle: 'Módulos habituales',
    modulesSubtitle: 'Un sistema a la medida de tu operación, conectando las áreas que realmente necesitas.',
    modules: [
      { title: 'Ventas y CRM', description: 'Gestión de clientes, presupuestos, pedidos y facturación.' },
      { title: 'Compras y proveedores', description: 'Órdenes de compra, recepción de mercancía y control de proveedores.' },
      { title: 'Almacén e inventario', description: 'Stock en tiempo real, ubicaciones, lotes y trazabilidad.' },
      { title: 'Producción', description: 'Planificación, órdenes de fabricación y control de costes.' },
      { title: 'RRHH', description: 'Fichajes, vacaciones, nóminas y evaluación de desempeño.' },
      { title: 'Finanzas y contabilidad', description: 'Tesorería, presupuestos, analítica y cierre contable.' },
    ],
    processTitle: 'Cómo trabajamos',
    processSubtitle: 'Del análisis inicial a la evolución del sistema, con entregas visibles en cada fase.',
    process: [
      { step: '01', title: 'Análisis', description: 'Mapeamos tus procesos y detectamos qué debe cubrir el ERP.' },
      { step: '02', title: 'Propuesta', description: 'Alcance, módulos, integraciones, plazos y precio cerrado.' },
      { step: '03', title: 'Desarrollo', description: 'Sprints con demos funcionales cada pocas semanas.' },
      { step: '04', title: 'Implantación', description: 'Migración de datos, formación y puesta en producción.' },
      { step: '05', title: 'Evolución', description: 'Mantenimiento, mejoras y nuevos módulos a medida.' },
    ],
    pricingTitle: 'Inversión orientativa',
    pricingSubtitle: 'Un ERP a medida es una inversión, no un gasto. Recuperas el coste en eficiencia y decisiones mejor informadas.',
    pricing: [
      { title: 'ERP básico', amount: 'desde 15.000 €', description: '3-4 módulos, pyme pequeña' },
      { title: 'ERP estándar', amount: 'desde 30.000 €', description: '5-6 módulos, empresa en crecimiento' },
      { title: 'ERP complejo', amount: 'desde 60.000 €', description: 'multi-almacén, producción, integraciones' },
    ],
    faqTitle: 'Preguntas frecuentes sobre ERP a medida',
    faqSubtitle: 'Coste, plazos, migración, integraciones y mantenimiento.',
    faq: [
      { question: '¿Cuánto cuesta un ERP a medida?', answer: 'Depende del número de módulos e integraciones. Proyectos típicos van desde 15.000 € para un ERP básico de 3-4 módulos hasta 60.000 € o más para sistemas complejos con producción y multi-almacén. Tras la primera sesión te damos presupuesto cerrado.' },
      { question: '¿Cuánto tiempo tarda en estar listo?', answer: 'Un MVP funcional suele estar listo en 3-4 meses. Un ERP completo con todos los módulos puede llevar 6-12 meses, pero entregamos valor desde el primer mes con módulos funcionales.' },
      { question: '¿Migráis datos de nuestro sistema actual?', answer: 'Sí. Migramos datos desde Excel, Access, ERPs legacy (Sage, SAP Business One, Navision, Odoo...) o cualquier base de datos. Limpiamos, transformamos y validamos la información antes de la migración.' },
      { question: '¿Se integra con otras herramientas?', answer: 'Sí. Integramos con ecommerce, TPV, bancos, agencias de transporte, SII, facturación electrónica, CRMs y cualquier API externa que uses.' },
      { question: '¿Quién mantiene el sistema después?', answer: 'Ofrecemos mantenimiento evolutivo: soporte técnico, copias de seguridad, actualizaciones de seguridad y nuevas funcionalidades bajo demanda.' },
      { question: '¿Es mejor un ERP a medida o uno estándar como SAP u Odoo?', answer: 'Si tus procesos son estándar y no necesitas personalización, un ERP SaaS puede ser más barato. Pero si tienes procesos únicos, necesitas integraciones complejas o quieres escalar sin depender de licencias, el ERP a medida suele ser más rentable a medio plazo.' },
    ],
    formTitle: '¿Hablamos de tu ERP?',
    formSubtitle: 'Cuéntanos qué necesitas y te preparamos una propuesta sin compromiso.',
  },
  en: {
    heroTitle: 'Custom ERP Development',
    heroDescription: 'Business management software designed specifically for your processes. Sales, purchasing, inventory, production, HR and finance integrated in one system.',
    primaryCta: 'Request a quote',
    secondaryCta: 'Talk to us',
    secondaryHref: '/contact',
    problemTitle: 'Does your current ERP not fit your business?',
    problemParagraphs: [
      'Off-the-shelf ERPs force you to adapt your processes to the software. With a custom ERP, the software adapts to the way you work: no unused modules, no runaway per-user licensing and no waiting months for a vendor to change a screen.',
      'Especially suited for industrial SMEs, distributors and service companies that have outgrown what Excel or a basic ERP can manage.',
    ],
    modulesTitle: 'Typical modules',
    modulesSubtitle: 'A system designed around your operation, connecting the areas you actually need.',
    modules: [
      { title: 'Sales & CRM', description: 'Customer management, quotes, orders and invoicing.' },
      { title: 'Purchasing & suppliers', description: 'Purchase orders, goods receipt and supplier control.' },
      { title: 'Warehouse & inventory', description: 'Real-time stock, locations, batches and traceability.' },
      { title: 'Production', description: 'Planning, manufacturing orders and cost control.' },
      { title: 'HR', description: 'Time tracking, holidays, payroll and performance reviews.' },
      { title: 'Finance & accounting', description: 'Treasury, budgets, analytics and financial close.' },
    ],
    processTitle: 'How we work',
    processSubtitle: 'From initial analysis to ongoing evolution, with visible progress at every stage.',
    process: [
      { step: '01', title: 'Analysis', description: 'We map your processes and identify what the ERP must cover.' },
      { step: '02', title: 'Proposal', description: 'Scope, modules, integrations, timelines and fixed pricing.' },
      { step: '03', title: 'Development', description: 'Sprints with working demos every few weeks.' },
      { step: '04', title: 'Deployment', description: 'Data migration, training and go-live.' },
      { step: '05', title: 'Evolution', description: 'Maintenance, improvements and new modules on demand.' },
    ],
    pricingTitle: 'Indicative investment',
    pricingSubtitle: 'A custom ERP is an investment, not an expense. You recover the cost in efficiency and better-informed decisions.',
    pricing: [
      { title: 'Basic ERP', amount: 'from €15,000', description: '3-4 modules, small SME' },
      { title: 'Standard ERP', amount: 'from €30,000', description: '5-6 modules, growing company' },
      { title: 'Complex ERP', amount: 'from €60,000', description: 'multi-warehouse, production, integrations' },
    ],
    faqTitle: 'Frequently asked questions about custom ERP',
    faqSubtitle: 'Cost, timelines, migration, integrations and maintenance.',
    faq: [
      { question: 'How much does a custom ERP cost?', answer: 'It depends on the number of modules and integrations. Typical projects range from €15,000 for a basic 3-4 module ERP to €60,000+ for complex systems with production and multi-warehouse. After the first session we provide a fixed quote.' },
      { question: 'How long does it take to be ready?', answer: 'A functional MVP is usually ready in 3-4 months. A complete ERP with all modules can take 6-12 months, but we deliver value from the first month with working modules.' },
      { question: 'Do you migrate data from our current system?', answer: 'Yes. We migrate data from Excel, Access, legacy ERPs (Sage, SAP Business One, Navision, Odoo...) or any database. We clean, transform and validate the information before migration.' },
      { question: 'Does it integrate with other tools?', answer: 'Yes. We integrate with ecommerce, POS, banks, transport agencies, e-invoicing, CRMs and any external API you use.' },
      { question: 'Who maintains the system afterwards?', answer: 'We offer ongoing maintenance: technical support, backups, security updates and new features on demand.' },
      { question: 'Is a custom ERP better than a standard one like SAP or Odoo?', answer: 'If your processes are standard and you don’t need customisation, a SaaS ERP may be cheaper. But if you have unique processes, need complex integrations or want to scale without licence dependency, a custom ERP is usually more cost-effective in the medium term.' },
    ],
    formTitle: 'Let’s talk about your ERP',
    formSubtitle: 'Tell us what you need and we will prepare a no-obligation proposal.',
  },
};

export default function ErpPageContent({ locale = 'es' }: { locale?: Locale }) {
  const copy = content[locale];

  return (
    <main id="main-content" className="dispatch-home erp-page">
      <ServiceHero
        locale={locale}
        title={copy.heroTitle}
        description={copy.heroDescription}
        primaryCta={copy.primaryCta}
        secondaryCta={copy.secondaryCta}
        primaryHref={locale === 'en' ? '#quote' : '#presupuesto'}
        secondaryHref={copy.secondaryHref}
        eventLabel={`erp_${locale}_hero`}
        variant="erp"
      />

      <section className="dispatch-section dispatch-erp-problem" aria-labelledby="erp-problem-title">
        <div className="dispatch-container">
          <h2 id="erp-problem-title" className="dispatch-display">{copy.problemTitle}</h2>
          <div>
            {copy.problemParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="dispatch-section dispatch-sectors" aria-labelledby="erp-modules-title">
        <div className="dispatch-container">
          <div className="dispatch-section-heading">
            <h2 id="erp-modules-title" className="dispatch-display">{copy.modulesTitle}</h2>
            <p>{copy.modulesSubtitle}</p>
          </div>
          <div className="dispatch-erp-modules">
            {copy.modules.map((module) => (
              <article key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="dispatch-section dispatch-process" aria-labelledby="erp-process-title">
        <div className="dispatch-container">
          <div className="dispatch-section-heading">
            <h2 id="erp-process-title" className="dispatch-display">{copy.processTitle}</h2>
            <p>{copy.processSubtitle}</p>
          </div>
          <ol className="dispatch-process-list dispatch-process-list--five">
            {copy.process.map((item) => (
              <li key={item.step}>
                <span className="dispatch-process-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dispatch-section dispatch-pricing" aria-labelledby="erp-pricing-title">
        <div className="dispatch-container">
          <div className="dispatch-section-heading">
            <h2 id="erp-pricing-title" className="dispatch-display">{copy.pricingTitle}</h2>
            <p>{copy.pricingSubtitle}</p>
          </div>
          <div className="dispatch-pricing__grid">
            {copy.pricing.map((tier) => (
              <article key={tier.title}>
                <h3>{tier.title}</h3>
                <p className="dispatch-pricing__amount">{tier.amount}</p>
                <p>{tier.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        locale={locale}
        content={{ title: copy.faqTitle, subtitle: copy.faqSubtitle, items: copy.faq }}
        id="erp-faq"
        split
      />

      <section id={locale === 'en' ? 'quote' : 'presupuesto'} className="dispatch-diagnostic scroll-mt-24" aria-label={copy.formTitle}>
        <div className="dispatch-container dispatch-diagnostic__inner">
          <aside className="dispatch-diagnostic-aside" aria-labelledby="erp-form-title">
            <h2 id="erp-form-title">{copy.formTitle}</h2>
            <p className="dispatch-erp-form-subtitle">{copy.formSubtitle}</p>
          </aside>
          <ContactForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
