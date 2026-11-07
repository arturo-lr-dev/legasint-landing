'use client';

import React from 'react';
import Link from 'next/link';
import BlogImage from './BlogImage';
import { BlogPostMeta } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMeta;
  index?: number;
  variant?: 'default' | 'featured' | 'compact';
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(post.locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const blogUrl = post.locale === 'es' ? `/blog/${post.slug}` : `/blog/en/${post.slug}`;

  return (
    <Link href={blogUrl} className={`dispatch-blog-card ${variant === 'featured' ? 'dispatch-blog-card--featured' : ''} ${variant === 'compact' ? 'dispatch-blog-card--compact' : ''}`}>
      <article>
        {post.image && (
          <div className="dispatch-blog-card__media">
            <BlogImage src={post.image} alt={post.title} className="object-cover" priority={variant === 'featured'} />
          </div>
        )}
        <div className="dispatch-blog-card__content">
          <div className="dispatch-blog-card__meta">
            <time>{formatDate(post.date)}</time>
            <span>{post.readingTime} min</span>
          </div>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <div className="dispatch-blog-card__tags">
            {post.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <span className="dispatch-blog-card__link">{post.locale === 'es' ? 'Leer artículo' : 'Read article'}</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
