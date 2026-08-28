'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ContactForm from '@/components/ContactForm';
import HeroBackground from '@/components/landing/three/HeroBackground';
import { homeCopy } from '@/i18n/home-copy';

export default function ServiciosContent() {
  const services = homeCopy.es.services.items;

  const process = [
    {
      step: '01',
      title: 'Descubrimiento',
      description: 'Entendemos tu negocio, procesos y objetivos en una primera sesión gratuita.',
    },
    {
      step: '02',
      title: 'Propuesta',
      description: 'Definimos alcance, tecnologías, plazos y precio cerrado. Sin sorpresas.',
    },
    {
      step: '03',
      title: 'Desarrollo',
      description: 'Construimos por sprints con entregas funcionales cada pocas semanas.',
    },
    {
      step: '04',
      title: 'Lanzamiento y soporte',
      description: 'Despliegue, documentación y mantenimiento evolutivo continuo.',
    },
  ];

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
        {/* Header */}
        <motion.header variants={fadeInUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Servicios
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
            Desarrollamos software a medida que se adapta a tu negocio, no al revés.
          </p>
        </motion.header>

        {/* Services Grid */}
        <section className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
            >
              <h2 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h2>
              <p className="text-blue-200 leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="text-blue-100 flex items-center gap-2">
                    <span className="text-violet-400" aria-hidden="true">›</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>

        {/* Process */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Cómo trabajamos
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="font-mono text-sm text-violet-400 font-bold">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
            Cuéntanos qué necesitas y te preparamos una propuesta sin compromiso.
          </p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
          >
            Solicitar presupuesto
          </Link>
        </motion.section>

        {/* Form */}
        <motion.section variants={fadeInUp}>
          <ContactForm locale="es" />
        </motion.section>
      </motion.div>
    </main>
  );
}
