"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { trackEvent, GA_EVENTS } from "@/lib/analytics";
import { useState, useEffect } from "react";
import company from "@/data/company.json";

const webLinks = [
  {
    label: "Inicio",
    href: "/",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: "Portafolio",
    href: "/#portfolio",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/blog",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    label: "Contacto",
    href: "/contacto",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: company.linkedin,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: company.instagram,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function QrLandingClient() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const whatsappUrl = `https://wa.me/${company.phone.replace(/\+/g, "")}?text=${encodeURIComponent(
    company.whatsappMessage
  )}`;

  return (
    <main
      className="min-h-[100dvh] w-full flex items-center justify-center py-12 px-4"
      style={{
        background: isMobile
          ? "radial-gradient(circle at 50% 40%, #581c87 0%, #1e3a8a 100%)"
          : "conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)",
        backgroundImage: isMobile
          ? `url("/bg-mobile.svg"), radial-gradient(circle at 50% 40%, #581c87 0%, #1e3a8a 100%)`
          : `url("/bg.svg"), conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)`,
        backgroundBlendMode: "overlay",
        backgroundSize: isMobile ? "cover" : "auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md mx-auto"
      >
        {/* Profile Section */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center mb-8">
          {/* Logo Avatar */}
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(139,92,246,0.3)] overflow-hidden">
            <img
              src="/qr-avatar.png"
              alt="Legasint"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold text-white mb-1">{company.name}</h1>
          <p className="text-blue-200 text-sm mb-6">{company.tagline}</p>

          {/* Save Contact Button */}
          <a
            href="/contacto.vcf"
            download="Legasint_contacto.vcf"
            className="group relative flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:scale-105 bg-gradient-to-r from-violet-500 to-indigo-600"
            aria-label="Guardar contacto"
            onClick={() =>
              trackEvent(GA_EVENTS.CONTACT_CLICK, {
                event_category: "engagement",
                event_label: "qr_save_contact",
              })
            }
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
            <svg className="w-5 h-5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="relative">Guardar Contacto</span>
          </a>
        </motion.div>

        {/* Web Links */}
        <motion.div variants={fadeInUp} className="mb-6">
          <h2 className="text-xs font-semibold text-blue-300 uppercase tracking-widest text-center mb-3">
            Web
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {webLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-blue-200 group-hover:text-white transition-colors">
                  {link.icon}
                </div>
                <span className="text-sm font-medium text-white">{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={fadeInUp} className="mb-6">
          <h2 className="text-xs font-semibold text-blue-300 uppercase tracking-widest text-center mb-3">
            Redes
          </h2>
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
                aria-label={link.label}
                onClick={() =>
                  trackEvent(GA_EVENTS.SOCIAL_CLICK, {
                    event_category: "social",
                    event_label: link.label.toLowerCase(),
                  })
                }
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300" />
                <div className="text-white">{link.icon}</div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.div variants={fadeInUp} className="mb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 w-full px-6 py-4 text-lg font-bold text-white rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_35px_rgba(34,197,94,0.7)] hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #15803d 50%, #166534 100%)",
            }}
            aria-label="Contactar por WhatsApp"
            onClick={() =>
              trackEvent(GA_EVENTS.WHATSAPP_CLICK, {
                event_category: "engagement",
                event_label: "qr_whatsapp",
              })
            }
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 rounded-full opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-500 animate-pulse" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
            <svg className="w-7 h-7 relative" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="relative">WhatsApp</span>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div variants={fadeInUp} className="text-center">
          <Link
            href="/"
            className="text-xs text-blue-300 hover:text-white transition-colors"
          >
            legasint.com
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
