'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPostMeta } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMeta;
  index?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const getMobileAnimation = () => {
    const isEven = index % 2 === 0;
    return isEven
      ? 'translate-x-[-20px] opacity-0'
      : 'translate-x-[20px] opacity-0';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(post.locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const blogUrl = post.locale === 'es' ? `/blog/${post.slug}` : `/blog/en/${post.slug}`;

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-700 ${
        isVisible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : isMobile
          ? getMobileAnimation()
          : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
    >
      <Link href={blogUrl} className="block h-full">
        <article className="relative group bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 h-full">
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Post Image */}
          {post.image && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="p-6">
            {/* Date + Reading Time */}
            <div className="flex items-center gap-3 text-sm text-blue-300 font-mono">
              <time>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>
                {post.locale === 'es'
                  ? `${post.readingTime} min`
                  : `${post.readingTime} min`}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-blue-200 transition-colors">
              {post.title}
            </h3>

            <p className="text-blue-200 mb-4 line-clamp-3">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default BlogCard;
