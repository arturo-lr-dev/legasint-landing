'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BlogPostMeta, TocItem } from '@/lib/blog';
import { TableOfContents } from './TableOfContents';

interface BlogPostViewProps {
  post: BlogPost;
  children: React.ReactNode;
  previousPost?: BlogPostMeta | null;
  nextPost?: BlogPostMeta | null;
  relatedPosts?: BlogPostMeta[];
  tocItems?: TocItem[];
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, children, previousPost, nextPost, relatedPosts, tocItems }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentUrl(window.location.href);
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

  const isEs = post.locale === 'es';
  const backText = isEs ? '← Volver al blog' : '← Back to blog';
  const blogUrl = isEs ? '/blog' : '/blog/en';
  const previousText = isEs ? '← Artículo anterior' : '← Previous article';
  const nextText = isEs ? 'Siguiente artículo →' : 'Next article →';
  const shareText = isEs ? 'Compartir' : 'Share';
  const copiedText = isEs ? '¡Copiado!' : 'Copied!';
  const copyLinkText = isEs ? 'Copiar enlace' : 'Copy link';
  const readingTimeText = isEs
    ? `${post.readingTime} min de lectura`
    : `${post.readingTime} min read`;
  const getPostUrl = (slug: string) => isEs ? `/blog/${slug}` : `/blog/en/${slug}`;
  const getTagUrl = (tag: string) => {
    const encoded = encodeURIComponent(tag.toLowerCase());
    return isEs ? `/blog/tag/${encoded}` : `/blog/en/tag/${encoded}`;
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-blue-300">
            <li>
              <Link href="/" className="hover:text-blue-200 transition-colors">
                {isEs ? 'Inicio' : 'Home'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={blogUrl} className="hover:text-blue-200 transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-blue-200 truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                href={getTagUrl(tag)}
                className="px-3 py-1 text-sm bg-blue-500/20 text-blue-200 rounded hover:bg-blue-500/30 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          <p className="text-xl text-blue-200 mb-4">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-blue-300 font-mono text-sm">
            <time>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTimeText}</span>
            <span aria-hidden="true">·</span>
            <span>{post.author}</span>
          </div>
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

        {/* Table of Contents */}
        {tocItems && tocItems.length >= 3 && (
          <TableOfContents items={tocItems} locale={post.locale} />
        )}

        {/* Post Content */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 md:p-10 border border-white/10">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="text-blue-200 font-medium">{shareText}:</span>
          <div className="flex gap-2">
            {/* Twitter/X */}
            <button
              onClick={shareOnTwitter}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-all group"
              aria-label="Share on X"
            >
              <svg className="w-5 h-5 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareOnLinkedIn}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-all group"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>

            {/* Facebook */}
            <button
              onClick={shareOnFacebook}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-all group"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5 text-white group-hover:text-blue-200 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* Copy Link */}
            <button
              onClick={copyToClipboard}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-all group flex items-center gap-2"
              aria-label={copyLinkText}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-400 text-sm">{copiedText}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-white group-hover:text-blue-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white group-hover:text-blue-200 text-sm hidden sm:inline transition-colors">{copyLinkText}</span>
                </>
              )}
            </button>
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

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">
              {isEs ? 'Artículos relacionados' : 'Related articles'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={getPostUrl(related.slug)}
                  className="group p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all"
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    {related.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-medium group-hover:text-blue-200 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-sm text-blue-300/70 line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
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
