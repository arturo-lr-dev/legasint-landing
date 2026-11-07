'use client';

import React, { useMemo, useRef, useState } from 'react';
import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMeta[];
  locale?: string;
}

const POSTS_PER_PAGE = 6;

export const BlogList: React.FC<BlogListProps> = ({ posts, locale = 'es' }) => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagCount.set(tag, (tagCount.get(tag) || 0) + 1));
    });
    return Array.from(tagCount.entries()).sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
  }, [posts]);

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || post.title.toLowerCase().includes(query) || post.description.toLowerCase().includes(query);
    return matchesSearch && (!activeTag || post.tags.includes(activeTag));
  }), [posts, searchQuery, activeTag]);

  const featuredPost = !searchQuery && !activeTag ? filteredPosts[0] : null;
  const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;
  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;
  const isEs = locale === 'es';

  return (
    <main id="main-content" className="dispatch-home blog-index-page">
      <section className="dispatch-blog-hero" aria-labelledby="blog-title">
        <div className="dispatch-container">
          <h1 id="blog-title" className="dispatch-display">{isEs ? 'Ideas & Código' : 'Ideas & Code'}</h1>
          <p>{isEs ? 'Artículos sobre tecnología, desarrollo y soluciones digitales' : 'Articles about technology, development and digital solutions'}</p>
        </div>
      </section>

      <section className="dispatch-blog-filters" aria-label={isEs ? 'Filtros de artículos' : 'Article filters'}>
        <div className="dispatch-container">
          <div className="dispatch-blog-search">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setVisibleCount(POSTS_PER_PAGE);
              }}
              placeholder={isEs ? 'Buscar artículos...' : 'Search articles...'}
              aria-label={isEs ? 'Buscar artículos' : 'Search articles'}
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} aria-label={isEs ? 'Borrar búsqueda' : 'Clear search'}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="dispatch-blog-tags" role="group" aria-label={isEs ? 'Filtrar por tema' : 'Filter by topic'}>
            <button type="button" aria-pressed={!activeTag} onClick={() => { setActiveTag(null); setVisibleCount(POSTS_PER_PAGE); }}>
              {isEs ? 'Todos' : 'All'}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={activeTag === tag}
                onClick={() => {
                  setActiveTag(activeTag === tag ? null : tag);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="dispatch-blog-count">
            {isEs ? `${filteredPosts.length} artículo${filteredPosts.length !== 1 ? 's' : ''}` : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </section>

      <section className="dispatch-section dispatch-blog-list">
        <div className="dispatch-container">
          {posts.length === 0 || filteredPosts.length === 0 ? (
            <div className="dispatch-blog-empty">
              <p>{posts.length === 0 ? (isEs ? 'No hay artículos disponibles aún.' : 'No articles available yet.') : (isEs ? 'No se encontraron artículos.' : 'No articles found.')}</p>
              {filteredPosts.length === 0 && (
                <button type="button" className="dispatch-text-link" onClick={() => { setSearchQuery(''); setActiveTag(null); }}>
                  {isEs ? 'Limpiar filtros' : 'Clear filters'}
                </button>
              )}
            </div>
          ) : (
            <>
              {featuredPost && <BlogCard post={featuredPost} variant="featured" />}
              <div className="dispatch-blog-grid">
                {visiblePosts.map((post) => <BlogCard key={`${post.locale}-${post.slug}`} post={post} />)}
              </div>
              {hasMore && (
                <button type="button" className="dispatch-button dispatch-blog-load" onClick={() => setVisibleCount((value) => value + POSTS_PER_PAGE)}>
                  {isEs ? 'Ver más artículos' : 'Load more articles'}
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogList;
