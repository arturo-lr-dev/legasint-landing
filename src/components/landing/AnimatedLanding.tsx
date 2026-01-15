'use client';
import { fadeInUp } from '@/lib/animations';
import { trackEvent, GA_EVENTS } from '@/lib/analytics';
import { motion } from 'framer-motion';
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
      className="h-[100dvh] w-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center bg-center bg-no-repeat"
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
      <div className="text-center">
        <h1 className="sr-only">Legasint - Your Vision, Our Technology</h1>
        
        {/* Logo / Company Name */}
        <motion.div variants={fadeInUp} className="mb-6">
          <span className="font-mono text-sm text-white tracking-widest uppercase">
            {"<"} Software Solutions {"/>"}
          </span>
        </motion.div>

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
          className="flex items-center justify-center gap-3 mt-4 mb-22"
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
          className="mb-4 animate-fadeIn mt-[67px] sm:mt-[130px]"
          style={{
            opacity: 0,
            animationDelay: `${(letters.length * 150) + (tagline.length * 200) + 200}ms`,
            animationFillMode: 'forwards'
          }}
          aria-hidden="true"
        >
          <div className="h-1 w-48 mx-auto bg-blue-400 rounded-full animate-pulse" />
        </div>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-blue-100 max-w-2xl p-4 mx-auto mb-10 mt-4 animate-fadeInUp"
          style={{
            opacity: 0,
            animationDelay: `400ms`,
            animationFillMode: 'forwards'
          }}
        >
          We transform your ideas into custom software solutions. <br className="" /> We develop technology that drives your business into the future.
        </motion.p>

        {/* Contact Buttons */}
        <div
          className="animate-fadeIn flex flex-row items-center justify-center gap-4"
          style={{
            opacity: 0,
            animationDelay: `${(letters.length * 150) + (tagline.length * 200) + 400}ms`,
            animationFillMode: 'forwards'
          }}
        >
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/34649355701?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 text-xl font-bold text-white rounded-full overflow-hidden transition-all duration-300 animate-bounce-gentle shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_35px_rgba(34,197,94,0.7)] hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #15803d 50%, #166534 100%)',
            }}
            aria-label="Contact us via WhatsApp"
            onClick={() => trackEvent(GA_EVENTS.WHATSAPP_CLICK, {
              event_category: 'engagement',
              event_label: 'whatsapp_button'
            })}
          >
            {/* Animated glow ring */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 rounded-full opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              aria-hidden="true"
            />

            {/* Shine effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-2 drop-shadow-lg">
              <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
              >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              
            </span>
          </a>

          {/* Email Button */}
          <a
            href="mailto:contact@legasint.com"
            className="group relative px-8 py-4 text-xl font-bold text-white rounded-full overflow-hidden transition-all duration-300 animate-bounce-gentle shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:scale-105"
            style={{
              animationDelay: '0.15s',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
            }}
            aria-label="Contact us via email"
            onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, {
              event_category: 'engagement',
              event_label: 'email_button'
            })}
          >
            {/* Animated glow ring */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-500 rounded-full opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              aria-hidden="true"
            />

            {/* Shine effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              aria-hidden="true"
            />

            {/* Button content */}
            <span className="relative flex items-center justify-center gap-2 drop-shadow-lg">
              <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
              >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
              </svg>
              
            </span>
          </a>
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