'use client';
import { useState, useEffect } from 'react';

const AnimatedLanding = () => {
  const letters = "Legasint".split("");
  const tagline = "Your Vision, Our Technology".split(" ");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main
      className="h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center bg-center bg-no-repeat"
      style={{
        background: 'conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)',
        backgroundImage: `url("${isMobile ? '/bg-mobile.svg' : '/bg.svg'}"), conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: isMobile ? 'cover' : 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center">
        <h1 className="sr-only">Legasint - Your Vision, Our Technology</h1>
        
        {/* Logo Animation */}
        <div 
          className="flex items-center justify-center"
          aria-label="Legasint animated logo"
        >
          {letters.map((letter, index) => (
            <span
              key={index}
              className="notranslate text-7xl font-bold text-white animate-fadeInUp"
              style={{
                opacity: 0,
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
              aria-hidden="true"
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline Animation */}
        <div 
          className="flex items-center justify-center gap-3 mt-4 mb-12"
          aria-label="Company tagline"
        >
          {tagline.map((word, index) => (
            <span
              key={index}
              className="text-xl text-blue-300 font-light tracking-wide animate-fadeInUp"
              style={{
                opacity: 0,
                animationDelay: `${(letters.length * 150) + (index * 200)}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {word}
            </span>
          ))}
        </div>
        
        {/* Decorative Line */}
        <div 
          className="mb-12 animate-fadeIn"
          style={{
            opacity: 0,
            animationDelay: `${(letters.length * 150) + (tagline.length * 200) + 200}ms`,
            animationFillMode: 'forwards'
          }}
          aria-hidden="true"
        >
          <div className="h-1 w-48 mx-auto bg-blue-400 rounded-full animate-pulse" />
        </div>

        {/* Contact Button */}
        <div
          className="animate-fadeIn"
          style={{
            opacity: 0,
            animationDelay: `${(letters.length * 150) + (tagline.length * 200) + 400}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <button 
            className="group relative px-8 py-4 text-xl font-bold text-white bg-purple-800 rounded-full overflow-hidden bg-blue-700 transition-colors duration-300 animate-bounce-gentle"
            aria-label="Contact us via email"
          >
            {/* Glowing background effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 opacity-50 transition-opacity duration-300"
              aria-hidden="true"
            />
            
            {/* Button content */}
            <a 
              href="mailto:contact@legasint.com" 
              className="relative flex items-center justify-center gap-2"
              aria-label="Send email to contact@legasint.com"
            >
              Get in Touch
              <svg 
                className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </a>
          </button>
        </div>
      </div>

      {/* Technology Stack - Hidden visually but good for SEO */}
      <div className="sr-only">
        <p>Technology Stack: Angular, React, Node.js, Python, Java, AWS, Azure, Google Cloud, Docker, Kubernetes</p>
        <p>Industries Served: Finance, Healthcare, E-commerce, Manufacturing, Education, Technology</p>
      </div>
    </main>
  );
};

export default AnimatedLanding;