'use client';

import { useCallback, useEffect, useState } from 'react';
import type { BlogPost } from '@/lib/blog';

export default function BlogPostInteractions({ post }: { post: BlogPost }) {
  const [currentUrl, setCurrentUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const isEs = post.locale === 'es';

  const handleScroll = useCallback(() => {
    const article = document.getElementById('article-content');
    if (!article) return;
    const rect = article.getBoundingClientRect();
    const articleTop = rect.top + window.scrollY;
    const scrolled = window.scrollY - articleTop + window.innerHeight * 0.3;
    setReadingProgress(Math.min(Math.max(scrolled / article.offsetHeight, 0), 1));
  }, []);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const share = (network: 'twitter' | 'linkedin' | 'facebook') => {
    const text = encodeURIComponent(post.title);
    const url = encodeURIComponent(currentUrl);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };
    window.open(urls[network], '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      <div className="reading-progress" style={{ width: `${readingProgress * 100}%` }} />
      <div className="dispatch-article-share">
        <span>{isEs ? 'Compartir' : 'Share'}</span>
        <div>
          <button type="button" onClick={() => share('twitter')} aria-label="Share on X">X</button>
          <button type="button" onClick={() => share('linkedin')} aria-label="Share on LinkedIn">in</button>
          <button type="button" onClick={() => share('facebook')} aria-label="Share on Facebook">f</button>
          <button type="button" onClick={copyToClipboard} aria-label={isEs ? 'Copiar enlace' : 'Copy link'}>
            {copied ? (isEs ? 'Copiado' : 'Copied') : (isEs ? 'Copiar enlace' : 'Copy link')}
          </button>
        </div>
      </div>
    </>
  );
}
