'use client';

import { useEffect, useState } from 'react';

const AnimatedLanding = () => {
  const [mounted, setMounted] = useState(false);
  const letters = "LegaSint".split("");
  const tagline = "Your Vision, Our Technology".split(" ");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="flex items-center justify-center mb-12">
            {letters.map((letter, index) => (
              <span key={index} className="text-7xl font-bold text-white opacity-0">
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="flex items-center justify-center">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="text-7xl font-bold text-white animate-fadeInUp"
              style={{
                opacity: 0,
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline Animation */}
        <div className="flex items-center justify-center gap-3 mt-4 mb-12">
          {tagline.map((word, index) => (
            <span
              key={index}
              className="text-2xl text-blue-300 font-light tracking-wide animate-fadeInUp"
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
            className="group relative px-8 py-4 text-xl font-bold text-white bg-blue-600 rounded-full overflow-hidden hover:bg-blue-700 transition-colors duration-300 animate-bounce-gentle"
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            
            {/* Button content */}
            <a href="tel:34649355701" className="relative flex items-center justify-center gap-2">
              Contact Us
              <svg 
                className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
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
    </div>
  );
};

export default AnimatedLanding;