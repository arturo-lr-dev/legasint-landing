'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import { useIsMobile, usePrefersReducedMotion } from '@/lib/device';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
}

const PortfolioSection: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const projects: Project[] = [
    {
      title: "Valle Hub",
      description: "Discover your city",
      imageUrl: "/projects/offpeaks.webp",
      projectUrl: "https://www.vallehub.com/",
      tags: ["Ubication", "Commerces", "Offers", "Claude", "Supabase"]
    },
    {
      title: "SF Education",
      description: "Change the way of learning",
      imageUrl: "/projects/sfeducation.webp",
      projectUrl: "https://sfeducation.es",
      tags: ["Education", "Courses", "Responsive"]
    },
    {
      title: "LeCrep",
      description: "A modern web site atractive for the client",
      imageUrl: "/projects/lacrep.webp",
      projectUrl: "https://la-crep-webapp.web.app",
      tags: ["Small Client", "Landing Page", "Responsive"]
    },
    {
      title: "Sumeria",
      description: "Your best AI assistant for your business",
      imageUrl: "/projects/sumeria.webp",
      projectUrl: "https://github.com/arturo-lr-dev/sumeria",
      tags: ["AI", "Business", "Assistant", "Open Source"]
    },
    {
      title: "Smart Stadium Pricing",
      description: "Dynamic pricing for stadium events",
      imageUrl: "/projects/smart-stadium-pricing.webp",
      projectUrl: "https://github.com/arturo-lr-dev/stadium-smart-pricing",
      tags: ["ML", "Pricing", "Events", "Open Source"]
    },
    {
      title: "Ambar PRO",
      description: "Advanced Modelling Solutions for Complex Industrial Systems",
      imageUrl: "/projects/ambarpro.webp",
      projectUrl: "https://ambarpro.net",
      tags: ["Modelling", "Industrial", "Solutions"]
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
            backgroundImage: `url("${isMobile ? '/circuit-mobile.svg' : '/circuit.svg'}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        {/* Section Title */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-mono text-2xl font-bold text-white mb-4">
             {"// "} Our Projects
            </h2>
          </div>
        </Reveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 200} index={index} className="h-full">
              <TiltCard>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <div className="relative group bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 h-full">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-blue-200 mb-4">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Call to Action */}
        <Reveal delay={projects.length * 200}>
          <div className="text-center mt-16">
            <p className="font-mono text-xl text-blue-200 mb-8">
              Explore our portfolio of innovative solutions
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default PortfolioSection;
