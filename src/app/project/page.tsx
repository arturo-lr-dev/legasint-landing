'use client';
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  index?: number;
}

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0, index = 0 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getMobileAnimation = () => {
    // Alternate between left and right animations for mobile
    const isEven = index % 2 === 0;
    return isEven
      ? 'translate-x-[-100%] opacity-0'
      : 'translate-x-[100%] opacity-0';
  };

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ${
        isVisible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : isMobile
          ? getMobileAnimation()
          : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const PortfolioSection: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  
  const projects: Project[] = [
    {
      title: "LeCrep",
      description: "A modern web site atractive for the client",
      imageUrl: "/projects/lacrep.png",
      projectUrl: "https://la-crep-webapp.web.app",
      tags: ["Next.js", "Tailwind CSS"]
    },
    {
      title: "OffPeaks",
      description: "SaaS for make offers in off peaks hours",
      imageUrl: "/projects/offpeaks.png",
      projectUrl: "https://offpeaks.es",
      tags: ["Ionic", "React", "Java", "Spring", "Auth0", "Stripe", "Postgres"]
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full bg-gradient-to-br from-purple-900 to-blue-900 py-20 -mt-1">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <AnimatedElement>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Projects
            </h2>
            <div className="h-1 w-32 bg-blue-400 mx-auto rounded-full animate-pulse" />
          </div>
        </AnimatedElement>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedElement key={index} delay={index * 200} index={index}>
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
                    <img 
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
                          className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </AnimatedElement>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedElement delay={projects.length * 200}>
          <div className="text-center mt-16">
            <p className="text-xl text-blue-200 mb-8">
              Explore our portfolio of innovative solutions
            </p>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default PortfolioSection;