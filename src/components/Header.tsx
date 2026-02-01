'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
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
        scrolled
          ? 'bg-black/30 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-xl font-bold text-white hover:text-blue-200 transition-colors"
          >
            {'<'}Legasint{'/>'}
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
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

            {/* Language Selector */}
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
