'use client';

import React, { useState, useEffect } from 'react';
import { TocItem } from '@/lib/blog';

interface TableOfContentsProps {
  items: TocItem[];
  locale: string;
}

export function TableOfContents({ items, locale }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  const title = locale === 'es' ? 'Contenido' : 'Contents';

  return (
    <nav aria-label={title} className="mb-8 p-4 bg-white/5 rounded-lg border border-white/10">
      <h2 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-3">
        {title}
      </h2>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${item.id}`}
              className={`text-sm block transition-colors ${
                activeId === item.id
                  ? 'text-blue-200 font-medium'
                  : 'text-blue-300/70 hover:text-blue-200'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
