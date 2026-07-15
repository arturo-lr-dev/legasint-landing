'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const menuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' as const, delay: 0.1 },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll and allow closing with Escape while the menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  if (pathname === '/qr') return null;

  const isEnglish = pathname?.includes('/blog/en');
  const isBlogPage = pathname?.startsWith('/blog');

  const navLinks = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/blog', label: 'Blog', active: isBlogPage && !isEnglish },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && !menuOpen
          ? 'bg-black/30 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed inset-0 h-[100dvh] bg-[#060614]/90 backdrop-blur-2xl overflow-hidden"
          >
            {/* Ambient glow, matching the landing's blue → purple palette */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600/25 to-blue-400/15 blur-3xl"
              aria-hidden="true"
            />

            <motion.nav
              variants={listVariants}
              className="relative h-full flex flex-col justify-center px-8 pt-14"
              aria-label="Mobile navigation"
            >
              <motion.span
                variants={itemVariants}
                className="font-mono text-xs text-blue-300/70 tracking-widest uppercase mb-8"
              >
                {'<'} menu {'/>'}
              </motion.span>

              <ul className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-3"
                    >
                      <span className="font-mono text-xs text-blue-400/60 group-hover:text-blue-300 transition-colors">
                        0{index + 1}
                      </span>
                      <span
                        className={`text-4xl font-bold tracking-tight transition-colors ${
                          link.active
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300'
                            : 'text-white group-hover:text-blue-200'
                        }`}
                      >
                        {link.label}
                      </span>
                      {link.active && (
                        <span
                          className="self-center h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Language Selector */}
              {isBlogPage && (
                <motion.div variants={itemVariants} className="mt-10">
                  <div className="h-px w-16 bg-gradient-to-r from-blue-400/60 to-transparent mb-6" />
                  <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/15 bg-white/5">
                    <Link
                      href="/blog"
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                        !isEnglish
                          ? 'bg-gradient-to-r from-blue-500/40 to-purple-500/40 text-white shadow-inner'
                          : 'text-blue-200 hover:text-white'
                      }`}
                    >
                      ES
                    </Link>
                    <Link
                      href="/blog/en"
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isEnglish
                          ? 'bg-gradient-to-r from-blue-500/40 to-purple-500/40 text-white shadow-inner'
                          : 'text-blue-200 hover:text-white'
                      }`}
                    >
                      EN
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Footer tagline */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-10 left-8 right-8 flex items-center gap-3"
              >
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
                <span className="font-mono text-[10px] text-blue-300/50 tracking-widest uppercase whitespace-nowrap">
                  Your Vision, Our Technology
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-mono text-lg md:text-xl font-bold text-white hover:text-blue-200 transition-colors"
          >
            {'<'}Legasint{'/>'}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'text-white'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${
                isBlogPage && !isEnglish
                  ? 'text-white'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              Blog
            </Link>

            {/* Language Selector - Desktop */}
            {isBlogPage && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/20">
                <Link
                  href="/blog"
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    !isEnglish
                      ? 'bg-white/20 text-white'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  ES
                </Link>
                <Link
                  href="/blog/en"
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    isEnglish
                      ? 'bg-white/20 text-white'
                      : 'text-blue-200 hover:text-white'
                  }`}
                >
                  EN
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 -mr-2 flex items-center justify-center text-white"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${
                menuOpen ? 'rotate-45' : '-translate-y-[3.5px]'
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-out ${
                menuOpen ? '-rotate-45' : 'translate-y-[3.5px]'
              }`}
            />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
