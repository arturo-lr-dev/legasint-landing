'use client';

import React from 'react';

interface MDXHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  id?: string;
}

const headingStyles: Record<number, string> = {
  1: 'text-4xl font-bold mt-8 mb-4',
  2: 'text-3xl font-bold mt-8 mb-4',
  3: 'text-2xl font-semibold mt-6 mb-3',
  4: 'text-xl font-semibold mt-4 mb-2',
  5: 'text-lg font-medium mt-4 mb-2',
  6: 'text-base font-medium mt-3 mb-2',
};

export const MDXHeading: React.FC<MDXHeadingProps> = ({ level, children, id, ...props }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseStyles = 'text-white scroll-mt-20';
  const levelStyles = headingStyles[level];

  return (
    <Tag
      id={id}
      className={`${baseStyles} ${levelStyles} group`}
      {...props}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 opacity-0 group-hover:opacity-100 text-blue-400 transition-opacity"
          aria-label={`Link to ${typeof children === 'string' ? children : 'heading'}`}
        >
          #
        </a>
      )}
    </Tag>
  );
};
