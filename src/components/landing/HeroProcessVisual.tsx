'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import { homeCopy, type HomeCopy, type Locale } from '@/i18n/home-copy';

type HeroProcessVisualProps = {
  visual: HomeCopy['hero']['visual'];
  locale: Locale;
};

const chipPositions = [
  { left: '7%', top: '14%', transform: 'rotate(-4deg)' },
  { left: '10%', top: '62%', transform: 'rotate(3deg)' },
  { left: '54%', top: '38%', transform: 'rotate(-2deg)' },
];

const chipIcons = [
  <svg key="sheet" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h8M8 9h2" />
  </svg>,
  <svg key="mail" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z" />
  </svg>,
  <svg key="chat" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>,
];

export default function HeroProcessVisual({ visual, locale }: HeroProcessVisualProps) {
  const [transformed, setTransformed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const project = homeCopy[locale].portfolio.projects.find((item) => item.title === 'Smart Stadium Pricing');
  const labels = locale === 'es'
    ? { flow: 'Del trabajo disperso a un sistema compartido' }
    : { flow: 'From scattered work to one shared system' };

  useEffect(() => {
    if (prefersReducedMotion) {
      setTransformed(true);
      return;
    }
    if (transformed) return;
    const timer = setTimeout(() => setTransformed(true), 1400);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion, transformed]);

  if (!project) return null;

  return (
    <motion.figure
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-2xl"
    >
      <div className="relative overflow-hidden rounded-3xl border border-brand-blue/30 bg-[#0d1530]/95 shadow-[0_30px_90px_-30px_rgba(37,99,235,0.55)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-violet-600/25" aria-hidden="true" />
        <div className="relative p-4 sm:p-5">
          <div className="mb-4 flex min-h-7 items-center" aria-hidden="true">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-violet-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </div>
          </div>

          <div className="relative h-60 overflow-hidden rounded-2xl border border-white/10 bg-[#111c3d]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              {transformed ? (
                <motion.div
                  key="after"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
                  className="relative h-full p-4"
                >
                  <div className="flex h-full overflow-hidden rounded-xl border border-violet-400/25 bg-gradient-to-br from-blue-950/90 to-violet-950/90">
                    <div className="hidden w-20 flex-col gap-2 border-r border-white/10 p-3 sm:flex" aria-hidden="true">
                      <span className="h-2 w-10 rounded-full bg-brand-blue/50" />
                      <span className="mt-2 h-2 w-12 rounded-full bg-white/15" />
                      <span className="h-2 w-12 rounded-full bg-white/15" />
                      <span className="h-2 w-12 rounded-full bg-white/15" />
                    </div>
                    <div className="flex-1 p-4">
                      <p className="text-xs font-medium text-brand-blue">{visual.afterLabel}</p>
                      <h2 className="mt-1 text-base font-semibold text-white">{visual.afterTitle}</h2>
                      <ul className="mt-3 space-y-2">
                        {visual.afterItems.map((item) => (
                          <li key={item} className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.055] px-2.5 py-2 text-xs text-brand-heading/90">
                            <svg className="h-3.5 w-3.5 shrink-0 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="before"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="relative h-full"
                >
                  <svg className="absolute inset-0 h-full w-full text-brand-blue/30" viewBox="0 0 500 208" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M90 55 C190 55 190 104 280 104" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
                    <path d="M100 155 C190 155 190 104 280 104" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
                    <path d="M350 105 C390 105 410 105 455 105" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
                  </svg>
                  {visual.beforeItems.map((item, index) => (
                    <div
                      key={item}
                      className="absolute flex items-center gap-2 rounded-xl border border-blue-300/25 bg-[#172750]/95 px-3 py-2 text-xs text-brand-heading shadow-lg shadow-black/20"
                      style={chipPositions[index]}
                    >
                      <span className="text-brand-blue">{chipIcons[index]}</span>
                      {item}
                    </div>
                  ))}
                  <div className="absolute bottom-3 right-3 rounded-md border border-dashed border-brand-body/25 px-2 py-1 text-[10px] text-brand-body/70">
                    {visual.beforeLabel}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: prefersReducedMotion ? 0 : 0.25 }}
            className="relative mt-4 aspect-[2/1] overflow-hidden rounded-2xl border border-violet-400/25"
          >
            <Image
              src="/projects/smart-stadium-pricing.webp"
              alt={`${project.title}: ${project.description}`}
              fill
              priority
              sizes="(min-width: 1280px) 560px, (min-width: 1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e24] via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
              <div>
                <p className="text-sm font-semibold text-white">{project.title}</p>
                <p className="mt-0.5 hidden text-xs text-blue-100/85 sm:block">{project.description}</p>
              </div>
              <a
                href="https://github.com/arturo-lr-dev/stadium-smart-pricing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('case_study_click', { event_category: 'navigation', event_label: 'home_hero_visual' })}
                className="shrink-0 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {homeCopy[locale].portfolio.cta}
              </a>
            </div>
          </motion.div>
          <figcaption className="mt-3 text-center text-xs text-brand-body/80">{labels.flow}</figcaption>
        </div>
      </div>
    </motion.figure>
  );
}
