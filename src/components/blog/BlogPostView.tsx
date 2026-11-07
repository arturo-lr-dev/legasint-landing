import React from 'react';
import Link from 'next/link';
import BlogImage from './BlogImage';
import { BlogPost, BlogPostMeta, TocItem } from '@/lib/blog';
import { TableOfContents } from './TableOfContents';
import BlogPostInteractions from './BlogPostInteractions';

interface BlogPostViewProps {
  post: BlogPost;
  children: React.ReactNode;
  previousPost?: BlogPostMeta | null;
  nextPost?: BlogPostMeta | null;
  relatedPosts?: BlogPostMeta[];
  tocItems?: TocItem[];
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post, children, previousPost, nextPost, relatedPosts, tocItems }) => {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString(post.locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const isEs = post.locale === 'es';
  const blogUrl = isEs ? '/blog' : '/blog/en';
  const getPostUrl = (slug: string) => isEs ? `/blog/${slug}` : `/blog/en/${slug}`;
  const getTagUrl = (tag: string) => isEs ? `/blog/tag/${encodeURIComponent(tag.toLowerCase())}` : `/blog/en/tag/${encodeURIComponent(tag.toLowerCase())}`;
  const hasToc = tocItems && tocItems.length >= 3;

  return (
    <main id="main-content" className="dispatch-home blog-article-page">
      <header className="dispatch-article-hero">
        <div className="dispatch-container dispatch-article-hero__inner">
          <nav aria-label="Breadcrumb" className="dispatch-breadcrumbs">
            <ol>
              <li><Link href={isEs ? '/' : '/en'}>{isEs ? 'Inicio' : 'Home'}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={blogUrl}>Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>
          <div className="dispatch-article-hero__tags">
            {post.tags.map((tag) => <Link key={tag} href={getTagUrl(tag)}>{tag}</Link>)}
          </div>
          <h1 className="dispatch-display">{post.title}</h1>
          <p className="dispatch-article-hero__description">{post.description}</p>
          <div className="dispatch-article-hero__meta">
            <span className="dispatch-article-author" aria-hidden="true">{post.author.charAt(0).toUpperCase()}</span>
            <span>{post.author}</span>
            <time>{formatDate(post.date)}</time>
            <span>{post.readingTime} {isEs ? 'min de lectura' : 'min read'}</span>
          </div>
        </div>
      </header>

      {post.image && (
        <div className="dispatch-article-image">
          <BlogImage src={post.image} alt={post.title} className="object-cover" priority />
        </div>
      )}

      <div className="dispatch-container dispatch-article-layout">
        <article id="article-content" className="dispatch-article-content">
          {hasToc && <div className="dispatch-article-toc--mobile"><TableOfContents items={tocItems} locale={post.locale} variant="inline" /></div>}
          <div className="prose">{children}</div>
          <BlogPostInteractions post={post} />

          {(previousPost || nextPost) && (
            <nav className="dispatch-article-nav" aria-label={isEs ? 'Más artículos' : 'More articles'}>
              {previousPost ? (
                <Link href={getPostUrl(previousPost.slug)}>
                  <span>← {isEs ? 'Anterior' : 'Previous'}</span>
                  <strong>{previousPost.title}</strong>
                </Link>
              ) : <span />}
              {nextPost && (
                <Link href={getPostUrl(nextPost.slug)}>
                  <span>{isEs ? 'Siguiente' : 'Next'} →</span>
                  <strong>{nextPost.title}</strong>
                </Link>
              )}
            </nav>
          )}

          {relatedPosts && relatedPosts.length > 0 && (
            <section className="dispatch-related" aria-labelledby="related-title">
              <h2 id="related-title">{isEs ? 'Artículos relacionados' : 'Related articles'}</h2>
              <div className="dispatch-related-grid">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={getPostUrl(related.slug)}>
                    <div>
                      {related.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <h3>{related.title}</h3>
                    <p>{related.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <footer className="dispatch-article-footer">
            <Link href={blogUrl} className="dispatch-text-link">← {isEs ? 'Volver al blog' : 'Back to blog'}</Link>
          </footer>
        </article>

        {hasToc && (
          <aside className="dispatch-article-toc">
            <TableOfContents items={tocItems} locale={post.locale} variant="sidebar" />
          </aside>
        )}
      </div>
    </main>
  );
};

export default BlogPostView;
