'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMeta;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0, variant = 'default' }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (element) observer.observe(element);
    return () => { if (element) observer.unobserve(element); };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(post.locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const blogUrl = post.locale === 'es' ? `/blog/${post.slug}` : `/blog/en/${post.slug}`;

  if (variant === 'featured') {
    return (
      <div
        ref={elementRef}
        className={`transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <Link href={blogUrl} className="group block">
          <article className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 hover:border-blue-400/30 hover:bg-white/15 transition-all duration-500">
            {/* Image */}
            {post.image && (
              <div className="relative h-64 lg:h-full min-h-[320px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/40" />
              </div>
            )}

            {/* Content */}
            <div className="relative p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] bg-blue-500/20 text-blue-200 rounded-md border border-blue-400/20">
                  {post.locale === 'es' ? 'Destacado' : 'Featured'}
                </span>
                <span className="text-[13px] text-blue-300/60 font-medium">
                  {formatDate(post.date)}
                </span>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-blue-100 transition-colors duration-300">
                {post.title}
              </h2>

              <p className="text-blue-200/70 leading-relaxed mb-6 line-clamp-3 text-[15px]">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs text-blue-200 bg-blue-500/20 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-blue-300 font-medium group-hover:gap-3 transition-all duration-300">
                <span>{post.locale === 'es' ? 'Leer artículo' : 'Read article'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </article>
        </Link>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        ref={elementRef}
        className={`transform transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
        style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
      >
        <Link href={blogUrl} className="group block">
          <article className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
            {post.image && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-blue-300/60 font-medium mb-1">{formatDate(post.date)}</p>
              <h3 className="text-sm font-semibold text-blue-100 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
            </div>
          </article>
        </Link>
      </div>
    );
  }

  // Default card
  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}
    >
      <Link href={blogUrl} className="group block h-full">
        <article className="relative h-full rounded-xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all duration-300">
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Image */}
          {post.image && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {/* Reading time badge */}
              <div className="absolute bottom-3 left-4">
                <span className="text-[11px] font-medium text-white/80 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
                  {post.readingTime} min
                </span>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="relative p-5 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <time className="text-[12px] text-blue-300 font-mono tracking-wide">
                {formatDate(post.date)}
              </time>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-200 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-blue-200/70 leading-relaxed line-clamp-2 mb-4">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] font-medium text-blue-200 bg-blue-500/20 rounded"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="px-2 py-0.5 text-[11px] text-blue-300/50">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          </div>

          {/* Bottom accent line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </article>
      </Link>
    </div>
  );
};

export default BlogCard;
