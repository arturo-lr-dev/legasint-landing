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

export const BlogList: React.FC<BlogListProps> = ({ posts, locale = 'es' }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  const title = locale === 'es' ? 'Blog' : 'Blog';
  const subtitle = locale === 'es'
    ? 'Explora nuestros artículos sobre tecnología y desarrollo'
    : 'Explore our articles about technology and development';
  const emptyMessage = locale === 'es'
    ? 'No hay artículos disponibles aún.'
    : 'No articles available yet.';

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
          <div className="text-center mb-16">
            <h1 className="font-mono text-4xl font-bold text-white mb-4">
              {'// '}{title}
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </AnimatedElement>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={`${post.locale}-${post.slug}`} post={post} index={index} />
            ))}
          </div>
        ) : (
          <AnimatedElement delay={200}>
            <div className="text-center py-20">
              <p className="text-blue-200 text-xl">{emptyMessage}</p>
            </div>
          </AnimatedElement>
        )}
      </div>
    </div>
  );
};

export default BlogList;
