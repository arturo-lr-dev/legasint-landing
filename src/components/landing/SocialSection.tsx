'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import { useIsMobile, usePrefersReducedMotion } from '@/lib/device';

interface SocialCause {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SocialImpactSection: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const socialCauses: SocialCause[] = [
    {
      title: "Digital Education",
      description: "We provide free technology training to underprivileged communities",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Sustainability",
      description: "We develop technological solutions to reduce environmental impact",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Digital Inclusion",
      description: "Making technology accessible for people with diverse abilities",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 -mt-1 overflow-hidden"
    >
      {/* Parallax background texture (gated on mounted to avoid a
          desktop/mobile SVG flash before the breakpoint is known) */}
      {mounted && (
        <motion.div
          className="absolute inset-x-0 -inset-y-[10%]"
          style={{
            y: prefersReducedMotion ? 0 : parallaxY,
            backgroundImage: `url("${isMobile ? '/network-mobile.svg' : '/network.svg'}")`,
            backgroundSize: isMobile ? 'cover' : 'auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-mono text-2xl font-bold text-white mb-4">
              {"/* "} Our Social Impact {" */"}
            </h2>
            <p className="text-blue-200/80 text-lg max-w-xl mx-auto">
              Technology with purpose, beyond the code
            </p>
          </div>
        </Reveal>

        {/* Social Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialCauses.map((cause, index) => (
            <Reveal key={index} delay={index * 200} index={index} className="h-full">
              <TiltCard>
                {/* Gradient border wrapper */}
                <div className="relative group h-full rounded-2xl p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent">
                  <div className="relative h-full rounded-2xl bg-white/10 backdrop-blur-lg p-8 pt-10 overflow-hidden group-hover:bg-white/[0.14] transition-colors duration-300 text-center">
                    {/* Glow blob that breathes on hover */}
                    <div
                      className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 blur-3xl opacity-50 group-hover:opacity-90 group-hover:scale-125 transition-all duration-700"
                      aria-hidden="true"
                    />

                    {/* Code-style index */}
                    <span
                      className="absolute top-4 left-5 font-mono text-sm text-blue-300/50 group-hover:text-blue-300 transition-colors duration-300"
                      aria-hidden="true"
                    >
                      {`0${index + 1}`}
                    </span>

                    {/* Card content */}
                    <div className="relative">
                      {/* Icon in glowing gradient badge */}
                      <div className="relative w-20 h-20 mx-auto mb-6">
                        <div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-25 blur-md group-hover:opacity-60 transition-opacity duration-500"
                          aria-hidden="true"
                        />
                        <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/25 to-purple-600/25 border border-white/20 text-blue-200 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                          {cause.icon}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3">
                        {cause.title}
                      </h3>
                      <p className="text-blue-200 leading-relaxed">
                        {cause.description}
                      </p>

                      {/* Accent underline that expands on hover */}
                      <div
                        className="mt-6 h-[2px] w-10 group-hover:w-24 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Call to Action */}
        <Reveal delay={socialCauses.length * 200}>
          <div className="text-center mt-20">
            <div className="flex items-center justify-center gap-6 mb-6" aria-hidden="true">
              <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-blue-400/60" />
              <svg className="w-5 h-5 text-purple-300/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-purple-400/60" />
            </div>
            <p className="font-mono text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto">
              Join us in our mission to create{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-bold">
                positive impact
              </span>{' '}
              through technology
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default SocialImpactSection;
