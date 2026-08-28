'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { homeCopy, Locale } from '@/i18n/home-copy';

const FaqSection: React.FC<{ locale?: Locale }> = ({ locale = 'es' }) => {
  const copy = homeCopy[locale].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="relative w-full py-20 -mt-1 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 w-full">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-mono text-2xl font-bold text-white mb-4">
              {copy.title}
            </h2>
            <p className="text-blue-200/80 text-lg">{copy.subtitle}</p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          {copy.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={index} delay={index * 100} index={index}>
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-white font-semibold">{item.question}</span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-blue-300 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <p className="px-6 pb-5 text-blue-200 leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
