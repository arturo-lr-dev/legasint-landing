'use client';

import React, { useState, useEffect } from 'react';
import { TocItem } from '@/lib/blog';

interface TableOfContentsProps {
  items: TocItem[];
  locale: string;
  variant?: 'inline' | 'sidebar';
}

export function TableOfContents({ items, locale, variant = 'inline' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(variant === 'inline');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;
  const title = locale === 'es' ? 'Contenido' : 'Contents';

  if (variant === 'sidebar') {
    return (
      <nav aria-label={title} className="dispatch-toc">
        <h2>{title}</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={`${item.level === 3 ? 'is-nested' : ''} ${activeId === item.id ? 'is-active' : ''}`} aria-current={activeId === item.id ? 'location' : undefined}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={title} className="dispatch-toc dispatch-toc--inline">
      <button type="button" onClick={() => setIsCollapsed(!isCollapsed)} aria-expanded={!isCollapsed}>
        <span>{title} ({items.length})</span>
        <svg className={isCollapsed ? '' : 'rotate-180'} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {!isCollapsed && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={`${item.level === 3 ? 'is-nested' : ''} ${activeId === item.id ? 'is-active' : ''}`} aria-current={activeId === item.id ? 'location' : undefined}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
