'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { trackEvent, GA_EVENTS } from '@/lib/analytics';
import { useState, useEffect } from 'react';

export default function ContactPage() {
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
      className="min-h-screen w-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center pt-20 pb-16"
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
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-4xl mx-auto px-4 text-center"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto">
            We&apos;re here to help. Get in touch with us through any of these channels.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* WhatsApp Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #15803d 50%, #166534 100%)',
                  boxShadow: '0 0 30px rgba(34,197,94,0.4)',
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">WhatsApp</h2>
              <p className="text-blue-200 mb-6">Quick response</p>

              <p className="text-xl text-white font-semibold mb-6">
                +34 649 355 701
              </p>

              <a
                href="https://wa.me/34649355701?text=Hello%2C%20I%20would%20like%20to%20get%20more%20information%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-3 text-lg font-bold text-white rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_35px_rgba(34,197,94,0.7)] hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #15803d 50%, #166534 100%)',
                }}
                aria-label="Send a WhatsApp message"
                onClick={() => trackEvent(GA_EVENTS.WHATSAPP_CLICK, {
                  event_category: 'engagement',
                  event_label: 'contact_page_whatsapp_en'
                })}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  aria-hidden="true"
                />
                <span className="relative">Send message</span>
              </a>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
                  boxShadow: '0 0 30px rgba(139,92,246,0.4)',
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
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
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">Email</h2>
              <p className="text-blue-200 mb-6">For detailed inquiries</p>

              <p className="text-xl text-white font-semibold mb-6">
                arturo@legasint.com
              </p>

              <a
                href="mailto:arturo@legasint.com"
                className="group relative px-8 py-3 text-lg font-bold text-white rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #4f46e5 100%)',
                }}
                aria-label="Send an email"
                onClick={() => trackEvent(GA_EVENTS.CONTACT_CLICK, {
                  event_category: 'engagement',
                  event_label: 'contact_page_email_en'
                })}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  aria-hidden="true"
                />
                <span className="relative">Send email</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 text-blue-200"
        >
          <p className="text-lg">
            Business hours: Monday to Friday, 9:00 AM - 6:00 PM (CET)
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
