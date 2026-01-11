'use client';
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
}

interface SocialCause {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on intersection status
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

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const SocialImpactSection: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
        backgroundImage: `url("${isMobile ? '/network-mobile.svg' : '/network.svg'}"), linear-gradient(to bottom left, #581c87, #1e3a8a)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: isMobile ? 'cover' : 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <AnimatedElement>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Social Impact
            </h2>
            <div className="h-1 w-32 bg-blue-400 mx-auto rounded-full animate-pulse" />
          </div>
        </AnimatedElement>

        {/* Social Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialCauses.map((cause, index) => (
            <AnimatedElement key={index} delay={index * 200}>
              <div className="relative group bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 text-center h-full">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                {/* Card content */}
                <div className="relative">
                  <div className="flex justify-center items-center text-blue-300 mb-4">
                    {cause.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {cause.title}
                  </h3>
                  <p className="text-blue-200">
                    {cause.description}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* Call to Action */}
        <AnimatedElement delay={socialCauses.length * 200}>
          <div className="text-center mt-16">
            <p className="text-xl text-blue-200 mb-8">
              Join us in our mission to create positive impact through technology
            </p>
            {false && <button className="group relative px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-full overflow-hidden hover:bg-blue-700 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              <span className="relative">Collaborate With Us</span>
            </button>}
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
};

export default SocialImpactSection;