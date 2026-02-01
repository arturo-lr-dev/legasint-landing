'use client';

import React from 'react';

interface MDXBlockquoteProps {
  children?: React.ReactNode;
}

export const MDXBlockquote: React.FC<MDXBlockquoteProps> = ({ children, ...props }) => {
  return (
    <blockquote
      className="pl-4 border-l-4 border-purple-500 bg-white/5 py-3 pr-4 my-6 rounded-r-lg italic text-blue-200"
      {...props}
    >
      {children}
    </blockquote>
  );
};
