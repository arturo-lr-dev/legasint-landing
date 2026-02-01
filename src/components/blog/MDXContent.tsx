'use client';

import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import {
  MDXHeading,
  MDXCode,
  MDXPre,
  MDXLink,
  MDXBlockquote,
  MDXImage,
} from '@/components/mdx';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

const components = {
  h1: (props: React.ComponentPropsWithoutRef<'h1'>) => <MDXHeading level={1} {...props} />,
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <MDXHeading level={2} {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => <MDXHeading level={3} {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => <MDXHeading level={4} {...props} />,
  h5: (props: React.ComponentPropsWithoutRef<'h5'>) => <MDXHeading level={5} {...props} />,
  h6: (props: React.ComponentPropsWithoutRef<'h6'>) => <MDXHeading level={6} {...props} />,
  code: MDXCode,
  pre: MDXPre,
  a: MDXLink,
  blockquote: MDXBlockquote,
  img: MDXImage,
};

export const MDXContent: React.FC<MDXContentProps> = ({ source }) => {
  return <MDXRemote {...source} components={components} />;
};

export default MDXContent;
