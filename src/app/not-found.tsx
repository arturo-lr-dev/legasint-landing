'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const digits = "404".split("");

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: isMobile
          ? 'radial-gradient(circle at 50% 40%, #581c87 0%, #1e3a8a 100%)'
          : 'conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)',
        backgroundImage: isMobile
          ? `url("/bg-mobile.svg"), radial-gradient(circle at 50% 40%, #581c87 0%, #1e3a8a 100%)`
          : `url("/bg.svg"), conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: isMobile ? 'cover' : 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center px-4">
        {/* Error Code */}
        <div className="flex items-center justify-center mb-6">
          {digits.map((digit, index) => (
            <span
              key={index}
              className="text-8xl md:text-9xl font-bold text-white animate-fadeInUp"
              style={{
                opacity: 0,
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {digit}
            </span>
          ))}
        </div>

        {/* Message */}
        <p
          className="text-xl md:text-2xl text-blue-200 mb-4 animate-fadeInUp"
          style={{
            opacity: 0,
            animationDelay: '450ms',
            animationFillMode: 'forwards'
          }}
        >
          Página no encontrada
        </p>

        <p
          className="text-blue-300 mb-8 max-w-md mx-auto animate-fadeInUp"
          style={{
            opacity: 0,
            animationDelay: '600ms',
            animationFillMode: 'forwards'
          }}
        >
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Decorative Line */}
        <div
          className="mb-8 animate-fadeIn"
          style={{
            opacity: 0,
            animationDelay: '750ms',
            animationFillMode: 'forwards'
          }}
        >
          <div className="h-1 w-32 mx-auto bg-blue-400 rounded-full animate-pulse" />
        </div>

        {/* Navigation Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn"
          style={{
            opacity: 0,
            animationDelay: '900ms',
            animationFillMode: 'forwards'
          }}
        >
          <Link
            href="/"
            className="group relative px-8 py-3 text-lg font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
            }}
          >
            <span className="relative flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Ir al Inicio
            </span>
          </Link>

          <Link
            href="/blog"
            className="px-8 py-3 text-lg font-semibold text-blue-200 rounded-full border border-blue-400/50 hover:bg-white/10 transition-all duration-300"
          >
            Ver Blog
          </Link>
        </div>

        {/* Code decoration */}
        <div
          className="mt-12 font-mono text-sm text-blue-400/60 animate-fadeIn"
          style={{
            opacity: 0,
            animationDelay: '1050ms',
            animationFillMode: 'forwards'
          }}
        >
          <span className="text-purple-400">{"<"}</span>
          <span className="text-blue-300">Error</span>
          <span className="text-purple-400">{" />"}</span>
          <span className="text-blue-400/40">{" // Page not found"}</span>
        </div>
      </div>
    </main>
  );
}
