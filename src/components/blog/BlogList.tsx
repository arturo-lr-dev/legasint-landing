'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  locale?: string;
}

const POSTS_PER_PAGE = 6;

export const BlogList: React.FC<BlogListProps> = ({ posts, locale = 'es' }) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Extract unique tags from all posts
  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !activeTag || post.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, activeTag]);

  const featuredPost = !searchQuery && !activeTag ? filteredPosts[0] : null;
  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;
  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  const isEs = locale === 'es';
  const subtitle = isEs
    ? 'Artículos sobre tecnología, desarrollo y soluciones digitales'
    : 'Articles about technology, development and digital solutions';
  const emptyMessage = isEs
    ? 'No hay artículos disponibles aún.'
    : 'No articles available yet.';
  const loadMoreText = isEs ? 'Ver más artículos' : 'Load more articles';
  const searchPlaceholder = isEs ? 'Buscar artículos...' : 'Search articles...';
  const noResultsText = isEs ? 'No se encontraron artículos.' : 'No articles found.';
  const allText = isEs ? 'Todos' : 'All';
  const articlesCount = isEs
    ? `${filteredPosts.length} artículo${filteredPosts.length !== 1 ? 's' : ''}`
    : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`;

  if (!mounted) return null;

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
      {/* Hero Section */}
      <div className="relative pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-blue-400" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                Blog
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {isEs ? (
                <>Ideas & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Código</span></>
              ) : (
                <>Ideas & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Code</span></>
              )}
            </h1>
            <p className="text-blue-200 text-lg max-w-xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Search + Tag Filter */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-md">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                placeholder={searchPlaceholder}
                className="w-full px-4 py-2.5 pl-10 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-blue-200/50 focus:outline-none focus:border-blue-400/40 focus:bg-white/15 transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200/50 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 overflow-x-auto blog-scrollbar pb-2 -mb-2">
              <button
                onClick={() => { setActiveTag(null); setVisibleCount(POSTS_PER_PAGE); }}
                className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  !activeTag
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-blue-200/70 border border-transparent hover:text-white hover:bg-white/10'
                }`}
              >
                {allText}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveTag(activeTag === tag ? null : tag);
                    setVisibleCount(POSTS_PER_PAGE);
                  }}
                  className={`flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    activeTag === tag
                      ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                      : 'text-blue-200/70 border border-transparent hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        {/* Article count */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <p className="text-sm text-blue-200/50">{articlesCount}</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-blue-200 text-lg">{emptyMessage}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4">
              <svg className="w-7 h-7 text-blue-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-blue-200 text-lg mb-2">{noResultsText}</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTag(null); }}
              className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
            >
              {isEs ? 'Limpiar filtros' : 'Clear filters'}
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-10">
                <BlogCard post={featuredPost} variant="featured" />
              </div>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visiblePosts.map((post, index) => (
                <BlogCard key={`${post.locale}-${post.slug}`} post={post} index={index} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-14">
                <button
                  onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                  className="group flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  {loadMoreText}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;
