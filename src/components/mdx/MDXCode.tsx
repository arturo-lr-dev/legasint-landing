'use client';

import React from 'react';

interface MDXCodeProps {
  children?: React.ReactNode;
  className?: string;
}

export const MDXCode: React.FC<MDXCodeProps> = ({ children, className, ...props }) => {
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className="px-1.5 py-0.5 bg-white/10 rounded text-blue-300 text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
