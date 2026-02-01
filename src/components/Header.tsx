'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  const isEnglish = pathname?.includes('/blog/en');
  const isBlogPage = pathname?.startsWith('/blog');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-black/30 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link
            href="/"
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
            className="md:hidden p-2 text-white hover:text-blue-200 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2 pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isBlogPage && !isEnglish
                    ? 'text-white'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                Blog
              </Link>

              {/* Language Selector - Mobile */}
              {isBlogPage && (
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <span className="text-xs text-blue-300 mr-2">Idioma:</span>
                  <Link
                    href="/blog"
                    onClick={() => setMenuOpen(false)}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
                      !isEnglish
                        ? 'bg-white/20 text-white'
                        : 'text-blue-200 hover:text-white'
                    }`}
                  >
                    ES
                  </Link>
                  <Link
                    href="/blog/en"
                    onClick={() => setMenuOpen(false)}
                    className={`text-xs px-3 py-1.5 rounded transition-colors ${
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
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
