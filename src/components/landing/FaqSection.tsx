'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from '@/lib/device';
import { homeCopy, type HomeCopy, type Locale } from '@/i18n/home-copy';

type FaqSectionProps = {
  locale?: Locale;
  content?: HomeCopy['faq'];
  id?: string;
};

export default function FaqSection({ locale = 'es', content, id = 'faq' }: FaqSectionProps) {
  const copy = content ?? homeCopy[locale].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id={id} className="px-4 py-16 md:py-24" aria-labelledby={`${id}-title`}>
      <Reveal className="mx-auto w-full max-w-3xl">
        <div>
          <h2 id={`${id}-title`} className="text-balance text-3xl font-bold tracking-tight text-brand-heading md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-brand-body md:text-lg">{copy.subtitle}</p>
        </div>

        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {copy.items.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `${baseId}-button-${index}`;
            const panelId = `${baseId}-panel-${index}`;
            return (
              <div key={item.question}>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-sm px-1 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-pretty font-semibold text-brand-heading">{item.question}</span>
                  <svg
                    className={`h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-1 pb-5 text-pretty text-sm leading-relaxed text-brand-body sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
