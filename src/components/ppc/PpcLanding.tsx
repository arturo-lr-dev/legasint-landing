'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ContactForm from '@/components/ContactForm';
import HeroBackground from '@/components/landing/three/HeroBackground';
import { homeCopy } from '@/i18n/home-copy';
import { trackEvent, trackOutboundContact, GA_EVENTS } from '@/lib/analytics';
import type { PpcLandingCopy } from '@/i18n/ppc-copy';

const process = [
  { step: '01', title: 'Descubrimiento', description: 'Entendemos tu negocio en una primera sesión gratuita.' },
  { step: '02', title: 'Propuesta', description: 'Alcance, tecnologías, plazos y precio cerrado. Sin sorpresas.' },
  { step: '03', title: 'Desarrollo', description: 'Sprints con entregas funcionales cada pocas semanas.' },
  { step: '04', title: 'Lanzamiento y soporte', description: 'Despliegue, documentación y evolutivo continuo.' },
];

const WHATSAPP_URL =
  'https://wa.me/34649355701?text=Hola%20Arturo%2C%20vi%20vuestra%20web%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto.%20%C2%BFCu%C3%A1ndo%20tienes%20un%20hueco%3F';

export default function PpcLanding({ copy }: { copy: PpcLandingCopy }) {
  useEffect(() => {
    trackEvent('ppc_landing_view', {
      event_category: 'ppc',
      event_label: copy.key,
    });
  }, [copy.key]);

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
        {/* Hero — message match con el anuncio */}
        <motion.header variants={fadeInUp} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {copy.h1}
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-8">
            {copy.tagline}
          </p>
          <a
            href="#formulario"
            onClick={() =>
              trackEvent(GA_EVENTS.CONTACT_CLICK, {
                event_label: `ppc_${copy.key}_hero`,
              })
            }
            className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
          >
            {copy.ctaPrimary}
          </a>
        </motion.header>

        {/* Prueba social */}
        <motion.section variants={fadeInUp} className="mb-16 text-center">
          <p className="text-sm uppercase tracking-widest text-blue-300/70 mb-4">
            {copy.proofTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {homeCopy.es.portfolio.projects.map((project) => (
              <span
                key={project.title}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-100 text-sm"
              >
                {project.title}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Beneficios */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {copy.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {copy.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-blue-200 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Proceso */}
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
                <span className="font-mono text-sm text-violet-400 font-bold">{item.step}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA final */}
        <motion.section variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">{copy.ctaFinal.title}</h2>
          <p className="text-blue-200 mb-6 max-w-2xl mx-auto">{copy.ctaFinal.subtitle}</p>
          <a
            href="#formulario"
            onClick={() =>
              trackEvent(GA_EVENTS.CONTACT_CLICK, {
                event_label: `ppc_${copy.key}_final`,
              })
            }
            className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
          >
            {copy.ctaPrimary}
          </a>
        </motion.section>

        {/* Formulario + contacto directo */}
        <motion.section variants={fadeInUp} id="formulario" className="scroll-mt-28">
          <ContactForm locale="es" />
          <div className="mt-6 text-center">
            <p className="text-blue-300/80 text-sm mb-3">¿Prefieres hablar directamente?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                onClick={(e) => {
                  e.preventDefault();
                  trackOutboundContact(WHATSAPP_URL, GA_EVENTS.WHATSAPP_CLICK, `ppc_${copy.key}`);
                }}
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-blue-100 text-sm font-medium hover:bg-white/10 transition-all"
              >
                💬 WhatsApp
              </a>
              <a
                href="mailto:arturo@legasint.com"
                onClick={(e) => {
                  e.preventDefault();
                  trackOutboundContact('mailto:arturo@legasint.com', GA_EVENTS.EMAIL_CLICK, `ppc_${copy.key}`);
                }}
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-blue-100 text-sm font-medium hover:bg-white/10 transition-all"
              >
                ✉️ arturo@legasint.com
              </a>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
