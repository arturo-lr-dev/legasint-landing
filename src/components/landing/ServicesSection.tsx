'use client';
import React from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import { homeCopy, Locale } from '@/i18n/home-copy';

const icons = [
  // Code brackets
  <svg key="code" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  // Link
  <svg key="link" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>,
  // Chip / AI
  <svg key="chip" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>,
  // Compass / consulting
  <svg key="compass" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
];

const ServicesSection: React.FC<{ locale?: Locale }> = ({ locale = 'es' }) => {
  const copy = homeCopy[locale].services;
  const servicesHref = locale === 'en' ? '/services' : '/servicios';

  return (
    <div className="relative w-full py-20 -mt-1 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-mono text-2xl font-bold text-white mb-4">
              {copy.title}
            </h2>
            <p className="text-blue-200/80 text-lg">{copy.subtitle}</p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {copy.items.map((item, index) => (
            <Reveal key={index} delay={index * 100} index={index}>
              <div className="h-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 md:p-8 hover:bg-white/10 transition-colors">
                <div className="text-blue-300 mb-4">{icons[index]}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-blue-200/80 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <ul className="space-y-1.5">
                  {item.features.map((feature) => (
                    <li key={feature} className="text-blue-100/70 text-sm flex items-center gap-2">
                      <span className="text-violet-400" aria-hidden="true">›</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="text-center mt-10">
            <Link
              href={servicesHref}
              className="inline-block px-6 py-3 text-sm font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
            >
              {locale === 'en' ? 'See all services' : 'Ver todos los servicios'}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ServicesSection;
