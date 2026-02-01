'use client';

import React from 'react';
import Link from 'next/link';

interface MDXLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export const MDXLink: React.FC<MDXLinkProps> = ({ href, children, ...props }) => {
  const isExternal = href?.startsWith('http') || href?.startsWith('//');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
        {...props}
      >
        {children}
        <span className="inline-block ml-1 text-xs">↗</span>
      </a>
    );
  }

  return (
    <Link
      href={href || '#'}
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
};
