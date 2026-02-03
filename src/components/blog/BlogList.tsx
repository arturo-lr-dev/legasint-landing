'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  locale?: string;
}

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const POSTS_PER_PAGE = 6;

export const BlogList: React.FC<BlogListProps> = ({ posts, locale = 'es' }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
    );
  });

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  // Infinite scroll
  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          // Small delay for smooth loading experience
          setTimeout(() => {
            setVisibleCount((prev) => prev + POSTS_PER_PAGE);
            setIsLoading(false);
          }, 300);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasMore, isLoading]);

  if (!mounted) return null;

  const title = locale === 'es' ? 'Blog' : 'Blog';
  const subtitle = locale === 'es'
    ? 'Explora nuestros artículos sobre tecnología y desarrollo'
    : 'Explore our articles about technology and development';
  const emptyMessage = locale === 'es'
    ? 'No hay artículos disponibles aún.'
    : 'No articles available yet.';
  const searchPlaceholder = locale === 'es' ? 'Buscar artículos...' : 'Search articles...';
  const noResultsText = locale === 'es' ? 'No se encontraron artículos.' : 'No articles found.';

  return (
    <div
      className="w-full min-h-screen py-20 overflow-hidden"
      style={{
        backgroundImage: `url("${isMobile ? '/circuit-mobile.svg' : '/circuit.svg'}"), linear-gradient(to bottom left, #1e3a8a, #581c87)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 w-full pt-16">
        {/* Section Title */}
        <AnimatedElement>
          <div className="text-center mb-8">
            <h1 className="font-mono text-4xl font-bold text-white mb-4">
              {'// '}{title}
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </AnimatedElement>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(POSTS_PER_PAGE);
              }}
              placeholder={searchPlaceholder}
              className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200/60 focus:outline-none focus:border-white/40 transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <AnimatedElement delay={200}>
            <div className="text-center py-20">
              <p className="text-blue-200 text-xl">{emptyMessage}</p>
            </div>
          </AnimatedElement>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-blue-200 text-xl">{noResultsText}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visiblePosts.map((post, index) => (
                <BlogCard key={`${post.locale}-${post.slug}`} post={post} index={index} />
              ))}
            </div>
            {/* Infinite scroll trigger */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center mt-12 py-8">
                {isLoading && (
                  <div className="flex items-center gap-3 text-blue-200">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="font-mono text-sm">
                      {locale === 'es' ? 'Cargando...' : 'Loading...'}
                    </span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
