'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import slugMap from '@/data/slug-map.json';
import { GA_EVENTS, trackEvent } from '@/lib/analytics';

const menuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' as const } },
};

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  if (pathname === '/qr') return null;

  const isEnglish =
    pathname === '/en' ||
    !!pathname?.startsWith('/en/') ||
    pathname === '/contact' ||
    pathname === '/custom-erp' ||
    pathname === '/services' ||
    pathname === '/privacy-policy' ||
    !!pathname?.startsWith('/blog/en');
  const isBlogPage = !!pathname?.startsWith('/blog');

  const homeHref = isEnglish ? '/en' : '/';
  const servicesHref = isEnglish ? '/services' : '/servicios';
  const erpHref = isEnglish ? '/custom-erp' : '/erp-a-medida';
  const blogHref = isEnglish ? '/blog/en' : '/blog';

  const navLinks = [
    { href: homeHref, label: isEnglish ? 'Home' : 'Inicio', active: pathname === homeHref },
    { href: servicesHref, label: isEnglish ? 'Services' : 'Servicios', active: pathname === servicesHref },
    { href: erpHref, label: isEnglish ? 'Custom ERP' : 'ERP a medida', active: pathname === erpHref },
    { href: blogHref, label: 'Blog', active: isBlogPage },
  ];

  const diagnosticHref =
    pathname === '/' || pathname === '/en'
      ? '#diagnostico'
      : pathname === '/servicios' || pathname === '/services'
        ? '#formulario'
        : isEnglish
          ? '/en#diagnostico'
          : '/#diagnostico';
  const diagnosticLabel = isEnglish ? 'Free assessment' : 'Diagnóstico gratuito';
  const mobileDiagnosticLabel = isEnglish ? diagnosticLabel : 'Diagnóstico';

  const trackDiagnosticClick = (eventLabel: 'header_desktop' | 'header_mobile') => {
    trackEvent(GA_EVENTS.CONTACT_CLICK, {
      event_category: 'lead',
      event_label: eventLabel,
    });
  };

  const getAlternateUrl = (targetLocale: 'es' | 'en'): string => {
    const path = pathname || '/';

    if (path === '/' || path === '/en') return targetLocale === 'en' ? '/en' : '/';
    if (path === '/servicios' || path === '/services')
      return targetLocale === 'en' ? '/services' : '/servicios';
    if (path === '/erp-a-medida' || path === '/custom-erp')
      return targetLocale === 'en' ? '/custom-erp' : '/erp-a-medida';
    if (path === '/contacto' || path === '/contact')
      return targetLocale === 'en' ? '/contact' : '/contacto';
    if (path === '/blog' || path === '/blog/en')
      return targetLocale === 'en' ? '/blog/en' : '/blog';

    const blogPostMatch = path.match(/^\/blog\/(en\/)?([^/]+)$/);
    if (blogPostMatch) {
      const slug = blogPostMatch[2];
      const key = `${targetLocale === 'en' ? 'es' : 'en'}:${slug}` as keyof typeof slugMap.posts;
      const alternate = slugMap.posts[key];
      if (alternate) return targetLocale === 'en' ? `/blog/en/${alternate}` : `/blog/${alternate}`;
      return targetLocale === 'en' ? '/en' : '/';
    }

    const tagMatch = path.match(/^\/blog\/(en\/)?tag\/([^/]+)$/);
    if (tagMatch) {
      const tag = decodeURIComponent(tagMatch[2]).toLowerCase();
      const exists = targetLocale === 'en'
        ? (slugMap.tagsEn as string[]).includes(tag)
        : (slugMap.tagsEs as string[]).includes(tag);
      if (exists) {
        const encoded = encodeURIComponent(tag);
        return targetLocale === 'en' ? `/blog/en/${encoded}` : `/blog/${encoded}`;
      }
      return targetLocale === 'en' ? '/blog/en' : '/blog';
    }

    return targetLocale === 'en' ? '/en' : '/';
  };

  const esUrl = getAlternateUrl('es');
  const enUrl = getAlternateUrl('en');
  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-canvas';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled && !menuOpen
          ? 'border-b border-white/10 bg-brand-canvas/90 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            key="mobile-menu"
            id="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="brand-page fixed inset-0 z-40 h-[100dvh] overflow-y-auto overscroll-contain md:hidden"
          >
            <nav className="mx-auto flex min-h-full w-full max-w-sm flex-col justify-center px-6 py-24" aria-label={isEnglish ? 'Mobile navigation' : 'Navegación móvil'}>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={link.active ? 'page' : undefined}
                      className={`block rounded-sm py-4 text-3xl font-semibold tracking-tight transition-colors ${focusRing} ${
                        link.active ? 'text-brand-blue' : 'text-brand-heading hover:text-brand-blue'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={diagnosticHref}
                onClick={() => {
                  trackDiagnosticClick('header_mobile');
                  setMenuOpen(false);
                }}
                className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-xl brand-button-primary px-5 py-3 text-center text-sm font-semibold text-white transition-shadow ${focusRing}`}
              >
                {diagnosticLabel}
              </Link>

              <div className="mt-8" role="group" aria-label={isEnglish ? 'Language' : 'Idioma'}>
                <div className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/[0.04] p-1">
                  <Link
                    href={esUrl}
                    onClick={() => setMenuOpen(false)}
                    hrefLang="es"
                    aria-current={!isEnglish ? 'page' : undefined}
                    className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                      !isEnglish ? 'bg-white/15 text-white' : 'text-brand-body hover:text-white'
                    }`}
                  >
                    ES
                  </Link>
                  <Link
                    href={enUrl}
                    onClick={() => setMenuOpen(false)}
                    hrefLang="en"
                    aria-current={isEnglish ? 'page' : undefined}
                    className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                      isEnglish ? 'bg-white/15 text-white' : 'text-brand-body hover:text-white'
                    }`}
                  >
                    EN
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-50 mx-auto max-w-6xl px-4">
        <nav className="flex h-14 items-center justify-between md:h-16" aria-label={isEnglish ? 'Main navigation' : 'Navegación principal'}>
          <Link
            href={homeHref}
            onClick={() => setMenuOpen(false)}
            className={`shrink-0 rounded-sm font-mono text-lg font-bold text-white transition-colors hover:text-brand-blue md:text-xl ${focusRing}`}
          >
            {'<'}Legasint{'/>'}
          </Link>

          <div className="hidden items-center gap-4 md:flex lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.active ? 'page' : undefined}
                className={`whitespace-nowrap rounded-sm text-sm font-medium transition-colors ${focusRing} ${
                  link.active ? 'text-white' : 'text-brand-body hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="ml-2 flex items-center gap-1 border-l border-white/20 pl-2 lg:ml-4 lg:gap-2 lg:pl-4" role="group" aria-label={isEnglish ? 'Language' : 'Idioma'}>
              <Link
                href={esUrl}
                hrefLang="es"
                aria-current={!isEnglish ? 'page' : undefined}
                className={`rounded px-2 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                  !isEnglish ? 'bg-white/15 text-white' : 'text-brand-body hover:text-white'
                }`}
              >
                ES
              </Link>
              <Link
                href={enUrl}
                hrefLang="en"
                aria-current={isEnglish ? 'page' : undefined}
                className={`rounded px-2 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                  isEnglish ? 'bg-white/15 text-white' : 'text-brand-body hover:text-white'
                }`}
              >
                EN
              </Link>
            </div>

            <Link
              href={diagnosticHref}
              onClick={() => trackDiagnosticClick('header_desktop')}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl brand-button-primary px-3 py-2 text-xs font-semibold text-white transition-shadow lg:px-4 lg:text-sm ${focusRing}`}
            >
              {diagnosticLabel}
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <Link
              href={diagnosticHref}
              onClick={() => trackDiagnosticClick('header_mobile')}
              className={`${menuOpen ? 'hidden' : 'inline-flex'} items-center justify-center whitespace-nowrap rounded-xl brand-button-primary px-3 py-2 text-xs font-semibold leading-none text-white transition-shadow ${focusRing}`}
            >
              {mobileDiagnosticLabel}
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative -mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${focusRing}`}
              aria-label={menuOpen
                ? isEnglish ? 'Close menu' : 'Cerrar menú'
                : isEnglish ? 'Open menu' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none ${menuOpen ? 'rotate-45' : '-translate-y-1'}`} />
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-200 motion-reduce:transition-none ${menuOpen ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
