'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  const [readingProgress, setReadingProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const article = document.getElementById('article-content');
    if (!article) return;
    const rect = article.getBoundingClientRect();
    const articleTop = rect.top + window.scrollY;
    const articleHeight = article.offsetHeight;
    const scrolled = window.scrollY - articleTop + window.innerHeight * 0.3;
    const progress = Math.min(Math.max(scrolled / articleHeight, 0), 1);
    setReadingProgress(progress);
  }, []);

  useEffect(() => {
    setMounted(true);
    setCurrentUrl(window.location.href);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(post.locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isEs = post.locale === 'es';
  const backText = isEs ? 'Blog' : 'Blog';
  const blogUrl = isEs ? '/blog' : '/blog/en';
  const previousText = isEs ? 'Anterior' : 'Previous';
  const nextText = isEs ? 'Siguiente' : 'Next';
  const shareText = isEs ? 'Compartir' : 'Share';
  const copiedText = isEs ? 'Copiado' : 'Copied';
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

  const hasToc = tocItems && tocItems.length >= 3;

  return (
    <div
      className="w-full min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url("${isMobile ? '/circuit-mobile.svg' : '/circuit.svg'}"), linear-gradient(to bottom left, #1e3a8a, #581c87)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Reading Progress */}
      <div
        className="reading-progress"
        style={{ width: `${readingProgress * 100}%` }}
      />

      {/* Hero Header */}
      <div className="relative pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-blue-300/60 hover:text-blue-200 transition-colors">
                  {isEs ? 'Inicio' : 'Home'}
                </Link>
              </li>
              <li className="text-blue-300/40" aria-hidden="true">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link href={blogUrl} className="text-blue-300/60 hover:text-blue-200 transition-colors">
                  {backText}
                </Link>
              </li>
              <li className="text-blue-300/40" aria-hidden="true">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-blue-200 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                href={getTagUrl(tag)}
                className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300 bg-blue-500/20 rounded-md border border-blue-400/20 hover:bg-blue-500/30 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-4 leading-[1.15] tracking-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-blue-200 leading-relaxed mb-6 max-w-3xl">
            {post.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blue-300">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium text-blue-100">{post.author}</span>
            </div>
            <span className="text-blue-300/40">|</span>
            <time>{formatDate(post.date)}</time>
            <span className="text-blue-300/40">|</span>
            <span>{readingTimeText}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="max-w-5xl mx-auto px-4 mb-10">
          <div className="relative w-full h-56 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Body with Sidebar TOC */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className={`flex gap-10 ${hasToc ? 'lg:gap-14' : ''}`}>
          {/* Main Content */}
          <article id="article-content" className={`flex-1 min-w-0 ${hasToc ? 'max-w-3xl' : 'max-w-4xl mx-auto'}`}>
            {/* Inline TOC for mobile (when sidebar TOC is hidden) */}
            {hasToc && (
              <div className="lg:hidden mb-8">
                <TableOfContents items={tocItems} locale={post.locale} variant="inline" />
              </div>
            )}

            {/* MDX Content */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-10">
              <div className="prose prose-lg max-w-none">
                {children}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 flex flex-wrap items-center gap-3 py-6 border-y border-white/10">
              <span className="text-sm text-blue-300 font-medium">{shareText}</span>
              <div className="flex gap-1.5">
                <button
                  onClick={shareOnTwitter}
                  className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Share on X"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button
                  onClick={shareOnFacebook}
                  className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
                  aria-label={copyLinkText}
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-emerald-400">{copiedText}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs hidden sm:inline">{copyLinkText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prev / Next Navigation */}
            {(previousPost || nextPost) && (
              <nav className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {previousPost ? (
                  <Link
                    href={getPostUrl(previousPost.slug)}
                    className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-blue-300 mb-2">
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      {previousText}
                    </div>
                    <p className="text-sm font-semibold text-blue-100 group-hover:text-white transition-colors line-clamp-2">
                      {previousPost.title}
                    </p>
                  </Link>
                ) : <div />}

                {nextPost && (
                  <Link
                    href={getPostUrl(nextPost.slug)}
                    className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all md:text-right"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-blue-300 mb-2 md:justify-end">
                      {nextText}
                      <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-blue-100 group-hover:text-white transition-colors line-clamp-2">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <section className="mt-14">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-[2px] bg-cyan-500" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
                    {isEs ? 'Artículos relacionados' : 'Related articles'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={getPostUrl(related.slug)}
                      className="group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {related.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-200 rounded border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-semibold text-blue-100 group-hover:text-white transition-colors line-clamp-2 mb-2 leading-snug">
                        {related.title}
                      </h3>
                      <p className="text-xs text-blue-300 line-clamp-2 leading-relaxed">
                        {related.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Back to blog */}
            <footer className="mt-10 pt-8 border-t border-white/10">
              <Link
                href={blogUrl}
                className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {isEs ? 'Volver al blog' : 'Back to blog'}
              </Link>
            </footer>
          </article>

          {/* Sidebar TOC - Desktop only */}
          {hasToc && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} locale={post.locale} variant="sidebar" />
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostView;
