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

  // Sidebar variant - clean, minimal
  if (variant === 'sidebar') {
    return (
      <nav aria-label={title}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-[2px] bg-blue-400/50" />
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-300/60">
            {title}
          </h2>
        </div>
        <ul className="space-y-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-[13px] leading-relaxed py-1 transition-all duration-200 border-l-2 ${
                  item.level === 3 ? 'pl-5' : 'pl-3'
                } ${
                  activeId === item.id
                    ? 'text-blue-200 border-blue-400'
                    : 'text-blue-300/60 border-transparent hover:text-blue-200 hover:border-blue-300/40'
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

  // Inline variant - collapsible
  return (
    <nav aria-label={title} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between w-full px-5 py-3.5 text-left"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-300/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="text-sm font-medium text-blue-100">{title}</span>
          <span className="text-xs text-blue-300/60">({items.length})</span>
        </div>
        <svg
          className={`w-4 h-4 text-blue-300/60 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-180'}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {!isCollapsed && (
        <ul className="px-5 pb-4 space-y-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm py-1 transition-colors ${
                  item.level === 3 ? 'pl-4' : ''
                } ${
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
      )}
    </nav>
  );
}
