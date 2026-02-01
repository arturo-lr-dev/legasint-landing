'use client';

import React from 'react';
import Image from 'next/image';

interface MDXImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}

export const MDXImage: React.FC<MDXImageProps> = ({ src, alt, width, height, ...props }) => {
  if (!src) return null;

  const isExternal = src.startsWith('http') || src.startsWith('//');

  if (isExternal) {
    return (
      <figure className="my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt || ''}
          className="rounded-xl border border-white/10 w-full"
          {...props}
        />
        {alt && (
          <figcaption className="text-center text-sm text-blue-200 mt-2">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt || ''}
        width={typeof width === 'number' ? width : 800}
        height={typeof height === 'number' ? height : 400}
        className="rounded-xl border border-white/10 w-full h-auto"
      />
      {alt && (
        <figcaption className="text-center text-sm text-blue-200 mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  );
};
