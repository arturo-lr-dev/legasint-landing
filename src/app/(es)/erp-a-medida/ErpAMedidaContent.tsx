'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ContactForm from '@/components/ContactForm';
import HeroBackground from '@/components/landing/three/HeroBackground';

const modules = [
  {
    title: 'Ventas y CRM',
    description: 'Gestión de clientes, presupuestos, pedidos y facturación.',
  },
  {
    title: 'Compras y proveedores',
    description: 'Órdenes de compra, recepción de mercancía y control de proveedores.',
  },
  {
    title: 'Almacén e inventario',
    description: 'Stock en tiempo real, ubicaciones, lotes y trazabilidad.',
  },
  {
    title: 'Producción',
    description: 'Planificación, órdenes de fabricación y control de costes.',
  },
  {
    title: 'RRHH',
    description: 'Fichajes, vacaciones, nóminas y evaluación de desempeño.',
  },
  {
    title: 'Finanzas y contabilidad',
    description: 'Tesorería, presupuestos, analítica y cierre contable.',
  },
];

const process = [
  {
    step: '01',
    title: 'Análisis',
    description: 'Mapeamos tus procesos y detectamos qué debe cubrir el ERP.',
  },
  {
    step: '02',
    title: 'Propuesta',
    description: 'Alcance, módulos, integraciones, plazos y precio cerrado.',
  },
  {
    step: '03',
    title: 'Desarrollo',
    description: 'Sprints con demos funcionales cada pocas semanas.',
  },
  {
    step: '04',
    title: 'Implantación',
    description: 'Migración de datos, formación y puesta en producción.',
  },
  {
    step: '05',
    title: 'Evolución',
    description: 'Mantenimiento, mejoras y nuevos módulos a medida.',
  },
];

const faq = [
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

export default function ErpAMedidaContent() {
  return (
    <main
      className="min-h-screen w-full pt-28 pb-16 px-4"
      style={{
        background:
          'conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)',
        backgroundImage: `url("/bg.svg"), conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <HeroBackground />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Hero */}
        <motion.header variants={fadeInUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ERP a medida para empresas
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-6">
            Software de gestión empresarial diseñado específicamente para tus procesos.
            Ventas, compras, almacén, producción, RRHH y finanzas integrados en un solo sistema.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#presupuesto"
              className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
            >
              Solicitar presupuesto
            </Link>
            <Link
              href="/contacto"
              className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Hablar con nosotros
            </Link>
          </div>
        </motion.header>

        {/* Problem */}
        <motion.section variants={fadeInUp} className="mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              ¿Tu ERP actual no encaja con tu negocio?
            </h2>
            <p className="text-blue-200 leading-relaxed mb-4">
              Los ERP estándar obligan a adaptar tus procesos al software. Con un ERP a medida,
              el software se adapta a tu forma de trabajar: sin módulos que no usas, sin licencias
              por usuario disparatadas y sin depender de un proveedor que tarda meses en cambiar
              una pantalla.
            </p>
            <p className="text-blue-200 leading-relaxed">
              Especialmente indicado para <strong className="text-white">pymes industriales,
              distribuidoras y empresas de servicios</strong> que han crecido más allá de lo que
              Excel o un ERP básico pueden gestionar.
            </p>
          </div>
        </motion.section>

        {/* Modules */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Módulos habituales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.title}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Process */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Cómo trabajamos
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10"
              >
                <span className="font-mono text-sm text-violet-400 font-bold">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section variants={fadeInUp} className="mb-16">
          <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl p-8 border border-violet-500/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Inversión orientativa
            </h2>
            <p className="text-blue-200 mb-4 max-w-2xl mx-auto">
              Un ERP a medida es una inversión, no un gasto. Recuperas el coste en eficiencia
              y decisiones mejor informadas.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 rounded-xl p-5">
                <p className="text-violet-300 text-sm font-semibold mb-1">ERP básico</p>
                <p className="text-2xl font-bold text-white">desde 15.000 €</p>
                <p className="text-blue-200 text-sm mt-2">3-4 módulos, pyme pequeña</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 border-2 border-violet-500/50">
                <p className="text-violet-300 text-sm font-semibold mb-1">ERP estándar</p>
                <p className="text-2xl font-bold text-white">desde 30.000 €</p>
                <p className="text-blue-200 text-sm mt-2">5-6 módulos, empresa en crecimiento</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <p className="text-violet-300 text-sm font-semibold mb-1">ERP complejo</p>
                <p className="text-2xl font-bold text-white">desde 60.000 €</p>
                <p className="text-blue-200 text-sm mt-2">multi-almacén, producción, integraciones</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Preguntas frecuentes sobre ERP a medida
          </h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-blue-200 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA + Form */}
        <motion.section variants={fadeInUp} id="presupuesto" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Hablamos de tu ERP?
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Cuéntanos qué necesitas y te preparamos una propuesta sin compromiso.
            </p>
          </div>
          <ContactForm locale="es" />
        </motion.section>
      </motion.div>
    </main>
  );
}
