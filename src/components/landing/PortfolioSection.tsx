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
      ? 'translate-x-[-20px] opacity-0'
      : 'translate-x-[20px] opacity-0';
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
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="w-full py-20 -mt-1 overflow-hidden"
      style={{
        backgroundImage: `url("${isMobile ? '/circuit-mobile.svg' : '/circuit.svg'}"), linear-gradient(to bottom left, #1e3a8a, #581c87)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        {/* Section Title */}
        <AnimatedElement>
          <div className="text-center mb-16">
            <h2 className="font-mono text-2xl font-bold text-white mb-4">
             {"// "} Our Projects
            </h2>
            {false && <div className="h-1 w-32 bg-blue-400 mx-auto rounded-full animate-pulse" />}
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
                          className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded"
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
            <p className="font-mono text-xl text-blue-200 mb-8">
              Explore our portfolio of innovative solutions
            </p>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default PortfolioSection;