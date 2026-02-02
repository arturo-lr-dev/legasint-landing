'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BlogPostMeta } from '@/lib/blog';

interface BlogPostViewProps {
  post: BlogPost;
  children: React.ReactNode;
  previousPost?: BlogPostMeta | null;
  nextPost?: BlogPostMeta | null;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, children, previousPost, nextPost }) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(post.locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const backText = post.locale === 'es' ? '← Volver al blog' : '← Back to blog';
  const blogUrl = post.locale === 'es' ? '/blog' : '/blog/en';
  const previousText = post.locale === 'es' ? '← Artículo anterior' : '← Previous article';
  const nextText = post.locale === 'es' ? 'Siguiente artículo →' : 'Next article →';
  const getPostUrl = (slug: string) => post.locale === 'es' ? `/blog/${slug}` : `/blog/en/${slug}`;

  if (!mounted) return null;

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
      <article className="max-w-4xl mx-auto px-4 pt-16">
        {/* Back Link */}
        <Link
          href={blogUrl}
          className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors mb-8"
        >
          {backText}
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-blue-200 mb-4">
            {post.description}
          </p>

          <time className="text-blue-300 font-mono">
            {formatDate(post.date)}
          </time>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-10 border border-white/10">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>

        {/* Article Navigation */}
        {(previousPost || nextPost) && (
          <nav className="mt-12 pt-8 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Previous Article */}
              <div className="flex flex-col">
                {previousPost && (
                  <Link
                    href={getPostUrl(previousPost.slug)}
                    className="group p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
                  >
                    <span className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                      {previousText}
                    </span>
                    <p className="mt-1 text-white font-medium group-hover:text-blue-200 transition-colors line-clamp-2">
                      {previousPost.title}
                    </p>
                  </Link>
                )}
              </div>

              {/* Next Article */}
              <div className="flex flex-col md:items-end">
                {nextPost && (
                  <Link
                    href={getPostUrl(nextPost.slug)}
                    className="group p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all md:text-right"
                  >
                    <span className="text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                      {nextText}
                    </span>
                    <p className="mt-1 text-white font-medium group-hover:text-blue-200 transition-colors line-clamp-2">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-white/10">
          <Link
            href={blogUrl}
            className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
          >
            {backText}
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostView;
